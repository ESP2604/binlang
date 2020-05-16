 // 打开一个 web socket
var ws = new WebSocket("ws://127.0.0.1:8080/Ajax/websocketendpoint");

ws.onopen = function()
{
// Web Socket 已连接上，使用 send() 方法发送数据
ws.send("发送数据");
ws.send("发送数据");
ws.send("发送数据");
ws.send("发送数据");
console.log("数据发送中...");
};

ws.onmessage = function (evt) 
{ 
var received_msg = evt.data;
console.log("数据已接收...");
};

ws.onclose = function()
{ 
// 关闭 websocket
console.log("连接已关闭..."); 
};
ws.onerror = function (e) {
 console.log(e);
}