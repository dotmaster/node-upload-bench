/*
*
*THE SERVER (server.js)
*
*
*/
var profiler=require('v8-profiler');
var formidable = require('node-formidable'),
    http = require('http'),
    sys = require('sys');
var i= 0
http.createServer(function(req, res) {
  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    // parse a file upload
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(sys.inspect({fields: fields, files: files}));
      end=new Date().getTime()
      time=(end-start)/1000
      rate = (files.my_file_name.size / time / 1024 / 1024).toFixed(2)
      console.log(rate + ' mb/sec')
    });
    form.on('fileBegin', function(){i = 0; start=new Date().getTime()})
    form.onPart = function(part) {
        if (part.filename){
          //let us extract the file size from the boundary header if not already
          if (part.headers['content-length']) {
            form.bytesExpected = part.headers['content-length']
          } 
          form.handlePart(part);
        }
    }
    //Progress

    form.on('progress', function(bytesReceived, bytesExpected){
      i++;
      require('sys').print(Math.round(bytesReceived/bytesExpected * 100) + ' %\r')
    })    
  }
}).listen(8081)
