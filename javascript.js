// ===== CONFIG (isi dari Firebase Console > Project settings > Web app). Ini bukan rahasia. =====
const CONFIG={firebase:{apiKey:"AIzaSyCG4yls_Qud0F5D8uq7l1dVAeaLKsEhOk8",authDomain:"yep-tour.firebaseapp.com",projectId:"yep-tour",appId:"1:503700797265:web:53ed2fe457ae631dd30570"}};
const FB_VER='10.12.2';

// ===== DATA PAPAN =====
// T: [pusatX,pusatY,atasX,atasY,lebar,tinggi] tiap kotak pada papan.webp (1672x941), urut dari Start searah jarum jam
const IW=1672,IH=941;
const T=[[831.1,768.4,830.9,748,308,181],[665.6,701.5,674.4,689.3,183,111],[582.6,651.2,592.6,640,174,103],[505,604.7,514.9,593.5,162,98],[432.9,560.5,443.1,550,166,95],[363.6,517.8,374,507.5,161,92],[296.6,477.3,307,467.6,159,88],[232.6,437.8,243.2,428.2,157,86],[150.4,376.7,151.6,364,201,114],[248.8,323.2,242.4,315.3,139,71],[322.1,290.7,315.5,282.8,139,70],[394.4,259.5,387.6,251.9,136,67],[464,229.2,457.3,221.9,133,64],[531.9,200.5,526.7,193.3,132,64],[599.1,173.4,591,166.4,132,62],[661.7,146.6,653.9,139.8,131,60],[724.8,120.4,716.9,113.7,131,59],[829.2,84.6,828.9,75.1,202,84],[932,121.5,939.1,114.9,127,59],[994.3,148.6,1001.1,141.8,126,61],[1057.9,176.5,1064.8,169.6,130,61],[1123.6,204.9,1130.4,197.7,132,62],[1191.4,234.5,1197.9,227.2,136,65],[1261.5,265.3,1267.7,257.8,136,68],[1333.4,296.7,1339.8,288.9,137,69],[1407.1,329.2,1413,321.3,140,72],[1509.7,381,1507.1,369,202,111],[1428.6,438.9,1416.9,429.2,163,85],[1363.6,477.7,1352,467.6,163,89],[1296.3,518.1,1285.2,508,166,92],[1227.1,560.3,1215.8,549.6,168,95],[1154.7,604.2,1143.8,593.3,170,99],[1078.6,650.6,1067.9,639.1,172,103],[995.9,701,986.7,689.1,182,110]];
// A: [titikX,titikY,lebar/tinggi,lebarKoin/lebarGambar] titik pijak tiap gambar
const A={"bidak-ippo":[.5,.793,.578,.993],"ippo-senang":[.5,.79,.703,.786],"ippo-kaget":[.498,.79,.76,.753],"ippo-sombong":[.549,.791,.688,.829],"ippo-nangis":[.547,.791,.713,.814],"ippo-mikir":[.55,.791,.675,.841],"ippo-menang":[.517,.791,.882,.649],"bidak-cemong":[.547,.799,.732,.853],"cemong-senang":[.551,.799,.718,.808],"cemong-kaget":[.564,.831,.805,.748],"cemong-sombong":[.542,.799,.797,.771],"cemong-nangis":[.587,.801,.76,.793],"cemong-mikir":[.592,.825,.765,.771],"cemong-menang":[.51,.808,.915,.664],"bidak-selen":[.525,.805,.664,.944],"selen-senang":[.504,.799,.66,.818],"selen-kaget":[.515,.794,.728,.77],"selen-sombong":[.5,.799,.75,.747],"selen-nangis":[.564,.809,.723,.844],"selen-mikir":[.566,.791,.735,.793],"selen-menang":[.503,.791,.843,.703],"bidak-jersey":[.551,.799,.732,.893],"jersey-senang":[.491,.791,.708,.784],"jersey-kaget":[.479,.792,.823,.708],"jersey-sombong":[.587,.791,.735,.82],"jersey-nangis":[.554,.791,.787,.784],"jersey-mikir":[.532,.792,.748,.776],"jersey-menang":[.513,.792,.863,.684],"rumah":[.497,.927,.865,1.0],"hotel":[.49,.929,.818,1.0]};
const CH=['ippo','cemong','selen','jersey'],CC={ippo:'#E8638B',cemong:'#4C7BD9',selen:'#3FA36E',jersey:'#F5A524'};
const GC=['#8B5A2B','#7FD3F7','#E86AA6','#F39C34','#E0463C','#F4D03F','#3FA36E','#2F5FC9'],HC=[50,50,100,100,150,150,200,200];
const P=(n,k,g,p)=>({t:'prop',n,k,g,p}),X=(t,n,k)=>({t,n,k});
const TILES=[X('start','Start'),P('Vietnam','vietnam',0,60),P('Thailand','thailand',0,60),X('chance','Kesempatan','kartu-kesempatan'),P('Indonesia','indonesia',1,100),P('Filipina','filipina',1,100),P('Singapura','singapura',1,120),X('fund','Dana Umum','kartu-dana'),
X('jail','Penjara','penjara'),P('India','india',2,140),P('Mesir','mesir',2,140),{t:'util',n:'Wifi',k:'wifi',p:150},P('Turki','turki',2,160),{t:'air',n:'Bandara',k:'bandara',p:200},P('Meksiko','meksiko',3,180),P('Brasil','brasil',3,180),P('Argentina','argentina',3,200),
X('rest','Istirahat'),P('Australia','australia',4,220),X('chance','Kesempatan','kartu-kesempatan'),P('Kanada','kanada',4,220),P('Belanda','belanda',4,240),{t:'util',n:'Pabrik Snack',k:'pabrik-snack',p:150},P('Italia','italia',5,260),P('Spanyol','spanyol',5,260),P('Jerman','jerman',5,280),
X('gojail','Masuk Penjara','penjara'),P('China','china',6,300),P('Korea','korea',6,300),X('fund','Dana Umum','kartu-dana'),P('Jepang','jepang',6,320),{t:'air',n:'Bandara',k:'bandara',p:200},P('Prancis','prancis',7,350),P('Amerika','amerika',7,400)];
const N=TILES.length,JAIL=8,BUYABLE=new Set(['prop','air','util']);
const CARDS={chance:[['Nemu dompet turis di bandara, dapat imbalan',100],['Ketinggalan pesawat! Beli tiket baru',-80],['Viral di TikTok joget depan Menara Eiffel, dapat endorse',150],['Naik tuk-tuk tanpa helm, kena tilang',-50],['Terbang langsung ke Jepang!','to',30],['Kangen rumah, pulang ke Start','to',0],['Ketahuan nyolong sosis di pasar. Masuk penjara!','jail'],['Traktir semua pemain bakso, bayar ke tiap pemain','each',-30],['Lupa bawa paspor, mundur 3 langkah','back',3],['Menang lomba makan pizza',120]],
fund:[['Tabungan jajan cair',100],['Ulang tahun! Semua pemain kasih kado','each',20],['Kebanyakan makan snack, ke dokter hewan',-60],['Foto liburanmu dibeli majalah',80],['Salon grooming mahal banget',-70],['Dapat warisan tulang emas',200],['Bayar wifi hotel yang lemot',-30],['Langsung ke Start, ambil hadiahnya','to',0]]};

// ===== MESIN PERMAINAN (sama untuk main sendiri & main bareng) =====
const r6=()=>1+Math.floor(Math.random()*6);
const rentBase=p=>Math.max(2,Math.round(p*.07));
function newState(o){return{v:1,mode:o.mode,status:'lobby',host:o.host,set:{min:45,cash:1500,bots:3,lvl:'santai'},pl:{},ord:[],tn:0,ph:'roll',pend:-1,pdbl:false,own:{},seq:0,last:null,endsAt:0,rank:null,ts:Date.now()}}
const cur=s=>s.ord[s.tn];
const ownerOf=(s,i)=>s.own[i]&&s.own[i].by;
function groupFull(s,g,id){return TILES.every((t,i)=>t.g!==g||t.t!=='prop'||ownerOf(s,i)===id)}
function rent(s,i,dice){const t=TILES[i],o=s.own[i];if(!o)return 0;
 if(t.t==='air'){const n=TILES.filter((x,j)=>x.t==='air'&&ownerOf(s,j)===o.by).length;return n>1?100:50}
 if(t.t==='util'){const n=TILES.filter((x,j)=>x.t==='util'&&ownerOf(s,j)===o.by).length;return dice*(n>1?10:4)}
 const r=rentBase(t.p);return o.h?r*RM[o.h]:groupFull(s,t.g,o.by)?r*2:r}
