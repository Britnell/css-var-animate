import * as React from "react";
declare type callbackProps = {
    scroll: number;
    scrollMax: number;
    perc: number;
    top: number;
    bottom: number;
    element: HTMLElement;
};
declare type extraCssVars = {
    [key: string]: string | number;
};
declare type targetType = {
    ref: React.RefObject<HTMLDivElement>;
    classTrue?: string;
    classFalse?: string;
    classChecker?: (props: callbackProps) => boolean;
    customVars?: (props: callbackProps) => extraCssVars | void;
    unwatch?: boolean;
};
declare const useScroller: (targets: targetType[]) => void;
export default useScroller;
