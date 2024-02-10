import { DndContext } from "@dnd-kit/core";
import { useState } from "react";
import Draggable from "./Draggable.jsx";
import Droppable from "./Droppable.jsx";

function App() {
  const containers = ["A", "B", "C"];
  const [isDropped, setIsDropped] = useState(false);
  const draggableMarkup = <Draggable>Drag me</Draggable>;

  return (
    <>
      <h1>dndKit</h1>
      <DndContext onDragEnd={handleDragEnd}>
        {!isDropped ? draggableMarkup : null}
        <Droppable>{isDropped ? draggableMarkup : "Drop here"}</Droppable>
      </DndContext>
    </>
  );

  function handleDragEnd(event) {
    if (event.over && event.over.id === "droppable") {
      setIsDropped(true);
    }
  }
}

export default App;
