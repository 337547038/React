/**
 * formSerialize 表单序列化
 * serialize(form)
 * serializeArray(form)
 * */
var formSerialize = {
    getValue: function (elements, type) {
        var arr = [], value = '';
        if (elements.length > 0) {
            for (var i = 0; i < elements.length; i++) {
                if (elements[i].checked) {
                    if (type == 'checkbox') {
                        arr.push(elements[i].value);
                    } else {
                        value = elements[i].value;
                        break;
                    }
                }
            }
            if (type == 'checkbox') {
                return arr.join(',');
            }
            else {
                return value;
            }
        }
        else {
            //只有一个时
            return elements.checked;
        }
    },
    getCommCheckRadio: function (fieldName, form, type, temp_arr, arr, cr) {
        if (temp_arr.indexOf(fieldName) == -1) {
            temp_arr.push(fieldName);
            var v = this.getValue(form.elements[fieldName], cr);
            type == 'array' ?
                arr.push({
                    name: fieldName,
                    value: v
                })
                :
                arr.push(fieldName + "=" + this.getValue(form.elements[fieldName], cr));
        }
    },
    comm: function (form, type) {
        var arr = new Array();
        var temp_arr = [];
        var elements = form.elements;
        for (var i = 0, len = elements.length; i < len; i++) {
            var field = elements[i];
            // 不发送禁用的表单字段
            if (field.disabled) {
                continue;
            }
            switch (field.type) {
                case undefined :
                case "button" :
                case "submit" :
                case "reset" :
                case "file" :
                    break;
                case "checkbox":
                    this.getCommCheckRadio(field.name, form, type, temp_arr, arr, 'checkbox');
                    break;
                case "radio" :
                    this.getCommCheckRadio(field.name, form, type, temp_arr, arr, 'radio');
                    break;
                /*var fieldName = field.name;
                 //判断arr里有没存在当前名字了，如果存在则跳过
                 if (temp_arr.indexOf(fieldName) == -1) {
                 temp_arr.push(fieldName);
                 type == 'array' ?
                 arr.push({[encodeURIComponent(fieldName)]: encodeURIComponent(this.getValue(form.elements[fieldName], 'radio'))})
                 :
                 arr.push(encodeURIComponent(fieldName) + "=" + encodeURIComponent(this.getValue(form.elements[fieldName], 'radio')));
                 }
                 break;*/
                default:
                    type == 'array' ?
                        arr.push({
                            name: field.name,
                            value: field.value
                        })
                        :
                        arr.push(field.name + "=" + field.value);
            }
        }
        if (type == 'array') {
            return arr
        }
        else {
            return arr.join('&')
        }
    },
    serialize: function (form) {
        return this.comm(form, 'string');
    },
    serializeArray: function (form) {
        return this.comm(form, 'array');
    }
};
module.exports = formSerialize;