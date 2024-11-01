import {InitialData} from "../Shared/Shared";
declare var jQuery:any;

export class Mirror {
    private actions: string[] = [];
    private initialData: InitialData = null;

    constructor() {

    }

    public Initialize(): void {
        let $startButton: any = jQuery('<button>Start</button>');
        jQuery('body').append($startButton);
        $startButton.click(() => {
            this.Start();
        });
    }

    public Start(): void {
        if (this.initialData == null)
            return;
        let $body = jQuery('body');
        let $form = jQuery(`<form accept-charset="ISO-8859-1" style="display: none;" method="post" target="_blank" action="http://localhost/smartforms/?smart_session_recording_add_trigger=1">
                
            </form>`);
        let $hiddenField = jQuery(`<input type="hidden" name="html"/>`);
        $hiddenField.val(this.initialData.html);
        $form.append($hiddenField);

        $hiddenField = jQuery(`<input type="hidden" name="actions" />`);
        $hiddenField.val(JSON.stringify(this.actions));
        $form.append($hiddenField);

        $body.append($form);
        $form.submit();
    }

    public IsIE(): boolean {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
        {
            return true;
        }
        else  // If another browser, return 0
        {
            return false;
        }
    }

    RefreshPlayer = function () {
        while (this.queue.length > 0) {
            this.ExecuteRecorderData(this.queue.shift());

        }

    };


    public SendData(data: string): void {
        this.actions.push(data);
    }

    InitializeHtml(initialData: InitialData) {
        this.initialData= initialData;
    }
}

