var page_header = document.getElementById('page_header');

var deg = 120;


function getBgStr(deg) {
  return 'linear-gradient(' + deg + 'deg, #155799, #159957)';
}

function setBgStr(bg_str) {
  page_header.style.backgroundImage = bg_str;
} 

setTimeout(function () {
  setInterval(function () {

    if (deg === 359) {
      deg = 0;
    }

    setBgStr(getBgStr(deg));

    deg++;

    //setBgStr(getBgStr((Math.cos(new Date().getTime() * 0.00003) + 1) * 1800));
  }, 1000 / 30)
}, 1500)