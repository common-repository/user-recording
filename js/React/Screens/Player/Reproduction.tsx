import * as React from "react";
import {PlayerHeader} from "./PlayerItemList";
import "jQuery";
import {ReproductionBar} from "./ReproductionBar";
import {RecordingSummary, RecorderData} from "../../../Shared/Shared";


declare let smartformsrecordingparams:any;

export class Reproduction  extends React.Component<ReproductionProp,ReproductionState>{
    public $Iframe:JQuery;
    public $loadingContainer:JQuery;
    public $iframeContainer:JQuery;
    private internalWidth:number=0;
    private internalHeight:number=0;
    private reproductionBar:ReproductionBar=null;
    constructor(){
        super();
        this.state={
            HeaderItems:[],
            Summary:null
        };

    }

    render(){

        if(this.props.ItemToReproduce)
        {
            return (
                <div>
                    <ReproductionBar ref={(element)=>{this.reproductionBar=element}} Summary={this.state.Summary}/>
                    <div ref={(node)=>{this.$iframeContainer=jQuery(node);}} id="playerContainer" style={{overflow:'hidden', minWidth:'300px',minHeight:'200px',position:'relative',textAlign:'center',backgroundColor:"#eee",borderStyle:'solid',borderWidth:'1px',borderColor:'#ddd'}}>
                        <iframe sandbox="allow-scripts"  style={{pointerEvents:'none' ,transformOrigin:'0 0', top:0,left:0}} id="playerIframe" ref={(iframe)=>{this.$Iframe=jQuery(iframe)}} src={smartformsrecordingparams.siteurl+'?smart_session_recording_id='+this.props.ItemToReproduce.uniq_id}/>
                    </div>
                    <div style={{backgroundColor:'white',position:'absolute',width:'100%',height:'100%',top:0,left:0,minHeight:'400px',display:'flex',justifyContent:'center',alignItems:'center'}} ref={(control)=>{this.$loadingContainer=jQuery(control)}}>
                        <img src={smartformsrecordingparams.pluginUrl+'img/loading.gif'}/>
                    </div>
                </div>
            );
        }else{
            return <div style={{width:'100%',height:'400px',display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'#f8f8f8',borderColor:'#ddd',borderStyle:'solid',borderWidth:'1px'}}><h1>Please select a recording to start the reproduction =)</h1></div>;
        }

    }


    componentDidMount(): void {
        if(this.props.ItemToReproduce!=null)
            this.StartLoadingAnimation();
        jQuery(window).on('message',(ev:any)=>{
            try{
                let receivedData=ev.originalEvent.data;
                if(receivedData.type=='smartSessionRecordingEvent')
                {
                    this.internalHeight=receivedData.data.height;
                    this.internalWidth=receivedData.data.width;
                    this.AdjustIframeZoom();
                }
                if(receivedData.type=='createRecorderBar')
                {
                    this.setState({Summary:receivedData.data.summary})
                }
                if(receivedData.type=='startPlaying')
                {
                    if(this.reproductionBar!=null)
                        this.reproductionBar.StartPlaying();
                }

            }catch(e)
            {

            }
        });

        jQuery(window.parent.window).resize(()=>{this.AdjustIframeZoom()});
    }

    public AdjustIframeZoom() {
        if(this.internalWidth==0||this.internalHeight==0)
            return;
        let documentWidth=this.internalWidth;
        let documentHeight=this.internalHeight;

        let containerWidth=this.$iframeContainer.width();
        let containerHeight=this.$iframeContainer.height();


        this.$Iframe.height(documentHeight);
        this.$Iframe.width(documentWidth);

        let scale=containerWidth*100/documentWidth/100;
        if(scale>1)
            scale=1;
        this.$iframeContainer.height(this.internalHeight*scale);
        this.$Iframe.css('transform','scale('+scale+', '+scale+')')
    }

    componentDidUpdate(prevProps: Readonly<ReproductionProp>, prevState: Readonly<ReproductionState>, prevContext: any): void {
        if(this.$loadingContainer==null)
            return;

        if(prevProps.ItemToReproduce==this.props.ItemToReproduce)
            return;

        this.StartLoadingAnimation();
    }


    private StartLoadingAnimation() {

        this.$loadingContainer.velocity({opacity:1},300,"easeInExp");
        this.$Iframe.velocity({opacity:0},300,"easeInExp");
        this.$Iframe.off('.animation');
        this.$Iframe.on('load.animation',()=>{

            this.$loadingContainer.velocity({opacity:0},300,"easeInExp");
            this.$Iframe.velocity({opacity:1},300,"easeInExp");

        });
    }
}


//<editor-fold desc="DTO">
interface ReproductionState{
    Summary:RecordingSummary,
    HeaderItems:any[]
}

interface ReproductionProp{
    ItemToReproduce:PlayerHeader;
}
//<editor-fold>