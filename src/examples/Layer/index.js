require("../../scss/index.scss");
var Layer=require('../../components/Layer');
var Root = React.createClass({
    _handleClick: function (e) {
        //this.refs[e.target.getAttribute("data-layer")].layerOpen();
        this.refs.layer1.layerOpen();
    },
    render: function () {
        return (
            <div>
                <h2>使用方法及参数基本和之前jquery版一致</h2>
                <a href="javascript:;" onClick={this._handleClick}>打开基本弹窗</a>
                <br/>
                <a href="other.html">其它类型弹窗介绍</a>
                <Layer ref="layer1" title="标题">
                    最基本弹窗
                </Layer>
            </div>
        );
    }
});
ReactDOM.render(<Root/>, document.getElementById('main'));