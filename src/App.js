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

    //数组求和，求乘积
    var arr = [1, 2, 3, 4];
    var sum = arr.reduce((x, y) => x + y)
    var mul = arr.reduce((x, y) => x * y)
    console.log(sum); //求和，10
    console.log(mul); //求乘积，24

    //计算数组中每个元素出现的次数

    let names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice'];

    let nameNum = names.reduce((pre, cur, index, arrar) => {
      if (cur in pre) {
        pre[cur]++
      } else {
        pre[cur] = 1
      }
      return pre
    }, {})
    // console.log(nameNum); //{Alice: 2, Bob: 1, Tiff: 1, Bruce: 1}


    //数组去重
    let array = [1, 2, 3, 4, 4, 1]
    let quchong = array.reduce((pre, cur, index, arrar) => {
      if (pre.indexOf(cur) === -1) {
        pre.push(cur)
      }
      return pre;
    }, [])

    // console.log('数组去重复', quchong);

    //将二维数组转化为一维
    let array1 = [[0, 1], [2, 3], [4, 5]]
    let yiwei = array1.reduce((pre, cur, index, arrar) => {
      console.log(pre, cur, index, arrar);
      return pre.concat(cur)
    }, [])

    console.log('一维', yiwei);

    //将多维数组转化为一维
    let array2 = [[0, 1], [2, 3], [4, [5, 6, 7]]];
    let newArray = function (array) {
      return array.reduce((pre, cur) => pre.concat(Array.isArray(cur) ? newArray(cur) : cur), [])
    }

    console.log('多维', newArray(array2));


    //对象里的属性求和
    var result = [
      {
        subject: 'math',
        score: 10
      },
      {
        subject: 'chinese',
        score: 20
      },
      {
        subject: 'english',
        score: 30
      }
    ];

    var sum = result.reduce(function (prev, cur) {
      return cur.score + prev;
    }, 0);
    console.log(sum) //60
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