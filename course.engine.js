// ===================== ОБУЧЕНИЕ =====================
// Урок: теория основы → вспомни основу → теория блюда → тест по блюду … → «что есть что» по фото → итоговый тест (+ вопросы из прошлых уроков).
// Ошибка возвращает вопрос через пару шагов, пока не ответишь верно. Утром и вечером — повторение вперемешку.
document.head.insertAdjacentHTML("beforeend",`<style>
.learn-hero{display:flex;flex-direction:column;gap:10px;align-items:flex-start}
.today .task{display:grid;grid-template-columns:34px 1fr auto;gap:12px;align-items:center;padding:12px 0;border-top:1px solid var(--line)}
.today .task:first-of-type{border-top:0}
.today .dot{width:30px;height:30px;border-radius:50%;border:1.5px solid color-mix(in srgb,var(--ink) 25%,transparent);display:grid;place-items:center}
.today .dot svg{width:16px;height:16px;opacity:0}
.today .task.done .dot{background:var(--green);border-color:var(--green);color:var(--green-ink)}.today .task.done .dot svg{opacity:1}
.today .task b{font:600 17px var(--display);display:block}
.today .task span{font-size:14px;color:var(--muted)}
.today .btn{padding:9px 16px;font-size:16px}
.units{display:flex;flex-direction:column;gap:10px}
.unit{display:grid;grid-template-columns:52px 1fr auto;gap:14px;align-items:center;text-align:left;background:var(--paper);border:1px solid var(--line);border-radius:18px;padding:14px;cursor:pointer;transition:transform .15s}
.unit:hover{transform:translateY(-1px)}
.unit .num{width:52px;height:52px;border-radius:50%;display:grid;place-items:center;background:var(--soft);font:700 20px var(--display)}
.unit .num svg{width:22px;height:22px}
.unit.done .num{background:var(--green);color:var(--green-ink)}
.unit.now{border-color:var(--green);box-shadow:0 0 0 3px var(--green-soft)}
.unit.now .num{background:var(--peach);color:var(--peach-ink)}
.unit h3{margin:0;font:700 18px var(--display)}
.unit p{margin:2px 0 0;font-size:14px;color:var(--muted)}
.unit .st{font-size:13px;font-weight:600;color:var(--green);text-align:right;white-space:nowrap}
.stars{color:var(--peach-ink);letter-spacing:2px;font-size:16px;margin:0}
.bchips{display:flex;flex-wrap:wrap;gap:6px}
.bchip{font-size:13px;padding:4px 10px;border-radius:99px;background:var(--soft);color:var(--muted)}
.bchip.on{background:var(--green-soft);color:var(--ink)}
.kick2{font:600 12px var(--body);letter-spacing:.14em;text-transform:uppercase;color:var(--green)}
.ings{margin:0;padding:0;list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:8px;counter-reset:n}
.ings li{counter-increment:n;display:flex;gap:10px;align-items:center;background:var(--paper);border:1px solid var(--line);border-radius:12px;padding:10px 12px;font:500 17px/1.2 var(--display)}
.ings li::before{content:counter(n);flex:none;width:26px;height:26px;border-radius:50%;background:var(--green-soft);color:var(--green);display:grid;place-items:center;font:700 13px var(--body)}
.ings li span::first-letter,.pchip b::first-letter{text-transform:uppercase}
.hook{background:var(--peach);color:var(--peach-ink);border-radius:16px;padding:14px 16px;display:flex;flex-direction:column;gap:2px}
.hook small{font:600 11px var(--body);letter-spacing:.14em;text-transform:uppercase;opacity:.8}
.hook p{margin:0;font:500 25px/1.15 var(--hand)}
.tip{margin:0;font-size:15px;color:var(--muted)}
.thumbs{display:flex;gap:10px;overflow-x:auto;padding-bottom:4px}
.thumbs figure{margin:0;flex:none;width:84px;display:flex;flex-direction:column;gap:4px;font-size:12px;color:var(--muted);text-align:center}
.thumbs img{width:84px;height:84px;object-fit:cover;border-radius:12px}
.formula{display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:center}
.bpill{background:var(--green);color:var(--green-ink);font:600 16px var(--display);padding:7px 14px;border-radius:99px}
.fplus{font:700 22px var(--display);color:var(--muted)}
.pchip{background:var(--paper);border:1.5px solid var(--green);border-radius:12px;padding:7px 12px;font:500 16px/1.2 var(--display);display:flex;flex-direction:column}
.pchip small{font:400 12px var(--body);color:var(--muted)}
.baseline{margin:0;text-align:center;font-size:14px;color:var(--muted)}
.term{text-decoration:underline dotted color-mix(in srgb,var(--ink) 55%,transparent);text-underline-offset:3px;cursor:help}
.secscr{display:flex;flex-direction:column;gap:14px;align-items:center;text-align:center;padding:30px 10px}
.secscr .big{font-size:84px;color:var(--green)}
.phgrid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.phopt{border:2px solid var(--line);border-radius:16px;background:var(--paper);padding:6px;cursor:pointer}
.phopt img{width:100%;aspect-ratio:1/1;object-fit:cover;border-radius:12px;display:block}
.phopt.ok{border-color:var(--green);box-shadow:0 0 0 3px var(--green-soft)}.phopt.no{border-color:var(--bad)}.phopt.dim{opacity:.45}
.phopt:disabled{cursor:default}
.counter{font-size:14px;color:var(--muted);text-align:center;margin:0}
.ans{background:var(--paper);border:1px solid var(--line);border-radius:14px;padding:12px 14px;display:flex;flex-direction:column;gap:8px}
.ans .formula{justify-content:flex-start}
.sheet .ans{background:var(--bg)}
@media (max-width:760px){.ings{grid-template-columns:1fr}}
</style>`);

