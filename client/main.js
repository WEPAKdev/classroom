import { Template } from 'meteor/templating';
//import { ReactiveVar } from 'meteor/reactive-var';
import { Eleves } from 'meteor/reactive-var';
import { Classes} from 'meteor/reactive-var';
import { Devoirs } from 'meteor/reactive-var';
import { Competences } from 'meteor/reactive-var';

import './main.html';

/*Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});*/

Template.classrooms.events({
  'click .btn-large':function(event, instance) {
      alert('ok');
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
