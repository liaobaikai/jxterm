
// 解析控制序列
// https://invisible-island.net/xterm/ctlseqs/ctlseqs.html#h2-Functions-using-States.CSI-_-ordered-by-the-final-character_s_
class CSIParser {

    constructor(parser, terminal) {

        this.p = parser;
        this.t = terminal;

        // Character Attributes (SGR)
        // class
        this.charAttrClasses = {};
        // class，简化对象的查询
        this.charAttrClass = '';

        // style
        // 字符前景色
        this.color = null;
        // 字符背景色
        this.bgColor = null;

        // 8位输入
        this.enableEightBitInput = true;

        // 是否解析meta键
        this.enableInterpretMeta = true;

        // 应用光标
        this.applicationCursor = false;

        this.printFormFeed = false;
        this.showScrollbar = false;
        this.fontShiftingFunctions = false;
        this.allow80To132Mode = false;
        this.marginBell = false;
        this.reverseWraparoundMode = false;
        this.startLogging = false;
        this.backarrowKey = false;
        this.leftAndrightMarginMode = false;
        this.sixelScrolling = false;
        this.sendMouseXAndY = false;
        this.hiliteMouseTracking = false;
        this.cellMotionMouseTracking = false;
        this.mouseEvents = false;
        this.sendFocus = false;
        this.utf8Mouse = false;
        this.sgrMouse = false;
        this.alternateScroll = false;
        this.scrollTtyOutput = false;
        this.scrollKey = false;
        this.urxvtMouse = false;
        this.eightBitInput = false;
        this.numLock = false;
        this.metaSendsEscape = false;
        this.altSendsEscape = false;
        this.keepSelection = false;
        this.selectToClipboard = false;
        this.bellIsUrgent = false;
        this.popOnBell = false;
        this.keepClipboard = false;
        this.titeInhibit = false;

        this.terminfoTermcapFunctionKey = false;
        this.sunFunctionKey = false;
        this.hpFunctionKey = false;
        this.scoFunctionKey = false;
        this.scoFunctionKey = false;
        this.legacyKeyboard = false;
        this.vt220Keyboard = false;
        this.bracketedPaste = false;

        // 插入模式
        this.insertMode = false;
    }

    /**
     * 更新行列的值
     * @param row 行
     * @param x 列
     * @param chr 替换的字符
     */
    update(row, x, chr) {

        // if (!chr) return;
        //
        // if (this.p.isAlternate()
        //     || (this.color || !!this.bgColor
        //         || !Utils.isEmpty(this.charAttrClasses))) {
        //
        //     let classes = Object.values(this.charAttrClasses);
        //
        //     let style = '';
        //     if (!!this.color) {
        //         style += 'color:' + this.color + ';';
        //     }
        //     if (!!this.bgColor) {
        //         style += 'background-color:' + this.bgColor + ';'
        //     }
        //
        //     chr = '<span ' +
        //         (classes.length > 0 ? 'class="' + classes.join(" ") + '"' : '') +
        //         (!!style ? ' style="' + style + '"' : '') +
        //         '>' + chr + '</span>';
        // }
        //
        // if (!!chr) row[x] = chr;


    }


    /**
     * 插入字符（空格）
     * @param params
     * @param prefix
     */
    // States.CSI Ps @  Insert Ps (Blank) Character(s) (default = 1) (ICH).
    //
    // States.CSI Ps SP @
    //           Shift left Ps columns(s) (default = 1) (SL), ECMA-48.
    insertChars(params, prefix) {
        if (prefix === C0.SP) {
        } else {
            let ps = params[0] || 1;
            let row = this.p.getBufferRow();
            for (let i = 0; i < ps; i++) {
                row.splice(this.p.x, 0, this.p.createData(' '));
            }
        }
    }

    /**
     * 光标上移
     * @param params
     * @param prefix
     */
    // States.CSI Ps A  Cursor Up Ps Times (default = 1) (CUU).
    //
    // States.CSI Ps SP A
    //           Shift right Ps columns(s) (default = 1) (SR), ECMA-48.
    cursorUp(params, prefix) {

        if (prefix === C0.SP) {

        } else {
            // 默认向上滚一行
            // 刷新当前行
            this.p.flush();
            this.p.y -= (params[0] || 1);
        }

        if (this.p.y < 1) {
            this.p.y = 1;
        }

    }

    /**
     * 光标下移
     * @param params
     */
    // States.CSI Ps B  Cursor Down Ps Times (default = 1) (CUD).
    cursorDown(params) {
        // 默认向下滚一行

        // 刷新当前行
        this.p.flush();
        this.p.y += (params[0] || 1);

        if (this.p.y > this.t.rows) {
            this.p.y = this.t.rows;
        }
    }

    /**
     * 光标右移
     * @param params
     */
    // States.CSI Ps C  Cursor Forward Ps Times (default = 1) (CUF).
    cursorForward(params) {
        let ps = params[0] || 1;
        let row = this.p.getBufferRow();

        // 如果缓冲区的长度小于当前的光标需要右移的长度
        // 需要先填充空字符
        if(row.length < this.p.x + ps){

            for (let i = 0; i < ps; i++) {

                if (!row[this.p.x + i]) {
                    // 不存在的。
                    row[this.p.x + i] = this.p.createData(' ');
                }
            }

        }

        this.p.x += ps;
    }

    /**
     * 光标左移
     * @param params
     */
    // States.CSI Ps D  Cursor Backward Ps Times (default = 1) (CUB).
    cursorBackward(params) {
        this.p.x -= params[0] || 1;
    }

    /**
     * 光标下一行
     * @param params
     */
    // States.CSI Ps E  Cursor Next Line Ps Times (default = 1) (CNL).
    cursorNextLine(params) {
        this.cursorDown(params);
    }

    /**
     * 光标前一行
     * @param params
     */
    // States.CSI Ps F  Cursor Preceding Line Ps Times (default = 1) (CPL).
    cursorPrecedingLine(params) {
        this.cursorUp(params);
    }

    /**
     * 光标定位
     * @param row
     * @param col
     */
    // States.CSI Ps G  Cursor Character Absolute  [column] (default = [row,1]) (CHA).
    // States.CSI Ps ; Ps H
    //           Cursor Position [row;column] (default = [1,1]) (CUP).
    // States.CSI Pm `  Character Position Absolute  [column] (default = [row,1])
    //           (HPA).
    // States.CSI Pm a  Character Position Relative  [columns] (default = [row,col+1])
    //           (HPR).
    // States.CSI Pm d  Line Position Absolute  [row] (default = [1,column]) (VPA).
    //
    // States.CSI Pm e  Line Position Relative  [rows] (default = [row+1,column])
    //           (VPR).
    //
    // States.CSI Ps ; Ps f
    //           Horizontal and Vertical Position [row;column] (default =
    //           [1,1]) (HVP).
    cursorPosition(row, col) {
        if (!!row) {
            // 刷新当前行
            this.p.flush();
            this.p.y = row;
        }

        if (!!col) {
            this.p.x = col;
        }

        if(col === 79){
            console.info('col:' + col);
        }

        if (this.p.y > this.t.rows) {
            this.p.y = this.t.rows;
            // 超出最后一行
            this.p.scrollUp(this.p.y - this.t.rows, true);
        }
    }

    /**
     * 光标前进Tab
     * @param params
     */
    // States.CSI Ps I  Cursor Forward Tabulation Ps tab stops (default = 1) (CHT).
    cursorForwardTabulation(params) {
        let ps = params[0] || 1
            , i = 0
            , row = this.p.getBufferRow();

        for (; i < ps; i++) {

            if (!row[this.p.x]) {
                // 不存在的。
                row[this.p.x] = this.p.createData('\t');
            } else {
                this.p.eraseData(row[this.p.x], '\t');
            }

            this.p.x++;
        }

        console.info('cursorForwardTabulation', ps);
    }

    /**
     * 抹除屏幕
     * @param params
     * @param isDECS
     */
    // States.CSI Ps J  Erase in Display (ED), VT100.
    //             Ps = 0  ⇒  Erase Below (default).
    //             Ps = 1  ⇒  Erase Above.
    //             Ps = 2  ⇒  Erase All.
    //             Ps = 3  ⇒  Erase Saved Lines, xterm.
    //
    // States.CSI ? Ps J
    //           Erase in Display (DECSED), VT220.
    //             Ps = 0  ⇒  Selective Erase Below (default).
    //             Ps = 1  ⇒  Selective Erase Above.
    //             Ps = 2  ⇒  Selective Erase All.
    //             Ps = 3  ⇒  Selective Erase Saved Lines, xterm.
    eraseInDisplay(params, isDECS) {

        let beginRowIndex = 0
            , endRow = 0
            , scrollBack = false;

        switch (params[0]) {
            case 1:
                beginRowIndex = 0;
                endRow = this.p.y;
                break;
            case 2:
                beginRowIndex = 0;
                endRow = this.t.rows;
                break;
            case 3:
                // Erase Saved Lines, xterm.
                // ? Selective Erase Saved Lines, xterm.
                break;
            default:
                beginRowIndex = this.p.y - 1;
                endRow = this.t.rows;
                break;
        }

        if (beginRowIndex === 0
            && endRow === this.t.rows) {
            // 如果是全屏的话，那就滚动。
            scrollBack = !this.p.isAlternate();
        }

        for (let y = beginRowIndex; y < endRow; y++) {
            // 添加行
            if (scrollBack) {
                this.p.activeBuffer[y] = this.p.newBufferRow();
                this.p.fragment.appendChild(this.p.currentRow);
            } else {
                // 删除行数据
                if (!!this.p.activeBuffer[y])
                    this.p.activeBuffer[y][0]['element'].innerHTML = '';
                else
                    continue
            }

            this.p.eraseLineData(this.p.activeBuffer[y], true);

        }

    }

    /**
     * 抹除行内容
     * @param params
     * @param isDECS
     */
    // States.CSI Ps K  Erase in Line (EL), VT100.
    //             Ps = 0  ⇒  Erase to Right (default).
    //             Ps = 1  ⇒  Erase to Left.
    //             Ps = 2  ⇒  Erase All.
    //
    // States.CSI ? Ps K
    //           Erase in Line (DECSEL), VT220.
    //             Ps = 0  ⇒  Selective Erase to Right (default).
    //             Ps = 1  ⇒  Selective Erase to Left.
    //             Ps = 2  ⇒  Selective Erase All.
    eraseInLine(params, isDECS) {

        let beginIndex, end, row = this.p.getBufferRow();

        switch (params[0]) {
            case 1:
                beginIndex = 1;
                end = this.p.x;
                break;
            case 2:
                beginIndex = 1;
                end = row.length;
                break;
            default:
                beginIndex = this.p.x;
                end = row.length;
                break;
        }

        // 是否需要更新样式
        for (let i = beginIndex; i < end; i++) {

            // 使用备用缓冲区 或 存在样式
            this.p.eraseData(row[i]);

        }
    }


    /**
     * 在光标的位置插入行
     * @param params
     */
    // States.CSI Ps L  Insert Ps Line(s) (default = 1) (IL).
    insertLines(params) {

        //
        console.info('insertLines..', params);

        for (let i = 0; i < (params[0] || 1); i++) {
            // 删除当前行
            this.p.insertLine();
        }

    }

