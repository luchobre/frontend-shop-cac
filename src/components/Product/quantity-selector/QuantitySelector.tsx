'use client'
import React, { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
}

const QuantitySelector = ({ quantity }: Props) => {

const [count, setCount ] = useState (1)

const addCount = () => {
    if (count <5) {
        setCount(count + 1)
    }
}
const removeCount = () => {
    if (count > 1) {
        setCount(count - 1)
    }
}

  return (
    <div className="flex">
      <button onClick={removeCount}>
        <IoRemoveCircleOutline size={30} />
      </button>
      <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded">{count}</span>
      <button onClick={addCount}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};

export default QuantitySelector;
