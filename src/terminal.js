/**
 * Terminal 2.0 基于ES6开发
 * */
const systemPresetColors = {
    'black': '#000000',
    'navy': '#000080',
    'darkblue': '#00008b',
    'mediumblue': '#0000cd',
    'blue': '#0000ff',
    'darkgreen': '#006400',
    'green': '#008000',
    'teal': '#008080',
    'darkcyan': '#008b8b',
    'deepskyblue': '#00bfff',
    'darkturquoise': '#00ced1',
    'mediumspringgreen': '#00fa9a',
    'lime': '#00ff00',
    'springgreen': '#00ff7f',
    'aqua': '#00ffff',
    'cyan': '#00ffff',
    'midnightblue': '#191970',
    'dodgerblue': '#1e90ff',
    'lightseagreen': '#20b2aa',
    'forestgreen': '#228b22',
    'seagreen': '#2e8b57',
    'darkslategray': '#2f4f4f',
    'limegreen': '#32cd32',
    'mediumseagreen': '#3cb371',
    'turquoise': '#40e0d0',
    'royalblue': '#4169e1',
    'steelblue': '#4682b4',
    'darkslateblue': '#483d8b',
    'mediumturquoise': '#48d1cc',
    'indigo': '#4b0082',
    'darkolivegreen': '#556b2f',
    'cadetblue': '#5f9ea0',
    'cornflowerblue': '#6495ed',
    'mediumaquamarine': '#66cdaa',
    'dimgray': '#696969',
    'dimgrey': '#696969',
    'slateblue': '#6a5acd',
    'olivedrab': '#6b8e23',
    'slategray': '#708090',
    'lightslategray': '#778899',
    'mediumslateblue': '#7b68ee',
    'lawngreen': '#7cfc00',
    'chartreuse': '#7fff00',
    'aquamarine': '#7fffd4',
    'maroon': '#800000',
    'purple': '#800080',
    'olive': '#808000',
    'gray': '#808080',
    'skyblue': '#87ceeb',
    'lightskyblue': '#87cefa',
    'blueviolet': '#8a2be2',
    'darkred': '#8b0000',
    'darkmagenta': '#8b008b',
    'saddlebrown': '#8b4513',
    'darkseagreen': '#8fbc8f',
    'lightgreen': '#90ee90',
    'mediumpurple': '#9370db',
    'darkviolet': '#9400d3',
    'palegreen': '#98fb98',
    'darkorchid': '#9932cc',
    'yellowgreen': '#9acd32',
    'sienna': '#a0522d',
    'brown': '#a52a2a',
    'darkgray': '#a9a9a9',
    'lightblue': '#add8e6',
    'greenyellow': '#adff2f',
    'paleturquoise': '#afeeee',
    'lightsteelblue': '#b0c4de',
    'powderblue': '#b0e0e6',
    'firebrick': '#b22222',
    'darkgoldenrod': '#b8860b',
    'mediumorchid': '#ba55d3',
    'rosybrown': '#bc8f8f',
    'darkkhaki': '#bdb76b',
    'silver': '#c0c0c0',
    'mediumvioletred': '#c71585',
    'indianred': '#cd5c5c',
    'peru': '#cd853f',
    'chocolate': '#d2691e',
    'tan': '#d2b48c',
    'lightgray': '#d3d3d3',
    'thistle': '#d8bfd8',
    'orchid': '#da70d6',
    'goldenrod': '#daa520',
    'palevioletred': '#db7093',
    'crimson': '#dc143c',
    'gainsboro': '#dcdcdc',
    'plum': '#dda0dd',
    'burlywood': '#deb887',
    'lightcyan': '#e0ffff',
    'lavender': '#e6e6fa',
    'darksalmon': '#e9967a',
    'violet': '#ee82ee',
    'palegoldenrod': '#eee8aa',
    'lightcoral': '#f08080',
    'khaki': '#f0e68c',
    'aliceblue': '#f0f8ff',
    'honeydew': '#f0fff0',
    'azure': '#f0ffff',
    'sandybrown': '#f4a460',
    'wheat': '#f5deb3',
    'beige': '#f5f5dc',
    'whitesmoke': '#f5f5f5',
    'mintcream': '#f5fffa',
    'ghostwhite': '#f8f8ff',
    'salmon': '#fa8072',
    'antiquewhite': '#faebd7',
    'linen': '#faf0e6',
    'lightgoldenrodyellow': '#fafad2',
    'oldlace': '#fdf5e6',
    'red': '#ff0000',
    'fuchsia': '#ff00ff',
    'magenta': '#ff00ff',
    'deeppink': '#ff1493',
    'orangered': '#ff4500',
    'tomato': '#ff6347',
    'hotpink': '#ff69b4',
    'coral': '#ff7f50',
    'darkorange': '#ff8c00',
    'lightsalmon': '#ffa07a',
    'orange': '#ffa500',
    'lightpink': '#ffb6c1',
    'pink': '#ffc0cb',
    'gold': '#ffd700',
    'peachpuff': '#ffdab9',
    'navajowhite': '#ffdead',
    'moccasin': '#ffe4b5',
    'bisque': '#ffe4c4',
    'mistyrose': '#ffe4e1',
    'blanchedalmond': '#ffebcd',
    'papayawhip': '#ffefd5',
    'lavenderblush': '#fff0f5',
    'seashell': '#fff5ee',
    'cornsilk': '#fff8dc',
    'lemonchiffon': '#fffacd',
    'floralwhite': '#fffaf0',
    'snow': '#fffafa',
    'yellow': '#ffff00',
    'lightyellow': '#ffffe0',
    'ivory': '#fffff0',
    'white': '#ffffff'
};


function noop() {

}


class Terminal {