    /**
     * 删除行
     * @param params
     */
    // States.CSI Ps M  Delete Ps Line(s) (default = 1) (DL).
    deleteLines(params) {

        //
        console.info('deleteLines..', params);

        for (let i = 0; i < (params[0] || 1); i++) {
            // 删除当前行
            this.p.deleteLine();
        }

    }

    /**
     * 删除字符
     * @param params
     */
    // States.CSI Ps P  Delete Ps Character(s) (default = 1) (DCH).
    deleteChars(params) {
        const deleted = this.p.getBufferRow().splice(this.p.x, params[0] || 1);
        console.info('P.deleted', deleted);
    }

    /**
     * 向上滚动Ps行
     * @param params
     */
    // States.CSI Ps S  Scroll up Ps lines (default = 1) (SU), VT420, ECMA-48.
    scrollUpLines(params) {
        this.p.scrollUp(params[0] || 1, true);
    }

    /**
     * 设置或请求图形属性
     * @param params
     */
    // States.CSI ? Pi ; Pa ; Pv S
    //           Set or request graphics attribute, xterm.  If configured to
    //           support either Sixel Graphics or ReGIS Graphics, xterm accepts
    //           a three-parameter control sequence, where Pi, Pa and Pv are
    //           the item, action and value:
    //
    //             Pi = 1  ⇒  item is number of color registers.
    //             Pi = 2  ⇒  item is Sixel graphics geometry (in pixels).
    //             Pi = 3  ⇒  item is ReGIS graphics geometry (in pixels).
    //
    //             Pa = 1  ⇒  read attribute.
    //             Pa = 2  ⇒  reset to default.
    //             Pa = 3  ⇒  set to value in Pv.
    //             Pa = 4  ⇒  read the maximum allowed value.
    //
    //             Pv can be omitted except when setting (Pa == 3 ).
    //             Pv = n ⇐  A single integer is used for color registers.
    //             Pv = width ; height ⇐  Two integers for graphics geometry.
    //
    //           xterm replies with a control sequence of the same form:
    //
    //                States.CSI ? Pi ; Ps ; Pv S
    //
    //           where Ps is the status:
    //             Ps = 0  ⇐  success.
    //             Ps = 1  ⇐  error in Pi.
    //             Ps = 2  ⇐  error in Pa.
    //             Ps = 3  ⇐  failure.
    //
    //           On success, Pv represents the value read or set.
    //
    //           Notes:
    //           o   The current implementation allows reading the graphics
    //               sizes, but disallows modifying those sizes because that is
    //               done once, using resource-values.
    //           o   Graphics geometry is not necessarily the same as "window
    //               size" (see the dtterm window manipulation extensions).
    //               For example, xterm limits the maximum graphics geometry at
    //               compile time (1000x1000 as of version 328) although the
    //               window size can be larger.
    //           o   While resizing a window will always change the current
    //               graphics geometry, the reverse is not true.  Setting
    //               graphics geometry does not affect the window size.
    setOrRequestGraphicsAttr(params) {
        let [pi, pa, pv] = params;
        console.info(`setOrRequestGraphicsAttr, pi=${pi}, pa=${pa}, pv=${pv}`);
    }

    /**
     * 向下滚动Ps行
     * @param params
     */
    // States.CSI Ps T  Scroll down Ps lines (default = 1) (SD), VT420.
    // States.CSI Ps ^  Scroll down Ps lines (default = 1) (SD), ECMA-48.
    scrollDownLines(params) {
        this.p.scrollDown(params[0] || 1, true);
    }

    /**
     * 启动高亮鼠标跟踪
     * @param params
     */
    // States.CSI Ps ; Ps ; Ps ; Ps ; Ps T
    //           Initiate highlight mouse tracking.  Parameters are
    //           [func;startx;starty;firstrow;lastrow].  See the section Mouse
    //           Tracking.
    //
    initiateHighlightMouseTacking(params) {
        let [func, startX, startY, firstRow, lastRow] = params;
        console.info(
            `initiateHighlightMouseTacking, func=${func}, startX=${startX}, startY=${startY}, firstRow=${firstRow}, lastRow=${lastRow}`);
    }

    /**
     * 将标题模式功能重置为默认值
     * @param params
     */
    // States.CSI > Pm T
    //           Reset title mode features to default value, xterm.  Normally,
    //           "reset" disables the feature.  It is possible to disable the
    //           ability to reset features by compiling a different default for
    //           the title modes into xterm.
    //             Ps = 0  ⇒  Do not set window/icon labels using hexadecimal.
    //             Ps = 1  ⇒  Do not query window/icon labels using hexadecimal.
    //             Ps = 2  ⇒  Do not set window/icon labels using UTF-8.
    //             Ps = 3  ⇒  Do not query window/icon labels using UTF-8.
    //           (See discussion of Title Modes).
    resetTitleModeFeatures(params) {

    }

    /**
     * 抹除ps个字符
     * @param params
     */
    // States.CSI Ps X  Erase Ps Character(s) (default = 1) (ECH).
    eraseChars(params) {
        for (let i = this.p.x; i < params[0] || 1; i++) {
            this.p.eraseData(this.p.getBufferRow()[i]);
        }
    }

    /**
     * 光标向左移pstab
     * @param params
     */
    // States.CSI Ps Z  Cursor Backward Tabulation Ps tab stops (default = 1) (CBT).
    cursorBackwardTabulation(params) {

    }

    /**
     * 重复前ps个图形字符
     * @param params
     */
    // States.CSI Ps b  Repeat the preceding graphic character Ps times (REP).
    repeatPrecedingGraphicChars(params) {

    }

    /**
     * 发送主设备属性
     * @param params
     */
    // States.CSI Ps c  Send Device Attributes (Primary DA).
    //             Ps = 0  or omitted ⇒  request attributes from terminal.  The
    //           response depends on the decTerminalID resource setting.
    //             ⇒  States.CSI ? 1 ; 2 c  ("VT100 with Advanced Video Option")
    //             ⇒  States.CSI ? 1 ; 0 c  ("VT101 with No Options")
    //             ⇒  States.CSI ? 6 c  ("VT102")
    //             ⇒  States.CSI ? 6 2 ; Psc  ("VT220")
    //             ⇒  States.CSI ? 6 3 ; Psc  ("VT320")
    //             ⇒  States.CSI ? 6 4 ; Psc  ("VT420")
    //
    //           The VT100-style response parameters do not mean anything by
    //           themselves.  VT220 (and higher) parameters do, telling the
    //           host what features the terminal supports:
    //             Ps = 1  ⇒  132-columns.
    //             Ps = 2  ⇒  Printer.
    //             Ps = 3  ⇒  ReGIS graphics.
    //             Ps = 4  ⇒  Sixel graphics.
    //             Ps = 6  ⇒  Selective erase.
    //             Ps = 8  ⇒  User-defined keys.
    //             Ps = 9  ⇒  National Replacement Character sets.
    //             Ps = 1 5  ⇒  Technical characters.
    //             Ps = 1 6  ⇒  Locator port.
    //             Ps = 1 7  ⇒  Terminal state interrogation.
    //             Ps = 1 8  ⇒  User windows.
    //             Ps = 2 1  ⇒  Horizontal scrolling.
    //             Ps = 2 2  ⇒  ANSI color, e.g., VT525.
    //             Ps = 2 8  ⇒  Rectangular editing.
    //             Ps = 2 9  ⇒  ANSI text locator (i.e., DEC Locator mode).
    //
    //           XTerm supports part of the User windows feature, providing a
    //           single page (which corresponds to its visible window).  Rather
    //           than resizing the font to change the number of lines/columns
    //           in a fixed-size display, xterm uses the window extension con-
    //           trols (DECSNLS, DECSCPP, DECSLPP) to adjust its visible win-
    //           dow's size.  The "cursor coupling" controls (DECHCCM, DECPCCM,
    //           DECVCCM) are ignored.
    sendPrimaryDeviceAttrs(params) {

    }

    /**
     * 发送次设备属性
     * @param params
     */
    // States.CSI > Ps c
    //           Send Device Attributes (Secondary DA).
    //             Ps = 0  or omitted ⇒  request the terminal's identification
    //           code.  The response depends on the decTerminalID resource set-
    //           ting.  It should apply only to VT220 and up, but xterm extends
    //           this to VT100.
    //             ⇒  States.CSI  > Pp ; Pv ; Pc c
    //           where Pp denotes the terminal type
    //             Pp = 0  ⇒  "VT100".
    //             Pp = 1  ⇒  "VT220".
    //             Pp = 2  ⇒  "VT240".
    //             Pp = 1 8  ⇒  "VT330".
    //             Pp = 1 9  ⇒  "VT340".
    //             Pp = 2 4  ⇒  "VT320".
    //             Pp = 4 1  ⇒  "VT420".
    //             Pp = 6 1  ⇒  "VT510".
    //             Pp = 6 4  ⇒  "VT520".
    //             Pp = 6 5  ⇒  "VT525".
    //
    //           and Pv is the firmware version (for xterm, this was originally
    //           the XFree86 patch number, starting with 95).  In a DEC termi-
    //           nal, Pc indicates the ROM cartridge registration number and is
    //           always zero.
    sendSecondaryDeviceAttrs(params) {

    }

    /**
     * 发送第三设备属性
     * @param params
     */
    // States.CSI = Ps c
    //           Send Device Attributes (Tertiary DA).
    //             Ps = 0  ⇒  report Terminal Unit ID (default), VT400.  XTerm
    //           uses zeros for the site code and serial number in its DECRPTUI
    //           response.
    sendTertiaryDeviceAttrs(params) {

    }

    /**
     *
     * @param params
     */
    // States.CSI Ps g  Tab Clear (TBC).
    //             Ps = 0  ⇒  Clear Current Column (default).
    //             Ps = 3  ⇒  Clear All.
    // Ecma-048
    // 8.3.154 TBC - TABULATION CLEAR
    tabClear(params) {
        switch (params[0]) {
            case 1:
                // 1 the line tabulation stop at the active line is cleared
                break;
            case 2:
                // 2 all character tabulation stops in the active line are cleared
                break;
            case 3:
                // 3 all character tabulation stops are cleared
                break;
            case 4:
                // 4 all line tabulation stops are cleared
                break;
            case 5:
                // 5 all tabulation stops are cleared
                break;
            default:
            // 0 the character tabulation stop at the active presentation position is cleared
        }
    }

