"use strict";
exports.__esModule = true;
var LZString = require("../../lib/lz-string.min");
var AsyncAjax_1 = require("../../Shared/AsyncAjax");
require("jQuery");
var SaverBase = (function () {
    function SaverBase() {
        var _this = this;
        this.data = [];
        this.totalBytes = null;
        this.html = "";
        this.initialProperties = "";
        jQuery(window).on('beforeunload', function () {
            _this.InternalBeforeClose();
        });
    }
    SaverBase.prototype.AddData = function (recordData) {
        this.lastTime = recordData.time;
        var data = LZString.compressToBase64(JSON.stringify(recordData));
        this.totalBytes += this.GetByteLength(data);
        this.data.push(data);
        this.InternalDataAdded();
        console.log('%cEvent Added:' + recordData.type + ' TotalBytes:' + this.totalBytes, 'background:#CCFFCC', recordData);
    };
    SaverBase.prototype.SendDataAddedSoFar = function (closeRecording) {
        if (closeRecording === void 0) { closeRecording = false; }
        AsyncAjax_1.AsyncAjax.Post(this.GetDataToSend(closeRecording));
        this.data = [];
        this.totalBytes = 0;
    };
    SaverBase.prototype.GetDataToSend = function (closeRecording) {
        if (closeRecording === void 0) { closeRecording = false; }
        if (this.data.length == 0)
            return;
        var data = {};
        data.lastTime = this.lastTime;
        if (closeRecording)
            data.duration = this.lastTime;
        data.actions = JSON.stringify(this.data);
        data.action = 'rednao_ssr_submit_recording';
        data.uniqid = smartformsrecordingparams.uniqid;
        if (this.initialProperties != '') {
            data.initialProperties = this.initialProperties;
            data.html = this.html;
            var sessionId = this.GetCookie('smart_session_recording');
            if (sessionId == null) {
                sessionId = smartformsrecordingparams.uniqid;
                this.SetCookie('smart_session_recording', sessionId);
            }
            data.sessionId = sessionId;
            data.url = location.href.substr(location.href.lastIndexOf('/') + 1).substr(0, 255);
            this.initialProperties = '';
            this.html = '';
        }
        return data;
    };
    SaverBase.prototype.GetByteLength = function (s) {
        var n = 0;
        for (var i = 0, l = s.length; i < l; i++) {
            var hi = s.charCodeAt(i);
            if (hi < 0x0080) {
                n += 1;
            }
            else if (hi < 0x0800) {
                n += 2;
            }
            else if (hi < 0xD800) {
                n += 3;
            }
            else if (hi < 0xDC00) {
                var lo = s.charCodeAt(++i);
                if (i < l && lo >= 0xDC00 && lo <= 0xDFFF) {
                    n += 4;
                }
                else {
                    throw new Error("UCS-2 String malformed");
                }
            }
            else if (hi < 0xE000) {
                throw new Error("UCS-2 String malformed");
            }
            else {
                n += 3;
            }
        }
        return n;
    };
    SaverBase.prototype.setInitialWindowState = function ($html, initialProperties) {
        this.html = LZString.compressToBase64($html);
        this.initialProperties = JSON.stringify(initialProperties);
        console.log("initial properties", this.initialProperties);
    };
    SaverBase.prototype.SetCookie = function (name, value) {
        var expires = "";
        var date = new Date();
        date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
        document.cookie = name + "=" + value + expires + "; path=/";
    };
    SaverBase.prototype.GetCookie = function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0)
                return c.substring(nameEQ.length, c.length);
        }
        return null;
    };
    return SaverBase;
}());
exports.SaverBase = SaverBase;
//# sourceMappingURL=SaverBase.js.map