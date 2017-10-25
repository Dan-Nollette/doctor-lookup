import { LookUp } from './../js/lookup.js';
var apiKey = require('./../.env').apiKey;

$(document).ready(function() {
  $('#ailment').click(function (e) {
    e.preventDefault();
    let medicalIssue = $('#ailmentIn').val();
    $('#ailmentIn').val("");
    $('#doctorList').text("");

    let lookup = new LookUp();
    lookup.callIssue(medicalIssue);
  });
});

$(document).ready(function() {
  $('#name').click(function (e) {
    e.preventDefault();
    let nameQuery = $('#nameIn').val();
    $('#nameIn').val("");
    $('#doctorList').text("");

    let lookup = new LookUp();
    lookup.callName(nameQuery);
  });
});
