"use client"; // Mark this component as a client component

import { useState } from "react";
import { Button } from "@/components/ui/button";

function ClassChanger() {
  const [activeClass, setActiveClass] = useState("bg-zinc-100");

  const classes = [
    "bg-zinc-100",
    "bg-blue-100",
    "bg-green-100",
    "bg-yellow-100",
    "bg-red-100",
    "bg-purple-100",
  ];

  const changeClass = () => {
    const currentIndex = classes.indexOf(activeClass);
    const nextIndex = (currentIndex + 1) % classes.length;
    setActiveClass(classes[nextIndex]);
  };

  return (
    <div className="space-y-2">
      <Button onClick={changeClass} data-testid="change-class-button">
        Change Class
      </Button>

      <div className="border rounded-md p-3 bg-zinc-50">
        <div
          className={`p-4 rounded ${activeClass} transition-colors duration-300`}
          data-testid="changing-class-element"
        >
          <p>Element with changing class: <span className="font-mono text-sm">{activeClass}</span></p>
        </div>
      </div>
    </div>
  );
}

export default ClassChanger;