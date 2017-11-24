require("../../scss/index.scss");
var classNames = require('classnames');
/**
 * Button组件
 *
 * 示例：
 *
 *      @example
 */
var Button = React.createClass({
    getInitialState: function () {
        return {};
    },
    getDefaultProps: function () {
        return {
            type: "button"
        }
    },
    render: function () {
        return (
            <button {...this.props}
                type={this.props.type}
                className={classNames(
                "btn",this.props.className,
                {"btn-disabled":this.props.disabled=="disabled"}
                )}>
                {this.props.children}</button>
        )
    }
});
module.exports = Button;