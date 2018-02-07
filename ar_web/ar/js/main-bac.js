
function isWeiXin() {
	var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true
    } else {
        return false
    }
}
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

var path = '';
(function() {
	if(!Detector.webgl) {
        $(".loading").html("您的浏览器不支持WebGL");
    }else if(!window.DeviceOrientationEvent) {
		//不支持陀螺仪
		$(".loading").html("您的设备不支持陀螺仪");
	}else{
		// if(isWeiXin()){
			load();
		// }else{
			// $(".loading").html("请使用微信访问");
		// }
		
	}
	// 预加载
	function load(){
		var loaded = 0;
		var loadedNum = 0;
		var imgs = ['img/px.jpg','img/nx.jpg','img/py.jpg','img/ny.jpg','img/pz.jpg','img/nz.jpg','obj/snowman/snowman.png'];
		var soucesLen = imgs.length+3;
		var loadedNumDom = $("#loaded");
		var time = 0;
		$.getJSON(path + "obj/snowman/snoman_a1_dance_max2012.js", function(geometry, materials) {
            loaded++;
            readyNum(loaded/soucesLen * 100);
        });
        $.getJSON(path + "obj/snowman/snoman_a2_dance_max2012.js", function(geometry, materials) {
            loaded++;
            readyNum(loaded/soucesLen * 100);
        });
        $.getJSON(path + "obj/snowman/snoman_a3_dance_max2012.js", function(geometry, materials) {
            loaded++;
            readyNum(loaded/soucesLen * 100);
        });
        function getImg(){
        	for (var i = 0; i < imgs.length; i++) {
                var img = new Image();
                img.src = path + imgs[i];
                img.onload = function() {
                    loaded++;
                    readyNum(loaded/soucesLen*100);
                }
            }
        }
        getImg();
        function readyNum(n){
        	loadedNum++;
        	loadedNumDom.html(loadedNum);
        	if(loadedNum<n){
        		clearTimeout(time);
                time = setTimeout(function() {
                    readyNum(n);
                }, 30);
        	}else{
                if(n == 100){
                    init();
					animate();
                }
        	}
        }
	};

	//预加载完成
	function allLoaded(){
		if(isWeiXin()){
	    	var agent = navigator.userAgent.toLowerCase();
			if (agent.indexOf("like mac os x") > 0) {
			    addPano();
			}else{
				getMedia();//微信支持调用后置摄像头
			}
	    }else{
	    	//后置摄像头无法调起，添加全景图作为背景
	    	addPano();
	    }
	    
	}
	var SCREEN_WIDTH = window.innerWidth;
	var SCREEN_HEIGHT = window.innerHeight;

	var container, stats;

	var camera, scene, controls;
	var webglRenderer;

	var mesh, zmesh, geometry, pd;

	var Models = [];//用于保存所有模型的数组

	var impact = false;//未撞击
	var isTween = false;

	var zz1,zz2,zz3;

	var mouseX = 0, mouseY = 0;

	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;

	var texture_placeholder;
	var hasMoved = false;

	function init() {

		container = document.getElementById( 'container' );
		camera = new THREE.PerspectiveCamera( 60, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 400 );
		// 陀螺仪控制相机
		controls = new THREE.DeviceOrientationControls( camera );
		//创建场景
		scene = new THREE.Scene();

		// 添加光照
		var ambient = new THREE.AmbientLight( 0x221100 );
		scene.add( ambient );
		var directionalLight = new THREE.DirectionalLight(0xffeedd, 1.5);
		directionalLight.position.set(0, 500, 300);
		scene.add( directionalLight );

		// 添加render
		try {
			webglRenderer = new THREE.WebGLRenderer({
				antialias: true,
				alpha: true
			});
			webglRenderer.setClearColor(0xFFFFFF, 0.0);
			webglRenderer.setPixelRatio( window.devicePixelRatio );
			webglRenderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
			webglRenderer.domElement.style.position = "relative";
			container.appendChild( webglRenderer.domElement );
		}
		catch (e) {
		}
		//渲染木星
		renderModols();
		
		//
		window.addEventListener( 'resize', onWindowResize, false );
		bindEvent();
	}
	function renderModols(){
		// 获取模型
		var loader = new THREE.JSONLoader();
		loader.load( "obj/snowman/snoman_a1_dance_max2012.js", function(geometry, materials){
			zz1= createScene( geometry, materials, "zz1" );

			// zz1.position.set(10,0,-10);
			zz1.scale.set(2,2,2);
			zz1.status = 1;
        	zz1.action.time = 0;
        	zz1.visible = true;
			scene.add(zz1);
			Models.push(zz1);

			window.defaultCameraDirection = camera.getWorldDirection();

			loader.load( "obj/snowman/snoman_a2_dance_max2012.js", function(geometry, materials){
				zz2= createScene( geometry, materials, "zz2" );
				zz2.scale.set(3,3,3);
				zz2.status = 1;
	        	zz2.action.time = 0;
	        	zz2.visible = false;
	        	Models.push(zz2);
				scene.add(zz2);
				loader.load( "obj/snowman/snoman_a3_dance_max2012.js", function(geometry, materials){
					zz3= createScene( geometry, materials, "zz3" );
					zz3.scale.set(4,4,4);
					zz3.status = 1;
		        	zz3.action.time = 0;
		        	zz3.visible = false;
		        	Models.push(zz3);
					scene.add(zz3);

					$(".loading").hide();
					allLoaded();

					if (isAndroid && !hasMoved && typeof(defaultCameraDirection) != "undefined") {
			            var v = camera.getWorldDirection();
			            if (v.x != defaultCameraDirection.x || v.y != defaultCameraDirection.y || v.z != defaultCameraDirection.z) {
			                hasMoved = true;
			                resetLocationAndRotation();
			            }
			        }

				});
			});
		} );
	}
	function addPano(){
		texture_placeholder = document.createElement( 'canvas' );
		texture_placeholder.width = 128;
		texture_placeholder.height = 128;

		var context = texture_placeholder.getContext( '2d' );
		context.fillStyle = 'rgb( 200, 200, 200 )';
		context.fillRect( 0, 0, texture_placeholder.width, texture_placeholder.height );
		var materials = [
			loadTexture( 'img/px.jpg' ), // right
			loadTexture( 'img/nx.jpg' ), // left
			loadTexture( 'img/py.jpg' ), // top
			loadTexture( 'img/ny.jpg' ), // bottom
			loadTexture( 'img/pz.jpg' ), // back
			loadTexture( 'img/nz.jpg' )  // front
		];

		mesh = new THREE.Mesh( new THREE.BoxGeometry( 300, 300, 300, 7, 7, 7 ), new THREE.MultiMaterial( materials ) );
		mesh.scale.x = - 1;

		//根据相机朝向设置全境朝向，兼容安卓
		var v = camera.getWorldDirection();
		mesh.lookAt(new THREE.Vector3(v.x, 0, v.z));
        mesh.rotateY((85 * Math.PI) / 180);
        mesh.rotateZ((-4 * Math.PI) / 180);

		scene.add( mesh );
	}
	function resetLocationAndRotation(){
		var v = camera.getWorldDirection();
        var scale = 1 / Math.sqrt(v.x * v.x + v.z * v.z);
        v.x = v.x * scale;
        v.z = v.z * scale;

        if(Models.length>0){
	    	for(var i = 0;i<Models.length;i++){
	    		// Models[i].position.x = v.x * Models[i].position.x;
	    		var vvzz = v.z*15;
	    		if(vvzz>0 && vvzz<5){
	    			vvzz = 8;
	    		}else if(vvzz<0 && vvzz>-5){
	    			vvzz = -8;
	    		}
	    		Models[i].position.z = vvzz;
	    		// alert(Models[i].position.z)
	    		Models[i].lookAt({x:v.x,y:v.y,z:v.z});
	    	}
	    }
	}
	function onWindowResize() {
		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		if ( webglRenderer ) webglRenderer.setSize( window.innerWidth, window.innerHeight );
	}

	function createScene( geometry, materials,name) {
		for (var i = 0; i < materials.length; i++) {
	        var m = materials[i];
	        m.skinning = true
	    }
		zmesh = new THREE.SkinnedMesh( geometry, new THREE.MultiMaterial( materials ) );

		zmesh.geometry.computeVertexNormals();
		zmesh.name = name;
        var helper = new THREE.SkeletonHelper(zmesh);
        helper.material.linewidth = 3;
        // helper.visible = true;
        // scene.add(helper);
        var mixer = new THREE.AnimationMixer(zmesh);
        var ani = geometry.animations[0];
        var action = mixer.clipAction(ani);
        action.clampWhenFinished = false;
        action.setEffectiveTimeScale(10);
        action.play();

        var cameraPosition = camera.getWorldDirection();
        // 随机位置
        var x = RandomNum(-5,5);
        var y = RandomNum(-5,5);
        var z = -10;
        zmesh.position.set(x,y,z);

        zmesh.lookAt(new THREE.Vector3(0, 0, 0));
        zmesh.mixer = mixer;
        zmesh.action = action;
		zmesh.helper = helper;
		return zmesh;
	}
	function RandomNum(Min,Max){
		var Range = Max - Min;
		var Rand = Math.random();  
		var num = Min + Math.round(Rand * Range);
		return num;
	}
	function loadTexture( path ) {

		var texture = new THREE.Texture( texture_placeholder );
		var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );
		var image = new Image();
		image.onload = function () {
			texture.image = this;
			texture.needsUpdate = true;
		};
		image.src = path;

		return material;

	}
	var load = true;
	function animate() {
		requestAnimationFrame( animate );
		render();
		if(isTween){
			TWEEN.update();
		}

		
	}

	var clock = new THREE.Clock();
	var delta = clock.getDelta();
	var frust = new THREE.Frustum();
	var i=0;
	var index = 0;
	function render() {
		var r = Date.now() * 0.0005;
	    if(Models.length>0){
	    	for(var i = 0;i<Models.length;i++){
	    		if(Models[i].visible){
	    			Models[i].lookAt({x:0,y:0,z:0});
	    			computeFrust(Models[i]);
	    			//模型动画
			    	var delta = 0.0013;
			    	Models[i].mixer.update(delta);
			    	// Models[i].helper.update();

	    			index = i;
	    			break;
	    		}
	    	}
	    	//
	    	if(impact){
	    		Models[index] && toDisappear(Models, index);
	    		impact = false;
	    	}
	    }
	    controls.update();
		webglRenderer.render( scene, camera );
	}

	// 消失
	function toDisappear(Models,index){
		isTween = true;
		var tween = new TWEEN.Tween(Models[index].scale)
			.to({x:0,y:0,z:0}, 1000)
			.easing(TWEEN.Easing.Exponential.InOut)
			.onComplete(function() {
				// 动画完成
	            Models[index].action.setEffectiveTimeScale(0);
	            Models[index].visible = false;
	            isTween = false;

	            $(".mesh-show").eq(index).removeClass("cur");

	            index++;
	    		if(index<Models.length){
	    			$(".mesh-show").eq(index).addClass("cur");
	    			Models[index].visible = true;
	    		}else{
	    			document.getElementById("target").style.display="none";
	    			document.getElementById("mycamera").innerHTML="完成攻击！";
	    			$("#attack").hide();
	    			$("#meshShowBox").hide();
	    			alert("完成攻击！");
	    		}
	    		
	        })
	        .start();
	}

	function computeFrust(obj){
		var v = camera.getWorldDirection();
		var dc = new THREE.Vector2(obj.position.x, obj.position.z);
        var eye = new THREE.Vector2(v.x, v.z);
        dt = dc.angle() - eye.angle();
        var dc2 = new THREE.Vector2(obj.position.y, obj.position.z);
        var eye2 = new THREE.Vector2(v.y, v.z);
        dt2 = dc2.angle() - eye2.angle();

        var isReact = false;
        if(isAndroid){
        	// document.getElementById("target").innerHTML=dt2;
        	// if (Math.abs(dt) < 0.1 && dt2 > 0.1 && dt2<0.2){
        	if (Math.abs(dt) < 0.1 && Math.abs(dt2) < 0.1){
        		isReact = true;
        	}else{
        		isReact = false;
        	}
        }else{
        	if (Math.abs(dt) < 0.1 && dt2 < -0.1 && dt2>-0.2) {
        		isReact = true;
        	}else{
        		isReact = false;
        	}
        }
    	if (isReact) {
    		document.getElementById("target").innerHTML="对准目标";
    		$("#attack").removeClass("disable");
    	}else{
    		document.getElementById("target").innerHTML="目标出现";
    		$("#attack").addClass("disable");
    	}

    	var mat1 = camera.projectionMatrix.clone();
    	var mat2 = camera.matrixWorldInverse.clone();
    	var mat = mat1.multiply(mat2);
    	//相机PV矩阵重新设定6个面的法向量
    	frust.setFromMatrix(mat);
    	//将模型的包围盒与视锥进行相交计算
    	var isShow = frust.intersectsObject(obj);
    	if(isShow){
    		document.getElementById("mycamera").innerHTML="目标出现";
    		document.getElementById("target").style.display="block";
    	}else{
    		document.getElementById("mycamera").innerHTML="目标不在视野";
    		document.getElementById("target").style.display="none";
    	}
	}
	function bindEvent(){
		$("#attack").bind("touchstart click", function(){
			if($(this).hasClass("disable")){
				return;
			}
			impact = true;
			return;
		});
	}

	//调起手机后置摄像头
	function getMedia() {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
        var exArray = [];
        if (navigator.getUserMedia) {
            MediaStreamTrack.getSources(function(sourceInfos) {
            	for (var i = 0; i != sourceInfos.length; ++i) {
                    var sourceInfo = sourceInfos[i];
                    if (sourceInfo.kind === "video") {
                        exArray.push(sourceInfo.id)
                    }
                }
                navigator.getUserMedia({
                    "video": {"optional":[{'sourceId': exArray[1]}]},
                    "audio": false
                }, successFunc, errorFunc)
            })
        } else {
        }
    }
    function successFunc(stream) {
        var video = document.createElement("video");
        $(".video").append(video);
        if (video.mozSrcObject !== undefined) {
            video.mozSrcObject = stream;
        } else {
            video.src = window.URL && window.URL.createObjectURL(stream) || stream;
        }
        var videoWrap = document.getElementById('videoWrap');
		$("#videoWrap").width(SCREEN_WIDTH);
		$("#videoWrap").height(SCREEN_HEIGHT);

        video.play();
    }
    function errorFunc(e) {
        console.log("Error"+e);
    }
})();