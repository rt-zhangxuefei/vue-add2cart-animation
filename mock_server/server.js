var path = require('path')
var fs = require('fs')
var mock = require('mockjs')
var app = require('express')()
var port = 3000
app.listen(port, function () {
  console.info('> Mock server is listening at http://localhost:' + port + '\n')
})

var data = {}
var dataPath = path.join(__dirname, './data.json')

function getData() {
  fs.readFile(dataPath, 'utf-8', function (err, content) {
    if (!err) {
      data = JSON.parse(content)
    } else {
      console.log(err)
    }
  })
}

fs.watchFile(dataPath, function (curr) {
  console.log('Mock data is updated.', curr.mtime)
  getData()
})

getData()

// 支持callback
app.set('jsonp callback name', 'cb')
app.use(function (req, res) {
  var ret
  var delay = 0
  for (var group in data) {
    var isExist = data[group].find(function (reqData) {
      if (!new RegExp(reqData.url).test(req.originalUrl)) {
        return false
      }
      var mData = reqData.res
      ret = reqData.mock !== false ? mock.mock(mData) : mData
      delay = reqData.delay || 0
      return true
    })
    if (isExist) {
      break
    }
  }
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  ret !== undefined ? setTimeout(() => res.jsonp(ret), delay) : res.sendStatus(404)
})