// tingkat bangunan (h): 0 tanah, 1 rumah, 2 gedung, 3 hotel, 4 landmark (aturan ala LINE Get Rich)
const RM=[1,4,10,25,60],LVN=['Tanah','Rumah','Gedung','Hotel','Landmark'];
const lvCost=(i,h)=>Math.round(HC[TILES[i].g]*[1,1.5,2,3][h]);
const invest=(i,h)=>{let c=0;for(let k=0;k<h;k++)c+=lvCost(i,k);return c};
function wealth(s,id){let w=s.pl[id].cash;for(const i in s.own)if(s.own[i].by===id)w+=TILES[i].p+invest(i,s.own[i].h||0);return w}
// menang monopoli: kuasai satu deret sisi papan, atau 3 warna lengkap
const SIDES=[[1,2,4,5,6],[9,10,11,12,13,14,15,16],[18,20,21,22,23,24,25],[27,28,30,31,32,33]];
function monopoly(s,id){if(SIDES.some(L=>L.every(i=>ownerOf(s,i)===id)))return 'line';let g=0;for(let k=0;k<8;k++)if(groupFull(s,k,id))g++;return g>=3?'triple':null}
function alive(s){return s.ord.filter(id=>!s.pl[id].out)}
// bayar: jual rumah lalu tanah otomatis bila kurang; bila tetap kurang = bangkrut
function pay(s,id,amt,to,ev){const p=s.pl[id];
 if(p.cash<amt){const mine=Object.keys(s.own).filter(i=>s.own[i].by===id).sort((a,b)=>TILES[b].p-TILES[a].p);
  for(const i of mine){while(p.cash<amt&&s.own[i].h){s.own[i].h--;p.cash+=Math.floor(lvCost(i,s.own[i].h)/2)}}
  for(const i of mine){if(p.cash>=amt)break;if(!s.own[i].h){p.cash+=TILES[i].p/2;delete s.own[i]}}
  if(mine.length)ev.push({t:'sell',id})}
 if(p.cash<amt){if(to&&s.pl[to])s.pl[to].cash+=p.cash;p.cash=0;p.out=true;for(const i in s.own)if(s.own[i].by===id)delete s.own[i];ev.push({t:'bank',id});return false}
 p.cash-=amt;if(to&&s.pl[to])s.pl[to].cash+=amt;return true}
function goJail(s,id,ev){const p=s.pl[id];p.pos=JAIL;p.jail=1;p.dbl=0;ev.push({t:'jail',id})}
function moveBy(s,id,n,ev){const p=s.pl[id],path=[];let pos=p.pos;for(let k=0;k<n;k++){pos=(pos+1)%N;path.push(pos);if(pos===0){p.cash+=200;ev.push({t:'mv',id,path:path.splice(0)},{t:'start',id})}}
 if(path.length)ev.push({t:'mv',id,path});p.pos=pos}
function moveTo(s,id,to,ev){const p=s.pl[id];moveBy(s,id,(to-p.pos+N)%N||N,ev)}
function land(s,id,dice,ev,depth=0){const p=s.pl[id],i=p.pos,t=TILES[i];
 if(BUYABLE.has(t.t)){const o=s.own[i];if(!o){s.ph='buy';s.pend=i;return}
  if(o.by!==id&&!s.pl[o.by].out){const a=rent(s,i,dice);ev.push({t:'rent',id,to:o.by,a,i});pay(s,id,a,o.by,ev)}
  else if(o.by===id&&t.t==='prop'&&(o.h||0)<4&&p.cash>=lvCost(i,o.h||0)){s.ph='build';s.pend=i}return}
 if(t.t==='gojail')return goJail(s,id,ev);
 if((t.t==='chance'||t.t==='fund')&&depth<2){const L=CARDS[t.t],c=L[Math.floor(Math.random()*L.length)];ev.push({t:'card',d:t.t,tx:c[0],a:typeof c[1]==='number'?c[1]:c[1]==='each'?c[2]:0});
  if(typeof c[1]==='number'){if(c[1]>0)p.cash+=c[1];else pay(s,id,-c[1],null,ev)}
  else if(c[1]==='jail')goJail(s,id,ev);
  else if(c[1]==='to'){moveTo(s,id,c[2],ev);land(s,id,dice,ev,depth+1)}
  else if(c[1]==='back'){const to=(p.pos-c[2]+N)%N;ev.push({t:'mv',id,path:[to],jump:1});p.pos=to;land(s,id,dice,ev,depth+1)}
  else if(c[1]==='each'){for(const o of alive(s))if(o!==id&&!p.out){if(c[2]<0)pay(s,id,-c[2],o,ev);else pay(s,o,c[2],id,ev)}}}}
function endTurn(s,dbl){const id=cur(s),p=s.pl[id];s.ph='roll';s.pend=-1;
 if(alive(s).length<2)return finish(s);
 if(dbl&&!p.out&&!p.jail&&p.dbl<2){p.dbl++;return}
 p.dbl=0;do{s.tn=(s.tn+1)%s.ord.length}while(s.pl[cur(s)].out)}
function finish(s,win,why){s.status='end';s.rank=s.ord.map(id=>({id,w:s.pl[id].out?-1:wealth(s,id)})).sort((a,b)=>(b.id===win)-(a.id===win)||b.w-a.w);if(win)s.rank[0].why=why}
// act: jalankan satu aksi pemain. Hasil: null = berhasil, teks = alasan ditolak
function act(s,id,a){
 if(a.k==='time'){if(s.status==='play'&&Date.now()>=s.endsAt){finish(s);s.seq++;logEv(s,[{t:'end'}]);return null}return 'Belum waktunya'}
 if(s.status!=='play')return 'Permainan belum jalan';
 const me=cur(s),ev=[];
 if(a.k==='skip'){if(id!==s.host||me===id)return 'Tidak bisa';if(s.ph!=='roll')ev.push({t:'pass',id:me});endTurn(s,false)}
 else{if(me!==id)return 'Bukan giliranmu';const p=s.pl[id];
 if(a.k==='roll'){if(s.ph!=='roll')return 'Tunggu dulu';const d=[r6(),r6()],dbl=d[0]===d[1];ev.push({t:'roll',id,d,pw:+a.pw||0});
  if(p.jail){if(dbl||p.jail>=2){p.jail=0;ev.push({t:'free',id})}else{p.jail++;ev.push({t:'stay',id});endTurn(s,false);return done(s,ev)}
   moveBy(s,id,d[0]+d[1],ev);land(s,id,d[0]+d[1],ev);if(s.ph==='roll')endTurn(s,false);else s.pdbl=false;return done(s,ev)}
  if(dbl&&p.dbl>=2){goJail(s,id,ev);endTurn(s,false);return done(s,ev)}
  moveBy(s,id,d[0]+d[1],ev);if(!p.out)land(s,id,d[0]+d[1],ev);
  if(s.ph!=='roll'&&!p.out)s.pdbl=dbl;else endTurn(s,dbl&&p.pos!==JAIL)}
 else if(a.k==='buy'){if(s.ph!=='buy')return 'Tidak ada yang bisa dibeli';const i=s.pend,t=TILES[i];
  if(a.y){if(p.cash<t.p)return 'Yep Coin-mu kurang';p.cash-=t.p;s.own[i]={by:id,h:0};ev.push({t:'buy',id,i});const w=monopoly(s,id);if(w){finish(s,id,w);ev.push({t:'mono',id,w});return done(s,ev)}}else ev.push({t:'pass',id});
  endTurn(s,s.pdbl)}
 else if(a.k==='build'){if(s.ph!=='build')return 'Tidak ada yang bisa dibangun';const i=s.pend,o=s.own[i];
  if(a.y){const c=lvCost(i,o.h||0);if(p.cash<c)return 'Yep Coin-mu kurang';p.cash-=c;o.h=(o.h||0)+1;ev.push({t:'build',id,i,h:o.h})}else ev.push({t:'pass',id});
  endTurn(s,s.pdbl)}

 else return 'Aksi tidak dikenal'}
 return done(s,ev)}
