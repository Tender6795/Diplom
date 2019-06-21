import React, {Component} from 'react';
import {connect} from 'react-redux';
// import PropTypes from 'prop-types';
// import {getArticles} from '../../actions/articleActions';
import { Grid, Header} from 'semantic-ui-react';
import CommentItem from './CommentItem';

// import CommentForm from '../comment/CommentForm';

class CommentList extends Component {



  render() {
    let content = <p></p>;

    if (this.props.article.comments.length) {
      content = [...this.props.article.comments]
        .map(comment => (
          <Grid.Row key={comment.hash}>
            <CommentItem article={this.props.article}
                         comment={comment}
                         isAdmin={this.props.isAdmin}
                         isAuthenticated={this.props.isAuthenticated}
            />
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

  return {
    loading: state.loading,
    articles: state.articles.articles,
    isAdmin: state.auth.isAdmin,
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps)(CommentList);