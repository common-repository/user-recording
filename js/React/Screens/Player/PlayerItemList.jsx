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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var AsyncAjax_1 = require("../../../Shared/AsyncAjax");
var react_bootstrap_1 = require("react-bootstrap");
var PlayerItem_1 = require("./PlayerItem");
require("jQuery");
require("es6-promise");
var PlayerItemList = (function (_super) {
    __extends(PlayerItemList, _super);
    function PlayerItemList() {
        var _this = _super.call(this) || this;
        _this.LastItem = null;
        _this.executinSearch = false;
        _this.currentPage = -1;
        _this.items = [];
        _this.noMoreRecords = false;
        _this.state = {
            HeaderItems: [],
            SelectedItem: null
        };
        return _this;
    }
    PlayerItemList.prototype.ItemSelected = function (header) {
        this.setState({ SelectedItem: header });
        this.props.ItemSelected(header);
    };
    PlayerItemList.prototype.render = function () {
        var _this = this;
        return (<react_bootstrap_1.ListGroup>
            {this.state.HeaderItems.map(function (headerItems, index) {
            return (<PlayerItem_1.PlayerItem item={headerItems} key={headerItems == null ? null : headerItems.uniq_id} onClick={function () { return _this.ItemSelected(headerItems); }} className={headerItems != null && headerItems == _this.state.SelectedItem ? "active" : ""}>

                </PlayerItem_1.PlayerItem>);
        })}
                {this.noMoreRecords ?
            (this.state.HeaderItems == null || this.state.HeaderItems.length == 0 ?
                <a style={{ padding: '20px', backgroundColor: '#eee' }} className="list-group-item"><span className="glyphicon glyphicon-exclamation-sign"></span> Oh there are no recordings to show, please wait until someone use your site and try again</a>
                : <a style={{ padding: '20px', backgroundColor: '#eee' }} className="list-group-item"><span className="glyphicon glyphicon-road"></span> End of the road, there are no more recordings!</a>) : <PlayerItem_1.PlayerItem item={null} ref={(function (list) { return _this.LastItem = list; })} onClick={function () { return _this.ItemSelected(null); }} className=''/>}
        </react_bootstrap_1.ListGroup>);
    };
    PlayerItemList.prototype.componentDidMount = function () {
        var _this = this;
        jQuery(window).scroll(function () {
            _this.CheckIfLoadingIsNeedes();
        });
        this.ExecuteSearch();
    };
    PlayerItemList.prototype.Refresh = function () {
        this.noMoreRecords = false;
        this.currentPage = -1;
        if (this.ExecutinSearchToken != null) {
            this.ExecutinSearchToken.Cancel();
            this.ExecutinSearchToken = null;
        }
        this.setState({ HeaderItems: [], SelectedItem: null });
        this.ExecuteSearch();
    };
    PlayerItemList.prototype.ExecuteSearch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var promiseWithToken, resultWithToken, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.executinSearch) return [3 /*break*/, 2];
                        this.executinSearch = true;
                        promiseWithToken = AsyncAjax_1.AsyncAjax.PostWithToken({ action: 'rednao_ssr_get_recordings', page: ++this.currentPage });
                        this.ExecutinSearchToken = promiseWithToken.Token;
                        return [4 /*yield*/, promiseWithToken.Promise];
                    case 1:
                        resultWithToken = _a.sent();
                        if (resultWithToken.WasCancelled) {
                            this.executinSearch = false;
                            return [2 /*return*/];
                        }
                        this.ExecutinSearchToken = null;
                        result = resultWithToken.Result;
                        if (result.length == 0 || result.length < 20)
                            this.noMoreRecords = true;
                        this.setState({ HeaderItems: this.state.HeaderItems.concat(result) });
                        this.executinSearch = false;
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    PlayerItemList.prototype.CheckIfLoadingIsNeedes = function () {
        if (this.LastItem == null)
            return;
        var scrollTop = jQuery(window).scrollTop();
        var windowHeight = jQuery(window).height();
        var lastNodeTop = this.LastItem.$Container.offset().top;
        if (lastNodeTop - 200 < scrollTop + windowHeight)
            this.ExecuteSearch();
    };
    PlayerItemList.prototype.componentDidUpdate = function (prevProps, prevState, prevContext) {
        if (this.props.SelectedItem != prevProps.SelectedItem && this.props.SelectedItem != this.state.SelectedItem)
            this.setState({ SelectedItem: this.props.SelectedItem });
    };
    return PlayerItemList;
}(React.Component));
exports.PlayerItemList = PlayerItemList;
//<editor-fold> 
