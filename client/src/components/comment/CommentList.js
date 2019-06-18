import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
// import {getArticles} from '../../actions/articleActions';
import {Grid, Header, Loader} from 'semantic-ui-react';
import CommentItem from './CommentItem';

class CommentList extends Component {

  // componentDidMount() {
  //   this.props.getArticles(null);
  // }


  render() {
    let content = <Header as="h1">Not Comments</Header>;
    if (this.props.article.comments.length) {
      content = [...this.props.article.comments]
        .map(comment => (
       <Grid.Row key={comment.hash}>
        <CommentItem article={this.props.article} comment={comment}/>
       </Grid.Row>
    ));
    }

    return (<Grid>
        {content}
      </Grid>
    );
  }
};

// CommentList.propTypes = {
//   loading: PropTypes.bool,
//   articles: PropTypes.array,
//   getArticles: PropTypes.func.isRequired
// };

function mapStateToProps(state) {
  //console.log(state.articles);
  return {
    loading: state.loading,
    articles: state.articles.articles,
    isAdmin: state.auth.isAdmin,
    isAuthenticated:state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps)(CommentList);