const CO=/*COURSE*/null, GL=/*GLOSS*/[];
const C_START="2026-10-22",EXAM="2026-10-31";
const MON=["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];
const fmtD=k=>{const [,m,d]=k.split("-").map(Number);return d+" "+MON[m-1]};
const dDiff=(a,b)=>Math.round((new Date(b+"T12:00")-new Date(a+"T12:00"))/864e5);
const nrm=s=>s.toLowerCase().replace(/ё/g,"е");
const lab=s=>s.split(" (")[0];
const det=s=>{const i=s.indexOf(" (");return i<0?"":s.slice(i+2).replace(/\)$/,"")};
const plural=(n,a,b,c)=>{const m=n%10,h=n%100;return m===1&&h!==11?a:m>=2&&m<=4&&(h<12||h>14)?b:c};

const BL={};
Object.entries(CO.bases).forEach(([id,b])=>BL[id]={...b,id,kind:"base"});
Object.entries(CO.modules).forEach(([id,m])=>BL[id]={...m,id,kind:"module"});
const EXT={plush:{from:"puff",add:["глютен","мёд цветочный","меланж"]}};
const MFIND={custard:"заварной крем",gel:"гель нейтральный",syrup:"сироп",frangipane:"франжипан",glaze:"глазурь сахарная",ganache:"взбитый ганаш",soak:"пропитка"};
const ITEMS=[];
CO.units.forEach((u,i)=>{u.n=i+1;u.items.forEach(it=>{it.u=u;it.d=D.find(d=>d.name===it.name);ITEMS.push(it)})});
const IT=n=>ITEMS.find(x=>x.name===n);
const STOP2=new Set([...STOP,"начин","основ","тесто","крем","крем»"]);
const st2=t=>nrm(t).replace(/[()«»:,.;]/g," ").split(/\s+/).filter(w=>w.length>=4).map(w=>w.slice(0,5)).filter(w=>!STOP2.has(w));
ITEMS.forEach(it=>{it.txt=nrm(it.d.comp.join(" ")+" "+it.name);it.st=new Set(st2(it.txt));it.parts=(it.own||it.plus).map(lab)});
const usedIn=id=>BL[id].kind==="base"?ITEMS.filter(it=>it.base===id||(id==="puff"&&it.base==="plush")):ITEMS.filter(it=>it.txt.includes(MFIND[id]));
// ингредиент «есть в блюде»: по тексту памятки, по корню слова или по ярлыку — такие не годятся в неверные варианты
const inDish=(l,it)=>it.txt.includes(nrm(l))||st2(l).some(s=>it.st.has(s))||it.parts.some(p=>nrm(p)===nrm(l));
const LABELS=[...new Set([...ITEMS.flatMap(it=>it.parts),...Object.values(BL).flatMap(b=>b.ings)])];
function decoysL(n,bad,prefer=[]){
  const out=[];for(const l of [...shuffle(prefer),...shuffle(LABELS)]){if(out.length>=n)break;if(!bad(l)&&!out.some(o=>nrm(o)===nrm(l)))out.push(l)}return out;
}

// ---------- глоссарий ----------
const GLK=[];GL.forEach((g,i)=>g[1].forEach(k=>GLK.push([k,i])));GLK.sort((a,b)=>b[0].length-a[0].length);
function tm(s){const n=nrm(s),h=GLK.find(([k])=>n.includes(k));return h?`<span class="term" data-g="${h[1]}" tabindex="0">${esc(s)}</span>`:esc(s)}
function openGloss(i){const g=GL[i];const where=ITEMS.filter(it=>g[1].some(k=>it.txt.includes(k)));
  $("#sh-in").innerHTML=`<div class="top"><p class="h3" id="sh-t">${esc(g[0])}</p><button class="round" id="sh-x" aria-label="Закрыть">${I.x}</button></div><p style="margin:0;font-size:17px">${esc(g[2])}</p>${where.length?`<p class="muted" style="font-size:14px">Встречается в: ${where.map(it=>esc(it.name)).join(", ")}</p>`:""}`;
  $("#scrim").hidden=$("#sheet").hidden=false;$("#sh-x").onclick=closeSheet}
document.addEventListener("click",e=>{const t=e.target.closest(".term");if(t){e.preventDefault();e.stopPropagation();openGloss(+t.dataset.g)}},true);
document.addEventListener("keydown",e=>{const t=e.target.closest&&e.target.closest(".term");if(t&&(e.key==="Enter"||e.key===" ")){e.preventDefault();openGloss(+t.dataset.g)}});

// ---------- хранение ----------
let CP=store.get("pomnyu-course",{done:{},exam:null});
let PLAN=store.get("pomnyu-plan",{});
let RUN=store.get("pomnyu-run",null);
const saveCP=()=>store.set("pomnyu-course",CP),savePlan=()=>store.set("pomnyu-plan",PLAN),saveRun=()=>store.set("pomnyu-run",RUN);
const doneUnits=()=>CO.units.filter(u=>CP.done[u.id]);
function planMark(k){const t=dayKey();PLAN[t]=PLAN[t]||{};PLAN[t][k]=true;savePlan()}

