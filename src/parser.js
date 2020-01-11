// http://www.inwap.com/pdp10/ansicode.txt
// https://vt100.net/docs/vt102-ug/table5-13.html

// const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
// const [TAB_COMPLETION_LENGTH, TAB_COMPLETION_CHAR] = [8, '&nbsp;'];

// https://en.wikipedia.org/wiki/C0_and_C1_control_codes

// Control functions for a wide variety of applications are specified in ECMA-48.
// A standardized primary set and supplementary set are included (identified there as C0 and C1 sets).
// Sets of control functions are also registered in the ISO International Register of Coded Character Sets (see annex B).
// Each set is registered either as a primary (C0) set only, or as a supplementary (C1) set only.

// - C0     a member of the primary set of control functions
// - C1     a member of the supplementary set of control functions,
const C0 = {
    NUL: '\x00',	// 00  Caret:^@ Null
    SOH: '\x01',	// 01  Caret:^A Start of Heading
    STX: '\x02',	// 02  Caret:^B Start of Text
    ETX: '\x03',	// 03  Caret:^C End of Text
    EOT: '\x04',	// 04  Caret:^D End of Transmission
    ENQ: '\x05',	// 05  Caret:^E Enquiry
    ACK: '\x06',	// 06  Caret:^F Acknowledge
    BEL: '\x07',	// 07  Caret:^G Bell, Alert
    BS: '\x08',	    // 08  Caret:^H Backspace
    HT: '\x09',	    // 09  Caret:^I Character Tabulation, Horizontal Tabulation
    LF: '\x0a',	    // 10  Caret:^J Line Feed
    VT: '\x0b',	    // 11  Caret:^K Line Tabulation, Vertical Tabulation
    FF: '\x0c',	    // 12  Caret:^L Form Feed
    CR: '\x0d',	    // 13  Caret:^M Carriage Return
    SO: '\x0e',	    // 14  Caret:^N Shift Out
    SI: '\x0f',	    // 15  Caret:^O Shift In
    DLE: '\x10',	// 16  Caret:^P Data Link Escape
    DC1: '\x11',	// 17  Caret:^Q Device Control One (XON)
    DC2: '\x12',	// 18  Caret:^R Device Control Two
    DC3: '\x13',	// 19  Caret:^S Device Control Three (XOFF)
    DC4: '\x14',	// 20  Caret:^T Device Control Four
    NAK: '\x15',	// 21  Caret:^U Negative Acknowledge
    SYN: '\x16',	// 22  Caret:^V Synchronous Idle
    ETB: '\x17',	// 23  Caret:^W End of Transmission Block
    CAN: '\x18',	// 24  Caret:^X Cancel
    EM: '\x19', 	// 25  Caret:^Y End of medium
    SUB: '\x1a',	// 26  Caret:^Z Substitute
    ESC: '\x1b',	// 27  Caret:^[ Escape
    FS: '\x1c',	    // 28  Caret:^\ File Separator
    GS: '\x1d',	    // 29  Caret:^] Group Separator
    RS: '\x1e',	    // 30  Caret:^^ Record Separator
    US: '\x1f',	    // 31  Caret:^_	Unit Separator
    SP: '\x20',	    // 32			Space
    DEL: '\x7F'	    // 127 Caret:^?	Delete
};

const IND = '\x1bD'
    , NEL = '\x1bE'
    , HTS = '\x1bH'
    , RI  = '\x1bM'
    , SS2 = '\x1bN'
    , SS3 = '\x1bO'
    , DCS = '\x1bP'
    , SPA = '\x1bV'
    , EPA = '\x1bW'
    , SOS = '\x1bX'
    , DECID = '\x1bZ'
    , CSI = '\x1b['
    , ST  = '\x1b\\'
    , OSC = '\x1b]'
    , PM  = '\x1b^'
    , APC = '\x1b_';

// 8-bit
// 256-color lookup tables
// ref: https://en.wikipedia.org/wiki/ANSI_escape_code
// https://en.wikipedia.org/wiki/Line_wrap_and_word_wrap
let PALETTE = [
    /** Standard colors */
    "#000000", "#800000", "#008000", "#808000", "#000080", "#800080", "#008080", "#c0c0c0",
    /** High-intensity colors */
    "#808080", "#ff0000", "#00ff00", "#ffff00", "#0000ff", "#ff00ff", "#00ffff", "#ffffff",
    /** 216 colors  */
    "#000000", "#00005f", "#000087", "#0000af", "#0000d7", "#0000ff", "#005f00", "#005f5f",
    "#005f87", "#005faf", "#005fd7", "#005fff", "#008700", "#00875f", "#008787", "#0087af",
    "#0087d7", "#0087ff", "#00af00", "#00af5f", "#00af87", "#00afaf", "#00afd7", "#00afff",
    "#00d700", "#00d75f", "#00d787", "#00d7af", "#00d7d7", "#00d7ff", "#00ff00", "#00ff5f",
    "#00ff87", "#00ffaf", "#00ffd7", "#00ffff", "#5f0000", "#5f005f", "#5f0087", "#5f00af",
    "#5f00d7", "#5f00ff", "#5f5f00", "#5f5f5f", "#5f5f87", "#5f5faf", "#5f5fd7", "#5f5fff",
    "#5f8700", "#5f875f", "#5f8787", "#5f87af", "#5f87d7", "#5f87ff", "#5faf00", "#5faf5f",
    "#5faf87", "#5fafaf", "#5fafd7", "#5fafff", "#5fd700", "#5fd75f", "#5fd787", "#5fd7af",
    "#5fd7d7", "#5fd7ff", "#5fff00", "#5fff5f", "#5fff87", "#5fffaf", "#5fffd7", "#5fffff",
    "#870000", "#87005f", "#870087", "#8700af", "#8700d7", "#8700ff", "#875f00", "#875f5f",
    "#875f87", "#875faf", "#875fd7", "#875fff", "#878700", "#87875f", "#878787", "#8787af",
    "#8787d7", "#8787ff", "#87af00", "#87af5f", "#87af87", "#87afaf", "#87afd7", "#87afff",
    "#87d700", "#87d75f", "#87d787", "#87d7af", "#87d7d7", "#87d7ff", "#87ff00", "#87ff5f",
    "#87ff87", "#87ffaf", "#87ffd7", "#87ffff", "#af0000", "#af005f", "#af0087", "#af00af",
    "#af00d7", "#af00ff", "#af5f00", "#af5f5f", "#af5f87", "#af5faf", "#af5fd7", "#af5fff",
    "#af8700", "#af875f", "#af8787", "#af87af", "#af87d7", "#af87ff", "#afaf00", "#afaf5f",
    "#afaf87", "#afafaf", "#afafd7", "#afafff", "#afd700", "#afd75f", "#afd787", "#afd7af",
    "#afd7d7", "#afd7ff", "#afff00", "#afff5f", "#afff87", "#afffaf", "#afffd7", "#afffff",
    "#d70000", "#d7005f", "#d70087", "#d700af", "#d700d7", "#d700ff", "#d75f00", "#d75f5f",
    "#d75f87", "#d75faf", "#d75fd7", "#d75fff", "#d78700", "#d7875f", "#d78787", "#d787af",
    "#d787d7", "#d787ff", "#d7af00", "#d7af5f", "#d7af87", "#d7afaf", "#d7afd7", "#d7afff",
    "#d7d700", "#d7d75f", "#d7d787", "#d7d7af", "#d7d7d7", "#d7d7ff", "#d7ff00", "#d7ff5f",
    "#d7ff87", "#d7ffaf", "#d7ffd7", "#d7ffff", "#ff0000", "#ff005f", "#ff0087", "#ff00af",
    "#ff00d7", "#ff00ff", "#ff5f00", "#ff5f5f", "#ff5f87", "#ff5faf", "#ff5fd7", "#ff5fff",
    "#ff8700", "#ff875f", "#ff8787", "#ff87af", "#ff87d7", "#ff87ff", "#ffaf00", "#ffaf5f",
    "#ffaf87", "#ffafaf", "#ffafd7", "#ffafff", "#ffd700", "#ffd75f", "#ffd787", "#ffd7af",
    "#ffd7d7", "#ffd7ff", "#ffff00", "#ffff5f", "#ffff87", "#ffffaf", "#ffffd7", "#ffffff",
    /** Grayscale colors */
    "#080808", "#121212", "#1c1c1c", "#262626", "#303030", "#3a3a3a", "#444444", "#4e4e4e",
    "#585858", "#626262", "#6c6c6c", "#767676", "#808080", "#8a8a8a", "#949494", "#9e9e9e",
    "#a8a8a8", "#b2b2b2", "#bcbcbc", "#c6c6c6", "#d0d0d0", "#dadada", "#e4e4e4", "#eeeeee"
];

