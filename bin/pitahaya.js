#!/usr/bin/env node

let tx = {
  "avc": {
    mediatype:     2,        
    protectedbit:  0       
  },  
  "pcm": {
    mediatype:     1,        
    incomingbytes: 17640,
    protectedbit:  0     
  },
  "mp3": {
    mediatype:     0,
    incomingbytes: 2000,
    protectedbit:  0     
  }
}

let rx = {
  "1080p": {
    incomingbytes: 8294400
  },
  "360p": {
    incomingbytes: 921600
  }
}

let args = process.argv.slice(2)
let params

const usage = `usage: pitahaya --tx|--rx {params} [phrase]
                  -e, --tx, --encode     {mp3|avc|pcm}
                  -d, --rx, --decode     {360p|1080p}`

if (args[0] === "-v") {
  console.error("version 0.2.1")
  return null
}

let method = args[1]
if (!method) {
  console.error(usage)
  return null  
}
if ( args[0] === "-e" 
  || args[0] === "--tx" 
  || args[0] === "--encode" ) {
  if ( method !== "pcm" 
    && method !== "mp3" 
    && method !== "avc") {
    console.error(usage)
    return null
  }  
}
else if ( args[0] === "-d" 
  || args[0] === "--rx" 
  || args[0] === "--decode" ) {
  if ( method === "avc" 
    || method === "mp3") {
    method = "360p"
  }
  else if (method === "pcm") {
    method = "1080p"
  }
  if ( method !== "1080p" 
    && method !== "360p" ) {
    console.error(usage)
    return null
  }
}
else {
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