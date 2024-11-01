import {Recorder} from "../Recorder";
import {RecorderData, RecordType} from "../../Shared/Shared";
import {RecorderBase} from "./RecorderBase";
export class MouseRecorder extends RecorderBase{
    private processMovement:boolean=true;
    private interval:any=null;
    private lastTimestamp:number=-1;
    constructor(recorder: Recorder) {
        super(recorder);
        this.ResetMouseMovementInterval();
        this.RecordClicks();
    }

    public ResetMouseMovementInterval():void{
        if(this.interval!=null)
            clearInterval(this.interval);
        this.processMovement=false;
        this.interval=setInterval(()=>{
                            this.processMovement=true;
                        },200);
        jQuery(document).mousemove((e)=>{
            if(!this.processMovement)
                return;
            this.processMovement=false;
            this.recorder.SendData({type:RecordType.Move,value:{x:e.pageX,y:e.pageY}});
        });
    }

    private RecordClicks() {
        jQuery(document).click((e)=>{
            if(this.lastTimestamp==e.timeStamp)
                return;
            if(e.target.nodeName=="SELECT"&&e.pageX==0)
                return;

            this.lastTimestamp=e.timeStamp;
            this.recorder.SendData({
                type:RecordType.Click,
                value:{x:e.pageX,y:e.pageY,selector:this.GetElementName(e.target)
                }});
        });
    }
}

