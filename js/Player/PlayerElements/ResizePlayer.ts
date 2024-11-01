import {
    ChangeRecordValue,
    RecorderData, RecordingRange, ResizeRecordValue, ScrollRecordValue
} from "../../Shared/Shared";
import {PlayerBase} from "./PlayerBase";
import {MousePlayer} from "./MousePlayer";
import "jQuery";
import {Player} from "../Player";
declare var smartSessionRecordingInitialProperties:any;
export class ResizePlayer extends PlayerBase{

    constructor(private player:Player){
        super();
    }

    public async Execute(currentTime: number, record: RecorderData<ResizeRecordValue>) {
        return new Promise<number>(async (resolve)=>{
            let difference:number=record.time-currentTime;
            if(difference>0)
                await this.Delay(difference);

            smartSessionRecordingInitialProperties.width=record.value.width;
            smartSessionRecordingInitialProperties.height=record.value.height;

            this.player.UpdateIframeSize();
            resolve(record.time);

        });
    }

    public GetActionRange(currentTime: number, record: RecorderData<any>): RecordingRange {
        return {
            startTime:record.time,
            duration:100
        }
    }



}