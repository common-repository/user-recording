import {JQueryRecorder} from "./RecordElements/JQueryRecorder";
declare var require;
import {Mirror} from "./Mirror";
import {MouseRecorder} from "./RecordElements/MouseRecorder";
import {InitialData, InitialProperties, RecorderData, RecordType, RecordValueBase} from "../Shared/Shared";
import {ChangeRecorder} from "./RecordElements/ChangeRecorder";
import {ScrollRecorder} from "./RecordElements/ScrollRecorder";
import {KeyboardRecorder} from "./RecordElements/KeyboardRecorder";
import {AjaxRecorder} from "./RecordElements/AjaxRecorder";
import {SaverBase} from "./Saver/SaverBase";
import {SendBeaconSaver} from "./Saver/SendBeaconSaver";
import {NormalSaver} from "./Saver/NormalSaver";
import {ResizeRecorder} from "./RecordElements/ResizeRecorder";
declare var jQuery:any;
declare var smartformsrecordingparams:any;

export class Recorder {
    private MouseRecorders: MouseRecorder;
    private JQueryRecorder:JQueryRecorder;
    private ChangeRecorder:ChangeRecorder;
    private ScrollRecorder:ScrollRecorder;
    private KeyboardRecorder:KeyboardRecorder;
    private ResizeRecorder:ResizeRecorder;
    private AjaxRecorder:AjaxRecorder;
    private startTime:number;
    private actionsCache:string[]=[];
    private initialData:InitialData;
    public saver:SaverBase;
    constructor() {
        this.startTime=new Date().getTime();
        this.InitializeSavingMechanism();
        this.StartRecorders();
        //this.Mirror = new Mirror();
        jQuery(() => {
            let $html = jQuery('html')[0].outerHTML;
            jQuery(() => {
                this.saver.setInitialWindowState($html,{
                    height:this.ResizeRecorder.GetViewPortHeight(),
                    width:this.ResizeRecorder.GetViewPortWidth()
                });
            });
            //this.Mirror.Initialize();

        });

    }

    public SendData(recordData:RecorderData<RecordValueBase>): void {
        recordData.time=new Date().getTime()-this.startTime;
        this.saver.AddData(recordData);
        //this.totalBytes+=this.GetByteLength(data);

        //this.Mirror.SendData(data);
    }



    private StartRecorders() {
        this.AjaxRecorder=new AjaxRecorder(this);
        this.MouseRecorders = new MouseRecorder(this);
        this.JQueryRecorder=new JQueryRecorder(this);
        this.ChangeRecorder=new ChangeRecorder(this);
        this.ScrollRecorder=new ScrollRecorder(this,this.MouseRecorders);
        this.KeyboardRecorder=new KeyboardRecorder(this);
        this.ResizeRecorder=new ResizeRecorder(this);
    }


    private InitializeSavingMechanism() {
        if(typeof navigator!='undefined'&&typeof navigator.sendBeacon!='undefined')
            this.saver=new SendBeaconSaver();
        else
            this.saver=new NormalSaver();

    }



}