// 8-bit
// States.ESC[ 38;5;⟨n⟩ m Select foreground color
// States.ESC[ 48;5;⟨n⟩ m Select background color
//      0-  7:  standard colors (as in States.ESC [ 30–37 m)
//      8- 15:  high intensity colors (as in States.ESC [ 90–97 m)
//     16-231:  6 × 6 × 6 cube (216 colors): 16 + 36 × r + 6 × g + b (0 ≤ r, g, b ≤ 5)
//    232-255:  grayscale from black to white in 24 steps
//
// 24-bit
// States.ESC[ 38;2;⟨r⟩;⟨g⟩;⟨b⟩ m Select RGB foreground color
// States.ESC[ 48;2;⟨r⟩;⟨g⟩;⟨b⟩ m Select RGB background color

// (SGR parameters) https://en.wikipedia.org/wiki/ANSI_escape_code
// (8.3.117) http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-048.pdf
let SGR = {
    1: 'bold',      // 加粗
    2: 'faint',     // 强度降低
    3: 'italic',    // 斜体
    4: 'underlined', // 下划线
    5: 'slow-blink',      // Slow Blink, less than 150 per minute
    6: 'rapid-blink',      // MS-DOS ANSI.SYS; 150+ per minute; not widely supported
    7: 'inverse',    // 反转 reverse video, swap foreground and background colors
    8: 'invisible',    // 隐藏
    9: 'crossed-out',    // 删除线
    10: 'default-font-family',    // 默认字体
    // 10 primary (default) font
    // 11  first alternative font
    // 12 second alternative font
    // 13  third alternative font
    // 14 fourth alternative font
    // 15 fifth alternative font
    // 16 sixth alternative font
    // 17 seventh alternative font
    // 18 eighth alternative font
    // 19 ninth alternative font
    20: 'fraktur',      // https://en.wikipedia.org/wiki/Fraktur

    // foreground color
    30: 'black',
    31: 'red',
    32: 'green',
    33: 'yellow',
    34: 'blue',
    35: 'magenta',
    36: 'cyan',
    37: 'white',
    38: undefined,  // 自定义颜色
    // 39: 'default',
    // background color
    40: 'black',
    41: 'red',
    42: 'green',
    43: 'yellow',
    44: 'blue',
    45: 'magenta',
    46: 'cyan',
    47: 'white',
    48: undefined,  // 自定义颜色
    // 49: 'default',

    // bright foreground color, aixterm (not in standard)
    90: 'black',
    91: 'red',
    92: 'green',
    93: 'yellow',
    94: 'blue',
    95: 'magenta',
    96: 'cyan',
    97: 'white',

    // bright background color, aixterm (not in standard)
    100: 'black', // rxvt => default
    101: 'red',
    102: 'green',
    103: 'yellow',
    104: 'blue',
    105: 'magenta',
    106: 'cyan',
    107: 'white',
};


// States
// Parser.States
const States = {};
States.NORMAL = 0;
States.ESC = 1;
States.CSI = 2;
States.OSC = 3;
States.CHARSET = 4;
States.DCS = 5;
States.IGNORE = 6;
States.PM = 7;

/**
 * 终端解析器
 */
class Parser {

    constructor(terminal) {
        this.terminal = terminal;
        this.csiParser = new CSIParser(this, terminal);
        // this.cParser = new ControlsParser(this, terminal);

        this.x = 1; // 列
        this.y = 1; // 行
        this.seq = 1;   // 序列号，一直增加

        // 默认屏幕定位缓冲区
        this.screenBuffer = [];
        this.initCurrentRow();

        // index = 0, this.currentRow
        // 数据存储从index=1开始。
        // this.screenBuffer[0] = [this.currentRow, '&nbsp;'];
        this.screenBuffer[0] = [this.createMetaData(), this.createData('\n')];

        // 碎片
        this.fragment = document.createDocumentFragment();

        // 备用屏幕定位缓冲区
        this.screenBuffer2 = [];

        // 活跃的缓冲区（命令行缓冲区）
        this.activeBuffer = this.screenBuffer;

        // 是否含有动态光标
        this.hasDynamicCursor = false;

        // 滚动区域顶部
        this.scrollTop = 1;
        // 滚动区域底部
        this.scrollBottom = 1;

        // this.charset = null;
        this.gcharset = null;
        this.glevel = 0;
        this.charsets = [null];

        this.state = States.NORMAL;

        // 参数
        this.params = [];
        this.currentParam = 0;
        this.prefix = '';
        this.suffix = '';

        // 禁用切换到备用缓冲区/从备用缓冲区切换到默认缓冲区
        this.disableAlternateBuffer = false;

    }

    /**
     * 创建一个数据对象（screenBuffer）
     * @param data
     * @returns {{data: *, color: *, "bgColor:": *, class: *}}
     */
    createData(data) {
        let item = {};
        this.eraseData(item, data);
        return item;
    }

    /**
     * 抹除缓冲区单元格数据，用空格替换
     * @param bufferRowItem
     * @param data
     */
    eraseData(bufferRowItem, data) {

        // 当出现中文的时候，bufferRowItem会有可能是undefined的情况
        //
        if (bufferRowItem === undefined) {
            bufferRowItem = {
                data: data || ' '
            }
        } else {
            bufferRowItem['data'] = data || ' ';
        }

        if (!!this.csiParser.charAttrClass) {
            bufferRowItem['class'] = this.csiParser.charAttrClass;
        } else {
            if (bufferRowItem['class']) {
                delete bufferRowItem['class'];
            }
        }
        if (!!this.csiParser.color) {
            bufferRowItem['color'] = this.csiParser.color;
        } else {
            if (bufferRowItem['color']) {
                delete bufferRowItem['color'];
            }
        }
        if (!!this.csiParser.bgColor) {
            bufferRowItem['bgColor'] = this.csiParser.bgColor;
        } else {
            if (bufferRowItem['bgColor']) {
                delete bufferRowItem['bgColor'];
            }
        }

        // data.empty
        if(bufferRowItem['empty']){
            delete bufferRowItem['empty'];
        }

    }

