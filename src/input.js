
// https://en.wikipedia.org/wiki/ANSI_escape_code
// Terminal input sequences
// <char>                                -> char
// <esc> <nochar>                        -> esc
// <esc> <esc>                           -> esc
// <esc> <char>                          -> Alt-keypress or keycode sequence
// <esc> '[' <nochar>                    -> Alt-[
// <esc> '[' (<num>) (';'<num>) '~'      -> keycode sequence, <num> defaults to 1
//
// If the terminating character is '~', the first number must be present and is a
// keycode number, the second number is an optional modifier value. If the terminating
// character is a letter, the letter is the keycode value, and the optional number is
// the modifier value.
//
// The modifier value defaults to 1, and after subtracting 1 is a bitmap of modifier
// keys being pressed: <Meta><Ctrl><Alt><Shift>. So, for example, <esc>[4;2~ is
// Shift-End, <esc>[20~ is function key 9, <esc>[5C is Ctrl-Right.
//
// vt sequences:
// <esc>[1~    - Home        <esc>[16~   -             <esc>[31~   - F17
// <esc>[2~    - Insert      <esc>[17~   - F6          <esc>[32~   - F18
// <esc>[3~    - Delete      <esc>[18~   - F7          <esc>[33~   - F19
// <esc>[4~    - End         <esc>[19~   - F8          <esc>[34~   - F20
// <esc>[5~    - PgUp        <esc>[20~   - F9          <esc>[35~   -
// <esc>[6~    - PgDn        <esc>[21~   - F10
// <esc>[7~    - Home        <esc>[22~   -
// <esc>[8~    - End         <esc>[23~   - F11
// <esc>[9~    -             <esc>[24~   - F12
// <esc>[10~   - F0          <esc>[25~   - F13
// <esc>[11~   - F1          <esc>[26~   - F14
// <esc>[12~   - F2          <esc>[27~   -
// <esc>[13~   - F3          <esc>[28~   - F15
// <esc>[14~   - F4          <esc>[29~   - F16
// <esc>[15~   - F5          <esc>[30~   -
//
// xterm sequences:
// <esc>[A     - Up          <esc>[K     -             <esc>[U     -
// <esc>[B     - Down        <esc>[L     -             <esc>[V     -
// <esc>[C     - Right       <esc>[M     -             <esc>[W     -
// <esc>[D     - Left        <esc>[N     -             <esc>[X     -
// <esc>[E     -             <esc>[O     -             <esc>[Y     -
// <esc>[F     - End         <esc>[1P    - F1          <esc>[Z     -
// <esc>[G     - Keypad 5    <esc>[1Q    - F2
// <esc>[H     - Home        <esc>[1R    - F3
// <esc>[I     -             <esc>[1S    - F4
// <esc>[J     -             <esc>[T     -
//
// <esc>[A to <esc>[D are the same as the ANSI output sequences. The <num> is normally
// omitted if no modifier keys are pressed, but most implementations always emit the
// <num> for F1-F4.

/**
 * 键盘输入
 */
class Keyboard {

