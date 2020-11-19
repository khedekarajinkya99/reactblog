import React, { Component } from 'react';
import './EditBlog.css';
import { PostData } from '../../services/PostData';
import { Redirect, Link } from 'react-router-dom';

class EditBlog extends Component {
  constructor(props) {
    super(props);
    console.log(props.location.aboutProps.id);
    this.state = {
      title: "",
      sub_title: "",
      tags: "",
      content: "",
      id: "",
      redirect: false,
    }
    this.onChange = this.onChange.bind(this);
    this.updateBlog = this.updateBlog.bind(this);
  }

  componentDidMount() {
    PostData('api/editBlog/'+this.props.location.aboutProps.id, this.state, 'GET').then((result) => {
      let responseJson = result;
      if (responseJson) {
        this.setState({
          title: responseJson.title,
          sub_title: responseJson.sub_title,
          tags: responseJson.tags,
          content: responseJson.content,
          id: responseJson.id,
        }, () => {
          console.log(this.state, 'checking state');
        });
      } else {
        console.log(responseJson);
      }
    });
  }

  updateBlog() {
    PostData('api/updateBlog', this.state).then((result) => {
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
          <h2>Edit Blogs</h2>
          <label>Title</label>
          <input type="text" name="title" placeholder="Title" value={this.state.title} onChange={this.onChange} />
          <label>Sub Title</label>
          <input type="text" name="sub_title" placeholder="Sub Title" value={this.state.sub_title} onChange={this.onChange} />
          <label>Tags</label>
          <input type="text" name="tags" placeholder="Tags" value={this.state.tags} onChange={this.onChange} />
          <label>Content</label>
          <textarea name="content" placeholder="Content" value={this.state.content} onChange={this.onChange}></textarea>
          <input type="hidden" name="hidden_id" value={this.state.id} onChange={this.onChange}/>
          <button type='submit' className='button' onClick={this.updateBlog}>Update</button>
        </div>
      </div>
    );
  }
}

export default EditBlog;