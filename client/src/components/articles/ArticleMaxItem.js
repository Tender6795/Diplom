import React, {Component} from 'react';
import {Image, Button, Container, Grid, Header} from 'semantic-ui-react';
import {apiPrefix} from '../../config';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getArticleByHash, getArticles} from '../../actions/articleActions';
import PropTypes from "prop-types";


class ArticleMaxItem extends Component {
  componentDidMount() {
    this.props.getArticles(null);
  }
  constructor(props) {
    super(props);
    const hash = this.props.match.params.hash;
    //let article = {};
    // if (this.props.articles.length !== 0) {
    //   console.log('if');
    const  article = this.props.articles.filter(a => a.hash === hash)[0];
    // } else {
    //   console.log('else');
    //    // this.props.getArticleByHash(this.props.match.params.hash);

   // }

    this.state = {
      article: article,
      errors: {},
      message: '',
      isLoading: false,
      isValid: false,
      redirect: false
    };
  }


  render() {
    const path = apiPrefix + this.state.article.pathToPicture.replace('public', '');
    return (
      <Grid style={{width: '100%'}}>
        <Grid.Column width={4}>
          <Image size='medium' src={path} style={{marginLeft: '20px'}}/>
        </Grid.Column>
        <Grid.Column width={7}>
          <Header as='h2'>{this.state.article.title}</Header>
          <Container text>
            <p>
              {this.state.article.text}
            </p>
          </Container>
          <Header as='h4'>{this.state.article.author}</Header>
        </Grid.Column>
        <Grid.Column>
          <Link to={`/`}>
            <Button>
              Назад
            </Button>
          </Link>
        </Grid.Column>
      </Grid>
    );
  }
}

ArticleMaxItem.propTypes = {
  auth: PropTypes.object.isRequired,
  articles: PropTypes.array,
  getArticles: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    articles: state.articles.articles,
  };
}

export default connect(mapStateToProps, {getArticles})(ArticleMaxItem);