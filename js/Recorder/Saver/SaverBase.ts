import * as LZString from "../../lib/lz-string.min";
import {InitialProperties, RecorderData, RecordValueBase} from "../../Shared/Shared";
import "jQuery";
declare var smartformsrecordingparams:any;
export abstract class SaverBase{
    protected data:string[]=[];
    public totalBytes:number=null;
    private html:string="";
    private initialProperties:string="";
    private lastTime:number;

    constructor(){
        jQuery(window).on('beforeunload',()=>{
            this.InternalBeforeClose();
        });
    }

    public AddData(recordData:RecorderData<RecordValueBase>)
    {
        this.lastTime=recordData.time;
        let data:any=LZString.compressToBase64(JSON.stringify(recordData));
        this.totalBytes+=this.GetByteLength(data);
        this.data.push(data);
        this.InternalDataAdded();
        //console.log('%cEvent Added:'+recordData.type +' TotalBytes:'+this.totalBytes,'background:#CCFFCC', recordData);

    }

    public abstract InternalBeforeClose();
    public abstract InternalDataAdded();

    public SendDataAddedSoFar(closeRecording:boolean=false,callback=null){

        if(callback==null)
            callback=function(){};
        jQuery.post(smartformsrecordingparams.ajaxurl,this.GetDataToSend(closeRecording),callback);

        this.data=[];
        this.totalBytes=0;

    }

    public GetDataToSend(closeRecording:boolean=false):any{
        if(this.data.length==0)
            return;
        let data:any={};
        data.lastTime=this.lastTime;
        if(closeRecording)
            data.duration=this.lastTime;
        data.actions=JSON.stringify(this.data);
        data.action='rednao_ssr_submit_recording';
        data.uniqid=smartformsrecordingparams.uniqid;
        if(this.initialProperties!='') {
            data.initialProperties = this.initialProperties;
            data.html=this.html;
            let sessionId:string=this.GetCookie('smart_session_recording');
            if(sessionId==null)
            {
                sessionId=smartformsrecordingparams.uniqid;
                this.SetCookie('smart_session_recording',sessionId);
            }
            data.sessionId=sessionId;
            let url:string=location.href;
            if(url.length>0&&url[url.length-1]=='/'){
                url=url.substring(0,url.length-1);
            }
            data.url=url.substr(url.lastIndexOf('/') + 1).substr(0,255);
            this.initialProperties='';
            this.html='';
        }
        return data;

    }

    public GetByteLength(s:string):number
    {
        var n=0;
        for(var i=0,l=s.length; i<l; i++){
            var hi=s.charCodeAt(i);
            if(hi<0x0080){ //[0x0000, 0x007F]
                n+=1;
            }else if(hi<0x0800){ //[0x0080, 0x07FF]
                n+=2;
            }else if(hi<0xD800){ //[0x0800, 0xD7FF]
                n+=3;
            }else if(hi<0xDC00){ //[0xD800, 0xDBFF]
                var lo=s.charCodeAt(++i);
                if(i<l&&lo>=0xDC00&&lo<=0xDFFF){ //followed by [0xDC00, 0xDFFF]
                    n+=4;
                }else{
                    throw new Error("UCS-2 String malformed");
                }
            }else if(hi<0xE000){ //[0xDC00, 0xDFFF]
                throw new Error("UCS-2 String malformed");
            }else{ //[0xE000, 0xFFFF]
                n+=3;
            }
        }
        return n;
    }

    setInitialWindowState($html: string, initialProperties: InitialProperties) {
        this.html=LZString.compressToBase64($html);
        this.initialProperties=JSON.stringify(initialProperties);
        //console.log("initial properties",this.initialProperties);
    }

    private SetCookie(name,value) {
        var expires = "";
        var date = new Date();
        date.setTime(date.getTime() + (24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    private GetCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }



}
