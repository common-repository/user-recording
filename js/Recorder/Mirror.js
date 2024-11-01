"use strict";
exports.__esModule = true;
var Mirror = (function () {
    function Mirror() {
        this.actions = [];
        this.initialData = null;
        this.RefreshPlayer = function () {
            while (this.queue.length > 0) {
                this.ExecuteRecorderData(this.queue.shift());
            }
        };
    }
    Mirror.prototype.Initialize = function () {
        var _this = this;
        var $startButton = jQuery('<button>Start</button>');
        jQuery('body').append($startButton);
        $startButton.click(function () {
            _this.Start();
        });
    };
    Mirror.prototype.Start = function () {
        if (this.initialData == null)
            return;
        var $body = jQuery('body');
        var $form = jQuery("<form accept-charset=\"ISO-8859-1\" style=\"display: none;\" method=\"post\" target=\"_blank\" action=\"http://localhost/smartforms/?smart_session_recording_add_trigger=1\">\n                \n            </form>");
        var $hiddenField = jQuery("<input type=\"hidden\" name=\"html\"/>");
        $hiddenField.val(this.initialData.html);
        $form.append($hiddenField);
        $hiddenField = jQuery("<input type=\"hidden\" name=\"actions\" />");
        $hiddenField.val(JSON.stringify(this.actions));
        $form.append($hiddenField);
        $body.append($form);
        $form.submit();
    };
    Mirror.prototype.IsIE = function () {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");
        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
            return true;
        }
        else {
            return false;
        }
    };
    Mirror.prototype.SendData = function (data) {
        this.actions.push(data);
    };
    Mirror.prototype.InitializeHtml = function (initialData) {
        this.initialData = initialData;
    };
    return Mirror;
}());
exports.Mirror = Mirror;
//# sourceMappingURL=Mirror.js.map