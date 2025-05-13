"use client";
import React, { useRef, useEffect, useState, ChangeEvent, ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HexColorPicker } from "react-colorful";
import { motion, useDragControls, DragControls } from "framer-motion";

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, children }) => (
  <button
    className={`px-4 py-2 rounded-t-md ${
      active ? "bg-gray-200 border-b-2 border-blue-500" : "bg-gray-100"
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

interface Shape {
  type: "circle" | "rect" | "ellipse" | "line";
  x: number;
  y: number;
  size: number;
  color: string;
  stroke: string;
  strokeWidth: number;
}

export default function CanvasSVGSimulator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [newShapeType, setNewShapeType] = useState<Shape["type"]>("circle");
  const [newShapeColor, setNewShapeColor] = useState<string>("#ff0000");
  const [newStrokeColor, setNewStrokeColor] = useState<string>("#000000");
  const [newStrokeWidth, setNewStrokeWidth] = useState<number>(2);
  const [selectedShapeIndex, setSelectedShapeIndex] = useState<number | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const [activeTab, setActiveTab] = useState<"canvas" | "svg">("canvas");

  useEffect(() => {
    if (activeTab === "canvas") {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d")!;
        let animationFrameIdLocal: number | undefined;

        const drawCanvas = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          shapes.forEach((shape) => {
            ctx.beginPath();
            ctx.fillStyle = shape.color;
            if (shape.type === "circle") {
              ctx.arc(shape.x, shape.y, shape.size / 2, 0, 2 * Math.PI);
            } else if (shape.type === "rect") {
              ctx.fillRect(shape.x, shape.y, shape.size, shape.size);
            } else if (shape.type === "ellipse") {
              ctx.ellipse(shape.x, shape.y, shape.size / 2, shape.size / 4, 0, 0, 2 * Math.PI);
            } else if (shape.type === "line") {
              ctx.moveTo(shape.x, shape.y);
              ctx.lineTo(shape.x + shape.size, shape.y + shape.size / 2);
            }
            ctx.fill();
            if (shape.strokeWidth > 0) {
              ctx.strokeStyle = shape.stroke;
              ctx.lineWidth = shape.strokeWidth;
              ctx.stroke();
            }
          });
        };

        const animate = () => {
          setShapes((prevShapes: Shape[]) =>
            prevShapes.map((shape: Shape) => ({
              ...shape,
              x: shape.x + Math.random() * 2 - 1,
              y: shape.y + Math.random() * 2 - 1,
            }))
          );
          drawCanvas();
          animationFrameIdLocal = requestAnimationFrame(animate);
        };

        animationFrameIdLocal = requestAnimationFrame(animate);

        return () => {
          if (animationFrameIdLocal) {
            cancelAnimationFrame(animationFrameIdLocal);
          }
        };
      }
    } else {
      // When switching to SVG, we don't need to do anything with the canvas
      // The SVG rendering is handled directly in the JSX.
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
    }
  }, [activeTab, shapes]);

  const addShape = () => {
    const newShape: Shape = {
      type: newShapeType,
      x: Math.random() * 300,
      y: Math.random() * 150,
      size: 30 + Math.random() * 40,
      color: newShapeColor,
      stroke: newStrokeColor,
      strokeWidth: Number(newStrokeWidth),
    };
    setShapes((prev: Shape[]) => [...prev, newShape]);
  };

  const handleDrag = (
    event: unknown,
    info: { point: { x: number; y: number } },
    idx: number
  ) => {
    setShapes((prev: Shape[]) =>
      prev.map((shape, i) =>
        i === idx ? { ...shape, x: info.point.x, y: info.point.y } : shape
      )
    );
  };

  const handleWheel = (e: React.WheelEvent, idx: number) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 5 : -5;
    setShapes((prev: Shape[]) =>
      prev.map((shape, i) =>
        i === idx ? { ...shape, size: Math.max(10, shape.size + delta) } : shape
      )
    );
  };

  const handleShapeClick = (index: number) => {
    setSelectedShapeIndex(index);
    console.log("Selected shape index:", index);
  };

  const setNewStrokeWidthHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewStrokeWidth(Number(e.target.value));
  };

  return (
    <div className="p-4">
      {/* Tab Menu */}
      <div className="flex border-b">
        <TabButton active={activeTab === "canvas"} onClick={() => setActiveTab("canvas")}>
          Canvas
        </TabButton>
        <TabButton active={activeTab === "svg"} onClick={() => setActiveTab("svg")}>
          SVG
        </TabButton>
      </div>

      {/* Canvas / SVG Section with Controls */}
      {activeTab === "canvas" && (
        <Card className="p-4 shadow-xl mt-4">
          <h2 className="text-xl font-bold mb-2">Canvas Simulation</h2>
          <div className="flex">
            <canvas
              ref={canvasRef}
              width={400}
              height={200}
              className="border rounded-lg mr-4"
            />
            <div className="flex flex-col gap-4 items-start">
              <div className="w-full">
                <Label htmlFor="shape-type" className="block mb-1">
                  Shape:
                </Label>
                <Select
                  onValueChange={(value) => setNewShapeType(value as Shape["type"])}
                  defaultValue={newShapeType}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    <SelectItem value="circle">Circle</SelectItem>
                    <SelectItem value="rect">Rectangle</SelectItem>
                    <SelectItem value="ellipse">Ellipse</SelectItem>
                    <SelectItem value="line">Line</SelectItem>
                    {/* Add more shapes here */}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full">
                <Label className="block mb-1">Color:</Label>
                <HexColorPicker color={newShapeColor} onChange={setNewShapeColor} />
              </div>
              <div className="w-full">
                <Label className="block mb-1">Stroke Color:</Label>
                <HexColorPicker color={newStrokeColor} onChange={setNewStrokeColor} />
              </div>
              <div className="w-full">
                <Label htmlFor="stroke-width" className="block mb-1">
                  Stroke Width:
                </Label>
                <Input
                  type="number"
                  id="stroke-width"
                  value={newStrokeWidth}
                  onChange={setNewStrokeWidthHandler}
                  className="w-24"
                />
              </div>
              <Button onClick={addShape} className="w-full">
                Add Shape
              </Button>
              <Button onClick={() => setShapes([])} variant="destructive" className="w-full">
                Clear
              </Button>
            </div>
          </div>
        </Card>
      )}

      {activeTab === "svg" && (
        <Card className="p-4 shadow-xl mt-4">
          <h2 className="text-xl font-bold mb-2">SVG Simulation</h2>
          <div className="flex">
            <svg width="400" height="200" className="border rounded-lg mr-4">
              {shapes.map((shape: Shape, idx) => {
                const MotionShape =
                  shape.type === "circle"
                    ? motion.circle
                    : shape.type === "rect"
                      ? motion.rect
                      : shape.type === "ellipse"
                        ? motion.ellipse
                        : shape.type === "line"
                          ? motion.line
                          : motion.circle; // Default fallback
                const shapeProps =
                  shape.type === "circle"
                    ? { cx: shape.x, cy: shape.y, r: shape.size / 2 }
                    : shape.type === "rect"
                      ? { x: shape.x, y: shape.y, width: shape.size, height: shape.size }
                      : shape.type === "ellipse"
                        ? { cx: shape.x, cy: shape.y, rx: shape.size / 2, ry: shape.size / 4 }
                        : shape.type === "line"
                          ? { x1: shape.x, y1: shape.y, x2: shape.x + shape.size, y2: shape.y + shape.size / 2 }
                          : {};

                return (
                  <MotionShape
                    key={idx}
                    {...shapeProps}
                    drag
                    onDrag={(e, info) => handleDrag(e, info, idx)}
                    onWheel={(e: React.WheelEvent<Element>) => handleWheel(e, idx)}
                    onClick={() => handleShapeClick(idx)}
                    animate={{ ...shapeProps, transition: { duration: 0.5, ease: "easeInOut" } }}
                    fill={shape.color}
                    stroke={shape.stroke}
                    strokeWidth={shape.strokeWidth}
                    style={{ cursor: "move", outline: selectedShapeIndex === idx ? '2px solid blue' : 'none' }}
                  />
                );
              })}
            </svg>
            <div className="flex flex-col gap-4 items-start">
              <div className="w-full">
                <Label htmlFor="shape-type" className="block mb-1">
                  Shape:
                </Label>
                <Select
                  onValueChange={(value) => setNewShapeType(value as Shape["type"])}
                  defaultValue={newShapeType}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    <SelectItem value="circle">Circle</SelectItem>
                    <SelectItem value="rect">Rectangle</SelectItem>
                    <SelectItem value="ellipse">Ellipse</SelectItem>
                    <SelectItem value="line">Line</SelectItem>
                    {/* Add more shapes here */}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full">
                <Label className="block mb-1">Color:</Label>
                <HexColorPicker color={newShapeColor} onChange={setNewShapeColor} />
              </div>
              <div className="w-full">
                <Label className="block mb-1">Stroke Color:</Label>
                <HexColorPicker color={newStrokeColor} onChange={setNewStrokeColor} />
              </div>
              <div className="w-full">
                <Label htmlFor="stroke-width" className="block mb-1">
                  Stroke Width:
                </Label>
                <Input
                  type="number"
                  id="stroke-width"
                  value={newStrokeWidth}
                  onChange={setNewStrokeWidthHandler}
                  className="w-24"
                />
              </div>
              <Button onClick={addShape} className="w-full">
                Add Shape
              </Button>
              <Button onClick={() => setShapes([])} variant="destructive" className="w-full">
                Clear
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