    constructor(){

        this.asciiTable = [];

        for(let i = 32; i < 127; i++)
            this.asciiTable[i] = String.fromCharCode(i);

        // 按键映射 [ normal, application mode, modifiers]
        this.mapKeys = {
            'Backspace': C0.BS,
            'Tab': C0.HT,
            'Enter': C0.CR,
            'Escape': C0.ESC,
            'PageUp': C0.ESC + '[5~',
            'PageDown': C0.ESC + '[6~',
            'End': [C0.ESC + '[F', C0.ESC + 'OF', C0.ESC + '[1;${modifiers + 1}F'],
            'Home': [C0.ESC + '[H', C0.ESC + 'OH', C0.ESC + '[1;${modifiers + 1}H'],
            'ArrowLeft': [C0.ESC + '[D', C0.ESC + 'OD', C0.ESC + '[1;${modifiers === 3 ? 5 : modifiers + 1}D'],
            'ArrowUp': [C0.ESC + '[A', C0.ESC + 'OA', C0.ESC + '[1;${modifiers === 3 ? 5 : modifiers + 1}A'],
            'ArrowRight': [C0.ESC + '[C', C0.ESC + 'OC', C0.ESC + '[1;${modifiers === 3 ? 5 : modifiers + 1}C'],
            'ArrowDown': [C0.ESC + '[B', C0.ESC + 'OB', C0.ESC + '[1;${modifiers === 3 ? 5 : modifiers + 1}B'],
            'Insert': C0.ESC + '[2~',
            'Delete': C0.ESC + '[3~',

            'F1': [C0.ESC + '[P~', undefined, C0.ESC + '[P;${modifiers + 1}~'],
            'F2': [C0.ESC + '[Q~', undefined, C0.ESC + '[Q;${modifiers + 1}~'],
            'F3': [C0.ESC + '[R~', undefined, C0.ESC + '[R;${modifiers + 1}~'],
            'F4': [C0.ESC + '[S~', undefined, C0.ESC + '[S;${modifiers + 1}~'],
            'F5': [C0.ESC + '[15~', undefined, C0.ESC + '[15;${modifiers + 1}~'],
            'F6': [C0.ESC + '[17~', undefined, C0.ESC + '[17;${modifiers + 1}~'],
            'F7': [C0.ESC + '[18~', undefined, C0.ESC + '[18;${modifiers + 1}~'],
            'F8': [C0.ESC + '[19~', undefined, C0.ESC + '[19;${modifiers + 1}~'],
            'F9': [C0.ESC + '[20~', undefined, C0.ESC + '[20;${modifiers + 1}~'],
            'F10': [C0.ESC + '[21~', undefined, C0.ESC + '[21;${modifiers + 1}~'],
            'F11': [C0.ESC + '[23~', undefined, C0.ESC + '[23;${modifiers + 1}~'],
            'F12': [C0.ESC + '[24~', undefined, C0.ESC + '[24;${modifiers + 1}~'],

        };

        // 组合键
        this.combinationKeys = {
            'CTRL+@': C0.NUL, // ctrl + shift
            'CTRL+A': C0.SOH,
            'CTRL+B': C0.STX,
            'CTRL+C': C0.ETX,
            'CTRL+D': C0.EOT,
            'CTRL+E': C0.ENQ,
            'CTRL+F': C0.ACK,
            'CTRL+G': C0.BEL,
            'CTRL+H': C0.BS,
            'CTRL+I': C0.HT,
            'CTRL+J': C0.LF,
            'CTRL+K': C0.VT,
            'CTRL+L': C0.FF,
            'CTRL+M': C0.CR,
            'CTRL+N': C0.SO,
            'CTRL+O': C0.SI,
            'CTRL+P': C0.DLE,
            'CTRL+Q': C0.DC1,
            'CTRL+R': C0.DC2,
            'CTRL+S': C0.DC3,
            'CTRL+T': C0.DC4,
            'CTRL+U': C0.NAK,
            'CTRL+V': C0.SYN,
            'CTRL+W': C0.ETB,
            'CTRL+X': C0.CAN,
            'CTRL+Y': C0.EM,
            'CTRL+Z': C0.SUB,
            'CTRL+[': C0.ESC,
            'CTRL+\\': C0.FS,
            'CTRL+]': C0.GS,
            'CTRL+^': C0.RS,  // ctrl + shift
            'CTRL+_': C0.US,  // ctrl + shift
            'CTRL+`': C0.SP,
            'CTRL+BACKSPACE': C0.DEL
        };

        // 不回显的按键
        this.disableEchoKeys = {
            'Cancel': 3,
            'Help': 6,
            'Clear': 12,
            'Shift': 16,
            'Control': 17,
            'Alt': 18,
            'Pause': 19,
            'CapsLock': 20,
            'Convert': 28,
            'NonConvert': 29,
            'Accept': 30,
            'ModeChange': 31,
            'Select': 41,
            'Print': 42,
            'Execute': 43,
            'PrintScreen': 44,
            'Insert': 45,
            'OS': 91,
            'ContextMenu': 93,
            'NumLock': 144,
            'ScrollLock': 145,
            'VolumeMute': 181,
            'VolumeDown': 182,
            'VolumeUp': 183,
            'Meta': 224,
            'AltGraph': 225,
            'Process': 229,
            'Attn': 246,
            'CrSel': 247,
            'ExSel': 248,
            'EraseEof': 249,
            'Play': 250,
            'ZoomOut': 251
        };

    }


