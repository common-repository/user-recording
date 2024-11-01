import {Recorder} from "../Recorder/Recorder";

declare var window:any;
window.UserSessionRecorder=new Recorder();
window.UserSessionRecorder.saver.InternalBeforeClose=function(){};
jQuery(window).off('beforeunload');