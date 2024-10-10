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