import React, { Component } from 'react';
import './Home.css';
import { PostData } from '../../services/PostData';
import { Redirect, Link } from 'react-router-dom';
import { RecordList } from './RecordList';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { redirect: false, blogs: [] }
    this.blogList = this.blogList.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout() {
    sessionStorage.removeItem('userData');
    this.setState({ redirect: true });
  }

  componentWillMount() {
    if (sessionStorage.getItem('userData')) {
      PostData('api/getBlog', this.state, 'GET').then((result) => {
        let responseJson = result;
        if (responseJson) {
          this.setState({blogs: responseJson});
        } else {
          console.log(responseJson);
        }
      });
    } else {
      this.setState({ redirect: true });
    }
  }

  blogList() {
    return this.state.blogs.map(function (object, i) {
      return <RecordList obj={object} key={i} />
    });
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to={'/login'} />);
    }

    return (
      <div className="row small-up-2 medium-up-3 large-up-4">
        <div className="column" style={{width: '100%'}}>
        <Link to="/addblog" className="button success align1">Add Blog</Link>
        <button type='button' className="button danger align" onClick={this.logout}>Logout</button>
        </div>
        <div className="column" style={{width: '100%'}}>
        <table className="table-border" border="2px" style={{width: '100%'}}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Sub Title</th>
              <th>Tags</th>
              <th>Content</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            { this.blogList() }
          </tbody>
        </table>
          {/* <button type='button' className="button danger" onClick={this.logout}>Logout</button> */}
        </div>
      </div>
    );
  }
}

export default Home;