import React, { useEffect } from "react";

const useMouseover = (ref: React.RefObject<HTMLDivElement>) => {
  useEffect(() => {
    if (!ref.current) return;

    let eventListening = false;

    const onMove = (ev: MouseEvent) => {
      if (!ref.current) return;
      const rec = ref.current.getBoundingClientRect();
      let x = (ev.x - rec.x) / rec.width;
      let y = (ev.y - rec.y) / rec.height;
      ref.current.style.setProperty("--mx", x.toString());
      ref.current.style.setProperty("--my", y.toString());
    };

    const Observer = new IntersectionObserver(
      ([entry]: any[]) => {
        // if(entry.isIntersecting)
        if (entry.isIntersecting) {
          eventListening = true;
          ref.current?.addEventListener("mousemove", onMove);
        } else {
          eventListening = false;
          ref.current?.removeEventListener("mousemove", onMove);
        }
      },
      {
        root: null, // default: use viewport
        rootMargin: "0px",
        threshold: 0,
      }
    );

    Observer.observe(ref.current);

    return () => {
      ref.current && Observer.unobserve(ref.current);
      if (eventListening)
        ref.current && ref.current.addEventListener("mousemove", onMove);
    };
  }, [ref]);

  return {};
};

export default useMouseover;
