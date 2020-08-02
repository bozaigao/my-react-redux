/*
 * @Author: your name
 * @Date: 2020-08-02 08:56:31
 * @LastEditTime: 2020-08-02 15:15:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-app/src/redux/applyMiddleWare.js
 */


export default function applyMiddleware(...midlewares) {
    return createStore => reducer => {
        let store = createStore(reducer);

        let dispatch = store.dispatch;


        let api = {
            getState: store.getState,
            dispatch: (action, ...args) => dispatch(action, ...args)
        }

        const middlewareChain = midlewares.map(middleware => middleware(api))


        dispatch = compose(...middlewareChain)(dispatch)

        return {
            ...store,
            dispatch
        }
    }
};


function compose(...funs) {
    if (funs.length === 0) {
        return args => args;
    } else if (funs.length === 1) {
        return funs[0];
    } else {
        return funs.reduce((a, b) => (...args) => a(b(...args)))
    }
}
