import { Template } from 'meteor/templating';
//import { ReactiveVar } from 'meteor/reactive-var';
import { Eleves } from '../lib/collection';
import { Classes} from '../lib/collection';
import { Devoirs } from '../lib/collection';
import { Competences } from '../lib/collection';

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
Template.classrooms.helpers({
    classrooms(){
        return Classes.find();
    }
});

Template.classrooms.events({
  'click .btn-large'(event, instance) {
        //get input value
        var elem = event.target.parentNode;
        const target = elem.querySelector('[name="name"]');
        const value = target.value;
        //check value
        if(value.trim())
        {
            //remove error
            target.classList.remove("invalid");
            //collection insert
            Classes.insert({
                name:value
            });
            //clear
            target.value = '';
        }
        else{
            //add error
            target.classList.add("invalid");
        }
  },
});
