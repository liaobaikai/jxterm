/**
 * 终端引入文件
 */
(function () {

    const VERSION = '1.5.7';

    const files = [
        'public/utils',
        'parser',
        'input',
        'event-handler',
        'terminal',
        'transceiver',
    ];

    const libs = [
    ];


    let script = '';
    for (let file of files){
        script += `<script type="text/javascript" src="../src/${file}.js?version=${VERSION}"></script>`;
    }

    for (let lib of libs){
        script += `<script type="text/javascript" src="../libs/${lib}.js"></script>`;
    }

    if(!!script){
        document.write(script);
    }

}());