import {
    AjaxReceived,
    ChangeRecordValue, JQueryTriggered,
    RecorderData, RecordType
} from "../../Shared/Shared";
import {PlayerBase} from "./PlayerBase";
import * as SparkMD5 from "../../lib/spark-md5";
declare var rnJQuery:any;
export class JQueryPlayer extends PlayerBase{
    private jQueryInstances:JQueryStatic[]=[];
    constructor(){
        super();
        this.jQueryInstances.push(jQuery);
        if(typeof rnJQuery!='undefined')
          this.jQueryInstances.push(rnJQuery);
    }



    public async Execute(currentTime: number, record: RecorderData<JQueryTriggered>) {
        return new Promise<number>(async (resolve)=>{
            let difference:number=record.time-currentTime;
            if(difference>0) {
                await this.Delay(difference);
            }

            if(record.type==RecordType.Submit)
            {
                this.ExecuteEvent(record.value.selector,'submit');
            }

            resolve(record.time);


        });
    }


    private ExecuteEvent(selector:string, eventName: string) {
        for(let query of this.jQueryInstances)
            query(selector).trigger(eventName);
    }

    public GetActionRange(currentTime: number, record: RecorderData<any>) {
        return null;
    }
}

interface AjaxRequest{
    id:string;
    complete:(result:any)=>{};
}