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
var JQueryRecorder = (function (_super) {
    __extends(JQueryRecorder, _super);
    function JQueryRecorder(recorder) {
        var _this = _super.call(this, recorder) || this;
        _this.eventList = [];
        _this.MonitorJQuery();
        return _this;
    }
    JQueryRecorder.prototype.MonitorJQuery = function () {
        if (typeof jQuery.fn == "undefined" || jQuery.fn.on == 'undefined')
            return;
        var previousOn = jQuery.fn.on;
        var self = this;
        jQuery.fn.on = function () {
            var events = self.GetEventNames(arguments[0]);
            console.log('%cEvent Registeres', 'background:#ffffba', events);
            for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
                var event_1 = events_1[_i];
                var dotIndex = event_1.indexOf('.');
                var eventName = event_1;
                var isSFREvent = false;
                if (dotIndex > -1) {
                    eventName = eventName.substr(0, dotIndex);
                    isSFREvent = event_1.substr(dotIndex + 1) == 'smartformsrecording';
                }
                if (!isSFREvent && (eventName == 'mouseenter' || eventName == 'mouseleave')) {
                    self.MonitorEvent(this, eventName, arguments.length >= 2 ? arguments[2] : null);
                }
            }
            return previousOn.apply(this, arguments);
        };
        /*    jQuery.fn.off=function(){
                let events:string[]=self.GetEventNames(arguments[0]);
                for(let event of events)
                {
                    let dotIndex=event.indexOf('.');
                    let eventName=event;
                    let isSFREvent=false;
                    if(dotIndex>-1) {
                        eventName = eventName.substr(0, dotIndex);
                        isSFREvent=event.substr(dotIndex+1)=='smartformsrecording';
                    }
    
                    if(!isSFREvent&&(eventName=='mouseenter'||eventName=='mouseleave'))
                    {
                        self.MonitorEvent(this,eventName,arguments.length>=2?arguments[2]:null);
                    }
    
                }
                return previousOn.apply(this,arguments);
            }*/
    };
    JQueryRecorder.prototype.GetEventNames = function (argument) {
        if (typeof argument == 'string')
            return [argument];
        if (typeof argument == 'object') {
            var events = [];
            for (var argumentName in argument) {
                events.push(argumentName);
            }
            return events;
        }
        return [];
    };
    JQueryRecorder.prototype.MonitorEvent = function (element, eventName, callBack) {
        var _this = this;
        if (eventName == 'mouseenter') {
            element.on('mouseenter' + '.smartformsrecording', function (e) {
                _this.recorder.SendData({ type: Shared_1.RecordType.MouseEnter, value: { x: e.pageX, y: e.pageY, selector: _this.GetElementName(e.currentTarget) } });
            });
            element.on('mouseleave' + '.smartformsrecording', function (e) {
                _this.recorder.SendData({ type: Shared_1.RecordType.MouseLeave, value: { x: e.pageX, y: e.pageY, selector: _this.GetElementName(e.currentTarget) } });
            });
        }
    };
    return JQueryRecorder;
}(RecorderBase_1.RecorderBase));
exports.JQueryRecorder = JQueryRecorder;
//# sourceMappingURL=JQueryRecorder.js.map