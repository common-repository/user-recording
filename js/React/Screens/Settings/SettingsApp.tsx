import * as React from "react";
import * as ReactDOM from "react-dom";
import  "es6-promise";
import {Table, Button} from "react-bootstrap";
import {AsyncAjax} from "../../../Shared/AsyncAjax";
declare var smartformsrecordingparams:any;

class SettingsApp extends React.Component<any,SettingsAppState>{


    constructor(){
        super();
        this.OnClick=this.OnClick.bind(this);
        this.state={
            Saving:false,
            SelectedValue:smartformsrecordingparams.currentSchedule,
            Seconds:smartformsrecordingparams.seconds
        };
    }


    render(){
        console.log('rendering');
        return(
        <Table striped bordered condensed hover >
            <tbody>
                <tr>
                    <th style={{width:'300px',verticalAlign:'middle'}}>Delete old records</th>
                    <th>
                        <select style={{width:'300px'}} className="form-control" value={this.state.SelectedValue} onChange={(e)=>{this.setState({SelectedValue:e.target.value})}}>
                            <option value="n">Never</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                    </th>
                </tr>
                <tr>
                    <th style={{width:'300px',verticalAlign:'middle'}}>Ignore recordings smaller than</th>
                    <th>
                        <input type="number" value={this.state.Seconds} style={{width:100, textAlign:'right'}} onChange={(e)=>{this.setState({Seconds:e.target.value})}}/> Seconds
                    </th>
                </tr>
                <tr>
                    <td colSpan={2}><Button onClick={this.OnClick} bsStyle="success" disabled={this.state.Saving}>{this.state.Saving?'Saving changes...':'Save Changes'}</Button></td>
                </tr>
            </tbody>
        </Table>);
    }

    public async OnClick(){
        this.setState({Saving:true});
        let result=await AsyncAjax.Post<any>(
            {
                'action':'rednao_ssr_update_schedule',
                'schedule':this.state.SelectedValue,
                'seconds':this.state.Seconds
            });
        if(result.success=='y')
            alert('Changes applied successfully');
        this.setState({Saving:false});
    }
/*
    async DeleteRecords(event:any){
        this.setState({IsDeleting:true});
        let result:any=await AsyncAjax.Post({'action':'rednao_ssr_delete_recordings','type':event});
        this.setState({IsDeleting:false});
        this.playerList.Refresh();

    }


    componentDidMount(): void {
        jQuery('#ssrLoadingScreen').velocity({opacity:0},300,'easeInExp',()=>{jQuery('#ssrLoadingScreen').remove();})
    }*/
}

interface SettingsAppState{
    Saving:boolean,
    SelectedValue:any,
    Seconds:string
}

jQuery(()=> {
    ReactDOM.render(<SettingsApp></SettingsApp>, document.getElementById('srfwp-settings'));
});
//<editor-fold desc="DTO">


//<editor-fold>