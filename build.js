// Собирает index.html: подставляет блюда, фото, курс и глоссарий в game.src.html.
// data/dishes.json — составы из памятки «Составы Остоженки» с разобранными ингредиентами (data/tokenize.js).
// data/course.src.js — программа обучения (основы, модули, уроки), course.engine.js — движок раздела «Обучение».
const fs=require('fs'),path=require('path');
const dir=__dirname,rd=f=>fs.readFileSync(path.join(dir,f),'utf8');
const R=JSON.parse(rd('data/dishes.json')),P=JSON.parse(rd('data/photos.json'));
const dishes=R.map(({cat,name,comp,srok,key,ing})=>({cat,name,comp,srok,key,ing}));
const photos={};dishes.forEach(d=>{if(P[d.key])photos[d.key]=P[d.key]});
const course=rd('data/course.src.js').replace(/^\s*\/\/.*\n/gm,'').trim();
const C=eval(course);
C.units.forEach(u=>u.items.forEach(i=>{if(!dishes.find(d=>d.name===i.name))throw new Error('В курсе есть позиция, которой нет в данных: '+i.name)}));
const engine=rd('course.engine.js').replace('/*COURSE*/null',course).replace('/*GLOSS*/[]',rd('data/glossary.json'));
const out=rd('game.src.html').replace('/*DATA*/[]',()=>JSON.stringify(dishes)).replace('/*PHOTO*/{}',()=>JSON.stringify(photos)).replace('/*COURSE_ENGINE*/',()=>engine);
fs.writeFileSync(path.join(dir,'claude-artifact.html'),out); // для Claude: оболочку <html><head> добавляет сам Claude
// для хостинга: полноценная страница с doctype и head
const shell='<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
  +'<style>:root{box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style></head><body>';
fs.writeFileSync(path.join(dir,'index.html'),shell+out+'</body></html>');
console.log('index.html + claude-artifact.html',(out.length/1e6).toFixed(2)+'MB ·',dishes.length,'позиций в игре ·',C.units.reduce((a,u)=>a+u.items.length,0),'в курсе');
