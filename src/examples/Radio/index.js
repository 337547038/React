require("../../scss/index.scss");
var Radio = require("../../components/Radio");
var RadioGroup = Radio.RadioGroup;

var RaidoList = React.createClass({
    getInitialState: function () {
        return {value: ''}
    },
    _change: function (e) {
        this.setState({value: e.target.value});
        // console.log(e.target.value);
    },
    _click: function () {
        console.log(this.state.value);
    },
    render: function () {
        return (
            <div>
                <hr/>
                <h3>单个在列表中应用（类似于组功能）</h3>
                <p><Radio name="radio1" value="1" onChange={this._change} text="选项1"/></p>
                <p><Radio name="radio1" value="2" onChange={this._change} text="选项2"/></p>
                <p><Radio name="radio1" value="3" onChange={this._change} text="选项3"/></p>
                <p><Radio name="radio1" value="4" onChange={this._change} text="选项4"/></p>
                <p><Radio name="radio1" value="5" onChange={this._change} text="选项5"/></p>
                <p><Radio name="radio1" value="6" onChange={this._change} text="选项6"/></p>
                <p onClick={this._click}>取值</p>
            </div>
        )
    }
});
var RadioGroupDemo = React.createClass({
    getInitialState: function () {
        return {value: 6}
    },
    _onChange: function (e) {
        console.log('onChange value=' + e.target.value);
    },
    _setValue: function () {
        this.refs.radio.setValue(5);
    },
    _getValue: function () {
        console.log(this.refs.radio.getValue());
    },
    render: function () {
        var data = [
            {text: 'disabled', value: 1, disabled: true},
            {text: '选项2', value: 2},
            {text: '选项3', value: 3},
            {text: '选项4', value: 4},
            {text: '选项5', value: 5},
            {text: '选项6', value: 6}
        ];
        return (
            <div>
                <hr/>
                <h3>组应用</h3>
                <RadioGroup value={this.state.value} name="radioGroup" options={data} onChange={this._onChange}
                            ref="radio"/>
                <p onClick={this._setValue}>动态设值</p>
                <p onClick={this._getValue}>取值</p>
            </div>
        )
    }
});
var Single = React.createClass({
    _getValue: function () {
        console.log(this.refs.getValue.getValue());
    },
    render: function () {
        return (
            <div>
                <h3>单个应用</h3>
                <p><Radio text="选项1"/></p>
                <p><Radio checked="checked" text="checked"/></p>
                <p><Radio disabled="disabled" text="disabled"/></p>
                <p><Radio disabled="disabled" checked="checked" text="选中状态禁止"/></p>
                <p><Radio ref="getValue" text="取值测试"/></p>
                <p onClick={this._getValue}>取值</p>
            </div>
        )
    }
});

var Root = React.createClass({

    render: function () {
        return (
            <div>
                <Single/>
                <RaidoList/>
                <RadioGroupDemo/>
            </div>
        )
    }
});
ReactDOM.render(
    <Root/>
    , document.getElementById('main'));