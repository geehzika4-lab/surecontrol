const APP = { houses: [], settings: { activeHouses: {}, theme: 'light' }, entries: [], db: null, marketOutcomes: 2, legCount: 2, fixedLegIndex: 0, editingSureId: null, editingSpinId: null, editingFreebetId: null, plannedFreebetId: null, cloud: null, user: null, cloudReady: false, syncSuspended: false, authMode: 'signin', startingUser: null, cloudChannel: null, syncTimer: null, syncInFlight: null, syncQueued: false, syncHooksBound: false, reportImage: null, currentView: 'dashboard', specialTags: [], freebetTab: 'add', stakeMode: 'auto', teamIndex: [], teamAliasMap: new Map(), teamLogoCache: new Map() };
const NAV = [
  ['dashboard','home','Início','Visão geral'],['surebet','percent','Surebet','Calculadora de surebet'],['spins','refresh','Giros','Giros grátis'],['freebets','freebet','Freebets','Central de freebets'],['houses','diamond','Casas','Minhas casas'],['history','list','Histórico','Histórico'],['reports','report','Relatórios','Relatórios']
];
const ICONS={
 home:'<svg viewBox="0 0 24 24"><path d="M3 11.5 12 4l9 7.5v8a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5z"/><path d="M9 21v-6h6v6"/></svg>',
 percent:'<svg viewBox="0 0 24 24"><circle cx="7" cy="7" r="2.2"/><circle cx="17" cy="17" r="2.2"/><path d="M18.5 5.5 5.5 18.5"/></svg>',
 refresh:'<svg viewBox="0 0 24 24"><path d="M20 7v5h-5"/><path d="M19 12a7 7 0 1 1-2-5"/></svg>',
 gift:'<svg viewBox="0 0 24 24"><path d="M4 10h16v10H4z"/><path d="M3 7h18v4H3zM12 7v13"/><path d="M12 7H8.6A2.6 2.6 0 1 1 11 3.4L12 7Zm0 0h3.4A2.6 2.6 0 1 0 13 3.4L12 7Z"/></svg>',
 freebet:'<svg viewBox="0 0 24 24"><path d="M6 5.5h12a2 2 0 0 1 2 2v1.2a3 3 0 0 0 0 6.6v1.2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1.2a3 3 0 0 0 0-6.6V7.5a2 2 0 0 1 2-2Z"/><path d="M9 7.5v9" stroke-dasharray="1.4 2"/><path d="m14.5 9.1.8 1.7 1.9.3-1.4 1.3.3 1.9-1.6-.9-1.7.9.3-1.9-1.4-1.3 1.9-.3.8-1.7Z"/></svg>',
 diamond:'<svg viewBox="0 0 24 24"><path d="m12 3 8 9-8 9-8-9 8-9Z"/><path d="m8 12 4-4 4 4-4 4-4-4Z"/></svg>',
 list:'<svg viewBox="0 0 24 24"><path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1"/><circle cx="4.5" cy="12" r="1"/><circle cx="4.5" cy="18" r="1"/></svg>',
 report:'<svg viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h6"/></svg>',
 sun:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
 moon:'<svg viewBox="0 0 24 24"><path d="M20 15.5A8 8 0 0 1 8.5 4a8.5 8.5 0 1 0 11.5 11.5Z"/></svg>',
 user:'<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
 download:'<svg viewBox="0 0 24 24"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 20h14"/></svg>',
 share:'<svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.5-4.4M8.2 13.2l7.5 4.4"/></svg>',
 plus:'<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
 check:'<svg viewBox="0 0 24 24"><path d="m5 12 4 4 10-10"/></svg>',
 manual:'<svg viewBox="0 0 24 24"><path d="M5 8h14M5 16h14M8 5v6M16 13v6"/></svg>',
 edit:'<svg viewBox="0 0 24 24"><path d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-4-1L4 19.1V20Z"/><path d="m13.5 5.5 5 5"/></svg>',
 image:'<svg viewBox="0 0 24 24"><rect x="3.5" y="5" width="17" height="14" rx="2.5"/><path d="m7 15 3-3 3 3 2-2 2 2"/><circle cx="9" cy="9" r="1.2"/></svg>',
 trash:'<svg viewBox="0 0 24 24"><path d="M4 7h16"/><path d="M9 3h6"/><path d="M8 7v12m8-12v12M6 7l1 13a1.5 1.5 0 0 0 1.5 1.4h7A1.5 1.5 0 0 0 17 20L18 7"/></svg>',
 planner:'<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M8 3v4M16 3v4M3 10h18"/><path d="m9.5 15 1.7 1.7L15.5 12"/></svg>',
 target:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="7.5"/><circle cx="12" cy="12" r="3.5"/><path d="M12 4v2.3M20 12h-2.3M12 20v-2.3M4 12h2.3"/></svg>',
 spins:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="7.5"/><path d="M12 4.5v15M4.5 12h15M7 7l10 10M17 7 7 17"/></svg>',
 boost:'<svg viewBox="0 0 24 24"><path d="M4 17.5 10 11l3.5 3.5L20 8"/><path d="M14 8h6v6"/></svg>'
};
function iconSVG(name){return ICONS[name]||ICONS.report;}
const SPECIAL_TAGS={
 'freebet-extraction':{label:'Extração de Freebet',desc:'Freebet disponível para extração',cls:'freebet',icon:'freebet',glyph:'🎁'},
 'freebet-mission':{label:'Missão pegar Freebet',desc:'Complete a missão para liberar',cls:'mission',icon:'target',glyph:'◎'},
 'spins-mission':{label:'Missão giros',desc:'Realize giros e ganhe bônus',cls:'spins',icon:'spins',glyph:'↻'},
 'boosted':{label:'Aumentada 25%',desc:'Valor da odd aumentado',cls:'boost',icon:'boost',glyph:'↗'},
 'boosted-30':{label:'Aumento 30%',desc:'Aumento promocional de 30%',cls:'boost30',icon:'boost',glyph:'↗'},
 'double-green':{label:'Duplo Green',desc:'Operação com duplo green',cls:'doublegreen',icon:'check',glyph:'✓'}
};
function specialTagMeta(id){return SPECIAL_TAGS[id]||null;}
function normalizeSpecialTags(value){const raw=Array.isArray(value)?value:(value?.specialTags?.length?value.specialTags:value?.specialTag?[value.specialTag]:typeof value==='string'&&value?[value]:[]);return [...new Set(raw.filter(id=>SPECIAL_TAGS[id]))];}
function specialTagHTML(id){const m=specialTagMeta(id);return m?`<span class="entry-special-tag seal-badge ${m.cls}" title="${esc(m.label)}" aria-label="${esc(m.label)}"><span class="entry-special-icon seal-badge-coin">${iconSVG(m.icon)}</span><span class="entry-special-label seal-badge-label">${m.label}</span></span>`:'';}
function specialTagsHTML(value){const ids=normalizeSpecialTags(value);return ids.length?`<span class="entry-special-tags">${ids.map(specialTagHTML).join('')}</span>`:'';}
function actionButton(label,icon,attrs='',variant=''){return `<button type="button" class="entry-action-btn ${variant}" ${attrs}>${iconSVG(icon)}<span>${label}</span></button>`;}

