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
var SaverBase_1 = require("./SaverBase");
var SendBeaconSaver = (function (_super) {
    __extends(SendBeaconSaver, _super);
    function SendBeaconSaver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SendBeaconSaver.prototype.InternalBeforeClose = function () {
        var data = this.GetDataToSend(true);
        var encodedData = '';
        console.log(data);
        for (var property in data) {
            encodedData += '&' + property + '=' + encodeURIComponent(data[property]);
        }
        console.log(encodedData);
        var url = smartformsrecordingparams.siteurl;
        if (url[url.length - 1] != '/')
            url += '/';
        navigator.sendBeacon(url + '?smart_session_recording_id=-1', encodedData);
    };
    SendBeaconSaver.prototype.InternalDataAdded = function () {
        if (this.totalBytes > 60000)
            this.SendDataAddedSoFar();
    };
    return SendBeaconSaver;
}(SaverBase_1.SaverBase));
exports.SendBeaconSaver = SendBeaconSaver;
//# sourceMappingURL=SendBeaconSaver.js.map