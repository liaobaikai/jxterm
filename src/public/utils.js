
// const Node = {
//     ELEMENT_NODE: 1,    // 一个 元素 节点，例如 <p> 和 <div>。
//     TEXT_NODE: 3,   // Element 或者 Attr 中实际的  文字
//     CDATA_SECTION_NODE: 4,  // 一个 CDATASection，例如 <!CDATA[[ … ]]>。
//     PROCESSING_INSTRUCTION_NODE: 7,  // 一个用于XML文档的 ProcessingInstruction ，例如 <?xml-stylesheet ... ?> 声明。
//     COMMENT_NODE: 8,    // 一个 Comment 节点。
//     DOCUMENT_NODE: 9,   // 一个 Document 节点。
//     DOCUMENT_TYPE_NODE: 10, // 描述文档类型的 DocumentType 节点。例如 <!DOCTYPE html>  就是用于 HTML5 的。
//     DOCUMENT_FRAGMENT_NODE: 11,     // 一个 DocumentFragment 节点
// };

class Utils {

    /**
     * 判断传入的值是否为空
     *
     * @param value
     */
    static isEmpty(value){

        // 数值
        if(typeof value === 'string'){
            return !!!value;
        } else if(typeof value === "undefined"){
            return true;
        } else if(typeof value === 'object'){
            // 对象 & 数组
            if(value instanceof Array){
                // 数组
                return !!!value.length;
            } else if(value instanceof Object){
                // 对象
                let flag = true;
                for(let key in value){
                    flag = false;
                    if(!flag){
                        break;
                    }
                }
                return flag;
            }

        } else if(typeof value === 'function' || typeof value === 'number' || typeof value === 'boolean'){
            return false;
        }

    }

    /**
     * 添加像素单位
     * @param d
     * @returns {string}
     */
    static px(d){
        return d + 'px';
    }

    /**
     * 获取字符串的长度
     * @param str
     */
    static strlen(str){

        let len = 0;
        for(let i = 0; i < str.length; i++){
            let chr = str[i];
            if(/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi.test(chr)){
                len += 2;
            } else {
                len += 1;
            }
        }

        return len;

    }

    /**
     * 简单的对象克隆
     */
    static clone(obj){
        let newObj = {};
        for(let key in obj){
            if(!obj.hasOwnProperty(key)) continue;
            newObj[key] = obj[key];
        }
        return newObj;
    }

    /**
     * 更新元素的class
     * @param element
     * @param classNames
     */
    static addClass(element, classNames){

        if(!element) return;

        let className = element.className;

        function update(name) {
            if(className.indexOf(name) === -1){
                className += ' ' + name;
                return true;
            }
        }

        if(typeof classNames === 'object'){
            for(let item of classNames)
                update(item);
        } else if(typeof classNames === 'string'){
            if(!update(classNames)){
                return;
            }
        }

        element.className = className.trim();

    }

    /**
     * 删除元素的class
     * @param element
     * @param classNames
     */
    static removeClass(element, classNames){

        if(!element) return;

        let className = element.className;

        function update(name) {
            if(className.indexOf(name) !== -1){
                className = className.replace(new RegExp(name, 'g'), '');
                return true;
            }

        }

        if(typeof classNames === 'object'){
            for(let item of classNames) update(item);
        } else if(typeof classNames === 'string'){
            if(!update(classNames)){
                return;
            }
        }

        element.className = className.trim();

    }

    /**
     * 判断是否含有某个class
     * @param element
     * @param classNames
     */
    static hasClass(element, classNames){

        if(!element) return;

        if(typeof classNames === 'string'){
            return element.className.indexOf(classNames) !== -1;
        } else if(typeof classNames === 'object'){
            return classNames.map((item) => element.className.indexOf(item) !== -1);
        }
    }

}