    /**
     * 模式设置
     * @param params
     * @param isDEC
     */
    // States.CSI Pm h  Set Mode (SM).
    //             Ps = 2  ⇒  Keyboard Action Mode (AM).
    //             Ps = 4  ⇒  Insert Mode (IRM).
    //             Ps = 1 2  ⇒  Send/receive (SRM).
    //             Ps = 2 0  ⇒  Automatic Newline (LNM).
    // States.CSI ? Pm h
    //           DEC Private Mode Set (DECSET).
    //             Ps = 1  ⇒  Application Cursor Keys (DECCKM), VT100.
    //             Ps = 2  ⇒  Designate USASCII for character sets G0-G3
    //           (DECANM), VT100, and set VT100 mode.
    //             Ps = 3  ⇒  132 Column Mode (DECCOLM), VT100.
    //             Ps = 4  ⇒  Smooth (Slow) Scroll (DECSCLM), VT100.
    //             Ps = 5  ⇒  Reverse Video (DECSCNM), VT100.
    //             Ps = 6  ⇒  Origin Mode (DECOM), VT100.
    //             Ps = 7  ⇒  Auto-wrap Mode (DECAWM), VT100.
    //             Ps = 8  ⇒  Auto-repeat Keys (DECARM), VT100.
    //             Ps = 9  ⇒  Send Mouse X & Y on button press.  See the sec-
    //           tion Mouse Tracking.  This is the X10 xterm mouse protocol.
    //             Ps = 1 0  ⇒  Show toolbar (rxvt).
    //             Ps = 1 2  ⇒  Start Blinking Cursor (AT&T 610).
    //             Ps = 1 3  ⇒  Start Blinking Cursor (set only via resource or
    //           menu).
    //             Ps = 1 4  ⇒  Enable XOR of Blinking Cursor control sequence
    //           and menu.
    //             Ps = 1 8  ⇒  Print form feed (DECPFF), VT220.
    //             Ps = 1 9  ⇒  Set print extent to full screen (DECPEX),
    //           VT220.
    //             Ps = 2 5  ⇒  Show Cursor (DECTCEM), VT220.
    //             Ps = 3 0  ⇒  Show scrollbar (rxvt).
    //             Ps = 3 5  ⇒  Enable font-shifting functions (rxvt).
    //             Ps = 3 8  ⇒  Enter Tektronix Mode (DECTEK), VT240, xterm.
    //             Ps = 4 0  ⇒  Allow 80 ⇒  132 Mode, xterm.
    //             Ps = 4 1  ⇒  more(1) fix (see curses resource).
    //             Ps = 4 2  ⇒  Enable National Replacement Character sets
    //           (DECNRCM), VT220.
    //             Ps = 4 4  ⇒  Turn On Margin Bell, xterm.
    //             Ps = 4 5  ⇒  Reverse-wraparound Mode, xterm.
    //             Ps = 4 6  ⇒  Start Logging, xterm.  This is normally dis-
    //           abled by a compile-time option.
    //             Ps = 4 7  ⇒  Use Alternate Screen Buffer, xterm.  This may
    //           be disabled by the titeInhibit resource.
    //             Ps = 6 6  ⇒  Application keypad (DECNKM), VT320.
    //             Ps = 6 7  ⇒  Backarrow key sends backspace (DECBKM), VT340,
    //           VT420.  This sets the backarrowKey resource to "true".
    //             Ps = 6 9  ⇒  Enable left and right margin mode (DECLRMM),
    //           VT420 and up.
    //             Ps = 8 0  ⇒  Enable Sixel Scrolling (DECSDM).
    //             Ps = 9 5  ⇒  Do not clear screen when DECCOLM is set/reset
    //           (DECNCSM), VT510 and up.
    //             Ps = 1 0 0 0  ⇒  Send Mouse X & Y on button press and
    //           release.  See the section Mouse Tracking.  This is the X11
    //           xterm mouse protocol.
    //             Ps = 1 0 0 1  ⇒  Use Hilite Mouse Tracking, xterm.
    //             Ps = 1 0 0 2  ⇒  Use Cell Motion Mouse Tracking, xterm.  See
    //           the section Button-event tracking.
    //             Ps = 1 0 0 3  ⇒  Use All Motion Mouse Tracking, xterm.  See
    //           the section Any-event tracking.
    //             Ps = 1 0 0 4  ⇒  Send FocusIn/FocusOut events, xterm.
    //             Ps = 1 0 0 5  ⇒  Enable UTF-8 Mouse Mode, xterm.
    //             Ps = 1 0 0 6  ⇒  Enable SGR Mouse Mode, xterm.
    //             Ps = 1 0 0 7  ⇒  Enable Alternate Scroll Mode, xterm.  This
    //           corresponds to the alternateScroll resource.
    //             Ps = 1 0 1 0  ⇒  Scroll to bottom on tty output (rxvt).
    //           This sets the scrollTtyOutput resource to "true".
    //             Ps = 1 0 1 1  ⇒  Scroll to bottom on key press (rxvt).  This
    //           sets the scrollKey resource to "true".
    //             Ps = 1 0 1 5  ⇒  Enable urxvt Mouse Mode.
    //             Ps = 1 0 3 4  ⇒  Interpret "meta" key, xterm.  This sets the
    //           eighth bit of keyboard input (and enables the eightBitInput
    //           resource).
    //             Ps = 1 0 3 5  ⇒  Enable special modifiers for Alt and Num-
    //           Lock keys, xterm.  This enables the numLock resource.
    //             Ps = 1 0 3 6  ⇒  Send States.ESC   when Meta modifies a key, xterm.
    //           This enables the metaSendsEscape resource.
    //             Ps = 1 0 3 7  ⇒  Send DEL from the editing-keypad Delete
    //           key, xterm.
    //             Ps = 1 0 3 9  ⇒  Send States.ESC  when Alt modifies a key, xterm.
    //           This enables the altSendsEscape resource, xterm.
    //             Ps = 1 0 4 0  ⇒  Keep selection even if not highlighted,
    //           xterm.  This enables the keepSelection resource.
    //             Ps = 1 0 4 1  ⇒  Use the CLIPBOARD selection, xterm.  This
    //           enables the selectToClipboard resource.
    //             Ps = 1 0 4 2  ⇒  Enable Urgency window manager hint when
    //           Control-G is received, xterm.  This enables the bellIsUrgent
    //           resource.
    //             Ps = 1 0 4 3  ⇒  Enable raising of the window when Control-G
    //           is received, xterm.  This enables the popOnBell resource.
    //             Ps = 1 0 4 4  ⇒  Reuse the most recent data copied to CLIP-
    //           BOARD, xterm.  This enables the keepClipboard resource.
    //             Ps = 1 0 4 6  ⇒  Enable switching to/from Alternate Screen
    //           Buffer, xterm.  This works for terminfo-based systems, updat-
    //           ing the titeInhibit resource.
    //             Ps = 1 0 4 7  ⇒  Use Alternate Screen Buffer, xterm.  This
    //           may be disabled by the titeInhibit resource.
    //             Ps = 1 0 4 8  ⇒  Save cursor as in DECSC, xterm.  This may
    //           be disabled by the titeInhibit resource.
    //             Ps = 1 0 4 9  ⇒  Save cursor as in DECSC, xterm.  After sav-
    //           ing the cursor, switch to the Alternate Screen Buffer, clear-
    //           ing it first.  This may be disabled by the titeInhibit
    //           resource.  This control combines the effects of the 1 0 4 7
    //           and 1 0 4 8  modes.  Use this with terminfo-based applications
    //           rather than the 4 7  mode.
    //             Ps = 1 0 5 0  ⇒  Set terminfo/termcap function-key mode,
    //           xterm.
    //             Ps = 1 0 5 1  ⇒  Set Sun function-key mode, xterm.
    //             Ps = 1 0 5 2  ⇒  Set HP function-key mode, xterm.
    //             Ps = 1 0 5 3  ⇒  Set SCO function-key mode, xterm.
    //             Ps = 1 0 6 0  ⇒  Set legacy keyboard emulation, i.e, X11R6,
    //           xterm.
    //             Ps = 1 0 6 1  ⇒  Set VT220 keyboard emulation, xterm.
    //             Ps = 2 0 0 4  ⇒  Set bracketed paste mode, xterm.
    setMode(params, isDEC) {

        if (typeof params === 'object') {
            let len = params.length,
                i = 0;

            for (; i < len; i++) {
                this.setMode(params[i], isDEC);
            }
        }

        if (isDEC) {

            switch (params) {

                case 1:
                    this.applicationCursor = true;
                    break;
                case 2:
                    this.p.setGCharset(0, this.t.charsets.US);
                    this.p.setGCharset(1, this.t.charsets.US);
                    this.p.setGCharset(2, this.t.charsets.US);
                    this.p.setGCharset(3, this.t.charsets.US);
                    break;
                case 3:
                    this.t.onResize({
                        columns: 132,
                        rows: this.t.rows
                    });
                    break;
                case 4:
                    break;
                case 5:
                    // Reverse Video (DECSCNM), VT100.
                    this.t.reverseVideo();
                    break;
                case 6:
                    // 光标原点模式
                    this.originMode = true;
                    break;
                case 7:
                    // 自动换行
                    this.autoWrap = true;
                    break;
                case 8:
                    this.autoRepeatKeys = true;
                    break;
                case 9:
                    //
                    this.x10Mouse = true;
                    this.mouseEvents = true;
                    break;
                case 10:
                    break;
                case 12:
                case 13:
                    // Start Blinking Cursor (AT&T 610).
                    // Start Blinking Cursor (set only via resource or menu).
                    this.t.startBlinkingCursor();
                    break;
                case 14:
                case 18:
                    this.printFormFeed = true;
                    break;
                case 19:
                    break;
                case 25:
                    // show cursor
                    console.info('show cursor....25h');
                    this.t.showCursor();
                    break;
                case 30:
                    this.showScrollbar = true;
                    break;
                case 35:
                    this.fontShiftingFunctions = true;
                    break;
                case 38:
                    break;
                case 40:
                    this.allow80To132Mode = true;
                    break;
                case 41:
                case 42:
                    break;
                case 44:
                    this.marginBell = true;
                    break;
                case 45:
                    this.reverseWraparoundMode = true;
                    break;
                case 46:
                    this.startLogging = true;
                    break;
                case 47:
                    this.p.switch2ScreenBuffer2();
                    break;
                case 66:
                    this.t.applicationKeypad = true;
                    break;
                case 67:
                    // https://en.wikipedia.org/wiki/Delete_character
                    this.backarrowKey = true;
                    break;
                case 69:
                    this.leftAndrightMarginMode = true;
                    break;
                case 80:
                    this.sixelScrolling = true;
                    break;
                case 95:
                    // Do not clear screen when DECCOLM is set/reset
                    break;
                case 1000:
                    this.vt200Mouse = true;
                    this.mouseEvents = true;
                    break;
                case 1001:
                case 1002:
                case 1003:
                    this.normalMouse = true;
                    this.mouseEvents = true;
                    console.info(`Binding to mouse events. ${params}`);
                    break;
                case 1004:
                    // focusin: ^[[I
                    // focusout: ^[[O
                    this.sendFocus = true;
                    break;
                case 1005:
                    this.utf8Mouse = true;
                    break;
                case 1006:
                    this.sgrMouse = true;
                    break;
                case 1007:
                    this.alternateScroll = true;
                    break;
                case 1010:
                    this.scrollTtyOutput = true;
                    break;
                case 1011:
                    this.scrollKey = true;
                    break;
                case 1015:
                    this.urxvtMouse = true;
                    break;
                case 1034:
                    this.eightBitInput = true;
                    break;
                case 1035:
                    this.numLock = true;
                    break;
                case 1036:
                    this.metaSendsEscape = true;
                    break;
                case 1037:
                    break;
                case 1039:
                    this.altSendsEscape = true;
                    break;
                case 1040:
                    this.keepSelection = true;
                    break;
                case 1041:
                    this.selectToClipboard = true;
                    break;
                case 1042:
                    this.bellIsUrgent = true;
                    break;
                case 1043:
                    this.popOnBell = true;
                    break;
                case 1044:
                    this.keepClipboard = true;
                    break;
                case 1046:
                    this.p.disableAlternateBuffer = false;
                    break;
                case 1047:
                    this.p.switch2ScreenBuffer2();
                    this.titeInhibit = true;
                    break;
                case 1048:
                    this.p.saveCursor();
                    this.titeInhibit = false;
                    break;
                case 1049:
                    this.p.saveCursor();
                    this.p.switch2ScreenBuffer2();
                    this.titeInhibit = false;
                    break;
                case 1050:
                    this.terminfoTermcapFunctionKey = true;
                    break;
                case 1051:
                    this.sunFunctionKey = true;
                    break;
                case 1052:
                    this.hpFunctionKey = true;
                    break;
                case 1053:
                    this.scoFunctionKey = true;
                    break;
                case 1060:
                    this.legacyKeyboard = true;
                    break;
                case 1061:
                    this.vt220Keyboard = true;
                    break;
                case 2004:
                    this.bracketedPaste = true;
                    break;
            }

        } else {

            switch (params) {

                case 2:
                    break;
                case 4:
                    // Insert Mode (IRM).
                    this.insertMode = true;
                    break;
                case 12:
                    break;
                case 20:
                    break;

            }

        }

    }

