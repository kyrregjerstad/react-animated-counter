"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Adjusts width of individual narrow digits 
var calculateDigitWidth = function (digit) {
    switch ("".concat(digit)) {
        case '1':
            return '50%';
        case '7':
            return '80%';
        default:
            return '100%';
    }
};
exports.default = calculateDigitWidth;
//# sourceMappingURL=calculateDigitWidth.js.map