import { DndContext } from "@dnd-kit/core";
import { useState } from "react";
import Draggable from "./Draggable.jsx";
import Droppable from "./Droppable.jsx";

import "./main.css";

function App() {
  const containers = ["A", "B", "C"];
  const [parent, setParent] = useState(null);
  const draggableMarkup = <Draggable id="draggable">Drag me</Draggable>;

  return (
    <>
      <h1>dndKit</h1>
      <DndContext onDragEnd={handleDragEnd}>
        {parent === null ? draggableMarkup : null}
        <div className="grid grid-cols-2 gap-2 p-4">
          {containers.map((id) => (
            <Droppable key={id} id={id}>
              {parent === id ? draggableMarkup : "Drop here"}
            </Droppable>
          ))}
        </div>
      </DndContext>
    </>
  );

  function handleDragEnd(event) {
    const { over } = event;

    setParent(over ? over.id : null);
  }
}

export default App;
