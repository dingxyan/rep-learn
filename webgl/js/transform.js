//顶点着色器  
    var VSHADER_SOURCE = "" +  
        "attribute vec4 a_Position;\n" +  
        "uniform mat4 u_xformMatrix;\n" +//此处声明了一个矩阵的uniform变量  
        "void main(){" +  
        "   gl_Position = u_xformMatrix * a_Position;\n" +//顶点乘以矩阵  
        "}";  
  
    //片元着色器  
    var FSHADER_SOURCE = "" +  
        "void main(){" +  
        "   gl_FragColor = vec4(0.0,1.0,0.0,1.0);" +  
        "}";  
  
    //声明初始旋转角度  
    var angle = 0.0;  
  
    //声明平移的x，y变量  
    var Tx = 0.0, Ty = 0.0, Tz = 0.0;  
  
    //声明缩放的x，y变量  
    var Sx = 1.0,Sy = 1.0, Sz = 1.0;  
  
    function main() {  
        //获取canvas对象  
        var canvas = document.getElementById("canvas");  
  
        //获取WebGL上下文  
        var gl = getWebGLContext(canvas);  
  
        if (!gl) {  
            console.log("无法获取到WebGL上下文");  
            return;  
        }  
  
        if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {  
            console.log("无法初始化着色器");  
            return;  
        }  
  
        var n = initVertexBuffers(gl);  
  
        //获取uniform的存储位置  
        var u_xformMatrix = gl.getUniformLocation(gl.program, "u_xformMatrix");  
  
  
        //书写一个可以重新绘制页面的方法  
        function run() {  
            //计算出sin b 和cos b的值  
            var radian = Math.PI * angle / 180;  
            var cosB = Math.cos(radian);  
            var sinB = Math.sin(radian);  
  
            //声明矩阵 按列主序排列  
            var xformMatrix = new Float32Array([  
                cosB*Sx, sinB*Sx, 0.0, 0.0,  
                -sinB*Sy, cosB*Sy, 0.0, 0.0,  
                0.0, 0.0, 1.0*Sz, 0.0,  
                Tx, Ty, Tz, 1.0  
            ]);  
  
            //将生产的矩阵的值传递给u_xformMatrix变量  
            gl.uniformMatrix4fv(u_xformMatrix,false,xformMatrix);  
  
            //绘制底色  
            gl.clearColor(0.0,0.0,.0,1.0);  
  
            gl.clear(gl.COLOR_BUFFER_BIT);  
  
            gl.drawArrays(gl.TRIANGLES,0,n);  
        }  
  
        //初始化第一次绘制  
        run();  
  
        //设置定时器，进行定时更新  
        setInterval(function () {  
            angle ++;  
            run();  
        },100);  
  
        //设置键盘上下左右按钮移动图形  
        document.addEventListener("keyup",function (event) {  
            console.log(event.keyCode);  
            switch (event.keyCode){  
                case 37:  
                    Tx -= 0.05;  
                    break;  
                case 38:  
                    Ty += 0.05;  
                    break;  
                case 39:  
                    Tx += 0.05;  
                    break;  
                case 40:  
                    Ty -= 0.05;  
                    break;  
                case 87:  
                    Sy += 0.05;  
                    break;  
                case 83:  
                    Sy -= 0.05;  
                    break;  
                case 65:  
                    Sx -= 0.05;  
                    break;  
                case 68:  
                    Sx += 0.05;  
                    break;  
            }  
  
            run();  
        });  
  
    }  
  
    function initVertexBuffers(gl) {  
        var vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);  
        var n = 3;  
  
        var vertexBuffer = gl.createBuffer();  
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);  
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);  
        var a_Position = gl.getAttribLocation(gl.program, "a_Position");  
  
        if (a_Position < 0) {  
            console.log("无法获取变量存储位置");  
            return;  
        }  
  
        gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);  
  
        gl.enableVertexAttribArray(a_Position);  
  
        return n;  
    }  