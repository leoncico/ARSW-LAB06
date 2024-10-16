//@author hcadavid

apimock=(function(){

	var mockdata=[];

	mockdata["johnconnor"]=    [{author:"johnconnor","points":[{"x":150,"y":120},{"x":215,"y":115}],"name":"house"},
     {author:"johnconnor","points":[{"x":340,"y":240},{"x":15,"y":215}],"name":"gear"}, { author: "johnconnor", "points": [
        { "x": 100, "y": 100 },
        { "x": 200, "y": 100 },
        { "x": 200, "y": 200 },
        { "x": 100, "y": 200 },
        { "x": 100, "y": 100 }
    ], "name": "Square" }];
	mockdata["maryweyland"]=[{author:"maryweyland","points":[{"x":140,"y":140},{"x":115,"y":115}],"name":"house2"},
	 {author:"maryweyland","points":[{"x":140,"y":140},{"x":115,"y":115}],"name":"gear2"}];
	mockdata["Leonardo"]=[{author:"Leonardo","points":[{"x":10,"y":10},{"x":20,"y":50},{"x":30,"y":30}],"name":"Micasita"},
	 {author:"Leonardo","points":[{"x":100,"y":100},{"x":100,"y":150},{"x":150,"y":200},{"x":200,"y":100}],"name":"Milotecito"}];
	mockdata["Jeisson"]=[{author:"Jeisson","points":[{"x":10,"y":10},{"x":20,"y":20},{"x":30,"y":30}],"name":"Miksa"},
	 {author:"Jeisson","points":[{"x":100,"y":100},{"x":100,"y":150},{"x":150,"y":200},{"x":200,"y":100}],"name":"Milote"}];

	return {
		getBlueprintsByAuthor:function(authname,callback){
			callback(
				mockdata[authname]
			);
		},

		getBlueprintsByNameAndAuthor:function(authname,bpname,callback){

			callback(
				mockdata[authname].find(function(e){return e.name===bpname})
			);
		}
	}
})();
/*
Example of use:
var fun=function(list){
	console.info(list);
}

apimock.getBlueprintsByAuthor("johnconnor",fun);
apimock.getBlueprintsByNameAndAuthor("johnconnor","house",fun);*/