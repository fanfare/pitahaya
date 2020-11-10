let ReedSolomon = require('./reedsolomon.js')
let {decbin} = require('./tools.js')

const mediatypes = [
  // media type 0 - 128kbps mp3
  {
    cellsizerow:      3,   
    canvaswidth:      640,   
    canvasheight:     360,  
    datacolumns:      160,    
    datarows:         119,         
    incomingbytes:    2000,
    bitspace:         19040,      
    reedsolomonbytes: 38,  
    fps:              8          
  },
  // media type 1 - raw pcm
  {
    cellsizerow:      3,
    canvaswidth:      1920,
    canvasheight:     1080,
    datacolumns:      480,
    datarows:         359,
    incomingbytes:    17640,  
    bitspace:         171360,      
    reedsolomonbytes: 45,  
    fps:              10          
  }
]

const matrixread = function() {

  const vparams = {
    version: "",
    mediatype: "",
    fid: "",
    lastframebytes: "",
    lastframebit: "",
    protectedbit: ""
  }

  let fps = 0
  let reedsolomonbytes = 0
  let abeverfound = false
  let validheader = false
  let usablebuffer = null
  let canvaswidth = 0
  let canvasheight = 0
  let bitspace = 0
  let oldbitspace = 0
  let responsearray
  let responsearraylength
  let datacolumns = 0
  let datarows = 0
  let cellsizecol = 0
  let cellsizerow = 0
  let realbytesend = 0
  let protectedbit = 0
  let matrixsize = 0
  let blackwhitergbthreshold = 127
  let blackwhitergbthresholdtwo = blackwhitergbthreshold * 2
  let abmode = null
  let buffer = null

  const masks = ["", ""]

  function matrix(vfb) {

    
    let startx = 1
    let starty = 1

    function gatheratpoint(x,y,offsety,collection) {
      function xpass(pxi, pti) {
        let booksr = 0
        for (let i=pxi;i<pti;i++) {
          let offset = ((startx+i)*4) + (starty*(canvaswidth*4))
          let xy = (((y+offsety)*datacolumns)*cellsizerow) + x
          let w = xy*4*cellsizecol
          booksr += vfb[w+offset]
        }
        return booksr
      }
      let booksr
      let booksum
      // average both left right
      if (collection === 1) {
        booksr = xpass(0,2)
        booksum = booksr < blackwhitergbthresholdtwo
      }
      // left only
      else if (collection === 2) {
        booksr = xpass(1,2)
        booksum = booksr < blackwhitergbthreshold
      }
      // right only
      else if (collection === 3) {
        booksr = xpass(0,1)
        booksum = booksr < blackwhitergbthreshold
      }
      if (booksum) {
        return 1
      }
      else {
        return 0
      }
    }
    let failure = false
    if (!validheader) {
      let sizefound = false
      let k=0
      for (let i=0;i<300;i+=4) {
        let rgb = vfb[i+0]
        if (rgb > blackwhitergbthreshold) {
          cellsizecol = k
          sizefound = true
          break
        }
        k++
      }
      if (!sizefound || cellsizecol === 0) {
        failure = true
      }
      if (!failure) {
        let dupesize = 0
        for (let i=cellsizecol*4;i<cellsizecol*4*2+100;i+=4) {
          let rgb = vfb[i+0]
          if (rgb < blackwhitergbthreshold) {
            dupesize = ((i/4)-cellsizecol)
            break
          }
        }
        if (dupesize !== cellsizecol) {
          cellsizecol = 0
          failure = true
        }
      }
      if (!failure) {
        let gatherheaders = [
          [4, "version"],          
          [4, "mediatype"],            
          [16, "fid"],              
          [24, "lastframebytes"],              
          [1, "lastframebit"],              
          [1, "protectedbit"]
        ]
        let qsum = 3
        for (let q=0;q<gatherheaders.length;q++) {
          let group = gatherheaders[q]
          let spaces = group[0]
          let type = group[1]
          let gath = ""
          let midway = Math.ceil(4/2) - 1
          for (let i=0;i<spaces;i++) {
            let start = qsum * cellsizecol * 4
            let cell = (start + (i*cellsizecol*4)) + (midway*4)
            gath += vfb[cell] > blackwhitergbthreshold ? 0 : 1
            vparams[type] = parseInt(gath, 2)
          }
          qsum += spaces
        }
      }
      if (!failure) {
        fps = mediatypes[vparams.mediatype].fps
        bitspace = mediatypes[vparams.mediatype].bitspace
        oldbitspace = bitspace
        reedsolomonbytes = mediatypes[vparams.mediatype].reedsolomonbytes
        canvaswidth = mediatypes[vparams.mediatype].canvaswidth
        canvasheight = mediatypes[vparams.mediatype].canvasheight
        cellsizerow = mediatypes[vparams.mediatype].cellsizerow
        datacolumns = mediatypes[vparams.mediatype].datacolumns
        datarows = mediatypes[vparams.mediatype].datarows
        matrixsize = datacolumns * datarows
        startx = Math.ceil(cellsizecol/2) - 1
        starty = Math.ceil(cellsizerow/2) - 1  
        realbytesend = (bitspace) / 8
        if (usablebuffer === null) {
          usablebuffer = new Uint8ClampedArray(realbytesend)
        }
        let sumrowfull = Math.floor(bitspace / datacolumns) + 4
        for (let i=0;i<sumrowfull;i++) {
          for (let j=0;j<datacolumns;j+=4) {
            let c = (j) % 2
            masks[0] += c ? "11" : "00"
            masks[0] += "11"
            masks[1] += c ? "00" : "11"
            masks[1] += "00"
          }
        }
        masks[0] = masks[0].slice(0,bitspace)
        masks[1] = masks[1].slice(0,bitspace)
      }
      if (!failure) {
        validheader = true  
      }
    }
    if (failure) {
      return null
    }
    var ofd = datacolumns - 4
    var ofdstatus = gatheratpoint(ofd,0,0,1)
    if (ofdstatus === 0) {
      return null
    }
    var ofv = datacolumns - 2
    var ofvstatus = gatheratpoint(ofv,0,0,1)
    if (!abeverfound) {
      abeverfound = true
    }
    else {
      if (abmode === ofvstatus) {
        return null
      }
    }
    abmode = ofvstatus
    let ubxl = usablebuffer.length
    var lastframebitstatus = gatheratpoint(50,0,0,1)
    if (lastframebitstatus == 1) {
      let realbitspace = ""
      for (let i=0;i<24;i++) {
        realbitspace += gatheratpoint(i+26,0,0,1)
      }
      realbitspace = parseInt(realbitspace,2)
      if (realbitspace <= bitspace) {
        bitspace = realbitspace
      }
      ubxl = bitspace/8
    }
    
    function scandatamatrix(strength) {
      let bitstream = ""
      let v = 0
      for (let y=0;y<datarows;y++) {
        for (let x=0;x<datacolumns;x++) {
          let status = gatheratpoint(x,y,1,strength)
          bitstream += status
          if (v >= bitspace) {
            break
          }
          v++
        }
        if (v >= bitspace) {
          break
        }
      }
      let realbitstream = ""
      let abspec = abmode ? 1 : 0
      for (let i=0;i<bitstream.length;i++) {
        realbitstream += bitstream[i] ^ masks[abspec][i]
      }
      let k = 0
      let target = realbitstream.length / 8
      for (let i=0;i<target;i++) {
        let by = ""
        for (let j=0;j<8;j++) {
          by += realbitstream[k]
          k++
        }
        usablebuffer[i] = parseInt(by,2)
      }
      let array = []
      for (let i=0;i<ubxl;i++) {
        array.push(usablebuffer[i])
      }
      return array
    }
    let something
    let found = false
    var rs = new ReedSolomon(reedsolomonbytes)
    for (let i=1;i<4;i++) {
      if (found) {
        break
      }
      try {
        let array = scandatamatrix(i)
        something = rs.decode(array)
        found = true
        break
      }
      catch(e) {

      }
    }
    if (!found) {
      return null
    }
    if (!responsearray || lastframebitstatus == 1) {
      responsearray = new Uint8Array(something.length)
    }
    for (let i=0;i<something.length;i++) {
      responsearray[i] = something[i].charCodeAt()
    }
    if (lastframebitstatus == 1) {
      bitspace = oldbitspace
      ubxl = bitspace/8
      lastframebitstatus = 0
    }
    return responsearray
  }
  return matrix
}

module.exports = matrixread