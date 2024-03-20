import { DndContext, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
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
  const [droppables, setDroppables] = useState({
    "droppable-1": null,
    "droppable-2": null,
    "droppable-3": null,
    "droppable-4": null,
  });

  // droppable item にドロップされたかどうか
  const [dropped, setDropped] = useState({
    "droppable-1": false,
    "droppable-2": false,
    "droppable-3": false,
    "droppable-4": false,
  });

  // draggable item のリスト
  const [draggables, setDraggables] = useState([
    { id: "draggable-1", content: "Drag me 1" },
    { id: "draggable-2", content: "Drag me 2" },
    { id: "draggable-3", content: "Drag me 3" },
    { id: "draggable-4", content: "Drag me 4" },
  ]);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 0,
    },
  });

  const sensors = useSensors(mouseSensor);

  return (
    <>
      <h1 className="text-lg font-bold">dnd-Kit Example</h1>
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        {/* ドラッグ元 */}
        <div>
          {draggables
            .filter((drag) => !Object.values(droppables).includes(drag.id))
            .map((drag) => (
              <Draggable key={drag.id} id={drag.id}>
                {drag.content}
              </Draggable>
            ))}
        </div>
        {/* ドラッグ先 */}
        <div className="grid grid-cols-2 gap-2">
          {containers.map((containerId) => (
            <Droppable key={containerId} id={containerId}>
              {droppables[containerId]
                ? draggables
                    .filter((drag) => drag.id === droppables[containerId])
                    .map((filteredDrag) => (
                      <Draggable
                        key={filteredDrag.id}
                        id={filteredDrag.id}
                        isDropped={dropped[containerId]}
                      >
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
      setDroppables((prevDroppable) => {
        const newDroppables = Object.keys(prevDroppable).reduce((accumulator, key) => {
          // ドラッグ&ドロップ元からドラッグ要素を削除する
          accumulator[key] =
            prevDroppable[key] === active.id ? null : prevDroppable[key];
          return accumulator;
        }, {});

        // 新しいドラッグ&ドロップ先にドラッグ要素を設定する
        newDroppables[over.id] = active.id;

        return newDroppables;
      });

      setDropped((prevDropped) => {
        const newDropped = { ...prevDropped };
        newDropped[over.id] = true;
        return newDropped;
      });
    } else {
      // 枠外にドラッグ&ドロップされた場合
      console.log(event);
      const newParent = Object.keys(droppables).reduce((acc, key) => {
        if (droppables[key] === active.id) {
          acc[key] = null;
        } else {
          acc[key] = droppables[key];
        }
        return acc;
      }, {});
      setDroppables(newParent);
    }
  }
}

export default App;
