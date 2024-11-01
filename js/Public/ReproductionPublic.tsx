import * as React from "react";

import "jQuery";
import {Reproduction} from "../React/Screens/Player/Reproduction";
import * as ReactDOM from "react-dom";

declare var smartformsrecordingviewparams:any;
declare let smartformsrecordingparams:any;

export class ReproductionPublic  extends React.Component<any,any>{
    constructor(){
        super();
        this.state={
            HeaderItems:[],
            Summary:null
        };

    }

    render(){
        return(
            <div>
                <Reproduction ItemToReproduce={{duration:'0',uniq_id:smartformsrecordingparams.uniqid,userid:'1',session_id:'a',url:'a',start_time:'1',groupedPlayers:null}}/>
            </div>
        );
    }




}

jQuery(()=>{
    ReactDOM.render(<ReproductionPublic/>,document.getElementById('reproduction'));
});


//<editor-fold>