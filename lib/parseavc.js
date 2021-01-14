module.exports = function(method, params, options) {
  
  let {maxincoming, interval} = params
  
  let clock = null
  let drainwait = false
  let finished = false
  // potential todo
  let depleted = false
  let incomingsize = 0
  let segments = []
  
  process.stdin.resume()
  
  const pitahaya = {
    tx: function() {
      const matrix = require(`./write.js`)(params)
      return matrix
    }
  }
  
  const matrix = pitahaya["tx"]()
  
  let outgoingqueue = []
  
  function requestbuffercollection() {
    
    let remainder
    let active = false
    let segmentbuffer = Buffer.concat(segments)
    
    if (segmentbuffer.length >= maxincoming) {
      active = true
      let diff = incomingsize - maxincoming
      let realbuffer = segmentbuffer.slice(0,maxincoming)
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
    outgoingqueue.push(segmentbuffer)
    
    if (!drainwait) {
      evaporate()
    }
  }
  
  function evaporate() {
    if (outgoingqueue.length > 0) {
      let segmentbuffer = outgoingqueue.shift()
      let output = matrix(segmentbuffer)
      if (output) {
        let situation = process.stdout.write(output.data)
        if (situation) {
          evaporate()
        }
        else {
          drainwait = true
        }
      }
      else {
        evaporate()
      }      
    }
  }

  process.stdout.on('drain', () => {
    drainwait = false
    //console.error("drain", Date.now())
    evaporate()
  })

  process.stdin.on('data', function (data) {
    incomingsize += data.length
    segments.push(data)
  })
  
  process.stdin.on('end', function(data) {
    finished = true
    process.exit()
  })
  
  process.stdin.on('error', function(e) {
    // console.error(e)
  })
  
  var avcinterval = interval
  var avcexpected = Date.now() + avcinterval
  function avcstep() {
    const avcdt = Date.now() - avcexpected
    requestbuffercollection()
    avcexpected += avcinterval
    if (!finished) {
      clock = setTimeout(avcstep, Math.max(0, avcinterval - avcdt))
    }
  }
  setTimeout(avcstep, avcinterval)
  
}