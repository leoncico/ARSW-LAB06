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

        updateBlueprintPoints:function(authorName, currentBlueprint, points){
            return $.ajax({
                url: `/blueprints/${authorName}/${currentBlueprint}`,
                type: 'PUT',
                data: JSON.stringify(points),
                contentType: "application/json"
            });
        },

        newBlueprint: function(authorName, bpName, points){

            const newBlueprint = {
                author: authorName,
                name: bpName,
                pnts: points
            };

            return $.ajax({
                url: "/blueprints", // La URL que apunta a tu controlador
                type: "POST",
                data: JSON.stringify(newBlueprint),
                contentType: "application/json", // Especificamos que el contenido es JSON
                success: function(response) {
                    console.log("Blueprint created successfully");
                },
                error: function(xhr, status, error) {
                    console.log("Error:", error);
                }
            });
        },

        deleteBlueprint:function(authorName, currentBlueprint){
            return $.ajax({
                url: `/blueprints/${authorName}/${currentBlueprint}`,
                type: 'DELETE',
                //data: JSON.stringify(currentBlueprint),
                contentType: "application/json"
            });
        },
        
    }

})();

/*
Example of use:
var fun=function(list){
	console.info(list);
}

apimock.getBlueprintsByAuthor("johnconnor",fun);
apimock.getBlueprintsByNameAndAuthor("johnconnor","house",fun);*/