declare var smartformsrecordingparams:any;
export class AsyncAjax{
    public static Post<T>(data:any):Promise<T>{
        return new Promise<T>(async (resolve)=>{
            jQuery.post(smartformsrecordingparams.ajaxurl,data,resolve,'json');
        });
    }

    public static PostWithToken<T>(data:any):PromiseWithToken<T>{
        let token=new PromiseToken();
        return {
            Promise:new Promise<ResultWithToken<T>>(async (resolve)=>{
                jQuery.post(smartformsrecordingparams.ajaxurl,data,(data)=>{
                    resolve({WasCancelled:token.WasCancelled,Result:data})
                },'json');
            }),
            Token:token
        }

    }
}

export class PromiseToken{
    public WasCancelled:boolean=false;
    public Cancel(){
        this.WasCancelled=true;
    }
}

interface PromiseWithToken<T>{
    Promise:Promise<ResultWithToken<T>>;

    Token:PromiseToken;
}

interface ResultWithToken<T>{
    WasCancelled:boolean;
    Result:T;
}