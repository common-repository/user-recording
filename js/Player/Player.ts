import {
     RecorderData, RecordingRange, RecordingSummary, RecordType,
    RecordValueBase
} from "../Shared/Shared";
import * as LZString from "../lib/lz-string.min";
import {MousePlayer} from "./PlayerElements/MousePlayer";
import  "es6-promise";
import {ChangePlayer} from "./PlayerElements/ChangePlayer";
import {ScrollPlayer} from "./PlayerElements/ScrollPlayer";
import {KeyboardPlayer} from "./PlayerElements/KeyboardPlayer";
import {AjaxPlayer} from "./PlayerElements/AjaxPlayer";
declare var smartSessionRecordingActions:string[];
declare var smartSessionRootUrl:string;
declare var rnJQuery:any;
declare var smartSessionRecordingInitialProperties:any;

import "jQuery";
import "es6-promise";
import {ResizePlayer} from "./PlayerElements/ResizePlayer";
import {JQueryPlayer} from "./PlayerElements/JQueryPlayer";
import {PlayerBase} from "./PlayerElements/PlayerBase";
export class Player {
    actions:RecorderData<any>[]=[];
    currentTime:number=0;
    mousePlayer:MousePlayer;
    changePlayer:ChangePlayer;
    scrollPlayer:ScrollPlayer;
    keyboardPlayer:KeyboardPlayer;
    resizePlayer:ResizePlayer;
    jQueryPlayer:JQueryPlayer;
    ajaxPlayer:AjaxPlayer;
    initialScrollTop:number=0;
    initialScrollLeft:number=0;
    playerIframe:JQuery;
    iframeContainer:JQuery;
    constructor() {
        AjaxPlayer.DisableAjax();
        this.UncompressRecordData();
        this.UpdateIframeSize();

        jQuery(()=>{
            setTimeout(()=>{
                jQuery(document).scrollTop(this.initialScrollTop);
                jQuery(document).scrollLeft(this.initialScrollLeft);
                this.InitializePlayers();

                let recordingSummary:RecordingSummary={
                    duration:this.actions.length==0?0:this.actions[this.actions.length-1].time,
                    ranges:this.GetRecordingRanges()
                };
                this.PostMessage('createRecorderBar',{summary:recordingSummary});
                this.Start();
            },10);

        })

    }



    public async Start(){
        PlayerBase.TotalTimePassed=0;
        this.PostMessage('startPlaying',{});
        for(let record of this.actions)
        {
           this.currentTime=await this.GetPlayer(record).Execute(this.currentTime,record);
        }
    }

    public GetPlayer(record:RecorderData<any>):PlayerBase
    {
        if(record.type==RecordType.Move||record.type==RecordType.MouseEnter||record.type==RecordType.MouseLeave||record.type==RecordType.Click)
            return this.mousePlayer;

        if(record.type==RecordType.Change)
            return this.changePlayer;

        if(record.type==RecordType.Scroll)
            return this.scrollPlayer;

        if(record.type==RecordType.KeyValue)
            return this.keyboardPlayer;

        if(record.type==RecordType.AjaxReceived)
            return this.ajaxPlayer;

        if(record.type==RecordType.Resize)
            return this.resizePlayer;

        if(record.type==RecordType.Submit)
            return this.jQueryPlayer;
    }

    private UncompressRecordData() {
        for(let actionlist of smartSessionRecordingActions)
            for(let action of actionlist)
                this.actions.push(jQuery.parseJSON(LZString.decompressFromBase64(action)));

        //console.log(this.actions);
    }

    private InitializePlayers() {
        this.mousePlayer=new MousePlayer();
        this.changePlayer=new ChangePlayer();
        this.scrollPlayer=new ScrollPlayer(this.initialScrollTop,this.initialScrollLeft);
        this.keyboardPlayer=new KeyboardPlayer();
        this.ajaxPlayer=new AjaxPlayer();
        this.resizePlayer=new ResizePlayer(this);
        this.jQueryPlayer=new JQueryPlayer();
    }

    public PostMessage(type:string,data:any)
    {
        window.parent.postMessage({
            data:data,
            type:type
        },'*');
    }


    public UpdateIframeSize() {
        this.PostMessage('smartSessionRecordingEvent',{  width:smartSessionRecordingInitialProperties.width, height:smartSessionRecordingInitialProperties.height});
    }

    private GetRecordingRanges() :RecordingRange[]{
        let currentMilliseconds:number=0;
        let playerRanges:RecordingRange[]=[];
        for(let action of this.actions)
        {
            let range=this.GetPlayer(action).GetActionRange(currentMilliseconds,action);
            currentMilliseconds=action.time;
            if(range!=null)
                playerRanges.push(range);
        }
        console.log('Ranges',playerRanges);
        return playerRanges;
    }
}


(<any>window).SmartSessionRecordingPlayer=new Player();