function done(s,ev){s.seq++;s.ts=Date.now();if(s.status==='play'&&alive(s).length<2)finish(s);if(s.status==='end')ev.push({t:'end'});logEv(s,ev);return null}
function logEv(s,ev){s.last=[...(Array.isArray(s.last)?s.last:[]),{seq:s.seq,ev}].slice(-8)}
function startGame(s){if(s.status!=='lobby')return 'Sudah jalan';const ids=s.ord.filter(id=>s.pl[id].ch);if(ids.length<2)return 'Minimal 2 pemain yang sudah pilih bidak';
 s.ord=ids;for(const id in s.pl){if(!s.pl[id].ch){delete s.pl[id];continue}Object.assign(s.pl[id],{cash:s.set.cash,pos:0,jail:0,dbl:0,out:false})}
 Object.assign(s,{status:'play',tn:0,ph:'roll',pend:-1,own:{},rank:null,endsAt:Date.now()+s.set.min*60000,seq:s.seq+1,last:[{seq:s.seq+1,ev:[{t:'go'}]}],ts:Date.now()});return null}
// komputer: putuskan aksi berikutnya
function botMove(s,id){const p=s.pl[id],jago=p.lvl==='jago';
 if(s.ph==='buy'){const i=s.pend,t=TILES[i],left=p.cash-t.p;let win=null;if(left>=0){s.own[i]={by:id,h:0};win=monopoly(s,id);delete s.own[i]}
  return{k:'buy',y:!!win||(jago?left>=50:left>=150&&Math.random()<.65)}}
 if(s.ph==='build'){const c=lvCost(s.pend,s.own[s.pend].h||0);return{k:'build',y:jago?p.cash>c+150:p.cash>c+400&&Math.random()<.5}}
 return{k:'roll',pw:Math.random()}}
/*ENGINE-END*/

// ===== ALAT BANTU TAMPILAN =====
const $=q=>document.querySelector(q),el=(tag,cls,html)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e};
const esc=t=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=n=>Math.round(n).toLocaleString('id-ID');
const wait=ms=>new Promise(r=>setTimeout(r,FAST?ms*.3:ms));
const img=k=>`./assets/${k}.webp`;
let toastT;function toast(t,err){const e=$('#toast');e.textContent=t;e.className='on'+(err?' err':'');clearTimeout(toastT);toastT=setTimeout(()=>e.className='',err?3200:2200)}
function show(id){document.querySelectorAll('.screen').forEach(s=>s.classList.toggle('on',s.id===id))}
async function busy(btn,label,fn){if(btn.disabled)return;btn.disabled=true;btn.classList.add('busy');label&&toast(label);
 try{return await fn()}catch(e){console.error(e);toast(e.msg||'Gagal, coba lagi ya',1)}finally{btn.disabled=false;btn.classList.remove('busy')}}
const fail=m=>{const e=new Error(m);e.msg=m;return e};

// ===== SUARA (dibuat langsung, tanpa file) =====
let AC;function snd(type){try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const now=AC.currentTime;
 const tone=(f,t0,d,w='sine',v=.18,f2)=>{const o=AC.createOscillator(),g=AC.createGain();o.type=w;o.frequency.setValueAtTime(f,now+t0);if(f2)o.frequency.exponentialRampToValueAtTime(f2,now+t0+d);g.gain.setValueAtTime(v,now+t0);g.gain.exponentialRampToValueAtTime(.001,now+t0+d);o.connect(g).connect(AC.destination);o.start(now+t0);o.stop(now+t0+d)};
 ({tuk:()=>tone(520,0,.09,'triangle',.22,300),ting:()=>{tone(1320,0,.25);tone(1760,.12,.35)},koin:()=>{for(let i=0;i<5;i++)tone(1500+i*120,i*.07,.18,'square',.05)},
 dadu:()=>{for(let i=0;i<6;i++)tone(200+Math.random()*300,i*.06,.05,'square',.06)},sirene:()=>{for(let i=0;i<3;i++){tone(700,i*.5,.25,'sawtooth',.08,1100);tone(1100,i*.5+.25,.25,'sawtooth',.08,700)}},
 boom:()=>{tone(160,0,.8,'sawtooth',.3,40)},yey:()=>[523,659,784,1046].forEach((f,i)=>tone(f,i*.13,.3,'triangle',.18)),aduh:()=>tone(500,0,.5,'triangle',.2,180),kartu:()=>tone(880,0,.12,'triangle',.15,1200),bangun:()=>{tone(330,0,.1,'square',.1);tone(440,.1,.1,'square',.1);tone(660,.2,.25,'triangle',.15)}})[type]()}catch(e){}}

// ===== PAPAN =====
let BH=300;const L=$('#layer');
// papan diatur supaya SEMUA kotak terlihat di antara panel kiri & kanan (tidak tertutup tombol)
function fit(){const lw=$('#left').offsetWidth+10,rw=$('#right').offsetWidth+10,wa=innerWidth-lw-rw,H=innerHeight;
 BH=Math.min(H*IH/850,wa*IH/1540);document.documentElement.style.setProperty('--bh',BH+'px');const bw=BH*IW/IH;
 camE.style.left=lw+wa/2-800/IW*bw+'px';camE.style.top=H/2-452/IH*BH+'px';camReset()}
const pct=(x,y)=>({left:x/IW*100+'%',top:y/IH*100+'%'});
function spot(x,y,z){const e=el('div','at');Object.assign(e.style,pct(x,y));e.style.zIndex=z??Math.round(y);L.appendChild(e);return e}
// gambar dengan titik pijak tepat di (x,y); ukuran ditentukan dari lebar koin/alas = w (piksel papan)
function setSprite(box,key,w){const a=A[key]||[.5,.9,1,.8];let im=box.firstChild;if(!im){im=el('img','sp');im.alt='';box.appendChild(im)}
 if(im.dataset.k!==key){im.src=img(key);im.dataset.k=key}const W=w/a[3];im.style.width=`calc(var(--bh)*${W/IH})`;im.style.height=`calc(var(--bh)*${W/a[2]/IH})`;im.style.setProperty('--ax',-a[0]*100+'%');im.style.setProperty('--ay',-a[1]*100+'%')}
