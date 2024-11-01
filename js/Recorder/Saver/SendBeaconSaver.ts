import {SaverBase} from "./SaverBase";
declare var smartformsrecordingparams:any;
export class SendBeaconSaver extends SaverBase{

    public InternalBeforeClose() {
        let data:any=this.GetDataToSend(true);
        let encodedData:string='';
        //console.log(data);
        for(let property in data)
        {
            encodedData+='&'+property+'='+encodeURIComponent(data[property]);
        }
        //console.log(encodedData);

        let url=smartformsrecordingparams.siteurl;
        if(url[url.length-1]!='/')
            url+='/';
        navigator.sendBeacon(url+'?smart_session_recording_id=-1',encodedData);
    }

    public InternalDataAdded() {

        if(this.totalBytes>60000)
            this.SendDataAddedSoFar();
    }

}
