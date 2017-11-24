require("../../scss/index.scss");
var Button = require("../../components/Button");

var Root = React.createClass({
    click: function () {
        alert("click")
    },
    render: function () {
        return (
            <div>
                <p><Button className="btn-confirm">确定</Button></p>
                <p><Button className="btn-cancel">取消</Button></p>
                <p><Button className="btn-cancel btn-block">块状</Button></p>
                <p><Button className="btn-cancel" disabled="disabled">禁用</Button></p>
                <p><Button className="btn-confirm" onClick={this.click}>事件</Button></p>
            </div>
        )
    }
});
ReactDOM.render(
    <Root/>
    , document.getElementById('main'));