const tileSize=i=>Math.min(T[i][5],95);
const lowPt=i=>{const t=T[i];return[t[0]-(t[2]-t[0])*.95,t[1]-(t[3]-t[1])*1.6]};
let houseEl={},ownEl={},tgtEl=[];
// nama negara: [geser-x, lebar muka kotak] diukur dari gambar papan supaya pas di tengah muka kotak
const LB={1:[19,124],2:[26,115],4:[23,113],5:[23,106],6:[23,108],9:[-15,96],10:[-14,93],11:[-15,93],12:[-15,90],13:[-17,90],14:[-19,90],15:[-18,92],16:[-18,90],18:[16,88],20:[16,88],21:[15,91],22:[15,96],23:[14,96],24:[14,97],25:[14,99],27:[-25,109],28:[-24,107],30:[-24,112],31:[-24,114],32:[-23,118],33:[-19,125]};
const TQ={"1": [682.4, 641.2, 764.0, 689.3, 648.4, 762.2, 569.3, 712.5], "2": [603.6, 594.9, 676.5, 637.8, 561.4, 707.5, 490.9, 663.2], "3": [528.5, 550.7, 598.2, 591.7, 483.4, 658.5, 416.0, 616.1], "4": [457.4, 508.8, 523.6, 547.8, 409.1, 611.8, 345.1, 571.5], "5": [389.1, 468.6, 452.9, 506.2, 338.6, 567.4, 277.0, 528.7], "6": [321.7, 428.9, 384.8, 466.1, 270.6, 524.7, 209.8, 486.4], "7": [259.8, 392.4, 322.9, 429.6, 208.6, 485.7, 147.8, 447.5], "9": [171.0, 311.9, 240.1, 283.2, 324.5, 333.5, 256.9, 363.1], "10": [246.1, 280.7, 314.5, 252.3, 399.0, 301.0, 332.0, 330.3], "11": [320.2, 249.9, 385.9, 222.6, 470.5, 269.8, 406.2, 297.9], "12": [391.2, 220.4, 455.1, 193.9, 539.8, 239.6, 477.3, 266.9], "13": [459.9, 191.9, 521.7, 166.3, 606.5, 210.5, 546.1, 236.8], "14": [525.9, 164.5, 585.5, 139.7, 670.6, 182.5, 612.3, 208.0], "15": [589.9, 137.9, 648.0, 113.8, 733.2, 155.2, 676.5, 179.9], "16": [652.2, 112.0, 709.6, 88.2, 795.1, 128.2, 739.0, 152.7], "18": [946.1, 90.1, 1003.4, 114.6, 917.7, 153.3, 861.4, 128.3], "19": [1007.4, 116.3, 1066.2, 141.5, 980.8, 181.4, 923.1, 155.7], "20": [1070.4, 143.3, 1130.3, 168.9, 1045.2, 210.0, 986.3, 183.9], "21": [1134.6, 170.8, 1196.5, 197.3, 1111.7, 239.6, 1050.9, 212.6], "22": [1201.1, 199.3, 1265.9, 227.0, 1181.2, 270.6, 1117.6, 242.3], "23": [1270.1, 228.8, 1336.7, 257.3, 1252.3, 302.2, 1186.9, 273.1], "24": [1341.6, 259.4, 1409.0, 288.2, 1324.8, 334.4, 1258.5, 304.9], "25": [1414.3, 290.5, 1484.5, 320.6, 1400.4, 368.1, 1331.4, 337.4], "27": [1339.3, 427.7, 1398.1, 393.0, 1516.5, 449.4, 1459.4, 484.9], "28": [1274.1, 466.1, 1334.6, 430.5, 1452.4, 489.2, 1393.7, 525.7], "29": [1206.2, 506.2, 1269.0, 469.2, 1386.4, 530.2, 1325.3, 568.2], "30": [1135.9, 547.6, 1200.9, 509.3, 1317.8, 572.8, 1254.6, 612.1], "31": [1062.1, 591.2, 1130.2, 551.0, 1246.7, 617.0, 1180.4, 658.2], "32": [984.5, 636.9, 1055.8, 594.9, 1172.1, 663.4, 1102.6, 706.5], "33": [897.2, 688.4, 978.0, 640.8, 1093.9, 711.9, 1015.3, 760.8]};
function frame(){let h='';for(const k in TQ){const i=+k,t=TILES[i],q=TQ[k],[x0,y0,x1,y1,,,x3,y3]=q,W=Math.hypot(x1-x0,y1-y0),H=Math.hypot(x3-x0,y3-y0),
  inUp=i<8||i>26,bh=H*.2,ins=W*.05,top=inUp?ins:H-ins-bh,mx=W/2,cy=inUp?H*.58:H*.42,fs=Math.min(W*.25,H*.17),nm=t.n==='Pabrik Snack'?'Snack':t.n,tl=Math.min(W*.88,nm.length*fs*.6);
 h+=`<g transform="matrix(${(x1-x0)/W} ${(y1-y0)/W} ${(x3-x0)/H} ${(y3-y0)/H} ${x0} ${y0})">`;
 if(BUYABLE.has(t.t)){const c=t.t==='prop'?GC[t.g]:'#2F5FC9';
  h+=`<rect x="${ins}" y="${top}" width="${W-ins*2}" height="${bh}" rx="${bh*.25}" fill="${c}"/><rect x="${ins}" y="${top}" width="${W-ins*2}" height="${bh*.35}" rx="${bh*.2}" fill="#fff" opacity=".25"/>`;
  h+=`<text class="tn" x="${mx}" y="${cy-fs*.35}" font-size="${fs}" textLength="${tl}" lengthAdjust="spacingAndGlyphs">${nm}</text><text class="tpz" x="${mx}" y="${cy+fs*.85}" font-size="${fs*.8}">${t.p} YC</text>`}
 h+='</g>';
 if(t.t==='chance'||t.t==='fund'){const cx=(q[0]+q[2]+q[4]+q[6])/4,cyy=(q[1]+q[3]+q[5]+q[7])/4,z=Math.min(W,H)*.75;h+=`<image href="${img(t.k)}" x="${cx-z/2}" y="${cyy-z/2}" width="${z}" height="${z}"/>`}}
 const v=document.createElementNS('http://www.w3.org/2000/svg','svg');v.setAttribute('viewBox',`0 0 ${IW} ${IH}`);v.setAttribute('class','frame');v.innerHTML=h+`<image href="${img('tiang')}" x="457" y="164" width="152" height="75"/>`;L.appendChild(v)}
function buildBoard(){L.innerHTML='';frame();houseEl={};ownEl={};
 TILES.forEach((t,i)=>{const [cx,cy,,,w,h]=T[i],sz=tileSize(i);
  const lb=['prop','air','util'].includes(t.t);
  if(t.k&&!lb&&!['chance','fund'].includes(t.t)){const e=spot(cx,t.t==='gojail'?cy-h*.06:cy,5);const im=el('img');im.src=img(t.k);im.alt='';const H=sz*(lb?.55:t.t==='gojail'?.55:.8);im.style.cssText=`height:calc(var(--bh)*${H/IH});--ax:-50%;--ay:${lb?-50:-55}%`;e.className='at ico';e.appendChild(im)}
  if(['start','rest','jail','gojail'].includes(t.t)){const c=el('div','corner',t.t==='start'?'START<br>+200':t.t==='rest'?'ISTIRAHAT':t.t==='jail'?'':'MASUK<br>PENJARA');Object.assign(c.style,pct(cx,cy+(t.t==='jail'?h*.32:t.t==='gojail'?h*.27:0)));c.style.zIndex=6;if(t.t==='gojail')c.style.fontSize=`calc(var(--bh)*${h*.13/IH})`;L.appendChild(c)}

  const tp=el('div','tap');Object.assign(tp.style,pct(cx,cy));tp.style.cssText+=`;width:${w/IW*100}%;height:${h/IH*100}%;z-index:4`;tp.onclick=()=>!drag.moved&&tileInfo(i);L.appendChild(tp)})}
// tanda tujuan: lingkaran emas berdenyut di kotak tempat bidak akan mendarat + angka dadu
function showTarget(i,n){hideTarget();const [cx,cy,,,w,h]=T[i],a=spot(cx,cy,9),b=spot(cx,cy,400);a.classList.add('tg');b.classList.add('tg');
 a.innerHTML=`<i class="tr" style="width:calc(var(--bh)*${w*.62/IH});height:calc(var(--bh)*${h*.5/IH})"></i>`;b.innerHTML=`<b class="tp">${n}</b>`;tgtEl=[a,b]}
function hideTarget(){tgtEl.forEach(e=>e.remove());tgtEl=[]}
function renderOwn(s){for(const i in ownEl){if(!s.own[i]||s.own[i].by!==ownEl[i].by){ownEl[i].e.remove();delete ownEl[i]}}
 for(const i in houseEl){const o=s.own[i];if(!o||!o.h){houseEl[i].remove();delete houseEl[i]}}
 for(const i in s.own){const o=s.own[i],p=s.pl[o.by];if(!p)continue;const sz=tileSize(i),w=T[i][4];
  if(!ownEl[i]){const d=el('div','own'),[ox,oy,ow]=ownPt(i);Object.assign(d.style,pct(ox,oy));d.style.cssText+=`;width:calc(var(--bh)*${ow*.22/IH});height:calc(var(--bh)*${ow*.22/IH});border-color:${CC[p.ch]};background-image:url(${img('bidak-'+p.ch)});z-index:8`;L.appendChild(d);ownEl[i]={e:d,by:o.by}}
  if(o.h){const [bx,by,bw]=bandPt(i);let e=houseEl[i];if(!e){e=houseEl[i]=spot(bx,by,Math.round(by)+20)}const [k,ph]=lvSprite(i,o.h);setSprite(e,k,bw*[0,.36,.42,.48,.52][o.h]);e.classList.toggle('lmk',o.h===4);
   let c=e.querySelector('.hcount');if(ph&&o.h%2===0){if(!c){c=el('div','hcount');e.appendChild(c)}c.textContent=o.h===2?'G':'★'}else c&&c.remove()}}}
