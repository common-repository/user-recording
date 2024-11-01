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
var PlayerBase_1 = require("./PlayerBase");
var SparkMD5 = require("../../lib/spark-md5");
var AjaxPlayer = (function (_super) {
    __extends(AjaxPlayer, _super);
    function AjaxPlayer() {
        var _this = _super.call(this) || this;
        _this.ajaxRequest = [];
        _this.MonitorJQuery(jQuery);
        if (typeof rnJQuery != 'undefined')
            _this.MonitorJQuery(rnJQuery);
        return _this;
    }
    AjaxPlayer.DisableAjax = function () {
        XMLHttpRequest.prototype.send = function () { console.log('ajax blocked'); };
    };
    AjaxPlayer.prototype.Execute = function (currentTime, record) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var difference, i, value;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    difference = record.time - currentTime;
                                    if (!(difference > 0)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, this.Delay(difference)];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2:
                                    for (i = 0; i < this.ajaxRequest.length; i++)
                                        if (this.ajaxRequest[i].id == record.value.id) {
                                            value = record.value.value;
                                            try {
                                                value = jQuery.parseJSON(value);
                                            }
                                            catch (e) {
                                            }
                                            this.ajaxRequest[i].complete(value);
                                            this.ajaxRequest.splice(i, 1);
                                        }
                                    resolve(record.time);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    AjaxPlayer.prototype.MonitorJQuery = function (jQuery) {
        var self = this;
        jQuery.ajax = function () {
            var ajaxId = '';
            if (arguments.length > 0) {
                if (typeof arguments[0].data != 'undefined' && typeof arguments[0].data != null) {
                    ajaxId = arguments[0].data.action;
                }
                if (typeof arguments[0].success != 'undefined' && arguments[0].success != null) {
                    ajaxId += arguments[0].success.toString();
                    var md5Id = SparkMD5.hash(ajaxId);
                    var previousSuccess = arguments[0].success;
                    self.ajaxRequest.push({ id: md5Id, complete: previousSuccess });
                    console.log('Added request!', self.ajaxRequest);
                }
            }
        };
    };
    AjaxPlayer.prototype.GetActionRange = function (currentTime, record) {
        return null;
    };
    return AjaxPlayer;
}(PlayerBase_1.PlayerBase));
exports.AjaxPlayer = AjaxPlayer;
//# sourceMappingURL=AjaxPlayer.js.map