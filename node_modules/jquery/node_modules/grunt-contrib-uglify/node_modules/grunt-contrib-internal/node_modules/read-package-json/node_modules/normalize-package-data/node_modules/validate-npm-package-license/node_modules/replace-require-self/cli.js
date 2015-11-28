#!/usr/bin/env node
var replace = require('stream-replace')
var path = require('path')

var name = require(path.join(process.cwd(), 'package.json')).name

process.stdin
  .pipe(
    replace(
      new RegExp('require\\(\s*[\'"]' + name + '[\'"]\s*\\)', 'g'),
      'require(\'./\')'))
  .pipe(process.stdout)
