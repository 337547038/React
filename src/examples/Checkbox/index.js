var classnames = require('classnames');
var Checkbox = require('../../components/Checkbox');
var CheckboxGroup = Checkbox.Group;
var Demo1 = React.createClass({
    render: function () {
        return (
            <div>
                <h2>基本用法</h2>
                <Checkbox text="选项1"/>
                <Checkbox text="选项2"/>
                <Checkbox text="选项3"/>
                <Checkbox text="选中" checked='checked'/>
                <Checkbox text="禁用" disabled='disabled'/>
            </div>
        )
    }
});
var Demo2 = React.createClass({
    getInitialState: function () {
        return {value: ''}
    },
    _onChange: function (e) {
        console.log(e.target.value + "," + e.target.checked);
        this.setState({value: '单选值：' + e.target.value + ",选中状态：" + e.target.checked})
    },
    render: function () {
        return (
            <div>
                <hr/>
                <h2>Demo2：取值</h2>
                <p>当前控件点击时，通过e.target取值</p>
                <p>没有传value时，返回的值始终为on，带value时始终为value，因此这value没意义</p>
                <Checkbox text="单击取值" onChange={this._onChange}/>
                <br/>
                <Checkbox text="单击取值2，value=1" onChange={this._onChange} value="1"/>
                <br/>
                <p>{this.state.value}</p>
            </div>
        )
    }
});
var Demo3 = React.createClass({
    getInitialState: function () {
        return {value: ""}
    },
    _onClick: function () {
        var value = this.refs.Checkbox.getValue();
        console.log(value);
    },
    _onClick2: function () {
        var value = this.refs.Checkbox2.getValue();
        console.log(value);
    },
    render: function () {
        return (
            <div>
                <hr/>
                <h2>Demo3：取值2</h2>
                <p>{this.state.value}</p>
                <p>没有value时，选中与不选返回true或false<br/>
                    有value时选中返回value值，不选返回false</p>
                <p>对于单个使用时，一般情况下不需要设置value，只有选与不选状态</p>

                <Checkbox text="选项1没value" ref="Checkbox"/>
                <a href="javascript:;" onClick={this._onClick}>取值</a>
                <br/>
                <Checkbox text="选项2有value" ref="Checkbox2" value="1"/>
                <a href="javascript:;" onClick={this._onClick2}>取值</a>
            </div>
        )
    }
});
var Demo4 = React.createClass({
    getInitialState: function () {
        return {checked: false}
    },
    _onClick: function () {
        this.refs.Checkbox.setValue(true)
    },
    _onClickGet: function () {
        var value = this.refs.Checkbox.getValue();
        console.log(value);
    },
    _onClick2: function () {
        this.setState({checked: true})
    },
    _onClickGet2: function () {
        var value = this.refs.Checkbox2.getValue();
        console.log(value);
    },
    render: function () {
        return (
            <div>
                <hr/>
                <h2>Demo4：动态设置状态</h2>
                <p>两种设置状态方式</p>
                <Checkbox text="选项" ref="Checkbox"/>
                <a href="javascript:;" onClick={this._onClick}>设值</a>
                <a href="javascript:;" onClick={this._onClickGet} style={{marginLeft:'20px'}}>取值</a>
                <br/>
                <Checkbox text="选项2" checked={this.state.checked} ref="Checkbox2"/>
                <a href="javascript:;" onClick={this._onClick2}>state设值</a>
                <a href="javascript:;" onClick={this._onClickGet2} style={{marginLeft:'20px'}}>取值</a>
            </div>
        )
    }
});
var Demo5 = React.createClass({
    render: function () {
        return (
            <div>
                <hr/>
                <h2>Demo5：在表格或列表中</h2>
                <table>
                    <tr>
                        <td><Checkbox value="1"/></td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td><Checkbox value="2"/></td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td><Checkbox value="3"/></td>
                        <td>3</td>
                    </tr>
                </table>
            </div>
        )
    }
});
var Demo6 = React.createClass({
    getInitialState: function () {
        return {value: ''}
    },
    getValue: function () {
        var a = this.refs.checkbox.getValue();
        console.log(a);
        this.setState({value: a.toString()})
    },
    selectAll: function () {
        this.refs.checkbox.selectAll(true);
    },
    selectNo: function () {
        this.refs.checkbox.selectAll(false);
    },
    render: function () {
        var data = [
            {text: '禁用', value: 1, disabled: true},
            {text: '选项2', value: 2},
            {text: '选项3', value: 3, checked: true},
            {text: '选项4', value: 4, checked: true},
            {text: '选项5', value: 5},
            {text: '选项6', value: 6},
            {text: '选项7', value: 7},
            {text: '选项8', value: '8y'}
        ];
        return (
            <div>
                <hr/>
                <h2>Demo6：组应用</h2>
                <CheckboxGroup options={data} className="a" ref="checkbox"/>
                <br/>
                {this.state.value}<br/>
                <a href="javascript:;" onClick={this.getValue}>取值</a><br/>
                <a href="javascript:;" onClick={this.selectAll}>全选</a><br/>
                <a href="javascript:;" onClick={this.selectNo}>全不选</a><br/>
            </div>
        )
    }
});
var Root = React.createClass({
    getInitialState: function () {
        return {}
    },
    componentDidMount: function () {

    },
    render: function () {
        return (
            <div>
                <Demo1/>
                <Demo2/>
                <Demo3/>
                <Demo4/>
                <Demo5/>
                <Demo6/>
            </div>
        )
    }
});


ReactDOM.render(
    <Root/>
    , document.getElementById('main'));