import { Lookup } from './../js/lookup.js';
var apiKey = require('./../.env').apiKey;

// $(document).ready(function () {
//   $('.btn').click(function (e) {
//     e.preventDefault();
//     let numberIn = $('#numberIn').val();
//     let obj = new Obj(numberIn);
//     let numberOut = obj.func();
//     $('#numberOut').text(numberOut);
//   });
//
//   $('.btn').click(function (e) {
//     e.preventDefault();
//     let numberIn = $('#numberIn').val();
//     let obj = new Obj(numberIn);
//     let numberOut = obj.func();
//     $('#numberOut').text(numberOut);
//   });
// });

$(document).ready(function() {
  $('#ailment').click(function (e) {
    e.preventDefault();
    let medicalIssue = $('#ailmentIn').val();
    $('#ailmentIn').val("");
    $('#doctorList').text("");

    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${medicalIssue}&location=47.607%2C-122.336%2C100&user_location=47.607%2C-122.336&skip=0&limit=100&user_key=${apiKey}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function(response) {
      let body = JSON.parse(response);
      let doctorsDetails = [];
      body.data.forEach(function(doctor){
        let fullName = doctor.profile.first_name + " " + doctor.profile.last_name + ", " + doctor.profile.title;
        let addresses = [];
        doctor.practices.forEach(function(practice){
          addresses.push([practice.visit_address.street, practice.visit_address.city, practice.visit_address.state])
        });
        doctorsDetails.push([fullName, addresses]);
      });
      $('#doctorsOut').text(`The following Doctors match for that search by medical condition:`);
      doctorsDetails.forEach(function(doctor) {
        $('#doctorList').append(`<li><p>${doctor[0]}, </p><ul><li>${doctor[1][0]}</li> <li>${doctor[1][1]} </li><li>${doctor[1][2]}</li></ul></li>`);
      });
    }, function(error) {
      $('#showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });
});

$(document).ready(function() {
  $('#name').click(function (e) {
    e.preventDefault();
    let nameQuery = $('#nameIn').val();
    $('#nameIn').val("");
    $('#doctorList').text("");

    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${nameQuery}&location=47.607%2C-122.336%2C100&user_location=47.607%2C-122.336&skip=0&limit=100&user_key=${apiKey}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function(response) {
      let body = JSON.parse(response);
      let doctorNames = [];
      body.data.forEach(function(doctor){
        doctorNames.push(doctor.profile.first_name + " " + doctor.profile.last_name + " " + doctor.profile.title);
      });
      $('#doctorsOut').text(`The following Doctors match that name search term:`);
      doctorNames.forEach(function(name) {
        $('#doctorList').append(`<li>${name}</li>`);
      });
    }, function(error) {
      $('#showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });
});
