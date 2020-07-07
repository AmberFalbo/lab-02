'use strict';
const dropDownItems = [];

// grab page-1.json w/ajax
$.ajax('data/page-1.json', {method: 'GET', datatype: 'JSON'})
  .then(data => {
    data.forEach(obj => {
      // feed ajax through constructor function
      let newItem = new Horns(obj);
      
      newItem.hornBuilder();
      newItem.dropDownBuilder();
    });
    renderDropDown();
  })

// constructor function
function Horns(obj){
  this.keyword = obj.keyword;
  this.image = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.horns = obj.horns;
}

// jquery copy html template. make copy of html template
Horns.prototype.hornBuilder = function(){
  const originalTemplate = $(`#photo-template`).html();
  const $newTemplate = $(`<section>${originalTemplate}</section>`)
  // fill in the duplicated template
  $newTemplate.find('h2').text(this.title);
  $newTemplate.find('p').text(this.description);
  $newTemplate.find('img').attr('src', this.image);
  $newTemplate.find('img').attr('alt', this.keyword);
  // append copy to DOM
  $('main').append($newTemplate);
}

// feature 2

// create <select> element drop down menu which contains unique <options> elements extracted dynamically from the JSON file, one for each keyword.


Horns.prototype.dropDownBuilder = function(){
  if(dropDownItems.includes(this.keyword)===false){
    dropDownItems.push(this.keyword)
  }
}

function renderDropDown(){
  const dropDown = $(`select`);
  dropDownItems.forEach(value => {
    let $dropDownMenu = $(`<option>${value}</option>`);
    dropDown.append($dropDownMenu);
  })
}



// use and event handler to respond when the user choses an option from the select menu.


// hide all of the images, then show those whose keyword matches the option chosen