// ---------- вопросы ----------
const pchips=list=>list.map(p=>`<span class="pchip"><b>${tm(lab(p))}</b>${det(p)?`<small>${esc(det(p))}</small>`:""}</span>`).join("");
function formulaHTML(it,withBase){
  if(it.own)return `<div class="formula"><span class="bpill">Свой состав</span></div><div class="formula">${pchips(it.own)}</div>`;
  const b=BL[it.base];
  return `<div class="formula"><span class="bpill">${esc(b.name)}</span>${it.plus.length?`<span class="fplus">+</span>${pchips(it.plus)}`:`<span class="muted">и больше ничего</span>`}</div>
  ${withBase?`<p class="baseline">${esc(b.name)}: ${b.ings.map(esc).join(", ")}</p>`:""}`;
}
const blockAns=b=>`<div class="ans"><b>${esc(b.name)}</b><span>${b.ings.map(esc).join(", ")}</span></div>`;
function qRecall(id){
  const b=BL[id];
  if(EXT[id]){const e=EXT[id],base=BL[e.from],all=[...e.add,...base.ings],bs=new Set(all.flatMap(st2));
    const dec=decoysL(5,l=>all.some(x=>nrm(x)===nrm(l))||st2(l).some(s=>bs.has(s)),Object.values(BL).flatMap(x=>x.ings));
    return {multi:true,title:"Вспомни основу",prompt:`Что добавляют к слоёному тесту, чтобы получилось «${b.name}»?`,sub:"Отметь все добавки.",
      opts:shuffle([...e.add.map(l=>({l,ok:true})),...dec.map(l=>({l,ok:false}))]),ans:`<div class="ans"><b>${esc(b.name)} = ${esc(base.name)} +</b><span>${e.add.join(", ")}</span></div>`}}
  const bs=new Set(b.ings.flatMap(st2));
  const dec=decoysL(Math.min(6,Math.max(4,Math.round(b.ings.length*.8))),l=>b.ings.some(x=>nrm(x)===nrm(l))||st2(l).some(s=>bs.has(s)),Object.values(BL).filter(x=>x.id!==id).flatMap(x=>x.ings));
  return {multi:true,title:b.kind==="base"?"Вспомни основу":"Вспомни модуль",prompt:`Из чего состоит «${b.name}»?`,sub:"Отметь все ингредиенты. Сколько их, не подсказываем.",
    opts:shuffle([...b.ings.map(l=>({l,ok:true})),...dec.map(l=>({l,ok:false}))]),ans:blockAns(b)};
}
function qPlus(it){
  const ok=it.plus.map(lab),prefer=ITEMS.filter(o=>o!==it&&(o.u===it.u||o.base===it.base)).flatMap(o=>o.parts);
  const dec=decoysL(Math.min(5,Math.max(3,ok.length)),l=>inDish(l,it),prefer);
  return {item:it.name,multi:true,title:"Что добавляют к основе?",prompt:`«${it.name}» = ${BL[it.base].name} + …`,sub:`Выбери ${ok.length}.`,photo:it.name,
    opts:shuffle([...ok.map(l=>({l,ok:true})),...dec.map(l=>({l,ok:false}))]),ans:formulaHTML(it)};
}
function qSame(it){
  const prefer=ITEMS.filter(o=>o.base===it.base&&o!==it).flatMap(o=>o.parts);
  const dec=decoysL(3,l=>inDish(l,it),prefer);
  return {item:it.name,multi:false,title:"Что добавляют к основе?",prompt:`«${it.name}» = ${BL[it.base].name} + …`,photo:it.name,
    opts:shuffle([{l:"ничего, это чистая основа",ok:true},...dec.map(l=>({l,ok:false}))]),ans:formulaHTML(it,true)};
}
function qOwn(it){
  const ok=it.own.map(lab),prefer=ITEMS.filter(o=>o!==it&&o.u===it.u).flatMap(o=>o.parts);
  const dec=decoysL(Math.min(5,Math.max(3,ok.length-2)),l=>inDish(l,it),prefer);
  return {item:it.name,multi:true,title:"Собери состав",prompt:`Что входит в «${it.name}»?`,sub:`Выбери ${ok.length}.`,photo:it.name,
    opts:shuffle([...ok.map(l=>({l,ok:true})),...dec.map(l=>({l,ok:false}))]),ans:formulaHTML(it)};
}
const qPO=it=>it.own?qOwn(it):it.plus.length?qPlus(it):qSame(it);
function others(it,n,f=()=>true){
  const a=shuffle(ITEMS.filter(o=>o!==it&&o.u===it.u&&f(o))),b=shuffle(ITEMS.filter(o=>o!==it&&o.u!==it.u&&o.d.cat===it.d.cat&&f(o))),c=shuffle(ITEMS.filter(o=>o!==it&&f(o)));
  const out=[];for(const o of [...a,...b,...c]){if(out.length>=n)break;if(!out.includes(o))out.push(o)}return out;
}
function qPhoto(it){return {item:it.name,multi:false,title:"Что на фото?",prompt:"Назови позицию",photo:it.name,showPhoto:true,opts:shuffle([it,...others(it,3)].map(o=>({l:o.name,ok:o===it}))),ans:formulaHTML(it)}}
function qPick(it){return {item:it.name,multi:false,pics:true,title:"Найди на фото",prompt:`Где «${it.name}»?`,opts:shuffle([it,...others(it,3)].map(o=>({l:o.name,ok:o===it}))),ans:formulaHTML(it)}}
const GENERIC=new Set(["сироп","гель нейтральный","взбитый ганаш","лимонная глазурь","масло сливочное","мука пшеничная в/с","меланж","сахар","разрыхлитель"]);
function qWhich(it){
  for(const l of shuffle(it.parts.filter(p=>!GENERIC.has(p)))){
    const os=others(it,3,o=>!inDish(l,o));if(os.length<3)continue;
    return {item:it.name,multi:false,title:"В каком блюде?",prompt:`Где есть «${l}»?`,sub:"Только в одном из этих блюд.",opts:shuffle([it,...os].map(o=>({l:o.name,ok:o===it}))),ans:formulaHTML(it)};
  }
  return qPhoto(it);
}
function qBaseOf(it){
  if(!it.base)return qPO(it);
  const ids=shuffle(Object.keys(CO.bases).filter(b=>b!==it.base)).sort((a,b)=>it.u.bases.includes(b)-it.u.bases.includes(a)).slice(0,3);
  return {item:it.name,multi:false,title:"На какой основе?",prompt:`«${it.name}»: на какой основе?`,photo:it.name,opts:shuffle([it.base,...ids].map(b=>({l:BL[b].name,ok:b===it.base}))),ans:formulaHTML(it,true)};
}
function genQ(s){
  if(s.g==="recall")return qRecall(s.id);
  return ({plus:qPlus,same:qSame,own:qOwn,po:qPO,photo:qPhoto,pick:qPick,which:qWhich,baseof:qBaseOf})[s.g](IT(s.name));
}