    constructor(args) {
        this.initPreferences();

        this.charsets = {};
        // http://vt100.net/docs/vt102-ug/table5-13.html
        this.charsets.SCLD = { // (0
            '`': '\u25c6', // '◆'
            'a': '\u2592', // '▒'
            'b': '\u0009', // '\t'
            'c': '\u000c', // '\f'
            'd': '\u000d', // '\r'
            'e': '\u000a', // '\n'
            'f': '\u00b0', // '°'
            'g': '\u00b1', // '±'
            'h': '\u2424', // '\u2424' (NL)
            'i': '\u000b', // '\v'
            'j': '\u2518', // '┘'
            'k': '\u2510', // '┐'
            'l': '\u250c', // '┌'
            'm': '\u2514', // '└'
            'n': '\u253c', // '┼'
            'o': '\u23ba', // '⎺'
            'p': '\u23bb', // '⎻'
            'q': '\u2500', // '─'
            'r': '\u23bc', // '⎼'
            's': '\u23bd', // '⎽'
            't': '\u251c', // '├'
            'u': '\u2524', // '┤'
            'v': '\u2534', // '┴'
            'w': '\u252c', // '┬'
            'x': '\u2502', // '│'
            'y': '\u2264', // '≤'
            'z': '\u2265', // '≥'
            '{': '\u03c0', // 'π'
            '|': '\u2260', // '≠'
            '}': '\u00a3', // '£'
            '~': '\u00b7'  // '·'
        };

        this.charsets.UK = null; // (A
        this.charsets.US = null; // (B (USASCII)
        this.charsets.Dutch = null; // (4
        this.charsets.Finnish = null; // (C or (5
        this.charsets.French = null; // (R
        this.charsets.FrenchCanadian = null; // (Q
        this.charsets.German = null; // (K
        this.charsets.Italian = null; // (Y
        this.charsets.NorwegianDanish = null; // (E or (6
        this.charsets.Spanish = null; // (Z
        this.charsets.Swedish = null; // (H or (7
        this.charsets.Swiss = null; // (=
        this.charsets.ISOLatin = null; // /A


        this.onUpdateTitle = args.onUpdateTitle || noop;
        this.onCreated = args.onCreated || noop;
        this.onClosed = args.onClosed || noop;
        this.onResize = args.onResize || noop;
        this.onCursorPosition = args.onCursorPosition || noop;
        this.onHeartbeat = args.onHeartbeat || noop;
        this.onUpload = args.onUpload || noop;
        this.onDownload = args.onDownload || noop;
        this.onConnect = args.onConnect || noop;

        if(!!args.preferences){
            Object.assign(args.preferences, this.preferences);
        }

        // 是否已经连接了。。。
        this.connected = true;

        // 容器内部布局
        // --div.jxterm(容器)
        //     --div.jxterm-output
        //       --textarea.clipboard(粘贴板)
        //       --div.jxterm-output-row
        //     --div.terminal-command
        //       --textarea.blackboard(撰写板)

        // 终端容器
        this.container = document.querySelector(args.selector || '#terminal');
        this.container.innerHTML = '';

        // 设置背景
        this.setBackground(this.preferences.text.backgroundImage,
            this.preferences.text.backgroundRepeat,
            this.preferences.text.backgroundSize);

        this.id = "jxterm-" + new Date().getTime();
        Utils.addClass(this.container, 'jxterm');

        // 输出栏
        this.outputEl = document.createElement('div');
        this.outputEl.className = 'jxterm-output';
        this.container.appendChild(this.outputEl);
        // 添加粘贴板
        // this.clipboard = document.createElement('textarea');
        // this.clipboard.className = 'clipboard';
        // this.outputEl.appendChild(this.clipboard);

        // 命令行栏
        this.presentationEl = document.createElement('div');
        this.presentationEl.className = 'jxterm-presentation';
        this.container.appendChild(this.presentationEl);

        // 创建撰写板
        this.clipboard = document.createElement('textarea');
        this.clipboard.className = 'jxterm-clipboard';
        this.presentationEl.appendChild(this.clipboard);
        this.clipboard.focus();

        let textAndBackgroundColor = this.preferences.colors.textAndBackgroundColor;
        let colors = textAndBackgroundColor.buildInSchemes[textAndBackgroundColor.buildInScheme];

        this.color = this.parseColor(colors[0], 0.99);
        this.bgColor = this.parseColor(colors[1], 0.99);

        this.setBackgroundColor(this.bgColor);

        // 解析器
        this.currentRow = null;
        this.scrollbar = {width: 0, height: 0};
        this.getScrollbar();

        this.parser = args.parser || new Parser(this);
        // 数据发送接收器
        this.transceiver = args.transceiver;
        // 调试模式，不用连接到服务器
        this.debug = args.debug || false;
        this.prompt = args.prompt || '';

        // 命令
        this.command = '';

        // 启动终端
        this._enable = true;
        // 显示光标
        this._showCursor = true;
        // 光标是否获取焦点
        this._cursor_focus = false;

        // 事件处理器
        if (!!!args.eventHandler) {
            args.eventHandler = new EventHandler(this);
        }

        this.eventHandler = args.eventHandler;

        // 字符大小
        this.charSize = {width: 0, height: 0, offsetWidth: 0, offsetHeight: 0};

        // 是否使用系统键盘
        this.systemKeyboard = true;


        // this.cursor = null;
        this.rows = 0;
        this.columns = 0;
        // 默认边距
        this.margin = {
            top: 0,
            right: 4,
            bottom: 0,
            left: 4
        };

        // 应用模式
        this.applicationMode = false;


        // 字体配置
        let font = this.preferences.text.font;
        this.updateFont(font.size, font.family);

        // 更新视图
        this.updateViewport();

        setTimeout(() => {

            // 度量字符
            // 获取某一个子的宽度和高度
            this.measureCharSize();

            // 终端初始化完成。
            this.onCreated({
                rows: this.getRows(),
                columns: this.getColumns(),
                declareTerminalAs: this.preferences.advanced.termInfo.declareTerminalAs,
                charSize: this.charSize
            });

            // this.printBanner();
            // this.printPrompt();
            // this.print('ssh -p ' + this.transceiver.server.port + ' ' +
            //     this.transceiver.server.username + '@' + this.transceiver.server.hostname + '\r\n');
            this.handleSSHConnect();


        }, 500);

        // this.onCursorPosition({
        //     x: this.parser.x,
        //     y: this.parser.y
        // });

    }



