import React, {Component} from 'react';
import PropTypes from 'prop-types'; // 参数类型包

class TodoItem extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this); //在构造方法中声明方法this的绑定，就不用在使用方法的时候bind了，而且节约性能
    }

    // 性能优化，减少不必要的渲染
    // 可以有两个内置参数
    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.content !== this.props.content) {
            return true;
        }
        return false;
    }

    render() {
        // this.props是构造方法的参数对象，通过这个获取参数
        // ES6特性 const声明常量, 使用 {} 获取值
        const { text,content }=  this.props;
        return (
            <li onClick={this.handleClick}>
                {text} - {content}
            </li>
        )
    }

    handleClick() {
        // 节省了变量说明的代码量
        const { deleteItem ,index } = this.props;
        deleteItem(index);
    }

    // 内置生命周期函数，触发条件
    // 1、当从组件接受父组件参数，父组件重新执行了render
    // 2、如果组件之前就存在于父组件中，子组件就会执行componentWillReceiveProps
    componentWillReceiveProps() {
        console.log('child componentWillReceiveProps');
    }

    // 当子组件从页面剔除之前触发
    componentWillUnmount() {
        console.log('child componentWillUnmount');
    }
}

// 属性校验，类型，必输之类的
TodoItem.propTypes = {
    text: PropTypes.string.isRequired, //校验必输
    content: PropTypes.string, // 字符
    deleteItem: PropTypes.func, // 方法
    index: PropTypes.number, //数字
}

// 设置默认值
TodoItem.defaultProps = {
    text: 'Hello React',
}

export default  TodoItem;