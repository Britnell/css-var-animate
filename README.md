# Css-Var-Animate React

Welcome to my little package, this is a super lightweight library (actually they are just a few React hooks) to animate css variable with js, to achieve animations you couldn't do with CSS alone.

# Demo

Probably easiest to [see it in action on the demo page](https://css-var-animate.netlify.app/). The demo page is part of the git repo, find [the code here](https://github.com/Britnell/css-var-animate/blob/main/demo/src/App.tsx) and [the styles here](https://github.com/Britnell/css-var-animate/blob/main/demo/src/App.css).

# useCounter

CSS variables are really powerful, and in future we will be able to animate them aswell (with @property), but since the support is not great for this yet, I built a hook that animates a css variable for you, tweening the value from a start to stop value. This is different from other js libs i saw that run animations, or that animate a text value in your html.

This essentially tweens a value from 0 to 1, and applies this value as a CSS custom property.

### Usage

`start({ ref, id, ms, easing?, bezier? })`
The start function takes a config object of

- ref : a React ref to the object it should apply the CSS properties to
- id : the name of the custom property
- ms : the duration of the 'tween'

```
import { useCounter } from "css-var-animate";

const Component = ()=>{
    const objectRef = useRef();
    const { start } = useCounter();

    // Run on event or action with config object
    const animate = ()=>start({
        ref: objectRef,
        id: "--x",
        ms: 800,
    })
    return (<div>
        <button onClick={animate)>Run</button>
        <div ref={objectRef}></div>
    </div>)
}

```

You can optionally add one of the default easing functions ("linear" by default) :
`easing: "linear" | "ease-in" | "ease-out" | "ease-in-out"`
or points for a custom bezier easing function :
`bezier: [1, 0, 0, 1],`

# useScroller

Sites are dynamic now and it should be easy to animate on scroll. This function takes a useRef to an element and updates a css variable with it's relative scroll position. This can then be used in CSS to animate with or on scroll.

### Usage

This hook takes a config object.
All it needs to run the standard behaviour is the ref to the element it should apply the css variables to.

```
import { useScroller } from "css-var-animate";
const Component = ()=>{
    const scrollRef = useRef();
    useScroller({ ref: scrollRef });

    return (<div ref={scrollRef} >...</div>)
}
```

by default it will apply `--s` the distance scrolled since it came into view,
and `--v` a relative measure from 0 to 1, from the moment it first enters, to the moment it last leaves the view.
[Best see this in action in the demo](https://css-var-animate.netlify.app/).

You can customise the variables names and values by passing your own callback function. The callback function receives

```
useScroller({
    ref: allRef,
    customVars: ({ view, scroll, top, bottom }) => ({
        "--s": scroll,
        "--v": view,
        "--t": top,
        "--b": bottom
    })
});
```

# useMouseover

For effects on mouse-move use this simple hook to get a 0 to 1 index in where the mouse cursor is relative to the element `--mx` and `--my`.

### Usage

Just as easy as the others, this hook also just needs the ref to the element it should add the event listener to, and apply the css custom properties to.

```
import { useMouseover } from "css-var-animate";
const Component = ()=>{
    const mouseRef = useRef();
    useMouseover(mouseRef);

    return (<div ref={mouseRef} >...</div>)
}
```

# Module import

To be honest I'm trying to get module imports to work
`import useScroller from "css-var-animate/scroller";`

So you can import the hooks separately for smaller code sizes - but I can't get it to work, any help welcome.
Currently they all come together
`import { useCounter, useMouseover, useScroller } from "css-var-animate";`

## About

We all love js animation libraries but they do increase our code size. This is for when you don't want to go full gsap just for a few simple animations. Minimal js that simply animates CSS variables (AKA custom properties), for you to do the rest in CSS.

## Credit

Credit where it's due. I have been enlightened to the use of CSS variables by Lea Verou. [See her great course on Frontend Masters](https://frontendmasters.com/courses/css-variables/), or the shorter version [on Youtube : CSS Variable Secrets](https://www.youtube.com/watch?v=ZuZizqDF4q8) and [read her articles on custom properties with defaults](https://lea.verou.me/2021/10/custom-properties-with-defaults/). She did an example CSS animation copying the Material UI button effect using [@property](https://developer.mozilla.org/en-US/docs/Web/CSS/@property), and I thought this could be widely supported by using some minimal js to animate the variable.
