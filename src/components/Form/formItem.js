var classnames = require('classnames');
/**
 * FormItem
 * 参数
 *　label
 * labelIcon 字段里出现的小红点
 * className
 *
 * 示例
 * <FormItem label="用户名" labelIcon="*"></FormItem>
 * */
var FormItem = React.createClass({
    getInitialState: function () {
        return {
            tipsType: true,//提示类型1输入提示 2正确，3错误
            tipsText: '',//提示语
            tipsShow: false//是否显示验证提示
        }
    },
    getDefaultProps: function () {
        return {
            label: "",
            labelIcon: "",
            className: "",
            labelClass: ''
        }
    },
    //设置验证提示
    setTips: function (show, type, text) {
        this.setState({
            tipsType: type,
            tipsText: text,
            tipsShow: show
        });
        //对子节点输入框添加样式
        if (show && type == 3) {
            this._addErrorClass(type);
        }
    },
    _addErrorClass: function (type) {
        var el = ReactDOM.findDOMNode(this);
        var input = el.querySelector('.ucs-input');
        if (input) {
            if (!type) {
                //添加样式 如果没有则添加
                if (input.className.indexOf('error') == -1) {
                    input.className += ' error';
                }
            } else {
                //移除样式
                input.className = input.className.replace(' error', '');
            }
        }
    },
    render: function () {
        var lable = "";
        if (this.props.label || this.props.labelClass) {
            lable = (<label className={classnames('label',this.props.labelClass)}>
                {this.props.labelIcon ? <span>{this.props.labelIcon}</span> : ""}
                {this.props.label}
            </label>);
        }
        var tips = "";
        if (this.state.tipsShow) {
            var clType = '';
            switch (this.state.tipsType) {
                case 1:
                    clType = 'tips';
                    break;
                case 2:
                    clType = 'success';
                    break;
                case 3:
                    clType = 'failure';
                    break;
            }
            var exClass = classnames("ucs-form-explain", clType);
            tips = (
                <div className={exClass}>
                    <i className={'iconfont icon-'+clType}/>
                    {this.state.tipsText}
                </div>
            );
        }
        return (
            <div className={classnames('ucs-form-group',this.props.className)}>
                {lable}
                <div className="ucs-form-box">
                    {this.props.children}
                </div>
                {tips}
            </div>
        )
    }
});
module.exports = FormItem;