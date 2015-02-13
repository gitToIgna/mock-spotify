function err() {
  $('.albumImg').text("Cannot retrieve the information requested");
}


$('search_artist').on('click', function(){
	var artistName = $('.artistname').val();
	var url ="https://api.spotify.com/v1/search?type=album&query=" + artistName;
	$.ajax(url)
		.done(function (response) {
			var albumTitle = response.albums.items[n].name;
			var albumImage = response.albums.items[n].images[2].url;
			$(".albumName").html(albumTitle)
			$(".albumImg").html("<img src='" + albumImage + "''>");
		})
		.error(function (err) {
			console.log(err);
		})
})



