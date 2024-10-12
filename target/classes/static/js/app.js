var api = apiclient;

var App = (function () {
    let authorName = '';
    let blueprints = [];
    

    function setAuthor(newAuthor) {
        authorName = newAuthor;
    }

    function updateBlueprintsList(author) {
        api.getBlueprintsByAuthor(author, function (blueprintsData) {
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
                            <td><button class="open-btn" data-name="${blueprint.name}">Open</button></td>
                        </tr>`;
            });
            
            $("#tableBlueprints tbody").append(rows.join(''));
    
            let totalPoints = blueprints.reduce(function (sum, blueprint) {
                return sum + blueprint.points;
            }, 0);

            $("#totalPoints").text("Total user points: " + totalPoints);
        });
    }

    function drawBlueprint(author, bpname){
        api.getBlueprintsByNameAndAuthor(author,bpname, function (blueprint) {
            if (!blueprint) {
                alert("Blueprint not found.");
                return;
            }
            $("#currentBlueprintName").text(`Drawing: ${bpname}`);
            const canvas = document.getElementById("blueprintCanvas");
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const points = blueprint.points;
            if (points.length > 0) {
                ctx.beginPath();
                ctx.moveTo(points[0].x, points[0].y);

                for (let i = 1; i < points.length; i++) {
                    ctx.lineTo(points[i].x, points[i].y);
                }

                ctx.stroke();
                ctx.closePath();
            }
        });
    }
    
    function initCanvas(){
        var canvas = document.getElementById("blueprintCanvas");
        var context = canvas.getContext("2d");
        if(window.PointerEvent) {
            canvas.addEventListener("pointerdown", function(event){
                alert('pointerdown at '+event.pageX+','+event.pageY);  
                
            });
          }
          else {
            canvas.addEventListener("mousedown", function(event){
                        alert('mousedown at '+event.clientX+','+event.clientY);  
    
              }
            );
        }
    }

    return {
        setAuthor: setAuthor,
        updateBlueprintsList: updateBlueprintsList,
        drawBlueprint: drawBlueprint,
        initCanvas: initCanvas
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

    $("#tableBlueprints").on("click", ".open-btn", function () {
        const blueprintName = $(this).data("name");
        const authorName = $("#author").val();
        App.drawBlueprint(authorName, blueprintName);
    });
});

