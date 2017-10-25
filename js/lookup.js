var apiKey = require('./../.env').apiKey;
export class LookUp {
  constructor(number) {
    number = parseInt(number);
    this.number = number;
  }

  callIssue(medicalIssue) {
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
        let acceptingPatients;
        doctor.practices.forEach(function(practice){
          addresses.push([practice.visit_address.street, practice.visit_address.city, practice.visit_address.state])
        });
        acceptingPatients = (doctor.practices[0].accepts_new_patients === true)
        doctorsDetails.push([fullName, addresses, acceptingPatients]);
      });
      $('#doctorsOut').text(`The following Doctors match for that search by medical condition:`);
      doctorsDetails.forEach(function(doc) {
        $('#doctorList').append(`<li><p>${doc[0]}, </p><ul><li>accepts new patients : ${doc[2].toString()}</li><br><li><p>${doc[1][0][0]}, </p><p>${doc[1][0][1]}, ${doc[1][0][2]}</p></li></ul></li><br>`);
      });
    }, function(error) {
      $('#showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  }

  callName(nameQuery) {
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
      let doctorsDetails = [];
      body.data.forEach(function(doctor){
        let fullName = doctor.profile.first_name + " " + doctor.profile.last_name + ", " + doctor.profile.title;
        let addresses = [];
        let acceptingPatients;
        doctor.practices.forEach(function(practice){
          addresses.push([practice.visit_address.street, practice.visit_address.city, practice.visit_address.state])
        });
        acceptingPatients = (doctor.practices[0].accepts_new_patients === true)
        doctorsDetails.push([fullName, addresses, acceptingPatients]);
      });
      $('#doctorsOut').text(`The following Doctors match that name search term:`);
      doctorsDetails.forEach(function(doc) {
        $('#doctorList').append(`<li><p>${doc[0]}, </p><ul><li>accepts new patients : ${doc[2].toString()}</li><br><li><p>${doc[1][0][0]}, </p><p>${doc[1][0][1]}, ${doc[1][0][2]}</p></li></ul></li><br>`);
      });
    }, function(error) {
      $('#showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  }
}
