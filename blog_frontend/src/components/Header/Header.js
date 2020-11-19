import React, { Component } from 'react';
import './Header.css';
import { Redirect } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false }
  }

  

  render() {
    
    return (
      <div className="callout primary">
        <div className="row column">
        <h1 className='area'>Blog</h1>
        </div>
      </div>
    );
  }
}

export default Header;