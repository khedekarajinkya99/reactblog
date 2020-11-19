import React, { Component } from 'react';
import './Login.css';
import { PostData } from '../../services/PostData';
import { Redirect, Link } from 'react-router-dom';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      redirect: false
    }
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  login() {
    if (this.state.email && this.state.password){
      PostData('api/loginUser', this.state, 'POST').then((result) => {
        let responseJson = JSON.stringify(result);
        if (responseJson) {
          
          sessionStorage.setItem('userData', responseJson);
          this.setState({redirect: true});
        } else {
          console.log("Login Error");
        }
      });
    }
  }

  onChange(e) {
      this.setState({
        [e.target.name]: e.target.value,
      });
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to={'/home'} />)
    }

    if (sessionStorage.getItem('userData')) {
      return (<Redirect to={'/home'} />)
    }
    return (
      <div className="row small-up-2 medium-up-3 large-up-4">
        <div className="column bodyPart">
          <h2>Login Page</h2>
          <label>Email</label>
          <input type="email" name="email" placeholder="Email" onChange={this.onChange} />
          <label>Password</label>
          <input type="password" name="password" placeholder="Password" onChange={this.onChange} />
          <button type='submit' class='button' onClick={this.login}>Login</button>
          <Link to="/signup" className="button success">Signup</Link>
        </div>
      </div>
    );
  }
}

export default Login;