// ---------- сборка урока / повторения / экзамена ----------
function buildLesson(u){
  const seen=new Set(CO.units.slice(0,u.n-1).flatMap(x=>x.bases)),S=[];let part=0;
  if(u.bases.length||u.modules.length){
    S.push({t:"sec",n:++part,title:u.bases.length?"Основа":"Модули",text:u.bases.length?`Сначала то, на чём всё держится: ${u.bases.map(b=>"«"+BL[b].name+"»").join(" и ")}. Выучишь основу, и половина состава каждого блюда уже в голове.`:"Общие части, которые повторяются в нескольких десертах."});
    u.bases.forEach(b=>{if(seen.has(b))S.push({t:"test",g:"recall",id:b,tag:"Повторение"});else S.push({t:"theory",id:b},{t:"test",g:"recall",id:b})});
    u.modules.forEach(m=>S.push({t:"theory",id:m},{t:"test",g:"recall",id:m}));
  }
  S.push({t:"sec",n:++part,title:"Позиции",text:`${u.items.length} ${plural(u.items.length,"позиция","позиции","позиций")}. Для каждой сначала формула «основа + что добавили», потом сразу проверка.`});
  u.items.forEach(it=>S.push({t:"item",name:it.name},{t:"test",g:it.own?"own":it.plus.length?"plus":"same",name:it.name}));
  S.push({t:"sec",n:++part,title:"Что есть что",text:"Узнаём по фото. На смене ты видишь витрину, а не список."});
  shuffle(u.items).slice(0,6).forEach(it=>S.push({t:"test",g:"photo",name:it.name}));
  shuffle(u.items).slice(0,2).forEach(it=>S.push({t:"test",g:"pick",name:it.name}));
  S.push({t:"sec",n:++part,title:"Итоговый тест",text:"Вперемешку, плюс пара вопросов из прошлых уроков, чтобы старое не забывалось."});
  const fin=shuffle(u.items).slice(0,6).map((it,k)=>({t:"test",g:["which","po","baseof"][k%3],name:it.name}));
  shuffle(ITEMS.filter(it=>it.u.n<u.n)).slice(0,2).forEach(it=>fin.push({t:"test",g:shuffle(["po","photo","which"])[0],name:it.name,tag:"Из прошлого урока"}));
  S.push(...shuffle(fin),{t:"end"});
  return S;
}
function weightPick(pool,n){ // слабые места чаще
  const w=pool.map(it=>{const s=stats[it.name]||[0,0];return Math.max(.4,1+s[1]*1.5-s[0]*.3)}),out=[],idx=pool.map((_,i)=>i);
  while(out.length<n&&idx.length){const tot=idx.reduce((a,i)=>a+w[i],0);let r=Math.random()*tot,k=0;for(;k<idx.length-1;k++){r-=w[idx[k]];if(r<=0)break}out.push(pool[idx.splice(k,1)[0]])}
  return out;
}
function buildMix(units,n){
  const pool=ITEMS.filter(it=>units.includes(it.u)),S=[];
  weightPick(pool,n).forEach(it=>S.push({t:"test",g:shuffle(["po","po","photo","which","baseof","pick"])[0],name:it.name}));
  const bs=[...new Set(units.flatMap(u=>[...u.bases,...u.modules]))];
  shuffle(bs).slice(0,Math.ceil(n/5)).forEach(b=>S.splice(Math.random()*S.length|0,0,{t:"test",g:"recall",id:b}));
  S.push({t:"end"});return S;
}
function startRun(mode,opt={}){
  let steps,title;
  if(mode==="lesson"){const u=CO.units.find(x=>x.id===opt.uid);steps=buildLesson(u);title=`Урок ${u.n} · ${u.title}`}
  else if(mode==="exam"){steps=buildMix(CO.units,24);title="Экзамен"}
  else{const us=doneUnits();steps=buildMix(us.length?us:[CO.units[0]],8);title=opt.slot==="ev"?"Вечернее закрепление":opt.slot==="weak"?"Слабые места":"Утренняя разминка"}
  RUN={mode,uid:opt.uid||null,slot:opt.slot||null,title,steps,i:0,ok:0,tot:0,errs:[],xp:0};saveRun();renderRun();
}

