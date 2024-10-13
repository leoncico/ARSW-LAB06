//@author hcadavid

apiclient=(function(){

	return {
		getBlueprintsByAuthor:function(authname,callback){

            $.get( "/blueprints/" + authname, function(data) {
                alert( "success" );
                callback(data);
            })
                .fail(function() {
                  alert( "error" );
                })
            
        },

		getBlueprintsByNameAndAuthor:function(authname,bpname,callback){

            $.get( "/blueprints/" + authname + "/" + bpname, function(data) {
                callback(data);
            })
                .fail(function() {
                    alert( "error" );
                })

		},

        updateBlueprintPoints:function(authorName, currentBlueprint, points, callback){
            $.ajax({
                url: `/blueprints/${authorName}/${currentBlueprint}`,
                type: 'PUT',
                data: JSON.stringify(points),
                contentType: "application/json"
            })
                .then(function(){
                    callback(points)
                },
                function(){
                    alert("Error updating the points")
                }

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