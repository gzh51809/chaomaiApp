import React, { Component } from 'react';
// import { NavBar, Icon } from 'antd-mobile';
import { Toast} from 'antd-mobile';
import './App.css';

function showToast() {
  Toast.info('This is a toast tips !!!', 1);
}

class App extends Component {
  render() {
    return (
      <div>
        <button onClick={showToast}></button>
      </div>

    );
  }
}

export default App;
