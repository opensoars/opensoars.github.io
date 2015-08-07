var fader = document.getElementById('fader');

var go_btn = document.getElementById('go_btn'),
    iframe_section = document.getElementById('iframe_section');

go_btn.addEventListener('click', function () {
  stopAnimation();
  iframe_section.innerHTML = "<iframe src='three_index.html'>";

  document.body.style.overflow = 'hidden';

  fader.style.display = 'block';

  setTimeout(function () {
    fader.style.display = 'none';
    close_btn.style.display = 'block';
  }, 5500);

});

var close_btn = document.getElementById('close_btn');

close_btn.addEventListener('click', function () {
  startAnimation();
  iframe_section.innerHTML = "";
  document.body.style.overflow = 'auto';
  close_btn.style.display = 'none';

  fader.style.display = 'none';
});


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