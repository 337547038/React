require("../../scss/index.scss");
var Layer=require('../../components/Layer');
var SelectDropDown = require('../../components/SelectDropDown');
var dropdown1 = [
    {
        option: "下拉1",
        value: "1"
    },
    {
        option: "下拉2",
        value: "2"
    },
    {
        option: "下拉3",
        value: "3"
    },
    {
        option: "下拉4",
        value: "4"
    },
    {
        option: "下拉5",
        value: "5"
    }
];
var Root = React.createClass({
    _handleClick: function (e) {
        //打开多个窗口可以用这方法(取当前标签属性data-layer的值，减少对每个弹窗添加click)
        this.refs[e.target.getAttribute("data-layer")].layerOpen();
    },
    _handleConfirm: function (e) {
        this.refs.layer4.layerClose(); //关闭当前的
        this.refs[e.target.getAttribute("data-layer")].layerOpen();　//打开新的
    },
    _confirmBack: function () {
        alert("您点击了确定");
        //this.refs.layer7.layerClose();
    },
    _cancelBack: function () {
        alert("您点击了取消，因为有取消回调，窗口不会关闭，需要在回调时添加关闭代码");
       // this.refs.layer7.layerClose();
    },
    _closeBack: function () {
        alert("您点击了关闭");

        this.refs.layer7.layerClose();
    },
    componentDidMount:function () {
      
    },
    render: function () {
        return (
            <div>
                <p><a href="javascript:;" onClick={this._handleClick} data-layer="layer1">打开基本弹窗</a></p>
                <p><a href="javascript:;" onClick={this._handleClick} data-layer="layer2">打开弹窗2(成功提示)</a></p>
                <p><a href="javascript:;" onClick={this._handleClick} data-layer="layer3">打开弹窗3(失败提示)</a></p>
                <p><a href="javascript:;" onClick={this._handleClick} data-layer="layer4">表单窗口</a></p>
                <p><a href="javascript:;" onClick={this._handleClick} data-layer="layer5">多内容时出现滚动条，适合协议类</a></p>
                <p><a href="javascript:;" onClick={this._handleClick} data-layer="layer6">自动关闭</a></p>
                <p><a href="javascript:;" onClick={this._handleClick} data-layer="layer7">回调</a></p>
                <p><a href="javascript:;" onClick={this._handleClick} data-layer="layer8">不显示遮罩</a></p>
                <p><a href="javascript:;" onClick={this._handleClick} data-layer="layer9">弹窗没有标题时</a></p>

                <h3>更多参数可查看layer.js</h3>

                <Layer ref="layer1" title="标题">
                    最基本弹窗
                </Layer>
                <Layer ref="layer2" title="提交成功" type="success" confirm="确认">
                    恭喜，提交成功，点击确认关闭窗口
                </Layer>
                <Layer ref="layer3" title="提交失败" type="failure" confirm="确认" width="500">
                    <p>抱歉抱歉，提交失败，点击确认关闭窗口</p>
                    <p>失败原因：失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因失败原因</p>
                </Layer>
                <Layer ref="layer4" title="绑定银行卡" width="600">
                    <div className="ucs-form-group">
                        <label className="label">用户名：</label>
                        <div className="ucs-input-control">
                            <input type="text" className="ucs-input" placeholder="请输入用户名"/>
                        </div>
                    </div>
                    <div className="ucs-form-group">
                        <label className="label">密码：</label>
                        <div className="ucs-input-control">
                            <input type="password" className="ucs-input" placeholder="请输入用户名"/>
                        </div>
                    </div>
                    <div className="ucs-form-group">
                        <label className="label">下拉</label>
                        <SelectDropDown option={dropdown1} defaultText="下拉2" value="2"></SelectDropDown>
                    </div>
                    <div className="ucs-layer-footer">
                        <button className="ucs-btn ucs-btn-confirm" onClick={this._handleConfirm} data-layer="layer2">
                            确认
                        </button>
                    </div>
                </Layer>
                <Layer ref="layer5" title="注册协议" width="500" height="400" overflow={true}>
                    <p>注册协议</p>
                    <p style={{height:600}}>这里是详细内容</p>
                    <p>注册协议</p>
                </Layer>
                <Layer ref="layer6" title="自动关闭" autoClose="30">
                    <br/><br/><br/>自动关闭自动关闭
                </Layer>
                <Layer ref="layer7" title="回调" type="text" confirm="确定" cancel="取消" width="500"
                       confirmBack={this._confirmBack} cancelBack={this._cancelBack} closeBack={this._closeBack}>
                    点击确定、取消、关闭时回调
                </Layer>
                <Layer ref="layer8" title="不显示遮罩" maskLayer={false}>
                    不显示遮罩
                </Layer>
                <Layer ref="layer9">
                    只有内容没有标题
                </Layer>

            </div>
        );
    }
});
ReactDOM.render(<Root/>, document.getElementById('main'));