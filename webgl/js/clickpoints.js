//顶点着色器程序  
    var VSHADER_SOURCE="" +  
        "attribute vec4 a_Position;\n" +  
        "void main(){\n" +  
        "   gl_Position = a_Position;\n" +//设置坐标  
        "   gl_PointSize = 10.0;\n" +//设置尺寸  
        "}\n";  
  
    //片元着色器程序  
    var FSHADER_SOURCE = "" +  
        "void main(){\n" +  
        "   gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n" +//设置颜色  
        "}\n";  
  
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
  
        //获取attribute变量的存储位置  
        var a_Position = gl.getAttribLocation(gl.program, "a_Position");  
  
        if(a_Position < 0){  
            console.log("无法获取变量的存储位置");  
            return;  
        }  
        

        // //将顶点位置传输给attribute变量  
        // gl.vertexAttrib3f(a_Position,0.0,0.5,0.0);  
  
        // //指定一个覆盖（清空）canvas的颜色  
        gl.clearColor(0.0, 0.0, 0.0, 1.0);  
  
        // //执行清空  
        gl.clear(gl.COLOR_BUFFER_BIT);  
  
        // //绘制一个点  
        // gl.drawArrays(gl.POINTS,0,1);  

        var arr = [];
        canvas.onclick=function(e){
            // console.log(e)
            var x = e.clientX;
            var y = e.clientY;
            var rect = e.target.getBoundingClientRect();
            var l = (x-rect.left)/rect.width*2-1;
            var t = 1-(y-rect.top)/rect.height*2;
            arr.push({x:l,y:t});

            gl.clear(gl.COLOR_BUFFER_BIT); 
            console.log(arr)

            for(var i=0;i<arr.length;i++){
                gl.vertexAttrib3f(a_Position,arr[i].x,arr[i].y,0.0);
          
                //绘制一个点  
                gl.drawArrays(gl.POINTS,0,1);  
            }
        };
    }  