    // 终端偏好设置
    initPreferences(){

        this.preferences = {
            text: {
                // backgroundImage: '../assets/images/jhk-1567651299481.jpg',
                backgroundImage: '../assets/images/default-background.png',
                backgroundRepeat: true, // 重复填充
                backgroundSize: '100% 100%',  // 'cover', 'contain', '100% 100%'
                font: {
                    family: 'DejaVuSansMono',
                    size: '12pt'
                },
                cursor: {
                    shapes: ['Block', 'I-Beam', 'Wide I-Beam', 'Underline', 'Wide Underline'],
                    shape: 'Block',
                    blinking: false,
                }
            },
            colors: {
                textAndBackgroundColor: {
                    buildInSchemes: {
                        'Black on light yellow': ['#000000', '#FFFFDD'],  // color, background
                        'Black on white': ['#000000', '#FFFFFF'],
                        'Gray on black': ['#AAAAAA', '#000000'],
                        'Green on black': ['#00FF00', '#000000'],
                        'White on black': ['#FFFFFF', '#000000'],
                        'Tango light': ['#2E3436', '#EEEEEC'],
                        'Tango dark': ['#D3D7CF', '#2E3436'],
                        'Solarized light': ['#657B83', '#FDF6E3'],
                        'Solarized dark': ['#839496', '#002B36'],
                        'Custom': ['#839496', '#002B36'],
                    },
                    // 默认选中那个
                    buildInScheme: 'Solarized dark',
                    boldColor: '#000000',
                    cursorColor: ['red', '#00FF00'],  // color, background
                    highlightColor: ['#FFFFFF', '#000000'],  // color, background
                    transparentBackground: 0.5, // 0-1
                },

                // 调色板
                palette: {
                    colorNames: [
                        'black',
                        'red',
                        'green',
                        'yellow',
                        'blue',
                        'magenta',
                        'cyan',
                        'white',
                        'bright-black',
                        'bright-red',
                        'bright-green',
                        'bright-yellow',
                        'bright-blue',
                        'bright-magenta',
                        'bright-cyan',
                        'bright-white'
                    ],
                    buildInSchemes: {
                        'tango': [
                            '#2E3436', '#CC0000', '#4E9A06', '#C4A000',
                            '#3465A4', '#75507B', '#06989A', '#D3D7CF',
                            '#555753', '#EF2929', '#8AE234', '#FCE94F',
                            '#729FCF', '#AD7FA8', '#34E2E2', '#EEEEEC'
                        ],
                        'Linux console': [
                            '#000000', '#AA0000', '#00AA00', '#AA5500',
                            '#0000AA', '#AA00AA', '#00AAAA', '#AAAAAA',
                            '#555555', '#FF5555', '#55FF55', '#FFFF55',
                            '#5555FF', '#FF55FF', '#55FFFF', '#FFFFFF'
                        ],
                        'XTerm': [
                            '#000000', '#CD0000', '#00CD00', '#CDCD00',
                            '#0000EE', '#CD00CD', '#00CDCD', '#E5E5E5',
                            '#7F7F7F', '#FF0000', '#00FF00', '#FFFF00',
                            '#5C5CFF', '#FF00FF', '#00FFFF', '#FFFFFF'
                        ],
                        'Rxvt': [
                            '#000000', '#CD0000', '#00CD00', '#CDCD00',
                            '#0000CD', '#CD00CD', '#00CDCD', '#FAEBD7',
                            '#404040', '#FF0000', '#00FF00', '#FFFF00',
                            '#0000FF', '#FF00FF', '#00FFFF', '#FFFFFF'
                        ],
                        'Solarized': [
                            '#073642', '#DC322F', '#859900', '#B58900',
                            '#268BD2', '#D33682', '#2AA198', '#EEE8D5',
                            '#002B36', '#CB4B16', '#586E75', '#657B83',
                            '#839496', '#6C71C4', '#93A1A1', '#FDF6E3'
                        ],
                        'Custom': [
                            '#073642', '#DC322F', '#859900', '#B58900',
                            '#268BD2', '#D33682', '#2AA198', '#EEE8D5',
                            '#002B36', '#CB4B16', '#586E75', '#657B83',
                            '#839496', '#6C71C4', '#93A1A1', '#FDF6E3'
                        ]
                    },
                    // 以亮色显示粗体文本
                    showBoldTextInBrightColors: true,
                    // 默认选中，如果用户修改，则该值将会保存
                    buildInScheme: 'XTerm',
                }
            },
            advanced: {
                termInfo: {
                    // 终端类型
                    terminalDeclares: [
                        'ansi', 'dtterm', 'nsterm', 'rxvt',
                        'vt52', 'vt100', 'vt102', 'xterm',
                        'xterm-16color', 'xterm-256color'
                    ],
                    declareTerminalAs: 'xterm',
                },

                input: {
                    deleteSendsControlH: false,     // Control-H键代表Delete键
                    escapeNonASCIIInputWithControlV: false,    // 用Control-V键跳过非ASCII的输入
                    pasteNewlinesAsCarriageReturns: true,   // 将新行作为回车贴入
                    allowVT100ApplicationKeypadMode: true,  // 允许VT100应用程序小键盘模式，应用程序模式启动后，使用NumLock键来输入数字。
                    scrollToBottomOnInput: true,    // 输入时滚动到底部

                },

                bell: {
                    audibleBell: true,  // 可听报警声
                    visualBell: true,   // 可见报警声，改变背景颜色
                    visualBellColor: 'rgba(0,0,0,0.5)',
                },
            }
        };
    }





