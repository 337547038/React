require("../../scss/index.scss");
var Form = require('../../components/Form');
/*Demo10需要单独引入FormItem和Input，其它示例只需引入Form即可*/
var FormItem = Form.FormItem;
var Input = require('../../components/Input');
/**data数据
 * item： label、labelIco、className(对item)、labelClass只有四个参数可传
 * control：control控件类型（input）,剩下的为当前组件参数，其中表单控件name为必填项
 *        control支持的类型 input、text、radio、radioGroup、select、code、imgCode、textarea、other。各类型使用可查看示例
 * validate:数据验证规则
 * other：预留的一个位置，可以是当前输入的一些提示之类或者写个单位什么，text为要显示的文本
 * */
var Demo1 = React.createClass({
    getInitialState: function () {
        return {getCode: true, showHidePassword: false}
    },
    _formButton: function () {
        //这里会返回三个参数 表单值 是否通过验证 所有错误提示信息
        var a = this.refs.form1.serialize();
        console.log(a);
    },
    _getCode: function () {
        //验证码倒计时
        if (this.state.getCode) {
            this.setState({getCode: false});
            var refCode = document.getElementById('input-code');
            refCode.className += ' disable';
            var th = this;
            var s = 60;
            var timer = setInterval(function () {
                refCode.innerHTML = s + "秒后重新获取";
                if (s == 0) {
                    th.setState({getCode: false});
                    refCode.innerHTML = '重新发送验证码';
                    clearInterval(timer);
                    refCode.className = refCode.className.replace(' disable', '');
                }
                s--;
            }, 1000);
        }
    },
    _getImgCode: function () {
        //图形验证码
        console.log('get img code');
    },
    _showHidePassword: function () {
        //显示隐藏密码
        this.setState({showHidePassword: !this.state.showHidePassword});
        //console.log(this.state.showHidePassword);
    },
    getFormData: function () {
        return [
            {
                item: {label: '1用户名：', labelIcon: "*"},
                control: {control: 'input', value: 'user', placeholder: "请输入用户名", name: 'userName1'}
            },
            {
                item: {label: '2用户名：', labelIcon: "*"},
                control: {control: 'input', value: '', placeholder: "请输入用户名", name: 'userName', className: 'user'},
                validate: [
                    {type: "required", msg: "用户名不能为空"},
                    {type: "maxLength", msg: "用户名不能超过10位", maxLength: 10},
                    {type: "minLength", msg: "用户名不能小于3个字符", minLength: 3}
                ]
            },
            {
                item: {label: '3用户名3：', labelIcon: "*"},
                control: {control: 'input', value: '', placeholder: "获取焦点时显示提示", name: 'userName3'},
                validate: [
                    {type: 'tips', msg: '获取焦点时的输入提示，仅对input'},
                    {type: "required", msg: "用户名不能为空"},
                    {type: "maxLength", msg: "用户名不能超过10位", maxLength: 10},
                    {type: "minLength", msg: "用户名不能小于3个字符", minLength: 3}
                ]
            },
            {
                item: {label: '4密码：', labelIcon: "*"},
                control: {
                    control: 'input',
                    value: '',
                    placeholder: "单击右边按钮可显示或隐藏密码",
                    name: 'password',
                    type: this.state.showHidePassword ? "" : "password",
                    id: 'password1'
                },
                validate: [
                    {type: "required", msg: "密码不能为空"}
                ],
                other: {text: '显示隐藏密码', onClick: this._showHidePassword}
            },
            {
                item: {label: '5确认密码：', labelIcon: "*"},
                control: {
                    control: 'input',
                    value: '',
                    placeholder: "请输入确认密码",
                    name: 'password',
                    type: "password"
                },
                validate: [
                    {type: "required", msg: "密码不能为空"},
                    {
                        type: "fn", msg: "两次输入密码不一致", validator: function (v) {
                        var pv = document.getElementById('password1');
                        if (v == pv.value) {
                            return true
                        } else {
                            return false
                        }
                    }
                    }
                ]
            },
            {
                item: {label: '6邮箱地址：', labelIcon: "*"},
                control: {control: 'input', value: '', placeholder: "请输入邮箱", name: 'mail'},
                validate: [
                    {type: "required", msg: "邮箱不能为空"},
                    {type: "mail", msg: "请输入正确的邮箱地址"}
                ]
            },
            {
                item: {label: '7正整数：', labelIcon: "*"},
                control: {control: 'input', value: '', placeholder: "请输入正整数", name: 'init'},
                validate: [
                    {type: "digits", msg: "只能输入正整数"}
                ]
            },
            {
                item: {label: '8小数：', labelIcon: "*"},
                control: {control: 'input', value: '', placeholder: "请输入小数", name: 'number'},
                validate: [
                    {type: "number", msg: "只能输入小数"}
                ]
            },
            {
                item: {label: '9手机号：', labelIcon: "*"},
                control: {control: 'input', value: '', placeholder: "请输入手机号", name: 'phone'},
                validate: [
                    {type: "mobile", msg: "请输入正确的手机号"}
                ]
            },
            {
                item: {label: '10传真号：', labelIcon: "*"},
                control: {control: 'input', value: '', placeholder: "请输入传真号", name: 'fax'},
                validate: [
                    {type: "fax", msg: "请输入正确的传真号"}
                ]
            },
            {
                item: {label: '11年龄自定验证：'},
                control: {control: 'input', value: '', placeholder: "自定正则验证", name: 'age'},
                validate: [
                    {type: "required", msg: "自定验证不能为空"},
                    {type: 'rule', msg: "年龄必须大于1岁，且不能超过120岁", rule: "/^(?:[1-9][0-9]?|1[01][0-9]|120)$/"}
                ]
            },
            {
                item: {label: '12回调验证：', labelIcon: "*"},
                control: {control: 'input', value: '', placeholder: "请输入传，输入123通过", name: 'rule'},
                validate: [
                    {
                        type: "fn", msg: "其它验证", validator: function (v) {
                        if (v == '123') {
                            return true
                        } else {
                            return false
                        }
                    }
                    }
                ]
            },
            {
                item: {label: '13体重：', labelIcon: "*"},
                control: {control: 'input', value: '', placeholder: "请输入体重", name: 'kg'},
                other: {text: '单位kg'}
            },
            {
                item: {label: '文本：'},
                control: {control: 'text', text: "返显文本", title: '000', className: 'ucs-input'}
            },
            {
                item: {label: '文本2：'},
                control: {control: 'text', text: "返显文本"}
            },
            {
                item: {label: '14单选：', labelIcon: "*"},
                control: {
                    control: "radio", text: '选项', value: '1', name: 'radiosingle'
                },
                validate: [
                    {type: "required", msg: "单选不能为空"}
                ],
                other: {text: '只有一个选项时返回的结果为true或false'}
            },
            {
                item: {label: "15单选组："},
                control: {
                    control: "radioGroup", value: '', name: 'radiog', options: [
                        {text: "选项1", value: "1"},
                        {text: "选项2", value: "2"},
                        {text: "选项3", value: "3"}
                    ]
                },
                validate: [
                    {type: "required", msg: "单选组不能为空"}
                ]
            },
            {
                item: {label: '16多选：', labelIcon: "*"},
                control: {
                    control: "checkbox", text: '选项', value: '1', name: 'checkbox'
                },
                validate: [
                    {type: "required", msg: "多选不能为空"}
                ]
            },
            {
                item: {label: '17多选组：'},
                control: {
                    control: "checkboxGroup", name: 'checkbox1', options: [
                        {text: '选项1', value: 1},
                        {text: '选项2', value: 2, checked: true},
                        {text: '选项3', value: 3, checked: true},
                        {text: '选项4', value: 4},
                        {text: '选项5', value: 5},
                        {text: '选项6', value: 6},
                        {text: '选项7', value: 7}
                    ]
                },
                validate: [
                    {type: "required", msg: "多选不能为空"}
                ]
            },
            {
                item: {label: "18下拉："},
                control: {
                    control: "select", defaultText: '请选择', defaultValue: '', name: 'select', option: [
                        {option: "选项1", value: "1"},
                        {option: "选项2", value: "2"},
                        {option: "选项3", value: "3"}
                    ]
                },
                validate: [
                    {type: "required", msg: "下拉不能为空"}
                ]
            },
            {
                item: {label: "19验证码：", className: 'code'},
                control: {
                    control: "code",
                    name: 'code',
                    //className: 'input-code',
                    placeholder: '获取验证码显示倒计时',
                    code: {text: '获取验证码', onClick: this._getCode, id: 'input-code'}
                },
                validate: [
                    {type: "required", msg: "验证码不能为空"}
                ]
            },
            {
                item: {label: "20图形验证码：", className: 'img-code'},
                control: {
                    control: "imgCode",
                    name: 'imgCode',
                    // className: 'img-code',
                    placeholder: '图片验证码',
                    code: {url: '../images/code.jpg', onClick: this._getImgCode}
                },
                validate: [
                    {type: "required", msg: "图形验证码不能为空"}
                ]
            },
            {
                item: {label: "21文本域：", className: 'auto-height'},
                control: {
                    control: "textarea", name: "textarea"
                },
                validate: [
                    {type: "required", msg: "文本域不能为空"}
                ]
            }
        ];
    },
    render: function () {
        return (
            <div>
                <h2>通用表单示例</h2>
                <p>注：同一个form不能存在相同的name。表单元素的name值用于取值，为必填值</p>
                <Form data={this.getFormData()} ref="form1"/>
                <a href="javascript:;" onClick={this._formButton}>提交表单</a>
            </div>
        )
    }
});
var Demo2 = React.createClass({
    _formButton: function () {
        //这里会返回三个参数 表单值 是否通过验证 所有错误提示信息
        var filed = ['userName', 'password', 'checkbox', 'radiosingle'];
        var a = this.refs.form2.serialize(filed);
        console.log(a);
    },
    getFormData: function () {
        return [
            {
                item: {label: '用户名：', labelIcon: "*"},
                control: {control: 'input', value: '', placeholder: "请输入用户名", name: 'userName', id: 'user'},
                validate: [
                    {type: "required", msg: "用户名不能为空0"},
                    {type: "maxLength", msg: "用户名不能超过10位", maxLength: 10},
                    {type: "minLength", msg: "用户名不能小于3个字符", minLength: 3}
                ]
            },
            {
                item: {label: '密码：', labelIcon: "*"},
                control: {
                    control: 'input',
                    value: '',
                    placeholder: "请输入密码",
                    name: 'password',
                    type: 'password',
                    id: 'pas'
                },
                validate: [
                    {type: "required", msg: "密码不能为空0"}
                ]
            },
            {
                item: {label: '邮箱地址：', labelIcon: "*"},
                control: {control: 'input', value: '', placeholder: "请输入邮箱", name: 'mail'},
                validate: [
                    {type: "required", msg: "邮箱不能为空0"},
                    {type: "mail", msg: "请输入正确的邮箱地址"}
                ]
            }
        ]
    },
    render: function () {
        return (
            <div>
                <hr/>
                <h2>Demo2：对指定输入框进行验证</h2>
                <Form data={this.getFormData()} ref="form2"/>
                <a href="javascript:;" onClick={this._formButton}>提交表单,并对用户名和密码进行验证</a>
            </div>
        )
    }
});
var Demo3 = React.createClass({
    getFormData: function () {
        return [
            {
                item: {labelClass: 'iconfont icon-1'},
                control: {control: 'input', value: '', placeholder: "请输入用户名", name: 'userName', id: 'user'},
                validate: [
                    {type: "required", msg: "用户名不能为空0"},
                    {type: "maxLength", msg: "用户名不能超过10位", maxLength: 10},
                    {type: "minLength", msg: "用户名不能小于3个字符", minLength: 3}
                ]
            },
            {
                item: {labelClass: 'iconfont icon-2'},
                control: {
                    control: 'input',
                    value: '',
                    placeholder: "请输入密码",
                    name: 'password',
                    type: 'password',
                    id: 'pas'
                },
                validate: [
                    {type: "required", msg: "密码不能为空0"}
                ]
            }
        ]
    },
    render: function () {
        return (
            <div>
                <hr/>
                <h2>Demo3：label为字体图标时</h2>
                <p>没引用字体图标，也没写样式，请F12看</p>
                <Form data={this.getFormData()}/>
            </div>
        )
    }
});
var Demo4 = React.createClass({
    getFormData: function () {
        return [
            {
                control: {control: 'input', value: '', placeholder: "请输入用户名", name: 'userName', id: 'user'},
                validate: [
                    {type: "required", msg: "用户名不能为空0"},
                    {type: "maxLength", msg: "用户名不能超过10位", maxLength: 10},
                    {type: "minLength", msg: "用户名不能小于3个字符", minLength: 3}
                ]
            },
            {
                control: {
                    control: 'input',
                    value: '',
                    placeholder: "请输入密码",
                    name: 'password',
                    type: 'password',
                    id: 'pas'
                },
                validate: [
                    {type: "required", msg: "密码不能为空0"}
                ]
            }
        ]
    },
    render: function () {
        return (
            <div>
                <hr/>
                <h2>Demo4：label内容为空时</h2>
                <Form data={this.getFormData()}/>
            </div>
        )
    }
});
var Demo5 = React.createClass({
    _confirmClick: function () {
        var a = this.refs.form5.serialize();
        console.log(a);
    },
    _cancelClick: function () {
        console.log('cancel');
    },
    getFormData: function () {
        return [
            {
                item: {label: '用户名0：'},
                control: {control: 'input', value: '', placeholder: "请输入用户名", name: 'userName', id: 'user'},
                validate: [
                    {type: "required", msg: "用户名不能为空0"},
                    {type: "maxLength", msg: "用户名不能超过10位", maxLength: 10},
                    {type: "minLength", msg: "用户名不能小于3个字符", minLength: 3}
                ]
            },
            {
                item: {label: '密码：'},
                control: {
                    control: 'input',
                    value: '',
                    placeholder: "请输入密码",
                    name: 'password',
                    type: 'password',
                    id: 'pas'
                },
                validate: [
                    {type: "required", msg: "密码不能为空0"}
                ]
            },
            {
                item: {label: "&nbsp;"},
                control: {
                    control: 'button',
                    button: [
                        {name: "confirm", className: 'btn-confirm', text: '确定', onClick: this._confirmClick},
                        {name: "cancel", className: 'btn-cancel', text: '取消', onClick: this._cancelClick}
                    ]
                },
                validate: [
                    {type: "required", msg: "密码不能为空0"}
                ]
            }
        ]
    },
    render: function () {
        return (
            <div>
                <hr/>
                <h2>Demo5： 使用Form里的Button</h2>
                <p>如果能满足使用，可以用Form里的Button</p>
                <Form data={this.getFormData()} ref="form5"/>
            </div>
        )
    }
});
var Demo6 = React.createClass({
    getFormData: function () {
        return [
            [
                {
                    item: {label: '用户名：'},
                    control: {control: 'input', value: '', placeholder: "请输入用户名", name: 'userName', id: 'user'},
                    validate: [
                        {type: "required", msg: "用户名不能为空"},
                        {type: "maxLength", msg: "用户名不能超过10位", maxLength: 10},
                        {type: "minLength", msg: "用户名不能小于3个字符", minLength: 3}
                    ]
                },
                {
                    item: {label: '密码：'},
                    control: {
                        control: 'input',
                        value: '',
                        placeholder: "请输入密码",
                        name: 'password',
                        type: 'password',
                        id: 'pas',
                        ref: "password"
                    },
                    validate: [
                        {type: "required", msg: "密码不能为空"}
                    ]
                }
            ],
            [
                {
                    item: {label: '电话：'},
                    control: {
                        control: 'input',
                        value: '',
                        placeholder: "请输入电话",
                        name: 'tel'
                    },
                    validate: [
                        {type: "required", msg: "电话不能为空"}
                    ]
                }
            ]
        ]
    },
    click: function () {
        var a = this.refs.form7.serialize();
        console.log(a);
    },
    render: function () {
        return (
            <div>
                <hr/>
                <h2>Demo6：一个表单被划分几个部分时</h2>
                <p>将传入数据分组即可，输出时每组将会使用一个div包起来</p>
                <Form ref="form7" data={this.getFormData()}/>
                <a href="javascript:;" onClick={this.click}>提交表单</a>
            </div>
        )
    }
});
var Demo7 = React.createClass({
    getInitialState: function () {
        return {value: ''}
    },
    _onChange: function (e) {
        //console.log('input change. value:' + e.target.value);
        this.setState({value: e.target.value})
    },
    getFormData: function () {
        return [
            {
                item: {label: '用户名：'},
                control: {
                    control: 'input',
                    value: '',
                    placeholder: "输入试试",
                    name: 'userName',
                    onChange: this._onChange
                },
                validate: [
                    {type: "required", msg: "用户名不能为空0"},
                    {type: "maxLength", msg: "用户名不能超过10位", maxLength: 10},
                    {type: "minLength", msg: "用户名不能小于3个字符", minLength: 3}
                ]
            },
            {
                item: {label: '密码：'},
                control: {
                    control: 'input',
                    value: '',
                    placeholder: "请输入密码",
                    name: 'password',
                    type: 'password',
                    id: 'pas'
                },
                validate: [
                    {type: "required", msg: "密码不能为空0"}
                ]
            }
        ]
    },
    render: function () {
        return (
            <div>
                <hr/>
                <h2>Demo7： 输入框事件</h2>
                {this.state.value}
                <Form data={this.getFormData()}/>
            </div>
        )
    }
});
var Demo8 = React.createClass({
    getFormData: function () {
        return [
            {
                item: {label: '用户名：'},
                control: {
                    control: 'input',
                    value: '',
                    placeholder: "输入试试",
                    name: 'userName2'
                }
            },
            {
                control: {
                    control: 'input',
                    value: '',
                    placeholder: "输入试试",
                    name: 'userName'
                },
                validate: [
                    {type: "required", msg: "用户名不能为空0"},
                    {type: "maxLength", msg: "用户名不能超过10位", maxLength: 10},
                    {type: "minLength", msg: "用户名不能小于3个字符", minLength: 3}
                ]
            },
            {
                item: {label: '密码：'},
                control: {
                    control: 'input',
                    value: '',
                    placeholder: "请输入密码",
                    name: 'password',
                    type: 'password'
                },
                validate: [
                    {type: "required", msg: "密码不能为空0"}
                ]
            }
        ]
    },
    render: function () {
        return (
            <div>
                <hr/>
                <h2>Demo8： 一行有两个输入时</h2>
                <p>通过添加样式将用户名排在一行</p>
                <p>也可以使用上面数据分组的方式</p>
                <Form data={this.getFormData()} className="form-width"/>
            </div>
        )
    }
});
var Demo9 = React.createClass({
    getFormData: function () {
        return [
            {
                item: {label: '用户名：'},
                control: {
                    control: 'input',
                    value: '',
                    placeholder: "请输入用户名",
                    name: 'userName'
                },
                validate: [
                    {type: "required", msg: "用户名不能为空"},
                    {type: "maxLength", msg: "用户名不能超过10位", maxLength: 10},
                    {type: "minLength", msg: "用户名不能小于3个字符", minLength: 3}
                ]
            },
            {
                control: {control: 'other', content: this._getOtherContent()}
            },
            {
                item: {label: '密码：'},
                control: {
                    control: 'input',
                    value: '',
                    placeholder: "请输入密码",
                    name: 'password',
                    type: 'password'
                },
                validate: [
                    {type: "required", msg: "密码不能为空0"}
                ]
            }
        ]
    },
    _getOtherContent: function () {
        return (<div className="other">
            <p>这里可以是自定义任意一些不规则的内容这里可以是自定义任意一些不规则的内容</p>
            <table>
                <tr>
                    <th>这里是表格布局</th>
                    <td>内容</td>
                </tr>
            </table>
        </div>)
    },
    render: function () {
        return (
            <div>
                <hr/>
                <h2>Demo9：表单内存在其它数据</h2>
                <p>很多时间表单页并不是只由一个个的表单控件组件，还会出现其它各种需要在表单控件间插件其它内容的情况。为此添加control:other类型，提高灵活可用性</p>
                <Form data={this.getFormData()} className=""/>
            </div>
        )
    }
});
var Demo10 = React.createClass({
    getFormData: function () {
        return [
            {
                item: {label: '用户名：', labelIcon: "*"},
                control: {control: 'input', value: '', placeholder: "请输入用户名", name: 'userName', id: 'user'},
                validate: [
                    {type: "required", msg: "用户名不能为空"},
                    {type: "maxLength", msg: "用户名不能超过10位", maxLength: 10},
                    {type: "minLength", msg: "用户名不能小于3个字符", minLength: 3}
                ]
            },
            {
                item: {label: '密码：', labelIcon: "*"},
                control: {
                    control: 'input',
                    value: '',
                    placeholder: "请输入密码",
                    name: 'password',
                    type: 'password',
                    id: 'pas'
                },
                validate: [
                    {type: "required", msg: "密码不能为空"}
                ]
            },
            {
                item: {label: '邮箱地址：', labelIcon: "*"},
                control: {control: 'input', value: '', placeholder: "请输入邮箱", name: 'mail'},
                validate: [
                    {type: "required", msg: "邮箱不能为空"},
                    {type: "mail", msg: "请输入正确的邮箱地址"}
                ]
            }
        ]
    },
    render: function () {
        return (
            <div>
                <hr/>
                <h2>Demo10：验证触发类型</h2>
                <p>triggerType:触发类型，1改变和失去焦点验证，2改变验证，3失去焦点验证，默认为1</p>
                <p>示例只有失去焦点时验证</p>
                <Form data={this.getFormData()} triggerType="3"/>
            </div>
        )
    }
});
var Demo11 = React.createClass({
    _handleClick: function () {
        //取值验证，通过FormItem的setTips方法显示提示
        //是否显示验证提示 提示类型true正确false错误
        var value = this.refs.input.getValue();
        if (value == undefined || value == null) {
            this.refs.item1.setTips(true, false, '不能为空');
        } else {
            this.refs.item1.setTips(true, true, '');
        }
    },
    render: function () {
        return (
            <div>
                <hr/>
                <h2>Demo11：零散或是上面几种没能满足时</h2>
                <p>引入formItem跟其它样式保持一致</p>
                <p>这种方式要单独编写验证方法，如果需要验证</p>
                <p>为了取值方便，建议将零散的FormItem放入到Form里面，同样可以序列化取值，相比前面的方法，只是少了验证</p>
                <FormItem ref="item1">
                    <div className="label"><span>*</span>自定1：</div>
                    <Input placeholder="请输入" ref="input"/>
                </FormItem>
                <FormItem label="自定2：">
                    <Input placeholder="自定"/>
                </FormItem>
                <a href="javascript:;" onClick={this._handleClick}>提交表单</a>
            </div>
        )
    }
});
var Demo12 = React.createClass({
    getInitialState: function () {
        return {value1: '123', value2: ''}
    },
    _handleClick: function () {
        this.setState({
            value1: 'userName',
            value2: 'userName2'
        })
    },
    getFormData: function () {
        return [
            {
                item: {label: '用户名：'},
                control: {
                    control: 'input',
                    value: this.state.value1,
                    placeholder: "请输入用户名",
                    name: 'userName'
                },
                validate: [
                    {type: "required", msg: "用户名不能为空"}
                ]
            },
            {
                item: {label: '用户名2：'},
                control: {
                    control: 'input',
                    value: this.state.value2,
                    placeholder: "请输入用户名",
                    name: 'userName2'
                },
                validate: [
                    {type: "required", msg: "用户名不能为空"},
                    {type: "maxLength", msg: "用户名不能超过10位", maxLength: 10}
                ]
            }
        ]
    },
    render: function () {
        return (
            <div>
                <hr/>
                <h2>Demo12：动态填充/修改数据</h2>
                <p>通过setState赋值</p>
                <Form data={this.getFormData()} className=""/>
                <a href="javascript:;" onClick={this._handleClick}>赋值</a>
            </div>
        )
    }
});
var Demo13 = React.createClass({
    getInitialState: function () {
        return {}
    },
    _handleClick: function () {
        console.log(this.refs.form.serialize());
    },
    _keyDown: function (e) {
        /*console.log(e.target.readOnly);
        if (e.target.value.length > 5) {
            return false
        }*/
    },
    getFormData: function () {
        return [
            /*{
             item: {label: '14单选：', labelIcon: "*"},
             control: {
             control: "radio", text: '选项', value: '1', name: 'radio'
             },
             validate: [
             {type: "required", msg: "单选不能为空"}
             ]
             },*/
            /* {
             item: {label: '17多选组：'},
             control: {
             control: "checkboxGroup",name:'checkbox1',options:[
             {text: '选项1', value: 1},
             {text: '选项2', value: 2},
             {text: '选项3', value: 3},
             {text: '选项4', value: 4},
             {text: '选项5', value: 5},
             {text: '选项6', value: 6},
             {text: '选项7', value: 7}
             ]
             },
             validate: [
             {type: "required", msg: "多选不能为空"}
             ]
             }*/
        ]
    },
    render: function () {
        return (
            <div>

            </div>
        )
    }
});
var Root = React.createClass({
    render: function () {
        return (
            <div>
                <Demo1/>
                <Demo2/>
                <Demo3/>
                <Demo4/>
                <Demo5/>
                <Demo6/>
                <Demo7/>
                <Demo8/>
                <Demo9/>
                <Demo10/>
                <Demo11/>
                <Demo12/>
                <Demo13/>
            </div>
        )
    }
});

ReactDOM.render(
    <Root/>
    , document.getElementById('main'));