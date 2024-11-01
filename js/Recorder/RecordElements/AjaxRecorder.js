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
var SparkMD5 = require("../../lib/spark-md5");
var AjaxRecorder = (function (_super) {
    __extends(AjaxRecorder, _super);
    function AjaxRecorder(recorder) {
        var _this = _super.call(this, recorder) || this;
        _this.RecordAjax();
        jQuery(function () {
            if (typeof rnJQuery != 'undefined')
                _this.MonitorJQuery(rnJQuery);
        });
        return _this;
    }
    AjaxRecorder.prototype.RecordAjax = function () {
        this.MonitorJQuery(jQuery);
    };
    AjaxRecorder.prototype.MonitorJQuery = function (query) {
        var previousAjax = query.ajax;
        var self = this;
        query.ajax = function () {
            var ajaxId = '';
            if (arguments.length > 0) {
                if (typeof arguments[0].data != 'undefined' && typeof arguments[0].data != null) {
                    if (arguments[0].data.action == "rednao_ssr_submit_recording") {
                        previousAjax.apply(this, arguments);
                        return;
                    }
                    ajaxId = arguments[0].data.action;
                }
                if (typeof arguments[0].success != 'undefined' && arguments[0].success != null) {
                    ajaxId += arguments[0].success.toString();
                    var previousSuccess_1 = arguments[0].success;
                    arguments[0].success = function () {
                        self.recorder.SendData({ type: Shared_1.RecordType.AjaxReceived, value: { id: SparkMD5.hash(ajaxId), value: JSON.stringify(arguments[0]) } });
                        previousSuccess_1.apply(this, arguments);
                    };
                }
            }
            previousAjax.apply(this, arguments);
        };
    };
    return AjaxRecorder;
}(RecorderBase_1.RecorderBase));
exports.AjaxRecorder = AjaxRecorder;
//# sourceMappingURL=AjaxRecorder.js.map