// gambar bangunan; kalau gambar gedung/landmark belum ada, pakai pengganti (ph=1)
const ASSET_OK=new Set();
function ownPt(i){const [x0,y0,x1,y1,,,x3,y3]=TQ[i],f=i<8||i>26?.84:.16;return[x0+(x1-x0)*.84+(x3-x0)*f,y0+(y1-y0)*.84+(y3-y0)*f,Math.hypot(x1-x0,y1-y0)]}
function bandPt(i){const [x0,y0,x1,y1,,,x3,y3]=TQ[i],f=i<8||i>26?.17:.83;return[(x0+x1)/2+(x3-x0)*f,(y0+y1)/2+(y3-y0)*f,Math.hypot(x1-x0,y1-y0)]}
function lvSprite(i,h){if(h===4)return[TILES[i].k,0];const g=['','rumah','gedung','hotel'][h];return ASSET_OK.has(g)?[g,0]:[['','rumah','rumah','hotel'][h],1]}
// bidak
let pcEl={},disp={};
function pieceXY(s,id,pos){const same=s.ord.filter(o=>!s.pl[o].out&&(disp[o]??s.pl[o].pos)===pos),k=same.indexOf(id),n=same.length,t=T[pos];
 const off=n>1?(k-(n-1)/2)*t[4]*.26:0;return[t[0]+off,t[1]+(n>1?(k%2?-1:1)*t[5]*.05:0)]}
function placePiece(s,id,pos,ex){const p=s.pl[id];let e=pcEl[id];if(!e){e=pcEl[id]=el('div','at pc');L.appendChild(e)}
 if(p.out){e.style.display='none';return}e.style.display='';const [x,y]=pieceXY(s,id,pos);Object.assign(e.style,pct(x,y));e.style.zIndex=50+Math.round(y);
 setSprite(e,ex?`${p.ch}-${ex}`:'bidak-'+p.ch,tileSize(pos)*(p.ch==='ippo'?1.12:1)*.95);e.classList.toggle('act',cur(s)===id&&s.status==='play')}
function renderPieces(s){for(const id in pcEl)if(!s.pl[id]){pcEl[id].remove();delete pcEl[id]}for(const id of s.ord)if(s.pl[id])placePiece(s,id,disp[id]??s.pl[id].pos)}
const exprT={};function expr(s,id,ex,ms=1400){if(!s.pl[id])return;clearTimeout(exprT[id]);placePiece(s,id,disp[id]??s.pl[id].pos,ex);exprT[id]=setTimeout(()=>placePiece(S,id,disp[id]??S.pl[id]?.pos),ms)}

// ===== KAMERA: geser, cubit untuk zoom, ikut bidak =====
const cam={x:0,y:0,z:1},camE=$('#cam'),drag={moved:false};
function camApply(){camE.style.transform=`translate(${cam.x}px,${cam.y}px) scale(${cam.z})`}
function camReset(){cam.x=0;cam.y=0;cam.z=1;camApply()}
function camFocus(x,y,z=1.6){const b=$('#board').getBoundingClientRect(),bw=BH*IW/IH,ox=b.left-cam.x,oy=b.top-cam.y,px=x/IW*bw,py=y/IH*BH;
 cam.z=z;cam.x=innerWidth/2-ox-px*z;cam.y=innerHeight/2-oy-py*z;clampCam();camApply()}
function clampCam(){const bw=BH*IW/IH,mx=Math.max(0,(bw*cam.z-innerWidth)/2+innerWidth*.1),my=Math.max(0,(BH*cam.z-innerHeight)/2+innerHeight*.1),ox=camE.offsetLeft,oy=camE.offsetTop,
 cx=ox+cam.x+bw*cam.z/2-innerWidth/2,cy=oy+cam.y+BH*cam.z/2-innerHeight/2;cam.x-=cx-Math.max(-mx,Math.min(mx,cx));cam.y-=cy-Math.max(-my,Math.min(my,cy))}
(()=>{const v=$('#view'),pts=new Map();let st=null;
 v.addEventListener('pointerdown',e=>{pts.set(e.pointerId,[e.clientX,e.clientY]);drag.moved=false;camE.classList.add('drag');st={c:{...cam},p:[...pts.values()]}});
 v.addEventListener('pointermove',e=>{if(!pts.has(e.pointerId))return;pts.set(e.pointerId,[e.clientX,e.clientY]);const q=[...pts.values()];if(!st||q.length!==st.p.length){st={c:{...cam},p:q};return}
  if(q.length===1){const dx=q[0][0]-st.p[0][0],dy=q[0][1]-st.p[0][1];if(Math.hypot(dx,dy)>6)drag.moved=true;if(st.c.z>1){cam.x=st.c.x+dx;cam.y=st.c.y+dy}}
  else{drag.moved=true;const d0=Math.hypot(st.p[0][0]-st.p[1][0],st.p[0][1]-st.p[1][1]),d1=Math.hypot(q[0][0]-q[1][0],q[0][1]-q[1][1]),z=Math.max(1,Math.min(3,st.c.z*d1/d0));
   const mx=(q[0][0]+q[1][0])/2,my=(q[0][1]+q[1][1])/2;cam.x=mx-(mx-st.c.x)*z/st.c.z;cam.y=my-(my-st.c.y)*z/st.c.z;cam.z=z}
  if(cam.z<=1){cam.x=0;cam.y=0}clampCam();camApply()});
 const up=e=>{pts.delete(e.pointerId);st=pts.size?{c:{...cam},p:[...pts.values()]}:null;if(!pts.size)camE.classList.remove('drag')};
 v.addEventListener('pointerup',up);v.addEventListener('pointercancel',up);
 v.addEventListener('wheel',e=>{e.preventDefault();cam.z=Math.max(1,Math.min(3,cam.z*(e.deltaY<0?1.15:.87)));if(cam.z<=1){cam.x=0;cam.y=0}clampCam();camApply()},{passive:false})})();

// ===== EFEK =====
const FX=$('#fx');
function banner(t,red){const b=el('div','banner'+(red?' red':''));b.textContent=t;FX.appendChild(b);setTimeout(()=>b.remove(),1700)}
function coins(n=14){for(let i=0;i<n;i++){const c=el('img','coin');c.src=img('koin');c.alt='';c.style.left=Math.random()*96+'%';c.style.animationDelay=Math.random()*.6+'s';FX.appendChild(c);setTimeout(()=>c.remove(),2200)}}
function flash(){const f=el('div','flash');FX.appendChild(f);setTimeout(()=>f.remove(),1300)}
function shake(){const g=$('#view');g.classList.remove('shake');void g.offsetWidth;g.classList.add('shake')}
const PIPS={1:[4],2:[0,8],3:[0,4,8],4:[0,2,6,8],5:[0,2,4,6,8],6:[0,2,3,5,6,8]};
function face(d,n){d.innerHTML='';for(let k=0;k<9;k++)d.appendChild(PIPS[n].includes(k)?el('b'):el('span'))}
async function rollDice(d,pw){const box=$('#dice'),ds=box.querySelectorAll('.die');box.classList.add('on');ds.forEach(x=>{x.classList.remove('land');x.classList.add('roll')});snd('dadu');
 const ms=600+pw*900,t0=Date.now();while(Date.now()-t0<ms){ds.forEach(x=>face(x,r6()));await wait(90)}
 ds.forEach((x,k)=>{x.classList.remove('roll');face(x,d[k]);x.classList.add('land')});snd('tuk');await wait(650)}
const hideDice=()=>$('#dice').classList.remove('on');

// ===== KEADAAN APLIKASI =====
let FAST=false,backlog=0;
let S=null,ME=null,MODE=null,shownSeq=0,animating=false,queue=Promise.resolve(),net=null,unsub=null,roomCode='';
const nameOf=id=>S.pl[id]?.nm||'Pemain';

