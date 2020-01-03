
/**
 * 事件处理器
 */
class EventHandler {

    constructor(terminal) {

        // 发送接收器
        this.transceiver = terminal.transceiver;

        this.terminal = terminal;

        // 联想输入
        this.composing = {update: '', end: '', done: false, running: false};

        // 选中的内容
        this.selectionContent = '';

        // 光标选中范围
        this.selectionRanges = [];

        // 按快捷键全选。
        this.quickSelectAll = false;
    }


    /**
     * 粘贴
     */
    paste(pasteContent, from) {
        console.info('paste.from', from);
        this.send(pasteContent);
    }

    /**
     * 获取选中的内容
     * 只适用标准浏览器
     */
    getSelection() {
        let sel = window.getSelection();
        for (let i = 0; i < sel.rangeCount; i++) {
            this.selectionRanges[i] = sel.getRangeAt(i);
        }
        return sel.toString();
    }

    /**
     * 光标是否落在选中的范围中
     * @param {MouseEvent} event
     */
    isFocusSelectionRanges(event) {
        for (let range of this.selectionRanges) {
            for (let rect of range.getClientRects()) {
                if ((rect.x <= event.pageX && event.pageX <= rect.right)
                    && (rect.y <= event.pageY && event.pageY <= rect.bottom)) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * 绑定终端的事件
     */
    bindTerminal() {

        if (!this.terminal._enable) {
            return;
        }

        let keyboard = new Keyboard();

        // mousemove => mousedown => mousemove => mouseup => click
        // click(e.buttons=1): mousedown => mouseup => click
        // contextMenu(e.buttons=2): mousedown => mouseup

        // 点击容器获取焦点
        this.terminal.container.addEventListener('click', (e) => {
            if (!this.terminal._enable) {
                return;
            }

            this.quickSelectAll = false;
            console.info(e);
            // 是否有选中的文本
            if (!!!this.getSelection()) {
                this.terminal.clipboard.focus({preventScroll: true});
            }
            //
        });

        // 当用户按了全选的功能的时候，粘贴板失去焦点。
        // 如果用户按下其他按键的时候，应该能正常获取到按下的按键。
        document.addEventListener('keypress', (e) => {

            if(this.quickSelectAll){
                this.quickSelectAll = false;
                this.terminal.clipboard.focus();
                let keySym = keyboard.getKeySym(e, this.terminal.applicationMode);
                if(keySym) this.send(keySym);
            }

        });

        this.terminal.container.addEventListener('paste', (e) => {
            console.info(e);

            this.terminal.clipboard.focus();

            // 粘贴内容
            this.paste((e.clipboardData || window.clipboardData).getData('text'), 'clipboard2');

            e.stopPropagation();

        }, true);

        // mousedown
        this.terminal.container.addEventListener('mousedown', (ev) => {
            // 考虑选择文本的问题
            if (!this.terminal._enable) {
                return;
            }

            switch (ev.button) {
                case 0:
                    // 左键按下
                    console.info('左键按下');
                    this.terminal.focusTarget = 'container';

                    // 终端获取焦点
                    this.terminal.focus();

                    return;
                case 1:
                    // 滚轮（中键）按下
                    ev.preventDefault();
                    this.paste(this.selectionContent, 'mouse(wheel|middle)');
                    this.terminal.clipboard.focus();

                    break;
                case 2:
                    // 右键
                    // 如果全选的话，默认事件
                    if(this.quickSelectAll){
                        break;
                    }

                    // 如果光标不在选中区域的话，可以粘贴
                    if (!this.isFocusSelectionRanges(ev)) {
                        console.info('isFocusSelectionRanges => false');
                        console.info(ev.target.offsetTop);
                        console.info(ev.target);

                        // 获取右键光标的位置
                        // ev.target instanceof this.terminal.container:
                        // => 光标落在外部容器中
                        // ev.target instanceof this.terminal.presentationEl:
                        // => 光标落在presentationEl中
                        // ev.target instanceof div.terminal-row:
                        // => 光标落在某一行中
                        let target = ev.target
                            , x = ev.pageX
                            , y = 0
                            , h = this.terminal.charSize.height;

                        if (target === this.terminal.container) {
                            console.info('光标落在容器中....');
                            y = ev.pageY - (ev.pageY % this.terminal.charSize.height);
                        } else if (target === this.terminal.presentationEl) {
                            // 相当于光标落在最后一行数据行中。
                            y = target.offsetTop;
                            h = target.getBoundingClientRect().height;
                            console.info('光标落在撰写栏中....');
                        } else if (Utils.hasClass(target, 'terminal-row')) {
                            console.info('光标落在某一行中....');
                            y = target.offsetTop;
                        } else {
                            // 光标落在其他地方的话，不处理。。。
                            break;
                        }

                        this.terminal.css(this.terminal.clipboard, {
                            // backgroundColor: '#476287',
                            position: 'absolute',
                            left: Utils.px(x - this.terminal.charSize.width / 2),
                            top: Utils.px(y),
                            height: Utils.px(h),
                            width: Utils.px(target.getBoundingClientRect().width - x),
                        });

                        setTimeout(() => {
                            this.terminal.css(this.terminal.clipboard, {
                                // backgroundColor: '',
                                position: '',
                                left: '',
                                top: '',
                                height: '',
                                width: '',
                            });
                        }, 100);
                    }
                    break;
                case 3:
                    // 浏览器后退 按钮
                    // Browser Back
                    break;
                case 4:
                    // 浏览器前进 按钮
                    // Browser Forward
                    break;
            }


        });


        this.terminal.container.addEventListener('mouseup', () => {

            // console.info(e);

            // 选中的内容
            const selectionContent = this.getSelection();
            if (!!selectionContent) {
                this.selectionContent = selectionContent;
            } else {
                // console.info('粘贴板获取焦点...');
                // term.clipboard.focus();
            }

        });



        // 键盘按下
        this.terminal.clipboard.addEventListener('keydown', (e) => {

            console.info(e);
            this.quickSelectAll = false;

            // 不用取消默认行为。
            if (e.metaKey) {
                let key = e.key.toLowerCase();
                if ("cv".indexOf(key) !== -1) {
                    // MacOS: meta+c(复制), meta+v(粘贴)
                    return;
                } else if('a' === key){
                    // MacOS: meta+a(全选)
                    this.quickSelectAll = true;
                    // let sel = window.getSelection();
                    // sel.selectAllChildren(this.terminal.outputEl);
                    this.terminal.clipboard.blur();
                    return;
                }
            }

            // 阻止默认操作。
            // 如果不取消默认操作的话，tab等按键默认会跳出终端内。
            e.preventDefault();
            // 禁止冒泡
            e.stopPropagation();

            let keySym = keyboard.getKeySym(e, this.terminal.applicationMode);

            if (!!keySym) {

                // if(this.terminal.connected){
                //     this.send(keySym);
                // } else {
                //     // 未连接终端
                //     //
                //     if(keySym === C0.CR){
                //         this.terminal.echo('\r\n');
                //         if(this.terminal.password !== undefined){
                //             // 验证密码
                //             // 解析ssh命令
                //             this.terminal.transceiver.server.password = this.terminal.password;
                //             delete this.terminal.password;
                //
                //             this.terminal.handleSSHConnect();
                //
                //         }
                //         this.terminal.printPrompt();
                //     } else {
                //         this.terminal.print(keySym);
                //     }
                //
                // }
                //
                // if(keySym === C0.LF){
                //     this.terminal.clipboard.value = '';
                // }

                this.send(keySym);

            }

        });

        // 当"contextmenu"事件选中不是textarea区域的话，clipboard就失去了焦点。
        // 因此当显示菜单后，需要重新设置获取焦点。
        this.terminal.clipboard.addEventListener('contextmenu', () => {
            this.terminal.clipboard.focus();
        });

        // 联想输入开始
        this.terminal.clipboard.addEventListener('compositionstart', (e) => {
            this.composing.update = e.data;
            this.composing.done = false;
            this.composing.running = true;
            console.info(this.composing);
            this.terminal.echoComposition(this.composing);
        });

        // 联想输入更新
        this.terminal.clipboard.addEventListener('compositionupdate', (e) => {
            this.composing.update = e.data;
            console.info(this.composing);
            this.terminal.echoComposition(this.composing);
        });

        // 联想输入结束
        this.terminal.clipboard.addEventListener('compositionend', (e) => {
            this.composing.update = '';
            this.composing.done = true;
            this.composing.running = false;
            this.composing.end = e.data;
            console.info(this.composing);
            this.terminal.clipboard.value = '';
            this.terminal.echoComposition(this.composing);
        });

        // 移动端的输入法：

        // 粘贴板元素粘贴事件
        // this.terminal.clipboard.addEventListener('paste', (e) => {
        //     if(this.terminal.debug){
        //         console.info(e);
        //     }
        //
        //     this.paste((e.clipboardData || window.clipboardData).getData('text'), 'clipboard');
        //
        //     e.stopPropagation();
        // }, true);

        // term.clipboard.addEventListener('copy', (e) => {
        //     console.info(e);
        //     term.focus();
        // });


        this.terminal.clipboard.addEventListener('focus', (e) => {

            // 如果当前是在失去焦点的时间，则不处理失去焦点的动作。
            if (this.blurTimer) {
                clearTimeout(this.blurTimer);
                this.blurTimer = undefined;
            }

            console.info('获取焦点');
            e.stopPropagation();
            this.terminal.focus();
            this.terminal.clipboard.value = '';
            this.terminal.focusTarget = 'clipboard';
        });

        this.terminal.clipboard.addEventListener('blur', (e) => {
            // 如果100ms，没有focus的话，就获取焦点。
            // 否则，不处理失去焦点
            this.blurTimer = setTimeout(() => {
                console.info('失去焦点');
                e.stopPropagation();
                if(!this.quickSelectAll){
                    this.terminal.blur();
                }

                if (this.terminal.focusTarget === 'clipboard') {
                    this.terminal.focusTarget = undefined;
                }

                clearTimeout(this.blurTimer);
                this.blurTimer = undefined;

            }, 100);

        });

        window.addEventListener('blur', () => {
            this.terminal.focusTarget = undefined;
            this.terminal.blur();
        });

        // 窗口大小改变
        window.onresize = () => {
            if (!!this.resizingTimer) {
                clearTimeout(this.resizingTimer);
                this.resizingTimer = null;
            }
            this.resizingTimer = setTimeout(() => {
                this.terminal.resize();
                clearTimeout(this.resizingTimer);
                this.resizingTimer = null;
            }, 100);
        };

        window.addEventListener('offline', () => {
            alert("The network connection has been lost.");
        });

        window.addEventListener('online', () => {
            alert("You are now connected to the network.");
        });

        window.addEventListener('unload', () => {
            this.terminal.close();
        });

    }


    /**
     * 发送指令
     * @param command
     */
    send(command) {

        this.transceiver.send({
            cmd: command
        });

    }

}