    /**
     * 16进制颜色转10进制颜色
     * 如：#FFFFFF #FFF #FFFFFFFF  => 255,255,255[,alpha]
     * @param color
     * @param alpha 透明度 （00|0表示完全透明，ff|1表示完全不透明）
     */
    parseColor(color, alpha) {

        alpha = alpha || 'ff';

        if (color.charAt(0) === '#') {

            color = color.substring(1);

        } else {

            let c = systemPresetColors[color.toLowerCase()];
            if(!c){
                // 无效的颜色
                console.info('无效的颜色值: ' + color + ', 已自动设置为#000000(Black)。');
                c = '#000000';
            }

            color = c;

        }

        let r, g, b, a, len = color.length;

        if (len === 3) {
            r = color.substring(0, 1);
            g = color.substring(1, 2);
            b = color.substring(2);
            r += r;
            g += g;
            b += b;
        } else if (len === 6 || len === 8) {
            r = color.substring(0, 2);
            g = color.substring(2, 4);
            b = color.substring(4, 6);
        }

        if (len === 3 || len === 6) {
            if (typeof alpha === 'string') {
                a = Math.round((
                    parseInt(alpha, 16) * 100 / 255)) / 100;
            } else {
                a = alpha;
            }
        } else if (len === 8) {
            a = Math.round((
                parseInt(
                    color.substring(6), 16) * 100 / 255)) / 100;
        }

        if (a > 255 || a < 0) {
            throw new Error("Invalid alpha value: " + alpha);
        }

        return 'rgba(' + parseInt(r, 16) + ', ' +
            parseInt(g, 16) + ', ' + parseInt(b, 16) +
            ', ' + a + ')';
    }

    /**
     * 设置发送接收器
     * @param transceiver
     */
    setTransceiver(transceiver){
        this.transceiver = transceiver;
        this.handleSSHConnect();
    }

    handleSSHConnect() {
        if(!this.transceiver) return;

        this.transceiver.connect(this)
            .then(() => {
                this.transceiver.connectServer(this.getColumns(), this.getRows(),
                    this.preferences.advanced.termInfo.declareTerminalAs);
            }).catch(() => {
            // console.info(e, e.target.readyState)
        });
        this.startPrinter();
    }

    /**
     * 打印本软件的命令
     * @param data
     */
    print(data) {
        if (data) {
            if (data === '\x08') {
                if (this.command === '') {
                    this.bell();
                } else {
                    this.echo(data + '\x1b[K');
                    this.command = this.command.substring(0, this.command.length - 1);
                }
                return;
            } else if (data === '\x1b[D') {
                if (this.parser.x <= this.promptSize) {
                    this.bell();
                } else {
                    this.echo(data);
                }
                return;
            } else if (data === '\x1b[C') {
                // arrow right
                if (this.parser.x >= (this.command.length + this.promptSize)) {
                    this.bell();
                } else {
                    this.echo(data);
                }
                return;
            } else if (data === '\x1b[A') {
                // arrow up
                return;
            } else if (data === '\x1b[B') {
                // arrow down
                return;
            } else if (data === '\x03') {
                // ctrl + c
                this.echo('^C\r\n');
                this.command = '';
                this.printPrompt();
            } else if (this.password !== undefined) {
                this.password += data;
            } else {
                this.echo(data);
                this.command += data;
            }

            switch (this.command.split(' ')[0]) {
                case '':
                    break;
                case 'ls':
                    break;
                case 'pwd':
                    this.echo('/\r\n');
                    break;
                case 'date':
                    this.echo(new Date().toString() + '\r\n');
                    break;
                case 'sftp':
                    break;
                case 'ssh':
                    if (this.password === undefined) {
                        this.echo('Password: ');
                        if (!!this.transceiver.server.password) {
                            this.handleSSHConnect();
                            break;
                        }
                        this.password = '';
                    }

                    break;
                case 'help':
                    this.echo('' +
                        'ssh \r\n' +
                        '\r\n' +
                        '\r\n' +
                        '\r\n' +
                        '\r\n' +
                        '\r\n' +
                        '\r\n' +
                        '\r\n' +
                        '\r\n' +
                        '\r\n' +
                        '\r\n' +
                        '\r\n' +
                        '\r\n' +
                        '\r\n' +
                        '\r\n' +
                        '');
                    break;
                case 'version':
                    break;
            }

        }
    }

    /**
     * 打印Banner
     */
    printBanner() {
        this.echo('\r\n\r\n' +
            '   ************************************\r\n' +
            '   *                                  *\r\n' +
            '   *       \x1b[1;34m•WebXterm™ v1.2.1\x1b[m           *\r\n' +
            '   *                                  *\r\n' +
            '   *   ♦ Web Unix Terminal Emulator   *\r\n' +
            '   *                                  *\r\n' +
            '   ************************************\r\n' +
            '   Type "help" for more information.' +
            '   \n\r\n');
    }

    printPrompt(prompt) {
        this.command = '';
        this.echo(prompt || this.prompt);
        if (!this.promptSize) {
            this.promptSize = this.parser.x;
        }
    }

    /**
     *
     * @param data
     */
    printf(data){
        this.echo(data);
    }

