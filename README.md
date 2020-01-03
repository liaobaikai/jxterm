# jxterm
A terminal for the web
<br/>
使用示例: <br/>
<pre>
 let terminal = new Terminal({
    selector: '#wx',
    transceiver: new Transceiver({
        url: 'wss://a.baikai.top',
    }, {
        // 连接服务器的主机名<string>
        hostname: '127.0.0.1',
        // 连接服务器的端口号<int>
        port: 22,
        // 连接服务器的用户名<string>
        username: 'fei00',
        // 连接服务器的密码<string>
        password: '0000',
        // 连接服务器的密钥<string>
        pkey: ''
        // 注：密码与密钥只传输一个。
    }),
    onUpdateTitle: (title) => {
        // title: 标题
    },
    onClosed: () => {
        // 远程已断开
    },
    onConnected: (ssh_info) => {
        // 首次连接返回：
        // ssh_info.version: server ssh version
        // ssh_info.cipher: server ssh cipher
    },
    onResize: (args) => {
        // args.columns: 列数
        // args.rows: 行数
    },
    onCreated: (args) => {
        // args.columns: 列数
        // args.rows: 行数
        // args.charSize: 字符尺寸, width: 宽度, height: 高度
        // args.declareTerminalAs: 终端类型
    },
    onCursorPosition: (point) => {
        // point.x: x坐标，默认从1开始
        // point.y: y坐标，默认从1开始
    },
    onHeartbeat: flag => {
        // flag=true: 心跳开始
        // flag=false: 心跳结束
    },
    onUpload: flag => {
        // flag=true: 数据上行开始
        // flag=false: 数据上行结束
    },
    onDownload: flag => {
        // flag=true: 数据下行开始
        // flag=false: 数据下行结束
    }
})
</pre>