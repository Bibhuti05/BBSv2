import { useState, useCallback } from "react";
import styles from './hover.module.css'

function throttle(func, delay) {
  let lastCall = 0;
  return (...args) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func.apply(this, args);
  };
}

const TiltEffect = ({children}) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });


  const onMouseMove = useCallback(
    throttle((e) => {
      const card = e.currentTarget;
      const box = card.getBoundingClientRect();
      const x = e.clientX - box.left;
      const y = e.clientY - box.top;
      const centerX = box.width / 2;
      const centerY = box.height / 2;
      const rotateX = (y - centerY) / 100;
      const rotateY = (centerX - x) / 100;

        // const gradient = document.getElementById("gradient");
        // const p = e.clientX;
        // const d = e.clientY;
        // gradient.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px, rgba(0,225,0,.12) 0%, transparent 90%)`;
      setRotate({ x: rotateX, y: rotateY });
    }, 100),
    []
  );

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <>
    <div
      className={styles.card}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`,
        transition: "all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s",
      }}
    >
      <div className={styles.pulse} />
      <div className={styles.content} id={'gradient'}>
        {children}
      </div>
    </div>
    </>
  );
};

export default TiltEffect;