    /**
     * 抹除缓冲区行数据，用空格替换
     * @param bufferRow
     * @param createIfNotExists
     */
    eraseLineData(bufferRow, createIfNotExists) {

        let len = this.terminal.columns
            , i = 1;
        for (; i <= len; i++) {
            if (!!bufferRow[i]) {
                this.eraseData(bufferRow[i]);
            } else {
                if (!!createIfNotExists){
                    bufferRow[i] = this.createData(' ');
                    bufferRow[i]['empty'] = true;
                }

            }
        }
    }

    /**
     * 将当前行的元素添加到screenBuffer的第一个元素中
     * @param el
     */
    createMetaData(el) {
        return {
            'element': el || this.currentRow
        };
    }


    /**
     * 初始化当前行
     */
    initCurrentRow() {
        this.currentRow = this.createRow();
        this.terminal.addRows(this.currentRow);
        this.terminal.currentRow = this.currentRow;
    }

    /**
     * 切换到备用缓冲区
     * 如果已经初始化，则需要将其清空
     */
    switch2ScreenBuffer2() {

        if (this.disableAlternateBuffer) {
            return;
        }

        this.screenBuffer2 = [];

        for (let y = 0; y < this.terminal.rows; y++) {

            this.screenBuffer2[y] = this.newBufferRow();
            this.fragment.appendChild(this.currentRow);

        }

        this.activeBuffer = this.screenBuffer2;
    }

    /**
     * 切换到默认缓冲区
     */
    switch2ScreenBuffer() {

        if (this.disableAlternateBuffer) {
            return;
        }

        let deleteRows = this.screenBuffer2.splice(0, this.screenBuffer2.length);
        this.removeElement(deleteRows);

        this.activeBuffer = this.screenBuffer;
    }

    /**
     * 设置当前行
     * @param cr
     */
    setCurrentRow(cr) {
        this.currentRow = cr;
        this.terminal.currentRow = cr;
    }

    /**
     * 获取缓冲区的当前操作行
     * item[pos]
     */
    getBufferRow() {
        return this.activeBuffer[this.y - 1];
    }

    /**
     * 判断是否是备用缓冲区
     * @returns {boolean}
     */
    isAlternate() {
        return this.activeBuffer === this.screenBuffer2;
    }

    /**
     * 正向索引
     * this.y += 1
     */
    index() {

        // 刷新当前行
        this.flush();

        if (++this.y > this.scrollBottom) {
            this.y = this.scrollBottom;
            this.scroll(1, true);
        } else {
            if (!this.activeBuffer[this.y]) {
                this.newLine(1, true);
            }
        }

        this.state = States.NORMAL;

    }

    /**
     * 反向索引
     * this.y -= 1
     */
    reverseIndex() {

        // 刷新当前行
        this.flush();

        if (--this.y < this.scrollTop) {
            this.y = this.scrollTop;
            // 如果是在顶行...
            this.scrollDown(1);
        }

        this.state = States.NORMAL;

    }

    /**
     * 向上滚动（可以查看下面的内容）
     * 原理：底部添加行，顶部删除行
     * @param n 滚动行数
     * @param initChars 是否需要填充空格(&nbsp;)
     */
    scrollUp(n, initChars) {
        this.scroll(n, initChars);
    }

    /**
     * 向下滚动（可以查看上面的内容）
     * 原理：顶部添加行，底部删除行
     * @param n 滚动行数
     */
    scrollDown(n) {

        let i = 0, len = n || 1;

        for (; i < len; i++) {

            // 缓冲区的第一行
            let topRow = this.activeBuffer[this.scrollTop - 1];

            // 先添加scrollTop行，后删除scrollBottom行
            this.insertBuffer(this.scrollTop - 1, this.newBufferRow(true));
            this.insertBeforeElement(topRow);


            if (this.activeBuffer.length >= this.scrollBottom) {
                this.removeElement(this.activeBuffer.splice(this.scrollBottom, 1));
            }

        }

    }

    /**
     * 向缓冲区插入行。
     * @param index
     * @param bufferRow
     */
    insertBuffer(index, bufferRow) {
        this.activeBuffer.splice(index, 0, bufferRow);
    }

    /**
     * 向某个元素前插入元素
     * @param existBufferRow 缓冲区的行
     * @param element
     */
    insertBeforeElement(existBufferRow, element) {
        this.terminal.outputEl.insertBefore(element || this.currentRow, existBufferRow[0]['element']);
    }

    /**
     * 删除行
     * @param deleteRows 从缓冲区中删除行，参数值为数组。[ [ { 'element': ... } ] ]
     */
    removeElement(deleteRows) {

        let len = deleteRows.length
            , i = 0
            , r = null;

        for (; i < len; i++) {

            r = deleteRows[i];

            // 数组中的第一个item是元素
            if (r[0] && r[0]['element']) {
                r[0]['element'].remove();
            }
        }
    }

    /**
     * 向缓冲区添加一行
     * @param isInitChars 填充空格
     * @returns {{element: *}[]}
     */
    newBufferRow(isInitChars) {
        this.seq++;
        this.setCurrentRow(this.createRow());
        let bufferRow = [this.createMetaData()];
        if (isInitChars) {
            for (let j = 1; j < this.terminal.columns; j++) {
                bufferRow[j] = this.createData(' ');
            }
        } else {
            bufferRow[1] = this.createData('\n');
        }
        return bufferRow;
    }

    /**
     * 新建行
     * @param isInitChars 是否填充空格(&nbsp;)
     */
    newLine(isInitChars) {

        let bufferRow = this.newBufferRow(isInitChars);

        if (this.scrollBottom >= this.terminal.rows) {
            // 全屏滚动
            this.fragment.appendChild(this.currentRow);
        } else {
            // 区域滚动
            this.insertBeforeElement(this.activeBuffer[this.scrollBottom]);
        }

        // 添加行
        this.insertBuffer(this.y, bufferRow);

    }

    /**
     * 插入一行，需要在滚动底部删除一行。
     */
    insertLine() {

        // 光标所在行
        let cursorRow = this.activeBuffer[this.y - 1];

        // 当前光标位置插入行
        this.insertBuffer(this.y - 1, this.newBufferRow(true));

        this.insertBeforeElement(cursorRow);

        // 删除滚动范围的最后一行
        this.removeElement(this.activeBuffer.splice(this.scrollBottom - 1, 1));

    }

    /**
     * 删除一行，需要在滚动底部填充一行。
     */
    deleteLine() {

        // 删除当前行
        this.removeElement(this.activeBuffer.splice(this.y - 1, 1));

        // 新建行
        let bufferRow = this.newBufferRow(true);

        // 在底部添加行
        if (this.scrollBottom === this.terminal.rows) {
            // 全屏滚动
            this.activeBuffer.push(bufferRow);
            this.fragment.appendChild(this.currentRow);
        } else {
            // 区域滚动
            this.insertBuffer(this.scrollBottom - 1, bufferRow);
            this.insertBeforeElement(this.activeBuffer[this.scrollBottom]);
        }

    }

