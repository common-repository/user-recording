"use strict";
exports.__esModule = true;
var JQueryRecorder_1 = require("./RecordElements/JQueryRecorder");
var MouseRecorder_1 = require("./RecordElements/MouseRecorder");
var ChangeRecorder_1 = require("./RecordElements/ChangeRecorder");
var ScrollRecorder_1 = require("./RecordElements/ScrollRecorder");
var KeyboardRecorder_1 = require("./RecordElements/KeyboardRecorder");
var AjaxRecorder_1 = require("./RecordElements/AjaxRecorder");
var SendBeaconSaver_1 = require("./Saver/SendBeaconSaver");
var NormalSaver_1 = require("./Saver/NormalSaver");
var ResizeRecorder_1 = require("./RecordElements/ResizeRecorder");
var Recorder = (function () {
    function Recorder() {
        var _this = this;
        this.actionsCache = [];
        this.startTime = new Date().getTime();
        this.InitializeSavingMechanism();
        this.StartRecorders();
        //this.Mirror = new Mirror();
        jQuery(function () {
            var $html = jQuery('html')[0].outerHTML;
            jQuery(function () {
                _this.saver.setInitialWindowState($html, {
                    height: jQuery(window).height(),
                    width: jQuery(window).width()
                });
            });
            //this.Mirror.Initialize();
        });
    }
    Recorder.prototype.SendData = function (recordData) {
        recordData.time = new Date().getTime() - this.startTime;
        this.saver.AddData(recordData);
        //this.totalBytes+=this.GetByteLength(data);
        //this.Mirror.SendData(data);
    };
    Recorder.prototype.StartRecorders = function () {
        this.AjaxRecorder = new AjaxRecorder_1.AjaxRecorder(this);
        this.MouseRecorders = new MouseRecorder_1.MouseRecorder(this);
        this.JQueryRecorder = new JQueryRecorder_1.JQueryRecorder(this);
        this.ChangeRecorder = new ChangeRecorder_1.ChangeRecorder(this);
        this.ScrollRecorder = new ScrollRecorder_1.ScrollRecorder(this, this.MouseRecorders);
        this.KeyboardRecorder = new KeyboardRecorder_1.KeyboardRecorder(this);
        this.ResizeRecorder = new ResizeRecorder_1.ResizeRecorder(this);
    };
    Recorder.prototype.InitializeSavingMechanism = function () {
        if (typeof navigator != 'undefined' && typeof navigator.sendBeacon != 'undefined')
            this.saver = new SendBeaconSaver_1.SendBeaconSaver();
        else
            this.saver = new NormalSaver_1.NormalSaver();
    };
    return Recorder;
}());
exports.Recorder = Recorder;
new Recorder();
//# sourceMappingURL=Recorder.js.map