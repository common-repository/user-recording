import * as React from "react";
import * as ReactDOM from "react-dom";
import  "es6-promise";
import {PlayerHeader, PlayerItemList} from "./PlayerItemList";
import {Reproduction} from "./Reproduction";
import {DropdownButton, MenuItem} from "react-bootstrap";
import {AsyncAjax} from "../../../Shared/AsyncAjax";

class App extends React.Component<any,AppState>{

    private playerList:PlayerItemList;
    constructor(){
        super();
        this.DeleteRecords=this.DeleteRecords.bind(this);
        this.state={
            SelectedItem:null,
            IsDeleting:false
        };
    }

    public PlayerItemSelected(item:PlayerHeader){
        this.setState({SelectedItem:item});
    }
    render(){
        //f
        return(
        <div >
            <DropdownButton key="1" onSelect={this.DeleteRecords} disabled={this.state.IsDeleting} className="btn-danger" id="dropDown1" bsStyle="danger" title={[<span key='1' className="glyphicon glyphicon-trash"></span>,<span key='2'> {this.state.IsDeleting?'Deleting Records...':'Delete Recordings'}</span>]}>
                <MenuItem eventKey="a">Delete All</MenuItem>
                <MenuItem eventKey="t">Older than today</MenuItem>
                <MenuItem eventKey="w">Older than this week</MenuItem>
                <MenuItem eventKey="m">Older than this month</MenuItem>
            </DropdownButton>

            <div key="2">
                <div className="col-sm-4" style={{padding:0}}>
                    <PlayerItemList ref={(playerList)=>{this.playerList=playerList}} ItemSelected={this.PlayerItemSelected.bind(this)} SelectedItem={this.state.SelectedItem}></PlayerItemList>
                </div>
                <div className="col-sm-7" style={{padding:0}}>
                    <Reproduction ItemToReproduce={this.state.SelectedItem}></Reproduction>
                </div>
                <div style={{clear:'both'}}></div>
            </div>
        </div>);
    }

    async DeleteRecords(event:any){
        this.setState({IsDeleting:true});
        let result:any=await AsyncAjax.Post({'action':'rednao_ssr_delete_recordings','type':event});
        this.setState({IsDeleting:false});
        this.playerList.Refresh();

    }


    componentDidMount(): void {
        jQuery('#ssrLoadingScreen').velocity({opacity:0},300,'easeInExp',()=>{jQuery('#ssrLoadingScreen').remove();})
    }
}

jQuery(()=>{
    ReactDOM.render(<App></App>,document.getElementById('smart-session-recording-id'));
});


//<editor-fold desc="DTO">
interface AppState{
    SelectedItem:PlayerHeader;
    IsDeleting:boolean;
}


//<editor-fold>