    /**
     * 消息队列
     */
    startPrinter() {

        if (!!this.messageQueueTimer) return;

        this.messageQueueTimer = setInterval(() => {

            if (this.transceiver.rawText.length === 0) {
                clearInterval(this.messageQueueTimer);
                this.messageQueueTimer = null;
            }

            let rawText = this.transceiver.rawText.splice(0,
                this.transceiver.rawText.length);

            if (!!rawText && rawText.length > 0) {

                this.echoText(rawText.join(''));

            }

        }, 0);

    }

    /**
     * 连接已关闭
     */
    connectionClosed(e) {
        if (e.target.readyState === 3 && !this.transceiver.connected) {
            const msg = '\r\n\x1b[1;33mo_O???\x1b[m\r\n\r\n！！！无法建立到 \x1b[7m' +
                (!!this.transceiver.ws.port ? this.transceiver.ws.url + ':' + this.transceiver.ws.port : this.transceiver.ws.url) +
                '\x1b[m 服务器的连接。\r\n\r\n请刷新重试！';
            this.echoText(msg);
            this.disable();
        }
    }

    /**
     * 获取字符的宽度和高度
     */
    measureCharSize() {

        const terminal = this.container.cloneNode();
        terminal.removeAttribute("id");

        this.container.parentElement.appendChild(terminal);
        // terminal

        let span = document.createElement('span');
        span.innerHTML = 'W';
        span.className = 'measure';

        terminal.appendChild(span);

        let rect = span.getBoundingClientRect();
        console.info("获取字体的高度和宽度：", rect);
        this.charSize.width = rect.width;
        this.charSize.height = rect.height;
        this.charSize.top = rect.top;
        this.charSize.left = rect.left;

        terminal.removeChild(span);
        this.container.parentElement.removeChild(terminal);

        this.updateStyleWithFont();

    }

    /**
     * 字体更新后需要更新的样式的
     */
    updateStyleWithFont() {

        const w = this.charSize.width
            , dw = w * 2
            , h = this.charSize.height;

        // .len2
        // 一个中文的宽度: 一个中文 = 两个字符 => width(一个字符宽度*2)
        this.updateCSS(
            '.len2{height:' + h + 'px; width:' + dw + 'px; line-height:' + h + 'px;}',
            '_style_len2');

        // .jxterm-output-row
        this.updateCSS(
            '.jxterm-output-row{height:' + h + 'px; line-height:' + h + 'px;}',
            '_style_terminal_row');


        // .clipboard
        // this.updateCSS(
        //     '.clipboard{line-height:' + h + 'px; font-size:' + f + ';}',
        //     '_style_clipboard');
    }

    /**
     * 更新
     */
    updateStyleWithColor() {

        // .inverse
        this.updateCSS('.inverse{color: ' + this.bgColor + ' !important;background-color:' + this.color + '} !important; }',
            '_style_inverse');

        this.updateCSS(
            '.tab::selection,' +
            '.len2::selection,' +
            '.jxterm-output-row::selection{color:' + this.bgColor + ';background-color:' + this.color + ';}' +
            '.tab::-moz-selection,' +
            '.len2::-moz-selection,' +
            '.jxterm-output-row::-moz-selection{color:' + this.bgColor + ';background-color:' + this.color + ';}' +
            '.tab::-webkit-selection,' +
            '.len2::-webkit-selection,' +
            '.jxterm-output-row::-webkit-selection{color:' + this.bgColor + ';background-color:' + this.color + ';}',
            '_style_selection');

        // 联想输入下划线
        // .composition
        this.updateCSS('.composition:after{border-bottom: 2px solid ' + this.color + '}',
            '_style_composition');


    }

    /**
     * 光标样式
     */
    updateStyleWithCursor() {

        let cursor = this.preferences.text.cursor,
            cursorColor = this.preferences.colors.textAndBackgroundColor.cursorColor,
            content = '',
            width = 1;

        // @keyframes cursor-blink
        this.updateCSS(
            '@keyframes cursor-blink { ' +
            ' 0%, 50% {background-color: ' + cursorColor[1] + ' color: ' + cursorColor[0] + ';}' +
            ' 51%, 100%{background-color: transparent; color: inherit; }' +
            '}', '_style_cursor_blink');

        // cursor
        {

            if (cursor.shape === 'Block') {
                content =
                    // cursor
                    '.cursor.cursor-shape-block.cursor-focus { background-color: ' + cursorColor[1] + '; color: ' + cursorColor[0] + ' }' +
                    '.cursor.cursor-shape-block, ' +
                    '.cursor.cursor-shape-block.cursor-hide, ' +
                    '.cursor.cursor-shape-block.cursor-focus.cursor-hide { background-color: transparent; color: inherit }' +
                    // outline
                    '.cursor.cursor-shape-block .outline,' +
                    '.cursor.cursor-shape-block.cursor-focus .outline { border: 1px solid ' + cursorColor[1] + '; }' +
                    '.cursor.cursor-shape-block.cursor-hide .outline,' +
                    '.cursor.cursor-shape-block.cursor-focus.cursor-hide .outline { border: 1px solid transparent }';

            } else if (cursor.shape === 'Underline' || cursor.shape === 'Wide Underline') {
                if (cursor.shape === 'Wide Underline') width = 2;

                content =
                    // outline
                    '.cursor.cursor-shape-underline .outline { border: 1px solid ' + cursorColor[1] + ' }' +
                    '.cursor.cursor-shape-underline.cursor-focus .outline ' +
                    '{ border: none; background-color: ' + cursorColor[1] + '; height: ' + width + 'px; top: auto }' +
                    '.cursor.cursor-shape-underline.cursor-hide .outline,' +
                    '.cursor.cursor-shape-underline.cursor-focus.cursor-hide .outline { background-color: transparent; height: 0px }';

            } else if (cursor.shape === 'I-Beam' || cursor.shape === 'Wide I-Beam') {
                if (cursor.shape === 'Wide I-Beam') width = 2;

                content =
                    // outline
                    '.cursor.cursor-shape-vertical-bar .outline { border: 1px solid ' + cursorColor[1] + ' }' +
                    '.cursor.cursor-shape-vertical-bar.cursor-focus .outline ' +
                    '{ border: none; background-color: ' + cursorColor[1] + '; width: ' + width + 'px }' +
                    '.cursor.cursor-shape-vertical-bar.cursor-hide .outline,' +
                    '.cursor.cursor-shape-vertical-bar.cursor-focus.cursor-hide .outline { background-color: transparent; width: 0px }';

            }

            this.updateCSS(content, '_style_cursor');

        }

    }

