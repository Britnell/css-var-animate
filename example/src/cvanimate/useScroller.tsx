import { useEffect, useState } from "react";

const getRaf = (window: {
  requestAnimationFrame?: any;
  webkitRequestAnimationFrame?: any;
  mozRequestAnimationFrame?: any;
  msRequestAnimationFrame?: any;
  oRequestAnimationFrame?: any;
}) =>
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  window.oRequestAnimationFrame;

type scrollProps = {
  scroll: number;
  scrollMax: number;
  perc: number;
};

type extraCssVars = {
  name: string;
  val: string | number;
};

type targetType = {
  ref: any;
  classTrue?: string;
  classFalse?: string;
  classChecker?: (props: scrollProps) => boolean;
  disableObserver?: boolean;
  setScroll?: boolean;
  setPercentage?: boolean;
  variator?: (props: scrollProps) => extraCssVars[];
  lastCheck?: boolean;
  watch?: boolean;
};

const defaultValues = ({
  ref,
  classChecker,
  classTrue = "scroll-true",
  classFalse = "scroll-false",
  variator,
  disableObserver = false,
  setScroll = true,
  setPercentage = true,
  watch = false,
}: targetType) => ({
  ref,
  classChecker,
  classTrue,
  classFalse,
  variator,
  disableObserver,
  setScroll,
  setPercentage,
  watch,
});

const useScroller = (targets: targetType[]) => {
  const [observed] = useState(() => targets.map((it) => defaultValues(it)));

  // * * * * * * *
  useEffect(() => {
    // * Animation Frame Event
    const animationFrame = getRaf(window);
    let last = 0;

    const checkItemScroll = (item: targetType) => {
      const rec = item.ref.current.getBoundingClientRect();
      const scrollMax = window.innerHeight + rec.height;

      let scroll;
      scroll = window.innerHeight - rec.top;
      if (rec.top > window.innerHeight) scroll = 0;
      if (scroll > scrollMax) scroll = scrollMax;

      const perc = Math.floor((100 * scroll) / scrollMax);

      if (item.classChecker) {
        const check = item.classChecker({ scroll, scrollMax, perc });
        if (check !== item.lastCheck) {
          if (check) {
            item.ref.current.classList.add(item.classFalse);
            item.ref.current.classList.remove(item.classTrue);
          } else {
            item.ref.current.classList.remove(item.classFalse);
            item.ref.current.classList.add(item.classTrue);
          }
          item.lastCheck = check;
        }
      }

      // write prop
      if (item.setScroll) {
        item.ref.current.style.setProperty("--s", scroll);
        item.ref.current.style.setProperty("--s-max", scrollMax);
      }
      if (item.setPercentage) item.ref.current.style.setProperty("--p", perc);

      if (item.variator) {
        const variators = item.variator({ perc, scroll, scrollMax });
        variators.forEach((variator) => {
          item.ref.current.style.setProperty(variator.name, variator.val);
        });
      }
    };

    // run on every scroll pos change
    const scrollLoop = () => {
      observed.forEach((item) => {
        (item.disableObserver || item.watch) && checkItemScroll(item);
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
        observedItem.watch = false;
        checkItemScroll(observedItem);
        return;
      }

      // * in event
      observedItem.watch = true;
      checkItemScroll(observedItem);
    };

    const Observer = new IntersectionObserver(observeCallback, {
      root: null, // default: use viewport
      rootMargin: "0px",
      threshold: 0,
    });

    // Observe
    observed.forEach(({ ref, disableObserver }) => {
      !disableObserver && ref.current && Observer.observe(ref.current);
    });

    // Start animation Frame loop
    if (animationFrame) animationFrame(loop);

    // ** use Effect
    return () => {
      // Unobserve
      observed.forEach(
        ({ ref, disableObserver }) =>
          !disableObserver && ref.current && Observer.unobserve(ref.current)
      );
    };
  }, [observed]);

  // * Eo useScroller
};

export default useScroller;
