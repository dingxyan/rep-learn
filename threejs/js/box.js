var scene = new THREE.Scene();
var winW = window.innerWidth;
var winH = window.innerHeight;
var camera = new THREE.PerspectiveCamera(75,winW/winH,0.1,1000);
camera.position.z = 10;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(winW,winH);

document.body.appendChild(renderer.domElement);

var geometry = new THREE.CubeGeometry(1,1,1);
var material = new THREE.MeshBasicMaterial({color: 0x00ff00});

var cube = new THREE.Mesh(geometry,material);
scene.add(cube);

function render(){
	requestAnimationFrame(render);
	cube.rotation.y+=0.01;
	cube.rotation.z+=0.01;
	renderer.render(scene,camera);
}
render();