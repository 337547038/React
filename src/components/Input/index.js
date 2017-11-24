var classnames = require('classnames');
/**
 * Input
 * 参数
 * type
 * className
 * value
 * onChange
 * */
var Input = React.createClass({
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
    getValue: function () {
        return this.state.value;
    },
    render: function () {
        return (
            <input
                type={this.props.type?this.props.type:"text"}
                {...this.props} onChange={this._onChange}
                className={classnames('input-control',this.props.className,{"disabled":this.props.disabled})}
                value={this.state.value}/>
        )
    }
});
module.exports = Input;