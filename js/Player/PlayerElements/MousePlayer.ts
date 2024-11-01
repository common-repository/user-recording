import {
    animationSpeed,
    MouseElementInteraction, MouseMoveRecordValue, Point, RecorderData, RecordingRange,
    RecordType
} from "../../Shared/Shared";
import {PlayerBase} from "./PlayerBase";
import  "es6-promise";
declare var smartSessionRootUrl:string;
export class MousePlayer extends PlayerBase{
    public static $mousePointer:JQuery;
    normalColor:string='#00d2ff';
    clickColor:string='#ff2d70';
    public static MousePositionX:number=0;
    public static MousePositionY:number=0;
    constructor(){
        super();
        this.ExecuteMovement(0,{x:0,y:0})
    }



    public async Execute(currentTime: number, record: RecorderData<any>) {
        return new Promise<number>(async (resolve)=>{
            let difference:number=record.time-currentTime;
            if(difference>200) {
                await this.Delay(difference - 200);
                difference=200;
            }


            if(record.type==RecordType.Move) {
                await this.ExecuteMovement(difference, record.value);
                resolve(record.time);
            }

            if(record.type==RecordType.MouseEnter) {
                var data:MouseElementInteraction=record.value;
                await this.ExecuteMovement(difference, record.value);
                jQuery(data.selector).trigger('mouseenter');
                resolve(record.time);
            }

            if(record.type==RecordType.MouseLeave) {
                var data:MouseElementInteraction=record.value;
                await this.ExecuteMovement(difference, record.value);
                jQuery(data.selector).trigger('mouseleave');
                resolve(record.time);
            }

            if(record.type==RecordType.Click) {
                var data:MouseElementInteraction=record.value;
                await this.ExecuteMovement(difference, record.value);
                jQuery(data.selector).focus();
                this.FireEvent(data.selector,'click',{pageX:record.value.x,pageY:record.value.y});
                jQuery(data.selector).trigger('focus');

                this.AnimateClick();
                resolve(record.time);


            }



        });
    }

    private AnimateClick() {
        let $clickAnimation=jQuery(`<div  style="width:40px;height:40px;position: absolute;z-index: 10000000000;-webkit-border-radius: 100px;-moz-border-radius: 100px;border-radius: 100px;background-color: rgba(204, 0, 0,.4)">
                                                &nbsp;
                                           </div>`);
        let offset=MousePlayer.$mousePointer.offset();
        $clickAnimation.css({left:offset.left,top:offset.top});
        jQuery('body').append($clickAnimation);

        $clickAnimation.velocity({width:60,height:60,top:offset.top-10,left:offset.left-10},100,"easeInExp",()=>{
            $clickAnimation.velocity({width:0,height:0,top:offset.top+20,left:offset.left+20},300,"easeInExp",()=>{
                $clickAnimation.remove();
            });
        });
    }

    public async ExecuteMovement(time:number,position:Point)
    {
        return new Promise(async (resolve)=> {
            if(MousePlayer.$mousePointer==null)
            {
                MousePlayer.$mousePointer=jQuery(`<div  style="width:40px;height:40px;position: absolute;z-index: 10000000000;-webkit-border-radius: 100px;-moz-border-radius: 100px;border-radius: 100px;background-color: rgba(0,210,255,.4)">
                                                <img style="margin-top:11px;margin-left:16px;" src="${smartSessionRootUrl}img/mouse.png"/>
                                           </div>`);
                MousePlayer.$mousePointer.css({left:position.x-16,top:position.y-11});
                MousePlayer.MousePositionX=position.x-16;
                MousePlayer.MousePositionY=position.y-11;
                jQuery('body').append(MousePlayer.$mousePointer);
                resolve();
            }else
                console.log('Executing mouse movement at '+PlayerBase.TotalTimePassed);
                MousePlayer.$mousePointer.velocity({left:position.x-16,top:position.y-11},time*animationSpeed,()=>{
                    MousePlayer.MousePositionX=position.x-16;
                    MousePlayer.MousePositionY=position.y-11;
                    PlayerBase.TotalTimePassed+=time*animationSpeed;
                    resolve();
                });
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