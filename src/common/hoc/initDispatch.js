import React from 'react';
import {init} from '../dispatcher';

export const initDispatch = Component => class extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    init((action) => {
      this.setState(action)
    });
  }

  render() {
    return super.render();
  }
}
