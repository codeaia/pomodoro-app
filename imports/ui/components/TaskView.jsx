import React, { Component, PropTypes, constructor, State } from 'react';
import ReactCSSTransition from 'react-addons-css-transition-group';

import Flexbox from 'flexbox-react';
import IconButton from 'material-ui/IconButton';
import Loading from './Loading.jsx';
import Toggle from 'material-ui/Toggle';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Subheader from 'material-ui/Subheader';
import {Card, CardText} from 'material-ui/Card';
import {List} from 'material-ui/List';
import TaskFrame from './TaskFrame.jsx';

export default class TaskView extends Component {

  constructor(props) {
	super(props);

	this.state = {
	  hideCompleted: false,
	};

	this.routeNewTask = this.routeNewTask.bind(this);
	this.renderTasks = this.renderTasks.bind(this);
	this.toggleHide = this.toggleHide.bind(this);
  }

  componentWillReceiveProps(nextProps){
	if (nextProps.currentUser !== undefined) {
	  this.setState({
		hideCompleted: nextProps.currentUser.profile.hideCompleted,
	  });
	}
  }

  routeNewTask(){
	Session.set({
	  "route": "taskNew"
	});
  }

  renderTasks(){
	let filteredTasks = this.props.tasks;
	if (this.state.hideCompleted) {
	  filteredTasks = filteredTasks.filter(task => !task.checked);
	}
	return filteredTasks.map((task) => (
	  <ReactCSSTransition
	  	transitionName = "taskFrameLoad"
		transitionEnterTimeout = {600}
		transitionLeaveTimeout = {400}
	  >
		<TaskFrame key={task._id} task={task} currentUser={this.props.currentUser}/>
	  </ReactCSSTransition>
	));
  }

  toggleHide(){
	this.setState({
	  hideCompleted: !this.state.hideCompleted,
	});

	var newProfile = this.props.currentUser.profile;
	newProfile.hideCompleted = !this.props.currentUser.profile.hideCompleted;

	Meteor.users.update({_id: this.props.currentUser._id},{$set: {profile: newProfile}});
  }

  render() {
	if (this.props.tasks !== undefined && this.props.currentUser !== undefined) {
	  return (
		<MuiThemeProvider>
		  <Flexbox className="taskList">
			<Card className="taskListCard">
			  <CardText>
				<Subheader>
				  #TagNameHere
				  <IconButton iconClassName="fa fa-plus-square-o" style={{padding: '-12px'}} onClick={this.routeNewTask} tooltip="New Task"/>
				  <Toggle label="Hide completed tasks" labelPosition="right" toggled={this.state.hideCompleted} onToggle={this.toggleHide}/>
				</Subheader>
				<List>
				  {this.renderTasks()}
				</List>
			  </CardText>
			</Card>
		  </Flexbox>
		</MuiThemeProvider>
	  );
	} else {
	  return (
		<Loading/>
	  );
	}
  }
}

TaskView.propTypes = {
  currentUser: React.PropTypes.object,
  tasks: React.PropTypes.array,
};
