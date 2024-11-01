import {Recorder} from "../Recorder";
import {RecorderData, RecordType} from "../../Shared/Shared";
import {RecorderBase} from "./RecorderBase";
import "jQuery";
import {MouseRecorder} from "./MouseRecorder";
export class ResizeRecorder extends RecorderBase{
    public resizeFired:boolean=true;
    public lastRecordedWidth:number;
    public lastRecordedHeight:number;
    public timeOut:any;
    constructor(recorder: Recorder) {
        super(recorder);
        jQuery(window).resize(()=>{this.resizeFired=true; this.SizeChanged();})
    }

    public GetViewPortWidth():number{
        if(typeof window.innerWidth!='undefined')
            return window.innerWidth;
        return jQuery(window).width();
    }

    public GetViewPortHeight():number{
        if(typeof window.innerHeight!='undefined')
            return window.innerHeight;
        return jQuery(window).height();
    }

    private SizeChanged() {

        if(this.resizeFired)
        {
            if(this.timeOut!=null)
                clearTimeout(this.timeOut);
            this.resizeFired=false;
            this.timeOut=setTimeout(()=>this.SizeChanged(),300);
        }else{
            let auxWidth=this.GetViewPortWidth();
            let auxHeight=this.GetViewPortHeight();
            if(this.lastRecordedWidth!=auxWidth||this.lastRecordedHeight!=auxHeight) {
                this.lastRecordedHeight=auxHeight;
                this.lastRecordedWidth=auxWidth;
                this.recorder.SendData({
                    type: RecordType.Resize,
                    value: {width: auxWidth, height:auxHeight}
                });
            }
        }
    }
}

