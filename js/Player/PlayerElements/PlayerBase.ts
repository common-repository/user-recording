import {animationSpeed, RecorderData, RecordingRange} from "../../Shared/Shared";

declare var window:any;
export abstract class PlayerBase {
    public static TotalTimePassed=0;
    public async Delay(time: number) {
        return new Promise<number>(function (resolve) {
            setTimeout(() => {
                PlayerBase.TotalTimePassed+=time*animationSpeed;
                resolve();
            }, time*animationSpeed);

        });
    }

    public FireEvent(selector: string, eventName: string, args: any) {
        this.ExecuteJQueryEvent(jQuery, selector, eventName, args);
        if (typeof window.rnJQuery != 'undefined')
            this.ExecuteJQueryEvent(window.rnJQuery, selector, eventName, args);

    }

    private ExecuteJQueryEvent(jQuery: JQueryStatic, selector: string, eventName: string, args: any) {
        let event = jQuery.Event('click');
        for (var property in args)
            event[property] = args[property];

        jQuery(selector).trigger(event);
    }

    public abstract Execute(currentTime: number, record: RecorderData<any>);
    public abstract GetActionRange(currentTime: number, record: RecorderData<any>):RecordingRange;
}
