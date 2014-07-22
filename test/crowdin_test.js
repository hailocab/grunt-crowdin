'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.crowdin = {
  extract: function(test) {
    test.expect(1);

    var actual = grunt.file.readJSON('tmp/i18n/fr.json');
    var expected = grunt.file.readJSON('test/expected/i18n/fr.json');
    test.deepEqual(actual, expected, 'should have extracted the language data to a JSON file.');

    test.done();
  },
  config: function(test) {
    test.expect(1);

    var actual = grunt.file.readJSON('tmp/config.json');
    var expected = grunt.file.readJSON('test/expected/config.json');
    test.deepEqual(actual, expected, 'should have written the available languages to the config file.');

    test.done();
  }
};
