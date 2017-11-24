var Input = require('../Input/index');
var classnames = require("classnames");
var UAjax = require('../Ajax/index');
function findParentNode(elem, cls) {
    if (elem.nodeName.toUpperCase() === "BODY") {
        return false;
    } else if (elem.className.search(cls) > -1) {
        return elem;
    } else {
        return findParentNode(elem.parentNode, cls);
    }
}
//obj为要绑定事件的元素，ev为要绑定的事件，fn为绑定事件的函数
function myAddEvent(obj, ev, fn) {
    if (obj.attachEvent) {
        obj.attachEvent("on" + ev, fn);
    }
    else {
        obj.addEventListener(ev, fn, false);
    }
}
function myRemoveEvent(obj, ev, fn) {
    if (obj.attachEvent) {
        obj.detachEvent("on" + ev, fn);
    }
    else {
        obj.removeEventListener(ev, fn, false);
    }
}
/**
 * SelectDropDown组件
 *
 * @param [value] 默认值
 * @param [name] 每个下拉里增加一个隐藏input，方便序列化表单取值
 * @param [className] 样式名
 * @param [type] 下拉类型　默认为空，可选bank search
 * @param [showNum] 显示下拉个数，超出显示滚动条
 * @param [option] 下拉选项数据　option选项　value选项对应的值(缺省时引用选项值)
 * @param [onChange] 下拉选择后回调
 * @param [disabled] 禁止点击下拉，默认false
 * @param [placeholder] 是否显示placeholder样式，默认true，下拉改变后为false
 * @param [bankLogo] 银行名称仅type为bank时有效
 * @param [url] 异步请求数据，会覆盖默认传进来的option
 * @param [defaultText] 默认选项，会增加到下拉的第一项
 * @param [defaultValue] 默认值，不填写时取defaultText的值
 * @param [searchPlaceholder] 仅对搜索有效，搜索输入框placeholder提示语
 * @param [searchButton] 仅对搜索有效，搜索按钮名
 * @param [searchChange] 仅对搜索有效，搜索输入回调
 * @param [searchClick] 仅对搜索有效，搜索按钮回调
 *
 * 示例:
 *
 *     @example
 *     <SelectDropDown ref="checkref" />
 */
