

export function timeConverter(UNIX_timestamp){
    var utcSeconds = UNIX_timestamp/1000;
  var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(utcSeconds);
  return d.toDateString()
  }