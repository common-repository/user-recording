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
require("jQuery");
var ResizeRecorder = (function (_super) {
    __extends(ResizeRecorder, _super);
    function ResizeRecorder(recorder) {
        var _this = _super.call(this, recorder) || this;
        _this.resizeFired = true;
        jQuery(window).resize(function () { _this.resizeFired = true; _this.SizeChanged(); });
        return _this;
    }
    ResizeRecorder.prototype.SizeChanged = function () {
        var _this = this;
        if (this.resizeFired) {
            if (this.timeOut != null)
                clearTimeout(this.timeOut);
            this.resizeFired = false;
            this.timeOut = setTimeout(function () { return _this.SizeChanged(); }, 300);
        }
        else {
            var auxWidth = jQuery(window).width();
            var auxHeight = jQuery(window).height();
            if (this.lastRecordedWidth != auxWidth || this.lastRecordedHeight != auxHeight) {
                this.lastRecordedHeight = auxHeight;
                this.lastRecordedWidth = auxWidth;
                this.recorder.SendData({
                    type: Shared_1.RecordType.Resize,
                    value: { width: auxWidth, height: auxHeight }
                });
            }
        }
    };
    return ResizeRecorder;
}(RecorderBase_1.RecorderBase));
exports.ResizeRecorder = ResizeRecorder;
//# sourceMappingURL=ResizeRecorder.js.map