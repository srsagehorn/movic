$("button").on("click", function (event) {
  event.preventDefault();
  var title = $(".searcharea").val();

  // Michael Z. (scroll down for Shannon's portion)
  $("#movie-result").text("");
  $("#movie-pic").text("");
  $(".mainTitle").text("");
  $("#year").text("");
  $("#genre").text("");
  $("#actors").text("");
  $("#rating").text("");
  $("#length").text("");

  var queryURL = "https://www.omdbapi.com/?apikey=trilogy&t=" + title;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    $("#movie-result").append('<p class = "light"> ' + response.Plot + "</p>");
    var imgUrl = response.Poster;
    var imgPoster = $("<img>");
    imgPoster.attr("src", imgUrl);
    $("#movie-pic").append(imgPoster);
    console.log(response);
    var title = response.Title;
    var year = response.Year;
    $(".mainTitle").append(title);
    $("#year").append("Year: " + year);
    $("#genre").append("Genre: " + response.Genre);
    $("#actors").append("Actors: " + response.Actors);
    $("#rating").append("Rated: " + response.Rated);
    $("#length").append("Length:" + response.Runtime);

    // Shannon S.

    $(".title").text("");
    $("#vid").text("");
    $("#songs").text("");
    var apiKey = "AIzaSyBuTxDLBj2tZR-4sAHR2HGhrUsaJLbbC0w";

    var playlistIdURL =
      "https://www.googleapis.com/youtube/v3/search?order=viewcount&part=snippet&q=" +
      title +
      year +
      "%20movie%20soundtrack&type=playlist&key=" +
      apiKey;

    $.ajax({
      url: playlistIdURL,
      method: "GET",
    }).then(function (idResponse) {
      console.log(idResponse);
      var playlistId = idResponse.items[0].id.playlistId;
      $(".title").append(idResponse.items[0].snippet.title);

      var vidURL =
        "https://www.googleapis.com/youtube/v3/playlists?part=player&id=" +
        playlistId +
        "&key=" +
        apiKey;

      $.ajax({
        url: vidURL,
        method: "GET",
      }).then(function (playlistVid) {
        console.log(playlistVid);
        $("#vid").append(
          playlistVid.items[0].player.embedHtml.replace("http:", "https:")
        );
      });

      var songListURL =
        "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=25&part=contentDetails&playlistId=" +
        playlistId +
        "&key=" +
        apiKey;

      $.ajax({
        url: songListURL,
        method: "GET",
      }).then(function (playlistResponse) {
        console.log(playlistResponse);
        var length = playlistResponse.pageInfo.totalResults;
        for (var i = 0; i < length; i++) {
          $("#songs").append(
            "<li>" + playlistResponse.items[i].snippet.title + "</li>"
          );
        }
        console.log(playlistResponse);
      });
    });
  });
});
