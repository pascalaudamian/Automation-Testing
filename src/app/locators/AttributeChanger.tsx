"use client"; // Mark this component as a client component

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Make sure to import Input if used here

function AttributeChanger() {
  const [attributes, setAttributes] = useState({
    id: "initial-id",
    role: "button",
    "data-status": "inactive",
  });

  const changeAttributes = () => {
    const statuses = ["inactive", "active", "pending", "completed", "error"];
    const roles = ["button", "switch", "tab", "link", "checkbox"];
    const ids = ["initial-id", "changed-id", "new-id", "different-id", "final-id"];

    const randomIndex = Math.floor(Math.random() * 5);

    setAttributes({
      id: ids[randomIndex],
      role: roles[randomIndex],
      "data-status": statuses[randomIndex],
    });
  };

  return (
    <div className="space-y-2">
      <Button onClick={changeAttributes} data-testid="change-attributes-button">
        Change Attributes
      </Button>

      <div className="border rounded-md p-3 bg-zinc-50">
        <div
          id={attributes.id}
          role={attributes.role}
          data-status={attributes["data-status"]}
          className="p-2 bg-white rounded border"
          data-testid="changing-attributes-element"
        >
          <p>Current attributes:</p>
          <ul className="text-sm list-disc pl-5 mt-1">
            <li>id: {attributes.id}</li>
            <li>role: {attributes.role}</li>
            <li>data-status: {attributes["data-status"]}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AttributeChanger;