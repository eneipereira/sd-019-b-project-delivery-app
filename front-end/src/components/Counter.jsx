import React from 'react';
import '../styles/components/counter.css';

function Counter() {
  const [counter, setCounter] = React.useState(0);

  const decrement = () => {
    setCounter(counter - 1);
    localStorage.setItem('counter', counter - 1);
    if (counter <= 0) {
      setCounter(0);
      localStorage.setItem('counter', 0);
    }
  };

  const increment = () => {
    setCounter(counter + 1);
    localStorage.setItem('counter', counter + 1);
  };

  return (
    <div className="counter-container">
      <button
        className="counter-button"
        type="button"
        data-testid="customer_products__button-decrement-product"
        onClick={ decrement }
      >
        -
      </button>
      <p
        className="counter-number"
        data-testid="counter-value"
      >
        {counter}
      </p>
      <button
        className="counter-button"
        type="button"
        data-testid="customer_products__button-increment-product"
        onClick={ increment }
        value={ counter }
      >
        +
      </button>
    </div>
  );
}

export default Counter;
