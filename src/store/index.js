import { createStore } from 'redux';
import reduce from './todoReducer';

// 比喻： store相当于图书管理员，reduce相当于图书，组件可以通过store来借书
// 最后一行开启Chrome上面的redux调试工具
const store  = createStore(
    reduce,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;