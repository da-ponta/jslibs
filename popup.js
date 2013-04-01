window.openAutoClose = function(url,name,opts,allowMove,timeout,callback) {
    if (!timeout) timeout = 0;
    if (allowMove == undefined) allowMove = true;
    var subWindow = window.open(url,name,opts);
    function onload(){
        body = subWindow.document.getElementsByTagName("body");
        if(body[0]==null){
            setTimeout(onload, 10);
        }else{
            var timer;
            var childLen = body[0].childNodes.length;
            function close(){
                subWindow.onunload=null;
                subWindow.close();
            }
            subWindow.onblur=function(){
                timer = setTimeout(function(){
                    if (callback) callback.call(null,false);
                    close();
                }, timeout);
            };
            if (!subWindow.document.hasFocus() && childLen > 0) {
                subWindow.onblur();
            }
            subWindow.onfocus=function(){
                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }
            };
            subWindow.onunload=function(){
                if (!allowMove && childLen > 0) {
                    subWindow.onblur();
                }
                setTimeout(onload,1000);
            }
            if (callback) {
                subWindow.callback=function(){
                    close();
                    callback.apply(null,arguments);
                }
            }
        }
    }
    onload();
    return subWindow;
}