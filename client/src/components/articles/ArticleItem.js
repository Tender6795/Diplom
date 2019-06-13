import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {Card, Image, Button, Item, Grid,Header} from 'semantic-ui-react';
import {deleteArticle} from '../../actions/articleActions';
import {apiPrefix} from '../../config';


class ArticleItem extends Component {
  constructor(props) {
    super(props);
    this.redirect = this.redirect.bind(this);
  }

  redirect() {
    this.props.history.push({});
  }

  onDeleteClick(e) {
    e.preventDefault();
    this.props.deleteArticle(this.props.article.hash);
  }

  render() {

    const path = apiPrefix + this.props.article.pathToPicture.replace('public', '');
    const article = this.props.article;
    const isAdmin = this.props.isAdmin;
    return (
        <Grid style={{width:'100%'}}  >
          <Grid.Column width={4}>
            <Image size='tiny' src={path} style={{marginLeft:'20px'}}/>
          </Grid.Column>
          <Grid.Column width={7}>
          <Header as='h2'>{article.title}</Header>
            <Header as='h4'>{article.author}</Header>
          </Grid.Column>
          {isAdmin &&
          <Grid.Column width={4} style={{marginLeft:'60px',marginTop:'60px'}}>
            <div className='ui two buttons'>
              <Button basic color='green'>
                <Link to={`/edit-article/${article.hash}`}>Edit</Link>
              </Button>
              <Button onClick={this.onDeleteClick.bind(this)} basic color='red'>Delete</Button>
            </div>
          </Grid.Column>
          }
        </Grid>



    );
  }
}

ArticleItem.propTypes = {
  deleteArticle: PropTypes.func
};

export default connect(null, {deleteArticle})(withRouter(ArticleItem));