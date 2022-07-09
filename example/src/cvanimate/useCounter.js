import { useRef } from "react";
import Bezier from "bezier-easing";

// 5ms interval for framerate
const intvl = 0.02;

const defaultEasings = {
  linear: [0, 0, 1, 1],
  "ease-in-out": [1, 0, 0, 1],
  "ease-in": [0.6, 0, 1, 1],
  "ease-out": [0, 0, 0.6, 1],
};

const useCounter = (ref) => {
  const timer = useRef();

  const start = ({ name = "--x", T = 1.0, unit = "", easing, bezier }) => {
    const steps = T / intvl;
    const perStep = 100 / steps;
    const cubicBezier = bezier || defaultEasings[easing] || [1, 0, 0, 1];
    const easeF = Bezier(...cubicBezier);

    if (timer.current) {
      clearInterval(timer.current);
      timer.current = 0;
    }

    let x = 0;
    if (ref.current) ref.current.style.setProperty(name, 0 + unit);

    timer.current = setInterval(() => {
      x += perStep;
      // x : [ 0 to 100 ]
      const ease = easeF(x / 100);

      if (x >= 100) {
        x = 100;
        clearInterval(timer.current);
      }
      if (ref.current) ref.current.style.setProperty(name, ease * 100 + unit);
    }, intvl * 1000);
  };

  return { start };
};

export default useCounter;
