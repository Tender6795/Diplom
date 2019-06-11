import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Card, Image, Button } from 'semantic-ui-react';
import { deleteArticle } from '../../actions/articleActions';
import {apiPrefix} from '../../config';


class ArticleItem extends Component {
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
    this.props.deleteArticle(this.props.article.hash);
  }

  render() {
    // console.dir(this.props.contact);
    const path=apiPrefix+this.props.article.pathToPicture.replace('public','');
    const article = this.props.article;
    // console.dir(contact);
    return (
      <Card fluid style={{ height: "100%" }}>
        <Image src={path} wrapped ui={false} rounded style={{height: "500px"}}/>
        <Card.Content>
          <Card.Header>{article.title}</Card.Header>

          <Card.Description>
            <p> {article.text}</p>
            <p> {article.author}</p>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='green'>
              <Link to={`/edit-contact/${article.hash}`}>Edit</Link>
            </Button>
            <Button onClick={this.onDeleteClick.bind(this)} basic color='red'>Delete</Button>
          </div>
        </Card.Content>
      </Card >
    );
  }
}

ArticleItem.propTypes = {
  deleteArticle: PropTypes.func
};

export default connect(null, { deleteArticle })(withRouter(ArticleItem));