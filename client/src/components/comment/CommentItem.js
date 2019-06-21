import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Card,  Button } from 'semantic-ui-react';
 // import { deleteComment } from '../../actions/articleActions';
// import {apiPrefix} from '../../config';


class CommentItem extends Component {
  constructor(props) {
    super(props);
    this.redirect = this.redirect.bind(this);
  }

  redirect() {
    this.props.history.push({
    });
  }

  onDeleteClick(e) {
    e.preventDefault();
    this.props.deleteComment(this.props.article.hash,this.props.comment.hash);
  }



  render() {

    return (
      <Card fluid style={{ height: "100%" }}>
        <Card.Content>
          <Card.Header>{this.props.comment.author}</Card.Header>
        </Card.Content>
        <Card.Description>
          {this.props.comment.text}
          {/*{this.props.isAdmin+" "+this.props.isAuthenticated}*/}

        </Card.Description>

        {this.props.isAdmin &&<Button basic color='red'>Удалить коментарий</Button>}
      </Card >
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func
};

export default CommentItem;