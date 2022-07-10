import React, { useRef } from "react";
import Bezier from "bezier-easing";

// 5ms interval for framerate
const intvl = 0.02;

const defaultEasings = {
  linear: [0, 0, 1, 1],
  "ease-in-out": [1, 0, 0, 1],
  "ease-in": [0.6, 0, 1, 1],
  "ease-out": [0, 0, 0.6, 1],
};

type startProps = {
  name?: string;
  T: number;
  unit?: string;
  bezier?: number[];
  easing?: "linear" | "ease-in" | "ease-out";
};

const useCounter = (ref: React.RefObject<HTMLDivElement>) => {
  const timer = useRef<NodeJS.Timer | null>();

  const start = ({
    name = "--x",
    T = 1.0,
    unit = "",
    easing,
    bezier,
  }: startProps) => {
    const steps = T / intvl;
    const perStep = 100 / steps;
    const cubicBezier = bezier ||
      (easing && defaultEasings[easing]) || [1, 0, 0, 1];

    const easeF = Bezier(
      cubicBezier[0],
      cubicBezier[1],
      cubicBezier[2],
      cubicBezier[3]
    );

    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }

    let x = 0;
    if (ref.current) ref.current.style.setProperty(name, 0 + unit);

    timer.current = setInterval(() => {
      x += perStep;
      // x : [ 0 to 100 ]
      const ease = easeF(x / 100);

      if (x >= 100) {
        x = 100;
        timer.current && clearInterval(timer.current);
      }
      if (ref.current) ref.current.style.setProperty(name, ease * 100 + unit);
    }, intvl * 1000);
  };

  return { start };
};

export default useCounter;
