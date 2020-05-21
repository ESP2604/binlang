function seandv4(file ) {
    var ws = new WebSocket("ws://127.0.0.1:8080/Ajax/websocket");
    let startSize = 0, endSize = 0;
    let filesize = file.size;
    let paragraph =   1024 * 1024 *2 ;

    ws.onopen = function (e) {
        console.log(e)
        while(endSize < filesize ) {
            startSize = endSize;
            endSize += paragraph;
            ws.send(file.slice(startSize, endSize));
        }
            startSize = endSize;
            endSize = filesize;
            ws.send(file.slice(startSize, endSize));

                console.log(startSize +"~" + endSize);
                console.log("bufferedAmount" + ws.bufferedAmount);
    }

    ws.onerror = function (e) {
        console.log(e);
    }
}
function seandv2(file ) {

    let startSize = 0, endSize = 0;
    let filesize = file.size;
    let paragraph =   1024 * 1024 ;
    startSize = endSize;
    endSize += paragraph;

    var ws = new WebSocket("ws://127.0.0.1:8080/Ajax/websocket");
    ws.onopen = function () {

    reader = new FileReader();
    reader.onload = function (e){
        if(endSize < filesize){
            startSize = endSize;
            endSize += paragraph;
            ws.send(e.target.result);
            reader.readAsArrayBuffer(file.slice(startSize, endSize));
        }else {
                startSize = endSize;
                endSize = filesize;
                ws.send(e.target.result);
                setInterval(function () {
                    if( ws.bufferedAmount == 0) {
                        ws.close();
                        delete ws;
                        delete reader;
                    }
                }, 3000);
        }
    }
    reader.readAsArrayBuffer(file.slice(startSize, endSize));
    }
        ws.onclose = function(e)
        { 
            console.log("连接已关闭..."); 
            console.log("wasClean " + e.wasClean); 
            console.log("code " + e.code);
        };
}
function seand(file) {

        console.log(file)

        let filesize = file.size;
        let paragraph =   1024 * 1024;
        // let paragraph =   60 * 1024;
        let startSize = 0, endSize = 0;
        var ws 
        function seandv4(file ) {
    var ws = new WebSocket("ws://127.0.0.1:8080/Ajax/websocket");
    let startSize = 0, endSize = 0;
    let filesize = file.size;
    let paragraph =   1024 * 1024 *2 ;

    ws.onopen = function (e) {
        console.log(e)
    setInterval(function () {
        if(endSize < filesize && ws.bufferedAmount == 0) {
            startSize = endSize;
            endSize += paragraph;
            ws.send(file.slice(startSize, endSize));
        }else {
            startSize = endSize;
            endSize = filesize;
            ws.send(file.slice(startSize, endSize));
                setInterval(function () {
                    if( ws.bufferedAmount == 0) {
                        ws.close();
                        delete ws;
                    }
                }, 1000);
        }

                console.log(startSize +"~" + endSize);
                console.log("bufferedAmount" + ws.bufferedAmount);
    },300);
    }

    ws.onerror = function (e) {
        console.log(e);
    }
}
function seandv2(file ) {

    let startSize = 0, endSize = 0;
    let filesize = file.size;
    let paragraph =   1024 * 1024 ;
    startSize = endSize;
    endSize += paragraph;

    var ws = new WebSocket("ws://127.0.0.1:8080/Ajax/websocket");
    ws.onopen = function () {

    reader = new FileReader();
    reader.onload = function (e){
        if(endSize < filesize){
            startSize = endSize;
            endSize += paragraph;
            ws.send(e.target.result);
            reader.readAsArrayBuffer(file.slice(startSize, endSize));
        }else {
                startSize = endSize;
                endSize = filesize;
                ws.send(e.target.result);
                setInterval(function () {
                    if( ws.bufferedAmount == 0) {
                        ws.close();
                        delete ws;
                        delete reader;
                    }
                }, 3000);
        }
    }
    reader.readAsArrayBuffer(file.slice(startSize, endSize));
    }
        ws.onclose = function(e)
        { 
            console.log("连接已关闭..."); 
            console.log("wasClean " + e.wasClean); 
            console.log("code " + e.code);
        };
}
function seand(file) {

        console.log(file)

        let filesize = file.size;
        let paragraph =   1024 * 1024;
        // let paragraph =   60 * 1024;
        let startSize = 0, endSize = 0;
        var ws = new WebSocket("ws://127.0.0.1:8080/Ajax/websocket");

        ws.onopen = function(e){
            while(endSize < filesize){
                startSize = endSize;
                endSize += paragraph;

                console.log(startSize +"~" + endSize);
                console.log("bufferedAmount" + ws.bufferedAmount);
                ws.send(file.slice(startSize, endSize));
            }

                startSize = endSize;
                endSize = filesize;

                ws.send(file.slice(startSize, endSize));
                setInterval(function () {
                    if( ws.bufferedAmount == 0) {
                        ws.close();
                        delete ws;
                    }
                }, 3000);
                console.log("bufferedAmount" + ws.bufferedAmount);
        }
        ws.onmessage = function (evt) 
        { 
            console.log("数据已接收...");
        };
        
        ws.onclose = function(e)
        { 
            // ws.send("ws已關閉");
            // 关闭 websocket
            console.log("连接已关闭..."); 
            console.log("wasClean " + e.wasClean); 
            console.log("code " + e.code);
            // console.log("code" + eason); 
            // ws = null;
            delete ws;
        };

        ws.onerror = function (e) {
            console.log(e);
        }
}

ws = new WebSocket("ws://127.0.0.1:8080/Ajax/websocket");

        ws.onopen = function(e){
            while(endSize < filesize){
                startSize = endSize;
                endSize += paragraph;

                console.log(startSize +"~" + endSize);
                console.log("bufferedAmount" + ws.bufferedAmount);
                ws.send(file.slice(startSize, endSize));
            }

                startSize = endSize;
                endSize = filesize;

                ws.send(file.slice(startSize, endSize));
                setInterval(function () {
                    if( ws.bufferedAmount == 0) {
                        ws.close();
                        delete ws;
                    }
                }, 3000);
                console.log("bufferedAmount" + ws.bufferedAmount);
        }
        ws.onmessage = function (evt) 
        { 
            console.log("数据已接收...");
        };
        
        ws.onclose = function(e)
        { 
            // ws.send("ws已關閉");
            // 关闭 websocket
            console.log("连接已关闭..."); 
            console.log("wasClean " + e.wasClean); 
            console.log("code " + e.code);
            // console.log("code" + eason); 
            // ws = null;
            delete ws;
        };

        ws.onerror = function (e) {
            console.log(e);
        }
}