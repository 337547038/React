/**
 * 表单组件
 *
 * @param [className] 样式
 * @param [data] 表单数据
 * @param [triggerType] 触发类型，1改变和失去焦点验证，2改变验证，3失去焦点验证，默认为1
 * @param [validate] true是否对数据进行验证，提交表单和表单控件事件
 * @param [validateShow] true是否在item项目里显示错误提示，validate为true时有效，即输入改变时不验证，仅在提交表单时返回验证结果
 *
 * 示例:
 *
 *     @example
 *     <Form data=[]/>
 */
var FormItem = require("./formItem");
var Input = require("../Input");
var Button = require("../Button");
var SelectDropDown = require("../SelectDropDown");
var Radio = require("../Radio");
var RadioGroup = Radio.RadioGroup;
var Textarea = require("../Textarea");
var Checkbox = require("../Checkbox");
var CheckboxGroup = Checkbox.Group;
var Serialize = require("./serialize");
var ValidateRules = require("./validateRules");
var classnames = require("classnames");
var FormGroup = React.createClass({
    getInitialState: function () {
        return {
            formId: this.props.id ? this.props.id : 'form' + Math.random().toString(36).substr(2, 5)//随机给取个表单名
        }
    },
    getDefaultProps: function () {
        return {
            formType: true,
            validate: true,//验证数据
            validateShow: true,
            triggerType: 1
        }
    },
    componentDidMount: function () {
    },
    _onChange: function (data, type, e) {
        //表单项改变时
        //SelectDropDown是返回的e为当前选中的值
        var bool = false;
        switch (this.props.triggerType.toString()) {
            case "1":
                bool = true;
                break;
            case "2":
                if (type == 'change') {
                    bool = true;
                }
                break;
            case "3":
                if (type == 'blur') {
                    bool = true;
                }
                break;
        }
        if (bool) {
            if (this.props.validateShow && this.props.validate) {
                var value = '';
                var name = '';
                if (typeof e === 'string') {
                    value = e;
                    name = data.control.name;
                } else {
                    value = e.target.value;
                    name = e.target.name;
                }
                this._validate(name, value);
            }
        }
        data.control.onChange ? data.control.onChange(e) : "";
        data.control.onBlur ? data.control.onBlur(e) : "";
    },
    _onFocus: function (data, e) {
        //获取焦点时，输入框的提示信息
        if (this.props.validateShow && this.props.validate && data.validate) {
            for (var i in data.validate) {
                if (data.validate[i].type === 'tips') {
                    //取当前的名字name
                    var item = this.refs['item' + data.control.name];
                    item.setTips(this.props.validateShow, 1, data.validate[i].msg);
                    break;
                }
            }
        }
        data.control.onFocus ? data.control.onFocus(e) : "";
    },
    /**
     * 表单序列化取值
     * @return [formValue,bool,errorTips]
     * */
    serialize: function (field) {
        //序列化取值，返回[序列化值,验证是否通过,错误提示]
        var form = ReactDOM.findDOMNode(this);
        var bool = true;
        var errorTip = [];
        var formValue = Serialize.serializeArray(form);
        if (field) {
            var getValue = function (input) {
                var value = '';
                if (input.length > 1) {
                    for (var i in input) {
                        if ((input[i].type === 'radio' || input[i].type === 'checkbox') && input[i].checked) {
                            value = input[i].value;
                        }
                    }
                } else {

                    //单选多选只有一个具没值时返回true false
                    if ((input[0].type === 'radio' || input[0].type === 'checkbox') && input[0].value == 'on') {
                        value = input[0].checked;
                    } else {
                        value = input[0].value;
                    }
                }
                return value;
            };
            //对指定字段验证
            for (var i = 0; i < field.length; i++) {
                var input = form.querySelectorAll('[name="' + field[i] + '"]');
                if (input.length > 0) {
                    //这里排除下有可能验证的字段不在表单中，输入错误或删除忘记去掉时
                    var value = getValue(input);
                    var b = this._validate(field[i], value);
                    if (b && b != -1) {
                        bool = false;
                        errorTip.push(b);//不通过
                    }
                }
            }
        } else {
            if (this.props.validate) {
                bool = true;
                for (var i = 0; i < formValue.length; i++) {
                    var b = this._validate(formValue[i].name, formValue[i].value);
                    if (b && b != -1) {
                        bool = false;
                        errorTip.push(b);//不通过
                    }
                }
            }
        }
        return [formValue, bool, errorTip];
    },
    _validate: function (name, value) {
        //验证数据
        //根据name取验证规则，返回空(通过) 不通过返回提示 -1时为异常
        var rules = '';
        if (this.refs[name] != undefined) {
            rules = this.refs[name].props.validate;
            if (rules) {
                var result = ValidateRules(value, rules);
                var item = this.refs['item' + name];
                if (result) {
                    //不通过
                    item.setTips(this.props.validateShow, 3, result);
                    return result;
                } else {
                    item.setTips(this.props.validateShow, 2, '');
                    return ''
                }
            }
        }
        return -1
    },
    _createItem: function () {
        var _array = [];
        var data = this.props.data;
        for (var i in data) {
            if (isArray(data[i])) {
                //如果是数组则继续for，并将每组用一个div包起来
                _array.push(this._getItemFor(data[i]));
            } else {
                //这里ref要取得当前控件的name值，
                //增加other，提高可用性
                if (data[i].control.control == 'other') {
                    _array.push(data[i].control.content);
                } else {
                    _array.push(<FormItem {...data[i].item} ref={"item"+data[i].control.name}>
                        {this._controlType(data[i])}
                    </FormItem>);
                }
            }
        }
        function isArray(obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        }

        return _array;
    },
    _getItemFor: function (data) {
        var _array = [];
        for (var i in data) {
            if (data[i].control.control == 'other') {
                _array.push(data[i].control.content);
            } else {
                _array.push(<FormItem {...data[i].item} ref={"item"+data[i].control.name}>
                    {this._controlType(data[i])}
                </FormItem>);
            }
        }
        return (
            <div className="ucs-group-box">{_array}</div>
        )
    },
    _controlType: function (data) {
        var props = {
            onChange: this._onChange.bind(this, data, 'change'),
            onBlur: data.control.control == 'input' ? this._onChange.bind(this, data, 'blur') : "",//失去焦点时仅对输入框有效
            onFocus: data.control.control == 'input' ? this._onFocus.bind(this, data) : "",//获取焦点时仅对输入框有效
            validate: data.validate ? data.validate : "",//将验证数据绑定到控件上
            ref: data.control.name
        };
        var _control = [];
        switch (data.control.control) {
            case "input":
                _control.push(<Input {...data.control} {...props}/>);
                break;
            case "text":
                _control.push(<div {...data.control}
                    className={classnames('input-text',data.control.className)}>{data.control.text}</div>);
                break;
            case "select":
                _control.push(<SelectDropDown {...data.control} {...props}/>);
                break;
            case "textarea":
                _control.push(<Textarea {...data.control} {...props}>{data.control.value}</Textarea>);
                break;
            case "radio":
                _control.push(<Radio {...data.control} {...props}/>);
                break;
            case "radioGroup":
                _control.push(<RadioGroup {...data.control} {...props}/>);
                break;
            case "checkbox":
                _control.push(<Checkbox {...data.control} {...props}/>);
                break;
            case "checkboxGroup":
                _control.push(<CheckboxGroup {...data.control} {...props}/>);
                break;
            case "code":
                _control.push(<Input className="input-code" {...data.control} {...props}/>);
                _control.push(<a href="javascript:;" {...data.control.code}>{data.control.code.text}</a>);
                break;
            case "imgCode":
                _control.push(<Input className="input-code" {...data.control} {...props}/>);
                _control.push(<img src={data.control.code.url} {...data.control.code}/>);
                break;
            case "button":
                _control.push(this._getButton(data));
                break;
            default:
                break;
        }
        if (data.other) {
            _control.push(<div {...data.other}
                className={classnames('other',data.other.className)}>{data.other.text}</div>);
        }
        return _control;
    },
    _getButton: function (data) {
        var button = [];
        var btn = data.control.button;
        if (btn) {
            for (var i = 0; i < btn.length; i++) {
                button.push(<Button {...btn[i]}>{btn[i].text}</Button>);
            }
            return <div className="form-button">{button}</div>;
        } else {
            return button;
        }
    },
    render: function () {
        return (
            <form id={this.state.formId} className={this.props.className}>
                {this._createItem()}
                {this.props.children}
            </form>
        )
    }
});
module.exports = FormGroup;