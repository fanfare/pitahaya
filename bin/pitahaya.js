#!/usr/bin/env node

let tx = {
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

const usage = `usage: pitahaya [--tx|--rx] [options]
                   -e, --tx, --encode
                   -d, --rx, --decode
               [options]
                    mp3
                    pcm`

let method = args[1]
if (!method || (method !== "pcm" && method !== "mp3")) {
  console.error(usage)
  return null
}

switch (args[0]) {
  case '-e':
  case '--tx':
  case '--encode':
      params = tx[method]
      require('../lib/parse.js')("tx", params)
      break;
  case '-d':
  case '--rx':
  case '--decode':
      params = rx[method]
      require('../lib/parse.js')("rx", params)
      break;
  default:
      console.error(usage)
      return null
}