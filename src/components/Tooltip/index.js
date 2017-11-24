var timerOut = '';
/**
 * Tooltip提示
 *
 * @param [position] 提示语显示位置，可选 top、right、bottom、left、top-right(默认)、top-left、bottom-right、bottom-left
 * @param [fixed] true|false 跟随鼠标移动，默认为true
 * @param [delay] 鼠标离开后延时关闭时间，默认为0。当提示语带有链接时，可设置延时关闭时间，以便可将鼠标移至提示语处并点击
 * @param [y] 鼠标/组件距离提示语的距离，即设置一空的距离不至于靠得太近
 * @param [x]
 *
 * 示例:
 *
 *     @example
 *     <Tooltip title="提示文字">Tooltip</Tooltip>
 */
var Tooltip = React.createClass({
    _addEventListener: function (obj, ev, fn) {
        obj.addEventListener ? obj.addEventListener(ev, fn, false) : obj.attachEvent("on" + ev, fn)
    },
    _removeEventListener: function (obj, ev, fn) {
        obj.removeEventListener ? obj.removeEventListener(ev, fn, false) : obj.detachEvent("on" + ev, fn)
    },
    getInitialState: function () {
        return {}
    },
    getDefaultProps: function () {
        return {
            position: 'top-right',
            //maxWidth: 600,
            fixed: true,
            delay: 0,
            y: 12,
            x: 12
        }
    },
    componentDidMount: function () {
        this._createElement();
    },

    //创建节点并添加鼠标事件
    _createElement: function () {
        this.tooptip = document.createElement('div');
        this.tooptip.id = 'tooltip';
        this.tooptip.className = 'tooltip';
        var arrow = document.createElement('span');
        arrow.className = 'tooltip-arrow';
        var content = document.createElement('div');
        content.className = 'tooltip-inner';

        this.tooptip.appendChild(arrow);
        this.tooptip.appendChild(content);

        this.element = document.getElementById('tooltip');
        if (this.element == undefined) {
            document.body.appendChild(this.tooptip);
            this.element = document.getElementById('tooltip');
        }
        var node = ReactDOM.findDOMNode(this);
        this.componentEl = node.childNodes[0].nodeType === 1 ? node.childNodes[0] : node;
        this._addEventListener(this.componentEl, this.props.fixed ? 'mouseenter' : 'mousemove', this._handleMouseMove);
        this._addEventListener(this.componentEl, 'mouseleave', this._handleMouseOut);
    },

    //鼠标事件，fixed=true时为mouseenter,否则为mousemove
    _handleMouseMove: function (e) {
        if (this.props.content === '') {
            return;
        }
        var windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
        this._setTooltipPosition(windowWidth, e);
    },

    //获取鼠标位置
    _getMousePos: function (e) {
        e = e || window.event;
        if (e.pageX || e.pageY) {
            return {x: e.pageX, y: e.pageY};
        }
        return {
            x: e.clientX + document.body.scrollLeft - document.body.clientLeft,
            y: e.clientY + document.body.scrollTop - document.body.clientTop
        };
    },

    _handleMouseOut: function () {
        var th = this;
        if (this.props.delay > 0 && this.props.fixed) {
            timerOut = setTimeout(function () {
                th.element.className = 'tooltip';
                //th.element.style = '';
                th.element.removeAttribute('style');
            }, this.props.delay);
            this._addEventListener(this.element, 'mouseenter', this._handleTooltipMouseEnter);
            this._addEventListener(this.element, 'mouseleave', this._handleTooltipMouseOut);
        } else {
            this.element.className = 'tooltip';
            //this.element.style = ' ';
            this.element.removeAttribute('style');
        }
    },

    _handleTooltipMouseEnter:function () {
        clearTimeout(timerOut)
    },

    _handleTooltipMouseOut: function () {
        this.element.className = 'tooltip';
        this.element.removeAttribute('style');
    },

    //设置提示语的位置及提示内容
    _setTooltipPosition: function (windowWidth, e) {
        var tooltip = this.element;
        var tooltipInner = tooltip.childNodes[1];
        tooltipInner.innerHTML = this.props.title;
        var style = tooltip.style;
        //style.maxWidth = this.props.maxWidth;

        var tooltipLeft = 0;
        var tooltipRight = 0;
        var tooltipTop = 0;
        var position = this.props.position;
        tooltip.className = 'tooltip hover ' + position;
        var CP = this._getComponentPosition();
        //小于最大宽时为实际宽，否则为最大宽
        var tooltipWidth = tooltip.offsetWidth;

        if (!this.props.fixed) {
            var mousePos = this._getMousePos();
            CP = {left: mousePos.x, top: mousePos.y, width: 0, height: 0};
        }
        //设置提示框的宽，取准确的高
        var setTooltipWidth = function (p, v) {
            if (p == "left") {
                style.width = tooltipWidth > v ? v + 'px' : "";
            } else if (p == "right") {
                style.width = tooltipWidth > windowWidth - v ? windowWidth - v + "px" : "";
            }
        };

        if (position == 'top' || position == 'bottom') {
            var tLeft = CP.left + (CP.width / 2) - tooltipWidth / 2;
            var tRight = windowWidth - (CP.left + (CP.width / 2)) - tooltipWidth / 2;
            if (tLeft < 0) {
                //考虑提示语超出浏览器两边的情况，为保证提示语居中，此时设置提示框宽，使内容换行
                tooltipLeft = 0;
                style.width = (CP.left + (CP.width / 2)) * 2 + 'px';
            } else if (tRight < 0) {
                tooltipLeft = 'auto';
                style.width = (windowWidth - (CP.left + (CP.width / 2))) * 2 + 'px';
                tooltipRight = 0;
            } else {
                tooltipLeft = tLeft;
            }
            if (position == 'top') {
                tooltipTop = CP.top - tooltip.offsetHeight - this.props.y;
            } else if (position == 'bottom') {
                tooltipTop = CP.top + CP.height + this.props.y;
            }
        }
        switch (position) {
            case 'left':
                tooltipLeft = 'auto';
                var left = CP.left - this.props.x;
                tooltipRight = windowWidth - left;
                //设置宽才取得准确高
                setTooltipWidth("left", left);
                //tooltip.style.width = tooltipWidth > left ? left + 'px' : tooltipWidth + 'px';
                tooltipTop = CP.top + CP.height / 2 - tooltip.offsetHeight / 2;
                break;
            case "right":
                tooltipLeft = CP.left + CP.width + this.props.x;
                if (tooltipWidth)
                    setTooltipWidth("right", tooltipLeft);
                //tooltip.style.width = tooltipWidth > windowWidth - tooltipLeft ? windowWidth - tooltipLeft + "px" : tooltipWidth + "px";
                tooltipTop = CP.top + CP.height / 2 - tooltip.offsetHeight / 2;
                break;
            case "top-left":
                tooltipLeft = 'auto';
                var left = CP.left + CP.width / 2 + this.props.x;
                tooltipRight = windowWidth - left;
                setTooltipWidth("left", left);
                //tooltip.style.width = tooltipWidth > left ? left + 'px' : tooltipWidth + 'px';
                tooltipTop = CP.top - tooltip.offsetHeight - this.props.y;
                break;
            case "top-right":
                tooltipLeft = CP.left + (CP.width / 2) - this.props.x;
                //设宽取高
                setTooltipWidth("right", tooltipLeft);
                //tooltip.style.width = tooltipWidth > windowWidth - tooltipLeft ? windowWidth - tooltipLeft + "px" : tooltipWidth + "px";
                tooltipTop = CP.top - tooltip.offsetHeight - this.props.y;
                break;
            case "bottom-left":
                tooltipLeft = 'auto';
                var left = CP.left + CP.width / 2 + this.props.x;
                tooltipRight = windowWidth - left;
                //设置宽才取得准确高
                setTooltipWidth("left", left);
                tooltipTop = CP.top + CP.height + this.props.y;
                break;
            case "bottom-right":
                tooltipLeft = CP.left + (CP.width / 2) - this.props.x;
                setTooltipWidth("right", tooltipLeft);
                tooltipTop = CP.top + CP.height + this.props.y;
                break;
        }
        if (tooltipLeft == 'auto') {
            style.right = tooltipRight + 'px';
            style.left = 'auto';
        } else {
            style.left = tooltipLeft + 'px';
        }
        style.top = tooltipTop + 'px';

    },

    //返回组件的位置及大小
    _getComponentPosition: function () {
        var componentRect = this.componentEl.getBoundingClientRect();
        var top = componentRect.top + (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);
        var left = componentRect.left + (window.pageXOffset || document.documentElement.scrollLeft) - (document.documentElement.clientLeft || 0);
        //组件宽高，
        var width = this.componentEl.offsetWidth;
        var height = this.componentEl.offsetHeight;
        return {left: left, top: top, width: width, height: height};
    },

    render: function () {
        return <div>{this.props.children}</div>
    }
});
module.exports = Tooltip;