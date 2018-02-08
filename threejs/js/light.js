var scene = new THREE.Scene();
var winW = window.innerWidth;
var winH = window.innerHeight;
var camera = new THREE.PerspectiveCamera(75,winW/winH,1,1000);
camera.position.z =-8;
camera.position.y =3;
camera.lookAt({x:0,y:0,z:0});
camera.up.y=2;

var light = new THREE.AmbientLight(0x003300);//环境光可以放在任意一个位置，不会衰减，不需要设置光强，各个点都一样
scene.add(light);

// var light = new THREE.DirectionalLight(0xffffff,1);//平行光，无衰减的光线，可以设置光强；位置不同，方向光作用于物体的面不同，看到的颜色也不同
// light.position.set(0,50,0);
// scene.add(light);

// var light = new THREE.PointLight(0xffffff);//从一个点发出光线
// light.position.set(2,2,2);
// scene.add(light);

var light = new  THREE.SpotLight(0xffffff);//聚光灯
light.position.set(2,2,2);
scene.add(light);

light.castShadow = true;

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(winW,winH);
renderer.setClearColor(0xFFFFFF, 1.0);

renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

var geometry = new THREE.CubeGeometry(1,1,1);

// var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
var material = new THREE.MeshLambertMaterial({color: 0xff0000});//表面粗糙，可以起镜面反射作用；没有光照的时候，该材质反射黑色；当有光照的时候，可以将物体颜色反射出来

var cube = new THREE.Mesh(geometry,material);
cube.castShadow = true;
scene.add(cube);
cube.position.set(0,0,0);//mesh 才可以设置位置，物体作为mesh添加到场景

//添加平面, 绘制阴影
var planeGeometry = new THREE.PlaneGeometry(100,60,10,10);
var planeMaterial = new THREE.MeshLambertMaterial({color:0xFFFFFF});
var plane = new THREE.Mesh(planeGeometry,planeMaterial);
plane.rotation.x = -0.5*Math.PI;
plane.position.y = -2;
plane.position.z = 0;
scene.add(plane);
plane.receiveShadow = true;

function render(){
	requestAnimationFrame(render);
	cube.rotation.y+=0.01;
	cube.rotation.z+=0.01;
	renderer.clear();
	renderer.render(scene,camera);
}
render();