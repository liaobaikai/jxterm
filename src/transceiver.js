/**
 * 发送&接收器
 * 用于发送和接收数据
 *
 * WebSocket.readyState:
 * 0 - 表示连接尚未建立
 * 1 - 表示连接已建立，可以进行通信
 * 2 - 表示连接正在进行关闭
 * 3 - 表示连接已经关闭或连接不能打开
 */
class Transceiver {

    constructor(
        ws = {
            url: '127.0.0.1',
            port: 8899
        },
        server = {
            hostname: '127.0.0.1',
            port: 22,
            username: 'root',
            password: ''
        }) {

        this.server = server;
        this.ws = ws;

        this.webSocket = null; // websocket
        this.terminal = null;

        this.rawText = [];

        this.connected = false; // websocket
        this.sshConnected = false;


    }

    /**
     * 初始化websocket
     */
    connect(terminal) {

        this.terminal = terminal;

        return new Promise((resolve, reject) => {

            this.webSocket = new WebSocket(!!this.ws.port ? this.ws.url + ':' + this.ws.port : this.ws.url);
            this.webSocket.onopen = (e) => {
                resolve(e);
                terminal.onConnect('websocket', 1);
                this.connected = true;
                this.heartbeat();
            };

            this.webSocket.onerror = (e) => {
                reject(e);
                terminal.onClosed('websocket', -1);
                this.removeHeartbeat();
                if (this.connected) this.connected = false;
            };

            this.webSocket.onclose = (e) => {
                terminal.connectionClosed(e);
                terminal.onClosed('websocket', 2);
                this.removeHeartbeat();
                if (this.connected) this.connected = false;
            };

            this.webSocket.onmessage = (e) => {
                this.terminal.onDownload(true);

                // 首次连接需要回调的数据
                if (!this.sshConnected) {

                    // 解密数据

                    try{

                        // 第一次连接时候，会返回。再次连接不会返回。

                        let result = JSON.parse(e.data);

                        if (result.hasOwnProperty('status')) {
                            if (result['status'] === 'success') {
                                this.terminal.onConnect('ssh', 1, result);
                                this.sshConnected = true;
                            } else if (result['status'] === 'fail') {
                                // 登录异常
                                this.terminal.onConnect('ssh', 0, result);
                            }
                        }

                        return;

                    } catch (e) {

                        this.terminal.enable();
                        this.terminal.onConnect('ssh', 1);

                        console.info('再次连接' + e);
                    }

                }

                // if(e.data === '\x1b^ok\x1b\\'){
                //     console.info('数据已收到！');
                // }

                console.info(e.data.replace(/\x1b/g, '\\x1b')
                    .replace(/\x0d/g, '\\r')
                    .replace(/\x08/g, '\\x08')
                    .replace(/\x07/g, '\\x07')
                    .replace(/\x0f/g, '\\x0f')
                    .replace(/\x0a/g, '\\n'));


                this.heartbeat();

                this.rawText.push(e.data);

                terminal.startPrinter();

                if (!!this.downloadTimer) {
                    clearTimeout(this.downloadTimer);
                    this.downloadTimer = null;
                }
                this.downloadTimer = setTimeout(() => {
                    this.terminal.onDownload(false);
                }, 300);

            };

        });
    }

    /**
     * 发送服务器的信息
     */
    connectServer(columns, rows, type) {

        this.send(JSON.stringify({
            target: this.server,
            size: {
                w: columns || 80,
                h: rows || 24
            },
            term: type || 'xterm',
            type: '!sftp'
        }));

    }

    /**
     * 发送数据
     * @param data
     */
    send(data) {

        this.removeHeartbeat();

        if (!this.connected) {
            return;
        }

        if (this.webSocket.readyState !== 1) {
            return "webSocket readyState is " + this.webSocket.readyState;
        }


        this.terminal.onUpload(true);

        let presentation = data;
        if (typeof data === 'object') {
            presentation = JSON.stringify(data);
        }

        // 发送加密数据
        this.webSocket.send(presentation);

        if (!!this.uploadTimer) {
            clearTimeout(this.uploadTimer);
            this.uploadTimer = null;
        }
        this.uploadTimer = setTimeout(() => {
            this.terminal.onUpload(false);
        }, 300);


        this.heartbeat();


    }

    /**
     * 删除心跳定时器
     */
    removeHeartbeat() {
        if (!!this.beartbeatTimer) {
            clearInterval(this.beartbeatTimer);
            this.beartbeatTimer = null;
        }
    }

    /**
     * websocket心跳
     */
    heartbeat() {

        this.removeHeartbeat();

        this.beartbeatTimer = setInterval(() => {

            if (this.webSocket.readyState !== 1) {
                clearInterval(this.beartbeatTimer);
                this.beartbeatTimer = null;
                return;
            }

            console.info('心跳...');
            this.terminal.onHeartbeat(true);
            this.webSocket.send('hello`ws');
            setTimeout(() => {
                this.terminal.onHeartbeat(false);
            }, 300);

        }, 10000);

    }


}