import sass from "rollup-plugin-sass";
import { uglify } from "rollup-plugin-uglify";
import typescript from "rollup-plugin-typescript2";

import pkg from "./package.json";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
        exports: "named",
        sourcemap: true,
        strict: false,
      },
    ],
    plugins: [sass({ insert: true }), typescript(), uglify()],
    external: ["react", "react-dom"],
  },
  {
    input: "src/useScroller.ts",
    output: [
      {
        file: "dist/useScroller.js",
        format: "cjs",
        exports: "named",
        sourcemap: true,
        strict: false,
      },
    ],
    plugins: [sass({ insert: true }), typescript(), uglify()],
    external: ["react", "react-dom"],
  },

  {
    input: "src/useCounter.ts",
    output: [
      {
        file: "dist/useCounter.js",
        format: "cjs",
        exports: "named",
        sourcemap: true,
        strict: false,
      },
    ],
    plugins: [sass({ insert: true }), typescript(), uglify()],
    external: ["react", "react-dom"],
  },

  {
    input: "src/useMouseover.ts",
    output: [
      {
        file: "dist/useMouseover.js",
        format: "cjs",
        exports: "named",
        sourcemap: true,
        strict: false,
      },
    ],
    plugins: [sass({ insert: true }), typescript(), uglify()],
    external: ["react", "react-dom"],
  },
];
