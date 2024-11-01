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
var ScrollRecorder = (function (_super) {
    __extends(ScrollRecorder, _super);
    function ScrollRecorder(recorder, mouseRecorder) {
        var _this = _super.call(this, recorder) || this;
        _this.mouseRecorder = mouseRecorder;
        _this.processingScroll = false;
        _this.LastScrollTop = 0;
        _this.LastScrollLeft = 0;
        _this.SetInterval = null;
        jQuery(document).scroll(function (e) { return _this.ScrollChange(e); });
        setInterval(function () {
            if (!_this.processingScroll)
                return;
            _this.mouseRecorder.ResetMouseMovementInterval();
            _this.processingScroll = true;
            _this.recorder.SendData({ type: Shared_1.RecordType.Scroll, value: { top: _this.LastScrollTop, left: _this.LastScrollLeft } });
            _this.processingScroll = false;
        }, 200);
        return _this;
    }
    ScrollRecorder.prototype.ScrollChange = function (e) {
        this.processingScroll = true;
        this.LastScrollTop = jQuery(document).scrollTop();
        this.LastScrollLeft = jQuery(document).scrollLeft();
    };
    return ScrollRecorder;
}(RecorderBase_1.RecorderBase));
exports.ScrollRecorder = ScrollRecorder;
//# sourceMappingURL=ScrollRecorder.js.map