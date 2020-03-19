var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var entitiesRouter = require('./routes/entities');
var playlistsRouter = require('./routes/playlists');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/entities', entitiesRouter);
app.use('/api/playlists', playlistsRouter);

module.exports = app;