    /**
     * 媒体复制
     * @param params
     * @param isDEC
     */
    // States.CSI ? Pm i
    //           Media Copy (MC), DEC-specific.
    //             Ps = 1  ⇒  Print line containing cursor.
    //             Ps = 4  ⇒  Turn off autoprint mode.
    //             Ps = 5  ⇒  Turn on autoprint mode.
    //             Ps = 1 0  ⇒  Print composed display, ignores DECPEX.
    //             Ps = 1 1  ⇒  Print all pages.
    // States.CSI Pm i  Media Copy (MC).
    //             Ps = 0  ⇒  Print screen (default).
    //             Ps = 4  ⇒  Turn off printer controller mode.
    //             Ps = 5  ⇒  Turn on printer controller mode.
    //             Ps = 1 0  ⇒  HTML screen dump, xterm.
    //             Ps = 1 1  ⇒  SVG screen dump, xterm.
    mediaCopy(params, isDEC) {

    }

    /**
     * 重置模式
     * @param params
     * @param isDEC
     */

    // States.CSI Pm l  Reset Mode (RM).
    //             Ps = 2  ⇒  Keyboard Action Mode (AM).
    //             Ps = 4  ⇒  Replace Mode (IRM).
    //             Ps = 1 2  ⇒  Send/receive (SRM).
    //             Ps = 2 0  ⇒  Normal Linefeed (LNM).
    // States.CSI ? Pm l
    //           DEC Private Mode Reset (DECRST).
    //             Ps = 1  ⇒  Normal Cursor Keys (DECCKM), VT100.
    //             Ps = 2  ⇒  Designate VT52 mode (DECANM), VT100.
    //             Ps = 3  ⇒  80 Column Mode (DECCOLM), VT100.
    //             Ps = 4  ⇒  Jump (Fast) Scroll (DECSCLM), VT100.
    //             Ps = 5  ⇒  Normal Video (DECSCNM), VT100.
    //             Ps = 6  ⇒  Normal Cursor Mode (DECOM), VT100.
    //             Ps = 7  ⇒  No Auto-wrap Mode (DECAWM), VT100.
    //             Ps = 8  ⇒  No Auto-repeat Keys (DECARM), VT100.
    //             Ps = 9  ⇒  Don't send Mouse X & Y on button press, xterm.
    //             Ps = 1 0  ⇒  Hide toolbar (rxvt).
    //             Ps = 1 2  ⇒  Stop Blinking Cursor (AT&T 610).
    //             Ps = 1 3  ⇒  Disable Blinking Cursor (reset only via
    //           resource or menu).
    //             Ps = 1 4  ⇒  Disable XOR of Blinking Cursor control sequence
    //           and menu.
    //             Ps = 1 8  ⇒  Don't print form feed (DECPFF).
    //             Ps = 1 9  ⇒  Limit print to scrolling region (DECPEX).
    //             Ps = 2 5  ⇒  Hide Cursor (DECTCEM), VT220.
    //             Ps = 3 0  ⇒  Don't show scrollbar (rxvt).
    //             Ps = 3 5  ⇒  Disable font-shifting functions (rxvt).
    //             Ps = 4 0  ⇒  Disallow 80 ⇒  132 Mode, xterm.
    //             Ps = 4 1  ⇒  No more(1) fix (see curses resource).
    //             Ps = 4 2  ⇒  Disable National Replacement Character sets
    //           (DECNRCM), VT220.
    //             Ps = 4 4  ⇒  Turn Off Margin Bell, xterm.
    //             Ps = 4 5  ⇒  No Reverse-wraparound Mode, xterm.
    //             Ps = 4 6  ⇒  Stop Logging, xterm.  This is normally disabled
    //           by a compile-time option.
    //             Ps = 4 7  ⇒  Use Normal Screen Buffer, xterm.
    //             Ps = 6 6  ⇒  Numeric keypad (DECNKM), VT320.
    //             Ps = 6 7  ⇒  Backarrow key sends delete (DECBKM), VT340,
    //           VT420.  This sets the backarrowKey resource to "false".
    //             Ps = 6 9  ⇒  Disable left and right margin mode (DECLRMM),
    //           VT420 and up.
    //             Ps = 8 0  ⇒  Disable Sixel Scrolling (DECSDM).
    //             Ps = 9 5  ⇒  Clear screen when DECCOLM is set/reset (DEC-
    //           NCSM), VT510 and up.
    //             Ps = 1 0 0 0  ⇒  Don't send Mouse X & Y on button press and
    //           release.  See the section Mouse Tracking.
    //             Ps = 1 0 0 1  ⇒  Don't use Hilite Mouse Tracking, xterm.
    //             Ps = 1 0 0 2  ⇒  Don't use Cell Motion Mouse Tracking,
    //           xterm.  See the section Button-event tracking.
    //             Ps = 1 0 0 3  ⇒  Don't use All Motion Mouse Tracking, xterm.
    //           See the section Any-event tracking.
    //             Ps = 1 0 0 4  ⇒  Don't send FocusIn/FocusOut events, xterm.
    //             Ps = 1 0 0 5  ⇒  Disable UTF-8 Mouse Mode, xterm.
    //             Ps = 1 0 0 6  ⇒  Disable SGR Mouse Mode, xterm.
    //             Ps = 1 0 0 7  ⇒  Disable Alternate Scroll Mode, xterm.  This
    //           corresponds to the alternateScroll resource.
    //             Ps = 1 0 1 0  ⇒  Don't scroll to bottom on tty output
    //           (rxvt).  This sets the scrollTtyOutput resource to "false".
    //             Ps = 1 0 1 1  ⇒  Don't scroll to bottom on key press (rxvt).
    //           This sets the scrollKey resource to "false".
    //             Ps = 1 0 1 5  ⇒  Disable urxvt Mouse Mode.
    //             Ps = 1 0 3 4  ⇒  Don't interpret "meta" key, xterm.  This
    //           disables the eightBitInput resource.
    //             Ps = 1 0 3 5  ⇒  Disable special modifiers for Alt and Num-
    //           Lock keys, xterm.  This disables the numLock resource.
    //             Ps = 1 0 3 6  ⇒  Don't send States.ESC  when Meta modifies a key,
    //           xterm.  This disables the metaSendsEscape resource.
    //             Ps = 1 0 3 7  ⇒  Send VT220 Remove from the editing-keypad
    //           Delete key, xterm.
    //             Ps = 1 0 3 9  ⇒  Don't send States.ESC when Alt modifies a key,
    //           xterm.  This disables the altSendsEscape resource.
    //             Ps = 1 0 4 0  ⇒  Do not keep selection when not highlighted,
    //           xterm.  This disables the keepSelection resource.
    //             Ps = 1 0 4 1  ⇒  Use the PRIMARY selection, xterm.  This
    //           disables the selectToClipboard resource.
    //             Ps = 1 0 4 2  ⇒  Disable Urgency window manager hint when
    //           Control-G is received, xterm.  This disables the bellIsUrgent
    //           resource.
    //             Ps = 1 0 4 3  ⇒  Disable raising of the window when Control-
    //           G is received, xterm.  This disables the popOnBell resource.
    //             Ps = 1 0 4 6  ⇒  Disable switching to/from Alternate Screen
    //           Buffer, xterm.  This works for terminfo-based systems, updat-
    //           ing the titeInhibit resource.  If currently using the Alter-
    //           nate Screen Buffer, xterm switches to the Normal Screen Buf-
    //           fer.
    //             Ps = 1 0 4 7  ⇒  Use Normal Screen Buffer, xterm.  Clear the
    //           screen first if in the Alternate Screen Buffer.  This may be
    //           disabled by the titeInhibit resource.
    //             Ps = 1 0 4 8  ⇒  Restore cursor as in DECRC, xterm.  This
    //           may be disabled by the titeInhibit resource.
    //             Ps = 1 0 4 9  ⇒  Use Normal Screen Buffer and restore cursor
    //           as in DECRC, xterm.  This may be disabled by the titeInhibit
    //           resource.  This combines the effects of the 1 0 4 7  and 1 0 4
    //           8  modes.  Use this with terminfo-based applications rather
    //           than the 4 7  mode.
    //             Ps = 1 0 5 0  ⇒  Reset terminfo/termcap function-key mode,
    //           xterm.
    //             Ps = 1 0 5 1  ⇒  Reset Sun function-key mode, xterm.
    //             Ps = 1 0 5 2  ⇒  Reset HP function-key mode, xterm.
    //             Ps = 1 0 5 3  ⇒  Reset SCO function-key mode, xterm.
    //             Ps = 1 0 6 0  ⇒  Reset legacy keyboard emulation, i.e,
    //           X11R6, xterm.
    //             Ps = 1 0 6 1  ⇒  Reset keyboard emulation to Sun/PC style,
    //           xterm.
    //             Ps = 2 0 0 4  ⇒  Reset bracketed paste mode, xterm.

