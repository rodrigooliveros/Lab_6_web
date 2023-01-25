$(document).ready(function() {

// Start your code from here

let animals = [
    "dog", "cat", "rabbit", "hamster", "skunk", "goldfish",
    "bird", "ferret", "turtle", "sugar glider", "chinchilla",
    "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken",
    "capybara", "teacup pig", "serval", "salamander", "frog"
  ];


  function populateButtons(array){
    $("#animal-buttons").empty();

array.forEach(element => {
    
    var a = $("<button>");
    a.text(element)
    a.addClass("animal-button")
    a.attr("data-type",element)
    $("#animal-buttons").append(a);
});
}

// La logica del click de cada boton para hacer la llamda al API
$("#animal-buttons").on("click", ".animal-button", function() {
    //alert("hola")
    var rating = "all"
    var liga = "https://api.giphy.com/v1/gifs/search?q=" + $(this).attr("data-type") + "&api_key=BZeg7AThXsLFDGjj3iciLyE703JRclB7&limit=20&rating=" + rating + "&lang=en";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", liga);
    xhr.send();
    xhr.onload = function(){
        var respuesta = JSON.parse(xhr.response);
        console.log(respuesta);
        respuesta.data.forEach(element => {
            var a = $("<img>");
            a.attr("src",element.images.fixed_height.url)
            a.addClass("animal-image")
            $("#animals").append(a);
        });
    }
    $("#animals").empty();
})


// La lógica del click de cada imagen para "intercambiar las urls"
$("#animals").on("click", ".animal-image", function(){
    var src = $(this).attr("src");
    if(src.includes("_s")){
        $(this).attr("src",src.replace("_s",""));
    }else{
        $(this).attr("src",src.replace(".gif","_s.gif"));
    }

})


// La lógica del formulario para agregar mas botones a la lista
$("#add-animal").on("click", function(e) {
    e.preventDefault();
    var newAnimal = $("input").eq(0).val();
    if(newAnimal.length > 2){
        animals.push(newAnimal);
    }
    populateButtons(animals);
    $("input").eq(0).val("");
})


populateButtons(animals);
});
