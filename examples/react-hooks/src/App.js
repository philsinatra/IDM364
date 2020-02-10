import React, { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [fruit, setFruit] = useState('banana');

  const handleChange = event => {
    // console.log('handleChange');
    // console.log(event.target.value);
    setFruit(event.target.value);
  };

  useEffect(() => {
    document.title = `${fruit} ${count}`;
  });

  return (
    <div>
      <p>You clicked the counter {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click Me</button>

      <p>Your fruit is {fruit}</p>
      <button onClick={() => setFruit('pear')}>Pear Please</button>

      <select
        name="myfruit"
        id="myfruit"
        onChange={event => handleChange(event)}
      >
        <option value="apple">apple</option>
        <option value="grapes">grapes</option>
        <option value="orange">orange</option>
      </select>
    </div>
  );
}

export default App;
