import { DndContext } from "@dnd-kit/core";
import { useState } from "react";
import Draggable from "./Draggable.jsx";
import Droppable from "./Droppable.jsx";

function App() {
  const containers = ["A", "B", "C"];
  const [parent, setParent] = useState(null);
  const draggableMarkup = <Draggable id="draggable">Drag me</Draggable>;

  return (
    <>
      <h1>dndKit</h1>
      <DndContext onDragEnd={handleDragEnd}>
        {parent === null ? draggableMarkup : null}
        {containers.map((id) => (
          <Droppable key={id} id={id}>
            {parent === id ? draggableMarkup : "Drop here"}
          </Droppable>
        ))}
      </DndContext>
    </>
  );

  function handleDragEnd(event) {
    const { over } = event;

    setParent(over ? over.id : null);
  }
}

export default App;
