/* SureControl Card Studio v5.9.1 — apresentação/exportação. Não altera dados nem cálculos. */
(() => {
  let selectedEntry = null;
  const originalReport = buildReportImage;
  const toolbar = document.createElement('div');
  toolbar.className = 'sc-studio';
  toolbar.hidden = true;
  toolbar.innerHTML = `
    <label>Estilo do card
      <select id="scCardTheme">
        <option value="graphite">Graphite</option>
        <option value="emerald">Emerald</option>
        <option value="midnight">Midnight</option>
        <option value="ivory">Ivory</option>
      </select>
    </label>
    <label>Formato
      <select id="scCardFormat">
        <option value="feed">Feed · 1080 × 1350</option>
        <option value="story">Story · 1080 × 1920</option>
        <option value="square">Quadrado · 1080 × 1080</option>
      </select>
    </label>
    <label>Acabamento
      <select id="scCardFinish">
        <option value="clean">Clean</option>
        <option value="glass">Glass</option>
      </select>
    </label>
    <small>A prévia é atualizada automaticamente. O card usa os mesmos dados já salvos no histórico.</small>`;
  document.querySelector('.report-preview-wrap')?.before(toolbar);

  buildSurebetImage = async function(entry){ selectedEntry=entry; toolbar.hidden=false; return renderStudioSurebet(entry); };
  buildReportImage = async function(){ selectedEntry=null; toolbar.hidden=true; return originalReport(); };
  toolbar.addEventListener('change', async () => {
    if(!selectedEntry) return;
    const locked=[...toolbar.querySelectorAll('select'),document.getElementById('downloadReportImage'),document.getElementById('shareReportImage')].filter(Boolean);
    locked.forEach(el=>el.disabled=true);
    try{ await renderStudioSurebet(selectedEntry); }
    catch(error){ console.error(error); toast('Não foi possível atualizar o card.'); }
    finally{ locked.forEach(el=>el.disabled=false); }
  });

  const THEMES={
    graphite:{bg:'#06100d',panel:'#0b1713',panel2:'#10211b',panel3:'#132820',line:'#1f4236',text:'#f5fbf8',muted:'#8ca49a',accent:'#22e3a0',accent2:'#0aa876',profit:'#36f0ac',danger:'#ff6f88'},
    emerald:{bg:'#041711',panel:'#08241a',panel2:'#0d3125',panel3:'#124131',line:'#235943',text:'#f4fff9',muted:'#9fc9b8',accent:'#38f0b0',accent2:'#0eb27e',profit:'#5cf2bd',danger:'#ff8198'},
    midnight:{bg:'#061018',panel:'#0b1a24',panel2:'#102a35',panel3:'#153947',line:'#214c5d',text:'#f3fbff',muted:'#91adba',accent:'#30e6b4',accent2:'#1ba6c8',profit:'#53edbd',danger:'#ff7d95'},
    ivory:{bg:'#edf5f1',panel:'#ffffff',panel2:'#f5faf7',panel3:'#ecf7f2',line:'#cfe1d8',text:'#102019',muted:'#687c72',accent:'#07865e',accent2:'#12a977',profit:'#07865e',danger:'#c63d58'}
  };
  const isLight=t=>t==='ivory';
  const rgba=(hex,a)=>{const h=hex.replace('#','');const n=parseInt(h.length===3?h.split('').map(x=>x+x).join(''):h,16);return `rgba(${(n>>16)&255},${(n>>8)&255},${n&255},${a})`;};
  const round=(ctx,x,y,w,h,r,fill,stroke)=>drawRoundedBox(ctx,x,y,w,h,r,fill,stroke);
  function write(ctx,value,x,y,size,color,maxWidth,weight=700,align='left'){
    ctx.textAlign=align;ctx.textBaseline='alphabetic';ctx.fillStyle=color;fitCanvasFont(ctx,String(value??'—'),maxWidth,size,10,weight);
    let label=String(value??'—');while(ctx.measureText(label).width>maxWidth&&label.length>2)label=label.slice(0,-2)+'…';ctx.fillText(label,x,y);ctx.textAlign='left';
  }
  let BRAND_LOGO_PROMISE=null;
  function loadBrandLogo(){
    if(BRAND_LOGO_PROMISE) return BRAND_LOGO_PROMISE;
    BRAND_LOGO_PROMISE=new Promise(resolve=>{
      const img=new Image();img.decoding='async';
      img.onload=()=>resolve(img);img.onerror=()=>resolve(null);
      img.src='surecontrol-card-logo.png';
    });
    return BRAND_LOGO_PROMISE;
  }
  async function drawBrand(ctx,x,y,size,p=null){
    const img=await loadBrandLogo();
    if(!img) return 0;
    const s=Math.max(34,Math.min(size,110));
    ctx.save();
    ctx.shadowColor=rgba(p?.accent||'#22e3a0',.24);ctx.shadowBlur=12;ctx.shadowOffsetY=1;
    ctx.beginPath();ctx.roundRect(x,y,s,s,Math.max(9,s*.18));ctx.clip();
    ctx.drawImage(img,x,y,s,s);ctx.restore();
    return s;
  }
  function sealMeta(entry){
    const ids=[];
    const add=v=>{ if(v && specialTagMeta(v) && !ids.includes(v)) ids.push(v); };
    normalizeSpecialTags(entry).forEach(add);
    if(Array.isArray(entry?.tags)) entry.tags.forEach(add);
    if(Array.isArray(entry?.seals)) entry.seals.forEach(add);
    const legs=(entry?.outcomes?.length?entry.outcomes:entry?.offers)||[];
    legs.forEach(l=>{
      if(l?.freebet) add('freebet-extraction');
      const b=parseNum(l?.boost);
      if(b>=29.5) add('boosted-30'); else if(b>0) add('boosted');
    });
    return ids;
  }
  function tagPalette(id){
    const cls=specialTagMeta(id)?.cls;
    if(cls==='boost30') return {bg:'#8b5a00',line:'#d69418',text:'#ffd166',icon:'#ffb000'};
    if(cls==='freebet') return {bg:'#49155a',line:'#7d2b95',text:'#f1a8ff',icon:'#d35cf2'};
    if(cls==='doublegreen') return {bg:'#063f2b',line:'#0f8158',text:'#7ff0bb',icon:'#22d997'};
    if(cls==='mission') return {bg:'#4b2c08',line:'#9a651a',text:'#ffd38c',icon:'#f3a928'};
    if(cls==='spins') return {bg:'#073a47',line:'#0c768d',text:'#8ee9fa',icon:'#1cc5e4'};
    return {bg:'#17360d',line:'#3b7d24',text:'#a8ec86',icon:'#77d94e'};
  }
  function drawTagIcon(ctx,id,cx,cy,color){
    const cls=specialTagMeta(id)?.cls;ctx.save();ctx.strokeStyle=color;ctx.fillStyle=color;ctx.lineWidth=2.4;ctx.lineCap='round';ctx.lineJoin='round';
    if(cls==='freebet'){
      ctx.beginPath();ctx.roundRect(cx-11,cy-8,22,16,4);ctx.stroke();
      ctx.setLineDash([2,2]);ctx.beginPath();ctx.moveTo(cx-3,cy-7);ctx.lineTo(cx-3,cy+7);ctx.stroke();ctx.setLineDash([]);
      const pts=[];for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,r=i%2?2.2:4.6;pts.push([cx+4+Math.cos(a)*r,cy+Math.sin(a)*r]);}
      ctx.beginPath();pts.forEach((pt,i)=>i?ctx.lineTo(...pt):ctx.moveTo(...pt));ctx.closePath();ctx.stroke();
    }else if(cls==='doublegreen'){
      ctx.beginPath();ctx.moveTo(cx-9,cy);ctx.lineTo(cx-3,cy+6);ctx.lineTo(cx+10,cy-7);ctx.stroke();
    }else if(cls==='boost30'||cls==='boost'){
      ctx.beginPath();ctx.moveTo(cx-10,cy+7);ctx.lineTo(cx-2,cy-1);ctx.lineTo(cx+3,cy+4);ctx.lineTo(cx+11,cy-7);ctx.stroke();
      ctx.beginPath();ctx.moveTo(cx+4,cy-7);ctx.lineTo(cx+11,cy-7);ctx.lineTo(cx+11,cy);ctx.stroke();
    }else if(cls==='mission'){
      ctx.beginPath();ctx.arc(cx,cy,8.5,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.arc(cx,cy,4,0,Math.PI*2);ctx.stroke();
      ctx.beginPath();ctx.moveTo(cx,cy-11);ctx.lineTo(cx,cy-8);ctx.moveTo(cx+11,cy);ctx.lineTo(cx+8,cy);ctx.moveTo(cx,cy+11);ctx.lineTo(cx,cy+8);ctx.moveTo(cx-11,cy);ctx.lineTo(cx-8,cy);ctx.stroke();
    }else if(cls==='spins'){
      ctx.beginPath();ctx.arc(cx,cy,8.5,0,Math.PI*2);ctx.stroke();
      ctx.beginPath();ctx.moveTo(cx,cy-8.5);ctx.lineTo(cx,cy+8.5);ctx.moveTo(cx-8.5,cy);ctx.lineTo(cx+8.5,cy);ctx.moveTo(cx-6,cy-6);ctx.lineTo(cx+6,cy+6);ctx.moveTo(cx+6,cy-6);ctx.lineTo(cx-6,cy+6);ctx.stroke();
    }else{
      ctx.beginPath();ctx.arc(cx,cy,8,0,Math.PI*1.7);ctx.stroke();
    }
    ctx.restore();
  }
  function drawTagRow(ctx,ids,x,y,maxW,p,compact=false){
    if(!ids.length) return 0;
    const gap=10,h=compact?38:44;let cx=x,cy=y,row=0;
    ids.forEach(id=>{
      const meta=specialTagMeta(id),pal=tagPalette(id),label=meta?.label||id;
      ctx.font=`800 ${compact?11:13}px system-ui,sans-serif`;const w=Math.min(compact?205:240,Math.max(compact?128:150,ctx.measureText(label).width+(compact?48:58)));
      if(cx+w>x+maxW){row++;cx=x;cy+=h+9;}
      round(ctx,cx,cy,w,h,11,rgba(pal.bg,.96),pal.line);
      const ix=cx+(compact?7:8),is=compact?24:28;round(ctx,ix,cy+(h-is)/2,is,is,7,rgba(pal.icon,.15),rgba(pal.icon,.35));
      drawTagIcon(ctx,id,ix+is/2,cy+h/2,pal.icon);
      write(ctx,label,ix+is+(compact?8:10),cy+(compact?25:29),compact?11:13,pal.text,w-(is+(compact?24:28)),820);cx+=w+gap;
    });
    return (row+1)*h+row*9;
  }
  function drawBackground(ctx,W,H,p,light){
    const g=ctx.createLinearGradient(0,0,W,H);
    if(light){
      g.addColorStop(0,'#f5faf7'); g.addColorStop(.55,'#edf6f1'); g.addColorStop(1,'#e2eee8');
    }else{
      g.addColorStop(0,'#02120e'); g.addColorStop(.52,'#031812'); g.addColorStop(1,'#00100c');
    }
    ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
    ctx.save();
    // large curved emerald ribbons, matching the approved concept
    ctx.globalAlpha=light?.055:.17;
    const rg=ctx.createRadialGradient(W*.20,-H*.04,20,W*.20,-H*.04,W*.70);
    rg.addColorStop(0,p.accent); rg.addColorStop(.58,rgba(p.accent,.38)); rg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=rg; ctx.fillRect(0,0,W,H*.55);
    const rg2=ctx.createRadialGradient(-W*.08,H*.98,10,-W*.08,H*.98,W*.55);
    rg2.addColorStop(0,p.accent2); rg2.addColorStop(.52,rgba(p.accent2,.28)); rg2.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=rg2; ctx.fillRect(0,H*.55,W,H*.45);
    ctx.globalAlpha=light?.10:.25; ctx.strokeStyle=p.accent; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(-80,H*.30); ctx.bezierCurveTo(W*.18,H*.18,W*.28,H*.40,W*.52,H*.12); ctx.bezierCurveTo(W*.72,-H*.08,W*.76,H*.20,W+80,-H*.02); ctx.stroke();
    ctx.globalAlpha=light?.055:.12; ctx.strokeStyle=p.accent2; ctx.lineWidth=1.4;
    ctx.beginPath(); ctx.moveTo(-60,H*.83); ctx.bezierCurveTo(W*.22,H*.65,W*.28,H*.92,W*.55,H*.69); ctx.bezierCurveTo(W*.74,H*.52,W*.83,H*.78,W+50,H*.58); ctx.stroke();
    ctx.restore();
  }

  function neonPanel(ctx,x,y,w,h,r,p,fill,glass=false){
    ctx.save();
    ctx.shadowColor=rgba(p.accent,.16); ctx.shadowBlur=glass?22:10;
    round(ctx,x,y,w,h,r,fill,rgba(p.accent,glass?.55:.38));
    ctx.restore();
  }

  function drawMetaIcon(ctx,type,cx,cy,p){
    ctx.save();ctx.strokeStyle=p.text;ctx.fillStyle=p.text;ctx.lineWidth=2.4;ctx.lineCap='round';ctx.lineJoin='round';
    if(type==='calendar'){
      ctx.strokeRect(cx-9,cy-7,18,16);ctx.beginPath();ctx.moveTo(cx-9,cy-2);ctx.lineTo(cx+9,cy-2);ctx.moveTo(cx-5,cy-10);ctx.lineTo(cx-5,cy-5);ctx.moveTo(cx+5,cy-10);ctx.lineTo(cx+5,cy-5);ctx.stroke();
    }else if(type==='ball'){
      ctx.beginPath();ctx.arc(cx,cy,9,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.arc(cx,cy,3,0,Math.PI*2);ctx.stroke();
    }else{
      ctx.beginPath();ctx.arc(cx,cy,8,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.arc(cx,cy,3,0,Math.PI*2);ctx.stroke();
    }
    ctx.restore();
  }

  async function studioCreateSurebetCanvas(entry){
    const theme=document.getElementById('scCardTheme')?.value||'graphite';
    const format=document.getElementById('scCardFormat')?.value||'feed';
    const finish=document.getElementById('scCardFinish')?.value||'clean';
    const p=THEMES[theme]||THEMES.graphite,light=isLight(theme);
    const W=1080,H=format==='story'?1920:format==='square'?1080:1350;
    const canvas=document.createElement('canvas');canvas.width=W;canvas.height=H;
    const ctx=canvas.getContext('2d');drawBackground(ctx,W,H,p,light);

    const glass=finish==='glass', pad=42, inner=W-pad*2;
    const legs=(entry.outcomes?.length?entry.outcomes:entry.offers)||[];
    const tags=sealMeta(entry);
    const matchup=parseTeamEvent(entry.event);
    const profit=parseNum(entry.profit),roi=parseNum(entry.roi);
    const profitColor=profit>=0?p.profit:p.danger,roiColor=roi>=0?p.profit:p.danger;
    const panelFill=glass?rgba(p.panel,.84):rgba(p.panel,.96);
    const generatedAt=new Date();

    // Geometry: square is the master composition approved by the user.
    // Feed/story keep the same visual ratios, only adding breathing room vertically.
    const extra=H-1080;
    const brandY=30;
    const matchY=150;
    const matchH=format==='square'?360:390;
    const heroY=matchY+matchH+18;
    const heroH=190;
    const footerH=70;
    const footerY=H-pad-footerH;
    const rowsY=heroY+heroH+18;
    const rowsBottom=footerY-16;
    const rowGap=12;
    const availableRows=Math.max(120,rowsBottom-rowsY);
    const rowH=Math.min(format==='story'?130:108,Math.max(72,(availableRows-rowGap*Math.max(0,legs.length-1))/Math.max(1,legs.length)));

    // Brand — deliberately quiet; no slogans or catchphrases.
    const mark=format==='square'?92:102;
    await drawBrand(ctx,pad+18,brandY,mark,p);
    ctx.strokeStyle=rgba(p.accent,.70);ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(pad+18+mark+24,brandY+14);ctx.lineTo(pad+18+mark+24,brandY+mark-14);ctx.stroke();
    write(ctx,'SURECONTROL',pad+18+mark+46,brandY+45,15,p.text,260,900);
    write(ctx,'ANÁLISE • CONTROLE • RESULTADOS',pad+18+mark+46,brandY+70,10,p.muted,330,760);

    // Match panel
    neonPanel(ctx,pad,matchY,inner,matchH,28,p,panelFill,glass);
    const teamY=matchY+34,logoSize=format==='square'?112:124;
    if(matchup){
      const imgs=await Promise.all([loadTeamLogo(matchup.home),loadTeamLogo(matchup.away)]);
      const c1=W*.28,c2=W*.72;
      drawTeamLogoCanvas(ctx,imgs[0],matchup.home,c1-logoSize/2,teamY,logoSize,!light);
      drawTeamLogoCanvas(ctx,imgs[1],matchup.away,c2-logoSize/2,teamY,logoSize,!light);
      write(ctx,matchup.home,c1,teamY+logoSize+38,28,p.text,300,950,'center');
      write(ctx,matchup.away,c2,teamY+logoSize+38,28,p.text,300,950,'center');
      round(ctx,W/2-34,teamY+38,68,68,34,rgba(p.panel2,.72),rgba(p.accent,.32));
      write(ctx,'×',W/2,teamY+83,34,p.text,44,700,'center');
    } else {
      write(ctx,entry.event||'Evento',W/2,teamY+95,34,p.text,inner-120,950,'center');
    }

    // Meta row, visually centered like the approved concept.
    const metaY=matchY+225;
    const strategy=entry.strategy||'Back / Back';
    drawMetaIcon(ctx,'ball',pad+112,metaY,p);
    write(ctx,strategy,pad+137,metaY+6,17,p.text,190,720);
    ctx.strokeStyle=rgba(p.muted,.55);ctx.beginPath();ctx.moveTo(pad+315,metaY-15);ctx.lineTo(pad+315,metaY+15);ctx.stroke();
    const comp=entry.competition||entry.league||'';
    if(comp){
      drawMetaIcon(ctx,'league',pad+355,metaY,p);
      write(ctx,comp,pad+380,metaY+6,16,p.text,230,720);
      ctx.beginPath();ctx.moveTo(pad+620,metaY-15);ctx.lineTo(pad+620,metaY+15);ctx.stroke();
    }
    drawMetaIcon(ctx,'calendar',comp?pad+662:pad+390,metaY,p);
    const dateLabel=entry.date?fmtDate(entry.date):'';
    const timeLabel=entry.time||entry.hour||'';
    write(ctx,[dateLabel,timeLabel].filter(Boolean).join(' • '),comp?pad+687:pad+415,metaY+6,16,p.text,260,720);

    // Badges: equal-width premium capsules with square icon blocks.
    if(tags.length){
      const tagY=matchY+matchH-82, gap=12, maxCols=Math.min(3,tags.length), tagW=(inner-48-gap*(maxCols-1))/maxCols;
      tags.slice(0,3).forEach((id,i)=>{
        const pal=tagPalette(id),meta=specialTagMeta(id),x=pad+24+i*(tagW+gap),h=54;
        round(ctx,x,tagY,tagW,h,12,rgba(pal.bg,.94),pal.line);
        round(ctx,x,tagY,54,h,12,rgba(pal.icon,.16),rgba(pal.icon,.30));
        drawTagIcon(ctx,id,x+27,tagY+h/2,pal.icon);
        write(ctx,meta?.label||id,x+70,tagY+35,14,pal.text,tagW-84,850);
      });
    }

    // Profit hero: identical hierarchy to approved concept.
    neonPanel(ctx,pad,heroY,inner,heroH,25,p,glass?rgba(p.panel2,.86):p.panel2,glass);
    const splitX=pad+inner*.66;
    write(ctx,'LUCRO ESTIMADO',pad+34,heroY+43,16,p.muted,360,800);
    write(ctx,brl(profit),pad+34,heroY+142,68,profitColor,splitX-pad-68,950);
    ctx.strokeStyle=rgba(p.accent,.72);ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(splitX,heroY+24);ctx.lineTo(splitX,heroY+heroH-24);ctx.stroke();

    const rx=splitX+48,rw=W-pad-rx-34;
    // ROI + investimento: grupo único, centralizado verticalmente no painel.
    const metricsH=142;
    const metricsTop=heroY+(heroH-metricsH)/2;
    write(ctx,'ROI',rx,metricsTop+14,13,p.muted,rw,820);
    write(ctx,pct(roi),rx,metricsTop+54,31,roiColor,rw,930);
    ctx.strokeStyle=rgba(p.line,.95);ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(rx,metricsTop+73);ctx.lineTo(W-pad-34,metricsTop+73);ctx.stroke();
    write(ctx,'INVESTIMENTO',rx,metricsTop+100,13,p.muted,rw,820);
    write(ctx,brl(entry.investment),rx,metricsTop+137,25,p.text,rw,900);

    // Bookmaker legs
    for(let i=0;i<legs.length;i++){
      const l=legs[i],y=rowsY+i*(rowH+rowGap),h=rowH;
      if(y+h>rowsBottom+2) break;
      neonPanel(ctx,pad+4,y,inner-8,h,18,p,glass?rgba(p.panel,.82):rgba(p.panel,.94),false);
      const logo=Math.max(50,Math.min(68,h*.68));
      await drawReportHouseLogo(ctx,l.house,pad+24,y+(h-logo)/2,logo,light?'#fff':rgba('#ffffff',.06));
      const name=houseById(l.house)?.nome||`Casa ${i+1}`;
      const selection=l.selection||l.result||l.pick||'';
      write(ctx,name,pad+24+logo+22,y+h*.42,20,p.text,320,900);
      write(ctx,[(l.type||'back').replace(/^./,c=>c.toUpperCase()),selection].filter(Boolean).join(' - '),pad+24+logo+22,y+h*.72,15,p.muted,430,650);
      const base=parseNum(l.odd),boost=parseNum(l.boost),odd=boost>0&&base>0?boostedOdd(base,boost):parseNum(l.effectiveOdd||l.odd);
      write(ctx,odd.toFixed(2),W-pad-30,y+h*.40,24,p.text,150,950,'right');
      write(ctx,brl(l.stake),W-pad-30,y+h*.72,14,p.muted,180,700,'right');
    }

    // Footer: only generation timestamp + author credit. No marketing phrase.
    const gen=`Card gerado em ${generatedAt.toLocaleDateString('pt-BR')} • ${generatedAt.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})}`;
    ctx.save();ctx.strokeStyle=rgba(p.accent,.78);ctx.lineWidth=3;
    ctx.beginPath();ctx.arc(pad+38,footerY+footerH/2,14,0,Math.PI*2);ctx.stroke();
    ctx.beginPath();ctx.moveTo(pad+38,footerY+footerH/2);ctx.lineTo(pad+38,footerY+footerH/2-8);ctx.moveTo(pad+38,footerY+footerH/2);ctx.lineTo(pad+45,footerY+footerH/2+4);ctx.stroke();ctx.restore();
    write(ctx,gen,pad+66,footerY+footerH/2+6,13,p.muted,420,650);
    ctx.strokeStyle=p.accent;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(W-pad-390,footerY+footerH/2);ctx.lineTo(W-pad-340,footerY+footerH/2);ctx.stroke();
    write(ctx,'DESENVOLVIDO POR GENÁRIO COSTA',W-pad,footerY+footerH/2+5,11,p.muted,320,760,'right');

    return canvas;
  }

  async function renderStudioSurebet(entry){
    const canvas=await studioCreateSurebetCanvas(entry);const slug=(entry.event||'surebet').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,40)||'surebet';
    return showPreviewImage({canvas,name:`surebet-${slug}-${entry.date||todayISO()}.png`,title:'Prévia do card da surebet',shareTitle:'Surebet salva',shareText:entry.event||'Surebet',eyebrow:'CARD'});
  }
})();
