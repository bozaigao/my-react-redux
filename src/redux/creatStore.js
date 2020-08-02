/*
 * @Author: your name
 * @Date: 2020-08-02 08:56:19
 * @LastEditTime: 2020-08-02 10:10:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-app/src/redux/creatStore.js
 */
export default function createStore(reducer, enhancer) {
    if (enhancer) {
        return enhancer(createStore)(reducer)
    }

    let currentState, currentListeners = []


    function getState() {
        return currentState
    }

    function dispatch(action) {
        currentState = reducer(currentState, action)
        console.log(currentState);
        currentListeners.forEach(listener => listener())
    }

    function subscribe(cb) {
        currentListeners.push(cb)

        return function unsubscribe() {
            let index = currentListeners.indexOf(cb)
            currentListeners.splice(index, 1)
        }
    }

    dispatch({ type: 'NO_EXIT' })

    return {
        getState,
        dispatch,
        subscribe
    }

};