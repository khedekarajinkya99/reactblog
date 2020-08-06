import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/foundation.min.css';
import './styles/custom.css';
import HEADER from './components/Header/Header';
import MOBILEHEADER from './components/MobileHeader/MobileHeader';
import FOOTER from './components/Footer/Footer';
import WELCOME from './components/Welcome/Welcome';
import Routes from './routes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appName: 'Login App',
    };
  }
  render() {
    return (
      <div className="off-canvas-wrapper">
        <div className="off-canvas-wrapper-inner" data-off-canvas-wrapper>
          <div className="off-canvas-content" data-off-canvas-content>
            <MOBILEHEADER name={this.state.appName}/>
            <HEADER />
            <Routes />
            <hr/>
            <FOOTER />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
