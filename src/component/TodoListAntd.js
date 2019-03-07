import React, {Component, Fragment} from 'react';
import 'antd/dist/antd.css';
import {Button, Icon, Input, List} from 'antd';
import store from '../store';

class TodoListAntd extends Component {

    constructor(props) {
        super(props);
        // 从store里初始化state
        this.state = store.getState();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.addItem = this.addItem.bind(this);
        this.handleStoreChange = this.handleStoreChange.bind(this);
        this.deleteItem = this.deleteItem.bind(this);

        // 订阅store, 可以执行回调方法
        store.subscribe(this.handleStoreChange);
    }

    render() {
        return (
            <Fragment>
                <div style={{padding: 20}}>
                    <Input placeholder="todo info"
                           style={{width: 500}}
                           value={this.state.inputValue}
                           onChange={this.handleInputChange}
                    />
                    <Button type="primary" onClick={this.addItem} style={{marginLeft: 20}}>提交</Button>
                    <List
                        style={{marginTop: 10, width: 500}}
                        bordered
                        dataSource={this.state.list}
                        renderItem={(item, index) => (
                            <List.Item onClick={this.deleteItem.bind(this, index)}>
                                {item}
                                <Icon type="sync" spin style={{marginLeft: 30}}/>
                            </List.Item>
                        )}
                    />
                </div>
            </Fragment>
        )
    }

    handleInputChange(e) {
        // action type是必须的，其他的值是自定义的json
        const action = {
            type: 'change_input_value',
            value: e.target.value
        }
        // 数据action转发给store，
        store.dispatch(action);
    }

    addItem() {
        const action = {
            type: 'add_item'
        }
        store.dispatch(action);

    }

    deleteItem(index) {
        const action = {
            type: 'delete_item',
            index: index
        }
        store.dispatch(action);
    }

    handleStoreChange() {
        this.setState(() => (store.getState()));
    }
}

export default TodoListAntd;