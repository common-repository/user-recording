import * as React from "react";
import {GroupedPlayers, PlayerHeader} from "./PlayerItemList";
declare var smartformsrecordingparams:any;


export class PlayerItem  extends React.Component<PlayerItemProps,PlayerItemState>{
    public $Container:JQuery;
    constructor(){
        super();
        this.SubRecordingSelected.bind(this);
        this.state={

        };

    }



    render(){

        let child;
        if(this.props.item==null)
            child=(   [<img key='img' src={smartformsrecordingparams.pluginUrl+'img/loadingSmall.gif'}/>,
                <h3 key="h3" style={{verticalAlign:'middle', display:'inline'}}>  Loading Recorded Sessions</h3>]);
        else
            child=([
                <div key="p1" style={{padding:'10px 15px 0 15px'}}>
                    <div key='p3' style={{padding:0}} className="col-sm-4"><span title="Duration" className="glyphicon glyphicon-time"></span> {this.MillisecondsToDuration(this.props.item.Duration.toString())}</div>
                    <div key='p2' style={{padding:0,textAlign:'center'}} className="col-sm-4"><span title="Recording Date" className="glyphicon glyphicon-calendar"></span> {this.MillisecondsToDate(this.props.item.StartTime)}</div>
                    <div key='p4' style={{padding:0,textAlign:'right'}} className="col-sm-4"><span title="URL" className="glyphicon glyphicon-user"></span> {this.props.item.UserId!=''?this.props.item.UserId:this.props.item.SessionId.substr(0,this.props.item.SessionId.lastIndexOf('.'))}</div>
                </div>,
                <div key="p6" style={{clear:'both', padding:'2px 15px 10px 15px',borderTopStyle:'dashed',borderTopWidth:'1px',borderTopColor:'#fafafa'}}>
                    {this.props.item.RelatedPlays.map((headerItem,index)=>{return (
                        [
                            <span className={'glyphicon glyphicon-play playingIcon ' + (this.props.selectedItem==headerItem?'active':'inactive')}></span>,
                            <span className="usrfwp-recording-item" key={headerItem.uniq_id}  onClick={(e)=>{this.SubRecordingSelected(e,headerItem)}}>{headerItem.url==''?'/':headerItem.url}({this.MillisecondsToDuration(headerItem.duration)})</span>,
                            index<this.props.item.RelatedPlays.length-1?
                                <span className="glyphicon glyphicon-chevron-right" style={{fontSize:'13px', padding:'0 1px 0 1px'}}></span>:
                                <span></span>
                        ]
                    )})}
                </div>,
                <div key='p5' style={{clear:'both'}}></div>
                ]);


       return (<a href="#a" style={{padding:0}} onClick={this.props.onClick} ref={(node)=>this.$Container=jQuery(node)} className={'list-group-item '+this.props.className}>
           {child}
        </a>);

    }

    public SubRecordingSelected(e:any,itemSelected)
    {
        e.stopPropagation();
        if(this.props.onItemSelected!=null)
            this.props.onItemSelected(itemSelected);
    }

    private MillisecondsToDate(start_time: string) {
        let date=new Date(parseInt(start_time));
        let monthName;
        switch (date.getMonth())
        {
            case 0:
                monthName='Jan';
                break;
            case 1:
                monthName='Feb';
                break;
            case 2:
                monthName='Mar';
                break;
            case 3:
                monthName='Apr';
                break;
            case 4:
                monthName='May';
                break;
            case 5:
                monthName='Jun';
                break;
            case 6:
                monthName='Jul';
                break;
            case 7:
                monthName='Aug';
                break;
            case 8:
                monthName='Sep';
                break;
            case 9:
                monthName='Oct';
                break;
            case 10:
                monthName='Nov';
                break;
            case 11:
                monthName='Dec';
        }


        return monthName+'-'+this.FormatTimeSection(date.getDate())+'-'+date.getFullYear()+' '+this.FormatTimeSection(date.getHours())+':'+this.FormatTimeSection(date.getMinutes())+":"+this.FormatTimeSection(date.getSeconds());
    }

    private FormatTimeSection(time:number)
    {
        if(time>=10)
            return time;
        return '0'+time.toString();

    }

    private MillisecondsToDuration(st: string) {
        let start_time:number=parseInt(st);
        let ms = start_time % 1000;
        start_time = (start_time - ms) / 1000;
        let secs = start_time % 60;
        start_time = (start_time - secs) / 60;
        let mins = start_time % 60;
        let hrs = (start_time - mins) / 60;


        return  (hrs>0?this.FormatTimeSection(hrs) + ':':'') + (mins>0? this.FormatTimeSection(mins) + ':':'') + this.FormatTimeSection(secs)+(hrs==0&&mins==0?'s':'');
    }
}


//<editor-fold desc="DTO">
interface PlayerItemState{

}

interface PlayerItemProps{
    item:GroupedPlayers;
    selectedItem:PlayerHeader;
    onClick:(node:any)=>void;
    className:string;
    onItemSelected:(PlayerHeader)=>void;

}