    /**
     * 屏幕滚动
     * @param n
     * @param initChars
     */
    scroll(n, initChars) {

        let i = 0, len = n || 1;

        for (; i < len; i++) {

            this.newLine(initChars);

            let deleteRow = this.activeBuffer.splice(this.scrollTop - 1, 1);

            if (this.activeBuffer === this.screenBuffer2  // alternate buffer
                || this.terminal.applicationKeypad       // application keypad
                || this.csiParser.applicationCursor) {    // application cursor
                this.removeElement(deleteRow);
            }

        }

    }

    /**
     * 硬换行
     * 行数达到50行，刷新一次输出
     */
    lineFeed() {
        // 滚筒上卷一行
        // 刷新当前行
        this.flush();

        if (this.y >= this.scrollBottom) {
            // 缓冲区向下滚动一行
            // 原理：删除第一行，尾部添加一行
            this.scroll(1, this.isAlternate());

        } else {
            // 行不存在。
            if (!this.activeBuffer[this.y]) {
                this.newLine();
            }
            this.y++;
        }

        // 达到一定的数量(this.terminal.rows)
        // 持久化
        if (this.fragment.childNodes.length > this.terminal.rows) {
            this.persistence();
        }

    }


    /**
     * 解析文本
     * @param text
     */
    parse(text) {

        let left_char = ''
            , chr = ''
            , len = text.length;

        for (let i = 0; i < len; i++) {

            chr = text[i];

            // See:
            // Constants.js
            // States.NORMAL = 0
            //     , States.ESCAPED = 1
            //     , States.CSI = 2
            //     , States.OSC = 3
            //     , States.CHARSET = 4
            //     , States.DCS = 5
            //     , States.IGNORE = 6;
            switch (this.state) {
                case States.NORMAL:
                    // https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h3-Single-character-functions
                    switch (chr) {

                        case C0.BEL:
                            // Bell
                            this.terminal.bell();
                            break;
                        case C0.BS:
                            // Backspace
                            // 回退
                            this.x -= 1;
                            break;
                        case C0.ENQ:
                            // Return Terminal Status (ENQ  is Ctrl-E).
                            break;
                        case C0.FF:
                            // \f
                            // Form Feed
                            this.lineFeed();
                            break;
                        case C0.LF:
                            // \n
                            // 换行
                            this.lineFeed();
                            break;
                        case C0.SI:
                            // https://en.wikipedia.org/wiki/ISO/IEC_2022
                            // Shift In
                            // G0
                            break;
                        case C0.SO:
                            // Shift Out
                            // G1
                            break;
                        // case C0.SP:
                        //     // Space
                        //     this.update(chr);
                        //     break;
                        // case C0.HT:
                        //     // Horizontal Tab
                        //     // https://en.wikipedia.org/wiki/Tab_key#Tab_characters
                        //     // 制表符
                        //     // \t是补全当前字符串长度到8的整数倍,最少1个最多8个空格
                        //     this.charTabulation();
                        //     break;
                        case C0.VT:
                            // \v
                            // Vertical Tab
                            this.lineFeed();
                            break;
                        case C0.CR:
                            // 将"字车"归位(回车)
                            this.x = 1;
                            break;
                        case C0.ESC:
                            // 特殊字符
                            this.state = States.ESC;
                            break;
                        default:

                            if (!this.handleDoubleChars(chr)) {
                                this.update(chr);
                            }
                    }

                    break;
                case States.ESC:
                    // https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h2-Control-Bytes_-Characters_-and-Sequences
                    switch (chr) {

                        case 'D':
                            // index
                            this.index();
                            break;
                        case 'E':
                            // next line
                            this.x = 1;
                            this.index();
                            break;
                        case 'H':
                            // tab set
                            break;
                        case 'M':
                            // Reverse Index
                            this.reverseIndex();
                            break;
                        case 'N':
                            break;
                        case 'O':
                            break;
                        case 'P':
                            // Device Control String
                            break;
                        case 'V':
                            // Start of Guarded Area
                            break;
                        case 'W':
                            // End of Guarded Area
                            break;
                        case 'X':
                            // Start of String
                            break;
                        case 'Z':
                            // Return Terminal ID
                            break;
                        case '[':
                            // Control Sequence Introducer
                            this.state = States.CSI;
                            this.params = [];
                            this.currentParam = 0;
                            break;
                        case '\\':
                            // String Terminator
                            break;
                        case ']':
                            // Operating System Command
                            this.params = [];
                            this.currentParam = 0;
                            this.state = States.OSC;
                            break;
                        case '^':
                            // Privacy Message
                            this.params = [];
                            this.currentParam = '';
                            this.state = States.PM;
                            break;
                        case '_':
                            // Application Program Command
                            this.state = States.IGNORE;
                            break;

                        // https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h3-Controls-beginning-with-States.ESC
                        case C0.SP:
                            // States.ESC SP F  7-bit controls (S7C1T), VT220.  This tells the terminal to
                            //           send C1 control characters as 7-bit sequences, e.g., its
                            //           responses to queries.  DEC VT200 and up always accept 8-bit
                            //           control sequences except when configured for VT100 mode.
                            // States.ESC SP G  8-bit controls (S8C1T), VT220.  This tells the terminal to
                            //           send C1 control characters as 8-bit sequences, e.g., its
                            //           responses to queries.  DEC VT200 and up always accept 8-bit
                            //           control sequences except when configured for VT100 mode.
                            // States.ESC SP L  Set ANSI conformance level 1, ECMA-43.
                            // States.ESC SP M  Set ANSI conformance level 2, ECMA-43.
                            // States.ESC SP N  Set ANSI conformance level 3, ECMA-43.
                            this.state = States.NORMAL;
                            i++;
                            break;
                        case '#':
                            // States.ESC # 3   DEC double-height line, top half (DECDHL), VT100.
                            // States.ESC # 4   DEC double-height line, bottom half (DECDHL), VT100.
                            // States.ESC # 5   DEC single-width line (DECSWL), VT100.
                            // States.ESC # 6   DEC double-width line (DECDWL), VT100.
                            // States.ESC # 8   DEC Screen Alignment Test (DECALN), VT100.
                            this.state = States.NORMAL;
                            i++;
                            break;
                        case '%':
                            // States.ESC % @   Select default character set.  That is ISO 8859-1 (ISO 2022).
                            // States.ESC % G   Select UTF-8 character set, ISO 2022.
                            this.setGLevel(0);
                            this.setGCharset(0, this.terminal.charsets.US);
                            this.state = States.NORMAL;
                            // JS默认字符集UTF-8
                            i++;
                            break;
                        case '(':
                            this.gcharset = 0;
                            this.state = States.CHARSET;
                            break;
                        case ')':
                            this.gcharset = 1;
                            this.state = States.CHARSET;
                            break;
                        case '*':
                            this.gcharset = 2;
                            this.state = States.CHARSET;
                            break;
                        case '+':
                            this.gcharset = 3;
                            this.state = States.CHARSET;
                            break;
                        case '-':
                            this.gcharset = 1;
                            this.state = States.CHARSET;
                            break;
                        case '.':
                            this.gcharset = 2;
                            this.state = States.CHARSET;
                            break;
                        case '/':
                            this.gcharset = 3;
                            this.state = States.CHARSET;
                            break;

                        case '6':
                            // Back Index (DECBI), VT420 and up.
                            // backIndex();
                            this.state = States.NORMAL;
                            break;
                        case '7':
                            // Save Cursor (DECSC), VT100.
                            this.saveCursor();
                            this.state = States.NORMAL;
                            break;
                        case '8':
                            // Restore Cursor (DECRC)
                            this.restoreCursor();
                            this.state = States.NORMAL;
                            break;
                        case '9':
                            // Forward Index (DECFI), VT420 and up.
                            // forwardIndex();
                            break;
                        case '=':
                            this.terminal.applicationKeypad = true;
                            // vt100
                            // 应用键盘。这种模式可以看到滚动区域。
                            break;
                        case '>':
                            this.terminal.applicationKeypad = false;
                            break;
                        case 'F':
                            // Cursor to lower left corner of screen
                            break;
                        case 'c':
                            // Full Reset
                            this.reset();
                            break;
                        case 'l':
                        case 'm':
                            break;
                        case 'n':
                            // Invoke the G2 Character Set as GL (LS2) as GL.
                            this.setGLevel(2);
                            break;
                        case 'o':
                            // Invoke the G3 Character Set as GL (LS3) as GL.
                            this.setGLevel(3);
                            break;
                        case '|':
                            // Invoke the G3 Character Set as GR (LS3R).
                            this.setGLevel(3);
                            break;
                        case '}':
                            // Invoke the G2 Character Set as GR (LS2R).
                            this.setGLevel(2);
                            break;
                        case '~':
                            // Invoke the G1 Character Set as GR (LS1R), VT100.
                            this.setGLevel(1);
                            break;
                    }

                    break;
                case States.CSI:

                    if (this.params.length === 0) {
                        if (chr === ' '
                            || chr === '?'
                            || chr === '>'
                            || chr === '='
                            || chr === '!'
                            || chr === '#') {

                            this.prefix = chr;
                            break;
                        }

                    } else {
                        if (chr === '@'
                            || chr === '`'
                            || chr === '$'
                            || chr === '\''
                            || chr === '*'
                            || chr === '#') {

                            this.suffix = chr;
                            break;
                        }
                    }

                    // 设置
                    if (chr >= '0' && chr <= '9') {
                        this.currentParam = this.currentParam * 10 + chr.charCodeAt(0) - 48;
                        break;
                    }

                    this.params.push(this.currentParam);
                    this.currentParam = 0;

                    if (chr === ';') break;

                    switch (chr) {

                        case '@':
                            this.csiParser.insertChars(this.params, this.prefix);
                            break;
                        case 'A':
                            this.csiParser.cursorUp(this.params);
                            break;
                        case 'B':
                            this.csiParser.cursorDown(this.params);
                            break;
                        case 'C':
                            this.csiParser.cursorForward(this.params);
                            break;
                        case 'D':
                            this.csiParser.cursorBackward(this.params);
                            break;
                        case 'E':
                            this.csiParser.cursorNextLine(this.params);
                            break;
                        case 'F':
                            this.csiParser.cursorPrecedingLine(this.params);
                            break;
                        case 'G':
                            this.csiParser.cursorPosition(undefined, this.params[0] || 1);
                            break;
                        case 'H':
                            this.csiParser.cursorPosition(this.params[0] || 1, this.params[1] || 1);
                            break;
                        case 'I':
                            this.csiParser.cursorForwardTabulation(this.params);
                            break;
                        case 'J':
                            this.csiParser.eraseInDisplay(this.params, this.prefix === '?');
                            break;
                        case 'K':
                            this.csiParser.eraseInLine(this.params, this.prefix === '?');
                            break;
                        case 'L':
                            this.csiParser.insertLines(this.params);
                            break;
                        case 'M':
                            this.csiParser.deleteLines(this.params);
                            break;
                        case 'P':
                            this.csiParser.deleteChars(this.params);
                            break;
                        case 'S':
                            if (this.prefix === '?') {
                                this.csiParser.setOrRequestGraphicsAttr(this.params);
                            } else {
                                this.csiParser.scrollUpLines(this.params);
                            }
                            break;
                        case 'T':
                            if (this.prefix === '>') {
                                this.csiParser.resetTitleModeFeatures(this.params);
                            } else if (this.params.length > 1) {
                                this.csiParser.initiateHighlightMouseTacking(this.params);
                            } else {
                                this.csiParser.scrollDownLines(this.params);
                            }
                            break;
                        case 'X':
                            this.csiParser.eraseChars(this.params);
                            break;
                        case 'Z':
                            this.csiParser.cursorBackwardTabulation(this.params);
                            break;
                        case '^':
                            this.csiParser.scrollDownLines(this.params);
                            break;
                        case '`':
                            this.csiParser.cursorPosition(undefined, this.params[0] || 1);
                            break;
                        case 'a':
                            this.csiParser.cursorPosition(undefined, this.x + (this.params[0] || 1));
                            break;
                        case 'b':
                            this.csiParser.repeatPrecedingGraphicChars(this.params);
                            break;
                        case 'c':
                            if (this.prefix === '=') {
                                this.csiParser.sendTertiaryDeviceAttrs(this.params);
                            } else if (this.prefix === '>') {
                                this.csiParser.sendSecondaryDeviceAttrs(this.params);
                            } else {
                                this.csiParser.sendPrimaryDeviceAttrs(this.params);
                            }
                            break;
                        case 'd':
                            this.csiParser.cursorPosition(this.params[0] || 1);
                            break;
                        case 'e':
                            this.csiParser.cursorPosition(this.y + (this.params[0] || 1));
                            break;
                        case 'f':
                            this.csiParser.cursorPosition(this.params[0] || 1, this.params[1] || 1);
                            break;
                        case 'g':
                            this.csiParser.tabClear(this.params);
                            break;
                        case 'h':
                            this.csiParser.setMode(this.params, this.prefix === '?');
                            break;
                        case 'i':
                            this.csiParser.mediaCopy(this.params, this.prefix === '?');
                            break;
                        case 'l':
                            this.csiParser.resetMode(this.params, this.prefix === '?');
                            break;
                        case 'm':
                            if (this.prefix === '>') {
                                this.csiParser.updateKeyModifierOptions(this.params);
                            } else {
                                this.csiParser.charAttrs(this.params);
                            }
                            break;
                        case 'n':
                            if (this.prefix === '>') {
                                this.csiParser.disableKeyModifierOptions(this.params);
                                break;
                            }
                            this.csiParser.deviceStatusReport(this.params, this.prefix === '?');
                            break;
                        case 'p':
                            if (this.prefix === '>') {
                                this.csiParser.setPointerMode(this.params);
                            } else if (this.prefix === '!') {
                                this.csiParser.resetSoftTerminal();
                            } else if (this.suffix === '"') {
                                this.csiParser.setConformanceLevel(this.params);
                            } else if (this.suffix === '$') {
                                this.csiParser.requestANSIMode(this.params, this.prefix === '?');
                            } else if (this.prefix === '#') {
                                this.csiParser.pushVideoAttrsOntoStack(this.params);
                            } else if (this.suffix === '#') {
                                this.csiParser.pushVideoAttrsOntoStack(this.params);
                            }
                            break;
                        case 'q':
                            if (this.prefix === '#') {
                                this.csiParser.popVideoAttrsFromStack();
                            } else if (this.suffix === '"') {
                                this.csiParser.selectCharProtectionAttr(this.params);
                            } else if (this.suffix === ' ') {
                                this.csiParser.setCursorStyle(this.params);
                            } else {
                                this.csiParser.loadLEDs(this.params);
                            }
                            break;
                        case 'r':
                            if (this.prefix === '?') {
                                this.csiParser.restoreDECPrivateMode(this.params);
                            } else if (this.suffix === '$') {
                                this.csiParser.changeAttrsInRectangularArea(this.params);
                            } else {
                                this.csiParser.setScrollingRegion(this.params);
                            }
                            break;
                        case 's':
                            if (this.prefix === '?') {
                                this.csiParser.saveDECPrivateMode(this.params);
                            } else if (this.suffix === 0) {
                                this.saveCursor();
                            } else {
                                this.csiParser.setMargins(this.params);
                            }
                            break;
                        case 't':
                            if (this.prefix === '>') {
                                this.csiParser.setTitleModeFeatures(this.params);
                            } else if (this.suffix === ' ') {
                                this.csiParser.setWarningBellVolume(this.params);
                            } else if (this.suffix === '$') {
                                this.csiParser.reverseAttrsInRectArea(this.params);
                            } else {
                                this.csiParser.windowManipulation(this.params);
                            }
                            break;
                        case 'u':
                            if (this.suffix === ' ') {
                                this.csiParser.setWarningBellVolume(this.params);
                            } else {
                                this.restoreCursor();
                            }
                            break;
                        case 'v':
                            if (this.suffix === '$') {
                                this.csiParser.copyRectangularArea(this.params);
                            }
                            break;
                        case 'w':
                            if (this.suffix === '$') {
                                this.csiParser.requestPresentationStateReport(this.params);
                            } else if (this.suffix === '\'') {
                                this.csiParser.enableFilterRectangle(this.params);
                            }
                            break;
                        case 'x':
                            if (this.suffix === '*') {
                                this.csiParser.selectAttrChangeExtent(this.params);
                            } else if (this.suffix === '$') {
                                this.csiParser.fillRectArea(this.params);
                            }
                            break;
                        case 'y':
                            if (this.suffix === '#') {
                                this.csiParser.selectChecksumExtension(this.params);
                            } else if (this.suffix === '*') {
                                this.csiParser.requestRectAreaChecksum(this.params);
                            }
                            break;
                        case 'z':
                            if (this.suffix === '\'') {
                                this.csiParser.enableLocatorReporting(this.params);
                            } else if (this.params === '$') {
                                this.csiParser.eraseRectArea(this.params);
                            }
                            break;
                        case '{':
                            if (this.suffix === '\'') {
                                this.csiParser.selectLocatorEvents(this.params);
                            } else if (this.prefix === '#') {
                                this.csiParser.pushVideoAttrsOntoStack(this.params);
                            } else if (this.suffix === '#') {
                                this.csiParser.pushVideoAttrsOntoStack(this.params);
                            } else if (this.suffix === '$') {
                                this.csiParser.selectEraseRectArea(this.params);
                            }
                            break;
                        case '|':
                            if (this.suffix === '#') {
                                this.csiParser.reportSelectedGraphicRendition(this.params);
                            } else if (this.suffix === '$') {
                                this.csiParser.selectColumnsPerPage(this.params);
                            } else if (this.suffix === '\'') {
                                this.csiParser.requestLocatorPosition(this.params);
                            } else if (this.suffix === '*') {
                                this.csiParser.selectNumberOfLinesPerScreen(this.params);
                            }
                            break;
                        case '}':
                            if (this.prefix === '#') {
                                this.csiParser.popVideoAttrsFromStack();
                            } else if (this.suffix === '\'') {
                                this.csiParser.insertChars(this.params);
                            }
                            break;
                        case '~':
                            if (this.suffix === '\'') {
                            }
                            this.csiParser.deleteChars(this.params);
                            break;

                    }

                    this.params = [];
                    this.prefix = '';
                    this.suffix = '';

                    this.state = States.NORMAL;

                    break;
                case States.OSC:
                    // States.OSC Ps ; Pt ST    ST ==> States.ESC \ String Terminator (ST  is 0x9c).
                    // States.OSC Ps ; Pt BEL
                    //   Set Text Parameters.
                    // 上一个字符
                    left_char = text[i - 1];
                    if ((left_char === C0.ESC && chr === '\\') || chr === C0.BEL) {
                        // 结束符
                        if (left_char === C0.ESC) {
                            if (typeof this.currentParam === 'string') {
                                this.currentParam = this.currentParam.slice(0, -1);
                            } else if (typeof this.currentParam == 'number') {
                                this.currentParam = (this.currentParam - ('\x1b'.charCodeAt(0) - 48)) / 10;
                            }
                        }

                        this.params.push(this.currentParam);

                        switch (this.params[0]) {
                            // Ps = 0  ⇒  Change Icon Name and Window Title to Pt.
                            // Ps = 1  ⇒  Change Icon Name to Pt.
                            // Ps = 2  ⇒  Change Window Title to Pt.
                            // Ps = 3  ⇒  Set X property on top-level window
                            case 0:
                                this.terminal.onUpdateTitle(this.params[1]);
                                break;
                            case 1:
                                break;
                            case 2:
                                this.terminal.onUpdateTitle(this.params[1]);
                                break;
                            case 3:
                                break;
                            case 4:
                            case 5:
                            case 6:

                            // Ps = 1 0  ⇒  Change VT100 text foreground color to Pt.
                            // Ps = 1 1  ⇒  Change VT100 text background color to Pt.
                            // Ps = 1 2  ⇒  Change text cursor color to Pt.
                            // Ps = 1 3  ⇒  Change mouse foreground color to Pt.
                            // Ps = 1 4  ⇒  Change mouse background color to Pt.
                            // Ps = 1 5  ⇒  Change Tektronix foreground color to Pt.
                            // Ps = 1 6  ⇒  Change Tektronix background color to Pt.
                            // Ps = 1 7  ⇒  Change highlight background color to Pt.
                            // Ps = 1 8  ⇒  Change Tektronix cursor color to Pt.
                            // Ps = 1 9  ⇒  Change highlight foreground color to Pt.
                            case 10:
                            case 11:
                            case 12:
                            case 13:
                            case 14:
                            case 15:
                            case 16:
                            case 17:
                            case 18:
                            case 19:
                                break;

                            case 46:
                                // Change Log File to Pt.
                                break;
                            case 50:
                                // Set Font to Pt
                                break;
                            case 51:
                            // reserved for Emacs shell.
                            case 52:
                            // Manipulate Selection Data
                            case 104:
                                // Ps = 1 0 4 ; c ⇒  Reset Color Number c.
                                break;
                            case 105:
                            // Ps = 1 0 5 ; c ⇒  Reset Special Color Number c
                            case 106:
                            // Ps = 1 0 6 ; c ; f ⇒  Enable/disable Special Color Number c.

                            // Ps = 1 1 0  ⇒  Reset VT100 text foreground color.
                            // Ps = 1 1 1  ⇒  Reset VT100 text background color.
                            // Ps = 1 1 2  ⇒  Reset text cursor color.
                            // Ps = 1 1 3  ⇒  Reset mouse foreground color.
                            // Ps = 1 1 4  ⇒  Reset mouse background color.
                            // Ps = 1 1 5  ⇒  Reset Tektronix foreground color.
                            // Ps = 1 1 6  ⇒  Reset Tektronix background color.
                            // Ps = 1 1 7  ⇒  Reset highlight color.
                            // Ps = 1 1 8  ⇒  Reset Tektronix cursor color.
                            // Ps = 1 1 9  ⇒  Reset highlight foreground color.
                            case 110:
                            case 111:
                            case 112:
                            case 113:
                            case 114:
                            case 115:
                            case 116:
                            case 117:
                            case 118:
                            case 119:
                                break;

                            // Ps = I  ; c ⇒  Set icon to file.
                            // Ps = l  ; c ⇒  Set window title.
                            // Ps = L  ; c ⇒  Set icon label.
                            case 'I':
                                break;
                            case 'l':
                                break;
                            case 'L':
                                break;
                        }

                        this.params = [];
                        this.currentParam = 0;
                        this.state = States.NORMAL;

                    } else {

                        if (!this.params.length) {
                            if (chr >= '0' && chr <= '9') {
                                this.currentParam =
                                    this.currentParam * 10 + chr.charCodeAt(0) - 48;
                            } else if (chr === ';') {
                                this.params.push(this.currentParam);
                                // 后面是字符串
                                this.currentParam = '';
                            } else {
                                if (this.currentParam === 0) {
                                    this.currentParam = '';
                                }
                                this.currentParam += chr;
                            }
                        } else {
                            // pt
                            this.currentParam += chr;
                        }
                    }

                    break;
                case States.CHARSET:

                    let cs;
                    switch (chr) {
                        case '0':
                            // DEC Special Character and Line Drawing Set, VT100.
                            cs = this.terminal.charsets.SCLD;
                            break;
                        case 'A':
                            // United Kingdom (UK), VT100.
                            cs = this.terminal.charsets.UK;
                            break;
                        case 'B':
                            // United States (USASCII), VT100.
                            cs = this.terminal.charsets.US;
                            break;
                        case '5':
                        case 'C':
                            // Finnish
                            cs = this.terminal.charsets.Finnish;
                            break;
                        case '7':
                        case 'H':
                            cs = this.terminal.charsets.Swedish;
                            break;
                        case 'K':
                            cs = this.terminal.charsets.German;
                            break;
                        case '9':
                        case 'Q':
                            cs = this.terminal.charsets.FrenchCanadian;
                            break;
                        case 'f':
                        case 'R':
                            cs = this.terminal.charsets.French;
                            break;
                        case 'Y':
                            cs = this.terminal.charsets.Italian;
                            break;
                        case 'Z':
                            cs = this.terminal.charsets.Spanish;
                            break;
                        case '4':
                            cs = this.terminal.charsets.Dutch;
                            break;
                        case '"':
                            // " >  ⇒  Greek, VT500.
                            // " 4  ⇒  DEC Hebrew, VT500.
                            // " ?  ⇒  DEC Greek, VT500.
                            i++;
                            break;
                        case '%':
                            // % 2  ⇒  Turkish, VT500.
                            // % 6  ⇒  Portuguese, VT300.
                            // % =  ⇒  Hebrew, VT500.
                            // % 0  ⇒  DEC Turkish, VT500.
                            // % 5  ⇒  DEC Supplemental Graphics, VT300.
                            // % 3  ⇒  SCS NRCS, VT500.
                            i++;
                            break;
                        case '=':
                            cs = this.terminal.charsets.Swiss;
                            break;
                        case '`':
                        case 'E':
                        case '6':
                            cs = this.terminal.charsets.NorwegianDanish;
                            break;
                        case '<':
                            // DEC Supplemental, VT200.
                            break;
                        case '>':
                            // DEC Technical, VT300.
                            break;
                        case '&':
                            // & 4  ⇒  DEC Cyrillic, VT500.
                            // & 5  ⇒  DEC Russian, VT500.
                            i++;
                            break;
                        default:
                            cs = this.terminal.charsets.US;
                            break;
                    }

                    this.setGCharset(this.gcharset, cs);
                    this.gcharset = null;
                    this.state = States.NORMAL;

                    break;
                case States.DCS:
                    // States.DCS Ps ; Ps | Pt ST
                    // States.DCS $ q Pt ST
                    // States.DCS Ps $ t Pt ST
                    // States.DCS + Q Pt ST
                    // States.DCS + p Pt ST
                    // States.DCS + q Pt ST
                    console.info('States.DCS.....');
                    left_char = text[i - 1];
                    if ((left_char === C0.ESC && chr === '\\') || chr === C0.BEL) {
                        this.state = States.NORMAL;
                    }
                    break;
                case States.IGNORE:
                    // APC Pt ST None.
                    left_char = text[i - 1];
                    if (left_char === C0.ESC && chr === '\\') {
                        this.state = States.NORMAL;
                    }
                    break;
                case States.PM:
                    // States.PM pt ST: 自定义消息
                    left_char = text[i - 1];
                    if ((left_char === C0.ESC && chr === '\\') || chr === C0.BEL) {
                        if (left_char === C0.ESC) {
                            this.currentParam = this.currentParam.slice(0, -1);
                        }

                        this.params.push(this.currentParam);

                        switch (this.params[0]) {
                            case 'exit':
                            case 'close':
                                console.info('终端已断开。。。。');
                                this.terminal.registerReconnect();
                                this.terminal.disable();
                                this.terminal.transceiver.sshConnected = false;
                                this.terminal.transceiver.removeHeartbeat();
                                this.terminal.onClosed('ssh');

                                break;
                        }

                    } else {
                        this.currentParam += chr;
                        break;
                    }

                    this.params = [];
                    this.currentParam = 0;
                    this.state = States.NORMAL;

                    break;
            }

        }

        // 刷新
        this.flush(true);
        // 持久化
        this.persistence();

        // 是否含有动态光标，如果不含有的话，则添加光标到尾部。
        // !!! 如果是应用键盘的话，不应该在最后添加光标。
        if (!this.hasDynamicCursor && !this.terminal.applicationKeypad) {
            this.terminal.renderCursor();
        }

        // 判断当前是否在底部
        this.terminal.scrollToBottomOnInput();

        // 回调光标的位置
        this.terminal.onCursorPosition({
            x: this.x,
            y: this.y
        });

    }