// ---------- прохождение ----------
function runShell(body){
  const n=RUN.steps.length,i=RUN.i;
  $("#view").innerHTML=`<section class="game"><div class="gbar"><button class="back" id="gback" aria-label="Выйти, прогресс сохранится">${I.back}</button><p class="h3">${esc(RUN.title)}</p><span></span></div>
  <div class="bar"><i style="width:${Math.min(100,i/Math.max(1,n-1)*100)}%"></i></div>${body}</section>`;
  $("#gback").onclick=()=>go("learn");scrollTo({top:0});
}
function next(){RUN.i++;saveRun();renderRun()}
function renderRun(){
  if(!RUN)return go("learn");
  const s=RUN.steps[RUN.i];
  if(s.t==="sec"){runShell(`<div class="secscr"><span class="kick2">Часть ${s.n}</span><p class="big">${s.n}</p><p class="h2">${esc(s.title)}</p><p class="muted" style="max-width:440px">${esc(s.text)}</p><button class="btn green" id="go">Начать ${I.chev}</button></div>`);$("#go").onclick=next;$("#go").focus({preventScroll:true});return}
  if(s.t==="theory")return renderTheory(s);
  if(s.t==="item")return renderItem(s);
  if(s.t==="test")return renderTest(s);
  finishRun();
}
function renderTheory(s){
  const b=BL[s.id],use=usedIn(s.id),list=EXT[s.id]?[...EXT[s.id].add.map(x=>x+" — добавка"),"всё слоёное тесто"]:b.ings;
  runShell(`<span class="kick2">Теория · ${b.kind==="base"?"основа":"модуль"}</span><p class="h2">${esc(b.name)}</p>
    ${use.length?`<div class="thumbs">${use.slice(0,10).map(it=>`<figure>${img(it.d)}<figcaption>${esc(it.name)}</figcaption></figure>`).join("")}</div><p class="muted" style="font-size:14px">Встречается в ${use.length} ${plural(use.length,"позиции","позициях","позициях")}.</p>`:""}
    <ol class="ings">${list.map(x=>`<li><span>${tm(x)}</span></li>`).join("")}</ol>
    <div class="hook"><small>Зацепка</small><p>${esc(b.hook)}</p></div>
    ${b.tip?`<p class="tip">${esc(b.tip)}</p>`:""}
    <p class="muted" style="font-size:14px">Прочитай вслух, закрой глаза и перечисли про себя. Потом проверим.</p>
    <button class="btn green wide" id="go">Понятно, проверь меня ${I.chev}</button>`);
  $("#go").onclick=next;
}
function renderItem(s){
  const it=IT(s.name);
  runShell(`<span class="kick2">Теория · позиция</span>${img(it.d,"gphoto")}<p class="gname">${esc(it.name)}</p>
    ${formulaHTML(it,true)}
    <div class="hook"><small>Зацепка</small><p>${esc(it.hook)}</p></div>
    <details class="full"><summary>Полный состав из памятки</summary><div class="b">${compHTML(it.d)}</div></details>
    <button class="btn green wide" id="go">Проверь меня ${I.chev}</button>`);
  $("#go").onclick=next;
}
function renderTest(s){
  if(!s.q){s.q=genQ(s);saveRun()}
  const q=s.q,done=s.res!=null,sel=s.sel||[];
  const opts=q.pics?`<div class="phgrid" id="opts">${q.opts.map((o,i)=>{const cls=done?(o.ok?"ok":sel.includes(i)?"no":"dim"):"";return `<button class="phopt ${cls}" data-i="${i}" ${done?"disabled":""} aria-label="${esc(o.l)}">${img(IT(o.l).d)}</button>`}).join("")}</div>`
    :`<div class="opts" id="opts">${q.opts.map((o,i)=>{const on=sel.includes(i);const cls=done?(o.ok&&on?"ok":!o.ok&&on?"no":o.ok?(q.multi?"miss":"ok"):"dim"):"";
      return `<button class="opt ${cls}" data-i="${i}" ${!done&&q.multi?`aria-pressed="${on}"`:""} ${done?"disabled":""}><span class="cb">${cls==="no"?I.x:I.check}</span><span>${esc(o.l)}</span></button>`}).join("")}</div>`;
  runShell(`<span class="kick2">${esc(s.tag||(s.retry?"Ещё раз":"Тест"))} · ${esc(q.title)}</span>
    ${q.photo&&(q.showPhoto||done)?img(IT(q.photo).d,"gphoto"):""}
    <p class="gname">${esc(q.prompt)}</p>${!done&&q.sub?`<p class="gtask">${esc(q.sub)}</p>`:""}
    ${opts}
    ${done?`<p class="verdict ${s.res?"ok":"no"}">${s.res?"Верно":"Не совсем"} ${s.res&&!s.retry?"<small>+3 XP</small>":""}</p>
      ${!s.res&&q.multi?`<div class="legend"><span><i class="f"></i>верно</span><span><i class="r"></i>этого нет</span><span><i class="d"></i>пропущено</span></div>`:""}
      ${q.ans}${!s.res&&RUN.mode!=="exam"?`<p class="counter">Этот вопрос вернётся через пару шагов.</p>`:""}
      <button class="btn green wide" id="go">Дальше ${I.chev}</button>`
     :q.multi?`<button class="btn green wide" id="check" ${sel.length?"":"disabled"}>Проверить ${I.chev}</button>`:""}`);
  if(done){$("#go").onclick=next;$("#go").focus({preventScroll:true});return}
  const answer=()=>{
    const sl=s.sel||[],good=q.multi?q.opts.every((o,i)=>o.ok===sl.includes(i)):q.opts[sl[0]].ok;
    s.res=good;
    if(!s.retry){RUN.tot++;if(good){RUN.ok++;RUN.xp+=3;addXP(3)}}
    if(q.item)mark(IT(q.item).d,good);
    if(good)beep("ok");
    else{beep("bad");RUN.errs.push(q.item||BL[s.id].name);
      if(RUN.mode!=="exam"){const at=Math.min(RUN.i+3,RUN.steps.length-1);RUN.steps.splice(at,0,{t:"test",g:s.g,id:s.id,name:s.name,retry:true})}}
    saveRun();renderTest(s);
  };
  $("#opts").onclick=e=>{const b=e.target.closest("[data-i]");if(!b)return;const i=+b.dataset.i;
    if(q.multi){s.sel=s.sel||[];s.sel.includes(i)?s.sel.splice(s.sel.indexOf(i),1):s.sel.push(i);beep("tap");b.setAttribute("aria-pressed",s.sel.includes(i));$("#check").disabled=!s.sel.length}
    else{s.sel=[i];answer()}};
  if(q.multi)$("#check").onclick=answer;
}
function finishRun(){
  const R=RUN,pct=R.tot?Math.round(R.ok/R.tot*100):100,stars=pct>=90?3:pct>=75?2:1;let extra="";
  if(R.mode==="lesson"){const prev=CP.done[R.uid];if(!prev||pct>prev.pct)CP.done[R.uid]={pct,stars,date:dayKey()};saveCP();planMark("lesson");addXP(20);R.xp+=20}
  else if(R.mode==="exam"){if(!CP.exam||pct>=CP.exam.pct||CP.exam.date!==dayKey())CP.exam={pct,date:dayKey()};saveCP();planMark("lesson");addXP(50);R.xp+=50;extra=pct>=80?"Экзамен сдан. Составы ты знаешь.":"Пока ниже 80%. Повтори ошибки ниже и сдай ещё раз."}
  else planMark(R.slot==="ev"?"ev":R.slot==="weak"?"lesson":"am");
  beep("end");
  const errs=[...new Set(R.errs)];RUN=null;saveRun();
  const nextU=CO.units.find(u=>!CP.done[u.id]);
  $("#view").innerHTML=`<section class="game"><div class="panel final">
    <span class="kick2">${esc(R.title)}</span>
    <p class="big">${pct}<small>%</small></p>
    ${R.mode==="lesson"?`<p class="stars" aria-label="${stars} из 3">${"★".repeat(stars)}${"☆".repeat(3-stars)}</p>`:""}
    <p class="muted">${extra||(pct>=90?"Отлично, почти всё с первой попытки.":pct>=75?"Хорошо. Ошибки ниже повтори перед сном.":"Для первого раза нормально. Повтори ошибки и пройди урок ещё раз завтра утром.")}</p>
    <div class="stats"><div><b>${R.ok}/${R.tot}</b><span>с первой попытки</span></div><div><b>+${R.xp}</b><span>XP</span></div><div><b>${doneUnits().length}/${CO.units.length}</b><span>уроков</span></div></div>
    ${errs.length?`<div class="mist"><p class="h3">Повтори</p>${errs.map(n=>{const it=IT(n);
      if(!it){const b=Object.values(BL).find(x=>x.name===n);return b?`<details><summary><span>${esc(b.name)}</span></summary><div class="b">${blockAns(b)}</div></details>`:""}
      return `<details><summary>${img(it.d)}<span>${esc(it.name)}</span></summary><div class="b">${formulaHTML(it,true)}</div></details>`}).join("")}</div>`:""}
    <div class="row2"><button class="btn line" id="tol">К программе</button>${R.mode==="lesson"&&nextU?`<button class="btn green" id="nx">Урок ${nextU.n} ${I.chev}</button>`:`<button class="btn green" id="tol2">Готово</button>`}</div></div></section>`;
  $("#tol").onclick=()=>go("learn");if($("#tol2"))$("#tol2").onclick=()=>go("learn");if($("#nx"))$("#nx").onclick=()=>startRun("lesson",{uid:nextU.id});
  scrollTo({top:0});
}

