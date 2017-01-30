import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'views/AppContainer';

class App {
  run() {
    if (module.hot) {
      module.hot.accept();
    }

    let appView = <AppContainer />;
    render(appView, document.getElementById('mountPoint'));
  }
}

export const app = new App();
