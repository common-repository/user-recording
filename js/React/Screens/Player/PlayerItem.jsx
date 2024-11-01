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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var PlayerItem = (function (_super) {
    __extends(PlayerItem, _super);
    function PlayerItem() {
        var _this = _super.call(this) || this;
        _this.state = {};
        return _this;
    }
    PlayerItem.prototype.render = function () {
        var _this = this;
        var child;
        if (this.props.item == null)
            child = ([<img key='img' src={smartformsrecordingparams.pluginUrl + 'img/loadingSmall.gif'}/>,
                <h3 key="h3" style={{ verticalAlign: 'middle', display: 'inline' }}>  Loading Recorded Sessions</h3>]);
        else
            child = ([
                <p key='p1'><span title="URL" className="glyphicon glyphicon-link"></span> {this.props.item.url == '' ? '/' : this.props.item.url}</p>,
                <p key='p2'><span title="Recording Date" className="glyphicon glyphicon-calendar"></span> {this.MillisecondsToDate(this.props.item.start_time)}</p>,
                <p key='p3'><span title="Duration" className="glyphicon glyphicon-time"></span> {this.MillisecondsToDuration(this.props.item.duration)}</p>
            ]);
        return (<a href="#a" onClick={this.props.onClick} ref={function (node) { return _this.$Container = jQuery(node); }} className={'list-group-item ' + this.props.className}>
           {child}
        </a>);
    };
    PlayerItem.prototype.MillisecondsToDate = function (start_time) {
        var date = new Date(parseInt(start_time));
        var monthName;
        switch (date.getMonth()) {
            case 0:
                monthName = 'January';
                break;
            case 1:
                monthName = 'February';
                break;
            case 2:
                monthName = 'March';
                break;
            case 3:
                monthName = 'April';
                break;
            case 4:
                monthName = 'May';
                break;
            case 5:
                monthName = 'June';
                break;
            case 6:
                monthName = 'July';
                break;
            case 7:
                monthName = 'August';
                break;
            case 8:
                monthName = 'September';
                break;
            case 9:
                monthName = 'October';
                break;
            case 10:
                monthName = 'November';
                break;
            case 11:
                monthName = 'December';
        }
        return monthName + '-' + this.FormatTimeSection(date.getDate()) + '-' + date.getFullYear() + ' ' + this.FormatTimeSection(date.getHours()) + ':' + this.FormatTimeSection(date.getMinutes()) + ":" + this.FormatTimeSection(date.getSeconds());
    };
    PlayerItem.prototype.FormatTimeSection = function (time) {
        if (time >= 10)
            return time;
        return '0' + time.toString();
    };
    PlayerItem.prototype.MillisecondsToDuration = function (st) {
        var start_time = parseInt(st);
        var ms = start_time % 1000;
        start_time = (start_time - ms) / 1000;
        var secs = start_time % 60;
        start_time = (start_time - secs) / 60;
        var mins = start_time % 60;
        var hrs = (start_time - mins) / 60;
        return this.FormatTimeSection(hrs) + ':' + this.FormatTimeSection(mins) + ':' + this.FormatTimeSection(secs);
    };
    return PlayerItem;
}(React.Component));
exports.PlayerItem = PlayerItem;
