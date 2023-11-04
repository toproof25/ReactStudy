import React from 'react';
import { useState } from 'react';

export default function AppMidleTest() {

  /*
    2학년 2학기 웹개발응용 중간고사 마지막 문제 코드
    (내가 작성했던 그대로 작성함)
  */

  const database = [
    {
      title: '애니메이션',
      images: ['./images/movie1.png', './images/movie2.png', './images/movie3.png',
                './images/movie4.png', './images/movie5.png', './images/movie6.png',
                './images/movie7.png', './images/movie8.png'],
    },
  ];

  return (
    <div>
      {database.map((x) => (
        <ImageView title={x.title} images={x.images} />
      ))}
    </div>
  );
}

const ImageView = ({ title, images }) => {
  return (
    <div>
      <div>{title}</div>
      {images.map((x) => (
        <ImageCss src={x} />
      ))}
    </div>
  );
};

const ImageCss = ({ src }) => {
  const [num, setNum] = useState(1);
  console.log(src);
  return (
    <span>
      <img
        src={src}
        alt={src + '없어'}
        onClick={() => setNum(num * -1)}
        width="150px"
        height="200px"
        style={{ filter: num > 0 ? 'blur(0)': 'blur(5px)', margin: '5px' }}
      />
    </span>
  );
};
