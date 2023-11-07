import React, { useState } from 'react';

export default function AppCRUDB02() {

  const onError = (v, msg) => alert(v + ': ' + msg);


  return (
    <div>
      <Count onError={onError} />
      <Count startNum={3} min={-5} onError={onError} />
      <Count startNum={-2} min={-3} max={3} onError={onError} />
    </div>
  );
}

const Count = ({startNum=0, min = 0, max = 5, onError }) => {
  const [count, setCount] = useState(startNum);

  return (
    <div>
      {count}
      <button
        onClick={() => {
          if (count >= max) onError(count, '상한 범위를 벗어남');
          else setCount(count + 1);
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          if (count <= min) onError(count, '하한 범위를 벗어남');
          else setCount(count - 1);
        }}
      >
        -
      </button>
    </div>
  );
};
