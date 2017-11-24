var Radio = require("./Radio");
/**
 * Radio提示
 *
 * @param [name]
 * @param [onChange]
 * @param [value]
 * @param [className]
 *
 * 示例:
 *
 *     @example
 *     <RadioGroup value="1" name="radio" options=[
 *     {text:"选项1",value="1"},
 *     {text:"选项2",value="2"},
 *     {text:"选项3",value="3",disabled:true}
 *     ]/>
 */
var RadioGroup = React.createClass({
    getInitialState: function () {
        return {value: this.props.value}
    },
    _onChange: function (e) {
        this.setState({value: e.target.value});
        this.props.onChange ? this.props.onChange(e) : "";
    },
    componentWillReceiveProps: function (newProps) {
        if (this.props.value != newProps.value) {
            this.setState({value: newProps.value});
        }
    },
    /**
     * 获取RadioGroup的value
     * @return {string}
     *
     * */
    getValue: function () {
        return this.state.value;
    },
    /**
     * 设置RadioGroup的value
     * @param {string}
     *
     * */
    setValue: function (v) {
        this.setState({value: v});
    },
    render: function () {
        return (
            <div className={"ucs-radio-group "+this.props.className}>
                {this.props.options && this.props.options.map(function (r) {
                    return <Radio
                        value={r.value}
                        disabled={r.disabled}
                        checked={r.value==this.state.value?true:false}
                        onChange={this._onChange}
                        name={this.props.name?this.props.name:'radio'}
                        text={r.text}/>
                }.bind(this))}
            </div>
        )
    }
});
module.exports = RadioGroup;