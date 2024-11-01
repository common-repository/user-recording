import {Recorder} from "../Recorder";
import {RecorderData, RecordType} from "../../Shared/Shared";
import {RecorderBase} from "./RecorderBase";
export class ChangeRecorder extends RecorderBase{
    private processingScroll=false;
    private LastScroll:number=0;
    private SetInterval:any=null;
    constructor(recorder: Recorder) {
        super(recorder);
        jQuery(document).change((e)=>this.RecordChange(e));
    }



    private RecordChange(e) {
       this.recorder.SendData({type:RecordType.Change,value:{selector:this.GetElementName(e.target),value:jQuery(e.target).val()}});

    }
}

