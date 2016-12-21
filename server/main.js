import { Meteor } from 'meteor/meteor';
import '../imports/api/tasks.js';

Meteor.publish("currentUser", function () {
  return Meteor.users.find({
    _id: this.userId
  });
});

Meteor.publish("users", function () {
    return Meteor.users.find({});
});

Meteor.startup(() => {
  // code to run on server at startup
});