    /**
     * 获取输入的按键
     * @param e
     * @param applicationMode 应用模式
     */
    getKeySym(e, applicationMode){

        // !!!<Meta><Ctrl><Alt><Shift>
        let modifiers = (e.shiftKey ? 1 : 0) | (e.altKey ? 2 : 0) | (e.ctrlKey ? 4 : 0) | (e.metaKey ? 8 : 0)  // 修饰键
            ,  keySym = this.mapKeys[e.key]  // 键码
            ,     key = e.key;          // 按键

        if(this.disableEchoKeys[key]) {
            console.info('disable echo key: ', key);
            return undefined;
        }

        if(e.which === 229){
            // 'Process': 229,
            // 手机端 e.which
            // d => 229
            // a => 229
            // t => 229
            // e => 229

            // date => \x08date

            return ;
        }

        if(modifiers > 0){

            if(keySym){

                if(typeof keySym === 'object'){

                    // 直接返回
                    return keySym[2].replace(/\${(.+?)}/, function(w){
                        return eval(w.substring(2, w.length - 1));
                    });

                } else if(typeof  keySym === 'string'){
                    return keySym;
                }

            } else {

                if(modifiers === 4){
                    // CTRL + A-Z
                    return this.combinationKeys['CTRL+' + key.toUpperCase()];
                } else if(modifiers === 5){
                    // CTRL + @
                    // CTRL + ^
                    // CTRL + _
                    return this.combinationKeys['CTRL+' + key.toUpperCase()];
                } else if(modifiers === 8){
                    // META
                    return undefined;
                }

                // keySym == undefined..
                return this.asciiTable.indexOf(key) !== -1 ? key : undefined;

            }


        } else if(applicationMode){

            // 程序模式

            if(keySym){

                if(typeof keySym === 'object'){

                    if(keySym[1]) return keySym[1];
                    else if(keySym[0]) return keySym[0];

                } else if(typeof  keySym === 'string'){
                    return keySym;
                }

            } else {

                // keySym == undefined..
                return this.asciiTable.indexOf(key) !== -1 ? key : undefined;
            }

        } else {

            // 普通模式

            if(keySym){

                if(typeof keySym === 'object'){
                    if(keySym[0]) return keySym[0];
                } else if(typeof  keySym === 'string'){
                    return keySym;
                }

            } else {
                // keySym == undefined..
                return this.asciiTable.indexOf(key) !== -1 ? key : undefined;
            }

        }

        return undefined;

    }

}


/**
 * 移动端键盘，只适用于ASCII
 */
class MobKeyboard {