    resetMode(params, isDEC) {

        if (typeof params === 'object') {
            let len = params.length,
                i = 0;

            for (; i < len; i++) {
                this.resetMode(params[i], isDEC);
            }
        }

        if (isDEC) {

            switch (params) {

                case 1:
                    this.applicationCursor = false;
                    break;
                case 2:
                    // Designate VT52 mode (DECANM), VT100.
                    break;
                case 3:
                    this.t.onResize({
                        columns: 80,
                        rows: this.t.rows
                    });
                    break;
                case 4:
                    break;
                case 5:
                    // Normal Video (DECSCNM), VT100.
                    this.t.normalVideo();
                    break;
                case 6:
                    this.originMode = false;
                    break;
                case 7:
                    this.autoWrap = false;
                    break;
                case 8:
                    this.autoRepeatKeys = false;
                    break;
                case 9:
                    // X10 Mouse
                    this.x10Mouse = false;
                    this.mouseEvents = false;
                    break;
                case 10:
                    break;
                case 12:
                // Stop Blinking Cursor (AT&T 610).
                case 13:
                    // Disable Blinking Cursor (reset only via resource or menu).
                    this.t.stopBlinkingCursor();
                    break;
                case 14:
                case 18:
                    this.printFormFeed = false;
                    break;
                case 19:
                    break;
                case 25:
                    console.info('hide cursor....25l');
                    this.t.hideCursor();
                    break;
                case 30:
                    this.showScrollbar = false;
                    break;
                case 35:
                    this.fontShiftingFunctions = false;
                    break;
                case 40:
                    this.allow80To132Mode = false;
                    break;
                case 41:
                case 42:
                    this.marginBell = false;
                    break;
                case 44:
                    this.reverseWraparoundMode = false;
                    break;
                case 46:
                    this.startLogging = true;
                    break;
                case 47:
                    this.p.switch2ScreenBuffer();
                    break;
                case 66:
                    this.t.applicationKeypad = false;
                    break;
                case 67:
                    // https://en.wikipedia.org/wiki/Delete_character
                    this.backarrowKey = false;
                    break;
                case 69:
                    this.leftAndrightMarginMode = false;
                    break;
                case 80:
                    this.sixelScrolling = false;
                    break;
                case 95:
                    // Clear screen when DECCOLM is set/reset
                    break;
                case 1000:
                    // VT200 Mouse
                    this.vt200Mouse = false;
                    this.mouseEvents = false;
                    break;
                case 1001:
                case 1002:
                case 1003:
                    this.normalMouse = false;
                    this.mouseEvents = false;
                    break;
                case 1004:
                    this.sendFocus = false;
                    break;
                case 1005:
                    this.utf8Mouse = false;
                    break;
                case 1006:
                    this.sgrMouse = false;
                    break;
                case 1007:
                    this.alternateScroll = false;
                    break;
                case 1010:
                    this.scrollTtyOutput = false;
                    break;
                case 1011:
                    this.scrollKey = false;
                    break;
                case 1015:
                    this.urxvtMouse = false;
                    break;
                case 1034:
                    this.eightBitInput = false;
                    break;
                case 1035:
                    this.numLock = false;
                    break;
                case 1036:
                    this.metaSendsEscape = true;
                    break;
                case 1037:
                    break;
                case 1039:
                    this.altSendsEscape = true;
                    break;
                case 1040:
                    this.keepSelection = true;
                    break;
                case 1041:
                    this.selectToClipboard = true;
                    break;
                case 1042:
                    this.bellIsUrgent = false;
                    break;
                case 1043:
                    this.popOnBell = false;
                    break;
                case 1046:
                    this.p.disableAlternateBuffer = true;
                    this.titeInhibit = true;
                    break;
                case 1047:
                    // 清除备用缓冲区
                    this.eraseInDisplay(2);
                    // 切换到默认缓冲区
                    this.p.switch2ScreenBuffer();
                    this.titeInhibit = false;
                    break;
                case 1048:
                    this.p.restoreCursor();
                    this.titeInhibit = false;
                    break;
                case 1049:
                    // 切换到默认缓冲区&恢复光标
                    this.p.switch2ScreenBuffer();
                    this.p.restoreCursor();
                    this.titeInhibit = false;
                    break;
                case 1050:
                    this.terminfoTermcapFunctionKey = false;
                    break;
                case 1051:
                    this.sunFunctionKey = false;
                    break;
                case 1052:
                    this.hpFunctionKey = false;
                    break;
                case 1053:
                    this.scoFunctionKey = false;
                    break;
                case 1060:
                    this.legacyKeyboard = false;
                    break;
                case 1061:
                    this.vt220Keyboard = false;
                    break;
                case 2004:
                    this.bracketedPaste = false;
                    break;
            }

        } else {
            switch (params) {

                case 2:
                    break;
                case 4:
                    // Replace Mode (IRM).
                    this.insertMode = false;
                    break;
                case 12:
                    break;
                case 20:
                    break;

            }
        }

    }

    /**
     * 更新修改键选项
     * @param params
     */
    // States.CSI > Pp ; Pv m
    // States.CSI > Pp m
    //           Set/reset key modifier options, xterm.  Set or reset resource-
    //           values used by xterm to decide whether to construct escape
    //           sequences holding information about the modifiers pressed with
    //           a given key.
    //
    //           The first parameter Pp identifies the resource to set/reset.
    //           The second parameter Pv is the value to assign to the
    //           resource.
    //
    //           If the second parameter is omitted, the resource is reset to
    //           its initial value.  Values 3  and 5  are reserved for keypad-
    //           keys and string-keys.
    //
    //             Pp = 0  ⇒  modifyKeyboard.
    //             Pp = 1  ⇒  modifyCursorKeys.
    //             Pp = 2  ⇒  modifyFunctionKeys.
    //             Pp = 4  ⇒  modifyOtherKeys.
    //
    //           If no parameters are given, all resources are reset to their
    //           initial values.
    updateKeyModifierOptions(params) {

    }

    /**
     * 设置字符属性
     * @param params
     */
    // States.CSI Pm m  Character Attributes (SGR).
    //             Ps = 0  ⇒  Normal (default), VT100.
    //             Ps = 1  ⇒  Bold, VT100.
    //             Ps = 2  ⇒  Faint, decreased intensity, ECMA-48 2nd.
    //             Ps = 3  ⇒  Italicized, ECMA-48 2nd.
    //             Ps = 4  ⇒  Underlined, VT100.
    //             Ps = 5  ⇒  Blink, VT100.
    //           This appears as Bold in X11R6 xterm.
    //             Ps = 7  ⇒  Inverse, VT100.
    //             Ps = 8  ⇒  Invisible, i.e., hidden, ECMA-48 2nd, VT300.
    //             Ps = 9  ⇒  Crossed-out characters, ECMA-48 3rd.
    //             Ps = 2 1  ⇒  Doubly-underlined, ECMA-48 3rd.
    //             Ps = 2 2  ⇒  Normal (neither bold nor faint), ECMA-48 3rd.
    //             Ps = 2 3  ⇒  Not italicized, ECMA-48 3rd.
    //             Ps = 2 4  ⇒  Not underlined, ECMA-48 3rd.
    //             Ps = 2 5  ⇒  Steady (not blinking), ECMA-48 3rd.
    //             Ps = 2 7  ⇒  Positive (not inverse), ECMA-48 3rd.
    //             Ps = 2 8  ⇒  Visible, i.e., not hidden, ECMA-48 3rd, VT300.
    //             Ps = 2 9  ⇒  Not crossed-out, ECMA-48 3rd.
    //             Ps = 3 0  ⇒  Set foreground color to Black.
    //             Ps = 3 1  ⇒  Set foreground color to Red.
    //             Ps = 3 2  ⇒  Set foreground color to Green.
    //             Ps = 3 3  ⇒  Set foreground color to Yellow.
    //             Ps = 3 4  ⇒  Set foreground color to Blue.
    //             Ps = 3 5  ⇒  Set foreground color to Magenta.
    //             Ps = 3 6  ⇒  Set foreground color to Cyan.
    //             Ps = 3 7  ⇒  Set foreground color to White.
    //             Ps = 3 9  ⇒  Set foreground color to default, ECMA-48 3rd.
    //             Ps = 4 0  ⇒  Set background color to Black.
    //             Ps = 4 1  ⇒  Set background color to Red.
    //             Ps = 4 2  ⇒  Set background color to Green.
    //             Ps = 4 3  ⇒  Set background color to Yellow.
    //             Ps = 4 4  ⇒  Set background color to Blue.
    //             Ps = 4 5  ⇒  Set background color to Magenta.
    //             Ps = 4 6  ⇒  Set background color to Cyan.
    //             Ps = 4 7  ⇒  Set background color to White.
    //             Ps = 4 9  ⇒  Set background color to default, ECMA-48 3rd.
    //
    //           Some of the above note the edition of ECMA-48 which first
    //           describes a feature.  In its successive editions from 1979 to
    //           1991 (2nd 1979, 3rd 1984, 4th 1986, and 5th 1991), ECMA-48
    //           listed codes through 6 5 (skipping several toward the end of
    //           the range).  Most of the ECMA-48 codes not implemented in
    //           xterm were never implemented in a hardware terminal.  Several
    //           (such as 3 9  and 4 9 ) are either noted in ECMA-48 as imple-
    //           mentation defined, or described in vague terms.
    //
    //           The successive editions of ECMA-48 give little attention to
    //           changes from one edition to the next, except to comment on
    //           features which have become obsolete.  ECMA-48 1st (1976) is
    //           unavailable; there is no reliable source of information which
    //           states whether "ANSI" color was defined in that edition, or
    //           later (1979).  The VT100 (1978) implemented the most commonly
    //           used non-color video attributes which are given in the 2nd
    //           edition.
    //
    //           While 8-color support is described in ECMA-48 2nd edition, the
    //           VT500 series (introduced in 1993) were the first DEC terminals
    //           implementing "ANSI" color.  The DEC terminal's use of color is
    //           known to differ from xterm; useful documentation on this
    //           series became available too late to influence xterm.
    //
    //           If 16-color support is compiled, the following aixterm con-
    //           trols apply.  Assume that xterm's resources are set so that
    //           the ISO color codes are the first 8 of a set of 16.  Then the
    //           aixterm colors are the bright versions of the ISO colors:
    //
    //             Ps = 9 0  ⇒  Set foreground color to Black.
    //             Ps = 9 1  ⇒  Set foreground color to Red.
    //             Ps = 9 2  ⇒  Set foreground color to Green.
    //             Ps = 9 3  ⇒  Set foreground color to Yellow.
    //             Ps = 9 4  ⇒  Set foreground color to Blue.
    //             Ps = 9 5  ⇒  Set foreground color to Magenta.
    //             Ps = 9 6  ⇒  Set foreground color to Cyan.
    //             Ps = 9 7  ⇒  Set foreground color to White.
    //             Ps = 1 0 0  ⇒  Set background color to Black.
    //             Ps = 1 0 1  ⇒  Set background color to Red.
    //             Ps = 1 0 2  ⇒  Set background color to Green.
    //             Ps = 1 0 3  ⇒  Set background color to Yellow.
    //             Ps = 1 0 4  ⇒  Set background color to Blue.
    //             Ps = 1 0 5  ⇒  Set background color to Magenta.
    //             Ps = 1 0 6  ⇒  Set background color to Cyan.
    //             Ps = 1 0 7  ⇒  Set background color to White.
    //
    //           If xterm is compiled with the 16-color support disabled, it
    //           supports the following, from rxvt:
    //             Ps = 1 0 0  ⇒  Set foreground and background color to
    //           default.
    //
    //           XTerm maintains a color palette whose entries are identified
    //           by an index beginning with zero.  If 88- or 256-color support
    //           is compiled, the following apply:
    //           o   All parameters are decimal integers.
    //           o   RGB values range from zero (0) to 255.
    //           o   ISO-8613-6 has been interpreted in more than one way;
    //               xterm allows the semicolons separating the subparameters
    //               in this control to be replaced by colons (but after the
    //               first colon, colons must be used).
    //
    //           These ISO-8613-6 controls (marked in ECMA-48 5th edition as
    //           "reserved for future standardization") are supported by xterm:
    //             Pm = 3 8 ; 2 ; Pi ; Pr ; Pg ; Pb ⇒  Set foreground color
    //           using RGB values.  If xterm is not compiled with direct-color
    //           support, it uses the closest match in its palette for the
    //           given RGB Pr/Pg/Pb.  The color space identifier Pi is ignored.
    //             Pm = 3 8 ; 5 ; Ps ⇒  Set foreground color to Ps, using
    //           indexed color.
    //             Pm = 4 8 ; 2 ; Pi ; Pr ; Pg ; Pb ⇒  Set background color
    //           using RGB values.  If xterm is not compiled with direct-color
    //           support, it uses the closest match in its palette for the
    //           given RGB Pr/Pg/Pb.  The color space identifier Pi is ignored.
    //             Pm = 4 8 ; 5 ; Ps ⇒  Set background color to Ps, using
    //           indexed color.
    //
    //           This variation on ISO-8613-6 is supported for compatibility
    //           with KDE konsole:
    //             Pm = 3 8 ; 2 ; Pr ; Pg ; Pb ⇒  Set foreground color using
    //           RGB values.  If xterm is not compiled with direct-color sup-
    //           port, it uses the closest match in its palette for the given
    //           RGB Pr/Pg/Pb.
    //             Pm = 4 8 ; 2 ; Pr ; Pg ; Pb ⇒  Set background color using
    //           RGB values.  If xterm is not compiled with direct-color sup-
    //           port, it uses the closest match in its palette for the given
    //           RGB Pr/Pg/Pb.
    //
    //           In each case, if xterm is compiled with direct-color support,
    //           and the resource directColor is true, then rather than choos-
    //           ing the closest match, xterm asks the X server to directly
    //           render a given color.
    charAttrs(params) {

        if (typeof params === 'object') {

            let len = params.length
                , i = 0;

            for (; i < len; i++) {
                if (!!this.customColorMode) {
                    let color,
                        name = '';
                    if (params[i] === 2) {
                        name += parseInt(params[i + 1]).toString(16);
                        name += parseInt(params[i + 2]).toString(16);
                        name += parseInt(params[i + 3]).toString(16);
                        color = "rgba(" + params[i + 1] + "," + params[i + 2] + "," + params[i + 3] + ", 0.99)";
                    } else if (params[i] === 5) {
                        color = PALETTE[params[i + 1]];
                        name = color.substring(1);
                        color = Utils.parseColor(color, 0.99);
                    }

                    if (this.customColorMode === 38) {
                        // 38;5;2m
                        // 38;2;100;100;100m
                        // this.color = color;
                        let className = 'custom-color-' + name;
                        this.charAttrClasses['color'] = className;

                        this.t.updateCSS(
                            '.' + className + '{color:' + color + ';}' +
                            '.' + className + '::selection{color:' + this.t.bgColor + ';background-color:' + color + ';}' +
                            '.' + className + '::-moz-selection{color:' + this.t.bgColor + ';background-color:' + color + ';}' +
                            '.' + className + '::-webkit-selection{color:' + this.t.bgColor + ';background-color:' + color + ';}',
                            '_style_ansi_color_sel_' + name);

                    } else if (this.customColorMode === 48) {
                        // 48;5;2m
                        // 48;2;100;100;100m
                        // this.bgColor = color;
                        let className = 'custom-bg-color-' + name;
                        this.charAttrClasses['color'] = className;

                        this.t.updateCSS(
                            '.' + className + '{background-color:' + color + ';}' +
                            '.' + className + '::selection{color:' + color + ';background-color:' + this.t.color + ';}' +
                            '.' + className + '::-moz-selection{color:' + color + ';background-color:' + this.t.color + ';}' +
                            '.' + className + '::-webkit-selection{color:' + color + ';background-color:' + this.t.color + ';}',
                            '_style_ansi_color_bg_sel_' + name);
                    }
                    this.charAttrClass = Object.values(this.charAttrClasses).join(' ');
                    delete this.customColorMode;
                    break;
                }
                this.charAttrs(params[i]);
            }

        }

        switch (params) {
            case 0:
                this.charAttrClasses = {};
                this.charAttrClass = '';
                this.color = null;
                this.bgColor = null;
                break;

            case 21:
                delete this.charAttrClasses['bold'];
                break;
            case 22:
                delete this.charAttrClasses['bold'];
                delete this.charAttrClasses['faint'];
                break;
            case 23:
                delete this.charAttrClasses['italic'];
                break;
            case 24:
                delete this.charAttrClasses['underlined'];
                break;
            case 25:
                delete this.charAttrClasses['slow-blink'];
                break;
            case 26:
                delete this.charAttrClasses['rapid-blink'];
                break;
            case 27:
                delete this.charAttrClasses['inverse'];
                break;
            case 28:
                delete this.charAttrClasses['invisible'];
                break;
            case 29:
                delete this.charAttrClasses['crossed-out'];
                break;
            case 38:
                // 38;5;2m
                // 38;2;100;100;100m
                this.customColorMode = params;
                break;
            case 39:
                // 默认颜色
                break;
            case 48:
                // 48;5;2m
                // 48;2;100;100;100m
                this.customColorMode = params;
                break;
            case 49:
                // 默认颜色
                break;
            default:
                // 1 - 9
                if (1 <= params && params <= 9) {
                    let className = SGR[params];
                    if (!!className) this.charAttrClasses[className] = className;

                    if (params === 1
                        && this.t.preferences.colors.palette.showBoldTextInBrightColors) {
                        // 以亮色显示粗体文本
                        if (this.charAttrClasses['bold'] && this.charAttrClasses['color']) {
                            this.charAttrClasses['color'] = 'bright-' + this.charAttrClasses['color'];
                        }
                    }

                } else if ((30 <= params && params <= 37) || (90 <= params && params <= 97)) {
                    // 30 - 37
                    // 90 - 97
                    // 如果使用ansi颜色，才添加到属性对象中
                    let className = SGR[params];

                    if (this.charAttrClasses['bold']
                        && (30 <= params && params <= 37)
                        && this.t.preferences.colors.palette.showBoldTextInBrightColors) {
                        // 以亮色显示粗体文本
                        this.charAttrClasses['color'] = 'bright-' + className;
                    } else {
                        if (!!className) this.charAttrClasses['color'] = className;
                    }

                } else if ((40 <= params && params <= 47) || (100 <= params && params <= 107)) {
                    // 40 - 47
                    // 100 - 107
                    // 如果使用ansi颜色，才添加到属性对象中
                    let className = SGR[params];
                    if (!!className) this.charAttrClasses['backgroundColor'] = className + '2';

                } else {
                    //
                }

                this.charAttrClass = Object.values(this.charAttrClasses).join(' ');

        }


    }

