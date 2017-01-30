import React from 'react';
import {Counter} from 'components/counter';

export class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 }
  }

  render() {
    return (
      <Counter />
    )
  }
}
