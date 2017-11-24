require("../../scss/index.scss");
var SelectDropDown = require('../../components/SelectDropDown');
var dropdown1 = [
    {
        option: "下拉11",
        value: "1"
    },
    {
        option: "下拉12",
        value: "2"

    },
    {
        option: "下拉3 disabled为true时不能选择",
        value: "3",
        disabled: true
    },
    {
        option: "下拉4",
        disabled: true //不能选择
    },
    {
        option: "下拉5",
        value: "5"
    },
    {
        option: "下拉6",
        value: "6"
    },
    {
        option: "下拉7",
        value: "7"
    },
    {
        option: "下拉8",
        value: "8"
    },
    {
        option: "下拉9",
        value: "9"
    },
    {
        option: "下拉10",
        value: "10"
    }
];
var dropdown2 = [
    {
        option: "下拉1没对应value0",
        value: "1"
    },
    {
        option: "下拉22",
        value: "2"
    },
    {
        option: "下拉33"
    },
    {
        option: "下拉44"
    },
    {
        option: "下拉55"
    }
];
var dropdown3 = [
    {
        option: "7255*1121 张*",
        bankLogo: "icbc",
        value: ""
    },
    {
        option: "8255*1121 张*",
        bankLogo: "abc"
    },
    {
        option: "6555*1121 张*",
        bankLogo: "ccb"
    },
    {
        option: "155*1121 张4*",
        bankLogo: "icbc",
        value: 4
    },
    {
        option: "6255*1121 李*",
        bankLogo: "icbc",
        value: 5
    }
];
var dropdown4 = [
    {
        option: "风控管理系统",
        value:'1'
    },
    {
        option: "Merchant_web",
        value:'2'
    },
    {
        option: "TabLauncher",
        value:'3'
    },
    {
        option: "terminal-api",
        value:'4'
    },
    {
        option: "网金应用",
        value:'5'
    },
    {
        option: "终端监控后台",
        value:'6'
    },
    {
        option: "接口测试",
        value:'7'
    },
    {
        option: "信审系统",
        value:''
    },
    {
        option: "ucas_client",
        value:'8'
    },
    {
        option: "AOS_WEB",
        value:'9'
    }
];

var Root = React.createClass({
    getInitialState: function () {
        return {
            dropDate: '',
            disabled:true,
            value:''
        }
    },
    getValue: function () {
        alert(this.refs.dropdown.getValue())
    },
    setValue1: function () {
        this.setState({
            dropDate: dropdown2,
            disabled:false
        })
    },
    setValue2: function () {
        this.setState({
            dropDate: dropdown1
        })
    },
    onChange:function (v) {
        console.log(v);
    },
    setValueValue:function () {
        this.setState({
            value:3
        })
    },
    setValueValue2:function () {
        this.refs.dropdown2.setValue(4)
    },
    render: function () {

        return (
            <div>
                <p>显示框外观引用了input的样式，保持整个表单输入框外观一致；<br/>
                    因为默认时会在ucs-input添加placeholder样式，下拉选择后则会去掉该样式;<br/>
                    需要设置宽时，像input一样，在ucs-input里设置即可，外层标签会自动计算宽
                </p>
                <br/>

                <br/>

                <br/>
                <h3>初始时没下拉数据，并且是不可点击状态</h3>
                <SelectDropDown disabled={this.state.disabled} defaultText="请选择"/>

                <hr/>
                <h3>初始时没任何数据时</h3>
                <SelectDropDown defaultText="请选择" option={[]}/>
                <hr/>
                <h3>正常状态</h3>
                <SelectDropDown defaultText="请选择" defaultValue="" option={dropdown1} onChange={this.onChange}/>
                <hr/>
                <h3>设定下拉个数</h3>
                <SelectDropDown defaultText="请选择" option={dropdown1} onChange={this.onChange} showNum="5"/>
                <h3>没有defaultText默认值时</h3>
                <SelectDropDown option={dropdown1} onChange={this.onChange} showNum="5"/>
                <hr/>
                <h3>指定下拉选中值，相当修改</h3>
                <SelectDropDown option={dropdown1} onChange={this.onChange} showNum="5" value="8"/>
                <hr/>
                <h3>银行卡下拉</h3>
                <SelectDropDown option={dropdown3} type="bank"/>
                <hr/>
                <h3>带搜索下拉（在下拉数据里搜索）</h3>
                <SelectDropDown option={dropdown4} type="search" defaultText="请选择"/>
                <h3>url请求数据时</h3>
                <SelectDropDown option={dropdown3} defaultText="请选择" url="package.json"/>
                <h3>取值设值</h3>
                <SelectDropDown option={this.state.dropDate} defaultText="请选择" ref="dropdown"/>
                <div onClick={this.setValue1}>设值</div>
                <br/><br/>
                <div onClick={this.setValue2}>再次设值</div>
                <br/><br/>
                <div onClick={this.getValue}>取值</div>
                <hr/>
                <h3>取值设值value</h3>
                <SelectDropDown option={dropdown4} defaultText="请选择" ref="dropdown2" value={this.state.value}/>
                <br/>
                <div onClick={this.setValueValue}>设值setState</div>
                <br/>
                <div onClick={this.setValueValue2}>设值setValue</div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        )
    }
});

ReactDOM.render(<Root/>, document.getElementById('main'));