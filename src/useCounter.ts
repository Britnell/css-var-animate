import React, { useEffect, useRef } from "react";
import Bezier from "bezier-easing";
import { asStr } from "./util";

// 5ms interval for framerate

const defaultEasings = {
  linear: [0, 0, 1, 1],
  "ease-in": [0.6, 0, 1, 1],
  "ease-out": [0, 0, 0.6, 1],
  "ease-in-out": [1, 0, 0, 1],
};

type refType = React.RefObject<HTMLDivElement | HTMLButtonElement>;

type startProps = {
  ref: refType;
  id: string;
  ms?: number;
  bezier?: number[];
  easing?: "linear" | "ease-in" | "ease-out" | "ease-in-out";
};

type counterType = {
  [id: string]: {
    t?: number;
    begin: number;
    ms: number;
    ref: refType;
    id: string;
    easingFunction: (x: number) => number;
  };
};

const useCounter = () => {
  const requestRef = useRef<number>();
  const counterRef = useRef<counterType>({});

  const frameLoop = () => {
    // if counters obj empty , break loop
    if (Object.keys(counterRef.current).length === 0) return;

    // * loop through counters
    Object.keys(counterRef.current).forEach((key) => {
      const { begin, ms, id, easingFunction, ref } = counterRef.current[key];

      const time = Date.now() - begin;
      let fraction = time / ms;
      if (fraction > 1.0) fraction = 1.0;
      const val = easingFunction(fraction);

      ref.current && ref.current.style.setProperty(id, asStr(val));

      // * End
      if (time >= ms) {
        delete counterRef.current[key];
      }
    });

    // * Loop
    requestRef.current = requestAnimationFrame(frameLoop);
  };

  useEffect(() => {
    return () => {
      requestRef.current && cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const start = ({
    ref,
    id,
    ms = 1000,
    bezier,
    easing = "linear",
  }: startProps) => {
    let curve;
    if (bezier) curve = bezier;
    else curve = defaultEasings[easing];

    const easingFunction = Bezier(curve[0], curve[1], curve[2], curve[3]);

    counterRef.current[id] = {
      begin: Date.now(),
      ms,
      id,
      ref,
      easingFunction,
    };

    requestRef.current = requestAnimationFrame(frameLoop);
  };

  return { start };
};

export default useCounter;
