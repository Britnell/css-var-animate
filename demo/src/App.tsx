import React, { useRef } from "react";
import "./App.css";

import { useScroller, useCounter, useMouseover } from "css-var-animate";
// import { useScroller, useCounter, useMouseover } from "./src/index";
// import { useScroller, useCounter, useMouseover } from "./dist/index";

const Scroller = () => {
  const elRef = useRef<HTMLDivElement>(null);
  const secRef = useRef<HTMLDivElement>(null);
  const thirdRef = useRef<HTMLDivElement>(null);
  const fourRef = useRef<HTMLDivElement>(null);
  const allRef = useRef<HTMLDivElement>(null);
  const pacRef = useRef<HTMLDivElement>(null);
  const threshRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const rollRef = useRef<HTMLDivElement>(null);

  const blingRef = useRef<HTMLButtonElement>(null);
  const countRef = useRef<HTMLDivElement>(null);

  const mouseRef = useRef<HTMLDivElement>(null);
  const bingoRef = useRef<HTMLDivElement>(null);

  const { start } = useCounter();

  useMouseover(mouseRef);
  useMouseover(bingoRef);

  useScroller({ ref: elRef });
  useScroller({ ref: secRef });
  useScroller({ ref: thirdRef });
  useScroller({ ref: fourRef });
  useScroller({
    ref: allRef,
    customVars: ({ view, scroll, top, bottom }) => {
      return {
        "--s": scroll,
        "--v": view,
        "--t": top,
        "--b": bottom,
      };
    },
  });

  useScroller({
    ref: pacRef,
    customVars: ({ view, scroll }) => {
      const p = view * 100;
      const period = 100 / 10;
      const cycle = Math.floor(p / period) % 2 === 0;
      const val = cycle ? p % period : period - (p % period);
      return {
        "--v": view,
        "--a": val,
      };
    },
  });

  useScroller({
    ref: threshRef,
    threshold: ({ top }) => ({
      res: top > 0.5,
      classTrue: "after",
      classFalse: "before",
    }),
  });

  useScroller({
    ref: fadeRef,
    threshold: ({ top }) => ({
      res: top > 0.5,
      classTrue: "fadeIn",
    }),
  });

  useScroller({
    ref: rollRef,
    threshold: ({ top }) => ({
      res: top > 0.2,
      classTrue: "rollIn",
      classFalse: "rollOut",
    }),
  });

  return (
    <div className="container">
      <h1>CSS Var Animate</h1>
      <p className="info">
        Welcome to this simple animation lib. This uses js to animate css
        variables for animations.
      </p>
      <h2>useCount</h2>
      <p className="info">
        CSS variables can be great for simplifying styles, and separating styles
        from js. They can now even be animated, however only when we specify the
        number type with{" "}
        <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@property">
          @property
        </a>
        . This however does not yet have quite enough browser support, so here
        is a super simple js library to do that.
      </p>
      <div className="count" ref={countRef}>
        <h4>Counter Example - </h4>
        <div className="box">
          <div className="bar"></div>
        </div>
        <div className="buttons">
          <button
            onClick={() => {
              start({
                ref: countRef,
                id: "--x",
                ms: 1000,
              });
            }}
          >
            Linear
          </button>
          <button
            onClick={() => {
              start({
                ref: countRef,
                id: "--x",
                ms: 1000,
                easing: "ease-in-out",
                // bezier: [1, 0, 0, 1],
              });
            }}
          >
            Ease in out
          </button>
        </div>
      </div>
      <p className="info">
        Now you can use this to animate any style with a css var, that would
        otherwise be impossible (?) or tricky. Let's have a go at the material
        UI button bling bling, this example is from{" "}
        <a href="https://lea.verou.me/"> Lea Verou</a>
      </p>

      <button
        ref={blingRef}
        className="bling"
        onPointerDown={(ev: React.MouseEvent<HTMLButtonElement>) => {
          const target = ev.currentTarget;
          const rect = target.getBoundingClientRect();
          let x = (ev.clientX - rect.left) / rect.width;
          let y = (ev.clientY - rect.top) / rect.height;
          target.style.setProperty("--mx", x.toString());
          target.style.setProperty("--my", y.toString());
          target.style.setProperty("--tr", "0");
        }}
        onPointerUp={() => {
          start({ ref: blingRef, id: "--tr", ms: 400 });
        }}
      >
        Submit
      </button>

      <h2>useMouseOver</h2>

      <p className="info">
        To get the relative position of the mouse over an element use{" "}
        <span className="code">useMouseOver(ref)</span> and pass it the ref of
        the element that the event should listen to. it will also apply the css
        vars to this element. <span className="code">--mx</span> and{" "}
        <span className="code">--my</span>
      </p>
      <div ref={mouseRef} className="mouseover">
        <span> - </span>
      </div>

      <p className="info">
        Now use that animate anything you want, e.g. this background gradient.
      </p>
      <div className="mousebling">
        <div ref={bingoRef}>
          <button>Bingo</button>
        </div>
      </div>

      <h2>useScroll</h2>
      <p className="info">A react hook to animate a css variable on Scroll.</p>
      <p className="info">
        All it needs is a ref to the element you want to be observed. I tend to
        use a container not the element itself.
      </p>
      <p className="code">{`useScroller({ ref: elRef });`}</p>

      <p className="info">
        The basic ( and default) functionality of useScroll is to calculate the
        relative scroll position. By default this is a normalised percentage
        from the moment it is first visible to the moment it scrolls out of view
        <br />
        <span className="code">
          0 = Top of element is at (or below) bottom of scroll Window
        </span>
        <br />
        and
        <br />
        <span className="code">
          1.0 = Bottom of element is at (or above) top of scroll window.
        </span>
      </p>
      <p className="info">
        i.e. from the beginning to the end of the moment the element is within
        the scroll window.
        <br />
        See the rect below. By default this variable is applied as
        <span className="code">"--v" : [ 0 to 1.0 ]</span>
      </p>
      <div ref={elRef} className="sc1"></div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
        interdum maximus libero, in ornare nunc tincidunt sit amet. Ut efficitur
        maximus molestie. Phasellus sed egestas elit, sed pharetra erat. Vivamus
        et facilisis dui.
      </p>
      <p className="info">
        We can animate or style anything in CSS with this custom prop. <br />
        E.g. move a block from the left to the right. Just transform using
        <span className="code">var(--v)</span> and use transition to smoothen
        out the movement
      </p>
      <p className="code">transition: transform 0.1s linear</p>
      <div className="second" ref={secRef}>
        <div className="slide"></div>
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
        interdum maximus libero, in ornare nunc tincidunt sit amet. Ut efficitur
        maximus molestie. Phasellus sed egestas elit, sed pharetra erat. Vivamus
        et facilisis dui.
      </p>
      <div className="second" ref={thirdRef}>
        <div className="ball"></div>
      </div>
      <h2>Percentage vs Scroll distance</h2>
      <p className="info">
        As in the example above, when we are animating with relative values our
        elements will always go from point A to point B. But this means that the
        animation's distance / speed will vary with screen width and/or height.
      </p>
      <p className="info">
        E.g. our ball above will always roll from the left to the right side of
        screen, for the duration of us scrolling. When animations need to run at
        a fixed rate, or two animations in sync, we can achieve constant
        movement using the scroll distance
        <span className="code">--s (scroll)</span> as a fixed distance rather
        than relative measure. The drawback here is we cannot guarantee the
        length / distance of the animation, i.e. the ball will not always reach
        the right side of the screen, or go out of the screen too early.
      </p>
      <p className="info">
        So we can rewrite the rolling ball animation using --s, see how it is
        constant over varying screen sizes.
      </p>
      <div className="second" ref={fourRef}>
        <div className="balltwo"></div>
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
        interdum maximus libero, in ornare nunc tincidunt sit amet. Ut efficitur
        maximus molestie. Phasellus sed egestas elit, sed pharetra erat. Vivamus
        et facilisis dui.
      </p>
      <h2>Default vars</h2>
      <p className="info">
        By default <span className="code">view --v</span> and{" "}
        <span className="code">scroll --s</span> are applied to the element, but
        you can customise this with the <span className="code">customVars</span>{" "}
        callback. This receives an additional <span className="code">top</span>{" "}
        and <span className="code">bottom</span> which vary from 0 to 1 as the
        top and bottom edge of the element each go from the bottom to the top of
        the window during scroll. To apply all variables to an element return
        them from the customVars callback as follows.
      </p>
      <p className="code block">
        {`useScroller({ 
  ref: elRef,
  customVars: ({ view, scroll, top, bottom }) => {
    return {
      "--s": scroll,
      "--v": view,
      "--t": top,
      "--b": bottom
    };
  },
});`}
      </p>
      <p className="info">
        Demonstrated aon the object below, inspect the element to watch the
        behaviour of the various values.
      </p>
      <div className="all" ref={allRef}></div>

      <h2>Custom Vars</h2>
      <p className="info">
        You can use the same function to apply extra custom variables by
        returning them from the function. Certain calculations can get tricky in
        pure CSS when we dont have access to things like '% modulus' operator or
        trigonometry sin(), cos() etc.
      </p>
      <p className="info">
        I know the first thing you are thinking is : Pacman on scroll animation.
        And yes, we can do that now. With hardly any js we can make him open and
        close his mouth repeatedly as he moves over the screen.
      </p>
      <div ref={pacRef} className="pacman_container">
        <div className="dots"> </div>
        <div className="pacman"> </div>
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
        interdum maximus libero, in ornare nunc tincidunt sit amet. Ut efficitur
        maximus molestie. Phasellus sed egestas elit, sed pharetra erat. Vivamus
        et facilisis dui.
      </p>
      <h2>Thresholds</h2>
      <p className="info">
        In many cases however you might only want to trigger an animation when
        an item scrolls into view at a particular point. For this you can add a
        callback function to the object called threshold. This receives all the
        same arguments as the customVars callback above : scroll, view, top &
        bottom. So you have all the references needed to trigger your change at
        just the right time.
      </p>
      <p className="code block">
        {`useScroller({ 
  ref: elRef,
  threshold: ({ top }) => ({
      res: top > 0.5,
      classTrue: "rollIn",
      classFalse: "rollOut",
    }), 
});`}
      </p>

      <p className="info">
        The callback needs to return an object with a result{" "}
        <span className="code">res</span> - a boolean that evaluates if the
        element is above or below the threshold, as well as the classes{" "}
        <span className="code">classTrue</span> and or{" "}
        <span className="code">classFalse</span> which should be applied in each
        case.
      </p>
      <div ref={threshRef} className="thresh"></div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
        interdum maximus libero, in ornare nunc tincidunt sit amet. Ut efficitur
        maximus molestie. Phasellus sed egestas elit, sed pharetra erat. Vivamus
        et facilisis dui.
      </p>
      <div ref={fadeRef} className="fade">
        <span>KERPOW!</span>
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
        interdum maximus libero, in ornare nunc tincidunt sit amet. Ut efficitur
        maximus molestie. Phasellus sed egestas elit, sed pharetra erat. Vivamus
        et facilisis dui.
      </p>
      <div ref={rollRef} className="roller">
        <span className="q1">
          <span className="q2">
            <span className="q3">
              <span className="q4">B</span>
            </span>
          </span>
        </span>
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
        interdum maximus libero, in ornare nunc tincidunt sit amet. Ut efficitur
        maximus molestie. Phasellus sed egestas elit, sed pharetra erat. Vivamus
        et facilisis dui. Etiam id neque quis sapien rutrum vulputate vitae sit
        amet tellus. Morbi a feugiat erat, at finibus dui. Fusce feugiat eros in
        ex mattis tempus. Suspendisse ullamcorper tellus at est tempor,
        tristique egestas neque hendrerit. Nunc massa leo, sodales at nisl
        finibus, porta sagittis magna. Nunc ultrices rutrum viverra.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
        interdum maximus libero, in ornare nunc tincidunt sit amet. Ut efficitur
        maximus molestie. Phasellus sed egestas elit, sed pharetra erat. Vivamus
        et facilisis dui. Etiam id neque quis sapien rutrum vulputate vitae sit
        amet tellus. Morbi a feugiat erat, at finibus dui. Fusce feugiat eros in
        ex mattis tempus. Suspendisse ullamcorper tellus at est tempor,
        tristique egestas neque hendrerit. Nunc massa leo, sodales at nisl
        finibus, porta sagittis magna. Nunc ultrices rutrum viverra.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
        interdum maximus libero, in ornare nunc tincidunt sit amet. Ut efficitur
        maximus molestie. Phasellus sed egestas elit, sed pharetra erat. Vivamus
        et facilisis dui. Etiam id neque quis sapien rutrum vulputate vitae sit
        amet tellus. Morbi a feugiat erat, at finibus dui. Fusce feugiat eros in
        ex mattis tempus. Suspendisse ullamcorper tellus at est tempor,
        tristique egestas neque hendrerit. Nunc massa leo, sodales at nisl
        finibus, porta sagittis magna. Nunc ultrices rutrum viverra.
      </p>
    </div>
  );
};

export default Scroller;
