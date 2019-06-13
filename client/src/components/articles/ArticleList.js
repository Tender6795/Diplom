import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getArticles} from '../../actions/articleActions';
import {Grid, GridColumn, GridRow, Divider, Header, Loader} from 'semantic-ui-react';
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
        content = this.props.articles.filter(article => {
          for (let key in article) {
            if (article[key].toString().includes(this.props.searchText)) {
              return true;
            }
          }
          return false;

        }).map(article => (
          <Grid.Row key={article.hash} >
            <ArticleItem article={article} isAdmin={this.props.isAdmin}/>
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
  return {
    loading: state.loading,
    articles: state.articles.articles,
    isAdmin: state.auth.isAdmin,
  };
}

export default connect(mapStateToProps, {getArticles})(ArticlesList);