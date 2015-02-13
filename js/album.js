/* jshint node: true, esnext: true */
"use strict";

/*
title <string>
duration <number>
producers <array>[string]
genre <string>
label <string>
cover <url:string>
price <number>
release day <date>
tracks <array>[track]
*/

var TrackClass = require('./track.js');
var Utils = require('./utils.js');

class Album {

    constructor(data = {}) {
        Utils.assertString(data.title, 'Title should be a string');
        this.title = data.title;

        this.producers = [];

        Utils.assertString(data.genre, 'Genre should be a string');
        this.genre = data.genre;

        Utils.assertString(data.label, 'Label should be a string');
        this.label = data.label;

        Utils.assertString(data.url, 'URL should be a string');
        this.cover = data.url;

        Utils.assertNumber(data.price, 'Price should be a number');
        this.price = data.price;

        Utils.assertDate(data.release, 'Release date should be in date format');
        this.release = data.release;

        this.artists = [];

        this.tracks = [];

    }

    addTrack(track) {
        if (!track instanceof TrackClass) {
            console.log('Track should be an instance of TrackClass');
        }
        this.tracks.push(track);
    }

    getArtists() {
        var artists = [];
        this.tracks.forEach(function(track) {
            artists = artists.concat(track.artists);
        });
        return Utils.uniq(artists);
    }

    getDuration() {
        var duration = 0;
        this.track.forEach(function(track) {
            duration = duration + track.duration;
        });
        return duration;
    }

    getProducers() {
        var producers = [];
        this.tracks.forEach(function(track) {
            producers = producers.concat(track.producers);
        });
        return Utils.uniq(producers);
    }

}

module.exports = Album;
