const table = [
{start:0,end:299,val:[660,660,630,600,570]},
{start:300,end:809,val:[780,780,750,720,690]},
{start:810,end:839,val:[765,765,735,705,675]},
{start:840,end:869,val:[750,750,720,690,660]},
{start:870,end:899,val:[735,735,705,675,645]},
{start:900,end:929,val:[720,720,690,660,630]},
{start:930,end:959,val:[705,705,675,645,615]},
{start:960,end:989,val:[690,690,660,630,600]},
{start:990,end:1019,val:[675,675,645,615,585]},
{start:1020,end:1439,val:[660,660,630,600,570]},
];

function toMin(t){
  let [h,m]=t.split(":").map(Number);
  return h*60+m;
}

function toTime(m){
  m=(m+1440)%1440;
  let h=Math.floor(m/60);
  let min=m%60;
  return `${h.toString().padStart(2,'0')}:${min.toString().padStart(2,'0')}`;
}

function getFDP(r,s){
  for (let row of table){
    if (r>=row.start && r<=row.end){
      return row.val[s-1];
    }
  }
}

function calc(){

  let r = toMin(document.getElementById("report").value);
  let s = parseInt(document.getElementById("sectors").value);
  let sby = toMin(document.getElementById("sby").value);
  let last = toMin(document.getElementById("last").value);
  let taxi = toMin(document.getElementById("taxi").value);

  let fdp = getFDP(r,s);

  if (sby > 360){
    fdp -= (sby - 360);
  }

  let end = r + fdp;
  let latest = end - last - taxi;

  document.getElementById("out").innerHTML =
  `FDP: ${Math.floor(fdp/60)}h ${fdp%60}min<br>
   FDP end: ${toTime(end)} UTC<br>
   Latest DEP: ${toTime(latest)} UTC`;

}

// SERVICE WORKER
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}
