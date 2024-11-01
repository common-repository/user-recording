import * as React from "react";
import {RecordingSummary, RecorderData, animationSpeed} from "../../../Shared/Shared";


export class ReproductionBar  extends React.Component<RecorderBarProps,any> {
    cursor:JQuery=null;
    render(){
        //let totaltime=this.props.Actions[0].time;

        let totalDuration=this.props.Summary!=null?this.props.Summary.duration:0;
        if(totalDuration==0)
            totalDuration=1;

        return(
            <div style={{height:'25px',backgroundColor:'#fbfbfb',borderColor:'#dfdfdf',borderStyle:'solid',borderWidth:'1px'}} >
                {this.props.Summary!=null?
                    this.props.Summary.ranges.map((range,index)=>{
                        return(
                            <div key={index} style={{backgroundColor:'#6599FF',display:'inline-block',position:'absolute',top:0,height:'25px',width:range.duration*100/totalDuration+'%',left:range.startTime*100/totalDuration+'%'}}>&nbsp;</div>
                        )})
                    :<div></div>
                }
                <div ref={(element)=>{this.cursor=jQuery(element)}}  style={{backgroundColor:'black',height:'25px',width:'1px',display:'inline-block',position:'absolute',left:'1px'}}>&nbsp;</div>
            </div>);
    }


    componentDidUpdate(prevProps: Readonly<RecorderBarProps>, prevState: Readonly<any>, prevContext: any): void {

    }

    public StartPlaying()
    {
        if(this.cursor==null)
            return;
        this.cursor.stop();
        this.cursor.css('left',0);
        this.cursor.animate({left:'100%'},this.props.Summary.duration*animationSpeed,'linear');
    }
}

interface RecorderBarProps{
    Summary:RecordingSummary;
}