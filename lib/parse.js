module.exports = function(method, params, options) {
  let {incomingbytes} = params
  let xtot = 0
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
  let padding = false
  let incomingsize = 0
  let segments = []
  const matrix = pitahaya[method]()
  const stdin = process.stdin
  function outgoing(buffer) {
    let output = matrix(buffer)
    if (output) {
      process.stdout.write(output)
    }
    return null
  }
  stdin.on('data', function (data) {
    xtot += incomingsize
    incomingsize += data.length
    segments.push(data)
    if (incomingsize >= incomingbytes) {
      process.stdin.pause()
      let remainder
      let active = false
      while (incomingsize >= incomingbytes) {
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
        outgoing(segmentbuffer)
      }
      active = false
      process.stdin.resume()
    }
  })
  stdin.on('end', function(data) {
    let segmentbuffer = Buffer.concat(segments)
    if (segmentbuffer.length > 0) {
      outgoing(segmentbuffer)
    }
  })
}