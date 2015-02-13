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
			 	<li data-album="${album.id}">
			        <img src="${album.cover}">
			        <h2>"${album.title}"</h2>
			        <button class="seetracks">See Tracks</button>
			        <ul class="tracklist"></ul>
			    </li>`
			);
			//don't forget to use ` for multi-line string
		})

		$(".seetracks").on("click", function(event){
			var button = $(event.target);
			var albumEl = button.closest("[data-album]");
			var id = albumEl.data("album");
			var trackUrl = "https://api.spotify.com/v1/albums/" + id;
			$.ajax(trackUrl)
			.done(function (response) {
				var myTracks = response.tracks.items.map(function (data) {
					var track = new TrackClass ({

						duration: data.duration_ms,
						title: data.name
					});
					track.addArtist();
					return
					
				})
			});

		});

		myTracks.forEach(function(){

		});

			
		})
		.error(function (err) {
			console.log(err);
		})
})




