import { useEffect, useState } from "react";
import * as React from "react";
import { getRaf, asStr } from "./util";

type callbackProps = {
  scroll: number;
  scrollMax: number;
  perc: number;
  top: number;
  bottom: number;
  element: HTMLElement;
};

type extraCssVars = {
  [key: string]: string | number;
};

type targetType = {
  ref: React.RefObject<HTMLDivElement>;
  classTrue?: string;
  classFalse?: string;
  classChecker?: (props: callbackProps) => boolean;
  customVars?: (props: callbackProps) => extraCssVars | void;
  unwatch?: boolean;
};

const useScroller = (targets: targetType[]) => {
  // apply default args to each target
  const [observed] = useState(targets);

  // * * * * * * *
  useEffect(() => {
    // * Animation Frame Event
    const animationFrame = getRaf(window);
    let last = 0;

    const checkItemScroll = (item: targetType) => {
      if (!item.ref.current) return;
      const rec = item.ref.current.getBoundingClientRect();

      // * Calc Scroll vals
      const top = Math.floor(rec.top);
      const bottom = Math.floor(rec.bottom);
      const scrollMax = window.innerHeight + rec.height;

      let scroll = Math.floor(window.innerHeight - rec.top);
      if (rec.top > window.innerHeight) scroll = 0;
      if (scroll > scrollMax) scroll = scrollMax;
      const perc = Math.floor((scroll / scrollMax) * 400) / 400;

      // console.log(" \ts ", scroll, item.ref.current);
      // * apply conditional classes
      if (item.classChecker) {
        const check = item.classChecker({
          scroll,
          scrollMax,
          perc,
          top,
          bottom,
          element: item.ref.current,
        });

        if (item.classFalse) {
          const contains = item.ref.current.classList.contains(item.classFalse);
          if (check && contains)
            item.ref.current.classList.remove(item.classFalse);
          if (!check && !contains)
            item.ref.current.classList.add(item.classFalse);
        }

        if (item.classTrue) {
          const contains = item.ref.current.classList.contains(item.classTrue);
          if (check && !contains)
            item.ref.current.classList.add(item.classTrue);
          if (!check && contains)
            item.ref.current.classList.remove(item.classTrue);
        }
      }

      // write prop
      if (item.customVars) {
        const customs =
          item.customVars({
            perc,
            scroll,
            scrollMax,
            top,
            bottom,
            element: item.ref.current,
          }) || {};
        Object.keys(customs).forEach((key) => {
          item.ref.current?.style.setProperty(key, asStr(customs[key]));
        });
      } else {
        // item.ref.current.style.setProperty("--s-max", asStr(scrollMax));
      }
      item.ref.current.style.setProperty("--p", asStr(perc));
      item.ref.current.style.setProperty("--s", asStr(scroll));
    };

    // run on every scroll pos change
    const scrollLoop = () => {
      observed.forEach((item) => {
        if (!item?.unwatch) checkItemScroll(item);
      });
    };

    // animation Frame loop
    const loop = () => {
      if (window.scrollY !== last) {
        last = window.scrollY;
        scrollLoop();
      }
      animationFrame(loop);
    };

    // * Observer

    const observeCallback = (entries: any[]) => {
      entries.forEach(checkEntry);
    };

    const checkEntry = (entry: any) => {
      // * Observe event
      const observedItem = observed.find(
        (obs) => obs.ref.current === entry.target
      );
      if (!observedItem) return;

      // * out event
      if (!entry.isIntersecting) {
        observedItem.unwatch = true;
        checkItemScroll(observedItem);
        return;
      }

      // * in event
      observedItem.unwatch = false;
      checkItemScroll(observedItem);
    };

    const Observer = new IntersectionObserver(observeCallback, {
      root: null, // default: use viewport
      rootMargin: "0px",
      threshold: 0,
    });

    // Observe
    observed.forEach(({ ref }) => {
      ref.current && Observer.observe(ref.current);
    });

    // Start animation Frame loop
    if (animationFrame) animationFrame(loop);

    // ** use Effect
    return () => {
      // Unobserve
      observed.forEach(
        ({ ref }) => ref.current && Observer.unobserve(ref.current)
      );
    };
  }, [observed]);

  // * Eo useScroller
};

export default useScroller;
