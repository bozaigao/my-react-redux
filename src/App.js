/*
 * @Author: your name
 * @Date: 2020-08-02 08:36:23
 * @LastEditTime: 2020-08-02 11:32:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-app/src/App.js
 */
import React, { Component } from 'react';
import store from './store/'
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate()
    })
  }
  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }

  add() {
    store.dispatch({ type: 'ADD', payload: 1 })
    console.log('add');
  };

  asyncAdd() {
    store.dispatch(() => {
      setTimeout(() => {
        store.dispatch({ type: 'ADD', payload: 2 })
      }, 1000)
    })
    console.log('asyncAdd');
  };

  promise() {
    console.log('promise');
    store.dispatch(Promise.resolve({ type: "ADD", payload: 3 }))
  };

  render() {
    return (
      <div>
        <p>
          {store.getState().count}
        </p>
        <button onClick={this.add}>
          add
        </button>
        <button onClick={this.asyncAdd}>
          async-add
        </button>
        <button onClick={this.promise}>
          promise
        </button>
      </div>
    );
  }
}