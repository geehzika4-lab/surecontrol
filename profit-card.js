/* SureControl v5.8 — Card de lucro por período. Camada de apresentação somente. */
(() => {
  const $id=id=>document.getElementById(id);
  const period=$id('profitCardPeriod'), date=$id('profitCardDate'), month=$id('profitCardMonth'), dateLabel=$id('profitCardDateLabel'), monthLabel=$id('profitCardMonthLabel'), btn=$id('generateProfitCard');
  if(!period||!btn)return;
  const now=new Date(), iso=now.toISOString().slice(0,10); date.value=iso; month.value=iso.slice(0,7);
  period.addEventListener('change',()=>{const day=period.value==='day';dateLabel.hidden=!day;monthLabel.hidden=day});
  const money=v=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(Number(v)||0);
  const num=v=>Number(v)||0;
  const localDate=s=>{const [y,m,d]=String(s||'').slice(0,10).split('-').map(Number);return new Date(y,m-1,d)};
  const sameWeek=(d,anchor)=>{const a=localDate(anchor),x=localDate(d),dow=(a.getDay()+6)%7,start=new Date(a);start.setDate(a.getDate()-dow);start.setHours(0,0,0,0);const end=new Date(start);end.setDate(start.getDate()+7);return x>=start&&x<end};
  function selection(){const mode=period.value, anchor=date.value||iso, mon=month.value||iso.slice(0,7);let entries=[...APP.entries];if(mode==='day')entries=entries.filter(e=>String(e.date).slice(0,10)===anchor);else if(mode==='week')entries=entries.filter(e=>sameWeek(e.date,anchor));else entries=entries.filter(e=>String(e.date).slice(0,7)===mon);let label;if(mode==='day')label=localDate(anchor).toLocaleDateString('pt-BR',{day:'2-digit',month:'long',year:'numeric'});else if(mode==='week'){const a=localDate(anchor),dow=(a.getDay()+6)%7,s=new Date(a);s.setDate(a.getDate()-dow);const e=new Date(s);e.setDate(s.getDate()+6);label=`${s.toLocaleDateString('pt-BR',{day:'2-digit',month:'short'})} — ${e.toLocaleDateString('pt-BR',{day:'2-digit',month:'short',year:'numeric'})}`}else{const [y,m]=mon.split('-').map(Number);label=new Date(y,m-1,1).toLocaleDateString('pt-BR',{month:'long',year:'numeric'})}return {mode,entries,label,anchor:mode==='month'?mon:anchor}}
  const themes={signature:{bg:'#071511',panel:'#0d211a',line:'#1c3d32',text:'#f2fbf7',muted:'#8da99e',accent:'#64e0b5',accent2:'#1a9d73'},obsidian:{bg:'#090b0c',panel:'#141719',line:'#292e31',text:'#f6f7f7',muted:'#959da1',accent:'#d7e7df',accent2:'#5f766c'},mint:{bg:'#edf7f3',panel:'#ffffff',line:'#d6e7df',text:'#14241e',muted:'#708179',accent:'#0a8060',accent2:'#38ad86'}};
  function round(ctx,x,y,w,h,r,fill,stroke){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=1.5;ctx.stroke()}}
  let BRAND_LOGO_PROMISE=null;
  function loadBrandLogo(){
    if(BRAND_LOGO_PROMISE) return BRAND_LOGO_PROMISE;
    BRAND_LOGO_PROMISE=new Promise(resolve=>{
      const img=new Image();img.decoding='async';img.onload=()=>resolve(img);img.onerror=()=>resolve(null);img.src='surecontrol-card-logo.png';
    });
    return BRAND_LOGO_PROMISE;
  }
  async function drawBrand(ctx,x,y,size,p){
    const img=await loadBrandLogo();if(!img)return;
    const s=Math.max(36,Math.min(size,104));ctx.save();ctx.shadowColor=(p?.accent||'#22e3a0')+'44';ctx.shadowBlur=10;
    ctx.beginPath();ctx.roundRect(x,y,s,s,18);ctx.clip();ctx.drawImage(img,x,y,s,s);ctx.restore();
  }
  function txt(ctx,t,x,y,size,color,weight='600',align='left'){ctx.fillStyle=color;ctx.font=`${weight} ${size}px 'Coolvetica Local', 'Arial Narrow', system-ui, sans-serif`;ctx.textAlign=align;ctx.fillText(t,x,y);ctx.textAlign='left'}
  async function makeCard(){const sel=selection(),p=themes[$id('profitCardTheme')?.value]||themes.signature,W=1080,H=1350,c=document.createElement('canvas');c.width=W;c.height=H;const ctx=c.getContext('2d');ctx.fillStyle=p.bg;ctx.fillRect(0,0,W,H);const g=ctx.createRadialGradient(850,50,0,850,50,650);g.addColorStop(0,p.accent+'2d');g.addColorStop(1,p.accent+'00');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    const profitOf=e=>typeof entryProfit==='function'?num(entryProfit(e)):num(e.profit);
    const profit=sel.entries.reduce((a,e)=>a+profitOf(e),0), sure=sel.entries.filter(e=>e.type==='surebet'), invested=sure.reduce((a,e)=>a+num(e.investment),0), roi=invested?profit/invested*100:0, wins=sel.entries.filter(e=>profitOf(e)>0.005).length, losses=sel.entries.filter(e=>profitOf(e)<-.005).length;
    await drawBrand(ctx,72,58,92,p);
    txt(ctx,'CONTROLE  •  ANÁLISE  •  RESULTADOS',184,91,15,p.text,'800');txt(ctx,'MAIS QUE SUREBETS, DISCIPLINA',184,124,13,p.muted,'700');
    txt(ctx,sel.mode==='day'?'RESULTADO DO DIA':sel.mode==='week'?'RESULTADO DA SEMANA':'RESULTADO DO MÊS',72,215,16,p.accent,'850');txt(ctx,sel.label.toUpperCase(),72,258,24,p.text,'750');
    round(ctx,72,310,936,260,32,p.panel,p.line);txt(ctx,'LUCRO LÍQUIDO',112,368,16,p.muted,'800');txt(ctx,money(profit),112,455,58,profit>=0?p.accent:'#ff8293','900');txt(ctx,`${sel.entries.length} movimentações no período`,112,510,17,p.muted,'600');
    const cards=[['INVESTIDO',money(invested)],['ROI',`${roi.toFixed(2).replace('.',',')}%`],['POSITIVOS',String(wins)],['NEGATIVOS',String(losses)]];cards.forEach((it,i)=>{const x=72+(i%2)*474,y=610+Math.floor(i/2)*148;round(ctx,x,y,456,126,23,p.panel,p.line);txt(ctx,it[0],x+28,y+40,13,p.muted,'800');txt(ctx,it[1],x+28,y+90,it[0]==='ROI'?38:27,it[0]==='ROI'?(roi>=0?p.accent:'#ff8293'):p.text,'900')});
    const ids=new Set();sel.entries.forEach(e=>{if(e.house)ids.add(e.house);(e.outcomes||e.offers||[]).forEach(o=>o.house&&ids.add(o.house))});const houses=[...ids].slice(0,8);txt(ctx,'CASAS UTILIZADAS',72,957,13,p.muted,'800');let x=72;for(const id of houses){const h=houseById(id),img=await loadReportLogo(id);round(ctx,x,985,92,92,24,p.panel,p.line);if(img){const pad=15,ratio=Math.min((92-pad*2)/img.width,(92-pad*2)/img.height);ctx.drawImage(img,x+(92-img.width*ratio)/2,985+(92-img.height*ratio)/2,img.width*ratio,img.height*ratio)}else txt(ctx,(h?.nome||'?').slice(0,2).toUpperCase(),x+46,1042,18,p.text,'850','center');x+=108}
    if(!houses.length)txt(ctx,'Nenhuma casa registrada neste período',72,1022,16,p.muted,'600');
    const generatedAt=new Date(),generatedLabel=`Gerado em ${generatedAt.toLocaleDateString('pt-BR')} • ${generatedAt.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})}`;
    ctx.strokeStyle=p.line;ctx.beginPath();ctx.moveTo(72,1162);ctx.lineTo(1008,1162);ctx.stroke();
    txt(ctx,'Resultados documentados no SureControl',72,1210,16,p.text,'700');txt(ctx,generatedLabel,1008,1210,14,p.muted,'700','right');
    await drawBrand(ctx,72,1242,54,p);txt(ctx,'DESENVOLVIDO POR GENÁRIO COSTA',142,1277,13,p.muted,'750');return {canvas:c,sel,profit}}
  btn.addEventListener('click',async()=>{btn.disabled=true;const old=btn.innerHTML;btn.textContent='Gerando card...';try{const {canvas,sel}=await makeCard();if(!canvas||canvas.width!==1080||canvas.height!==1350)throw new Error('Canvas de performance inválido');const probe=await canvasToBlob(canvas);if(!probe||probe.size<1000)throw new Error('PNG de performance vazio');await showPreviewImage({canvas,name:`lucro-${sel.mode}-${sel.anchor}.png`,title:`Card de lucro — ${sel.label}`,shareTitle:'Meu resultado no SureControl',shareText:`Resultado de ${sel.label}`,eyebrow:'CARD'});toast('Card de lucro pronto.')}catch(e){console.error(e);toast('Não foi possível gerar o card de lucro.')}finally{btn.disabled=false;btn.innerHTML=old;hydrateStaticIcons?.()}});
})();
