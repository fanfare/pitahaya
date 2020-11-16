let ReedSolomon = require('./reedsolomon.js')
let {decbin} = require('./tools.js')

const mediatypes = [
  // media type 0 - 128kbps mp3
  {
    cellsizecol:      4,                               
    cellsizerow:      3,   
    canvaswidth:      640,   
    canvasheight:     360,  
    datacolumns:      160,    
    datarows:         119,         
    incomingbytes:    2000,
    bitspace:         19040,
    bitframe:         19040,
    reedsolomonbytes: 38,  
    fps:              8          
  },
  // media type 1 - raw pcm
  {
    cellsizecol:      4,                               
    cellsizerow:      3,    
    canvaswidth:      1920,   
    canvasheight:     1080,  
    datacolumns:      480,    
    datarows:         359,         
    incomingbytes:    17640,  
    bitspace:         171360,
    bitframe:         172320,
    reedsolomonbytes: 45,  
    fps:              10          
  }
]

// version 0
const matrixwrite = function(options) {

  options = options || {}

  let version   = options.version   || 0
  let mediatype = options.mediatype || 0
  
  let {
    fps, 
    reedsolomonbytes, 
    bitspace, 
    bitframe,
    incomingbytes, 
    datarows, 
    datacolumns, 
    cellsizerow, 
    cellsizecol, 
    canvasheight, 
    canvaswidth
   } = mediatypes[mediatype]
   
  let protectedbit = options.protectedbit || 0  
  let abmode = true
  let entirety = canvaswidth * canvasheight * 4

  const masks = ["", ""]

  for (let i=0;i<datarows+1;i++) {
    for (let j=0;j<datacolumns;j+=4) {
      let c = (j) % 2
      masks[0] += c ? "11" : "00"
      masks[0] += "11"
      masks[1] += c ? "00" : "11"
      masks[1] += "00"
    }
  }

  let ncount = -1

  function randframeid() {
    
    let nbits = ""
    ncount++
    
    if (ncount > 65535) {
      ncount = 0
    }
    nbits += decbin(ncount,16)
    return nbits
  }

  let paddingversion          = 4
  let paddingmediatype        = 4
  let paddingfid              = 16
  let paddinglastframebytes   = 24
  let paddinglastframebit     = 1
  let paddingprotectedbit     = 1

  let headerwithoutpaddingsize = 
    1 +
    1 +
    1 +
    paddingversion +
    paddingmediatype +  
    paddingfid +
    paddinglastframebytes +
    paddinglastframebit +
    paddingprotectedbit +
    1 +
    1 +
    1 +
    1 +
    1 +
    1 +
    1
    
  let paddingreserved = datacolumns - headerwithoutpaddingsize

  let assignments = [
    [1,1,false],                              
    [1,0,false],                              
    [1,1,false],                              
    [paddingversion,0,"version"],
    [paddingmediatype,0,"mediatype"],
    [paddingfid,0,false],
    [paddinglastframebytes,0,false],
    [paddinglastframebit,0,false],
    [paddingprotectedbit,0,"protectedbit"],
    [paddingreserved,0,false],                     
    [1,1,false],                              
    [1,0,false],                              
    [1,0,false],                              
    [1,0,false],                              
    [1,0,false],                              
    [1,0,false],                              
    [1,1,false]                       
  ]

  let special = { 
    version:decbin(version,paddingversion),
    mediatype:decbin(mediatype,paddingmediatype),
    protectedbit:decbin(protectedbit,paddingprotectedbit)      
  }

  let headerbuffer = Buffer.allocUnsafe(datacolumns*cellsizecol*cellsizerow*4)
  var z = 0

  for (let i=0;i<assignments.length;i++) {
    let length = assignments[i][0]
    let bit = assignments[i][1] === 0 ? 255 : 0
    for (let j=0;j<length;j++) {
      if (assignments[i][2]) {
        let specialty = special[assignments[i][2]]
        bit = specialty[j] == 0 ? 255 : 0
      }
      for (let k=0;k<cellsizecol;k++) {
        for (let m=0;m<cellsizerow;m++) {
          let offset = (k*4)+m * (canvaswidth * 4)
          let w = z*4*cellsizecol
          headerbuffer[w+0+offset] = bit
          headerbuffer[w+1+offset] = bit
          headerbuffer[w+2+offset] = bit
          headerbuffer[w+3+offset] = 255
        }
      }
      z++
    }
  }

  let blankframe = Buffer.alloc(entirety, 255)
  let busy = false

  function matrix(data) {
    if (busy) {
      return null
    }
    busy = true
    var abcopy = abmode
    let videoframebuffer = blankframe
    for (let i=0;i<headerbuffer.length;i++) {
      videoframebuffer[i] = headerbuffer[i]
    }
    let placementdataavailb = datacolumns - 1 - 4
    let placementdataavaila = datacolumns - 1 - 3
    let placementabmodeb = datacolumns - 1 - 2
    let placementabmodea = datacolumns - 1 - 1
    let pixelfill = function(x,y,offsety,bit) {
      for (let k=0;k<cellsizecol;k++) {
        for (let m=0;m<cellsizerow;m++) {
          let offset = (k*4)+m * (canvaswidth * 4)
          let xy = (((y+offsety)*datacolumns)*cellsizerow) + x
          let w = xy*4*cellsizecol
          videoframebuffer[w+0+offset] = bit
          videoframebuffer[w+1+offset] = bit
          videoframebuffer[w+2+offset] = bit
          videoframebuffer[w+3+offset] = 255
        }
      }
    }
    let abcopybit = abcopy ? 0 : 255
    pixelfill(placementabmodeb,0,0,abcopybit)
    pixelfill(placementabmodea,0,0,abcopybit)
    if (!data) {
      busy = false
      return videoframebuffer
    }  
    let blurb = data.toString("binary")
    var rs = new ReedSolomon(reedsolomonbytes)
    var enc = rs.encode(blurb)
    let realbitspace = enc.length*8
    let bitstream = ""
    pixelfill(placementdataavailb,0,0,0)
    pixelfill(placementdataavaila,0,0,0)
    abmode = !abmode
    for (let i=0;i<enc.length;i++) {
      let octet = enc[i]
      bitstream += decbin(octet,8)
    }
    if (realbitspace < bitspace) {
      let tnbmr = bitspace - realbitspace
      for (let i=0;i<tnbmr;i++) {
        bitstream += "0"
      }
      let hexrbs = decbin(realbitspace,24)
      for (let i=0;i<hexrbs.length;i++) {
        let cell = hexrbs[i]
        let bit = cell == 0 ? 255 : 0
        pixelfill(27+i,0,0,bit)
      }
      pixelfill(51,0,0,1)
    }
    let realbitstream = ""
    let abspec = abcopy ? 1 : 0
    for (let i=0;i<bitstream.length;i++) {
      realbitstream += bitstream[i] ^ masks[abspec][i]
    }
    if (bitframe > bitspace) {
      let enfx = bitframe - bitspace
      for (let i=0;i<enfx;i++) {
        realbitstream += masks[abspec][bitstream.length+i]
      }
    }
    let drawn = 0
    let altbit = false
    let good = true
    for (let y=0;y<datarows;y++) {
      for (let x=0;x<datacolumns;x++) {
        let cell = realbitstream[drawn]
        let bit
        if (good) {
          bit = cell == 0 ? 255 : 0
        }
        else {
          bit = altbit ? 255 : 255
          altbit = !altbit
        }
        pixelfill(x,y,1,bit)
        drawn++
        if (drawn >= realbitstream.length) {
          good = false
        }
      }
      if (!good) {
        break
      }
    }
    var rfid = randframeid()
    for (let i=0;i<16;i++) {
      let ce = rfid[i] == "1" ? 0 : 255
      pixelfill(11+i,0,0,ce)
    }
    busy = false
    return videoframebuffer
  }
  return matrix
}

module.exports = matrixwrite