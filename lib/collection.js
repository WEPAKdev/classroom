import {Mongo} from 'meteor/mongo';
console.log(Mongo);
export const Eleves = new Mongo.Collection('Eleves');
export const Classes = new Mongo.Collection('Classes');
export const Devoirs = new Mongo.Collection('Devoirs');
export const Competences = new Mongo.Collection('Competences');