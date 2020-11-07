function decbin(dec,length) {
  var out = ""
  while (length--) {
    out += (dec >> length ) & 1
  }
  return out 
}

module.exports = {
  decbin
}