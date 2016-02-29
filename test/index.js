/* global describe, it, beforeEach */
var filterFactory = require('../');
var assert = require('assert');
var rufio = require('rufio');
var Site = rufio.Site;
var Type = rufio.Type;
var Item = rufio.Item;

describe('rufio filter media meta', function () {
	var site;
	var type;
	var item;
	beforeEach(function () {
		site = new Site({
			baseDir: __dirname
		});
		type = new Type('media', {
			site: site,
			directory: 'fixtures'
		});
		site.addType(type);
		item = new Item({
			site: site,
			type: type,
			filename: 'rufio.jpg'
		});
		type.addItem(item);
	});

	it('should parse some basic meta', function (done) {
		item.addFilter(filterFactory());
		var s = item.load();
		s.resume();
		s.on('end', function () {
			assert.equal(item.year, 2016);
			assert.equal(item.month, 2);
			assert.equal(item.day, 29);
			assert.equal(item.title, 'rufio.jpg');
			assert.equal(item.slug, 'rufio');
			assert.equal(item.pathname, '/media/rufio');
			assert.equal(item.mime, 'image/jpeg');
			done();
		});
	});
});
