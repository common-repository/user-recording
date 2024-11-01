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
var NormalSaver = (function (_super) {
    __extends(NormalSaver, _super);
    function NormalSaver() {
        var _this = _super.call(this) || this;
        setInterval(function () {
            if (_this.data.length > 0)
                _this.SendDataAddedSoFar();
        }, 10000);
        return _this;
    }
    NormalSaver.prototype.InternalBeforeClose = function () {
        this.SendDataAddedSoFar(true);
    };
    NormalSaver.prototype.InternalDataAdded = function () {
    };
    return NormalSaver;
}(SaverBase_1.SaverBase));
exports.NormalSaver = NormalSaver;
//# sourceMappingURL=NormalSaver.js.map