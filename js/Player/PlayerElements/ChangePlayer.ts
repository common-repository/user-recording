import {
    ChangeRecordValue,
    RecorderData
} from "../../Shared/Shared";
import {PlayerBase} from "./PlayerBase";
import 'es6-promise';

export class ChangePlayer extends PlayerBase{
    constructor(){
        super();
    }

    public async Execute(currentTime: number, record: RecorderData<ChangeRecordValue>) {
        return new Promise<number>(async (resolve)=>{
            let difference:number=record.time-currentTime;
            if(difference>0) {
                await this.Delay(difference);
            }
            jQuery(record.value.selector).val(record.value.value).change();
            resolve(record.time);

        });
    }

    public GetActionRange(currentTime: number, record: RecorderData<any>) {
        return null;
    }



}