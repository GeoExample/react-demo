import { useEffect, useRef, useState } from "react";

const ITEMS = [
  {
    id: 1,
    title: "Lorem Ipsum 11",
    completed: false,
  },
  {
    id: 2,
    title: "Lorem Ipsum 22",
    completed: true,
  },
  {
    id: 3,
    title: "Lorem Ipsum 33",
    completed: false,
  },
  {
    id: 4,
    title: "Lorem Ipsum 44",
    completed: true,
  },
];

function TodoApp() {
  const [Arr, setArr] = useState(ITEMS);
  const [value, setValue] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function onClickedIt(itemID) {
    const newItems = Arr.map((item) => {
      if (item.id === itemID) {
        item.completed = !item.completed;
      }
      return item;
    });
    setArr(newItems);
  }

  function onAddItem(e) {
    e.preventDefault();

    const newValue = [
      {
        id: Date.now(),
        title: value,
        completed: false,
      },
      ...Arr,
    ];
    setArr(newValue);
    setValue("");
  }

  function onDeleteItem(itemId) {
    setArr(Arr.filter((item) => item.id !== itemId));
  }

  const allItem = Arr.length;
  const allCompleted = Arr.filter((item) => item.completed).length;
  const allCompletedNot = Arr.filter((item) => !item.completed).length;

  return (
    <div>
      <div style={{ padding: "20px" }}>
        <form onSubmit={onAddItem}>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            ref={inputRef}
          />
        </form>
      </div>
      <ul>
        {Arr.map((item) => (
          <li key={item.id} className={item.completed ? "completed" : ""}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => onClickedIt(item.id)}
            />
            {item.title}
            <button onClick={() => onDeleteItem(item.id)}>delete</button>
          </li>
        ))}
      </ul>
      სულ: {allItem}, წარმატებული: {allCompleted}, წარუმატებელი:{" "}
      {allCompletedNot}
    </div>
  );
}

export default TodoApp;
