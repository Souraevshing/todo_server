"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeTitleUtil = normalizeTitleUtil;
function normalizeTitleUtil(title) {
    return title.trim().replace(/\s+/g, ' ');
}
