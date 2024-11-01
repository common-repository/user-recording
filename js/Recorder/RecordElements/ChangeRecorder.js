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
var ChangeRecorder = (function (_super) {
    __extends(ChangeRecorder, _super);
    function ChangeRecorder(recorder) {
        var _this = _super.call(this, recorder) || this;
        _this.processingScroll = false;
        _this.LastScroll = 0;
        _this.SetInterval = null;
        jQuery(document).change(function (e) { return _this.RecordChange(e); });
        return _this;
    }
    ChangeRecorder.prototype.RecordChange = function (e) {
        this.recorder.SendData({ type: Shared_1.RecordType.Change, value: { selector: this.GetElementName(e.target), value: jQuery(e.target).val() } });
    };
    return ChangeRecorder;
}(RecorderBase_1.RecorderBase));
exports.ChangeRecorder = ChangeRecorder;
//# sourceMappingURL=ChangeRecorder.js.map