    constructor(clipboard, terminal) {

        this.clipboard = clipboard;
        this.terminal = terminal;
        this.isCtrl = false;
        this.isAlt = false;
        this.isShift = false;

        this.mapper = [
            [
                {'Esc': 'Escape'},
                {'Tab': 'Tab'},
                {'Backspace': 'Backspace'},
            ],
            [
                {'Q': ['Q', 'q']},
                {'W': ['W', 'w']},
                {'E': ['E', 'e']},
                {'R': ['R', 'r']},
                {'T': ['T', 't']},
                {'Y': ['Y', 'y']},
                {'U': ['U', 'u']},
                {'I': ['I', 'i']},
                {'O': ['O', 'o']},
                {'P': ['P', 'p']},
            ],
            [
                {'A': ['A', 'a']},
                {'S': ['S', 's']},
                {'D': ['D', 'd']},
                {'F': ['F', 'f']},
                {'G': ['G', 'g']},
                {'H': ['H', 'h']},
                {'J': ['J', 'j']},
                {'K': ['K', 'k']},
                {'L': ['L', 'l']},
            ],
            [
                {'Shift': 'Shift'},
                {'Z': ['Z', 'z']},
                {'X': ['X', 'x']},
                {'C': ['C', 'c']},
                {'V': ['V', 'v']},
                {'B': ['B', 'b']},
                {'N': ['N', 'n']},
                {'M': ['M', 'm']},
                {'Enter': 'Enter'},
            ],
            [
                {'Ctrl': 'Ctrl'},
                {'Space': ' '},
                {'>': ['>', '.']},

            ]
        ];


    }


    /**
     * 初始化键盘
     */
    init() {

        // ctrl esc - / alt tab insert delete 原生键盘 ...

        let keyboard = document.createElement('div');
        keyboard.className = 'custom-keyboard';

        // esc
        // ` 1 2 3 4 5 6 7 8 9 0
        // tab q w e r t y u i o p
        //

        for(let row of this.mapper){

            let rowEl = document.createElement('div');
            rowEl.className = 'custom-keyboard-row';
            keyboard.appendChild(rowEl);

            for(let item of row){

                for(let k in item){

                    if(!item.hasOwnProperty(k)) continue;

                    let keyEl = document.createElement('span');
                    rowEl.appendChild(keyEl);

                    if(typeof item[k] === 'string'){
                        //
                        let key = item[k];
                        keyEl.id = terminal.id + '_key_' + key;
                        keyEl.className = 'custom-keyboard-row-ctrl key-' + k.toLowerCase();
                        keyEl.innerHTML = k;
                        keyEl.style.fontSize = '13px';

                        switch (k) {
                            case 'Shift':

                                // keyEl.innerHTML = '<img style="width: 18px; height: 18px" src="../assets/images/Shift.png"/>';
                                break;
                            case 'Tab':
                                // keyEl.innerHTML = '<img style="width: 18px; height: 18px" src="../assets/images/Tab.png"/>';
                                break;
                            case 'Backspace':
                                // keyEl.innerHTML = '<img style="width: 18px; height: 18px" src="../assets/images/Backspace.png"/>';
                                break;
                            case 'Esc':
                                break;
                            case 'Ctrl':
                                break;
                            case 'Space':
                                break;
                            case 'Enter':
                                // keyEl.innerHTML = '<img style="width: 18px; height: 18px" src="../assets/images/Enter.png"/>';
                                break;

                        }

                        keyEl.addEventListener('click', (e) => {

                            if(e.target.innerHTML === 'Shift'){

                                if(this.isShift){
                                    keyEl.className = keyEl.className.replace(/active/g, '').trim();
                                } else {
                                    keyEl.className = keyEl.className.replace(/active/g, 'active');
                                }

                                this.isShift = !this.isShift;
                            }

                            let ev = new KeyboardEvent('keydown', {
                                key: key,
                                shiftKey: this.isShift,
                                ctrlKey: this.isCtrl
                            });

                            this.clipboard.dispatchEvent(ev);
                        });


                    } else if(typeof item[k] === 'object'){

                        let key = item[k][1];
                        keyEl.innerHTML = key;
                        keyEl.className = 'custom-keyboard-row-key';

                        //
                        keyEl.id = terminal.id + '_key_' + key;

                        keyEl.addEventListener('click', (e) => {

                            let ev = new KeyboardEvent('keydown', {
                                key: key,
                                shiftKey: this.isShift,
                                ctrlKey: this.isCtrl
                            });

                            this.clipboard.dispatchEvent(ev);
                        });

                    }

                }

            }
        }

        terminal.container.appendChild(keyboard);

    }

}