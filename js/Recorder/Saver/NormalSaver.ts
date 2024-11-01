import {SaverBase} from "./SaverBase";
export class NormalSaver extends SaverBase{
    constructor(){
        super();
        setInterval(()=>{
            if(this.data.length>0)
                this.SendDataAddedSoFar();
        },10000);
    }

    public InternalBeforeClose() {
        this.SendDataAddedSoFar(true);
    }

    public InternalDataAdded() {

    }

}