    /**
     * 更新ansi颜色
     */
    updateStyleWithAnsiColors() {

        let bgColors = ''
            , colors = ''
            , sel = ''
            , color = this.color
            , bgColor = this.bgColor;

        function _bgColor(name, color) {
            return '.' + name + '2{background-color:' + color + '}';
        }

        function _color(name, color) {
            return '.' + name + '{color:' + color + '}';
        }

        function _selectionColor(name, color) {
            return '.' + name + '::selection{background-color:' + color + ';color:' + bgColor + ';}' +
                '.' + name + '::-moz-selection{background-color:' + color + ';color:' + bgColor + ';}' +
                '.' + name + '::-webkit-selection{background-color:' + color + ';color:' + bgColor + ';}';
        }

        function _selectionBgColor(name, fgColor) {
            return '.' + name + '2::selection{background-color:' + color + ';color:' + fgColor + ';}' +
                '.' + name + '2::-moz-selection{background-color:' + color + ';color:' + fgColor + ';}' +
                '.' + name + '2::-webkit-selection{background-color:' + color + ';color:' + fgColor + ';}';
        }



        let palette = this.preferences.colors.palette.buildInSchemes[this.preferences.colors.palette.buildInScheme];
        for (let i = 0, len = palette.length, key; i < len; i++) {
            key = this.preferences.colors.palette.colorNames[i];
            colors += _color(key, palette[i]);
            bgColors += _bgColor(key, palette[i]);
            sel += _selectionColor(key, this.parseColor(palette[i], 0.99));
            sel += _selectionBgColor(key, this.parseColor(palette[i], 0.99));

        }

        // color
        this.updateCSS(colors, '_style_ansi_color');

        // background color
        this.updateCSS(bgColors, '_style_ansi_color2');

        // selection color
        this.updateCSS(sel, '_style_ansi_selection');

    }

    updateCSS(content, id) {

        const sid = this.id + id,
            style = document.getElementById(sid);

        if (!!style) {
            style.innerHTML = content;
        } else {
            this.style(content, sid);
        }
    }

    /**
     * 通过容器的高度来计算行数
     * 高度不考虑存在滚动条
     *
     * @return {number}
     */
    getRows() {

        // if(this.rows && force === undefined) return this.rows;

        if(this.charSize.height === 0){
            this.measureCharSize();
        }

        // 窗口大小
        let height = this.container.offsetHeight - this.margin.top - this.margin.bottom;
        this.rows = Math.floor(height / this.charSize.height);

        this.margin['extraBottom'] = height - this.rows * this.charSize.height;
        let mb = this.margin.bottom + this.margin['extraBottom'];
        this.presentationEl.style.height = mb + 'px';

        if (this.rows < 4) {
            this.rows = 4;
        }

        // 更新滚动区域底部
        this.parser.scrollBottom = this.rows;

        return this.rows;

    }

    /**
     * 计算滚动条的宽度
     */
    getScrollbar() {
        let div = document.createElement('div');
        div.className = 'measure scrollbar';
        this.container.appendChild(div);

        this.scrollbar.width = div.offsetWidth - div.clientWidth;
        this.scrollbar.height = div.offsetHeight - div.clientHeight;

        this.container.removeChild(div);
    }

    /**
     * 通过容器的宽度来计算列数
     * @returns {number}
     */
    getColumns() {

        if (this.scrollbar === undefined) {
            this.getScrollbar();
        }

        if(this.charSize.width === 0){
            this.measureCharSize();
        }

        let row = document.createElement('div');
        this.container.appendChild(row);
        let width = row.clientWidth - this.margin.left - this.margin.right;
        // 获取容器的内框宽度clientWidth
        this.columns = Math.floor(width / this.charSize.width);
        row.remove();

        this.margin['extraRight'] = width - this.columns * this.charSize.width;
        let pr = this.margin.right + this.margin['extraRight'];

        this.updateCSS('.jxterm-output-row{padding-left:' + this.margin.left + 'px; padding-right: ' + pr + 'px}',
            '_style_padding_LR');

        if (this.columns < 20) {
            this.columns = 20;
            this.container.style.minWidth = Utils.px(this.columns * this.charSize.width);
        }

        return this.columns;
    }


    /**
     * 更新字体大小，字体名称
     * @param size
     * @param family
     */
    updateFont(size='12pt', family='') {

        if (!!size) this.container.style.fontSize = size;
        if (!!family) this.container.style.fontFamily = family;

    }


    /**
     * 更新视窗
     */
    updateViewport() {

        // 文本配置
        this.container.style.color = this.color;
        this.updateStyleWithColor();

        this.createCursor();

        this.getColumns();
        this.getRows();

        // 光标获取焦点
        if (this._showCursor) {
            this.focus();
        }

        this.eventHandler.bindTerminal(this);

        // ansi颜色
        this.updateStyleWithAnsiColors();
    }

    /**
     *
     * @returns {HTMLStyleElement}
     */
    style(content, id = '') {
        let style = document.createElement('style');
        style.setAttribute('type', 'text/css');
        if (!!id) {
            style.id = id;
        }
        style.innerHTML = content;
        document.getElementsByTagName('HEAD').item(0).appendChild(style);
    }

