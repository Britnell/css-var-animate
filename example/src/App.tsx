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
      // customVars: ({ element, perc }) => {
      //   if (element) element.textContent = `${perc}%`;
      // },
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
      <h1>CSS Var Animate</h1>
      <p className="info">
        Welcome to this simple animation lib. This uses js to animate css
        variables, for animations.
      </p>
      <h2>useScroll</h2>
      <p className="info">A react hook to animate with Scroll.</p>
      <p className="info">Scroll down for the first example</p>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
        interdum maximus libero, in ornare nunc tincidunt sit amet. Ut efficitur
        maximus molestie. Phasellus sed egestas elit, sed pharetra erat. Vivamus
        et facilisis dui. Etiam id neque quis sapien rutrum vulputate vitae sit
        amet tellus. Morbi a feugiat erat, at finibus dui. Fusce feugiat eros in
        ex mattis tempus. Suspendisse ullamcorper tellus at est tempor,
        tristique egestas neque hendrerit. Nunc massa leo, sodales at nisl
        finibus, porta sagittis magna. Nunc ultrices rutrum viverra. Lorem ipsum
        dolor sit amet, consectetur adipiscing elit. Quisque interdum maximus
        libero, in ornare nunc tincidunt sit amet. Ut efficitur maximus
        molestie. Phasellus sed egestas elit, sed pharetra erat. Vivamus et
        facilisis dui. Etiam id neque quis sapien rutrum vulputate vitae sit
        amet tellus.
      </p>
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
      <div ref={pacRef}>
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
        <span className="code">classFalse</span>. asdads
      </p>
      <p className="info"></p>
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