    /**
     * 禁用修饰键的选项
     * @param params
     */
    // States.CSI > Pm n
    //           Disable key modifier options, xterm.  These modifiers may be
    //           enabled via the States.CSI > Pm m sequence.  This control sequence
    //           corresponds to a resource value of "-1", which cannot be set
    //           with the other sequence.
    //
    //           The parameter identifies the resource to be disabled:
    //
    //             Ps = 0  ⇒  modifyKeyboard.
    //             Ps = 1  ⇒  modifyCursorKeys.
    //             Ps = 2  ⇒  modifyFunctionKeys.
    //             Ps = 4  ⇒  modifyOtherKeys.
    //
    //           If the parameter is omitted, modifyFunctionKeys is disabled.
    //           When modifyFunctionKeys is disabled, xterm uses the modifier
    //           keys to make an extended sequence of function keys rather than
    //           adding a parameter to each function key to denote the modi-
    //           fiers.
    disableKeyModifierOptions(params) {

    }

    /**
     * 设备状态报告
     * @param params
     * @param isDEC
     */
    // States.CSI ? Ps n
    //           Device Status Report (DSR, DEC-specific).
    //             Ps = 6  ⇒  Report Cursor Position (DECXCPR).  The response
    //           [row;column] is returned as
    //           States.CSI ? r ; c R
    //           (assumes the default page, i.e., "1").
    //             Ps = 1 5  ⇒  Report Printer status.  The response is
    //           States.CSI ? 1 0 n  (ready).  or
    //           States.CSI ? 1 1 n  (not ready).
    //             Ps = 2 5  ⇒  Report UDK status.  The response is
    //           States.CSI ? 2 0 n  (unlocked)
    //           or
    //           States.CSI ? 2 1 n  (locked).
    //             Ps = 2 6  ⇒  Report Keyboard status.  The response is
    //           States.CSI ? 2 7 ; 1 ; 0 ; 0 n  (North American).
    //
    //           The last two parameters apply to VT300 & up (keyboard ready)
    //           and VT400 & up (LK01) respectively.
    //
    //             Ps = 5 3  ⇒  Report Locator status.  The response is States.CSI ? 5
    //           3 n  Locator available, if compiled-in, or States.CSI ? 5 0 n  No
    //           Locator, if not.
    //             Ps = 5 5  ⇒  Report Locator status.  The response is States.CSI ? 5
    //           3 n  Locator available, if compiled-in, or States.CSI ? 5 0 n  No
    //           Locator, if not.
    //             Ps = 5 6  ⇒  Report Locator type.  The response is States.CSI ? 5 7
    //           ; 1 n  Mouse, if compiled-in, or States.CSI ? 5 7 ; 0 n  Cannot iden-
    //           tify, if not.
    //             Ps = 6 2  ⇒  Report macro space (DECMSR).  The response is
    //           States.CSI Pn *  { .
    //             Ps = 6 3  ⇒  Report memory checksum (DECCKSR).  The response
    //           is States.DCS Pt ! x x x x ST .
    //               Pt is the request id (from an optional parameter to the
    //           request).
    //               The x's are hexadecimal digits 0-9 and A-F.
    //             Ps = 7 5  ⇒  Report data integrity.  The response is States.CSI ? 7
    //           0 n  (ready, no errors).
    //             Ps = 8 5  ⇒  Report multi-session configuration.  The
    //           response is States.CSI ? 8 3 n  (not configured for multiple-session
    //           operation).
    // States.CSI Ps n  Device Status Report (DSR).
    //             Ps = 5  ⇒  Status Report.
    //           Result ("OK") is States.CSI 0 n
    //             Ps = 6  ⇒  Report Cursor Position (CPR) [row;column].
    //           Result is States.CSI r ; c R
    //
    //           Note: it is possible for this sequence to be sent by a func-
    //           tion key.  For example, with the default keyboard configura-
    //           tion the shifted F1 key may send (with shift-, control-, alt-
    //           modifiers)
    //
    //             States.CSI 1 ; 2  R , or
    //             States.CSI 1 ; 5  R , or
    //             States.CSI 1 ; 6  R , etc.
    //
    //           The second parameter encodes the modifiers; values range from
    //           2 to 16.  See the section PC-Style Function Keys for the
    //           codes.  The modifyFunctionKeys and modifyKeyboard resources
    //           can change the form of the string sent from the modified F1
    //           key.
    deviceStatusReport(params, isDEC) {

    }

    /**
     * 设置光标模式
     * @param params
     */
    // States.CSI > Ps p
    //           Set resource value pointerMode.  This is used by xterm to
    //           decide whether to hide the pointer cursor as the user types.
    //
    //           Valid values for the parameter:
    //             Ps = 0  ⇒  never hide the pointer.
    //             Ps = 1  ⇒  hide if the mouse tracking mode is not enabled.
    //             Ps = 2  ⇒  always hide the pointer, except when leaving the
    //           window.
    //             Ps = 3  ⇒  always hide the pointer, even if leaving/entering
    //           the window.
    //
    //           If no parameter is given, xterm uses the default, which is 1 .
    setPointerMode(params) {

    }

