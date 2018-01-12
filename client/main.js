import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
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

//tools
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
const findAncestor = function(el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}
const nextPage = function(page_name, event){
    const currentPage = findAncestor(event.target, 'page');
    const nextPage = document.getElementById(page_name);
    nextPage.classList.add('nextpage');
    currentPage.classList.add('hidepage');
};
//init vars
const page = new ReactiveVar();
const classroom_id = new ReactiveVar();
const loadAcceuil = new ReactiveVar();
const loadClassroom = new ReactiveVar();

loadAcceuil.set(true);

//templates functions
Template.index.helpers({
    //views
    accView(){
        if(loadAcceuil) return true;
    },
    classroomView(){
        if(loadClassroom)return true;
    },
    //functions
});

Template.classrooms.helpers({
    classrooms(){
        return Classes.find();
    }
});

Template.classrooms.events({
    //avoid switching page when click on edit form of classroom
  'click .input-field'(event){
      event.stoppropagation();
  },
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
      event.stopPropagation();
      //remove from collection
      Classes.remove(this._id);      
  },
  'click a[action="editClass"]'(event, instance) {
        event.stopPropagation();
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
        event.stopPropagation();
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
        event.stopPropagation();
        //reset focus input
        const elem = getParentNodeFromEvent(event);
        removeFocusFromParent(elem);
        elem.classList.remove("activate");
  },
  'click li[action="selectClassroom"]'(event, instance) {
        //next page animation
        nextPage('page2', event);
        //set classroom id
        classroom_id.set(this._id);
        console.log(classroom_id);
        //trigger content load on nextPage
        loadClassroom.set(true);
  }
});

Template.classroom.helpers({
    getClassroomId(){
        return classroom_id.get();
    }
});