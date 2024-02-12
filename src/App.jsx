import { DndContext } from "@dnd-kit/core";
import { useState } from "react";
import Draggable from "./Draggable.jsx";
import Droppable from "./Droppable.jsx";

import "./main.css";

function App() {
  // droppable item list
  const containers = [
    "droppable-1",
    "droppable-2",
    "droppable-3",
    "droppable-4",
  ];

  // droppable item にドロップされているitemのid
  const [parent, setParent] = useState({
    "droppable-1": null,
    "droppable-2": null,
    "droppable-3": null,
    "droppable-4": null,
  });

  // draggable item list
  const [draggables, setDraggables] = useState([
    { id: "draggable-1", content: "Drag me 1" },
    { id: "draggable-2", content: "Drag me 2" },
    { id: "draggable-3", content: "Drag me 3" },
    { id: "draggable-4", content: "Drag me 4" },
  ]);

  return (
    <>
      <h1>dndKit</h1>
      <DndContext onDragEnd={handleDragEnd}>
        <div>
          {draggables
            .filter((drag) => !Object.values(parent).includes(drag.id))
            .map((drag) => (
              <Draggable key={drag.id} id={drag.id}>
                {drag.content}
              </Draggable>
            ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {containers.map((containerId) => (
            <Droppable key={containerId} id={containerId}>
              {parent[containerId]
                ? draggables
                    .filter((drag) => drag.id === parent[containerId])
                    .map((filteredDrag) => (
                      <Draggable key={filteredDrag.id} id={filteredDrag.id}>
                        {filteredDrag.content}
                      </Draggable>
                    ))
                : "Drop here"}
            </Droppable>
          ))}
        </div>
      </DndContext>
    </>
  );

  function handleDragEnd(event) {
    // active:ドラッグ要素, over:ドラッグ先
    const { active, over } = event;

    // 枠内にドラッグ&ドロップされた場合
    if (over) {
      console.log(event);
      setParent((prevParent) => ({
        ...prevParent,
        [over.id]: active.id,
      }));
    } else {
      // 枠外にドラッグ&ドロップされた場合
      console.log(event);
      const newParent = Object.keys(parent).reduce((acc, key) => {
        if (parent[key] === active.id) {
          acc[key] = null;
        } else {
          acc[key] = parent[key];
        }
        return acc;
      }, {});
      setParent(newParent);
    }
  }
}

export default App;
