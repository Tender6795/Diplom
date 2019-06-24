import React, {Component} from 'react';
import {connect} from 'react-redux';
// import PropTypes from 'prop-types';
 import {getArticles} from '../../actions/articleActions';
import {Grid} from 'semantic-ui-react';
import CommentItem from './CommentItem';
//import {getArticles} from "../../actions/articleActions";

// import CommentForm from '../comment/CommentForm';

class CommentList extends Component {

  componentDidMount() {
    this.props.getArticles(null);
  }

  constructor(props) {
    super(props);
    this.state = {
      comments: [...this.props.article.comments]
    }
  }

  rerender=()=>{
    this.setState({comments: [...this.props.article.comments]})
    this.render();
  };

  render() {
    let content = <p></p>;

    if (this.props.article.comments.length) {
      content = [...this.state.comments]
        .map(comment => (
          <Grid.Row key={comment.hash}>
            <CommentItem article={this.props.article}
                         comment={comment}
                         isAdmin={this.props.isAdmin}
                         isAuthenticated={this.props.isAuthenticated}
                       rerender={this.rerender}
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

export default connect(mapStateToProps,{getArticles})(CommentList);