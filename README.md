# THIS REPOSITORY HAS MOVED. PLEASE USE https://git.sr.ht/~fanfare/pitahaya

This repository has moved and will no longer be maintained on GitHub. For the latest updates, please use https://git.sr.ht/~fanfare/pitahaya

This account will no longer have access to GitHub after "two-factor authentication" becomes enforced September 27, 2023.

mirror: https://jollo.org/LNT/home/fanfare/git.html

---

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
