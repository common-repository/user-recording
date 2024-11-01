import {Recorder} from "../Recorder";
export class RecorderBase{
    protected recorder:Recorder;
    constructor(recorder: Recorder) {
        this.recorder=recorder;
    }

    private SiblingPosition(node) {
        var i = 1;
        while (node = node.previousSibling) {
            if (node.nodeType == 1) i += 1;
        }
        return i;
    }
     GetElementName(node:any) {
         if (node.id) return "#" + node.id;
         if (node.nodeName == "BODY") return "body";
         var position = this.SiblingPosition(node);
         return this.GetElementName(node.parentNode) + ">:nth-child(" + position + ")";
     }

}
