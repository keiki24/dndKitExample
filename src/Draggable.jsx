import React from "react";
import { useDraggable } from "@dnd-kit/core";

import { Button } from "./components/Button";

function Draggable(props) {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useDraggable({
      id: props.id,
    });
  const style = {
    ...(transform
      ? {
          transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        }
      : {}),
    width: "100px",
    height: "20px",
    fontSize: "14px",
  };

  const draggableButton = props.isDropped ? (
    <div ref={setNodeRef}>
      <Button
        style={style}
        dragging={isDragging}
        {...listeners}
        {...attributes}
      >
        {props.children}
      </Button>
    </div>
  ) : (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="mx-1 rounded-lg bg-red-900 text-white"
    >
      {props.children}
    </button>
  );

  return draggableButton;
}

export default Draggable;
