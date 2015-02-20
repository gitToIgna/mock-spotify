/* jshint node: true */
"use strict";

var AlbumClass = require('./album.js');
var TrackClass = require('./track.js');

var firstAlbum = new AlbumClass({
    title: 'album title goes here...',
    duration: 10 * 85,
    price: 10
});

// adding a comment
var firstTrack = new TrackClass({
    title: 'this is track one',
    duration: 84,
    price: 0.99
});
firstTrack.addArtist('foo');
firstTrack.addArtist('abc');

firstAlbum.addTrack(firstTrack);

var secondTrack = new TrackClass({
    title: 'this is track two',
    duration: 90,
    price: 1.10
});
secondTrack.addArtist('abc');
secondTrack.addArtist('xyz');
firstAlbum.addTrack(secondTrack);

console.log('Album: ', firstAlbum);
console.log('Artists: ', firstAlbum.getArtists());

//UI functions 

function err() {
  $('.albumList').text("<p>Cannot retrieve the information requested<p>");
}

$('#search_artist').on('click', function(event){
	event.preventDefault();
	var artistName = $('#artistname').val();
	var url ="https://api.spotify.com/v1/search?type=album&query=" + artistName;
	$.ajax(url)
		.done(function (response) {
			var myAlbums = response.albums.items.map(function (data) {
				return new AlbumClass({
					title: data.name,
					url: data.images[2].url,
					id: data.id
				});
			});	
		// display
		myAlbums.forEach(function (album) {
			$('.albumList').append(`
				<div class="album_data_list col-lg-6" align="center">
				 	<li data-album="${album.id}">
				 		<div class="album_upper_container">
				        <img src="${album.cover}" class="album_image">
				        <h2>"${album.title}"</h2>
				        <button class="seetracks">See Tracks</button>
				        </div>
				        <ul class="tracklist"></ul>
				     </li>
			    </div>`
			);
		//don't forget to use ` for multi-line string
		})
		var trackDataList = false;

		$(".seetracks").on("click", function(event){
			event.preventDefault();
			var button = $(event.target);
			var albumEl = button.closest('li');
			var id = albumEl.data("album");
			var trackUrl = "https://api.spotify.com/v1/albums/" + id;
			if (trackDataList == false) {
			$.ajax(trackUrl)
				.done(function (response) {
					var tracks = response.tracks.items.map(function (data) {
						return new TrackClass ({
							trackNumber: data.track_number,
							preview: data.preview_url,
							duration: data.duration_ms,
							title: data.name
						});
					})
				tracks.forEach(function (track){
				//display
					$(event.target.parentElement).find(".tracklist").append(`
					 	<li class="track clearfix">
					        <h3 class="track_title clearfix">${track.trackNumber}: ${track.title}</h3>
					        <audio src="${track.preview}" controls></audio>
					    </li>`
					);
				});
			});		
			trackDataList = true;
			
			} else {
				$(event.target.children).find("ul.tracklist").hide()
				trackDataList = false;
			}

		});


	})
	.error(function (err) {
		console.log(err);
	})
})
