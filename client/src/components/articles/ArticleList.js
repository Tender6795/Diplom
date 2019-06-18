import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getArticles} from '../../actions/articleActions';
import {Grid, Header, Loader} from 'semantic-ui-react';
import ArticleItem from './ArticleItem';

class ArticlesList extends Component {

  componentDidMount() {
    this.props.getArticles(null);
  }

  render() {
    let content = <Header as="h1">Empty</Header>;
    if (this.props.articles.length) {
      if (this.props.loading) {
        content = <Loader active size='medium'>Loading</Loader>
      } else {
        console.dir(this.props.articles);
        content = this.props.articles.filter(article => {
          for (let key in article) {
            if (article[key].toString().includes(this.props.searchText)) {
              return true;
            }
          }
          return false;

        }).map(article => (
          <Grid.Row key={article.hash} >
            <ArticleItem article={article}
                         isAdmin={this.props.isAdmin}
                         isAuthenticated={this.props.isAuthenticated}/>
            <br/>
          </Grid.Row>

        ));
      }
    }

    return (
      <Grid>
        {content}
      </Grid>
    );
  }
};

ArticlesList.propTypes = {
  loading: PropTypes.bool,
  articles: PropTypes.array,
  getArticles: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  //console.log(state.articles);
  console.dir(state);
  return {
    loading: state.loading,
    articles: state.articles.articles,
    isAdmin: state.auth.isAdmin,
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps, {getArticles})(ArticlesList);