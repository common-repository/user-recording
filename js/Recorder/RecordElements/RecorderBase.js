"use strict";
exports.__esModule = true;
var RecorderBase = (function () {
    function RecorderBase(recorder) {
        this.recorder = recorder;
    }
    RecorderBase.prototype.SiblingPosition = function (node) {
        var i = 1;
        while (node = node.previousSibling) {
            if (node.nodeType == 1)
                i += 1;
        }
        return i;
    };
    RecorderBase.prototype.GetElementName = function (node) {
        if (node.id)
            return "#" + node.id;
        if (node.nodeName == "BODY")
            return "body";
        var position = this.SiblingPosition(node);
        return this.GetElementName(node.parentNode) + ">:nth-child(" + position + ")";
    };
    return RecorderBase;
}());
exports.RecorderBase = RecorderBase;
//# sourceMappingURL=RecorderBase.js.map