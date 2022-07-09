import React, { useRef } from "react";
import "./App.css";
import useScroller from "./cvanimate/useScroller";

const Scroller = () => {
  const elRef = useRef<HTMLDivElement>(null);
  const secRef = useRef<HTMLDivElement>(null);
  const thirdRef = useRef<HTMLDivElement>(null);
  const fourRef = useRef<HTMLDivElement>(null);
  const pacRef = useRef<HTMLDivElement>(null);
  const threshRef = useRef<HTMLDivElement>(null);
  const rollRef = useRef<HTMLDivElement>(null);

  useScroller([
    {
      ref: elRef,
      customVars: ({ element, perc }) => {
        if (element) element.textContent = `${perc}%`;
      },
    },
    { ref: secRef },
    { ref: thirdRef },
    { ref: fourRef },
    {
      ref: pacRef,
      customVars: ({ perc }) => {
        const p = 100 / 10;
        const cycle = Math.floor(perc / p) % 2 === 0;
        const val = cycle ? perc % p : p - (perc % p);
        return {
          "--a": val,
        };
      },
    },
    {
      ref: threshRef,
      classChecker: ({ perc }) => perc < 20,
      classTrue: "above",
      classFalse: "below",
    },
    {
      ref: rollRef,
      classChecker: ({ perc }) => perc < 20,
      classTrue: "rollIn",
      classFalse: "rollOut",
    },
  ]);

  return (
    <div className="container">
      <h2>CSS Var Animate</h2>
      <p className="info">
        Welcome to this simple animation lib. This uses js to animate css
        variables, which you can then use to animate your styles. <br />
        Scroll down for the first example
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
        amet tellus.
      </p>
      <p className="info">
        The basic ( and default) functionality of useScroll is to calculate the
        relative scroll position. By default this is a normalised percentage
        from
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
        <br />
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
      <p className="info">
        Example 2 (above) : <br />
        When we are animating with
        <span className="code">--p</span> percentage then in the example above
        the item will move 100% screen width, and thus it will move further and
        faster on larger screen sizes. <br />
        Likewise for rotation a calculation get 100 * Xdeg will always give use
        the same number of rotations over the course of scrolling from top to
        <br /> Thus for relative movement or combining mutliple factors such as
        transform and rotate the animation might go out of sync for certain
        screen sizes. <br />
        To achieve constant movement we can use the scroll distance
        <span className="code">--s (scroll)</span> which is the scroll distance
        since the item is in window scroll view.. Using scroll isntead of
        percentage we get a constant / reliable movement over the same distance
        on different screen sizes, but cannot guarantee the animation will run
        over the full width of large screens, or go out of view on small screen
        sizes.
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

      <div ref={pacRef}>
        <div className="pacman"> </div>
      </div>
      <p className="info">
        when trying to do more complex animation calculations, like opening and
        closing Pacman's mouth, this can get tricky in CSS when we dont have
        access to things like % modulus operator or trigonometry sin(), cos().{" "}
      </p>
      <p className="info">
        The inital target object given to useScroll can accept a custom function
        <span className="code">customVars</span> to add extra calculations and
        custom variables. E.g. above we are calculating an extra --a from --p,
        which is then used to animate the mouth angle.
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
      <p className="info">When asdkjhasdjh Threshold</p>
      <div ref={threshRef} className="thresh"></div>
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
