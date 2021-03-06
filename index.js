var through2 = require('through2');
var fs = require('fs');
var path = require('path');
var slug = require('slug');
var mime = require('mime');

module.exports = function () {
	return function metaMediaFilter (item) {
		Object.assign(item, {
			year: null,
			month: null,
			day: null,
			title: null,
		}, item);

		return through2(function (chunk, enc, done) {
			done(null, chunk);
		}, function (done) {
			fs.lstat(item.absPath, (err, stats) => {
				if (err) {
					return done(err);
				}

				item.date = stats.mtime;
				item.year = item.date.getFullYear();
				item.month = item.date.getMonth() + 1;
				item.day = item.date.getDate() + 1;
				item.title = item.filename;
				item.slug = slug(item.basename);
				item.mime = item.type.mime || mime.lookup(item.path);

				done();
			});
		});
	};
};
