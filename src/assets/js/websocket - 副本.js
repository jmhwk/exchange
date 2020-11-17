  let url = 'ws://47.242.81.154:8086/ws' // 第一个不行试试这个 测试
  let socket;
  // let di = 0
  socket = new WebSocket(url);


function getSocket(params, callback,down) {
  // let url = 'ws://120.25.153.148:8087/ws' // 测试
  let url = 'ws://47.242.81.154:8086/ws' // 第一个不行试试这个 测试
  let socket;
  // let di = 0
  socket = new WebSocket(url);
  if (typeof(WebSocket) === 'undefined') {
    console.log('您的浏览器不支持WebSocket');
  } else {
    console.log('您的浏览器支持WebSocket');
    // 初始化 WebSocket 对象，指定要连接的服务器地址与端口建立连接
   

    // 打开事件
    socket.onopen = function() {
      socket.send(params);
      console.log('啊啊',params)
    };

    // 获得消息事件
    socket.onmessage = function(msg) {
      // 发现消息进入, 开始处理前端触发逻辑
      let data = JSON.parse(msg.data);
      callback(data, socket);
    };
    
    // 监听消息
    // socket.addEventListener('message', function (event) {
    //   let data = JSON.parse(event.data);
    //   console.log('更新的数据',event.data)
    //   callback(data, socket);
    // });
    // socket.on('Connected', function (event) {
    
    //   console.log('更新的数据',event.data)
    // });
    
    
    // 关闭事件
    socket.onclose = function(event) {
      socket.close()
      console.log(params,'ws连接状态：关闭' + socket.readyState+event,'昂是',socket.binaryType);
    };
    // if(down==1){
    //   debugger
    //   socket.close()
    //    console.log(params,'ws连接状态：121关闭' + socket.readyState+event);
    // }
    // 发生了错误事件
    socket.onerror = function() {
      console.log('Socket 发生了错误,请刷新页面');
      // 此时可以尝试刷新页面
      
    };
  }
}

export {
  getSocket
};
