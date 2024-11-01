import {
    AjaxReceived,
    ChangeRecordValue,
    RecorderData, RecordingRange, RecordType
} from "../../Shared/Shared";
import {PlayerBase} from "./PlayerBase";
import * as SparkMD5 from "../../lib/spark-md5";
declare var rnJQuery:any;
export class AjaxPlayer extends PlayerBase{

    private ajaxRequest:AjaxRequest[]=[];
    constructor(){
        super();
      this.MonitorJQuery(jQuery);
      if(typeof rnJQuery!='undefined')
          this.MonitorJQuery(rnJQuery);
    }

    public static DisableAjax(){

        XMLHttpRequest.prototype.send=function(){};
    }

    public async Execute(currentTime: number, record: RecorderData<AjaxReceived>) {
        return new Promise<number>(async (resolve)=>{
            let difference:number=record.time-currentTime;
            if(difference>0) {
                await this.Delay(difference);
            }
            for(let i:number=0;i<this.ajaxRequest.length;i++)
                if(this.ajaxRequest[i].id==record.value.id)
                {
                    var value=record.value.value;
                    try{
                        value=jQuery.parseJSON(value);
                    }catch(e)
                    {

                    }
                    this.ajaxRequest[i].complete(value);
                    this.ajaxRequest.splice(i,1);
                    resolve(record.time);
                }
            resolve(record.time);



        });
    }


    private MonitorJQuery(jQuery) {
        var self=this;
        jQuery.ajax=function(){
            let ajaxId:string='';

            if(arguments.length>0){
                if(typeof arguments[0].data!='undefined'&&typeof arguments[0].data!=null)
                {
                    ajaxId=arguments[0].data.action;
                }

                if(typeof arguments[0].success!='undefined'&&arguments[0].success!=null) {
                    ajaxId+=arguments[0].success.toString();
                    let md5Id:string=SparkMD5.hash(ajaxId);
                    let previousSuccess=arguments[0].success;

                    self.ajaxRequest.push({id:md5Id,complete:previousSuccess});
                    console.log('Added request!',self.ajaxRequest);
                }
            }

        }
    }

    public GetActionRange(currentTime: number, record: RecorderData<any>): RecordingRange {
        return null;
    }
}

interface AjaxRequest{
    id:string;
    complete:(result:any)=>{};
}