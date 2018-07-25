$(document).ready(function () {
});   

function search(){
    var nPerson = $("#nPersons").val();
    var gender = $("#gender").val();
    $("#data").show();
    $("#row").empty();
    $.ajax({
        "url": "https://randomuser.me/api?results="+nPerson+"&gender="+gender,
            "dataType": "json",
            "success": function(data) {
                $.each(data.results, function (index, client) {
                    $cardItem = "<div class='col-sm-3' >";
                    $cardItem +=    "<div>";
                    $cardItem +=        "<div class='border'><img src='" + client.picture.large  + "'></div>";
                    $cardItem +=        "<div><p class = 'text'>" + client.name.first + ' ' + client.name.last + "</p></div>";
                    $cardItem +=    "</div>";
                    $cardItem += "</div>";
                    $('#row').append($cardItem);
                });
            },
            "error": function(request, status, error) {
                handleError(error);
            }
        });
}