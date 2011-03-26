/*
*
*THE CLIENT (upload.js)
*
*
*/
var sys = require('sys'),
    rest = require('restler');

var file = '/tmp/upload.test'
stat = require('fs').statSync(file)
size = stat['size']
// multipart request sending a file and using http
rest.post('http://0.0.0.0:8081/upload', {
  multipart: true,
  data: {
    'my_file_name': rest.file(file, file, size)
  }
}).on('complete', function(data) {
  sys.puts(sys.inspect(data));
});