'use strict';


class Utils{
    static DispatchEvent (eventName, data){
        var event = new CustomEvent(eventName, {'detail':data});
        window.document.dispatchEvent(event);
    }
}

