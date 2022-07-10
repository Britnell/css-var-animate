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

type startProps = {
  ref: React.RefObject<HTMLDivElement>;
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
    active: boolean;
    ref: React.RefObject<HTMLDivElement>;
    id: string;
    easingFunction: (x: number) => number;
  };
};

const useCounter = () => {
  const requestRef = useRef<number>();
  const counterRef = useRef<counterType>({});

  const frameLoop = () => {
    if (Object.keys(counterRef.current).length > 0) {
      Object.values(counterRef.current).forEach((counter) => {
        const { active, begin, ms, id, easingFunction } = counter;
        if (!active) return;
        const t = Date.now() - begin;
        let p = t / ms;
        if (p > 1.0) p = 1.0;
        const val = easingFunction(p);
        if (counter.ref.current)
          counter.ref.current.style.setProperty(id, asStr(val));
        // End
        if (t >= ms) counter.active = false;
      });
    }
    requestRef.current = requestAnimationFrame(frameLoop);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(frameLoop);
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
      active: true,
      ms,
      id,
      ref,
      easingFunction,
    };
  };

  return { start };
};

export default useCounter;
