/**
 * 定义一个组件
 */
// 引入React
import React, {Component} from 'react';
// 引入子组件
import TodoItem from './TodoItem';
import '../assets/css/TodoList.css';
// ajax包
import axios from 'axios';
import 'antd/dist/antd.css';

// 定义组件模板类 使用JSX语法，js与html混写
class TodoList extends Component {

    /**
     * 构造函数
     * @param props
     */
    constructor(props) {
        super(props);
        // state 是内置变量, 一般用于定义组件的属性
        this.state = {
            inputValue: '',
            list: [],
            show: true
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.handleInputVisible = this.handleInputVisible.bind(this);
    }

    // 内置生命周期函数，在【组件即将挂在到页面之前】执行，在render前执行
    componentWillMount() {
        console.log('componentWillMount');
    }

    // 渲染函数，也是生命周期函数，return JSX模板
    render() {
        console.log('render');
        return (
            // 最外层的标签只能有一个
            <div>
                <div>
                    <label htmlFor="insertInput" className={this.state.show ? 'show' : 'hide'}>请输入</label>
                    {/*实现数据绑定*/}
                    <input id="insertInput"
                           value={this.state.inputValue}
                           onChange={this.handleInputChange}
                           className={this.state.show ? 'show' : 'hide'}
                    />
                    <button onClick={this.handleButtonClick}>提交</button>
                    <button onClick={this.handleInputVisible}>改变</button>
                </div>
                <ul ref={(ul) => {
                    this.ul = ul
                }}> {/*使用ref 将DOM元素声明成JS变量,在js中可以使用this.ul来使用*/}
                    {this.getTodoItem()}
                </ul>
            </div>
        )
    }

    // 内置生命周期函数，在【组件即将挂在到页面之后】执行，在render后执行
    // 适合发送ajax做初始化请求的地方
    componentDidMount() {
        console.log('componentDidMount');
        axios.get('/api/todolist').then((result) => {
            alert("success");
        }).catch((result) => {
            let message = '';
            switch (result.response.status) {
                case 404:
                    message = "请求地址不存在";
                    break;
                default:
                    message = '未知错误';
                    break;
            }
            console.log(message);
        });
    }

    // 内置生命周期函数，【组件更新之前】执行，返回boolean值，false就不允许更新
    shouldComponentUpdate() {
        console.log('shouldComponentUpdate');
        return true;
    }

    // 内置生命周期函数，【组件更新执行render前】执行
    componentWillUpdate() {
        console.log('componentWillUpdate');
        return true;
    }

    // 内置生命周期函数，在【组件更新执行render后】执行
    componentDidUpdate() {
        console.log('componentDidUpdate');
    }

    // 内置生命周期函数，触发条件
    // 1、当从组件接受父组件参数，父组件重新执行了render
    // 2、如果组件之前就存在于父组件中，子组件就会执行componentWillReceiveProps
    // 这里是根组件，所以不会执行
    componentWillReceiveProps() {
        console.log('componentWillReceiveProps');
    }

    getTodoItem() {
        // ES6的map遍历
        return this.state.list.map((item, index) => {
            //遍历的最外层元素一定要给key，否则会警告
            /* return <li key={index} onClick={this.deleteItem.bind(this, index)}>{item}</li>*/

            /*
            * 父组件传递参数给字组件，普通值属性直接传递
            * 传递父组件方法需要bind父组件的this
            * */
            return (
                <TodoItem
                    key={index}
                    content={item}
                    index={index}
                    deleteItem={this.deleteItem}
                />
            )
        })
    }

    /**
     * 定义方法实现input的双向绑定（这有点麻烦，没有kendo中viewModel.bind + data-bind 方便）
     * @param e
     */
    handleInputChange(e) {
        // 实现属相绑定动态渲染必须使用set来修改属性，和kendo的mvvm viewModel的操作是同理的,必须使用set才能触发响应

        // 旧写法
        /*this.setState({
            inputValue: e.target.value
        });*/

        // 优化后的写法，异步渲染，使用ES6的表达式，使用的是函数返回,()简写带表{ return 对象 }
        const value = e.target.value;
        this.setState(() => ({
            inputValue: value
        }));
    }

    handleButtonClick(e) {
        // 1、 旧的写法
        /*var list = this.state.list;
        list.push(this.state.inputValue);
        this.setState({
            list: list
        });*/

        // 2、ES6写法 少了两行
        /*this.setState({
            // ... 是list展开运算符
            list: [...this.state.list, this.state.inputValue],
            inputValue: ''
        });*/

        // 3、性能优化，使用函数返回对象异步
        // 可以传入参数prevState，等价于this.state
        this.setState((prevState) => ({
            list: [...prevState.list, prevState.inputValue],
            inputValue: ''
        }), () => {
            //setState的回调函数，因为setState是异步的
            console.log(this.ul.querySelectorAll('li').length);
        });
    }

    deleteItem(index) {
        // 1、不推荐的写法，state不允许直接修改
        // const list = this.state.list;

        // 2、一般写法
        /*const list = [...this.state.list] // 推荐使用state的副本
        //splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。
        list.splice(index, 1);
        this.setState({
            list: list,
        });*/

        // 优化的写法,
        this.setState((prevState) => {
            const list = [...prevState.list];
            list.splice(index, 1);
            return {list}; // ES6简写，相当于 return {list: list}
        });
    }

    /**
     * 实现CSS动态效果
     */
    handleInputVisible() {
        this.setState((prevState) => ({
            show: !prevState.show
        }));
    }

}

//导出组件
export default TodoList;