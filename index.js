var through2 = require('through2');
var fs = require('fs');
var path = require('path');
var slug = require('slug');
var mime = require('mime');

module.exports = function () {
	return function metaMediaFilter (item) {
		return through2(function (chunk, enc, done) {
			done(null, chunk);
		}, function (done) {
			fs.lstat(item.filepath, (err, stats) => {
				if (err) {
					return done(err);
				}

				item.date = stats.mtime;
				item.year = item.date.getFullYear();
				item.month = item.date.getMonth() + 1;
				item.day = item.date.getDate() + 1;
				item.title = item.filename;
				item.slug = slug(path.basename(item.filename, path.extname(item.filename)));
				item.pathname = item.type.getItemPath(item);
				item.mime = item.type.mime || mime.lookup(item.filepath);

				done();
			});
		});
	};
};