    /**
     * 持久化新建行
     */
    persistence() {
        this.terminal.addRows(this.fragment);
        this.fragment.innerHTML = '';
    }


    /**
     * 更新buffer内容
     * @param chr
     */
    update(chr) {

        // 超过字数自动换行
        if (this.x > this.terminal.columns) {
            this.lineFeed();
            // 光标重置
            this.x = 1;
        }

        // 如果有设置样式
        let bufferRow = this.getBufferRow();
        if(this.isInsertMode()){
            // 插入模式
            // 在当前光标位置插入数据
            bufferRow.splice(this.x, 0, this.createData(chr));

            // 如果插入后的长度超出了当前行的字符数
            if(bufferRow.length > this.terminal.columns){
                // 删除最后插入的标识为empty的元素
                // { data: " ", empty: true }
                if(bufferRow[bufferRow.length - 1]['empty']){
                    bufferRow.splice(bufferRow.length - 1, 1);
                }
            }
        } else {
            // 替换模式
            bufferRow[this.x] = this.createData(chr);
            this.x += 1;
        }

    }


    /**
     * 刷新内容
     * @param withDynamicCursor 是否打印动态光标
     */
    flush(withDynamicCursor) {

        this.hasDynamicCursor = false;

        // 获取数据
        let value = ''
            , data = ''
            , chr = ''
            , row = this.activeBuffer[this.y - 1]
            , len = row.length
            , i = 1
            , prev = null    // 上一个字符的信息，用于合并元素
            , el = null
            , str = '';

        /**
         * 结束合并样式
         */
        function stopMerge() {
            if (!el) return;

            el.innerHTML = str;
            value += el['outerHTML'];
            el = null;
            str = '';
        }

        for (; i < len; i++) {

            data = row[i];
            if (!data) continue;

            chr = data.data;

            // if(len === 2){
            //     // 长度为2，有可能是空行。第二个字符是\n
            //     if(chr === '\n'){
            //         value = '<span style="width: 1px;">' + chr + '</span>';
            //         break;
            //     }
            // }

            switch (chr) {
                case ' ':
                    chr = '&nbsp;';
                    break;
                case '>':
                    chr = '&gt;';
                    break;
                case '<':
                    chr = '&lt;';
                    break;
                case '\t':
                    data['class'] = 'tab';
                    break;
                // case '\n':
                //
                //     break;
            }

            if (!!withDynamicCursor && this.x === i) {

                if (!this.hasDynamicCursor) {
                    this.terminal.removeCursor();
                    this.hasDynamicCursor = true;
                }

                chr = this.terminal.createDynamicCursor(chr);

            }

            // 1，当前字符有样式
            // 2，当前字符样式和上一个字符样式不一样。
            // 3，当前字符样式含有len2
            // 4，当前字符不存在样式。

            if (!!data.color || !!data.bgColor || !!data.class) {

                if (!!prev
                    && prev['color'] === data.color
                    && prev['bgColor'] === data.bgColor
                    && prev['class'] === data.class) {
                    // 上一个字符和当前字符样式相等。
                    if (!!data.class && data.class.indexOf('len2') !== -1) {
                        // 结束上一个字符，如果含有样式
                        stopMerge();

                        el = this.startMerge(data);
                        el.innerHTML = chr;
                        value += el['outerHTML'];
                        el = null;
                    } else {
                        str += chr;
                    }

                } else {
                    // 上一个字符和当前字符样式不相等。
                    // 结束上一个字符，如果含有样式
                    stopMerge();

                    el = this.startMerge(data);
                    if (!!data.class && data.class.indexOf('len2') !== -1) {
                        // 结束上一个字符，如果含有样式
                        el.innerHTML = chr;
                        value += el['outerHTML'];
                        el = null;
                    } else {
                        str += chr;
                    }

                }

            } else {
                // 结束上一个字符，如果含有样式
                stopMerge();

                // 当前字符没有样式
                value += chr;
            }

            prev = data;

        }

        if (!!str) {
            stopMerge();
        }

        row[0]['element'].innerHTML = value;

    }

