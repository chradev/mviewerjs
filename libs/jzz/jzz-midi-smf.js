/**
 * Minified by jsDelivr using Terser v5.37.0.
 * Original file: /npm/jzz-midi-smf@1.9.7/javascript/JZZ.midi.SMF.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
!function(t,r){"object"==typeof exports&&"undefined"!=typeof module?(r.SMF=r,module.exports=r):"function"==typeof define&&define.amd?define("JZZ.midi.SMF",["JZZ"],r):r(JZZ)}(0,(function(t){if(!t.MIDI.SMF){var r="1.9.7",i=t.lib.now;c.version=function(){return r},c.num4=a,c.prototype=[],c.prototype.constructor=c,c.prototype.copy=function(){var t=new c;t.type=this.type,t.ppqn=this.ppqn,t.fps=this.fps,t.ppf=this.ppf,t.rmi=this.rmi,t.ntrk=this.ntrk;for(var r=0;r<this.length;r++)t.push(this[r].copy());return t},c.prototype._complain=function(t,r,i){this._warn||(this._warn=[]),this._warn.push(d(t,r,i))},c.prototype.load=function(t){var r=0;"RIFF"==t.substring(0,4)&&"RMIDdata"==t.substring(8,16)&&(this.rmi=!0,r=20,t=t.substring(20,20+t.charCodeAt(16)+256*t.charCodeAt(17)+65536*t.charCodeAt(18)+16777216*t.charCodeAt(19))),function(t,r,i){if(r.substring(0,8)!=e){var n=r.indexOf(e);-1!=n?(r=r.substring(n),t._complain(i,"Extra leading characters",n),i+=n):o("Not a MIDI file")}t._off=i,t.type=16*r.charCodeAt(8)+r.charCodeAt(9),t._off_type=i+8,t.ntrk=16*r.charCodeAt(10)+r.charCodeAt(11),t._off_ntrk=i+10,r.charCodeAt(12)>127?(t.fps=256-r.charCodeAt(12),t.ppf=r.charCodeAt(13),t._off_fps=i+12,t._off_ppf=i+13):(t.ppqn=256*r.charCodeAt(12)+r.charCodeAt(13),t._off_ppqn=i+12);t.type>2?t._complain(8+i,"Invalid MIDI file type",t.type):0==t.type&&t.ntrk>1&&t._complain(10+i,"Wrong number of tracks for the type 0 MIDI file",t.ntrk);t.ppf||t.ppqn||o("Invalid MIDI header");var s=0,h=14;for(;h<r.length-8;){var a=h+i,p=r.substring(h,h+4);"MTrk"==p&&s++;var f=(r.charCodeAt(h+4)<<24)+(r.charCodeAt(h+5)<<16)+(r.charCodeAt(h+6)<<8)+r.charCodeAt(h+7);f<=0&&(f=r.length-h-8,t._complain(h+i+4,"Invalid track length",r.charCodeAt(h+4)+"/"+r.charCodeAt(h+5)+"/"+r.charCodeAt(h+6)+"/"+r.charCodeAt(h+7))),h+=8;var u=r.substring(h,h+f);t.push(new C(p,u,a)),"MThd"==p&&t._complain(a,"Unexpected chunk type","MThd"),h+=f}s!=t.ntrk&&(t._complain(i+10,"Incorrect number of tracks",t.ntrk),t.ntrk=s);t.ntrk||o("No MIDI tracks");(!t.type&&t.ntrk>1||t.type>2)&&(t.type=1);h<r.length&&t._complain(i+h,"Extra trailing characters",r.length-h);h>r.length&&t._complain(i+r.length,"Incomplete data",h-r.length)}(this,t,r)};var e="MThd"+String.fromCharCode(0)+String.fromCharCode(0)+String.fromCharCode(0)+String.fromCharCode(6);l.prototype.toString=function(){var t=[];return void 0!==this.off&&t.push("offset "+this.off),void 0!==this.track&&t.push("track "+this.track),void 0!==this.tick&&t.push("tick "+this.tick),t.push("--"),t.push(this.msg),void 0!==this.data&&t.push("("+this.data+")"),t.join(" ")},c.prototype.tracks=function(){for(var t=0,r=0;r<this.length;r++)this[r]instanceof A&&t++;return t},c.prototype.validate=function(){var t,r,i,e=[];if(this._warn)for(t=0;t<this._warn.length;t++)e.push(l(this._warn[t]));var n=v(this);for(r=0,t=0;t<this.length;t++)this[t]instanceof A&&(this[t]._validate(e,r),r++);var o={};for(_(e,o),t=0;t<n.length;t++)(i=w(n[t],1==this.type))&&(i.track=n[t].track,e.push(i)),g(e,o,n[t]);if(_(e,o),e.sort((function(t,r){return(t.off||0)-(r.off||0)||(t.track||0)-(r.track||0)||(t.tick||0)-(r.tick||0)})),e.length){for(t=0;t<e.length;t++)e[t]=l(e[t]);return e}},c.prototype.dump=function(t){var r="";if(t)return"RIFF"+p((r=this.dump()).length+12)+"RMIDdata"+p(r.length)+r;this.ntrk=0;for(var i=0;i<this.length;i++)this[i]instanceof A&&this.ntrk++,r+=this[i].dump();return r=(this.ppqn?h(this.ppqn):String.fromCharCode(256-this.fps)+String.fromCharCode(this.ppf))+r,r=e+String.fromCharCode(0)+String.fromCharCode(this.type)+h(this.ntrk)+r},c.prototype.toBuffer=function(t){return Buffer.from(this.dump(t),"binary")},c.prototype.toUint8Array=function(t){for(var r=this.dump(t),i=new ArrayBuffer(r.length),e=new Uint8Array(i),n=0;n<r.length;n++)e[n]=r.charCodeAt(n);return e},c.prototype.toArrayBuffer=function(t){return this.toUint8Array(t).buffer},c.prototype.toInt8Array=function(t){return new Int8Array(this.toArrayBuffer(t))},c.prototype.toString=function(){var t;for(this.ntrk=0,t=0;t<this.length;t++)this[t]instanceof A&&this.ntrk++;var r=["SMF:","  type: "+this.type];for(this.ppqn?r.push("  ppqn: "+this.ppqn):r.push("  fps: "+this.fps,"  ppf: "+this.ppf),r.push("  tracks: "+this.ntrk),t=0;t<this.length;t++)r.push(this[t].toString());return r.join("\n")},c.prototype.annotate=function(){for(var r=v(this),i=t.Context(),e=0;e<r.length;e++)r[e].lbl&&(r[e].lbl=void 0),i._read(r[e]);return this},c.prototype.player=function(){var r,i,e=new x;e.ppqn=this.ppqn,e.fps=this.fps,e.ppf=this.ppf;var n=v(this);if(2==this.type){var o=0,s=0,h=0;for(r=0;r<n.length;r++)o!=(i=t.MIDI(n[r])).track&&(o=i.track,s=h),h=i.tt+s,i.tt=h,e._data.push(i)}else for(r=0;r<n.length;r++)i=t.MIDI(n[r]),e._data.push(i);return e._type=this.type,e._tracks=this.tracks(),e._timing(),e},c.Chunk=C,C.prototype=[],C.prototype.constructor=C,C.prototype.copy=function(){return new C(this.type,this.data)},C.prototype.sub={MTrk:function(t,r,i){return new A(r,i)}},C.prototype.dump=function(){return this.type+a(this.data.length)+this.data},C.prototype.toString=function(){return this.type+": "+this.data.length+" bytes"},c.MTrk=A,A.prototype=[],A.prototype.constructor=A,A.prototype.type="MTrk",A.prototype.copy=function(){var r=new A;r.length=0;for(var i=0;i<this.length;i++)r.push(new t.MIDI(this[i]));return r},A.prototype._validate=function(t,r){var i,e;if(this._warn)for(i=0;i<this._warn.length;i++)(e=l(this._warn[i])).track=r,t.push(e)},A.prototype._complain=function(t,r,i,e){this._warn||(this._warn=[]),this._warn.push(d(t,r,i,e))},A.prototype.dump=function(){var t,r,i="",e=0,n="";for(t=0;t<this.length;t++)if(i+=s(this[t].tt-e),e=this[t].tt,void 0!==this[t].dd)i+="�",i+=String.fromCharCode(this[t].ff),i+=s(this[t].dd.length),i+=this[t].dd;else if(240==this[t][0]||247==this[t][0])for(i+=String.fromCharCode(this[t][0]),i+=s(this[t].length-1),r=1;r<this[t].length;r++)i+=String.fromCharCode(this[t][r]);else for(this[t][0]!=n&&(n=this[t][0],i+=String.fromCharCode(this[t][0])),r=1;r<this[t].length;r++)i+=String.fromCharCode(this[t][r]);return"MTrk"+a(i.length)+i},A.prototype.toString=function(){for(var t=["MTrk:"],r=0;r<this.length;r++)t.push(this[r].tt+": "+this[r].toString());return t.join("\n  ")},A.prototype.add=function(r,i){var e,n;r=parseInt(r),(isNaN(r)||r<0)&&o("Invalid parameter");var s=[];try{s.push(t.MIDI(i))}catch(r){for(e=0;e<i.length;e++)s.push(t.MIDI(i[e]))}for(s.length||o("Not a MIDI message"),e=0;e<s.length;e++)N(s[e]);if(this[this._orig.length-1].tt<r&&(this[this._orig.length-1].tt=r),47==i.ff||i[0]>240&&247!=i[0])return this;for(e=0;e<this._orig.length-1&&!(this._orig[e].tt>r);e++);for(n=0;n<s.length;n++)(i=s[n]).tt=r,this._orig.splice(e,0,i),e++;return this},A.prototype._sxid=127,A.prototype._image=function(){var t=function(){};t.prototype=this._orig;var r=new t;return r._ch=this._ch,r._sxid=this._sxid,r._tick=this._tick,r},A.prototype.send=function(t){return this._orig.add(this._tick,t),this},A.prototype.tick=function(t){if(t!=parseInt(t)||t<0)throw RangeError("Bad tick value: "+t);if(!t)return this;var r=this._image();return r._tick=this._tick+t,r},A.prototype.sxId=function(t){if(void 0===t&&(t=A.prototype._sxid),t==this._sxid)return this;if(t!=parseInt(t)||t<0||t>127)throw RangeError("Bad MIDI value: "+t);var r=this._image();return r._sxid=t,r},A.prototype.ch=function(t){if(t==this._ch||void 0===t&&void 0===this._ch)return this;if(void 0!==t&&(t!=parseInt(t)||t<0||t>15))throw RangeError("Bad channel value: "+t+" (must be from 0 to 15)");var r=this._image();return r._ch=t,r},A.prototype.note=function(t,r,i,e){return this.noteOn(t,r,i),void 0===this._ch?e>0&&this.tick(e).noteOff(t,r):i>0&&this.tick(i).noteOff(t),this},t.lib.copyMidiHelpers(A),x.prototype.onEnd=function(){},x.prototype.loop=function(t){t==parseInt(t)&&t>0?this._loop=t:this._loop=t?-1:0},x.prototype.play=function(){this.event=void 0,this.playing=!0,this.paused=!1,this._ptr=0,this._pos=0,this._p0=0,this._t0=i(),this._list=this._hdr,this.tick()},x.prototype.stop=function(){this._pos=0,this.playing=!1,this.event="stop",this.paused=void 0},x.prototype.pause=function(){this.event="pause"},x.prototype.resume=function(){this.playing||(this.paused?(this.event=void 0,this._t0=i(),this.playing=!0,this.paused=!1,this.tick()):this.play())},x.prototype.sndOff=function(){var r;for(r=0;r<16;r++)this._emit(t.MIDI.allSoundOff(r));for(r=0;r<16;r++)this._emit(t.MIDI.resetAllControllers(r))},x.prototype._filter=P,x.prototype.filter=function(t){this._filter=t instanceof Function?t:P},x.prototype._receive=function(t){t.isTempo()&&this.ppqn&&(this._mul=this.ppqn*(t.isMidi2?1e5:1e3)/(t.getTempo()||1),this.mul=this._mul*this._speed,this._t0=i(),this._p0=this._pos),this._emit(t)},x.prototype.tick=function(){var r,e=i();for(this._pos=this._p0+(e-this._t0)*this.mul;this._ptr<this._list.length&&!((r=this._list[this._ptr]).tt>this._pos);this._ptr++)this._filter(r);this._ptr>=this._list.length&&(this._list==this._hdr?(this._list=this._data,this._ptr=0,this._p0=0,this._t0=e):(this._loop&&-1!=this._loop&&this._loop--,this._loop?(this._ptr=0,this._p0=0,this._t0=e):this.stop(),this.onEnd())),"stop"==this.event&&(this.playing=!1,this.paused=!1,this._pos=0,this._ptr=0,this.sndOff(),this.event=void 0),"pause"==this.event&&(this.playing=!1,this.paused=!0,this._pos>=this._duration&&(this._pos=this._duration-1),this._p0=this._pos,this.sndOff(),this.event=void 0),this.playing&&t.lib.schedule(this._tick)},x.prototype.trim=function(){var t,r,i,e=[];for(r=0,t=0;t<this._data.length;t++)if((i=this._data[t]).length||1==i.ff||5==i.ff)for(;r<=t;r++)e.push(this._data[r]);var n=(t?this._data[t-1].tt:0)-(r?this._data[r-1].tt:0);return this._data=e,this._timing(),n},x.prototype._timing=function(){var t,r,i,e;if(this._duration=this._data.length?this._data[this._data.length-1].tt:0,this._ttt=[],this.ppqn){for(this._mul=this.ppqn/500,r=this._mul,t=0;t<this._hdr.length;t++)(e=this._hdr[t]).isTempo()&&(r=1e5*this.ppqn/(e.getTempo()||1));for(i=0,this._durationMS=0,this._ttt.push({t:0,m:r,ms:0}),t=0;t<this._data.length;t++)(e=this._data[t]).isTempo()&&(this._durationMS+=(e.tt-i)/r,i=e.tt,r=this.ppqn*(e.isMidi2?1e5:1e3)/(e.getTempo()||1),this._ttt.push({t:i,m:r,ms:this._durationMS}));this._durationMS+=(this._duration-i)/r}else this._mul=this.fps*this.ppf/1e3,this._ttt.push({t:0,m:this._mul,ms:0}),this._durationMS=this._duration/this._mul;this._speed=1,this.mul=this._mul,this._ttt.push({t:this._duration,m:0,ms:this._durationMS}),this._durationMS||(this._durationMS=1)},x.prototype.speed=function(t){return void 0!==t&&((isNaN(parseFloat(t))||t<=0)&&(t=1),this._speed=t,this.mul=this._mul*this._speed,this._p0=this._pos-(i()-this._t0)*this.mul),this._speed},x.prototype.type=function(){return this._type},x.prototype.tracks=function(){return this._tracks},x.prototype.duration=function(){return this._duration},x.prototype.durationMS=function(){return this._durationMS},x.prototype.position=function(){return this._pos},x.prototype.positionMS=function(){return this.tick2ms(this._pos)},x.prototype.jump=function(t){isNaN(parseFloat(t))&&o("Not a number: "+t),t<0&&(t=0),t>=this._duration&&(t=this._duration-1),this._goto(t)},x.prototype.jumpMS=function(t){isNaN(parseFloat(t))&&o("Not a number: "+t),t<0&&(t=0),t>=this._durationMS&&(t=this._durationMS-1),this._goto(this._ms2t(t))},x.prototype._t2ms=function(t){if(!t)return 0;var r;for(r=0;this._ttt[r].t<t;r++);return r--,this._ttt[r].ms+(t-this._ttt[r].t)/this._ttt[r].m},x.prototype._ms2t=function(t){if(!t)return 0;var r;for(r=0;this._ttt[r].ms<t;r++);return r--,this._ttt[r].t+(t-this._ttt[r].ms)*this._ttt[r].m},x.prototype._goto=function(t){this._pos=t,this.playing||(this.paused=!!t),this._toPos(),this.playing&&this.sndOff()},x.prototype._toPos=function(){var t,r;for(t=0;t<this._hdr.length;t++)(r=this._hdr[t]).isTempo()&&(this._mul=1e5*this.ppqn/(r.getTempo()||1));for(this._ptr=0;this._ptr<this._data.length&&!((r=this._data[this._ptr]).tt>=this._pos);this._ptr++)r.isTempo()&&this.ppqn&&(this._mul=this.ppqn*(r.isMidi2?1e5:1e3)/(r.getTempo()||1));this._list=this._data,this.mul=this._mul*this._speed,this._t0=i(),this._p0=this._pos},x.prototype.tick2ms=function(t){return isNaN(parseFloat(t))&&o("Not a number: "+t),t<=0?0:t>=this._duration?this._durationMS:this._t2ms(t)},x.prototype.ms2tick=function(t){return isNaN(parseFloat(t))&&o("Not a number: "+t),t<=0?0:t>=this._durationMS?this._duration:this._ms2t(t)},t.MIDI.SMF=c,B.version=function(){return r},B.prototype=[],B.prototype.constructor=B,B.prototype.copy=function(r){for(var i=0;i<r.length;i++)r[i].isSMF()||(r[i].isFullSysEx()?this.push(t.MIDI(r[i])):q())},B.prototype.validate=function(){return[]},B.prototype.dump=function(){var t,r,i="";for(t=0;t<this.length;t++)for(r=0;r<this[t].length;r++)i+=String.fromCharCode(this[t][r]);return i},B.prototype.toBuffer=function(){return Buffer.from(this.dump(),"binary")},B.prototype.toUint8Array=function(){for(var t=this.dump(),r=new ArrayBuffer(t.length),i=new Uint8Array(r),e=0;e<t.length;e++)i[e]=t.charCodeAt(e);return i},B.prototype.toArrayBuffer=function(){return this.toUint8Array().buffer},B.prototype.toInt8Array=function(){return new Int8Array(this.toArrayBuffer())},B.prototype.toString=function(){var t,r=["SYX:"];for(t=0;t<this.length;t++)r.push(this[t].toString());return r.join("\n  ")},B.prototype.annotate=function(){for(var r=t.Context(),i=0;i<this.length;i++)this[i].lbl&&(this[i].lbl=void 0),r._read(this[i]);return this},B.prototype.player=function(){var r,i=new x;for(i.ppqn=96,r=0;r<this.length;r++){var e=t.MIDI(this[r]);e.tt=0,i._data.push(e)}return i._type="syx",i._tracks=1,i._timing(),i.sndOff=function(){},i},B.prototype._sxid=127,B.prototype._image=function(){var t=function(){};t.prototype=this._orig;var r=new t;return r._ch=this._ch,r._sxid=this._sxid,r},B.prototype.add=function(r){return(r=t.MIDI(r)).isFullSysEx()&&this._orig.push(r),this},B.prototype.send=function(t){return this.add(t)},B.prototype.sxId=function(t){if(void 0===t&&(t=B.prototype._sxid),t==this._sxid)return this;if(t!=parseInt(t)||t<0||t>127)throw RangeError("Bad MIDI value: "+t);var r=this._image();return r._sxid=t,r},B.prototype.ch=function(t){if(t==this._ch||void 0===t&&void 0===this._ch)return this;if(void 0!==t&&(t!=parseInt(t)||t<0||t>15))throw RangeError("Bad channel value: "+t+" (must be from 0 to 15)");var r=this._image();return r._ch=t,r},t.lib.copyMidiHelpers(B),t.MIDI.SYX=B,U.version=function(){return r},U.prototype=[],U.prototype.constructor=U,U.prototype._sxid=127;var n="SMF2CLIP";U.prototype._image=function(){var t=function(){};t.prototype=this._orig;var r=new t;return r._gr=this._gr,r._ch=this._ch,r._sxid=this._sxid,r._tick=this._tick,r},U.prototype.send=function(t){return this.add(this._tick,t)},U.prototype.tick=function(t){if(t!=parseInt(t)||t<0)throw RangeError("Bad tick value: "+t);if(!t)return this;var r=this._image();return r._tick=this._tick+t,r},U.prototype.add=function(r,i){var e,n,s;r=parseInt(r),(isNaN(r)||r<0)&&o("Invalid parameter");var h=function(r){var i;r&&r.length||o("Not a MIDI message");var e=[];try{e.push(t.UMP(r))}catch(n){for(i=0;i<r.length;i++)r[i]&&r[i].length||o("Not a MIDI message"),e.push(t.UMP(r[i]))}return e}(i),a=this;for(this.length&&(s=this._orig[this._orig.length-1]),s&&!s.isEndClip()&&(s=void 0),s&&s.tt<r&&(s.tt=r),e=0;e<h.length;e++)if(!(i=h[e]).isStartClip()&&!i.isEndClip())if(i.isDelta())r+=i.getDelta(),s&&s.tt<r&&(s.tt=r),a=a.tick(i.getDelta());else{for(i.tt=r,n=0;n<this._orig.length&&!(this._orig[n].tt>r||this._orig[n]==s);n++);this._orig.splice(n,0,i)}return a},U.prototype.sxId=function(t){if(void 0===t&&(t=U.prototype._sxid),t==this._sxid)return this;if(t!=parseInt(t)||t<0||t>127)throw RangeError("Bad MIDI value: "+t);var r=this._image();return r._sxid=t,r},U.prototype.gr=function(t){if(t==this._gr||void 0===t&&void 0===this._gr)return this;if(void 0!==t&&(t!=parseInt(t)||t<0||t>15))throw RangeError("Bad channel value: "+t+" (must be from 0 to 15)");var r=this._image();return r._gr=t,r},U.prototype.ch=function(t){if(t==this._ch||void 0===t&&void 0===this._ch)return this;if(void 0!==t&&(t!=parseInt(t)||t<0||t>15))throw RangeError("Bad channel value: "+t+" (must be from 0 to 15)");var r=this._image();return r._ch=t,r},T.prototype=[],T.prototype.constructor=T,T.prototype._image=U.prototype._image,T.prototype.send=U.prototype.send,T.prototype.tick=U.prototype.tick,T.prototype.gr=U.prototype.gr,T.prototype.ch=U.prototype.ch,T.prototype.sxId=U.prototype.sxId,T.prototype.add=U.prototype.add,U.prototype._complain=function(t,r,i,e){this._warn||(this._warn=[]);var n={off:t,msg:r,data:i};void 0!==e&&(n.tick=e),this._warn.push(n)},U.prototype.validate=function(){var t,r=[];if(function(t){var r,i,e,n,o={};for(r=0;r<t.length;r++)i=void 0,(n=t[r]).isFlex()&&(i="f"+(i=(15&n[0])+16*(63&n[1])),e=n[1]>>6),n.isData()&&(i="d"+(15&n[0]),e=n[1]>>4&3),n.isSX()&&(i="s"+(15&n[0]),e=n[1]>>4&3),i&&(o[i]?0!=e&&1!=e||t._complain(o[i].off,"Missing series end",o[i].toString(),o[i].tt):2!=e&&3!=e||t._complain(n.off,"Missing series start",n.toString(),n.tt),o[i]=0==e||3==e?void 0:n);for(e=Object.keys(o),r=0;r<e.length;r++)(n=o[e[r]])&&t._complain(n.off,"Missing series end",n.toString(),n.tt)}(this),this._warn)for(t=0;t<this._warn.length;t++)r.push(l(this._warn[t]));if(r.length){for(t=0;t<r.length;t++)r[t]=l(r[t]);return r.sort((function(t,r){return(t.off||0)-(r.off||0)||(t.tick||0)-(r.tick||0)})),r}},U.prototype.dump=function(){var r,i,e=[n];for(e.push(t.UMP.umpDelta(0).dump()),e.push(t.UMP.umpTicksPQN(this.ppqn).dump()),i=0,r=0;r<this.header.length;r++)e.push(t.UMP.umpDelta(this.header[r].tt-i).dump()),e.push(this.header[r].dump()),i=this.header[r].tt;for(e.push(t.UMP.umpDelta(0).dump()),e.push(t.UMP.umpStartClip().dump()),i=0,r=0;r<this.length;r++)e.push(t.UMP.umpDelta(this[r].tt-i).dump()),e.push(this[r].dump()),i=this[r].tt;return e.join("")},U.prototype.toBuffer=function(){return Buffer.from(this.dump(),"binary")},U.prototype.toUint8Array=function(){for(var t=this.dump(),r=new ArrayBuffer(t.length),i=new Uint8Array(r),e=0;e<t.length;e++)i[e]=t.charCodeAt(e);return i},U.prototype.toArrayBuffer=function(){return this.toUint8Array().buffer},U.prototype.toInt8Array=function(){return new Int8Array(this.toArrayBuffer())},U.prototype.toString=function(){var r,i=[n,"Header"];for(i.push("  0: "+t.UMP.umpTicksPQN(this.ppqn)),r=0;r<this.header.length;r++)i.push("  "+this.header[r].tt+": "+this.header[r]);for(i.push("Data","  0: "+t.UMP.umpStartClip()),r=0;r<this.length;r++)i.push("  "+this[r].tt+": "+this[r]);return i.join("\n")},U.prototype.annotate=function(){var r,i;for(i=t.Context(),r=0;r<this.header.length;r++)this.header[r].lbl&&(this.header[r].lbl=void 0),i._read(this.header[r]);for(i=t.Context(),r=0;r<this.length;r++)this[r].lbl&&(this[r].lbl=void 0),i._read(this[r]);return this},U.prototype.player=function(){var r,i,e=new x;for(e.ppqn=this.ppqn,r=0;r<this.header.length;r++)i=t.MIDI2(this.header[r]),e._hdr.push(i);for(r=0;r<this.length;r++)i=t.MIDI2(this[r]),e._data.push(i);return e._type="clip",e._tracks=1,e._timing(),e.sndOff=function(){},e},t.lib.copyMidi2Helpers(U),t.lib.copyMidi2Helpers(T),t.MIDI.Clip=U}function o(t){throw new Error(t)}function s(t){var r="";return t>2097151&&(r+=String.fromCharCode(128+(t>>21&127))),t>16383&&(r+=String.fromCharCode(128+(t>>14&127))),t>127&&(r+=String.fromCharCode(128+(t>>7&127))),r+=String.fromCharCode(127&t)}function h(t){return String.fromCharCode(t>>8)+String.fromCharCode(255&t)}function a(t){return String.fromCharCode(t>>24&255)+String.fromCharCode(t>>16&255)+String.fromCharCode(t>>8&255)+String.fromCharCode(255&t)}function p(t){return String.fromCharCode(255&t)+String.fromCharCode(t>>8&255)+String.fromCharCode(t>>16&255)+String.fromCharCode(t>>24&255)}function f(t){for(var r="",i=t.byteLength,e=0;e<i;e++)r+=String.fromCharCode(t[e]);return r}function u(t){return(t<16?"0":"")+t.toString(16)}function c(){var t=this;t instanceof c||delete(t=new c).ppqn;var r,i,e=1,n=96;if(1==arguments.length){if(arguments[0]instanceof c)return arguments[0].copy();if(arguments[0]instanceof B){t.type=0,t.ppqn=n,t.push(new A);for(var s=0;s<arguments[0].length;s++)t[0].add(0,arguments[0][s]);return t}var h;try{arguments[0]instanceof ArrayBuffer&&(h=f(new Uint8Array(arguments[0])))}catch(t){}try{(arguments[0]instanceof Uint8Array||arguments[0]instanceof Int8Array)&&(h=f(new Uint8Array(arguments[0])))}catch(t){}try{arguments[0]instanceof Buffer&&(h=arguments[0].toString("binary"))}catch(t){}if("string"==typeof arguments[0]&&"0"!=arguments[0]&&"1"!=arguments[0]&&"2"!=arguments[0]&&(h=arguments[0]),""==h&&o("Empty file"),h)return t.load(h),t;e=parseInt(arguments[0])}else 2==arguments.length?(e=parseInt(arguments[0]),n=parseInt(arguments[1])):3==arguments.length?(e=parseInt(arguments[0]),r=parseInt(arguments[1]),i=parseInt(arguments[2])):arguments.length&&o("Invalid parameters");return(isNaN(e)||e<0||e>2)&&o("Invalid parameters"),t.type=e,void 0===r?((isNaN(n)||n<0||n>65535)&&o("Invalid parameters"),t.ppqn=n):(24!=r&&25!=r&&29!=r&&30!=r&&o("Invalid parameters"),(isNaN(i)||i<0||i>255)&&o("Invalid parameters"),t.fps=r,t.ppf=i),t}function d(t,r,i,e,n){var o={off:t,msg:r,data:i};return void 0!==e&&(o.tick=e),void 0!==n&&(o.track=n),o}function l(t){if(!(this instanceof l))return new l(t);for(var r in t)t.hasOwnProperty(r)&&(this[r]=t[r])}function _(t,r){var i;for(i=0;i<16;i++)r[i]&&(r[i].rm&&r[i].rl&&127==r[i].rm[0][2]&&127==r[i].rl[0][2]&&(r[i].rm[1]=!0,r[i].rl[1]=!0),m(t,r,i,"bm"),m(t,r,i,"bl"),m(t,r,i,"nm"),m(t,r,i,"nl"),m(t,r,i,"rm"),m(t,r,i,"rl")),r[i]={}}function g(t,r,i){if(i.length&&!(i[0]<128))if(i.isGmReset()||i.isGsReset()||i.isXgReset())_(t,r);else{var e,n=i[0]>>4,o=15&i[0];if(11!=n)12==n&&(r[o].bm&&(r[o].bm[1]=!0),r[o].bl&&(r[o].bl[1]=!0),r[o].bl&&!r[o].bm&&(e=r[o].bl[0],t.push(d(e._off,"No matching Bank Select MSB",e.toString(),e.tt,e.track))),r[o].bm&&!r[o].bl&&(e=r[o].bm[0],t.push(d(e._off,"No matching Bank Select LSB",e.toString(),e.tt,e.track))));else switch(i[1]){case 0:m(t,r,o,"bm"),r[o].bm=[i,!1];break;case 32:m(t,r,o,"bl"),r[o].bl=[i,!1];break;case 98:m(t,r,o,"nl"),m(t,r,o,"rm"),m(t,r,o,"rl"),r[o].nl=[i,!1];break;case 99:m(t,r,o,"nm"),m(t,r,o,"rm"),m(t,r,o,"rl"),r[o].nm=[i,!1];break;case 100:m(t,r,o,"rl"),m(t,r,o,"nm"),m(t,r,o,"nl"),r[o].rl=[i,!1];break;case 101:m(t,r,o,"rm"),m(t,r,o,"nm"),m(t,r,o,"nl"),r[o].rm=[i,!1];break;case 6:case 38:case 96:case 97:r[o].rm&&r[o].rl&&(r[o].rm[1]=!0,r[o].rl[1]=!0),!r[o].rm||r[o].rl||r[o].rm[1]||(e=r[o].rm[0],t.push(d(e._off,"No matching RPN LSB",e.toString(),e.tt,e.track)),r[o].rm[1]=!0),r[o].rm||!r[o].rl||r[o].rl[1]||(e=r[o].rl[0],t.push(d(e._off,"No matching RPN MSB",e.toString(),e.tt,e.track)),r[o].rl[1]=!0),r[o].nm&&r[o].nl&&(r[o].nm[1]=!0,r[o].nl[1]=!0),!r[o].nm||r[o].nl||r[o].nm[1]||(e=r[o].nm[0],t.push(d(e._off,"No matching NRPN LSB",e.toString(),e.tt,e.track)),r[o].nm[1]=!0),r[o].nm||!r[o].nl||r[o].nl[1]||(e=r[o].nl[0],t.push(d(e._off,"No matching NRPN MSB",e.toString(),e.tt,e.track)),r[o].nl[1]=!0),r[o].rm||r[o].rl||r[o].nm||r[o].nl||t.push(d(i._off,"RPN/NRPN not set",i.toString(),i.tt,i.track)),r[o].rm&&r[o].rl&&127==r[o].rm[0][2]&&127==r[o].rl[0][2]&&t.push(d(i._off,"RPN/NRPN not set",i.toString(),i.tt,i.track))}}}function m(t,r,i,e){if(r[i][e]&&!r[i][e][1]){var n;switch(e){case"bm":case"bl":n="Unnecessary Bank Select";break;case"nm":case"nl":n="Unnecessary NRPN";break;case"rm":case"rl":n="Unnecessary RPN"}var o=r[i][e][0];t.push(d(o._off,n,o.toString(),o.tt,o.track)),delete r[i][e]}}function y(t){switch(240&t){case 128:case 144:case 160:case 176:case 224:return 2;case 192:case 208:return 1}switch(t){case 241:case 243:return 1;case 242:return 2}return 0}function v(t){var r,i,e=[],n=[];for(r=0;r<t.length;r++)t[r]instanceof A&&e.push(t[r]);if(1!=t.type)for(r=0;r<e.length;r++)for(i=0;i<e[r].length;i++)e[r][i].track=r,n.push(e[r][i]);else{var o=0,s=[];for(r=0;r<e.length;r++)s[r]=0;for(;;){var h=!0,a=0;for(r=0;r<e.length;r++){for(;s[r]<e[r].length&&e[r][s[r]].tt==o;)e[r][s[r]].track=r,n.push(e[r][s[r]]),s[r]++;s[r]>=e[r].length||(h&&(a=e[r][s[r]].tt),h=!1,a>e[r][s[r]].tt&&(a=e[r][s[r]].tt))}if(o=a,h)break}}return n}function C(t,r,i){if(!(this instanceof C))return new C(t,r,i);var e;if(this.sub[t])return this.sub[t](t,r,i);for("string"==typeof t&&4==t.length||o("Invalid chunk type: "+t),e=0;e<t.length;e++)(t.charCodeAt(e)<0||t.charCodeAt(e)>255)&&o("Invalid chunk type: "+t);for("string"!=typeof r&&o("Invalid data type: "+r),e=0;e<r.length;e++)(r.charCodeAt(e)<0||r.charCodeAt(e)>255)&&o("Invalid data character: "+r[e]);this.type=t,this.data=r,this._off=i}function I(t,r,i,e,n,o){var s=r.substring(i,i+e);s.length<e&&(t._complain(o,"Incomplete track data",e-s.length,n),s=(s+"\0\0").substring(0,e));for(var h=0;h<e;h++)s.charCodeAt(h)>127&&(t._complain(o+h,"Bad MIDI value set to 0",s.charCodeAt(h),n),s=s.substring(0,h)+"\0"+s.substring(h+1));return s}function k(t,r,i,e,n){var o=function(t){if(!t.length)return 0;if(t.charCodeAt(0)<128)return[1,t.charCodeAt(0)];var r=127&t.charCodeAt(0);return r<<=7,t.charCodeAt(1)<128?[2,r+t.charCodeAt(1)]:(r+=127&t.charCodeAt(1),r<<=7,t.charCodeAt(2)<128?[3,r+t.charCodeAt(2)]:(r+=127&t.charCodeAt(2),r<<=7,r+=127&t.charCodeAt(3),[4,t.charCodeAt(3)<128?r:-r]))}(r);return n&&(e+=o[1]),o[1]<0?(o[1]=-o[1],t._complain(i,"Bad byte sequence",r.charCodeAt(0)+"/"+r.charCodeAt(1)+"/"+r.charCodeAt(2)+"/"+r.charCodeAt(3),e)):4==o[0]&&o[1]<2097152?t._complain(i,"Long VLQ value",r.charCodeAt(0)+"/"+r.charCodeAt(1)+"/"+r.charCodeAt(2)+"/"+r.charCodeAt(3),e):3==o[0]&&o[1]<16384?t._complain(i,"Long VLQ value",r.charCodeAt(0)+"/"+r.charCodeAt(1)+"/"+r.charCodeAt(2),e):2==o[0]&&o[1]<128&&t._complain(i,"Long VLQ value",r.charCodeAt(0)+"/"+r.charCodeAt(1),e),o}function A(t,r){if(!(this instanceof A))return new A(t,r);if(this._off=r,this._orig=this,this._tick=0,void 0!==t)for(var i,e,n,o=0,s=0,h="",a=s+(r+=8);s<t.length;)s+=(e=k(this,t.substring(s,s+4),a,o,!0))[0],o+=e[1],a=s+r,255==t.charCodeAt(s)?(n=!1,(i=t.substring(s,s+2)).length<2&&(this._complain(a,"Incomplete track data",3-i.length,o),i="�/"),s+=2,s+=(e=k(this,t.substring(s,s+4),a+2,o))[0],this.push(new D(o,i,t.substring(s,s+e[1]),a)),s+=e[1]):240==t.charCodeAt(s)||247==t.charCodeAt(s)?(n=!1,i=t.substring(s,s+1),s+=1,s+=(e=k(this,t.substring(s,s+4),a+1,o))[0],this.push(new D(o,i,t.substring(s,s+e[1]),a)),s+=e[1]):128&t.charCodeAt(s)?(n=!0,h=t.substring(s,s+1),s+=1,e=y(h.charCodeAt(0)),h.charCodeAt(0)>240&&this._complain(a,"Unexpected MIDI message",h.charCodeAt(0).toString(16),o),this.push(new D(o,h,I(this,t,s,e,o,a+1),a)),s+=e):128&h.charCodeAt(0)&&(n||this._complain(a,"Interrupted running status",h.charCodeAt(0).toString(16),o),n=!0,e=y(h.charCodeAt(0)),h.charCodeAt(0)>240&&this._complain(a,"Unexpected MIDI message",h.charCodeAt(0).toString(16),o),this.push(new D(o,h,I(this,t,s,e,o,a),a)),s+=e);else this.push(new D(0,"�/",""))}function S(t){var r=t.toString();return r.length>80&&(r=(r=r.substring(0,78)).substring(0,r.lastIndexOf(" "))+" ..."),r}function M(t,r,i){return t.dd.length<i?d(t._off,"Invalid "+r+" meta event: "+(t.dd.length?"data too short":"no data"),S(t),t.tt):t.dd.length>i?d(t._off,"Invalid "+r+" meta event: data too long",S(t),t.tt):void 0}function b(t,r){return d(t._off,r+" meta events must be in the first track",S(t),t.tt)}function w(t,r){var i;if(void 0!==t.ff){if(t.ff>127)return d(t._off,"Invalid meta event",S(t),t.tt);if(0==t.ff){if(i=M(t,"Sequence Number",2))return i}else if(t.ff<10){if(!t.dd.length)return d(t._off,"Invalid Text meta event: no data",S(t),t.tt)}else if(32==t.ff){if(i=M(t,"Channel Prefix",1))return i;if(t.dd.charCodeAt(0)>15)return d(t._off,"Invalid Channel Prefix meta event: incorrect data",S(t),t.tt)}else if(33==t.ff){if(i=M(t,"MIDI Port",1))return i;if(t.dd.charCodeAt(0)>127)return d(t._off,"Invalid MIDI Port meta event: incorrect data",S(t),t.tt)}else if(47==t.ff){if(i=M(t,"End of Track",0))return i}else if(81==t.ff){if(i=M(t,"Tempo",3))return i;if(r&&t.track)return b(t,"Tempo")}else if(84==t.ff){if(i=M(t,"SMPTE",5))return i;if((31&t.dd.charCodeAt(0))>=24||t.dd.charCodeAt(1)>=60||t.dd.charCodeAt(2)>=60||t.dd.charCodeAt(3)>=30||t.dd.charCodeAt(4)>=200||t.dd.charCodeAt(4)%25)return d(t._off,"Invalid SMPTE meta event: incorrect data",S(t),t.tt);if(t.dd.charCodeAt(0)>>5>3)return d(t._off,"Invalid SMPTE meta event: incorrect format",t.dd.charCodeAt(0)>>5,t.tt);if(r&&t.track)return b(t,"SMPTE")}else if(88==t.ff){if(i=M(t,"Time Signature",4))return i;if(t.dd.charCodeAt(1)>8)return d(t._off,"Invalid Time Signature meta event: incorrect data",S(t),t.tt);if(r&&t.track)return b(t,"Time Signature")}else if(89==t.ff){if(i=M(t,"Key Signature",2))return i;if(t.dd.charCodeAt(1)>1||t.dd.charCodeAt(0)>255||t.dd.charCodeAt(0)>7&&t.dd.charCodeAt(0)<249)return d(t._off,"Invalid Key Signature meta event: incorrect data",t.toString(),t.tt)}else if(127!=t.ff)return d(t._off,"Unknown meta event",S(t),t.tt)}}function N(t){if(t.length||t.isSMF())return t;o("Not a MIDI message")}function D(r,i,e,n){var o;if(255==i.charCodeAt(0))o=t.MIDI.smf(i.charCodeAt(1),e);else{for(var s=[i.charCodeAt(0)],h=0;h<e.length;h++)s.push(e.charCodeAt(h));o=t.MIDI(s)}return void 0!==n&&(o._off=n),o.tt=r,o}function x(){var i,e=new t.Widget;for(var n in e._info.name="MIDI Player",e._info.manufacturer="Jazz-Soft",e._info.version=r,e.playing=!1,e._loop=0,e._data=[],e._hdr=[],e._pos=0,e._tick=(i=e,function(){i.tick()}),x.prototype)x.prototype.hasOwnProperty(n)&&(e[n]=x.prototype[n]);return e}function P(t){this._receive(t)}function q(){o("Not a SYX file")}function B(r){var i=this instanceof B?this:new B;if(i._orig=i,void 0!==r){if(r instanceof c)return i.copy(r.player()._data),i;if(r instanceof B)return i.copy(r),i;try{r instanceof ArrayBuffer&&(r=f(new Uint8Array(r)))}catch(t){}try{(r instanceof Uint8Array||r instanceof Int8Array)&&(r=f(new Uint8Array(r)))}catch(t){}try{r instanceof Buffer&&(r=r.toString("binary"))}catch(t){}var e;"string"!=typeof r&&(r=String.fromCharCode.apply(null,r));var n=[],s=0,h=0;for(r.length||o("Empty file");s<r.length;){for(240!=r.charCodeAt(s)&&q();s<r.length;){if(e=r.charCodeAt(s),n.push(e),247==e){(n=t.MIDI(n))._off=h,i.push(t.MIDI(n)),n=[],h=s+1;break}s++}s++}return n.length&&q(),i}return i}function U(r){var i=this instanceof U?this:new U;if(i._orig=i,i._tick=0,i.ppqn=96,void 0!==r){if(r instanceof U)return function(r,i){var e,n;for(r.length=0,r.header=new T,r.ppqn=i.ppqn,e=0;e<i.header.length;e++)(n=new t.UMP(i.header[e])).tt=i.header[e].tt,r.header.push(n);for(e=0;e<i.length;e++)(n=new t.UMP(i[e])).tt=i[e].tt,r.push(n)}(i,r),i;try{r instanceof ArrayBuffer&&(r=f(new Uint8Array(r)))}catch(t){}try{(r instanceof Uint8Array||r instanceof Int8Array)&&(r=f(new Uint8Array(r)))}catch(t){}try{r instanceof Buffer&&(r=r.toString("binary"))}catch(t){}return"string"!=typeof r&&(r=String.fromCharCode.apply(null,r)),function(r,i,e){i.length||o("Empty clip");if(i.substring(0,8)!=n){var s=i.indexOf(n);-1!=s?(e+=s,r._complain(e,"Extra leading characters",e)):o("Not a clip")}var h,a,p,f,c;e+=8,r.length=0,r.header=new T,r.ppqn=-1;var d=!0,l=!1,_=0;for(;e<i.length;){if(f=[4,4,4,8,8,16,4,4,8,8,8,12,12,16,16,16][i.charCodeAt(e)>>4],h=[],i.length<e+f){for(a=e;a<i.length;a++)h.push(u(i.charCodeAt(a)));r._complain(e,"Incomplete message",h.join(" ")),e+=f;break}for(a=0;a<f;a++)h.push(i.charCodeAt(e+a));c=p,(p=t.UMP(h)).isDelta()?(c&&c.isDelta()&&r._complain(e,"Consequential Delta Ticks message"),_+=p.getDelta()):(p.tt=_,p.off=e,c&&!c.isDelta()&&r._complain(e,"Missing Delta Ticks message",p.toString(),_),d?p.isStartClip()?(_=0,d=!1):p.isTicksPQN()?(-1!=r.ppqn&&r._complain(e,"Multiple Ticks PQN message"),r.ppqn=p.getTicksPQN(),r.ppqn||(r._complain(e,"Bad Ticks PQN value: 0"),r.ppqn=96)):p.isEndClip()?r._complain(e,"Unexpected End of Clip message"):r.header.push(p):p.isStartClip()?r._complain(e,"Repeated Start of Clip message"):p.isEndClip()?(l&&r._complain(e,"Repeated End of Clip message"),l=!0):r.push(p)),e+=f}(p=t.UMP.umpEndClip()).tt=_,r.push(p),-1==r.ppqn&&(r._complain(e,"Missing Ticks PQN message"),r.ppqn=96);d?r._complain(e,"No Start of Clip message"):l||r._complain(e,"No End of Clip message")}(i,r,0),i}if(i.header||(i.header=new T),!i.length){var e=t.UMP.umpEndClip();e.tt=0,i.push(e)}return i}function T(){this._orig=this,this._tick=0}}));
//# sourceMappingURL=/sm/415cb0a4d2322d7ae5142fb16d0f09ca28377d00d6bceb24cc193d4c4175511e.map

