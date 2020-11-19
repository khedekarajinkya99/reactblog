import React, { Component } from 'react';
import { PostData } from '../../services/PostData';
import { Redirect, Link } from 'react-router-dom';

export class RecordList extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.state = { redirect: false }
    
  }

  delete() {
    PostData('api/deleteBlog/'+this.props.obj.id, this.state, 'GET').then((result) => {
      let responseJson = result;
      if (responseJson) {
        this.setState({redirect: true});
      } else {
        console.log(responseJson);
      }
    });
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to={'/home'} />);
    }

    return (
      <tr>
        <td>{this.props.obj.title}</td>
        <td>{this.props.obj.sub_title}</td>
        <td>{this.props.obj.tags}</td>
        <td>{this.props.obj.content}</td>
        <td>
            <Link to={{pathname: "/edit", aboutProps: {'id': this.props.obj.id}}} className="button primary" style={{margin: "0px"}}>Edit</Link>
        </td>
        <td>
            <button onClick={this.delete} className="button danger" style={{margin: "0px"}}>Delete</button>
        </td>
    </tr>
    );
  }
}