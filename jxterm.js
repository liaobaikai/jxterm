/**
 * 终端引入文件
 */
(function () {

    const VERSION = '1.5.8';

    const files = [
        'public/utils',
        'parser',
        'csi-parser',
        'input',
        'event-handler',
        'terminal',
        'transceiver',
    ];

    const libs = [
    ];

    let selfFile, selfPath;
    for(let s of document.scripts){
        if(s.src.indexOf('jxterm.js') !== -1){
            selfFile = s.src;
            break;
        }
    }

    selfPath = selfFile.substring(0, selfFile.lastIndexOf('/'));

    let script = '';
    for (let file of files){
        script += `<script type="text/javascript" src="${selfPath}/src/${file}.js?version=${VERSION}"></script>`;
    }

    for (let lib of libs){
        script += `<script type="text/javascript" src="./libs/${lib}.js"></script>`;
    }

    if(!!script){
        document.write(script);
    }

}());