var classnames = require("classnames");
/**
 * Radio提示
 *
 * @param [name]
 * @param [onChange]
 * @param [value]
 * @param [text]
 * @param [disabled]
 * @param [checked]
 * @param [className]
 *
 * 示例:
 *
 *     @example
 *     <Radio text="选项1">
 */
var Radio = React.createClass({
    getInitialState: function () {
        return {
            randomId: this.props.id ? this.props.id : "radio-" + Math.random().toString(36).substr(2, 10)
        }
    },
    getDefaultProps: function () {

    },
    _handleChange: function (e) {
        this.props.onChange ? this.props.onChange(e) : "";
    },
    /**
     * 获取Radio的value
     * @return {bool}
     *
     * */
    getValue: function () {
        return this.refs.radio.checked
    },
    componentDidMount:function () {
    },
    render: function () {
        var props={
            id:this.state.randomId,
            name: this.props.name,
            onChange:this._handleChange,
            value:this.props.value,
            className: "ucs-radio-input",
            disabled: this.props.disabled ? "disabled" : "",
            checked: this.props.checked
        };
        var lt8 = true;
        if ('borderRadius' in document.createElement('div').style) {
            lt8 = false;
        }
        return (
            <label for={this.state.randomId} className={classnames("ucs-radio",this.props.className,{'lt8':lt8})}>
                <input type="radio" ref="radio" {...this.props} {...props}/>
                <span className="ucs-radio-inner"/>
                <span className="ucs-radio-text">{this.props.text}</span>
            </label>
        )
    }
});
module.exports = Radio;