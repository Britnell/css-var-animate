import { useRef } from "react";
import styles from "./Count.module.scss";
import useBezier from "./useBezier";

const LinearEx = () => {
  const ref = useRef();
  const ctr = useBezier(ref);

  const start = () => ctr.start({ T: 1.0, easing: "linear" });

  return (
    <div ref={ref}>
      <h2>Linear</h2>
      <button onClick={start}>Start</button>
      <div className={styles.bar}>
        <div></div>
      </div>
    </div>
  );
};

const BezierEx = () => {
  const ref = useRef();
  const ctr = useBezier(ref);

  const start = () => ctr.start({ T: 1.0, bezier: [1, 0, 0, 1] });

  return (
    <div ref={ref}>
      <h3>Bezier</h3>
      <button onClick={start}>Start</button>
      <div className={styles.bar}>
        <div></div>
      </div>
    </div>
  );
};

const Count = () => {
  return (
    <div>
      <h2>animating css var with js</h2>
      <LinearEx />
      <BezierEx />
    </div>
  );
};

export default Count;
