import React, { Component, PropTypes, constructor, State } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Flexbox from 'flexbox-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
import WunderlistApi from './WunderlistApi.jsx';

import { Tasks } from '../../api/tasks.js';

allTasks = null;

export default class IntegrationAuth extends Component {
  constructor(props) {
    super(props);

    allTasks = this.props.task;

    this.connectToTrello = this.connectToTrello.bind(this);
    this.exitFromTrello = this.exitFromTrello.bind(this);
    this.updateLogin = this.updateLogin.bind(this);
    this.handleDisabled = this.handleDisabled.bind(this);
    this.handleDisabled2 = this.handleDisabled2.bind(this);
    this.addToDatabase = this.addToDatabase.bind(this);

    Trello.authorize({
      interactive:false,
    });

    var isLoggedIn = Trello.authorized();
    if(isLoggedIn) {
      this.state = {
        disabled: true,
        disabled2: false
      }
    } else {
      this.state = {
        disabled: false,
        disabled2: true
      }
    }

    Trello.authorize({
      interactive:false
    });
  }

  connectToTrello(){
    Trello.authorize({
      name: "PROJECT",
      type: "popup"
    })

    this.handleDisabled();
    this.handleDisabled2();
  }

  updateLogin() {
    var isLoggedIn = Trello.authorized();
    $(".exit").toggle(isLoggedIn);
    $(".connect").toggle(!isLoggedIn);
  }

  exitFromTrello() {
    Trello.deauthorize();
    this.handleDisabled2();
    this.handleDisabled();
  }

  addToDatabase() {
    const ownerId = this.props.currentUser._id;
    const checked = false;
    const taskPriority = 0;
    const totalPomos = 0;
    const taskGoal = 0;
    const newDate = new Date();
    const dueDate = new Date();
    var equal = 0;

    Trello.members.get("me", function(member){
      Trello.get("/member/me/boards", function(boards) {
        for(i=0;i<boards.length;i++) {
          Trello.get('/boards/' + boards[i].id + '/lists', function(lists) {
            for(x=0;x<lists.length;x++) {
              Trello.get('/lists/' + lists[x].id + '/cards', function(cards) {
                for(y=0;y<cards.length;y++) {
                  const taskName = cards[y].name;

                  if(allTasks == null) {
                    Tasks.insert({
                      ownerId,
                      taskName,
                      taskPriority,
                      checked,
                      totalPomos,
                      taskGoal,
                      newDate,
                      dueDate,
                      createdAt: new Date(), // current time
                    });
                    allTasks[allTasks.length] = allTasks[0];
                    allTasks[allTasks.length-1].taskName = taskName;
                    allTasks[allTasks.length-1].ownerId = ownerId;
                    allTasks[allTasks.length-1].taskPriority = 0;
                    allTasks[allTasks.length-1].checked = false;
                    allTasks[allTasks.length-1].totalPomos = 0;
                    allTasks[allTasks.length-1].taskGoal = 0;
                    allTasks[allTasks.length-1].newDate = new Date();
                    allTasks[allTasks.length-1].dueDate = new Date();
                    allTasks[allTasks.length-1].createdAt = new Date();

                    equal = equal + 1;
                  } else {
                    for(z=0;z<allTasks.length;z++) {
                      if(cards[y].name == allTasks[z].taskName) {
                        equal = equal + 1;
                      }
                    }
                  }

                  if(equal==0) {
                    Tasks.insert({
                      ownerId,
                      taskName,
                      taskPriority,
                      checked,
                      totalPomos,
                      taskGoal,
                      newDate,
                      dueDate,
                      createdAt: new Date(), // current time
                    });
                    allTasks[allTasks.length] = allTasks[0];
                    allTasks[allTasks.length-1].taskName = taskName;
                    allTasks[allTasks.length-1].ownerId = ownerId;
                    allTasks[allTasks.length-1].taskPriority = 0;
                    allTasks[allTasks.length-1].checked = false;
                    allTasks[allTasks.length-1].totalPomos = 0;
                    allTasks[allTasks.length-1].taskGoal = 0;
                    allTasks[allTasks.length-1].newDate = new Date();
                    allTasks[allTasks.length-1].dueDate = new Date();
                    allTasks[allTasks.length-1].createdAt = new Date();
                  }
                  equal = 0;
                }
              });
            }
          });//Trello.get ++ lists
        }
      });//Trello.get ++ boards
    });//Trello.get ++ name
  }

  handleDisabled() {
    if (this.refs.myRef) {
      this.setState({disabled: !this.state.disabled});
    }
  }

  handleDisabled2() {
    if (this.refs.myRef) {
      this.setState({disabled2: !this.state.disabled2});
    }
  }

  render() {
    return (
      <MuiThemeProvider ref="myRef">
        <Flexbox flexDirection="column">
          <Tabs>
            <Tab label="Trello">
              <FlatButton disabled={this.state.disabled} className="connect" label="Connect to Trello" onTouchTap={this.connectToTrello}/>
              <FlatButton disabled={this.state.disabled2} className="exit" label="Disconnect from Trello" onTouchTap={this.exitFromTrello}/>
              <FlatButton label="Sync" onTouchTap={this.addToDatabase}/>
            </Tab>
            <Tab label="Wunderlist">
              <div>
                <WunderlistApi currentUser={this.props.currentUser} task={this.props.task}/>
              </div>
            </Tab>
          </Tabs>
        </Flexbox>
      </MuiThemeProvider>
    );
  }
}