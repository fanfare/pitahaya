function decbin(dec,length) {
  var out = ""
  while (length--) {
    out += (dec >> length ) & 1
  }
  return out 
}

function readint(arr) {
  var value = 0
  for (var i = 0; i < arr.length; i++) {
    value = (value * 256) + arr[i]
  }
  return value
}


module.exports = {
  decbin, readint
}