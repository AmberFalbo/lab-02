'use strict';
const dropDownItems = [];
const dropDownItemsTwo = [];

// grab page-1.json w/ajax
$.ajax('data/page-1.json', {method: 'GET', datatype: 'JSON'})
  .then(data => {
    data.forEach(obj => {
      // feed ajax through constructor function
      let newItem = new HornsOne(obj);
      newItem.hornBuilder();
      newItem.dropDownBuilder();
    });
    renderDropDown(dropDownItems);
  })

// grab page-1.json w/ajax second ajax
$.ajax('data/page-2.json', {method: 'GET', datatype: 'JSON'})
  .then(data => {
    data.forEach(obj => {
      // feed ajax through constructor function
      let newItem = new HornsTwo(obj);
      newItem.hornBuilder();
      newItem.dropDownBuilder();
    });
    // renderDropDown();
})

// constructor function
function HornsOne(obj){
  this.keyword = obj.keyword;
  this.image = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.horns = obj.horns;
}

// constructor function for HornsTwo
function HornsTwo(obj){
  this.keyword = obj.keyword;
  this.image = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.horns = obj.horns;
}

// jquery copy html template. make copy of html template
HornsOne.prototype.hornBuilder = function(){
  const originalTemplate = $(`#photo-template`).html();
  const $newTemplate = $(`<section>${originalTemplate}</section>`)
  // fill in the duplicated template
  $newTemplate.find('h2').text(this.title);
  $newTemplate.find('p').text(this.description);
  $newTemplate.find('img').attr('src', this.image);
  $newTemplate.find('img').attr('alt', this.keyword);
  // append copy to DOM
  $('div:first-of-type').append($newTemplate);
}

// feature 2
// create <select> element drop down menu which contains unique <options> elements extracted dynamically from the JSON file, one for each keyword.

HornsOne.prototype.dropDownBuilder = function(){
  if(dropDownItems.includes(this.keyword)===false){
    dropDownItems.push(this.keyword)
  }
}

// jquery copy html template. make copy of html template for HornsTwo
HornsTwo.prototype.hornBuilder = function(){
  const originalTemplate = $(`#photo-template`).html();
  const $newTemplate = $(`<section>${originalTemplate}</section>`)
  // fill in the duplicated template
  $newTemplate.find('h2').text(this.title);
  $newTemplate.find('p').text(this.description);
  $newTemplate.find('img').attr('src', this.image);
  $newTemplate.find('img').attr('alt', this.keyword);
  // append copy to DOM
  $('div:last-of-type').append($newTemplate);
  $('div:last-of-type').hide();
}

// for feature 1 of lab 03
// create <select> element drop down menu which contains unique <options> elements extracted dynamically from the JSON file, one for each keyword. for HornsTwo

HornsTwo.prototype.dropDownBuilder = function(){
  if(dropDownItemsTwo.includes(this.keyword)===false){
    dropDownItemsTwo.push(this.keyword)
  }
}

function renderDropDown(arr){
  const dropDown = $(`select`);
  dropDown.empty()
  arr.forEach(value => {
    let $dropDownMenu = $(`<option>${value}</option>`);
    dropDown.append($dropDownMenu);
  })
}

// use and event handler to respond when the user choses an option from the select menu.

$('select').change(function(e){
  $('img').parent().hide();
  let selected = e.target.value;
  $(`img[alt=${selected}]`).parent().show();
  console.log(e);
})


// hide all of the images, then show those whose keyword matches the option chosen

$('#pageChange').click(function(){
  console.log($(this).attr('data-page'));
  if ($(this).attr('data-page') == 1){
    renderDropDown(dropDownItemsTwo);
    $(this).attr('data-page', '2');
  } else {
    renderDropDown(dropDownItems);
    $(this).attr('data-page', '1');
  }
  $('div:first-of-type').toggle();
  $('div:last-of-type').toggle();
})