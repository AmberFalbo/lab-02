'use strict';
const dropDownItems = [];
const dropDownItemsTwo = [];

const pageOneItems = [];
const pageTwoItems = [];

// grab page-1.json w/ajax
$.ajax('data/page-1.json', {method: 'GET', datatype: 'JSON'})
  .then(data => {
    
    data.forEach(obj => {
      // feed ajax through constructor function
      let newItem = new HornsOne(obj);
      newItem.dropDownBuilder();
    });
    
    pageOneItems.sort((a,b) => {
      if(a.title.toUpperCase() > b.title.toUpperCase()) {
        return 1
      } else if (b.title.toUpperCase() > a.title.toUpperCase()){
        return -1
      }
    })

    createHtml(pageOneItems, 'div:first-of-type');
    renderDropDown(dropDownItems);
  })

// grab page-2.json w/ajax second ajax
$.ajax('data/page-2.json', {method: 'GET', datatype: 'JSON'})
  .then(data => {
    data.forEach(obj => {
      // feed ajax through constructor function
      let newItem = new HornsTwo(obj);
      newItem.dropDownBuilder();
    });

    pageTwoItems.sort((a,b) => {
      if(a.title.toUpperCase() > b.title.toUpperCase()) {
        return 1
      } else if (b.title.toUpperCase() > a.title.toUpperCase()){
        return -1
      }
    })

    createHtml(pageTwoItems, 'div:last-of-type');
    $('div:last-of-type').hide();
    })

// constructor function
function HornsOne(obj){
  this.keyword = obj.keyword;
  this.image = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.horns = obj.horns;
  pageOneItems.push(this);
}

// constructor function for HornsTwo
function HornsTwo(obj){
  this.keyword = obj.keyword;
  this.image = obj.image_url;
  this.title = obj.title;
  this.description = obj.description;
  this.horns = obj.horns;
  pageTwoItems.push(this);
}

// jquery copy html template. make copy of html template


// feature 2
// create <select> element drop down menu which contains unique <options> elements extracted dynamically from the JSON file, one for each keyword.

HornsOne.prototype.dropDownBuilder = function(){
  if(dropDownItems.includes(this.keyword)===false){
    dropDownItems.push(this.keyword)
  }
}

function createHtml(arr, div){
  $(div).empty();
  let template = $('#horn-template').html();
  arr.forEach(value => {
    let html = Mustache.render(template, value);
    $(div).append(html);
  })
}

// jquery copy html template. make copy of html template for HornsTwo


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

$('#sortByTitle').click(function(){
  pageOneItems.sort((a,b) => {
    if(a.title.toUpperCase() > b.title.toUpperCase()) {
      return 1
    } else if (b.title.toUpperCase() > a.title.toUpperCase()){
      return -1
    }
  })

  createHtml(pageOneItems, 'div:first-of-type');

  pageTwoItems.sort((a,b) => {
    if(a.title.toUpperCase() > b.title.toUpperCase()) {
      return 1
    } else if (b.title.toUpperCase() > a.title.toUpperCase()){
      return -1
    }
  })

  createHtml(pageTwoItems, 'div:last-of-type');

})

$('#sortByHorns').click(function(){
  pageOneItems.sort((a,b) => {
    if(a.horns > b.horns) {
      return 1
    } else if (b.horns > a.horns){
      return -1
    }
  })

  createHtml(pageOneItems, 'div:first-of-type');

  pageTwoItems.sort((a,b) => {
    if(a.horns > b.horns) {
      return 1
    } else if (b.horns > a.horns){
      return -1
    }
  })

  createHtml(pageTwoItems, 'div:last-of-type');

})