// putar urutan kejadian dari aksi terakhir, lalu gambar keadaan akhir
function onState(s){const prev=S;S=s;
 if(s.status==='lobby'){shownSeq=s.seq;disp={};return renderLobby()}
 if(!$('#game').classList.contains('on')){show('game');buildBoard();fit();disp={};for(const id of s.ord)disp[id]=s.pl[id].pos;shownSeq=s.seq;renderAll();tick();bot();return}
 const L=Array.isArray(s.last)?s.last:s.last?[s.last]:[],nw=L.filter(x=>x.seq>shownSeq);
 if(nw.length){if(nw[0].seq>shownSeq+1&&shownSeq)toast('Menyusul permainan…');shownSeq=nw[nw.length-1].seq;
  for(const x of nw){backlog++;queue=queue.then(()=>{FAST=backlog>1;return play(x.ev)}).then(()=>backlog--)}queue=queue.then(()=>{FAST=false;renderAll();bot()})}
 else if(!animating)renderAll()}
async function play(ev){animating=true;renderCtrl();
 try{for(const [k,e] of ev.entries()){const p=S.pl[e.id];
  switch(e.t){
  case 'roll':{await rollDice(e.d,e.pw);const m=ev.slice(k+1).find(x=>x.t==='mv'&&x.id===e.id);if(m){const t=m.path[m.path.length-1];showTarget(t,e.d[0]+e.d[1]);camFocus(T[t][0],T[t][1],1.3);await wait(1100)}break}
  case 'mv':{hideDice();const t=e.path[e.path.length-1];camFocus(T[t][0],T[t][1],1.5);
   for(const pos of e.path){disp[e.id]=pos;const pc=pcEl[e.id];placePiece(S,e.id,pos,e.jump?'kaget':'senang');if(pc){pc.classList.remove('hop');void pc.offsetWidth;pc.classList.add('hop')}snd('tuk');await wait(e.jump?420:260)}
   hideTarget();placePiece(S,e.id,disp[e.id]);await wait(150);break}
  case 'start':snd('koin');coins(10);banner(`${nameOf(e.id)} +200 YC`);await wait(700);break;
  case 'rent':snd('aduh');expr(S,e.id,'kaget',1800);expr(S,e.to,'sombong',1800);banner(`Bayar sewa ${fmt(e.a)} YC`,1);await wait(1500);break;
  case 'card':snd('kartu');await cardPop(e);break;
  case 'jail':disp[e.id]=JAIL;hideDice();snd('sirene');flash();banner('MASUK PENJARA!',1);camFocus(T[JAIL][0],T[JAIL][1],1.5);renderPieces(S);expr(S,e.id,'nangis',2200);await wait(1800);break;
  case 'stay':hideDice();banner('Belum bebas dari penjara',1);expr(S,e.id,'nangis');await wait(1100);break;
  case 'free':banner('Bebas dari penjara!');expr(S,e.id,'senang');await wait(900);break;
  case 'buy':snd('ting');coins(12);banner(`${TILES[e.i].n} jadi milik ${nameOf(e.id)}!`);expr(S,e.id,'senang');await wait(1200);break;
  case 'pass':hideDice();break;
  case 'build':snd('bangun');banner(['','Rumah baru!','Gedung berdiri!','Hotel berdiri!','Landmark jadi!'][e.h]);if(e.h>3)coins(14);renderOwn(S);await wait(e.h>3?1500:900);break;
  case 'mono':snd('yey');coins(30);banner(`${nameOf(e.id)} menang! ${e.w==='line'?'Satu deret dikuasai':'3 warna lengkap'}`);await wait(2200);break;
  case 'sell':banner(`${nameOf(e.id)} jual aset buat bayar`,1);await wait(1100);break;
  case 'bank':snd('boom');shake();flash();banner(`${nameOf(e.id)} BANGKRUT!`,1);expr(S,e.id,'nangis',2500);await wait(2000);break;
  case 'go':banner('Berangkat!');snd('yey');break;
  case 'end':break}}
 }catch(err){console.error(err)}
 hideDice();hideTarget();for(const id of S.ord)disp[id]=S.pl[id]?.pos;setTimeout(camReset,250);animating=false;if(S.status==='end')endScreen()}

function renderAll(){if(!S||S.status==='lobby')return;renderOwn(S);renderPieces(S);renderSide();renderCtrl()}
function renderSide(){const box=$('#left');box.innerHTML='';
 for(const id of S.ord){const p=S.pl[id];if(!p)continue;const d=el('div','panel pl'+(cur(S)===id&&S.status==='play'?' turn':'')+(p.out?' out':''));
  const f=el('div','face');f.style.borderColor=CC[p.ch];f.style.backgroundImage=`url(${img('bidak-'+p.ch)})`;const tx=el('div');const b=el('b');b.textContent=p.nm+(id===ME?' (kamu)':'');
  const c=el('span','cash',`<img src="${img('koin')}" alt="">${fmt(p.cash)} YC${p.jail?' · penjara':''}`);tx.append(b,c);d.append(f,tx);box.appendChild(d)}}
let powT=null;
function renderCtrl(){const c=$('#ctrl');clearInterval(powT);c.innerHTML='';closeModal('buy');if(!S||S.status!=='play')return;
 const id=cur(S),p=S.pl[id],mine=id===ME;
 if(animating){c.appendChild(el('div','panel wait','Sedang jalan…'));return}
 if(!mine){const w=el('div','panel wait');w.innerHTML=`<img src="${img(p.ch+'-mikir')}" alt=""><b></b>`;w.querySelector('b').textContent=`Giliran ${p.nm}…`;c.appendChild(w);
  if(MODE==='online'&&S.host===ME&&Date.now()-S.ts>40000){const k=el('button','btn r sm','Lewati giliran');k.onclick=()=>busy(k,'Sedang melewati giliran…',()=>send({k:'skip'}));c.appendChild(k)}return}
 if(S.ph==='buy')return buyCard();
 if(S.ph==='build')return buildCard();

 const bar=el('div','power','<i></i>'),i=bar.firstChild,btn=el('button','btn y btnStop','STOP!');let v=0,dir=1;
 powT=setInterval(()=>{v+=dir*4;if(v>=100||v<=0)dir*=-1;i.style.width=v+'%'},30);
 btn.onclick=()=>{clearInterval(powT);busy(btn,null,()=>send({k:'roll',pw:v/100}))};
 const hint=el('div','panel wait',p.jail?(p.jail>=2?'Giliran ini kamu bebas dari penjara':'Di penjara: dadu kembar = bebas, kalau tidak tunggu 1 giliran'):'Giliranmu! Tekan STOP');c.append(hint,bar,btn)}

// ===== KARTU & JENDELA =====
function openModal(html,tag){const m=$('#modal'),b=$('#mbox');b.innerHTML=html;b.dataset.tag=tag||'';m.classList.add('on');return b}
function closeModal(tag){const m=$('#modal');if(!tag||$('#mbox').dataset.tag===tag)m.classList.remove('on')}
$('#modal').onclick=e=>{if(e.target.id==='modal'&&$('#mbox').dataset.tag!=='buy')closeModal()};
function tileInfo(i){const t=TILES[i],o=S?.own?.[i];let rows='';
 if(t.t==='prop'){const r=rentBase(t.p);rows=`<table class="tbl"><tr><td>Sewa tanah</td><td>${r} YC</td></tr><tr><td>Satu warna lengkap</td><td>${r*2} YC</td></tr>${[1,2,3,4].map(h=>`<tr><td>${LVN[h]} (${lvCost(i,h-1)} YC)</td><td>${fmt(r*RM[h])} YC</td></tr>`).join('')}</table>`}
 else if(t.t==='air')rows='<p>Sewa 50 YC, kalau punya 2 bandara jadi 100 YC</p>';else if(t.t==='util')rows='<p>Sewa = angka dadu × 4, kalau punya Wifi & Pabrik Snack jadi × 10</p>';
 else rows={start:'<p>Lewat sini dapat 200 YC</p>',jail:'<p>Cuma mampir, aman</p>',rest:'<p>Santai dulu, tidak terjadi apa-apa</p>',gojail:'<p>Berhenti di sini = masuk penjara!</p>',chance:'<p>Ambil kartu Kesempatan</p>',fund:'<p>Ambil kartu Dana Umum</p>'}[t.t];
 const own=o&&S.pl[o.by]?`<p>Milik <b>${esc(S.pl[o.by].nm)}</b>${o.h?` · ${LVN[o.h].toLowerCase()}`:''}</p>`:t.p?`<p>Harga ${t.p} YC · belum ada pemiliknya</p>`:'';
 openModal(`<div class="mhead" style="background:${t.t==='prop'?GC[t.g]:'#2F5FC9'}">${t.t==='prop'?'NEGARA':'PETAK'}</div><div class="mbody">${t.k?`<img class="big" src="${img(t.k)}" alt="">`:''}<h3>${esc(t.n)}</h3>${own}${rows}<button class="btn b sm" id="mx">Tutup</button></div>`);$('#mx').onclick=()=>closeModal()}
