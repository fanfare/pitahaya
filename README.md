Pitahaya
=====
Pitahaya is a node.js script which demonstrates encoding and decoding binary data over a video channel.

Project homepage: [http://jollo.org/LNT/doc/pitahaya/](http://jollo.org/LNT/doc/pitahaya/)

***

### Install

    npm install -g pitahaya
    
### Test

    echo test | pitahaya --tx mp3 | pitahaya --rx mp3
    
verify the output is `test`