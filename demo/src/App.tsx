import React, { useRef } from "react";
import "./App.css";
import { useScroller, useCounter } from "css-var-animate";

const Scroller = () => {
  const elRef = useRef<HTMLDivElement>(null);
  const secRef = useRef<HTMLDivElement>(null);
  const thirdRef = useRef<HTMLDivElement>(null);
  const fourRef = useRef<HTMLDivElement>(null);
  const pacRef = useRef<HTMLDivElement>(null);
  const threshRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const rollRef = useRef<HTMLDivElement>(null);
  const blingRef = useRef<HTMLButtonElement>(null);

  const countRef = useRef<HTMLDivElement>(null);
  const { start } = useCounter();

  useScroller([
    {
      ref: elRef,
    },
    { ref: secRef },
    { ref: thirdRef },
    { ref: fourRef },
    {
      ref: pacRef,
      customVars: ({ perc }) => {
        const p = perc * 100;
        const period = 100 / 10;
        const cycle = Math.floor(p / period) % 2 === 0;
        const val = cycle ? p % period : period - (p % period);
        return {
          "--a": val,
        };
      },
    },
    {
      ref: threshRef,
      classChecker: ({ top }) => top > window.innerHeight / 2,
      classTrue: "before",
      classFalse: "after",
      customVars: () => {},
    },
    {
      ref: fadeRef,
      classChecker: ({ top }) => top < window.innerHeight / 2,
      classTrue: "fadeIn",
      customVars: () => {},
    },
    {
      ref: rollRef,
      classChecker: ({ top }) => top < window.innerHeight * 0.75,
      classTrue: "rollIn",
      classFalse: "rollOut",
    },
  ]);

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
        No you can use this to animate any style with a css var, that would
        otherwise be impossible or tricky. Let's have a go at the material UI
        button bling bling. This is as per Lea Verou, as she demonstrates this
        in her great course.
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

      <h2>useScroll</h2>
      <p className="info">A react hook to animate a css variable on Scroll.</p>
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
          100 = Bottom of element is at (or above) top of scroll window.
        </span>
      </p>
      <p className="info">
        i.e. from the beginning to the end of the moment the element is within
        the scroll window.
        <br />
        See the rect below. By default this variable is applied as
        <span className="code">"--p" : [ 0 to 100]</span>
      </p>
      <div ref={elRef} className="sc1"></div>
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
      <p className="info">
        We can animate or style anything in CSS with this custom prop. <br />
        E.g. move a block from the left to the right. Just transform using
        <span className="code">var(--p)</span> and use transition to smoothen
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
        As in the example above, when we are animating with
        <span className="code">--p</span> we are likely to end up in situations
        where our animation's distance / speed might vary with screen width
        and/or height.
      </p>
      <p className="info">
        E.g. our ball above is rolling from left to right of screen, during the
        scroll distance of the screen height. When your animation needs to run
        at a fixed rate, or with two animations, it is easy for these to go out
        of sync with varying screen sizes if you dont have fixed distances.
      </p>
      <p className="info">
        <span className="code">--p (percentage)</span> is actually calculated
        from the scrolled distance divided by the full height the item is
        visible for.
      </p>
      <p className="info">
        To achieve constant movement we can use the scroll distance
        <span className="code">--s (scroll)</span> to get a fixed distance
        rather than relative measure. The drawback here is we cannot guarantee
        the length / distance of the animation, which will vary with screen size
        and height.
      </p>
      <p className="info">
        Below is the rolling ball animation using --s, see how it is constant
        over varying screen sizes.
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
      <p className="info">
        I know the first thiing you are thinking is : Pacman on scroll
        animation. And yes, we can do that now.
      </p>
      <div ref={pacRef} className="pac-container">
        <div className="dots"> </div>
        <div className="pacman"> </div>
      </div>
      <p className="info">
        when trying to do more complex animation calculations, like opening and
        closing Pacman's mouth, this can get tricky in CSS when we dont have
        access to things like '% modulus' operator or trigonometry sin(), cos().
      </p>
      <p className="info">
        The initalising object for the target can accept a custom function
        <span className="code">customVars</span> to add extra calculations and
        custom variables. E.g. above we are calculating an --a from --p, which
        is then used to animate the mouth angle.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
        interdum maximus libero, in ornare nunc tincidunt sit amet. Ut efficitur
        maximus molestie. Phasellus sed egestas elit, sed pharetra erat. Vivamus
        et facilisis dui.
      </p>
      <h2>Thresholds</h2>
      <p className="info">
        In many cases however you might only want to trigger an animation when
        an item scrolls into view at a particular point.
      </p>
      <p className="info">
        For this you can use
        <span className="code">classChecker</span>,
        <span className="code">classTrue</span>&
        <span className="code">classFalse</span>. classChecker is a callback
        that will be run on every frame. It must return a boolean that will
        decide if the true or false classes are applied
      </p>
      <p className="info"></p>
      <div ref={threshRef} className="thresh"></div>
      <p className="info">
        Use this to make elements fade in at specific points.
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
