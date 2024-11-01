import * as React from "react";
import {AsyncAjax, PromiseToken} from "../../../Shared/AsyncAjax";
import {ListGroup, ListGroupItem} from "react-bootstrap";
import {PlayerItem} from "./PlayerItem";
import 'jQuery';
import "es6-promise";
declare var smartformsrecordingparams:any;


export class PlayerItemList  extends React.Component<PlayerItemListProps,PlayerItemListState>{
    public LastItem:any=null;
    private executinSearch:boolean=false;
    private currentPage=-1;
    private items:PlayerHeader[]=[];
    private noMoreRecords:boolean=false;
    private ExecutinSearchToken:PromiseToken;
    constructor(){
        super();
        this.state={
            GroupedPlayers:[],
            SelectedItem:null
        };



    }

    ItemSelected(player:PlayerHeader):void{
        this.setState({SelectedItem:player});
        this.props.ItemSelected(player);
    }

    render(){
        return (
            <ListGroup>
            {this.state.GroupedPlayers.map((groupedPlay,index)=>{return (
                <PlayerItem onItemSelected={this.ItemSelected.bind(this)} selectedItem={this.state.SelectedItem} item={groupedPlay}  key={groupedPlay==null?null:groupedPlay.UniqId} onClick={()=>this.ItemSelected(groupedPlay.RelatedPlays[0])} className={groupedPlay!=null&&groupedPlay.Contains(this.state.SelectedItem)?"active":""} >

                </PlayerItem>
            )})}
                {this.noMoreRecords?
                    (
                        this.state.GroupedPlayers==null||this.state.GroupedPlayers.length==0?
                            <a  style={{padding:'20px', backgroundColor:'#eee'}} className="list-group-item"><span className="glyphicon glyphicon-exclamation-sign"></span> Oh there are no recordings to show, please wait until someone use your site and try again</a>
                            :<a  style={{padding:'20px', backgroundColor:'#eee'}} className="list-group-item"><span className="glyphicon glyphicon-road"></span> End of the road, there are no more recordings!</a>
                    ):<PlayerItem onItemSelected={null} selectedItem={null} item={null} ref={(list=>this.LastItem=list)} onClick={()=>this.ItemSelected(null)}  className=''/>
                }
        </ListGroup>);
    }


    componentDidMount() {
        jQuery(window).scroll(()=>{
            this.CheckIfLoadingIsNeedes();
        });
        this.ExecuteSearch();
    }

    public Refresh(){
        this.noMoreRecords=false;
        this.currentPage=-1;
        if(this.ExecutinSearchToken!=null) {
            this.ExecutinSearchToken.Cancel();
            this.ExecutinSearchToken=null;
        }
        this.setState({GroupedPlayers:[],SelectedItem:null});
        this.ExecuteSearch();
    }

    public async ExecuteSearch(){
        if(!this.executinSearch)
        {
            this.executinSearch=true;
            let promiseWithToken=AsyncAjax.PostWithToken<PlayerHeader[]>({action:'rednao_ssr_get_recordings',page:++this.currentPage});
            this.ExecutinSearchToken=promiseWithToken.Token;
            let resultWithToken=await promiseWithToken.Promise;
            if(resultWithToken.WasCancelled) {
                this.executinSearch=false;
                return;
            }
            this.ExecutinSearchToken=null;
            let result=resultWithToken.Result;
            let groupedPlayers:GroupedPlayers[]=this.MergeRelatedRecordings(result);
            if(result.length==0||result.length<20)
                this.noMoreRecords=true;
            this.setState({GroupedPlayers:this.state.GroupedPlayers.concat(groupedPlayers)});
            this.executinSearch=false;
        }
    }

    private CheckIfLoadingIsNeedes() {
        if(this.LastItem==null)
            return;
        let scrollTop=jQuery(window).scrollTop();
        let windowHeight=jQuery(window).height();

        let lastNodeTop=this.LastItem.$Container.offset().top;

        if(lastNodeTop-200<scrollTop+windowHeight)
            this.ExecuteSearch();
    }


    componentDidUpdate(prevProps: Readonly<PlayerItemListProps>, prevState: Readonly<PlayerItemListState>, prevContext: any): void {
        if(this.props.SelectedItem!=prevProps.SelectedItem&&this.props.SelectedItem!=this.state.SelectedItem)
            this.setState({SelectedItem:this.props.SelectedItem});
    }

    private MergeRelatedRecordings(recordings: PlayerHeader[]):GroupedPlayers[] {
        let groupedPlayersList:GroupedPlayers[]=[];
        for(let i=0;i<recordings.length;i++) {
            let groupedPlayers:GroupedPlayers=new GroupedPlayers();
            groupedPlayersList.push(groupedPlayers);
            groupedPlayers.AddPlayer(recordings[i]);
            for (let t = i + 1; t < recordings.length; t++) {
                if (recordings[i].session_id == recordings[t].session_id) {
                    groupedPlayers.AddPlayer(recordings[t]);
                    recordings.splice(t,1);
                    t--;
                }
            }
        }
        return groupedPlayersList;
    }
}


//<editor-fold desc="DTO">
interface PlayerItemListState{
    GroupedPlayers:GroupedPlayers[];
    SelectedItem:PlayerHeader;

}

interface PlayerItemListProps{
    ItemSelected:(item:PlayerHeader)=>void,
    SelectedItem:PlayerHeader;
}

export interface PlayerHeader{
    duration:string;
    start_time:string;
    uniq_id:string;
    url:string;
    userid:string;
    session_id:string;
    groupedPlayers:GroupedPlayers;

}

export class GroupedPlayers{
    public RelatedPlays:PlayerHeader[]=[];
    public Duration:number=0;
    public StartTime:string;
    public SessionId:string;
    public UserId:string;
    public UniqId:string;
    constructor()
    {

    }

    public Contains(player:PlayerHeader)
    {
        return this.RelatedPlays.indexOf(player)>=0;
    }

    public AddPlayer(player:PlayerHeader)
    {
        if(this.RelatedPlays.length==0)
        {
            this.StartTime=player.start_time;
            this.SessionId=player.session_id;
            this.UserId=player.userid;
            this.UniqId=player.uniq_id;
        }
        this.RelatedPlays.splice(0,0,player);
        this.Duration+=parseInt(player.duration);
        player.groupedPlayers=this;
    }
}
//<editor-fold>