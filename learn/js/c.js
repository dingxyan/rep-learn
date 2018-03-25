$(function(){
	$(".box").on("click",  function(event){
		// console.log("aaa")
		console.log(event.target);
		console.log(event.currentTarget);
	})

	document.cookie="usename=dxy;password=123;";
	document.cookie="usename=dxy2;password=1232;";



	var file = $("#upFile").bind("change",function(){
		console.log(this.files[0])
		var file = this.files[0];
		var reader = new FileReader();
		$.ajax({
			url:"http://static.scloud.letv.com/75082367-contacticon/664f34ce-225f-4b14-ba5f-a2b33db0bb54?AWSAccessKeyId=081b9266eeef3a4d6719beb340c633e3&Expires=1521625416&Signature=wkhijWVb7UOX3ZmzydXkj0SrntU%3D",
			type: 'put',
			data:"file"
		})
	});
})

