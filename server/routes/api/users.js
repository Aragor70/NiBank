"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var gravatar_1 = __importDefault(require("gravatar"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var async_1 = __importDefault(require("../../middlewares/async"));
var ErrorResponse_1 = __importDefault(require("../../utils/ErrorResponse"));
var db_1 = require("../../config/db");
var router = express_1.default.Router();
router.post('/', (0, async_1.default)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, rows, user, avatar, userName, salt, safePassword, payload, JWTSecretKey;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, password = _a.password;
                return [4 /*yield*/, db_1.pool.query("SELECT * FROM accounts WHERE email = $1", [email])];
            case 1:
                rows = (_b.sent()).rows;
                user = rows[0] || false;
                console.log(user);
                if (user) {
                    return [2 /*return*/, next(new ErrorResponse_1.default('User already exists.', 422))];
                }
                else if (!email || !email.includes('@')) {
                    return [2 /*return*/, next(new ErrorResponse_1.default('Enter @ address.', 422))];
                }
                avatar = gravatar_1.default.url(email, {
                    s: '200', r: 'pg', d: 'mm'
                    //  size, rating, default image
                });
                userName = name || email.slice(0, email.indexOf('@'));
                return [4 /*yield*/, bcryptjs_1.default.genSalt(10)];
            case 2:
                salt = _b.sent();
                return [4 /*yield*/, bcryptjs_1.default.hash(password, salt)];
            case 3:
                safePassword = _b.sent();
                return [4 /*yield*/, db_1.pool.query("INSERT INTO accounts (name, email, password, avatar) VALUES($1, $2, $3, $4)", [userName, email, safePassword, ''])];
            case 4:
                user = _b.sent();
                payload = {
                    user: {
                        id: user.user_id
                    }
                };
                JWTSecretKey = process.env["jwtSecret"];
                return [2 /*return*/, jsonwebtoken_1.default.sign(payload, JWTSecretKey, { expiresIn: 360000 }, function (err, token) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (err) {
                                        return [2 /*return*/, next(new ErrorResponse_1.default(err.message, 422))];
                                    }
                                    return [4 /*yield*/, db_1.pool.query("UPDATE accounts SET token = $1 WHERE email = $2", [token, email])];
                                case 1:
                                    _a.sent();
                                    res.json({ success: true, token: token });
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
        }
    });
}); }));
exports.default = router;