    /**
     * 设置css样式
     * @param element
     * @param style
     */
    css(element, style) {

        if (!!!style) return;

        let flag = false;

        for (let prop in style) {
            const propName = '' + prop;
            element.style[propName] = style[propName];
            !flag && (flag = true);
        }
        return flag;
    }

    /**
     * 发送数据到服务器
     */
    emit(data) {
        if(!this.transceiver) return;

        this.transceiver.send({
            cmd: data
        });
    }

    /**
     * 窗口大小被重置
     */
    resize() {
        console.info('窗口大小被重置', this.getRows(), this.getColumns());

        let size = {
            w: this.getColumns(),
            h: this.getRows()
        };

        if(this.transceiver)
            this.transceiver.send({
                size: size
            });

        this.onResize({
            rows: size.h,
            columns: size.w
        });

    }

    // /**
    //  * 创建一个span元素
    //  * @param className
    //  * @param id
    //  * @returns {HTMLSpanElement}
    //  */
    // span(className, id){
    //     let ele = document.createElement('span');
    //     !!className && (ele.className = className);
    //     !!id && (ele.id = id);
    //     return ele;
    // }

    /**
     * alias echoText(text: string)
     * @param text
     */
    echo(text) {
        console.info(this.getColumns());
        return this.echoText(text);
    }

    /**
     * 输出文本
     * @param text
     */
    echoText(text) {
        this.parser.parse(text);
    }

    /**
     * 联想输入
     * @param{object} composing
     */
    echoComposition(composing) {

        let cursor;
        if (this.cursor.isConnected) {
            cursor = this.cursor;
        } else {
            const dcId = this.getDynamicCursorId();
            if (!!dcId) {
                const dc = document.getElementById(dcId);
                if (dc) {
                    if (dc.isConnected) {
                        cursor = dc;
                    }
                }
            }
        }

        if (!this.rowComposition) {
            this.rowComposition = document.createElement('span');
            Utils.addClass(this.rowComposition, 'jxterm-composition');
            if (cursor) {
                // 当前行
                this.currentRow.insertBefore(this.rowComposition, cursor);
            }
        }

        if (!!composing['update']) {
            this.hideCursor();
            this.rowComposition.innerHTML = composing['update'];
        } else if (!!composing['done']) {
            this.rowComposition.innerHTML = composing['end'];

            if (this.rowComposition) {

                // 当flush的时候，有可能当前行的innerHTML会被刷新
                // 这样rowComposition则会未连接状态。
                if (!!this.rowComposition.isConnected) {
                    this.currentRow.removeChild(this.rowComposition);
                }

                this.rowComposition = null;
            }

            this.showCursor();

            // 发送到SSH服务端
            this.enable();

            if (this.connected) {
                this.eventHandler.send(composing['end']);
            } else {
                this.print(composing['end']);
            }

        }

    }


    /**
     * 向容器插入行（插入粘贴板前面）
     * @param fragment
     */
    addRows(fragment) {
        // 容器内部布局
        // --div.jxterm(容器)
        //     --div.jxterm-output
        //       --div.jxterm-output-row
        //     --div.terminal-command
        //       --textarea.clipboard(粘贴板)
        this.outputEl.appendChild(fragment);
    }

    /**
     * 制作光标
     */
    createCursor() {
        this.cursor = this.createCursorElement();

        this.updateStyleWithCursor();

        this.currentRow.appendChild(this.cursor);
    }

    /**
     * 创建光标元素
     * @param filler 填充字符，默认空格(&nbsp;)
     * @returns {HTMLSpanElement}
     */
    createCursorElement(filler) {

        let _class = this.getCursorClass();
        let c = document.createElement('span');
        Utils.addClass(c, _class.cursor);

        c.innerHTML = filler || '&nbsp;';

        let co = document.createElement('span');
        Utils.addClass(co, _class.outline);
        c.appendChild(co);

        c.className = _class.cursor;

        return c;
    }

    /**
     * 获取光标的class
     * @returns {object}
     */
    getCursorClass() {

        let cursor = this.preferences.text.cursor
            , c = 'cursor'
            , co = 'outline';

        if (!this._showCursor) {
            c += ' cursor-hide';
        }


        if (this._cursor_focus) {
            c += ' cursor-focus';
        }

        if (cursor.shape === 'Block') {
            c += ' cursor-shape-block';
            if (cursor.blinking) c += ' cursor-blink';
        } else {
            if (cursor.shape === 'Underline' || cursor.shape === 'Wide Underline') c += ' cursor-shape-underline';
            else if (cursor.shape === 'I-Beam' || cursor.shape === 'Wide I-Beam') c += ' cursor-shape-vertical-bar';
            if (cursor.blinking) co += ' cursor-blink';
        }

        return {cursor: c, outline: co};
    }

    /**
     * 获取动态光标的ID
     */
    getDynamicCursorId() {
        return this.id + '-cursor-dynamic-1';
    }


    /**
     * 删除动态光标
     */
    removeDynamicCursor() {
        const dc = document.getElementById(this.getDynamicCursorId());
        if (dc) {
            const parentEle = dc.parentElement;
            parentEle.replaceChild(dc.firstChild, dc);
            parentEle.normalize();
        }
    }

    /**
     * 删除默认光标
     */
    removeCursor() {
        if (this.cursor && !this.cursorRemoved) {
            this.cursor.remove();
            this.cursorRemoved = true;
        }
    }


    /**
     * 包裹成光标并返回
     */
    createDynamicCursor(p) {

        // 删除动态光标
        this.removeDynamicCursor();

        let c = this.createCursorElement(p);
        c.id = this.getDynamicCursorId();

        return c.outerHTML;

    }


