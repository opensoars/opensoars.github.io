var interests_ul_children = document.getElementById('interests_ul').children;

var interests = [];

for (var i = 0; i < interests_ul_children.length; i++) {
  interests.push(interests_ul_children[i].textContent);
}

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  14
);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.fog = new THREE.Fog(0x000000, 2.5, 10);

//var cube_geometry = new THREE.BoxGeometry(1, 1, 1);
//var cube_material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//var cube = new THREE.Mesh(cube_geometry, cube_material);
//scene.add(cube);

var max_font_size = 0.5;

var max_pos = 10.0,
  max_pos_fix = max_pos / 2 + max_pos / 5;

var texts = [];

interests.forEach(function (word, i) {
  setTimeout(() => {
    var textShapes = THREE.FontUtils.generateShapes(word, {
      size: (Math.random() + 0.75) * max_font_size
    });
    var text = new THREE.ShapeGeometry(textShapes);

    var r = Math.round(Math.random() * 245) + 10,
      g = Math.round(Math.random() * 245) + 10,
      b = Math.round(Math.random() * 245) + 10;

    var rgb_str = 'rgb(' + r + ',' + g + ',' + b + ')';

    var text_mesh = new THREE.Mesh(
      text,
      new THREE.MeshPhongMaterial({ color: rgb_str })
    );

    text_mesh.position.z = -5;
    text_mesh.position.x = Math.random() * max_pos - max_pos_fix;
    text_mesh.position.y = Math.random() * max_pos - max_pos_fix;

    text_mesh.z_speed = (Math.random() + 0.1) / 25;

    //text_mesh.material.color.setRGB(r, 255, 255);

    texts.push(text_mesh);

    scene.add(text_mesh);
  }, i * 1000);
});

/*
var textShapes = THREE.FontUtils.generateShapes('(function (){}());', {
  size: 1
});
var text = new THREE.ShapeGeometry( textShapes );
var textMesh = new THREE.Mesh( text, new THREE.MeshPhongMaterial( { color: 0x155799 } ) ) ;
scene.add(textMesh);
*/

var light1 = new THREE.DirectionalLight(0xffffff);
//light1.castShadow = true;
//light1.shadowCameraVisible = true
//light1.shadowCameraNear = 0;
//light1.shadowCameraFar = 256;
//light1.shadowCameraWidth = 2048;
//light1.shadowCameraHeight = 2048;
//light1.shadowCameraLeft = -1000;
//light1.shadowCameraRight = 1000;
//light1.shadowMapWidth = 2048;
//light1.shadowMapHeight = 2048;
light1.position.set(0, 0, 100);

scene.add(light1);

camera.position.z = 5;

setTimeout(() => {
  texts = [];

  for (let i = 0; i < 100; i++) {
    var textShapes = THREE.FontUtils.generateShapes('I love you Dasha <3 :)', {
      size: (Math.random() + 0.75) * max_font_size
    });
    var text = new THREE.ShapeGeometry(textShapes);

    var rgb_str = 'rgb(' + 255 + ',' + 0 + ',' + 0 + ')';

    var text_mesh = new THREE.Mesh(
      text,
      new THREE.MeshPhongMaterial({ color: rgb_str })
    );

    text_mesh.position.z = -5;
    text_mesh.position.x = Math.random() * max_pos - max_pos_fix;
    text_mesh.position.y = Math.random() * max_pos - max_pos_fix;

    text_mesh.z_speed = (Math.random() + 0.1) / 25;

    texts.push(text_mesh);

    scene.add(text_mesh);
  }
}, 30000);

var render = function () {
  requestAnimationFrame(render);

  //cube.rotation.x += 0.05;
  //cube.rotation.y += 0.05;

  texts.forEach(function (text) {
    if (text.position.z > 4.5) {
      text;
    }

    if (text.position.z > 5.1) {
      text.position.x = Math.random() * max_pos - max_pos_fix;
      text.position.y = Math.random() * max_pos - max_pos_fix;
      text.position.z -= 11;

      text.z_speed = (Math.random() + 0.5) / 50;

      var scale = Math.random() * 2;

      text.scale.set(scale, scale, scale);
    }

    text.position.z += text.z_speed;
  });

  //textMesh.position.z += 0.01;

  renderer.render(scene, camera);
};

render();

window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});
