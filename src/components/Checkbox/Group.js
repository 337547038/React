var classnames = require('classnames');
var Checkbox = require('./Checkbox');
var Group = React.createClass({
    getInitialState: function () {
        return {}
    },
    componentWillMount: function () {
        this.value = [];
    },
    getValue: function () {
        return this.value;
    },
    _handleChange: function (e) {
        var value = e.target.value;
        var array = this.value;
        if (e.target.checked) {
            if (array.indexOf(value) == -1) {
                array.push(value);
            }
        } else {
            for (var i in array) {
                if (array[i] == value) {
                    array.splice(i, 1);
                }
            }
        }
    },
    selectAll: function (b) {
        this.value = [];
        for (var i in this.refs) {
            this.refs[i].setValue(b);
        }
        if (b) {
            this.props.options.map(function (child) {
                this.value.push(child.value.toString());
            }.bind(this))
        }
    },
    render: function () {
        return (
            <div className={classnames('checkbox-group',this.props.className)}>
                {this.props.options && this.props.options.map(function (child, index) {
                    {
                        child.checked && this.value.indexOf(child.value.toString()) == -1 ? this.value.push(child.value.toString()) : ""
                    }
                    return <Checkbox {...child}
                        //checked={this.state.value.indexOf(child.value)!=-1}
                        name={this.props.name?this.props.name:'checkbox1'}
                        onChange={this._handleChange}
                        ref={"checkbox"+index}
                    />
                }.bind(this))}
            </div>
        )
    }
});
module.exports = Group;