import {Recorder} from "../Recorder";
import {RecorderData, RecordType} from "../../Shared/Shared";
import {RecorderBase} from "./RecorderBase";
export class KeyboardRecorder extends RecorderBase{

    constructor(recorder: Recorder) {
        super(recorder);
        this.RecordKeys();
    }

    private RecordKeys() {

        jQuery(document).on('input',(e)=>{
           this.recorder.SendData({type:RecordType.KeyValue,value:{value:jQuery(e.target).val(),selector:this.GetElementName(e.target)}});
        });
    }
}
