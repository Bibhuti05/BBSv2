import React, { useState, useEffect } from 'react';
import styles from './hero.module.css';
const getRandomSize = () => {
  return window.innerWidth / (Math.floor(Math.random() * (50 - 30 + 1)) + 30); // Random size between 30px and 50px
};

const getOpacity = (x, y) => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
  const maxDistance = Math.sqrt(centerX ** 2 + centerY ** 2);
  return 1.5 - distance / maxDistance; // Calculate opacity based on distance
};

const getNewPosition = (size) => {
  const getRandomNumber = () => {
    const randomValue = Math.floor(Math.random() * 101); // Random number between 0 and 100
    return randomValue < 30 || randomValue > 50 ? randomValue : getRandomNumber(); // Recursively call until condition is met
  };

  const newX = getRandomNumber(); // Get random number for X
  const newY = getRandomNumber(); // Get random number for Y

  return { x: newX, y: newY };
};


const SquareDivs = () => {
  const [squares, setSquares] = useState([]);

  useEffect(() => {
    const newSquares = Array.from({ length: 20 }).map((_, index) => {
      const size = getRandomSize();
      const x = 50;
      const y = 200;
      const rotation = Math.floor(Math.random() * 360); // Random rotation angle
      const opacity = getOpacity(x, y); // Calculate opacity based on distance

      return {
        id: index,
        size,
        x,
        y,
        rotation,
        opacity,
      };
    });

    setSquares(newSquares);

    const interval = setTimeout(() => {
      setSquares((prevSquares) =>
        prevSquares.map((square) => {
          const { x, y, size } = square;
          const { x: newX, y: newY } = getNewPosition(x, y, size);
          const opacity = getOpacity(newX, newY); // Recalculate opacity based on new position

          return {
            ...square,
            x: newX,
            y: newY,
            opacity,
          };
        })
      );
    }, 300); // Update positions every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="container">
      {squares.map((square) => (
        <div
          key={square.id}
          className={styles.square}
          style={{
            width: `${square.size}px`,
            height: `${square.size}px`,
            left: `${square.x}%`,
            top: `${square.y}%`,
            transform: `rotate(${square.rotation}deg)`,
            opacity: square.opacity, // Apply opacity
          }}
        />
      ))}
    </div>
  );
};
export default function Hero() {
  return (
    <div className={styles.Container}>
      <div className={styles.darkover}></div>
      <SquareDivs />
      <div className={styles.introContainer}>
        <h1 className={styles.title}>Hi, I'm Bibhuti</h1>
        <div style = {{
          display:'flex',
          alignItems:'center',
          gap: '10px'

        }}>
    
          <svg
            fill="#ffffff"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="20px"
            viewBox="0 0 395.71 395.71"
            xmlSpace="preserve" // Use camelCase for xml:space
            stroke="#ffffff"
            style={{
              height:'100%',
              aspectRatio: 1,
            }}
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <g>
                <path d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738 c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388 C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191 c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"></path>
              </g>
            </g>
          </svg> 
          <p>Bhopal, India</p>
          
        </div>
        <p>I develop stable and performant apps for web and mobile platforms</p>
      </div>
    </div>
  )
}
