# Css-Var-Animate React

Welcome to my little package, this is a super lightweight library (actually they are just React hooks).

Animate css variable with js, to achieve animations you couldn't do with CSS alone. Minimal js that simply animates CSS variables (AKA custom properties), for you to do the rest in CSS.

We all love js animation libraries but they do increase our code size. This is for when you don't want to go full gsap just for a few simple animations.

## Disclaimer

I'm still working on the most efficient way for this, and also still adjusting the usage, so let me know what you think.

# Demo

Probably easiest to [see it in action on the demo page](https://css-var-animate.netlify.app/). The demo page is part of the git repo, find [the code here](https://github.com/Britnell/css-var-animate/blob/main/demo/src/App.tsx) and [the styles here](https://github.com/Britnell/css-var-animate/blob/main/demo/src/App.css).

# useCount

CSS variables are really powerful, and in future we will be able to animate them aswell (with @property), but since the support is not great for this yet, I built a hook that animates a css variable for you, tweening the value from a start to stop value. This is different from other js libs i saw that run animations, or that animate a text value in your html.

## Usage

[ TBC ... ]

# useScroll

Sites are dynamic now and it should be easy to animate on scroll. This function takes a useRef to an element and updates a css variable with it's relative scroll position. This can then be used in CSS to animate with or on scroll.

## Usage

[ TBC ... ]

## Credit

Credit where it's due. I have been enlightened to the use of CSS variables by Lea Verou. [See her great course on Frontend Masters](https://frontendmasters.com/courses/css-variables/), and [read her great articles on custom properties with defaults](https://lea.verou.me/2021/10/custom-properties-with-defaults/). She did an example CSS animation copying the Material UI button effect using [@property](https://developer.mozilla.org/en-US/docs/Web/CSS/@property), and I thought this could be widely supported by using some minimal js to animate the variable.
