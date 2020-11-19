import React, { Component } from 'react';
import './AddBlog.css';
import { PostData } from '../../services/PostData';
import { Redirect, Link } from 'react-router-dom';

class AddBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      sub_title: "",
      tags: "",
      content: "",
      redirect: false,
    }
    this.onChange = this.onChange.bind(this);
    this.addBlog = this.addBlog.bind(this);
  }

  addBlog() {
    PostData('api/addBlog', this.state).then((result) => {
      let responseJson = result;
      if (responseJson) {
        console.log(responseJson);
        this.setState({redirect: true});
      } else {
        console.log(responseJson);
      }
    });
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
    return (
      <div className="row small-up-2 medium-up-3 large-up-4">
        <div className="column bodyPart">
          <h2>Add Blogs</h2>
          <label>Title</label>
          <input type="text" name="title" placeholder="Title" onChange={this.onChange} />
          <label>Sub Title</label>
          <input type="text" name="sub_title" placeholder="Sub Title" onChange={this.onChange} />
          <label>Tags</label>
          <input type="text" name="tags" placeholder="Tags" onChange={this.onChange} />
          <label>Content</label>
          <textarea name="content" placeholder="Content" onChange={this.onChange}></textarea>
          <button type='submit' className='button' onClick={this.addBlog}>Add</button>
        </div>
      </div>
    );
  }
}

export default AddBlog;