var scene = new THREE.Scene();
var winW = window.innerWidth;
var winH = window.innerHeight;
var camera = new THREE.PerspectiveCamera(75,winW/winH,1,1000);
// camera.position.x = 0;
// camera.position.y = 1000;
camera.position.z = -100;
camera.up.x = 0;
camera.up.y = 1;
camera.up.z = 0;
camera.lookAt({
    x : 0,
    y : 0,
    z : 0
});

var renderer = new THREE.WebGLRenderer({antialias : true});
renderer.setSize(winW,winH);
renderer.setClearColor(0xFFFFFF, 1.0);

document.body.appendChild(renderer.domElement);

// var p1 = new THREE.Vector3(-100,0,100);
// var p2 = new THREE.Vector3(100,100,-100);
// var p3 = new THREE.Vector3(200,0,-100);
// var p4 = new THREE.Vector3(180,0,-100);

// var geometry = new THREE.Geometry();
// var material = new THREE.LineBasicMaterial({ vertexColors: true });
// var color1 = new THREE.Color(0x444444), color2 = new THREE.Color(0xFF0000), color3 = new THREE.Color(0x444444), color4 = new THREE.Color(0xFF0000);

// geometry.vertices.push(p1,p2,p3,p4);
// // geometry.vertices.push(p2);
// geometry.colors.push(color1, color2, color3, color4);

// 网格

var material = new THREE.LineBasicMaterial({ vertexColors: true });
var color = new THREE.Color(0xbfbfbf);
for(var i=0;i<10;i++){
	var p1 = new THREE.Vector3(-100,90-10*i-45,0);
	var p2 = new THREE.Vector3(100,90-10*i-45,0);
	var geometry = new THREE.Geometry();
	geometry.vertices.push(p1,p2);
	geometry.colors.push(color,color);
	var line = new THREE.Line(geometry, material, THREE.LineSegments);
	scene.add(line);

}


function render(){
	requestAnimationFrame(render);
	camera.rotation.y+=0.01;
	renderer.clear();
	renderer.render(scene,camera);
}
render();