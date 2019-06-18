import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {Image, Button, Grid, Header, Container} from 'semantic-ui-react';
import {deleteArticle} from '../../actions/articleActions';
import {apiPrefix} from '../../config';


class ArticleItem extends Component {
  constructor(props) {
    super(props);
    this.redirect = this.redirect.bind(this);
    this.state = {
      showText: false,
      pictureSize:'small',
      textButton:'Показать статью',
    }
  }

  redirect() {
    this.props.history.push({});
  }

  onDeleteClick(e) {
    e.preventDefault();
    this.props.deleteArticle(this.props.article.hash);
  }

  onStateOfArticleChange(e){
    e.preventDefault();
    this.setState({
      showText: !this.state.showText,
      pictureSize:this.state.pictureSize==='huge'?'small':'huge',
      textButton:this.state.textButton === 'Скрыть статью'?'Показать статью':'Скрыть статью',
    })
  }
  render() {

    const path = apiPrefix + this.props.article.pathToPicture.replace('public', '');
    const article = this.props.article;
    const isAdmin = this.props.isAdmin;
    return (
      <Grid style={{width: '100%'}}>
        <Grid.Column width={7}>
          {/*<Link to={`/articleMaxItem/${article.hash}`}>*/}
            {/*<Image size='tiny' src={path} style={{marginLeft: '20px'}}/>*/}
          {/*</Link>*/}
          <Image size={this.state.pictureSize} src={path} style={{marginLeft: '20px'}}/>
          <Button onClick={this.onStateOfArticleChange.bind(this)}primary style={{marginLeft: '20px'}}>
            {this.state.textButton}
          </Button>
        </Grid.Column>
        <Grid.Column width={4}>
          <Header as='h2'>
            {/*<Link to={`/articleMaxItem/${article.hash}`} >*/}
            {/*{article.title}*/}
            {/*</Link>*/}
            {article.title}
          </Header>
          <Header as='h4'>{article.author}</Header>
        </Grid.Column>
        {this.state.showText &&
        <Container text>
          <p>
            {article.text}
          </p>
        </Container>
        }
        {isAdmin &&
        <Grid.Column width={4} style={{marginLeft: '60px', marginTop: '60px'}}>
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