    /**
     * 重置软终端
     */
    // States.CSI ! p   Soft terminal reset (DECSTR), VT220 and up.
    // http://vt100.net/docs/vt220-rm/table4-10.html
    resetSoftTerminal() {
        this.p.showCursor();
        this.originMode = false;
        this.autoWrap = false;
        this.t.applicationKeypad = false;
        this.applicationCursor = false;
        this.p.scrollTop = 1;
        this.p.scrollBottom = this.t.rows;
        this.p.charset = null;
        this.p.x = 1;   // ?
        this.p.y = 1;   // ?
        this.p.gcharset = null; // ?
        this.p.glevel = 0; // ?
        this.p.charsets = [null];
    }

    /**
     * 设置一致性级别
     * @param params
     */
    // States.CSI Pl ; Pc " p
    //           Set conformance level (DECSCL), VT220 and up.
    //
    //           The first parameter selects the conformance level.  Valid val-
    //           ues are:
    //             Pl = 6 1  ⇒  level 1, e.g., VT100.
    //             Pl = 6 2  ⇒  level 2, e.g., VT200.
    //             Pl = 6 3  ⇒  level 3, e.g., VT300.
    //             Pl = 6 4  ⇒  level 4, e.g., VT400.
    //             Pl = 6 5  ⇒  level 5, e.g., VT500.
    //
    //           The second parameter selects the C1 control transmission mode.
    //           This is an optional parameter, ignored in conformance level 1.
    //           Valid values are:
    //             Pc = 0  ⇒  8-bit controls.
    //             Pc = 1  ⇒  7-bit controls (DEC factory default).
    //             Pc = 2  ⇒  8-bit controls.
    //
    //           The 7-bit and 8-bit control modes can also be set by S7C1T and
    //           S8C1T, but DECSCL is preferred.
    setConformanceLevel(params) {
        let [pl, pc] = params;
        console.info(`setConformanceLevel: pl=${pl}, pc=${pc}`);
    }

    /**
     * 请求ANSI模式
     * @param params
     * @param isDEC
     */
    // States.CSI Ps $ p
    //           Request ANSI mode (DECRQM).  For VT300 and up, reply DECRStates.PM is
    //             States.CSI Ps; Pm$ y
    //           where Ps is the mode number as in SM/RM, and Pm is the mode
    //           value:
    //             0 - not recognized
    //             1 - set
    //             2 - reset
    //             3 - permanently set
    //             4 - permanently reset
    // States.CSI ? Ps $ p
    //           Request DEC private mode (DECRQM).  For VT300 and up, reply
    //           DECRStates.PM is
    //             States.CSI ? Ps; Pm$ y
    //           where Ps is the mode number as in DECSET/DECSET, Pm is the
    //           mode value as in the ANSI DECRQM.
    //           Two private modes are read-only (i.e., 1 3  and 1 4 ), pro-
    //           vided only for reporting their values using this control
    //           sequence.  They correspond to the resources cursorBlink and
    //           cursorBlinkXOR.
    requestANSIMode(params, isDEC) {

    }

    /**
     * 将video属性推送到堆栈上
     * @param params
     */
    // States.CSI # p
    // States.CSI Pm # p
    //           Push video attributes onto stack (XTPUSHSGR), xterm.  This is
    //           an alias for States.CSI # { , used to work around language limitations of C#.
    pushVideoAttrsOntoStack(params) {

    }


    /**
     * 加载LED
     * @param params
     */
    // States.CSI Ps q  Load LEDs (DECLL), VT100.
    //             Ps = 0  ⇒  Clear all LEDS (default).
    //             Ps = 1  ⇒  Light Num Lock.
    //             Ps = 2  ⇒  Light Caps Lock.
    //             Ps = 3  ⇒  Light Scroll Lock.
    //             Ps = 2 1  ⇒  Extinguish Num Lock.
    //             Ps = 2 2  ⇒  Extinguish Caps Lock.
    //             Ps = 2 3  ⇒  Extinguish Scroll Lock.
    loadLEDs(params) {

    }

    /**
     * 设置光标的样式
     * @param params
     */
    // States.CSI Ps SP q
    //           Set cursor style (DECSCUSR), VT520.
    //             Ps = 0  ⇒  blinking block.
    //             Ps = 1  ⇒  blinking block (default).
    //             Ps = 2  ⇒  steady block.
    //             Ps = 3  ⇒  blinking underline.
    //             Ps = 4  ⇒  steady underline.
    //             Ps = 5  ⇒  blinking bar, xterm.
    //             Ps = 6  ⇒  steady bar, xterm.
    setCursorStyle(params) {

    }


    /**
     * 选择字符保护属性
     * @param params
     */
    // States.CSI Ps " q
    //           Select character protection attribute (DECSCA).  Valid values
    //           for the parameter:
    //             Ps = 0  ⇒  DECSED and DECSEL can erase (default).
    //             Ps = 1  ⇒  DECSED and DECSEL cannot erase.
    //             Ps = 2  ⇒  DECSED and DECSEL can erase.
    selectCharProtectionAttr(params) {

    }

    /**
     * 从堆栈弹出Video属性
     */
    // States.CSI # q   Pop video attributes from stack (XTPOPSGR), xterm.  This is an
    //           alias for States.CSI # } , used to work around language limitations
    //           of C#.
    popVideoAttrsFromStack() {

    }

    /**
     * 重置专用模式
     * @param params
     */
    // States.CSI ? Pm r
    //           Restore DEC Private Mode Values.  The value of Ps previously
    //           saved is restored.  Ps values are the same as for DECSET.
    restoreDECPrivateMode(params) {

    }


    /**
     * 更改矩形区域中的属性
     * @param params
     */
    // States.CSI Pt ; Pl ; Pb ; Pr ; Ps $ r
    //           Change Attributes in Rectangular Area (DECCARA), VT400 and up.
    //             Pt ; Pl ; Pb ; Pr denotes the rectangle.
    //             Ps denotes the SGR attributes to change: 0, 1, 4, 5, 7.
    changeAttrsInRectangularArea(params) {

    }

    /**
     * 设置滚动区域
     * @param params
     */
    // States.CSI Ps ; Ps r
    //           Set Scrolling Region [top;bottom] (default = full size of win-
    //           dow) (DECSTBM), VT100.
    setScrollingRegion(params) {
        const [top, bottom] = params;
        this.p.scrollTop = top;
        this.p.scrollBottom = bottom;
    }

    /**
     * 保存专用模式
     * @param params
     */
    // States.CSI ? Pm s
    //           Save DEC Private Mode Values.  Ps values are the same as for
    //           DECSET.
    saveDECPrivateMode(params) {

    }

    /**
     * 设置margins
     * @param params
     */
    // States.CSI Pl ; Pr s
    //           Set left and right margins (DECSLRM), VT420 and up.  This is
    //           available only when DECLRMM is enabled.
    setMargins(params) {
        const [pl, pr] = params;
        console.info(`pl: ${pl}, pr: ${pr}`);
    }

    /**
     * 窗口操作
     * @param params
     */
    // States.CSI Ps ; Ps ; Ps t
    //           Window manipulation (from dtterm, as well as extensions by
    //           xterm).  These controls may be disabled using the allowWin-
    //           dowOps resource.
    //
    //           xterm uses Extended Window Manager Hints (EWMH) to maximize
    //           the window.  Some window managers have incomplete support for
    //           EWMH.  For instance, fvwm, flwm and quartz-wm advertise sup-
    //           port for maximizing windows horizontally or vertically, but in
    //           fact equate those to the maximize operation.
    //
    //           Valid values for the first (and any additional parameters)
    //           are:
    //             Ps = 1  ⇒  De-iconify window.
    //             Ps = 2  ⇒  Iconify window.
    //             Ps = 3 ;  x ;  y ⇒  Move window to [x, y].
    //             Ps = 4 ;  height ;  width ⇒  Resize the xterm window to
    //           given height and width in pixels.  Omitted parameters reuse
    //           the current height or width.  Zero parameters use the dis-
    //           play's height or width.
    //             Ps = 5  ⇒  Raise the xterm window to the front of the stack-
    //           ing order.
    //             Ps = 6  ⇒  Lower the xterm window to the bottom of the
    //           stacking order.
    //             Ps = 7  ⇒  Refresh the xterm window.
    //             Ps = 8 ;  height ;  width ⇒  Resize the text area to given
    //           height and width in characters.  Omitted parameters reuse the
    //           current height or width.  Zero parameters use the display's
    //           height or width.
    //             Ps = 9 ;  0  ⇒  Restore maximized window.
    //             Ps = 9 ;  1  ⇒  Maximize window (i.e., resize to screen
    //           size).
    //             Ps = 9 ;  2  ⇒  Maximize window vertically.
    //             Ps = 9 ;  3  ⇒  Maximize window horizontally.
    //             Ps = 1 0 ;  0  ⇒  Undo full-screen mode.
    //             Ps = 1 0 ;  1  ⇒  Change to full-screen.
    //             Ps = 1 0 ;  2  ⇒  Toggle full-screen.
    //             Ps = 1 1  ⇒  Report xterm window state.
    //           If the xterm window is non-iconified, it returns States.CSI 1 t .
    //           If the xterm window is iconified, it returns States.CSI 2 t .
    //             Ps = 1 3  ⇒  Report xterm window position.
    //           Note: X Toolkit positions can be negative, but the reported
    //           values are unsigned, in the range 0-65535.  Negative values
    //           correspond to 32768-65535.
    //           Result is States.CSI 3 ; x ; y t
    //             Ps = 1 3 ;  2  ⇒  Report xterm text-area position.
    //           Result is States.CSI 3 ; x ; y t
    //             Ps = 1 4  ⇒  Report xterm text area size in pixels.
    //           Result is States.CSI  4 ;  height ;  width t
    //             Ps = 1 4 ;  2  ⇒  Report xterm window size in pixels.
    //           Normally xterm's window is larger than its text area, since it
    //           includes the frame (or decoration) applied by the window man-
    //           ager, as well as the area used by a scroll-bar.
    //           Result is States.CSI  4 ;  height ;  width t
    //             Ps = 1 5  ⇒  Report size of the screen in pixels.
    //           Result is States.CSI  5 ;  height ;  width t
    //             Ps = 1 6  ⇒  Report xterm character cell size in pixels.
    //           Result is States.CSI  6 ;  height ;  width t
    //             Ps = 1 8  ⇒  Report the size of the text area in characters.
    //           Result is States.CSI  8 ;  height ;  width t
    //             Ps = 1 9  ⇒  Report the size of the screen in characters.
    //           Result is States.CSI  9 ;  height ;  width t
    //             Ps = 2 0  ⇒  Report xterm window's icon label.
    //           Result is States.OSC  L  label ST
    //             Ps = 2 1  ⇒  Report xterm window's title.
    //           Result is States.OSC  l  label ST
    //             Ps = 2 2 ; 0  ⇒  Save xterm icon and window title on stack.
    //             Ps = 2 2 ; 1  ⇒  Save xterm icon title on stack.
    //             Ps = 2 2 ; 2  ⇒  Save xterm window title on stack.
    //             Ps = 2 3 ; 0  ⇒  Restore xterm icon and window title from
    //           stack.
    //             Ps = 2 3 ; 1  ⇒  Restore xterm icon title from stack.
    //             Ps = 2 3 ; 2  ⇒  Restore xterm window title from stack.
    //             Ps >= 2 4  ⇒  Resize to Ps lines (DECSLPP), VT340 and VT420.
    //           xterm adapts this by resizing its window.
    windowManipulation(params) {

    }

