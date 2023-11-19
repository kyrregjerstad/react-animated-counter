import React from "react";
import "./styles.css";
export interface AnimatedCounterProps {
    value?: number;
    incrementColor?: string;
    decrementColor?: string;
    includeDecimals?: boolean;
    decimalPrecision?: number;
    className?: string;
    duration?: number;
}
export interface NumberColumnProps {
    digit: string;
    delta: string | null;
    incrementColor: string;
    decrementColor: string;
    className?: string;
    duration?: number;
}
export interface DecimalColumnProps {
    className?: string;
}
declare const AnimatedCounter: ({ value, incrementColor, decrementColor, includeDecimals, decimalPrecision, className, duration, }: AnimatedCounterProps) => React.JSX.Element;
export default AnimatedCounter;
