import React from "react";
import "../App.css";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import Tweets from "../screens/Tweets";
import Home from "../screens/Home";
import NotFound from "../screens/NotFound";
import Reddit from "../screens/Reddit";
import Login from "../screens/Login";
import Register from "../screens/Register";
import VideoIndexer from "../screens/VideoIndexer";

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        {this.props.userData.token && <Redirect from="/" to="/login" exact />}

         {/* public routes */}
        <Route path="/home" component={Home} />

         {/*  after logging in, token present */}
         {this.props.userData.token && (
          <Redirect from="/login" to="/home" exact />
        )}
        {this.props.userData.token && (
          <Redirect from="/register" to="/home" exact />
        )}

        {/* when token absent then redirect */}
        {!this.props.userData.token && (
          <Redirect from="/tweets" to="/login" exact />
        )}
        {!this.props.userData.token && (
          <Redirect from="/videoindexer" to="/login" exact />
        )}
        {!this.props.userData.token && (
          <Redirect from="/reddit" to="/login" exact />
        )}

        {/* when token present only then access */}
        {/* TODO: change this */}
        {this.props.userData.token && (
          <Route path="/tweets" component={Tweets} />
        )}
        {this.props.userData.token && (
          <Route path="/videoindexer" component={VideoIndexer} />
        )}
        {this.props.userData.token && (
          <Route path="/reddit" component={Reddit} />
        )}

          {/* when token not present */}
          {!this.props.userData.token && (
          <Route path="/login" component={Login} />
        )}
        {!this.props.userData.token && (
          <Route path="/register" component={Register} />
        )}

       
  
        {/* if any other url */}
        <Route component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.user,
  };
};

export default connect(mapStateToProps)(Routes);
