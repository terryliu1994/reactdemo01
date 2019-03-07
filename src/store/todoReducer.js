const defaultState = {
    inputValue: '',
    list: []
}

export default (state = defaultState, action) => {
    const newState = JSON.parse(JSON.stringify(state)); //深拷贝旧state，避免直接修改state
    if (action.type === 'change_input_value') {
        newState.inputValue = action.value;
    } else if (action.type === 'add_item') {
        newState.list = [...newState.list,newState.inputValue];
        newState.inputValue = '';
    } else if (action.type === 'delete_item') {
        newState.list.splice(action.index, 1);
    }
    return newState;
}