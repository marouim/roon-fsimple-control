const helpers = {
  seek_to_time: (s) => {
    let r = "";

    if (s >= 3600) {           r += Math.floor(s / 3600).toString() + ":"; s = s % 3600; }

    if      (!r || s >= 600)  {           r += Math.floor(s / 60).toString()   + ":"; s = s % 60;   }
    else                { r += "0"; r += Math.floor(s / 60).toString()   + ":"; s = s % 60;   }

    if      (s >= 10)   {           r +=                  s.toString();         s = -1;       }
    else if (s >= 0)    { r += "0"; r +=                  s.toString();         s = -1;       }
    return r;
  }
}

export default helpers;