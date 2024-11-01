import {
    ChangeRecordValue,
    RecorderData, RecordingRange
} from "../../Shared/Shared";
import {PlayerBase} from "./PlayerBase";
import "es6-promise";

export class KeyboardPlayer extends PlayerBase{
    constructor(){
        super();
    }

    public async Execute(currentTime: number, record: RecorderData<ChangeRecordValue>) {
        return new Promise<number>(async (resolve)=>{
            let difference:number=record.time-currentTime;
            if(difference>0) {
                await this.Delay(difference);
            }
            jQuery(record.value.selector).val(record.value.value);
            resolve(record.time);

        });
    }

    public GetActionRange(currentTime: number, record: RecorderData<any>): RecordingRange {
        return {
            startTime:record.time,
            duration:100
        };
    }



}