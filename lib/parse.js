module.exports = function(method, params, options) {
  
  let bytesread = 0
  let byteswritten = 0
  let drainwait = false
  let finished = false
  let incomingsize = 0
  let segments = []
  
  let {incomingbytes} = params
  
  process.stdin.resume()
  
  const pitahaya = {
    rx: function() {
      const matrix = require('./read.js')()
      return matrix
    },
    tx: function() {
      const matrix = require(`./write.js`)(params)
      return matrix
    }
  }
  
  const matrix = pitahaya[method]()
  
  function outgoing(segmentbuffer) {
    let output = matrix(segmentbuffer)
    if (output) {
      let situation = process.stdout.write(output)
      if (situation) {
        evaporate()
      }
      else {
        drainwait = true
      }
    }
    else {
      //console.error(method, "critical error bad matrix")
      evaporate()
    }    
  }
  
  function deplete() {
    let remainder
    let active = false
    let segmentbuffer = Buffer.concat(segments)
    if (incomingsize >= incomingbytes) {
      active = true
      let diff = incomingsize - incomingbytes
      let realbuffer = segmentbuffer.slice(0,incomingbytes)
      remainder = segmentbuffer.slice(incomingsize-diff,segmentbuffer.length)
      segmentbuffer = realbuffer
    }
    if (active) {
      segments = [remainder]
      incomingsize = remainder.length
    }
    else {
      segments = []
      incomingsize = 0
    }
    incomingsize = remainder ? remainder.length : 0
    byteswritten += segmentbuffer.length
    outgoing(segmentbuffer)
  }
  
  function evaporate() {
    if (incomingsize >= incomingbytes) {
      deplete()
    }
    else if (finished && incomingsize > 0) {
      deplete()
    }
    else {
      process.stdin.resume()
    }    
  }
  
  process.stdout.on('drain', () => {
    drainwait = false
    evaporate()
  })

  process.stdin.on('data', function (data) {
    bytesread += data.length
    incomingsize += data.length
    segments.push(data)
    process.stdin.pause()
    evaporate()
  })
  
  process.stdin.on('error', function(e) {
    console.error(e)
  })
  
  process.stdin.on('end', function(data) {
    finished = true
    if (bytesread !== byteswritten && !drainwait) {
      evaporate()
    }
  })
}