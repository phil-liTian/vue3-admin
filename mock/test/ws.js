/*
 * @Date: 2024-07-25 11:52:10
 * @LastEditors: phil_litian
 */
// /*
//  * @Date: 2024-07-25 11:52:10
//  * @LastEditors: phil_litian
//  */
// const WebSocket = require('ws');

// // 创建 WebSocket 服务器，监听 8080 端口
// const wss = new WebSocket.Server({ port: 8080 });

// // 处理新的连接
// wss.on('connection', (ws) => {
//   console.log('客户端连接成功');

//   // 发送初始消息给客户端
//   ws.send('欢迎连接到 WebSocket 服务！');

//   // 处理客户端发送的消息
//   ws.on('message', (message) => {
//     console.log(`接收到消息: ${message}`);

//     // 根据接收到的消息进行不同的响应
//     if (message === 'ping') {
//       ws.send('pong');
//     } else {
//       ws.send(`你发送的消息是: ${message}`);
//     }
//   });

//   // 处理连接关闭事件
//   ws.on('close', (code, reason) => {
//     console.log(`客户端连接关闭，代码: ${code}，原因: ${reason}`);
//   });

//   // 处理连接错误事件
//   ws.on('error', (error) => {
//     console.error(`连接出现错误: ${error}`);
//   });
// });

// // 服务器启动时的日志
// console.log('WebSocket 服务正在监听 8080 端口...');