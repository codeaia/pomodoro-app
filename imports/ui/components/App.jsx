import React, { Component, constructor, PropTypes, State } from 'react';
import Flexbox from 'flexbox-react';
import { createContainer } from 'meteor/react-meteor-data';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReactCSSTransition from 'react-addons-css-transition-group';

import Timer from './Timer.jsx';
import TaskViewContainer from './TaskViewContainer.jsx';
import Statistics from './Statistics.jsx';
import Settings from './Settings.jsx';
import About from './About.jsx';
import Loading from './Loading.jsx';
import TaskNew from './TaskNew.jsx';
import IntegrationAuth from './IntegrationAuth.jsx';
import Profile from './Profile.jsx';
import Nav from './Nav.jsx';

import { Tasks } from '../../api/tasks.js';

class App extends Component {
  constructor(props) {
    super(props);

  	this.state = {
  	  route: this.props.route,
  	}
  }

  componentWillReceiveProps(nextProps){
  	this.setState({
  	  route: nextProps.route,
  	});
  }

  render() {
  	if (this.props.currentUser !== undefined) {
  	  if (this.state.route == 'timer') {
    		return (
    			<Flexbox flexDirection='column'>
    				<Nav/>
    				<ReactCSSTransition
    					transitionName = "fromTopLoad"
    					transitionEnterTimeout = {600}
    					transitionLeaveTimeout = {400}>
              <Flexbox flexDirection='column' className='timerContainer'>
    			  		<div className='timer'>
                  <Timer currentUser={this.props.currentUser}/>
    			  		</div>
    			  		<TaskViewContainer/>
              </Flexbox>
    				</ReactCSSTransition>
    			</Flexbox>
    		);
  	  } else if(this.state.route == 'statistics') {
    		return (
    		  <Flexbox flexDirection='column'>
            <Nav/>
            <Flexbox flexDirection='column' className='taskNewContainer'>
              <Profile currentUser={this.props.currentUser}/>
              <Statistics/>
            </Flexbox>
    		  </Flexbox>
    		);
  	  } else if(this.state.route == 'settings'){
    		return (
    		  <Flexbox flexDirection='column'>
            <Nav/>
            <Flexbox flexDirection='column' className='taskNewContainer'>
              <IntegrationAuth currentUser={this.props.currentUser} task={this.props.task}/>
              <Settings/>
            </Flexbox>
    		  </Flexbox>
    		);
  	  } else if(this.state.route == 'taskNew'){
    		return (
    		  <Flexbox flexDirection='column'>
            <Nav/>
            <Flexbox flexDirection='column' className='taskNewContainer'>
              <TaskNew/>
            </Flexbox>
    		  </Flexbox>
    		);
  	  }else if(this.state.route == 'about'){
    		return (
    		  <Flexbox flexDirection='column'>
            <Nav/>
            <Flexbox flexDirection='column' className='taskNewContainer'>
              <About/>
            </Flexbox>
    		  </Flexbox>
    		);
  	  }
  	} else {
    	  return (
      		<Loading/>
    	  );
  	}
  }
}

App.propTypes = {
  currentUser: React.PropTypes.object,
  route: React.PropTypes.string,
  task: React.PropTypes.array,
};

export default AppContainer = createContainer(() => {
  const currentUser = Meteor.user();
  const task = Tasks.find().fetch();
  const route = Session.get('route');

  return {
    currentUser,
    route,
    task,
  };
}, App);
