export enum RecordType{
    "Move"=1,
    "MouseEnter"=2,
    "MouseLeave"=3,
    "Click"=4,
    "Change"=5,
    "Scroll"=6,
    "KeyValue"=7,
    "AjaxReceived"=8,
    "Resize"=9,
    'Submit'=10
}

export interface RecorderData<T extends RecordValueBase>{
    type: RecordType;
    value:T;
    time?:number;
}

export interface RecordValueBase{

}


export interface MouseMoveRecordValue extends RecordValueBase{
    x:number;
    y:number;
}

export interface MouseElementInteraction extends MouseMoveRecordValue{
    selector:string;
}

export interface Point{
    x:number;
    y:number;
}


export interface AjaxReceived{
    id:string;
    value:string;
}

export interface JQueryTriggered{
    selector:string;
}

export interface ChangeRecordValue{
    selector:string;
    value:string;
}

export interface ScrollRecordValue{
    left:number;
    top:number;
}

export interface ResizeRecordValue{
    width:number;
    height:number;
}

export interface InitialData{
    html:string;
    initialProperties:string;
}

export interface InitialProperties{
    width:number;
    height:number;
}

export interface RecordingRange{
    startTime:number;
    duration:number;
}

export interface RecordingSummary{
    duration:number;
    ranges:RecordingRange[]
}

export var animationSpeed=1;