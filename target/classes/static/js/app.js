var App = (function () {
    let authorName = '';
    let blueprints = [];

    function setAuthor(newAuthor) {
        authorName = newAuthor;
    }

    function updateBlueprintsList(author) {
 
        
        apimock.getBlueprintsByAuthor(author, function (blueprintsData) {
            if (!blueprintsData) {
                alert("No blueprints found for author: " + author);
                return;
            }

            
            blueprints = blueprintsData.map(function (blueprint) {
                return {
                    name: blueprint.name,
                    points: blueprint.points.length
                };
            });

            
            $("#tableBlueprints tbody").empty();

            const rows = blueprints.map(function (blueprint) {
                return `<tr>
                            <td>${blueprint.name}</td>
                            <td>${blueprint.points}</td>
                        </tr>`;
            });
            
            
            $("#tableBlueprints tbody").append(rows.join(''));

            
            let totalPoints = blueprints.reduce(function (sum, blueprint) {
                return sum + blueprint.points;
            }, 0);

            
            $("#totalPoints").text("Total user points: " + totalPoints);
        });
    }

    
    return {
        setAuthor: setAuthor,
        updateBlueprintsList: updateBlueprintsList
    };
})();

$(document).ready(function () {
    $("button").click(function () {
        var authorName = $("#author").val();
        if (authorName) {
            App.setAuthor(authorName);
            App.updateBlueprintsList(authorName,event);
        } else {
            alert("Please enter an author name.");
        }
    });
});

