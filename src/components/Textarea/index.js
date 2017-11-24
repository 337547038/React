var classnames = require('classnames');
/**
 * Textarea
 * 参数
 * className
 * onChange
 * */
var Textarea = React.createClass({
    getInitialState: function () {
        return {}
    },
    _onChange: function (e) {
        this.props.onChange ? this.props.onChange(e) : "";
    },
    /*componentWillReceiveProps: function (newProps) {
     if (this.props.value != newProps.value) {
     this.setState({value: newProps.value});
     }
     },*/
    /*getValue: function () {
     return this.state.value;
     },*/
    render: function () {
        return (
            <textarea
                className={classnames('textarea-control','input-control',this.props.className)}
                name={this.props.name}
                disabled={this.props.disabled?"disabled":""}
                placeholder={this.props.placeholder}
                onChange={this._onChange}>{this.props.children}</textarea>
        )
    }
});
module.exports = Textarea;