    /**
     * 光标获取焦点
     */
    focus() {

        if (!this._enable) {
            return;
        }

        this._cursor_focus = true;

        Utils.addClass(this.getCursor(), 'cursor-focus');

    }

    /**
     * 获取光标
     * @returns {HTMLSpanElement|HTMLElement}
     */
    getCursor() {

        let cursor = this.cursor;

        if (!!this.parser.hasDynamicCursor) {
            // 动态光标
            cursor = document.getElementById(this.getDynamicCursorId());
        }
        return cursor;
    }

    /**
     * 光标失去焦点
     */
    blur() {

        if (this['focusTarget'] === 'container') {
            return;
        }

        this._cursor_focus = false;
        Utils.removeClass(this.getCursor(), 'cursor-focus');

    }

    /**
     * 更新光标的位置
     */
    renderCursor() {

        if (!this._enable) {
            return;
        }

        // 删除动态光标
        this.removeDynamicCursor();

        // 添加光标到尾部
        this.currentRow.appendChild(this.cursor);

        if (!this._showCursor) {
            Utils.addClass(this.cursor, 'cursor-hide');
        }

        delete this.cursorRemoved;

        // 光标获取焦点
        // this.focus();

    }

    /**
     * 响铃处理
     */
    bell() {

        this.css(this.container, {
            backgroundColor: this.preferences.advanced.bell.visualBellColor
        });

        setTimeout(() => {
            this.css(this.container, {
                backgroundColor: this.bgColor
            });
        }, 200);

    }

    /**
     * 终端禁止输入
     */
    disable() {
        this._enable = false;
        this.hideCursor();
        this.clipboard.blur();
        this.blur();
    }

    enable() {
        this._enable = true;
        this.showCursor();
        this.clipboard.focus();

        this.focus();
    }

    /**
     * 隐藏光标
     */
    hideCursor() {
        this._showCursor = false;
        Utils.addClass(this.getCursor(), 'cursor-hide');

    }

    /**
     * 显示光标
     */
    showCursor() {
        this._showCursor = true;
        Utils.removeClass(this.getCursor(), 'cursor-hide');
    }

    /**
     * 光标停止闪烁
     */
    stopBlinkingCursor() {
        this.preferences.text.cursor.blinking = false;
        if(this.preferences.text.cursor.shape === 'Block'){
            Utils.removeClass(this.getCursor(), 'cursor-blink');
        } else {
            Utils.removeClass(this.getCursor().lastElementChild, 'cursor-blink');
        }
    }

    /**
     * 光标开始闪烁
     */
    startBlinkingCursor() {
        this.preferences.text.cursor.blinking = true;
        // 更新class，如果是不同的光标样式，在不用的元素添加cursor-blink类
        if(this.preferences.text.cursor.shape === 'Block'){
            Utils.addClass(this.getCursor(), 'cursor-blink');
        } else {
            Utils.addClass(this.getCursor().lastElementChild, 'cursor-blink');
        }

    }

    /**
     * 反转Video
     */
    reverseVideo() {
        Utils.addClass(this.container, 'inverse');
    }

    /**
     * 默认Video
     */
    normalVideo() {
        Utils.removeClass(this.container, 'inverse');
    }

    /**
     * 输入后滚动到最后
     */
    scrollToBottomOnInput() {
        if (this.preferences.advanced.input.scrollToBottomOnInput
            && (!!this.scrollToBottom || undefined === this.scrollToBottom)) {
            // 如果当前在底部，则一直停留在底部，否则不用相应的操作
            // console.info(this.container.scrollHeight, this.container.clientHeight, this.container.scrollTop);
            this.container.scrollTop = this.container.scrollHeight;
            this.scrollToBottom = true;
        }
    }

    /**
     * 关闭websocket
     */
    close() {
        if(this.transceiver)
            this.transceiver.webSocket.close();
    }

    /**
     * 注册重连功能
     */
    registerReconnect(){

        document.addEventListener('keydown', (e) => {
            if(e.key === 'Enter'){
                // 按了回车键
                if(this.transceiver)
                    this.transceiver.send({cmd: '\x0d' });
            }
            e.stopPropagation();
            e.preventDefault();
        });
    }




    /**
     * 设置背景
     * @param imagePath 图片
     * @param repeat 是否重复
     * @param size 尺寸, 针对no-repeat有效
     */
    setBackground(imagePath, repeat=false, size='100% 100%'){

        if(!!imagePath){
            this.container.style.backgroundImage = "url(" + imagePath + ")";

            // 图片重复
            if(repeat){
                this.container.style.backgroundRepeat = 'repeat';
                this.container.style.backgroundSize = 'auto';
            } else {
                this.container.style.backgroundRepeat = 'no-repeat';
                this.container.style.backgroundSize = size;
            }

        }

    }

    /**
     * 设置背景颜色
     * @param color 颜色
     */
    setBackgroundColor(color){
        this.container.style.backgroundColor = color;
    }

    /**
     * 设置光标的样式 ['Block', 'I-Beam', 'Wide I-Beam', 'Underline', 'Wide Underline']
     * @param shape
     */
    setCursorShape(shape){
        if(!!shape){
            this.preferences.text.cursor.shape = shape;
        }

        // 更新class
        let cursor = this.getCursor();
        if(cursor){
            let cursorClass = this.getCursorClass();
            console.info(cursorClass);
            cursor.className = cursorClass.cursor;
            cursor.lastElementChild.className = cursorClass.outline;
        }

        // 更新样式
        this.updateStyleWithCursor();
    }

    /**
     * 设置光标的颜色
     * @param color 前景色
     * @param bgColor 背景色
     */
    setCursorColor(color, bgColor){
        let array = this.preferences.colors.textAndBackgroundColor.cursorColor;
        if(!!color) array[0] = color;
        if(!!bgColor) array[1] = bgColor;

        this.updateStyleWithCursor();
    }

}