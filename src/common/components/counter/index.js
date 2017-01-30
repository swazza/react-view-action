import React from 'react';
import {increment, decrement} from './actions';
import {initDispatch} from 'hoc/initDispatch';
import {dispatch} from '../../dispatcher';

class _Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 0}
  }

  render() {
    return (
      <div>
        <button onClick={() => dispatch(decrement)}> - </button>
        <span>{this.state.count}</span>
        <button onClick={() => dispatch(increment)}> + </button>
      </div>
    )
  }
}

export const Counter = initDispatch(_Counter);
