"use strict";
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
var Shared_1 = require("../Shared/Shared");
var LZString = require("../lib/lz-string.min");
var MousePlayer_1 = require("./PlayerElements/MousePlayer");
require("es6-promise");
var ChangePlayer_1 = require("./PlayerElements/ChangePlayer");
var ScrollPlayer_1 = require("./PlayerElements/ScrollPlayer");
var KeyboardPlayer_1 = require("./PlayerElements/KeyboardPlayer");
var AjaxPlayer_1 = require("./PlayerElements/AjaxPlayer");
require("jQuery");
require("es6-promise");
var ResizePlayer_1 = require("./PlayerElements/ResizePlayer");
var JQueryPlayer_1 = require("./PlayerElements/JQueryPlayer");
var Player = (function () {
    function Player() {
        var _this = this;
        this.actions = [];
        this.currentTime = 0;
        this.initialScrollTop = 0;
        this.initialScrollLeft = 0;
        AjaxPlayer_1.AjaxPlayer.DisableAjax();
        this.UncompressRecordData();
        this.UpdateIframeSize();
        jQuery(function () {
            setTimeout(function () {
                jQuery(document).scrollTop(_this.initialScrollTop);
                jQuery(document).scrollLeft(_this.initialScrollLeft);
                _this.InitializePlayers();
                var recordingSummary = {
                    duration: _this.actions[_this.actions.length - 1].time,
                    ranges: _this.GetRecordingRanges()
                };
                _this.PostMessage('createRecorderBar', { summary: recordingSummary });
                _this.Start();
            }, 10);
        });
    }
    Player.prototype.Start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, record, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.PostMessage('startPlaying', {});
                        _i = 0, _a = this.actions;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        record = _a[_i];
                        _b = this;
                        return [4 /*yield*/, this.GetPlayer(record).Execute(this.currentTime, record)];
                    case 2:
                        _b.currentTime = _c.sent();
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Player.prototype.GetPlayer = function (record) {
        if (record.type == Shared_1.RecordType.Move || record.type == Shared_1.RecordType.MouseEnter || record.type == Shared_1.RecordType.MouseLeave || record.type == Shared_1.RecordType.Click)
            return this.mousePlayer;
        if (record.type == Shared_1.RecordType.Change)
            return this.changePlayer;
        if (record.type == Shared_1.RecordType.Scroll)
            return this.scrollPlayer;
        if (record.type == Shared_1.RecordType.KeyValue)
            return this.keyboardPlayer;
        if (record.type == Shared_1.RecordType.AjaxReceived)
            return this.ajaxPlayer;
        if (record.type == Shared_1.RecordType.Resize)
            return this.resizePlayer;
        if (record.type == Shared_1.RecordType.Submit)
            return this.jQueryPlayer;
    };
    Player.prototype.UncompressRecordData = function () {
        for (var _i = 0, smartSessionRecordingActions_1 = smartSessionRecordingActions; _i < smartSessionRecordingActions_1.length; _i++) {
            var actionlist = smartSessionRecordingActions_1[_i];
            for (var _a = 0, actionlist_1 = actionlist; _a < actionlist_1.length; _a++) {
                var action = actionlist_1[_a];
                this.actions.push(jQuery.parseJSON(LZString.decompressFromBase64(action)));
            }
        }
        //console.log(this.actions);
    };
    Player.prototype.InitializePlayers = function () {
        this.mousePlayer = new MousePlayer_1.MousePlayer();
        this.changePlayer = new ChangePlayer_1.ChangePlayer();
        this.scrollPlayer = new ScrollPlayer_1.ScrollPlayer(this.initialScrollTop, this.initialScrollLeft);
        this.keyboardPlayer = new KeyboardPlayer_1.KeyboardPlayer();
        this.ajaxPlayer = new AjaxPlayer_1.AjaxPlayer();
        this.resizePlayer = new ResizePlayer_1.ResizePlayer(this);
        this.jQueryPlayer = new JQueryPlayer_1.JQueryPlayer();
    };
    Player.prototype.PostMessage = function (type, data) {
        window.parent.postMessage({
            data: data,
            type: type
        }, '*');
    };
    Player.prototype.UpdateIframeSize = function () {
        this.PostMessage('smartSessionRecordingEvent', { width: smartSessionRecordingInitialProperties.width, height: smartSessionRecordingInitialProperties.height });
    };
    Player.prototype.GetRecordingRanges = function () {
        var currentMilliseconds = 0;
        var playerRanges = [];
        for (var _i = 0, _a = this.actions; _i < _a.length; _i++) {
            var action = _a[_i];
            var range = this.GetPlayer(action).GetActionRange(currentMilliseconds, action);
            currentMilliseconds = action.time;
            if (range != null)
                playerRanges.push(range);
        }
        return playerRanges;
    };
    return Player;
}());
exports.Player = Player;
window.SmartSessionRecordingPlayer = new Player();
//# sourceMappingURL=Player.js.map