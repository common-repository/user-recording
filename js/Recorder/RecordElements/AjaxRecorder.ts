import {Recorder} from "../Recorder";
import {AjaxReceived,  RecorderData, RecordType} from "../../Shared/Shared";
import {RecorderBase} from "./RecorderBase";
import * as SparkMD5 from "../../lib/spark-md5";
declare var rnJQuery:any;
export class AjaxRecorder extends RecorderBase{

    constructor(recorder: Recorder) {
        super(recorder);
        this.RecordAjax();
        jQuery(()=>{
            if(typeof rnJQuery!='undefined')
                this.MonitorJQuery(rnJQuery);
        });
    }

    private RecordAjax() {
        this.MonitorJQuery(jQuery);

    }

    private MonitorJQuery(query: any) {
        let previousAjax=query.ajax;
        let self=this;
        query.ajax=function(){
            let ajaxId:string='';

            if(arguments.length>0){
                if(typeof arguments[0].data!='undefined'&&typeof arguments[0].data!=null)
                {
                    if(arguments[0].data.action=="rednao_ssr_submit_recording")
                    {
                        previousAjax.apply(this,arguments);
                        return;
                    }
                    ajaxId=arguments[0].data.action;
                }

                if(typeof arguments[0].success!='undefined'&&arguments[0].success!=null) {
                    ajaxId+=arguments[0].success.toString();
                    let previousSuccess=arguments[0].success;
                    arguments[0].success=function(){
                        self.recorder.SendData({type:RecordType.AjaxReceived,value:<AjaxReceived>{id:SparkMD5.hash(ajaxId),value:JSON.stringify(arguments[0])}});
                        previousSuccess.apply(this,arguments)
                    };

                }
            }

            previousAjax.apply(this,arguments);
        }
    }
}