    /**
     * 设置标题模式
     * @param params
     */
    // States.CSI > Pm t
    //           This xterm control sets one or more features of the title
    //           modes.  Each parameter enables a single feature.
    //             Ps = 0  ⇒  Set window/icon labels using hexadecimal.
    //             Ps = 1  ⇒  Query window/icon labels using hexadecimal.
    //             Ps = 2  ⇒  Set window/icon labels using UTF-8.
    //             Ps = 3  ⇒  Query window/icon labels using UTF-8.  (See dis-
    //           cussion of Title Modes)
    setTitleModeFeatures(params) {

    }

    /**
     * 设置响铃音量
     * @param params
     */
    // States.CSI Ps SP t
    //           Set warning-bell volume (DECSWBV), VT520.
    //             Ps = 0  or 1  ⇒  off.
    //             Ps = 2 , 3  or 4  ⇒  low.
    //             Ps = 5 , 6 , 7 , or 8  ⇒  high.
    setWarningBellVolume(params) {
        switch (params[0]) {
            case 0:
            case 1:
                this.warningBellVolume = 0;
                break;
            case 2:
            case 3:
            case 4:
                this.warningBellVolume = 1;
                break;
            case 5:
            case 6:
            case 7:
            case 8:
                this.warningBellVolume = 2;
                break;
        }
    }

    /**
     * 矩形区域中的反转属性
     * @param params
     */
    reverseAttrsInRectArea(params) {

    }

    /**
     * 复制矩形区域
     * @param params
     */
    // States.CSI Pt ; Pl ; Pb ; Pr ; Pp ; Pt ; Pl ; Pp $ v
    //           Copy Rectangular Area (DECCRA), VT400 and up.
    //             Pt ; Pl ; Pb ; Pr denotes the rectangle.
    //             Pp denotes the source page.
    //             Pt ; Pl denotes the target location.
    //             Pp denotes the target page.
    copyRectangularArea(params) {

    }

    /**
     * 启用筛选矩形
     * @param params
     */
    // States.CSI Pt ; Pl ; Pb ; Pr ' w
    //           Enable Filter Rectangle (DECEFR), VT420 and up.
    //           Parameters are [top;left;bottom;right].
    //           Defines the coordinates of a filter rectangle and activates
    //           it.  Anytime the locator is detected outside of the filter
    //           rectangle, an outside rectangle event is generated and the
    //           rectangle is disabled.  Filter rectangles are always treated
    //           as "one-shot" events.  Any parameters that are omitted default
    //           to the current locator position.  If all parameters are omit-
    //           ted, any locator motion will be reported.  DECELR always can-
    //           cels any prevous rectangle definition.
    enableFilterRectangle(params) {

    }

    /**
     * 请求呈现状态报告
     * @param params
     */
    // States.CSI Ps $ w
    //           Request presentation state report (DECRQPSR), VT320 and up.
    //             Ps = 0  ⇒  error.
    //             Ps = 1  ⇒  cursor information report (DECCIR).
    //           Response is
    //             States.DCS 1 $ u Pt ST
    //           Refer to the VT420 programming manual, which requires six
    //           pages to document the data string Pt,
    //             Ps = 2  ⇒  tab stop report (DECTABSR).
    //           Response is
    //             States.DCS 2 $ u Pt ST
    //           The data string Pt is a list of the tab-stops, separated by
    //           "/" characters.
    requestPresentationStateReport(params) {

    }

    /**
     * 选择属性更改范围
     * @param params
     */
    // States.CSI Ps * x
    //           Select Attribute Change Extent (DECSACE), VT420 and up.
    //             Ps = 0  ⇒  from start to end position, wrapped.
    //             Ps = 1  ⇒  from start to end position, wrapped.
    //             Ps = 2  ⇒  rectangle (exact).
    selectAttrChangeExtent(params) {
    }

    /**
     * 填充矩形区域
     * @param params
     */
    // States.CSI Pc ; Pt ; Pl ; Pb ; Pr $ x
    //           Fill Rectangular Area (DECFRA), VT420 and up.
    //             Pc is the character to use.
    //             Pt ; Pl ; Pb ; Pr denotes the rectangle.
    fillRectArea(params) {

    }

    /**
     * 选择校验和扩展
     * @param params
     */
    // States.CSI Ps # y
    //           Select checksum extension (XTCHECKSUM), xterm.  The bits of Ps
    //           modify the calculation of the checksum returned by DECRQCRA:
    //             0  ⇒  do not negate the result.
    //             1  ⇒  do not report the VT100 video attributes.
    //             2  ⇒  do not omit checksum for blanks.
    //             3  ⇒  omit checksum for cells not explicitly initialized.
    //             4  ⇒  do not mask cell value to 8 bits or ignore combining
    //           characters.
    //             5  ⇒  do not mask cell value to 7 bits.
    selectChecksumExtension(params) {

    }

    /**
     * 请求矩形区域的校验和
     * @param params
     */
    // States.CSI Pi ; Pg ; Pt ; Pl ; Pb ; Pr * y
    //           Request Checksum of Rectangular Area (DECRQCRA), VT420 and up.
    //           Response is
    //           States.DCS Pi ! ~ x x x x ST
    //             Pi is the request id.
    //             Pg is the page number.
    //             Pt ; Pl ; Pb ; Pr denotes the rectangle.
    //             The x's are hexadecimal digits 0-9 and A-F.
    requestRectAreaChecksum(params) {
        const [requestId, pageNum, pt, pl, pb, pr] = params;
        console.info(`requestRectAreaChecksum, requestId=${requestId}`);
    }


    /**
     * 启用定位程序报告
     * @param params
     */
    // States.CSI Ps ; Pu ' z
    //           Enable Locator Reporting (DECELR).
    //           Valid values for the first parameter:
    //             Ps = 0  ⇒  Locator disabled (default).
    //             Ps = 1  ⇒  Locator enabled.
    //             Ps = 2  ⇒  Locator enabled for one report, then disabled.
    //           The second parameter specifies the coordinate unit for locator
    //           reports.
    //           Valid values for the second parameter:
    //             Pu = 0  or omitted ⇒  default to character cells.
    //             Pu = 1  ⇐  device physical pixels.
    //             Pu = 2  ⇐  character cells.
    enableLocatorReporting(params) {
        const [ps, pu] = params;
        console.info(`enableLocatorReporting, pt=${ps}, pl=${pu}`);
    }

    /**
     * 抹除矩形区域
     * @param params
     */
    // States.CSI Pt ; Pl ; Pb ; Pr $ z
    //           Erase Rectangular Area (DECERA), VT400 and up.
    //             Pt ; Pl ; Pb ; Pr denotes the rectangle.
    eraseRectArea(params) {
        const [pt, pl, pb, pr] = params;
        console.info(`eraseRectArea, pt=${pt}, pl=${pl}, pb=${pb}, pr=${pr}`);
    }

    /**
     * 选择定位程序事件
     * @param params
     */
    // States.CSI Pm ' {
    //           Select Locator Events (DECSLE).
    //           Valid values for the first (and any additional parameters)
    //           are:
    //             Ps = 0  ⇒  only respond to explicit host requests (DECRQLP).
    //           This is default.  It also cancels any filter rectangle.
    //             Ps = 1  ⇒  report button down transitions.
    //             Ps = 2  ⇒  do not report button down transitions.
    //             Ps = 3  ⇒  report button up transitions.
    //             Ps = 4  ⇒  do not report button up transitions.
    selectLocatorEvents(params) {

    }

    /**
     * 选择性抹除矩阵区域
     * @param params
     */
    // States.CSI Pt ; Pl ; Pb ; Pr $ {
    //           Selective Erase Rectangular Area (DECSERA), VT400 and up.
    //             Pt ; Pl ; Pb ; Pr denotes the rectangle.
    selectEraseRectArea(params) {
        const [pt, pl, pb, pr] = params;
        console.info(`selectEraseRectArea, pt=${pt}, pl=${pl}, pb=${pb}, pr=${pr}`);
    }

    /**
     * 报告选定的图形格式副本
     * @param params
     */
    // States.CSI Pt ; Pl ; Pb ; Pr # |
    //           Report selected graphic rendition (XTREPORTSGR), xterm.  The
    //           response is an SGR sequence which contains the attributes
    //           which are common to all cells in a rectangle.
    //             Pt ; Pl ; Pb ; Pr denotes the rectangle.
    reportSelectedGraphicRendition(params) {

    }

    /**
     * 每页选择列
     * @param params
     */
    // States.CSI Ps $ |
    //           Select columns per page (DECSCPP), VT340.
    //             Ps = 0  ⇒  80 columns, default if Ps omitted.
    //             Ps = 8 0  ⇒  80 columns.
    //             Ps = 1 3 2  ⇒  132 columns.
    selectColumnsPerPage(params) {

    }

    /**
     * 请求定位器位置
     * @param params
     */
    // States.CSI Ps ' |
    //           Request Locator Position (DECRQLP).
    //           Valid values for the parameter are:
    //             Ps = 0 , 1 or omitted ⇒  transmit a single DECLRP locator
    //           report.
    //
    //           If Locator Reporting has been enabled by a DECELR, xterm will
    //           respond with a DECLRP Locator Report.  This report is also
    //           generated on button up and down events if they have been
    //           enabled with a DECSLE, or when the locator is detected outside
    //           of a filter rectangle, if filter rectangles have been enabled
    //           with a DECEFR.
    //
    //             ⇐  States.CSI Pe ; Pb ; Pr ; Pc ; Pp &  w
    //
    //           Parameters are [event;button;row;column;page].
    //           Valid values for the event:
    //             Pe = 0  ⇐  locator unavailable - no other parameters sent.
    //             Pe = 1  ⇐  request - xterm received a DECRQLP.
    //             Pe = 2  ⇐  left button down.
    //             Pe = 3  ⇐  left button up.
    //             Pe = 4  ⇐  middle button down.
    //             Pe = 5  ⇐  middle button up.
    //             Pe = 6  ⇐  right button down.
    //             Pe = 7  ⇐  right button up.
    //             Pe = 8  ⇐  M4 button down.
    //             Pe = 9  ⇐  M4 button up.
    //             Pe = 1 0  ⇐  locator outside filter rectangle.
    //           The "button" parameter is a bitmask indicating which buttons
    //           are pressed:
    //             Pb = 0  ⇐  no buttons down.
    //             Pb & 1  ⇐  right button down.
    //             Pb & 2  ⇐  middle button down.
    //             Pb & 4  ⇐  left button down.
    //             Pb & 8  ⇐  M4 button down.
    //           The "row" and "column" parameters are the coordinates of the
    //           locator position in the xterm window, encoded as ASCII deci-
    //           mal.
    //           The "page" parameter is not used by xterm.
    requestLocatorPosition(params) {

    }

    /**
     * 选择每个屏幕的行数
     * @param params
     */
    // States.CSI Ps * |
    //           Select number of lines per screen (DECSNLS), VT420 and up.
    selectNumberOfLinesPerScreen(params) {

    }
}