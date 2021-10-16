"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorResponse_1 = __importDefault(require("../utils/ErrorResponse"));
var errorHandler = function (err, req, res, next) {
    var error = __assign({}, err);
    error.message = err.message;
    // if unique record exists in mongodb already - duplication 
    if (error.code === 11000) {
        var location_1 = Object.keys(err.keyValue)[0];
        error = new ErrorResponse_1.default("This " + location_1 + " already exists.", 400);
    }
    // case of unhandled error
    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'Server error.'
    });
};
exports.default = errorHandler;
