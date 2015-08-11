(function () {

  var page_header = document.getElementById('page_header');

  var deg = 120;

  var interval_id;

  /**
   * @param {number} deg - Gradient degree
   * @return {string} - Gradient style string
   */
  function getBgStr(deg) {
    return 'linear-gradient(' + deg + 'deg, #155799, #159957)';
  }

  /**
   * @param {string} bg_str - Gradient background string
   */
  function setBgStr(bg_str) {
    page_header.style.backgroundImage = bg_str;
  } 

  function startAnimation(timeout) {
    setTimeout(function () {
      interval_id = window.setInterval(function () {

        if (deg === 359) {
          deg = 0;
        }

        setBgStr(getBgStr(deg));

        deg += 0.5;

      }, 1000 / 30);
    }, timeout || 0);
  }


  function stopAnimation() {
    window.clearInterval(interval_id);
  }

  startAnimation(1500);

}());