// ---------- вкладка «Обучение» ----------
function learnTab(){
  const t=dayKey(),dn=dDiff(C_START,t)+1,left=dDiff(t,EXAM),done=doneUnits(),P=PLAN[t]||{};
  const last=CO.units[CO.units.length-1].date;
  const planned=CO.units.find(u=>u.date===t),nextU=CO.units.find(u=>!CP.done[u.id]);
  const behind=Math.max(0,CO.units.filter(u=>u.date<t).length-done.filter(u=>u.date<t).length); // сегодняшний урок ещё не долг
  const isExam=t>=EXAM,isWeak=t>last&&t<EXAM;
  const lessonU=planned&&!CP.done[planned.id]?planned:nextU;
  const contLesson=u=>RUN&&RUN.mode==="lesson"&&RUN.uid===u.id?renderRun():startRun("lesson",{uid:u.id});
  const mid=isExam?{t:"Экзамен: 24 вопроса",d:CP.exam?`Последний результат: ${CP.exam.pct}%. Сдано от 80%.`:"Все позиции и основы вперемешку. Сдано от 80%.",ok:!!(CP.exam&&CP.exam.date===t),run:()=>startRun("exam")}
    :lessonU?{t:`День: урок ${lessonU.n} «${lessonU.title}»`,d:`${lessonU.items.length} ${plural(lessonU.items.length,"позиция","позиции","позиций")} · 15–25 минут`,ok:!!P.lesson&&!!CP.done[lessonU.id],run:()=>contLesson(lessonU)}
    :{t:isWeak?"День: слабые места":"День: пробный экзамен",d:isWeak?"Все уроки пройдены. 8 вопросов про то, где ошибался чаще всего.":"24 вопроса вперемешку.",ok:!!P.lesson,run:()=>isWeak?startRun("review",{slot:"weak"}):startRun("exam")};
  const tasks=[
    {t:"Утро: разминка",d:done.length?"8 вопросов по пройденному. Вспоминай до того, как читать.":"Пока повторять нечего, начни с урока.",ok:!!P.am,can:done.length>0,run:()=>startRun("review",{slot:"am"})},
    {...mid,can:true},
    {t:"Вечер: закрепление",d:done.length?"Ещё 8 вопросов вперемешку. Лучше перед сном: сон закрепляет память.":"Откроется после первого урока.",ok:!!P.ev,can:done.length>0,run:()=>startRun("review",{slot:"ev"})}
  ];
  const learnedB=new Set(done.flatMap(u=>u.bases));
  $("#view").innerHTML=`
  <section class="learn-hero">
    <span class="pill">${I.cap}${left>0?`До экзамена ${left} ${plural(left,"день","дня","дней")} · 31 октября`:left===0?"Сегодня экзамен":"Курс завершён"}</span>
    <h1>Обучение</h1>
    <p class="sub">${ITEMS.length} позиций хлеба и выпечки через ${Object.keys(CO.bases).length} основ. Теория, потом тест, и так по кругу.</p>
    <p class="tip" id="syncline">${syncText()}</p>
  </section>
  ${RUN?`<div class="panel" style="display:flex;gap:14px;align-items:center;justify-content:space-between;flex-wrap:wrap"><div><span class="kick2">Не закончено</span><p class="h3">${esc(RUN.title)}</p><p class="muted">Шаг ${RUN.i+1} из ${RUN.steps.length}</p></div><button class="btn green" id="cont">Продолжить ${I.chev}</button></div>`:""}
  <section class="grid2">
    <div class="panel today"><span class="kick2">Сегодня · ${fmtD(t)}${dn>=1&&dn<=10?` · день ${dn} из 10`:""}</span>
      <p class="h2" style="margin:4px 0 6px">План на день</p>
      ${behind?`<p class="muted" style="color:var(--bad)">Отстаёшь от плана на ${behind} ${plural(behind,"урок","урока","уроков")}. Сегодня можно пройти два.</p>`:""}
      ${tasks.map((x,i)=>`<div class="task ${x.ok?"done":""}"><span class="dot">${I.check}</span><div><b>${esc(x.t)}</b><span>${esc(x.d)}</span></div><button class="btn ${x.ok?"line":"green"}" data-task="${i}" ${x.can?"":"disabled"}>${x.ok?"Ещё раз":"Начать"}</button></div>`).join("")}
    </div>
    <div class="panel lvl"><div class="hd"><p class="h2">Курс</p><span class="xp">${done.length} / ${CO.units.length} уроков</span></div>
      <div class="bar"><i style="width:${done.length/CO.units.length*100}%"></i></div>
      <p class="muted" style="font-size:14px">Основы, которые ты уже прошёл:</p>
      <div class="bchips">${Object.keys(CO.bases).map(b=>`<span class="bchip ${learnedB.has(b)?"on":""}">${esc(BL[b].name)}</span>`).join("")}</div>
      <button class="btn line" id="allb">Все основы на одной странице</button>
    </div>
  </section>
  <section class="wrap" style="gap:14px;width:100%">
    <div class="sechd"><p class="h2">Программа</p></div>
    <div class="units">${CO.units.map(u=>{const st=CP.done[u.id],now=u===lessonU&&!isExam,inprog=RUN&&RUN.uid===u.id;
      return `<button class="unit ${st?"done":""} ${now?"now":""}" data-u="${u.id}"><span class="num">${st?I.check:u.n}</span>
      <span><h3>${esc(u.title)}</h3><p>${fmtD(u.date)} · ${u.items.length} ${plural(u.items.length,"позиция","позиции","позиций")}${u.bases.length?" · "+u.bases.map(b=>BL[b].name).join(", "):""}</p></span>
      <span class="st">${st?`<span class="stars">${"★".repeat(st.stars)}${"☆".repeat(3-st.stars)}</span><br>${st.pct}%`:inprog?"продолжить":now?"сегодня":""}</span></button>`}).join("")}
      <button class="unit ${isWeak?"now":""}" data-u="weak"><span class="num">↺</span><span><h3>Слабые места</h3><p>29–30 октября · вопросы про то, где ошибался</p></span><span class="st"></span></button>
      <button class="unit ${CP.exam&&CP.exam.pct>=80?"done":""} ${isExam?"now":""}" data-u="exam"><span class="num">★</span><span><h3>Экзамен</h3><p>31 октября · 24 вопроса по всему курсу</p></span><span class="st">${CP.exam?CP.exam.pct+"%":""}</span></button>
    </div>
  </section>`;
  if($("#cont"))$("#cont").onclick=renderRun;
  document.querySelectorAll("[data-task]").forEach(b=>b.onclick=()=>{beep("tap");tasks[+b.dataset.task].run()});
  document.querySelectorAll("[data-u]").forEach(b=>b.onclick=()=>{beep("tap");const id=b.dataset.u;
    if(id==="exam")return startRun("exam");if(id==="weak")return startRun("review",{slot:"weak"});
    contLesson(CO.units.find(u=>u.id===id))});
  $("#allb").onclick=()=>{
    $("#sh-in").innerHTML=`<div class="top"><p class="h3" id="sh-t">Основы и модули</p><button class="round" id="sh-x" aria-label="Закрыть">${I.x}</button></div>
    ${Object.values(BL).map(b=>`<div class="ans"><span class="kick2">${b.kind==="base"?"Основа":"Модуль"}</span><b>${esc(b.name)}</b><span>${b.ings.map(tm).join(", ")}</span><span class="muted" style="font-size:13px">${esc(b.hook)}</span></div>`).join("")}`;
    $("#scrim").hidden=$("#sheet").hidden=false;$("#sh-x").onclick=closeSheet};
}

