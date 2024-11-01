"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
exports.__esModule = true;
var Shared_1 = require("../../Shared/Shared");
var PlayerBase_1 = require("./PlayerBase");
require("es6-promise");
var MousePlayer = (function (_super) {
    __extends(MousePlayer, _super);
    function MousePlayer() {
        var _this = _super.call(this) || this;
        _this.normalColor = '#00d2ff';
        _this.clickColor = '#ff2d70';
        _this.isFirstRangeMouseMovement = true;
        _this.ExecuteMovement(0, { x: 0, y: 0 });
        return _this;
    }
    MousePlayer.prototype.Execute = function (currentTime, record) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                console.log(record.value);
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        var difference, data, data, data;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    difference = record.time - currentTime;
                                    if (!(difference > 200)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, this.Delay(difference - 200)];
                                case 1:
                                    _a.sent();
                                    difference = 200;
                                    _a.label = 2;
                                case 2:
                                    if (!(record.type == Shared_1.RecordType.Move)) return [3 /*break*/, 4];
                                    return [4 /*yield*/, this.ExecuteMovement(difference, record.value)];
                                case 3:
                                    _a.sent();
                                    resolve(record.time);
                                    _a.label = 4;
                                case 4:
                                    if (!(record.type == Shared_1.RecordType.MouseEnter)) return [3 /*break*/, 6];
                                    data = record.value;
                                    return [4 /*yield*/, this.ExecuteMovement(difference, record.value)];
                                case 5:
                                    _a.sent();
                                    jQuery(data.selector).trigger('mouseenter');
                                    resolve(record.time);
                                    _a.label = 6;
                                case 6:
                                    if (!(record.type == Shared_1.RecordType.MouseLeave)) return [3 /*break*/, 8];
                                    data = record.value;
                                    return [4 /*yield*/, this.ExecuteMovement(difference, record.value)];
                                case 7:
                                    _a.sent();
                                    jQuery(data.selector).trigger('mouseleave');
                                    resolve(record.time);
                                    _a.label = 8;
                                case 8:
                                    if (!(record.type == Shared_1.RecordType.Click)) return [3 /*break*/, 10];
                                    data = record.value;
                                    return [4 /*yield*/, this.ExecuteMovement(difference, record.value)];
                                case 9:
                                    _a.sent();
                                    jQuery(data.selector).focus();
                                    this.FireEvent(data.selector, 'click', { pageX: record.value.x, pageY: record.value.y });
                                    jQuery(data.selector).trigger('focus');
                                    MousePlayer.$mousePointer.velocity({ backgroundColor: this.clickColor, backgroundAlpha: .4 }, 50, function () {
                                        MousePlayer.$mousePointer.velocity({ backgroundColor: _this.normalColor, backgroundAlpha: .4 }, 50, function () { resolve(record.time); });
                                    });
                                    _a.label = 10;
                                case 10: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    MousePlayer.prototype.ExecuteMovement = function (time, position) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            if (MousePlayer.$mousePointer == null) {
                                MousePlayer.$mousePointer = jQuery("<div  style=\"width:40px;height:40px;position: absolute;z-index: 10000000000;-webkit-border-radius: 100px;-moz-border-radius: 100px;border-radius: 100px;background-color: rgba(0,210,255,.4)\">\n                                                <img style=\"margin-top:11px;margin-left:16px;\" src=\"" + smartSessionRootUrl + "img/mouse.png\"/>\n                                           </div>");
                                MousePlayer.$mousePointer.css({ left: position.x - 16, top: position.y - 11 });
                                MousePlayer.MousePositionX = position.x - 16;
                                MousePlayer.MousePositionY = position.y - 11;
                                jQuery('body').append(MousePlayer.$mousePointer);
                                resolve();
                            }
                            else
                                console.log('Moving' + time + ' x:' + position.x + ' y:' + position.y);
                            MousePlayer.$mousePointer.velocity({ left: position.x - 16, top: position.y - 11 }, time, function () {
                                MousePlayer.MousePositionX = position.x - 16;
                                MousePlayer.MousePositionY = position.y - 11;
                                resolve();
                            });
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    MousePlayer.prototype.GetActionRange = function (currentTime, record) {
        var difference = record.time - currentTime;
        if (difference > 200) {
            difference = 200;
        }
        if (this.isFirstRangeMouseMovement) {
            this.isFirstRangeMouseMovement = false;
            return null;
        }
        return {
            startTime: record.time - difference,
            duration: difference
        };
    };
    return MousePlayer;
}(PlayerBase_1.PlayerBase));
MousePlayer.MousePositionX = 0;
MousePlayer.MousePositionY = 0;
exports.MousePlayer = MousePlayer;
//# sourceMappingURL=MousePlayer.js.map