    /**
     * 开始合并样式
     * @param data
     * @returns {HTMLSpanElement}
     */
    startMerge(data) {
        let el = document.createElement('span');
        if (!!data.color) {
            el.style.color = data.color;
        }
        if (!!data.bgColor) {
            el.style.backgroundColor = data.bgColor;
        }
        if (!!data.class) {
            el.className = data.class;
        }

        return el;
    }

    /**
     * 获取行的ID
     * @returns {string}
     */
    getRowId() {
        return this.terminal.id + '_' + this.seq;
    }

    /**
     * 创建行
     * @returns {HTMLDivElement}
     */
    createRow() {
        let row = document.createElement('div');
        row.className = 'jxterm-output-row';
        row.id = this.getRowId();
        return row;
    }

    // /**
    //  * 创建一个元素（高亮、双字节）
    //  * @param className
    //  * @param html
    //  * @returns {HTMLSpanElement}
    //  */
    // span(className, html){
    //     let ele = document.createElement('span');
    //     !!className && (ele.className = className);
    //     !!html && (ele.innerHTML = html);
    //     return ele;
    // }

    /**
     * 解析\t
     * 规则：\t是补全当前字符串长度到8的整数倍,最少1个最多8个空格
     */
    // charTabulation(){
    //     // 需要补多少个空格
    //     /* 性能一般
    //     let spCount = TAB_COMPLETION_LENGTH - ((this.x - 1) % TAB_COMPLETION_LENGTH);
    //     for(let i = 0; i < spCount; i++){
    //         this.update(TAB_COMPLETION_CHAR);
    //     }*/
    //     this.update(`<span class="tab">\t</span>`);
    // }

