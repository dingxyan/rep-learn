function bubble(arr){
	for(var i=0;i<arr.length;i++){
		for(var j=0;j<arr.length-1-i;j++){
			if(arr[j]>arr[j+1]){
				var k = arr[j];
				arr[j] = arr[j+1];
				arr[j+1] = k;
			}
		}
	}
	return arr;
}
console.log(bubble([5,4,3]))


function jiecheng(num){
	if(num<=1){
		return 1;
	}
	return num * jiecheng(num-1);
}
console.log(jiecheng(5))

function quickSort(arr,begin,end){
	var s = begin, e = end;
	if(begin>end){
		return arr;
	}
	var key = arr[begin];
	while(begin<end){
		while(arr[end]>=key && begin<end){
			end--;
		}
		arr[begin] = arr[end];
		while(arr[begin]<=key && begin<end){
			begin++;
		}
		arr[end] = arr[begin];
	}
	if(begin==end){
		arr[begin] = key;
	}
	quickSort(arr,s,begin-1);
	quickSort(arr,begin+1,e);
	return arr;

}
var arr2 = [2,5,3,1,2453,12,78,123,9,3,67,231,6];
quickSort(arr2,0,arr2.length-1);
console.log(arr2)
console.log(quickSort(arr2,0,arr2.length-1))

function sw(a,b){
	a=a+b;
	b=a-b;
	a=a-b;
	console.log(a,b)
}
sw(9,1)

function isHuiwen(str){
	return str == str.split('').reverse().join('');
}
console.log(isHuiwen("abccba"))

function quchong(arr){
	var res = [];
	for(var i=0;i<arr.length;i++){
		if(res.indexOf(arr[i])==-1){
			res.push(arr[i]);
		}
	}
	return res;
}
var arr3=[23,4,21,1,3,1,4,2,1,6,3,6,4];
console.log(quchong(arr3));

function quchong2(arr){
	var res = [], obj={};
	for(var i=0;i<arr.length;i++){
		if(!obj[arr[i]]){
			res.push(arr[i]);
			obj[arr[i]] = true;
		}
	}
	return res;
}
console.log(quchong2(arr3));

function quchong3(arr){
	var set = new Set(arr);
	var res = Array.from(set);
	return res;
}
console.log(quchong3(arr3));

function node(val,left,right){
	this.val = val;
	this.left = left;
	this.right = right;
}

function find(binarytree,num){
	if(num==binarytree.val){
		return 1;
	}
	if(binarytree.left){
		if(num==binarytree.left.val){}
	}
}







