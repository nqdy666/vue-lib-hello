var path = require('path')
var fs = require('fs')
var _ = require('lodash')
var replace = require('replace-in-file')

var fromLibName = 'vue-lib-hello'
var toLibName = 'vue-my-lib-hello'

var formAuthorName = 'nianqin'
var toAuthorName = 'nqdy666'

function getFullPath(filename) {
  return path.join(__dirname, filename)
}

var options = {
  files: [
    getFullPath('!(rename.js)*'),
    getFullPath('!(lib|node_modules|dist)*/**')
  ],
  from: [
    new RegExp(fromLibName, 'g'),
    new RegExp(_.camelCase(fromLibName), 'g'),
    new RegExp(_.upperFirst(_.camelCase(fromLibName)), 'g'),
    new RegExp(formAuthorName, 'g')
  ],
  to: [
    toLibName,
    _.camelCase(toLibName),
    _.upperFirst(_.camelCase(toLibName)),
    toAuthorName
  ],
  countMatches: true
}

replace(options)
  .then(results => {
    console.log('Replacement results:', results)

    fs.rename(
      getFullPath('packages/' + _.upperFirst(_.camelCase(fromLibName))),
      getFullPath('packages/' + _.upperFirst(_.camelCase(toLibName))),
      function(err, results) {
        console.log('rename file', err, results)
      }
    )
  })
  .catch(error => {
    console.error('Error occurred:', error)
  })
