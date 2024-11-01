import {
    animationSpeed,
    ChangeRecordValue,
    RecorderData, RecordingRange, ScrollRecordValue
} from "../../Shared/Shared";
import {PlayerBase} from "./PlayerBase";
import {MousePlayer} from "./MousePlayer";
import 'es6-promise';

export class ScrollPlayer extends PlayerBase{
    constructor(private lastScrollY,private lastScrollX){
        super();
    }

    public async Execute(currentTime: number, record: RecorderData<ScrollRecordValue>) {
        return new Promise<number>(async (resolve)=>{

           let difference:number=record.time-currentTime;
            if(difference>200) {
                await this.Delay(difference-200);
                difference=200;
            }
            if(this.lastScrollY!=record.value.top) {
                let topDifference=record.value.top-this.lastScrollY;
                jQuery('html').velocity('scroll', {duration: difference*animationSpeed, offset: record.value.top,complete:()=>{
                    resolve(record.time)
                }});
                MousePlayer.$mousePointer.velocity({top:MousePlayer.MousePositionY+topDifference},difference*animationSpeed);
                this.lastScrollY=record.value.top;
                MousePlayer.MousePositionY=MousePlayer.MousePositionY+topDifference;
            }
            if(this.lastScrollX!=record.value.left) {
                let leftDifference=record.value.left-this.lastScrollX;
                jQuery('html').velocity('scroll', {axis:'x', duration: difference*animationSpeed, offset: record.value.left,complete:()=>{
                    resolve(record.time)
                }});
                MousePlayer.$mousePointer.velocity({top:MousePlayer.MousePositionX+leftDifference},difference*animationSpeed);
                this.lastScrollY=record.value.top;
                MousePlayer.MousePositionY=MousePlayer.MousePositionX+leftDifference;
            }
        });
    }

    public GetActionRange(currentTime: number, record: RecorderData<any>): RecordingRange {
        let difference:number=record.time-currentTime;
        if(difference>200) {
            difference=200;
        }

        return {
            startTime:record.time-difference,
            duration:difference
        }
    }



}