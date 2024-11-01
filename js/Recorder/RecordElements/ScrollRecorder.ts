import {Recorder} from "../Recorder";
import {RecorderData, RecordType} from "../../Shared/Shared";
import {RecorderBase} from "./RecorderBase";
import {MouseRecorder} from "./MouseRecorder";
export class ScrollRecorder extends RecorderBase{
    private processingScroll=false;
    private LastScrollTop:number=0;
    private LastScrollLeft:number=0;
    private SetInterval:any=null;
    constructor(recorder: Recorder,private mouseRecorder:MouseRecorder) {
        super(recorder);
        jQuery(document).scroll((e)=>this.ScrollChange(e));
        setInterval(()=>{
            if(!this.processingScroll)
                return;

            this.mouseRecorder.ResetMouseMovementInterval();
            this.processingScroll=true;
            this.recorder.SendData({type:RecordType.Scroll,value:{top:this.LastScrollTop,left:this.LastScrollLeft}});
            this.processingScroll=false;

        },200);
    }



    private ScrollChange(e) {
        this.processingScroll=true;
        this.LastScrollTop=jQuery(document).scrollTop();
        this.LastScrollLeft=jQuery(document).scrollLeft();

    }
}

