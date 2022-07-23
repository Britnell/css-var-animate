import * as React from "react";
import { asStr, round, limit } from "./util";

type callbackProps = {
  top: number;
  bottom: number;
  scroll: number;
  view: number;
};

type classCheckReturn = {
  res: boolean;
  classTrue?: string;
  classFalse?: string;
};

type extraCssVars = {
  [key: string]: string | number;
};

type targetType = {
  ref: React.RefObject<HTMLDivElement>;
  threshold?: (props: callbackProps) => classCheckReturn;
  customVars?: (props: callbackProps) => extraCssVars | void;
  unwatch?: boolean;
};

const checkItemScroll = (item: targetType) => {
  if (!item.ref.current) return;
  // * Calc Scroll vals
  const rec = item.ref.current.getBoundingClientRect();
  const h = window.innerHeight;
  const scrollMax = h + rec.height;
  let top = limit(h - rec.top, 0, h) / h;
  let bottom = limit(h - rec.top - rec.height, 0, h) / h;
  let scroll = limit(h - rec.top, 0, scrollMax);
  let view = scroll / scrollMax;

  top = round(top);
  bottom = round(bottom);
  view = round(view);

  // * apply conditional classes
  if (item.threshold) {
    const { res, classFalse, classTrue } = item.threshold({
      top,
      bottom,
      scroll,
      view,
    });
    const remove = res ? classFalse : classTrue;
    const add = res ? classTrue : classFalse;
    remove && item.ref.current.classList.remove(remove);
    add && item.ref.current.classList.add(add);
  }

  // write prop
  if (item.customVars) {
    const customs =
      item.customVars({
        top,
        bottom,
        view,
        scroll,
      }) || {};
    Object.keys(customs).forEach((key) => {
      item.ref.current?.style.setProperty(key, asStr(customs[key]));
    });
  } else {
    item.ref.current.style.setProperty("--v", asStr(view));
    item.ref.current.style.setProperty("--s", asStr(scroll));
  }
};

const useScroller = (target: targetType) => {
  const observed = React.useRef(target);
  const animationRef = React.useRef<number>();

  React.useEffect(() => {
    let scroll,
      last = 0;

    // * Observer

    const checkEntry = (entry: any) => {
      observed.current.unwatch = !entry.isIntersecting;
      // console.log(entry);
      if (entry.isIntersecting)
        animationRef.current = requestAnimationFrame(loop);
    };

    const Observer = new IntersectionObserver(
      (entries: any[]) => {
        entries.forEach(checkEntry);
      },
      {
        root: null, // default: use viewport
        rootMargin: "0px",
        threshold: 0,
      }
    );

    observed.current.ref.current &&
      Observer.observe(observed.current.ref.current);

    const loop = () => {
      const y = Math.floor(window.scrollY);
      if (y !== last) {
        checkItemScroll(observed.current);
        last = y;
      }
      if (!observed.current.unwatch)
        animationRef.current = requestAnimationFrame(loop);
    };

    // * Run on load to initialise vars
    checkItemScroll(observed.current);

    // ** use Effect
    return () => {
      animationRef.current && cancelAnimationFrame(animationRef.current);
      observed.current.ref.current &&
        Observer.unobserve(observed.current.ref.current);
    };
  }, [observed, animationRef]);

  // * Eo useScroller
};

export default useScroller;
