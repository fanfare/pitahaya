;
let optical = (function() {

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
            // seek into the future
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
        cellsizerow:      3,   
        canvaswidth:      640,   
        canvasheight:     360,  
        datacolumns:      160,    
        datarows:         119,         
        bitspace:         19040,      
        reedsolomonbytes: 38 
      },
      // avc
      2: {
        cellsizerow:      2,   
        canvaswidth:      640,   
        canvasheight:     360,  
        datacolumns:      320,    
        datarows:         179,         
        bitspace:         57120,      
        reedsolomonbytes: 44
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

    let reedsolomonbytes = 0
    let abeverfound = false
    let validheader = false
    let usablebuffer = null
    let canvaswidth = 0
    let canvasheight = 0
    let bitspace = 0
    let oldbitspace = 0
    let responsearray
    let datacolumns = 0
    let datarows = 0
    let cellsizecol = 0
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
          //console.log("couldnotdecode")
        }
      }
      if (!found) {
        return null
      }
      responsearray = new Uint8Array(something.length)

      for (let i=0;i<something.length;i++) {
        responsearray[i] = something[i].charCodeAt()
      }
      if (lastframebitstatus == 1) {
        bitspace = oldbitspace
        ubxl = bitspace/8
        lastframebitstatus = 0
      }
      return [responsearray, vparams]
    }
   
    self.onmessage = function (event) {
      let arrayn = matrix(event.data)
      if (arrayn) {
        postMessage(arrayn)
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
  
  document.body.insertAdjacentHTML(`afterbegin`, `<style>#pitahayax div { box-sizing:border-box;} #pitahayax ::selection { background: #0f9 } #pitahayax ::-moz-selection { background: #0f9 } #pitahayax .unused {display:none!important}</style><div id="pitahayax" style="background:black;position:fixed;top:0;left:0;z-index:99999999;display:flex;flex-direction:row;padding:4px;"><video id="xvideo" controls class="xvideo" style="display:none"></video><audio id="xaudio" controls style="width:150px;height:30px;display:none"></audio><div id="togglebutton" class="" style="cursor:pointer;margin-right:4px;color:#0f9;display:flex;border:1px solid #0f9;min-width:55px;min-height:24px;max-height:24px;line-height:15px;font-size:11px;font-family:consolas;align-items:center;justify-content:center;user-select:none;-moz-user-select:none;padding-left:1px;font-weight:500;user-select:none">play</div><div style="display:flex;border:1px solid #0f9;min-width:180px;min-height:24px;font-size:11px;font-family:consolas;color:#0f9;align-items:center;padding-left:6px;font-weight:500;position:relative;white-space:pre" id="attxdisplay">pitahaya.jollo.org</div><div class="unused" style="margin-left:5px;display:flex;border:1px solid #0f9;min-width:86px;max-width:86px;min-height:24px;font-size:11px;font-family:consolas;color:#0f9;align-items:center;padding-left:5px;user-select:none;font-weight:500"><input style="background:black;border:none;color:#0f9;width:70px;font-size:11px;font-family:consolas" placeholder="" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" /></div></div>`)
  
  let video
  let mediaresource
  var videoframedecoder = null
  var clock = null
  var encapsulation = null
  
  var canvas = document.createElement('canvas')
  canvas.width = 640
  canvas.height = 360
  var ctx = canvas.getContext('2d')
  
  function capturevideoframe() {
    ctx.drawImage(video, 0, 0)
    var data = ctx.getImageData(0, 0, 640, 360).data
    let offset = null
    videoframedecoder.postMessage(data)
  }
  
  let started = false
  let playing = false
  
  let framerate = 16
  
  let ftypmoov = new Uint8Array([
    
    // ffmpeg -re -i source -t 30 -vf \
    // "scale=196:110:force_original_aspect_ratio=decrease,pad=196:110:(ow-iw)/2:(oh-ih)/2" \
    // -ar 44100 -ac 2 -c:v huffyuv -acodec pcm_s16le -r 30 -y -f avi - \
    // | ffmpeg -i - -g 51 -c:a aac -b:a 112k -ar 44100 -ac 2 -c:v libx264 -profile:v main -level 3.2 \
    // -pix_fmt yuv420p -preset medium -b 64k -minrate 34k -maxrate 64k -bufsize 128k \
    // -tune zerolatency -flags +cgop+low_delay -f mp4 -movflags \
    // empty_moov+omit_tfhd_offset+frag_keyframe+default_base_moof - > /dev/null

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
    
    // 'video/mp4; codecs="avc1.4d4020,mp4a.40.2"'  
    
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
    if (!video.playing) {
      video.play()
    }
    
    let rvh = video.videoHeight
    let rvw = video.videoWidth
    
    if (rvh !== 360 || rvw !== 640) {
      alert("please set video resolution to 360p before starting..")
      return null
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
    
    function deploymediasource(mediatype) {
      
      let resource
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
              mediaresource.play()
            },2000)
          }
        }
      }
      else if (mediatype === "avc") {
        mediaresource.style.display = "block"
        mediaresource.style.padding = "5px"
        mediaresource.style.width = "400px"
        mediaresource.style.height = "225px"
        document.getElementById("attxdisplay").style.display = "none"
        togglebutton.style.display = "none"
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
    function onUpdateEnd() {
      updating = false
      if (!everstarted && everresolved) {
        everstarted = true
        setTimeout(()=>{
          let time = mediaresource.buffered.start(0)
          mediaresource.currentTime = time
          mediaresource.play()          
        },2500)

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
      if (mediasourcewaiting) {
        mediasourcewaiting = false
        if (event.data[1].mediatype == 0) {
          deploymediasource("mp3")
        }
        else if (event.data[1].mediatype == 2) {
          framerate = 8
          deploymediasource("avc")
        }
      }
      if (!mediasourceready) {
        mediatempqueue.push(event.data[0])
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
      switch(event.data[1].mediatype) {
        case 0: {
          if (!firefox) {
            if (mediatempqueue.length > 0) {
              mediatempqueue.push(event.data[0])
              let tempdata = uint8concat(mediatempqueue)
              sourceBuffer.appendBuffer(tempdata)
              mediatempqueue = []
            }
            else {
              sourceBuffer.appendBuffer(event.data[0])
            }
          }
          else {
            if (mediatempqueue.length > 0) {
              mediatempqueue.push(event.data[0])
              let tempdata = uint8concat(mediatempqueue)
              encapsulation.postMessage(tempdata)
              mediatempqueue = []
            }
            else {
              encapsulation.postMessage(event.data[0])
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
            newsegmentinterpretation(event.data[0])
          }
          break
        }
        default: {
          break
        }
      }
    }
    if (encapsulation == null) {
      var enblob = new Blob([enstr], {type: "application/javascript"})
      encapsulation = new Worker(URL.createObjectURL(enblob))
    }
    encapsulation.onmessage = function (event) {
      sourceBuffer.appendBuffer(event.data.buffer)
    }
    var cycletimeoutms = 1000 / framerate
    var expected
    function readloop() {
      if (!playing) {
        return null
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
    mediaresource.volume = 0
    started = false
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
  function toggle() {
    if (!started) {
      let xstate = start()
      if (xstate) {
        togglebutton.innerHTML = "pause"
      }
    }
    else {
      togglebutton.innerHTML = "play"
      stop()
    }
  }
  togglebutton.addEventListener("click", toggle)
  return null

})()
;