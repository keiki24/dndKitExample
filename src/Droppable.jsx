import React from "react";
import { useDroppable } from "@dnd-kit/core";


function Droppable(props) {
  const { setNodeRef } = useDroppable({ id: props.id });
  return (
    <div
      ref={setNodeRef}
      className="bg-slate-400 min-h-[200px] border-4 border-dashed border-gray-200"
    >
      {props.children}
    </div>
  );
}

export default Droppable;
