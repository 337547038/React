require("../../scss/index.scss");
var Tooltip = require("../../components/Tooltip");

var Root = React.createClass({
    getInitialState: function () {
        return {a: ''}
    },
    click: function () {
        this.setState({a: '1'});
    },
    render: function () {
        return (
            <div className="tooltip-test">

                <Tooltip title="正上方提示，当提示语宽度超过最大宽或超出浏览器显示区时，会自动换行会自动换行会自动换行会自动换行" position="top">
                    <i className="icon">正上方</i>
                </Tooltip>
                <Tooltip title="右边中间对齐" position="right">
                    <i className="icon">右边中间对齐</i>
                </Tooltip>
                <Tooltip title="右边中间对齐，内容超出最大宽或到达浏览器最右边时，会自动换行" position="right">
                    <i className="icon">右边中间对齐</i>
                </Tooltip>
                <Tooltip title="正下方提示，当提示语宽度超过最大宽或超出浏览器显示区时，会自动换行" position="bottom">
                    <i className="icon">正下方</i>
                </Tooltip>
                <Tooltip title="左边中间提示，当提示语宽度超过最大宽或超出浏览器显示区时，会自动换行" position="left">
                    <i className="icon">左边中间</i>
                </Tooltip>
                <Tooltip title="上方右边提示，当提示语宽度超过最大宽或超出浏览器显示区时，会自动换行" position="top-right">
                    <i className="icon">上方右边</i>
                </Tooltip>
                <Tooltip title="上方左边提示，当提示语宽度超过最大宽或超出浏览器显示区时，会自动换行" position="top-left">
                    <i className="icon">上方左边</i>
                </Tooltip>
                <Tooltip title="底部右下边提示，当提示语宽度超过最大宽或超出浏览器显示区时，会自动换行" position="bottom-right">
                    <i className="icon">底部右下边</i>
                </Tooltip>
                <Tooltip title="底部左下边提示，当提示语宽度超过最大宽或超出浏览器显示区时，会自动换行" position="bottom-left">
                    <i className="icon">底部左下边</i>
                </Tooltip>
                <Tooltip title="当提示语宽度超过最大宽或超出浏览器显示区时，会自动换行" position="top-right" x="10">
                    <i className="icon icon-default"></i>
                </Tooltip>
                <div style={{clear:"both"}}></div>
                <Tooltip delay="500" title="设置一个延时关闭时间，实现鼠标可移至提示语处并点击，并且只有在fixed为true时有效。当提示语宽度超过最大宽或超出浏览器显示区时，会自动换行，<a href='#'>详情</a>">
                    <i className="icon">提示语可点击</i>
                </Tooltip>
            </div>
        )
    }
});
ReactDOM.render(
    <Root/>
    , document.getElementById('main'));