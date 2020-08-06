import React, { Component } from "react";
import { Layout, Menu, Breadcrumb } from "antd";

import { Input, Spin, Alert } from "antd";
import TweetsList from "../components/TweetsList";
import { connect } from "react-redux";
import { fetchTweets } from "../redux";

const { Search } = Input;
const { Header, Content, Footer } = Layout;

export class Tweets extends Component {

  componentDidMount(){
    console.log(this.props.userData.sector)
    var query = ""
    for (let i =0; i<this.props.userData.sector.length;i++ ){
      query = query.concat(this.props.userData.sector[i] ,' OR ')
    }
    query = query.slice(0, -3)
    console.log('query', query)
    this.props.fetchTweets(query)
  }
  render() {
    return (
      <Content
        className="site-layout"
        style={{ padding: "0 50px", paddingTop: 64, minHeight: 400 }}
      >
        <Search
          style={{ marginTop: 20 }}
          placeholder="Search by keyword"
          enterButton="Search"
          size="large"
          onSearch={(value) => this.props.fetchTweets(value)}
        />
        {this.props.tweetData.loading ? 
        (
          <Spin size="large" />
        ) : this.props.tweetData.error ? (
          <Alert message="Error" description={this.props.tweetData.error} type="error" />
        ) : (
          <TweetsList tweets={this.props.tweetData.tweets} />
        )}
      </Content>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tweetData: state.tweet,
    userData: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTweets: (keyword) => dispatch(fetchTweets(keyword)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tweets);
