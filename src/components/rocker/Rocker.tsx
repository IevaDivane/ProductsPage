import React, { useState } from 'react';
import style from './Rocker.module.scss';

const Rocker = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div className={style.productsButtons}>
      <button
        disabled={count === 0}
        className={style.productsButton}
        onClick={() => {
          setCount(count - 1);
        }}
      >
        -
      </button>
      <input
        type="number"
        className={count === 0 ? style.productsInputGrey : style.productsInput}
        value={count}
        onChange={(e) => {
          setCount(Number(e.target.value));
        }}
      />
      <button
        className={style.productsButton}
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button>
    </div>
  );
};

export default Rocker;
