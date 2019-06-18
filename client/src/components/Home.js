import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import ArticleList from './articles/ArticleList';
import {getArticles} from '../actions/articleActions';
import {Container, Menu, Segment, Button} from 'semantic-ui-react';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSearchClick = this.onSearchClick.bind(this);
  }

  onSearchClick(e) {
    e.preventDefault();
    if (this.props.auth.isAuthenticated) {
      if (this.state.searchText !== "") {
        this.props.getArticles(this.state.searchText);
      }
    }
  }

  onChange(e) {
    if (this.props.auth.isAuthenticated) {
      this.setState({searchText: e.target.value});
      const str = e.target.value.trim();
      this.props.getArticles(str.length > 0 ? str : null);
    }
  }

  render() {
    const { isAdmin} = this.props.auth;
    return (
      <Container>
        <Menu attached='top'>
          {isAdmin &&
          <Menu.Menu>
            <Menu.Item>
              <Link to="/new-article">
                <Button circular icon='add'>
                </Button>
              </Link>
            </Menu.Item>
          </Menu.Menu>
          }
          <Menu.Menu position='right'>
            <div className='ui right aligned category search item'>
              <div className='ui transparent icon input'>
                <input className='prompt' onChange={this.onChange} type='text' placeholder='Search articles...'/>
                <i className='search link icon' onClick={this.onSearchClick}/>
              </div>
              <div className='results'/>
            </div>
          </Menu.Menu>
        </Menu>

        <Segment attached='bottom'>
           <ArticleList searchText={this.state.searchText}/>
        </Segment>
      </Container>
    );
  }
}

Home.propTypes = {
  auth: PropTypes.object.isRequired,
  getArticles: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps, {getArticles})(Home);