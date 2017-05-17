import React, { Component } from 'react';
import { Session } from 'meteor/session';

import Flexbox from 'flexbox-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';

export default class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signinUsername: '',
      signinPassword: '',
      signupUsername: '',
      signupEmail: '',
      signupPassword: '',
      signupPassword2: ''
    };

    this.updateSigninUsername = this.updateSigninUsername.bind(this);
    this.updateSigninPassword = this.updateSigninPassword.bind(this);

    this.updateSignupUsername = this.updateSignupUsername.bind(this);
    this.updateSignupEmail = this.updateSignupEmail.bind(this);
    this.updateSignupPassword = this.updateSignupPassword.bind(this);
    this.updateSignupPassword2 = this.updateSignupPassword2.bind(this);

    this.handleSignin = this.handleSignin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleFPass = this.handleFPass.bind(this);
  }

  updateSigninUsername(event, value){
    this.setState({
      signinUsername: value
    });
  }

  updateSigninPassword(event, value){
    this.setState({
      signinPassword: value
    });
  }

  updateSignupUsername(event, value){
    this.setState({
      signupUsername: value
    });
  }

  updateSignupEmail(event, value){
    this.setState({
      signupEmail: value
    });
  }

  updateSignupPassword(event, value){
    this.setState({
      signupPassword: value
    });
  }

  updateSignupPassword2(event, value){
    this.setState({
      signupPassword2: value
    });
  }

  handleSignin(){
    if (this.state.signinUsername.toString().length === 0) {
      console.log('enter smth pls.');
      return false;
    } else if (this.state.signinPassword.toString().length === 0) {
      console.log('enter smth pls.');
      return false;
    } else {
      Meteor.loginWithPassword(this.state.signinUsername, this.state.signinPassword, (error, data) => {
        Meteor.logoutOtherClients();
        this.props.history.push('/');
      });
    }
  }

  handleFPass(){
    console.log('Not yet implemented');
  }

  handleSignup(){
    if (this.state.signupUsername.toString().length === 0) {
      console.log('enter smth pls.');
      return false;
    } else if(this.state.signupEmail.toString().length === 0) {
      console.log('enter smth pls.');
      return false;
    } else if (this.state.signupPassword.toString().length === 0) {
      console.log('enter smth pls.');
      return false;
    } else {
      if (this.state.signupPassword == this.state.signupPassword2) {
        Accounts.createUser({
          username: this.state.signupUsername,
          email: this.state.signupEmail,
          password: this.state.signupPassword,
          profile: {
            hideCompleted: false,
            playing: false,
            timerDue: null,
            currentTaskId: null,
          }
        }, (error, data) => {
          this.props.history.push('/');
        });
      }
    }
  };

  render() {
    return (
      <MuiThemeProvider>
        <Flexbox className="auth">
          <Card>
            <CardHeader className="authLogo">
              <img src="dakik_logo.svg" alt=""/>
            </CardHeader>
            <Tabs>
              <Tab label="Sign In">
                <Card>
                  <CardText>
                    <Flexbox flexDirection="column">
                      <TextField
                        name="signinUsername"
                        type="text"
                        onChange = {this.updateSigninUsername}
                        floatingLabelText = "Username"
                      />
                      <TextField
                        name="signinPassword"
                        type="password"
                        onChange = {this.updateSigninPassword}
                        floatingLabelText = "Password"
                        className = "textfield" />
                    </Flexbox>
                  </CardText>
                  <CardActions>
                    <RaisedButton label="Forgot Password ?" onClick={this.handleFPass} backgroundColor = "#FFFFFF" labelColor="#004d40"/>
                    <RaisedButton label="Sign In" onClick={this.handleSignin} backgroundColor = "#004D40" labelColor="#FFFFFF"/>
                  </CardActions>
                </Card>
              </Tab>
              <Tab label="Sign Up" >
                <Card>
                  <CardText>
                    <Flexbox className="textfields" flexDirection="column">
                      <TextField
                        name="signupUsername"
                        type="text"
                        onChange = {this.updateSignupUsername}
                        floatingLabelText = "Username"
                        className = "textfield"
                      />
                      <TextField
                        name="signupEmail"
                        type="text"
                        onChange = {this.updateSignupEmail}
                        floatingLabelText = "E-mail"
                        className = "textfield"
                      />
                      <TextField
                        name="signupPassword"
                        type="password"
                        onChange = {this.updateSignupPassword}
                        floatingLabelText = "Password"
                        className = "textfield"
                      />
                      <TextField
                        name="signupPassword2"
                        type="password"
                        onChange = {this.updateSignupPassword2}
                        floatingLabelText = "Password Again"
                        className = "textfield"
                      />
                    </Flexbox>
                  </CardText>
                  <CardActions>
                    <RaisedButton label="Sign Up" onClick={this.handleSignup} backgroundColor = "#004D40" labelColor="#FFFFFF" fullWidth={true}/>
                  </CardActions>
                </Card>
              </Tab>
            </Tabs>
          </Card>
        </Flexbox>
      </MuiThemeProvider>
    );
  }
}
