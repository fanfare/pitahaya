;
var optical = (function() {

  function encapsulatemp3insidemp4() {
    
    // firefox mediasource extensions support
    // encapsulate cbr 128 kbps mp3 inside audio/mp4 
    // LNT http://jollo.org

    const encapsulation = (function() {
      function bumpsum(prev, pad, inc) {
        let hex = prev
        hex = "0x" + hex
        hex = parseInt(hex,16)
        hex = hex + inc
        hex = hex.toString(16)
        return pad.substring(0, pad.length - hex.length) + hex
      }
      const header = [
        0x00, 0x00, 0x00, 0x20, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 
        0x6F, 0x6D, 0x00, 0x00, 0x02, 0x00, 0x69, 0x73, 0x6F, 0x6D, 
        0x69, 0x73, 0x6F, 0x36, 0x69, 0x73, 0x6F, 0x32, 0x6D, 0x70, 
        0x34, 0x31, 0x00, 0x00, 0x02, 0x9F, 0x6D, 0x6F, 0x6F, 0x76, 
        0x00, 0x00, 0x00, 0x6C, 0x6D, 0x76, 0x68, 0x64, 0x00, 0x00, 
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
        0x00, 0x00, 0x03, 0xE8, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 
        0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
        0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
        0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, 
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0x00, 0x00, 
        0x01, 0xA1, 0x74, 0x72, 0x61, 0x6B, 0x00, 0x00, 0x00, 0x5C, 
        0x74, 0x6B, 0x68, 0x64, 0x00, 0x00, 0x00, 0x03, 0x00, 0x00, 
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 
        0x01, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
        0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, 
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
        0x01, 0x3D, 0x6D, 0x64, 0x69, 0x61, 0x00, 0x00, 0x00, 0x20, 
        0x6D, 0x64, 0x68, 0x64, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xAC, 0x44, 
        0x00, 0x00, 0x00, 0x00, 0x55, 0xC4, 0x00, 0x00, 0x00, 0x00, 
        0x00, 0x2D, 0x68, 0x64, 0x6C, 0x72, 0x00, 0x00, 0x00, 0x00, 
        0x00, 0x00, 0x00, 0x00, 0x73, 0x6F, 0x75, 0x6E, 0x00, 0x00, 
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
        0x53, 0x6F, 0x75, 0x6E, 0x64, 0x48, 0x61, 0x6E, 0x64, 0x6C, 
        0x65, 0x72, 0x00, 0x00, 0x00, 0x00, 0xE8, 0x6D, 0x69, 0x6E, 
        0x66, 0x00, 0x00, 0x00, 0x10, 0x73, 0x6D, 0x68, 0x64, 0x00, 
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
        0x24, 0x64, 0x69, 0x6E, 0x66, 0x00, 0x00, 0x00, 0x1C, 0x64, 
        0x72, 0x65, 0x66, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
        0x01, 0x00, 0x00, 0x00, 0x0C, 0x75, 0x72, 0x6C, 0x20, 0x00, 
        0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0xAC, 0x73, 0x74, 0x62, 
        0x6C, 0x00, 0x00, 0x00, 0x60, 0x73, 0x74, 0x73, 0x64, 0x00, 
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 
        0x50, 0x6D, 0x70, 0x34, 0x61, 0x00, 0x00, 0x00, 0x00, 0x00, 
        0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
        0x00, 0x00, 0x02, 0x00, 0x10, 0x00, 0x00, 0x00, 0x00, 0xAC, 
        0x44, 0x00, 0x00, 0x00, 0x00, 0x00, 0x2C, 0x65, 0x73, 0x64, 
        0x73, 0x00, 0x00, 0x00, 0x00, 0x03, 0x80, 0x80, 0x80, 0x1B, 
        0x00, 0x01, 0x00, 0x04, 0x80, 0x80, 0x80, 0x0D, 0x6B, 0x15, 
        0x00, 0x00, 0x00, 0x00, 0x01, 0xF4, 0x00, 0x00, 0x00, 0x00, 
        0x00, 0x06, 0x80, 0x80, 0x80, 0x01, 0x02, 0x00, 0x00, 0x00, 
        0x10, 0x73, 0x74, 0x74, 0x73, 0x00, 0x00, 0x00, 0x00, 0x00, 
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x10, 0x73, 0x74, 0x73, 
        0x63, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
        0x00, 0x00, 0x14, 0x73, 0x74, 0x73, 0x7A, 0x00, 0x00, 0x00, 
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
        0x00, 0x00, 0x10, 0x73, 0x74, 0x63, 0x6F, 0x00, 0x00, 0x00, 
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x28, 0x6D, 
        0x76, 0x65, 0x78, 0x00, 0x00, 0x00, 0x20, 0x74, 0x72, 0x65, 
        0x78, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 
        0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x62, 0x75, 
        0x64, 0x74, 0x61, 0x00, 0x00, 0x00, 0x5A, 0x6D, 0x65, 0x74, 
        0x61, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x21, 0x68, 
        0x64, 0x6C, 0x72, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
        0x00, 0x6D, 0x64, 0x69, 0x72, 0x61, 0x70, 0x70, 0x6C, 0x00, 
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
        0x00, 0x2D, 0x69, 0x6C, 0x73, 0x74, 0x00, 0x00, 0x00, 0x25, 
        0xA9, 0x74, 0x6F, 0x6F, 0x00, 0x00, 0x00, 0x1D, 0x64, 0x61, 
        0x74, 0x61, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 
        0x4C, 0x61, 0x76, 0x66, 0x35, 0x38, 0x2E, 0x34, 0x38, 0x2E, 
        0x31, 0x30, 0x30
      ]

      let s = []

      let sendheader = true
      let granularever = false
      let granularpad = "000000000000"
      let framepad = "00000000"

      let sums = {
        frame: "1",
        granular: "0"
      }

      const tick = function(begseg, midseg, endseg) {
        let info = [
          0x00, 0x00, 0x01, 0x00, 0x6D, 0x6F, 0x6F, 0x66, 0x00, 0x00,
          0x00, 0x10, 0x6D, 0x66, 0x68, 0x64, 0x00, 0x00, 0x00, 0x00,
          0x00, 0x00, 0x00, 0x02, 0x00, 0x00, 0x00, 0xE8, 0x74, 0x72,
          0x61, 0x66, 0x00, 0x00, 0x00, 0x1C, 0x74, 0x66, 0x68, 0x64,
          0x00, 0x00, 0x00, 0x38, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00,
          0x04, 0x80, 0x00, 0x00, 0x01, 0xA2, 0x02, 0x00, 0x00, 0x00,
          0x00, 0x00, 0x00, 0x14, 0x74, 0x66, 0x64, 0x74, 0x01, 0x00,
          0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xAF, 0x80,
          0x00, 0x00, 0x00, 0xB0, 0x74, 0x72, 0x75, 0x6E, 0x00, 0x00,
          0x02, 0x01, 0x00, 0x00, 0x00, 0x27, 0x00, 0x00, 0x01, 0x08,
          0x00, 0x00, 0x01, 0xA2, 0x00, 0x00, 0x01, 0xA2, 0x00, 0x00,
          0x01, 0xA2, 0x00, 0x00, 0x01, 0xA2, 0x00, 0x00, 0x01, 0xA2,
          0x00, 0x00, 0x01, 0xA2, 0x00, 0x00, 0x01, 0xA2, 0x00, 0x00,
          0x01, 0xA2, 0x00, 0x00, 0x01, 0xA2, 0x00, 0x00, 0x01, 0xA2,
          0x00, 0x00, 0x01, 0xA1, 0x00, 0x00, 0x01, 0xA2, 0x00, 0x00,
          0x01, 0xA2, 0x00, 0x00, 0x01, 0xA2, 0x00, 0x00, 0x01, 0xA2,
          0x00, 0x00, 0x01, 0xA2, 0x00, 0x00, 0x01, 0xA2, 0x00, 0x00,
          0x01, 0xA2, 0x00, 0x00, 0x01, 0xA2, 0x00, 0x00, 0x01, 0xA2,
          0x00, 0x00, 0x01, 0xA2, 0x00, 0x00, 0x01, 0xA2, 0x00, 0x00,
          0x01, 0xA2, 0x00, 0x00, 0x01, 0xA2, 0x00, 0x00, 0x01, 0xA2,
          0x00, 0x00, 0x01, 0xA2, 0x00, 0x00, 0x01, 0xA2, 0x00, 0x00,
          0x01, 0xA2, 0x00, 0x00, 0x01, 0xA2, 0x00, 0x00, 0x01, 0xA2,
          0x00, 0x00, 0x01, 0xA2, 0x00, 0x00, 0x01, 0xA2, 0x00, 0x00,
          0x01, 0xA2, 0x00, 0x00, 0x01, 0xA2, 0x00, 0x00, 0x01, 0xA2,
          0x00, 0x00, 0x01, 0xA1, 0x00, 0x00, 0x01, 0xA2, 0x00, 0x00,
          0x01, 0xA2, 0x00, 0x00, 0x01, 0xA2, 0x00, 0x00, 0x3F, 0xB4,
          0x6D, 0x64, 0x61, 0x74                                     
        ]
        let pxframe = ""
        let pxgranular = ""

        if (!granularever) {
          granularever = true
          pxframe = "00000001",
          pxgranular = "000000000000"
        }
        else {
          var granularbump = bumpsum(sums.granular, granularpad, 44928)
          var framebump = bumpsum(sums.frame, framepad, 1)
          var granularusable = granularbump
          var frameusable = framebump
          sums["granular"] = granularbump
          sums["frame"] = framebump
          pxframe = frameusable,
          pxgranular = granularusable
        }
        for (let i=0,f=20;i<8;i+=2,f++) {
          let sub = pxframe.slice(i,i+2)
          info[f] = parseInt("0x"+sub, "hex")
        }
        info[55] = begseg
        for (let i=0,f=74;i<12;i+=2,f++) {
          let sub = pxgranular.slice(i,i+2)
          info[f] = parseInt("0x"+sub, "hex")
        }
        for (let i=0,f=103;i<midseg.length;i++,f++) {
          info[f] = midseg[i]
        }
        info[259] = endseg 
        return info
      }

      let segments = []
      let pattern = ""
      let sync = false
      let segment = ""
      
      const interlace = function(mp3bytearray) {

        s.push(...mp3bytearray)
        if (s.length < 2500) {
          return null
        }
        let seekable = true
        while (seekable) {
          for (let i=0;i<s.length-900;i++) {
            if (s[i] !== 0xFF || s[i+1] !== 0xFB 
            || (s[i+2] !== 0x92 && s[i+2] !== 0x90)) {
              continue
            }
            let es = s[i+2] === 0x92 ? 418 : 417
            if (s[i+es] !== 0xFF || s[i+es+1] !== 0xFB
            || (s[i+es+2] !== 0x92 && s[i+es+2] !== 0x90)) {
              continue
            }
            let ys = s[i+es+2] === 0x92 ? 418 : 417
            if (s[i+es+ys] !== 0xFF || s[i+es+ys+1] !== 0xFB
            || (s[i+es+ys+2] !== 0x92 && s[i+es+ys+2] !== 0x90)) {
              continue
            }
            sync = true
            pattern += s[i+2] === 0x92 ? "-" : "x"
            s.splice(0,i)
            segment = s.splice(0,es)
            segments.push(...segment)
            break
          }
          if (!sync) {
            s.splice(0,s.length-900)
          }
          if (pattern.length > 38 || s.length < 900) {
            seekable = false
          }
        }
        if (pattern.length > 38) {
          let midseg = []
          for (let j=0;j<pattern.length;j++) {
            if (pattern[j] === "x") {
              midseg.push(...[161,0,0,1])
            }
            else {
              midseg.push(...[162,0,0,1])
            }
          }
          midseg.pop()
          let begseg = pattern.substring(0,1) === "x" ? 0xA1 : 0xA2
          let endseg = 182 - (pattern.replace(/\-/g, "")).length
          let response = []
          if (sendheader) {
            sendheader = false
            response.push(...header)
          }
          let box = tick(begseg, midseg, endseg)
          response.push(...box)
          response.push(...segments)
          sync = false
          pattern = ""
          segments = []
          segment = ""
          return response
        }
        else {
          return null
        }
      }
      return {
        interlace
      }
    })();

    self.onmessage = function (event) {
      let audiofragment = event.data
      let mpeg = encapsulation.interlace(audiofragment)
      if (mpeg) {
        mpeg = Uint8Array.from(mpeg)
        postMessage(mpeg)
      }
    }
  }

  let enstr = encapsulatemp3insidemp4.toString()
  enstr = enstr.substring(enstr.indexOf("{")+1, enstr.lastIndexOf("}"))

  function opticalvideoframedecodercontent() {
  
    
    // reed solomon encode/decode (https://github.com/louismullie/erc-js)
    !function(){var t=!1,n=/xyz/.test(function(){xyz})?/\b_super\b/:/.*/;this.Class=function(){},Class.extend=function(i){var r=this.prototype;t=!0;var e=new this;for(var s in t=!1,i)e[s]="function"==typeof i[s]&&"function"==typeof r[s]&&n.test(i[s])?function(t,n){return function(){var i=this._super;this._super=r[t];var e=n.apply(this,arguments);return this._super=i,e}}(s,i[s]):i[s];function o(){!t&&this.init&&this.init.apply(this,arguments)}return o.prototype=e,o.prototype.constructor=o,o.extend=arguments.callee,o}}();var ReedSolomon=Class.extend({init:function(t){this.nSym=t||10,this.codec=new ReedSolomon.Codec},encode:function(t){for(var o=ReedSolomon.Utils.unpack(t),r=255-this.nSym,e=[],n=0;n<o.length;n+=r){var l=o.slice(n,n+r);e=e.concat(this.codec.encodeMsg(l,this.nSym))}return e},decode:function(t){for(var o=[],r=0;r<t.length;r+=255){var e=t.slice(r,r+255);o=o.concat(this.codec.correctMsg(e,this.nSym))}return ReedSolomon.Utils.pack(o)}});ReedSolomon.Utils={pack:function(t){for(var o=[],r=0,e=t.length;r<e;r++)o.push(String.fromCharCode(t[r]));return o.join("")},unpack:function(t){for(var o=[],r=0,e=t.length;r<e;r++)o.push(t.charCodeAt(r));return o},arrayFill:function(t,o){return Array.apply(null,new Array(t)).map(function(){return o})},sliceStep:function(t,o,r,e){for(var n=Array.prototype.slice.call(t,o,r),l=[],i=n.length-1;i>=0;i--)i%e==0&&l.push(n[i]);return l.reverse(),n=l}},ReedSolomon.GaloisField=Class.extend({gfExp:ReedSolomon.Utils.arrayFill(512,1),gfLog:ReedSolomon.Utils.arrayFill(256,0),init:function(){for(var t=1,o=1;o<255;o++)256&(t<<=1)&&(t^=285),this.gfExp[o]=t,this.gfLog[t]=o;for(o=255;o<512;o++)this.gfExp[o]=this.gfExp[o-255]},mul:function(t,o){return 0==t||0==o?0:this.gfExp[this.gfLog[t]+this.gfLog[o]]},div:function(t,o){if(0==o)throw"Division by zero.";return 0==t?0:this.gfExp[this.gfLog[t]+255-this.gfLog[o]]},polyScale:function(t,o){for(var r=[],e=0;e<t.length;e++)r.push(this.mul(t[e],o));return r},polyAdd:function(t,o){for(var r=t.length,e=o.length,n=Math.max(r,e),l=ReedSolomon.Utils.arrayFill(n,0),i=l.length,h=0;h<r;h++)l[h+i-r]=t[h];for(h=0;h<e;h++)l[h+i-e]^=o[h];return l},polyMul:function(t,o){for(var r=ReedSolomon.Utils.arrayFill(t.length+o.length-1,0),e=0;e<o.length;e++)for(var n=0;n<t.length;n++)r[n+e]^=this.mul(t[n],o[e]);return r},polyEval:function(t,o){for(var r=t[0],e=1;e<t.length;e++)r=this.mul(r,o)^t[e];return r}}),ReedSolomon.Codec=Class.extend({init:function(){this.gf=new ReedSolomon.GaloisField},generatorPoly:function(t){for(var o=[1],r=0;r<t;r++)o=this.gf.polyMul(o,[1,this.gf.gfExp[r]]);return o},encodeMsg:function(t,o){if(t.length+o>255)throw"Message too long.";for(var r=this.generatorPoly(o),e=ReedSolomon.Utils.arrayFill(t.length+o,0),n=0;n<t.length;n++)e[n]=t[n];for(n=0;n<t.length;n++){var l=e[n];if(0!=l)for(var i=0;i<r.length;i++)e[n+i]^=this.gf.mul(r[i],l)}for(n=0;n<t.length;n++)e[n]=t[n];return e},calcSyndromes:function(t,o){for(var r=[],e=0;e<o;e++)r.push(this.gf.polyEval(t,this.gf.gfExp[e]));return r},correctErrata:function(t,o,r){for(var e=[1],n=0;n<r.length;n++){var l=this.gf.gfExp[t.length-1-r[n]];e=this.gf.polyMul(e,[l,1])}var i=o.slice(0,r.length);i.reverse(),i=(i=this.gf.polyMul(i,e)).slice(i.length-r.length,i.length),e=ReedSolomon.Utils.sliceStep(e,1&e.length,e.length,2);for(n=0;n<r.length;n++){l=this.gf.gfExp[r[n]+256-t.length];var h=this.gf.polyEval(i,l),s=this.gf.polyEval(e,this.gf.mul(l,l));t[r[n]]^=this.gf.div(h,this.gf.mul(l,s))}return t},rsFindErrors:function(t,o){for(var r,e=[1],n=[1],l=0;l<t.length;l++){n.push(0);for(var i=t[l],h=1;h<e.length;h++)i^=this.gf.mul(e[e.length-1-h],t[l-h]);0!=i&&(n.length>e.length&&(r=this.gf.polyScale(n,i),n=this.gf.polyScale(e,this.gf.div(1,i)),e=r),e=this.gf.polyAdd(e,this.gf.polyScale(n,i)))}var s=e.length-1;if(2*s>t.length)throw"Too many errors to correct";var g=[];for(l=0;l<o;l++)0==this.gf.polyEval(e,this.gf.gfExp[255-l])&&g.push(o-1-l);return g.length!=s?null:g},forneySyndromes:function(t,o,r){for(var e=t.slice(0),n=0;n<o.length;n++){for(var l=this.gf.gfExp[r-1-o[n]],i=0;i<e.length-1;i++)e[i]=this.gf.mul(e[i],l)^e[i+1];e.pop()}return e},correctMsg:function(t,o){if(t.length>255)throw"Message too long";for(var r=t.slice(0),e=[],n=0;n<r.length;n++)r[n]<0&&(r[n]=0,e.push(n));if(e.length>o)throw"Too many erasures to correct";var l=this.calcSyndromes(r,o);if(0==Math.max.apply(null,l))return r.slice(0,r.length-o);var i=this.forneySyndromes(l,e,r.length),h=this.rsFindErrors(i,r.length);if(null==h)throw"Could not locate error";if(r=this.correctErrata(r,l,e.concat(h)),l=this.calcSyndromes(r,o),Math.max.apply(null,l)>0)throw"Could not correct message";return r.slice(0,-o)}});

    let phrase = null

    function decbin(dec,length) {
      var out = ""
      while (length--) {
        out += (dec >> length ) & 1
      }
      return out
    }

    function hexToBytes(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
      bytes.push(parseInt(hex.substr(c, 2), 16))
      return bytes
    }
    
    const mediatypes = {
      // mp3
      0: {
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
      // avc
      2: {
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
    }

    const vparams = {
      version: "",
      mediatype: "",
      fid: "",
      lastframebytes: "",
      lastframebit: "",
      protectedbit: ""
    }

    let cryptokey = null
    let reedsolomonbytes = 0
    let abeverfound = false
    let validheader = false
    let usablebuffer = null
    let canvaswidth = 0
    let canvasheight = 0
    let bitspace = 0
    let oldbitspace = 0
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

    async function matrix(vfb) {
      
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
          if (booksr > 450 && booksr < 600) {
            // console.error("middle debug", booksr, x, y)
          }
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
          if (vparams.mediatype != 0 && vparams.mediatype != 2) {
            failure = true
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
        postMessage({
          type: "invalid",
          data: null
        })
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
          // console.error("decode fail")
        }
      }
      if (!found) {
        return null
      }
      let responsearray = new Uint8Array(something.length)
      for (let i=0;i<something.length;i++) {
        responsearray[i] = something[i].charCodeAt()
      }
      if (lastframebitstatus == 1) {
        bitspace = oldbitspace
        ubxl = bitspace/8
        lastframebitstatus = 0
      }
      
      function readint(arr) {
        var value = 0
        for (var i = 0; i < arr.length; i++) {
          value = (value * 256) + arr[i]
        }
        return value
      }      
      async function gathercryptokey(salt, phrase) {
        if (!phrase) {
          postMessage({
            type: "req",
            data: null
          })
          return null
        }
        var enc = new TextEncoder()
        var xmaterial = await crypto.subtle.importKey(
          "raw", 
          enc.encode(phrase), 
          {
            name: "PBKDF2"
          }, 
          false, [
            "deriveBits", 
            "deriveKey"
          ]
        )
        var key = await crypto.subtle.deriveKey({
            "name": "PBKDF2",
            "salt": salt, 
            "iterations": 100000,
            "hash": "SHA-256"
          },
          xmaterial, { 
            "name": "AES-CBC", 
            "length": 128
          },
          false, [
            "decrypt"
          ]
        )
        return key
      }      
      let encfx = false
      if (protectedbit) {
        encfx = true
        if (!cryptokey) {
          let salt = responsearray.slice(0,4)
          let xsalt = new Uint8Array(salt)
          let xphrase = phrase
          cryptokey = await gathercryptokey(xsalt, xphrase)
        }
        let iv = responsearray.slice(4,20).buffer
        let data = responsearray.slice(20,responsearray.length).buffer
        let gphx = await crypto.subtle.decrypt(
          {
            name: "AES-CBC",
            iv
          },
          cryptokey,
          data
        )        
        gphx = Array.from(new Uint8Array(gphx))
        let realsize = gphx.splice(0,4)
        realsize = readint(realsize)
        if (realsize > bitlockrealmaxbytes || realsize < 0) {
          postMessage({
            type: "fail",
            data: null
          })
          return null
        }
        gphx = gphx.splice(0,realsize)
        responsearray = new Uint8Array(gphx)
      }
      return [responsearray, vparams, encfx]
    }
    self.onmessage = async function (event) {
      switch(event.data.type) {
        case "bitmap": {
          let arrayn = await matrix(event.data.data)
          if (arrayn) {
            postMessage({
              type: "buffer",
              data: arrayn
            })
          }        
          break
        }
        case "phrase": {
          phrase = event.data.data
          break
        }
      }
    }
  }

  let ovfdstr = opticalvideoframedecodercontent.toString()
  ovfdstr = ovfdstr.substring(ovfdstr.indexOf("{")+1, ovfdstr.lastIndexOf("}"))
  
  let updatestats = false
  let starttoggle = false

  Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function(){
      return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2)
    }
  })  
  if (typeof(Worker) === "undefined") {
    alert("browser does not support webworkers")
    return null
  }
  if (!'MediaSource' in window) {
    alert("browser does not support the mediasource property")
    return null
  }  
  
  var secinv = document.querySelector('#secondary-inner')
  if (secinv) {
    secinv.remove()
  }
  var commentsv = document.querySelector('#comments')
  if (commentsv) {
    commentsv.remove()
  }
  
  document.body.insertAdjacentHTML(`afterbegin`, `<style>#pitahayax video{outline:none!important} #pitahayax {z-index:9999999999;width:460px;height:40px;position:fixed;top:0;left:0; background-image:url('data:image/png;base64,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');box-sizing:border-box;}#attxdisplay {pointer-events:none;height:12px;position:fixed;box-sizing:border-box;top:12px;left:40px;font-size:11px;width:135px;overflow:hidden;color:rgba(255,0,0,.75);text-transform:uppercase;font-family:Times New Roman;text-shadow:0 0 6px red, 0 0 3px red;letter-spacing:1.25px;font-weight:normal;cursor:default;user-select:none;}#attxinput {height:12px;position:fixed;box-sizing:border-box;top:12px;left:220px;width:50px;overflow:hidden;transform:scale(2,1);transform-origin:left center}#attxinput input {font-size:11px;position:absolute;top:0;left:0;outline:none!important;border:none;background:transparent;color:rgba(255,0,0,.75);padding:0;font-family:Times New Roman;text-shadow:0 0 6px red, 0 0 3px red;letter-spacing:1.25px;font-weight:normal;cursor:text;}#attxinput ::-moz-selection { /* Code for Firefox */background: maroon;}#attxinput ::selection {background: maroon;}::-webkit-input-placeholder {color:maroon;text-shadow:0 0 6px rgba(255,0,0,.4), 0 0 3px rgba(255,0,0,.4);} #pitahayax.enabled #attxinput{display:none} #attxvideo {display:none;background:black;position:fixed;padding:6px;top:60px;}#pitahayax.video #attxvideo {display:block;}#pitahayax.video #attxdisplay {width:135px;}#togglebutton {position:fixed;width:80px;height:20px;top:10px;left:350px;cursor:pointer;}</style><div id="pitahayax"><div id="attxdisplay" style="transform:scale(2,1);transform-origin:left center">PAUSED</div><div id="attxinput"><input id="attxinputinput" placeholder="X" type="password" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" style="width:50px"></input></div><div id="attxvideo"><video id="xvideo" width=400 height=225 controls class="xvideo" controls></video></div><audio id="xaudio" controls style="width:150px;height:30px;display:none"></audio><div id="togglebutton"></div></div>`)
  
  let video
  let mediaresource
  var videoframedecoder = null
  var clock = null
  var encapsulation = null
  let phrase
  
  var canvas = document.createElement('canvas')
  canvas.width = 640
  canvas.height = 360
  var ctx = canvas.getContext('2d')
  
  function passphrase() {
    var data = {
      type: "phrase",
      data: document.getElementById("attxinputinput").value
    }
    videoframedecoder.postMessage(data)  
  }
  let evertest = false
  function capturevideoframe() {
    ctx.drawImage(video, 0, 0)
    var bitmapdata
    if (!evertest) {
      evertest = true
      try {
        bitmapdata = ctx.getImageData(0, 0, 640, 360).data
      }
      catch(e) {
        attxdisplay.innerHTML = `CORS ERROR`
        stop()
        return null
      }
    }
    else {
      bitmapdata = ctx.getImageData(0, 0, 640, 360).data
    }
    var data = {
      type: "bitmap",
      data: bitmapdata
    }
    let offset = null
    videoframedecoder.postMessage(data)
  }
  
  let started = false
  let playing = false
  
  let framerate = 16
  
  let ftypmoov = new Uint8Array([
    
    // ftyp
    0x00, 0x00, 0x00, 0x1C, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6F, 0x35, 0x00, 0x00, 0x02, 0x00, 0x69, 0x73, 
    0x6F, 0x35, 0x69, 0x73, 0x6F, 0x36, 0x6D, 0x70, 0x34, 0x31, 
    
    // moov
    0x00, 0x00, 0x04, 0xB6, 0x6D, 0x6F, 0x6F, 0x76, 0x00, 0x00, 0x00, 0x6C, 0x6D, 0x76, 0x68, 0x64, 0x00, 0x00, 
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0xE8, 0x00, 0x00, 0x00, 0x00, 
    0x00, 0x01, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, 0x00, 0x00, 
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0x00, 0x00, 0x01, 0xED, 0x74, 0x72, 0x61, 0x6B, 0x00, 0x00, 
    0x00, 0x5C, 0x74, 0x6B, 0x68, 0x64, 0x00, 0x00, 0x00, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, 0x00, 0xC3, 0x8E, 0x39, 0x00, 0x6E, 0x00, 0x00, 
    0x00, 0x00, 0x01, 0x89, 0x6D, 0x64, 0x69, 0x61, 0x00, 0x00, 0x00, 0x20, 0x6D, 0x64, 0x68, 0x64, 0x00, 0x00, 
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x3C, 0x00, 0x00, 0x00, 0x00, 0x00, 
    0x55, 0xC4, 0x00, 0x00, 0x00, 0x00, 0x00, 0x2D, 0x68, 0x64, 0x6C, 0x72, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    0x00, 0x00, 0x76, 0x69, 0x64, 0x65, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    0x56, 0x69, 0x64, 0x65, 0x6F, 0x48, 0x61, 0x6E, 0x64, 0x6C, 0x65, 0x72, 0x00, 0x00, 0x00, 0x01, 0x34, 0x6D, 
    0x69, 0x6E, 0x66, 0x00, 0x00, 0x00, 0x14, 0x76, 0x6D, 0x68, 0x64, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x24, 0x64, 0x69, 0x6E, 0x66, 0x00, 0x00, 0x00, 0x1C, 0x64, 
    0x72, 0x65, 0x66, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x0C, 0x75, 0x72, 0x6C, 
    0x20, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0xF4, 0x73, 0x74, 0x62, 0x6C, 0x00, 0x00, 0x00, 0xA8, 0x73, 
    0x74, 0x73, 0x64, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x98, 0x61, 0x76, 0x63, 
    0x31, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xC4, 0x00, 0x6E, 0x00, 0x48, 0x00, 0x00, 0x00, 0x48, 0x00, 
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    0x00, 0x00, 0x00, 0x00, 0x18, 0xFF, 0xFF, 0x00, 0x00, 0x00, 0x32, 0x61, 0x76, 0x63, 0x43, 0x01, 0x4D, 0x40, 
    0x20, 0xFF, 0xE1, 0x00, 0x1B, 0x67, 0x4D, 0x40, 0x20, 0xD9, 0x03, 0x4F, 0xE7, 0xAF, 0xFC, 0x06, 0xE0, 0x06, 
    0xE4, 0x40, 0x00, 0x00, 0x03, 0x00, 0x40, 0x00, 0x00, 0x0F, 0x23, 0xC6, 0x0C, 0x92, 0x01, 0x00, 0x04, 0x68, 
    0xEB, 0xCC, 0xB2, 0x00, 0x00, 0x00, 0x10, 0x70, 0x61, 0x73, 0x70, 0x00, 0x00, 0x01, 0xB8, 0x00, 0x00, 0x01, 
    0xB9, 0x00, 0x00, 0x00, 0x10, 0x73, 0x74, 0x74, 0x73, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    0x00, 0x00, 0x10, 0x73, 0x74, 0x73, 0x63, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    0x14, 0x73, 0x74, 0x73, 0x7A, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    0x00, 0x00, 0x10, 0x73, 0x74, 0x63, 0x6F, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 
    0xAB, 0x74, 0x72, 0x61, 0x6B, 0x00, 0x00, 0x00, 0x5C, 0x74, 0x6B, 0x68, 0x64, 0x00, 0x00, 0x00, 0x03, 0x00, 
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x01, 0x00, 0x00, 0x00, 0x00, 
    0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x40, 0x00, 0x00, 0x00, 0x00, 
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x47, 0x6D, 0x64, 0x69, 0x61, 0x00, 0x00, 0x00, 
    0x20, 0x6D, 0x64, 0x68, 0x64, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    0x00, 0xAC, 0x44, 0x00, 0x00, 0x00, 0x00, 0x55, 0xC4, 0x00, 0x00, 0x00, 0x00, 0x00, 0x2D, 0x68, 0x64, 0x6C, 
    0x72, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x73, 0x6F, 0x75, 0x6E, 0x00, 0x00, 0x00, 0x00, 0x00, 
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x53, 0x6F, 0x75, 0x6E, 0x64, 0x48, 0x61, 0x6E, 0x64, 0x6C, 0x65, 
    0x72, 0x00, 0x00, 0x00, 0x00, 0xF2, 0x6D, 0x69, 0x6E, 0x66, 0x00, 0x00, 0x00, 0x10, 0x73, 0x6D, 0x68, 0x64, 
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x24, 0x64, 0x69, 0x6E, 0x66, 0x00, 0x00, 
    0x00, 0x1C, 0x64, 0x72, 0x65, 0x66, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x0C, 
    0x75, 0x72, 0x6C, 0x20, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0xB6, 0x73, 0x74, 0x62, 0x6C, 0x00, 0x00, 
    0x00, 0x6A, 0x73, 0x74, 0x73, 0x64, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x5A, 
    0x6D, 0x70, 0x34, 0x61, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 
    0x00, 0x00, 0x00, 0x02, 0x00, 0x10, 0x00, 0x00, 0x00, 0x00, 0xAC, 0x44, 0x00, 0x00, 0x00, 0x00, 0x00, 0x36, 
    0x65, 0x73, 0x64, 0x73, 0x00, 0x00, 0x00, 0x00, 0x03, 0x80, 0x80, 0x80, 0x25, 0x00, 0x02, 0x00, 0x04, 0x80, 
    0x80, 0x80, 0x17, 0x40, 0x15, 0x00, 0x00, 0x00, 0x00, 0x01, 0xB5, 0x80, 0x00, 0x00, 0x00, 0x00, 0x05, 0x80, 
    0x80, 0x80, 0x05, 0x12, 0x10, 0x56, 0xE5, 0x00, 0x06, 0x80, 0x80, 0x80, 0x01, 0x02, 0x00, 0x00, 0x00, 0x10, 
    0x73, 0x74, 0x74, 0x73, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x10, 0x73, 0x74, 
    0x73, 0x63, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x14, 0x73, 0x74, 0x73, 0x7A, 
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x10, 0x73, 0x74, 
    0x63, 0x6F, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x48, 0x6D, 0x76, 0x65, 0x78, 
    0x00, 0x00, 0x00, 0x20, 0x74, 0x72, 0x65, 0x78, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 
    0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x20, 
    0x74, 0x72, 0x65, 0x78, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x62, 0x75, 0x64, 0x74, 0x61, 
    0x00, 0x00, 0x00, 0x5A, 0x6D, 0x65, 0x74, 0x61, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x21, 0x68, 0x64, 
    0x6C, 0x72, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x6D, 0x64, 0x69, 0x72, 0x61, 0x70, 0x70, 0x6C, 
    0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x2D, 0x69, 0x6C, 0x73, 0x74, 0x00, 
    0x00, 0x00, 0x25, 0xA9, 0x74, 0x6F, 0x6F, 0x00, 0x00, 0x00, 0x1D, 0x64, 0x61, 0x74, 0x61, 0x00, 0x00, 0x00, 
    0x01, 0x00, 0x00, 0x00, 0x00, 0x4C, 0x61, 0x76, 0x66, 0x35, 0x38, 0x2E, 0x34, 0x38, 0x2E, 0x31, 0x30, 0x30
    
  ])  
  
  function start() {
    
    let everready = true
    if (started) {
      return null
    }
    video = document.querySelector("#movie_player > div.html5-video-container > video")
    if (!video) {
      video = document.querySelector('video:not(.xvideo)')
    }
    if (!video) {
      alert("no video player found on the page..")
      return null
    }
    let rvh = video.videoHeight
    let rvw = video.videoWidth
    
    if (rvh !== 360 || rvw !== 640) {
      alert("please set video resolution to 360p before starting..")
      return null
    }
    
    if (!video.playing) {
      video.play()
    }
    
    let firstrun = true
    started = true
    
    let blob = []
    var mediaSource
    var sourceBuffer
    
    let mediasourceready = false
    let mediasourcewaiting = true
    
    let mediatempqueue = []

    let firefox = false

    if (!MediaSource.isTypeSupported("audio/mpeg")) {
      firefox = true
    }    
    let pitahayax = document.getElementById('pitahayax')
    let attxdisplay = document.getElementById('attxdisplay')
    
    let encfx = false
    
    function deploymediasource(mediatype) {
      let resource
      attxdisplay.innerHTML = "BUFFERING"
      if (mediatype === "mp3") {
        resource = "#xaudio"
        if (firefox) {
          mime = 'audio/mp4; codecs="mp3"'
        }
        else {
          mime = "audio/mpeg"
        }
      }
      else if (mediatype === "avc") {
        resource = "#xvideo"
        mime = 'video/mp4; codecs="avc1.4d4020,mp4a.40.2"'
      }
      
      mediaSource = new MediaSource()
      mediaresource = document.querySelector(resource)
      mediaresource.src = URL.createObjectURL(mediaSource)
      
      if (mediatype === "mp3") {
        mediaresource.oncanplaythrough = function() {
          if (everready) {
            everready = false
            mediaresource.volume = 1
            setTimeout(()=>{
              let encsub = encfx ? " AES" : ""
              attxdisplay.innerHTML = `128 KBPS MP3${encsub}`    
              mediaresource.play()
            },2000)
          }
        }
      }
      else if (mediatype === "avc") {
        pitahayax.classList.add("video")
        mediaresource.style.display = "block"
        mediaresource.style.width = "400px"
        mediaresource.style.height = "225px"
        mediaresource.volume = 1
      }
      mediaSource.addEventListener('sourceopen', function() {
        sourceBuffer = mediaSource.addSourceBuffer(mime)
        if (mediatype === "avc") {
          sourceBuffer.mode = 'segments'
          sourceBuffer.addEventListener('updateend', onUpdateEnd)
          updating = true
          systemready = true
          sourceBuffer.appendBuffer(ftypmoov)
        }
        mediasourceready = true
      })
    }
    
    let internalcanvas = ""
    if (videoframedecoder == null) {
      var ovfdblob = new Blob([ovfdstr], {type: "application/javascript"})
      videoframedecoder = new Worker(URL.createObjectURL(ovfdblob))
    }
    var mediasegments = []
    var assemblesegment = new Uint8Array([])

    let updating = false
    let everresolved = false

    function moofparsesegment() {
      let mooffound = false
      if (assemblesegment.length < 250) {
        return false
      }
      let cleanedassemblesegment
      let moofindex = -1
      for (let i=4;i<assemblesegment.length;i++) {
        if ( assemblesegment[i+0] === 0x6D 
          && assemblesegment[i+1] === 0x6F
          && assemblesegment[i+2] === 0x6F
          && assemblesegment[i+3] === 0x66 ) {
          moofindex = i
          i = assemblesegment.length + 1
        }
      }
      if (moofindex === -1 ) {
        return false
      }
      mooffound = true
      cleanedassemblesegment = new Uint8Array((assemblesegment.length - moofindex) + 4)
      for (let i=0;i<((assemblesegment.length - moofindex) + 4);i++) {
        cleanedassemblesegment[i] = assemblesegment[moofindex + i - 4]
      }
      if (mooffound) {
        return cleanedassemblesegment
      }
      else {
        return false
      }
    }
    function flush() {
      if (everresolved) {
        let item = mediasegments.shift()
        updating = true
        sourceBuffer.appendBuffer(item)
      }
    }
    let systemready = false
    let everinitialized = false
    let everstarted = false
    let evertimerange = false
    
    function onUpdateEnd() {
      updating = false
      if (!everstarted && everresolved) {
        mediaresource.onprogress = function() {
          if (!evertimerange) {
            if ( mediaresource.buffered 
              && mediaresource.buffered.length === 1 ) {
              let encsub = encfx ? " AES" : ""         
              attxdisplay.innerHTML = `H264/AAC${encsub}`
              video.style.pointerEvents = "none"
              evertimerange = true
              let time = mediaresource.buffered.start(0)
              mediaresource.currentTime = time
              mediaresource.play()
              mediaresource.onprogress = null
            }            
          }
        }
        everstarted = true
      } 
      if (!mediasegments.length) {
        return
      }
      flush()
    }

    let streamavailable = false
    
    function newsegmentinterpretation(newsegment) {
      if (newsegment.length === 0) {
        return null
      }
      if (!everresolved) {
        assemblesegment = Uint8Array.from([...assemblesegment, ...newsegment])
        let moofparsed = moofparsesegment()
        if (moofparsed) {
          everresolved = true
          mediasegments.push(moofparsed)
          assemblesegment = null
        }
      }
      else {
        mediasegments.push(newsegment)
      }
      if (!updating && systemready) {
        flush()
      }
    }    

    videoframedecoder.onmessage = function (event) {
      switch(event.data.type) {
        case "buffer": {
          if (mediasourcewaiting) {
            mediasourcewaiting = false
            encfx = event.data.data[2]
            if (event.data.data[1].mediatype == 0) {
              deploymediasource("mp3")
            }
            else if (event.data.data[1].mediatype == 2) {
              framerate = 8
              deploymediasource("avc")
            }
          }
          if (!mediasourceready) {
            mediatempqueue.push(event.data.data[0])
            return        
          }
          function uint8concat(arrays) {
            let totalLength = arrays.reduce((acc, value) => acc + value.length, 0)
            if (!arrays.length) {
              return null
            }
            let result = new Uint8Array(totalLength)
            let length = 0;
            for(let array of arrays) {
              result.set(array, length)
              length += array.length
            }
            return result
          }
          switch(event.data.data[1].mediatype) {
            case 0: {
              if (!firefox) {
                if (mediatempqueue.length > 0) {
                  mediatempqueue.push(event.data.data[0])
                  let tempdata = uint8concat(mediatempqueue)
                  sourceBuffer.appendBuffer(tempdata)
                  mediatempqueue = []
                }
                else {
                  sourceBuffer.appendBuffer(event.data.data[0])
                }
              }
              else {
                if (mediatempqueue.length > 0) {
                  mediatempqueue.push(event.data.data[0])
                  let tempdata = uint8concat(mediatempqueue)
                  encapsulation.postMessage(tempdata)
                  mediatempqueue = []
                }
                else {
                  encapsulation.postMessage(event.data.data[0])
                }
              }            
              break
            }
            case 1: {
              break
            }
            case 2: {
              if (mediatempqueue.length > 0) {
                mediatempqueue = []
              }
              else {
                newsegmentinterpretation(event.data.data[0])
              }
              break
            }
            default: {
              break
            }
          }
          break
        }
        case "fail": {
          pitahayax.classList.remove("enabled")
          attxdisplay.innerHTML = "BADPASS"
          stop()
          break
        }
        case "req": {
          pitahayax.classList.remove("enabled")
          attxdisplay.innerHTML = "NEEDSPASS"
          stop()
          break
        }
        case "invalid": {
          pitahayax.classList.remove("enabled")
          attxdisplay.innerHTML = "NOSOURCE"
          stop()
          break
        }
      }
    }
    
    if (encapsulation == null) {
      var enblob = new Blob([enstr], {type: "application/javascript"})
      encapsulation = new Worker(URL.createObjectURL(enblob))
    }
    let everappended = false
    encapsulation.onmessage = function (event) {
      if (!everappended) {
        everappended = true
      }
      sourceBuffer.appendBuffer(event.data.buffer)
    }
    var cycletimeoutms = 1000 / framerate
    var expected
    var hasphrase = false
    function readloop() {
      if (!playing) {
        return null
      }
      if (!hasphrase) {
        hasphrase = true
        passphrase()
      }
      let now = Date.now()
      var dt = now - expected
      expected += cycletimeoutms
      var p = Math.max(0, cycletimeoutms - dt)
      if (video.playing) {
        capturevideoframe()
      }
      setTimeout(readloop, p)
    }
    function clockstart() {
      playing = true
      expected = Date.now() + cycletimeoutms  
      clock = setTimeout(readloop, cycletimeoutms)
    }
    clockstart()
    return true
  }
  function stop() {
    if (mediaresource) {
      mediaresource.volume = 0
    }
    started = false
    evertest = false
    playing = false
    video.pause()
    clearTimeout(clock)
    if (videoframedecoder) {
      videoframedecoder.terminate()
    }
    if (encapsulation) {
      encapsulation.terminate()
    }
    videoframedecoder = null
    encapsulation = null
  }
  
  let togglebutton = document.getElementById('togglebutton')
  let attxinput = document.getElementById('attxinput')
  function toggle() {
    if (!started) {
      let xstate = start()
      if (xstate) {
        attxdisplay.innerHTML = "LOADING"
        pitahayax.classList.add("enabled")
      }
    }
    else {
      pitahayax.classList.remove("enabled")
      attxdisplay.innerHTML = "PAUSED"
      stop()
    }
  }
  togglebutton.addEventListener("click", toggle)
  setTimeout(()=>{
    toggle()
  },250)
  return null

})()
;