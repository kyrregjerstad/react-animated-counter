"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var framer_motion_1 = require("framer-motion");
var util_1 = require("./util");
var hooks_1 = require("./hooks");
require("./styles.css");
// Decimal element component
var DecimalColumn = function (_a) {
    var className = _a.className;
    return (react_1.default.createElement("span", { className: className }, "."));
};
// Individual number element component
var NumberColumn = (0, react_1.memo)(function (_a) {
    var digit = _a.digit, delta = _a.delta, incrementColor = _a.incrementColor, decrementColor = _a.decrementColor, className = _a.className, _b = _a.duration, duration = _b === void 0 ? 1 : _b;
    var _c = (0, react_1.useState)(0), position = _c[0], setPosition = _c[1];
    var _d = (0, react_1.useState)(null), animationClass = _d[0], setAnimationClass = _d[1];
    var currentDigit = +digit;
    var previousDigit = (0, hooks_1.usePrevious)(+currentDigit);
    var columnContainer = (0, react_1.useRef)(null);
    var setColumnToNumber = (0, react_1.useCallback)(function (number) {
        var _a, _b;
        if ((_a = columnContainer === null || columnContainer === void 0 ? void 0 : columnContainer.current) === null || _a === void 0 ? void 0 : _a.clientHeight) {
            setPosition(((_b = columnContainer === null || columnContainer === void 0 ? void 0 : columnContainer.current) === null || _b === void 0 ? void 0 : _b.clientHeight) * parseInt(number, 10));
        }
    }, []);
    (0, react_1.useEffect)(function () {
        setAnimationClass(previousDigit !== currentDigit ? delta : "");
    }, [digit, delta]);
    (0, react_1.useEffect)(function () {
        setColumnToNumber(digit);
    }, [digit, setColumnToNumber]);
    return (react_1.default.createElement("div", { className: "ticker-column-container ".concat(className), ref: columnContainer, style: {
            height: "auto",
            "--increment-color": "".concat(incrementColor),
            "--decrement-color": "".concat(decrementColor),
            "--duration": "".concat(duration, "s"),
        } },
        react_1.default.createElement(framer_motion_1.motion.div, { animate: { x: 0, y: position }, transition: { duration: duration }, className: "ticker-column absolute h-[1000%] bottom-0 ".concat(animationClass), onAnimationComplete: function () { return setAnimationClass(""); } }, [9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(function (num) { return (react_1.default.createElement("div", { className: "w-auto h-[10%]", key: num },
            react_1.default.createElement("span", { style: {
                    width: (0, util_1.calculateDigitWidth)(num),
                } }, num))); })),
        react_1.default.createElement("span", { className: "number-placeholder" }, "0")));
}, function (prevProps, nextProps) {
    return prevProps.digit === nextProps.digit && prevProps.delta === nextProps.delta;
});
// Main component
var AnimatedCounter = function (_a) {
    var _b = _a.value, value = _b === void 0 ? 0 : _b, _c = _a.incrementColor, incrementColor = _c === void 0 ? "#32cd32" : _c, _d = _a.decrementColor, decrementColor = _d === void 0 ? "#fe6862" : _d, _e = _a.includeDecimals, includeDecimals = _e === void 0 ? true : _e, _f = _a.decimalPrecision, decimalPrecision = _f === void 0 ? 2 : _f, className = _a.className, _g = _a.duration, duration = _g === void 0 ? 1 : _g;
    var numArray = (0, util_1.formatForDisplay)(value, includeDecimals, decimalPrecision);
    var previousNumber = (0, hooks_1.usePrevious)(value);
    var delta = null;
    if (previousNumber !== null) {
        if (value > previousNumber) {
            delta = "increase";
        }
        else if (value < previousNumber) {
            delta = "decrease";
        }
    }
    return (react_1.default.createElement(framer_motion_1.motion.div, { layout: true, className: "relative flex flex-row-reverse overflow-hidden", style: { flexDirection: "row-reverse" } }, numArray.map(function (number, index) {
        return number === "." ? (react_1.default.createElement(DecimalColumn, { key: index, className: className })) : (react_1.default.createElement(NumberColumn, { key: index, digit: number, delta: delta, incrementColor: incrementColor, decrementColor: decrementColor, className: className, duration: duration }));
    })));
};
exports.default = AnimatedCounter;
//# sourceMappingURL=AnimatedCounter.js.map