var SelectDropDown = React.createClass({
    getInitialState: function () {
        return {
            value: this.props.value,
            display: false,//true时展开添加样式open
            option: this.props.option ? this.props.option.slice(0) : "",
            randomId: Math.random().toString(36).substr(2, 10),
            placeholder: this.props.value ? false : this.props.placeholder,//初始时如果设定了value，则不显示placeholder样式
            showText: '',//显示的文本值
            showBankLogo: '', //选中的银行
            activeLi: 0// 当前选中的li
        }
    },
    getDefaultProps: function () {
        return {
            value: "",//默认初始值
            name: '',
            className: "",
            type: "", //三种类型，bank,search
            showNum: "",
            option: "",
            placeholder: true,
            disabled: false, //禁止下拉点击*/
            searchPlaceholder: '',//搜索输入框提示
            searchButton: '', //搜索按钮
            searchChange: '', //搜索输入回调
            searchClick: ''// 搜索回调
        }
    },
    componentWillMount: function () {
        this._addDefaultOption();
        this._setInputValue();
    },
    componentDidMount: function () {
        var th = this;
        if (this.props.url) {
            UAjax.ajax({
                method: 'get',
                url: this.props.url,
                data: '',
                async: true,
                cache: true,
                success: function (res) {
                    var arry = eval(res);
                    if (th.props.defaultText != undefined) {
                        arry.unshift({
                            option: th.props.defaultText,
                            value: th.props.defaultValue !== undefined ? th.props.defaultValue : th.props.defaultText
                        });
                    }
                    th.setState({
                        value: th.props.value,
                        option: arry
                    }, function () {
                        this._setInputValue();
                    });
                },
                failure: function (res) {
                    console.log(res);
                }
            });
        }
    },
    componentWillReceiveProps: function (newProps) {
        if (this.props.option != newProps.option || this.props.value != newProps.value) {
            this.setState({
                option: newProps.option ? newProps.option.slice(0) : "",
                value: newProps.value,
                placeholder: newProps.value ? false : true
            }, function () {
                this._addDefaultOption();
                this._setInputValue();
            });
        }
    },
    componentWillUnmount: function () {
        myRemoveEvent(document, 'click', this._handleBodyClick);
    },
    _handleBodyClick: function (evt) {
        if (this.state.display) {
            var a = findParentNode(evt.srcElement ? evt.srcElement : evt.target, this.state.randomId);
            if (a === false) {
                this.setState({display: false});
            }
        } else {
            myRemoveEvent(document, 'click', this._handleBodyClick);
        }
    },
    _handleChange: function (e) {
        if (!this.props.disabled) {
            this.setState({display: !this.state.display}, function () {
                this._setUlHeight();
                myAddEvent(document.body, 'click', this._handleBodyClick);
            });
            e.preventDefault();
            e.stopPropagation();
        }
    },
    _handleInputChange: function (e) {
        //搜索输入框改变时
        if (!Array.indexOf) {
            Array.prototype.indexOf = function (el) {
                for (var i = 0, n = this.length; i < n; i++) {
                    if (this[i] === el) {
                        return i;
                    }
                }
                return -1;
            }
        }
        var ul = this.refs.dropdownul.childNodes;
        for (var i = 0; i < ul.length; i++) {
            var li = ul[i];
            //console.log(ul[i].innerText);
            if (li.innerText.indexOf(e.target.value) == -1) {
                li.style.display = 'none';
            } else {
                li.style.display = 'block';
            }
        }
        this.props.searchChange ? this.props.searchChange(e) : "";
    },
    _handleSearchClick: function () {
        //搜索按钮点击
        this.props.searchClick ? this.props.searchClick() : "";
    },
    /**
     * 获取SelectDropDown的值
     * @return {string}
     * */
    getValue: function (bool) {
        //加多个参数，默认只返回value值，传参为true时，返回key和value
        if (bool) {
            return [this.state.value, this.state.showText]
        } else {
            return this.state.value
        }
    },
    /**
     * 设置SelectDropDown的value
     * @param {string}
     *
     * */
    setValue: function (value, option) {
        this.setState({
            value: value,
            option: option ? option.slice(0) : this.state.option,
            placeholder: value ? false : true
        }, function () {
            this._addDefaultOption();
            this._setInputValue();
        });
    },

    _setUlHeight: function () {
        var ul = this.refs.dropdownul;
        ul.style.height = '';
        if (this.state.display && this.refs.dropdownul.children.length) {
            var liheight = this.refs.dropdownul.getElementsByTagName("li")[0].offsetHeight;
            //如果下拉个数大于要显示的个数
            if (parseInt(this.state.option.length) > parseInt(this.props.showNum) && this.props.showNum) {
                ul.style.height = liheight * this.props.showNum + "px";
            }
        }
    },
    _handleLiClick: function (el, index) {
        //下拉项点击
        if (!el.disabled) {
            var v = typeof(el.value) !== 'undefined' ? el.value : el.option;
            this.setState({
                bankLogo: el.bankLogo,
                display: false,
                placeholder: false,
                value: v,
                showText: el.option,
                showBankLogo: el.bankLogo,
                activeLi: index
            });
            this.props.onChange ? this.props.onChange(v) : "";
        }
    },
    _setInputValue: function () {
        //如果值为空，提取数据选项的第一项为默认显示项
        var option = this.state.option;
        if (this.state.value) {
            //根据传入的值在数据里查找对应的选项
            var index = 0;
            for (var i in option) {
                var name = option[i];
                if (name.value == this.state.value) {
                    this.setState({
                        value: this.state.value,
                        showText: name.option,
                        showBankLogo: name.bankLogo,
                        activeLi: index
                    });
                    break;
                } else if (name.option == this.state.value) {
                    this.setState({
                        value: name.option,
                        showText: name.option,
                        showBankLogo: name.bankLogo,
                        activeLi: index
                    });
                    break;
                } else {
                    this.setState({
                        value: '',
                        showText: '',
                        showBankLogo: ''
                    });
                }
                index++;
            }
        } else {
            if (option && typeof (option[0]) !== 'undefined') {
                if (typeof (option[0].value) !== 'undefined') {
                    this.setState({
                        value: option[0].value,
                        showText: option[0].option,
                        showBankLogo: option[0].bankLogo
                    });
                } else {
                    this.setState({
                        value: option[0].option,
                        showText: option[0].option,
                        showBankLogo: option[0].bankLogo
                    });
                }
            } else {
                //没下拉选项时
                var name = '';
                var v = '';
                if (this.props.defaultText) {
                    name = this.props.defaultText;
                    if (this.props.defaultValue != undefined) {
                        v = this.props.defaultValue;
                    } else {
                        v = this.props.defaultText
                    }
                }
                this.setState({
                    value: v,
                    showText: name,
                    showBankLogo: ''
                });
            }
        }
    },
    _addDefaultOption: function () {
        var option = this.state.option;
        if (option && this.props.defaultText && option[0] !== undefined && option[0].option != this.props.defaultText) {
            this.state.option.unshift({
                option: this.props.defaultText,
                value: this.props.defaultValue !== undefined ? this.props.defaultValue : this.props.defaultText
            });
        }
    },
    render: function () {
        var mainClass = classnames(
            "select-dropdown",
            "select-" + this.state.randomId,
            this.props.className,
            {"open": this.state.display},
            {"select-search": this.props.type == "search"},
            {"select-bank": this.props.type == "bank"}
        );
        var inputClass = classnames(
            "input-control",
            {"placeholder": this.state.placeholder},
            {'disabled': this.props.disabled}
        );
        var bankdefalut = "";
        if (this.props.type == "bank") {
            bankdefalut = <span className={classnames("bank-logo","bank-"+this.state.showBankLogo)}/>;
        }
        var searchtype = "";
        if (this.props.type == "search") {
            searchtype = (
                <div className="ucs-search-box">
                    <Input className="select-dropdown-input" onChange={this._handleInputChange}
                           placeholder={this.props.searchPlaceholder}/>
                    {this.props.searchButton ?
                        <button className="btn btn-confirm"
                                onClick={this._handleSearchClick}>{this.props.searchButton}</button> : ""}
                </div>
            )
        }
        return (
            <div className={mainClass} id={this.props.id}>
                <div className="select-control" onClick={this._handleChange}>
                    <div className={inputClass} ref="ucsInput" data-value={this.state.value}>
                        {bankdefalut}
                        <span>{this.state.showText}</span>
                        <i className="icon"/>
                    </div>
                    {/*方便序列化取值而添加的隐藏字段，一个用来保存值，一个用来保存对应的字段名*/}
                    {this.props.name ?
                        <div>
                            <input type="hidden" name={this.props.name} value={this.state.value}/>
                            <input type="hidden" name={this.props.name+"TextField"} value={this.state.showText}/>
                        </div>
                        : ""}
                </div>
                <div className="dropdown">
                    <div className="dropdown-border">
                        {searchtype}
                        <ul ref="dropdownul">
                            {this.state.option && this.state.option.map(function (el, index) {
                                return (
                                    <li data-value={el.value!==undefined?el.value:el.option}
                                        onClick={this._handleLiClick.bind(this,el,index)}
                                        className={classnames({'disabled':el.disabled},{'active':this.state.activeLi==index})}>
                                        {this.props.type == "bank" ?
                                            <span className={classnames("bank-logo","bank-"+el.bankLogo)}/> : ""}
                                        <span>{el.option}</span></li>
                                );
                            }.bind(this))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = SelectDropDown;
