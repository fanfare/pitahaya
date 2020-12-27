#!/usr/bin/env node

let tx = {
  avc: {
    mediatype:     2,        
    protectedbit:  0       
  },  
  pcm: {
    mediatype:     1,        
    incomingbytes: 17640,
    protectedbit:  0     
  },
  mp3: {
    mediatype:     0,
    incomingbytes: 2000,
    protectedbit:  0     
  }
}

let rx = {
  avc: {
    mediatype:     2,
    incomingbytes: 921600
  },
  pcm: {
    mediatype:     1,
    incomingbytes: 8294400
  },
  mp3: {
    mediatype:     0,
    incomingbytes: 921600
  }
}

let args = process.argv.slice(2)
let params

const usage = `usage: pitahaya [--tx|--rx] [options] [extra]
                   -e, --tx, --encode
                   -d, --rx, --decode
               [options]
                    mp3
                    pcm
                    avc
               [extra]
                    phrase`

if (args[0] === "-v") {
  console.error("version 0.2.0")
  return null
}

let method = args[1]
if (!method || (method !== "pcm" && method !== "mp3" && method !== "avc")) {
  console.error(usage)
  return null
}

switch (args[0]) {
  case '-e':
  case '--tx':
  case '--encode':
    params = tx[method]
    if (args[2]) {
      params.protectedbit = 1
      params.phrase = args[2]
    }
    switch(method) {
      case 'avc': {
        require('../lib/parseavc.js')("tx", params)
        break;
      }
      default: {
        require('../lib/parse.js')("tx", params)
        break;
      }
    }
    break;
  case '-d':
  case '--rx':
  case '--decode':
    params = rx[method]
    if (args[2]) {
      params.protectedbit = 1
      params.phrase = args[2]
    }
    require('../lib/parse.js')("rx", params)
    break;
  default:
    console.error(usage)
    return null
}