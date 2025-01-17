//顶点着色器程序  
    var VSHADER_SOURCE="" +  
        "attribute vec4 a_Position;\n" +  
        "uniform vec4 u_Translation;\n" +//由于平移是每个顶点都是固定的值，所以声明uniform不变的数据变量  
        "void main(){\n" +  
        "   gl_Position = a_Position+u_Translation;\n" +//设置坐标  
        "}\n";  
  
    //片元着色器程序  
    var FSHADER_SOURCE = "" +  
        "void main(){\n" +  
        "   gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n" +//设置颜色  
        "}\n";  
  
    //声明xyz三个方向上平移的距离  
    var Tx = 0.3,Ty = 0.3,Tz = 0;  
  
    function main() {  
        //首先获取到canvas的dom对象  
        var canvas = document.getElementById("canvas");  
  
        //获取到WebGL的上下文  
        var gl = getWebGLContext(canvas);  
  
        //不支持WebGL的浏览器将打印一个错误，并结束代码运行  
        if (!gl) {  
            console.log("浏览器不支持WebGL");  
            return;  
        }  
  
        //初始化着色器  
        if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){  
            console.log("初始化着色器失败");  
            return;  
        }  
  
        //设置顶点位置  
        var n = initVertexBuffers(gl);  
        if(n < 0){  
            console.log("无法获取顶点相关的信息");  
            return;  
        }  
  
        //获取uniform变量的存储位置  
        var u_Translation = gl.getUniformLocation(gl.program,"u_Translation");  
        if(u_Translation < 0){  
            console.log("无法获取变量的存储位置");  
            return;  
        }  
  
        //给uniform变量赋值  
        gl.uniform4f(u_Translation,Tx,Ty,Tz,0.0);  
  
        //指定一个覆盖（清空）canvas的颜色  
        gl.clearColor(0.0, 0.0, 0.0, 1.0);  
  
        //清除canvas  
        gl.clear(gl.COLOR_BUFFER_BIT);  
  
        //将三个点绘制出来  
        gl.drawArrays(gl.TRIANGLE_FAN,0,n);  
    }  
  
    function initVertexBuffers(gl) {  
        var vertices = new Float32Array([-0.5,0.5,-0.5,-0.5,0.5,-0.5,0.5,0.5]);  
        var n = 4; //绘制点的个数  
  
        //创建缓冲区对象  
        var vertexBuffer = gl.createBuffer();  
        if(!vertexBuffer){  
            console.log("创建缓冲区对象失败");  
            return -1;  
        }  
  
        //将缓冲区对象绑定到目标  
        gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);  
  
        //向缓冲区对象中写入数据  
        gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);  
  
        //获取attribute变量的存储位置  
        var a_Position = gl.getAttribLocation(gl.program, "a_Position");  
  
        if(a_Position < 0){  
            console.log("无法获取变量的存储位置");  
            return;  
        }  
  
        //将缓冲区对象分配给a_Position变量  
        gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);  
  
        //链接a_Position变量与分配给它的缓冲区对象  
        gl.enableVertexAttribArray(a_Position);  
  
        return n;  
    } 