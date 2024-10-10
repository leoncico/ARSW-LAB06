var App = (function () {
    // Variables privadas
    let authorName = '';
    let blueprints = [];

    // Función pública para cambiar el autor seleccionado
    function setAuthor(newAuthor) {
        authorName = newAuthor;
    }

    // Función pública para actualizar el listado de planos de un autor
    function updateBlueprintsList(author,event) {
        // Llama a la función del módulo apimock
        event.preventDefault();
        apimock.getBlueprintsByAuthor(author, function (blueprintsData) {
            if (!blueprintsData) {
                alert("No blueprints found for author: " + author);
                return;
            }

            // Transformar el listado de planos
            blueprints = blueprintsData.map(function (blueprint) {
                return {
                    name: blueprint.name,
                    points: blueprint.points.length
                };
            });

            // Limpiar la tabla actual
            $("#tableBlueprints tbody").empty();

            const rows = blueprints.map(function (blueprint) {
                return `<tr>
                            <td>${blueprint.name}</td>
                            <td>${blueprint.points}</td>
                        </tr>`;
            });
            
            // Unimos todas las filas generadas y las agregamos al tbody
            $("#tableBlueprints tbody").append(rows.join(''));

            // Calcular el total de puntos
            let totalPoints = blueprints.reduce(function (sum, blueprint) {
                return sum + blueprint.points;
            }, 0);

            // Actualizar el campo del total de puntos en el DOM
            $("#totalPoints").text("Total user points: " + totalPoints);
        });
    }

    // Operaciones públicas
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