const SUPABASE_URL = 'https://dzihdmqtlnyezayhszzk.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_ZcYi-PsfVsr8_kn6tx9pyw_onyx1Evk';
const LOCAL_OWNER_KEY = 'surecontrol-cloud-owner';
const SYNC_META_PREFIX = 'surecontrol-sync-meta:';
const SYNC_INTERVAL_MS = 12000;
const $ = s => document.querySelector(s); const $$ = s => [...document.querySelectorAll(s)];
const brl = n => new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(Number(n)||0);
const pct = n => `${(Number(n)||0).toFixed(2).replace('.',',')}%`;
const localDateISO = (d=new Date()) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const todayISO = () => localDateISO(new Date());
const uid = () => crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
const parseNum = v => {
  let s=String(v??'').trim().replace(/\s+/g,'').replace(/R\$/gi,'').replace(/%/g,'');
  if(!s)return 0;
  if(s.includes(',')&&s.includes('.')){
    s=s.lastIndexOf(',')>s.lastIndexOf('.')?s.replace(/\./g,'').replace(',','.'):s.replace(/,/g,'');
  }else{s=s.replace(',','.');}
  const n=Number(s);
  return Number.isFinite(n)?n:0;
};
const boostedOdd = (odd,boostPct=0) => {
  const o=parseNum(odd), b=Math.max(0,parseNum(boostPct))/100;
  // Aumento promocional aplicado ao lucro potencial, preservando a stake.
  // Ex.: odd 4,20 com +25% => 1 + (4,20 - 1) × 1,25 = 5,00.
  return o>1 ? 1+(o-1)*(1+b) : 0;
};
const cents = n => Math.round((Number(n)||0)*100)/100;
const esc = s => String(s??'').replace(/[&<>'"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[m]));

function toast(msg){ const t=$('#toast'); t.textContent=msg; t.classList.add('show'); clearTimeout(t._to); t._to=setTimeout(()=>t.classList.remove('show'),2200); }
function moneyClass(n){ return n>0?'positive':n<0?'negative':''; }

function normalizeTeamKey(value=''){
  return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/&/g,' and ').replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim();
}
function compactTeamKey(value=''){
  const stop=new Set(['fc','cf','sc','ac','ec','afc','club','clube','futebol','football','de','do','da','del','the','association','associacao','sport','esporte','rc','fk','bk','sk','nk','cd','ud','ca','aa','sv','ss','as','cs','ks','if','ik']);
  return normalizeTeamKey(value).split(' ').filter(x=>x&&!stop.has(x)).join(' ');
}
function buildTeamAliasMap(){
  APP.teamAliasMap=new Map();
  (APP.teamIndex||[]).forEach(item=>{[item.key,...(item.aliases||[])].forEach(a=>{const k=normalizeTeamKey(a);if(k&&!APP.teamAliasMap.has(k))APP.teamAliasMap.set(k,item);const c=compactTeamKey(a);if(c&&!APP.teamAliasMap.has(c))APP.teamAliasMap.set(c,item);});});
}
function parseTeamEvent(event=''){
  const text=String(event||'').trim();if(!text)return null;
  const m=text.match(/^(.+?)\s+(?:x|vs\.?|v)\s+(.+)$/i) || text.match(/^(.+?)\s+-\s+(.+)$/);
  if(!m)return null;
  const home=m[1].trim(),away=m[2].trim();return home&&away?{home,away}:null;
}
function localTeamAsset(team=''){
  const k=normalizeTeamKey(team),c=compactTeamKey(team);return APP.teamAliasMap.get(k)||APP.teamAliasMap.get(c)||null;
}
function teamLogoUrl(team=''){
  const local=localTeamAsset(team);if(local?.path)return local.path;
  return `/api/team-logo?team=${encodeURIComponent(team)}`;
}
function teamInitials(team=''){return String(team||'?').split(/\s+/).filter(Boolean).slice(0,2).map(x=>x[0]).join('').toUpperCase()||'?';}
function teamCrestHTML(team,side=''){
  const src=teamLogoUrl(team);return `<span class="team-crest ${side}"><img src="${src}" alt="Escudo ${esc(team)}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.hidden=false"><span class="team-crest-fallback" hidden>${esc(teamInitials(team))}</span></span>`;
}
function teamEventHTML(event,{compact=false}={}){
  const match=parseTeamEvent(event);if(!match)return `<span class="team-event-plain">${esc(event||'Surebet')}</span>`;
  if(compact)return `<span class="team-event compact">${teamCrestHTML(match.home,'home')}<span class="team-name home">${esc(match.home)}</span><span class="team-versus">×</span><span class="team-name away">${esc(match.away)}</span>${teamCrestHTML(match.away,'away')}</span>`;
  return `<span class="team-event matchup"><span class="team-side home">${teamCrestHTML(match.home,'home')}<span class="team-name home">${esc(match.home)}</span></span><span class="team-versus">×</span><span class="team-side away">${teamCrestHTML(match.away,'away')}<span class="team-name away">${esc(match.away)}</span></span></span>`;
}
function updateTeamEventPreview(){const box=$('#teamEventPreview');if(!box)return;const value=$('#sureEvent')?.value||'';const match=parseTeamEvent(value);box.innerHTML=match?teamEventHTML(value,{compact:true}):'';box.classList.toggle('visible',!!match);}
async function loadTeamLogo(team=''){
  const key=normalizeTeamKey(team);if(APP.teamLogoCache.has(key))return APP.teamLogoCache.get(key);
  const p=new Promise(resolve=>{const img=new Image();img.decoding='async';img.crossOrigin='anonymous';img.onload=()=>resolve(img);img.onerror=()=>resolve(null);img.src=teamLogoUrl(team)});APP.teamLogoCache.set(key,p);return p;
}
function drawTeamLogoFallback(ctx,team,x,y,size,dark){ctx.save();ctx.fillStyle=dark?'#171717':'#f4f4f5';ctx.strokeStyle=dark?'#3f3f46':'#d4d4d8';ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(x+size/2,y+size/2,size/2,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.fillStyle=dark?'#fafafa':'#111827';ctx.font=`800 ${Math.max(12,size*.28)}px system-ui,sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(teamInitials(team),x+size/2,y+size/2);ctx.restore();}
function drawTeamLogoCanvas(ctx,img,team,x,y,size,dark){
  if(!img){drawTeamLogoFallback(ctx,team,x,y,size,dark);return}
  const cx=x+size/2,cy=y+size/2,inner=size*.78;
  ctx.save();
  ctx.fillStyle=dark?'#111111':'#ffffff';ctx.strokeStyle=dark?'#3f3f46':'#e4e4e7';ctx.lineWidth=Math.max(1.5,size*.025);
  ctx.beginPath();ctx.arc(cx,cy,size/2,0,Math.PI*2);ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.arc(cx,cy,size*.43,0,Math.PI*2);ctx.clip();
  const ratio=Math.min(inner/img.width,inner/img.height),w=img.width*ratio,h=img.height*ratio;
  ctx.drawImage(img,cx-w/2,cy-h/2,w,h);ctx.restore();
}


function defaultSettings(){return {activeHouses:{},theme:'light'};}
function setSyncStatus(state='ok',detail='Dados sincronizados'){const note=$('#syncNote'),title=$('#syncTitle'),text=$('#syncDetail'),modal=$('#accountSyncText');if(!note)return;note.classList.remove('sync-pending','sync-error');if(state==='pending')note.classList.add('sync-pending');if(state==='error')note.classList.add('sync-error');if(title)title.textContent=state==='ok'?'Nuvem sincronizada':state==='pending'?'Sincronizando...':'Sincronização pendente';if(text)text.textContent=detail;if(modal)modal.textContent=detail;}
function showAuthGate(message=''){document.body.classList.add('auth-locked');const gate=$('#authGate'),form=$('#authForm'),loading=$('#authLoading');gate.hidden=false;if(message){loading.hidden=false;loading.textContent=message;form.hidden=true}else{loading.hidden=true;form.hidden=false;}}
function hideAuthGate(){document.body.classList.remove('auth-locked');$('#authGate').hidden=true;}
function setAuthMode(mode){APP.authMode=mode==='signup'?'signup':'signin';const signup=APP.authMode==='signup';$('#authTitle').textContent=signup?'Criar conta':'Entrar';$('#authSubtitle').textContent=signup?'Crie sua conta para salvar e sincronizar seus dados.':'Entre para carregar seus registros salvos na nuvem.';$('#authSubmit').textContent=signup?'Criar conta':'Entrar';$('#authSwitch').textContent=signup?'Já tenho uma conta':'Ainda não tenho conta';$('#authPassword').autocomplete=signup?'new-password':'current-password';$('#authError').textContent='';}
function authErrorMessage(error){const m=String(error?.message||error||'Erro ao entrar.');if(/invalid login credentials/i.test(m))return 'E-mail ou senha incorretos.';if(/already registered|already been registered|user already/i.test(m))return 'Este e-mail já possui uma conta.';if(/password/i.test(m)&&/least|short/i.test(m))return 'A senha precisa ter pelo menos 6 caracteres.';return m;}
function initCloudClient(){if(!window.supabase?.createClient)throw new Error('Não foi possível carregar o Supabase. Verifique sua conexão.');APP.cloud=window.supabase.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});}

async function handleAuthSubmit(ev){ev.preventDefault();const email=$('#authEmail').value.trim(),password=$('#authPassword').value;if(!email||!password)return;$('#authError').textContent='';$('#authSubmit').disabled=true;$('#authSubmit').textContent=APP.authMode==='signup'?'Criando...':'Entrando...';try{if(APP.authMode==='signup'){const {data,error}=await APP.cloud.auth.signUp({email,password});if(error)throw error;if(!data.session){setAuthMode('signin');$('#authError').textContent='Conta criada. Confirme o e-mail para entrar.';return}}else{const {error}=await APP.cloud.auth.signInWithPassword({email,password});if(error)throw error}}catch(err){$('#authError').textContent=authErrorMessage(err)}finally{$('#authSubmit').disabled=false;$('#authSubmit').textContent=APP.authMode==='signup'?'Criar conta':'Entrar'}}

function entryStamp(e){const t=Date.parse(e?.updatedAt||e?.createdAt||'');return Number.isFinite(t)?t:0;}
function syncMetaKey(userId=APP.user?.id){return userId?`${SYNC_META_PREFIX}${userId}`:''}
function getSyncMeta(userId=APP.user?.id){const empty={upserts:{},deletes:{},settingsDirtyAt:''};if(!userId)return empty;try{const parsed=JSON.parse(localStorage.getItem(syncMetaKey(userId))||'{}');return {upserts:parsed?.upserts&&typeof parsed.upserts==='object'?parsed.upserts:{},deletes:parsed?.deletes&&typeof parsed.deletes==='object'?parsed.deletes:{},settingsDirtyAt:parsed?.settingsDirtyAt||''}}catch{return empty}}
function saveSyncMeta(meta,userId=APP.user?.id){if(!userId)return;try{localStorage.setItem(syncMetaKey(userId),JSON.stringify({upserts:meta.upserts||{},deletes:meta.deletes||{},settingsDirtyAt:meta.settingsDirtyAt||''}))}catch{}}
function markPendingUpsert(entry){if(!APP.user||!entry?.id)return;const meta=getSyncMeta();meta.upserts[entry.id]=entry.updatedAt||new Date().toISOString();delete meta.deletes[entry.id];saveSyncMeta(meta)}
function clearPendingUpsert(id){if(!APP.user||!id)return;const meta=getSyncMeta();delete meta.upserts[id];saveSyncMeta(meta)}
function markPendingDelete(id){if(!APP.user||!id)return;const meta=getSyncMeta();meta.deletes[id]=new Date().toISOString();delete meta.upserts[id];saveSyncMeta(meta)}
function clearPendingDelete(id){if(!APP.user||!id)return;const meta=getSyncMeta();delete meta.deletes[id];saveSyncMeta(meta)}
function markSettingsDirty(){if(!APP.user)return;const meta=getSyncMeta();meta.settingsDirtyAt=APP.settings?._updatedAt||new Date().toISOString();saveSyncMeta(meta)}
function clearSettingsDirty(){if(!APP.user)return;const meta=getSyncMeta();meta.settingsDirtyAt='';saveSyncMeta(meta)}
function latestSyncLabel(prefix='Dados sincronizados'){const t=new Intl.DateTimeFormat('pt-BR',{hour:'2-digit',minute:'2-digit',second:'2-digit'}).format(new Date());return `${prefix} • ${t}`}
async function localPut(store,obj){return new Promise((res,rej)=>{const r=APP.db.transaction(store,'readwrite').objectStore(store).put(obj);r.onsuccess=()=>res();r.onerror=()=>rej(r.error)})}
async function localDelete(store,id){return new Promise((res,rej)=>{const r=APP.db.transaction(store,'readwrite').objectStore(store).delete(id);r.onsuccess=()=>res();r.onerror=()=>rej(r.error)})}
async function localClear(store){return new Promise((res,rej)=>{const r=APP.db.transaction(store,'readwrite').objectStore(store).clear();r.onsuccess=()=>res();r.onerror=()=>rej(r.error)})}
async function cloudUpsertEntry(entry){const stamp=entry.updatedAt||entry.createdAt||new Date().toISOString();const {error}=await APP.cloud.from('entries').upsert({id:entry.id,user_id:APP.user.id,data:entry,updated_at:stamp},{onConflict:'id'});if(error)throw error;}
async function cloudSaveSettings(settings){const stamp=settings?._updatedAt||new Date().toISOString();const {error}=await APP.cloud.from('user_settings').upsert({user_id:APP.user.id,data:settings,updated_at:stamp},{onConflict:'user_id'});if(error)throw error;}
async function cloudDeleteEntry(id){const {error}=await APP.cloud.from('entries').delete().eq('id',id).eq('user_id',APP.user.id);if(error)throw error;}
async function fetchCloudState(){const [{data:remoteRows,error:entriesError},{data:settingsRows,error:settingsError}]=await Promise.all([APP.cloud.from('entries').select('id,data,updated_at').eq('user_id',APP.user.id),APP.cloud.from('user_settings').select('data,updated_at').eq('user_id',APP.user.id).limit(1)]);if(entriesError)throw entriesError;if(settingsError)throw settingsError;return {rows:remoteRows||[],settingsRow:settingsRows?.[0]||null}}

async function dbPut(store,obj){if(store==='entries'&&!obj.updatedAt)obj.updatedAt=new Date().toISOString();await localPut(store,obj);if(APP.syncSuspended||!APP.user||!APP.cloud)return;try{setSyncStatus('pending','Salvando na nuvem...');if(store==='entries'){markPendingUpsert(obj);await cloudUpsertEntry(obj);clearPendingUpsert(obj.id)}else if(store==='settings'&&obj?.key==='appSettings'){markSettingsDirty();await cloudSaveSettings(obj.value);clearSettingsDirty()}setSyncStatus('ok',latestSyncLabel())}catch(err){console.error('Falha ao sincronizar:',err);setSyncStatus('error','Salvo neste aparelho • sincronização pendente')}}
async function dbDelete(store,id){await localDelete(store,id);if(APP.syncSuspended||!APP.user||!APP.cloud)return;try{if(store==='entries'){markPendingDelete(id);setSyncStatus('pending','Atualizando a nuvem...');await cloudDeleteEntry(id);clearPendingDelete(id);setSyncStatus('ok',latestSyncLabel())}}catch(err){console.error('Falha ao excluir na nuvem:',err);setSyncStatus('error','Exclusão pendente de sincronização')}}

function settingsHaveUserData(settings){const s=settings||{};return !!Object.keys(s.activeHouses||{}).length||!!s._updatedAt;}
async function migrateGuestLocalIntoCloud(localEntries,localSettings,remote){
  if(!localEntries.length&&!settingsHaveUserData(localSettings))return remote;
  const remoteMap=new Map((remote.rows||[]).map(r=>[r.id,r]));
  for(const raw of localEntries){
    const e={...raw};
    if(!e.id)continue;
    if(!e.updatedAt)e.updatedAt=e.createdAt||new Date().toISOString();
    const rr=remoteMap.get(e.id),localStamp=entryStamp(e),remoteStamp=Date.parse(rr?.updated_at||'')||0;
    if(!rr||localStamp>remoteStamp){await localPut('entries',e);await cloudUpsertEntry(e);}
  }
  if(!remote.settingsRow&&settingsHaveUserData(localSettings)){
    const settings={...defaultSettings(),...localSettings,_updatedAt:localSettings._updatedAt||new Date().toISOString()};
    await cloudSaveSettings(settings);
  }
  return fetchCloudState();
}
async function runCloudSync({quiet=false}={}){
  if(!APP.user||!APP.cloud)return false;
  if(!quiet)setSyncStatus('pending','Sincronizando seus dados...');
  const userId=APP.user.id,owner=localStorage.getItem(LOCAL_OWNER_KEY),isGuestLocal=!owner,canUseLocal=isGuestLocal||owner===userId;
  let localEntries=canUseLocal?await dbGetAll('entries'):[];
  const settingsRows=canUseLocal?await dbGetAll('settings'):[],settingsObj=settingsRows.find(x=>x.key==='appSettings');
  const localSettings=canUseLocal?{...defaultSettings(),...(settingsObj?.value||APP.settings||{})}:defaultSettings();
  let meta=getSyncMeta(userId);

  // Migra exclusões pendentes das versões anteriores sem reintroduzir itens apagados.
  for(const id of localSettings._pendingDeletes||[])if(!meta.deletes[id])meta.deletes[id]=new Date().toISOString();
  delete localSettings._pendingDeletes;
  saveSyncMeta(meta,userId);

  let remote=await fetchCloudState();

  // Primeiro login neste navegador: mescla o progresso local com a conta, mesmo se a nuvem já tiver histórico.
  // IDs novos são adicionados; em colisões, vence a versão mais recente. Assim o login nunca apaga o que já existia.
  if(isGuestLocal&&canUseLocal&&(localEntries.length||settingsHaveUserData(localSettings))){
    remote=await migrateGuestLocalIntoCloud(localEntries,localSettings,remote);
    saveSyncMeta({upserts:{},deletes:{},settingsDirtyAt:''},userId);
    meta=getSyncMeta(userId);
    localEntries=await dbGetAll('entries');
  }

  const remoteMap=new Map(remote.rows.map(r=>[r.id,r]));

  // Envia somente alterações realmente pendentes deste dispositivo, com resolução por updated_at.
  for(const [id,deletedAt] of Object.entries(meta.deletes||{})){
    const rr=remoteMap.get(id),remoteStamp=Date.parse(rr?.updated_at||'')||0,deleteStamp=Date.parse(deletedAt||'')||0;
    if(rr&&remoteStamp>deleteStamp){delete meta.deletes[id];continue}
    if(rr)await cloudDeleteEntry(id);
    delete meta.deletes[id];delete meta.upserts[id];
  }
  for(const [id,pendingAt] of Object.entries(meta.upserts||{})){
    const local=localEntries.find(e=>e.id===id);
    if(!local){delete meta.upserts[id];continue}
    const rr=remoteMap.get(id),remoteStamp=Date.parse(rr?.updated_at||'')||0,localStamp=Math.max(entryStamp(local),Date.parse(pendingAt||'')||0);
    if(rr&&remoteStamp>localStamp){delete meta.upserts[id];continue}
    await cloudUpsertEntry(local);delete meta.upserts[id];
  }
  if(meta.settingsDirtyAt){
    const remoteStamp=Date.parse(remote.settingsRow?.updated_at||'')||0,localStamp=Math.max(Date.parse(localSettings._updatedAt||'')||0,Date.parse(meta.settingsDirtyAt)||0);
    if(!remote.settingsRow||localStamp>=remoteStamp)await cloudSaveSettings(localSettings);
    meta.settingsDirtyAt='';
  }
  saveSyncMeta(meta,userId);

  remote=await fetchCloudState();
  const remoteEntries=remote.rows.map(r=>({...r.data,id:r.data?.id||r.id,__remoteStamp:Date.parse(r.updated_at)||0}));
  let finalMap=new Map(remoteEntries.map(e=>[e.id,e]));

  // Se algo mudou localmente durante a leitura, conserva a alteração até o próximo envio.
  const latestMeta=getSyncMeta(userId),latestLocal=canUseLocal?await dbGetAll('entries'):[],latestSettingsRows=canUseLocal?await dbGetAll('settings'):[],latestSettings=latestSettingsRows.find(x=>x.key==='appSettings')?.value||localSettings;
  for(const id of Object.keys(latestMeta.upserts||{})){const l=latestLocal.find(e=>e.id===id);if(l)finalMap.set(id,l)}
  for(const id of Object.keys(latestMeta.deletes||{}))finalMap.delete(id);
  const finalEntries=[...finalMap.values()].map(({__remoteStamp,...e})=>e);
  let finalSettings={...defaultSettings(),...(remote.settingsRow?.data||{})};
  if(latestMeta.settingsDirtyAt)finalSettings={...defaultSettings(),...latestSettings};
  delete finalSettings._pendingDeletes;

  const changed=stateSignature(APP.entries,APP.settings)!==stateSignature(finalEntries,finalSettings);
  if(changed){
    APP.syncSuspended=true;
    try{
      await localClear('entries');await localClear('settings');
      for(const e of finalEntries)await localPut('entries',e);
      await localPut('settings',{key:'appSettings',value:finalSettings});
    }finally{APP.syncSuspended=false}
  }

  APP.entries=finalEntries;APP.settings=finalSettings;
  localStorage.setItem(LOCAL_OWNER_KEY,userId);
  APP.cloudReady=true;
  applyTheme(APP.settings.theme||'light',false);
  const editingHouse=APP.currentView==='houses'&&document.activeElement?.matches?.('[data-house-setting]');
  if(changed){if(editingHouse)APP._deferredRender=true;else renderAll();}
  setSyncStatus('ok',latestSyncLabel(changed?'Sincronização automática ativa':'Sem alterações para atualizar'));
  return true;
}
async function syncWithCloud(options={}){if(!APP.user||!APP.cloud)return false;if(APP.syncInFlight){APP.syncQueued=true;return APP.syncInFlight}APP.syncInFlight=runCloudSync(options).catch(err=>{APP.cloudReady=false;console.error('Erro de sincronização:',err);setSyncStatus('error','Sem sincronizar • toque na conta para tentar novamente');throw err}).finally(()=>{APP.syncInFlight=null;if(APP.syncQueued){APP.syncQueued=false;setTimeout(()=>syncWithCloud({quiet:true}).catch(()=>{}),0)}});return APP.syncInFlight}
function scheduleCloudRefresh(delay=450){clearTimeout(APP._cloudRefresh);APP._cloudRefresh=setTimeout(()=>{if(APP.user&&document.visibilityState!=='hidden')syncWithCloud({quiet:true}).catch(()=>{})},delay)}
function stopCloudWatchers(){clearInterval(APP.syncTimer);APP.syncTimer=null;clearTimeout(APP._cloudRefresh);const oldChannel=APP.cloudChannel;APP.cloudChannel=null;if(oldChannel&&APP.cloud){try{const removal=APP.cloud.removeChannel(oldChannel);if(removal?.catch)removal.catch(()=>{})}catch{}}}
function startCloudWatchers(){stopCloudWatchers();if(!APP.user||!APP.cloud)return;try{APP.cloudChannel=APP.cloud.channel(`surecontrol-${APP.user.id}`).on('postgres_changes',{event:'INSERT',schema:'public',table:'entries',filter:`user_id=eq.${APP.user.id}`},()=>scheduleCloudRefresh()).on('postgres_changes',{event:'UPDATE',schema:'public',table:'entries',filter:`user_id=eq.${APP.user.id}`},()=>scheduleCloudRefresh()).on('postgres_changes',{event:'INSERT',schema:'public',table:'user_settings',filter:`user_id=eq.${APP.user.id}`},()=>scheduleCloudRefresh()).on('postgres_changes',{event:'UPDATE',schema:'public',table:'user_settings',filter:`user_id=eq.${APP.user.id}`},()=>scheduleCloudRefresh()).subscribe()}catch(err){console.warn('Realtime indisponível; usando sincronização periódica.',err)}APP.syncTimer=setInterval(()=>{if(APP.user&&document.visibilityState!=='hidden'&&navigator.onLine!==false)syncWithCloud({quiet:true}).catch(()=>{})},SYNC_INTERVAL_MS);if(!APP.syncHooksBound){APP.syncHooksBound=true;window.addEventListener('focus',()=>scheduleCloudRefresh(150));window.addEventListener('online',()=>scheduleCloudRefresh(150));document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')scheduleCloudRefresh(150)})}}

async function startUserSession(user){if(!user)return;if(APP.startingUser===user.id)return;if(APP.user?.id===user.id&&APP.cloudReady){hideAuthGate();startCloudWatchers();return}APP.startingUser=user.id;APP.user=user;$('#accountEmail').textContent=user.email||'Conta conectada';showAuthGate('Sincronizando seus dados...');try{await syncWithCloud();const repaired=await repairWholeOddBoostEntries();if(repaired){renderAll();setSyncStatus('ok',latestSyncLabel('Aumentos e históricos corrigidos'))}hideAuthGate();startCloudWatchers()}catch(err){hideAuthGate();renderAll();startCloudWatchers();toast('Login feito, mas a sincronização não terminou. Tente “Sincronizar agora”.')}finally{APP.startingUser=null}}
async function handleSignedOut(){stopCloudWatchers();APP.user=null;APP.cloudReady=false;APP.entries=[];APP.settings=defaultSettings();renderAll();setSyncStatus('error','Faça login para sincronizar');setAuthMode('signin');$('#authEmail').value='';$('#authPassword').value='';showAuthGate();}
async function signOut(){if(!APP.cloud)return;$('#accountModal').close();if(APP.user){try{setSyncStatus('pending','Conferindo dados antes de sair...');await syncWithCloud({quiet:true})}catch(err){console.error(err);toast('Não saí da conta para proteger dados ainda não sincronizados.');setSyncStatus('error','Sincronize antes de sair');return}}try{const {error}=await APP.cloud.auth.signOut({scope:'local'});if(error)throw error}catch(err){console.error(err);toast('Não foi possível sair agora.')}}
function wireAuth(){$('#authForm').addEventListener('submit',handleAuthSubmit);$('#authSwitch').addEventListener('click',()=>setAuthMode(APP.authMode==='signin'?'signup':'signin'));$('#accountBtn').addEventListener('click',()=>{if(APP.user){$('#accountEmail').textContent=APP.user.email||'Conta conectada';$('#accountModal').showModal()}});$('#closeAccount').addEventListener('click',()=>$('#accountModal').close());$('#signOutBtn').addEventListener('click',()=>{if(confirm('Sair somente deste dispositivo?'))signOut()});$('#syncNow').addEventListener('click',async()=>{const b=$('#syncNow');b.disabled=true;b.textContent='Sincronizando...';try{await syncWithCloud();toast('Sincronização concluída.')}catch{toast('Não foi possível sincronizar agora.')}finally{b.disabled=false;b.textContent='Sincronizar agora'}})}

function openDB(){ return new Promise((resolve,reject)=>{ const req=indexedDB.open('SureControlDB',1); req.onupgradeneeded=e=>{ const db=e.target.result; if(!db.objectStoreNames.contains('entries')) db.createObjectStore('entries',{keyPath:'id'}); if(!db.objectStoreNames.contains('settings')) db.createObjectStore('settings',{keyPath:'key'}); }; req.onsuccess=()=>{APP.db=req.result;resolve()}; req.onerror=()=>reject(req.error); }); }
function dbGetAll(store){return new Promise((res,rej)=>{const r=APP.db.transaction(store,'readonly').objectStore(store).getAll();r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)})}
async function loadData(){ APP.entries=await dbGetAll('entries'); const settings=await dbGetAll('settings'); const s=settings.find(x=>x.key==='appSettings'); if(s) APP.settings={...defaultSettings(),...s.value}; }

function wholeOddBoostedOdd(odd,boostPct=0){const o=parseNum(odd),b=Math.max(0,parseNum(boostPct))/100;return o>1?o*(1+b):0;}
function needsWholeOddBoostRepair(entry){
  if(entry?.type!=='surebet')return false;
  const legs=(entry.outcomes?.length?entry.outcomes:entry.offers)||[];
  return legs.some(o=>{const base=parseNum(o.odd),boost=parseNum(o.boost),stored=parseNum(o.effectiveOdd);if(!(base>1&&boost>0&&stored>0))return false;const wrong=wholeOddBoostedOdd(base,boost),correct=boostedOdd(base,boost);return entry.boostFormulaVersion===2||Math.abs(stored-wrong)<.011&&Math.abs(stored-correct)>.011;});
}
function rebuildWholeOddSurebet(entry){
  if(!needsWholeOddBoostRepair(entry))return null;
  const src=(entry.outcomes?.length?entry.outcomes:entry.offers)||[];
  if(src.length<2)return null;
  const legs=src.map((o,i)=>({i,target:Number.isInteger(o.target)?o.target:i,house:o.house||'',label:o.label||`Resultado ${i+1}`,odd:parseNum(o.odd||o.effectiveOdd),boost:Math.max(0,parseNum(o.boost)),commission:Math.max(0,parseNum(o.commission))/100,type:o.type==='lay'?'lay':'back',freebet:!!o.freebet,stake:i===0?parseNum(o.stake):parseNum(o.stake),fixed:i===0,effectiveOdd:boostedOdd(parseNum(o.odd||o.effectiveOdd),parseNum(o.boost))}));
  if(!(legs[0].stake>0)||legs.some(l=>!(l.odd>1)))return null;
  const result=solveSimpleSure(legs);if(!result)return null;
  const outcomes=result.legs.map((l,i)=>({...l,commission:l.commission*100,stake:result.stakes[i],liability:l.type==='lay'?(l.effectiveOdd-1)*result.stakes[i]:0}));
  const promotionCost=entry.promotionCostApplied?parseNum(entry.promotionCost):0,grossProfit=result.profit,profit=entry.promotionCostApplied?grossProfit-promotionCost:grossProfit,investment=entry.promotionCostApplied?result.cashUsed+promotionCost:result.cashUsed,roi=investment?profit/investment*100:0,returnValue=investment+profit;
  return {...entry,outcomes,offers:outcomes,coverageInvestment:result.cashUsed,investment,grossProfit,profit,roi,returnValue,updatedAt:new Date().toISOString(),boostFormulaVersion:3};
}
async function repairWholeOddBoostEntries({syncLinked=true}={}){
  const changed=[];
  for(const entry of APP.entries){const next=rebuildWholeOddSurebet(entry);if(next)changed.push(next)}
  if(!changed.length)return 0;
  for(const next of changed){APP.entries=APP.entries.map(e=>e.id===next.id?next:e);await dbPut('entries',next);if(syncLinked&&next.freebetSourceId)await syncFreebetWithSurebet(next)}
  return changed.length;
}
async function saveSettings(){APP.settings._updatedAt=new Date().toISOString();await dbPut('settings',{key:'appSettings',value:APP.settings});}
async function addEntry(entry){ if(!entry.updatedAt)entry.updatedAt=entry.createdAt||new Date().toISOString();APP.entries.push(entry); await dbPut('entries',entry); renderAll(); }
async function removeEntry(id){ APP.entries=APP.entries.filter(e=>e.id!==id); await dbDelete('entries',id); renderAll(); toast('Registro excluído.'); }

function applyTheme(theme,save=false){const next=theme==='dark'?'dark':'light';document.documentElement.setAttribute('data-theme',next);document.body?.setAttribute('data-theme',next);APP.settings.theme=next;try{localStorage.setItem('surecontrol-theme',next)}catch{}const btn=$('#themeToggle'),meta=document.querySelector('meta[name="theme-color"]');if(btn){const ico=btn.querySelector('.theme-icon');if(ico)ico.innerHTML=iconSVG(next==='dark'?'sun':'moon');btn.title=next==='dark'?'Usar modo claro':'Usar modo noturno';btn.setAttribute('aria-label',btn.title);btn.setAttribute('aria-pressed',next==='dark'?'true':'false')}if(meta)meta.content=next==='dark'?'#090909':'#ffffff';if(save&&APP.db)saveSettings();try{drawChart()}catch{}}
function toggleTheme(){applyTheme((APP.settings.theme||'light')==='dark'?'light':'dark',true)}
function freebetNavIconHTML(){return `<span class="freebet-nav-art" aria-hidden="true"><img class="freebet-nav-img inactive" src="assets/brand/freebet-nav-inactive.png" alt=""><img class="freebet-nav-img active" src="assets/brand/freebet-nav-active.png" alt=""></span>`;}
function renderNav(){ const html=NAV.filter(([id])=>id!=='houses').map(([id,ico,label])=>`<button class="nav-btn ${id==='dashboard'?'active':''}" data-nav="${id}"><span class="nav-ico">${iconSVG(ico)}</span><span>${label}</span></button>`).join(''); $('#desktopNav').innerHTML=html; $('#mobileNav').innerHTML=html; }
function hydrateStaticIcons(){$$('[data-icon]').forEach(el=>{el.innerHTML=iconSVG(el.dataset.icon)});}
function navigate(id,options={}){ const topBehavior=options.silent?'auto':'smooth'; APP.currentView=id; $$('.view').forEach(v=>v.classList.remove('active')); $(`#view-${id}`).classList.add('active'); $$('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.nav===id)); $('#pageTitle').textContent=NAV.find(x=>x[0]===id)?.[3]||'SureControl'; window.scrollTo({top:0,behavior:topBehavior}); }

function entryProfit(e){ return parseNum(e.profit); }
function dateOnly(s){ return new Date(`${s}T12:00:00`); }
function mondayOfWeek(date=new Date()){const d=new Date(date);d.setHours(0,0,0,0);const day=d.getDay();const delta=day===0?-6:1-day;d.setDate(d.getDate()+delta);return d;}
function sundayOfWeek(date=new Date()){const d=mondayOfWeek(date);d.setDate(d.getDate()+6);d.setHours(23,59,59,999);return d;}
function weekRangeLabel(date=new Date()){const start=mondayOfWeek(date),end=sundayOfWeek(date),fmt=d=>d.toLocaleDateString('pt-BR',{day:'2-digit',month:'2-digit'});return `${fmt(start)} a ${fmt(end)}`;}
function weekKeyFromDate(date){return localDateISO(mondayOfWeek(date));}
function formatWeekKey(key){if(!key)return '—';const start=dateOnly(key),end=new Date(start);end.setDate(end.getDate()+6);const fmt=d=>d.toLocaleDateString('pt-BR',{day:'2-digit',month:'2-digit'});return `${fmt(start)}–${fmt(end)}`;}
function sums(){ const now=new Date(); now.setHours(23,59,59,999); const today=todayISO(); const weekStart=mondayOfWeek(now); const monthStart=new Date(now.getFullYear(),now.getMonth(),1); let res={today:0,week:0,month:0,total:0,todayCount:0,weekStart:localDateISO(weekStart),weekEnd:localDateISO(sundayOfWeek(now))}; for(const e of APP.entries){ const p=entryProfit(e), d=dateOnly(e.date); res.total+=p; if(e.date===today){res.today+=p;res.todayCount++} if(d>=weekStart&&d<=now)res.week+=p; if(d>=monthStart&&d<=now)res.month+=p; } return res; }
function sureEntries(){return APP.entries.filter(e=>e.type==='surebet');}
function overallSureROI(){const sure=sureEntries(),invested=sure.reduce((a,e)=>a+parseNum(e.investment),0),profit=sure.reduce((a,e)=>a+entryProfit(e),0);return invested>0?(profit/invested)*100:0;}
function performanceStats(){const sure=sureEntries(),spins=APP.entries.filter(e=>e.type==='spins'),manual=APP.entries.filter(e=>e.type==='manual');const invested=sure.reduce((a,e)=>a+parseNum(e.investment),0),profit=sure.reduce((a,e)=>a+entryProfit(e),0),roi=invested>0?(profit/invested)*100:0,avgProfit=sure.length?profit/sure.length:0;const byDay={},byWeek={};APP.entries.forEach(e=>{const p=entryProfit(e);byDay[e.date]=(byDay[e.date]||0)+p;const wk=weekKeyFromDate(dateOnly(e.date));byWeek[wk]=(byWeek[wk]||0)+p;});const dayItems=Object.entries(byDay).sort((a,b)=>a[1]-b[1]),weekItems=Object.entries(byWeek).sort((a,b)=>a[1]-b[1]);return {invested,profit,roi,avgProfit,sureCount:sure.length,spinCount:spins.length,manualCount:manual.length,bestDay:dayItems.at(-1)||null,worstDay:dayItems[0]||null,bestWeek:weekItems.at(-1)||null,worstWeek:weekItems[0]||null,sureProfit:profit,spinProfit:spins.reduce((a,e)=>a+entryProfit(e),0),manualProfit:manual.reduce((a,e)=>a+entryProfit(e),0)};}
function stateSignature(entries=APP.entries,settings=APP.settings){const entrySig=[...(entries||[])].map(e=>`${e.id||''}|${e.updatedAt||e.createdAt||''}|${entryProfit(e)}|${parseNum(e.investment)}|${parseNum(e.roi)}`).sort().join('~');const houseSig=Object.entries(settings?.activeHouses||{}).sort((a,b)=>a[0].localeCompare(b[0])).map(([id,v])=>`${id}:${v?.active?1:0}:${parseNum(v?.balance)}:${parseNum(v?.commission)}:${parseNum(v?.boost)}`).join('~');return `${settings?.theme||'light'}|${settings?._updatedAt||''}|${entrySig}|${houseSig}`;}
function imagePalette(theme=APP.settings.theme||document.documentElement.dataset.theme||'light'){const dark=theme==='dark';return dark?{theme:'dark',bg:'#090909',panel:'#121212',panelAlt:'#181818',stroke:'rgba(255,255,255,.12)',text:'#fafafa',muted:'#a1a1aa',blue1:'#fafafa',blue2:'#d4d4d8',positive:'#22c55e',negative:'#f87171',softPositive:'rgba(34,197,94,.14)',softNegative:'rgba(248,113,113,.14)',chip:'rgba(255,255,255,.08)',white:'#ffffff'}:{theme:'light',bg:'#f4f4f5',panel:'#ffffff',panelAlt:'#fafafa',stroke:'#e4e4e7',text:'#111827',muted:'#71717a',blue1:'#111827',blue2:'#27272a',positive:'#16a34a',negative:'#dc2626',softPositive:'#ecfdf3',softNegative:'#fff1f2',chip:'#f4f4f5',white:'#ffffff'};}

function setMoney(id,val){ const el=$(id); el.textContent=brl(val); el.className=moneyClass(val); }
function renderDashboard(){ const s=sums(); setMoney('#sumToday',s.today);setMoney('#sumWeek',s.week);setMoney('#sumMonth',s.month);setMoney('#sumTotal',s.total); $('#sumTodayCount').textContent=`${s.todayCount} ${s.todayCount===1?'registro':'registros'}`; const weekLabel=$('#weekLabel');if(weekLabel)weekLabel.textContent=weekRangeLabel(new Date()); $('#monthLabel').textContent=new Intl.DateTimeFormat('pt-BR',{month:'long'}).format(new Date()); renderBalances(); drawChart(); }
function activeHouses(){ return Object.entries(APP.settings.activeHouses||{}).filter(([,v])=>v.active); }
function houseById(id){return APP.houses.find(h=>h.id===id)}
function houseLogo(h){if(h?.temLogo&&h.logo)return `<img class="house-logo" src="${esc(h.logo)}" onerror="this.outerHTML='<span class=\'house-logo logo-fallback\'>${esc((h.nome||'?').slice(0,2))}</span>'">`; return `<span class="house-logo logo-fallback">${esc((h?.nome||'?').slice(0,2))}</span>`;}
function renderBalances(){ const arr=activeHouses().sort((a,b)=>(b[1].balance||0)-(a[1].balance||0)); const box=$('#balanceList'); if(!box)return; if(!arr.length){box.className='balance-list empty-state';box.textContent='Nenhuma casa configurada.';} else { box.className='balance-list'; box.innerHTML=arr.slice(0,7).map(([id,v])=>{const h=houseById(id);return `<div class="balance-row"><div class="house-id">${houseLogo(h)}<div><b>${esc(h?.nome||id)}</b><small>${esc(h?.dominio||'')}</small></div></div><strong>${brl(v.balance)}</strong></div>`}).join(''); } const total=$('#bankTotal');if(total)total.textContent=brl(arr.reduce((a,[,v])=>a+parseNum(v.balance),0)); }
function entryLabel(e){return e.type==='surebet'?(e.event||'Surebet'):e.type==='spins'?`Giros grátis • ${houseById(e.house)?.nome||e.house||'Casa'}`:e.type==='freebet'?(e.name||'Freebet'):(e.description||'Ajuste manual')}
function renderRecent(){ const arr=[...APP.entries].sort((a,b)=>(b.date+b.createdAt).localeCompare(a.date+a.createdAt)).slice(0,6), box=$('#recentList'); if(!box)return; if(!arr.length){box.className='activity-list empty-state';box.textContent='Ainda não há movimentações.';return} box.className='activity-list';box.innerHTML=arr.map(e=>`<div class="activity ${e.type==='surebet'?'activity-match':''}"><div class="activity-copy">${e.type==='surebet'?teamEventHTML(e.event):`<b>${esc(entryLabel(e))}</b>`}<small>${new Date(e.date+'T12:00:00').toLocaleDateString('pt-BR')} • ${e.type==='surebet'?'Surebet':e.type==='spins'?'Giros grátis':e.type==='freebet'?'Freebet':'Manual'}</small></div><strong class="${moneyClass(entryProfit(e))}">${brl(entryProfit(e))}</strong></div>`).join(''); }

function dailySeries(days){ const map={}; APP.entries.forEach(e=>map[e.date]=(map[e.date]||0)+entryProfit(e)); const labels=[], vals=[]; let acc=0; for(let i=days-1;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);const iso=localDateISO(d);acc+=map[iso]||0;labels.push(`${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}`);vals.push(acc)} return {labels,vals}; }
function drawChart(){ const c=$('#profitChart'),ctx=c.getContext('2d'),days=parseInt($('#chartRange').value); const d=dailySeries(days),W=c.clientWidth*devicePixelRatio,H=220*devicePixelRatio;c.width=W;c.height=H;ctx.scale(devicePixelRatio,devicePixelRatio);const w=c.clientWidth,h=220,pad=28;ctx.clearRect(0,0,w,h);const min=Math.min(0,...d.vals),max=Math.max(0,...d.vals),span=(max-min)||1;ctx.strokeStyle=getComputedStyle(document.documentElement).getPropertyValue('--line').trim()||'#dbe5f2';ctx.lineWidth=1;for(let i=0;i<4;i++){const y=pad+(h-pad*2)*(i/3);ctx.beginPath();ctx.moveTo(pad,y);ctx.lineTo(w-pad,y);ctx.stroke()} const pts=d.vals.map((v,i)=>[pad+(w-pad*2)*(i/Math.max(1,d.vals.length-1)),h-pad-((v-min)/span)*(h-pad*2)]); if(pts.length){ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(...p):ctx.moveTo(...p));ctx.strokeStyle=getComputedStyle(document.documentElement).getPropertyValue('--blue').trim()||'#2563eb';ctx.lineWidth=2.4;ctx.stroke();ctx.lineTo(pts.at(-1)[0],h-pad);ctx.lineTo(pts[0][0],h-pad);ctx.closePath();const g=ctx.createLinearGradient(0,pad,0,h-pad);g.addColorStop(0,document.documentElement.dataset.theme==='dark'?'rgba(250,250,250,.16)':'rgba(24,24,27,.12)');g.addColorStop(1,'rgba(24,24,27,0)');ctx.fillStyle=g;ctx.fill()} ctx.fillStyle=getComputedStyle(document.documentElement).getPropertyValue('--muted').trim()||'#64748b';ctx.font='10px system-ui';[0,Math.floor((days-1)/2),days-1].forEach(i=>{if(d.labels[i])ctx.fillText(d.labels[i],pad+(w-pad*2)*(i/Math.max(1,days-1))-12,h-6)}); }

function readLegRows(){return [...$$('.outcome-row')].map((r,i)=>({house:r.querySelector('.out-house')?.value||'',odd:r.querySelector('.out-odd')?.value||'',stake:r.querySelector('.out-stake')?.value||'100',betType:r.dataset.betType||'back',commissionEnabled:r.querySelector('.out-commission-enabled')?.checked||false,commission:r.querySelector('.out-commission')?.value||'',boostEnabled:r.querySelector('.out-boost-enabled')?.checked||false,boost:r.querySelector('.out-boost')?.value||'',freebet:r.querySelector('.out-freebet')?.checked||false,target:Number.isInteger(+r.dataset.target)?+r.dataset.target:i,fixed:i===APP.fixedLegIndex}));}
function renderOutcomeRows(){
  const existing=APP._restoreLegs||readLegRows();
  APP.fixedLegIndex=Math.max(0,Math.min(APP.fixedLegIndex||0,Math.max(0,APP.legCount-1)));
  APP.marketOutcomes=APP.legCount;
  $('#outcomeRows').innerHTML=Array.from({length:APP.legCount},(_,i)=>{const e=existing[i]||{};const fixed=i===APP.fixedLegIndex;const betType=e.betType==='lay'?'lay':'back';const commissionEnabled=!!e.commissionEnabled||parseNum(e.commission)>0;const boostEnabled=!!e.boostEnabled||parseNum(e.boost)>0;return `<div class="outcome-row simple-sure-card ${fixed?'stake-fixed':''}" data-outcome-index="${i}" data-bet-type="${betType}" data-target="${Number.isInteger(+e.target)?+e.target:i}">
    <div class="simple-card-head"><strong>Casa ${i+1}</strong><span class="result-badge">Resultado ${i+1}</span></div>
    <label class="out-house-wrap">Casa de aposta<select class="out-house">${houseOptions(e.house)}</select></label>
    <label>Odd<input class="out-odd" type="text" inputmode="decimal" autocomplete="off" placeholder="2,10" value="${esc(e.odd||'')}"></label>
    <div class="odd-final-line"><span>Odd final</span><strong class="effective-odd">0,00</strong></div>
    <label>Stake<div class="stake-line"><div class="money-input"><span>R$</span><input class="out-stake" type="text" inputmode="decimal" autocomplete="off" value="${esc(e.stake||'100')}" aria-label="Stake da Casa ${i+1}"></div><button class="bet-toggle ${betType}" type="button" aria-label="Alternar Back e Lay">${betType==='lay'?'L':'B'}</button></div><small class="lay-liability"></small></label>
    <div class="option-list option-seal-grid">
      <div class="option-unit option-unit-commission">
        <label class="option-toggle option-seal-card commission-seal">
          <input class="out-commission-enabled" type="checkbox" ${commissionEnabled?'checked':''}>
          <span class="option-seal-icon">${iconSVG('percent')}</span>
          <span class="option-seal-label">Comissão</span>
          <span class="option-seal-switch" aria-hidden="true"></span>
        </label>
        <div class="inline-percent commission-percent ${commissionEnabled?'show':''}"><input class="out-commission" type="text" inputmode="decimal" autocomplete="off" value="${esc(e.commission||'')}"><span>%</span></div>
      </div>
      <div class="option-unit option-unit-freebet">
        <label class="option-toggle option-seal-card freebet-seal">
          <input class="out-freebet" type="checkbox" ${e.freebet?'checked':''}>
          <span class="option-seal-icon">${iconSVG('freebet')}</span>
          <span class="option-seal-label">Freebet</span>
          <span class="option-seal-switch" aria-hidden="true"></span>
        </label>
      </div>
      <div class="option-unit option-unit-boost">
        <label class="option-toggle option-seal-card boost-seal">
          <input class="out-boost-enabled" type="checkbox" ${boostEnabled?'checked':''}>
          <span class="option-seal-icon">${iconSVG('boost')}</span>
          <span class="option-seal-label">Aumento</span>
          <span class="option-seal-switch" aria-hidden="true"></span>
        </label>
        <div class="inline-percent boost-percent ${boostEnabled?'show':''}"><input class="out-boost" type="text" inputmode="decimal" autocomplete="off" value="${esc(e.boost||'')}"><span>%</span></div>
      </div>
    </div>
    <button type="button" class="fix-stake-btn ${fixed?'active':''}">${fixed?'Stake de referência':'Usar como referência'}</button>
  </div>`;}).join('');
  $$('.house-count-btn').forEach(b=>b.classList.toggle('active',+b.dataset.houseCount===APP.legCount));
  $$('.outcome-row').forEach(updateOutcomeRowUI);
}
function setHouseCount(n){n=Math.max(2,Math.min(6,+n||2));const rows=readLegRows();APP.legCount=n;APP.marketOutcomes=n;APP.fixedLegIndex=Math.max(0,Math.min(APP.fixedLegIndex||0,n-1));while(rows.length<n)rows.push({stake:'100',betType:'back',fixed:false});rows.length=n;rows.forEach((r,i)=>r.fixed=i===APP.fixedLegIndex);renderOutcomeRowsFrom(rows);resetSureDisplay();scheduleSureRecalc(0);}
function addHouseLeg(){setHouseCount(APP.legCount+1)}
function removeHouseLeg(){setHouseCount(APP.legCount-1)}
function renderOutcomeRowsFrom(rows){$('#outcomeRows').innerHTML='';APP._restoreLegs=rows;renderOutcomeRows();delete APP._restoreLegs;}
function houseOptions(selected=''){ const active=activeHouses().map(([id])=>houseById(id)).filter(Boolean); const list=[...(active.length?active:APP.houses)].sort((a,b)=>(a.nome||'').localeCompare(b.nome||'','pt-BR',{numeric:true,sensitivity:'base'})); return `<option value="">Selecione</option>`+list.map(h=>`<option value="${esc(h.id)}" ${h.id===selected?'selected':''}>${esc(h.nome)}</option>`).join(''); }
function toggleBetType(row){const next=row.dataset.betType==='lay'?'back':'lay';if(next==='lay'&&row.querySelector('.out-freebet')?.checked){row.querySelector('.out-freebet').checked=false;toast('Freebet foi desmarcada porque aposta Lay não usa freebet.');}row.dataset.betType=next;updateOutcomeRowUI(row);resetSureDisplay();}
function setFixedRow(rowOrIndex=APP.fixedLegIndex){const rows=$$('.outcome-row');let idx=typeof rowOrIndex==='number'?rowOrIndex:rows.indexOf(rowOrIndex);if(idx<0)idx=APP.fixedLegIndex||0;APP.fixedLegIndex=Math.max(0,Math.min(idx,Math.max(0,rows.length-1)));rows.forEach((r,i)=>{const fixed=i===APP.fixedLegIndex;r.classList.toggle('stake-fixed',fixed);const inp=r.querySelector('.out-stake');if(inp)inp.readOnly=false;const b=r.querySelector('.fix-stake-btn');b?.classList.toggle('active',fixed);if(b){b.disabled=false;b.textContent=fixed?'Stake de referência':'Usar como referência';b.setAttribute('aria-pressed',fixed?'true':'false')}});}
function updateOutcomeRowUI(row){const type=row.dataset.betType||'back',btn=row.querySelector('.bet-toggle'),fb=row.querySelector('.out-freebet'),comOn=row.querySelector('.out-commission-enabled'),boostOn=row.querySelector('.out-boost-enabled');if(btn){btn.textContent=type==='lay'?'L':'B';btn.classList.toggle('lay',type==='lay');btn.classList.toggle('back',type!=='lay');btn.title=type==='lay'?'LAY — apostar contra':'BACK — apostar a favor'}if(fb?.checked&&type==='lay'){fb.checked=false}row.querySelector('.commission-percent')?.classList.toggle('show',!!comOn?.checked);row.querySelector('.boost-percent')?.classList.toggle('show',!!boostOn?.checked);const odd=parseNum(row.querySelector('.out-odd')?.value),boost=boostOn?.checked?Math.max(0,parseNum(row.querySelector('.out-boost')?.value)):0,eff=boostedOdd(odd,boost),displayOdd=fb?.checked&&eff>1?eff-1:eff,el=row.querySelector('.effective-odd');if(el)el.textContent=displayOdd?displayOdd.toFixed(2).replace('.',','):'0,00';const stake=parseNum(row.querySelector('.out-stake')?.value),liab=row.querySelector('.lay-liability');if(liab)liab.textContent=type==='lay'&&eff>1?`Responsabilidade: ${brl((eff-1)*stake)}`:'';}
function applyHouseDefaults(row){const id=row.querySelector('.out-house').value;if(!id)return;const cfg=APP.settings.activeHouses?.[id]||{},com=row.querySelector('.out-commission'),boost=row.querySelector('.out-boost'),comOn=row.querySelector('.out-commission-enabled'),boostOn=row.querySelector('.out-boost-enabled');if(parseNum(cfg.commission)){com.value=parseNum(cfg.commission);comOn.checked=true}if(parseNum(cfg.boost)){boost.value=parseNum(cfg.boost);boostOn.checked=true}updateOutcomeRowUI(row);}
function gaussianSolve(A,b){const n=A.length,M=A.map((r,i)=>[...r,b[i]]);for(let col=0;col<n;col++){let pivot=col;for(let r=col+1;r<n;r++)if(Math.abs(M[r][col])>Math.abs(M[pivot][col]))pivot=r;if(Math.abs(M[pivot][col])<1e-10)return null;[M[col],M[pivot]]=[M[pivot],M[col]];const d=M[col][col];for(let c=col;c<=n;c++)M[col][c]/=d;for(let r=0;r<n;r++){if(r===col)continue;const f=M[r][col];for(let c=col;c<=n;c++)M[r][c]-=f*M[col][c];}}return M.map(r=>r[n]);}
function legFromRow(row,i){const odd=parseNum(row.querySelector('.out-odd').value),boostEnabled=row.querySelector('.out-boost-enabled').checked,boost=boostEnabled?Math.max(0,parseNum(row.querySelector('.out-boost').value)):0,commissionEnabled=row.querySelector('.out-commission-enabled').checked,commission=commissionEnabled?Math.min(100,Math.max(0,parseNum(row.querySelector('.out-commission').value)))/100:0,type=row.dataset.betType||'back',freebet=row.querySelector('.out-freebet').checked,stake=parseNum(row.querySelector('.out-stake').value),fixed=i===APP.fixedLegIndex,target=Number.isInteger(+row.dataset.target)?+row.dataset.target:i;return {i,target,house:row.querySelector('.out-house').value,label:`Resultado ${i+1}`,odd,boost,commission,type,freebet,stake,fixed,effectiveOdd:boostedOdd(odd,boost)};}
function unitPayoff(leg,outcome){const o=leg.effectiveOdd,c=leg.commission;if(leg.freebet)return outcome===leg.target?(o-1)*(1-c):0;if(leg.type==='lay')return outcome===leg.target?-(o-1):(1-c);return outcome===leg.target?(o-1)*(1-c):-1;}
function unitCost(leg){if(leg.freebet)return 0;return leg.type==='lay'?(leg.effectiveOdd-1):1;}
function resetSureDisplay(msg='Aguardando odds'){$('#arbMargin').textContent=$('#arbReturn').textContent=$('#arbProfit').textContent=$('#arbRoi').textContent='—';$('#impliedSum').textContent='—';$('#arbStatus').textContent=msg;$('#arbStatus').className='';$('#sureResult').className='calc-result neutral';$('#allocationBox').innerHTML='';}
function resetSureFormForNewEntry(){
  APP.editingSureId=null;APP.editingSpinId=null;APP.editingFreebetId=null;APP.plannedFreebetId=null;APP.legCount=2;APP.marketOutcomes=2;APP.fixedLegIndex=0;APP.stakeMode='auto';
  $('#sureDate').value=todayISO();$('#sureEvent').value='';$('#saveSure').textContent='Salvar surebet';
  renderOutcomeRowsFrom([
    {house:'',odd:'',stake:'100',betType:'back',commissionEnabled:false,commission:'',boostEnabled:false,boost:'',freebet:false,fixed:true},
    {house:'',odd:'',stake:'100',betType:'back',commissionEnabled:false,commission:'',boostEnabled:false,boost:'',freebet:false,fixed:false}
  ]);
  clearSpecialTags();clearPlannedFreebet(false);updatePlannedFreebetUI();resetSureDisplay();
}
function resetSpinFormForNewEntry(){APP.editingSpinId=null;APP.editingSureId=null;$('#spinDate').value=todayISO();$('#spinHouse').value='';$('#spinCount').value='';$('#spinValue').value='';$('#spinBefore').value='';$('#spinAfter').value='';$('#saveSpin').textContent='Salvar resultado';calcSpins();}
function prepareNewEntry(type){if(type==='surebet')resetSureFormForNewEntry();else if(type==='spins')resetSpinFormForNewEntry();else if(type==='freebets'){resetFreebetForm();APP.freebetTab='add';switchFreebetTab('add');}}
function solveForTargets(legs,targets){const n=legs.length,work=legs.map((l,i)=>({...l,target:targets[i]}));let fixedIndex=work.findIndex(l=>l.fixed);if(fixedIndex<0)fixedIndex=0;const fixedStake=work[fixedIndex].stake;if(fixedStake<=0)return null;const A=[],b=[];for(let out=1;out<n;out++){A.push(work.map(l=>unitPayoff(l,out)-unitPayoff(l,0)));b.push(0)}const fixedEq=Array(n).fill(0);fixedEq[fixedIndex]=1;A.push(fixedEq);b.push(fixedStake);const stakes=gaussianSolve(A,b);if(!stakes||stakes.some(x=>!Number.isFinite(x)||x<-.005))return null;const safeStakes=stakes.map((x,i)=>cents(i===fixedIndex?fixedStake:Math.max(0,x)));const profits=Array.from({length:n},(_,out)=>work.reduce((sum,l,i)=>sum+unitPayoff(l,out)*safeStakes[i],0));const profit=Math.min(...profits),maxProfit=Math.max(...profits),cashUsed=work.reduce((sum,l,i)=>sum+unitCost(l)*safeStakes[i],0),roi=cashUsed?profit/cashUsed*100:0,ret=cashUsed+profit;return {legs:work,stakes:safeStakes,profits,profit,maxProfit,cashUsed,roi,ret,margin:roi,isArb:profit>0.005,fixedIndex};}
function solveBackOnlySure(legs){const n=legs.length,work=legs.map((l,i)=>({...l,target:i}));let fixedIndex=Math.max(0,Math.min(n-1,APP.fixedLegIndex||0));if(!work[fixedIndex]?.fixed){const found=work.findIndex(l=>l.fixed);if(found>=0)fixedIndex=found}const fixedStake=work[fixedIndex]?.stake||0;if(fixedStake<=0)return null;const freeIndex=work.findIndex(l=>l.freebet);const regularFactor=l=>1+(l.effectiveOdd-1)*(1-l.commission);const freeFactor=l=>(l.effectiveOdd-1)*(1-l.commission);let targetReturn;if(freeIndex>=0&&fixedIndex===freeIndex){const f=freeFactor(work[freeIndex]);if(f<=0)return null;targetReturn=fixedStake*f}else{const q=regularFactor(work[fixedIndex]);if(q<=0)return null;targetReturn=fixedStake*q}const stakes=work.map((l,i)=>{if(l.freebet){const f=freeFactor(l);return f>0?targetReturn/f:NaN}const q=regularFactor(l);return q>0?targetReturn/q:NaN});if(stakes.some(x=>!Number.isFinite(x)||x<0))return null;for(let i=0;i<stakes.length;i++)stakes[i]=cents(i===fixedIndex?fixedStake:stakes[i]);const profits=Array.from({length:n},(_,out)=>work.reduce((sum,l,i)=>sum+unitPayoff(l,out)*stakes[i],0));const profit=Math.min(...profits),maxProfit=Math.max(...profits),cashUsed=work.reduce((sum,l,i)=>sum+unitCost(l)*stakes[i],0),roi=cashUsed?profit/cashUsed*100:0,ret=cashUsed+profit;return {legs:work,stakes,profits,profit,maxProfit,cashUsed,roi,ret,margin:roi,isArb:profit>0.005,fixedIndex};}

function solveSimpleSure(legs){const n=legs.length;const layIdx=legs.map((l,i)=>l.type==='lay'?i:-1).filter(i=>i>=0);if(!layIdx.length)return solveBackOnlySure(legs);let best=null;const targets=legs.map((_,i)=>i);function search(k){if(k===layIdx.length){const r=solveForTargets(legs,targets);if(!r)return;const score=[r.profit,-Math.abs(r.maxProfit-r.profit),-r.cashUsed];const bestScore=best?[best.profit,-Math.abs(best.maxProfit-best.profit),-best.cashUsed]:null;if(!best||score[0]>bestScore[0]+1e-8||(Math.abs(score[0]-bestScore[0])<1e-8&&score[1]>bestScore[1]+1e-8)||(Math.abs(score[0]-bestScore[0])<1e-8&&Math.abs(score[1]-bestScore[1])<1e-8&&score[2]>bestScore[2]))best=r;return;}const idx=layIdx[k];for(let t=0;t<n;t++){targets[idx]=t;search(k+1)}targets[idx]=idx;}search(0);return best;}
function setSpecialTags(ids=[]){APP.specialTags=normalizeSpecialTags(ids);$$('[data-special-tag]').forEach(b=>b.classList.toggle('selected',APP.specialTags.includes(b.dataset.specialTag)));}
function toggleSpecialTag(id){const next=new Set(APP.specialTags);next.has(id)?next.delete(id):next.add(id);setSpecialTags([...next]);}
function clearSpecialTags(){setSpecialTags([]);}
function switchFreebetTab(tab='add'){APP.freebetTab=tab;$$('.freebet-tab').forEach(b=>b.classList.toggle('active',b.dataset.freebetTab===tab));['add','pending','extracted'].forEach(k=>{const el=$('#freebetTab'+k[0].toUpperCase()+k.slice(1));if(el)el.classList.toggle('active',k===tab)});}
function evaluateManualSure(legs){const work=legs.map((l,i)=>({...l,target:Number.isInteger(l.target)?l.target:i})),stakes=work.map(l=>cents(Math.max(0,l.stake)));if(stakes.some(v=>!Number.isFinite(v)||v<0))return null;const profits=Array.from({length:work.length},(_,out)=>work.reduce((sum,l,i)=>sum+unitPayoff(l,out)*stakes[i],0)),profit=Math.min(...profits),maxProfit=Math.max(...profits),cashUsed=work.reduce((sum,l,i)=>sum+unitCost(l)*stakes[i],0),roi=cashUsed?profit/cashUsed*100:0,ret=cashUsed+profit;return {legs:work,stakes,profits,profit,maxProfit,cashUsed,roi,ret,margin:roi,isArb:profits.every(p=>p>0.005),fixedIndex:APP.fixedLegIndex||0,manual:true};}
function calcSure(options={}){const rows=$$('.outcome-row'),legs=rows.map(legFromRow);if(legs.some(l=>l.odd<=1)){if(!options.silent)toast('Informe uma odd válida em todas as casas.');resetSureDisplay('Odds incompletas');return null}if(legs.filter(l=>l.freebet).length>1){if(!options.silent)toast('Use no máximo uma Freebet por cálculo.');return null}const free=legs.findIndex(l=>l.freebet),fixed=Math.max(0,Math.min(APP.fixedLegIndex||0,rows.length-1));if(free>=0&&legs[free].type==='lay'){if(!options.silent)toast('Freebet precisa ser BACK.');return null}legs.forEach((l,i)=>l.fixed=i===fixed);let result;if(APP.stakeMode==='manual'&&!options.forceEqualize){if(legs.some(l=>l.stake<0)){if(!options.silent)toast('Informe stakes válidas.');return null}result=evaluateManualSure(legs);}else{setFixedRow(rows[fixed]);if(legs[fixed].stake<=0){if(!options.silent)toast('Informe o valor da stake de referência.');return null}result=solveSimpleSure(legs);if(!result){if(!options.silent)toast('Essa combinação não pôde ser equilibrada. Confira as odds e o tipo Back/Lay.');resetSureDisplay('Combinação inválida');return null}APP.stakeMode='auto';result.stakes.forEach((v,i)=>{const inp=rows[i].querySelector('.out-stake');if(inp&&i!==fixed)inp.value=v.toFixed(2);rows[i].dataset.target=String(Number.isInteger(result.legs[i]?.target)?result.legs[i].target:i);updateOutcomeRowUI(rows[i])});}
const strategy=legs.some(l=>l.freebet)?'Freebet + cobertura':legs.some(l=>l.type==='lay')?'Back / Lay':'Back / Back',manual=APP.stakeMode==='manual';$('#impliedSum').textContent=manual?`${strategy} • manual`:strategy;$('#arbMargin').textContent=pct(result.margin);$('#arbReturn').textContent=brl(result.ret);$('#arbProfit').textContent=brl(result.profit);$('#arbRoi').textContent=pct(result.roi);$('#arbStatus').textContent=result.isArb?(manual?'Operação manual com lucro em todos os resultados':'Surebet com lucro em todos os resultados'):result.profit>=-.01?'Operação equilibrada':manual?'Operação manual: existe resultado negativo':'Não é surebet: existe resultado negativo';$('#arbStatus').className=result.isArb?'positive':result.profit<-.01?'negative':'';$('#sureResult').className=`calc-result ${result.isArb?'good':'bad'}`;$('#allocationBox').innerHTML=result.legs.map((l,i)=>{const stake=result.stakes[i],liability=l.type==='lay'?(l.effectiveOdd-1)*stake:0;return `<div class="alloc-row"><span>Casa ${i+1} • ${l.type.toUpperCase()}${l.type==='lay'?` • contra Resultado ${(l.target??i)+1}`:''}${l.freebet?' • Freebet':''}<small class="alloc-meta">${esc(houseById(l.house)?.nome||`Casa ${i+1}`)} • odd ${l.effectiveOdd.toFixed(2)}</small></span><strong>${l.type==='lay'?`${brl(stake)} / resp. ${brl(liability)}`:brl(stake)}</strong></div>`}).join('')+result.profits.map((p,i)=>`<div class="alloc-row outcome-profit ${p>=0?'profit-ok':'profit-bad'}"><span>Lucro se der Resultado ${i+1}</span><strong>${brl(p)}</strong></div>`).join('')+`<div class="alloc-row total-allocation"><span>Caixa próprio exposto</span><strong>${brl(result.cashUsed)}</strong></div>`;return {...result,strategy};}
function equalizeSure(){APP.stakeMode='auto';return calcSure({forceEqualize:true});}
async function saveSure(){const c=calcSure();if(!c){return}if(!$('#sureEvent').value.trim()){toast('Informe qual é o evento antes de salvar.');return}const outcomes=c.legs.map((l,i)=>({...l,commission:l.commission*100,stake:c.stakes[i],liability:l.type==='lay'?(l.effectiveOdd-1)*c.stakes[i]:0}));const old=APP.editingSureId?APP.entries.find(e=>e.id===APP.editingSureId):null;const freebetSourceId=APP.plannedFreebetId||old?.freebetSourceId||null;const hasLinkedFreebet=outcomes.some(o=>o.freebet)&&!!freebetSourceId;const linkedFreebet=hasLinkedFreebet?APP.entries.find(e=>e.id===freebetSourceId&&e.type==='freebet'):null;const promotionCost=linkedFreebet?parseNum(linkedFreebet.missionCost):0;const grossProfit=c.profit;const netProfit=grossProfit-promotionCost;const totalInvestment=c.cashUsed+promotionCost;const netRoi=totalInvestment?netProfit/totalInvestment*100:0;const netReturn=totalInvestment+netProfit;const entry={id:old?.id||uid(),type:'surebet',date:$('#sureDate').value||todayISO(),createdAt:old?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString(),event:$('#sureEvent').value.trim(),investment:hasLinkedFreebet?totalInvestment:c.cashUsed,coverageInvestment:c.cashUsed,promotionCost:hasLinkedFreebet?promotionCost:0,grossProfit,profit:hasLinkedFreebet?netProfit:grossProfit,roi:hasLinkedFreebet?netRoi:c.roi,returnValue:hasLinkedFreebet?netReturn:c.ret,strategy:c.strategy,marketOutcomes:c.legs.length,fixedIndex:c.fixedIndex??APP.fixedLegIndex,manualStakes:!!c.manual,outcomeProfits:[...(c.profits||[])],outcomes,offers:outcomes,freebetSourceId:hasLinkedFreebet?freebetSourceId:null,promotionCostApplied:hasLinkedFreebet,specialTags:APP.specialTags.length?[...APP.specialTags]:normalizeSpecialTags(old),specialTag:(APP.specialTags[0]||normalizeSpecialTags(old)[0]||'')};if(old){APP.entries=APP.entries.map(e=>e.id===old.id?entry:e);await dbPut('entries',entry);}else{APP.entries.push(entry);await dbPut('entries',entry);}if(entry.freebetSourceId)await syncFreebetWithSurebet(entry);APP.editingSureId=null;APP.editingSpinId=null;$('#saveSure').textContent='Salvar surebet';clearPlannedFreebet();clearSpecialTags();renderAll();toast(old?'Surebet atualizada.':'Surebet salva no histórico.');}
function editSure(id){const e=APP.entries.find(x=>x.id===id&&x.type==='surebet');if(!e)return;const legs=(e.outcomes?.length?e.outcomes:e.offers)||[];APP.editingSureId=e.id;APP.editingSpinId=null;APP.stakeMode='manual';$('#saveSpin').textContent='Salvar resultado';APP.legCount=Math.max(2,Math.min(6,legs.length||e.marketOutcomes||2));APP.marketOutcomes=APP.legCount;$('#sureDate').value=e.date||todayISO();$('#sureEvent').value=e.event||'';APP.fixedLegIndex=Number.isInteger(e.fixedIndex)?Math.max(0,Math.min(APP.legCount-1,e.fixedIndex)):0;const rows=Array.from({length:APP.legCount},(_,i)=>{const o=legs[i]||{};return {house:o.house||'',odd:o.odd||o.effectiveOdd||'',stake:o.stake||'100',betType:o.type==='lay'?'lay':'back',commissionEnabled:parseNum(o.commission)>0,commission:o.commission||'',boostEnabled:parseNum(o.boost)>0,boost:o.boost||'',freebet:!!o.freebet,target:Number.isInteger(o.target)?o.target:i,fixed:i===APP.fixedLegIndex};});renderOutcomeRowsFrom(rows);if(e.freebetSourceId)APP.plannedFreebetId=e.freebetSourceId;else clearPlannedFreebet(false);updatePlannedFreebetUI();setSpecialTags(normalizeSpecialTags(e));$('#saveSure').textContent='Atualizar surebet';navigate('surebet');setTimeout(()=>scheduleSureRecalc(0),0);}
function scheduleSureRecalc(delay=180){clearTimeout(APP._sureTimer);APP._sureTimer=setTimeout(()=>{const rows=$$('.outcome-row');if(!rows.length)return;const odds=rows.map(r=>parseNum(r.querySelector('.out-odd')?.value)),stakes=rows.map(r=>parseNum(r.querySelector('.out-stake')?.value)),fixed=rows[Math.max(0,Math.min(APP.fixedLegIndex||0,rows.length-1))],fixedStake=parseNum(fixed?.querySelector('.out-stake')?.value);if(odds.every(o=>o>1)&&(APP.stakeMode==='manual'?stakes.every(v=>v>=0):fixedStake>0)){calcSure({silent:true});}else{resetSureDisplay('Aguardando odds');}},delay);}
function renderSureTable(){
  const arr=APP.entries.filter(e=>e.type==='surebet').sort((a,b)=>b.date.localeCompare(a.date));
  if(!arr.length){$('#sureTableWrap').innerHTML='<div class="empty-state">Nenhuma surebet registrada.</div>';return}
  const desktop=`<div class="entry-history-desktop"><table class="data-table"><thead><tr><th>Data</th><th>Evento</th><th>Estratégia</th><th>Caixa</th><th>Lucro</th><th>ROI</th><th></th></tr></thead><tbody>${arr.map(e=>`<tr><td>${fmtDate(e.date)}</td><td>${teamEventHTML(e.event,{compact:true})}${normalizeSpecialTags(e).length?specialTagsHTML(e):''}</td><td>${esc(e.strategy||'Back')}</td><td>${brl(e.investment)}</td><td class="${moneyClass(e.profit)}">${brl(e.profit)}</td><td>${pct(e.roi)}</td><td class="row-actions table-entry-actions">${actionButton('Editar','edit',`data-edit-entry="${e.id}" data-edit-type="surebet" title="Editar surebet"`)}${actionButton('Card','image',`data-export-sure-image="${e.id}" title="Gerar card desta surebet"`,'accent')}${actionButton('Excluir','trash',`data-delete="${e.id}"`,'danger')}</td></tr>`).join('')}</tbody></table></div>`;
  const mobile=`<div class="entry-history-mobile">${arr.map(e=>`<article class="mini-history-card"><div class="mini-history-head"><div><small>${fmtDate(e.date)} • Surebet</small><h3>${teamEventHTML(e.event,{compact:true})}</h3></div><strong class="${moneyClass(e.profit)}">${brl(e.profit)}</strong></div>${normalizeSpecialTags(e).length?specialTagsHTML(e):''}<div class="mini-history-meta"><span>${esc(e.strategy||'Back')}</span><span>Investido <b>${brl(e.investment)}</b></span><span>ROI <b>${pct(e.roi)}</b></span></div><div class="mini-history-actions">${actionButton('Editar','edit',`data-edit-entry="${e.id}" data-edit-type="surebet"`)}${actionButton('Card','image',`data-export-sure-image="${e.id}"`,'accent')}${actionButton('Excluir','trash',`data-delete="${e.id}"`,'danger')}</div></article>`).join('')}</div>`;
  $('#sureTableWrap').innerHTML=desktop+mobile;
}
function calcSpins(){const count=parseNum($('#spinCount').value),value=parseNum($('#spinValue').value),before=parseNum($('#spinBefore').value),after=parseNum($('#spinAfter').value),nominal=count*value,profit=after-before,conversion=nominal?profit/nominal*100:0;$('#spinNominal').textContent=brl(nominal);$('#spinProfit').textContent=brl(profit);$('#spinProfit').className=moneyClass(profit);$('#spinConversion').textContent=pct(conversion);return{count,value,before,after,nominal,profit,conversion}}
async function saveSpin(){const c=calcSpins();if(!$('#spinHouse').value){toast('Selecione a casa.');return}const old=APP.editingSpinId?APP.entries.find(e=>e.id===APP.editingSpinId&&e.type==='spins'):null;const entry={id:old?.id||uid(),type:'spins',date:$('#spinDate').value||todayISO(),createdAt:old?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString(),house:$('#spinHouse').value,...c};if(old){APP.entries=APP.entries.map(e=>e.id===old.id?entry:e);await dbPut('entries',entry);APP.editingSpinId=null;APP.editingSureId=null;$('#saveSpin').textContent='Salvar resultado';renderAll();toast('Giros grátis atualizados.');}else{await addEntry(entry);toast('Giros grátis registrados.');}}
function editSpin(id){const e=APP.entries.find(x=>x.id===id&&x.type==='spins');if(!e)return;APP.editingSpinId=e.id;APP.editingSureId=null;$('#saveSure').textContent='Salvar surebet';$('#spinDate').value=e.date||todayISO();const sel=$('#spinHouse');if(![...sel.options].some(o=>o.value===e.house)){const h=houseById(e.house),opt=document.createElement('option');opt.value=e.house||'';opt.textContent=h?.nome||e.house||'Casa';sel.appendChild(opt)}sel.value=e.house||'';$('#spinCount').value=e.count??'';$('#spinValue').value=e.value??'';$('#spinBefore').value=e.before??'';$('#spinAfter').value=e.after??'';calcSpins();$('#saveSpin').textContent='Atualizar resultado';navigate('spins');}
function openEntryEditor(id,type){if(type==='spins'){editSpin(id);return}if(type==='surebet'){editSure(id);return}if(type==='freebet'){editFreebet(id);return}}
function renderSpins(){
  const arr=APP.entries.filter(e=>e.type==='spins');setMoney('#spinTotal',arr.reduce((a,e)=>a+entryProfit(e),0));$('#spinCountTotal').textContent=arr.reduce((a,e)=>a+parseNum(e.count),0);$('#spinAvgConversion').textContent=pct(arr.length?arr.reduce((a,e)=>a+parseNum(e.conversion),0)/arr.length:0);
  const sorted=[...arr].sort((a,b)=>b.date.localeCompare(a.date));
  if(!sorted.length){$('#spinTableWrap').innerHTML='<div class="empty-state">Nenhuma conversão registrada.</div>';return}
  const desktop=`<div class="entry-history-desktop"><table class="data-table"><thead><tr><th>Data</th><th>Casa</th><th>Giros</th><th>Nominal</th><th>Lucro</th><th>Conversão</th><th></th></tr></thead><tbody>${sorted.map(e=>`<tr><td>${fmtDate(e.date)}</td><td>${esc(houseById(e.house)?.nome||e.house)}</td><td>${e.count||0}</td><td>${brl(e.nominal)}</td><td class="${moneyClass(e.profit)}">${brl(e.profit)}</td><td>${pct(e.conversion)}</td><td class="row-actions table-entry-actions">${actionButton('Editar','edit',`data-edit-entry="${e.id}" data-edit-type="spins"`)}${actionButton('Excluir','trash',`data-delete="${e.id}"`,'danger')}</td></tr>`).join('')}</tbody></table></div>`;
  const mobile=`<div class="entry-history-mobile">${sorted.map(e=>{const h=houseById(e.house);return `<article class="mini-history-card"><div class="mini-history-head"><div><small>${fmtDate(e.date)} • Giros grátis</small><h3>${houseLogo(h)}<span>${esc(h?.nome||e.house||'Casa')}</span></h3></div><strong class="${moneyClass(e.profit)}">${brl(e.profit)}</strong></div><div class="mini-history-meta"><span>${e.count||0} giros</span><span>Nominal <b>${brl(e.nominal)}</b></span><span>Conversão <b>${pct(e.conversion)}</b></span></div><div class="mini-history-actions">${actionButton('Editar','edit',`data-edit-entry="${e.id}" data-edit-type="spins"`)}${actionButton('Excluir','trash',`data-delete="${e.id}"`,'danger')}</div></article>`}).join('')}</div>`;
  $('#spinTableWrap').innerHTML=desktop+mobile;
}
function freebetEntries(){return APP.entries.filter(e=>e.type==='freebet');}
function freebetStatusMeta(status='available'){return status==='extracted'?{label:'Extraída',cls:'success'}:status==='planned'?{label:'Planejada',cls:'info'}:status==='expired'?{label:'Expirada',cls:'danger'}:{label:'Disponível',cls:'available'};}
function currentFreebetForm(){return {id:APP.editingFreebetId||null,date:$('#freebetDate').value||todayISO(),house:$('#freebetHouse').value||'',name:$('#freebetName').value.trim(),nominal:parseNum($('#freebetValue').value),minOdd:parseNum($('#freebetMinOdd').value),expiresAt:$('#freebetExpires').value||'',missionCost:parseNum($('#freebetMissionCost').value),status:$('#freebetStatus').value||'available',notes:$('#freebetNotes').value.trim()};}
function calcFreebetPreview(){const data=currentFreebetForm(),nominal=data.nominal,missionCost=data.missionCost,extracted=nominal*0.8,net=extracted-missionCost;$('#fbPreviewNominal').textContent=brl(nominal);$('#fbPreviewCost').textContent=brl(missionCost);$('#fbPreviewExtracted').textContent=brl(extracted);$('#fbPreviewNet').textContent=brl(net);$('#fbPreviewNet').className=moneyClass(net);return {nominal,missionCost,extracted,net};}
function resetFreebetForm(){APP.editingFreebetId=null;$('#freebetDate').value=todayISO();$('#freebetHouse').value='';$('#freebetName').value='';$('#freebetValue').value='';$('#freebetMinOdd').value='';$('#freebetExpires').value='';$('#freebetMissionCost').value='';$('#freebetStatus').value='available';$('#freebetNotes').value='';$('#saveFreebet').textContent='Salvar freebet';calcFreebetPreview();}
async function saveFreebet(options={}){const data=currentFreebetForm();if(!data.house){toast('Selecione a casa da freebet.');return null}if(!data.nominal){toast('Informe o valor nominal da freebet.');return null}const old=data.id?APP.entries.find(e=>e.id===data.id&&e.type==='freebet'):null;const entry={id:old?.id||uid(),type:'freebet',date:data.date,createdAt:old?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString(),house:data.house,name:data.name||'Freebet',nominal:data.nominal,minOdd:data.minOdd||0,expiresAt:data.expiresAt||'',missionCost:data.missionCost||0,status:data.status,notes:data.notes||'',profit:0,linkedSureId:old?.linkedSureId||'',linkedSureEvent:old?.linkedSureEvent||'',extractedValue:old?.extractedValue||0,conversion:old?.conversion||0,netProfit:old?.netProfit||0,extractionDate:old?.extractionDate||''};if(old){APP.entries=APP.entries.map(e=>e.id===old.id?entry:e);await dbPut('entries',entry);}else{APP.entries.push(entry);await dbPut('entries',entry);}if(!options.keepForm){resetFreebetForm();APP.freebetTab='pending';}renderAll();if(!options.silentToast)toast(old?'Freebet atualizada.':'Freebet salva em Freebets a extrair.');return entry;}
function editFreebet(id){const e=APP.entries.find(x=>x.id===id&&x.type==='freebet');if(!e)return;APP.editingFreebetId=e.id;$('#freebetDate').value=e.date||todayISO();$('#freebetHouse').value=e.house||'';$('#freebetName').value=e.name||'';$('#freebetValue').value=e.nominal??'';$('#freebetMinOdd').value=e.minOdd??'';$('#freebetExpires').value=e.expiresAt||'';$('#freebetMissionCost').value=e.missionCost??'';$('#freebetStatus').value=e.status||'available';$('#freebetNotes').value=e.notes||'';$('#saveFreebet').textContent='Atualizar freebet';calcFreebetPreview();navigate('freebets');switchFreebetTab('add');}
function plannedFreebet(){return APP.plannedFreebetId?APP.entries.find(e=>e.id===APP.plannedFreebetId&&e.type==='freebet'):null}
function updatePlannedFreebetUI(){const banner=$('#plannedFreebetBanner'),text=$('#plannedFreebetText'),hint=$('#plannedFreebetHint'),fb=plannedFreebet();if(fb){banner.hidden=false;text.textContent=`${fb.name||'Freebet'} • ${houseById(fb.house)?.nome||fb.house||'Casa'} • ${brl(fb.nominal)}${fb.minOdd?` • odd mínima ${fb.minOdd.toFixed(2).replace('.',',')}`:''}`;hint.textContent=`Extração em planejamento: ${fb.name||'Freebet'} na ${houseById(fb.house)?.nome||fb.house||'casa'} (${brl(fb.nominal)}).`;return}banner.hidden=true;text.textContent='Nenhuma freebet vinculada.';hint.textContent='Nenhuma extração em planejamento no momento.';}
function clearPlannedFreebet(render=true){APP.plannedFreebetId=null;if(render)updatePlannedFreebetUI();}
async function planFreebetExtraction(id=''){let fb=id?APP.entries.find(e=>e.id===id&&e.type==='freebet'):null;if(!fb){fb=await saveFreebet({silentToast:true,keepForm:true});if(!fb)return;}APP.plannedFreebetId=fb.id;if(fb.status!=='extracted'&&fb.status!=='expired'){const next={...fb,status:'planned',updatedAt:new Date().toISOString()};APP.entries=APP.entries.map(e=>e.id===fb.id?next:e);await dbPut('entries',next);fb=next;}APP.editingFreebetId=fb.id;APP.legCount=2;APP.marketOutcomes=2;APP.fixedLegIndex=0;renderOutcomeRowsFrom([{house:fb.house||'',odd:fb.minOdd||2,stake:fb.nominal||100,betType:'back',freebet:true,commissionEnabled:false,commission:'',boostEnabled:false,boost:'',fixed:true},{house:'',odd:'',stake:'',betType:'back',freebet:false,commissionEnabled:false,commission:'',boostEnabled:false,boost:'',fixed:false}]);$('#sureDate').value=fb.date||todayISO();$('#sureEvent').value=fb.name||'Extração de freebet';setSpecialTags(['freebet-extraction']);resetSureDisplay('Complete a cobertura para extrair a freebet.');updatePlannedFreebetUI();renderAll();navigate('surebet');setTimeout(()=>scheduleSureRecalc(0),50);toast('Calculadora preparada para extrair a freebet.');}
async function syncFreebetWithSurebet(sureEntry){const fb=APP.entries.find(e=>e.id===sureEntry.freebetSourceId&&e.type==='freebet');if(!fb)return;const extracted=Math.max(0,parseNum(sureEntry.grossProfit??sureEntry.profit)),conversion=fb.nominal?extracted/fb.nominal*100:0,netProfit=parseNum(sureEntry.profit),updated={...fb,status:'extracted',linkedSureId:sureEntry.id,linkedSureEvent:sureEntry.event,extractedValue:extracted,conversion,netProfit,extractionDate:sureEntry.date,updatedAt:new Date().toISOString()};APP.entries=APP.entries.map(e=>e.id===fb.id?updated:e);await dbPut('entries',updated);}
function renderFreebetCard(e,mode='pending'){const meta=freebetStatusMeta(e.status),house=houseById(e.house),linked=e.linkedSureId?`<small class="freebet-linked">Surebet vinculada: ${esc(e.linkedSureEvent||'Registro salvo')}</small>`:'';const action=mode==='extracted'?`<div class="freebet-card-result"><span>Extraído</span><strong>${brl(e.extractedValue)}</strong><small>Conversão ${pct(e.conversion)} • Líquido ${brl(e.netProfit)}</small></div>`:`<button class="special-action-btn compact" type="button" data-plan-freebet="${e.id}">${iconSVG('boost')}<span>Extrair agora</span></button>`;return `<article class="freebet-card ${mode}"><div class="freebet-card-head"><div><small>${fmtDate(e.date)} • ${esc(house?.nome||e.house||'Casa')}</small><h3>${esc(e.name||'Freebet')}</h3>${e.notes?`<p>${esc(e.notes)}</p>`:''}</div><span class="status-pill ${meta.cls}">${meta.label}</span></div><div class="freebet-card-body"><div class="freebet-card-main">${houseLogo(house)}<div class="freebet-card-lines"><div><span>Valor</span><strong>${brl(e.nominal)}</strong></div><div><span>Odd mínima</span><strong>${e.minOdd?e.minOdd.toFixed(2).replace('.',','):'—'}</strong></div><div><span>Custo da missão</span><strong>${brl(e.missionCost)}</strong></div><div><span>${mode==='extracted'?'Extraída em':'Válida até'}</span><strong>${mode==='extracted'?(e.extractionDate?fmtDate(e.extractionDate):'—'):(e.expiresAt?fmtDate(e.expiresAt):'—')}</strong></div></div></div>${action}</div>${linked}<div class="row-actions freebet-actions">${actionButton('Editar','edit',`data-edit-entry="${e.id}" data-edit-type="freebet"`)}${e.linkedSureId?actionButton('Abrir surebet','image',`data-edit-entry="${e.linkedSureId}" data-edit-type="surebet"`,'accent'):''}${e.status!=='extracted'&&e.status!=='expired'&&mode!=='pending'?actionButton('Planejar','planner',`data-plan-freebet="${e.id}"`,'accent'):''}${actionButton('Excluir','trash',`data-delete="${e.id}"`,'danger')}</div></article>`;}
function renderFreebets(){const arr=freebetEntries().sort((a,b)=>(b.date+(b.createdAt||'')).localeCompare(a.date+(a.createdAt||''))),monthKey=todayISO().slice(0,7),pending=arr.filter(e=>e.status!=='extracted'&&e.status!=='expired'),extractedArr=arr.filter(e=>e.status==='extracted'),available=pending.reduce((a,e)=>a+parseNum(e.nominal),0),extractedMonth=extractedArr.filter(e=>(e.extractionDate||e.date||'').startsWith(monthKey)).reduce((a,e)=>a+parseNum(e.extractedValue),0),avgConversion=extractedArr.length?extractedArr.reduce((a,e)=>a+parseNum(e.conversion),0)/extractedArr.length:0,netProfit=extractedArr.reduce((a,e)=>a+parseNum(e.netProfit),0);setMoney('#fbAvailableTotal',available);setMoney('#fbExtractedMonth',extractedMonth);$('#fbAvgConversion').textContent=pct(avgConversion);setMoney('#fbNetProfitTotal',netProfit);$('#fbPendingCount').textContent=pending.length;$('#fbExtractedCount').textContent=extractedArr.length;$('#fbPendingBadge').textContent=pending.length;$('#fbExtractedBadge').textContent=extractedArr.length;$('#fbHeroAvailable').textContent=brl(available);updatePlannedFreebetUI();const pb=$('#freebetPendingList'),eb=$('#freebetExtractedList');if(pb){if(!pending.length){pb.className='freebet-list empty-state';pb.textContent='Nenhuma freebet aguardando extração.'}else{pb.className='freebet-list';pb.innerHTML=pending.map(e=>renderFreebetCard(e,'pending')).join('')}}if(eb){if(!extractedArr.length){eb.className='freebet-list empty-state';eb.textContent='Nenhuma freebet extraída ainda.'}else{eb.className='freebet-list';eb.innerHTML=extractedArr.map(e=>renderFreebetCard(e,'extracted')).join('')}}switchFreebetTab(APP.freebetTab||'add');}

function renderHouses(filter=''){const q=filter.toLowerCase().trim(),list=APP.houses.filter(h=>!q||h.nome.toLowerCase().includes(q)||h.dominio.toLowerCase().includes(q));$('#housesGrid').innerHTML=list.map(h=>{const cfg=APP.settings.activeHouses[h.id]||{active:false,balance:0,commission:0,boost:0};return `<div class="house-card ${cfg.active?'active':''}" data-house-card="${h.id}"><div class="house-card-head"><div class="house-id">${houseLogo(h)}<div><b>${esc(h.nome)}</b><small>${esc(h.dominio)}</small></div></div><button class="toggle ${cfg.active?'on':''}" data-toggle-house="${h.id}" aria-label="Ativar"></button></div>${cfg.active?`<div class="house-config-grid"><label>Saldo R$<input data-house-setting="balance" data-house-id="${h.id}" type="number" step="0.01" value="${parseNum(cfg.balance)}"></label><label>Comissão %<input data-house-setting="commission" data-house-id="${h.id}" type="number" min="0" max="100" step="0.01" value="${parseNum(cfg.commission)}"></label><label>Aumento %<input data-house-setting="boost" data-house-id="${h.id}" type="number" min="0" step="0.01" value="${parseNum(cfg.boost)}"></label></div>`:''}</div>`}).join('');}
async function toggleHouse(id){const cfg=APP.settings.activeHouses[id]||{active:false,balance:0,commission:0,boost:0};cfg.active=!cfg.active;APP.settings.activeHouses[id]=cfg;await saveSettings();renderAll();}
async function setAllHouses(active){APP.settings.activeHouses=APP.settings.activeHouses||{};APP.houses.forEach(h=>{const old=APP.settings.activeHouses[h.id]||{};APP.settings.activeHouses[h.id]={active,balance:parseNum(old.balance),commission:parseNum(old.commission),boost:parseNum(old.boost)}});await saveSettings();renderAll();toast(active?'Todas as casas foram selecionadas.':'Todas as casas foram desmarcadas.');}

function tableOrEmpty(arr,html){return arr.length?html:`<div class="empty-state">Nenhum registro encontrado.</div>`}
function fmtDate(s){return new Date(s+'T12:00:00').toLocaleDateString('pt-BR')}
function historyHouseItems(e){
  if(e.type==='surebet'){
    const legs=(e.outcomes&&e.outcomes.length?e.outcomes:e.offers)||[];
    return legs.map(o=>{const h=houseById(o.house),baseOdd=parseNum(o.odd),boost=parseNum(o.boost),finalOdd=boost>0&&baseOdd>0?boostedOdd(baseOdd,boost):parseNum(o.effectiveOdd||o.odd),oddText=boost>0&&baseOdd>0?`${baseOdd.toFixed(2)} → ${finalOdd.toFixed(2)} (+${boost.toFixed(boost%1?1:0)}%)`:(finalOdd>0?finalOdd.toFixed(2):'—');return `<div class="history-house-item">${houseLogo(h)}<div><b>${esc(h?.nome||o.house||'Casa')}</b><small>${oddText}${o.type==='lay'?` • LAY contra R${(Number.isInteger(o.target)?o.target:0)+1}`:''}${o.freebet?' • FB':''}</small></div></div>`}).join('');
  }
  if(e.house){const h=houseById(e.house);return `<div class="history-house-item">${houseLogo(h)}<div><b>${esc(h?.nome||e.house)}</b><small>${e.type==='spins'?'Giros grátis':e.type==='freebet'?'Freebet':'Casa'}</small></div></div>`}
  return '<span class="history-muted">—</span>';
}
function historyResult(e){if(e.type==='freebet')return freebetStatusMeta(e.status).label;const p=entryProfit(e);return p>0.005?'Lucro':p<-.005?'Perda':'Neutro'}
function historyActions(e){return `${e.type==='surebet'?`${actionButton('Editar','edit',`data-edit-entry="${e.id}" data-edit-type="surebet" title="Editar surebet"`)}${actionButton('Card','image',`data-export-sure-image="${e.id}" title="Gerar card desta surebet"`,'accent')}`:e.type==='spins'?`${actionButton('Editar','edit',`data-edit-entry="${e.id}" data-edit-type="spins" title="Editar giros grátis"`)}`:e.type==='freebet'?`${actionButton('Editar','edit',`data-edit-entry="${e.id}" data-edit-type="freebet" title="Editar freebet"`)}${e.status!=='extracted'&&e.status!=='expired'?actionButton('Planejar','planner',`data-plan-freebet="${e.id}"`,'accent'):''}`:''}${actionButton('Excluir','trash',`data-delete="${e.id}"`,'danger')}`}
function renderHistory(){
  let arr=[...APP.entries];const type=$('#historyType').value,mon=$('#historyMonth').value;
  if(type!=='all')arr=arr.filter(e=>e.type===type);if(mon)arr=arr.filter(e=>e.date.startsWith(mon));
  arr.sort((a,b)=>(b.date+(b.createdAt||'')).localeCompare(a.date+(a.createdAt||'')));
  if(!arr.length){$('#historyTableWrap').innerHTML='<div class="empty-state">Nenhum registro encontrado.</div>';return}
  const desktop=`<div class="history-desktop"><table class="data-table history-table"><thead><tr><th>Data</th><th>Partida / descrição</th><th>Casas utilizadas</th><th>Investido</th><th>Lucro</th><th>ROI</th><th>Resultado</th><th></th></tr></thead><tbody>${arr.map(e=>`<tr><td>${fmtDate(e.date)}</td><td><b class="history-title">${e.type==='surebet'?teamEventHTML(e.event,{compact:true}):esc(entryLabel(e))}</b>${normalizeSpecialTags(e).length?specialTagsHTML(e):''}<small class="history-subtitle">${esc(e.strategy|| (e.type==='spins'?'Giros grátis':e.type==='freebet'?'Freebet':e.type==='manual'?'Manual':''))}</small></td><td><div class="history-houses">${historyHouseItems(e)}</div></td><td>${e.type==='surebet'?brl(e.investment):e.type==='freebet'?brl(e.nominal):'—'}</td><td class="${moneyClass(e.profit)}">${brl(e.profit)}</td><td>${e.type==='surebet'?pct(e.roi):e.type==='freebet'&&e.status==='extracted'?pct(e.conversion):'—'}</td><td><span class="history-result ${moneyClass(e.profit)}">${historyResult(e)}</span></td><td class="row-actions history-row-actions">${historyActions(e)}</td></tr>`).join('')}</tbody></table></div>`;
  const mobile=`<div class="history-mobile">${arr.map(e=>`<article class="history-card"><div class="history-card-head"><div><small>${fmtDate(e.date)} • ${e.type==='surebet'?'Surebet':e.type==='spins'?'Giros grátis':e.type==='freebet'?'Freebet':'Manual'}</small><h3>${e.type==='surebet'?teamEventHTML(e.event):esc(entryLabel(e))}</h3>${normalizeSpecialTags(e).length?specialTagsHTML(e):''}${e.strategy?`<p>${esc(e.strategy)}</p>`:''}</div><span class="history-result ${moneyClass(e.profit)}">${historyResult(e)}</span></div><div class="history-houses">${historyHouseItems(e)}</div><div class="history-card-stats"><div><span>${e.type==='surebet'?'Investido':e.type==='freebet'?'Nominal':'Tipo'}</span><strong>${e.type==='surebet'?brl(e.investment):e.type==='freebet'?brl(e.nominal):e.type==='spins'?'Giros grátis':'Manual'}</strong></div><div><span>${e.type==='freebet'?'Extraído':'Lucro'}</span><strong class="${moneyClass(e.profit)}">${e.type==='freebet'?brl(e.extractedValue||0):brl(e.profit)}</strong></div><div><span>ROI</span><strong>${e.type==='surebet'?pct(e.roi):e.type==='freebet'&&e.status==='extracted'?pct(e.conversion):'—'}</strong></div></div><div class="row-actions history-card-actions">${historyActions(e)}</div></article>`).join('')}</div>`;
  $('#historyTableWrap').innerHTML=desktop+mobile;
}
async function saveManual(ev){ev.preventDefault();const value=parseNum($('#manualValue').value);if(!value){toast('Informe um valor diferente de zero.');return}await addEntry({id:uid(),type:'manual',date:$('#manualDate').value||todayISO(),createdAt:new Date().toISOString(),house:$('#manualHouse').value,description:$('#manualDesc').value.trim()||'Ajuste manual',profit:value});$('#manualEntry').close();toast('Movimentação salva.');}

function renderReports(){const s=sums(),stats=performanceStats();setMoney('#repToday',s.today);setMoney('#repWeek',s.week);setMoney('#repMonth',s.month);setMoney('#repTotal',s.total);const sure=stats.sureProfit,spins=stats.spinProfit,best=stats.bestDay,worst=stats.worstDay,bestWeek=stats.bestWeek;$('#hallStats').innerHTML=`<div class="hall-row"><span>Lucro em surebets</span><strong class="${moneyClass(sure)}">${brl(sure)}</strong></div><div class="hall-row"><span>Lucro em giros grátis</span><strong class="${moneyClass(spins)}">${brl(spins)}</strong></div><div class="hall-row"><span>Melhor dia</span><strong>${best?`${fmtDate(best[0])} • ${brl(best[1])}`:'—'}</strong></div><div class="hall-row"><span>Melhor semana</span><strong>${bestWeek?`${formatWeekKey(bestWeek[0])} • ${brl(bestWeek[1])}`:'—'}</strong></div><div class="hall-row"><span>Pior dia</span><strong>${worst?`${fmtDate(worst[0])} • ${brl(worst[1])}`:'—'}</strong></div><div class="hall-row"><span>Total de registros</span><strong>${APP.entries.length}</strong></div>`;}
function reportEntryDetails(e){if(e.type==='surebet'){const legs=e.outcomes||e.offers||[];return legs.map(o=>{const base=parseNum(o.odd),boost=parseNum(o.boost),final=boost>0&&base>0?boostedOdd(base,boost):parseNum(o.effectiveOdd||o.odd),oddText=boost>0&&base>0?`${base.toFixed(2)}→${final.toFixed(2)} (+${boost.toFixed(boost%1?1:0)}%)`:final.toFixed(2);return `${houseById(o.house)?.nome||o.house||'Casa'} ${String(o.type||'back').toUpperCase()} @ ${oddText}${o.type==='lay'?` (contra R${(Number.isInteger(o.target)?o.target:0)+1})`:''}${o.freebet?' FB':''}`}).join(' • ')}if(e.type==='spins')return `${houseById(e.house)?.nome||e.house||'Casa'} • ${e.count||0} giros`;return houseById(e.house)?.nome||e.house||'Ajuste manual'}
function reportEntryHouseIds(e){const ids=e.type==='surebet'?(e.outcomes||e.offers||[]).map(o=>o.house):[e.house];return [...new Set(ids.filter(Boolean))]}
const REPORT_LOGO_CACHE=new Map();
function loadReportLogo(houseId){
  if(REPORT_LOGO_CACHE.has(houseId))return REPORT_LOGO_CACHE.get(houseId);
  const h=houseById(houseId);
  if(!h?.temLogo||!h.logo){const p=Promise.resolve(null);REPORT_LOGO_CACHE.set(houseId,p);return p}
  const p=new Promise(resolve=>{const img=new Image();img.decoding='async';img.onload=()=>resolve(img);img.onerror=()=>resolve(null);img.src=h.logo});
  REPORT_LOGO_CACHE.set(houseId,p);return p;
}
function drawImageContain(ctx,img,x,y,w,h,pad=3){if(!img?.naturalWidth||!img?.naturalHeight)return false;const scale=Math.min((w-pad*2)/img.naturalWidth,(h-pad*2)/img.naturalHeight),dw=img.naturalWidth*scale,dh=img.naturalHeight*scale;ctx.drawImage(img,x+(w-dw)/2,y+(h-dh)/2,dw,dh);return true}
async function drawReportHouseLogo(ctx,houseId,x,y,size=30,fill='#ffffff'){
  const house=houseById(houseId),img=await loadReportLogo(houseId);drawRoundedBox(ctx,x,y,size,size,Math.max(7,size*.25),fill,'rgba(148,163,184,.28)');
  if(drawImageContain(ctx,img,x,y,size,size,4))return;
  ctx.save();ctx.fillStyle='#334155';ctx.font=`800 ${Math.max(10,Math.round(size*.34))}px system-ui, sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText((house?.nome||houseId||'?').slice(0,2).toUpperCase(),x+size/2,y+size/2+1);ctx.restore();
}
function canvasWrapText(ctx,text,maxWidth,maxLines=2){const words=String(text||'').split(/\s+/).filter(Boolean),lines=[];let line='',used=0;for(const word of words){const test=line?`${line} ${word}`:word;if(ctx.measureText(test).width<=maxWidth){line=test;used++;continue}if(line)lines.push(line);line=word;used++;if(lines.length===maxLines-1)break}if(line&&lines.length<maxLines)lines.push(line);if(used<words.length&&lines.length){let last=lines[lines.length-1];while(ctx.measureText(last+'…').width>maxWidth&&last.length>1)last=last.slice(0,-1);lines[lines.length-1]=last+'…'}return lines.length?lines:['—']}
function fitCanvasFont(ctx,text,maxWidth,start=24,min=14,weight=800){let size=start;do{ctx.font=`${weight} ${size}px system-ui,sans-serif`;if(ctx.measureText(String(text||'')).width<=maxWidth)return size;size-=1}while(size>=min);ctx.font=`${weight} ${min}px system-ui,sans-serif`;return min;}
function drawRoundedBox(ctx,x,y,w,h,r,fill,stroke=''){ctx.beginPath();if(ctx.roundRect)ctx.roundRect(x,y,w,h,r);else{ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath()}ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=1;ctx.stroke()}}
function drawReportMetric(ctx,x,y,w,h,label,value,accent,palette=imagePalette()){drawRoundedBox(ctx,x,y,w,h,24,palette.panel,palette.stroke);ctx.fillStyle=palette.muted;ctx.font='700 22px system-ui, sans-serif';ctx.fillText(label,x+26,y+40);ctx.fillStyle=accent;ctx.font='800 34px system-ui, sans-serif';ctx.fillText(brl(value),x+26,y+89)}
function reportTypeLabel(e){return e.type==='surebet'?'Surebet':e.type==='spins'?'Giros grátis':e.type==='freebet'?'Freebet':'Manual'}
function drawReportInfoCard(ctx,x,y,w,h,label,value,color,palette){drawRoundedBox(ctx,x,y,w,h,22,palette.panel,palette.stroke);ctx.fillStyle=palette.muted;ctx.font='700 18px system-ui, sans-serif';ctx.fillText(label,x+22,y+34);ctx.fillStyle=color;ctx.font='800 24px system-ui, sans-serif';const lines=canvasWrapText(ctx,String(value||'—'),w-44,2);lines.forEach((line,i)=>ctx.fillText(line,x+22,y+68+i*24));}

async function createReportCanvas(){
  const s=sums(),stats=performanceStats(),theme=APP.settings.theme||document.documentElement.dataset.theme||'light',palette=imagePalette(theme),W=1080,pad=52,headerH=176,summaryY=248,summaryH=128,summaryGap=18,summaryW=(W-pad*2-summaryGap)/2,perfY=summaryY+summaryH*2+summaryGap+54,perfH=108,perfGap=18,perfW=(W-pad*2-perfGap)/2,hallY=perfY+perfH*2+perfGap+54,hallGap=18,hallW=(W-pad*2-hallGap)/2,hallH=112,footerH=148,H=hallY+hallH*3+hallGap*2+footerH,canvas=document.createElement('canvas');
  canvas.width=W;canvas.height=H;const ctx=canvas.getContext('2d');ctx.fillStyle=palette.bg;ctx.fillRect(0,0,W,H);

  const grad=ctx.createLinearGradient(pad,42,W-pad,42+headerH);grad.addColorStop(0,palette.blue1);grad.addColorStop(1,palette.blue2);drawRoundedBox(ctx,pad,42,W-pad*2,headerH,30,grad);drawRoundedBox(ctx,pad+28,78,78,78,22,palette.chip);ctx.fillStyle=palette.white;ctx.font='900 34px system-ui, sans-serif';ctx.textAlign='center';ctx.fillText('SC',pad+67,128);ctx.textAlign='left';ctx.font='800 36px system-ui, sans-serif';ctx.fillText('RELATÓRIO DE LUCROS',pad+132,102);ctx.font='500 20px system-ui, sans-serif';ctx.fillStyle='rgba(255,255,255,.84)';ctx.fillText(`Gerado em ${new Date().toLocaleString('pt-BR')}`,pad+132,140);ctx.fillText(`Tema: ${theme==='dark'?'Modo noturno':'Modo claro'}`,pad+132,168);
  const status=s.total>=0?'LUCRO':'PERDA';const chipW=118,statusX=W-pad-chipW-24;drawRoundedBox(ctx,statusX,88,chipW,44,22,palette.chip);ctx.fillStyle=palette.white;ctx.font='800 18px system-ui, sans-serif';ctx.textAlign='center';ctx.fillText(status,statusX+chipW/2,116);ctx.textAlign='left';

  [['Hoje',s.today],['Semana atual',s.week],['Mês',s.month],['Total',s.total]].forEach(([label,value],i)=>{const col=i%2,row=Math.floor(i/2),x=pad+col*(summaryW+summaryGap),y=summaryY+row*(summaryH+summaryGap);drawReportMetric(ctx,x,y,summaryW,summaryH,label,value,value>=0?palette.positive:palette.negative,palette)});

  ctx.fillStyle=palette.text;ctx.font='800 24px system-ui, sans-serif';ctx.fillText('DESEMPENHO',pad,perfY-22);
  const perfCards=[['ROI geral', pct(stats.roi), stats.roi>=0?palette.positive:palette.negative],['Investido', brl(stats.invested), palette.text],['Surebets', `${stats.sureCount}`, palette.text],['Giros grátis', `${stats.spinCount}`, palette.text]];
  perfCards.forEach(([label,value,color],i)=>{const col=i%2,row=Math.floor(i/2),x=pad+col*(perfW+perfGap),y=perfY+row*(perfH+perfGap);drawRoundedBox(ctx,x,y,perfW,perfH,24,palette.panel,palette.stroke);ctx.fillStyle=palette.muted;ctx.font='700 20px system-ui, sans-serif';ctx.fillText(label,x+24,y+38);ctx.fillStyle=color;ctx.font='800 32px system-ui, sans-serif';ctx.fillText(value,x+24,y+78)});

  ctx.fillStyle=palette.text;ctx.font='800 24px system-ui, sans-serif';ctx.fillText('HALL DE RESULTADOS',pad,hallY-22);
  const hallCards=[
    ['Lucro em surebets', brl(stats.sureProfit), stats.sureProfit>=0?palette.positive:palette.negative],
    ['Lucro médio por surebet', brl(stats.avgProfit), stats.avgProfit>=0?palette.positive:palette.negative],
    ['Melhor dia', stats.bestDay?`${fmtDate(stats.bestDay[0])} • ${brl(stats.bestDay[1])}`:'—', palette.text],
    ['Pior dia', stats.worstDay?`${fmtDate(stats.worstDay[0])} • ${brl(stats.worstDay[1])}`:'—', palette.text],
    ['Total de registros', `${APP.entries.length}`, palette.text],
    ['Melhor semana', stats.bestWeek?`${formatWeekKey(stats.bestWeek[0])} • ${brl(stats.bestWeek[1])}`:'—', palette.text]
  ];
  hallCards.forEach(([label,value,color],i)=>{const col=i%2,row=Math.floor(i/2),x=pad+col*(hallW+hallGap),y=hallY+row*(hallH+hallGap);drawReportInfoCard(ctx,x,y,hallW,hallH,label,value,color,palette)});

  const footerY=H-72;ctx.strokeStyle=palette.stroke;ctx.beginPath();ctx.moveTo(pad,footerY-32);ctx.lineTo(W-pad,footerY-32);ctx.stroke();ctx.fillStyle=palette.text;ctx.font='800 18px system-ui, sans-serif';ctx.fillText('SureControl',pad,footerY);ctx.fillStyle=palette.muted;ctx.font='500 16px system-ui, sans-serif';ctx.fillText('Desenvolvido por Genário Costa',pad,footerY+27);ctx.textAlign='right';ctx.fillText('Resumo visual de lucros e ROI',W-pad,footerY+12);ctx.textAlign='left';
  return canvas;
}
function drawMetricPill(ctx,x,y,w,h,label,value,color,palette){drawRoundedBox(ctx,x,y,w,h,18,palette.panelAlt,palette.stroke);ctx.fillStyle=palette.muted;ctx.font='700 16px system-ui, sans-serif';ctx.fillText(label,x+18,y+26);ctx.fillStyle=color;ctx.font='800 22px system-ui, sans-serif';ctx.fillText(value,x+18,y+54)}
function drawShieldMark(ctx,x,y,size){ctx.save();ctx.translate(x,y);ctx.strokeStyle='#111827';ctx.lineWidth=size*.065;ctx.lineJoin='round';ctx.beginPath();ctx.moveTo(size*.5,size*.05);ctx.lineTo(size*.86,size*.18);ctx.lineTo(size*.86,size*.52);ctx.bezierCurveTo(size*.86,size*.76,size*.70,size*.90,size*.5,size*.97);ctx.bezierCurveTo(size*.30,size*.90,size*.14,size*.76,size*.14,size*.52);ctx.lineTo(size*.14,size*.18);ctx.closePath();ctx.fillStyle='#ffffff';ctx.fill();ctx.stroke();ctx.fillStyle='#111827';ctx.font=`900 ${size*.32}px system-ui,sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('SC',size*.5,size*.48);ctx.restore();}
function drawSignalCanvas(ctx,W,H,dark=true){ctx.save();const bg=ctx.createLinearGradient(0,0,W,H);if(dark){bg.addColorStop(0,'#070707');bg.addColorStop(.55,'#101010');bg.addColorStop(1,'#080808')}else{bg.addColorStop(0,'#f4f4f5');bg.addColorStop(.55,'#ffffff');bg.addColorStop(1,'#f4f4f5')}ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);ctx.globalAlpha=dark?.08:.055;ctx.strokeStyle=dark?'#d4d4d8':'#71717a';ctx.lineWidth=1;for(let x=0;x<W;x+=54){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke()}for(let y=0;y<H;y+=54){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke()}ctx.globalAlpha=dark?.12:.08;ctx.strokeStyle=dark?'#fafafa':'#18181b';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-30,H*.76);ctx.bezierCurveTo(W*.18,H*.68,W*.26,H*.88,W*.40,H*.62);ctx.bezierCurveTo(W*.54,H*.35,W*.62,H*.72,W*.76,H*.42);ctx.bezierCurveTo(W*.86,H*.20,W*.93,H*.50,W+40,H*.23);ctx.stroke();ctx.restore();}
function canvasSealColor(id){
  const m=specialTagMeta(id);const colors={freebet:'#3b82f6',mission:'#f59e0b',spins:'#06b6d4',boost:'#84cc16',boost30:'#8b5cf6',doublegreen:'#10b981'};return colors[m?.cls]||'#a1a1aa';
}
function drawCanvasSealIcon(ctx,id,cx,cy,r,color,dark){
  const m=specialTagMeta(id);ctx.save();ctx.strokeStyle=color;ctx.fillStyle=color;ctx.lineWidth=Math.max(2,r*.075);ctx.lineCap='round';ctx.lineJoin='round';
  if(m?.cls==='freebet'){
    const w=r*1.05,h=r*.62,x=cx-w/2,y=cy-h/2;ctx.beginPath();ctx.roundRect(x,y,w,h,r*.13);ctx.stroke();ctx.beginPath();ctx.moveTo(cx-r*.18,cy);ctx.lineTo(cx+r*.18,cy);ctx.stroke();ctx.beginPath();ctx.arc(cx-r*.29,cy,2.2,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(cx+r*.29,cy,2.2,0,Math.PI*2);ctx.fill();
  }else if(m?.cls==='mission'){
    ctx.beginPath();ctx.arc(cx,cy,r*.39,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.arc(cx,cy,r*.18,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.moveTo(cx,cy-r*.55);ctx.lineTo(cx,cy-r*.32);ctx.moveTo(cx+r*.55,cy);ctx.lineTo(cx+r*.32,cy);ctx.moveTo(cx,cy+r*.55);ctx.lineTo(cx,cy+r*.32);ctx.moveTo(cx-r*.55,cy);ctx.lineTo(cx-r*.32,cy);ctx.stroke();
  }else if(m?.cls==='spins'){
    ctx.beginPath();ctx.arc(cx,cy,r*.38,-.55,4.15);ctx.stroke();ctx.beginPath();ctx.moveTo(cx-r*.35,cy-r*.33);ctx.lineTo(cx-r*.53,cy-r*.17);ctx.lineTo(cx-r*.28,cy-r*.12);ctx.stroke();
  }else if(m?.cls==='doublegreen'){
    ctx.beginPath();ctx.moveTo(cx-r*.46,cy);ctx.lineTo(cx-r*.17,cy+r*.28);ctx.lineTo(cx+r*.35,cy-r*.31);ctx.stroke();ctx.globalAlpha=.55;ctx.beginPath();ctx.moveTo(cx-r*.22,cy+r*.06);ctx.lineTo(cx+.02*r,cy+r*.28);ctx.lineTo(cx+r*.52,cy-r*.34);ctx.stroke();ctx.globalAlpha=1;
  }else{
    ctx.font=`900 ${Math.round(r*.48)}px system-ui,sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(m?.cls==='boost30'?'30%':'25%',cx,cy+1);
  }
  ctx.restore();
}
function drawCanvasSeal(ctx,id,x,y,size=62,dark=false){
  const color=canvasSealColor(id),r=size/2,cx=x+r,cy=y+r,base=dark?'#111111':'#ffffff',outer=dark?'rgba(255,255,255,.22)':'rgba(17,24,39,.18)';
  ctx.save();ctx.shadowColor=dark?'rgba(0,0,0,.45)':'rgba(17,24,39,.10)';ctx.shadowBlur=10;ctx.shadowOffsetY=3;ctx.fillStyle=base;ctx.beginPath();ctx.arc(cx,cy,r-1,0,Math.PI*2);ctx.fill();ctx.shadowColor='transparent';ctx.strokeStyle=outer;ctx.lineWidth=2;ctx.stroke();ctx.strokeStyle=color;ctx.lineWidth=3;ctx.beginPath();ctx.arc(cx,cy,r-6,0,Math.PI*2);ctx.stroke();ctx.globalAlpha=.5;ctx.lineWidth=1;ctx.beginPath();ctx.arc(cx,cy,r-11,0,Math.PI*2);ctx.stroke();ctx.globalAlpha=1;drawCanvasSealIcon(ctx,id,cx,cy,r-13,color,dark);ctx.restore();return size;
}
function drawCanvasSeals(ctx,value,x,y,maxWidth,dark=false){
  const ids=normalizeSpecialTags(value),gapX=14,gapY=12,perRow=Math.min(2,Math.max(1,ids.length)),iconSize=52,rowH=54;if(!ids.length)return 0;
  const widths=ids.map(id=>{const meta=specialTagMeta(id);ctx.save();ctx.font='800 13px system-ui,sans-serif';const w=Math.ceil(ctx.measureText(meta?.label||'').width);ctx.restore();return Math.min(238,Math.max(148,w+58));});
  let row=0,cx=x,cy=y,usedRows=1;
  ids.forEach((id,i)=>{
    if(i&&i%perRow===0){row+=1;usedRows=row+1;cx=x;cy=y+row*(rowH+gapY)}
    const meta=specialTagMeta(id)||{},itemW=widths[i],color=canvasSealColor(id);
    const base=dark?'rgba(18,18,18,.98)':'rgba(255,255,255,.98)',stroke=dark?'rgba(255,255,255,.14)':'rgba(17,24,39,.12)';
    drawRoundedBox(ctx,cx,cy,itemW,rowH,18,base,stroke);
    drawCanvasSeal(ctx,id,cx+10,cy+1,iconSize,dark);
    const tx=cx+iconSize+18,maxTextW=itemW-(tx-cx)-12,label=(meta.label||'').trim();
    ctx.textAlign='left';ctx.textBaseline='middle';ctx.fillStyle=dark?'#f4f4f5':'#18181b';ctx.font='800 13px system-ui,sans-serif';
    const words=label.split(/\s+/).filter(Boolean);let line1='',line2='';
    for(const word of words){const test=(line1?line1+' ':'')+word;if(!line1||ctx.measureText(test).width<=maxTextW)line1=test;else line2=(line2?line2+' ':'')+word}
    if(line2&&ctx.measureText(line2).width>maxTextW){while(line2&&ctx.measureText(line2+'…').width>maxTextW)line2=line2.slice(0,-1).trim();if(line2)line2+='…'}
    if(line2){ctx.fillText(line1,tx,cy+21);ctx.fillStyle=color;ctx.font='700 11px system-ui,sans-serif';ctx.fillText(line2,tx,cy+37)}
    else{ctx.fillText(line1,tx,cy+27)}
    cx+=itemW+gapX;
  });
  return usedRows*rowH+Math.max(0,usedRows-1)*gapY;
}
async function createSurebetCanvas(entry){
  const theme=APP.settings.theme||document.documentElement.dataset.theme||'light',dark=theme==='dark';
  const W=1080,H=1350,pad=48,innerW=W-pad*2,headerY=42,headerH=340;
  const legs=(entry.outcomes?.length?entry.outcomes:entry.offers)||[],legCount=Math.max(1,legs.length),tagIds=normalizeSpecialTags(entry),sealRows=tagIds.length?Math.ceil(tagIds.length/2):0;
  const footerH=tagIds.length?(sealRows*54+Math.max(0,sealRows-1)*12+48):92,footerY=H-footerH-34;
  const metricsGap=14,metricsH=92,metricsBlockH=metricsH*2+metricsGap,metricsY=footerY-metricsBlockH-22;
  const bodyZoneTop=headerY+headerH+24,bodyZoneBottom=metricsY-22,bodyZoneH=Math.max(180,bodyZoneBottom-bodyZoneTop);
  const rowH=Math.max(78,Math.min(160,Math.floor(bodyZoneH/legCount))),bodyH=rowH*legCount,bodyY=bodyZoneTop+Math.max(0,(bodyZoneH-bodyH)/2);
  const canvas=document.createElement('canvas');canvas.width=W;canvas.height=H;const ctx=canvas.getContext('2d');
  drawSignalCanvas(ctx,W,H,dark);
  const matchup=parseTeamEvent(entry.event),teamImages=matchup?await Promise.all([loadTeamLogo(matchup.home),loadTeamLogo(matchup.away)]):[null,null];
  await Promise.all(legs.map(l=>loadReportLogo(l.house)));
  const surface=dark?'rgba(16,16,16,.96)':'rgba(255,255,255,.99)',surface2=dark?'rgba(24,24,24,.96)':'rgba(250,250,250,.99)',stroke=dark?'rgba(255,255,255,.13)':'rgba(17,24,39,.12)',text=dark?'#f8fafc':'#111827',muted=dark?'#a1a1aa':'#64748b';

  // Cabeçalho vertical — marca no topo e confronto perfeitamente centralizado.
  drawRoundedBox(ctx,pad,headerY,innerW,headerH,30,surface,stroke);
  const hg=ctx.createLinearGradient(pad,headerY,W-pad,headerY+headerH);
  if(dark){hg.addColorStop(0,'rgba(13,13,13,.99)');hg.addColorStop(.55,'rgba(22,22,22,.98)');hg.addColorStop(1,'rgba(9,9,9,.99)')}
  else{hg.addColorStop(0,'rgba(255,255,255,.995)');hg.addColorStop(.58,'rgba(250,250,250,.995)');hg.addColorStop(1,'rgba(244,244,245,.99)')}
  drawRoundedBox(ctx,pad+10,headerY+10,innerW-20,headerH-20,22,hg,dark?'rgba(255,255,255,.10)':'rgba(17,24,39,.10)');
  ctx.save();ctx.beginPath();ctx.roundRect(pad+10,headerY+10,innerW-20,headerH-20,22);ctx.clip();ctx.globalAlpha=dark?.12:.065;ctx.strokeStyle=dark?'#fafafa':'#18181b';ctx.lineWidth=1.8;ctx.beginPath();ctx.moveTo(pad-20,headerY+250);ctx.bezierCurveTo(pad+230,headerY+242,pad+392,headerY+300,pad+570,headerY+212);ctx.bezierCurveTo(pad+720,headerY+140,W-pad-20,headerY+194,W+30,headerY+126);ctx.stroke();ctx.restore();
  drawShieldMark(ctx,pad+24,headerY+24,58);
  ctx.textAlign='left';ctx.fillStyle=text;ctx.font='800 28px system-ui,sans-serif';ctx.fillText('Sure',pad+94,headerY+58);ctx.fillStyle=dark?'#d4d4d8':'#27272a';ctx.font='500 28px system-ui,sans-serif';ctx.fillText('Control',pad+160,headerY+58);
  ctx.textAlign='right';ctx.fillStyle=muted;ctx.font='800 13px system-ui,sans-serif';ctx.fillText('SUREBET SALVA',W-pad-22,headerY+54);ctx.textAlign='left';

  if(matchup){
    const logoSize=92,center=W/2,homeCx=center-190,awayCx=center+190,logoY=headerY+112;
    drawTeamLogoCanvas(ctx,teamImages[0],matchup.home,homeCx-logoSize/2,logoY,logoSize,dark);
    drawTeamLogoCanvas(ctx,teamImages[1],matchup.away,awayCx-logoSize/2,logoY,logoSize,dark);
    ctx.fillStyle=text;fitCanvasFont(ctx,matchup.home,250,24,14,850);ctx.textAlign='center';ctx.fillText(matchup.home,homeCx,logoY+126);
    fitCanvasFont(ctx,matchup.away,250,24,14,850);ctx.fillText(matchup.away,awayCx,logoY+126);
    ctx.fillStyle=muted;ctx.font='800 22px system-ui,sans-serif';ctx.fillText('×',center,logoY+47);ctx.textAlign='left';
  }else{
    ctx.fillStyle=text;ctx.font='850 32px system-ui,sans-serif';const title=canvasWrapText(ctx,entry.event||'Surebet',innerW-120,2);title.forEach((line,i)=>ctx.fillText(line,pad+32,headerY+148+i*38));
  }
  const roiValue=parseNum(entry.roi),roiPositive=roiValue>=0,roiColor=roiPositive?'#22c55e':'#ef4444',roiBg=roiPositive?(dark?'rgba(5,39,28,.74)':'rgba(236,253,245,.96)'):(dark?'rgba(55,16,24,.78)':'rgba(255,241,242,.98)'),roiStroke=roiPositive?'rgba(34,197,94,.28)':'rgba(239,68,68,.28)';
  const roiW=150,roiH=72,roiX=W-pad-roiW-22,roiY=headerY+headerH-roiH-22;drawRoundedBox(ctx,roiX,roiY,roiW,roiH,18,roiBg,roiStroke);ctx.textAlign='center';ctx.fillStyle=muted;ctx.font='700 12px system-ui,sans-serif';ctx.fillText('ROI',roiX+roiW/2,roiY+24);ctx.fillStyle=roiColor;ctx.font='900 26px system-ui,sans-serif';ctx.fillText(pct(roiValue),roiX+roiW/2,roiY+54);ctx.textAlign='left';
  ctx.fillStyle=muted;ctx.font='650 14px system-ui,sans-serif';ctx.fillText(`${fmtDate(entry.date)} • ${entry.strategy||'Surebet'}`,pad+28,headerY+headerH-28);

  // Casas em lista vertical — a altura se adapta de 2 a 6 casas sem alterar a lógica dos dados.
  drawRoundedBox(ctx,pad,bodyY,innerW,bodyH,24,surface,stroke);
  for(let i=0;i<legCount;i++){
    const l=legs[i]||{},y=bodyY+i*rowH,logoSize=Math.max(48,Math.min(64,rowH*.60)),houseTextX=pad+24+logoSize+18;
    if(i){ctx.strokeStyle=stroke;ctx.beginPath();ctx.moveTo(pad+24,y);ctx.lineTo(W-pad-24,y);ctx.stroke()}
    await drawReportHouseLogo(ctx,l.house,pad+24,y+(rowH-logoSize)/2,logoSize,dark?'rgba(255,255,255,.08)':'#fff');
    ctx.fillStyle=text;ctx.font=`800 ${rowH<100?18:21}px system-ui,sans-serif`;ctx.fillText(houseById(l.house)?.nome||`Casa ${i+1}`,houseTextX,y+rowH*.42);
    ctx.fillStyle=muted;ctx.font=`650 ${rowH<100?13:14}px system-ui,sans-serif`;const typeLabel=(l.type||'back').toUpperCase()+(l.type==='lay'?` • contra Resultado ${(l.target??i)+1}`:'')+(l.freebet?' • Freebet':'');ctx.fillText(typeLabel,houseTextX,y+rowH*.66);
    const baseOdd=parseNum(l.odd),boost=parseNum(l.boost),finalOdd=boost>0&&baseOdd>0?boostedOdd(baseOdd,boost):parseNum(l.effectiveOdd||l.odd),liability=parseNum(l.liability);
    ctx.textAlign='right';ctx.fillStyle=text;ctx.font=`850 ${rowH<100?18:21}px system-ui,sans-serif`;ctx.fillText(boost>0&&baseOdd>0?`Odd ${baseOdd.toFixed(2)} → ${finalOdd.toFixed(2)}`:`Odd ${finalOdd.toFixed(2)}`,W-pad-26,y+rowH*.39);
    ctx.fillStyle=boost>0?(dark?'#d4d4d8':'#3f3f46'):muted;ctx.font=`700 ${rowH<100?12:13}px system-ui,sans-serif`;const stakeText=l.type==='lay'?`Stake ${brl(l.stake)} • Resp. ${brl(liability)}`:`Stake ${brl(l.stake)}`,boostText=boost>0?`+${boost.toFixed(boost%1?1:0)}% • `:'';ctx.fillText(`${boostText}${stakeText}`,W-pad-26,y+rowH*.64);ctx.textAlign='left';
  }

  // Resumo 2x2 para reforçar o formato vertical.
  const metrics=[['Investido',brl(entry.investment),text],['Retorno',brl(entry.returnValue),text],['Lucro',brl(entry.profit),parseNum(entry.profit)>=0?'#22c55e':'#ef4444'],['ROI',pct(entry.roi),parseNum(entry.roi)>=0?'#22c55e':'#ef4444']],metricW=(innerW-metricsGap)/2;
  metrics.forEach(([label,value,color],i)=>{const col=i%2,row=Math.floor(i/2),x=pad+col*(metricW+metricsGap),y=metricsY+row*(metricsH+metricsGap);drawRoundedBox(ctx,x,y,metricW,metricsH,18,surface2,stroke);ctx.fillStyle=muted;ctx.font='700 14px system-ui,sans-serif';ctx.fillText(label,x+18,y+30);ctx.fillStyle=color;ctx.font='850 25px system-ui,sans-serif';ctx.fillText(value,x+18,y+65)});

  // Selos e crédito permanecem separados dos valores.
  ctx.strokeStyle=stroke;ctx.beginPath();ctx.moveTo(pad,footerY);ctx.lineTo(W-pad,footerY);ctx.stroke();
  if(tagIds.length)drawCanvasSeals(ctx,tagIds,pad+4,footerY+16,Math.min(innerW*.68,650),dark);
  ctx.fillStyle=dark?'#a1a1aa':'#71717a';ctx.font='500 13px system-ui,sans-serif';ctx.textAlign='right';ctx.fillText('Desenvolvido por Genário Costa',W-pad,footerY+(tagIds.length?footerH-16:42));ctx.textAlign='left';
  return canvas;
}

function canvasToBlob(canvas){return new Promise((resolve,reject)=>canvas.toBlob(blob=>blob?resolve(blob):reject(new Error('Falha ao gerar PNG.')),'image/png',0.96))}
async function showPreviewImage({canvas,name,title,shareTitle,shareText,eyebrow='IMAGEM'}){const blob=await canvasToBlob(canvas);if(APP.reportImage?.url)URL.revokeObjectURL(APP.reportImage.url);APP.reportImage={blob,name,url:URL.createObjectURL(blob),shareTitle:shareTitle||title,shareText:shareText||title,width:canvas.width,height:canvas.height};$('#imagePreviewEyebrow').textContent=eyebrow;$('#imagePreviewTitle').textContent=title;const img=$('#reportPreview');img.removeAttribute('width');img.removeAttribute('height');img.style.width='100%';img.style.height='auto';img.style.maxHeight='none';img.style.objectFit='contain';img.src=APP.reportImage.url;try{if(img.decode)await img.decode()}catch{}$('#reportImageModal').showModal();return APP.reportImage;}
async function buildReportImage(){const canvas=await createReportCanvas();return showPreviewImage({canvas,name:`relatorio-de-lucros-${todayISO()}.png`,title:'Prévia do relatório resumido',shareTitle:'Relatório de lucros',shareText:'Meu resumo visual de resultados',eyebrow:'RELATÓRIO'});}
async function buildSurebetImage(entry){const canvas=await createSurebetCanvas(entry);const slug=(entry.event||'surebet').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,40)||'surebet';return showPreviewImage({canvas,name:`surebet-${slug}-${entry.date||todayISO()}.png`,title:'Prévia do card da surebet',shareTitle:'Surebet salva',shareText:entry.event||'Surebet',eyebrow:'SUREBET'});}
async function exportReportImage(){const btn=$('#exportImage');if(btn){btn.disabled=true;btn.textContent='Gerando imagem...'}try{await buildReportImage();toast('Prévia do card pronta.')}catch(err){console.error(err);toast('Não foi possível gerar a imagem.')}finally{if(btn){btn.disabled=false;btn.textContent='Gerar imagem resumida (.png)'}}}
function downloadReportImage(){if(!APP.reportImage?.blob)return;downloadBlob(APP.reportImage.blob,APP.reportImage.name);toast('Imagem PNG salva.');}
async function shareReportImage(){if(!APP.reportImage?.blob)return;try{const file=new File([APP.reportImage.blob],APP.reportImage.name,{type:'image/png'});if(navigator.share&&navigator.canShare?.({files:[file]})){await navigator.share({files:[file],title:APP.reportImage.shareTitle||'Imagem do SureControl',text:APP.reportImage.shareText||'Minha imagem gerada'});return}downloadReportImage();toast('Compartilhamento direto indisponível; o PNG foi salvo.')}catch(err){if(err?.name!=='AbortError'){console.error(err);downloadReportImage();toast('Não foi possível compartilhar; o PNG foi salvo.')}}}


function exportExcel(){
  const sum=sums(),rows=[['RELATÓRIO SURECONTROL'],['Gerado em',new Date().toLocaleString('pt-BR')],[],['RESUMO'],['Hoje',sum.today],['Semana atual',sum.week],['Mês',sum.month],['Total',sum.total],[],['MOVIMENTAÇÕES'],['Data','Tipo','Descrição','Estratégia','Casas / Odds','Investimento / Caixa','Lucro','ROI']];
  [...APP.entries].sort((a,b)=>a.date.localeCompare(b.date)).forEach(e=>{const legs=(e.outcomes||[]).map(o=>{const base=parseNum(o.odd),boost=parseNum(o.boost),final=boost>0&&base>0?boostedOdd(base,boost):parseNum(o.effectiveOdd||o.odd),oddText=boost>0&&base>0?`${base.toFixed(2)}→${final.toFixed(2)}`:final.toFixed(2);return `${houseById(o.house)?.nome||o.house||'-'} ${String(o.type||'back').toUpperCase()} @ ${oddText}${o.freebet?' FB':''}${o.commission?` C:${o.commission}%`:''}${boost?` A:${boost}%`:''}`}).join(' | ');rows.push([fmtDate(e.date),e.type,entryLabel(e),e.strategy||'',legs,e.investment||'',e.profit||0,e.roi||'']);});
  rows.push([],['CASAS ATIVAS'],['Casa','Domínio','Saldo','Comissão padrão %','Aumento padrão %']);
  activeHouses().forEach(([id,cfg])=>{const h=houseById(id);rows.push([h?.nome||id,h?.dominio||'',parseNum(cfg.balance),parseNum(cfg.commission),parseNum(cfg.boost)])});
  const cell=v=>`"${String(v??'').replace(/"/g,'""')}"`;
  const csv='sep=;\r\n'+rows.map(r=>r.map(cell).join(';')).join('\r\n');
  downloadBlob(new Blob(['\ufeff',csv],{type:'text/csv;charset=utf-8'}),`surecontrol-${todayISO()}.csv`);toast('Planilha gerada.');
}
function exportJSON(){downloadBlob(new Blob([JSON.stringify({version:1,exportedAt:new Date().toISOString(),entries:APP.entries,settings:APP.settings},null,2)],{type:'application/json'}),`surecontrol-backup-${todayISO()}.json`)}
function downloadBlob(blob,name){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
function exportPDF(){const s=sums(),win=window.open('','_blank');const rows=[...APP.entries].sort((a,b)=>b.date.localeCompare(a.date)).map(e=>`<tr><td>${fmtDate(e.date)}</td><td>${esc(entryLabel(e))}</td><td>${e.type}</td><td style="text-align:right">${brl(e.profit)}</td></tr>`).join('');win.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>Relatório SureControl</title><style>body{font-family:Arial,sans-serif;padding:34px;color:#181818}h1{margin-bottom:4px}.muted{color:#666}.cards{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:24px 0}.card{border:1px solid #ddd;border-radius:10px;padding:14px}.card span{font-size:11px;color:#666}.card b{display:block;font-size:18px;margin-top:6px}table{width:100%;border-collapse:collapse}th,td{padding:9px;border-bottom:1px solid #ddd;text-align:left;font-size:12px}th{background:#f4f4f4}@media print{button{display:none}}</style></head><body><h1>SureControl</h1><div class="muted">Relatório gerado em ${new Date().toLocaleString('pt-BR')}</div><div class="cards"><div class="card"><span>Hoje</span><b>${brl(s.today)}</b></div><div class="card"><span>Semana atual</span><b>${brl(s.week)}</b></div><div class="card"><span>Mês</span><b>${brl(s.month)}</b></div><div class="card"><span>Total</span><b>${brl(s.total)}</b></div></div><table><thead><tr><th>Data</th><th>Descrição</th><th>Tipo</th><th style="text-align:right">Lucro</th></tr></thead><tbody>${rows}</tbody></table><script>window.onload=()=>window.print()<\/script></body></html>`);win.document.close();}
async function importJSON(file){try{const data=JSON.parse(await file.text());if(!Array.isArray(data.entries))throw 0;for(const e of data.entries)await dbPut('entries',e);APP.entries=data.entries;if(data.settings){APP.settings=data.settings;await saveSettings()}renderAll();toast('Backup importado com sucesso.')}catch{toast('Arquivo de backup inválido.')}}

function renderSelectors(){const spin=$('#spinHouse'),manual=$('#manualHouse'),freebet=$('#freebetHouse');const spinValue=spin?.value||'',manualValue=manual?.value||'',freebetValue=freebet?.value||'';if(spin){spin.innerHTML=houseOptions(spinValue);spin.value=spinValue}if(manual){manual.innerHTML=houseOptions(manualValue);manual.value=manualValue}if(freebet){freebet.innerHTML=houseOptions(freebetValue);freebet.value=freebetValue}const rows=$$('.outcome-row');if(!rows.length){renderOutcomeRows();return}rows.forEach(row=>{const sel=row.querySelector('.out-house');if(!sel)return;const value=sel.value;sel.innerHTML=houseOptions(value);sel.value=value});}
function renderAll(){renderDashboard();renderSureTable();renderSpins();renderFreebets();renderHouses($('#houseSearch')?.value||'');renderHistory();renderReports();renderSelectors();updateTeamEventPreview();}

function wire(){
  document.addEventListener('click',async e=>{
    const nav=e.target.closest('[data-nav]');if(nav){if(nav.closest('#quickEntry'))prepareNewEntry(nav.dataset.nav);navigate(nav.dataset.nav);document.querySelectorAll('dialog[open]').forEach(d=>d.close());return}
    const tagBtn=e.target.closest('[data-special-tag]');if(tagBtn){toggleSpecialTag(tagBtn.dataset.specialTag);return}
    const fbTab=e.target.closest('[data-freebet-tab]');if(fbTab){switchFreebetTab(fbTab.dataset.freebetTab);return}
    const open=e.target.closest('[data-open]');if(open){document.getElementById(open.dataset.open).showModal();return}
    const editEntryBtn=e.target.closest('[data-edit-entry]');if(editEntryBtn){openEntryEditor(editEntryBtn.dataset.editEntry,editEntryBtn.dataset.editType);return}
    const edit=e.target.closest('[data-edit-sure]');if(edit){editSure(edit.dataset.editSure);return}
    const editSpinBtn=e.target.closest('[data-edit-spin]');if(editSpinBtn){editSpin(editSpinBtn.dataset.editSpin);return}
    const planFreebetBtn=e.target.closest('[data-plan-freebet]');if(planFreebetBtn){await planFreebetExtraction(planFreebetBtn.dataset.planFreebet);return}
    const exportSureImageBtn=e.target.closest('[data-export-sure-image]');if(exportSureImageBtn){const entry=APP.entries.find(x=>x.id===exportSureImageBtn.dataset.exportSureImage&&x.type==='surebet');if(entry){try{await buildSurebetImage(entry);toast('Prévia do card pronta.')}catch(err){console.error(err);toast('Não foi possível gerar a imagem da surebet.')}}return}
    const del=e.target.closest('[data-delete]');if(del&&confirm('Excluir este registro?')){await removeEntry(del.dataset.delete);return}
    const tog=e.target.closest('[data-toggle-house]');if(tog){await toggleHouse(tog.dataset.toggleHouse);return}
  });
  $('#houseCountOptions').addEventListener('click',e=>{const b=e.target.closest('[data-house-count]');if(b)setHouseCount(+b.dataset.houseCount);});
  $('#outcomeRows').addEventListener('click',e=>{const row=e.target.closest('.outcome-row');if(!row)return;const bet=e.target.closest('.bet-toggle');if(bet){toggleBetType(row);scheduleSureRecalc();return}const fix=e.target.closest('.fix-stake-btn');if(fix){setFixedRow(row);APP.stakeMode='auto';resetSureDisplay();scheduleSureRecalc();return}});
  $('#outcomeRows').addEventListener('change',e=>{const row=e.target.closest('.outcome-row');if(!row)return;if(e.target.matches('.out-house'))applyHouseDefaults(row);if(e.target.matches('.out-freebet,.out-commission-enabled,.out-boost-enabled')){updateOutcomeRowUI(row);}resetSureDisplay();scheduleSureRecalc();});
  const handleSureNumericEdit=e=>{const row=e.target.closest('.outcome-row');if(!row)return;if(e.target.matches('.out-stake')){const idx=+$$('.outcome-row').indexOf(row);if(idx!==APP.fixedLegIndex||APP.editingSureId)APP.stakeMode='manual';}updateOutcomeRowUI(row);if(e.target.matches('.out-odd,.out-stake,.out-commission,.out-boost'))scheduleSureRecalc(90);};
  $('#outcomeRows').addEventListener('input',handleSureNumericEdit);
  $('#sureEvent')?.addEventListener('input',updateTeamEventPreview);
  $('#outcomeRows').addEventListener('keyup',handleSureNumericEdit);
  $('#outcomeRows').addEventListener('blur',e=>{if(e.target.matches('.out-odd,.out-stake,.out-commission,.out-boost'))handleSureNumericEdit(e);},true);
  $('#calculateSure').addEventListener('click',equalizeSure);$('#saveSure').addEventListener('click',saveSure);$('#clearSpecialTag').addEventListener('click',clearSpecialTags); $('#clearFreebetPlan').addEventListener('click',()=>{clearPlannedFreebet();toast('Vínculo com freebet removido.');});
  ['spinCount','spinValue','spinBefore','spinAfter'].forEach(id=>$('#'+id).addEventListener('input',calcSpins));$('#saveSpin').addEventListener('click',saveSpin);
  ['freebetValue','freebetMissionCost','freebetMinOdd'].forEach(id=>$('#'+id).addEventListener('input',calcFreebetPreview));$('#saveFreebet').addEventListener('click',()=>saveFreebet());$('#planFreebet').addEventListener('click',()=>planFreebetExtraction());
  $('#houseSearch').addEventListener('input',e=>renderHouses(e.target.value));
  $('#selectAllHouses').addEventListener('click',()=>setAllHouses(true));$('#clearAllHouses').addEventListener('click',()=>setAllHouses(false));
  $('#housesGrid').addEventListener('change',async e=>{if(e.target.matches('[data-house-setting]')){const id=e.target.dataset.houseId,key=e.target.dataset.houseSetting;APP.settings.activeHouses[id]=APP.settings.activeHouses[id]||{active:true,balance:0,commission:0,boost:0};APP.settings.activeHouses[id][key]=parseNum(e.target.value);await saveSettings();if(APP._deferredRender){APP._deferredRender=false;renderAll();}else{if(key==='balance')renderDashboard();renderSelectors();}}});
  $('#historyType').addEventListener('change',renderHistory);$('#historyMonth').addEventListener('change',renderHistory);$('#saveManual').addEventListener('click',saveManual);$('#chartRange').addEventListener('change',drawChart);
  $('#themeToggle').addEventListener('click',toggleTheme);
  $('#exportImage').addEventListener('click',exportReportImage);$('#downloadReportImage').addEventListener('click',downloadReportImage);$('#shareReportImage').addEventListener('click',shareReportImage);$('#closeReportImage').addEventListener('click',()=>$('#reportImageModal').close());$('#exportPdf').addEventListener('click',exportPDF);$('#exportJson').addEventListener('click',exportJSON);$('#backupBtn').addEventListener('click',exportJSON);$('#importJson').addEventListener('change',e=>e.target.files[0]&&importJSON(e.target.files[0]));
  window.addEventListener('resize',()=>{clearTimeout(window._chart);window._chart=setTimeout(drawChart,150)});
}

(async function init(){renderNav();$('#sureDate').value=$('#spinDate').value=$('#manualDate').value=$('#freebetDate').value=todayISO();try{APP.teamIndex=await fetch('team-index.json').then(r=>r.json());buildTeamAliasMap()}catch(err){console.warn('Banco de escudos local indisponível',err)}try{APP.houses=await fetch('casas.json').then(r=>r.json())}catch{document.body.innerHTML='<div style="padding:30px;color:white;font-family:system-ui"><h2>Não foi possível carregar casas.json</h2><p>Abra o projeto pelo Preview/servidor local do seu editor, e não diretamente como arquivo file://.</p></div>';return}await openDB();await loadData();await repairWholeOddBoostEntries({syncLinked:false});let savedTheme=APP.settings.theme||'light';try{savedTheme=localStorage.getItem('surecontrol-theme')||savedTheme}catch{}applyTheme(savedTheme);wire();wireAuth();hydrateStaticIcons();$('#themeToggle .theme-icon').innerHTML=iconSVG(document.documentElement.dataset.theme==='dark'?'sun':'moon');$('#accountBtn').innerHTML=iconSVG('user');$('#backupBtn').innerHTML=iconSVG('download');renderAll();calcFreebetPreview();updatePlannedFreebetUI();setAuthMode('signin');try{initCloudClient();const {data:{session},error}=await APP.cloud.auth.getSession();if(error)throw error;APP.cloud.auth.onAuthStateChange((event,sessionNow)=>{if(event==='SIGNED_OUT'){setTimeout(()=>handleSignedOut(),0);return}if(sessionNow?.user&&event!=='TOKEN_REFRESHED')setTimeout(()=>startUserSession(sessionNow.user),0)});if(session?.user)await startUserSession(session.user);else showAuthGate()}catch(err){console.error(err);$('#authLoading').hidden=true;$('#authForm').hidden=false;$('#authError').textContent='Não foi possível conectar ao login. Verifique sua internet e recarregue a página.';setSyncStatus('error','Serviço de login indisponível')}})();
