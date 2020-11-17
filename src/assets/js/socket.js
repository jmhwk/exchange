var websock = null;
let global_callback = null;
function initWebSocket(){ //初始化weosocket
    //ws地址
    var wsuri = 'ws://47.242.81.154:8086/ws'
    websock = new WebSocket(wsuri);
    websock.onmessage = function(e){
    	websocketonmessage(e);
    } 
    websock.onclose = function(e){
      console.log('关闭了')
      setTimeout(function() {
        initWebSocket()
      }, 1000);

    	websocketclose(e);
    }
    websock.onopen = function () {
	    websocketOpen()
      //心跳检测重置
	}
    
    //连接发生错误的回调方法
	websock.onerror = function () {
		console.log("WebSocket连接发生错误");
	}
}
 
// 实际调用的方法
function sendSock(agentData,callback){  
    global_callback = callback;
    if (websock.readyState === websock.OPEN) {
    	//若是ws开启状态
        websocketsend(agentData)
    }else if (websock.readyState === websock.CONNECTING) {
    	// 若是 正在开启状态，则等待1s后重新调用
        setTimeout(function () {
        	sendSock(agentData,callback);
        }, 1000);
    }else {
    	// 若未开启 ，则等待1s后重新调用
        setTimeout(function () {
            sendSock(agentData,callback);
        }, 1000);
    }
}
  // function reconnect(url) {
  //   if (lockReconnect) return;
  //   lockReconnect = true;
  //    //没连接上会一直重连，设置延迟避免请求过多
  //   setTimeout(function() {
  //     createWebSocket(url);
  //     lockReconnect = false;
  //   }, 2000);
  //  }
 
 
//数据接收
function websocketonmessage(e){ 
  // console.log('接收消息',global_callback)
  global_callback(JSON.parse(e.data));
}
 
//数据发送
function websocketsend(agentData){
   websock.send(JSON.stringify(agentData));
}
 
//关闭
function websocketclose(e){  
  console.log("链接关闭(" + e.code + ")",);
}
 
function websocketOpen(e){
	console.log("连接成功");
}
 
initWebSocket();
 
export{sendSock}