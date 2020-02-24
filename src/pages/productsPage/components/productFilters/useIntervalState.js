import { useState, useEffect, useRef } from 'react';

// export default () => {
//   const [count, setCount] = useState(0);

//   useInterval(() => {
//     // Your custom logic here
//     setCount(count + 1);
//   }, 1000);
// };

export default (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
