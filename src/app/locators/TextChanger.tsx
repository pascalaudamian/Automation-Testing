"use client"; // Mark this component as a client component

import { useState } from "react";
import { Button } from "@/components/ui/button";

function TextChanger() {
  const [text, setText] = useState("Initial text");
  const [count, setCount] = useState(0);

  const changeText = () => {
    const texts = [
      "Changed text 1",
      "Different text 2",
      "New content 3",
      "Updated information 4",
      "Fresh text 5"
    ];

    const newCount = (count + 1) % texts.length;
    setText(texts[newCount]);
    setCount(newCount);
  };

  return (
    <div className="space-y-2">
      <Button onClick={changeText} data-testid="change-text-button">
        Change Text
      </Button>

      <div
        className="border rounded-md p-3 bg-zinc-50"
        data-testid="changing-text-container"
      >
        <p data-testid="changing-text">{text}</p>
      </div>
    </div>
  );
}

export default TextChanger;