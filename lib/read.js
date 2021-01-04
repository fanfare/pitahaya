let ReedSolomon = require('./reedsolomon.js')
let {decbin, readint} = require('./tools.js')
const aesjs = require('./aes.js')
const crypto = require('crypto')

const mediatypes = [
  // media type 0 - 128kbps mp3
  {
    cellsizerow:              3,   
    canvaswidth:              640,   
    canvasheight:             360,  
    datacolumns:              160,    
    datarows:                 119,         
    bitspace:                 19040,      
    reedsolomonbytes:         38,
    bitlockreedsolomonbytes:  34,
    bitlockbitspace:          19008,
    bitlockrealmaxbytes:      2000
  },
  // media type 1 - raw pcm
  {
    cellsizerow:              3,
    canvaswidth:              1920,
    canvasheight:             1080,
    datacolumns:              480,
    datarows:                 359,
    bitspace:                 171360,      
    reedsolomonbytes:         45,
    bitlockreedsolomonbytes:  45,
    bitlockbitspace:          171944,
    bitlockrealmaxbytes:      17640
  },
  // media type 2 - realtime avc
  {
    cellsizerow:              2,   
    canvaswidth:              640,   
    canvasheight:             360,  
    datacolumns:              320,    
    datarows:                 179,         
    bitspace:                 57120,      
    reedsolomonbytes:         44,
    bitlockreedsolomonbytes:  42,
    bitlockbitspace:          56928,
    bitlockrealmaxbytes:      5908
  }
]

const matrixread = function(options) {
  
  let salt = null
  let key = null
  let phrase = null

  function keyset() {
    if (!phrase) {
      console.error("error: phrase required.. exiting")
      process.exit()
      return null
    }
    key = crypto.pbkdf2Sync(phrase, salt, 100000, 16, 'sha256')
    console.error(key, "key")
  }

  if (options) {
    phrase = options
  }

  const vparams = {
    version: "",
    mediatype: "",
    fid: "",
    lastframebytes: "",
    lastframebit: "",
    protectedbit: ""
  }

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
  let bitlockrealmaxbytes = 0
  let cellsizerow = 0
  let realbytesend = 0
  let protectedbit = 0
  let matrixsize = 0
  let blackwhitergbthreshold = 127
  let blackwhitergbthresholdtwo = blackwhitergbthreshold * 2
  let blackwhitergbthresholdfour = blackwhitergbthreshold * 4
  let abmode = null
  let buffer = null
  let startx = 1
  let starty = 1  

  const masks = ["", ""]

  function matrix(vfb) {
    function gatheratpoint(x,y,offsety,collection) {
      function xpass(pxi, pti, npj) {
        let booksr = 0
        for (let i=pxi;i<pti;i++) {
          for (let j=0;j<npj;j++) {
            let offset = ((startx+i)*4) + (starty*(canvaswidth*4))           
            let xy = (((y+offsety)*datacolumns)*cellsizerow) + x
            let w = (xy*4*cellsizecol) + (canvaswidth * 4 * j)
            booksr += vfb[w+offset]
          }
        }
        return booksr
      }  
      let booksr
      let booksum
      if (vparams.mediatype === 2) {
        booksr = xpass(0,2,2)
        booksum = booksr < blackwhitergbthresholdfour    
      }
      else if (collection === 1) {
        booksr = xpass(0,2,1)
        booksum = booksr < blackwhitergbthresholdtwo
      }
      else if (collection === 2) {
        booksr = xpass(1,2,1)
        booksum = booksr < blackwhitergbthreshold
      }
      else if (collection === 3) {
        booksr = xpass(0,1,1)
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
        protectedbit = vparams.protectedbit
        bitspace = mediatypes[vparams.mediatype].bitspace
        if (protectedbit) {
          bitspace = mediatypes[vparams.mediatype].bitlockbitspace
        }
        oldbitspace = bitspace
        reedsolomonbytes = mediatypes[vparams.mediatype].reedsolomonbytes
        if (protectedbit) {
          reedsolomonbytes = mediatypes[vparams.mediatype].bitlockreedsolomonbytes
        }
        canvaswidth = mediatypes[vparams.mediatype].canvaswidth
        canvasheight = mediatypes[vparams.mediatype].canvasheight
        cellsizerow = mediatypes[vparams.mediatype].cellsizerow
        datacolumns = mediatypes[vparams.mediatype].datacolumns
        datarows = mediatypes[vparams.mediatype].datarows
        bitlockrealmaxbytes = mediatypes[vparams.mediatype].bitlockrealmaxbytes
        matrixsize = datacolumns * datarows
        startx = Math.ceil(cellsizecol/2) - 1
        starty = Math.ceil(cellsizerow/2) - 1  
        realbytesend = (bitspace) / 8
        if (usablebuffer === null) {
          usablebuffer = Buffer.alloc(realbytesend)
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
    var lastframebitstatus = gatheratpoint(51,0,0,1)
    if (lastframebitstatus == 1) {
      let realbitspace = ""
      for (let i=0;i<24;i++) {
        realbitspace += gatheratpoint(i+27,0,0,1)
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
    let gtnjtarget = vparams.mediatype === 2 ? 2 : 4
    
    for (let i=1;i<gtnjtarget;i++) {
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
    responsearray = Buffer.alloc(something.length)
    
    for (let i=0;i<something.length;i++) {
      responsearray[i] = something[i].charCodeAt()
    }
    if (lastframebitstatus == 1) {
      bitspace = oldbitspace
      ubxl = bitspace/8
      lastframebitstatus = 0
    }
    if (protectedbit) {
      if (!key) {
        salt = responsearray.slice(0,4)
        keyset()
      }
      let iv = responsearray.slice(4,20)
      let data = responsearray.slice(20,responsearray.length)
      const aescbc = new aesjs.ModeOfOperation.cbc(key, iv)
      let gphx = Array.from(aescbc.decrypt(data))
      let realsize = gphx.splice(0,4)
      realsize = readint(realsize)
      if (realsize > bitlockrealmaxbytes || realsize < 0) {
        console.error("error: aes failed.. exiting")
        process.exit()
        return null
      }
      gphx = gphx.splice(0,realsize)
      responsearray = Buffer.from(gphx)
    }
    if (responsearray.length > 0) {
      return {
        mediatype: vparams.mediatype,
        data: responsearray
      }
    }
  }
  return matrix
}

module.exports = matrixread