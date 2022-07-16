import React from "react";
declare type refType = React.RefObject<HTMLDivElement | HTMLButtonElement>;
declare type startProps = {
    ref: refType;
    id: string;
    ms?: number;
    bezier?: number[];
    easing?: "linear" | "ease-in" | "ease-out" | "ease-in-out";
};
declare const useCounter: () => {
    start: ({ ref, id, ms, bezier, easing, }: startProps) => void;
};
export default useCounter;
