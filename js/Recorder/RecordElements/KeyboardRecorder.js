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
var KeyboardRecorder = (function (_super) {
    __extends(KeyboardRecorder, _super);
    function KeyboardRecorder(recorder) {
        var _this = _super.call(this, recorder) || this;
        _this.RecordKeys();
        return _this;
    }
    KeyboardRecorder.prototype.RecordKeys = function () {
        var _this = this;
        jQuery(document).on('input', function (e) {
            _this.recorder.SendData({ type: Shared_1.RecordType.KeyValue, value: { value: jQuery(e.target).val(), selector: _this.GetElementName(e.target) } });
        });
    };
    return KeyboardRecorder;
}(RecorderBase_1.RecorderBase));
exports.KeyboardRecorder = KeyboardRecorder;
//# sourceMappingURL=KeyboardRecorder.js.map