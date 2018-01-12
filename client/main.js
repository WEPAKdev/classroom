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
const removeFocusFromParent = function(elem){
    const label = elem.querySelector('label');
    const input = elem.querySelector('input');
    if(label){
        label.classList.remove("active");
    }
    if(input){
        input.classList.remove("valid");
    }
}
const getParentNodeFromEvent = function(event){
    return event.target.parentNode;
}

Template.classrooms.helpers({
    classrooms(){
        return Classes.find();
    }
});

Template.classrooms.events({
  'click a[action="addClassroom"]'(event, instance) {
        //get input value
        const elem = getParentNodeFromEvent(event);
        const target = elem.querySelector('[name="name"]');
        const value = target.value;
        //check value
        if(value.trim())
        {
            //remove error
            target.classList.remove("invalid");
            //remove focus of input
            removeFocusFromParent(elem);
            //collection insert
            Classes.insert({name:value});
            //clear
            target.value = '';
        }
        else{
            //add error
            target.classList.add("invalid");
        }
  },
  'click a[action="deleteClass"]'(event, instance) {
      //remove from collection
      Classes.remove(this._id);      
  },
  'click a[action="editClass"]'(event, instance) {
        //desactivate all input edit
        const inputfields = document.getElementsByClassName('input-field');
        for (var i = 0; i < inputfields.length; i++){
            inputfields[i].classList.remove('activate');
        }
        //activate input
        const elem = getParentNodeFromEvent(event);
        const inputfield = elem.querySelector('.input-field');
        const input = elem.querySelector('[name="editClassname"]');
        input.focus();
        inputfield.classList.add("activate");
        input.value = this.name;
  },
  'click button[action="validEditClassname"]'(event, instance) {
        //get input value
        const elem = getParentNodeFromEvent(event);
        const input = elem.querySelector('[name="editClassname"]');
        const value = input.value;
        //check value
        if(value.trim())
        {
            //remove error
            input.classList.remove("invalid");
            //remove focus of input
            removeFocusFromParent(elem);
            //remove edit mode
            elem.classList.remove("activate");
            //collection update
           Classes.update({_id: this._id}, {$set: {name: value}});
            //clear
            input.value = '';
        }
        else{
            //add error
            input.classList.add("invalid");
        }
  },
  'click button[action="cancelEditClassname"]'(event, instance) {
        //reset focus input
        const elem = getParentNodeFromEvent(event);
        removeFocusFromParent(elem);
        elem.classList.remove("activate");
  },
  'click li[action="selectClassroom"]'(event, instance) {
        nextPage('screen_class', {idClass: this._id});
  }
});