// ---------- облачное сохранение ----------
// Весь прогресс — один документ в личном разделе пользователя (data/users/<id>/progress), его видит только он.
// localStorage остаётся быстрым кэшем; при открытии побеждает более свежая копия (по времени изменения ts).
let SYNC="local",cloudRef=null,pushing=false,pushAgain=false,pushT=null,applying=false;
const SYNC_KEYS=new Set(["pomnyu-stats","pomnyu-recs","pomnyu-xp","pomnyu-days","pomnyu-cats2","pomnyu-sound","pomnyu-course","pomnyu-plan","pomnyu-run"]);
const rawSet=store.set.bind(store);
store.set=(k,v)=>{rawSet(k,v);if(!applying&&SYNC_KEYS.has(k)){rawSet("pomnyu-ts",Date.now());schedulePush()}};
const snapState=()=>JSON.parse(JSON.stringify({v:1,ts:store.get("pomnyu-ts",0),stats,recs,xp,days,cats:[...cats],sound,course:CP,plan:PLAN,run:RUN}));
function applyCloud(s){
  applying=true;
  try{
    stats=s.stats||{};recs=s.recs||{};xp=s.xp||0;days=s.days||[];
    if(Array.isArray(s.cats))cats=new Set(s.cats);if(typeof s.sound==="boolean")sound=s.sound;
    CP=s.course||{done:{},exam:null};PLAN=s.plan||{};RUN=s.run||null;
    [["pomnyu-stats",stats],["pomnyu-recs",recs],["pomnyu-xp",xp],["pomnyu-days",days],["pomnyu-cats2",[...cats]],["pomnyu-sound",sound],["pomnyu-course",CP],["pomnyu-plan",PLAN],["pomnyu-run",RUN]].forEach(([k,v])=>rawSet(k,v));
    rawSet("pomnyu-ts",s.ts||Date.now());
  }finally{applying=false}
  sndIcon();if(!document.querySelector("#view .game"))go(tab);
}
function schedulePush(){if(!cloudRef)return;clearTimeout(pushT);pushT=setTimeout(push,1200)}
async function push(){
  pushT=null;if(!cloudRef)return;if(pushing){pushAgain=true;return}
  pushing=true;setSync("saving");
  try{await cloudRef.set(snapState());setSync("cloud")}
  catch(e){if(e&&e.code==="unavailable")setTimeout(schedulePush,1500+Math.random()*2000);else{cloudRef=null;setSync("local")}}
  pushing=false;if(pushAgain){pushAgain=false;push()}
}
const syncText=()=>SYNC==="cloud"?"Прогресс сохраняется в твоём аккаунте: можно продолжать с любого устройства.":SYNC==="saving"?"Сохраняю прогресс…":"Прогресс пока хранится только в этом браузере.";
function setSync(s){SYNC=s;const el=$("#syncline");if(el)el.textContent=syncText()}
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden"&&pushT){clearTimeout(pushT);push()}});
(async()=>{
  try{
    if(!window.claude||!window.claude.use)return;
    const [db,user]=await Promise.all([claude.use("db"),claude.use("user")]);if(!db||!user)return;
    const uid=await user.id();if(!uid)return;
    cloudRef=db.doc("data/users/"+uid+"/progress");
    const d=await cloudRef.get(),local=store.get("pomnyu-ts",0),remote=d.exists?(d.data().ts||0):0;
    if(d.exists&&remote>local)applyCloud(JSON.parse(JSON.stringify(d.data())));
    else if(!d.exists||local>remote)await push(); // в облаке пусто — переносим то, что накоплено в браузере
    setSync("cloud");
  }catch(e){cloudRef=null;setSync("local")}
})();

nav();learnTab();
