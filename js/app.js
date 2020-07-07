'use strict';

// grab page-1.json w/ajax
$.ajax('data/page-1.json', {method: 'GET', datatype: 'JSON'})
  .then(data => {
    data.forEach(obj => {
      // feed ajax through constructor function
      new Horns(obj).hornBuilder();
    });
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



