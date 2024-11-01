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
exports.__esModule = true;
var Shared_1 = require("../../Shared/Shared");
var RecorderBase_1 = require("./RecorderBase");
var MouseRecorder = (function (_super) {
    __extends(MouseRecorder, _super);
    function MouseRecorder(recorder) {
        var _this = _super.call(this, recorder) || this;
        _this.processMovement = true;
        _this.interval = null;
        _this.ResetMouseMovementInterval();
        _this.RecordClicks();
        return _this;
    }
    MouseRecorder.prototype.ResetMouseMovementInterval = function () {
        var _this = this;
        if (this.interval != null)
            clearInterval(this.interval);
        this.processMovement = false;
        this.interval = setInterval(function () {
            _this.processMovement = true;
        }, 200);
        jQuery(document).mousemove(function (e) {
            if (!_this.processMovement)
                return;
            _this.processMovement = false;
            _this.recorder.SendData({ type: Shared_1.RecordType.Move, value: { x: e.pageX, y: e.pageY } });
        });
    };
    MouseRecorder.prototype.RecordClicks = function () {
        var _this = this;
        jQuery(document).click(function (e) {
            if (e.target.nodeName == "SELECT" && e.pageX == 0)
                return;
            _this.recorder.SendData({
                type: Shared_1.RecordType.Click,
                value: { x: e.pageX, y: e.pageY, selector: _this.GetElementName(e.target)
                }
            });
        });
    };
    return MouseRecorder;
}(RecorderBase_1.RecorderBase));
exports.MouseRecorder = MouseRecorder;
//# sourceMappingURL=MouseRecorder.js.map