"use client";

import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(1);

  const increment = () => {
    if (count < 5) {
      setCount(count + 1);
    }
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div>
      <button onClick={decrement} disabled={count === 1}>
        -
      </button>

      <span style={{ margin: "0 15px" }}>{count}</span>

      <button onClick={increment} disabled={count === 5}>
        +
      </button>

      {count === 5 && <p>You cannot order more than 5 units.</p>}
    </div>
  );
}
