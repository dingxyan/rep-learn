var canvas = document.getElementById("canvas");
var gl = canvas.getContext("experimental-webgl");

// 顶线着色器
var VSHADER_SOURCE =
	'attribute vec4 a_Position;\n' +
	'void main(){\n' +
	'	gl_Position = a_Position;\n' +
	'	gl_PointSize = 10.0;\n' +
	'}\n';
//片段着色器
var FSHADER_SOURCE =
	'precision mediump float;\n' +
	'uniform vec4 u_FragColor;\n' +
	'void main(){\n' +
	'	gl_FragColor = u_FragColor;\n' +
	'}\n';
function main(){
	//初始化着色器
	if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
		console.log("error");
	}
	
	//获取a_Position变量的存储位置
	var a_Position = gl.getAttribLocation(gl.program,'a_Position');
	
	//获取u_FragColor变量的存储位置
	var u_FragColor = gl.getUniformLocation(gl.program,'u_FragColor');
	
	//获取点g_points，颜色信息g_colors
	
	gl.clear(gl.COLOR_BUFFER_BIT);//清空颜色缓冲区
	var len = g_points.length;
	for(var i=0;i<len;i++)
	{
		var xy=g_points[i];
		var rgba=g_colors[i];
		
		//将点的位置传输到a_Position变量中
		gl.vertexAttrib3f(a_Position,xy[0],xy[1],0.0);
		//将点的颜色信息传输到u_FragColor变量中
		gl.uniform4f(u_FragColor,rgba[0],rgba[1],rgba[2],rgba[3]);
		
		//绘制点
		gl.drawArrays(gl.POINTS,0,1);		
	}
}
function initShaders(gl, vshader, fshader) {  
    var program = createProgram(gl, vshader, fshader);  
    if (!program) {  
        console.log('无法创建程序对象');  
        return false;  
    }  
  
    gl.useProgram(program);  
    gl.program = program;  
  
    return true;  
}
function createProgram(gl, vshader, fshader) {  
    // 创建着色器对象  
    var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);  
    var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);  
    if (!vertexShader || !fragmentShader) {  
        return null;  
    }  
  
    // 创建程序对象  
    var program = gl.createProgram();  
    if (!program) {  
        return null;  
    }  
  
    // 为程序对象分配顶点着色器和片元着色器  
    gl.attachShader(program, vertexShader);  
    gl.attachShader(program, fragmentShader);  
  
    // 连接着色器  
    gl.linkProgram(program);  
  
    // 检查连接  
    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);  
    if (!linked) {  
        var error = gl.getProgramInfoLog(program);  
        console.log('无法连接程序对象: ' + error);  
        gl.deleteProgram(program);  
        gl.deleteShader(fragmentShader);  
        gl.deleteShader(vertexShader);  
        return null;  
    }  
    return program;  
} 
function loadShader(gl, type, source) {  
    // 创建着色器对象  
    var shader = gl.createShader(type);  
    if (shader == null) {  
        console.log('无法创建着色器');  
        return null;  
    }  
  
    // 设置着色器源代码  
    gl.shaderSource(shader, source);  
  
    // 编译着色器  
    gl.compileShader(shader);  
  
    // 检查着色器的编译状态  
    var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);  
    if (!compiled) {  
        var error = gl.getShaderInfoLog(shader);  
        console.log('Failed to compile shader: ' + error);  
        gl.deleteShader(shader);  
        return null;  
    }  
  
    return shader;  
}  
main();

