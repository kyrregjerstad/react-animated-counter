import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { usePrevious } from "./hooks";
import './styles.css';

const formatForDisplay = (number = 0) => {
  return parseFloat(Math.max(number, 0)).toFixed(2).split("").reverse();
}

const DecimalColumn = ({ 
  fontSize,
  color,
}) => {
  return (
    <div>
      <span style={{ fontSize: fontSize, color: color }}>.</span>
    </div>
  );
}

const NumberColumn = ({ 
  digit,
  delta,
  fontSize,
  color,
  incrementColor,
  decrementColor,
}) => {
  const [position, setPosition] = useState(0);
  const [animationClass, setAnimationClass] = useState(null);
  const previousDigit = usePrevious(digit);
  const columnContainer = useRef();

  const setColumnToNumber = (number) => {
    setPosition(columnContainer.current.clientHeight * parseInt(number, 10));
  };

  useEffect(() => setAnimationClass(previousDigit !== digit ? delta : ""), [
    digit,
    delta
  ]);

  useEffect(() => setColumnToNumber(digit), [digit]);

  return (
    <div
      className="ticker-column-container"
      ref={columnContainer}
      style={{ 
        fontSize: fontSize,
        color: color,
        '--increment-color': incrementColor,
        '--decrement-color': decrementColor
      }}
    >
      <motion.div
        animate={{ y: position }}
        className={`ticker-column ${animationClass}`}
        onAnimationComplete={() => setAnimationClass("")}
      >
        {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((num) => (
          <div key={num} className="ticker-digit">
            <span>{num}</span>
          </div>
        ))}
      </motion.div>
      <span className="number-placeholder">0</span>
    </div>
  );
}

// Main component
const AnimatedCounter = ({
  value = 0,
  fontSize = '18px',
  color = 'black',
  incrementColor = '#32cd32',
  decrementColor = '#fe6862',
}) => {
  const numArray = formatForDisplay(value);
  const previousNumber = usePrevious(value);

  let delta = null;
  if (value > previousNumber) delta = 'increase';
  if (value < previousNumber) delta = 'decrease';

  return (
    <motion.div layout className='ticker-view'>
      {numArray.map((number, index) =>
        number === "." ? (
          <DecimalColumn
            key={index}
            fontSize={fontSize}
            color={color}
          />
        ) : (
          <NumberColumn
            key={index}
            digit={number}
            delta={delta}
            fontSize={fontSize}
            incrementColor={incrementColor}
            decrementColor={decrementColor}
          />
        )
      )}
    </motion.div>
  );
}

export { AnimatedCounter };