function buyCard(){const i=S.pend,t=TILES[i],p=S.pl[ME],ok=p.cash>=t.p;expr(S,ME,'mikir',60000);
 const b=openModal(`<div class="mhead" style="background:linear-gradient(180deg,#3FA36E,#2A7D52)">VISA DISETUJUI</div><img class="stamp" src="${img('cap')}" alt=""><div class="mbody"><img class="big" src="${img(t.k)}" alt=""><h3>${esc(t.n)}</h3><p>Harga ${t.p} YC · Yep Coin-mu ${fmt(p.cash)} YC</p>${ok?'':'<p><b>Yep Coin-mu belum cukup</b></p>'}<div class="row"><button class="btn b" id="bNo">Lewati</button><button class="btn y" id="bYes"${ok?'':' disabled'}>Beli Tanah!</button></div></div>`,'buy');
 b.querySelector('#bYes').onclick=e=>busy(e.target,'Sedang membeli tanah…',()=>send({k:'buy',y:true}));b.querySelector('#bNo').onclick=e=>busy(e.target,null,()=>send({k:'buy',y:false}))}
function buildCard(){const i=S.pend,t=TILES[i],h=S.own[i].h||0,c=lvCost(i,h),p=S.pl[ME],ok=p.cash>=c;expr(S,ME,'mikir',60000);
 const b=openModal(`<div class="mhead" style="background:linear-gradient(180deg,#3FA36E,#2A7D52)">BANGUN</div><div class="mbody"><img class="big" src="${img(t.k)}" alt=""><h3>${esc(t.n)}</h3><p>${LVN[h]} → <b>${LVN[h+1]}</b> · ${c} YC</p><p>Sewa jadi ${fmt(rentBase(t.p)*RM[h+1])} YC · Yep Coin-mu ${fmt(p.cash)} YC</p><div class="row"><button class="btn b" id="bNo">Lewati</button><button class="btn y" id="bYes"${ok?'':' disabled'}>Bangun ${LVN[h+1]}!</button></div></div>`,'buy');
 b.querySelector('#bYes').onclick=e=>busy(e.target,'Sedang membangun…',()=>send({k:'build',y:true}));b.querySelector('#bNo').onclick=e=>busy(e.target,null,()=>send({k:'build',y:false}))}
async function cardPop(e){const ch=e.d==='chance';openModal(`<div class="mhead" style="background:${ch?'#E0664F':'#1C2B4D'}">${ch?'KESEMPATAN':'DANA UMUM'}</div><div class="mbody"><img class="big" src="${img(ch?'kartu-kesempatan':'kartu-dana')}" alt=""><p style="font-size:17px;color:#2A2010"><b>${esc(e.tx)}</b></p>${e.a?`<h3>${e.a>0?'+':''}${e.a} YC</h3>`:''}</div>`,'card');
 if(e.a>0)coins(8);await wait(2600);closeModal('card')}
function endScreen(){closeModal();const r=S.rank||[],win=S.pl[r[0]?.id];snd('yey');coins(24);
 const b=openModal(`<div class="mhead" style="background:linear-gradient(180deg,#F5B82E,#C98A10)">JUARA KELILING DUNIA</div><div class="mbody">${win?`<img class="big" src="${img(win.ch+'-menang')}" alt=""><h3>${esc(win.nm)}</h3>${r[0].why?`<p><b>Menang monopoli: ${r[0].why==='line'?'satu deret dikuasai':'3 warna lengkap'}</b></p>`:''}`:''}<div class="rank">${r.map(({id,w},k)=>`<div><span>${k+1}. ${esc(S.pl[id]?.nm||'')}</span><span>${w<0?'bangkrut':fmt(w)+' YC'}</span></div>`).join('')}</div><div class="row"><button class="btn b sm" id="eHome">Ke Menu</button>${MODE==='solo'||S.host===ME?'<button class="btn y sm" id="eAgain">Main Lagi</button>':''}</div></div>`,'end');
 b.querySelector('#eHome').onclick=leave;const a=b.querySelector('#eAgain');if(a)a.onclick=()=>busy(a,'Sedang menyiapkan…',again)}

// ===== WAKTU =====
let tickT;function tick(){clearInterval(tickT);tickT=setInterval(()=>{if(!S||S.status!=='play')return;const ms=Math.max(0,S.endsAt-Date.now()),m=Math.floor(ms/60000),s=Math.floor(ms/1000)%60;
 $('#timer').textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;$('.timer').classList.toggle('low',ms<60000);
 if(!ms&&!animating&&!tickBusy){tickBusy=true;send({k:'time'}).catch(()=>{}).finally(()=>tickBusy=false)}
 if(MODE==='online'&&S.host===ME&&!animating&&cur(S)!==ME&&Date.now()-S.ts>40000&&!$('#ctrl .btn.r'))renderCtrl()},500)}
let tickBusy=false;

// ===== MAIN SENDIRI =====
const LV={};
function solo(){MODE='solo';ME='me';const s=newState({mode:'solo',host:'me'});s.pl.me={nm:myName(),ch:'ippo'};s.ord=['me'];S=s;renderLobby()}
function soloBots(){const s=S;for(const id of Object.keys(s.pl))if(id!=='me')delete s.pl[id];s.ord=['me'];
 const left=CH.filter(c=>c!==s.pl.me.ch);for(let k=0;k<s.set.bots;k++){const id='bot'+k;s.pl[id]={nm:'Komputer '+(k+1),ch:left[k],bot:1,lvl:s.set.lvl};s.ord.push(id)}}
let botT;function bot(){clearTimeout(botT);if(MODE!=='solo'||!S||S.status!=='play'||animating)return;const id=cur(S);if(!S.pl[id].bot)return;
 botT=setTimeout(()=>{if(animating||cur(S)!==id)return;const a=botMove(S,id);send(a,id).catch(()=>{})},S.ph!=='roll'?1100:900)}

// ===== MAIN BARENG (Firebase) =====
async function fbInit(){if(net)return net;if(!CONFIG.firebase.apiKey)throw fail('Main Bareng belum disiapkan (isi CONFIG Firebase dulu). Main Sendiri tetap bisa.');
 if(!navigator.onLine)throw fail('Butuh internet untuk Main Bareng');
 const u=`https://www.gstatic.com/firebasejs/${FB_VER}/`,[ap,au,fs]=await Promise.all([import(u+'firebase-app.js'),import(u+'firebase-auth.js'),import(u+'firebase-firestore.js')]);
 const app=ap.initializeApp(CONFIG.firebase),auth=au.getAuth(app),db=fs.getFirestore(app);const cred=await au.signInAnonymously(auth);
 return net={fs,db,uid:cred.user.uid}}
