"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, Heart, Star, Lightbulb } from "lucide-react";

export default function HoverEffectsPage() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-8 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {/* Color Change on Hover */}
      <Card className="hover:bg-blue-50 transition-colors duration-300">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-2">Color Change</h2>
          <p className="text-sm text-gray-600">Hover to change background color.</p>
        </CardContent>
      </Card>

      {/* Image Scale */}
      <Card className="overflow-hidden">
        <div className="relative aspect-w-16 aspect-h-9">
          <img
            src="https://picsum.photos/600/337"
            alt="Hover scale"
            className="object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
        <CardContent className="p-4">
          <p className="text-sm text-gray-600">Image scales on hover.</p>
        </CardContent>
      </Card>

      {/* Box Shadow on Hover */}
      <Card className="hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-2">Box Shadow</h2>
          <p className="text-sm text-gray-600">Hover to see a subtle shadow.</p>
        </CardContent>
      </Card>

      {/* Button Transform */}
      <Button className="transform transition-transform hover:scale-105 hover:rotate-2 duration-200">
        Animated Button
      </Button>

      {/* Dropdown Menu on Hover */}
      <Card className="relative" onMouseEnter={() => setShowDropdown(true)} onMouseLeave={() => setShowDropdown(false)}>
        <CardContent className="p-4">
          <button className="flex items-center gap-2 w-full justify-between hover:bg-gray-50 p-2 rounded-md transition-colors duration-200">
            Hover Dropdown <ChevronDown size={16} />
          </button>
          {showDropdown && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-md shadow-md z-10">
              <div className="hover:bg-gray-100 p-2 cursor-pointer">Item 1</div>
              <div className="hover:bg-gray-100 p-2 cursor-pointer">Item 2</div>
              <div className="hover:bg-gray-100 p-2 cursor-pointer">Item 3</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Animated Text on Hover */}
      <motion.div
        whileHover={{ scale: 1.05, y: -2, boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}
        transition={{ duration: 0.2 }}
        className="cursor-pointer bg-white rounded-md shadow"
      >
        <CardContent className="p-6">
          <p className="text-xl font-semibold">Animated Text</p>
          <p className="text-sm text-gray-600">Slight scale and lift on hover.</p>
        </CardContent>
      </motion.div>

      {/* Link underline and color change */}
      <Card>
        <CardContent className="p-6">
          <a
            href="#"
            className="text-blue-600 hover:underline hover:text-blue-800 transition duration-200"
          >
            Hover to see underline and color change
          </a>
        </CardContent>
      </Card>

      {/* Icon hover effects */}
      <Card className="flex items-center gap-4 p-6">
        <ChevronDown className="transition-transform hover:rotate-180 cursor-pointer text-blue-500 hover:text-blue-700 duration-300" size={24} />
        <p className="text-sm text-gray-600">Hover the icon to rotate and change color.</p>
      </Card>

      {/* Hover with delay */}
      <Card className="group">
        <CardContent className="p-6">
          <p className="text-sm text-gray-600 transition-opacity duration-500 delay-300 opacity-0 group-hover:opacity-100">
            Appears after a short delay
          </p>
          <p className="text-lg font-semibold">Delayed Appearance</p>
        </CardContent>
      </Card>

      {/* Multiple properties on hover */}
      <Card className="hover:bg-green-50 hover:shadow-lg hover:scale-102 transition-all duration-300 cursor-pointer">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-2">Multiple Effects</h2>
          <p className="text-sm text-gray-600">Background, shadow, and scale change.</p>
        </CardContent>
      </Card>

      {/* Icon Grid with Hover Effects */}
      <Card>
        <CardContent className="p-6 grid grid-cols-3 gap-4 justify-items-center">
          <motion.div whileHover={{ scale: 1.2, y: -2 }} transition={{ duration: 0.2 }} className="text-red-500 cursor-pointer">
            <Heart size={32} />
          </motion.div>
          <motion.div whileHover={{ scale: 1.2, y: -2, rotate: 30 }} transition={{ duration: 0.2 }} className="text-yellow-500 cursor-pointer">
            <Star size={32} />
          </motion.div>
          <motion.div whileHover={{ scale: 1.2, y: -2 }} transition={{ duration: 0.2 }} className="text-blue-500 cursor-pointer">
            <Lightbulb size={32} />
          </motion.div>
          <p className="text-xs text-gray-500 col-span-3 text-center mt-2">Icon grid with individual hover animations.</p>
        </CardContent>
      </Card>

      {/* Card with border on hover */}
      <Card className="border border-transparent hover:border-blue-500 transition-border duration-300">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-2">Border Highlight</h2>
          <p className="text-sm text-gray-600">A border appears on hover.</p>
        </CardContent>
      </Card>
    </div>
  );
}