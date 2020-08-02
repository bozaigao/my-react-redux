import { createStore, applyMiddleware } from "../redux";
import isPromise from 'is-promise'

/*
 * @Author: 定义store、reducer以及中间件
 * @Date: 2020-08-02 09:00:08
 * @LastEditTime: 2020-08-02 10:38:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-app/src/store/index.js
 */
let initState = {
    count: 1
}
function countReducer(state = initState, action) {
    switch (action.type) {
        case "ADD":
            return {
                ...state,
                count: state.count + action.payload
            }
        default: return state
    }
}

export default createStore(countReducer, applyMiddleware(logger,thunk,Promise))


function logger({ getState, dispatch }) {
    return next => action => {
        console.log('pre state', getState());
        const returnValue = next(action)
        console.log('next state', getState());
        return returnValue
    }
}

function thunk({ getState, dispatch }) {
    return next => action => {
        if (typeof action === 'function') {
            return action(dispatch, getState)
        }

        return next(action)
    }
}


function Promise({ dispatch }) {
    return next => action => {
        console.log('执行promise');
        return isPromise(action) ? action.then(dispatch) : next(action);
    };
}