function domListToArray(dom_list) {
  var arr = [];

  for (var i = 0; i < dom_list.length; i++) {
    arr.push(dom_list[i]);
  }

  return arr;
}

var interests_list = document.getElementById('interests_list'),
    interests_list_left = document.getElementById('interests_list_left'),
    interests_list_right = document.getElementById('interests_list_right');


var interests_list_children = domListToArray(interests_list.children);


var left_count = Math.ceil(interests_list_children.length / 2);


interests_list_children.forEach(function (child, i) {
  if (i < left_count) {
    interests_list_left.appendChild(child.cloneNode(true));
  }
  else {
    interests_list_right.appendChild(child.cloneNode(true));
  }
});