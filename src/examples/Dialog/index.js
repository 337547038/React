require("../../scss/index.scss");
var Dialog = require("../../components/Dialog");
var Root = React.createClass({
    componentDidMount: function () {
        Dialog.confirm({title:'confirm',content:"content"});
    },
    click:function () {
        Dialog.alert({title:'alert',content:"alert-content"});
    },
    render: function () {
        return (
            <div onClick={this.click}>click</div>
        )
    }
});
ReactDOM.render(
    <Root/>
    , document.getElementById('main'));