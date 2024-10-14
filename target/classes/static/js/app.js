
var App = (function () {
    let api = apiclient;
    let authorName = '';
    let blueprints = [];
    let currentBlueprint = null; // Almacena el plano actual
    let currentPoints = [];
    

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
                    points: blueprint.points ? blueprint.points.length : 0
                };
            });

            $("#tableBlueprints tbody").empty();

            let rows = blueprints.map(function (blueprint) {
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

    
    function drawBlueprint(author, bpname) {
        api.getBlueprintsByNameAndAuthor(author, bpname, function (blueprint) {
            if (!blueprint) {
                alert("Blueprint not found.");
                return;
            }
            currentBlueprint = bpname; 
            currentPoints = blueprint.points;
            $("#currentBlueprintName").text(`Drawing: ${bpname}`);
            redrawCanvas();
        });
    }
    
    //Lo Separe del Draw para poder reutilizarlo Xd
    function redrawCanvas() {
        const canvas = document.getElementById("blueprintCanvas");
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (currentPoints) {
            ctx.beginPath();
            ctx.moveTo(currentPoints[0].x, currentPoints[0].y);
            for (let i = 1; i < currentPoints.length; i++) {
                ctx.lineTo(currentPoints[i].x, currentPoints[i].y);
            }
            ctx.stroke();
            ctx.closePath();
        }
        else{
            currentPoints = [];
        }

    }

    //Ta igual solo que ahora llama a la funcion de manejar eventos
    function initCanvas() {
        const canvas = document.getElementById("blueprintCanvas");

        if (window.PointerEvent) {
            canvas.addEventListener("pointerdown", function (event) {
                handleCanvasClick(event);
                //alert('pointerdown at '+event.pageX+','+event.pageY); 
            });
        } else {
            canvas.addEventListener("mousedown", function (event) {
                handleCanvasClick(event);
                //alert('mousedown at '+event.clientX+','+event.clientY);
            });
        }
    }

    //Para capturar el Evento y decirle en que posición va a ir el nuevo punto
    function handleCanvasClick(event) {
        const canvas = document.getElementById("blueprintCanvas");
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if (currentBlueprint) {
            addPointToCurrentBlueprint(x, y);
        } else {
            alert('No blueprint selected.');
        }
    }

    //Cosa para agregar nuevo punto  y redibujar con el nuevo segmento
    function addPointToCurrentBlueprint(x, y) {
        currentPoints.push({ x: x, y: y }); 
        //console.log(`New point added to ${currentBlueprint}: (${x}, ${y})`);
        redrawCanvas();
    }

    function updatePoints(blueprint, author){
        const dataToSend = {
            points: currentPoints
        };
        var promise = api.updateBlueprintPoints(author, blueprint, dataToSend);

        updatePromise(promise).then(function() {
            updateBlueprintsList(author);
        });
    }

    function updatePromise(promise){
        promise.then(
            function(points){
                alert("Updated points\n" + "New number of points: " + currentPoints.length);
            },
            function(){
                alert("Update failed")
            }  
        );
        return promise;
    }

    function newBlueprint(author, bpname){
        const canvas = document.getElementById("blueprintCanvas");
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        currentPoints = [];
        currentBlueprint = bpname;
        

        api.newBlueprint(author, bpname, currentPoints).
            then(function(){
                updateBlueprintsList(author);
            });

        $("#currentBlueprintName").text(`Drawing: ${bpname}`);

    }

    function addEventsButtons(){
        $("#searchButton").click(function () {
                    let authorName = $("#author").val();
                    if (authorName) {
                        setAuthor(authorName);
                        updateBlueprintsList(authorName);
                    } else {
                        alert("Please enter an author name.");
                    }
                });
            
        $("#tableBlueprints").on("click", ".open-btn", function () {
            const blueprintName = $(this).data("name");
            const authorName = $("#author").val();
            drawBlueprint(authorName, blueprintName);
        });

        $('#saveButton').click(function () {
            if(currentBlueprint){
                updatePoints(currentBlueprint, authorName)
            }
            else{
                alert('No blueprint selected.');
            }
        });

        $('#newButton').click(function () {
            if(currentBlueprint){
                currentBlueprint = null;
                redrawCanvas();
            }
            var bpName = "";

            while(!bpName){
                bpName = prompt("Enter the blueprint name:");
                
                if(!bpName){
                    alert("Fill the info")
                }
            }

            newBlueprint(authorName, bpName);
        });

    }


    return {
        setAuthor: setAuthor,
        updateBlueprintsList: updateBlueprintsList,
        drawBlueprint: drawBlueprint,
        initCanvas: initCanvas,
        addEventsButtons: addEventsButtons,
        updatePoints: updatePoints
    };
})();

// $(document).ready(function () {
//     $("button").click(function () {
//         var authorName = $("#author").val();
//         if (authorName) {
//             App.setAuthor(authorName);
//             App.updateBlueprintsList(authorName,event);
//         } else {
//             alert("Please enter an author name.");
//         }
//     });

//     $("#tableBlueprints").on("click", ".open-btn", function () {
//         const blueprintName = $(this).data("name");
//         const authorName = $("#author").val();
//         App.drawBlueprint(authorName, blueprintName);
//     });
// });

