require("../../scss/index.scss");
var Input = require("../../components/Input");

var Root = React.createClass({
    getInitialState: function () {
        return {disabled: true}
    },
    _disabled: function () {
        this.setState({disabled: !this.state.disabled})
    },
    _getValue: function () {
        console.log(this.refs.input.getValue());
    },
    render: function () {
        return (
            <div>
                <p><Input/></p>
                <p><Input value="123"/></p>
                <p><Input placeholder="placeholder" ref="input"/></p>
                <p onClick={this._getValue}>获取值</p>
                <p><Input placeholder="密码框" type="password"/></p>
                <p><Input placeholder="disabled" disabled={this.state.disabled}/></p>
                <p onClick={this._disabled}>改变disabled状态</p>
            </div>
        )
    }
});
ReactDOM.render(
    <Root/>
    , document.getElementById('main'));