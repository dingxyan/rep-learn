
// var arr  = [1,3,5,7,8,6,2,2,6,2,4,3,4,3,3,3,2,2,3];
// var fun = function(arr){
// 	var tmp = [];
// 	// arr = arr.sort();
// 	arr.forEach(function(item){
// 		if(arr.indexOf(item)!=arr.lastIndexOf(item) && tmp.indexOf(item)===-1){
// 			tmp.push(item);
// 		}
// 	})
// 	return tmp;
// }
// console.log(fun(arr))


var docs = [
        {
            id: 1,
            words: ['hello',"world"]
        },
        {
            id: 2,
            words: ['hello',"kids"]
        },
        {
            id: 3,
            words: ['zzzz',"hello"]
        },
        {
            id: 4,
            words: ['world',"kids"]
        }
        
];
function findDocList(docs,arr){
	var tmp = [];
	docs.forEach(function(item){
		var key = 0;
		for(i in item.words){
			if(arr.indexOf(item.words[i])!==-1){
				key++;
			}
		}
		if(key==arr.length){
			tmp.push(item);
		}
	})
	return tmp;
}
console.log(findDocList(docs,['hello'])) //文档1，文档2，文档3
console.log(findDocList(docs,['hello','world'])) //文档1