    /**
     * 保存光标
     */
    saveCursor() {
        this.savedX = this.x;
        this.savedY = this.y;
        this.savedSeq = this.seq;
        this.savedCR = this.currentRow;
    }

    /**
     * 恢复光标
     */
    restoreCursor() {

        this.x = this.savedX;
        this.y = this.savedY;
        this.seq = this.savedSeq;
        this.setCurrentRow(this.savedCR);

        delete this.savedX;
        delete this.savedY;
        delete this.savedSeq;
        delete this.savedCR;
    }

    /**
     * States.ESC c  Full Reset (RIS), VT100.
     */
    reset() {

    }


    setGLevel(g) {
        this.glevel = g;
        this.gcharset = this.charsets[g];
    }

    setGCharset(g, charset) {
        this.charsets[g] = charset;
        if (this.glevel === g) {
            this.gcharset = charset;
        }
    }

    /**
     * 处理双字节字符
     * See:
     * https://www.cnblogs.com/sosoft/p/3456631.html
     * http://www.unicode.org/charts/
     *
     * emoji:
     * https://home.unicode.org/emoji/emoji-frequency/
     * @param chr
     */
    handleDoubleChars(chr) {

        if (/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]|[\u2E80-\uFE4F]/gi.test(chr)) {
            // 双字节字符
            // this.flush();
            // 超过字数自动换行
            if (this.x > this.terminal.columns) {
                this.lineFeed();
                this.x = 1;
            }

            // 添加数据
            // 占用两个位置
            const bufferRow = this.getBufferRow();
            let data = this.createData(chr);
            if (!!data['class']) {
                data.class += ' len2';
            } else {
                data.class = 'len2';
            }

            bufferRow[this.x] = data;
            bufferRow[this.x + 1] = undefined;

            this.x += 2;

            return true;
        }

        return false;

    }

    /**
     * 当前是否为插入模式 | 替换模式
     * @returns {boolean}
     */
    isInsertMode(){
        return this.csiParser.insertMode;
    }
}
