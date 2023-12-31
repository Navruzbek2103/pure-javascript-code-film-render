// =================== Get Element ===================

let $ = function (selector){
  return document.querySelector(selector);
}

let $$ = function(selector){
  return document.querySelectorAll(selector)
}

let createElement = function(tagName, className, content){
  let newElement = document.createElement(tagName);

  if(className){
    newElement.setAttribute("class", className);
  }
  if(content){
     newElement.innerHTML = content;
  }

  return newElement;
}