export const STORAGE_MIGRATOR_HTML = String.raw`<!doctype html>
<html lang="zh-CN">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>BHP 旧文件迁移工具</title>
<style>
:root{color-scheme:dark}*{box-sizing:border-box}body{margin:0;background:#0b1220;color:#e5edf8;font:15px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;padding:24px 16px}
main{max-width:680px;margin:5vh auto;background:#111c2e;border:1px solid #26364e;border-radius:18px;padding:24px;box-shadow:0 18px 60px #0005}
h1{font-size:23px;margin:0 0 6px}.sub{color:#9eb0c9;margin:0 0 22px}.field{display:block;margin:14px 0 6px;color:#b9c8dc}input{width:100%;padding:13px 14px;border:1px solid #344761;border-radius:10px;background:#0b1424;color:#fff;font-size:16px;outline:none}button{border:0;border-radius:10px;padding:13px 18px;background:#2673df;color:white;font-weight:700;font-size:15px;margin-top:16px;width:100%;cursor:pointer}button:disabled{opacity:.5;cursor:not-allowed}.secondary{background:#26364e}.status{margin-top:18px;padding:14px;border-radius:10px;background:#0a1423;white-space:pre-wrap;overflow-wrap:anywhere;min-height:60px}.bar{height:10px;background:#26364e;border-radius:10px;overflow:hidden;margin-top:16px}.bar>i{display:block;height:100%;width:0;background:#39b982;transition:width .2s}.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:14px}.stat{padding:12px 8px;background:#18263a;border-radius:10px;text-align:center}.stat b{display:block;font-size:22px}.stat small{color:#9eb0c9}.warning{color:#f6c979;font-size:13px;margin-top:18px}.hidden{display:none!important}
</style></head><body><main>
<h1>BHP 旧文件迁移工具</h1><p class="sub">将历史文件安全迁移到私有 Supabase Storage。独立于拨号主界面运行。</p>
<section id="login">
<label class="field" for="account">主账号名称</label><input id="account" autocomplete="username" placeholder="输入 BHP 主账号名称">
<label class="field" for="pin">主账号 PIN</label><input id="pin" type="password" inputmode="numeric" autocomplete="current-password" placeholder="输入 PIN">
<button id="loginBtn">主账号登录</button>
</section>
<section id="work" class="hidden">
<div class="stats"><div class="stat"><b id="total">14</b><small>待迁移文件</small></div><div class="stat"><b id="done">0</b><small>已迁移文件</small></div><div class="stat"><b id="failed">0</b><small>失败文件</small></div></div>
<div class="bar"><i id="progress"></i></div>
<div id="status" class="status">已登录。准备开始迁移。</div>
<button id="startBtn">开始自动迁移</button>
<button id="verifyBtn" class="secondary">重新核对迁移结果</button>
</section>
<p class="warning">安全说明：只有主账号可以执行。每批最多迁移 3 个文件；迁移失败可重试。原始文件记录不会被删除。</p>
</main>
<script>
(function(){
 const $=id=>document.getElementById(id);let token='';let running=false;let migrated=0;let total=14;let failed=0;
 function say(s){$('status').textContent=s}
 async function api(path,body){
  const r=await fetch(path,{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},body:JSON.stringify(body||{})});
  const d=await r.json().catch(()=>({error:'服务器返回非 JSON'}));if(!r.ok||d.success===false)throw new Error(d.error||('HTTP '+r.status));return d;
 }
 $('loginBtn').onclick=async()=>{
  const name=$('account').value.trim(),pin=$('pin').value.trim();if(!name||!pin){say('请输入主账号名称和 PIN');return}
  $('loginBtn').disabled=true;$('loginBtn').textContent='登录中…';
  try{const r=await fetch('/api/dialer/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({account_name:name,pin})});const d=await r.json();if(!r.ok||!d.success)throw new Error(d.error||'登录失败');if(!d.is_master)throw new Error('当前账号不是主账号，拒绝访问');token=d.session_token;$('login').classList.add('hidden');$('work').classList.remove('hidden');say('主账号验证成功。请点击“开始自动迁移”。');await verify();}
  catch(e){say(e.message)}finally{$('loginBtn').disabled=false;$('loginBtn').textContent='主账号登录'}
 };
 async function verify(){
  try{const d=await api('/api/dialer/admin/storage-migration-status');total=d.legacy_count||0;migrated=d.manifest_count||0;$('total').textContent=total;$('done').textContent=migrated;$('failed').textContent=failed;$('progress').style.width=(total?Math.min(100,migrated/total*100):100)+'%';say('数据库核对完成：旧文件 '+total+' 个；迁移索引 '+migrated+' 个；Storage 实际对象 '+d.storage_count+' 个。'+(d.complete?'\n验证通过。':'\n尚未全部完成。'));}
  catch(e){say('核对失败：'+e.message)}
 }
 $('verifyBtn').onclick=verify;
 $('startBtn').onclick=async()=>{
  if(running)return;running=true;$('startBtn').disabled=true;$('verifyBtn').disabled=true;$('startBtn').textContent='迁移进行中…';let cursor=0;let rounds=0;
  try{
   while(rounds++<20){
    say('正在迁移第 '+rounds+' 批…\n每批最多 3 个文件，请保持页面打开。');
    const d=await api('/api/dialer/admin/migrate-storage-assets',{cursor,limit:3});
    migrated+=d.migrated||0;$('done').textContent=migrated;$('total').textContent=d.total||total;total=d.total||total;$('progress').style.width=(total?Math.min(100,migrated/total*100):0)+'%';
    say('本批成功 '+(d.migrated||0)+' 个。\n累计处理 '+migrated+' 个 / '+(d.total||total)+' 个。'+(d.assets&&d.assets.length?'\n'+d.assets.map(x=>x.name+' ('+x.size+' bytes)').join('\n'):''));
    if(d.next_cursor===null||d.next_cursor===undefined)break;cursor=d.next_cursor;
   }
   await verify();
  }catch(e){failed++;$('failed').textContent=failed;say('迁移中断：'+e.message+'\n可以再次点击开始，已成功上传的文件会安全覆盖，不会重复产生对象。');}
  finally{running=false;$('startBtn').disabled=false;$('verifyBtn').disabled=false;$('startBtn').textContent='继续 / 重试迁移'}
 };
})();
</script></body></html>`;
