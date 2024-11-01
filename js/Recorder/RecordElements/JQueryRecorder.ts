import {Recorder} from "../Recorder";
import {RecordType} from "../../Shared/Shared";
import {RecorderBase} from "./RecorderBase";

declare var rnJQuery;
export class JQueryRecorder extends RecorderBase{
    public eventList:any[]=[];
    constructor(recorder: Recorder) {
        super(recorder);
        this.MonitorJQuery(jQuery);
        jQuery(()=>{
            if(typeof rnJQuery!='undefined')
                this.MonitorJQuery(rnJQuery);
        });

    }

    private MonitorJQuery(query:JQueryStatic) {
        if(typeof query.fn =="undefined"||query.fn.on=='undefined')
            return;
        let previousOn=query.fn.on;
        let self=this;
        query.fn.on=function(){
            let events:string[]=self.GetEventNames(arguments[0]);
            //console.log('%cEvent Registeres','background:#ffffba',events);
            for(let event of events)
            {
                let dotIndex=event.indexOf('.');
                let eventName=event;
                let isSFREvent=false;
                if(dotIndex>-1) {
                    eventName = eventName.substr(0, dotIndex);
                    isSFREvent=event.substr(dotIndex+1)=='smartformsrecording';
                }

                if(!isSFREvent&&(eventName=='mouseenter'||eventName=='mouseleave'||eventName=='submit'))
                {
                    self.MonitorEvent(this,eventName,arguments.length>=2?arguments[2]:null);
                }

            }
            return previousOn.apply(this,arguments);
        };

    /*    jQuery.fn.off=function(){
            let events:string[]=self.GetEventNames(arguments[0]);
            for(let event of events)
            {
                let dotIndex=event.indexOf('.');
                let eventName=event;
                let isSFREvent=false;
                if(dotIndex>-1) {
                    eventName = eventName.substr(0, dotIndex);
                    isSFREvent=event.substr(dotIndex+1)=='smartformsrecording';
                }

                if(!isSFREvent&&(eventName=='mouseenter'||eventName=='mouseleave'))
                {
                    self.MonitorEvent(this,eventName,arguments.length>=2?arguments[2]:null);
                }

            }
            return previousOn.apply(this,arguments);
        }*/
    }

    private GetEventNames(argument: any):string[] {
        if(typeof argument =='string')
            return [argument];
        if(typeof argument =='object') {
            let events:string[]=[];
            for (var argumentName in argument) {
                events.push(argumentName);
            }
            return events;
        }
        return [];
    }

    MonitorEvent( element: JQuery,eventName: string,callBack:any) {
        if(eventName=='mouseenter')
        {
            element.on('mouseenter'+'.smartformsrecording',(e)=>{
                this.recorder.SendData({type:RecordType.MouseEnter,value:{x:e.pageX,y:e.pageY,selector:this.GetElementName(e.currentTarget)}});
            });

            element.on('mouseleave'+'.smartformsrecording',(e)=>{
                this.recorder.SendData({type:RecordType.MouseLeave,value:{x:e.pageX,y:e.pageY,selector:this.GetElementName(e.currentTarget)}});
            });
        }

        if(eventName=='submit')
        {
            element.on('submit'+'.smartformsrecording',(e)=>{
                this.recorder.SendData({type:RecordType.Submit,value:{selector:this.GetElementName(e.currentTarget)}});
            });
        }

    }
}
