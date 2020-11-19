import React, { Component } from 'react';
import './Signup.css';
import { PostData } from '../../services/PostData';
import { Redirect, Link } from 'react-router-dom';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      email: "",
      redirect: false
    }
    this.signup = this.signup.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  signup() {
    if (this.state.email && this.state.password){
      PostData('api/signUp', this.state, 'POST').then((result) => {
        let responseJson = result;
        if (responseJson) {
          console.log(responseJson);
          this.setState({redirect: true});
        } else {
          console.log(responseJson);
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
      return (<Redirect to={'/login'} />)
    }

    if (sessionStorage.getItem('userData')) {
      return (<Redirect to={'/home'} />)
    }
    return (
      <div className="row small-up-2 medium-up-3 large-up-4">
        <div className="column bodyPart">
          <h2>Signup Page</h2>
          <label>Name</label>
          <input type="text" name="name" placeholder="Name" onChange={this.onChange} />
          <label>Password</label>
          <input type="password" name="password" placeholder="Password" onChange={this.onChange} />
          <label>Email</label>
          <input type="email" name="email" placeholder="Email" onChange={this.onChange} />
          <button type='submit' className='button' onClick={this.signup}>Signup</button>
          <Link to="/login" className="button success">Login</Link>
        </div>
      </div>
    );
  }
}

export default Signup;