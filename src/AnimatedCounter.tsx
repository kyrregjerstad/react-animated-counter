import React, { memo, useEffect, useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { formatForDisplay, calculateDigitWidth } from "./util";
import { usePrevious } from "./hooks";
import "../styles.css";

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

// Decimal element component
const DecimalColumn = ({ className }: DecimalColumnProps) => (
  <span className={className}>.</span>
);

// Individual number element component
const NumberColumn = memo(
  ({
    digit,
    delta,
    incrementColor,
    decrementColor,
    className,
    duration = 1,
  }: NumberColumnProps) => {
    const [position, setPosition] = useState<number>(0);
    const [animationClass, setAnimationClass] = useState<string | null>(null);
    const currentDigit = +digit;
    const previousDigit = usePrevious(+currentDigit);
    const columnContainer = useRef<HTMLDivElement>(null);

    const setColumnToNumber = useCallback((number: string) => {
      if (columnContainer?.current?.clientHeight) {
        setPosition(columnContainer?.current?.clientHeight * parseInt(number, 10));
      }
    }, []);

    useEffect(() => {
      setAnimationClass(previousDigit !== currentDigit ? delta : "");
    }, [digit, delta]);

    useEffect(() => {
      setColumnToNumber(digit);
    }, [digit, setColumnToNumber]);

    return (
      <div
        className={`ticker-column-container ${className}`}
        ref={columnContainer}
        style={
          {
            height: "auto",
            "--increment-color": `${incrementColor}`,
            "--decrement-color": `${decrementColor}`,
            "--duration": `${duration}s`,
          } as React.CSSProperties
        }
      >
        <motion.div
          animate={{ x: 0, y: position }}
          transition={{ duration }}
          className={`ticker-column absolute h-[1000%] bottom-0 ${animationClass}`}
          onAnimationComplete={() => setAnimationClass("")}
        >
          {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((num) => (
            <div className="w-auto h-[10%]" key={num}>
              <span
                style={{
                  width: calculateDigitWidth(num),
                }}
              >
                {num}
              </span>
            </div>
          ))}
        </motion.div>
        <span className="number-placeholder">0</span>
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.digit === nextProps.digit && prevProps.delta === nextProps.delta
);

// Main component
const AnimatedCounter = ({
  value = 0,
  incrementColor = "#32cd32",
  decrementColor = "#fe6862",
  includeDecimals = true,
  decimalPrecision = 2,
  className,
  duration = 1,
}: AnimatedCounterProps) => {
  const numArray = formatForDisplay(value, includeDecimals, decimalPrecision);
  const previousNumber = usePrevious(value);
  let delta: string | null = null;

  if (previousNumber !== null) {
    if (value > previousNumber) {
      delta = "increase";
    } else if (value < previousNumber) {
      delta = "decrease";
    }
  }

  return (
    <motion.div
      layout
      className="relative flex flex-row-reverse overflow-hidden"
      style={{ flexDirection: "row-reverse" }}
    >
      {numArray.map((number: string, index: number) =>
        number === "." ? (
          <DecimalColumn key={index} className={className} />
        ) : (
          <NumberColumn
            key={index}
            digit={number}
            delta={delta}
            incrementColor={incrementColor}
            decrementColor={decrementColor}
            className={className}
            duration={duration}
          />
        )
      )}
    </motion.div>
  );
};

export default AnimatedCounter;