const roomRef=c=>net.fs.doc(net.db,'rooms',c);
async function tx(fn){return net.fs.runTransaction(net.db,async t=>{const snap=await t.get(roomRef(roomCode));if(!snap.exists())throw fail('Room tidak ditemukan');const s=snap.data();const r=fn(s);if(r)throw fail(r);t.set(roomRef(roomCode),s)})}
function listen(){unsub&&unsub();unsub=net.fs.onSnapshot(roomRef(roomCode),snap=>{if(!snap.exists()){toast('Room sudah tidak ada',1);return leave()}onState(snap.data())},e=>{console.error(e);toast('Koneksi terputus, mencoba lagi…',1)})}
async function createRoom(){await fbInit();MODE='online';ME=net.uid;
 for(let k=0;k<6;k++){const c=String(1000+Math.floor(Math.random()*9000));
  const ok=await net.fs.runTransaction(net.db,async t=>{const sn=await t.get(roomRef(c));if(sn.exists())return false;const s=newState({mode:'online',host:ME});s.pl[ME]={nm:myName(),ch:''};s.ord=[ME];s.exp=Date.now()+864e5;t.set(roomRef(c),s);return true});
  if(ok){roomCode=c;listen();return}}throw fail('Gagal membuat room, coba lagi')}
async function joinRoom(c){if(!/^\d{4}$/.test(c))throw fail('Kode room harus 4 angka');await fbInit();MODE='online';ME=net.uid;roomCode=c;
 await tx(s=>{if(s.pl[ME])return null;if(s.status!=='lobby')return 'Permainan di room ini sudah jalan';if(s.ord.length>=4)return 'Room sudah penuh (4 pemain)';s.pl[ME]={nm:myName(),ch:''};s.ord.push(ME);return null});listen()}
// kirim aksi: main sendiri langsung dihitung di HP, main bareng lewat transaksi Firebase
async function send(a,who='me'){if(MODE==='solo'){const s=structuredClone(S),r=act(s,who,a);if(r)throw fail(r);onState(s);return}
 await tx(s=>act(s,ME,a))}
async function again(){if(MODE==='solo'){const s=S;s.status='lobby';onState(s);return}
 await tx(s=>{if(s.host!==ME)return 'Hanya pembuat room';s.status='lobby';for(const id in s.pl)Object.assign(s.pl[id],{out:false});s.seq++;return null})}

// ===== RUANG TUNGGU =====
function pills(box,vals,cur,lab,can,on){box.innerHTML='';vals.forEach(v=>{const b=el('button','pill'+(v===cur?' on':''));b.textContent=lab(v);b.disabled=!can;b.onclick=()=>can&&on(v,b);box.appendChild(b)})}
function renderLobby(){closeModal();show('lobby');const s=S,host=s.host===ME,lb=$('#lobby');lb.classList.toggle('online',MODE==='online');$('#kodeBox').style.display=MODE==='online'?'':'none';$('#kodeTxt').textContent=roomCode;
 const used={};for(const id in s.pl)if(s.pl[id].ch&&!(MODE==='solo'&&id!=='me'))used[s.pl[id].ch]=id;
 const pk=$('#picks');pk.innerHTML='';CH.forEach(ch=>{const id=used[ch],d=el('div','panel pick'+(ch==='ippo'?' star':'')+(id===ME?' mine':id?' taken':''));
  d.innerHTML=`<img src="${img('bidak-'+ch)}" alt="Bidak"><div class="who"></div>`;d.querySelector('.who').textContent=id?(id===ME?'Pilihanmu':'Dipakai '+s.pl[id].nm):'Masih kosong';
  d.onclick=()=>pickCh(ch,d);pk.appendChild(d)});
 const setOpt=(k,v,b)=>{if(MODE==='solo'){S.set[k]=v;renderLobby()}else busy(b,null,()=>tx(x=>{if(x.host!==ME)return 'Hanya pembuat room';x.set[k]=v;return null}))};
 pills($('#oMin'),[30,45,60],s.set.min,v=>v+' mnt',host,(v,b)=>setOpt('min',v,b));pills($('#oCash'),[1500,2000],s.set.cash,fmt,host,(v,b)=>setOpt('cash',v,b));
 pills($('#oBots'),[1,2,3],s.set.bots,v=>v+' komputer',1,(v,b)=>setOpt('bots',v,b));pills($('#oLvl'),['santai','jago'],s.set.lvl,v=>v[0].toUpperCase()+v.slice(1),1,(v,b)=>setOpt('lvl',v,b));
 $('#penumpang').textContent=MODE==='online'?`Pemain (${s.ord.length}/4): ${s.ord.map(id=>s.pl[id].nm+(s.pl[id].ch?' ✓':'')).join(', ')}`:'Pilih bidakmu, sisanya dipakai komputer';
 const go=$('#bBerangkat');go.style.display=host?'':'none';if(!host)$('#penumpang').textContent+=' · Menunggu pembuat room menekan Berangkat'}
function pickCh(ch,d){if(MODE==='solo'){S.pl.me.ch=ch;return renderLobby()}d.style.pointerEvents='none';toast('Sedang memilih bidak…');
 tx(s=>{if(s.status!=='lobby')return 'Permainan sudah jalan';for(const id in s.pl)if(id!==ME&&s.pl[id].ch===ch)return 'Bidak ini sudah dipilih orang lain';s.pl[ME].ch=ch;return null}).catch(e=>toast(e.msg||'Gagal memilih, coba lagi',1)).finally(()=>d.style.pointerEvents='')}
$('#bBerangkat').onclick=e=>busy(e.currentTarget,'Sedang menyiapkan perjalanan…',async()=>{
 if(MODE==='solo'){if(!S.pl.me.ch)throw fail('Pilih bidakmu dulu');S=structuredClone(S);soloBots();const s=structuredClone(S);S.status='lobby';const r=startGame(s);if(r)throw fail(r);onState(s);return}
 await tx(s=>s.host!==ME?'Hanya pembuat room':startGame(s))});
$('#bBatal').onclick=leave;

// ===== MENU & NAVIGASI =====
function myName(){return($('#nama').value.trim().replace(/[<>]/g,'')||'Pemain').slice(0,12)}
function leave(){unsub&&unsub();unsub=null;clearTimeout(botT);closeModal();S=null;MODE=null;roomCode='';pcEl={};disp={};show('home')}
$('#bMenu').onclick=()=>{const b=openModal(`<div class="mhead" style="background:#2F5FC9">MENU</div><div class="mbody"><p>${MODE==='online'?'Kode room: <b>'+roomCode+'</b>':'Main sendiri'}</p><div class="row"><button class="btn b sm" id="m1">Lanjut main</button><button class="btn r sm" id="m2">Keluar</button></div><p class="small">${MODE==='online'?'Kalau keluar, bidakmu tetap di papan dan giliranmu bisa dilewati pembuat room.':'Kalau keluar, permainan ini hilang.'}</p></div>`);b.querySelector('#m1').onclick=()=>closeModal();b.querySelector('#m2').onclick=leave};
$('#bReset').onclick=camReset;
const needName=()=>{if(!$('#nama').value.trim()){toast('Tulis namamu dulu ya',1);$('#nama').focus();return true}try{localStorage.setItem('yt-nama',myName())}catch(e){}};
$('#bSendiri').onclick=()=>{if(!needName())solo()};
$('#bBareng').onclick=e=>{if(!needName())busy(e.currentTarget,'Sedang membuat room…',createRoom)};
$('#bMasuk').onclick=e=>{if(!needName())busy(e.currentTarget,'Sedang masuk room…',()=>joinRoom($('#kode').value.trim()))};
$('#bPasang').onclick=()=>{const b=openModal(`<div class="mhead" style="background:#2F5FC9">PASANG DI HP</div><div class="mbody" style="text-align:left"><p><b>Android / laptop (Chrome):</b> buka menu ⋮ lalu pilih <b>Instal aplikasi</b>.</p><p><b>iPhone / iPad (Safari):</b> tekan tombol Bagikan, lalu <b>Tambah ke Layar Utama</b>.</p><button class="btn b sm" id="mx">Tutup</button></div>`);b.querySelector('#mx').onclick=()=>closeModal()};
try{$('#nama').value=localStorage.getItem('yt-nama')||''}catch(e){}
addEventListener('resize',()=>{if(S&&S.status!=='lobby'){fit();}});
document.addEventListener('pointerdown',()=>{try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();AC.resume()}catch(e){}},{once:true});
if(location.hash==='#uji')window.YT={get S(){return S},onState,send};
if('serviceWorker'in navigator)navigator.serviceWorker.register('./sw.js').catch(()=>{});
