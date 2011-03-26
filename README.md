I have written a small performance test (using some modules for http multipart mime encoding and parsing e.g. Restler on the client and Node-Formidable n the server) to see how HTTP ClientRequest perform, when posting data over HTTP. 
From what I see from my tests, there is a strong variation in all my results, which must have to do something with the transmission over the socket.

#Setup
first off create a file named /TMP/UPLOAD.TEST, that will be used 
during upload (mine is 100 mb) 
if you haven't already 
npm install formidable@latest 
npm install restler

now, when you open up a terminal and run server.js in one window and upload.js in the other you will see the upload rate as a result