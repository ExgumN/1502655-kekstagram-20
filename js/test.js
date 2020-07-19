'use strict';

var xhr = new XMLHttpRequest();

// xhr.addEventListener('load', function (evt) {
//   console.log(evt.target === xhr);
//   console.log(JSON.parse(xhr.responseText));
// });

xhr.open('GET', 'https://javascript.pages.academy/kekstagram/data');
xhr.send();
