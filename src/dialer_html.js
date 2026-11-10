export const DIALER_HTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes, viewport-fit=cover, shrink-to-fit=no">
  <title>减肥打卡</title>
  <script>
    // Independent boot watchdog: this runs even if the main application script
    // fails to parse or throws before reaching its normal completion marker.
    (function () {
      var bootErrors = [];
      window.__BHP_BOOT_ERRORS = bootErrors;
      window.addEventListener('error', function (event) {
        bootErrors.push((event.message || 'Script error') +
          (event.lineno ? ' (line ' + event.lineno + ')' : ''));
      });
      window.addEventListener('unhandledrejection', function (event) {
        var reason = event.reason;
        bootErrors.push('Unhandled promise: ' +
          (reason && reason.message ? reason.message : String(reason || 'unknown')));
      });
      window.setTimeout(function () {
        if (window.__BHP_BOOT_OK) return;
        var notice = document.getElementById('bootFallbackNotice');
        if (notice) {
          notice.style.display = 'block';
          notice.textContent = '页面启动中断：' +
            (bootErrors.length ? bootErrors.slice(0, 2).join('；') : '主脚本未完成初始化') +
            '。请刷新页面；问题仍存在时请将此提示截图发给管理员。';
          notice.style.color = '#b42318';
          notice.style.background = 'rgba(255, 80, 80, 0.12)';
        }
        var login = document.getElementById('authLoginOverlay');
        if (login) {
          login.classList.remove('auth-hidden');
          login.style.display = 'flex';
          login.style.zIndex = '2147483647';
        }
      }, 12000);
    })();
  </script>
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="theme-color" content="#f2f2f7">
  <link rel="manifest" href="/manifest.json">
  <link rel="apple-touch-icon" href="/icon.png">
  <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
  <link rel="icon" href="/icon.svg" type="image/svg+xml">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    :root {
      --bg-app: #f2f2f7;
      --card-bg: rgba(255,255,255,0.95);
      --card-border: rgba(0,0,0,0.04);
      --separator: rgba(0,0,0,0.08);
      --text-main: #1c1c1e;
      --text-soft: #3a3a3c;
      --text-light: #5c5c60;
      --accent-wechat: #07c160;
      --accent-intent: #07c160;
      --accent-wechat-bg: #f0fdf5;
      --accent-intent-bg: #f0fdf5;
      --btn-bg: rgba(0,0,0,0.04);
      --btn-hover: rgba(0,0,0,0.08);
      --shadow-card: 0 2px 12px rgba(0,0,0,0.06);
      --border-light: #eaeaeb;
      --modal-bg: rgba(0,0,0,0.3);
      --modal-card: rgba(255,255,255,0.96);
      --radius-ios: 16px;
      --radius-md: 12px;
      --radius-sm: 10px;
      --radius-xs: 8px;
      --radius-capsule: 999px;
      --wechat-gradient: linear-gradient(135deg, #b7f0ce 0%, #6be89d 50%, #1aad5a 100%);
      --intent-gradient: linear-gradient(135deg, #ffe0b2 0%, #ffb74d 50%, #f57c00 100%);
      --revisit-gradient: linear-gradient(135deg, #d1e0ff 0%, #7b9ff5 50%, #4a6cf7 100%);
    }
    body.dark-mode {
      --bg-app: #1c1c1e;
      --card-bg: rgba(28,28,30,0.82);
      --card-border: rgba(255,255,255,0.06);
      --separator: rgba(255,255,255,0.1);
      --text-main: #f2f2f7;
      --text-soft: #aeaeb2;
      --text-light: #aeaeb2;
      --accent-wechat: #30d158;
      --accent-intent: #30d158;
      --accent-wechat-bg: #0a2818;
      --accent-intent-bg: #0a2818;
      --btn-bg: rgba(255,255,255,0.12);
      --btn-hover: rgba(255,255,255,0.18);
      --shadow-card: 0 2px 16px rgba(0,0,0,0.4);
      --border-light: #2c2c2e;
      --modal-bg: rgba(0,0,0,0.5);
      --modal-card: rgba(28,28,30,0.97);
      --wechat-gradient: linear-gradient(135deg, #0d3320 0%, #144d2e 50%, #1a6b3a 100%);
      --intent-gradient: linear-gradient(135deg, #332010 0%, #4d2e14 50%, #6b3a1a 100%);
      --revisit-gradient: linear-gradient(135deg, #1a2233 0%, #2a354d 50%, #3a4d6b 100%);
    }
    html { height: 100%; width: 100%; overflow: hidden; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
    body {
      height: 100%;
      width: 100%;
      overflow: hidden;
      background: var(--bg-app);
      font-family: "SF Pro Display", "SF Pro Text", -apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", "Microsoft YaHei", sans-serif;
      font-weight: 400;
      letter-spacing: -0.01em;
      line-height: 1.45;
      transition: background 0.3s;
    }
    .app-shell {
      height: 100%;
      width: 100%;
      display: none;
      flex-direction: column;
    }
    .container {
      flex: 1;
      min-height: 0;
      width: 100%;
      max-width: none;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0;
      overflow: hidden;
    }
    .container > * { margin-top: 0; margin-bottom: 0; }
    .cards-content {
      flex: 1;
      min-height: 0;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      padding: 0;
      margin-top: -2px;
      position: relative;
      z-index: 1;
    }

    /* Header Bar — full width；半透明毛玻璃，让全屏壁纸从屏幕顶连续透入顶栏（移动浏览器中
       普通流内容从地址栏下方开始，壁纸 fixed 铺满全屏，顶栏必须融入壁纸才没有「间隙」）
       env(safe-area-inset-top)：添加到主屏幕（独立模式，状态栏透明）时顶栏背景延伸到
       刘海/状态栏区域，顶栏真正从屏幕物理顶开始；普通浏览器中该值为 0，无副作用 */
    .header-bar {
      height: calc(36px + env(safe-area-inset-top, 0px));
      padding: env(safe-area-inset-top, 0px) 16px 0;
      border-bottom: 0.5px solid var(--separator);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
      position: relative;
      z-index: 2500; /* backdrop-filter 创建独立层叠上下文：显式 z-index 保证顶栏及内部下拉菜单浮于客户卡片之上 */
      background: rgba(255,255,255,0.7);
      /* 顶栏常驻：blur 半径越大滚动时重采样成本越高，20px→12px 视觉相近、性能大降 */
      backdrop-filter: blur(12px) saturate(150%);
      -webkit-backdrop-filter: blur(12px) saturate(150%);
    }
    body.dark-mode .header-bar {
      background: rgba(28,28,30,0.7);
    }
    /* iOS Safari（悬浮地址栏在底部、状态栏透明悬浮）：fixed 元素从屏幕物理顶开始，
       普通流内容从状态栏下方开始 → 顶栏改 fixed top:0，内容直接上移覆盖状态栏区域
       （时间/电量浮在顶栏上），毛玻璃背景从屏幕最顶铺起。
       max(env(safe-area-inset-top), 4px)：普通 Safari 悬浮模式为 0 时内容贴顶（4px 小间隙，
       覆盖状态栏）；独立模式（添加到主屏幕）刘海 47/59px 时取环境值避让刘海。
       旧 iOS 不支持 max() 时整条规则失效，回退普通流 */
    .header-stats-minimal {
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--text-soft);
      display: flex;
      align-items: center;
      gap: 6px;
    }
    /* 新号模式开关：iOS 风格小 toggle（每轮 10 个客户，加完冷却 20-30 分钟） */
    #newModeToggle {
      display: inline-flex; align-items: center; gap: 4px;
      border: none; background: transparent; cursor: pointer;
      padding: 2px 4px; flex-shrink: 0;
      -webkit-tap-highlight-color: transparent; touch-action: manipulation;
    }
    .nm-track {
      width: 38px; height: 22px; border-radius: 999px;
      background: rgba(0,0,0,0.16); position: relative; transition: background 0.2s;
    }
    body.dark-mode .nm-track { background: rgba(255,255,255,0.22); }
    #newModeToggle.on .nm-track { background: var(--accent-wechat); }
    .nm-thumb {
      position: absolute; top: 2px; left: 2px; width: 18px; height: 18px;
      border-radius: 50%; background: #fff;
      box-shadow: 0 1px 2px rgba(0,0,0,0.2); transition: left 0.2s;
    }
    #newModeToggle.on .nm-thumb { left: 18px; }
    /* 两个设置卡片统一高度、对齐方式和开关尺寸 */
    .drawer-setting-card { padding: 13px 14px; gap: 0; }
    .drawer-setting-row { min-height: 30px; display:flex; align-items:center; justify-content:space-between; gap:12px; }
    .drawer-setting-title { display:flex; align-items:center; gap:8px; min-width:0; font-size:0.86rem; font-weight:700; color:var(--text-soft); }
    .drawer-info-btn { width:20px; height:20px; flex:0 0 20px; padding:0; border:1px solid var(--text-light); border-radius:50%; background:transparent; color:var(--text-soft); font-size:12px; font-weight:800; line-height:18px; cursor:pointer; }
    .drawer-setting-control { display:inline-flex; align-items:center; justify-content:flex-end; gap:8px; flex-shrink:0; cursor:pointer; }
    .drawer-setting-state { min-width:38px; text-align:right; font-size:0.7rem; color:var(--text-light); white-space:nowrap; }
    .drawer-setting-checkbox { appearance:none; -webkit-appearance:none; width:38px; height:22px; margin:0; border:0; border-radius:999px; background:rgba(0,0,0,0.16); position:relative; cursor:pointer; transition:background .2s; flex:0 0 38px; }
    body.dark-mode .drawer-setting-checkbox { background:rgba(255,255,255,0.22); }
    .drawer-setting-checkbox::after { content:""; position:absolute; width:18px; height:18px; left:2px; top:2px; border-radius:50%; background:#fff; box-shadow:0 1px 2px rgba(0,0,0,.2); transition:transform .2s; }
    .drawer-setting-checkbox:checked { background:var(--accent-wechat); }
    .drawer-setting-checkbox:checked::after { transform:translateX(16px); }
    .header-dropdown {
      position: absolute;
      top: 34px;
      right: 4px;
      background: var(--card-bg);
      border: 0.5px solid var(--card-border);
      border-radius: var(--radius-sm);
      box-shadow: 0 8px 24px rgba(0,0,0,0.12);
      z-index: 2500;
      display: flex;
      flex-direction: column;
      padding: 4px 0;
      max-height: 60vh;
      overflow-y: auto;
      min-width: 140px;
    }
    .dropdown-item {
      padding: 8px 14px;
      font-size: 0.76rem;
      color: var(--text-soft);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s;
      font-weight: 700;
      background: transparent;
      border: none;
      width: 100%;
      text-align: left;
    }
    .dropdown-item:hover {
      background: var(--btn-hover);
      color: var(--text-main);
    }
    /* More menu help icons: one consistent compact circular style */
    .menu-help-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 16px;
      width: 16px;
      height: 16px;
      min-width: 16px;
      box-sizing: border-box;
      margin-left: auto;
      border: 1px solid var(--text-light);
      border-radius: 50%;
      color: var(--text-soft);
      background: transparent;
      font-size: 10px;
      font-weight: 700;
      line-height: 1;
      opacity: .78;
      cursor: pointer;
      vertical-align: middle;
      -webkit-tap-highlight-color: transparent;
    }
    .menu-help-btn:hover,
    .menu-help-btn:focus-visible {
      color: var(--accent-wechat);
      border-color: var(--accent-wechat);
      opacity: 1;
      outline: none;
    }
    .icon-btn {
      background: var(--btn-bg);
      border: none;
      color: var(--text-main);
      font-size: 0.76rem;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: var(--radius-sm);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
      box-shadow: var(--shadow-card);
    }
    .icon-btn:hover {
      background: var(--btn-hover);
    }
    
    /* Dashboard Area — now a modal overlay */
    .dashboard-panel {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.55);
      z-index: 5000;
      opacity: 0;
      pointer-events: none;
      visibility: hidden;
      transition: opacity 0.25s ease, visibility 0.25s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }
    .dashboard-panel.active {
      opacity: 1;
      pointer-events: auto;
      visibility: visible;
    }
    .dashboard-panel .import-zone {
      background: var(--modal-card);
      border: 0.5px solid var(--card-border);
      border-radius: var(--radius-md);
      box-shadow: 0 15px 45px rgba(0,0,0,0.3);
      width: 92vw;
      max-width: 520px;
      max-height: 85vh;
      overflow-y: auto;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      transform: translateY(20px);
      transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 0.8);
    }
    .dashboard-panel.active .import-zone {
      transform: translateY(0);
    }
    .import-close-btn {
      position: absolute;
      top: 12px; right: 12px;
      width: 32px; height: 32px;
      border: none; background: rgba(0,0,0,0.08);
      border-radius: 50%; font-size: 1rem; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      color: var(--text-soft); z-index: 10;
      box-shadow: var(--shadow-card);
      transition: all 0.2s;
    }
    .import-close-btn:hover { background: #e81123; color: #fff; }
    body.dark-mode .import-close-btn { background: rgba(255,255,255,0.1); }
    body.dark-mode .import-close-btn:hover { background: #e81123; color: #fff; }
    /* Legacy import-zone dragover state (still used inside modal) */
    .import-zone.dragover {
      border-color: var(--accent-wechat);
      background: var(--accent-wechat-bg);
    }
    .import-buttons {
      display: flex;
      gap: 10px;
    }
    .btn-primary {
      background: var(--wechat-gradient);
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: var(--radius-sm);
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(7,193,96,0.2);
      transition: all 0.2s;
    }
    .btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(7,193,96,0.3);
    }
    .btn-secondary {
      background: var(--revisit-gradient);
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: var(--radius-sm);
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(74,108,247,0.2);
      transition: all 0.2s;
    }
    .btn-secondary:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 16px rgba(74,108,247,0.3);
    }
    
    /* Stats Bar — compact horizontal */
    .stats-bar {
      margin-top: 0;
      display: flex;
      align-items: center;
      gap: 24px;
      background: transparent;
      border: none;
      border-radius: 0;
      padding: 6px 0;
      flex-wrap: wrap;
    }
    .stat-item {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 6px;
    }
    .stat-label {
      font-size: 0.7rem;
      color: var(--text-light);
    }
    .stat-val {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--text-main);
    }
    .progress-track {
      flex: 1;
      min-width: 120px;
      height: 6px;
      background: var(--btn-bg);
      border-radius: var(--radius-xs);
      overflow: hidden;
      position: relative;
    }
    .progress-fill {
      height: 100%;
      background: var(--wechat-gradient);
      width: 0%;
      border-radius: var(--radius-xs);
      transition: width 0.3s ease;
    }

    /* Control Panel — full width toolbar */
    .control-bar {
      min-height: 40px;
      padding: 6px 16px;
      border-bottom: 0.5px solid var(--separator);
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
      flex-wrap: wrap;
      background: var(--card-bg);
    }
    .search-input {
      width: 160px;
      flex-shrink: 0;
      height: 30px;
      background: var(--bg-app);
      border: 0.5px solid var(--card-border);
      border-radius: var(--radius-xs);
      padding: 0 10px;
      font-size: 0.78rem;
      color: var(--text-main);
      outline: none;
      font-weight: 700;
      transition: all 0.2s;
    }
    .search-input:focus {
      border-color: var(--accent-wechat);
      background: var(--card-bg);
    }
    .filter-group {
      display: flex;
      gap: 4px;
    }
    .filter-tab {
      height: 30px;
      padding: 0 12px;
      background: transparent;
      border: none;
      color: var(--text-soft);
      font-size: 0.76rem;
      font-weight: 600;
      border-radius: var(--radius-sm);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      transition: all 0.2s;
    }
    .filter-tab.active {
      background: var(--accent-wechat-bg);
      color: var(--accent-wechat);
    }
    
    /* Cards Container — Table on desktop, cards on mobile */
    .cards-content {
      flex: 1;
      min-height: 0;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      padding: 0;
    }
    /* CRM Table */
    .crm-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
      min-width: 900px;
      background: transparent;
    }
    .crm-table thead th {
      position: sticky; top: 0; z-index: 2;
      background: rgba(255,255,255,0.92); /* sticky 表头：实色底替代 blur，滚动不重采样 */
      padding: 6px 10px;
      text-align: left;
      font-weight: 700;
      color: #444;
      border: 0.5px solid var(--card-border);
      border-top: none;
      border-bottom: 2px solid rgba(0,0,0,0.12);
      white-space: nowrap;
      font-size: 12px;
      cursor: pointer;
      user-select: none;
    }
    .crm-table thead th:hover { background: rgba(255,255,255,0.78); }
    .crm-table thead th .sort-arrow { font-size: 10px; margin-left: 2px; opacity: 0.35; }
    .crm-table thead th.sorted .sort-arrow { opacity: 1; color: #4a6cf7; }
    .crm-table td {
      padding: 4px 10px;
      border: 0.5px solid var(--card-border);
      color: #333;
      white-space: nowrap;
      font-size: 13px;
      vertical-align: middle;
      background: transparent;
    }
    .crm-table tbody tr:nth-child(even) td { background: rgba(255,255,255,0.25); }
    .crm-table tbody tr:hover td { background: rgba(74,108,247,0.08) !important; }
    .crm-table tbody tr.row-dialed td { opacity: 0.55; }
    .crm-table .col-no { width: 40px; text-align: center; color: #aaa; font-size: 11px; }
    .crm-table .col-status { width: 80px; }
    .crm-table .col-name { min-width: 70px; }
    .crm-table .col-phone { min-width: 115px; font-family: monospace; }
    .crm-table .col-company { min-width: 140px; }
    .crm-table .col-note { min-width: 80px; max-width: 150px; overflow: hidden; text-overflow: ellipsis; }
    .crm-table .col-batch { min-width: 90px; }
    .crm-table .col-action { width: 60px; text-align: center; }
    body.dark-mode .crm-table { background: transparent; }
    body.dark-mode .crm-table thead th { background: rgba(26,26,26,0.92); border-color: rgba(255,255,255,0.08); color: #ccc; border-bottom-color: rgba(255,255,255,0.1); }
    body.dark-mode .crm-table thead th:hover { background: rgba(26,26,26,0.8); }
    body.dark-mode .crm-table td { color: #ddd; border-color: rgba(255,255,255,0.05); background: transparent; }
    body.dark-mode .crm-table tbody tr:nth-child(even) td { background: rgba(255,255,255,0.04); }
    body.dark-mode .crm-table tbody tr:hover td { background: rgba(74,108,247,0.12) !important; }
    .xls-dial-card {
      background: var(--card-bg);
      /* 卡片背景已 ≥82% 不透明，backdrop-filter 无视觉贡献；
         50 张卡片 = 50 个 backdrop 合成层，iOS 列表滚动卡顿/破碎的元凶，移除 */
      border: 0.5px solid var(--card-border);
      border-radius: var(--radius-sm);
      padding: 10px 14px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.04);
      position: relative;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }
    body.dark-mode .xls-dial-card {
      background: var(--card-bg);
      border-color: rgba(255,255,255,0.08);
    }
    .xls-dial-card:hover {
      border-color: rgba(74,108,247,0.3);
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    }
    .corner-seq {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px; height: 18px;
      border-radius: 50%;
      background: var(--accent-wechat);
      flex-shrink: 0;
      box-shadow: var(--shadow-card);
    }
    .corner-seq span {
      font-size: 0.55rem;
      font-weight: 700;
      color: #fff;
      line-height: 1;
    }
    .xls-dial-card.dialed {
      opacity: 0.8;
      border-color: var(--border-light);
      background: rgba(0, 0, 0, 0.02);
    }
    body.dark-mode .xls-dial-card.dialed {
      background: rgba(255, 255, 255, 0.03);
    }
    /* 复制过号码的客户卡片：浅浅的绿色光晕（不动背景，仅描边+柔光），放 dialed 之后保证优先 */
    .xls-dial-card.copied-card {
      border-color: rgba(7, 193, 96, 0.28);
      box-shadow: 0 0 0 0.5px rgba(7, 193, 96, 0.22), 0 0 10px rgba(7, 193, 96, 0.1);
    }
    body.dark-mode .xls-dial-card.copied-card {
      border-color: rgba(7, 193, 96, 0.35);
      box-shadow: 0 0 0 0.5px rgba(7, 193, 96, 0.3), 0 0 12px rgba(7, 193, 96, 0.16);
    }
    /* 复制过单位名称的客户卡片：强提醒（微信绿底 + 绿描边 + 柔光），定义在后覆盖浅光晕 */
    .xls-dial-card.copied-company {
      border-color: rgba(7, 193, 96, 0.5);
      background: rgba(7, 193, 96, 0.06);
      box-shadow: 0 0 0 0.5px rgba(7, 193, 96, 0.35), 0 0 12px rgba(7, 193, 96, 0.14);
    }
    body.dark-mode .xls-dial-card.copied-company {
      border-color: rgba(7, 193, 96, 0.55);
      background: rgba(7, 193, 96, 0.1);
      box-shadow: 0 0 0 0.5px rgba(7, 193, 96, 0.45), 0 0 14px rgba(7, 193, 96, 0.22);
    }
    .xls-dial-badge {
      font-size: 0.65rem;
      font-weight: 600;
      padding: 2px 6px;
      border-radius: var(--radius-xs);
      display: inline-flex;
      align-items: center;
      box-shadow: var(--shadow-card);
    }
    .xls-dial-badge-todo {
      background: var(--btn-bg);
      color: var(--text-soft);
    }
    .xls-dial-badge-success {
      background: rgba(7, 193, 96, 0.1);
      color: var(--accent-intent);
    }
    .xls-dial-badge-failed {
      background: rgba(231, 76, 60, 0.1);
      color: #e74c3c;
    }
    

    
    .client-card-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .client-card-primary {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .client-card-name-btn {
      font-size: 0.92rem;
      font-weight: 700;
      color: var(--text-main);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 1px 4px;
      border-radius: var(--radius-sm);
      transition: all 0.2s;
    }
    .client-card-name-btn:hover {
      background: var(--btn-hover);
    }
    .client-card-phone-wrap {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .client-phone-btn {
      font-size: 0.85rem;
      font-weight: 500;
      color: var(--text-soft);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      padding: 1px 4px;
      border-radius: var(--radius-sm);
      transition: all 0.2s;
    }
    /* 隐私模式快捷操作统一为无边框、透明底样式，与“复制备注”保持一致 */
    .client-phone-btn.privacy-add-vx {
      min-height: 34px;
      padding: 0 7px;
      border-radius: 8px;
      background: transparent !important;
      color: #079b50 !important;
      border: 0 !important;
      font-size: 0.82rem;
      font-weight: 800;
      letter-spacing: .02em;
      box-shadow: 0 0 0 1px rgba(7,193,96,.10), 0 0 9px rgba(7,193,96,.18) !important;
      text-shadow: 0 0 7px rgba(7,193,96,.20);
      justify-content: center;
      transition: box-shadow .2s ease, transform .2s ease, color .2s ease;
    }
    .client-phone-btn.privacy-add-vx:active {
      transform: scale(.96);
      background: transparent !important;
      box-shadow: 0 0 0 1px rgba(7,193,96,.18), 0 0 13px rgba(7,193,96,.30) !important;
    }
    .client-phone-btn.privacy-add-vx.copied {
      background: transparent !important;
      color: #e53935 !important;
      border: 0 !important;
      box-shadow: 0 0 0 1px rgba(229,57,53,.10), 0 0 9px rgba(229,57,53,.18) !important;
      text-shadow: 0 0 7px rgba(229,57,53,.18);
      font-weight: 800;
    }
    .xls-card-dial-btn.privacy-dial-icon {
      width: 30px;
      min-width: 30px;
      padding: 0 !important;
      border-radius: 8px;
      background: transparent !important;
      color: #079b50 !important;
      border: 0 !important;
      box-shadow: 0 0 0 1px rgba(7,193,96,.10), 0 0 9px rgba(7,193,96,.20) !important;
      transition: box-shadow .2s ease, transform .2s ease, color .2s ease;
    }
    .xls-card-dial-btn.privacy-dial-icon:active {
      transform: scale(.94);
      box-shadow: 0 0 0 1px rgba(7,193,96,.20), 0 0 14px rgba(7,193,96,.34) !important;
    }
    .xls-card-dial-btn.privacy-dial-icon.dial-attempted {
      background: transparent !important;
      color: #e53935 !important;
      border: 0 !important;
      box-shadow: 0 0 0 1px rgba(229,57,53,.10), 0 0 9px rgba(229,57,53,.20) !important;
    }
    .xls-card-dial-btn.privacy-dial-icon svg {
      width: 16px;
      height: 16px;
      display: block;
    }
    .client-card-tag-company.privacy-action-done {
      color: var(--accent-wechat) !important;
      background: rgba(7,193,96,.10) !important;
      font-weight: 800 !important;
    }
    .client-phone-btn:hover {
      background: var(--btn-hover);
      color: var(--text-main);
    }
    .client-phone-btn.copied {
      color: #078c49 !important;
      background: rgba(7,193,96,.13) !important;
      text-shadow: none !important;
      font-weight: 800;
      border-radius: 6px;
    }
    body.dark-mode .client-phone-btn.copied {
      color: #65d995 !important;
      background: rgba(7,193,96,.20) !important;
      text-shadow: none !important;
    }
    .crm-copy-btn.copied-phone {
      color: #e53935 !important;
      font-weight: 800;
    }
    .client-card-tags {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }
    .client-card-tag {
      font-size: 0.85rem;
      font-weight: 500;
      padding: 2px 10px;
      border-radius: var(--radius-xs);
      box-shadow: var(--shadow-card);
    }
    .client-card-tag-company {
      background: rgba(7,193,96,0.08);
      color: var(--accent-wechat);
      cursor: pointer;
      transition: all 0.2s;
    }
    .client-card-tag-company:hover {
      background: var(--btn-hover);
    }
    .client-card-body {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding-left: 8px;
    }
    .client-card-content-block {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .client-card-label {
      font-size: 0.62rem;
      color: var(--text-light);
      text-transform: uppercase;
    }
    .client-card-text {
      font-size: 0.65rem;
      color: var(--text-soft);
      line-height: 1.4;
    }
    .client-card-actions {
      display: flex;
      justify-content: flex-end;
      border-top: 1px dashed var(--border-light);
      padding-top: 6px;
      margin-top: 0px;
    }

    /* 客户卡片文字增强：信息更清晰，手机号采用纯文字呈现 */
    .client-card-name-btn,
    .client-card-tag,
    .client-card-label,
    .client-card-text {
      font-weight: 700;
    }
    .client-phone-btn:not(.privacy-add-vx) {
      color: #1c1c1e;
      font-weight: 700;
      border: 0 !important;
      outline: 0;
      background: transparent;
      box-shadow: none;
      padding-left: 0;
      padding-right: 0;
    }
    body.dark-mode .client-phone-btn:not(.privacy-add-vx) {
      color: #f2f2f7;
    }
    
    /* AI Importer Animations */
    @keyframes pulse-ring {
      0% { transform: scale(0.95); opacity: 0.5; }
      50% { transform: scale(1.1); opacity: 0.15; }
      100% { transform: scale(0.95); opacity: 0.5; }
    }
    @keyframes laser-scan {
      0% { top: 0%; opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { top: 100%; opacity: 0; }
    }
    .ai-laser-line {
      position: absolute;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, rgba(7,193,96,0) 0%, rgba(7,193,96,0.8) 50%, rgba(7,193,96,0) 100%);
      box-shadow: 0 0 8px rgba(7,193,96,0.6);
      animation: laser-scan 2s infinite linear;
      pointer-events: none;
    }
    
    /* Overlay and Modals */
    .modal-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      /* backdrop-filter 在 opacity 过渡期间整屏重采样，iOS 弹窗卡顿/破碎元凶：
         改为实色加深遮罩（iOS 系统弹窗同样是无模糊深色遮罩） */
      background: rgba(0,0,0,0.55);
      z-index: 2000;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .modal-overlay.active {
      opacity: 1;
      pointer-events: auto;
    }
    .modal-card {
      background: var(--modal-card);
      border: 0.5px solid var(--card-border);
      border-radius: var(--radius-md);
      box-shadow: 0 15px 45px rgba(0,0,0,0.3);
      width: 90vw;
      max-width: 400px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      transform: translateY(20px);
      transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
    }
    .modal-overlay.active .modal-card {
      transform: translateY(0);
    }

    /* Auth overlays — full-screen login/setup */
    .auth-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: transparent;
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.3s ease;
      padding: 24px;
    }
    
    .lock-wallpaper {
      position: absolute; top: 0; left: 0; right: 0; bottom: 0;
      background-size: cover; background-position: center;
      z-index: 1; opacity: 0;
      transition: opacity 0.8s ease-in-out;
    }
    .lock-wallpaper.loaded { opacity: 1; }
    .lock-wallpaper-overlay {
      position: absolute; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.18); z-index: 2;
    }
    /* Global wallpaper — shared by main interface & lock screen */
    .global-wallpaper {
      position: fixed; top: 0; left: 0; right: 0; bottom: 0;
      background-size: cover; background-position: center;
      background-image: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
      z-index: 0; opacity: 1;
      transition: opacity 0.8s ease-in-out;
    }
    .global-wallpaper.loaded { opacity: 1; }
    /* 深色模式：壁纸进一步模糊并压暗，突出前景内容 */
    body.dark-mode .global-wallpaper,
    body.dark-mode .lock-wallpaper {
      filter: brightness(0.36) blur(6px);
      transform: scale(1.04);
      transform-origin: center;
    }
    body.dark-mode .lock-wallpaper-overlay {
      background: rgba(0,0,0,0.50);
    }
    /* Glass-morphism lock screen card */
    /* ── Anime-style lock card ── */
    .auth-overlay .auth-card {
      position: relative; z-index: 3;
      background: linear-gradient(160deg, rgba(255,255,255,0.55) 0%, rgba(255,240,245,0.4) 40%, rgba(245,225,255,0.35) 100%);
      /* 50px blur 触发整屏重采样（最贵档），24px 视觉相近、成本大降 */
      backdrop-filter: blur(24px) saturate(160%);
      -webkit-backdrop-filter: blur(24px) saturate(160%);
      border: 1.5px solid rgba(255,140,180,0.35);
      border-radius: 32px;
      box-shadow:
        0 0 30px rgba(255,150,200,0.15),
        0 8px 40px rgba(0,0,0,0.06),
        inset 0 1px 0 rgba(255,255,255,0.5);
      overflow: hidden;
    }
    /* Subtle anime glow ring */
    .auth-overlay .auth-card::before {
      content: ''; position: absolute; top: -1px; left: 20px; right: 20px; height: 1px;
      background: linear-gradient(90deg, transparent, rgba(255,180,210,0.6), rgba(200,160,255,0.6), rgba(255,180,210,0.6), transparent);
      z-index: 10; pointer-events: none; border-radius: 1px;
    }
    body.dark-mode .auth-overlay .auth-card {
      background: linear-gradient(160deg, rgba(35,25,35,0.55) 0%, rgba(30,20,30,0.45) 40%, rgba(25,20,30,0.4) 100%);
      backdrop-filter: blur(24px) saturate(140%);
      -webkit-backdrop-filter: blur(24px) saturate(140%);
      border: 1.5px solid rgba(200,120,180,0.25);
      box-shadow:
        0 0 40px rgba(200,100,180,0.12),
        0 8px 40px rgba(0,0,0,0.3),
        inset 0 1px 0 rgba(255,255,255,0.04);
    }
    body.dark-mode .auth-overlay .auth-card::before {
      background: linear-gradient(90deg, transparent, rgba(200,140,200,0.4), rgba(160,120,200,0.4), rgba(200,140,200,0.4), transparent);
    }
    /* ── Anime PIN input ── */
    .auth-overlay .auth-input {
      background: rgba(255,255,255,0.55);
      border: 2px solid rgba(255,180,210,0.5);
      border-radius: 18px;
      color: #5c3d5c;
      font-weight: 600;
      letter-spacing: 1px;
      transition: all 0.3s ease;
    }
    .auth-overlay .auth-pin-input { letter-spacing: 6px; }
    .auth-pin-mask { -webkit-text-security: disc; }
    .auth-overlay .auth-input:focus {
      border-color: rgba(255,130,180,0.8);
      box-shadow: 0 0 20px rgba(255,150,200,0.2), 0 0 0 4px rgba(255,180,210,0.08);
      background: rgba(255,255,255,0.8);
    }
    .auth-overlay .auth-input::placeholder {
      color: rgba(180,140,170,0.6);
      letter-spacing: 1px;
    }
    body.dark-mode .auth-overlay .auth-input {
      background: rgba(40,25,40,0.5);
      border-color: rgba(180,100,160,0.4);
      color: #e0d0e0;
    }
    body.dark-mode .auth-overlay .auth-input:focus {
      border-color: rgba(220,130,190,0.7);
      box-shadow: 0 0 24px rgba(200,120,180,0.18), 0 0 0 4px rgba(180,120,170,0.08);
      background: rgba(50,30,50,0.7);
    }
    /* ── Anime unlock button ── */
    .auth-overlay .auth-btn {
      background: linear-gradient(135deg, #f8a0c8 0%, #d08ae8 50%, #a8a0f0 100%);
      border: none;
      border-radius: 22px;
      font-weight: 600;
      letter-spacing: 4px;
      box-shadow: 0 6px 24px rgba(210,130,200,0.35), 0 0 40px rgba(200,150,220,0.1);
      transition: all 0.3s ease;
    }
    .auth-overlay .auth-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 8px 28px rgba(210,130,200,0.45), 0 0 50px rgba(200,150,220,0.18);
    }
    .auth-overlay .auth-btn:active {
      transform: scale(0.97);
      box-shadow: 0 4px 16px rgba(210,130,200,0.3);
    }
    body.dark-mode .auth-overlay .auth-btn {
      background: linear-gradient(135deg, #c06090 0%, #a060c0 50%, #7878d0 100%);
      box-shadow: 0 6px 24px rgba(160,80,150,0.35), 0 0 40px rgba(140,80,160,0.12);
    }.auth-overlay.auth-hidden {
      display: none;
    }
    .auth-card {
      background: var(--card-bg);
      border: 0.5px solid var(--card-border);
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04);
      max-width: 360px;
      width: 88vw;
      padding: 36px 28px 32px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .auth-title {
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--text-main);
      text-align: center;
      letter-spacing: 0.5px;
    }
    .auth-subtitle {
      font-size: 0.72rem;
      color: var(--text-soft);
      text-align: center;
      font-weight: 700;
    }
    .auth-input {
      width: 100%;
      height: 46px;
      padding: 0 14px;
      font-size: 0.92rem;
      border: 2px solid var(--card-border);
      border-radius: 10px;
      font-weight: 600;
      outline: none;
      background: var(--bg-app);
      color: var(--text-main);
      box-sizing: border-box;
      text-align: center;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .auth-input:focus {
      border-color: var(--accent-wechat);
      box-shadow: 0 0 0 3px rgba(7,193,96,0.1);
    }
    .auth-input::placeholder {
      color: var(--text-soft);
      opacity: 0.5;
      font-weight: 600;
    }
    .auth-pin-input {
      font-size: 0.92rem;
    }
    .auth-select {
      width: 100%;
      height: 46px;
      padding: 0 12px;
      font-size: 0.85rem;
      border: 2px solid var(--card-border);
      border-radius: 10px;
      font-weight: 700;
      outline: none;
      background: var(--bg-app);
      color: var(--text-main);
      cursor: pointer;
      font-family: monospace;
      transition: border-color 0.2s;
    }
    .auth-error {
      font-size: 0.65rem;
      color: #e74c3c;
      min-height: 18px;
      text-align: center;
      font-weight: 700;
      margin-top: -4px;
    }
    .auth-wechat-count {
      text-align: center;
      padding: 12px 0;
      margin-bottom: 14px;
      background: var(--accent-wechat-bg);
      border-radius: var(--radius-sm);
      box-shadow: var(--shadow-card);
    }
    .auth-wc-label {
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--accent-wechat);
      margin-bottom: 6px;
    }
    .auth-wc-num {
      font-size: 1.6rem;
      font-weight: 700;
      color: var(--accent-wechat);
      min-width: 40px;
      text-align: center;
    }
    .auth-wc-btn {
      width: 36px;
      height: 28px;
      border: none;
      color: #fff;
      border-radius: var(--radius-sm);
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      -webkit-tap-highlight-color: transparent;
      touch-action: manipulation;
    }
    .auth-wc-plus {
      background: #07c160;
    }
    .auth-wc-plus:active {
      background: #06ad56;
    }
    .auth-wc-minus {
      background: #e74c3c;
    }
    .auth-wc-minus:active {
      background: #c0392b;
    }
    .auth-btn {
      width: 100%;
      height: 46px;
      background: var(--accent-wechat);
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 0.92rem;
      font-weight: 600;
      cursor: pointer;
      letter-spacing: 1px;
      box-shadow: 0 4px 16px rgba(7,193,96,0.25);
      transition: all 0.2s;
      margin-top: 2px;
    }
    .auth-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(7,193,96,0.35);
    }
    .auth-btn:active {
      transform: translateY(0);
      box-shadow: 0 2px 8px rgba(7,193,96,0.2);
    }
    .auth-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }
    .auth-link {
      font-size: 0.7rem;
      color: var(--text-light);
      text-align: center;
      cursor: pointer;
      font-weight: 700;
      text-decoration: underline;
      transition: color 0.2s;
    }
    .auth-link:hover {
      color: var(--accent-wechat);
    }
    .auth-account-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
      max-height: 180px;
      overflow-y: auto;
    }
    .auth-account-item {
      padding: 10px 12px;
      border: none;
      border-radius: var(--radius-sm);
      cursor: pointer;
      font-size: 0.8rem;
      font-weight: 700;
      color: var(--text-main);
      background: var(--btn-bg);
      transition: all 0.15s;
      text-align: left;
      box-shadow: var(--shadow-card);
    }
    .auth-account-item:hover {
      background: var(--accent-wechat-bg);
    }
    .auth-account-item.selected {
      background: var(--accent-wechat-bg);
    }

    /* Dialer Assist */
    .call-pulse {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: var(--accent-wechat-bg);
      color: var(--accent-wechat);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 1.8rem;
      margin: 0 auto 6px;
      position: relative;
    }
    .call-pulse::after {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      border-radius: 50%;
      border: 2px solid var(--accent-wechat);
      animation: ripple 1.6s infinite ease-out;
      opacity: 0;
    }
    @keyframes ripple {
      0% { transform: scale(1); opacity: 0.5; }
      100% { transform: scale(1.6); opacity: 0; }
    }
    
    .btn-modal {
      height: 42px;
      border: none;
      border-radius: var(--radius-sm);
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }
    .btn-success {
      background: #07c160;
      color: white;
      box-shadow: 0 4px 12px rgba(7,193,96,0.25);
    }
    .btn-danger {
      background: #e74c3c;
      color: white;
      box-shadow: 0 4px 12px rgba(231,76,60,0.25);
    }
    .btn-neutral {
      background: #7f8c8d;
      color: white;
      box-shadow: 0 4px 12px rgba(127,140,141,0.25);
    }
    
    /* Export Panel */
    .export-modal-card {
      max-width: 500px;
    }
    .export-textarea {
      width: 100%;
      height: 200px;
      background: var(--btn-bg);
      border: 0.5px solid var(--card-border);
      border-radius: var(--radius-sm);
      padding: 10px 12px;
      font-size: 0.76rem;
      color: var(--text-main);
      outline: none;
      font-weight: 600;
      resize: none;
      line-height: 1.5;
      font-family: monospace;
    }


    
    /* Android APK full-screen spacing */
    body.android .app-shell { }

    /* Mobile Adaptive Styles for iOS & Android */
    @media (max-width: 480px) {
      .container {
        border-right: none;
        border-radius: 0;
        box-shadow: none;
      }
      .control-bar {
        padding: 4px 8px;
        gap: 4px;
        min-height: 42px;
      }
      .search-input {
        width: 100px;
        padding: 0 6px;
        font-size: 0.74rem;
      }
      .filter-group {
        gap: 2px;
      }
      .filter-tab {
        padding: 0 6px;
        font-size: 0.7rem;
        height: 28px;
      }
      .header-bar {
        height: calc(38px + env(safe-area-inset-top, 0px));
        padding: env(safe-area-inset-top, 0px) 10px 0;
      }
      .header-stats-minimal {
        font-size: 0.72rem;
      }
      .cards-content {
        padding: 0 8px 6px 8px;
        gap: 6px;
        grid-template-columns: 1fr; /* single column on mobile */
      }
      .xls-dial-card {
        padding: 8px 10px;
        gap: 5px;
        border-radius: var(--radius-sm);
      }
      .card-copy-btn {
        top: 6px;
        right: 10px;
        padding: 2px 5px;
        font-size: 0.62rem;
      }
      .client-card-name-btn {
        font-size: 0.88rem;
        padding: 1px 2px;
      }
      .client-phone {
        font-size: 0.8rem;
      }
      .xls-dial-badge {
        font-size: 0.6rem;
        padding: 1px 4px;
      }
      .client-card-tag {
        font-size: 0.8rem;
        padding: 2px 6px;
      }
      .client-card-body {
        gap: 2px;
        padding-left: 6px;
      }
      .client-card-text {
        font-size: 0.63rem;
      }
      .client-card-actions {
        padding-top: 4px;
      }
      .xls-card-dial-btn {
        height: 26px;
        padding: 0 10px;
        font-size: 0.72rem;
      }
    }

    /* Whitelist match badges */
    .xls-dial-badge-whitelist {
      background: rgba(7,193,96,0.1);
      color: var(--accent-wechat);
    }
    .xls-dial-badge-not-whitelist {
      background: rgba(231,76,60,0.1);
      color: #e74c3c;
    }

    /* Copy limit toast */
    .check-toast {
      position: fixed;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      background: #27ae60;
      color: #fff;
      width: 56px; height: 56px;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      z-index: 99999;
      box-shadow: 0 4px 24px rgba(39, 174, 96, 0.4);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s ease, transform 0.25s ease;
    }
    .check-toast.show {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1.05);
    }
    .copy-limit-toast {
      position: fixed;
      top: 16px;
      left: 50%;
      transform: translateX(-50%);
      background: #e74c3c;
      color: #fff;
      padding: 12px 24px;
      border-radius: var(--radius-sm);
      font-size: 0.88rem;
      font-weight: 600;
      z-index: 9999;
      box-shadow: 0 4px 16px rgba(231, 76, 60, 0.35);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
      max-width: 90vw;
      text-align: center;
    }
    .copy-limit-toast.show {
      opacity: 1;
      pointer-events: auto;
    }
    .copy-limit-toast.warn {
      background: #f39c12;
      box-shadow: 0 4px 16px rgba(243, 156, 18, 0.35);
    }
    /* ====== Reminder Overlay ====== */
    .reminder-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,0.55);
      z-index: 3000; opacity: 0; pointer-events: none;
      transition: opacity 0.3s ease;
      display: flex; align-items: center; justify-content: center;
      padding: 16px;
    }
    .reminder-overlay.active { opacity: 1; pointer-events: auto; }
    .reminder-card {
      background: var(--modal-card);
      border: 0.5px solid var(--card-border);
      border-radius: var(--radius-ios);
      box-shadow: var(--shadow-card);
      width: 100%; max-width: 380px;
      padding: 24px 20px 20px;
      display: flex; flex-direction: column; gap: 14px;
      transform: translateY(16px);
      transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    }
    .reminder-overlay.active .reminder-card { transform: translateY(0); }
    .reminder-header {
      display: flex; align-items: center; justify-content: space-between;
      gap: 12px;
    }
    .reminder-title {
      font-size: 0.95rem; font-weight: 600; color: var(--text-main);
      line-height: 1.3;
    }
    .reminder-countdown {
      font-size: 0.75rem; font-weight: 500; color: var(--text-light);
      background: var(--btn-bg); border-radius: var(--radius-capsule);
      padding: 3px 10px; white-space: nowrap; flex-shrink: 0;
      box-shadow: var(--shadow-card);
    }
    .reminder-countdown.urgent { color: #e05060; background: rgba(224,80,96,0.1); }
    /* 头部倒计时胶囊心跳式红闪：仅小光晕 + 背景色 + 缩放，去掉 24px+ 扩散环
       （box-shadow 大半径动画每帧重绘，iOS 持续掉帧） */
    @keyframes roundCdPulse {
      0%   { box-shadow: 0 0 4px rgba(255, 59, 48, 0.45); background: #ff3b30; transform: scale(1); }
      30%  { box-shadow: 0 0 10px rgba(255, 59, 48, 0.9); background: #ff6659; transform: scale(1.12); }
      48%  { box-shadow: 0 0 6px rgba(255, 59, 48, 0.7); background: #ff5548; transform: scale(1); }
      68%  { box-shadow: 0 0 10px rgba(255, 59, 48, 0.85); background: #ff6659; transform: scale(1.08); }
      100% { box-shadow: 0 0 4px rgba(255, 59, 48, 0.45); background: #ff3b30; transform: scale(1); }
    }
    .reminder-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
    .reminder-item {
      display: flex; align-items: flex-start; gap: 10px;
      font-size: 0.82rem; color: var(--text-soft); line-height: 1.4;
    }
    .reminder-num {
      flex-shrink: 0; width: 20px; height: 20px; border-radius: 50%;
      background: #4a6cf7; color: #fff; font-size: 0.7rem; font-weight: 600;
      display: flex; align-items: center; justify-content: center;
      margin-top: 1px; box-shadow: var(--shadow-card);
    }
    .reminder-round-info {
      display: flex; align-items: center; justify-content: space-between;
      gap: 12px; padding: 8px 2px 10px;
      border-bottom: 0.5px solid var(--card-border);
      font-size: 0.72rem; color: var(--text-light);
    }
    .reminder-round-info b {
      font-weight: 700; color: var(--text-main);
      font-variant-numeric: tabular-nums;
    }
    .reminder-dismiss {
      align-self: stretch; padding: 10px 0; border: none;
      background: var(--btn-bg); color: var(--text-main);
      font-size: 0.85rem; font-weight: 500; font-family: inherit;
      border-radius: var(--radius-sm); cursor: pointer;
      transition: background 0.15s; letter-spacing: -0.01em;
      box-shadow: var(--shadow-card);
      -webkit-tap-highlight-color: transparent;
      margin-top: 2px;
    }
    .reminder-dismiss:active { background: var(--btn-hover); }

    /* ====== Cooldown Reminder Overlay（冷却期点击换一批时弹出） ====== */
    .cooldown-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,0.55);
      z-index: 3100; opacity: 0; pointer-events: none;
      transition: opacity 0.3s ease;
      display: flex; align-items: center; justify-content: center;
      padding: 16px;
    }
    .cooldown-overlay.active { opacity: 1; pointer-events: auto; }
    .cooldown-card {
      background: var(--modal-card);
      border: 0.5px solid var(--card-border);
      border-radius: var(--radius-ios);
      box-shadow: var(--shadow-card);
      width: 100%; max-width: 340px;
      padding: 24px 20px 20px;
      display: flex; flex-direction: column; gap: 14px;
      transform: translateY(16px);
      transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      text-align: center;
    }
    .cooldown-overlay.active .cooldown-card { transform: translateY(0); }
    .cooldown-title {
      font-size: 1rem; font-weight: 700; color: var(--text-main);
      letter-spacing: -0.01em; line-height: 1.3;
    }
    .cooldown-desc {
      font-size: 0.82rem; color: var(--text-soft); line-height: 1.6;
    }
    .cooldown-desc b {
      font-weight: 700; color: #e05060;
      font-variant-numeric: tabular-nums;
    }
    .cooldown-dismiss {
      align-self: stretch; padding: 10px 0; border: none;
      background: var(--btn-bg); color: var(--text-main);
      font-size: 0.85rem; font-weight: 600; font-family: inherit;
      border-radius: var(--radius-sm); cursor: pointer;
      transition: background 0.15s; letter-spacing: -0.01em;
      box-shadow: var(--shadow-card);
      -webkit-tap-highlight-color: transparent;
      margin-top: 2px;
    }
    .cooldown-dismiss:active { background: var(--btn-hover); }

    /* 换一批加载中：图标旋转+变淡，避免静默加载让用户以为没点动 */
    #refreshBatchBtn.list-not-empty { opacity: 0.35; color: var(--text-sub) !important; cursor: pointer; }
    #refreshBatchBtn.list-not-empty:active { opacity: 0.55; }
    #refreshBatchBtn:disabled { opacity: 0.55; cursor: wait; }
    #refreshBatchBtn.loading { opacity: 0.55; }
    #refreshBatchBtn.loading svg { animation: refreshSpin 1s linear infinite; }
    @keyframes refreshSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

    /* ====== Progress Drawer ====== */
    .progress-drawer-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,0.45);
      z-index: 4000; opacity: 0; pointer-events: none;
      transition: opacity 0.3s ease;
    }
    .progress-drawer-overlay.active { opacity: 1; pointer-events: auto; }
    .progress-drawer {
      position: absolute; top: 0; left: 0; bottom: 0; width: min(320px, 85vw);
      background: var(--modal-card);
      border-right: 0.5px solid var(--card-border);
      border-top-right-radius: 16px; border-bottom-right-radius: 16px;
      box-shadow: var(--shadow-card);
      padding: 20px 16px; display: flex; flex-direction: column; gap: 12px;
      transform: translateX(-100%);
      transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
      overflow-y: auto;
      -webkit-font-smoothing: antialiased;
    }
    .progress-drawer-overlay.active .progress-drawer { transform: translateX(0); }
    .drawer-stat-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    .drawer-stat-row > span:first-child { font-size: 0.82rem; font-weight: 500; color: var(--text-soft); }
    .drawer-stat-value { font-size: 0.82rem; font-weight: 600; color: var(--text-main); font-variant-numeric: tabular-nums; }
    .drawer-group-card {
      background: var(--card-bg);
      border: 0.5px solid var(--card-border);
      border-radius: 16px;
      padding: 12px;
      display: flex; flex-direction: column; gap: 12px;
    }
    .drawer-ring-wrap { position: relative; width: 88px; height: 88px; }
    .drawer-ring-value {
      position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
      font-size: 1.05rem; font-weight: 700; color: var(--text-main);
      font-variant-numeric: tabular-nums; letter-spacing: -0.01em;
    }
    .drawer-ring-label { font-size: 0.68rem; font-weight: 600; color: var(--text-light); margin-top: 6px; }
    .drawer-round-pill {
      font-size: 0.76rem; font-weight: 700; color: var(--accent-wechat);
      background: rgba(7, 193, 96, 0.1); border-radius: 999px; padding: 3px 10px;
    }
    .drawer-wc-cell {
      flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px;
      padding: 10px 4px 8px; border-radius: 12px; background: rgba(127, 127, 127, 0.07);
    }
    .drawer-wc-cell.today { flex: 1.4; }
    .drawer-wc-label { font-size: 0.66rem; font-weight: 600; color: var(--text-light); }
    .drawer-wc-value {
      font-size: 1.05rem; font-weight: 700; color: var(--text-main);
      font-variant-numeric: tabular-nums; min-width: 24px; text-align: center; line-height: 1.2;
    }
    .drawer-step-btn {
      width: 36px; height: 36px; border-radius: 10px;
      border: 0.5px solid rgba(0,0,0,0.08);
      background:
        linear-gradient(180deg, rgba(255,255,255,0.35), rgba(255,255,255,0.03)),
        var(--btn-bg);
      color: var(--text-main); font-size: 1.2rem; font-weight: 700;
      display: inline-flex; align-items: center; justify-content: center;
      cursor: pointer; font-family: inherit; line-height: 1;
      box-shadow:
        inset 0 0.5px 0 rgba(255,255,255,0.55),
        inset 0 -1px 2px rgba(0,0,0,0.08),
        0 1px 2px rgba(0,0,0,0.12),
        0 2px 6px rgba(0,0,0,0.06);
      text-shadow: 0 0.5px 0 rgba(255,255,255,0.5), 0 -0.5px 1px rgba(0,0,0,0.18);
      -webkit-tap-highlight-color: transparent; touch-action: manipulation;
      transition: box-shadow 0.15s ease, transform 0.1s ease, background 0.15s ease;
    }
    .drawer-step-btn:active {
      background:
        linear-gradient(180deg, rgba(255,255,255,0.08), rgba(0,0,0,0.05)),
        var(--btn-hover);
      box-shadow:
        inset 0 1px 3px rgba(0,0,0,0.2),
        inset 0 0.5px 0 rgba(255,255,255,0.15);
      transform: scale(0.95);
    }
    .drawer-close-btn {
      width: 32px; height: 32px; border-radius: 10px;
      border: 0.5px solid rgba(0,0,0,0.08);
      background:
        linear-gradient(180deg, rgba(255,255,255,0.32), rgba(255,255,255,0.02)),
        var(--btn-bg);
      color: var(--text-main);
      display: inline-flex; align-items: center; justify-content: center;
      cursor: pointer;
      box-shadow:
        inset 0 0.5px 0 rgba(255,255,255,0.5),
        inset 0 -1px 2px rgba(0,0,0,0.07),
        0 1px 2px rgba(0,0,0,0.12),
        0 2px 6px rgba(0,0,0,0.06);
      -webkit-tap-highlight-color: transparent; touch-action: manipulation;
      transition: box-shadow 0.15s ease, transform 0.1s ease;
    }
    .drawer-close-btn:active {
      box-shadow:
        inset 0 1px 3px rgba(0,0,0,0.2),
        inset 0 0.5px 0 rgba(255,255,255,0.15);
      transform: scale(0.94);
    }
    .drawer-close-btn svg {
      filter: drop-shadow(0 0.5px 0 rgba(255,255,255,0.45)) drop-shadow(0 -0.5px 1px rgba(0,0,0,0.18));
    }
    .drawer-slogan {
      margin: 0; padding-top: 2px;
      font-size: min(1.8rem, calc(8.5vw - 3.2px)); /* 每行10个全角字符，正好铺满抽屉左右内边距 */
      font-weight: 600; color: var(--text-soft);
      letter-spacing: -0.01em; line-height: 1.5;
    }

    /* ====== Professional CRM Dashboard ====== */
    .db-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,0.45); z-index: 99999;
      display: none; align-items: center; justify-content: center;
      -webkit-overflow-scrolling: touch;
    }
    .db-overlay.active { display: flex; }
    .db-panel {
      background: #f8fafc; border-radius: var(--radius-sm); width: 96vw; max-width: 1400px;
      height: 92vh; max-height: 900px; display: flex; flex-direction: column; overflow: hidden;
      box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
      border: 1px solid #e2e8f0;
      transition: all 0.3s ease;
    }
    body.dark-mode .db-panel { background: #0f172a; border-color: #334155; }
    
    /* CRM Tabs bar */
    .crm-tabs {
      display: flex; background: #fff; border-bottom: 1px solid #e2e8f0; flex-shrink: 0;
      align-items: center; padding: 0 16px; gap: 8px; height: 44px;
    }
    body.dark-mode .crm-tabs { background: #1e293b; border-color: #334155; }
    .crm-tab {
      display: inline-flex; align-items: center; gap: 6px; padding: 0 16px; height: 44px;
      font-size: 0.82rem; font-weight: 700; color: #64748b; cursor: pointer; position: relative;
      user-select: none; transition: all 0.2s ease;
    }
    .crm-tab:hover { color: #ff5722; }
    .crm-tab.active { color: #ff5722; }
    .crm-tab.active::after {
      content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
      background: #ff5722; border-top-left-radius: 3px; border-top-right-radius: 3px;
    }
    .crm-tab-close {
      font-size: 10px; opacity: 0.5; margin-left: 4px; border-radius: 50%; width: 14px; height: 14px;
      display: inline-flex; align-items: center; justify-content: center;
    }
    .crm-tab-close:hover { background: rgba(0,0,0,0.1); opacity: 1; }
    body.dark-mode .crm-tab { color: #94a3b8; }
    body.dark-mode .crm-tab.active { color: #ff5722; }
    
    .db-header { display: none; }
    .crm-tabs-right { margin-left: auto; display: flex; align-items: center; gap: 12px; }
    .db-close {
      width: 28px; height: 28px; border: none; background: rgba(0,0,0,0.06); border-radius: var(--radius-xs);
      font-size: 0.9rem; cursor: pointer; color: #666; display: flex; align-items: center; justify-content: center;
      box-shadow: var(--shadow-card);
    }
    .db-close:hover { background: #e81123; color: #fff; }
    body.dark-mode .db-close { background: rgba(255,255,255,0.08); color: #cbd5e1; }
    body.dark-mode .db-close:hover { background: #e81123; color: #fff; }
    
    /* CRM Shortcut Filter bar */
    .crm-shortcut-bar {
      display: flex; gap: 8px; padding: 10px 16px 6px 16px; align-items: center; flex-shrink: 0;
      background: #fff;
    }
    body.dark-mode .crm-shortcut-bar { background: #1e293b; }
    .crm-shortcut-btn {
      padding: 5px 16px; border-radius: var(--radius-xs); border: none; font-size: 0.78rem;
      background: #f8fafc; color: #64748b; font-weight: 600; cursor: pointer; transition: all 0.2s;
      box-shadow: var(--shadow-card);
    }
    .crm-shortcut-btn:hover { color: #ff5722; }
    .crm-shortcut-btn.active { background: rgba(255,87,34,0.08); color: #ff5722; }
    body.dark-mode .crm-shortcut-btn { background: #0f172a; color: #94a3b8; }
    body.dark-mode .crm-shortcut-btn.active { background: rgba(255,87,34,0.15); color: #ff5722; }
    .crm-shortcut-add {
      font-size: 1.1rem; color: #ff5722; font-weight: 600; cursor: pointer; padding: 0 4px;
    }
    .crm-shortcut-toggle {
      margin-left: auto; font-size: 0.72rem; font-weight: 700; color: #64748b;
      background: #f8fafc; border: none; border-radius: var(--radius-xs);
      padding: 5px 10px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;
      transition: all 0.2s; white-space: nowrap; box-shadow: var(--shadow-card);
    }
    .crm-shortcut-toggle:hover { color: #ff5722; }
    body.dark-mode .crm-shortcut-toggle { background: #0f172a; color: #94a3b8; }

    /* CRM Search Area */
    .crm-search-card {
      background: #fff; padding: 12px 16px; border-bottom: 1px solid #e2e8f0; flex-shrink: 0;
      transition: all 0.3s ease;
    }
    .crm-search-card.collapsed {
      display: none;
    }
    }
    body.dark-mode .crm-search-card { background: #1e293b; border-color: #334155; }
    .crm-search-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px;
      align-items: center;
    }
    .crm-search-item { display: flex; align-items: center; gap: 8px; }
    .crm-search-item-full { grid-column: 1 / -1; }
    .crm-search-item-full .crm-input {
      font-size: 0.82rem; height: 36px; border-color: #ff5722; border-width: 1.5px;
      background: #fffbf5; font-weight: 600;
    }
    .crm-search-item-full .crm-input:focus { border-color: #e64a19; box-shadow: 0 0 0 3px rgba(255,87,34,0.1); }
    body.dark-mode .crm-search-item-full .crm-input { background: #1a1a2e; border-color: #ff5722; }
    .crm-search-label { font-size: 0.78rem; font-weight: 700; color: #475569; white-space: nowrap; width: 64px; }
    body.dark-mode .crm-search-label { color: #94a3b8; }
    .crm-input, .crm-select {
      flex: 1; height: 32px; padding: 0 10px; border: 1px solid #cbd5e1; border-radius: var(--radius-xs);
      font-size: 0.78rem; outline: none; background: #fff; color: #1e293b; transition: border 0.15s;
      width: 100%;
    }
    .crm-input:focus, .crm-select:focus { border-color: #ff5722; }
    body.dark-mode .crm-input, body.dark-mode .crm-select { background: #0f172a; border-color: #334155; color: #cbd5e1; }
    
    .crm-search-actions { display: flex; gap: 8px; margin-top: 10px; justify-content: flex-start; }
    .crm-btn-search {
      height: 32px; padding: 0 20px; border-radius: var(--radius-xs); background: #ff5722; color: #fff;
      font-size: 0.78rem; font-weight: 700; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;
      box-shadow: var(--shadow-card);
    }
    .crm-btn-search:hover { background: #f4511e; }
    .crm-btn-reset {
      height: 32px; padding: 0 16px; border-radius: var(--radius-xs); background: #fff; color: #475569;
      font-size: 0.78rem; font-weight: 700; border: none; cursor: pointer; box-shadow: var(--shadow-card);
    }
    .crm-btn-reset:hover { color: #ff5722; }
    body.dark-mode .crm-btn-reset { background: #0f172a; color: #94a3b8; }

    /* Action Toolbar */
    .crm-toolbar {
      display: flex; gap: 8px; padding: 10px 16px; align-items: center; flex-shrink: 0;
      background: #fff; border-bottom: 1px solid #e2e8f0; flex-wrap: wrap;
    }
    body.dark-mode .crm-toolbar { background: #1e293b; border-color: #334155; }
    .crm-tool-btn {
      height: 30px; padding: 0 12px; border-radius: var(--radius-xs); font-size: 0.78rem; font-weight: 700;
      background: #fff; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;
      transition: all 0.2s; box-shadow: var(--shadow-card);
    }
    .crm-tool-btn:hover { color: #ff5722; }
    .crm-tool-btn.primary { background: #ff5722; color: #fff; }
    .crm-tool-btn.primary:hover { background: #f4511e; }
    .crm-tool-btn.green { color: #07c160; background: rgba(7,193,96,0.08); }
    .crm-tool-btn.green:hover { background: #07c160; color: #fff; }
    .crm-tool-btn.blue { color: #4a6cf7; background: rgba(74,108,247,0.08); }
    .crm-tool-btn.blue:hover { background: #4a6cf7; color: #fff; }
    .crm-tool-btn.orange { color: #ff9800; background: rgba(255,152,0,0.08); }
    .crm-tool-btn.orange:hover { background: #ff9800; color: #fff; }
    .crm-tool-btn.red { color: #ef4444; background: rgba(239,68,68,0.08); }
    .crm-tool-btn.red:hover { background: #ef4444; color: #fff; }
    body.dark-mode .crm-tool-btn { background: #0f172a; color: #94a3b8; }
    body.dark-mode .crm-tool-btn.green { color: #07c160; }
    body.dark-mode .crm-tool-btn.blue { color: #4a6cf7; }
    body.dark-mode .crm-tool-btn.orange { color: #ff9800; }
    body.dark-mode .crm-tool-btn.red { color: #ef4444; }
    .crm-toolbar-right { margin-left: auto; display: flex; align-items: center; gap: 10px; }

    /* CRM Status Badges Bar */
    .crm-badge-bar {
      display: flex; gap: 16px; padding: 10px 16px; align-items: center; flex-shrink: 0;
      background: #f8fafc; border-bottom: 1px solid #e2e8f0; flex-wrap: wrap;
    }
    body.dark-mode .crm-badge-bar { background: #0f172a; border-color: #334155; }
    .crm-badge-bar.collapsed {
      display: none;
    }
    .crm-badge-item {
      display: inline-flex; align-items: center; gap: 6px; font-size: 0.74rem; font-weight: 700;
      color: #475569;
    }
    body.dark-mode .crm-badge-item { color: #94a3b8; }
    .crm-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
    .crm-dot.red { background: #ff4d4f; box-shadow: 0 0 4px #ff4d4f; }
    .crm-dot.yellow { background: #ffc53d; box-shadow: 0 0 4px #ffc53d; }
    .crm-dot.blue { background: #1890ff; box-shadow: 0 0 4px #1890ff; }
    .crm-dot.cyan { background: #13c2c2; box-shadow: 0 0 4px #13c2c2; }
    
    /* CRM Table & Layout */
    .db-table-wrap { flex: 1; overflow: auto; background: #fff; position: relative; }
    body.dark-mode .db-table-wrap { background: #1e293b; }
    .crm-table { width: 100%; border-collapse: collapse; min-width: 900px; text-align: left; }
    .crm-table thead th {
      position: sticky; top: 0; z-index: 3; background: #f1f5f9; padding: 10px 14px;
      font-size: 0.76rem; font-weight: 600; color: #475569; border-bottom: 1px solid #cbd5e1;
      white-space: nowrap; user-select: none; cursor: pointer;
    }
    body.dark-mode .crm-table thead th { background: #0f172a; color: #94a3b8; border-color: #334155; }
    .crm-table thead th:hover { background: #cbd5e1; }
    body.dark-mode .crm-table thead th:hover { background: #1e293b; }
    .crm-table thead th .sort-arrow { font-size: 9px; margin-left: 2px; opacity: 0.35; }
    .crm-table thead th.sorted .sort-arrow { opacity: 1; color: #ff5722; }
    
    .crm-table td {
      padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-size: 0.8rem; color: #334155;
      vertical-align: middle; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;
      max-width: 260px;
    }
    body.dark-mode .crm-table td { border-color: #334155; color: #cbd5e1; }
    .crm-table tbody tr { transition: background 0.15s; }
    .crm-table tbody tr:hover { background: #f8fafc; }
    body.dark-mode .crm-table tbody tr:hover { background: rgba(255,255,255,0.02); }
    .crm-table tbody tr.selected { background: rgba(255,87,34,0.04) !important; }
    body.dark-mode .crm-table tbody tr.selected { background: rgba(255,87,34,0.08) !important; }
    .db-loading { text-align: center; padding: 60px 20px; color: #94a3b8; }
    .db-empty { text-align: center; padding: 80px 20px; color: #94a3b8; font-size: 0.9rem; }

    /* Circle Avatar */
    .crm-name-cell { display: flex; align-items: center; gap: 8px; }
    .crm-avatar {
      width: 28px; height: 28px; border-radius: 50%; background: #4a6cf7; color: #fff;
      display: inline-flex; align-items: center; justify-content: center; font-size: 0.76rem;
      font-weight: 600; text-transform: uppercase; flex-shrink: 0;
    }
    /* New / Old Badges */
    .crm-badge-new {
      background: #e6f7ff; color: #1890ff; border: none; box-shadow: var(--shadow-card);
      font-size: 10px; padding: 1px 4px; border-radius: var(--radius-xs); font-weight: 700; margin-right: 4px;
    }
    .crm-badge-old {
      background: #f5f5f5; color: #8c8c8c; border: none; box-shadow: var(--shadow-card);
      font-size: 10px; padding: 1px 4px; border-radius: var(--radius-xs); font-weight: 700; margin-right: 4px;
    }
    body.dark-mode .crm-badge-new { background: rgba(24,144,255,0.15); }
    body.dark-mode .crm-badge-old { background: rgba(255,255,255,0.05); }
    
    /* Phone Cell Call icon */
    .crm-phone-cell { display: flex; align-items: center; gap: 6px; font-family: monospace; font-size: 0.82rem; }
    .crm-btn-call {
      color: #ff5722; cursor: pointer; border: none; background: none; font-size: 0.8rem;
      display: inline-flex; align-items: center; justify-content: center; border-radius: 50%;
      width: 22px; height: 22px; transition: background 0.15s;
    }
    .crm-btn-call:hover { background: rgba(255,87,34,0.1); }

    /* Action Link */
    .crm-action-link {
      color: #ff5722; cursor: pointer; font-weight: 700; text-decoration: none; font-size: 0.76rem;
    }
    .crm-action-link:hover { text-decoration: underline; }

    /* Footer / Pager */
    .crm-pager {
      display: flex; align-items: center; justify-content: space-between; flex-shrink: 0;
      padding: 10px 16px; border-top: 1px solid #e2e8f0; background: #fff; flex-wrap: wrap; gap: 8px;
    }
    body.dark-mode .crm-pager { background: #1e293b; border-color: #334155; }
    .crm-pager-left { font-size: 0.78rem; color: #64748b; }
    body.dark-mode .crm-pager-left { color: #cbd5e1; }
    .crm-pager-center { display: flex; align-items: center; gap: 8px; }
    .crm-pager-btn {
      height: 28px; padding: 0 12px; border: none; background: #fff; color: #475569;
      border-radius: var(--radius-xs); font-size: 0.78rem; font-weight: 600; cursor: pointer;
      box-shadow: var(--shadow-card);
    }
    .crm-pager-btn:hover:not(:disabled) { color: #ff5722; }
    .crm-pager-btn:disabled { opacity: 0.4; cursor: not-allowed; box-shadow: none; }
    body.dark-mode .crm-pager-btn { background: #0f172a; color: #cbd5e1; }
    
    .crm-pager-right { display: flex; align-items: center; gap: 8px; }
    .crm-select-page {
      height: 28px; border: 1px solid #cbd5e1; border-radius: var(--radius-xs); font-size: 0.78rem;
      padding: 0 4px; background: #fff; color: #475569; cursor: pointer;
    }
    body.dark-mode .crm-select-page { background: #0f172a; border-color: #334155; color: #cbd5e1; }
    
    /* Category tag override */
    .cust-cat-tag {
      display: inline-block; padding: 2px 8px; border-radius: 10px;
      font-size: 11px; font-weight: 700; cursor: pointer;
      background: #f0f0f0; color: #888; border: none; box-shadow: var(--shadow-card);
      max-width: 80px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    }
    .cust-cat-tag:hover { filter: brightness(0.9); }
    .cust-cat-tag.cat-潜在客户 { background:#e3f2fd;color:#1565c0; }
    .cust-cat-tag.cat-意向客户 { background:#fff3e0;color:#e65100; }
    .cust-cat-tag.cat-已成交 { background:#e8f5e9;color:#2e7d32; }
    .cust-cat-tag.cat-无效号码 { background:#fce4ec;color:#c62828; }
    .cust-cat-tag.cat-待跟进 { background:#f3e5f5;color:#6a1b9a; }
    .cust-cat-tag.cat-老客户 { background:#e0f7fa;color:#006064; }
    .cust-cat-tag.cat-同行 { background:#fff8e1;color:#f57f17; }
    .cust-cat-tag.cat-其他 { background:#eceff1;color:#455a64; }
    .cust-cat-edit-wrap { display: inline-flex; gap: 2px; align-items: center; }
    .cust-cat-select, .cust-cat-input { font-size: 11px; padding: 1px 4px; border-radius: var(--radius-xs); border: 1px solid #ff5722; outline: none; }
    .cust-cat-input { width: 60px; }
    .cust-cat-save, .cust-cat-cancel { font-size: 10px; padding: 1px 6px; border-radius: var(--radius-xs); cursor: pointer; border: none; font-weight: 700; box-shadow: var(--shadow-card); }
    .cust-cat-save { background: #07c160; color: #fff; }
    .cust-cat-cancel { background: #eee; color: #666; }
    /* Mobile responsive */
    @media (max-width: 768px) {
      .db-panel { width: 100vw; height: 100vh; max-height: 100vh; border-radius: 0; }
      .crm-search-grid { grid-template-columns: 1fr; }
      .crm-tabs { padding: 0 8px; gap: 2px; }
      .crm-tab { padding: 0 8px; font-size: 0.76rem; }
      .crm-toolbar { padding: 6px 12px; gap: 4px; flex-wrap: wrap; }
      .crm-tool-btn { padding: 0 8px; font-size: 0.74rem; }
      .crm-badge-bar { padding: 6px 12px; gap: 8px; }
      /* 手机视图：宽屏表格由 .db-table-wrap 横向滚动，无额外内边距 */
      .db-table-wrap { background: transparent; padding: 0; }
      .db-table-wrap .db-empty { padding: 40px 20px; }
    }
    /* ===== 手机版数据库看板（独立全屏界面） ===== */
    .dbm-overlay {
      position: fixed; inset: 0; z-index: 100000;
      width: 100%; height: 100vh; height: 100dvh; min-height: 0;
      background: #f8fafc; display: none; flex-direction: column;
      overflow: hidden; overscroll-behavior: none;
      -webkit-overflow-scrolling: touch;
    }
    body.dark-mode .dbm-overlay { background: #0f172a; }
    .dbm-overlay.active { display: flex; }
    .dbm-topbar {
      display: flex; align-items: center; gap: 10px; padding: calc(10px + env(safe-area-inset-top, 0px)) 12px 10px;
      background: #fff; border-bottom: 0.5px solid var(--card-border); flex-shrink: 0;
    }
    body.dark-mode .dbm-topbar { background: #1e293b; }
    .dbm-title { flex: 1; font-size: 1rem; font-weight: 700; color: var(--text-main); }
    .dbm-icon-btn {
      width: 36px; height: 36px; border: none; background: var(--btn-bg);
      border-radius: var(--radius-xs); color: var(--text-soft); cursor: pointer;
      display: inline-flex; align-items: center; justify-content: center;
      box-shadow: var(--shadow-card); flex-shrink: 0;
    }
    .dbm-searchbar {
      display: flex; align-items: center; gap: 8px; padding: 8px 12px;
      background: #fff; border-bottom: 0.5px solid var(--card-border); flex-shrink: 0;
    }
    body.dark-mode .dbm-searchbar { background: #1e293b; }
    .dbm-searchbar input {
      flex: 1; height: 36px; border: none; background: var(--btn-bg);
      border-radius: 10px; padding: 0 12px; font-size: 0.85rem; color: var(--text-main);
      outline: none; font-weight: 500;
    }
    .dbm-filterbar {
      display: flex; align-items: center; gap: 8px; padding: 8px 12px;
      background: #fff; border-bottom: 0.5px solid var(--card-border); flex-shrink: 0;
      overflow-x: auto; scrollbar-width: none;
    }
    .dbm-filterbar::-webkit-scrollbar { display: none; }
    body.dark-mode .dbm-filterbar { background: #1e293b; }
    .dbm-filterbar select {
      height: 32px; border: none; background: var(--btn-bg); border-radius: 8px;
      padding: 0 8px; font-size: 0.75rem; font-weight: 600; color: var(--text-soft);
      outline: none; cursor: pointer; flex-shrink: 0;
    }
    .dbm-selectall-label {
      margin-left: auto; display: inline-flex; align-items: center; gap: 4px;
      font-size: 0.72rem; font-weight: 700; color: var(--text-soft); white-space: nowrap;
    }
    .dbm-selectall-label input { width: 17px; height: 17px; accent-color: #4a6cf7; cursor: pointer; }
    /* 统一宽屏表格：dbmList 横向滚动（.crm-table min-width:900px），不再渲染卡片 */
    .dbm-list {
      flex: 1 1 0%; min-height: 0; min-width: 0;
      overflow-x: auto; overflow-y: auto; overscroll-behavior: contain;
      -webkit-overflow-scrolling: touch; background: #fff;
    }
    body.dark-mode .dbm-list { background: #1e293b; }
    .dbm-empty { text-align: center; color: var(--text-light); padding: 60px 20px; font-size: 0.85rem; font-weight: 600; }
    .dbm-actionbar {
      display: flex; gap: 8px; padding: 10px 12px calc(10px + env(safe-area-inset-bottom));
      background: #fff; border-top: 0.5px solid var(--card-border); flex-shrink: 0;
      overflow-x: auto; scrollbar-width: none;
    }
    .dbm-actionbar::-webkit-scrollbar { display: none; }
    body.dark-mode .dbm-actionbar { background: #1e293b; }
    .dbm-action-btn {
      min-height: 44px; padding: 0 16px; border: none; border-radius: 12px;
      font-size: 0.8rem; font-weight: 700; cursor: pointer; white-space: nowrap;
      color: #fff; box-shadow: var(--shadow-card); flex-shrink: 0;
    }
    .dbm-action-btn.green { background: #07c160; }
    .dbm-action-btn.orange { background: #ff9800; }
    .dbm-action-btn.blue { background: #4a6cf7; }
    .dbm-action-btn.red { background: #ef4444; }
    .dbm-action-btn:disabled { opacity: 0.4; cursor: not-allowed; }
    .dbm-action-btn { background: #64748b; }
    .dbm-actionbar-count {
      display: inline-flex; align-items: center; min-height: 44px;
      font-size: 0.78rem; font-weight: 800; color: #4a6cf7;
      white-space: nowrap; flex-shrink: 0;
    }
    /* 底部导航 */
    .dbm-bottomnav {
      display: flex; border-top: 0.5px solid var(--card-border);
      background: #fff; flex-shrink: 0; padding-bottom: env(safe-area-inset-bottom);
    }
    body.dark-mode .dbm-bottomnav { background: #1e293b; }
    .dbm-nav-btn {
      flex: 1; height: 50px; border: none; background: transparent;
      font-size: 0.8rem; font-weight: 700; color: var(--text-light);
      cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;
    }
    .dbm-nav-btn.active { color: #4a6cf7; }
    /* 管理面板 */
    .dbm-mgr { display: flex; flex-direction: column; }
    .dbm-mgr-tabs {
      display: flex; gap: 6px; padding: 8px 12px; background: #fff;
      border-bottom: 0.5px solid var(--card-border); flex-shrink: 0;
    }
    body.dark-mode .dbm-mgr-tabs { background: #1e293b; }
    .dbm-mgr-tab {
      flex: 1; height: 36px; border: none; border-radius: 10px;
      background: var(--btn-bg); color: var(--text-soft);
      font-size: 0.76rem; font-weight: 700; cursor: pointer;
      box-shadow: var(--shadow-card);
    }
    .dbm-mgr-tab.active { background: rgba(74,108,247,0.12); color: #4a6cf7; }
    #dbmMgrBody {
      flex: 1 1 0%; min-height: 0; min-width: 0;
      overflow-x: hidden; overflow-y: auto; overscroll-behavior: contain;
      -webkit-overflow-scrolling: touch; padding: 12px;
    }
    /* 移入的管理面板：手机化适配 */
    #dbmMgrBody .dbm-mgr-inner { display: flex; flex-direction: column; gap: 14px; }
    #dbmMgrBody .dbm-mgr-inner > div { background: #fff; border-radius: 14px; padding: 14px; box-shadow: var(--shadow-card); }
    body.dark-mode #dbmMgrBody .dbm-mgr-inner > div { background: #1e293b; }
    #dbmMgrBody .dbm-mgr-inner > div > div { font-size: 0.82rem; color: var(--text-main); font-weight: 700; }
    #dbmMgrBody .dbm-mgr-inner input, #dbmMgrBody .dbm-mgr-inner select {
      height: 40px; border-radius: 10px; border: none; background: var(--btn-bg);
      font-size: 0.8rem; color: var(--text-main); outline: none; padding: 0 10px;
    }
    #dbmMgrBody .dbm-mgr-inner button { min-height: 40px; border-radius: 10px; border: none; font-size: 0.78rem; font-weight: 700; cursor: pointer; }
    #dbmMgrBody .dbm-mgr-inner .btn-primary { background: #07c160; color: #fff; }
    #dbmMgrBody .dbm-mgr-inner .btn-secondary { background: rgba(74,108,247,0.1); color: #4a6cf7; }
    #dbmMgrBody .dbm-mgr-inner .auth-btn { background: #07c160; color: #fff; }
    #dbmMgrBody .dbm-mgr-inner textarea { border-radius: 10px; border: none; background: var(--btn-bg); color: var(--text-main); padding: 10px; font-size: 0.78rem; outline: none; }
    #dbmMgrBody .dbm-mgr-inner .auth-input { background: var(--btn-bg); border: none; }
    /* 小屏手机紧凑模式：按实际视口宽度自动启用，缩小字体、卡片留白和控件尺寸 */
    @media screen and (max-width: 390px) and (pointer: coarse) {
      html { font-size: 15px; }
      body { font-size: 0.94rem; }
      .header-bar { padding-left: 8px; padding-right: 8px; }
      .header-stats-minimal { font-size: 0.68rem; }
      .control-bar { gap: 3px; padding-left: 6px; padding-right: 6px; }
      .cards-content { padding-left: 6px; padding-right: 6px; gap: 5px; }
      .xls-dial-card {
        padding: 7px 8px;
        gap: 4px;
        border-radius: 10px;
      }
      .client-card-name-btn { font-size: 0.84rem; }
      .client-phone { font-size: 0.76rem; }
      .client-card-tag { font-size: 0.74rem; padding: 1px 5px; }
      .client-card-text { font-size: 0.6rem; line-height: 1.35; }
      .client-card-body { gap: 1px; padding-left: 4px; }
      .client-card-actions { gap: 4px; padding-top: 3px; }
      .xls-card-dial-btn { height: 25px; padding: 0 8px; font-size: 0.68rem; }
      .card-copy-btn { font-size: 0.58rem; padding: 2px 4px; }
      .filter-tab { padding-left: 5px; padding-right: 5px; font-size: 0.66rem; }
      .search-input { width: 88px; font-size: 0.7rem; }
      .crm-toolbar, .crm-badge-bar { padding-left: 8px; padding-right: 8px; }
      .crm-tab, .crm-tool-btn { font-size: 0.7rem; padding-left: 6px; padding-right: 6px; }
      .dbm-topbar { gap: 7px; padding-left: 9px; padding-right: 9px; }
      .dbm-icon-btn { width: 33px; height: 33px; }
      .dbm-searchbar, .dbm-filterbar { padding-left: 8px; padding-right: 8px; gap: 6px; }
      .dbm-actionbar { gap: 6px; padding-left: 8px; padding-right: 8px; }
      .dbm-action-btn { min-height: 40px; padding: 0 11px; font-size: 0.74rem; }
      .dbm-nav-btn { height: 46px; font-size: 0.74rem; }
      .reminder-card, .cooldown-card { padding: 19px 15px 16px; gap: 11px; }
    }
    /* 安卓端客户卡片取消复制状态的绿色描边与绿色外发光 */
    body.android .xls-dial-card.copied-card,
    body.android .xls-dial-card.copied-company,
    body.android .xls-dial-card.copied-phone {
      border-color: var(--card-border) !important;
      box-shadow: 0 2px 12px rgba(0,0,0,0.04) !important;
    }

    /* Mobile usability pass: keep the compact visual language while making
       primary touch targets comfortably tappable on iOS Safari / Android WebView. */
    @media (max-width: 768px) {
      .filter-tab,
      .crm-tab,
      .crm-tool-btn,
      .crm-shortcut-btn {
        min-height: 40px;
        touch-action: manipulation;
      }

      .db-close {
        width: auto;
        min-width: 44px;
        min-height: 44px;
        padding: 0 12px;
        touch-action: manipulation;
      }

      .dbm-icon-btn {
        width: 44px;
        height: 44px;
        min-width: 44px;
        min-height: 44px;
        touch-action: manipulation;
      }

      .card-copy-btn {
        min-width: 44px;
        min-height: 40px;
        padding: 6px 9px;
        touch-action: manipulation;
      }

      .client-card-actions button,
      .client-card-actions a,
      .xls-card-dial-btn {
        min-height: 44px;
        touch-action: manipulation;
      }

      .client-card-actions button,
      .client-card-actions a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .filter-tab:focus-visible,
      .crm-tab:focus-visible,
      .crm-tool-btn:focus-visible,
      .crm-shortcut-btn:focus-visible,
      .db-close:focus-visible,
      .dbm-icon-btn:focus-visible,
      .card-copy-btn:focus-visible,
      .client-card-actions button:focus-visible,
      .client-card-actions a:focus-visible,
      .xls-card-dial-btn:focus-visible {
        outline: 2px solid var(--accent, #4a6cf7);
        outline-offset: 2px;
      }
    }

    @media (max-width: 480px) {
      .filter-tab {
        min-height: 40px;
        padding: 0 10px;
      }

      .xls-card-dial-btn {
        height: auto;
        min-height: 44px;
        padding: 0 14px;
        font-size: 0.76rem;
      }

      .client-card-actions {
        gap: 8px;
        padding-top: 8px;
      }
    }

    /* Consistent action affordance: subtle WeChat-green halo in normal mode too.
       Privacy-mode icon styling remains owned by its dedicated selectors. */
    .client-phone-btn:not(.privacy-add-vx) {
      color: var(--accent-wechat);
      border-radius: 8px;
      box-shadow: 0 0 0 1px rgba(7,193,96,.10), 0 0 8px rgba(7,193,96,.14);
      transition: color .18s ease, box-shadow .18s ease, transform .18s ease;
    }
    .client-phone-btn:not(.privacy-add-vx):hover {
      color: #079b50;
      box-shadow: 0 0 0 1px rgba(7,193,96,.18), 0 0 12px rgba(7,193,96,.24);
    }
    .client-phone-btn:not(.privacy-add-vx):active {
      transform: scale(.97);
      box-shadow: 0 0 0 1px rgba(7,193,96,.24), 0 0 14px rgba(7,193,96,.30);
    }

    .xls-card-dial-btn:not(.privacy-dial-icon) {
      box-shadow: 0 2px 7px rgba(7,193,96,.20), 0 0 0 1px rgba(7,193,96,.08);
      transition: box-shadow .18s ease, transform .18s ease, filter .18s ease;
    }
    .xls-card-dial-btn:not(.privacy-dial-icon):hover {
      filter: brightness(1.04);
      box-shadow: 0 3px 11px rgba(7,193,96,.30), 0 0 0 1px rgba(7,193,96,.14);
    }
    .xls-card-dial-btn:not(.privacy-dial-icon):active {
      transform: translateY(1px) scale(.97);
      box-shadow: 0 1px 5px rgba(7,193,96,.24);
    }

    .client-phone-btn:focus-visible,
    .client-card-tag-company:focus-visible,
    .xls-card-dial-btn:focus-visible {
      outline: 2px solid rgba(7,193,96,.75);
      outline-offset: 3px;
    }

    @media (prefers-reduced-motion: reduce) {
      .client-phone-btn:not(.privacy-add-vx),
      .xls-card-dial-btn:not(.privacy-dial-icon) {
        transition: none !important;
      }
    }

    /* Final customer-card typography overrides: placed last to win over legacy action styles. */
    .xls-dial-card .client-card-name-btn,
    .xls-dial-card .client-card-tag,
    .xls-dial-card .client-card-label,
    .xls-dial-card .client-card-text {
      font-weight: 700 !important;
    }
    .xls-dial-card .client-card-tag-company {
      font-weight: 700 !important;
    }
    .xls-dial-card .client-phone-btn:not(.privacy-add-vx) {
      color: #1c1c1e !important;
      font-weight: 700 !important;
      border: 0 !important;
      outline: 0 !important;
      background: transparent !important;
      box-shadow: none !important;
      text-shadow: none !important;
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
    .xls-dial-card .client-phone-btn:not(.privacy-add-vx):hover,
    .xls-dial-card .client-phone-btn:not(.privacy-add-vx):active {
      color: #1c1c1e !important;
      background: transparent !important;
      box-shadow: none !important;
    }
    body.dark-mode .xls-dial-card .client-phone-btn:not(.privacy-add-vx),
    body.dark-mode .xls-dial-card .client-phone-btn:not(.privacy-add-vx):hover,
    body.dark-mode .xls-dial-card .client-phone-btn:not(.privacy-add-vx):active {
      color: #f2f2f7 !important;
    }


    /* Privacy-mode shortcut icons: borderless, with only a faint copy-note-like tint. */
    .xls-dial-card .privacy-add-vx,
    .xls-dial-card .privacy-dial-icon {
      border: 0 !important;
      outline: 0 !important;
      box-shadow: none !important;
      background: rgba(7,193,96,.055) !important;
    }
    .xls-dial-card .privacy-add-vx:hover,
    .xls-dial-card .privacy-add-vx:active,
    .xls-dial-card .privacy-dial-icon:hover,
    .xls-dial-card .privacy-dial-icon:active {
      border: 0 !important;
      outline: 0 !important;
      box-shadow: none !important;
      background: rgba(7,193,96,.09) !important;
    }
    body.dark-mode .xls-dial-card .privacy-add-vx,
    body.dark-mode .xls-dial-card .privacy-dial-icon {
      background: rgba(48,209,88,.09) !important;
    }


    /* Customer-card green accents: translucent dial button and sequence marker. */
    .xls-dial-card .xls-card-dial-btn:not(.privacy-dial-icon) {
      background: rgba(7,193,96,.16) !important;
      color: #087b43 !important;
      border: 0 !important;
      box-shadow: 0 1px 4px rgba(7,193,96,.08) !important;
    }
    .xls-dial-card .xls-card-dial-btn:not(.privacy-dial-icon):hover,
    .xls-dial-card .xls-card-dial-btn:not(.privacy-dial-icon):active {
      background: rgba(7,193,96,.23) !important;
      color: #066b3a !important;
      box-shadow: 0 1px 5px rgba(7,193,96,.12) !important;
    }
    .xls-dial-card .corner-seq {
      background: rgba(7,193,96,.18) !important;
      box-shadow: none !important;
    }
    .xls-dial-card .corner-seq span {
      color: #087b43 !important;
    }
    body.dark-mode .xls-dial-card .xls-card-dial-btn:not(.privacy-dial-icon) {
      background: rgba(48,209,88,.20) !important;
      color: #75e6a0 !important;
    }
    body.dark-mode .xls-dial-card .corner-seq {
      background: rgba(48,209,88,.20) !important;
    }
    body.dark-mode .xls-dial-card .corner-seq span {
      color: #75e6a0 !important;
    }


    /* 已添加 / 已拨打状态只取消红色边框与光晕，文字颜色沿用原有状态色。 */
    .xls-dial-card .privacy-add-vx.copied,
    .xls-dial-card .privacy-dial-icon.dial-attempted {
      background: rgba(7,193,96,.055) !important;
      border: 0 !important;
      outline: 0 !important;
      box-shadow: none !important;
      text-shadow: none !important;
    }
    .xls-dial-card .privacy-add-vx.copied:hover,
    .xls-dial-card .privacy-add-vx.copied:active,
    .xls-dial-card .privacy-dial-icon.dial-attempted:hover,
    .xls-dial-card .privacy-dial-icon.dial-attempted:active {
      background: rgba(7,193,96,.09) !important;
      border: 0 !important;
      outline: 0 !important;
      box-shadow: none !important;
    }
    body.dark-mode .xls-dial-card .privacy-add-vx.copied,
    body.dark-mode .xls-dial-card .privacy-dial-icon.dial-attempted {
      background: rgba(48,209,88,.09) !important;
      border: 0 !important;
      outline: 0 !important;
      box-shadow: none !important;
      text-shadow: none !important;
    }
    /* ===== 深色模式：数据库看板统一低亮度配色 ===== */
    body.dark-mode #dbOverlay .db-panel,
    body.dark-mode .dbm-overlay {
      background: #171b22 !important; color: #d4dae3; border-color: #303743 !important;
    }
    body.dark-mode #dbOverlay .crm-tabs,
    body.dark-mode #dbOverlay .crm-toolbar,
    body.dark-mode #dbOverlay .crm-badge-bar,
    body.dark-mode #dbOverlay .crm-pager,
    body.dark-mode .dbm-topbar,
    body.dark-mode .dbm-searchbar,
    body.dark-mode .dbm-filterbar,
    body.dark-mode .dbm-actionbar,
    body.dark-mode .dbm-bottomnav,
    body.dark-mode .dbm-mgr-tabs {
      background: #202630 !important; border-color: #303946 !important;
    }
    body.dark-mode #dbOverlay .crm-search-card,
    body.dark-mode #dbOverlay .crm-search-grid,
    body.dark-mode .dbm-overlay #dbmMgrBody .dbm-mgr-inner > div {
      background: #242b35 !important; border-color: #343e4b !important; color: #d4dae3;
    }
    body.dark-mode #dbOverlay .crm-table,
    body.dark-mode .dbm-list { background: #1b212a !important; }
    body.dark-mode #dbOverlay .crm-table thead th,
    body.dark-mode .dbm-list .crm-table thead th {
      background: #252d38 !important; color: #aeb8c6 !important; border-color: #343e4b !important;
    }
    body.dark-mode #dbOverlay .crm-table td,
    body.dark-mode .dbm-list .crm-table td {
      background: transparent !important; color: #c5ced9 !important; border-color: #2c3541 !important;
    }
    body.dark-mode #dbOverlay .crm-table tbody tr:nth-child(even) td,
    body.dark-mode .dbm-list .crm-table tbody tr:nth-child(even) td { background: rgba(255,255,255,.018) !important; }
    body.dark-mode #dbOverlay .crm-table tbody tr:hover td,
    body.dark-mode .dbm-list .crm-table tbody tr:hover td { background: rgba(133,157,190,.075) !important; }
    body.dark-mode #dbOverlay .crm-tab,
    body.dark-mode .dbm-nav-btn { color: #9aa6b5 !important; }
    body.dark-mode #dbOverlay .crm-tab.active,
    body.dark-mode .dbm-nav-btn.active { color: #a8b9d0 !important; }
    body.dark-mode #dbOverlay .crm-tab.active::after { background: #879bb8 !important; }
    body.dark-mode #dbOverlay .crm-tool-btn,
    body.dark-mode .dbm-icon-btn,
    body.dark-mode .dbm-mgr-tab,
    body.dark-mode .dbm-overlay input,
    body.dark-mode .dbm-overlay select,
    body.dark-mode .dbm-overlay textarea,
    body.dark-mode #dbOverlay .crm-select-page {
      background-color: #2a323e !important; border-color: #3a4553 !important; color: #c7d0dc !important;
    }
    body.dark-mode #dbOverlay .crm-tool-btn.primary,
    body.dark-mode .dbm-action-btn {
      background: #35404e !important; color: #d0d8e2 !important; border: 1px solid #465363 !important; box-shadow: none !important;
    }
    body.dark-mode #dbOverlay .crm-tool-btn.green,
    body.dark-mode .dbm-action-btn.green { background: #293a34 !important; color: #a4c5b2 !important; border-color: #3b5148 !important; }
    body.dark-mode #dbOverlay .crm-tool-btn.blue,
    body.dark-mode .dbm-action-btn.blue,
    body.dark-mode .dbm-mgr-tab.active { background: #2c3748 !important; color: #aebfd6 !important; border-color: #414f63 !important; }
    body.dark-mode #dbOverlay .crm-tool-btn.orange,
    body.dark-mode .dbm-action-btn.orange { background: #40372c !important; color: #cbb391 !important; border-color: #5a4a38 !important; }
    body.dark-mode #dbOverlay .crm-tool-btn.red,
    body.dark-mode .dbm-action-btn.red { background: #402f34 !important; color: #c99da3 !important; border-color: #594047 !important; }
    body.dark-mode .dbm-actionbar-count { color: #aebfd6 !important; }
    body.dark-mode #dbOverlay .cust-cat-tag,
    body.dark-mode .dbm-list .cust-cat-tag {
      background: #303946 !important; color: #c1cad6 !important; border: 1px solid #414c5b !important; box-shadow: none !important;
    }
    body.dark-mode #dbOverlay .cust-cat-tag.cat-潜在客户,
    body.dark-mode .dbm-list .cust-cat-tag.cat-潜在客户 { background:#293746 !important; color:#a9bfd5 !important; }
    body.dark-mode #dbOverlay .cust-cat-tag.cat-意向客户,
    body.dark-mode .dbm-list .cust-cat-tag.cat-意向客户 { background:#40372d !important; color:#cbb594 !important; }
    body.dark-mode #dbOverlay .cust-cat-tag.cat-已成交,
    body.dark-mode .dbm-list .cust-cat-tag.cat-已成交 { background:#293a34 !important; color:#a6c6b3 !important; }
    body.dark-mode #dbOverlay .cust-cat-tag.cat-无效号码,
    body.dark-mode .dbm-list .cust-cat-tag.cat-无效号码 { background:#402f34 !important; color:#c99fa5 !important; }
    body.dark-mode #dbOverlay .cust-cat-tag.cat-待跟进,
    body.dark-mode .dbm-list .cust-cat-tag.cat-待跟进 { background:#383344 !important; color:#bcb0d0 !important; }
    body.dark-mode #dbOverlay .cust-cat-tag.cat-老客户,
    body.dark-mode .dbm-list .cust-cat-tag.cat-老客户 { background:#293a3e !important; color:#a8c3c8 !important; }
    body.dark-mode #dbOverlay .cust-cat-tag.cat-同行,
    body.dark-mode .dbm-list .cust-cat-tag.cat-同行 { background:#3c382e !important; color:#c6b98f !important; }
    body.dark-mode #dbOverlay .crm-badge-new,
    body.dark-mode .dbm-list .crm-badge-new { background:#2b3948 !important; color:#a9bfd5 !important; }
    body.dark-mode #dbOverlay .crm-badge-old,
    body.dark-mode .dbm-list .crm-badge-old { background:#303640 !important; color:#aeb7c3 !important; }
    body.dark-mode #dbOverlay .crm-avatar,
    body.dark-mode .dbm-list .crm-avatar { filter:saturate(.48) brightness(.78); }
    body.dark-mode #dbOverlay .crm-pager-left,
    body.dark-mode #dbOverlay .db-empty,
    body.dark-mode .dbm-empty { color:#929eae !important; }
    /* 模糊关联搜索区：整个搜索卡片、输入框及按钮统一深色 */
    body.dark-mode #dbOverlay .crm-search-card,
    body.dark-mode #dbOverlay .crm-search-card .crm-search-grid,
    body.dark-mode #dbOverlay .crm-search-card .crm-search-item,
    body.dark-mode #dbOverlay .crm-search-card .crm-search-item-full,
    body.dark-mode #dbOverlay .crm-search-card .crm-search-actions {
      background: #1b212a !important;
      background-color: #1b212a !important;
      color: #aeb8c6 !important;
      border-color: #303946 !important;
      box-shadow: none !important;
    }
    body.dark-mode #dbOverlay .crm-search-card #dbFuzzySearch,
    body.dark-mode #dbOverlay .crm-search-card .crm-input {
      background: #252d38 !important;
      background-color: #252d38 !important;
      color: #d0d7e1 !important;
      border: 1px solid #3a4553 !important;
      box-shadow: none !important;
    }
    body.dark-mode #dbOverlay .crm-search-card #dbFuzzySearch::placeholder {
      color: #8491a2 !important;
      opacity: 1 !important;
    }
    body.dark-mode #dbOverlay .crm-search-card #dbFuzzySearch:focus {
      border-color: #65758a !important;
      box-shadow: 0 0 0 2px rgba(101,117,138,.12) !important;
    }
    body.dark-mode #dbOverlay .crm-search-card .crm-search-label {
      color: #aeb8c6 !important;
    }
    body.dark-mode #dbOverlay .crm-search-card .crm-btn-search {
      background: #35404e !important;
      background-color: #35404e !important;
      color: #d0d8e2 !important;
      border: 1px solid #465363 !important;
      box-shadow: none !important;
    }

    /* ===== 完整数据库看板手机版：复用桌面 DOM 与全部业务事件 ===== */
    .db-overlay.mobile-layout {
      align-items: stretch !important;
      justify-content: stretch !important;
      padding: 0 !important;
      background: var(--bg-main, #f8fafc) !important;
      overscroll-behavior: none;
    }
    .db-overlay.mobile-layout .db-panel {
      width: 100vw !important;
      max-width: none !important;
      height: 100vh !important;
      height: 100dvh !important;
      max-height: none !important;
      min-height: 0 !important;
      border-radius: 0 !important;
      border: 0 !important;
      box-shadow: none !important;
      overflow: hidden !important;
      padding-bottom: env(safe-area-inset-bottom, 0px);
    }
    .db-overlay.mobile-layout .crm-tabs {
      height: 48px;
      min-height: 48px;
      padding: 0 8px;
      gap: 2px;
      overflow-x: auto;
      overflow-y: hidden;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
      touch-action: pan-x;
    }
    .db-overlay.mobile-layout .crm-tabs::-webkit-scrollbar,
    .db-overlay.mobile-layout .crm-shortcut-bar::-webkit-scrollbar,
    .db-overlay.mobile-layout .crm-toolbar::-webkit-scrollbar { display: none; }
    .db-overlay.mobile-layout .crm-tab {
      flex: 0 0 auto;
      height: 48px;
      padding: 0 12px;
      font-size: 12px;
      white-space: nowrap;
    }
    .db-overlay.mobile-layout .crm-tabs-right {
      position: sticky;
      right: 0;
      z-index: 5;
      flex: 0 0 auto;
      margin-left: 4px;
      padding-left: 6px;
      background: inherit;
      gap: 6px;
    }
    .db-overlay.mobile-layout .db-close {
      width: 34px;
      height: 34px;
      flex: 0 0 34px;
    }
    .db-overlay.mobile-layout #dbMobileBtn { display: none !important; }
    .db-overlay.mobile-layout #dbClose { display: flex !important; }
    .db-overlay.mobile-layout .crm-shortcut-bar {
      padding: 7px 9px;
      gap: 6px;
      overflow-x: auto;
      overflow-y: hidden;
      flex-wrap: nowrap;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
      touch-action: pan-x;
    }
    .db-overlay.mobile-layout .crm-shortcut-btn {
      flex: 0 0 auto;
      min-height: 34px;
      padding: 0 11px;
      font-size: 11px;
      white-space: nowrap;
    }
    .db-overlay.mobile-layout .crm-shortcut-add { flex: 0 0 auto; }
    .db-overlay.mobile-layout .crm-shortcut-toggle {
      flex: 0 0 auto;
      min-height: 32px;
      margin-left: 0;
    }
    .db-overlay.mobile-layout .crm-search-card {
      padding: 9px 10px;
    }
    .db-overlay.mobile-layout .crm-search-grid { display: block; }
    .db-overlay.mobile-layout .crm-search-item-full {
      display: flex;
      align-items: center;
      gap: 7px;
    }
    .db-overlay.mobile-layout .crm-search-label {
      width: 78px !important;
      flex: 0 0 78px;
      font-size: 11px;
    }
    .db-overlay.mobile-layout #dbFuzzySearch {
      min-width: 0;
      height: 38px;
      font-size: 12px;
    }
    .db-overlay.mobile-layout .crm-search-actions {
      margin-top: 7px;
    }
    .db-overlay.mobile-layout .crm-btn-search {
      min-height: 36px;
      padding: 0 22px;
    }
    .db-overlay.mobile-layout .crm-toolbar {
      padding: 8px 9px;
      gap: 7px;
      flex-wrap: nowrap;
      overflow-x: auto;
      overflow-y: visible;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
      touch-action: pan-x;
    }
    .db-overlay.mobile-layout .crm-tool-btn {
      flex: 0 0 auto;
      min-height: 36px;
      height: 36px;
      padding: 0 11px;
      font-size: 11px;
      white-space: nowrap;
    }
    .db-overlay.mobile-layout #dbImportBatchView {
      flex: 0 0 116px !important;
      width: 116px !important;
      max-width: 116px !important;
    }
    .db-overlay.mobile-layout #crmReassignGroup {
      flex: 0 0 94%;
      min-width: 280px;
      white-space: normal;
    }
    .db-overlay.mobile-layout .crm-badge-bar {
      padding: 7px 10px;
      gap: 9px;
      flex-wrap: nowrap;
      overflow-x: auto;
      white-space: nowrap;
    }
    .db-overlay.mobile-layout .db-table-wrap {
      flex: 1 1 0%;
      min-height: 120px;
      width: 100%;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior: contain;
    }
    .db-overlay.mobile-layout .crm-table {
      min-width: 1180px;
      font-size: 12px;
    }
    .db-overlay.mobile-layout .crm-table th,
    .db-overlay.mobile-layout .crm-table td {
      padding: 9px 10px;
      font-size: 11px;
    }
    .db-overlay.mobile-layout .crm-table thead th {
      position: sticky;
      top: 0;
      z-index: 4;
    }
    .db-overlay.mobile-layout .crm-pager {
      min-height: 48px;
      padding: 6px 8px;
      gap: 8px;
      flex-wrap: nowrap;
      overflow-x: auto;
      flex-shrink: 0;
    }
    .db-overlay.mobile-layout .crm-pager-left,
    .db-overlay.mobile-layout .crm-pager-center,
    .db-overlay.mobile-layout .crm-pager-right {
      flex: 0 0 auto;
      white-space: nowrap;
    }
    .db-overlay.mobile-layout .crm-pager-btn {
      min-height: 34px;
      padding: 0 10px;
    }
    .db-overlay.mobile-layout #dbAccountMgrPanel,
    .db-overlay.mobile-layout #dbBackupMgrPanel,
    .db-overlay.mobile-layout #dbContentConfigPanel,
    .db-overlay.mobile-layout #dbUploadLogPanel,
    .db-overlay.mobile-layout #dbMasterPullLogPanel {
      min-height: 0;
      flex: 1 1 0%;
      width: 100%;
      box-sizing: border-box;
      padding: 12px !important;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
    .db-overlay.mobile-layout #dbAccountMgrPanel input,
    .db-overlay.mobile-layout #dbAccountMgrPanel select,
    .db-overlay.mobile-layout #dbBackupMgrPanel input,
    .db-overlay.mobile-layout #dbContentConfigPanel input,
    .db-overlay.mobile-layout #dbContentConfigPanel textarea {
      max-width: 100%;
      box-sizing: border-box;
    }
    .db-overlay.mobile-layout #dbContentConfigPanel > div,
    .db-overlay.mobile-layout #dbBackupMgrPanel > div {
      max-width: 100%;
    }
    @media (max-width: 430px) {
      .db-overlay.mobile-layout .crm-tab { padding: 0 10px; font-size: 11px; }
      .db-overlay.mobile-layout .crm-toolbar { gap: 6px; }
      .db-overlay.mobile-layout .crm-tool-btn { padding: 0 9px; }
    }

  </style>
</head>
<body>
  <div class="copy-limit-toast" id="copyLimitToast"></div>
  <div class="check-toast" id="checkToast"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>

  <!-- 隐私操作功能介绍：全屏弹窗 -->
  <div id="privacyOperationInfoOverlay" style="display:none;position:fixed;inset:0;z-index:100000;background:var(--bg-main, #fff);padding:env(safe-area-inset-top) 18px env(safe-area-inset-bottom);overflow-y:auto;box-sizing:border-box;">
    <div style="max-width:680px;margin:0 auto;min-height:100%;display:flex;flex-direction:column;">
      <div style="display:flex;align-items:center;justify-content:space-between;padding:18px 0;border-bottom:1px solid var(--border-color, #e5e7eb);">
        <strong style="font-size:1.15rem;color:var(--text-main);">隐私操作 · 功能介绍</strong>
        <button type="button" id="privacyOperationInfoClose" style="border:0;border-radius:10px;padding:9px 15px;background:var(--btn-bg);color:var(--text-main);font-weight:700;">关闭</button>
      </div>
      <div style="padding:22px 2px;line-height:1.85;color:var(--text-main);">
        <div style="font-size:1rem;font-weight:800;margin-bottom:8px;">开启与关闭有什么区别？</div>
        <div style="padding:15px;border-radius:14px;background:var(--card-bg, rgba(128,128,128,.08));margin-bottom:16px;">
          <div style="font-weight:800;margin-bottom:6px;">开启隐私操作</div>
          <ul style="padding-left:21px;margin:0;">
            <li>客户姓名及其他客户资料以「☆」隐藏。</li>
            <li>单位名称位置显示「复制备注」，点击可复制客户备注。</li>
            <li>隐藏资料不可通过点击查看或复制。</li>
            <li>手机号位置显示「添加VX」，点击可复制号码并打开微信。</li>
          </ul>
        </div>
        <div style="padding:15px;border-radius:14px;background:var(--card-bg, rgba(128,128,128,.08));margin-bottom:16px;">
          <div style="font-weight:800;margin-bottom:6px;">关闭隐私操作</div>
          <div>正常显示客户姓名、单位、公积金及备注等客户资料，方便查看和跟进。</div>
        </div>
        <div style="font-size:1rem;font-weight:800;margin-bottom:6px;">自动切换规则</div>
        <ul style="padding-left:21px;margin:0;">
          <li>周一至周六 09:00-12:00、14:00-18:00、19:00-20:00，自动开启隐私操作。</li>
          <li>其他时间自动关闭隐私操作。</li>
          <li>当前时段可手动切换，下一个时段自动恢复自动规则。</li>
        </ul>
      </div>
      <div style="margin-top:auto;padding:16px 0 22px;">
        <button type="button" id="privacyOperationInfoCloseBottom" style="width:100%;padding:13px;border:0;border-radius:12px;background:var(--accent-wechat);color:#fff;font-size:1rem;font-weight:800;">我知道了</button>
      </div>
    </div>
  </div>

  <!-- Progress Drawer -->
  <div class="progress-drawer-overlay" id="progressDrawerOverlay">
    <div class="progress-drawer" id="progressDrawer">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
        <span style="font-size:1rem;font-weight:700;color:var(--text-main);letter-spacing:-0.01em;">添加动作</span>
        <button class="drawer-close-btn" id="progressDrawerClose" title="关闭" style="color:var(--text-soft);"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
      </div>
      <!-- 进度卡片：圆圈中心显示今日，圆圈下显示本周和本月 -->
      <div class="drawer-group-card">
        <div style="display:flex;gap:12px;">
          <div style="flex:1;min-width:0;display:flex;flex-direction:column;align-items:center;">
            <div class="drawer-ring-wrap">
              <svg width="88" height="88" viewBox="0 0 88 88" style="display:block;">
                <circle cx="44" cy="44" r="36" fill="none" stroke="var(--btn-bg)" stroke-width="6"/>
                <circle id="drawerDialedRing" cx="44" cy="44" r="36" fill="none" stroke="var(--accent-wechat)" stroke-width="6" stroke-linecap="round" stroke-dasharray="226.2" stroke-dashoffset="226.2" transform="rotate(-90 44 44)" style="transition:stroke-dashoffset 0.6s cubic-bezier(0.25,0.8,0.25,1);"/>
              </svg>
              <span class="drawer-ring-value" id="drawerDialedRingText">0</span>
            </div>
            <span class="drawer-ring-label">今日拨打客户</span>
            <div style="width:100%;margin-top:7px;display:flex;justify-content:center;gap:12px;font-size:0.7rem;color:var(--text-light);white-space:nowrap;">
              <span>本周 <strong id="drawerWeekDialedVal" style="color:var(--text-main);font-weight:700;">0</strong></span>
              <span>本月 <strong id="drawerMonthDialedVal" style="color:var(--text-main);font-weight:700;">0</strong></span>
            </div>
          </div>
          <div style="flex:1;min-width:0;display:flex;flex-direction:column;align-items:center;">
            <div class="drawer-ring-wrap">
              <svg width="88" height="88" viewBox="0 0 88 88" style="display:block;">
                <circle cx="44" cy="44" r="36" fill="none" stroke="var(--btn-bg)" stroke-width="6"/>
                <circle id="drawerWorkRing" cx="44" cy="44" r="36" fill="none" stroke="#4a6cf7" stroke-width="6" stroke-linecap="round" stroke-dasharray="226.2" stroke-dashoffset="226.2" transform="rotate(-90 44 44)" style="transition:stroke-dashoffset 0.6s cubic-bezier(0.25,0.8,0.25,1);"/>
              </svg>
              <span class="drawer-ring-value" id="drawerWorkRingText">0</span>
            </div>
            <span class="drawer-ring-label">今日操作客户</span>
            <div style="width:100%;margin-top:7px;display:flex;justify-content:center;gap:12px;font-size:0.7rem;color:var(--text-light);white-space:nowrap;">
              <span>本周 <strong id="drawerWeekOperatedVal" style="color:var(--text-main);font-weight:700;">0</strong></span>
              <span>本月 <strong id="drawerMonthOperatedVal" style="color:var(--text-main);font-weight:700;">0</strong></span>
            </div>
            <div style="margin-top:5px;font-size:0.7rem;color:var(--text-light);">
              今日添加 <strong id="drawerRoundVal" style="color:var(--text-main);font-weight:700;">第 1 轮</strong>
            </div>
          </div>
        </div>
      </div>
      <!-- 隐私操作 + 本机新号：合并为一个紧凑模块 -->
      <div class="drawer-group-card drawer-setting-card" style="padding:10px 14px;gap:8px;">
        <div class="drawer-setting-row">
          <div class="drawer-setting-title">
            <span>隐私操作</span>
            <button type="button" id="privacyOperationInfo" aria-label="隐私操作功能介绍" title="功能介绍" class="drawer-info-btn">!</button>
          </div>
          <label class="drawer-setting-control" for="showClientInfoToggle">
            <span id="showClientInfoState" class="drawer-setting-state">已关闭</span>
            <input type="checkbox" id="showClientInfoToggle" class="drawer-setting-checkbox">
          </label>
        </div>
        <div style="height:1px;background:var(--card-border);opacity:.65;"></div>
        <div class="drawer-setting-row">
          <div class="drawer-setting-title">
            <span>本机新号</span>
            <button id="newModeInfo" type="button" aria-label="本机新号说明" title="本机新号模式说明" class="drawer-info-btn">!</button>
          </div>
          <div class="drawer-setting-control">
            <span id="newModeState" class="drawer-setting-state">已关闭</span>
            <button id="newModeToggle" type="button" aria-label="切换本机新号模式" title="本机新号：每轮 10 个客户，加完冷却 20-30 分钟（普通模式 50 个、45-60 分钟）">
              <span class="nm-track"><span class="nm-thumb"></span></span>
            </button>
          </div>
        </div>
      </div>
      <!-- 通过微信 -->
      <div class="drawer-group-card">
        <div style="font-size:0.68rem;font-weight:600;color:var(--text-light);letter-spacing:0.02em;">通过微信</div>
        <div style="display:flex;gap:8px;">
          <div class="drawer-wc-cell today">
            <span class="drawer-wc-label">今日</span>
            <span style="display:flex;align-items:center;justify-content:center;gap:4px;">
              <button class="drawer-step-btn" id="drawerWechatMinus" title="减1" style="width:32px;height:32px;font-size:1.05rem;">−</button>
              <span class="drawer-wc-value" id="drawerWechatVal">0</span>
              <button class="drawer-step-btn" id="drawerWechatPlus" title="加1" style="width:32px;height:32px;font-size:1.05rem;">+</button>
            </span>
          </div>
          <div class="drawer-wc-cell">
            <span class="drawer-wc-label">本周</span>
            <span class="drawer-wc-value" id="drawerWeekWechatVal">0</span>
          </div>
          <div class="drawer-wc-cell">
            <span class="drawer-wc-label">本月</span>
            <span class="drawer-wc-value" id="drawerMonthWechatVal">0</span>
          </div>
        </div>
      </div>
      <!-- 白名单模糊匹配：输入企业名称/简称/产品名，实时检索 -->
      <div class="drawer-group-card" style="gap:7px;">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
          <span style="font-size:0.68rem;font-weight:600;color:var(--text-light);letter-spacing:0.02em;">白名单模糊匹配</span>
          <label for="drawerWhitelistListVisible" style="display:inline-flex;align-items:center;gap:3px;font-size:0.61rem;color:var(--text-light);white-space:nowrap;cursor:pointer;">
            <input id="drawerWhitelistListVisible" type="checkbox" style="width:12px;height:12px;margin:0;accent-color:#07c160;">
            列表显示
          </label>
          <span id="drawerWhitelistMatchCount" style="font-size:0.62rem;color:var(--text-light);"></span>
        </div>
        <input id="drawerWhitelistSearch" type="search" autocomplete="off" placeholder="输入企业名称、简称或产品名称" style="width:100%;height:36px;box-sizing:border-box;padding:0 11px;border:1px solid var(--card-border);border-radius:9px;background:var(--input-bg,var(--bg-main));color:var(--text-main);font-size:0.78rem;outline:none;">
        <div id="drawerWhitelistSearchResults" style="display:none;max-height:180px;overflow-y:auto;-webkit-overflow-scrolling:touch;"></div>
      </div>
      <div style="height:0.5px;background:var(--card-border);margin-top:auto;"></div>
      <p class="drawer-slogan">增加广度，多加微信。<br>保持深度，全部触达。<br>增强粘性，经常群发。</p>
    </div>
  </div>

  <!-- Reminder Overlay -->
  <div class="reminder-overlay" id="reminderOverlay">
    <div class="reminder-card">
      <div class="reminder-header">
        <span class="reminder-title">微信运营提醒</span>
        <span class="reminder-countdown" id="reminderCountdown">30:00</span>
      </div>
      <div class="reminder-round-info" id="reminderRoundInfo">
        <span>今日第 <b id="reminderRoundNum">1</b> 轮添加</span>
        <span>下一轮倒计时 <b id="reminderRoundCd">30:00</b></span>
      </div>
      <ol class="reminder-list">
        <li class="reminder-item"><span class="reminder-num">1</span>休息30-50分钟，防止微信频繁</li>
        <li class="reminder-item"><span class="reminder-num">2</span>给加上的微信打招呼设置标签</li>
        <li class="reminder-item"><span class="reminder-num">3</span>打招呼记得多聊两句哦，增加权重</li>
        <li class="reminder-item"><span class="reminder-num">4</span>早晚想一下非硬广告的文案，朋友圈每天发一条</li>
        <li class="reminder-item"><span class="reminder-num">5</span>有些纠结的客户主动删除他防止权重降低</li>
      </ol>
      <button type="button" id="reminderLearnBtn" onclick="window.location.href='/learn'" style="width:100%;margin:0 0 8px;padding:10px 14px;border:1px solid rgba(74,108,247,0.28);border-radius:10px;background:rgba(74,108,247,0.08);color:#4a6cf7;font-size:0.88rem;font-weight:700;cursor:pointer;">📖 进入学习中心</button>
      <button class="reminder-dismiss" id="reminderDismiss" onclick="document.getElementById('reminderOverlay').classList.remove('active');if(window._reminderTimer)clearInterval(window._reminderTimer);">知道了</button>
    </div>
  </div>

  <!-- Cooldown Reminder Overlay -->
  <div class="cooldown-overlay" id="cooldownOverlay">
    <div class="cooldown-card">
      <div class="cooldown-title">防止微信频繁</div>
      <div class="cooldown-desc">请注意防止微信频繁，多做增加权重操作。<br>距离可以换一批还有 <b id="cooldownRemain">30:00</b></div>
      <button class="cooldown-dismiss" id="cooldownDismiss">知道了</button>
    </div>
  </div>

  <!-- Auth initialization: keep account login hidden until session state is known -->
  <div id="authInitOverlay" class="auth-overlay auth-hidden" style="background:#101522;z-index:1000000;">
    <div style="position:relative;z-index:3;display:flex;flex-direction:column;align-items:center;gap:14px;color:#fff;font-size:14px;">
      <div style="width:28px;height:28px;border:3px solid rgba(255,255,255,.22);border-top-color:#fff;border-radius:50%;animation:bhpAuthSpin .8s linear infinite;"></div>
      <div>正在验证登录状态…</div>
    </div>
  </div>
  <style>@keyframes bhpAuthSpin{to{transform:rotate(360deg)}}</style>

  <!-- Auth: Login Overlay -->
  <div id="authLoginOverlay" class="auth-overlay auth-hidden">
    <div class="lock-wallpaper" id="loginWallpaper"></div>
    <div class="lock-wallpaper-overlay"></div>
    <div class="auth-card">
      <div id="bootFallbackNotice" role="alert" style="padding:10px 12px;margin-bottom:12px;border-radius:10px;background:rgba(255,149,0,0.12);color:#9a5b00;font-size:13px;text-align:center;">页面正在启动。如果此提示持续显示，说明页面脚本未能正常启动，请刷新页面或联系管理员。</div>
      <form autocomplete="off" style="margin:0;">
        <div style="position:absolute;opacity:0;pointer-events:none;height:0;overflow:hidden" aria-hidden="true"><input type="text" name="username" autocomplete="username" tabindex="-1"><input type="password" name="password" autocomplete="current-password" tabindex="-1"></div>
        <input type="text" id="authLoginAccountName" class="auth-input" placeholder="账号" autocomplete="off" spellcheck="false" data-lpignore="true" readonly>
        <input type="text" id="authLoginPin" class="auth-input auth-pin-input auth-pin-mask" maxlength="6" inputmode="numeric" placeholder="PIN" autocomplete="off" spellcheck="false" data-lpignore="true" readonly>
        <div id="authLoginError" class="auth-error"></div>
        <div id="tsLoginWidget" style="height:0;overflow:hidden;pointer-events:none;" aria-hidden="true"></div>
        <button type="button" id="authLoginBtn" class="auth-btn">登录</button>
      </form>
    </div>
  </div>

  <!-- Global Wallpaper (shared by main interface & lock screen) -->
  <div id="globalWallpaper" class="global-wallpaper"></div>

  <!-- Lock Screen Overlay (PIN only, keeps session) -->
  <div id="lockScreenOverlay" class="auth-overlay auth-hidden">
    <div id="lockWallpaper" class="lock-wallpaper"></div>
    <div class="lock-wallpaper-overlay"></div>
    <div class="auth-card">
      <form autocomplete="off" style="margin:0;">
        <div style="position:absolute;opacity:0;pointer-events:none;height:0;overflow:hidden" aria-hidden="true"><input type="password" name="password" autocomplete="current-password" tabindex="-1"></div>
        <input type="text" id="lockPinInput" class="auth-input auth-pin-input auth-pin-mask" maxlength="12" inputmode="numeric" placeholder="输入 PIN 解锁" autocomplete="off" spellcheck="false" data-lpignore="true" readonly>
        <div id="lockScreenError" class="auth-error"></div>
        <div id="tsLockWidget" style="height:0;overflow:hidden;pointer-events:none;" aria-hidden="true"></div>
        <button type="button" id="lockUnlockBtn" class="auth-btn">解锁</button>
      </form>
    </div>
  </div>

  <!-- Destruct 成功证明弹窗：销毁完成后弹出（纯空白零文案，用户自知其意；点遮罩关闭） -->
  <div id="destructOverlay" class="auth-overlay auth-hidden">
    <div class="auth-card" style="max-width:220px;height:140px;padding:0;display:flex;align-items:center;justify-content:center;"></div>
  </div>

  <!-- Auth: Setup Overlay (first time) -->
  <div id="authSetupOverlay" class="auth-overlay auth-hidden">
    <div class="lock-wallpaper" id="setupWallpaper"></div>
    <div class="lock-wallpaper-overlay"></div>
    <div class="auth-card">
      <div class="auth-title">首次设置</div>
      <div class="auth-subtitle">创建主账户以保护您的客户数据</div>
      <input type="text" id="authSetupName" class="auth-input" maxlength="20" placeholder="账户名（登录用，如：办公室）" autocomplete="off">
      <input type="text" id="authSetupLabel" class="auth-input" maxlength="20" placeholder="显示标签（可选）" autocomplete="off">
      <input type="password" id="authSetupPin" class="auth-input auth-pin-input" maxlength="6" inputmode="numeric" placeholder="设置 4-6 位 PIN 码" autocomplete="new-password">
      <input type="password" id="authSetupPinConfirm" class="auth-input auth-pin-input" maxlength="6" inputmode="numeric" placeholder="再次输入 PIN 码" autocomplete="new-password">
      <div id="authSetupError" class="auth-error"></div>
      <div id="tsSetupWidget" style="height:0;overflow:hidden;pointer-events:none;" aria-hidden="true"></div>
      <button id="authSetupBtn" class="auth-btn">创建主账户</button>
      <span id="authShowLoginLink" class="auth-link">已有账户？返回登录</span>
    </div>
  </div>

  <div class="app-shell">
    <div class="container">
      <!-- Header -->
      <div class="header-bar">
        <!-- 圆饼图（点击拉出工作进度面板；始终显示，与客户列表有无数据无关） -->
        <div class="header-stats-minimal" id="headerStatsMinimal">
          <span style="display:inline-flex;align-items:center;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg></span>
        </div>

        <!-- Auto Dial Toggle -->
        <button id="autoDialBtn" title="自动拨打" style="font-size: 0.78rem; padding: 4px 8px; border: none; background: transparent; color: var(--accent-wechat); cursor: pointer; outline: none; font-weight: 700; border-radius: var(--radius-sm); white-space: nowrap; display: inline-flex; align-items: center; justify-content: center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg></button>
        <button id="refreshBatchBtn" title="换一批 — 按最新导入顺序拉取，拉过的自动沉底" onclick="if(window.refreshBatch)window.refreshBatch()" style="font-size: 0.78rem; padding: 4px 8px; border: none; background: transparent; color: #e67e22; cursor: pointer; outline: none; font-weight: 700; border-radius: var(--radius-sm); white-space: nowrap; display: inline-flex; align-items: center; justify-content: center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg></button>
        <button id="learnBtn" title="学习" onclick="window.location.href='/learn'" style="font-size: 0.78rem; padding: 4px 8px; border: none; background: transparent; color: #4a6cf7; cursor: pointer; outline: none; font-weight: 700; border-radius: var(--radius-sm); white-space: nowrap; display: inline-flex; align-items: center; justify-content: center;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg></button>
        <button id="lockScreenBtn" title="锁定屏幕" style="font-size:0.68rem;padding:3px 6px;border:none;background:transparent;color:var(--text-soft);cursor:pointer;outline:none;font-weight:700;border-radius:3px;white-space:nowrap;flex-shrink:0;display:inline-flex;align-items:center;justify-content:center;-webkit-tap-highlight-color:transparent;touch-action:manipulation;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></button>
        <!-- 距离下轮添加倒计时：转出公海后冷却期（普通 45-60 分钟 / 新号模式 20-30 分钟，每轮随机），走完自动隐藏（鲜艳红底+白字胶囊，最醒目） -->
        <span id="headerRoundCd" title="距离下轮添加" style="display:none;font-size:0.55rem;font-weight:700;font-family:monospace;color:#fff;letter-spacing:-0.01em;white-space:nowrap;flex-shrink:0;border-radius:var(--radius-capsule);padding:2px 7px;line-height:1.1;background:#ff3b30;animation:roundCdPulse 1.8s ease-in-out infinite;">30:00</span>

        <!-- Dropdown Menu Trigger on the Right -->
        <div style="position: relative; display: inline-block;">
          <button id="headerMenuBtn" title="更多设置" style="font-size: 0.8rem; padding: 6px 8px; border: none; background: transparent; cursor: pointer; outline: none; font-weight: 600; color: var(--text-soft); min-width: 44px; min-height: 34px; display:inline-flex;align-items:center;justify-content:center; -webkit-tap-highlight-color: transparent; touch-action: manipulation;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg></button>
          <div class="header-dropdown" id="headerDropdown" style="display: none;">
            <button class="dropdown-item" id="toggleImportBtn">导入文件 <span class="menu-help-btn" data-help-key="import" role="button" aria-label="导入文件说明">?</span></button>
            <button class="dropdown-item" id="toggleDualSimBtn">双卡轮换: 开 <span class="menu-help-btn" data-help-key="dualSim" role="button" aria-label="双卡轮换说明">?</span></button>
            <button class="dropdown-item" id="toggleRotationBtn">轮换频率: 10通 <span class="menu-help-btn" data-help-key="rotation" role="button" aria-label="轮换频率说明">?</span></button>
            <button class="dropdown-item" id="clearBtn" style="display:none; color: #e74c3c;">清空数据 <span class="menu-help-btn" data-help-key="clear" role="button" aria-label="清空数据说明">?</span></button>
            <button class="dropdown-item" id="transferCurrentPoolBtn" style="display:none;color:#e74c3c;">转移至公海 <span class="menu-help-btn" data-help-key="transferPool" role="button" aria-label="转移至公海说明">?</span></button>
            <button class="dropdown-item" id="darkToggleBtn">切换主题 <span class="menu-help-btn" data-help-key="theme" role="button" aria-label="切换主题说明">?</span></button>
            <div class="dropdown-item" id="copyPrefTrigger" title="设置复制内容偏好" style="display:flex;align-items:center;justify-content:space-between;gap:8px;cursor:pointer;color:var(--text-soft);"><span style="display:flex;align-items:center;gap:7px;font-size:0.7rem;">账户</span><span style="display:flex;align-items:center;gap:4px;"><span id="accountDisplay" style="font-size:0.68rem;font-weight:700;font-family:monospace;color:var(--text-main);"></span><span id="accountDataCount" style="font-size:0.62rem;font-weight:600;color:var(--text-light);"></span></span><span class="menu-help-btn" data-help-key="account" role="button" aria-label="账户说明">?</span></div>
            <button class="dropdown-item" id="headerLogoutBtn" style="color: #e74c3c;">退出登录 <span class="menu-help-btn" data-help-key="logout" role="button" aria-label="退出登录说明">?</span></button>
          </div>
        </div>

        <div id="menuHelpModal" style="display:none;position:fixed;inset:0;z-index:100000;background:rgba(0,0,0,.48);align-items:center;justify-content:center;padding:20px;">
          <div style="width:min(340px,100%);background:var(--card-bg,#fff);color:var(--text-main,#222);border:1px solid var(--card-border,#ddd);border-radius:14px;padding:18px;box-shadow:0 12px 40px rgba(0,0,0,.22);">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px;">
              <strong id="menuHelpTitle" style="font-size:0.95rem;">功能说明</strong>
              <button id="menuHelpClose" type="button" aria-label="关闭说明" style="border:0;background:transparent;color:var(--text-soft);font-size:1.35rem;padding:0 4px;cursor:pointer;">×</button>
            </div>
            <div id="menuHelpText" style="font-size:0.82rem;line-height:1.7;color:var(--text-soft);"></div>
          </div>
        </div>

        <!-- Super thin absolute-positioned progress line at bottom of header -->
        <div style="position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: var(--border-light); overflow: hidden;">
          <div class="progress-fill" id="progressFill" style="height: 100%; width: 0%; transition: width 0.3s ease;"></div>
        </div>
      </div>

      <!-- Contacts List — immediately after header, no gaps -->
      <div class="cards-content" id="cardsContainer">
        <div style="text-align:center;padding:80px 20px;"></div>
      </div>

      <!-- Dashboard -->
      <div class="dashboard-panel" id="dashboardPanel">
        <!-- AI Drag & Drop Zone -->
        <div class="import-zone" id="dropZone" style="position: relative; overflow: hidden; min-height: 200px;">
          <!-- Close Button -->
          <button class="import-close-btn" id="importCloseBtn" title="关闭导入面板">关闭</button>
          <!-- Animation Laser Line (Only visible during scanning) -->
          <div id="aiLaserLine" class="ai-laser-line" style="display: none;"></div>

          <!-- 1. INITIAL STATE -->
          <div id="aiImportInit" style="display: flex; flex-direction: column; align-items: center; gap: 10px; width: 100%;">
            <!-- Pulsing AI Brain Core SVG -->
            <div style="position: relative; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; margin-bottom: 2px;">
              <div style="position: absolute; width: 44px; height: 44px; border-radius: 50%; border: 2px solid rgba(7, 193, 96, 0.4); animation: pulse-ring 2s infinite ease-in-out;"></div>
              <div style="position: absolute; width: 30px; height: 30px; border-radius: 50%; background: var(--wechat-gradient); display: flex; align-items: center; justify-content: center; color: white; font-size: 1.1rem; box-shadow: 0 0 10px rgba(7, 193, 96, 0.4);"></div>
            </div>
            <span style="font-size: 0.88rem; color: var(--text-main); font-weight: 700; letter-spacing: 0.5px;">BH-AI 智能双引擎导入助手</span>
            <span style="font-size: 0.7rem; color: var(--text-light); max-width: 320px; line-height: 1.4; margin-top: -4px;">搭载启发式文字密度与特征识别算法，自动检测表头、过滤噪音，100% 本地隐私安全。</span>
            <button id="ocrTrainingDataBtn" style="background:var(--btn-bg); border:none; box-shadow:var(--shadow-card); font-size:0.62rem; color:var(--text-soft); cursor:pointer; display:inline-flex; align-items:center; gap:3px; padding:2px 8px; border-radius:10px; margin-top:-2px;">训练数据 (<span id="trainingCountBadge" style="color:var(--accent-wechat);font-weight:800;">0</span>)</button>
            <a id="dialerTemplateBtn" style="font-size:0.62rem; color:var(--accent-wechat); cursor:pointer; font-weight:700; text-decoration:underline; margin-top:-2px; white-space:nowrap;" title="下载客户导入Excel模板文件">下载导入模板</a>

            
            
            <div class="import-buttons" style="margin-top: 6px; display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; width: 100%;">
              <label class="btn-primary" for="xlsFileInput" id="xlsSelectBtn" style="cursor:pointer; display:inline-flex; align-items:center; justify-content:center; padding: 8px 16px; font-size: 0.76rem; flex: 1; min-width: 130px; text-align: center;">导入表格 / 文档</label>
              <label class="btn-primary" for="imgFileInput" id="imgSelectBtn" style="cursor:pointer; display:inline-flex; align-items:center; justify-content:center; padding: 8px 16px; font-size: 0.76rem; flex: 1; min-width: 130px; text-align: center; background: var(--revisit-gradient) !important; color: white;">智能图片 OCR (可多选)</label>
              <label class="btn-secondary" for="vcfFileInput" id="vcfSelectBtn" style="cursor:pointer; display:inline-flex; align-items:center; justify-content:center; padding: 8px 16px; font-size: 0.76rem; flex: 1; min-width: 130px; text-align: center;">导入 VCF 通录</label>
              <button class="btn-secondary" id="textImportBtn" style="cursor:pointer; display:inline-flex; align-items:center; justify-content:center; padding: 8px 16px; font-size: 0.76rem; flex: 1; min-width: 130px; text-align: center; background: linear-gradient(135deg,#667eea,#764ba2); color:white; border:none; font-weight:700;" onclick="document.getElementById('textImportPanel').style.display='flex';document.getElementById('textImportArea').value='';document.getElementById('textImportArea').focus();">粘贴文本识别</button>
            </div>
            <div id="textImportPanel" style="display:none; flex-direction:column; gap:6px; width:100%; margin-top:6px;">
              <textarea id="textImportArea" placeholder="在此粘贴文本，如：张三 13800138000 腾讯科技 备注" style="width:100%; height:120px; padding:8px; font-size:0.72rem; border:0.5px solid var(--card-border); border-radius:var(--radius-xs); background:var(--card-bg); color:var(--text-main); resize:vertical; outline:none; font-family:monospace;"></textarea>
              <div style="display:flex; gap:6px;">
                <button class="btn-primary" id="textImportExtractBtn" style="flex:1; padding:6px; font-size:0.72rem; background:var(--wechat-gradient); color:white; border:none; border-radius:var(--radius-xs); font-weight:700;">智能识别提取</button>
                <button class="btn-secondary" style="padding:6px 12px; font-size:0.72rem; background:var(--btn-bg); color:var(--text-soft); border:none; box-shadow:var(--shadow-card); border-radius:var(--radius-xs);" onclick="document.getElementById('textImportPanel').style.display='none';">取消</button>
              </div>
            </div>
            <input type="file" id="xlsFileInput" accept=".xls,.xlsx,.xlsm,.csv,.docx,.pdf,.txt" style="display:none;">
            <input type="file" id="imgFileInput" accept="image/*" multiple style="display:none;">
            <input type="file" id="vcfFileInput" accept=".vcf,.vcard" style="display:none;">
            <div style="display: flex; gap: 6px; align-items: center; margin-top: 6px; width: 100%;">
              <span style="font-size: 0.68rem; color: var(--text-soft); font-weight: 600; white-space: nowrap;">批次标签</span>
              <input type="text" id="batchLabelInput" placeholder="如: 6月展会名单" value="" style="flex:1; height:28px; padding:0 8px; font-size:0.72rem; border:0.5px solid var(--card-border); border-radius:var(--radius-xs); background:var(--card-bg); color:var(--text-main); outline:none;">
            </div>
            <div style="display:flex;align-items:center;gap:7px;width:100%;margin-top:8px;padding:7px 9px;border-radius:8px;background:rgba(231,76,60,0.06);">
              <input type="checkbox" id="autoDeleteBatchAfterDial" style="width:15px;height:15px;accent-color:#e74c3c;flex-shrink:0;">
              <label for="autoDeleteBatchAfterDial" style="font-size:0.7rem;color:var(--text-main);font-weight:600;">本批次全部拨打完成后自动删除（不进入公海）</label>
            </div>
            <div style="display: flex; gap: 6px; align-items: center; margin-top: 6px; width: 100%;">
              <span style="font-size: 0.68rem; color: var(--text-soft); font-weight: 600; white-space: nowrap;">默认分类</span>
              <select id="importCategorySelect" style="flex:1; height:28px; padding:0 8px; font-size:0.72rem; border:0.5px solid var(--card-border); border-radius:var(--radius-xs); background:var(--card-bg); color:var(--text-main); outline:none; cursor:pointer;">
                <option value="待跟进">待跟进</option>
                <option value="潜在客户">潜在客户</option>
                <option value="意向客户">意向客户</option>
                <option value="已成交">已成交</option>
                <option value="无效号码">无效号码</option>
                <option value="老客户">老客户</option>
                <option value="同行">同行</option>
                <option value="其他">其他</option>
                <option value="公海客户" selected>公海客户</option>
                <option value="未分类">未分类</option>
              </select>
            </div>
            <div id="whitelistProductImportPanel" style="display:flex;flex-direction:column;gap:7px;width:100%;margin-top:12px;padding:10px;border:1px solid var(--card-border);border-radius:10px;background:var(--card-bg);">
              <div style="font-size:0.76rem;font-weight:800;color:var(--text-main);">白名单产品导入</div>
              <div style="font-size:0.64rem;line-height:1.5;color:var(--text-light);">先填写白名单名称，再上传 Excel。系统自动识别“单位名称 / 企业名称 / 公司名称”等列，导入后新增或更新对应白名单。</div>
              <input type="text" id="whitelistProductNameInput" maxlength="60" placeholder="先编辑白名单名称，例如：建行建易贷" style="box-sizing:border-box;width:100%;height:32px;padding:0 9px;border:1px solid var(--card-border);border-radius:7px;background:var(--btn-bg);color:var(--text-main);font-size:0.72rem;outline:none;">
              <input type="file" id="whitelistExcelFileInput" accept=".xlsx,.xls,.csv" style="display:none;">
              <label for="whitelistExcelFileInput" id="whitelistExcelSelectBtn" class="btn-secondary" style="display:flex;align-items:center;justify-content:center;width:100%;min-height:34px;box-sizing:border-box;padding:7px 10px;border:1px solid var(--card-border);border-radius:7px;background:var(--btn-bg);color:var(--text-main);font-size:0.72rem;font-weight:700;cursor:pointer;">选择 Excel 并识别导入</label>
              <div id="whitelistImportStatus" role="status" aria-live="polite" style="min-height:14px;font-size:0.62rem;line-height:1.45;color:var(--text-soft);"></div>
            </div>
          </div>

          <!-- 2. SCANNING STATE -->
          <div id="aiImportScanning" style="display: none; flex-direction: column; align-items: center; gap: 12px; width: 100%; padding: 10px 0;">
            <span style="font-size: 0.8rem; color: var(--text-main); font-weight: 600;" id="aiScanStatus">BH-AI 深度模型解析中...</span>
            <div style="display: flex; flex-direction: column; gap: 4px; text-align: left; font-size: 0.65rem; color: var(--text-soft); font-family: monospace; width: 100%; max-width: 260px; background: rgba(0,0,0,0.02); padding: 8px; border-radius: var(--radius-sm); border: 0.5px solid var(--card-border);">
              <div id="aiLog1" style="opacity: 0.4;">[ ] 正在读取数据流...</div>
              <div id="aiLog2" style="opacity: 0.4;">[ ] 正在评估特征维度...</div>
              <div id="aiLog3" style="opacity: 0.4;">[ ] 正在过滤杂质与噪音...</div>
              <div id="aiLog4" style="opacity: 0.4;">[ ] 正在匹配智能映射...</div>
            </div>
          </div>

          <!-- 4. LOCAL OCR SLICING CONFIG STATE -->
          <div id="localOcrConfigPanel" style="display: none; flex-direction: column; align-items: center; gap: 10px; width: 100%; padding: 10px 0;">
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-main);">本地离线识别 - 栏目切分微调</span>
            <span style="font-size: 0.65rem; color: var(--text-light); text-align: center; max-width: 300px; margin-top: -6px;">请调整边界线，确保手机号列、姓名列被虚线分离开，以达到 100% 识别精准度。</span>
            
            <div style="position: relative; border: 0.5px solid var(--card-border); border-radius: var(--radius-sm); background: #eee; overflow: hidden; display: flex; justify-content: center; align-items: center; max-height: 180px; width: 100%; max-width: 360px;">
              <canvas id="ocrPreviewCanvas" style="max-height: 180px; max-width: 100%; object-fit: contain;"></canvas>
            </div>
            
            <!-- Sliders -->
            <div style="display: flex; flex-direction: column; gap: 4px; width: 100%; max-width: 320px;">
              <div style="display: flex; justify-content: space-between; font-size: 0.65rem; color: var(--text-soft); font-weight: 600;">
                <span>左侧边界线: <strong id="valSplit1">25%</strong></span>
                <span>右侧边界线: <strong id="valSplit2">60%</strong></span>
              </div>
              <input type="range" id="sliderSplit1" min="5" max="95" value="25" style="width: 100%; cursor: pointer; height: 4px;">
              <input type="range" id="sliderSplit2" min="5" max="95" value="60" style="width: 100%; cursor: pointer; height: 4px;">
            </div>
            <label style="font-size: 0.75rem; color: var(--text-main); margin-top: 6px; display: none !important; align-items: center; gap: 6px; cursor: pointer;">
              <input type="checkbox" id="chkUseSlicing" style="accent-color: var(--primary-color);" checked> 启用表格列切片模式 (适合Excel截图，普通名片/照片请取消勾选)
            </label>

            <!-- Column Order Preset -->
            <div style="display: flex; gap: 8px; align-items: center; width: 100%; max-width: 320px;">
              <span style="font-size: 0.65rem; color: var(--text-soft); font-weight: 600; white-space: nowrap;">栏目顺序:</span>
              <select id="ocrColumnOrder" style="flex: 1; height: 26px; font-size: 0.68rem; border-radius: var(--radius-sm); border: 0.5px solid var(--card-border); background: var(--btn-bg); color: var(--text-main); font-weight: 700; outline: none;">
                <option value="name_phone_other">左:姓名 | 中:电话 | 右:单位或备注</option>
                <option value="phone_name_other">左:电话 | 中:姓名 | 右:单位或备注</option>
                <option value="name_other_phone">左:姓名 | 中:单位或备注 | 右:电话</option>
              </select>
            </div>

            <div style="display: flex; gap: 10px; width: 100%; max-width: 320px; margin-top: 4px;">
              <button id="btnStartLocalOcr" class="btn-primary" style="flex: 1; padding: 6px; font-size: 0.75rem; background: var(--wechat-gradient) !important; color: white;">开始本地识别</button>
              <button id="btnCancelLocalOcr" class="btn-secondary" style="padding: 6px 14px; font-size: 0.75rem;">取消</button>
            </div>
          </div>

          <!-- 3. REPORT STATE -->
          <div id="aiImportReport" style="display: none; flex-direction: column; width: 100%; text-align: left; gap: 8px;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed var(--border-light); padding-bottom: 6px;">
              <span id="aiReportTitle" style="font-size: 0.8rem; font-weight: 700; color: var(--text-main);">AI 识别报告</span>
              <span id="aiConfidenceBadge" style="font-size: 0.62rem; font-weight: 600; padding: 2px 6px; border-radius: var(--radius-xs); background: rgba(7, 193, 96, 0.1); color: var(--accent-wechat); border: none; box-shadow: var(--shadow-card);">● 置信度: 98%</span>
            </div>

            <!-- Mapped Pillars -->
            <div id="aiExcelMappingPills" style="display: flex; flex-wrap: wrap; gap: 4px; background: var(--btn-bg); padding: 6px; border-radius: var(--radius-sm);">
              <div style="font-size: 0.65rem; font-weight: 600; color: var(--text-soft); width: 100%; margin-bottom: 2px;">AI 智能列映射关系：</div>
              <div class="client-card-tag" id="pillName" style="background: rgba(7,193,96,0.08); color: var(--accent-wechat);">姓名 → 未识别</div>
              <div class="client-card-tag" id="pillPhone" style="background: rgba(7,193,96,0.08); color: var(--accent-wechat);">电话 → 未识别</div>
              <div class="client-card-tag" id="pillCompany" style="background: rgba(74,108,247,0.08); color: #4a6cf7;">公司 → 无</div>
              <div class="client-card-tag" id="pillNote" style="background: rgba(245,124,0,0.08); color: #f57c00;">备注 → 无</div>
            </div>

            <!-- Manual Override Button & Selectors (Collapsed by default) -->
            <div id="aiExcelMappingControls" style="width: 100%;">
              <button id="aiToggleAdjustBtn" style="background: transparent; border: none; font-size: 0.65rem; font-weight: 600; color: var(--text-soft); cursor: pointer; display: inline-flex; align-items: center; gap: 4px; padding: 2px 0; outline: none;">手动修正 AI 映射结果 ▾</button>
              <div id="aiAdjustControls" style="display: none; grid-template-columns: repeat(2, 1fr); gap: 6px; margin-top: 4px; border: 1px dashed var(--card-border); padding: 8px; border-radius: var(--radius-sm); background: var(--card-bg);">
                <div style="display: flex; flex-direction: column; gap: 2px;">
                  <label style="font-size: 0.6rem; color: var(--text-light); font-weight: 600;">姓名数据列</label>
                  <select id="aiSelName" style="height: 24px; font-size: 0.65rem; outline: none; border: 0.5px solid var(--card-border); border-radius: var(--radius-xs); font-weight: 600; color: var(--text-soft); background: var(--btn-bg);"></select>
                </div>
                <div style="display: flex; flex-direction: column; gap: 2px;">
                  <label style="font-size: 0.6rem; color: var(--text-light); font-weight: 600;">电话数据列</label>
                  <select id="aiSelPhone" style="height: 24px; font-size: 0.65rem; outline: none; border: 0.5px solid var(--card-border); border-radius: var(--radius-xs); font-weight: 600; color: var(--text-soft); background: var(--btn-bg);"></select>
                </div>
                <div style="display: flex; flex-direction: column; gap: 2px;">
                  <label style="font-size: 0.6rem; color: var(--text-light); font-weight: 600;">公司数据列 (可选)</label>
                  <select id="aiSelCompany" style="height: 24px; font-size: 0.65rem; outline: none; border: 0.5px solid var(--card-border); border-radius: var(--radius-xs); font-weight: 600; color: var(--text-soft); background: var(--btn-bg);"></select>
                </div>
                <div style="display: flex; flex-direction: column; gap: 2px;">
                  <label style="font-size: 0.6rem; color: var(--text-light); font-weight: 600;">备注数据列 (可选)</label>
                  <select id="aiSelNote" style="height: 24px; font-size: 0.65rem; outline: none; border: 0.5px solid var(--card-border); border-radius: var(--radius-xs); font-weight: 600; color: var(--text-soft); background: var(--btn-bg);"></select>
                </div>
              </div>
            </div>

            <!-- Live Preview Table -->
            <div id="aiExcelPreviewContainer" style="width: 100%; border: 0.5px solid var(--card-border); border-radius: var(--radius-sm); overflow: hidden; background: var(--card-bg);">
              <div style="font-size: 0.6rem; font-weight: 600; color: var(--text-light); background: var(--btn-bg); padding: 4px 8px; border-bottom: 0.5px solid var(--card-border);">AI 导入数据效果实时预览 (前3行)：</div>
              <div style="overflow-x: auto; width: 100%;">
                <table style="width: 100%; border-collapse: collapse; font-size: 0.65rem; text-align: left;" id="aiPreviewTable">
                  <thead>
                    <tr style="border-bottom: 0.5px solid var(--card-border); font-weight: 600; color: var(--text-soft); background: rgba(0,0,0,0.01);">
                      <th style="padding: 4px 8px;">姓名</th>
                      <th style="padding: 4px 8px;">电话</th>
                      <th style="padding: 4px 8px;">公司</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- populated dynamically -->
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Unstructured Preview Table Container (Only visible for TXT/DOCX/PDF/OCR) -->
            <div id="aiUnstructuredContainer" style="display: none; width: 100%; border: 0.5px solid var(--card-border); border-radius: var(--radius-sm); overflow: hidden; background: var(--card-bg);">
              <div style="font-size: 0.6rem; font-weight: 600; color: var(--text-light); background: var(--btn-bg); padding: 4px 8px; border-bottom: 0.5px solid var(--card-border);">AI 智能提取结果校验与编辑面板：</div>
              <div style="display:flex;flex-wrap:wrap;gap:6px;padding:8px;background:var(--accent-wechat-bg);border-bottom:0.5px solid var(--card-border);align-items:center;">
                <input id="bulkMissingName" type="text" placeholder="批量补充姓名（仅填空姓名）" style="flex:1;min-width:130px;height:30px;padding:0 8px;border:1px solid var(--card-border);border-radius:7px;background:var(--card-bg);color:var(--text-main);font-size:12px;">
                <input id="bulkMissingCompany" type="text" placeholder="批量补充单位名称（仅填空单位）" style="flex:1;min-width:150px;height:30px;padding:0 8px;border:1px solid var(--card-border);border-radius:7px;background:var(--card-bg);color:var(--text-main);font-size:12px;">
                <button id="applyBulkMissingFieldsBtn" type="button" class="btn-secondary" style="padding:6px 12px;font-size:12px;">批量填入</button>
                <span id="bulkMissingFieldsHint" style="width:100%;font-size:11px;color:var(--text-soft);">只补充没有姓名或单位的号码，不覆盖已识别内容；填入后仍可逐条修改。</span>
              </div>
              <div style="max-height: 250px; overflow-y: auto; overflow-x: auto; width: 100%;">
                <table style="width: 100%; border-collapse: collapse; font-size: 0.65rem; text-align: left;" id="aiUnstructuredTable">
                  <thead>
                    <tr style="border-bottom: 0.5px solid var(--card-border); font-weight: 600; color: var(--text-soft); background: rgba(0,0,0,0.01); position: sticky; top: 0; background: var(--btn-bg); z-index: 10;">
                      <th style="padding: 6px 8px; width: 40px; text-align: center;">操作</th>
                      <th style="padding: 6px 8px; width: 70px;">姓名</th>
                      <th style="padding: 6px 8px; width: 100px;">电话</th>
                      <th style="padding: 6px 8px; width: 100px;">公司</th>
                      <th style="padding: 6px 8px;">备注</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- populated dynamically -->
                  </tbody>
                </table>
              </div>
            </div>


            <!-- Confirm Buttons -->
            <div style="display: flex; gap: 8px; width: 100%; margin-top: 4px;">
              <button id="aiConfirmImportBtn" class="btn-primary" style="flex: 1; padding: 8px; font-size: 0.78rem; font-weight: 600; border-radius: var(--radius-sm); box-shadow: var(--shadow-card); text-align: center;">AI 确认导入</button>
              <button id="aiResetImportBtn" class="btn-modal btn-neutral" style="padding: 8px 14px; font-size: 0.78rem; font-weight: 600; border-radius: var(--radius-sm); height: auto; box-shadow: none;">取消</button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Controls -->
      <div class="control-bar" id="controlBar" style="display:none; flex-wrap: wrap; gap: 6px;">
        <input type="text" class="search-input" id="searchInput" placeholder="搜索" style="flex: 1; min-width: 60px;">
        <select id="sortSelect" style="height: 28px; font-size: 0.68rem; border: 0.5px solid var(--card-border); border-radius: var(--radius-sm); background: var(--btn-bg); color: var(--text-soft); font-weight: 600; outline: none; padding: 0 4px; cursor: pointer; flex-shrink: 0; width: 95px;">
          <option value="default" selected>导入顺序</option>
          <option value="name">姓名 A-Z</option>
          <option value="company">公司 A-Z</option>
          <option value="todo">待拨优先</option>
          <option value="dialed">已拨优先</option>
          <option value="shuffle">随机打乱</option>
        </select>
        <div class="filter-group" style="flex-shrink: 0;">
          <button class="filter-tab active" data-filter="all">全部</button>
          <button class="filter-tab" data-filter="todo">待拨打</button>
          <button class="filter-tab" data-filter="success">已接通</button>
          <button class="filter-tab" data-filter="failed">未接通</button>
        </div>
      </div>

    </div>
  </div>
  
  <!-- Call Assistant Modal -->
  <div id="callAssistOverlay" class="modal-overlay" style="z-index:3000;">
    <div class="modal-card" style="text-align:center;gap:12px;">
      <div style="font-size:0.75rem;color:var(--text-soft);font-weight:800;letter-spacing:1px;text-transform:uppercase;">快捷呼叫助理</div>
      <div style="display:none;" id="callAssistName">-</div>
      <div style="display:flex;align-items:center;justify-content:center;margin-top:2px;">
        <div id="callAssistNameDisplay" class="client-card-name-btn" title="点击复制姓名" style="font-size:1.25rem;font-weight:900;color:var(--text-main);">-</div>
      </div>
      <div id="callAssistPhone" style="display:none;">-</div>
      <div style="display:flex;align-items:center;justify-content:center;margin-top:-2px;">
        <div id="callAssistPhoneDisplay" class="client-phone-btn" title="点击复制号码" style="font-size:1.15rem !important;font-weight:900;color:var(--text-main);">-</div>
      </div>
      <div id="callAssistCompanyRow" style="display:none;margin-top:2px;width:100%;">
        <span style="font-size:0.7rem;color:var(--text-light);font-weight:800;">公司：</span>
        <span id="callAssistCompany" title="点击复制单位" style="font-size:0.75rem;font-weight:800;color:var(--accent-wechat);background:rgba(7,193,96,0.08);padding:2px 8px;border-radius:var(--radius-xs);cursor:pointer;display:inline-block;"></span>
      </div>
      <div id="callAssistNoteRow" style="display:none;margin-top:4px;width:100%;text-align:left;">
        <span style="font-size:0.7rem;color:var(--text-light);font-weight:800;">备注：</span>
        <span id="callAssistNote" style="font-size:0.72rem;font-weight:700;color:var(--text-soft);line-height:1.4;word-break:break-all;white-space:pre-wrap;"></span>
      </div>
      <div style="display:flex;justify-content:center;margin-top:4px;width:100%;">
        <a id="callAssistDialLink" class="btn-modal btn-success" style="width:100%;text-decoration:none;display:flex;align-items:center;justify-content:center;font-size:0.85rem;height:38px;box-shadow:var(--shadow-card);border-radius:var(--radius-xs);">立即拨打</a>
      </div>
      
      <!-- Remark Input Field (Directly Visible) -->
      <div style="text-align:left;display:flex;flex-direction:column;gap:4px;width:100%;">
        <div style="display:flex;align-items:center;gap:8px;">
          <span class="client-card-label" style="font-size:0.65rem;color:var(--text-light);font-weight:800;">通话小记 / 沟通记录</span>
          <button type="button" id="bhpBoldBtn" title="加粗 (Alt+B)" style="height:22px;width:22px;font-weight:900;font-size:0.6rem;border:none;box-shadow:var(--shadow-card);background:var(--btn-bg);color:var(--text-main);cursor:pointer;border-radius:3px;padding:0;line-height:1;flex-shrink:0;">B</button>
          <button type="button" id="bhpDelBtn" title="删除线 (Alt+D)" style="height:22px;width:22px;font-weight:700;font-size:0.5rem;border:none;box-shadow:var(--shadow-card);background:var(--btn-bg);color:var(--text-main);cursor:pointer;border-radius:3px;padding:0;line-height:1;text-decoration:line-through;flex-shrink:0;">D</button>
        </div>
        <textarea id="callLogNote" placeholder="在这里输入通话记录、客户意向等备注信息..." style="width:100%;height:100px;font-size:0.8rem;padding:8px 10px;background:var(--btn-bg);border:0.5px solid var(--card-border);border-radius:var(--radius-xs);color:var(--text-main);outline:none;font-weight:700;resize:none;"></textarea>
      </div>

      <!-- Direct Outcome Action Buttons -->
      <div style="display:flex;gap:10px;width:100%;margin-top:4px;">
        <button id="callOutcomeSuccessBtn" class="btn-modal btn-success" style="flex:1;font-size:0.85rem;height:42px;box-shadow:var(--shadow-card);">已接通</button>
        <button id="callOutcomeFailedBtn" class="btn-modal btn-danger" style="flex:1;font-size:0.85rem;height:42px;box-shadow:var(--shadow-card);">未接通</button>
      </div>
    </div>
  </div>

  <!-- Export Dialog Modal -->
  <div id="exportModal" class="modal-overlay">
    <div class="modal-card export-modal-card">
      <div style="font-size:0.95rem;font-weight:900;color:var(--text-main);display:flex;justify-content:space-between;align-items:center;">
        <span>导出拨号记录</span>
        <button id="closeExportBtn" style="background:none;border:none;font-size:1.2rem;cursor:pointer;color:var(--text-soft);">关闭</button>
      </div>
      <div style="font-size:0.7rem;color:var(--text-light);font-weight:700;">包含通话时长、拨号状态与通话小记</div>
      <textarea id="exportTextarea" class="export-textarea" readonly></textarea>
      <button id="copyExportBtn" class="btn-modal btn-success" style="width:100%;">复制记录到剪贴板</button>
    </div>
  </div>


  <!-- 复制内容偏好弹窗 -->
  <div id="copyPrefOverlay" class="modal-overlay" style="z-index:100006;">
    <div class="modal-card" style="width:300px;padding:18px 20px;border-radius:16px;">
      <div style="display:flex;justify-content:flex-end;">
        <button id="copyPrefCloseBtn" title="关闭" style="background:none;border:none;font-size:0.95rem;cursor:pointer;color:var(--text-soft);padding:2px;line-height:1;">❌</button>
      </div>
      <div style="font-size:0.7rem;color:var(--text-light);font-weight:700;margin:0 0 12px;">点击客户卡片「单位名称」时，按勾选的要素组合复制；先勾选的排前面</div>
      <button id="copyPrefOpenDBBtn" type="button" style="display:none;width:100%;margin:0 0 14px;padding:10px 12px;border:1px solid var(--card-border);border-radius:10px;background:var(--btn-bg);color:var(--text-main);font-size:0.78rem;font-weight:800;text-align:left;cursor:pointer;">▦ 数据库看板 <span style="float:right;color:var(--text-light);font-weight:600;">进入 ›</span></button>
      <div style="display:flex;flex-direction:column;gap:10px;font-size:0.78rem;font-weight:600;color:var(--text-main);">
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer;"><input type="checkbox" id="cpfName" style="accent-color:var(--accent-wechat);width:16px;height:16px;cursor:pointer;"><span id="cpfNumName" style="min-width:14px;font-size:0.68rem;color:var(--accent-wechat);font-weight:900;"></span>姓名<span style="font-size:0.6rem;color:var(--text-light);font-weight:700;background:var(--btn-bg);padding:1px 6px;border-radius:var(--radius-xs);">必选</span></label>
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer;"><input type="checkbox" id="cpfPhone" style="accent-color:var(--accent-wechat);width:16px;height:16px;cursor:pointer;"><span id="cpfNumPhone" style="min-width:14px;font-size:0.68rem;color:var(--accent-wechat);font-weight:900;"></span>手机号</label>
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer;"><input type="checkbox" id="cpfCompany" style="accent-color:var(--accent-wechat);width:16px;height:16px;cursor:pointer;"><span id="cpfNumCompany" style="min-width:14px;font-size:0.68rem;color:var(--accent-wechat);font-weight:900;"></span>单位名称</label>
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer;"><input type="checkbox" id="cpfFund" style="accent-color:var(--accent-wechat);width:16px;height:16px;cursor:pointer;"><span id="cpfNumFund" style="min-width:14px;font-size:0.68rem;color:var(--accent-wechat);font-weight:900;"></span>公积金</label>
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer;"><input type="checkbox" id="cpfDate" style="accent-color:var(--accent-wechat);width:16px;height:16px;cursor:pointer;"><span id="cpfNumDate" style="min-width:14px;font-size:0.68rem;color:var(--accent-wechat);font-weight:900;"></span>日期（年月日）</label>
      </div>
      <div style="font-size:0.62rem;color:var(--text-light);font-weight:600;margin-top:12px;line-height:1.5;">示例：张三 13800138000 某某公司 公积金24170 ［26-08-14］（勾选即时生效）</div>
      <div id="copyPrefChildPinPanel" style="display:none;margin:8px 0 0;padding:5px 7px;border:1px solid var(--card-border);border-radius:7px;background:var(--btn-bg);">
        <div style="font-size:0.62rem;font-weight:800;color:var(--text-main);margin-bottom:4px;">修改登录 PIN</div>
        <div style="display:flex;align-items:center;gap:4px;">
          <input type="password" id="copyPrefOldPin" inputmode="numeric" maxlength="6" autocomplete="current-password" placeholder="当前 PIN" style="box-sizing:border-box;min-width:0;flex:1;height:20px;padding:0 5px;border:1px solid var(--card-border);border-radius:5px;background:var(--card-bg);color:var(--text-main);font-size:0.6rem;text-align:center;">
          <input type="password" id="copyPrefNewPin" inputmode="numeric" maxlength="6" autocomplete="new-password" placeholder="新 PIN" style="box-sizing:border-box;min-width:0;flex:1;height:20px;padding:0 5px;border:1px solid var(--card-border);border-radius:5px;background:var(--card-bg);color:var(--text-main);font-size:0.6rem;text-align:center;">
          <button type="button" id="copyPrefChangePinBtn" style="height:20px;padding:0 8px;border:0;border-radius:5px;background:var(--accent-wechat);color:#fff;font-size:0.6rem;font-weight:800;white-space:nowrap;">修改</button>
        </div>
        <div id="copyPrefPinMessage" style="min-height:11px;margin-top:2px;font-size:0.56rem;color:#e74c3c;"></div>
      </div>
    </div>
  </div>

  <!-- Note Details Modal -->
  <div id="noteModal" class="modal-overlay" style="z-index:100005;">
    <div class="modal-card" style="text-align:left; gap:12px;">
      <div style="font-size:0.95rem; font-weight:900; color:var(--text-main); display:flex; justify-content:space-between; align-items:center;">
        <span>客户资料备注</span>
        <button id="closeNoteModalBtn" style="background:none; border:none; font-size:1.2rem; cursor:pointer; color:var(--text-soft); padding:0;">关闭</button>
      </div>
      <div style="border-top:1px dashed var(--border-light); padding-top:8px;">
        <p id="noteModalContent" role="button" aria-label="点击复制全部客户资料备注" title="点击复制备注" style="font-size:0.85rem; color:var(--text-soft); line-height:1.65; white-space:pre-wrap; font-weight:700; word-break:break-all; cursor:pointer; padding:8px; margin:0; border-radius:8px; -webkit-tap-highlight-color:transparent;">点击此处复制备注</p>
      </div>
    </div>
  </div>

  <!-- Custom Columns Management Modal -->
  <div id="customColumnsModal" class="modal-overlay" style="z-index:100005;">
    <div class="modal-card" style="max-width: 400px; gap: 12px; text-align: left;">
      <div style="font-size:0.95rem; font-weight:900; color:var(--text-main); display:flex; justify-content:space-between; align-items:center;">
        <span>自定义列管理</span>
        <button id="closeCustomColumnsBtn" style="background:none; border:none; font-size:1.2rem; cursor:pointer; color:var(--text-soft); padding:0;">关闭</button>
      </div>
      <div style="font-size:0.7rem; color:var(--text-light); font-weight:700; margin-bottom: 4px;">
        您可以添加或删除 CRM 数据库的自定义数据列。自定义列的值可在 Excel 导入时手动映射关联，或在跟进备注时作为关联字段保存。
      </div>
      <div style="display:flex; flex-direction:column; gap:6px; max-height:200px; overflow-y:auto; border: 0.5px solid var(--card-border); padding: 8px; border-radius: var(--radius-sm); background: var(--btn-bg);" id="customColumnsList"></div>
      <div style="display:flex; gap:6px; margin-top:8px;">
        <input type="text" id="newCustomColInput" placeholder="输入新列名，如：微信号" style="flex:1; height:32px; padding:0 8px; font-size:0.75rem; border:0.5px solid var(--card-border); border-radius:4px; font-weight:bold; outline:none; background:var(--card-bg); color:var(--text-main);">
        <button id="addCustomColBtn" class="btn-primary" style="padding:0 14px; height:32px; font-size:0.75rem;">添加列</button>
      </div>
    </div>
  </div>

  <!-- SheetJS CDN -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js" defer></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/tesseract.js/4.1.1/tesseract.min.js" defer></script>

<!-- OCR Training Data Modal -->
<div class="modal-overlay" id="ocrCorrectionModal" style="z-index: 5000;">
  <div class="modal-card" style="max-width: 640px; gap: 10px; max-height: 80vh; overflow-y: auto; width: 94vw;">
    <div style="display:flex; justify-content:space-between; align-items:center; position:sticky; top:0; background:var(--modal-card); padding-bottom: 6px; border-bottom:0.5px solid var(--card-border);">
      <span style="font-size:0.9rem; font-weight:900; color:var(--text-main);">OCR 训练数据收集</span>
      <button id="closeOcrCorrectionBtn" style="background:none; border:none; font-size:1.2rem; cursor:pointer; color:var(--text-soft); line-height:1;">关闭</button>
    </div>
    <div id="ocrCorrectionStats" style="font-size:0.72rem; color:var(--text-soft); padding:0 2px;">
      已收集 <strong id="ocrCorrectionCount" style="color:var(--accent-wechat);">0</strong> 条修正记录
      <span id="ocrCorrectionBadge" style="display:none; margin-left:8px; padding:1px 8px; border-radius:10px; background:#07c160; color:white; font-size:0.6rem; font-weight:700;">可用于提示改进</span>
    </div>
    <div style="display:flex; gap:6px; flex-wrap:wrap; align-items:center;">
      <button id="ocrExportJsonlBtn" class="btn-secondary" style="flex:1; min-width:90px; padding:6px 10px; font-size:0.68rem;">导出 JSONL</button>
      <button id="ocrRefreshCorrectionsBtn" class="btn-secondary" style="padding:6px 10px; font-size:0.68rem;">刷新</button>
      <label style="font-size:0.6rem; color:var(--text-light); cursor:pointer; display:flex; align-items:center; gap:4px; white-space:nowrap;">
        <input type="checkbox" id="ocrFilterEditsOnly" checked style="cursor:pointer;">
        仅显示有修改
      </label>
    </div>
    <div id="ocrCorrectionList" style="max-height:55vh; overflow-y:auto; border:0.5px solid var(--card-border); border-radius:var(--radius-xs); background:var(--bg-app);">
      <div style="text-align:center; padding:28px; font-size:0.72rem; color:var(--text-light);">点击"刷新"加载记录</div>
    </div>
    <div style="font-size:0.55rem; color:var(--text-light); text-align:center; padding:4px;">
      修正数据用于改进 AI 识别提示词 · 不会上传原始图片 · 每 24h 自动刷新示例缓存
    </div>
  </div>
</div>

<!-- Customer Database Dashboard (v2) -->
<!-- Customer Database Dashboard (v2) -->
<!-- DB Password Gate -->
<div class="modal-overlay" id="dbPwdOverlay" style="display:none; z-index:100005; align-items:center; justify-content:center;">
  <div class="modal-card" style="text-align:center; gap:16px; max-width:340px;">
    <input type="password" id="dbPwdInput" maxlength="6" autocomplete="off" style="width:100%; max-width:220px; height:42px; font-size:1.4rem; text-align:center; letter-spacing:8px; border:2px solid var(--card-border); border-radius:var(--radius-xs); background:var(--card-bg); color:var(--text-main); outline:none; font-family:monospace;">
    <span id="dbPwdError" style="font-size:0.62rem; color:#e74c3c; display:none; min-height:16px;"></span>
    <div style="display:flex; gap:8px; width:100%;">
      <button id="dbPwdCancelBtn" class="btn-modal btn-danger" style="flex:1;">取消</button>
      <button id="dbPwdConfirmBtn" class="btn-modal btn-success" style="flex:1;">确认</button>
    </div>
  </div>
</div>

<div class="db-overlay" id="dbOverlay">
  <div class="db-panel">
    <!-- CRM Top Tabs -->
    <div class="crm-tabs">
      <div class="crm-tab active" data-tab="all">首页</div>
      <div class="crm-tab" data-tab="公海客户">公海客户</div>
      <div class="crm-tab" data-tab="accountMgr">账户管理</div>
      <div class="crm-tab" data-tab="backupMgr">数据备份</div>
      <div class="crm-tab" data-tab="contentConfig">内容配置</div>
      <div class="crm-tab" data-tab="uploadLog">上传记录</div>
      <div class="crm-tab" data-tab="masterPullLog">主账号补充</div>
      <div class="crm-tabs-right">
        <button class="db-close" id="dbMobileBtn" type="button" title="手机版界面" aria-label="手机版界面" style="background:rgba(74,108,247,0.1);color:#4a6cf7;padding:0 9px;font-size:0;">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
        </button>
        <button class="db-close" id="dbClose" type="button" title="关闭" aria-label="关闭">❌</button>
      </div>
    </div>

    <!-- CRM Shortcut Filters -->
    <div class="crm-shortcut-bar">
      <button class="crm-shortcut-btn active" data-shortcut="all">全部</button>
      <button class="crm-shortcut-btn" data-shortcut="today">今日新增</button>
      <button class="crm-shortcut-btn" data-shortcut="never">从未跟进</button>
      <button class="crm-shortcut-btn" data-shortcut="3days">3天以上未跟进</button>
      <span class="crm-shortcut-add" title="添加快捷过滤">(+)</span>
      <span id="dbAccountViewControls" style="display:none;align-items:center;gap:5px;margin-left:auto;">
        <span style="font-size:.65rem;color:var(--text-soft);white-space:nowrap;">查看</span>
        <select id="dbViewAccountSel" aria-label="选择查看的账号数据" style="height:27px;max-width:145px;padding:0 5px;font-size:.68rem;border:0.5px solid var(--card-border);border-radius:5px;background:var(--card-bg);color:var(--text-main);">
          <option value="">我的数据</option>
        </select>
        <button id="dbMigrateBtn" type="button" style="display:none;height:27px;padding:0 8px;font-size:.63rem;border:0;border-radius:5px;background:rgba(230,126,34,.12);color:#e67e22;font-weight:700;white-space:nowrap;">归属主账户</button>
      </span>
      <button class="crm-shortcut-toggle" id="crmToggleSearchBtn" title="展开/收起搜索区域">收起搜索</button>
    </div>

    <!-- CRM Search Area -->
    <div class="crm-search-card">
      <div class="crm-search-grid">
        <div class="crm-search-item crm-search-item-full">
          <span class="crm-search-label" style="width:88px;">模糊关联搜索</span>
          <input type="text" class="crm-input" id="dbFuzzySearch" placeholder="输入单位名称、客户名称、联系号码、备注或导入批次，自动模糊匹配...">
        </div>
      </div>
      <div class="crm-search-actions">
        <button class="crm-btn-search" id="crmSearchBtn">搜索</button>
        <input type="text" id="dbSearch" style="display:none;" placeholder="隐式兼容搜索">
      </div>
    </div>

    <!-- Action Toolbar -->
    <div class="crm-toolbar">
      <button class="crm-tool-btn green" id="crmAddCustBtn">添加客户</button>
      <button class="crm-tool-btn orange" id="crmAddToDialBtn">添加到列表</button>
      <button class="crm-tool-btn" id="crmMovePublicBtn">转入公海</button>
      <button class="crm-tool-btn red" id="crmBatchDeleteBtn" title="删除勾选的客户">批量删除</button>
      <button class="crm-tool-btn" id="dbBatchCatBtn" title="更多批量分类">批量分类</button>
      <button class="crm-tool-btn blue" id="dbAiCorrectFundBtn" title="AI 扫描公积金字段，自动识别并修正存错位置的数据">AI修正公积金</button>
      <button class="crm-tool-btn blue" id="crmManageColsBtn" title="管理自定义列">自定义列</button>
      <button class="crm-tool-btn orange" id="crmReassignToggle" type="button" style="display:none;">分配数据</button>
      <select id="dbImportBatchView" aria-label="按导入批次查看" title="按导入批次筛选客户" style="height:26px;width:112px;max-width:112px;min-width:0;flex:0 1 112px;padding:0 5px;border:1px solid var(--card-border);border-radius:7px;background:var(--bg-app);color:var(--text-main);font-size:.68rem;font-weight:600;white-space:nowrap;"><option value="">批次：全部</option></select>
      <div id="crmReassignGroup" style="display:none; flex:1 1 100%; flex-direction:column; align-items:stretch; gap:8px; padding:10px; border:1px solid var(--card-border); border-radius:8px; background:var(--card-bg);">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
          <span id="crmReassignTitle" style="font-size:0.75rem;font-weight:700;color:var(--text-soft);">分配给所有小组和组员</span>
          <select id="crmReassignMode" style="height:30px;padding:0 8px;border:1px solid var(--card-border);border-radius:6px;background:var(--bg-app);color:var(--text-main);font-size:.72rem;">
            <option value="equal">平均分配</option>
            <option value="manual">手动分配数量</option>
          </select>
        </div>
        <div id="crmReassignSel" style="display:flex;align-items:center;gap:7px;flex-wrap:wrap;font-size:0.68rem;"></div>
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
          <span id="crmReassignHint" style="font-size:.68rem;color:var(--text-soft);">勾选接收成员，系统将当前批次剩余客户平均分配</span>
          <button class="crm-tool-btn" id="crmReassignBtn" type="button" style="background:#e67e22;color:#fff;border-color:#e67e22;">确认分配</button>
          <button class="crm-tool-btn" id="crmReassignClose" type="button">收起</button>
        </div>
      </div>
    </div>

    <!-- Account Management Panel -->
    <div id="dbAccountMgrPanel" style="display:none; flex-direction:column; gap:12px; padding:16px; overflow-y:auto; flex:1;">
      <div id="dbAccountMgrSubs" style="display:none;">
        <div style="font-size:0.85rem; font-weight:900; color:var(--text-main); margin-bottom:8px;">小组与子账号管理</div>
        <input type="text" id="dbSubAccountGroupNameInput" maxlength="30" placeholder="小组名称（创建小组时填写）" style="display:block;width:100%;height:34px;margin-bottom:6px;padding:0 9px;font-size:.75rem;border:1px solid var(--card-border);border-radius:6px;background:var(--card-bg);color:var(--text-main);">
        <label id="dbAssignLeaderRow" style="display:none;align-items:center;gap:7px;margin:4px 0 7px;font-size:.72rem;font-weight:700;color:var(--text-soft);"><input type="checkbox" id="dbAssignLeaderCheck" style="width:16px;height:16px;"> 指定小组长</label>
        <select id="dbSubAccountParentInput" style="display:none;width:100%;height:34px;margin-bottom:6px;padding:0 8px;font-size:.75rem;border:1px solid var(--card-border);border-radius:6px;background:var(--card-bg);color:var(--text-main);"><option value="">主账号默认组</option></select>
        <div id="dbSubAccountList" style="display:flex; flex-direction:column; gap:12px; max-height:none; overflow:visible; margin-bottom:12px;"></div>
        <div style="display:flex; gap:6px; margin-bottom:6px;">
          <input type="text" id="dbSubAccountRealNameInput" maxlength="20" placeholder="真实姓名（必填）" style="width:100%; height:32px; padding:0 8px; font-size:0.75rem; border:0.5px solid var(--card-border); border-radius:4px; font-weight:700; outline:none; background:var(--card-bg); color:var(--text-main);">
        </div>
        <div style="display:flex; gap:6px;">
          <input type="text" id="dbSubAccountNameInput" maxlength="20" placeholder="账户名" style="flex:1; height:32px; padding:0 8px; font-size:0.75rem; border:0.5px solid var(--card-border); border-radius:4px; font-weight:700; outline:none; background:var(--card-bg); color:var(--text-main);">
          <input type="password" id="dbSubAccountPinInput" maxlength="6" placeholder="PIN码" style="width:80px; height:32px; padding:0 6px; font-size:0.75rem; border:0.5px solid var(--card-border); border-radius:4px; font-weight:700; outline:none; background:var(--card-bg); color:var(--text-main); text-align:center; font-family:monospace;">
        </div>
        <div style="display:flex;gap:7px;margin:7px 0;">
          <button id="dbCreateGroupBtn" type="button" class="btn-primary" style="flex:1;height:36px;font-size:.75rem;">＋ 创建小组</button>
          <button id="dbCreateMemberBtn" type="button" class="btn-secondary" style="flex:1;height:36px;font-size:.75rem;">＋ 创建组员</button>
        </div>
        <div id="dbSubAccountError" style="font-size:0.62rem; color:#e74c3c; min-height:16px; margin-top:4px;"></div>
      </div>
      <div style="font-size:0.85rem; font-weight:900; color:var(--text-main);">修改 PIN 码</div>
      <div style="display:flex; gap:6px;">
        <input type="password" id="dbChangePinOld" maxlength="6" placeholder="当前PIN" style="flex:1; height:32px; padding:0 8px; font-size:0.75rem; border:0.5px solid var(--card-border); border-radius:4px; font-weight:700; outline:none; background:var(--card-bg); color:var(--text-main); text-align:center; font-family:monospace;">
        <input type="password" id="dbChangePinNew" maxlength="6" placeholder="新PIN" style="flex:1; height:32px; padding:0 8px; font-size:0.75rem; border:0.5px solid var(--card-border); border-radius:4px; font-weight:700; outline:none; background:var(--card-bg); color:var(--text-main); text-align:center; font-family:monospace;">
        <button id="dbChangePinBtn" class="btn-secondary" style="padding:0 12px; height:32px; font-size:0.72rem;">修改</button>
      </div>
      <div id="dbChangePinError" style="font-size:0.62rem; min-height:16px;"></div>
      <div id="dbLegacyStorageMigration" style="display:none;flex-direction:column;gap:6px;border-top:0.5px solid var(--card-border);padding-top:12px;">
        <div style="font-size:0.78rem;font-weight:800;color:var(--text-main);">旧文件迁移</div>
        <div style="font-size:0.68rem;line-height:1.5;color:var(--text-light);">将旧 OCR 模型、图片、文档和粘贴文件迁移到 Supabase 私有 Storage。原始数据会保留，不会删除。</div>
        <button id="dbMigrateStorageAssetsBtn" type="button" class="btn-secondary" style="height:34px;font-size:0.72rem;">迁移旧文件到 Storage</button>
        <div id="dbStorageMigrationStatus" style="font-size:0.66rem;line-height:1.5;color:var(--text-soft);min-height:16px;"></div>
      </div>
      <div style="display:flex; gap:8px; border-top:0.5px solid var(--card-border); padding-top:12px;">
        <button id="dbLogoutBtn" class="btn-secondary" style="flex:1; height:34px; font-size:0.75rem;">退出登录</button>
        <button id="dbResetAccountsBtn" style="flex:1; height:34px; background:rgba(231,76,60,0.08); border:none; box-shadow:var(--shadow-card); color:#e74c3c; border-radius:var(--radius-xs); font-size:0.72rem; font-weight:700; cursor:pointer;">重置所有账户</button>
      </div>
      <div id="dbResetAccountsError" style="font-size:0.62rem; min-height:16px; text-align:center;"></div>
    </div>

    <!-- Backup Manager Panel -->
    <div id="dbBackupMgrPanel" style="display:none; flex-direction:column; gap:14px; padding:16px; overflow-y:auto; flex:1;">
      <div style="font-size:0.85rem; font-weight:600; color:var(--text-main);">数据备份</div>
      <div style="font-size:0.72rem; color:var(--text-light); line-height:1.5;">导出所有账户的全部客户数据为 CSV 文件，通过邮件发送到指定邮箱。<br>需要配置 Resend API Key（<a href="https://resend.com" target="_blank" style="color:#4a6cf7;">resend.com</a> 免费注册，100封/天）。</div>

      <div style="display:flex;flex-direction:column;gap:6px;">
        <label style="font-size:0.72rem;font-weight:600;color:var(--text-soft);">Resend API Key</label>
        <input type="password" id="dbResendApiKey" class="auth-input" placeholder="re_xxxxxxxx" style="font-size:0.78rem;height:34px;">
      </div>
      <div style="display:flex;flex-direction:column;gap:6px;">
        <label style="font-size:0.72rem;font-weight:600;color:var(--text-soft);">发送者邮箱 (需在Resend验证)</label>
        <input id="dbBackupFromEmail" class="auth-input" placeholder="backup@yourdomain.com" style="font-size:0.78rem;height:34px;">
      </div>
      <button id="dbSaveEmailConfigBtn" class="auth-btn" style="font-size:0.78rem;padding:8px 0;">保存配置</button>
      <div id="dbEmailConfigStatus" style="font-size:0.68rem; min-height:18px;"></div>

      <div style="border-top:0.5px solid var(--separator);padding-top:14px;display:flex;flex-direction:column;gap:6px;">
        <label style="font-size:0.72rem;font-weight:600;color:var(--text-soft);">接收备份的邮箱</label>
        <input id="dbBackupEmail" class="auth-input" type="email" placeholder="your@email.com" style="font-size:0.78rem;height:34px;">
        <div style="font-size:0.68rem; color:var(--text-light); line-height:1.5;">保存配置后，该邮箱也会作为爆破密码触发时的自动备份接收邮箱。</div>
      </div>
      <button id="dbSendBackupBtn" class="auth-btn" style="font-size:0.78rem;padding:8px 0;background:#4a6cf7;color:#fff;">发送备份</button>
      <button id="dbTestBackupBtn" class="auth-btn" style="font-size:0.78rem;padding:8px 0;background:var(--btn-bg);border:none;box-shadow:var(--shadow-card);color:var(--text-main);">测试邮件（1条客户数据）</button>
      <div id="dbBackupStatus" style="font-size:0.68rem; min-height:18px; line-height:1.4;"></div>
    </div>

    <!-- Content Config Panel -->
    <div id="dbContentConfigPanel" style="display:none; flex-direction:column; gap:14px; padding:16px; overflow-y:auto; flex:1;">
      <div style="font-size:0.85rem; font-weight:900; color:var(--text-main); border-bottom:0.5px solid var(--card-border); padding-bottom:8px;">内容配置（仅主账号可编辑）</div>

      <!-- 企业微信通知配置：仅在内容配置栏目显示 -->
          <div id="dbWecomConfig" style="display:none; padding:12px 16px; border-bottom:1px solid var(--card-border); background:var(--card-bg);">
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:7px;">
              <strong style="font-size:0.78rem; color:var(--text-main);">企业微信通知配置</strong>
              <span id="dbWecomStatus" style="font-size:0.68rem; color:var(--text-soft);">检查配置中…</span>
            </div>
            <div style="display:flex; gap:7px; align-items:center; flex-wrap:wrap;">
              <input id="dbWecomWebhookInput" type="password" autocomplete="new-password" placeholder="粘贴企业微信群机器人 Webhook 地址" style="flex:1; min-width:220px; height:34px; padding:0 10px; border:1px solid var(--card-border); border-radius:5px; background:var(--btn-bg); color:var(--text-main); font-size:0.72rem;">
              <button id="dbWecomSaveBtn" class="crm-tool-btn blue" style="height:34px;">保存</button>
              <button id="dbWecomTestBtn" class="crm-tool-btn" style="height:34px;">发送测试</button>
            </div>
            <div style="font-size:0.65rem; color:var(--text-soft); margin-top:6px;">仅主账号可配置。地址保存在服务端，不会显示完整密钥，也不会提交到 GitHub。</div>
          </div>

      <!-- Reminder Config -->
      <div style="display:flex; flex-direction:column; gap:8px; background:var(--card-bg); border-radius:var(--radius-sm); padding:12px; border:0.5px solid var(--card-border);">
        <div style="font-size:0.78rem; font-weight:800; color:var(--text-main);">微信提醒弹窗</div>
        <div style="display:flex; gap:6px; align-items:center;">
          <span style="font-size:0.7rem; font-weight:600; color:var(--text-soft); white-space:nowrap;">标题</span>
          <input id="cfgReminderTitle" class="auth-input" placeholder="微信运营提醒" style="flex:1; height:28px; font-size:0.72rem;">
        </div>
        <div id="cfgReminderItems" style="display:flex; flex-direction:column; gap:4px;">
        </div>
        <div style="display:flex; gap:6px;">
          <button id="cfgReminderAddItem" class="btn-secondary" style="font-size:0.68rem; padding:4px 10px;">+ 添加条目</button>
        </div>
        <div style="display:flex; gap:8px; align-items:center;">
          <button id="cfgSaveReminder" class="btn-primary" style="font-size:0.72rem; padding:6px 16px;">保存提醒配置</button>
          <span id="cfgReminderStatus" style="font-size:0.65rem; min-height:16px;"></span>
        </div>
      </div>

      <!-- Learn Config -->
      <div style="display:flex; flex-direction:column; gap:8px; background:var(--card-bg); border-radius:var(--radius-sm); padding:12px; border:0.5px solid var(--card-border);">
        <div style="font-size:0.78rem; font-weight:800; color:var(--text-main);">学习中心</div>
        <div style="display:flex; gap:6px; align-items:center;">
          <span style="font-size:0.7rem; font-weight:600; color:var(--text-soft); white-space:nowrap;">标题</span>
          <input id="cfgLearnTitle" class="auth-input" placeholder="微信营销与账号运营完全手册" style="flex:1; height:28px; font-size:0.72rem;">
        </div>
        <div style="display:flex; gap:6px; align-items:center;">
          <span style="font-size:0.7rem; font-weight:600; color:var(--text-soft); white-space:nowrap;">副标题</span>
          <input id="cfgLearnSubtitle" class="auth-input" placeholder="加人策略 · 账号养号 · 朋友圈运营 · 客户转化 · 风控合规" style="flex:1; height:28px; font-size:0.72rem;">
        </div>
        <div style="display:flex; flex-direction:column; gap:4px;">
          <span style="font-size:0.7rem; font-weight:600; color:var(--text-soft);">正文 HTML</span>
          <textarea id="cfgLearnHtml" class="auth-input" placeholder="输入自定义HTML内容..." style="width:100%; height:200px; font-size:0.7rem; font-family:monospace; resize:vertical; padding:8px; border:0.5px solid var(--card-border); border-radius:var(--radius-xs); background:var(--card-bg); color:var(--text-main); outline:none;"></textarea>
        </div>
        <div style="display:flex; gap:8px; align-items:center;">
          <button id="cfgSaveLearn" class="btn-primary" style="font-size:0.72rem; padding:6px 16px;">保存学习中心</button>
          <button id="cfgResetLearn" class="btn-secondary" style="font-size:0.68rem; padding:6px 12px;">恢复默认</button>
          <span id="cfgLearnStatus" style="font-size:0.65rem; min-height:16px;"></span>
        </div>
      </div>
    </div>

    <!-- Upload Log Panel -->
    <div id="dbUploadLogPanel" style="display:none; flex-direction:column; gap:12px; padding:16px; overflow-y:auto; flex:1;">
      <div style="font-size:0.85rem; font-weight:900; color:var(--text-main);">上传记录</div>
      <div style="font-size:0.68rem; color:var(--text-light); font-weight:600;">客户上传/添加的历史记录（子账号仅显示本账号，主账号显示全部）</div>
      <div style="display:flex; gap:6px;">
        <button id="ulScopeDay" data-scope="day" style="flex:1; height:30px; border:none; border-radius:var(--radius-xs); font-size:0.72rem; font-weight:700; cursor:pointer; background:#07c160; color:#fff;">当天</button>
        <button id="ulScopeWeek" data-scope="week" style="flex:1; height:30px; border:none; border-radius:var(--radius-xs); font-size:0.72rem; font-weight:700; cursor:pointer; background:var(--btn-bg); color:var(--text-soft);">本周</button>
        <button id="ulScopeMonth" data-scope="month" style="flex:1; height:30px; border:none; border-radius:var(--radius-xs); font-size:0.72rem; font-weight:700; cursor:pointer; background:var(--btn-bg); color:var(--text-soft);">本月</button>
      </div>
      <div style="display:flex; align-items:center; justify-content:space-between; gap:8px;">
        <div id="ulSummary" style="flex:1; font-size:0.72rem; font-weight:700; color:var(--text-main);"></div>
        <button id="ulCopyBtn" style="flex:none; height:28px; padding:0 12px; border:none; border-radius:var(--radius-xs); font-size:0.68rem; font-weight:600; cursor:pointer; background:var(--accent-wechat); color:#fff;">复制</button>
      </div>
      <div id="ulList" style="display:flex; flex-direction:column; gap:6px; font-size:0.72rem;"></div>
    </div>

    <!-- 主账号客户补充流水 -->
    <div id="dbMasterPullLogPanel" style="display:none; flex-direction:column; gap:12px; padding:16px; overflow-y:auto; flex:1;">
      <div style="font-size:0.85rem; font-weight:900; color:var(--text-main);">主账号客户补充流水</div>
      <div style="font-size:0.68rem; color:var(--text-light); font-weight:600;">记录每次子账号从主账号客户池实际转入的数量；主账号可查看全部子账号，子账号仅查看自己的记录。</div>
      <div style="display:flex; gap:6px;">
        <button data-master-pull-scope="day" style="flex:1; height:30px; border:none; border-radius:var(--radius-xs); font-size:0.72rem; font-weight:700; cursor:pointer; background:#07c160; color:#fff;">当天</button>
        <button data-master-pull-scope="week" style="flex:1; height:30px; border:none; border-radius:var(--radius-xs); font-size:0.72rem; font-weight:700; cursor:pointer; background:var(--btn-bg); color:var(--text-soft);">本周</button>
        <button data-master-pull-scope="month" style="flex:1; height:30px; border:none; border-radius:var(--radius-xs); font-size:0.72rem; font-weight:700; cursor:pointer; background:var(--btn-bg); color:var(--text-soft);">本月</button>
      </div>
      <div id="mplSummary" style="font-size:0.72rem; font-weight:700; color:var(--text-main);"></div>
      <div id="mplList" style="display:flex; flex-direction:column; gap:6px; font-size:0.72rem;"></div>
    </div>

    <!-- Batch category mini-panel -->
    <div id="dbBatchCatPanel" style="display:none;padding:10px 16px;border-bottom:1px solid #cbd5e1;background:#f8fafc;align-items:center;gap:8px;flex-wrap:wrap;">
      <span style="font-size:12px;font-weight:700;color:#555;">给勾选客户添加类型：</span>
      <input id="dbBatchCatName" type="text" maxlength="40" placeholder="输入自定义类型名称" style="height:30px;min-width:180px;max-width:100%;box-sizing:border-box;border:1px solid #ccc;border-radius:5px;font-size:12px;padding:0 8px;">
      <button id="dbBatchCatApply" style="height:30px;padding:0 14px;background:#ff5722;color:#fff;border:none;border-radius:4px;font-size:12px;font-weight:700;cursor:pointer;">添加到类型列</button>
      <button id="dbBatchCatCancel" style="height:30px;padding:0 10px;background:#eee;color:#666;border:none;border-radius:4px;font-size:12px;cursor:pointer;">取消</button>
      <span id="dbBatchCatStatus" style="font-size:11px;color:#07c160;display:none;"></span>
    </div>

    <!-- CRM Data Table -->
    <div class="db-table-wrap">
      <table class="crm-table">
        <thead>
          <tr id="dbHeaderRow">
            <th style="width: 40px; text-align: center; cursor: default;"><input type="checkbox" id="crmSelectAll"></th>
            <th data-sort="name" style="width: 140px;">客户名称 <span class="sort-arrow"></span></th>
            <th data-sort="mobile" style="width: 160px;">联系号码 <span class="sort-arrow"></span></th>
            <th data-sort="note" style="min-width: 120px;">备注 <span class="sort-arrow"></span></th>
            <th data-sort="company_name" style="min-width: 200px;">单位 <span class="sort-arrow"></span></th>
            <th data-sort="category" style="width: 100px;">分类 <span class="sort-arrow"></span></th>
            <th style="width: 100px; cursor: default;">操作</th>
          </tr>
        </thead>
        <tbody id="dbTbody">
          <tr><td colspan="20" class="db-loading">加载中...</td></tr>
        </tbody>
      </table>
      <div class="db-empty" id="dbEmpty" style="display:none;">
        <div>暂无客户数据</div>
        <div style="font-size:0.72rem;color:#aaa;margin-top:4px;">导入客户或检查 Supabase 连接</div>
      </div>
    </div>

    <!-- CRM Footer Pager -->
    <div class="crm-pager">
      <div class="crm-pager-left" id="dbTotal">共 0 条</div>
      <div class="crm-pager-center">
        <button class="crm-pager-btn" id="dbPrev">‹ 上一页</button>
        <span id="dbPageInfo" style="font-size: 0.78rem; font-weight: 700; color: #475569; display: inline-flex; align-items: center; gap: 4px;">
          第 <input type="number" id="dbPageInput" min="1" style="width: 48px; text-align: center; height: 24px; border: 0.5px solid var(--card-border); border-radius: var(--radius-xs); font-weight: bold; background: var(--card-bg); color: var(--text-main); outline: none; margin: 0 2px;" value="1"> / <span id="dbPageTotal">1</span> 页
        </span>
        <button class="crm-pager-btn" id="dbNext">下一页 ›</button>
      </div>
      <div class="crm-pager-right">
        <select class="crm-select-page" id="dbPageSize">
          <option value="10">10条/页</option>
          <option value="30">30条/页</option>
          <option value="50" selected>50条/页</option>
          <option value="100">100条/页</option>
          <option value="300">300条/页</option>
          <option value="5000">本批全部/页</option>
        </select>
      </div>
    </div>
  </div>
</div>

<!-- ===== 手机版数据库看板（独立全屏界面） ===== -->
<div class="dbm-overlay" id="dbMobileOverlay">
  <div class="dbm-topbar">
    <button class="dbm-icon-btn" id="dbmBackBtn" title="返回"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button>
    <span class="dbm-title">客户数据库 <span id="dbmCount" style="font-size:0.68rem;color:var(--text-light);font-weight:600;"></span></span>
    <button class="dbm-icon-btn" id="dbmRefreshBtn" title="刷新"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg></button>
  </div>
  <div class="dbm-searchbar">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-light)" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.5" y2="16.5"/></svg>
    <input type="text" id="dbmSearchInput" placeholder="搜索姓名 / 号码 / 单位 / 备注" autocomplete="off">
    <button class="dbm-icon-btn" id="dbmSearchClearBtn" style="display:none;" title="清除"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
  </div>
  <div class="dbm-filterbar" id="dbmFilterBar">
    <select id="dbmCatFilter"><option value="">全部分类</option></select>
    <select id="dbmBatchFilter"><option value="">全部批次</option></select>
    <span class="dbm-selectall-label"><input type="checkbox" id="dbmSelectAll"> 全选 <span id="dbmSelectedCount" style="color:#4a6cf7;font-weight:800;">0</span></span>
  </div>
  <div class="dbm-list" id="dbmList"></div>
  <div id="dbmPager" style="display:flex;align-items:center;justify-content:center;gap:10px;padding:8px 10px;font-size:12px;color:var(--text-soft);">
    <button type="button" id="dbmPrev" class="dbm-icon-btn" style="width:auto;padding:0 10px;">‹ 上一页</button>
    <span>第 <input id="dbmPageInput" type="number" min="1" value="1" style="width:48px;text-align:center;border:1px solid var(--card-border);border-radius:6px;padding:4px;background:var(--card-bg);color:var(--text-main);"> / <b id="dbmPageTotal">1</b> 页</span>
    <button type="button" id="dbmNext" class="dbm-icon-btn" style="width:auto;padding:0 10px;">下一页 ›</button>
  </div>
  <div class="dbm-actionbar" id="dbmActionBar">
    <span class="dbm-actionbar-count" id="dbmActionBarCount">已选 0</span>
    <button class="dbm-action-btn green" id="dbmAddToDialBtn">添加到列表</button>
    <button class="dbm-action-btn" id="dbmMovePublicBtn">转公海</button>
    <button class="dbm-action-btn red" id="dbmBatchDeleteBtn">批量删除</button>
  </div>
  <!-- 管理面板容器（打开时移入桌面面板 DOM，退出时移回） -->
  <div class="dbm-mgr" id="dbmMgr" style="display:none;flex:1;overflow-y:auto;">
    <div class="dbm-mgr-tabs">
      <button class="dbm-mgr-tab active" data-mgrtab="account">账户管理</button>
      <button class="dbm-mgr-tab" data-mgrtab="backup">数据备份</button>
      <button class="dbm-mgr-tab" data-mgrtab="content">内容配置</button>
      <button class="dbm-mgr-tab" data-mgrtab="upload">上传记录</button>
      <button class="dbm-mgr-tab" data-mgrtab="masterPull">补充记录</button>
    </div>
    <div id="dbmMgrBody"></div>
  </div>
  <!-- 底部导航 -->
  <div class="dbm-bottomnav">
    <button class="dbm-nav-btn active" id="dbmNavListBtn">客户列表</button>
    <button class="dbm-nav-btn" id="dbmNavMgrBtn">管理</button>
  </div>
</div>
  <script>
  (function(){
    // Android WebView detection for full-screen spacing
    if(/Android/.test(navigator.userAgent)&&!/iPhone|iPad|iPod/.test(navigator.userAgent)){
      document.body.classList.add('android');
    }

    var isMobileDevice = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

    // 新号模式：新号每日添加上限低 → 每轮只显示 10 个客户卡片，加完冷却 20-30 分钟（普通模式 50 个、45-60 分钟）
    // 新号模式按「账号 + 当前设备」独立记录：键含账号 ID，切换账号或其他设备互不影响
    function newModeKey() { return 'dialer_new_mode:' + getOrCreateAccountId(); }
    function isNewMode() {
      try { return localStorage.getItem(newModeKey()) === '1'; } catch (e) { return false; }
    }

    // 隐私操作按设备本地时间自动切换：周一至周六 09:00-12:00、14:00-18:00、19:00-20:00 关闭，其余时间（含周日全天）开启。
    function clientInfoVisibleKey() { return 'dialer_client_info_visible:' + getOrCreateAccountId(); }
    function privacyScheduleBlock(now) {
      now = now || new Date();
      var day = now.getDay(), mins = now.getHours() * 60 + now.getMinutes();
      var ranges = [[540,720,'09-12'],[840,1080,'14-18'],[1140,1200,'19-20']];
      var dateKey = now.getFullYear() + '-' + (now.getMonth()+1) + '-' + now.getDate();
      if (day >= 1 && day <= 6) {
        for (var i = 0; i < ranges.length; i++) {
          if (mins >= ranges[i][0] && mins < ranges[i][1]) return { key: dateKey + ':' + ranges[i][2], visible: true };
        }
      }
      var boundaries = [0,540,720,840,1080,1140,1200,1440], start = 0, end = 1440;
      for (var j = 0; j < boundaries.length - 1; j++) {
        if (mins >= boundaries[j] && mins < boundaries[j+1]) { start = boundaries[j]; end = boundaries[j+1]; break; }
      }
      return { key: dateKey + ':' + start + '-' + end, visible: false };
    }
    function isClientInfoVisible() {
      try {
        var block = privacyScheduleBlock();
        var override = localStorage.getItem('dialer_privacy_override:' + getOrCreateAccountId());
        if (override) {
          var saved = JSON.parse(override);
          if (saved && saved.key === block.key) return saved.visible === true;
        }
        return block.visible;
      } catch (e) { return privacyScheduleBlock().visible; }
    }
    function syncClientInfoToggle() {
      var cb = document.getElementById('showClientInfoToggle');
      var label = document.getElementById('showClientInfoState');
      var visible = isClientInfoVisible();
      if (cb) cb.checked = !visible;
      if (label) label.textContent = !visible ? '已开启' : '已关闭';
    }
    function initPrivacySchedule() {
      var last = isClientInfoVisible();
      syncClientInfoToggle();
      window.setInterval(function() {
        var current = isClientInfoVisible();
        syncClientInfoToggle();
        if (current !== last) { last = current; renderDialCards(); }
      }, 15000);
      window.addEventListener('focus', function() {
        var current = isClientInfoVisible();
        syncClientInfoToggle();
        if (current !== last) { last = current; renderDialCards(); }
      });
      document.addEventListener('visibilitychange', function() {
        if (!document.hidden) {
          var current = isClientInfoVisible();
          syncClientInfoToggle();
          if (current !== last) { last = current; renderDialCards(); }
        }
      });
    }
    function initNewModeToggle() {
      var btn = document.getElementById('newModeToggle');
      if (!btn) return;
      var infoBtn = document.getElementById('newModeInfo');
      if (infoBtn) infoBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        alert('本机新号模式说明：\\n\\n新号模式是为了让新开的小号不要一次性添加过多客户，降低短时间内添加过于频繁的情况。\\n\\n开启后，每轮只加载 10 位客户；完成本轮后，系统会安排约 20-30 分钟冷却，再继续下一轮。\\n\\n关闭时为普通模式：每轮加载 50 位客户；完成本轮后，冷却约 45-60 分钟。\\n\\n此设置按当前账号和当前设备单独保存，不影响其他账号或设备。');
      });
      var apply = function() { var enabled = isNewMode(); btn.classList.toggle('on', enabled); var state = document.getElementById('newModeState'); if (state) state.textContent = enabled ? '已开启' : '已关闭'; };
      apply();
      btn.addEventListener('click', function() {
        localStorage.setItem(newModeKey(), isNewMode() ? '0' : '1');
        apply();
        // 切换后同步：主列表重渲染（新号 10 / 普通全部）
        if (typeof renderDialCards === 'function') renderDialCards();
        // 客户数据库列表页大小同步（新号 10 / 普通 50），用户手动调过则不覆盖
        var psSel = document.getElementById('dbPageSize');
        if (psSel && !localStorage.getItem('crm_page_size')) {
          psSel.value = isNewMode() ? '10' : '50';
        }
        // 客户数据库看板已打开时同步重渲染
        var dbmOv = document.getElementById('dbMobileOverlay');
        if (dbmOv && dbmOv.classList.contains('active') && typeof dbmRender === 'function') dbmRender();
        var dbOv = document.getElementById('dbOverlay');
        if (dbOv && dbOv.classList.contains('active') && typeof dbRenderCached === 'function') {
          DB.pageSize = parseInt((document.getElementById('dbPageSize') || {}).value || '50', 10) || 50;
          DB.page = 1;
          dbRenderCached();
        }
      });
    }

    // LocalStorage Keys
    var CLIENTS_K = 'standalone_dialer_clients';
    var DARK_K = 'standalone_dialer_dark';
    var ACCOUNT_ID_K = 'standalone_dialer_account_id';
    var ACCOUNT_LABEL_K = 'standalone_dialer_account_label';

    // Session keys (localStorage — persists across browser restarts)
    var SESS_TOKEN_K = 'dialer_sess_token';
    var SESS_AID_K = 'dialer_sess_aid';
    var SESS_MASTER_K = 'dialer_sess_master';
    var SESS_ROLE_K = 'dialer_sess_role';
    var SESS_LABEL_K = 'dialer_sess_label';
    var SESS_TS_K = 'dialer_sess_ts';

    function getSessionToken() { return localStorage.getItem(SESS_TOKEN_K) || ''; }
    function getSessionAccountId() { return localStorage.getItem(SESS_AID_K) || ''; }
    function isSessionMaster() { return localStorage.getItem(SESS_MASTER_K) === '1'; }
    function getSessionRole() { return localStorage.getItem(SESS_ROLE_K) || (isSessionMaster() ? 'master' : 'member'); }
    function isSessionManager() { return getSessionRole() === 'manager'; }
    function canManageTeam() { return isSessionMaster() || isSessionManager(); }

    // 子账号隐藏仅限主账号使用的管理栏目（桌面与手机版同步）
    function syncManagerTabVisibility() {
      var master = isSessionMaster();
      var desktopBackup = document.querySelector('.crm-tab[data-tab="backupMgr"]');
      var desktopContent = document.querySelector('.crm-tab[data-tab="contentConfig"]');
      var mobileBackup = document.querySelector('.dbm-mgr-tab[data-mgrtab="backup"]');
      var mobileContent = document.querySelector('.dbm-mgr-tab[data-mgrtab="content"]');
      [desktopBackup, desktopContent, mobileBackup, mobileContent].forEach(function(tab) {
        if (tab) tab.style.display = master ? '' : 'none';
      });
      // 批量删除仅主账号可见：桌面工具栏与手机版底部操作栏同步控制
      var desktopBatchDelete = document.getElementById('crmBatchDeleteBtn');
      var mobileBatchDelete = document.getElementById('dbmBatchDeleteBtn');
      if (desktopBatchDelete) desktopBatchDelete.style.display = master ? '' : 'none';
      if (mobileBatchDelete) mobileBatchDelete.style.display = master ? '' : 'none';
      // 若子账号当前停留在受限栏目，自动切回首页/账户管理，避免隐藏后仍停留在空白面板
      if (!master) {
        var activeDesktop = document.querySelector('.crm-tab.active');
        if (activeDesktop && (activeDesktop.getAttribute('data-tab') === 'backupMgr' || activeDesktop.getAttribute('data-tab') === 'contentConfig')) {
          var homeTab = document.querySelector('.crm-tab[data-tab="all"]');
          if (homeTab) homeTab.click();
        }
        if (_dbmActiveTab === 'backup' || _dbmActiveTab === 'content') _dbmActiveTab = 'account';
      }
    }
    function getSessionLabel() { return localStorage.getItem(SESS_LABEL_K) || ''; }
    // 设备标识：每台设备（浏览器）持久化一个 ID，冷却倒计时按设备各走各的（两台手机互不影响）
    var DEVICE_ID_K = 'bhp_device_id';
    function getDeviceId() {
      try {
        var id = localStorage.getItem(DEVICE_ID_K);
        if (!id) {
          id = (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : ('dev_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 10));
          localStorage.setItem(DEVICE_ID_K, id);
        }
        return id;
      } catch (e) {
        return 'dev_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 10);
      }
    }

    function sendDeviceHeartbeat() {
      var token=getSessionToken(); if(!token) return;
      var ua=(navigator.userAgent||'').toLowerCase();
      var deviceType=ua.indexOf('iphone')>=0||ua.indexOf('ipad')>=0||ua.indexOf('ipod')>=0?'iOS':(ua.indexOf('android')>=0?'Android':(ua.indexOf('windows')>=0?'Windows':(ua.indexOf('macintosh')>=0?'macOS':'桌面设备')));
      var browser=ua.indexOf('edg/')>=0?'Edge':(ua.indexOf('crios')>=0||ua.indexOf('chrome')>=0?'Chrome':(ua.indexOf('fxios')>=0||ua.indexOf('firefox')>=0?'Firefox':(ua.indexOf('safari')>=0?'Safari':'其他浏览器')));
      var deviceName=(navigator.platform||'设备')+' · '+(ua.indexOf('mobile')>=0||ua.indexOf('android')>=0||ua.indexOf('iphone')>=0||ua.indexOf('ipad')>=0?'移动浏览器':'桌面浏览器');
      fetch('/api/dialer/auth/heartbeat',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},body:JSON.stringify({device_id:getDeviceId(),device_name:deviceName,device_type:deviceType,browser:browser})})
        .then(function(r){if(r.status===401){clearSession();showAuthScreen();}}).catch(function(){});
    }
    if(!window._bhpDeviceHeartbeatTimer){sendDeviceHeartbeat();window._bhpDeviceHeartbeatTimer=setInterval(sendDeviceHeartbeat,60000);}

    function saveSession(acct) {
      localStorage.setItem(SESS_TOKEN_K, acct.session_token || '');
      localStorage.setItem(SESS_AID_K, acct.account_id || '');
      localStorage.setItem(SESS_MASTER_K, acct.is_master ? '1' : '0');
      localStorage.setItem(SESS_ROLE_K, acct.role || (acct.is_master ? 'master' : 'member'));
      localStorage.setItem(SESS_LABEL_K, acct.label || '');
      localStorage.setItem(SESS_TS_K, Date.now().toString());
      sendDeviceHeartbeat();
    }

    // WeChat count tracking (like megz daily work)
    var WECHAT_COUNT_K = 'dialer_wechat_count';
    function getWechatCountMap() {
      try {
        var raw = localStorage.getItem(WECHAT_COUNT_K);
        return raw ? JSON.parse(raw) : {};
      } catch(e) { return {}; }
    }
    function saveWechatCountMap(map) {
      localStorage.setItem(WECHAT_COUNT_K, JSON.stringify(map));
    }
    var _wcCacheNum = 0;
    var _wcCacheDate = '';

    function getTodayStr() {
      var d = new Date();
      return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    }
    function modWechatCount(delta) {
      var today = getTodayStr();
      var token = getSessionToken();
      if (!token) return;
      // Optimistic local update
      _wcCacheNum = Math.max(_wcCacheNum + delta, 0);
      _wcCacheDate = today;
      updateAllWcDisplays();
      // Sync to server
      fetch('/api/dialer/wechat/count', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        body: JSON.stringify({ delta: delta, date: today })
      }).then(function(r) { return r.json(); })
        .then(function(res) {
          _wcCacheNum = res.count || _wcCacheNum;
          _wcCacheDate = today;
          updateAllWcDisplays();
        })
        .catch(function() {
          // Fallback: save to localStorage
          var map = getWechatCountMap();
          map[today] = _wcCacheNum;
          saveWechatCountMap(map);
        });
      // Also save locally
      var map = getWechatCountMap();
      map[today] = _wcCacheNum;
      saveWechatCountMap(map);
    }

    function updateAllWcDisplays() {
      var loginNum = document.getElementById('authWcNum');
      var lockNum = document.getElementById('lockWcNum');
      if (loginNum) loginNum.textContent = _wcCacheNum;
      if (lockNum) lockNum.textContent = _wcCacheNum;
    }

    function clearSession() {
      localStorage.removeItem(SESS_TOKEN_K);
      localStorage.removeItem(SESS_AID_K);
      localStorage.removeItem(SESS_MASTER_K);
      localStorage.removeItem(SESS_ROLE_K);
      localStorage.removeItem(SESS_LABEL_K);
      localStorage.removeItem(SESS_TS_K);
    }

    // getOrCreateAccountId: priority: localStorage > localStorage > new
    function getOrCreateAccountId() {
      var sid = getSessionAccountId();
      if (sid) return sid;
      var id = localStorage.getItem(ACCOUNT_ID_K);
      if (!id) {
        id = 'acct_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 6);
        localStorage.setItem(ACCOUNT_ID_K, id);
      }
      return id;
    }
    function getAccountLabel() {
      var sl = getSessionLabel();
      if (sl) return sl;
      return localStorage.getItem(ACCOUNT_LABEL_K) || '';
    }
    function setAccountLabel(l) { localStorage.setItem(ACCOUNT_LABEL_K, l); }

    // 刷新右上角账户名后的在库客户数（Supabase 精确计数：account_id 归属即算在库，转公海/导入/轮询时调用）
    function refreshAccountDataCount() {
      var cd = document.getElementById('accountDataCount');
      if (!cd) return;
      fetch('/api/dialer/stats/my-count')
        .then(function(r) { return r.json(); })
        .then(function(res) {
          // 恒显数量（含 0），避免"不显示"造成误解
          cd.textContent = (typeof res.count === 'number' && res.count >= 0) ? String(res.count) : '';
        })
        .catch(function() {});
    }

    function updateAccountDisplay() {
      var d = document.getElementById('accountDisplay');
      if (!d) return;
      var id = getOrCreateAccountId();
      var label = getAccountLabel();
      d.textContent = label ? '[' + label + ']' : '[' + id.slice(0, 10) + ']';
      var typeTag = isSessionMaster() ? ' [主账户]' : (getSessionAccountId() ? ' [子账户]' : '');
      d.title = '账户: ' + id + (label ? ' (' + label + ')' : '') + typeTag;
      // 账号变化后刷新新号模式开关（状态按账号独立记录，不跨账号/设备继承）
      var ntb = document.getElementById('newModeToggle');
      if (ntb) { var enabled = isNewMode(); ntb.classList.toggle('on', enabled); var state = document.getElementById('newModeState'); if (state) state.textContent = enabled ? '已开启' : '已关闭'; }
      // Fetch DB count for this account
      refreshAccountDataCount();
    }

    // Monkey-patch fetch to inject Authorization header
    (function() {
      var _origFetch = window.fetch;
      window.fetch = function(url, opts) {
        var token = getSessionToken();
        if (token && typeof url === 'string' && url.indexOf('/api/dialer/') !== -1) {
          opts = opts || {};
          opts.headers = opts.headers || {};
          opts.headers['Authorization'] = 'Bearer ' + token;
          if (_viewAccountId && url.indexOf('/api/dialer/auth/') === -1) {
            opts.headers['X-View-Account-Id'] = _viewAccountId;
          }
        }
        return _origFetch.call(window, url, opts);
      };
    })();

    // State Variables
    var importedClients = [];
    var currentCallIdx = -1;
    var callInterval = null;
    var callSeconds = 0;
    var currentFilter = 'all';
    var currentPage = 1;
    var whitelistCompanies = [];
    var whitelistCheckResults = null;
    var whitelistLoaded = false;
    var pageSize = 100;
    var currentSort = 'default';

    // 待拨打添加历史记录 - 防止10天内重复添加到待拨打
    var ADD_HISTORY_K = 'standalone_dialer_add_history';
    var ADD_COOLDOWN_MS = 10 * 24 * 60 * 60 * 1000; // 10天冷却期（与服务端一致）

    function getAddHistory() {
      try {
        var raw = localStorage.getItem(ADD_HISTORY_K);
        return raw ? JSON.parse(raw) : {};
      } catch (e) { return {}; }
    }

    function saveAddHistory(history) {
      // 清理超过10天的旧记录，避免存储膨胀
      var now = Date.now();
      var cleaned = {};
      var keys = Object.keys(history);
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        if (now - new Date(history[k]).getTime() < ADD_COOLDOWN_MS) {
          cleaned[k] = history[k];
        }
      }
      localStorage.setItem(ADD_HISTORY_K, JSON.stringify(cleaned));
      return cleaned;
    }

    function canAddToDialList(mobile) {
      if (!mobile) return false;
      var history = getAddHistory();
      var ts = history[mobile];
      if (!ts) return true;
      var elapsed = Date.now() - new Date(ts).getTime();
      return elapsed >= ADD_COOLDOWN_MS;
    }

    function recordAddToDialList(mobile) {
      if (!mobile) return;
      var history = getAddHistory();
      history[mobile] = new Date().toISOString();
      saveAddHistory(history);
    }

    function getCooldownRemaining(mobile) {
      if (!mobile) return null;
      var history = getAddHistory();
      var ts = history[mobile];
      if (!ts) return null;
      var elapsed = Date.now() - new Date(ts).getTime();
      var remaining = ADD_COOLDOWN_MS - elapsed;
      if (remaining <= 0) return null;
      var days = Math.floor(remaining / 86400000);
      var hours = Math.floor((remaining % 86400000) / 3600000);
      if (days > 0) return days + '天' + hours + '小时';
      return hours + '小时' + Math.floor((remaining % 3600000) / 60000) + '分钟';
    }
    var _toastTimer = null;
    function showCopyLimitToast(msg, isWarn) {
      var toast = document.getElementById('copyLimitToast');
      if (!toast) return;
      toast.textContent = msg;
      toast.className = 'copy-limit-toast';
      if (isWarn) toast.classList.add('warn');
      // Force reflow
      void toast.offsetWidth;
      toast.classList.add('show');
      if (_toastTimer) clearTimeout(_toastTimer);
      _toastTimer = setTimeout(function() {
        toast.classList.remove('show');
      }, 4000);
    }
    var _checkTimer = null;
    function showCheckToast() {
      var el = document.getElementById('checkToast');
      if (!el) return;
      if (_checkTimer) clearTimeout(_checkTimer);
      el.classList.add('show');
      _checkTimer = setTimeout(function() {
        el.classList.remove('show');
      }, 1200);
    }

    // Reminder: 30-minute popup with WeChat operation tips
    var _reminderShown = false;
    window._reminderTimer = null;
    var _reminderSeqTimer = null;

    // 只统计本轮前 50 位（新号前 10 位）：操作到对应位置，且该区间操作率达到 80% 才触发自动转公海。
    // 普通模式必须到第 50 位；新号模式必须到第 10 位。中间允许少量客户未操作。
    // 页面不可见时暂停倒计时，返回后按同一位置和比例条件重新检查。
    var _pendingReminderClient = null;
    function scheduleReminder(client) {
      if (_reminderShown) return;
      if (!client) return;
      var roundSize = isNewMode() ? 10 : 50;
      // 每次姓名/单位/备注复制后都检查本轮前 50/10 位；
      // 不依赖触发复制的客户恰好是数组最后一位，避免排序、筛选或先后操作导致漏触发。
      if (importedClients.length < roundSize) return;
      var roundClients = importedClients.slice(0, roundSize);
      var qualifiedCount = roundClients.filter(function(c) { return c.name_copied || c.company_copied || c.note_copied; }).length;
      var requiredCount = Math.ceil(roundSize * 0.8);
      if (qualifiedCount < requiredCount) return;
      window._roundTransferBlocked = true;
      _pendingReminderClient = client;
      if (document.hidden) return; // 不在页面时等待 visibilitychange 重新触发
      if (_reminderSeqTimer) clearTimeout(_reminderSeqTimer);
      _reminderSeqTimer = setTimeout(function() {
        _reminderSeqTimer = null;
        if (document.hidden) return; // 倒计时结束时仍不在页面：放弃本次，回到页面后重新计时
        _reminderShown = true;
        try {
          checkAndTransferBatch(client); // 先完成本轮（清列表+转公海+轮次+1），弹窗再展示最新轮次
        } catch (e) {
          // 任何异常都不能中断主链路：否则 _reminderShown 卡死，后续轮次永远不再触发
          console.error('[round] checkAndTransferBatch failed:', e);
        }
        showReminderOverlay();
      }, 4000);
    }
    document.addEventListener('visibilitychange', function() {
      if (document.hidden) return;
      renderHeaderRoundCd(); // 回到页面立即按时间戳重算，倒计时不因锁屏/切后台/刷新而重置
      if (_pendingReminderClient && !_reminderShown) {
        scheduleReminder(_pendingReminderClient); // 从微信返回后按姓名/单位复制人数重新检查并继续倒计时
      }
    });

    // Wire dismiss button to clear countdown + seq timer
    (function() {
      var dismissBtn = document.getElementById('reminderDismiss');
      if (dismissBtn) {
        dismissBtn.addEventListener('click', function() {
          if (window._reminderTimer) { clearInterval(window._reminderTimer); window._reminderTimer = null; }
          if (_reminderSeqTimer) { clearTimeout(_reminderSeqTimer); _reminderSeqTimer = null; }
          _pendingReminderClient = null; // 已手动关闭：回到页面也不重新触发
          _reminderShown = false; // 允许下一轮（第2轮起）再次触发提醒
        });
      }
    })();

    // Dark Mode Control (3-state: light / dark / auto)
    function initDark() {
      var btn = document.getElementById('darkToggleBtn');
      var autoMql = null;
      var applyTheme = function(mode) {
        var isDark = mode === 'auto' ? window.matchMedia('(prefers-color-scheme: dark)').matches : mode === 'dark';
        if (isDark) {
          document.body.classList.add('dark-mode');
        } else {
          document.body.classList.remove('dark-mode');
        }
        // 强制同步数据库看板搜索区域主题，避免局部样式/内联样式残留白底
        var syncDbSearchTheme = function() {
          var card = document.querySelector('#dbOverlay .crm-search-card');
          if (!card) return;
          var set = function(el, prop, value) {
            if (el) el.style.setProperty(prop, value, 'important');
          };
          if (isDark) {
            set(card, 'background', '#1b212a');
            set(card, 'background-color', '#1b212a');
            set(card, 'border-color', '#303946');
            card.querySelectorAll('.crm-search-grid, .crm-search-item, .crm-search-item-full, .crm-search-actions').forEach(function(el) {
              set(el, 'background', '#1b212a');
              set(el, 'background-color', '#1b212a');
              set(el, 'box-shadow', 'none');
            });
            card.querySelectorAll('#dbFuzzySearch, .crm-input').forEach(function(el) {
              set(el, 'background', '#252d38');
              set(el, 'background-color', '#252d38');
              set(el, 'color', '#d0d7e1');
              set(el, 'border-color', '#3a4553');
              set(el, 'box-shadow', 'none');
            });
            card.querySelectorAll('.crm-search-label').forEach(function(el) { set(el, 'color', '#aeb8c6'); });
            card.querySelectorAll('.crm-btn-search').forEach(function(el) {
              set(el, 'background', '#35404e');
              set(el, 'background-color', '#35404e');
              set(el, 'color', '#d0d8e2');
              set(el, 'border-color', '#465363');
              set(el, 'box-shadow', 'none');
            });
          } else {
            [card].concat(Array.prototype.slice.call(card.querySelectorAll('*'))).forEach(function(el) {
              ['background','background-color','color','border-color','box-shadow'].forEach(function(prop) {
                el.style.removeProperty(prop);
              });
            });
          }
        };
        syncDbSearchTheme();
        var themeMeta = document.querySelector('meta[name="theme-color"]');
        if (themeMeta) themeMeta.content = isDark ? '#1c1c1e' : '#f2f2f7';
      };
      var updateDarkTitle = function() {
        if (!btn) return;
        var m = localStorage.getItem(DARK_K) || 'auto';
        var labels = {light: '浅色模式', dark: '深色模式', auto: '自动模式'};
        btn.textContent = labels[m] || '自动模式';
      };
      var mode = localStorage.getItem(DARK_K);
      if (mode === 'true') { mode = 'dark'; localStorage.setItem(DARK_K, 'dark'); }
      else if (mode === 'false' || !mode) { mode = 'auto'; localStorage.setItem(DARK_K, 'auto'); }
      else if (mode !== 'light' && mode !== 'dark' && mode !== 'auto') { mode = 'auto'; localStorage.setItem(DARK_K, 'auto'); }
      applyTheme(mode);
      if (mode === 'auto') {
        autoMql = window.matchMedia('(prefers-color-scheme: dark)');
        autoMql.addEventListener('change', function() {
          if (localStorage.getItem(DARK_K) === 'auto') applyTheme('auto');
        });
      }
      updateDarkTitle();
      if (btn) {
        btn.addEventListener('click', function() {
          var cur = localStorage.getItem(DARK_K) || 'auto';
          var next = {light: 'dark', dark: 'auto', auto: 'light'};
          var nm = next[cur] || 'auto';
          localStorage.setItem(DARK_K, nm);
          applyTheme(nm);
          updateDarkTitle();
          if (nm === 'auto' && !autoMql) {
            autoMql = window.matchMedia('(prefers-color-scheme: dark)');
            autoMql.addEventListener('change', function() {
              if (localStorage.getItem(DARK_K) === 'auto') applyTheme('auto');
            });
          }
        });
      }
    }


    // Helper functions
    function esc(s) {
      if (!s) return '';
      return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    // 判断是否为自动生成的时间戳批次名（如 "导入-2026-06-22 04:40:56"）
    function isAutoBatchLabel(label) {
      if (!label) return true;
      return label.indexOf('导入-') === 0;
    }

    // 返回可显示的批次名，自动生成的时间戳返回空
    function displayBatchLabel(label) {
      return isAutoBatchLabel(label) ? '' : label;
    }

    // Cross-platform WeChat jump
    var isAndroid = /Android/.test(navigator.userAgent) && !/iPhone|iPad|iPod/.test(navigator.userAgent);
    // 鸿蒙（华为自研 WebView 内核不解析 Android intent:// scheme）
    var isHarmonyOS = /HarmonyOS|HMSCore|HUAWEI/.test(navigator.userAgent);
    function jumpToWechat() {
      if (isAndroid && !isHarmonyOS) {
        // Android (Chrome/Chromium WebView): intent:// scheme
        window.location.href = 'intent://#Intent;scheme=weixin;package=com.tencent.mm;end';
      } else {
        // iOS / 鸿蒙: weixin:// scheme（必须在点击同步栈内调用，setTimeout 脱离手势会被拦截）
        window.location.href = 'weixin://';
      }
    }

    function copyTextToClipboard(text) {
      if (isHarmonyOS) {
        // 鸿蒙 WebView：异步 clipboard IPC 在 scheme 跳转页面失焦时被拒（实测剪贴板为空），
        // execCommand 同步完成，保证「复制 → 跳转」同栈先后执行
        syncCopy(text);
        return;
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(function() {
          syncCopy(text);
        });
      } else {
        syncCopy(text);
      }
    }

    // 复制内容偏好：点卡片「单位名称」时复制的组合（更多 → 账户名 → 弹窗勾选）
    // 自由组合：勾选哪个要素就包含哪个，顺序 = 勾选先后（先勾的排前面）
    var COPY_PREF_K = 'copy_pref_v1';
    var COPY_FIELDS = [
      { key: 'name', label: '姓名' },
      { key: 'phone', label: '手机号' },
      { key: 'company', label: '单位名称' },
      { key: 'fund', label: '公积金' },
      { key: 'date', label: '日期' }
    ];
    function getCopyPref() {
      try {
        var p = JSON.parse(localStorage.getItem(COPY_PREF_K) || 'null');
        if (p && typeof p === 'object') {
          var order = [];
          if (Array.isArray(p.order)) {
            order = p.order.slice();
          } else if (typeof p.name === 'boolean') {
            // 兼容旧版布尔格式：按固定顺序转换
            if (p.name) order.push('name');
            if (p.company) order.push('company');
            if (p.fund) order.push('fund');
            if (p.date) order.push('date');
          }
          // 去重 + 过滤非法要素
          var valid = {};
          for (var fi = 0; fi < COPY_FIELDS.length; fi++) valid[COPY_FIELDS[fi].key] = true;
          var uniq = [];
          var seen = {};
          for (var oi = 0; oi < order.length; oi++) {
            var k = order[oi];
            if (valid[k] && !seen[k]) { seen[k] = true; uniq.push(k); }
          }
          // 姓名必选：存储异常/旧数据缺姓名时补到最前
          if (uniq.indexOf('name') === -1) uniq.unshift('name');
          return { order: uniq };
        }
      } catch (e) {}
      return { order: ['name', 'company'] };
    }
    function saveCopyPref(p) {
      try { localStorage.setItem(COPY_PREF_K, JSON.stringify(p)); } catch (e) {}
    }
    // 日期：固定年月日格式，用全角方括号 ［ ］ 与公积金隔开（YY-MM-DD → ［26-08-14］）
    function formatCopyDate() {
      var d = new Date();
      var pad = function(n) { return n < 10 ? '0' + n : String(n); };
      var yy = String(d.getFullYear()).slice(-2);
      var mm = pad(d.getMonth() + 1);
      var dd = pad(d.getDate());
      return '［' + yy + '-' + mm + '-' + dd + '］';
    }
    // 按偏好拼装复制文本：按勾选顺序输出要素（勾选哪个就包含哪个，先勾的在前）
    function buildCopyText(client) {
      var p = getCopyPref();
      var values = {
        name: (client && client.name && client.name !== '-') ? String(client.name).trim() : '',
        phone: (client && (client.phone || client.mobile)) ? String(client.phone || client.mobile).trim() : '',
        company: (client && client.company) ? String(client.company).trim() : '',
        fund: (client && client.fund) ? '公积金' + String(client.fund).trim() : '',
        date: formatCopyDate()
      };
      var parts = [];
      for (var bi = 0; bi < p.order.length; bi++) {
        var bk = p.order[bi];
        if (values[bk]) parts.push(values[bk]);
      }
      return parts.join(' ');
    }

    function syncCopy(text) {
      var textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      var ok = false;
      try {
        ok = document.execCommand('copy');
      } catch (err) {
        console.error('Copy failed:', err);
      }
      document.body.removeChild(textarea);
      if (!ok) {
        // execCommand 不可用时异步兜底；页面即将跳转失焦，仅尽力而为
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).catch(function() {
            showCopyLimitToast('复制失败，请长按手动复制', true);
          });
        } else {
          showCopyLimitToast('复制失败，请长按手动复制', true);
        }
      }
    }

    // 记录客户操作时间线（最新覆盖）
    function recordTimeline(mobile, type, detail) {
      if (!mobile) return;
      var payload = {
        mobile: mobile,
        date: todayLocalStr(),
        entry: {
          type: type,
          ts: new Date().toISOString(),
          detail: (detail || '').slice(0, 200)
        }
      };
      // 同步更新内存中的 importedClients
      for (var i = 0; i < importedClients.length; i++) {
        var c = importedClients[i];
        if ((c.phone || c.mobile) === mobile) {
          c.last_operation = payload.entry;
          break;
        }
      }
      // CRM 表格共用同一份最近操作状态，添加/拨打后立即更新当前行。
      if (typeof DB !== 'undefined' && DB && Array.isArray(DB.allData)) {
        var dbClient = DB.allData.find(function(item) { return String(item.mobile || item.phone || '') === String(mobile); });
        if (dbClient) dbClient.last_operation = payload.entry;
      }
      // 时间线接口受中央登录门禁保护：显式携带会话与当前视图账户，不能依赖全局 fetch 包装器补充认证。
      var timelineHeaders = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getSessionToken()
      };
      // 主账户查看子账户时，统计必须写入当前视图账户，避免计数落到主账户。
      if (_viewAccountId) timelineHeaders['X-View-Account-Id'] = _viewAccountId;
      return fetch('/api/dialer/timeline', {
        method: 'POST',
        headers: timelineHeaders,
        body: JSON.stringify(payload)
      }).then(function(r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      }).then(function(res) {
        if (!res || !res.success) throw new Error((res && res.error) || '时间线写入失败');
        _todayOperatedCustomers = Number(res.operated_count) || 0;
        _todayDialedCustomers = Number(res.dialed_count) || 0;
        renderDrawer();
        return res;
      }).catch(function(err) {
        console.warn('[timeline] record failed:', err);
        return null;
      });
    }

    // 仅当云端确认整批客户均已接通或未接通时，才删除自动清理批次
    var _autoDeleteBatchChecks = {};
    function checkAutoDeleteBatch(batchLabel) {
      if (!batchLabel || _autoDeleteBatchChecks[batchLabel]) return _autoDeleteBatchChecks[batchLabel] || Promise.resolve(null);
      var task = fetch('/api/dialer/batches/auto-delete-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ batch_label: batchLabel })
      }).then(function(r) { return r.json(); }).then(function(res) {
        if (res && res.success && res.deleted) {
          importedClients = importedClients.filter(function(c) { return String(c.batch_label || '') !== String(batchLabel); });
          saveState();
          renderDialCards();
          updateStats();
          refreshAccountDataCount();
          var dbOverlayForCleanup = document.getElementById('dbOverlay');
          if (dbOverlayForCleanup && dbOverlayForCleanup.classList.contains('active')) {
            dbFetch();
            if (isSessionMaster()) loadAccountStats();
          }
          showCopyLimitToast('本批次 ' + (res.count || 0) + ' 位客户已全部拨打完成，已自动彻底删除（未进入公海）', true);
        } else if (res && !res.success) {
          console.error('[auto-delete-batch] check failed:', res.error || 'unknown');
        }
        return res;
      }).catch(function(err) {
        console.error('[auto-delete-batch] request failed:', err);
        return null;
      }).then(function(res) {
        delete _autoDeleteBatchChecks[batchLabel];
        return res;
      });
      _autoDeleteBatchChecks[batchLabel] = task;
      return task;
    }

    // 操作记录格式化显示
    var TimelineDisplay = {
      typeLabels: {
        'copy_phone': '已复制号码',
        'copy_name': '已复制姓名',
        'copy_company': '已复制公司',
        'copy_note': '已复制备注',
        'dial': '已拨打电话',
        'call_success': '通话成功',
        'call_failed': '未接通'
      },
      typeIcons: {
        'copy_phone': '',
        'copy_name': '',
        'copy_company': '',
        'copy_note': '',
        'dial': '',
        'call_success': '',
        'call_failed': ''
      },
      formatTime: function(ts) {
        if (!ts) return '';
        var d = new Date(ts);
        if (isNaN(d.getTime())) return ts;
        var now = new Date();
        var diffMs = now - d;
        var diffMin = Math.floor(diffMs / 60000);
        if (diffMin < 1) return '刚刚';
        if (diffMin < 60) return diffMin + '分钟前';
        var diffHour = Math.floor(diffMin / 60);
        if (diffHour < 24) return diffHour + '小时前';
        var month = String(d.getMonth() + 1).padStart(2, '0');
        var day = String(d.getDate()).padStart(2, '0');
        var hour = String(d.getHours()).padStart(2, '0');
        var min = String(d.getMinutes()).padStart(2, '0');
        return month + '-' + day + ' ' + hour + ':' + min;
      },
      render: function(op) {
        if (!op || !op.type) return '';
        var icon = this.typeIcons[op.type] || '';
        var label = this.typeLabels[op.type] || op.type;
        var timeStr = this.formatTime(op.ts);
        return icon + ' ' + label + ' <span style="font-size:0.5rem;color:var(--text-light);">' + timeStr + '</span>';
      }
    };

    function maskPhone(p) {
      if (!p) return '';
      var s = String(p).trim();
      var digits = s.replace(/\D/g, '');
      if (digits.length <= 6) return s;
      return digits.slice(0, 3) + '*'.repeat(digits.length - 6) + digits.slice(-3);
    }

    function cleanPhone(val) {
      if (!val) return '';
      var s = String(val).trim().replace(/[^\\d+]/g, '');
      if (s.indexOf('+86') === 0) return s.slice(3);
      if (s.indexOf('86') === 0 && s.length === 13) return s.slice(2);
      return s;
    }

    function isPhone(val) {
      var clean = cleanPhone(val);
      return /^1[3-9]\\d{9}$/.test(clean);
    }

    function nameScore(val) {
      if (!val) return 0;
      var s = String(val).trim();
      if (isPhone(s)) return 0;
      if (/^\\d+$/.test(s)) return 0;
      
      // Common Chinese Surnames Regex
      var surnameRegex = /^[王李张刘陈杨黄赵吴周徐孙马朱胡郭何林罗高郑梁谢宋唐董许韩邓冯曹彭曾萧田庄潘袁于叶余魏蒋田杜丁沈姜范江傅钟卢汪戴崔]/;
      
      if (/^[\\u4e00-\\u9fa5]{2,4}$/.test(s)) {
        if (surnameRegex.test(s)) {
          return 25; // Highly weigh standard Chinese names with common surnames
        }
        return 10;
      }
      if (/^[\\u4e00-\\u9fa5]{2,6}$/.test(s)) return 5;
      if (/^[A-Za-z\\s]{2,15}$/.test(s)) return 3;
      if (s.length >= 2 && s.length <= 15) return 1;
      return 0;
    }

    function decodeQPUtf8(s) {
      var t = s.replace(/=\\r?\\n/g, '');
      var b = [];
      var i = 0;
      while (i < t.length) {
        if (t[i] === '=' && i + 2 < t.length && /[0-9A-Fa-f]{2}/.test(t.slice(i+1,i+3))) {
          b.push(parseInt(t.slice(i+1,i+3), 16));
          i += 3;
        } else {
          b.push(t.charCodeAt(i));
          i++;
        }
      }
      try { return new TextDecoder('utf-8').decode(new Uint8Array(b)); } catch(e) { return s; }
    }

    // Persist and load state
    // 刷新时修复旧版 OCR 将「单位/机构名称」误放进备注的情况。
    // 仅处理单位字段为空、备注整体符合机构名称格式且尾部没有自然语言说明的记录，避免误改普通备注。
    function repairLegacyNoteCompanyFields(clients) {
      if (!Array.isArray(clients)) return 0;
      var repaired = 0;
      var orgSuffix = /(?:公司|有限公司|股份有限公司|集团|企业|工厂|医院|银行|学校|大学|学院|幼儿园|小学|中学|公署|工务署|文化宫|文化馆|工会|委员会|管理局|管理处|办事处|街道办|政务服务中心|服务中心|事务中心|公共服务中心|派出所|分局|税务局|公安局|财政局|人社局|研究院|研究所|实验室|局|院|所|部|中心|厂|处|会|队|站)$/;
      clients.forEach(function(c) {
        if (!c || String(c.company || c.company_name || '').trim()) return;
        var note = String(c.note || '').trim();
        if (!note || note.length > 50) return;
        // 允许 OCR 常见的括号备注标记，如「（养）」；单位主体必须以明确机构后缀结尾。
        var markerMatch = note.match(/([（(][^）)]{1,8}[）)])$/);
        var marker = markerMatch ? markerMatch[1] : '';
        var candidate = marker ? note.slice(0, -marker.length).trim() : note;
        if (!candidate || !/[\u4e00-\u9fff]/.test(candidate) || !orgSuffix.test(candidate)) return;
        c.company = candidate;
        c.company_name = candidate;
        // 保留原备注中的括号标记，不把「（养）」等附加信息丢掉。
        c.note = marker;
        repaired++;
      });
      return repaired;
    }

    function loadPersistedState() {
      try {
        var saved = localStorage.getItem(CLIENTS_K);
        if (saved) {
          importedClients = JSON.parse(saved);
          if (importedClients.length > 0) {
            // 自动纠正历史 OCR 把完整单位名称误放入备注的记录；仅本地规则高置信命中才修改。
            var repairedNoteCompanies = repairLegacyNoteCompanyFields(importedClients);
            if (repairedNoteCompanies > 0) saveState();
            updateDashboardVisibility(true);
            renderDialCards();
          }
        }
      } catch (err) {
        console.error('Failed to load state:', err);
      }
    }

    function saveState() {
      try {
        localStorage.setItem(CLIENTS_K, JSON.stringify(importedClients));
      } catch (err) {
        console.error('Failed to save state:', err);
      }
    }

    // 本轮达到阈值后锁定换批；只有云端确认全部转入公海并自动清空，或用户手动清空，才解除锁定。
    window._roundTransferBlocked = false;
    window._roundTransferPending = false;

    // 操作满一轮：累计复制过姓名或单位名称的不同客户达到阈值后转公海。
    function checkAndTransferBatch(client) {
      if (!client || window._roundTransferPending || !window._roundTransferBlocked) return;
      // 与 scheduleReminder 保持同一轮次边界：普通模式前 50 位，新号模式前 10 位。
      // 不得把后续轮次中提前操作的客户一并转入公海。
      var roundSize = isNewMode() ? 10 : 50;
      var roundClients = importedClients.slice(0, roundSize);
      var operatedClients = roundClients.filter(function(c) {
        return c.name_copied || c.company_copied || c.note_copied;
      });
      if (operatedClients.length === 0) return;

      var mobiles = [];
      var mobileSet = {};
      var missingMobileCount = 0;
      for (var k = 0; k < operatedClients.length; k++) {
        var m = String(operatedClients[k].phone || operatedClients[k].mobile || '').trim();
        if (!m) {
          missingMobileCount++;
          continue;
        }
        if (!mobileSet[m]) { mobiles.push(m); mobileSet[m] = true; }
      }
      // 不允许只转走有手机号的部分客户：否则客户端会把这一轮误判为完整成功，
      // 无手机号的已操作客户会残留在列表并污染下一轮的 50/10 人边界。
      if (missingMobileCount > 0 || !mobiles.length) {
        _reminderShown = false;
        _pendingReminderClient = null;
        showCopyLimitToast(
          missingMobileCount > 0
            ? '本轮有 ' + missingMobileCount + ' 位已操作客户缺少有效手机号，未转入公海；请补齐手机号或手动清空本轮'
            : '本轮客户缺少有效手机号，未能转入公海；请检查手机号后重试',
          true
        );
        return;
      }

      window._roundTransferPending = true;
      console.log('[auto-transfer] 本轮已操作 ' + operatedClients.length + ' 人, 正在转入公海...');
      var autoTransferToken = getSessionToken();
      if (!autoTransferToken) {
        window._roundTransferPending = false;
        _reminderShown = false;
        showCopyLimitToast('登录状态已失效，自动转公海未执行；请重新登录后重试', true);
        return;
      }
      var autoTransferHeaders = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + autoTransferToken
      };
      // 主账户查看子账户时，转移请求必须限定在当前视图账户。
      if (_viewAccountId) autoTransferHeaders['X-View-Account-Id'] = _viewAccountId;
      fetch('/api/dialer/customers/transfer-to-pool', {
        method: 'POST',
        headers: autoTransferHeaders,
        body: JSON.stringify({ mobiles: mobiles })
      }).then(function(r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      }).then(function(d) {
        var autoTransferred = d ? Number(d.transferred) : NaN;
        if (!d || !d.success || !Number.isFinite(autoTransferred) || autoTransferred < mobiles.length) {
          var msg = d && d.error ? d.error : '云端未确认全部转移（' + (d && d.transferred != null ? d.transferred : 0) + '/' + mobiles.length + '）';
          console.error('[auto-transfer] 未全部转入公海: ' + msg);
          // 云端未完整确认时保留本地数据，并释放提醒锁；再次复制/返回页面可重新触发检查。
          _reminderShown = false;
          showCopyLimitToast('自动转公海未完成：' + msg + '。客户列表已保留，请再次复制备注/单位重试', true);
          return;
        }

        // 仅在云端确认全部成功后，才清除本轮客户并推进轮次。
        importedClients = importedClients.filter(function(c) {
          // 与请求前的手机号标准化保持一致，避免首尾空格导致云端已转移、本地却残留。
          var cm = String(c.phone || c.mobile || '').trim();
          return !mobileSet[cm];
        });
        saveState();
        window._roundTransferBlocked = false;
        try {
          recordRoundTransferred();
        } catch (e) {
          console.error('[round] recordRoundTransferred failed:', e);
        }
        refreshAccountDataCount();
        var dbOv = document.getElementById('dbOverlay');
        if (dbOv && dbOv.classList.contains('active')) {
          dbFetch();
          if (isSessionMaster()) loadAccountStats();
        }
        try {
          renderDialCards();
        } catch (e) {
          console.error('[round] render after transfer failed:', e);
        }
        showCopyLimitToast('本轮 ' + mobiles.length + ' 位客户已成功转入公海，列表已自动清空', true);
      }).catch(function(e) {
        console.error('[auto-transfer] 请求失败: ' + e.message);
        // 网络异常不清空客户，也不把 _reminderShown 永久锁死；允许下一次操作重新尝试。
        _reminderShown = false;
        showCopyLimitToast('自动转公海请求失败：' + e.message + '。客户列表已保留，请再次复制备注/单位重试', true);
      }).then(function() {
        window._roundTransferPending = false;
      });
    }

    // 统一批次锁：达到本轮操作阈值后，未完成清空前禁止通过任何导入入口加载下一批。
    function canStartNextImportBatch() {
      if (window._roundTransferBlocked || window._roundTransferPending) {
        alert('本轮客户尚未完成清空，暂不能导入/加载下一批。请等待本轮自动转入公海并清空成功，或先手动清空当前拨号列表。');
        return false;
      }
      return true;
    }

    function uploadCustomersToSupabase(customers, batchLabel) {
      if (!canStartNextImportBatch()) return Promise.resolve({ success: false, error: '本轮尚未清空，禁止导入下一批' });
      if (!customers || customers.length === 0) return Promise.resolve({ success: false, error: '无数据' });
      var label = batchLabel || ("导入-" + new Date().toISOString().slice(0, 19).replace("T", " "));
      var payload = serializeCustomersForSupabase(customers);
      var accountId = getOrCreateAccountId();
      var autoDeleteAfterDial = !!(document.getElementById('autoDeleteBatchAfterDial') && document.getElementById('autoDeleteBatchAfterDial').checked);
      return fetch("/api/dialer/upload-customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customers: payload, batch_label: label, account_id: accountId, auto_delete_after_dial: autoDeleteAfterDial })
      })
      .then(function(res) { return res.json(); })
      .then(function(data) {
        if (!data.success) {
          alert('上传失败: ' + (data.error || '未知错误'));
          console.error("Supabase upload failed:", data.error || "未知错误");
        } else {
          showCheckToast();
          // 轮次改为按「每完成一轮（转公海）」累计，见 recordRoundTransferred
          console.log("Supabase upload: 成功上传 " + data.count + " 条客户数据到云端" + (data.skipped > 0 ? " (其中 " + data.skipped + " 条已跳过)" : ""));
          refreshAccountDataCount(); // 导入后「更多」菜单账户数量同步
        }
        return data;
      })
      .catch(function(err) {
        alert('上传失败: 网络错误，请检查连接后重试');
        console.error("Supabase upload error:", err);
        return { success: false, error: err.message };
      });
    }

        function updateDashboardVisibility(hasData) {
      var flexStyle = hasData ? 'flex' : 'none';
      // 圆饼图（工作记录抽屉入口）始终显示，不随客户列表有无数据隐藏
      document.getElementById('controlBar').style.display = 'none';

      var expBtn = document.getElementById('exportBtn');
      var clrBtn = document.getElementById('clearBtn');
      var transferPoolBtn = document.getElementById('transferCurrentPoolBtn');
      if (expBtn) expBtn.style.display = hasData ? 'flex' : 'none';
      if (clrBtn) clrBtn.style.display = hasData ? 'flex' : 'none';
      if (transferPoolBtn) transferPoolBtn.style.display = hasData ? 'inline-flex' : 'none';

      // Import panel is now a modal overlay — always hidden from flow by CSS
      // Just ensure it's closed when data state changes
      var panel = document.getElementById('dashboardPanel');
      if (panel) {
        panel.classList.remove('active');
        document.body.style.overflow = '';
      }
    }

    // Dynamic UI Statistics
    function updateStats() {
      var total = importedClients.length;
      var done = 0;
      importedClients.forEach(function(c) {
        if (c.dialedStatus === 'success' || c.dialedStatus === 'failed') {
          done++;
        }
      });
      var percent = total > 0 ? (done / total) * 100 : 0;
      document.getElementById('progressFill').style.width = percent + '%';
      // 抽屉打开时同步刷新进度
      var drawerOverlay = document.getElementById('progressDrawerOverlay');
      if (drawerOverlay && drawerOverlay.classList.contains('active')) {
        renderDrawer();
      }
      // Refresh DB account count after batch changes
      refreshAccountDataCount();
    }

    // Global State for BH-AI Importer
    var tempImportData = null;
    var tempImportHeaders = [];
    var tempImportDetected = null;
    var tempImportType = 'xlsx'; // 'xlsx', 'vcf', 'unstructured'
    var tempUnstructuredContacts = [];

    // OCR Training: save original results before user edits
    var tempOcrFileName = '';
    var tempOcrRawText = '';
    var tempOcrOriginalContacts = [];
    var tempOcrEngine = 'ai_vision'; // 'ai_vision', 'local_tesseract', 'paddleocr', 'text_fallback'

    function resetAIImporterUI() {
      multiImageAborted = true;
      var el;
      el = document.getElementById('aiImportInit'); if (el) el.style.display = 'flex';
      el = document.getElementById('aiImportScanning'); if (el) el.style.display = 'none';
      el = document.getElementById('aiImportReport'); if (el) el.style.display = 'none';
      el = document.getElementById('aiLaserLine'); if (el) el.style.display = 'none';
      el = document.getElementById('aiAdjustControls'); if (el) el.style.display = 'none';
      el = document.getElementById('localOcrConfigPanel'); if (el) el.style.display = 'none';
      el = document.getElementById('textImportPanel'); if (el) el.style.display = 'none';

      var dz = document.getElementById('dropZone');
      if (dz) {
        dz.style.minHeight = '200px';
        dz.style.padding = ''; // Reset to CSS default
      }

      el = document.getElementById('aiExcelMappingPills'); if (el) el.style.display = 'flex';
      el = document.getElementById('aiExcelMappingControls'); if (el) el.style.display = 'block';
      el = document.getElementById('aiExcelPreviewContainer'); if (el) el.style.display = 'block';
      el = document.getElementById('aiUnstructuredContainer'); if (el) el.style.display = 'none';

      el = document.getElementById('xlsFileInput'); if (el) el.value = '';
      el = document.getElementById('vcfFileInput'); if (el) el.value = '';
      el = document.getElementById('imgFileInput'); if (el) el.value = '';

      tempUnstructuredContacts = [];
      tempImportData = null;
      tempImportHeaders = [];
      tempImportDetected = null;
      // Reset batch label with fresh default
      var blInput = document.getElementById('batchLabelInput');
      if (blInput) {
        blInput.value = '导入-' + new Date().toISOString().slice(0, 19).replace('T', ' ');
      }
      var autoDeleteToggle = document.getElementById('autoDeleteBatchAfterDial');
      if (autoDeleteToggle) autoDeleteToggle.checked = false;
    }

    function showAIScanningUI(fileName) {
      var el;
      el = document.getElementById('aiImportInit'); if (el) el.style.display = 'none';
      el = document.getElementById('aiImportReport'); if (el) el.style.display = 'none';
      el = document.getElementById('localOcrConfigPanel'); if (el) el.style.display = 'none';

      var scanning = document.getElementById('aiImportScanning');
      if (scanning) scanning.style.display = 'flex';

      var laser = document.getElementById('aiLaserLine');
      if (laser) laser.style.display = 'block';

      // Reset logs safely
      var log1 = document.getElementById('aiLog1');
      var log2 = document.getElementById('aiLog2');
      var log3 = document.getElementById('aiLog3');
      var log4 = document.getElementById('aiLog4');
      if (log1) { log1.innerHTML = '[ ] 正在读取数据流...'; log1.style.opacity = '0.5'; }
      if (log2) { log2.innerHTML = '[ ] 正在评估特征维度...'; log2.style.opacity = '0.3'; }
      if (log3) { log3.innerHTML = '[ ] 正在过滤杂质与噪音...'; log3.style.opacity = '0.3'; }
      if (log4) { log4.innerHTML = '[ ] 正在匹配智能映射...'; log4.style.opacity = '0.3'; }

      setTimeout(function() {
        if (log1) { log1.innerHTML = '数据流加载完成 (' + fileName + ')'; log1.style.opacity = '1'; }
        if (log2) log2.style.opacity = '0.5';
      }, 300);

      setTimeout(function() {
        if (log2) { log2.innerHTML = '评估行列特征成功'; log2.style.opacity = '1'; }
        if (log3) log3.style.opacity = '0.5';
      }, 600);

      setTimeout(function() {
        if (log3) { log3.innerHTML = '空列与噪音清洗完成'; log3.style.opacity = '1'; }
        if (log4) log4.style.opacity = '0.5';
      }, 900);

      setTimeout(function() {
        if (log4) { log4.innerHTML = 'AI 智能映射匹配成功'; log4.style.opacity = '1'; }
      }, 1100);
    }
    function runAIColumnMapping(json) {
      var headerRowIdx = -1;
      var maxHeaderMatches = 0;

      for (var i = 0; i < Math.min(json.length, 10); i++) {
        var row = json[i];
        if (!row) continue;
        var matches = 0;
        for (var j = 0; j < row.length; j++) {
          var cellVal = String(row[j] || '').trim();
          if (/姓名|客户|联系人|name|contact/i.test(cellVal)) matches++;
          if (/电话|手机|号码|phone|tel|mobile/i.test(cellVal)) matches++;
          if (/单位|公司|企业|company|firm|work/i.test(cellVal)) matches++;
          if (/备注|沟通|记录|跟进|说明|介绍|详情|note|remark/i.test(cellVal)) matches++;
        }
        var hasPhoneData = false;
        for (var j = 0; j < row.length; j++) {
          if (isPhone(row[j])) {
            hasPhoneData = true;
            break;
          }
        }
        if (matches > maxHeaderMatches && !hasPhoneData) {
          maxHeaderMatches = matches;
          headerRowIdx = i;
        }
      }

      var nameIdx = -1, phoneIdx = -1, companyIdx = -1, noteIdx = -1, storageInstitutionIdx = -1;
      var hasHeaders = (headerRowIdx !== -1);

      if (hasHeaders) {
        var headers = json[headerRowIdx];
        for (var i = 0; i < headers.length; i++) {
          var h = String(headers[i] || '').trim();
          if (/在库机构|入库机构|存储机构|在库单位|在库银行|合作机构/i.test(h)) storageInstitutionIdx = i;
          else if (/姓名|客户|name/i.test(h)) nameIdx = i;
          else if (/电话|手机|号码|phone|tel|mobile/i.test(h)) phoneIdx = i;
          else if (/单位|公司|企业|company|firm|work/i.test(h)) companyIdx = i;
          else if (/备注|沟通|记录|跟进|说明|介绍|详情|note|remark/i.test(h)) noteIdx = i;
        }
        
        if (phoneIdx === -1) {
          for (var i = 0; i < headers.length; i++) {
            var nextRowVal = json[headerRowIdx + 1] ? json[headerRowIdx + 1][i] : undefined;
            if (isPhone(nextRowVal)) {
              phoneIdx = i;
              break;
            }
          }
        }
        if (nameIdx === -1) nameIdx = 0;
      } else {
        var maxCols = 0;
        for (var i = 0; i < json.length; i++) {
          if (json[i] && json[i].length > maxCols) maxCols = json[i].length;
        }
        var phoneCols = [];

        for (var c = 0; c < maxCols; c++) {
          var phoneCount = 0;
          var totalNonEmpty = 0;
          var scanRows = Math.min(json.length, 50);
          for (var r = 0; r < scanRows; r++) {
            var val = json[r] ? json[r][c] : undefined;
            if (val !== undefined && val !== null && String(val).trim() !== '') {
              totalNonEmpty++;
              if (isPhone(val)) {
                phoneCount++;
              }
            }
          }
          if (phoneCount > 0 && (phoneCount / totalNonEmpty >= 0.3 || phoneCount >= 3)) {
            phoneCols.push(c);
          }
        }

        if (phoneCols.length > 0) {
          phoneIdx = phoneCols[0];
          
          var assignedNameCols = new Set();
          
          var leftScore = 0;
          var rightScore = 0;
          var scanRows = Math.min(json.length, 50);

          var canUseLeft = (phoneIdx > 0 && !assignedNameCols.has(phoneIdx - 1));
          var canUseRight = (phoneIdx + 1 < maxCols && !assignedNameCols.has(phoneIdx + 1));

          for (var r = 0; r < scanRows; r++) {
            if (canUseLeft) {
              var leftVal = json[r] ? json[r][phoneIdx - 1] : undefined;
              leftScore += nameScore(leftVal);
            }
            if (canUseRight) {
              var rightVal = json[r] ? json[r][phoneIdx + 1] : undefined;
              rightScore += nameScore(rightVal);
            }
          }

          if (canUseRight && rightScore >= leftScore && rightScore > 0) {
            nameIdx = phoneIdx + 1;
          } else if (canUseLeft && leftScore > 0) {
            nameIdx = phoneIdx - 1;
          } else {
            nameIdx = 0;
          }

          // Heuristic Company & Note Extraction for Non-Header Sheets
          var assignedCols = new Set();
          assignedCols.add(phoneIdx);
          if (nameIdx !== -1) assignedCols.add(nameIdx);

          var bestCompanyCol = -1;
          var maxCompanyScore = 0;
          var bestNoteCol = -1;
          var maxNoteScore = 0;

          for (var c = 0; c < maxCols; c++) {
            if (assignedCols.has(c)) continue;

            var companyScore = 0;
            var noteScoreCount = 0;
            var totalLength = 0;
            var nonValCount = 0;

            for (var r = 0; r < scanRows; r++) {
              var val = json[r] ? json[r][c] : undefined;
              if (val !== undefined && val !== null && String(val).trim() !== '') {
                var s = String(val).trim();
                nonValCount++;
                totalLength += s.length;

                // Priority matching for '有限公司' or corporate suffixes
                if (/有限公司|有限责任|集团|公司|企业|厂|店|中心|商行|工作室/i.test(s)) {
                  companyScore += 15;
                }
                if (/意向|跟进|记录|备注|挂断|接通|无效|微信|电话|加微信|想买|说明|介绍|详情/i.test(s)) {
                  noteScoreCount += 10;
                }
                if (s.length > 8) {
                  noteScoreCount += 2;
                }
              }
            }

            var avgLength = nonValCount > 0 ? (totalLength / nonValCount) : 0;
            noteScoreCount += avgLength;

            if (companyScore > maxCompanyScore && companyScore > 0) {
              maxCompanyScore = companyScore;
              bestCompanyCol = c;
            }
            if (noteScoreCount > maxNoteScore) {
              maxNoteScore = noteScoreCount;
              bestNoteCol = c;
            }
          }

          if (bestCompanyCol !== -1) {
            companyIdx = bestCompanyCol;
            assignedCols.add(bestCompanyCol);
          }
          if (bestNoteCol !== -1 && bestNoteCol !== bestCompanyCol) {
            noteIdx = bestNoteCol;
          }
        }
      }


      return {
        headerRowIdx: headerRowIdx,
        nameIdx: nameIdx,
        phoneIdx: phoneIdx,
        companyIdx: companyIdx,
        storageInstitutionIdx: storageInstitutionIdx,
        noteIdx: noteIdx
      };
    }

    function renderAIReportForExcel(json, detected) {
      tempImportData = json;
      tempImportType = 'xlsx';
      tempImportDetected = detected;

      var headerRowIdx = detected.headerRowIdx;
      var maxCols = 0;
      for (var i = 0; i < json.length; i++) {
        if (json[i] && json[i].length > maxCols) maxCols = json[i].length;
      }

      var headersList = [];
      for (var c = 0; c < maxCols; c++) {
        var hName = '列 ' + String.fromCharCode(65 + c);
        var headerVal = headerRowIdx !== -1 && json[headerRowIdx] ? json[headerRowIdx][c] : undefined;
        if (headerVal) {
          hName = esc(String(headerVal).trim());
        }
        headersList.push({ idx: c, label: hName });
      }
      tempImportHeaders = headersList;

      document.getElementById('pillName').className = 'client-card-tag';
      document.getElementById('pillName').style.background = detected.nameIdx !== -1 ? 'rgba(7,193,96,0.08)' : 'rgba(231,76,60,0.08)';
      document.getElementById('pillName').style.color = detected.nameIdx !== -1 ? 'var(--accent-wechat)' : '#e74c3c';
      document.getElementById('pillName').innerHTML = '姓名' + (detected.nameIdx !== -1 ? headersList[detected.nameIdx].label : '未识别');

      document.getElementById('pillPhone').className = 'client-card-tag';
      document.getElementById('pillPhone').style.background = detected.phoneIdx !== -1 ? 'rgba(7,193,96,0.08)' : 'rgba(231,76,60,0.08)';
      document.getElementById('pillPhone').style.color = detected.phoneIdx !== -1 ? 'var(--accent-wechat)' : '#e74c3c';
      document.getElementById('pillPhone').innerHTML = '电话' + (detected.phoneIdx !== -1 ? headersList[detected.phoneIdx].label : '未识别');

      document.getElementById('pillCompany').className = 'client-card-tag';
      document.getElementById('pillCompany').style.background = detected.companyIdx !== -1 ? 'rgba(74,108,247,0.08)' : 'rgba(0,0,0,0.04)';
      document.getElementById('pillCompany').style.color = detected.companyIdx !== -1 ? '#4a6cf7' : 'var(--text-light)';
      document.getElementById('pillCompany').innerHTML = '公司' + (detected.companyIdx !== -1 ? headersList[detected.companyIdx].label : '无');

      document.getElementById('pillNote').className = 'client-card-tag';
      document.getElementById('pillNote').style.background = detected.noteIdx !== -1 ? 'rgba(245,124,0,0.08)' : 'rgba(0,0,0,0.04)';
      document.getElementById('pillNote').style.color = detected.noteIdx !== -1 ? '#f57c00' : 'var(--text-light)';
      document.getElementById('pillNote').innerHTML = '备注' + (detected.noteIdx !== -1 ? headersList[detected.noteIdx].label : '无');

      renderImportMappingControls(headersList, detected);

      if (detected.nameIdx !== -1 && detected.phoneIdx !== -1) {
        executeAIImportExcel();
        showCheckToast();
        return;
      }

      var conf = 90;
      if (detected.nameIdx !== -1 && detected.phoneIdx !== -1) conf = detected.headerRowIdx !== -1 ? 98.5 : 92.0;
      if (detected.companyIdx !== -1) conf += 1.0;
      if (detected.noteIdx !== -1) conf += 0.5;
      document.getElementById('aiConfidenceBadge').innerHTML = '● AI 置信度: ' + conf.toFixed(1) + '%';
      
      document.getElementById('aiReportTitle').innerHTML = 'AI 识别报告: Excel 表格数据';

      updateAIPreviewTable();

      document.getElementById('aiImportScanning').style.display = 'none';
      document.getElementById('aiLaserLine').style.display = 'none';
      document.getElementById('aiImportReport').style.display = 'flex';
      
      document.getElementById('aiToggleAdjustBtn').style.display = 'inline-flex';
    }

    function populateMappingSelect(selId, headers, selectedIdx, hasNone) {
      var select = typeof selId === 'string' ? document.getElementById(selId) : selId;
      if (!select) return;
      select.innerHTML = '';
      if (hasNone) {
        var optNone = document.createElement('option');
        optNone.value = '-1';
        optNone.textContent = '(无映射/不导入)';
        if (selectedIdx === -1) optNone.selected = true;
        select.appendChild(optNone);
      }
      headers.forEach(function(h) {
        var opt = document.createElement('option');
        opt.value = h.idx;
        opt.textContent = String(h.idx + 1) + '列 - ' + h.label;
        if (h.idx === selectedIdx) opt.selected = true;
        select.appendChild(opt);
      });
    }

    function updateAIPreviewTable() {
      var nameCol = parseInt(document.getElementById('aiSelName').value);
      var phoneCol = parseInt(document.getElementById('aiSelPhone').value);
      var compCol = parseInt(document.getElementById('aiSelCompany').value);
      var storageInstitutionCol = parseInt(document.getElementById('aiSelStorageInstitution').value);
      var noteCol = parseInt(document.getElementById('aiSelNote').value);
      
      var customMappings = [];
      var customSelects = document.querySelectorAll('#aiAdjustControls .aiSelCustom');
      customSelects.forEach(function(sel) {
        var colName = sel.getAttribute('data-col');
        var colIdx = parseInt(sel.value);
        if (colIdx !== -1) {
          customMappings.push({ name: colName, idx: colIdx });
        }
      });

      var tableHead = document.querySelector('#aiPreviewTable thead');
      if (tableHead) {
        var headHtml = '<tr style="border-bottom: 0.5px solid var(--card-border); font-weight: 600; color: var(--text-soft); background: rgba(0,0,0,0.01);">' +
          '<th style="padding: 4px 8px;">姓名</th>' +
          '<th style="padding: 4px 8px;">电话</th>' +
          '<th style="padding: 4px 8px;">公司</th>' +
          '<th style="padding: 4px 8px;">在库机构</th>';
        customMappings.forEach(function(m) {
          headHtml += '<th style="padding: 4px 8px;">' + esc(m.name) + '</th>';
        });
        headHtml += '</tr>';
        tableHead.innerHTML = headHtml;
      }

      var tableBody = document.querySelector('#aiPreviewTable tbody');
      if (!tableBody) return;
      tableBody.innerHTML = '';

      if (!tempImportData || tempImportData.length === 0) return;

      var startRow = 0;
      if (tempImportDetected && tempImportDetected.headerRowIdx !== -1) {
        startRow = tempImportDetected.headerRowIdx + 1;
      }

      var previewCount = 0;
      for (var r = startRow; r < tempImportData.length && previewCount < 3; r++) {
        var row = tempImportData[r];
        if (!row || row.length === 0) continue;
        
        var rawPhone = phoneCol !== -1 ? row[phoneCol] : '';
        var phoneVal = cleanPhone(rawPhone);
        if (!phoneVal) continue;

        var nameVal = nameCol !== -1 ? String(row[nameCol] || '').trim() : '客户';
        var compVal = compCol !== -1 ? String(row[compCol] || '').trim() : '';
        var storageInstitutionVal = storageInstitutionCol !== -1 ? String(row[storageInstitutionCol] || '').trim() : '';

        var customTds = '';
        customMappings.forEach(function(m) {
          var val = String(row[m.idx] || '').trim();
          customTds += '<td style="padding: 6px 8px; color: var(--text-soft);">' + esc(val || '(空)') + '</td>';
        });

        var tr = document.createElement('tr');
        tr.style.borderBottom = '0.5px solid var(--card-border)';
        tr.innerHTML = '<td style="padding: 6px 8px; font-weight: 600; color: var(--text-main);">' + esc(nameVal || '未知姓名') + '</td>' +
                       '<td style="padding: 6px 8px; font-family: monospace; color: var(--accent-wechat); font-weight: 600;">' + esc(phoneVal) + '</td>' +
                       '<td style="padding: 6px 8px; color: var(--text-soft);">' + esc(compVal || '(空)') + '</td>' +
                       '<td style="padding: 6px 8px; color: var(--text-soft);">' + esc(storageInstitutionVal || '(空)') + '</td>' +
                       customTds;
        tableBody.appendChild(tr);
        previewCount++;
      }

      var colspanVal = 4 + customMappings.length;
      if (previewCount === 0) {
        tableBody.innerHTML = '<tr><td colspan="' + colspanVal + '" style="padding: 12px; text-align: center; color: var(--text-light);">当前列映射无法提取有效客户电话号码，请手动调整电话数据列。</td></tr>';
      }

      var totalImportCount = calculateParsedCount(nameCol, phoneCol, compCol, noteCol);
      document.getElementById('aiConfirmImportBtn').innerHTML = 'AI 确认导入 (' + totalImportCount + ' 位联系人)';
    }

    function calculateParsedCount(nameCol, phoneCol, compCol, noteCol) {
      if (!tempImportData || phoneCol === -1) return 0;
      var count = 0;
      var phoneSet = new Set();
      var startRow = 0;
      if (tempImportDetected && tempImportDetected.headerRowIdx !== -1) {
        startRow = tempImportDetected.headerRowIdx + 1;
      }
      for (var r = startRow; r < tempImportData.length; r++) {
        var row = tempImportData[r];
        if (!row || row.length === 0) continue;
        var phoneVal = cleanPhone(row[phoneCol]);
        if (!phoneVal) continue;
        if (phoneSet.has(phoneVal)) continue;
        phoneSet.add(phoneVal);
        count++;
      }
      return count;
    }

    function executeAIImportExcel() {
      if (!canStartNextImportBatch()) return;
      var nameCol = parseInt(document.getElementById('aiSelName').value);
      var phoneCol = parseInt(document.getElementById('aiSelPhone').value);
      var compCol = parseInt(document.getElementById('aiSelCompany').value);
      var storageInstitutionCol = parseInt(document.getElementById('aiSelStorageInstitution').value);
      var noteCol = parseInt(document.getElementById('aiSelNote').value);
      var batchLabel = (document.getElementById('batchLabelInput').value || '').trim();
      var defaultCat = document.getElementById('importCategorySelect') ? document.getElementById('importCategorySelect').value : '公海客户';

      if (phoneCol === -1) {
        alert('请至少为电话选择一列进行导入！');
        return;
      }

      var startRow = 0;
      if (tempImportDetected && tempImportDetected.headerRowIdx !== -1) {
        startRow = tempImportDetected.headerRowIdx + 1;
      }

      var customMappings = [];
      var customSelects = document.querySelectorAll('#aiAdjustControls .aiSelCustom');
      customSelects.forEach(function(sel) {
        var colName = sel.getAttribute('data-col');
        var colIdx = parseInt(sel.value);
        if (colIdx !== -1) {
          customMappings.push({ name: colName, idx: colIdx });
        }
      });

      var parsedCustomers = [];
      var phoneSet = new Set();

      for (var r = startRow; r < tempImportData.length; r++) {
        var row = tempImportData[r];
        if (!row || row.length === 0) continue;
        var phoneVal = cleanPhone(row[phoneCol]);
        if (!phoneVal) continue;
        if (phoneSet.has(phoneVal)) continue;
        phoneSet.add(phoneVal);

        var nameVal = nameCol !== -1 ? String(row[nameCol] || '').trim() : '客户';
        var companyVal = compCol !== -1 ? String(row[compCol] || '').trim() : '';
        var storageInstitutionVal = storageInstitutionCol !== -1 ? String(row[storageInstitutionCol] || '').trim() : '';
        var noteVal = noteCol !== -1 ? String(row[noteCol] || '').trim() : '';

        var fundVal = '';
        if (/^\d{4,5}$/.test(noteVal)) {
          fundVal = noteVal;
          noteVal = '';
        }

        var customObj = {};
        customMappings.forEach(function(m) {
          var val = String(row[m.idx] || '').trim();
          if (val) {
            customObj[m.name] = val;
          }
        });
        var finalNote = noteVal;
        if (Object.keys(customObj).length > 0 || fundVal) {
          var pl = { note: noteVal, custom: customObj };
          if (fundVal) pl.fund = fundVal;
          finalNote = JSON.stringify(pl);
        }

        parsedCustomers.push({
          name: nameVal || '未知姓名',
          phone: phoneVal,
          mobile: phoneVal,
          company: companyVal,
          storage_institution: storageInstitutionVal,
          note: finalNote,
          fund: fundVal,
          dialedStatus: 'todo',
          duration: '',
          callNote: '',
          category: defaultCat,
          batch_label: batchLabel
        });
      }

      if (parsedCustomers.length === 0) {
        alert('未找到任何有效的数据，请确认所选的数据列！');
        return;
      }

      // 识别成功的客户不再展示在列表，直接上传数据库，成功后提示上传数量
      uploadCustomersToSupabase(parsedCustomers, batchLabel).then(function(data) {
        if (data && data.success) {
          showCopyLimitToast('上传成功 ' + data.count + ' 条客户' + ((data.skipped > 0) ? '，已跳过 ' + data.skipped + ' 条' : ''));
        }
      });

      resetAIImporterUI();
    }

    function executeAIImportVcf() {
      if (!canStartNextImportBatch()) return;
      if (!tempImportData || tempImportData.length === 0) return;
      var batchLabel = (document.getElementById('batchLabelInput').value || '').trim();
      var defaultCat = document.getElementById('importCategorySelect') ? document.getElementById('importCategorySelect').value : '公海客户';
      // Tag each client with the batch label and category
      for (var i = 0; i < tempImportData.length; i++) {
        var c = tempImportData[i];
        c.batch_label = batchLabel;
        c.category = defaultCat;
        c.mobile = c.mobile || c.phone;
        c.phone = c.phone || c.mobile;
        if (!c.fund && /^\d{4,5}$/.test((c.note || '').trim())) {
          c.fund = c.note.trim();
          c.note = '';
        }
      }
      // 识别成功的客户不再展示在列表，直接上传数据库，成功后提示上传数量
      uploadCustomersToSupabase(tempImportData, batchLabel).then(function(data) {
        if (data && data.success) {
          showCopyLimitToast('上传成功 ' + data.count + ' 条客户' + ((data.skipped > 0) ? '，已跳过 ' + data.skipped + ' 条' : ''));
        }
      });

      resetAIImporterUI();
    }

    function renderAIReportForVcf(contactsList) {
      // VCF 也进入统一的可编辑预览流程，允许对缺失姓名/单位的号码批量补填
      tempImportData = contactsList || [];
      tempImportType = 'unstructured';
      window.renderAIUnstructuredReport('VCF 通讯录', tempImportData);
      return;

      if (contactsList && contactsList.length > 0) {
        executeAIImportVcf();
        showCheckToast();
        return;
      }

      document.getElementById('pillName').className = 'client-card-tag';
      document.getElementById('pillName').style.background = 'rgba(7,193,96,0.08)';
      document.getElementById('pillName').style.color = 'var(--accent-wechat)';
      document.getElementById('pillName').innerHTML = '姓名 VCF (FN)';

      document.getElementById('pillPhone').className = 'client-card-tag';
      document.getElementById('pillPhone').style.background = 'rgba(7,193,96,0.08)';
      document.getElementById('pillPhone').style.color = 'var(--accent-wechat)';
      document.getElementById('pillPhone').innerHTML = '电话 VCF (TEL)';

      document.getElementById('pillCompany').className = 'client-card-tag';
      document.getElementById('pillCompany').style.background = 'rgba(74,108,247,0.08)';
      document.getElementById('pillCompany').style.color = '#4a6cf7';
      document.getElementById('pillCompany').innerHTML = '公司 VCF (ORG)';

      document.getElementById('pillNote').className = 'client-card-tag';
      document.getElementById('pillNote').style.background = 'rgba(0,0,0,0.04)';
      document.getElementById('pillNote').style.color = 'var(--text-light)';
      document.getElementById('pillNote').innerHTML = '备注 VCF (NOTE)';

      document.getElementById('aiAdjustControls').style.display = 'none';
      document.getElementById('aiToggleAdjustBtn').style.display = 'none';

      document.getElementById('aiConfidenceBadge').innerHTML = '● AI 置信度: 100.0%';
      document.getElementById('aiReportTitle').innerHTML = 'AI 识别报告: VCF 通讯录文件';

      var tableBody = document.querySelector('#aiPreviewTable tbody');
      if (tableBody) {
        tableBody.innerHTML = '';
        var limit = Math.min(contactsList.length, 3);
        for (var i = 0; i < limit; i++) {
          var c = contactsList[i];
          var tr = document.createElement('tr');
          tr.style.borderBottom = '0.5px solid var(--card-border)';
          tr.innerHTML = '<td style="padding: 6px 8px; font-weight: 600; color: var(--text-main);">' + esc(c.name || '未知姓名') + '</td>' +
                         '<td style="padding: 6px 8px; font-family: monospace; color: var(--accent-wechat); font-weight: 600;">' + esc(c.phone) + '</td>' +
                         '<td style="padding: 6px 8px; color: var(--text-soft);">' + esc(c.company || '(空)') + '</td>';
          tableBody.appendChild(tr);
        }
      }

      document.getElementById('aiConfirmImportBtn').innerHTML = 'AI 确认导入 (' + contactsList.length + ' 位联系人)';

      document.getElementById('aiImportScanning').style.display = 'none';
      document.getElementById('aiLaserLine').style.display = 'none';
      document.getElementById('aiImportReport').style.display = 'flex';
    }

    var scriptLoadingPromises = {};
    function loadScript(url) {
      if (scriptLoadingPromises[url]) return scriptLoadingPromises[url];
      scriptLoadingPromises[url] = new Promise(function(resolve, reject) {
        if (document.querySelector('script[src="' + url + '"]')) {
          resolve();
          return;
        }
        var script = document.createElement('script');
        script.src = url;
        script.onload = function() { resolve(); };
        script.onerror = function() { reject(new Error('Failed to load script: ' + url)); };
        document.head.appendChild(script);
      });
      return scriptLoadingPromises[url];
    }

    function parsePhoneContactsFromRawText(text) {
      if (!text) return [];
      
      var lines = text.split(/\\r\\n|\\r|\\n/);
      var results = [];
      var phoneSet = new Set();
      
      // Common Chinese Surnames to validate names
      var SURNAMES = /^(张|李|王|刘|陈|杨|赵|黄|周|吴|徐|孙|马|胡|朱|郭|何|林|高|罗|郑|梁|谢|唐|韩|曹|许|邓|萧|冯|曾|程|蔡|彭|潘|袁|于|董|余|苏|叶|吕|魏|蒋|田|杜|丁|沈|姜|范|江|傅|钟|卢|汪|戴|崔|陆|廖|姚|方|金|邱|夏|谭|韦|贾|邹|石|熊|放|孟|秦|阎|薛|侯|雷|白|龙|段|郝|孔|邵|史|毛|常|万|顾|赖|武|康|贺|严|克)/;
      
      // Strict metadata, label and corporate suffix validation to filter out noise
      function isValidNameHeuristic(str) {
        if (!str) return false;
        var cleanStr = str.replace(/[\\s.,，。:：;；%&|()（）\\[\\]{}<>]/g, '');
        // Must contain ONLY Chinese characters
        if (!/^[\\u4e00-\\u9fa5]+$/.test(cleanStr)) {
          return false;
        }
        // Length check
        if (cleanStr.length < 1 || cleanStr.length > 6) {
          return false;
        }
        // Single character: accept as surname (common in phone dialers)
            if (cleanStr.length === 1) {
              if (!/^[一-龥]$/.test(cleanStr)) return false;
              return true;
            }
        if (/姓名|电话|手机|号码|公司|备注|联系人|客户|微信|意向|跟进|记录|挂断|接通|无效|加微信|想买|说明|介绍|详情|单位|公积金|社保|基数|工资|需求|tel|phone|mobile|name/i.test(cleanStr)) {
          return false;
        }
        if (/有限公司|有限责任|集团|公司|企业|厂|店|中心|商行|工作室|股份|学校|幼儿园|小学|中学|大学|学院|研究院|研究所|实验室|医院|银行|局|委|会|处|所|站|部|厅|署|社|团|队|组/.test(cleanStr)) {
          return false;
        }
        if (/北京|上海|广州|深圳|成都|杭州|武汉|西安|重庆|南京|天津|中国|四川|湖南|湖北|广东|江苏|浙江|山东|福建|江西|河南|河北|安徽|辽宁|吉林|黑龙江|山西|陕西|甘肃|青海|云南|贵州|广西|西藏|内模|内蒙|新疆|宁夏|海南|港澳|台湾|东莞|佛山|温州|宁波|苏州|无锡|常州|扬州|徐州|南通/i.test(cleanStr)) {
          return false;
        }
        return true;
      }

      function isNoteLike(str) {
        if (!str) return false;
        if (/已|不|需|要|想|加|微|信|挂|忙|通|拒|错|空|停|回|查|跟|打|拨|过|转|去|好|中|没|死|下|上|朝|晚|息|留|考|虑|意向|跟进|记录|接听|挂断|无效|空号|停机|拒绝|联系|电话|时间|下午|上午|明天|后天/i.test(str)) {
          return true;
        }
        if (/[了吧呢吗没说谈电话办买看做去来想在要给]/g.test(str)) {
          return true;
        }
        if (str.length > 10 && !/有限|集团|公司|厂|店|中心|商行|工作室|学校|幼儿园|小学|中学|大学|学院|研究院|研究所|实验室|医院|银行|局|委|会|处|所|站/i.test(str)) {
          return true;
        }
        return false;
      }

      for (var i = 0; i < lines.length; i++) {
        var line = lines[i].trim();
        if (!line) continue;
        
        var cleanLine = line.replace(/[-\\s]/g, '').replace(/[Il|]/g, '1').replace(/[oO]/g, '0');
        var robustPhoneRegex = /(?:1[3-9]\\d{9}|0\\d{2,3}\\d{7,8})/g;
        var match;
        var foundPhonesInLine = [];
        
        while ((match = robustPhoneRegex.exec(cleanLine)) !== null) {
          var cleanPhoneStr = match[0];
          if (!phoneSet.has(cleanPhoneStr)) {
            foundPhonesInLine.push({
              phone: cleanPhoneStr,
              raw: cleanPhoneStr,
              index: 0,
              length: match[0].length
            });
            phoneSet.add(cleanPhoneStr);
          }
        }
        
        if (foundPhonesInLine.length === 0) {
          var phoneRegex = /(?:1[3-9]\\d{9}|1[3-9]\\d{1,2}[-\\s]\\d{3,4}[-\\s]\\d{4}|0\\d{2,3}[-\\s]\\d{7,8}|0\\d{9,11})/g;
          while ((match = phoneRegex.exec(line)) !== null) {
            var cleanPhoneStr = match[0].replace(/[-\\s]/g, '');
            if (!phoneSet.has(cleanPhoneStr)) {
              foundPhonesInLine.push({
                phone: cleanPhoneStr,
                raw: match[0],
                index: match.index,
                length: match[0].length
              });
              phoneSet.add(cleanPhoneStr);
            }
          }
        }
        
        if (foundPhonesInLine.length === 0) continue;
        
        for (var pi = 0; pi < foundPhonesInLine.length; pi++) {
          var phoneInfo = foundPhonesInLine[pi];
          var phoneStr = phoneInfo.phone;
          var rawPhoneStr = phoneInfo.raw;
          
          var name = '';
          var company = '';
          var noteParts = [];
          
          // Replace current phone in line with space to separate name and company when连写
          var lineWithoutPhone = line.replace(rawPhoneStr, ' ');
          
          // Delimit segments on the line to parse columns/words
          var delimiters = /[\\s,，:：|｜;；\\t\\-\\[\\]\\(\\)]+/;
          var lineParts = lineWithoutPhone.split(delimiters).map(function(p) { return p.trim(); }).filter(Boolean);
          
          // Filter out other phone tokens if any
          var remainingParts = lineParts.filter(function(part) {
            var cleanPart = part.replace(/[-\\s]/g, '');
            for (var k = 0; k < foundPhonesInLine.length; k++) {
              var otherPhone = foundPhonesInLine[k];
              if (cleanPart.indexOf(otherPhone.phone) !== -1 || part.indexOf(otherPhone.raw) !== -1) {
                return false;
              }
            }
            return true;
          });
          
          // 1. Identify Company Candidates
          var bestCompany = '';
          for (var j = 0; j < remainingParts.length; j++) {
            var part = remainingParts[j];
            if (/联系人|负责人|姓名|电话|手机|号码|备注|意向|跟进|记录|挂断|接通|无效|加微信|单位|公积金|社保|基数|工资|需求/i.test(part)) {
              continue;
            }
            if (/有限公司|有限责任|集团|公司|企业|厂|店|中心|商行|工作室|股份|科技|技术|网络|制造|金融|地产|开发|幼儿园|小学|中学|学校|学院|大学|医院|银行|保险|证券|基金|海关|政府|研究院|实验室|支行|分行|法院|检察院|公安局|派出所/.test(part)) {
              bestCompany = part;
              break;
            }
          }

          // Fallback Company (institution suffixes)
          if (!bestCompany) {
            for (var j = 0; j < remainingParts.length; j++) {
              var part = remainingParts[j];
              if (/局|厅|科|所|校|院|部|关|队|站|处|会/.test(part)) {
                bestCompany = part;
                break;
              }
            }
          }
          
          // Phase C Fallback Company (any segment that is not note-like, not the name, and is a Chinese/Alphanumeric noun of length 2-12)
          if (!bestCompany) {
            for (var j = 0; j < remainingParts.length; j++) {
              var part = remainingParts[j];
              if (part === name) continue;
              var isChineseNoun = /^[\\u4e00-\\u9fa5a-zA-Z0-9\\(\\)（）]+$/.test(part) && /[\\u4e00-\\u9fa5]/.test(part);
              if (isChineseNoun && part.length >= 2 && part.length <= 12 && !isNoteLike(part)) {
                bestCompany = part;
                break;
              }
            }
          }
          
          var companySkipSet = {};
          if (bestCompany) {
            company = bestCompany;
            companySkipSet[bestCompany] = true;
            // 合并括号注释：如 "海关(养)"，括号内容属于单位名一部分，防止漏进备注或误判为姓名
            var parenMerge = new RegExp('(?:' + bestCompany.replace(/[.*+?^\\x24{}()|\\[\\]\\\\]/g, '\\$&') + ')\\s*[（(]([一-龥a-zA-Z0-9]{1,4})[）)]').exec(line);
            if (parenMerge) {
              company = parenMerge[0];
              if (parenMerge[1]) companySkipSet[parenMerge[1]] = true;
            }
          }

          // Spatial prefix/suffix extraction
          var prefix = line.substring(0, phoneInfo.index).trim();
          var prefixMatch = /(?:^|\\s)([\\u4e00-\\u9fa5]{2,4})(?=\\s|$)/.exec(prefix) || /^([\\u4e00-\\u9fa5]{2,4})/.exec(prefix) || /([\\u4e00-\\u9fa5]{1,4})\\s*$/.exec(prefix);
          var prefixName = prefixMatch ? prefixMatch[1] : '';
          
          var suffix = line.substring(phoneInfo.index + phoneInfo.length).trim();
          var suffixMatch = /^\\s*([\\u4e00-\\u9fa5]{1,4})/.exec(suffix);
          var suffixName = suffixMatch ? suffixMatch[1] : '';

          // 2. Identify Name with multi-phase priority
          // Phase A: Segment matches starting with common surnames
          for (var j = 0; j < remainingParts.length; j++) {
            var part = remainingParts[j];
            if (part === company || companySkipSet[part]) continue;
            if (isValidNameHeuristic(part) && SURNAMES.test(part) && part.length <= 4) {
              name = part;
              break;
            }
          }

          // Phase B: Adjacent prefix/suffix matches starting with common surnames
          if (!name) {
            if (prefixName && isValidNameHeuristic(prefixName) && SURNAMES.test(prefixName)) {
              name = prefixName;
            } else if (suffixName && isValidNameHeuristic(suffixName) && SURNAMES.test(suffixName)) {
              name = suffixName;
            }
          }

          // Phase C: Regular segments (Chinese name / titles) satisfying validity
          if (!name) {
            for (var j = 0; j < remainingParts.length; j++) {
              var part = remainingParts[j];
              if (part === company || companySkipSet[part]) continue;
              if (isValidNameHeuristic(part) && part.length <= 4) {
                name = part;
                break;
              }
            }
          }

          // Phase D: Adjacent prefix/suffix satisfying validity
          if (!name) {
            if (prefixName && isValidNameHeuristic(prefixName)) {
              name = prefixName;
            } else if (suffixName && isValidNameHeuristic(suffixName)) {
              name = suffixName;
            }
          }

          // Phase E: Any valid remaining segment up to 6 characters
          if (!name) {
            for (var j = 0; j < remainingParts.length; j++) {
              var part = remainingParts[j];
              if (part === company || companySkipSet[part]) continue;
              if (isValidNameHeuristic(part)) {
                name = part;
                break;
              }
            }
          }
          
          // Fallback
          if (!name) {
            name = '客户-' + phoneStr.substring(phoneStr.length - 4);
          }
          
          // Extract Notes from remaining parts
          for (var j = 0; j < remainingParts.length; j++) {
            var part = remainingParts[j];
            if (part !== name && part !== company && !companySkipSet[part]) {
              // Skip UI labels/metadata in notes to keep them clean
              if (/姓名|电话|手机|号码|公司|备注|联系人|客户|微信|负责人|说明|介绍|详情|单位|公积金|社保|基数|工资|需求/i.test(part) && part.length <= 5) {
                continue;
              }
              var cleanPart = part.replace(/[-\\s.,，。:：;；%&|()（）\\[\\]{}<>]/g, '');
              if (cleanPart.length <= 1 && !/^\\d$/.test(cleanPart)) {
                continue;
              }
              if (/^[a-zA-Z]+$/.test(cleanPart) && cleanPart.length < 3) {
                continue;
              }
              noteParts.push(part);
            }
          }

          // Extract fund (公积金/金额) from note parts: 4-5位金额数字(排除年份)，支持"5000.56"小数和"5000元"后缀
          var fund = '';
          for (var nj = noteParts.length - 1; nj >= 0; nj--) {
            var np = noteParts[nj].replace(/^[¥￥]\\s*/, '').replace(/[元块人民币]+$/, '').trim();
            if (/^\\d{4,5}(\\.\\d{1,2})?$/.test(np) && !/^(19|20)\\d{2}$/.test(np)) {
              fund = np;
              noteParts.splice(nj, 1);
              break;
            }
          }
          var finalNote = noteParts.join(' ');
          results.push({
            name: name,
            phone: phoneStr,
            company: company,
            note: finalNote,
            fund: fund
          });
        }
      }
      
      if (results.length === 0) {
        var globalPhoneRegex = /1[3-9]\\d{9}/g;
        var globalMatch;
        while ((globalMatch = globalPhoneRegex.exec(text)) !== null) {
          var p = globalMatch[0];
          if (!phoneSet.has(p)) {
            phoneSet.add(p);
            
            // Reverse-seek in raw text for names immediately preceding global phones
            var searchStart = Math.max(0, globalMatch.index - 15);
            var searchSlice = text.substring(searchStart, globalMatch.index);
            var nameMatch = /([\\u4e00-\\u9fa5]{2,4})\\s*$/.exec(searchSlice);
            var foundName = nameMatch ? nameMatch[1] : '';
            
            results.push({
              name: foundName || ('客户-' + p.substring(p.length - 4)),
              phone: p,
              company: '',
              note: ''
            });
          }
        }
      }
      
      return results;
    }

    // Correct OCR text using text AI (not vision) — fixes Tesseract/WASM errors
    // Falls back to regex parsing if AI is unavailable
    function correctOcrTextWithAI(rawText, fileName, onDone) {
      // Safe DOM helper
      function safeLog(elId, msg) {
        var el = document.getElementById(elId);
        if (el) { el.innerHTML = msg; el.style.opacity = '1'; }
      }

      // Check if any text AI is configured
      var aiKey = (localStorage.getItem('vision_api_key') || localStorage.getItem('ai_api_key') || localStorage.getItem('deepseek_api_key') || '').trim();
      if (!aiKey) {
        // No AI key — use regex fallback directly
        var contacts = parsePhoneContactsFromRawText(rawText);
        onDone(contacts);
        return;
      }

      // If the text contains too many phone numbers, bypass AI to prevent timeouts and token limits
      var phoneCount = (rawText.match(/1[3-9]\\d{9}/g) || []).length;
      if (phoneCount > 30) {
        console.log('[OCR Correct] Large data set detected (' + phoneCount + ' phones), bypassing AI to prevent timeouts.');
        safeLog('aiLog3', '检测到数据量较大（共 ' + phoneCount + ' 个号码），已启用本地极速解析...');
        var contacts = parsePhoneContactsFromRawText(rawText);
        tempOcrEngine = 'local_tesseract_large';
        setTimeout(function() { onDone(contacts); }, 500); // 500ms delay for visual feedback
        return;
      }

      safeLog('aiLog3', '文本 AI 正在修正 OCR 识别错误...');
      safeLog('aiLog4', '检测并修正：数字混淆、形近字、断裂文本...');

      fetch('/api/ocr/correct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawText: rawText, fileName: fileName || 'local_ocr' })
      })
      .then(function(r) { return r.json(); })
      .then(function(result) {
        if (result.contacts && result.contacts.length > 0) {
          safeLog('aiLog3', '文本 AI 修正完成 · 识别 ' + result.contacts.length + ' 个联系人');
          // Save raw OCR text for training data
          tempOcrRawText = rawText;
          tempOcrEngine = 'text_ai_correct';
          onDone(result.contacts);
        } else {
          // AI returned no contacts — fallback to regex
          safeLog('aiLog3', 'AI 未检出，使用本地正则解析...');
          var fbContacts = parsePhoneContactsFromRawText(rawText);
          tempOcrEngine = 'local_tesseract';
          onDone(fbContacts);
        }
      })
      .catch(function(err) {
        console.error('[OCR Correct] API call failed, using regex fallback:', err.message);
        safeLog('aiLog3', 'AI 不可用，使用本地正则解析...');
        var fbContacts = parsePhoneContactsFromRawText(rawText);
        tempOcrEngine = 'local_tesseract';
        onDone(fbContacts);
      });
    }

    function handleFileImportDispatch(file) {
      if (!file) return;
      var ext = file.name.split('.').pop().toLowerCase();
      var sizeMB = file.size / (1024 * 1024);
      
      if (sizeMB > 30) {
        alert('文件大小超过 30MB 限制！目前仅支持上传 30MB 以内的文件。');
        return;
      }
      
      if (ext === 'xlsx' || ext === 'xls' || ext === 'xlsm' || ext === 'csv') {
        if (sizeMB > 3) {
          handleExcelLargeFileWorker(file);
        } else {
          handleExcelImport(file);
        }
      } else if (ext === 'vcf' || ext === 'vcard') {
        handleVcfImport(file);
      } else if (ext === 'docx') {
        handleDocxImport(file);
      } else if (ext === 'pdf') {
        handlePdfImport(file);
      } else if (ext === 'txt') {
        handleTxtImport(file);
      } else if (/jpg|jpeg|png|bmp|webp/i.test(ext)) {
        handleImageOCR(file);
      } else {
        alert('不支持的文件格式！目前支持 Excel, CSV, VCF, Word(docx), PDF, 纯文本(txt) 以及常用格式图片。');
      }
    }

    function handleExcelLargeFileWorker(file) {
      showAIScanningUI(file.name);
      document.getElementById('aiScanStatus').innerHTML = '智能大文件多线程加速解析中...';
      if (document.getElementById('aiLog1')) {
        document.getElementById('aiLog1').innerHTML = '正在加载 Web Worker 解析引擎...';
        document.getElementById('aiLog1').style.opacity = '1';
      }
      
      var reader = new FileReader();
      reader.onload = function(e) {
        var arrayBuffer = e.target.result;
        
        var workerCode = [
          "self.importScripts('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js');",
          "self.onmessage = function(e) {",
          "  try {",
          "    var data = new Uint8Array(e.data);",
          "    var workbook = XLSX.read(data, { type: 'array' });",
          "    var firstSheetName = workbook.SheetNames[0];",
          "    var worksheet = workbook.Sheets[firstSheetName];",
          "    var json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });",
          "    self.postMessage({ success: true, json: json });",
          "  } catch(err) {",
          "    self.postMessage({ success: false, error: err.message });",
          "  }",
          "};"
        ].join("\\n");
        
        var blob = new Blob([workerCode], { type: 'application/javascript' });
        var workerUrl = URL.createObjectURL(blob);
        var worker = new Worker(workerUrl);
        
        worker.onmessage = function(ev) {
          worker.terminate();
          URL.revokeObjectURL(workerUrl);
          
          if (ev.data.success) {
            var json = ev.data.json;
            if (json.length === 0) {
              alert('导入失败：表格无数据');
              resetAIImporterUI();
              return;
            }
            if (document.getElementById('aiLog3')) {
              document.getElementById('aiLog3').innerHTML = '大数据读取与过滤清洗完成';
              document.getElementById('aiLog3').style.opacity = '1';
            }
            var detected = runAIColumnMapping(json);
            renderAIReportForExcel(json, detected);
          } else {
            alert('大文件解析失败：' + ev.data.error);
            resetAIImporterUI();
          }
        };
        
        worker.postMessage(arrayBuffer, [arrayBuffer]);
      };
      
      reader.readAsArrayBuffer(file);
    }

    function handleDocxImport(file) {
      tempOcrEngine = 'text_fallback';
      showAIScanningUI(file.name);
      document.getElementById('aiScanStatus').innerHTML = 'AI 正在载入 Word 解析引擎...';
      if (document.getElementById('aiLog1')) {
        document.getElementById('aiLog1').innerHTML = '正在加载 mammoth.js 脚本库...';
        document.getElementById('aiLog1').style.opacity = '1';
      }
      
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js')
        .then(function() {
          if (document.getElementById('aiLog2')) {
            document.getElementById('aiLog2').innerHTML = 'Word 解析引擎载入成功';
            document.getElementById('aiLog2').style.opacity = '1';
          }
          document.getElementById('aiScanStatus').innerHTML = '� 正在深度分析 Word 文档数据流...';
          
          var reader = new FileReader();
          reader.onload = function(e) {
            var arrayBuffer = e.target.result;
            window.mammoth.extractRawText({ arrayBuffer: arrayBuffer })
              .then(function(result) {
                if (document.getElementById('aiLog3')) {
                  document.getElementById('aiLog3').innerHTML = '提取纯文本内容完成';
                  document.getElementById('aiLog3').style.opacity = '1';
                }
                var text = result.value;
                if (document.getElementById('aiLog4')) {
                  document.getElementById('aiLog4').innerHTML = 'AI 正在运行模式启发式提取...';
                  document.getElementById('aiLog4').style.opacity = '1';
                }
                setTimeout(function() {
                  correctOcrTextWithAI(text, file.name, function(contacts) {
                    renderAIUnstructuredReport(file.name, contacts);
                  });
                }, 600);
              })
              .catch(function(err) {
                alert('Word 解析失败：' + err.message);
                resetAIImporterUI();
              });
          };
          reader.readAsArrayBuffer(file);
        })
        .catch(function(err) {
          alert('解析引擎加载失败，请检查您的网络连接：' + err.message);
          resetAIImporterUI();
        });
    }

    function handlePdfImport(file) {
      tempOcrEngine = 'text_fallback';
      showAIScanningUI(file.name);
      document.getElementById('aiScanStatus').innerHTML = 'AI 正在载入 PDF 解析引擎...';
      if (document.getElementById('aiLog1')) {
        document.getElementById('aiLog1').innerHTML = '正在加载 pdf.js 脚本库...';
        document.getElementById('aiLog1').style.opacity = '1';
      }
      
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js')
        .then(function() {
          window['pdfjs-dist/build/pdf'].GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
          
          if (document.getElementById('aiLog2')) {
            document.getElementById('aiLog2').innerHTML = 'PDF 引擎初始化完成';
            document.getElementById('aiLog2').style.opacity = '1';
          }
          document.getElementById('aiScanStatus').innerHTML = '� 正在深度分析 PDF 文档页面...';
          
          var reader = new FileReader();
          reader.onload = function(e) {
            var arrayBuffer = e.target.result;
            var loadingTask = window['pdfjs-dist/build/pdf'].getDocument({ data: arrayBuffer });
            
            loadingTask.promise.then(function(pdf) {
              var maxPages = pdf.numPages;
              var extractedText = '';
              var loadedPages = 0;
              
              if (document.getElementById('aiLog3')) {
                document.getElementById('aiLog3').innerHTML = '正在并行扫描 ' + maxPages + ' 个页面...';
                document.getElementById('aiLog3').style.opacity = '1';
              }
              
              function loadPageText(pageNumber) {
                document.getElementById('aiScanStatus').innerHTML = '� 正在扫描 PDF 页面 (' + pageNumber + '/' + maxPages + ')...';
                
                return pdf.getPage(pageNumber).then(function(page) {
                  return page.getTextContent().then(function(textContent) {
                    var pageText = textContent.items.map(function(item) { return item.str; }).join(' ');
                    extractedText += pageText + '\\n';
                    loadedPages++;
                    
                    if (loadedPages < maxPages) {
                      return loadPageText(pageNumber + 1);
                    } else {
                      if (document.getElementById('aiLog3')) {
                        document.getElementById('aiLog3').innerHTML = 'PDF 页面文本提取完毕';
                      }
                      if (document.getElementById('aiLog4')) {
                        document.getElementById('aiLog4').innerHTML = 'AI 正在运行特征神经网络分析...';
                        document.getElementById('aiLog4').style.opacity = '1';
                      }
                      setTimeout(function() {
                        correctOcrTextWithAI(extractedText, file.name, function(contacts) {
                          if (contacts.length > 0) {
                            renderAIUnstructuredReport(file.name, contacts);
                          } else {
                            handleScannedPdfOCR(pdf, file.name);
                          }
                        });
                      }, 600);
                    }
                  });
                });
              }

              function handleScannedPdfOCR(pdf, fileName) {
                runLocalScannedPdfSlicingOCR(pdf, fileName);
              }
              
              loadPageText(1).catch(function(err) {
                alert('PDF 页面文本提取失败：' + err.message);
                resetAIImporterUI();
              });
              
            }).catch(function(err) {
              alert('PDF 文档读取失败：' + err.message);
              resetAIImporterUI();
            });
          };
          reader.readAsArrayBuffer(file);
        })
        .catch(function(err) {
          alert('PDF 解析引擎加载失败：' + err.message);
          resetAIImporterUI();
        });
    }

    // ====== Local Wasm OCR Slicing & Preprocessing Helper Methods ======
    var tempOcrFile = null;
    var tempOcrPdf = null;
    var tempOcrFileName = '';
    var tempOcrImgDataUrl = '';
    var ocrPreviewImage = new Image();

    function showOcrSlicingPreview(imgDataUrl) {
      var configPanel = document.getElementById('localOcrConfigPanel');
      var initPanel = document.getElementById('aiImportInit');
      var scanPanel = document.getElementById('aiImportScanning');
      var reportPanel = document.getElementById('aiImportReport');
      
      if (initPanel) initPanel.style.display = 'none';
      if (scanPanel) scanPanel.style.display = 'none';
      if (reportPanel) reportPanel.style.display = 'none';
      if (configPanel) configPanel.style.display = 'flex';
      
      ocrPreviewImage.src = imgDataUrl;
      ocrPreviewImage.onload = function() {
        drawOcrSlicingPreviewLines();
      };
    }

    function drawOcrSlicingPreviewLines() {
      var canvas = document.getElementById('ocrPreviewCanvas');
      if (!canvas || !ocrPreviewImage.src) return;
      var ctx = canvas.getContext('2d');
      
      var split1 = parseInt(document.getElementById('sliderSplit1').value);
      var split2 = parseInt(document.getElementById('sliderSplit2').value);
      var order = document.getElementById('ocrColumnOrder').value;
      
      // Update values text
      document.getElementById('valSplit1').textContent = split1 + '%';
      document.getElementById('valSplit2').textContent = split2 + '%';
      
      // Set canvas dimensions to match image aspect ratio
      canvas.width = ocrPreviewImage.naturalWidth;
      canvas.height = ocrPreviewImage.naturalHeight;
      
      ctx.drawImage(ocrPreviewImage, 0, 0);
      
      // Draw vertical line 1 (Dashed Red)
      var x1 = canvas.width * (split1 / 100);
      ctx.beginPath();
      ctx.setLineDash([6, 6]);
      ctx.strokeStyle = '#e74c3c';
      ctx.lineWidth = Math.max(2, canvas.width / 150);
      ctx.moveTo(x1, 0);
      ctx.lineTo(x1, canvas.height);
      ctx.stroke();
      
      // Draw vertical line 2 (Dashed Green)
      var x2 = canvas.width * (split2 / 100);
      ctx.beginPath();
      ctx.setLineDash([6, 6]);
      ctx.strokeStyle = '#2ecc71';
      ctx.lineWidth = Math.max(2, canvas.width / 150);
      ctx.moveTo(x2, 0);
      ctx.lineTo(x2, canvas.height);
      ctx.stroke();
      
      // Draw labels between columns
      ctx.font = 'bold ' + Math.max(12, canvas.height / 20) + 'px sans-serif';
      ctx.textAlign = 'center';
      
      var col1Text = '姓名', col2Text = '电话', col3Text = '单位/备注';
      if (order === 'phone_name_other') {
        col1Text = '电话'; col2Text = '姓名'; col3Text = '单位/备注';
      } else if (order === 'name_other_phone') {
        col1Text = '姓名'; col2Text = '单位/备注'; col3Text = '电话';
      }
      
      ctx.fillStyle = 'rgba(231, 76, 60, 0.7)';
      ctx.fillText(col1Text, x1 / 2, canvas.height / 2);
      
      ctx.fillStyle = 'rgba(46, 204, 113, 0.7)';
      ctx.fillText(col2Text, x1 + (x2 - x1) / 2, canvas.height / 2);
      
      ctx.fillStyle = 'rgba(52, 152, 219, 0.7)';
      ctx.fillText(col3Text, x2 + (canvas.width - x2) / 2, canvas.height / 2);
    }

    function startLocalOcrProcessing() {
      var configPanel = document.getElementById('localOcrConfigPanel');
      if (configPanel) configPanel.style.display = 'none';
      
      showAIScanningUI(tempOcrFileName);
      document.getElementById('aiScanStatus').innerHTML = '正在加载本地 Wasm 神经网络...';
      if (document.getElementById('aiLog1')) {
        document.getElementById('aiLog1').innerHTML = '正在拉取 tesseract.js 识别引擎...';
        document.getElementById('aiLog1').style.opacity = '1';
      }
      
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/tesseract.js/4.1.1/tesseract.min.js')
        .then(function() {
          if (document.getElementById('aiLog1')) document.getElementById('aiLog1').innerHTML = 'Wasm 视觉解析库就绪';
          
          if (tempOcrPdf) {
            processLocalPdfOCR(tempOcrPdf);
          } else {
            processLocalImageOCR();
          }
        })
        .catch(function(err) {
          alert('OCR 引擎加载失败: ' + err.message);
          resetAIImporterUI();
        });
    }

    function processLocalImageOCR() {
      var useSlicing = document.getElementById('chkUseSlicing') ? document.getElementById('chkUseSlicing').checked : true;
      
      if (!useSlicing) {
        if (document.getElementById('aiLog2')) {
          document.getElementById('aiLog2').innerHTML = '正在进行全图 AI 识别，取消切片优化...';
          document.getElementById('aiLog2').style.opacity = '1';
        }
        if (document.getElementById('aiLog3')) {
          document.getElementById('aiLog3').innerHTML = '正在加载语言模型包...';
          document.getElementById('aiLog3').style.opacity = '1';
        }
        
        doTesseractLocal(tempOcrImgDataUrl, function(err, contacts) {
          if (err || !contacts || contacts.length === 0) {
            console.error('Local Full-Image Tesseract failed:', err);
            alert('本地 OCR 识别失败或未检出任何联系人！');
            resetAIImporterUI();
          } else {
            if (document.getElementById('aiLog4')) {
              document.getElementById('aiLog4').innerHTML = '� 本地识别成功，共' + contacts.length + ' 人';
              document.getElementById('aiLog4').style.opacity = '1';
            }
            setTimeout(function() {
              renderAIUnstructuredReport(tempOcrFileName, contacts);
            }, 800);
          }
        });
        return;
      }

      var img = new Image();
      img.src = tempOcrImgDataUrl;
      img.onload = function() {
        if (document.getElementById('aiLog2')) {
          document.getElementById('aiLog2').innerHTML = '正在进行列拆片预处理...';
          document.getElementById('aiLog2').style.opacity = '1';
        }
        
        var split1 = parseInt(document.getElementById('sliderSplit1').value) / 100;
        var split2 = parseInt(document.getElementById('sliderSplit2').value) / 100;
        var order = document.getElementById('ocrColumnOrder').value;
        
        var slices = sliceAndPreprocess(img, split1, split2, order);
        
        if (document.getElementById('aiLog2')) document.getElementById('aiLog2').innerHTML = '图像二值化与 2x 缩放完成';
        if (document.getElementById('aiLog3')) {
          document.getElementById('aiLog3').innerHTML = '正在初始化中英文语言模型包...';
          document.getElementById('aiLog3').style.opacity = '1';
        }
        
        if (document.getElementById('aiLog2')) {
          document.getElementById('aiLog2').innerHTML = '正在并行运行本地 OCR 与云端视觉识别...';
          document.getElementById('aiLog2').style.opacity = '1';
        }
        
        var localOcrPromise = runTesseractOnSlices(slices, img);
        
        var cloudVisionPromise = fetch('/api/ocr', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: tempOcrImgDataUrl })
        })
        .then(function(r) { return r.json(); })
        .then(function(data) { return data.text || ''; })
        .catch(function(err) {
          console.warn('Cloud Vision AI failed:', err);
          return '';
        });
        
        Promise.all([localOcrPromise, cloudVisionPromise])
          .then(function(results) {
            var localContacts = results[0];
            var visionText = results[1];
            
            if (!visionText) {
              if (document.getElementById('aiLog3')) {
                document.getElementById('aiLog3').innerHTML = '云端视觉识别不可用，仅使用本地识别结果';
              }
              if (localContacts && localContacts.length > 0) {
                setTimeout(function() {
                  renderAIUnstructuredReport(tempOcrFileName, localContacts);
                }, 800);
              } else {
                alert('本地识别未检出联系人。');
                resetAIImporterUI();
              }
              return;
            }
            
            if (document.getElementById('aiLog3')) {
              document.getElementById('aiLog3').innerHTML = '正在使用大模型对双通道数据进行对齐与纠错...';
            }
            
            return fetch('/api/ocr/correct', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                localContacts: localContacts,
                visionText: visionText,
                fileName: tempOcrFileName || 'local_ocr_hybrid'
              })
            })
            .then(function(r) { return r.json(); })
            .then(function(mergeResult) {
              var mergedContacts = mergeResult.contacts || localContacts;
              if (document.getElementById('aiLog4')) {
                document.getElementById('aiLog4').innerHTML = '� 双通道融合纠错完成，共' + mergedContacts.length + ' 人';
                document.getElementById('aiLog4').style.opacity = '1';
              }
              setTimeout(function() {
                renderAIUnstructuredReport(tempOcrFileName, mergedContacts);
              }, 800);
            });
          })
          .catch(function(err) {
            console.error('Hybrid OCR pipeline failed:', err);
            alert('识别处理失败: ' + err.message);
            resetAIImporterUI();
          });
      };
    }

    function processLocalPdfOCR(pdf) {
      var maxPages = pdf.numPages;
      var allContacts = [];
      
      var split1 = parseInt(document.getElementById('sliderSplit1').value) / 100;
      var split2 = parseInt(document.getElementById('sliderSplit2').value) / 100;
      var order = document.getElementById('ocrColumnOrder').value;
      
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      
      function processPage(pageNumber) {
        if (pageNumber > maxPages) {
          if (allContacts.length > 0) {
            if (document.getElementById('aiScanStatus')) {
              document.getElementById('aiScanStatus').innerHTML = '本地 PDF 识别完成';
            }
            if (document.getElementById('aiLog4')) {
              document.getElementById('aiLog4').innerHTML = '� 共识别到' + allContacts.length + ' 个联系人';
            }
            setTimeout(function() {
              renderAIUnstructuredReport(tempOcrFileName, allContacts);
            }, 800);
          } else {
            alert('本地 PDF 识别未检出联系人。请尝试在上方调整分割线滑块并重新识别。');
            resetAIImporterUI();
          }
          return;
        }
        
        document.getElementById('aiScanStatus').innerHTML = '� 本地 Wasm 识别第' + pageNumber + '/' + maxPages + ' 页...';
        if (document.getElementById('aiLog4')) {
          document.getElementById('aiLog4').innerHTML = '正在识别第 ' + pageNumber + ' 页...';
          document.getElementById('aiLog4').style.opacity = '1';
        }
        
        pdf.getPage(pageNumber).then(function(page) {
          var viewport = page.getViewport({ scale: 1.5 });
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          
          page.render({
            canvasContext: ctx,
            viewport: viewport
          }).promise.then(function() {
            var img = new Image();
            var imgDataUrl = canvas.toDataURL('image/jpeg', 0.95);
            img.src = imgDataUrl;
            img.onload = function() {
              var slices = sliceAndPreprocess(img, split1, split2, order);
              
              var localOcrPromise = runTesseractOnSlices(slices, img);
              
              var cloudVisionPromise = fetch('/api/ocr', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: imgDataUrl })
              })
              .then(function(r) { return r.json(); })
              .then(function(data) { return data.text || ''; })
              .catch(function(err) {
                console.warn('PDF page cloud vision failed:', err);
                return '';
              });
              
              Promise.all([localOcrPromise, cloudVisionPromise])
                .then(function(results) {
                  var localContacts = results[0];
                  var visionText = results[1];
                  
                  if (!visionText) {
                    allContacts = allContacts.concat(localContacts);
                    processPage(pageNumber + 1);
                    return;
                  }
                  
                  return fetch('/api/ocr/correct', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      localContacts: localContacts,
                      visionText: visionText,
                      fileName: tempOcrFileName || 'local_pdf_hybrid'
                    })
                  })
                  .then(function(r) { return r.json(); })
                  .then(function(mergeResult) {
                    var mergedContacts = mergeResult.contacts || localContacts;
                    allContacts = allContacts.concat(mergedContacts);
                    processPage(pageNumber + 1);
                  });
                })
                .catch(function(err) {
                  console.error('Page ' + pageNumber + ' hybrid OCR failed:', err);
                  processPage(pageNumber + 1);
                });
            };
          });
        });
      }
      
      if (document.getElementById('aiLog3')) {
        document.getElementById('aiLog3').innerHTML = '初始化本地识别队列成功';
        document.getElementById('aiLog3').style.opacity = '1';
      }
      
      processPage(1);
    }

    function runCloudImageOCR(file) {
      console.warn('runCloudImageOCR is deprecated');
      alert('云端视觉 OCR 识别已弃用，请配置本地 OCR (Tesseract) 或文本 AI 纠错管线。');
      resetAIImporterUI();
    }

    function runCloudPdfOCR(pdf, fileName) {
      // Workers AI runs on the server side and does not require a client API key.
      var aiKey = true;
      
      var maxPages = pdf.numPages;
      var allContacts = [];
      
      showAIScanningUI(fileName);
      if (document.getElementById('aiScanStatus')) {
        document.getElementById('aiScanStatus').innerHTML = '本地未检出，正切换为云端 AI 视觉识别...';
      }
      if (document.getElementById('aiLog3')) {
        document.getElementById('aiLog3').innerHTML = '正在通过 Canvas 渲染多模态图像...';
      }
      if (document.getElementById('aiLog4')) {
        document.getElementById('aiLog4').innerHTML = '准备识别第 1/' + maxPages + ' 页...';
        document.getElementById('aiLog4').style.opacity = '1';
      }

      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');

      function processPageOCR(pageNumber) {
        if (pageNumber > maxPages) {
          if (document.getElementById('aiScanStatus')) {
            document.getElementById('aiScanStatus').innerHTML = '扫描版 PDF 识别完成';
          }
          if (document.getElementById('aiLog4')) {
            document.getElementById('aiLog4').innerHTML = '� 共识别到' + allContacts.length + ' 个联系人';
          }
          setTimeout(function() {
            renderAIUnstructuredReport(fileName, allContacts);
          }, 800);
          return;
        }

        if (document.getElementById('aiLog4')) {
          document.getElementById('aiLog4').innerHTML = '正在通过 AI 识别第 ' + pageNumber + '/' + maxPages + ' 页...';
        }

        pdf.getPage(pageNumber).then(function(page) {
          var viewport = page.getViewport({ scale: 1.5 });
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          var renderContext = {
            canvasContext: ctx,
            viewport: viewport
          };

          page.render(renderContext).promise.then(function() {
            var imgData = canvas.toDataURL('image/jpeg', 0.75);

            fetch('/api/ocr', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ image: imgData, mode: 'bulk' })
            })
            .then(function(r) {
              return r.text().then(function(t) {
                try {
                  var d = JSON.parse(t);
                  return d;
                } catch(e) {
                  throw new Error('服务器异常 (' + r.status + '): ' + t.substring(0, 100));
                }
              });
            })
            .then(function(result) {
              var pageContacts = [];
              if (result.contacts && result.contacts.length > 0) {
                result.contacts.forEach(function(c) {
                  if (c.phone) {
                    pageContacts.push({
                      name: c.name || '',
                      phone: c.phone,
                      company: c.company || '',
                      note: c.note || ''
                    });
                  }
                });
              } else if (result.name || result.phone) {
                pageContacts.push({
                  name: result.name || '',
                  phone: result.phone || '',
                  company: result.company || '',
                  note: result.note || result.fund || ''
                });
              }
              if (result.rawText || result.note) {
                var extra = parsePhoneContactsFromRawText(result.rawText || result.note || '');
                extra.forEach(function(ec) {
                  if (!pageContacts.find(function(c) { return c.phone === ec.phone; })) {
                    pageContacts.push(ec);
                  }
                });
              }

              allContacts = allContacts.concat(pageContacts);
              processPageOCR(pageNumber + 1);
            })
            .catch(function(err) {
              console.error('Page ' + pageNumber + ' OCR failed:', err.message);
              if (document.getElementById('aiLog3')) {
                document.getElementById('aiLog3').innerHTML = '第 ' + pageNumber + ' 页识别失败: ' + err.message + '，尝试下一页...';
              }
              processPageOCR(pageNumber + 1);
            });
          });
        }).catch(function(err) {
          console.error('Page ' + pageNumber + ' render failed:', err.message);
          processPageOCR(pageNumber + 1);
        });
      }

      processPageOCR(1);
    }





    function sliceAndPreprocess(img, split1, split2, order) {
      var w = img.naturalWidth || img.width;
      var h = img.naturalHeight || img.height;
      
      var x1 = w * split1;
      var x2 = w * split2;
      
      var col1 = { startX: 0, width: x1 };
      var col2 = { startX: x1, width: x2 - x1 };
      var col3 = { startX: x2, width: w - x2 };
      
      var sliceTypes = ['name', 'phone', 'other'];
      if (order === 'phone_name_other') {
        sliceTypes = ['phone', 'name', 'other'];
      } else if (order === 'name_other_phone') {
        sliceTypes = ['name', 'other', 'phone'];
      }
      
      var results = [];
      [col1, col2, col3].forEach(function(col, idx) {
        var type = sliceTypes[idx];
        
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        
        var sX = col.startX;
        var cW = col.width;
        if (type === 'name') {
          // Removed physical crop to avoid cutting into surnames that are close to the edge
          // We will use color filtering below to wash away the blue icon
        }
        
        canvas.width = cW * 2;
        canvas.height = h * 2;
        
        ctx.drawImage(img, sX, 0, cW, h, 0, 0, canvas.width, canvas.height);
        
        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imgData.data;
        
        var histogram = new Array(256).fill(0);
        var totalPixels = data.length / 4;
        
        for (var i = 0; i < data.length; i += 4) {
          var r = data[i];
          var g = data[i+1];
          var b = data[i+2];
          
          if (type === 'name') {
            var val = Math.min(r, g, b);
            if (b > r + 30 && b > g + 10 && r < 180) {
              // Wash away blue corner mark by making it white
              val = 255;
            } else if (r > g + 10 && r > b + 10) {
              var redness = r - Math.max(g, b);
              val = Math.max(0, val - redness * 2);
            }
            data[i] = val;
            data[i+1] = val;
            data[i+2] = val;
            histogram[val]++;
          } else {
            var val = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
            data[i] = val;
            data[i+1] = val;
            data[i+2] = val;
            histogram[val]++;
          }
        }
        
        var sum = 0;
        for (var i = 0; i < 256; i++) sum += i * histogram[i];
        var sumB = 0;
        var wB = 0;
        var wF = 0;
        var varMax = 0;
        var threshold = 140;
        for (var t = 0; t < 256; t++) {
          wB += histogram[t];
          if (wB === 0) continue;
          wF = totalPixels - wB;
          if (wF === 0) break;
          sumB += t * histogram[t];
          var mB = sumB / wB;
          var mF = (sum - sumB) / wF;
          var varBetween = wB * wF * (mB - mF) * (mB - mF);
          if (varBetween > varMax) {
            varMax = varBetween;
            threshold = t;
          }
        }
        
        for (var i = 0; i < data.length; i += 4) {
          var finalVal = data[i] < threshold ? 0 : 255;
          data[i] = finalVal;
          data[i+1] = finalVal;
          data[i+2] = finalVal;
        }
        
        ctx.putImageData(imgData, 0, 0);
        
        results.push({
          type: type,
          startX: col.startX,
          width: col.width,
          dataUrl: canvas.toDataURL('image/png')
        });
      });
      
      return results;
    }

    function runTesseractOnSlices(slices, img) {
      function cropCellInBrowser(sourceImg, yCenter, col, keepColor) {
        var cellCanvas = document.createElement('canvas');
        var cellCtx = cellCanvas.getContext('2d');
        
        var w = col ? col.width : 77;
        var startX = col ? col.startX : 0;
        
        // Removed physical crop to prevent cutting surnames
        
        cellCanvas.width = w * 2;
        cellCanvas.height = 48 * 2;
        
        var imgH = sourceImg.naturalHeight || sourceImg.height;
        var yStart = Math.max(0, Math.min(Math.round(yCenter - 24), imgH - 48));
        cellCtx.drawImage(sourceImg, startX, yStart, w, 48, 0, 0, cellCanvas.width, cellCanvas.height);
        
        if (keepColor) {
          return cellCanvas.toDataURL('image/png');
        }
        
        var imgData = cellCtx.getImageData(0, 0, cellCanvas.width, cellCanvas.height);
        var data = imgData.data;
        
        var histogram = new Array(256).fill(0);
        for (var i = 0; i < data.length; i += 4) {
          var r = data[i];
          var g = data[i+1];
          var b = data[i+2];
          
          var val = Math.min(r, g, b);
          if (b > r + 30 && b > g + 10 && r < 180) {
            // Wash away blue corner mark by making it white
            val = 255;
          } else if (r > g + 10 && r > b + 10) {
            var redness = r - Math.max(g, b);
            val = Math.max(0, val - redness * 2);
          }
          data[i] = val;
          data[i+1] = val;
          data[i+2] = val;
          histogram[val]++;
        }
        
        var sum = 0;
        for (var i = 0; i < 256; i++) sum += i * histogram[i];
        var sumB = 0, wB = 0, wF = 0, varMax = 0, threshold = 140;
        var totalPixels = data.length / 4;
        for (var t = 0; t < 256; t++) {
          wB += histogram[t];
          if (wB === 0) continue;
          wF = totalPixels - wB;
          if (wF === 0) break;
          sumB += t * histogram[t];
          var mB = sumB / wB;
          var mF = (sum - sumB) / wF;
          var varBetween = wB * wF * (mB - mF) * (mB - mF);
          if (varBetween > varMax) {
            varMax = varBetween;
            threshold = t;
          }
        }
        
        for (var i = 0; i < data.length; i += 4) {
          var finalVal = data[i] < threshold ? 0 : 255;
          data[i] = finalVal;
          data[i+1] = finalVal;
          data[i+2] = finalVal;
        }
        
        cellCtx.putImageData(imgData, 0, 0);
        return cellCanvas.toDataURL('image/png');
      }

      return Tesseract.createWorker({
        workerPath: window.location.origin + '/tessdata/worker.min.js',
        corePath: window.location.origin + '/tessdata/core',
        langPath: window.location.origin + '/tessdata',
        logger: function(m) {
          if (m.status === 'recognizing text') {
            var pct = Math.round(m.progress * 100);
            document.getElementById('aiScanStatus').innerHTML = '本地 OCR 进行中: ' + pct + '%';
          } else if (m.status === 'loading chi_sim.traineddata' || m.status === 'loading eng.traineddata') {
            var loadPct = m.progress ? ' (' + Math.round(m.progress * 100) + '%)' : '';
            document.getElementById('aiScanStatus').innerHTML = '正在载入语言模型包' + loadPct + '...';
          }
        }
      }).then(function(worker) {
        var workerObj = worker;
        
        return Promise.resolve(worker.load())
          .then(function() { return Promise.resolve(worker.loadLanguage('chi_sim')); })
          .then(function() { return Promise.resolve(worker.initialize('chi_sim')); })
          .then(function() {
            var results = {};
            
            function recognizeNext(idx) {
              if (idx >= slices.length) {
                return Promise.resolve(results);
              }
              var slice = slices[idx];
              
              var params = {
                tessedit_pageseg_mode: '6',
                tessedit_char_whitelist: ''
              };
              if (slice.type === 'phone') {
                params.tessedit_char_whitelist = '0123456789- ';
              }
              
              document.getElementById('aiScanStatus').innerHTML = '正在识别列: ' + (slice.type === 'name' ? '姓名' : (slice.type === 'phone' ? '电话' : '单位/备注')) + '...';
              
              return Promise.resolve(workerObj.setParameters(params))
                .then(function() { return Promise.resolve(workerObj.recognize(slice.dataUrl)); })
                .then(function(ocrRes) {
                  results[slice.type] = ocrRes.data.lines.map(function(line) {
                    return {
                      text: line.text,
                      yCenter: (line.bbox.y0 + line.bbox.y1) / 4
                    };
                  });
                  return recognizeNext(idx + 1);
                });
            }
            
            return recognizeNext(0);
          })
          .then(function(ocrData) {
            var names = ocrData.name || [];
            var phones = ocrData.phone || [];
            var companies = ocrData.other || [];
            
            var contacts = [];
            phones.forEach(function(pItem) {
              var phoneText = pItem.text.replace(/s+/g, '').trim();
              phoneText = phoneText.replace(/[OoQD]/g, '0').replace(/[lIi|!]/g, '1').replace(/[Z]/g, '2').replace(/[B]/g, '8').replace(/[S]/g, '5').replace(/[G]/g, '6').replace(/[A]/g, '4').replace(/[T]/g, '7').replace(/[g]/g, '9');
              var phoneMatch = phoneText.match(/1[3-9]d{9}/);
              if (!phoneMatch) return;
              var cleanPhone = phoneMatch[0];
              
              var bestName = '';
              var minNameDist = 99999;
              names.forEach(function(nItem) {
                var dist = Math.abs(nItem.yCenter - pItem.yCenter);
                if (dist < minNameDist && dist < 30) {
                  minNameDist = dist;
                  bestName = nItem.text.trim();
                }
              });
              
              var bestCompany = '';
              var minCompanyDist = 99999;
              companies.forEach(function(cItem) {
                var dist = Math.abs(cItem.yCenter - pItem.yCenter);
                if (dist < minCompanyDist && dist < 30) {
                  minCompanyDist = dist;
                  bestCompany = cItem.text.trim();
                }
              });
              
              bestName = bestName.replace(/^[新旧听一]s*/, '').replace(/[^一-龥a-zA-Z]/g, '').trim();
              bestCompany = bestCompany.replace(/^[|丨s:]+/, '').replace(/[|丨s:]+$/, '').trim();
              
              contacts.push({
                name: bestName,
                phone: cleanPhone,
                company: bestCompany,
                note: '',
                yCenter: pItem.yCenter,
                minNameDist: minNameDist
              });
            });
            
            // Return local contacts directly, as we will use a hybrid full-image merge later
            try { workerObj.terminate(); } catch(e) {}
            return Promise.resolve(contacts.map(function(c) {
              return {
                name: c.name || '',
                phone: c.phone,
                company: c.company,
                note: '',
                yCenter: c.yCenter
              };
            }));
          })
          .catch(function(err) {
            try { workerObj.terminate(); } catch(e) {}
            throw err;
          });
      });
    }

    function runLocalScannedPdfSlicingOCR(pdf, fileName) {
      tempOcrFile = null;
      tempOcrPdf = pdf;
      tempOcrFileName = fileName;
      
      pdf.getPage(1).then(function(page) {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var viewport = page.getViewport({ scale: 1.5 });
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        
        page.render({
          canvasContext: ctx,
          viewport: viewport
        }).promise.then(function() {
          tempOcrImgDataUrl = canvas.toDataURL('image/jpeg', 0.95);
          showOcrSlicingPreview(tempOcrImgDataUrl);
        });
      });
    }

    // ====== Multi-Image Queue OCR ======
    var multiImageQueue = [];
    var multiImageResults = [];
    var multiImageAborted = false;

    function handleMultiImageOCR(files) {
      multiImageQueue = files;
      multiImageResults = [];
      multiImageAborted = false;
      var total = files.length;

      var ocrEngine = 'local';
      tempOcrEngine = 'local_tesseract';

      // Set up scanning UI directly (skip showAIScanningUI timeouts to avoid progress overwrite)
      document.getElementById('aiImportInit').style.display = 'none';
      document.getElementById('aiImportReport').style.display = 'none';
      document.getElementById('aiImportScanning').style.display = 'flex';
      document.getElementById('aiLaserLine').style.display = 'block';
      document.getElementById('aiScanStatus').innerHTML = '多图排队识别 · 共 ' + total + ' 张';
      document.getElementById('aiLog1').innerHTML = '队列就绪，准备逐张识别...'; document.getElementById('aiLog1').style.opacity = '1';
      document.getElementById('aiLog2').innerHTML = '等待处理第 1/' + total + ' 张...'; document.getElementById('aiLog2').style.opacity = '1';
      document.getElementById('aiLog3').innerHTML = '引擎: 本地离线 (Wasm)'; document.getElementById('aiLog3').style.opacity = '0.8';
      document.getElementById('aiLog4').innerHTML = '进度: 0/' + total; document.getElementById('aiLog4').style.opacity = '0.8';

      processNextInQueue(0);
    }

    function processNextInQueue(index) {
      if (multiImageAborted) return;
      if (index >= multiImageQueue.length) {
        finishMultiImageOCR();
        return;
      }

      var file = multiImageQueue[index];
      var total = multiImageQueue.length;
      var current = index + 1;

      if (document.getElementById('aiScanStatus')) {
        document.getElementById('aiScanStatus').innerHTML = '正在识别 第 ' + current + '/' + total + ' 张: ' + esc(file.name);
      }
      if (document.getElementById('aiLog2')) {
        document.getElementById('aiLog2').innerHTML = '处理中: ' + esc(file.name) + ' (' + current + '/' + total + ')';
        document.getElementById('aiLog2').style.opacity = '1';
      }
      if (document.getElementById('aiLog4')) {
        document.getElementById('aiLog4').innerHTML = '进度: ' + current + '/' + total;
        document.getElementById('aiLog4').style.opacity = '1';
      }

      processSingleImageLocal(file, function(err, contacts) {
        if (err) {
          if (document.getElementById('aiLog3')) {
            document.getElementById('aiLog3').innerHTML = '' + esc(file.name) + ' 本地识别失败: ' + err.message + '，继续下一张...';
            document.getElementById('aiLog3').style.opacity = '1';
          }
        } else {
          if (document.getElementById('aiLog3')) {
            document.getElementById('aiLog3').innerHTML = '' + esc(file.name) + ' 本地识别完成 (' + contacts.length + ' 个联系人)';
            document.getElementById('aiLog3').style.opacity = '1';
          }
          multiImageResults = multiImageResults.concat(contacts);
        }
        
        if (index + 1 < multiImageQueue.length) {
          if (document.getElementById('aiLog3')) {
            document.getElementById('aiLog3').innerHTML = '触发防并发排队保护，等待1秒后处理下一张...';
          }
          setTimeout(function() {
            processNextInQueue(index + 1);
          }, 1000);
        } else {
          processNextInQueue(index + 1);
        }
      });
    }

    var _tesseractWorker = null;
    var _tesseractReady = false;

    function getTesseractWorker(callback) {
      if (_tesseractWorker && _tesseractReady) {
        callback(null, _tesseractWorker);
        return;
      }
      if (_tesseractWorker && !_tesseractReady) {
        // Worker is being initialized, poll
        var start = Date.now();
        var check = setInterval(function() {
          if (_tesseractReady) {
            clearInterval(check);
            callback(null, _tesseractWorker);
          } else if (Date.now() - start > 30000) {
            clearInterval(check);
            callback(new Error('Tesseract worker init timeout'), null);
          }
        }, 200);
        return;
      }

      if (typeof Tesseract === 'undefined') {
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/tesseract.js/4.1.1/tesseract.min.js')
          .then(function() { createAndInitWorker(callback); })
          .catch(function(err) { callback(err, null); });
      } else {
        createAndInitWorker(callback);
      }
    }

    function createAndInitWorker(callback) {
      Tesseract.createWorker({
        workerPath: window.location.origin + '/tessdata/worker.min.js',
        corePath: window.location.origin + '/tessdata/core',
        langPath: window.location.origin + '/tessdata'
      }).then(function(worker) {
        _tesseractWorker = worker;
        return Promise.resolve(worker.load())
          .then(function() { return Promise.resolve(worker.loadLanguage('chi_sim+eng')); })
          .then(function() { return Promise.resolve(worker.initialize('chi_sim+eng')); })
          .then(function() {
            return Promise.resolve(worker.setParameters({
              tessedit_pageseg_mode: '6'
            }));
          })
          .then(function() {
            _tesseractReady = true;
            callback(null, worker);
          });
      }).catch(function(err) {
        _tesseractWorker = null;
        callback(err, null);
      });
    }

    function processSingleImageLocal(file, callback) {
      // Create a fresh worker for each image to avoid stale worker state issues
      function createFreshWorker(imageSource) {
        if (typeof Tesseract === 'undefined') {
          loadScript('https://cdnjs.cloudflare.com/ajax/libs/tesseract.js/4.1.1/tesseract.min.js')
            .then(function() { doCreate(imageSource); })
            .catch(function(err) { callback(err, []); });
        } else {
          doCreate(imageSource);
        }
      }

      function doCreate(imageSource) {
        Tesseract.createWorker({
          workerPath: window.location.origin + '/tessdata/worker.min.js',
          corePath: window.location.origin + '/tessdata/core',
          langPath: window.location.origin + '/tessdata'
        }).then(function(worker) {
          return Promise.resolve(worker.load())
            .then(function() { return Promise.resolve(worker.loadLanguage('chi_sim+eng')); })
            .then(function() { return Promise.resolve(worker.initialize('chi_sim+eng')); })
            .then(function() { return Promise.resolve(worker.setParameters({ tessedit_pageseg_mode: '6' })); })
            .then(function() { return Promise.resolve(worker.recognize(imageSource)); })
            .then(function(result) {
              try { worker.terminate(); } catch(e) {}
              return result;
            })
            .catch(function(err) {
              try { worker.terminate(); } catch(e) {}
              throw err;
            });
        }).then(function(result) {
          var text = result.data.text;
          correctOcrTextWithAI(text, typeof file === 'string' ? 'image_data' : (file.name || 'image_ocr'), function(contacts) {
            callback(null, contacts);
          });
        }).catch(function(err) {
          console.error('[MultiImg] OCR worker failed:', err.message);
          callback(err, []);
        });
      }

      function runOcr(imageSource) {
        createFreshWorker(imageSource);
      }

      var img = new Image();
      img.onload = function() {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        ctx.drawImage(img, 0, 0);
        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imgData.data;
        for (var i = 0; i < data.length; i += 4) {
          var r = data[i], g = data[i+1], b = data[i+2];
          if (b > r + 30 && b > g + 10 && r < 180) {
            data[i] = 255; data[i+1] = 255; data[i+2] = 255;
          }
        }
        ctx.putImageData(imgData, 0, 0);
        runOcr(canvas.toDataURL('image/png'));
      };
      img.onerror = function() { runOcr(file); };

      if (typeof file === 'string') {
        img.src = file;
      } else {
        var reader = new FileReader();
        reader.onload = function(e) { img.src = e.target.result; };
        reader.onerror = function() { runOcr(file); };
        reader.readAsDataURL(file);
      }
    }

    function doTesseractLocal(file, callback) {
      processSingleImageLocal(file, callback);
    }

    function finishMultiImageOCR() {
      var total = multiImageQueue.length;
      if (document.getElementById('aiScanStatus')) {
        document.getElementById('aiScanStatus').innerHTML = '多图排队识别完成 · 共 ' + total + ' 张图片';
      }
      if (document.getElementById('aiLog2')) {
        document.getElementById('aiLog2').innerHTML = '� 全部处理完毕';
        document.getElementById('aiLog2').style.opacity = '1';
      }
      if (document.getElementById('aiLog4')) {
        document.getElementById('aiLog4').innerHTML = '合计识别: ' + multiImageResults.length + ' 个联系人';
        document.getElementById('aiLog4').style.opacity = '1';
      }

      // Deduplicate by phone
      var seenPhones = {};
      var deduped = [];
      multiImageResults.forEach(function(c) {
        if (!seenPhones[c.phone]) {
          seenPhones[c.phone] = true;
          deduped.push(c);
        }
      });

      setTimeout(function() {
        renderAIUnstructuredReport(multiImageQueue.length + ' 张图片', deduped);
      }, 600);
    }

    function handleImageOCR(file) {
      tempOcrEngine = 'local_tesseract';
      runLocalTableSlicingOCR(file);
    }

    function runLocalTableSlicingOCR(file) {
      tempOcrFile = file;
      tempOcrPdf = null;
      tempOcrFileName = file.name;
      tempOcrEngine = 'local_tesseract';
      
      var reader = new FileReader();
      reader.onload = function(e) {
        tempOcrImgDataUrl = e.target.result;
        showOcrSlicingPreview(tempOcrImgDataUrl);
      };
      reader.readAsDataURL(file);
    }



    function runTesseractOCR(file) {
      document.getElementById('aiScanStatus').innerHTML = 'AI 正在载入视觉 OCR 引擎...';
      if (document.getElementById('aiLog1')) {
        document.getElementById('aiLog1').innerHTML = '正在加载 tesseract.js 视觉分析库...';
        document.getElementById('aiLog1').style.opacity = '1';
      }

      loadScript('https://cdnjs.cloudflare.com/ajax/libs/tesseract.js/4.1.1/tesseract.min.js')
        .then(function() {
          if (document.getElementById('aiLog2')) {
            document.getElementById('aiLog2').innerHTML = '视觉神经网络就绪';
            document.getElementById('aiLog2').style.opacity = '1';
          }
          document.getElementById('aiScanStatus').innerHTML = '正在下载中英文语言模型包...';

          if (document.getElementById('aiLog3')) {
            document.getElementById('aiLog3').innerHTML = '正在从 CDN 获取高精 chi_sim+eng 模型...';
            document.getElementById('aiLog3').style.opacity = '1';
          }

          Tesseract.createWorker({
            workerPath: window.location.origin + '/tessdata/worker.min.js',
            corePath: window.location.origin + '/tessdata/core',
            langPath: window.location.origin + '/tessdata',
            logger: function(m) {
              if (m.status === 'recognizing text') {
                var pct = Math.round(m.progress * 100);
                document.getElementById('aiScanStatus').innerHTML = '图像文字 AI 深度识别中：' + pct + '%';
                if (document.getElementById('aiLog3')) {
                  document.getElementById('aiLog3').innerHTML = '模型载入成功，识别进行中...';
                }
                if (document.getElementById('aiLog4')) {
                  document.getElementById('aiLog4').innerHTML = 'OCR 进度:' + pct + '%';
                  document.getElementById('aiLog4').style.opacity = '1';
                }
              } else if (m.status === 'loading chi_sim.traineddata' || m.status === 'loading eng.traineddata') {
                var loadPct = m.progress ? ' (' + Math.round(m.progress * 100) + '%)' : '';
                document.getElementById('aiScanStatus').innerHTML = '正在载入语言模型包' + loadPct + '...';
              }
            }
          }).then(function(worker) {
            return Promise.resolve(worker.load())
              .then(function() { return Promise.resolve(worker.loadLanguage('chi_sim+eng')); })
              .then(function() { return Promise.resolve(worker.initialize('chi_sim+eng')); })
              .then(function() {
                return Promise.resolve(worker.setParameters({
                  tessedit_pageseg_mode: '6'
                }));
              })
              .then(function() { return Promise.resolve(worker.recognize(file)); })
              .then(function(result) {
                try { worker.terminate(); } catch(e) {}
                return result;
              })
              .catch(function(err) {
                try { worker.terminate(); } catch(e) {}
                throw err;
              });
          }).then(function(result) {
            if (document.getElementById('aiLog4')) {
              document.getElementById('aiLog4').innerHTML = '图像文字识别与神经特征映射完毕';
            }
            var text = result.data.text;
            correctOcrTextWithAI(text, file.name, function(contacts) {
              renderAIUnstructuredReport(file.name, contacts);
            });
          }).catch(function(err) {
            alert('本地 OCR 识别失败：' + (err.message || err));
            resetAIImporterUI();
          });
        })
        .catch(function(err) {
          alert('OCR 引擎加载失败：' + err.message);
          resetAIImporterUI();
        });
    }

    function handleTxtImport(file) {
      tempOcrEngine = 'text_fallback';
      showAIScanningUI(file.name);
      document.getElementById('aiScanStatus').innerHTML = '� 正在读取文本文档...';
      if (document.getElementById('aiLog1')) {
        document.getElementById('aiLog1').innerHTML = '文件读取通道建立';
        document.getElementById('aiLog1').style.opacity = '1';
      }
      
      var reader = new FileReader();
      reader.onload = function(e) {
        if (document.getElementById('aiLog2')) {
          document.getElementById('aiLog2').innerHTML = '文档原始二进制流读取成功';
          document.getElementById('aiLog2').style.opacity = '1';
        }
        var text = e.target.result;
        if (document.getElementById('aiLog3')) {
          document.getElementById('aiLog3').innerHTML = 'UTF-8 编码文本清洗完毕';
          document.getElementById('aiLog3').style.opacity = '1';
        }
        if (document.getElementById('aiLog4')) {
          document.getElementById('aiLog4').innerHTML = 'AI 正在运行特征分析提取模型...';
          document.getElementById('aiLog4').style.opacity = '1';
        }
        setTimeout(function() {
          correctOcrTextWithAI(text, file.name, function(contacts) {
            renderAIUnstructuredReport(file.name, contacts);
          });
        }, 600);
      };
      reader.readAsText(file, 'utf-8');
    }

    function renderAIUnstructuredReport(fileName, contacts) {
      // Snapshot original contacts BEFORE user edits (for training feedback)
      tempOcrOriginalContacts = JSON.parse(JSON.stringify(contacts));
      tempOcrFileName = fileName;
      if (!tempOcrEngine) tempOcrEngine = 'text_fallback'; // Default if not set by caller
      tempUnstructuredContacts = contacts;
      tempImportType = 'unstructured';
      tempImportData = contacts;
      
      if (!contacts || contacts.length === 0) {
        if (typeof showCopyLimitToast === 'function') {
          showCopyLimitToast('识别完成，但未提取到有效联系人', true);
        }
        resetAIImporterUI();
        updateDashboardVisibility(true);
        return;
      }

      var el;
      el = document.getElementById('aiImportInit'); if (el) el.style.display = 'none';
      el = document.getElementById('localOcrConfigPanel'); if (el) el.style.display = 'none';
      el = document.getElementById('aiImportScanning'); if (el) el.style.display = 'none';
      el = document.getElementById('aiLaserLine'); if (el) el.style.display = 'none';

      el = document.getElementById('aiExcelMappingPills'); if (el) el.style.display = 'none';
      el = document.getElementById('aiExcelMappingControls'); if (el) el.style.display = 'none';
      el = document.getElementById('aiExcelPreviewContainer'); if (el) el.style.display = 'none';

      var unstContainer = document.getElementById('aiUnstructuredContainer');
      if (unstContainer) unstContainer.style.display = 'block';

      var dz = document.getElementById('dropZone');
      if (dz) {
        dz.style.minHeight = 'auto';
        dz.style.padding = '8px';
      }

      el = document.getElementById('aiReportTitle');
      if (el) el.innerHTML = 'AI 提取报告: ' + esc(fileName);

      var conf = contacts.length > 0 ? 98.0 : 0.0;
      el = document.getElementById('aiConfidenceBadge');
      if (el) el.innerHTML = '● AI 识别率: ' + conf.toFixed(1) + '%';

      renderUnstructuredTableRows();

      el = document.getElementById('aiImportReport');
      if (el) el.style.display = 'flex';
    }

    function renderUnstructuredTableRows() {
      var tbody = document.querySelector('#aiUnstructuredTable tbody');
      if (!tbody) return;
      tbody.innerHTML = '';
      
      if (tempUnstructuredContacts.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px; color: var(--text-light);">未识别到任何带号码的联系人数据</td></tr>';
        document.getElementById('aiConfirmImportBtn').innerHTML = '无数据可导入';
        document.getElementById('aiConfirmImportBtn').disabled = true;
        return;
      }
      
      document.getElementById('aiConfirmImportBtn').disabled = false;
      document.getElementById('aiConfirmImportBtn').innerHTML = '确认导入 (' + tempUnstructuredContacts.length + ' 位联系人)';
      
      tempUnstructuredContacts.forEach(function(c, index) {
        var tr = document.createElement('tr');
        tr.style.borderBottom = '0.5px solid var(--card-border)';
        
        var tdDel = document.createElement('td');
        tdDel.style.padding = '4px 6px';
        tdDel.style.textAlign = 'center';
        var delBtn = document.createElement('button');
        delBtn.innerHTML = '删除';
        delBtn.style.background = 'transparent';
        delBtn.style.border = 'none';
        delBtn.style.cursor = 'pointer';
        delBtn.style.fontSize = '0.75rem';
        delBtn.addEventListener('click', function() {
          tempUnstructuredContacts.splice(index, 1);
          renderUnstructuredTableRows();
        });
        tdDel.appendChild(delBtn);
        
        var tdName = document.createElement('td');
        tdName.style.padding = '4px 6px';
        tdName.style.fontWeight = '800';
        tdName.style.color = 'var(--text-main)';
        tdName.contentEditable = 'true';
        tdName.textContent = c.name;
        tdName.addEventListener('blur', function() {
          tempUnstructuredContacts[index].name = this.textContent.trim();
        });
        
        var tdPhone = document.createElement('td');
        tdPhone.style.padding = '4px 6px';
        tdPhone.style.fontFamily = 'monospace';
        tdPhone.style.color = 'var(--accent-wechat)';
        tdPhone.style.fontWeight = '800';
        tdPhone.contentEditable = 'true';
        tdPhone.textContent = c.phone;
        tdPhone.addEventListener('blur', function() {
          var val = this.textContent.trim().replace(/[-\\s]/g, '');
          tempUnstructuredContacts[index].phone = val;
        });
        
        var tdComp = document.createElement('td');
        tdComp.style.padding = '4px 6px';
        tdComp.style.color = '#4a6cf7';
        tdComp.contentEditable = 'true';
        tdComp.textContent = c.company;
        tdComp.addEventListener('blur', function() {
          tempUnstructuredContacts[index].company = this.textContent.trim();
        });
        
        var tdNote = document.createElement('td');
        tdNote.style.padding = '4px 6px';
        tdNote.style.color = 'var(--text-soft)';
        tdNote.contentEditable = 'true';
        tdNote.textContent = c.note;
        tdNote.addEventListener('blur', function() {
          tempUnstructuredContacts[index].note = this.textContent.trim();
        });
        
        tr.appendChild(tdDel);
        tr.appendChild(tdName);
        tr.appendChild(tdPhone);
        tr.appendChild(tdComp);
        tr.appendChild(tdNote);
        tbody.appendChild(tr);
      });
    }

    function saveOcrCorrection() {
      // Save OCR correction as training data (non-blocking)
      var corrected = tempUnstructuredContacts;
      if (!tempOcrOriginalContacts || tempOcrOriginalContacts.length === 0) return;
      if (!corrected || corrected.length === 0) return;

      // Check if anything actually changed
      var hasChanges = JSON.stringify(tempOcrOriginalContacts) !== JSON.stringify(corrected);
      if (!hasChanges) return;

      fetch('/api/ocr/correction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rawText: tempOcrRawText || '',
          originalContacts: tempOcrOriginalContacts,
          correctedContacts: corrected,
          sourceFile: tempOcrFileName || '',
          ocrPipeline: tempOcrEngine || 'ai_vision',
          ocrMode: 'bulk',
          metadata: {
            batchLabel: (document.getElementById('batchLabelInput') || {}).value || ''
          }
        })
      }).then(function() {
        // Refresh count badge if visible
        fetchTrainingDataCount();
      }).catch(function(err) {
        console.error('Failed to save OCR correction:', err);
        // Non-blocking — don't interrupt import flow
      });
    }

    function executeAIImportUnstructured() {
      if (!canStartNextImportBatch()) return;
      if (!tempUnstructuredContacts || tempUnstructuredContacts.length === 0) return;
      var batchLabel = (document.getElementById('batchLabelInput').value || '').trim();
      var defaultCat = document.getElementById('importCategorySelect') ? document.getElementById('importCategorySelect').value : '公海客户';
      // Tag each client with the batch label and category
      for (var i = 0; i < tempUnstructuredContacts.length; i++) {
        var c = tempUnstructuredContacts[i];
        c.batch_label = batchLabel;
        c.category = defaultCat;
        c.mobile = c.mobile || c.phone;
        c.phone = c.phone || c.mobile;
        if (!c.fund && /^\d{4,5}$/.test((c.note || '').trim())) {
          c.fund = c.note.trim();
          c.note = '';
        }
      }
      // Append new contacts to existing ones instead of overwriting
      if (importedClients && importedClients.length >0) {
 importedClients = importedClients.concat(tempUnstructuredContacts);
 } else {
 importedClients = tempUnstructuredContacts;
 }
 saveState();
 updateDashboardVisibility(true);
 renderDialCards();

 // Auto-upload to Supabase
 uploadCustomersToSupabase(tempUnstructuredContacts, batchLabel);

 // Save OCR correction for training feedback loop (before reset clears state)
 saveOcrCorrection();

 resetAIImporterUI();
 }

 function initAIImporter() {
 var el;
 el = document.getElementById('aiToggleAdjustBtn');
 if (el) {
 el.addEventListener('click', function(e) {
 e.preventDefault();
 var ctrl = document.getElementById('aiAdjustControls');
 if (ctrl) {
 if (ctrl.style.display === 'none') {
 ctrl.style.display = 'grid';
 this.textContent = '收起手动修正配置 ▴';
 } else {
 ctrl.style.display = 'none';
 this.textContent = '手动修正 AI 映射结果 ▾';
 }
 }
 });
 }

 el = document.getElementById('aiSelName'); if (el) el.addEventListener('change', updateAIPreviewTable);
 el = document.getElementById('aiSelPhone'); if (el) el.addEventListener('change', updateAIPreviewTable);
 el = document.getElementById('aiSelCompany'); if (el) el.addEventListener('change', updateAIPreviewTable);
 el = document.getElementById('aiSelNote'); if (el) el.addEventListener('change', updateAIPreviewTable);

 el = document.getElementById('aiResetImportBtn');
 if (el) {
 el.addEventListener('click', function(e) {
 e.preventDefault();
 resetAIImporterUI();
 });
 }

 el = document.getElementById('aiConfirmImportBtn');
 if (el) {
 el.addEventListener('click', function(e) {
 e.preventDefault();
 if (tempImportType === 'xlsx') {
 executeAIImportExcel();
 } else if (tempImportType === 'vcf') {
 executeAIImportVcf();
 } else if (tempImportType === 'unstructured') {
 executeAIImportUnstructured();
 }
 });
 }

 // Text paste button: use AI correction
 var textExtractBtn = document.getElementById('textImportExtractBtn');
 if (textExtractBtn) {
 textExtractBtn.addEventListener('click', function() {
 var t = document.getElementById('textImportArea').value.trim();
 if (!t) { alert('请先粘贴文本'); return; }
 var btn = this;
 btn.disabled = true;
 btn.textContent = 'AI 修正中...';
 // Show scanning UI for visual feedback
 showAIScanningUI('文本粘贴识别');
 document.getElementById('aiScanStatus').innerHTML = '正在智能解析粘贴的文本...';
 document.getElementById('aiLog1').innerHTML = ' 正在分析文本格式与内容...';
 document.getElementById('aiLog1').style.opacity = '1';
 document.getElementById('textImportPanel').style.display = 'none';
 correctOcrTextWithAI(t, '文本粘贴', function(contacts) {
 btn.textContent = '智能识别提取';
 btn.disabled = false;
 if (contacts && contacts.length > 0) {
 window.renderAIUnstructuredReport('文本粘贴', contacts);
 } else {
 // Fallback to server-side extraction
 btn.textContent = '本地未检出，切换云端 AI...';
 document.getElementById('aiLog2').innerHTML = '本地引擎未检出，尝试云端 AI 识别...';
 document.getElementById('aiLog2').style.opacity = '1';
 fetch('/api/ocr/text', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ rawText: t }) })
 .then(function(r) { return r.json(); })
 .then(function(d) {
 btn.textContent = '智能识别提取';
 btn.disabled = false;
 if (d.contacts && d.contacts.length > 0) {
 window.renderAIUnstructuredReport('云端文本解析', d.contacts);
 } else {
 resetAIImporterUI();
 document.getElementById('textImportPanel').style.display = 'flex';
 document.getElementById('textImportArea').value = t;
 alert('本地与云端 AI 均未识别到联系人，请确认文本包含有效手机号');
 }
 }).catch(function(e) {
 btn.textContent = '智能识别提取';
 btn.disabled = false;
 resetAIImporterUI();
 document.getElementById('textImportPanel').style.display = 'flex';
 document.getElementById('textImportArea').value = t;
 alert('识别失败: ' + e.message);
 });
 }
 });
 });
 }

 // Batch-fill only missing names and company names in text/VCF imports
 var bulkFillBtn = document.getElementById('applyBulkMissingFieldsBtn');
 if (bulkFillBtn) {
   bulkFillBtn.addEventListener('click', function() {
     var nameValue = (document.getElementById('bulkMissingName') || {}).value || '';
     var companyValue = (document.getElementById('bulkMissingCompany') || {}).value || '';
     nameValue = nameValue.trim();
     companyValue = companyValue.trim();
     if (!nameValue && !companyValue) {
       alert('请至少填写姓名或单位名称');
       return;
     }
     var nameCount = 0;
     var companyCount = 0;
     for (var bi = 0; bi < tempUnstructuredContacts.length; bi++) {
       var contact = tempUnstructuredContacts[bi];
       if (nameValue && (!contact.name || !String(contact.name).trim() || String(contact.name).trim() === '未知姓名')) {
         contact.name = nameValue;
         nameCount++;
       }
       if (companyValue && (!contact.company || !String(contact.company).trim())) {
         contact.company = companyValue;
         companyCount++;
       }
     }
     renderUnstructuredTableRows();
     var hint = document.getElementById('bulkMissingFieldsHint');
     if (hint) hint.textContent = '已补充：姓名 ' + nameCount + ' 条，单位 ' + companyCount + ' 条；原有内容未覆盖。';
   });
 }

 // Init OCR training data UI
 initOcrCorrectionUI();
 }

 // ====== OCR Training Data Review UI ======

 function initOcrCorrectionUI() {
 var btn = document.getElementById('ocrTrainingDataBtn');
 var modal = document.getElementById('ocrCorrectionModal');
 var closeBtn = document.getElementById('closeOcrCorrectionBtn');
 var exportBtn = document.getElementById('ocrExportJsonlBtn');
 var refreshBtn = document.getElementById('ocrRefreshCorrectionsBtn');
 var filterCheckbox = document.getElementById('ocrFilterEditsOnly');

 // Open modal
 if (btn && modal) {
 btn.addEventListener('click', function() {
 modal.classList.add('active');
 loadOcrCorrections();
 });
 }

 // Close modal
 if (closeBtn && modal) {
 closeBtn.addEventListener('click', function() { modal.classList.remove('active'); });
 modal.addEventListener('click', function(e) {
 if (e.target === modal) modal.classList.remove('active');
 });
 }

 // Export JSONL
 if (exportBtn) {
 exportBtn.addEventListener('click', function() {
 window.open('/api/ocr/corrections/export?limit=500', '_blank');
 });
 }

 // Refresh
 if (refreshBtn) {
 refreshBtn.addEventListener('click', loadOcrCorrections);
 }

 // Filter toggle
 if (filterCheckbox) {
 filterCheckbox.addEventListener('change', loadOcrCorrections);
 }

 // Initial count fetch
 fetchTrainingDataCount();
 }

 function loadOcrCorrections() {
 var container = document.getElementById('ocrCorrectionList');
 if (!container) return;
 container.innerHTML = '<div style="text-align:center;padding:24px;font-size:0.7rem;color:var(--text-light);">加载中...</div>';

      var minEdits = 0;
      var filterEl = document.getElementById('ocrFilterEditsOnly');
      if (filterEl && filterEl.checked) minEdits = 1;

      fetch('/api/ocr/corrections?page=1&pageSize=50&minEdits=' + minEdits + '&sort=newest')
        .then(function(r) { return r.json(); })
        .then(function(data) {
          if (!data.data || data.data.length === 0) {
            container.innerHTML = '<div style="text-align:center;padding:28px;font-size:0.72rem;color:var(--text-light);"> 暂无记录<br><span style="font-size:0.58rem;">导入并修正联系人后，修正记录会自动收集</span></div>';
            return;
          }
          var countEl = document.getElementById('ocrCorrectionCount');
          if (countEl) countEl.textContent = data.total || 0;

          var html = '';
          data.data.forEach(function(c) {
            var origStr = JSON.stringify(c.original_json).substring(0, 120);
            var corrStr = JSON.stringify(c.corrected_json).substring(0, 120);
            var hasEdits = c.edit_count > 0;
            var borderColor = hasEdits ? 'var(--accent-wechat)' : 'var(--card-border)';
            var badgeColor = hasEdits ? '#07c160' : '#999';
            html += '<div style="border-bottom:0.5px solid var(--card-border); padding:6px 8px; background:var(--card-bg);">' +
              '<div style="display:flex;justify-content:space-between;align-items:center;font-size:0.58rem;color:var(--text-light);">' +
                '<span style="font-weight:700;">' + esc(c.source_file || '未知文件') + '</span>' +
                '<span style="display:flex;align-items:center;gap:4px;">' +
                  '<span style="background:' + badgeColor + ';color:white;padding:0px 5px;border-radius:6px;font-size:0.52rem;font-weight:700;">' + c.edit_count + '处修改</span>' +
                  '<span>' + (c.created_at || '').slice(0,19).replace('T',' ') + '</span>' +
                '</span>' +
              '</div>' +
              '<div style="font-size:0.6rem; margin-top:3px; word-break:break-all; line-height:1.3;">' +
                '<span style="color:var(--text-soft);">原始: </span><span style="color:#999;">' + esc(origStr) + '</span><br>' +
                '<span style="color:var(--text-soft);">修正: </span><span style="color:' + (hasEdits ? 'var(--accent-wechat)' : 'var(--text-main)') + ';">' + esc(corrStr) + '</span>' +
              '</div>' +
              '<div style="font-size:0.55rem; color:var(--text-light); margin-top:2px;">' + esc(c.ocr_pipeline || 'unknown') + ' · ' + esc(c.ocr_mode || 'bulk') + '</div>' +
            '</div>';
          });
          container.innerHTML = html;
        })
        .catch(function(err) {
          container.innerHTML = '<div style="text-align:center;padding:24px;font-size:0.7rem;color:#e74c3c;">加载失败: ' + esc(err.message) + '</div>';
        });
    }

    function fetchTrainingDataCount() {
      fetch('/api/ocr/corrections/stats')
        .then(function(r) { return r.json(); })
        .then(function(stats) {
          var badge = document.getElementById('trainingCountBadge');
          var countEl = document.getElementById('ocrCorrectionCount');
          var countBadge = document.getElementById('ocrCorrectionBadge');
          if (badge) badge.textContent = stats.count || 0;
          if (countEl) countEl.textContent = stats.count || 0;
          if (countBadge) {
            countBadge.style.display = (stats.count > 0) ? 'inline' : 'none';
          }
        })
        .catch(function() {});
    }

    // Parse Excel/CSV
    function handleExcelImport(file) {
      var reader = new FileReader();
      reader.onload = function(e) {
        try {
          var data = new Uint8Array(e.target.result);
          var workbook = XLSX.read(data, { type: 'array' });
          var firstSheetName = workbook.SheetNames[0];
          var worksheet = workbook.Sheets[firstSheetName];
          var json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          if (json.length === 0) {
            alert('导入失败：表格无数据');
            return;
          }

          showAIScanningUI(file.name);

          // Deep AI Scanning trigger
          setTimeout(function() {
            var detected = runAIColumnMapping(json);
            renderAIReportForExcel(json, detected);
          }, 1200);

        } catch(err) {
          alert('解析失败：' + err.message);
        }
      };
      reader.readAsArrayBuffer(file);
    }

    // Parse VCF
    function handleVcfImport(file) {
      var reader = new FileReader();
      reader.onload = function(ev) {
        try {
          var text = ev.target.result;
          var blocks = text.split(/BEGIN:VCARD/i);
          blocks = blocks.slice(1);
          if (!blocks.length) {
            alert('未找到联系人，请确认是有效的 .vcf 文件');
            return;
          }
          
          showAIScanningUI(file.name);

          var list = [];
          var phoneSet = new Set();
          for (var bi = 0; bi < blocks.length; bi++) {
            var blk = blocks[bi];
            var name = '';
            var mQP = blk.match(/FN[^:]*QUOTED-PRINTABLE[^:]*:([^\\r\\n]+)/i);
            var mU8 = blk.match(/FN;CHARSET=UTF-8:([^\\r\\n]+)/i);
            var mFN = blk.match(/FN:([^\\r\\n]+)/i);
            if (mQP) { name = decodeQPUtf8(mQP[1]).trim(); }
            else if (mU8) { name = mU8[1].trim(); }
            else if (mFN) { name = mFN[1].trim(); }
            
            var company = '';
            var mOQ = blk.match(/ORG[^:]*QUOTED-PRINTABLE[^:]*:([^\\r\\n]+)/i);
            var mOP = blk.match(/ORG[^:;]*:([^\\r\\n]+)/i);
            if (mOQ) { company = decodeQPUtf8(mOQ[1]).trim(); }
            else if (mOP) { company = mOP[1].trim(); }

            var note = '';
            var mNQ = blk.match(/NOTE[^:]*QUOTED-PRINTABLE[^:]*:([^\\r\\n]+)/i);
            var mNU = blk.match(/NOTE;CHARSET=UTF-8:([^\\r\\n]+)/i);
            var mNP = blk.match(/NOTE[^:;]*:([^\\r\\n]+)/i);
            if (mNQ) { note = decodeQPUtf8(mNQ[1]).trim(); }
            else if (mNU) { note = mNU[1].trim(); }
            else if (mNP) { note = mNP[1].trim(); }

            var telLines = blk.match(/TEL[^:]*:([^\\r\\n]+)/gi) || [];
            for (var ti = 0; ti < telLines.length; ti++) {
              var ci = telLines[ti].indexOf(':');
              if (ci < 0) continue;
              var phone = telLines[ti].slice(ci+1).trim().replace(/[^\\d+]/g, '');
              if (!phone) continue;
              if (phoneSet.has(phone)) break;
              phoneSet.add(phone);
              var fundVal = '';
              if (/^\d{4,5}$/.test(note)) {
                fundVal = note;
                note = '';
              }
              list.push({ name: name || '未知姓名', phone: phone, company: company, note: note, fund: fundVal, dialedStatus: 'todo', duration: '', callNote: '' });
              break;
            }
          }
          
          if (!list.length) {
            alert('未找到含电话的联系人');
            resetAIImporterUI();
            return;
          }

          // Deep AI Scanning trigger
          setTimeout(function() {
            renderAIReportForVcf(list);
          }, 1200);

        } catch(err) {
          alert('VCF 解析失败：' + err.message);
          resetAIImporterUI();
        }
      };
      reader.readAsText(file, 'utf-8');
    }

    // 首次进入拨号列表时加载共享白名单；本地导入的客户也能即时匹配产品标签。
    function ensureWhitelistCompaniesLoaded() {
      if (whitelistLoaded || window._whitelistLoading) return;
      if (!getSessionToken()) return;
      window._whitelistLoading = true;
      fetch('/api/dialer/whitelist', { headers: { 'Authorization': 'Bearer ' + getSessionToken() } })
        .then(function(r) { if (!r.ok) throw new Error('白名单加载失败'); return r.json(); })
        .then(function(res) {
          var rows = Array.isArray(res) ? res : (Array.isArray(res.data) ? res.data : []);
          whitelistCompanies = rows;
          whitelistLoaded = true;
          if (typeof renderDrawerWhitelistSearch === 'function') renderDrawerWhitelistSearch();
          if (typeof renderDialCards === 'function') renderDialCards();
        })
        .catch(function(err) { console.warn('[whitelist] load failed:', err); })
        .finally(function() { window._whitelistLoading = false; });
    }

    // 同一单位可能对应多个白名单产品；精确匹配时全部返回并去重。
    function matchWhitelistCompanies(company) {
      if (!company || !whitelistCompanies || whitelistCompanies.length === 0) return [];
      var keys = String(company).split(/[；;\\n、|]+/).map(function(v) { return v.trim().toLowerCase(); }).filter(Boolean);
      var matches = [];
      keys.forEach(function(key) {
        whitelistCompanies.forEach(function(w) {
          if (!w || w.status === '已失效' || w.status === '已删除') return;
          var name = String(w.company_name || '').trim().toLowerCase();
          var alias = String(w.alias || '').trim().toLowerCase();
          if (name === key || (alias && alias === key)) {
            var product = String(w.bank_name || '白名单').trim();
            if (product && !matches.some(function(item) { return item.bank_name === product; })) matches.push({ bank_name: product });
          }
        });
      });
      // 没有精确匹配时，沿用原有模糊匹配结果。
      if (!matches.length) {
        var fuzzy = matchWhitelistCompany(company);
        if (fuzzy) matches.push(fuzzy);
      }
      return matches;
    }

    // 抽屉白名单搜索：企业全称、简称、产品名均支持模糊匹配。
    function renderDrawerWhitelistSearch() {
      var input = document.getElementById('drawerWhitelistSearch');
      var results = document.getElementById('drawerWhitelistSearchResults');
      var count = document.getElementById('drawerWhitelistMatchCount');
      if (!input || !results) return;
      var query = String(input.value || '').trim().toLowerCase();
      if (!query) {
        results.style.display = 'none';
        results.innerHTML = '';
        if (count) count.textContent = '';
        return;
      }
      if (!Array.isArray(whitelistCompanies) || !whitelistCompanies.length) {
        results.style.display = 'block';
        results.innerHTML = '<div style="padding:9px 4px;font-size:0.72rem;color:var(--text-light);">白名单数据尚未加载</div>';
        if (count) count.textContent = '0 条';
        return;
      }
      function normalize(value) {
        return String(value || '').toLowerCase().replace(/(有限责任公司|股份有限公司|有限公司|公司|集团|深圳市|广州市|北京市|上海市|深圳|广州|北京|上海)/g, '').replace(/[\\s\\-()（）]/g, '');
      }
      var needle = normalize(query);
      var matches = whitelistCompanies.filter(function(w) {
        return w && w.status !== '已失效' && w.status !== '已删除';
      }).map(function(w) {
        var company = String(w.company_name || '').trim();
        var alias = String(w.alias || '').trim();
        var product = String(w.bank_name || '白名单').trim();
        var fields = [company, alias, product];
        var score = 0;
        fields.forEach(function(value) {
          var raw = String(value || '').toLowerCase();
          var clean = normalize(value);
          if (raw === query || clean === needle) score = Math.max(score, 100);
          else if (raw.indexOf(query) !== -1 || (needle && clean.indexOf(needle) !== -1)) score = Math.max(score, 80);
          else if (needle.length >= 2 && clean && (needle.indexOf(clean) !== -1 || clean.indexOf(needle) !== -1)) score = Math.max(score, 60);
        });
        return { item: w, score: score, company: company, alias: alias, product: product };
      }).filter(function(x) { return x.score > 0; }).sort(function(a,b) { return b.score-a.score; });
      if (count) count.textContent = matches.length + ' 条';
      if (!matches.length) {
        results.innerHTML = '<div style="padding:9px 4px;font-size:0.72rem;color:var(--text-light);">没有找到匹配的白名单</div>';
      } else {
        results.innerHTML = matches.slice(0, 12).map(function(x) {
          return '<div style="padding:8px 4px;border-top:1px solid var(--card-border);display:flex;flex-direction:column;gap:3px;">' +
            '<div style="font-size:0.76rem;font-weight:700;color:var(--text-main);">' + esc(x.company || '未填写企业名称') + '</div>' +
            '<div style="display:flex;flex-wrap:wrap;gap:5px;align-items:center;">' +
              '<span style="font-size:0.66rem;color:var(--accent-wechat);">' + esc(x.product) + '</span>' +
              (x.alias ? '<span style="font-size:0.64rem;color:var(--text-light);">简称：' + esc(x.alias) + '</span>' : '') +
            '</div></div>';
        }).join('') + (matches.length > 12 ? '<div style="padding:6px 4px;font-size:0.64rem;color:var(--text-light);">仅显示前 12 条，共 ' + matches.length + ' 条匹配</div>' : '');
      }
      results.style.display = 'block';
    }

    // Fuzzy/partial match whitelist company
    function matchWhitelistCompany(company) {
      if (!company) return null;
      var key = String(company).trim().toLowerCase();
      if (!key) return null;
      if (!whitelistCompanies || whitelistCompanies.length === 0) return null;
      
      // 1. Try exact match first
      for (var i = 0; i < whitelistCompanies.length; i++) {
        var w = whitelistCompanies[i];
        if (w.status === '已失效' || w.status === '已删除') continue;
        var name = (w.company_name || '').trim().toLowerCase();
        var alias = (w.alias || '').trim().toLowerCase();
        if (name === key || (alias && alias === key)) {
          return w;
        }
      }
      
      // 2. Try partial/fuzzy match (excluding common prefixes/suffixes)
      var cleanCard = key.replace(/(有限公司|有限责任公司|公司|集团|深圳市|广州市|北京市|上海市|深圳|广州|北京|上海)/g, '').trim();
      if (cleanCard.length >= 2) {
        for (var i = 0; i < whitelistCompanies.length; i++) {
          var w = whitelistCompanies[i];
          if (w.status === '已失效' || w.status === '已删除') continue;
          var name = (w.company_name || '').trim().toLowerCase();
          var alias = (w.alias || '').trim().toLowerCase();
          
          var cleanName = name.replace(/(有限公司|有限责任公司|公司|集团|深圳市|广州市|北京市|上海市|深圳|广州|北京|上海)/g, '').trim();
          if (cleanName.length >= 2 && (cleanCard.indexOf(cleanName) !== -1 || cleanName.indexOf(cleanCard) !== -1)) {
            return w;
          }
          if (alias) {
            var cleanAlias = alias.replace(/(有限公司|有限责任公司|公司|集团|深圳市|广州市|北京市|上海市|深圳|广州|北京|上海)/g, '').trim();
            if (cleanAlias.length >= 2 && (cleanCard.indexOf(cleanAlias) !== -1 || cleanAlias.indexOf(cleanCard) !== -1)) {
              return w;
            }
          }
        }
      }
      return null;
    }

    // Render client list
    // 换一批的唯一放行条件：当前拨号列表实际为空。
    function syncRefreshBatchButton() {
      var btn = document.getElementById('refreshBatchBtn');
      if (!btn) return;
      var hasCustomers = Array.isArray(importedClients) && importedClients.length > 0;
      // 有客户时只做视觉置灰，不设置原生 disabled，确保点击后能给出原因提示。
      btn.disabled = btn.classList.contains('loading');
      btn.classList.toggle('list-not-empty', hasCustomers);
      btn.title = hasCustomers ? '当前拨号列表还有 ' + importedClients.length + ' 位客户，点击查看提示；清空后才能换一批' : '换一批 — 当前列表为空，可以加载下一批';
      btn.setAttribute('aria-disabled', (hasCustomers || btn.disabled) ? 'true' : 'false');
    }

    function isWhitelistListVisible() {
      try { return localStorage.getItem('dialer_whitelist_list_visible:' + getOrCreateAccountId()) === '1'; }
      catch (e) { return false; }
    }

    function renderDialCards() {
      ensureWhitelistCompaniesLoaded();
      syncRefreshBatchButton();
      var container = document.getElementById('cardsContainer');
      if (!container) return;
      
      updateStats();

      if (importedClients.length === 0) {
        container.innerHTML = '<div style="text-align:center;padding:80px 20px;"></div>';
        return;
      }

      var query = document.getElementById('searchInput').value.toLowerCase().trim();
      var wlFilter = document.getElementById('whitelistFilterSelect') ? document.getElementById('whitelistFilterSelect').value : 'all';

      var filtered = importedClients.filter(function(c) {
        var matchFilter = (currentFilter === 'all') || (c.dialedStatus === currentFilter);
        
        var matchedWl = matchWhitelistCompany(c.company);
        var isCompanyInWhitelist = matchedWl ? (matchedWl.status !== '已失效' && matchedWl.status !== '已删除') : false;

        // Whitelist dropdown filter
        var matchWlFilter = true;
        if (wlFilter === 'yes') {
          matchWlFilter = isCompanyInWhitelist;
        } else if (wlFilter === 'no') {
          matchWlFilter = !isCompanyInWhitelist;
        }

        var matchQuery = true;
        if (query) {
          var isWlSearch = (query === '白名单' || query === '是白名单' || query === 'is:whitelist');
          var isNotWlSearch = (query === '非白名单' || query === '否白名单' || query === 'is:not-whitelist');
          
          if (isWlSearch) {
            matchQuery = isCompanyInWhitelist;
          } else if (isNotWlSearch) {
            matchQuery = !isCompanyInWhitelist;
          } else {
            matchQuery = c.name.toLowerCase().includes(query) || 
                         (c.phone || c.mobile || '').toLowerCase().includes(query) || 
                         c.company.toLowerCase().includes(query);
          }
        }
        return matchFilter && matchWlFilter && matchQuery;
      });

      if (filtered.length === 0) {
        container.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-light);font-size:0.8rem;">无匹配此筛选条件的联系人</div>';
        return;
      }

      // Apply Sorting
      var sorted = filtered.slice();
      if (currentSort === 'name') {
        sorted.sort(function(a, b) {
          return String(a.name || '').localeCompare(String(b.name || ''), 'zh');
        });
      } else if (currentSort === 'company') {
        sorted.sort(function(a, b) {
          return String(a.company || '').localeCompare(String(b.company || ''), 'zh');
        });
      } else if (currentSort === 'todo') {
        sorted.sort(function(a, b) {
          var aTodo = (!a.dialedStatus || a.dialedStatus === 'todo') ? 0 : 1;
          var bTodo = (!b.dialedStatus || b.dialedStatus === 'todo') ? 0 : 1;
          return aTodo - bTodo;
        });
      } else if (currentSort === 'dialed') {
        sorted.sort(function(a, b) {
          var aDialed = (a.dialedStatus === 'success' || a.dialedStatus === 'failed') ? 0 : 1;
          var bDialed = (b.dialedStatus === 'success' || b.dialedStatus === 'failed') ? 0 : 1;
          return aDialed - bDialed;
        });
      } else if (currentSort === 'shuffle') {
        // Fisher-Yates shuffle for true random order
        for (var si = sorted.length - 1; si > 0; si--) {
          var sj = Math.floor(Math.random() * (si + 1));
          var tmp = sorted[si];
          sorted[si] = sorted[sj];
          sorted[sj] = tmp;
        }
      }

      // 新号模式：每轮只显示前 10 个客户卡片（排序后取前 10，序号 1-10 触发一轮）
      if (isNewMode() && sorted.length > 10) sorted = sorted.slice(0, 10);

      // 无分页 — 直接展示全部客户
      var showClientInfo = isClientInfoVisible();

      var total = sorted.length;

      // 记录每个客户的显示序号（公海检查用）
      sorted.forEach(function(c, displayIdx) {
        c._seq = displayIdx + 1;
      });

      if (isMobileDevice) {
        // Mobile View: Render Cards (resembling older versions)
        var cardsHtml = sorted.map(function(c, displayIdx) {
          var i = importedClients.indexOf(c);
          var seq = displayIdx + 1;

          var badgeHtml = '';
          var cardClass = 'xls-dial-card';
          if (c.phone_copied) cardClass += ' copied-card';
          if (c.company_copied || c.note_copied) cardClass += ' copied-company';
          if (c.fund_copied) cardClass += ' copied-card'; // 复制过公积金：卡片浅绿光晕提醒
          var phoneVal = c.phone || c.mobile || '';
          if (c.dialedStatus === 'success') {
            badgeHtml = '<span class="xls-dial-badge xls-dial-badge-success">已接通 (' + (c.duration || '00:00') + ')</span>';
            cardClass += ' dialed';
          } else if (c.dialedStatus === 'failed') {
            badgeHtml = '<span class="xls-dial-badge xls-dial-badge-failed">未接通</span>';
            cardClass += ' dialed';
          }

          var phoneClass = 'client-phone-btn' + (c.phone_copied ? ' copied' : '');
          if (!showClientInfo) phoneClass += ' privacy-add-vx';

          return '<div class="' + cardClass + '" id="xdc_' + i + '">' +
            '<div class="client-card-top">' +
              '<div class="client-card-primary" style="display: flex; align-items: center; width: 100%; gap: 6px;">' +
                '<span class="corner-seq"><span>' + seq + '</span></span>' +
                '<span class="client-card-name-btn" data-name="' + esc(c.name || '') + '" data-idx="' + i + '" title="点击复制姓名" style="flex: 0 0 62px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: inline-block; cursor:pointer;">' + (showClientInfo ? esc(c.name) : '☆') + '</span>' +
                '<span class="client-card-phone-wrap" style="flex: 0 0 auto; display: inline-flex; align-items: center; gap: 8px; min-width: 0;">' +
                  '<span class="' + phoneClass + '" data-phone="' + esc(phoneVal) + '" data-idx="' + i + '" title="' + (showClientInfo ? '点击复制号码' : '点击添加微信') + '" style="font-size: 0.82rem;cursor:pointer;">' + (showClientInfo ? esc(maskPhone(phoneVal)) : (c.phone_copied ? '已添加' : '添加VX')) + '</span>' +
                  (function() {
                    if (!showClientInfo || !c.company || !isWhitelistListVisible()) return '';
                    var products = String(c.whitelist_name || '').split('、').map(function(v) { return v.trim(); }).filter(Boolean);
                    if (!products.length) {
                      products = matchWhitelistCompanies(c.company).map(function(w) { return w.bank_name || '白名单'; });
                    }
                    products = products.filter(function(v, idx, arr) { return arr.indexOf(v) === idx; });
                    return products.length ? '<span class="xls-dial-badge xls-dial-badge-whitelist" style="font-size:0.62rem;white-space:nowrap;max-width:110px;overflow:hidden;text-overflow:ellipsis;" title="' + esc(products.join('、')) + '">' + esc(products.join('、')) + '</span>' : '';
                  })() +
                '</span>' +
                '<div style="margin-left: auto; display: inline-flex; align-items: center; justify-content: flex-end; gap: 6px; flex-shrink: 0;">' +
                  badgeHtml +
                  '<a href="tel:' + esc(phoneVal) + '" class="btn-primary xls-card-dial-btn' + (!showClientInfo ? ' privacy-dial-icon' + (c.dial_attempted ? ' dial-attempted' : '') : '') + '" data-idx="' + i + '" title="' + (!showClientInfo ? (c.dial_attempted ? '已拨打' : '拨打电话') : '拨打') + '" style="font-size:0.7rem;padding:2px 10px;height:24px;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;">' + (!showClientInfo ? (c.dial_attempted ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.74a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z"/><path d="m3 3 18 18"/></svg>' : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.74a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z"/></svg>') : '拨打') + '</a>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="client-card-tags" style="margin-top: 2px;">' +
              (showClientInfo ? (c.company ? '<span class="client-card-tag client-card-tag-company" data-company="' + esc(c.company) + '" data-idx="' + i + '" title="点击复制单位名称">' + esc(c.company) + '</span>' : '') : '<span class="client-card-tag client-card-tag-company' + (c.note_copied ? ' privacy-action-done' : '') + '" data-company="' + esc(c.note || '') + '" data-idx="' + i + '" data-copy-note="1" title="点击复制备注" style="font-size:0.9rem;font-weight:800;padding:7px 13px;min-height:34px;display:inline-flex;align-items:center;justify-content:center;border-radius:8px;cursor:pointer;">' + (c.note_copied ? '已复制' : '复制备注') + '</span>') +
              (displayBatchLabel(c.batch_label) ? '<span class="client-card-tag" style="background:rgba(74,108,247,0.08);color:#4a6cf7;font-weight:700;" title="导入批次">' + esc(c.batch_label) + '</span>' : '') +
              (showClientInfo && c.fund ? '<span class="client-card-tag crm-fund-tag" data-fund="' + esc(c.fund) + '" data-idx="' + i + '" title="点击复制公积金基数" style="background:rgba(255,152,0,0.08);color:#f57c00;font-weight:700;cursor:pointer;">公积金: ' + esc(c.fund) + '</span>' : '') +
              (function() {
                var customHtml = '';
                if (c.custom && typeof c.custom === 'object') {
                  for (var key in c.custom) {
                    if (c.custom.hasOwnProperty(key) && c.custom[key]) {
                      customHtml += '<span class="client-card-tag" style="background:rgba(0,188,212,0.08);color:#0097a7;font-weight:700;" title="' + esc(key) + '">' + (showClientInfo ? esc(key) + ': ' + esc(c.custom[key]) : '☆') + '</span>';
                    }
                  }
                }
                return customHtml;
              })() +
              
            '</div>' +
            (c.note ? 
              '<div class="client-card-body" style="margin-top: 4px;">' +
                '<div class="client-card-content-block follow-up" style="background:rgba(74,108,247,0.03); padding: 6px 8px; border-radius: var(--radius-xs);">' +
                  '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2px;">' +
                    '<span class="client-card-label" style="color:#4a6cf7; font-weight:800; font-size:0.65rem;">资料备注</span>' +
                    '<span class="client-card-tag-note" data-note="' + esc(c.note) + '" style="font-size:0.6rem; color:#4a6cf7; cursor:pointer; text-decoration:underline;">' + (showClientInfo ? '[放大查看]' : '☆') + '</span>' +
                  '</div>' +
                  '<span class="client-card-text" style="color:var(--text-soft); white-space:pre-wrap; display:block; margin-top:2px;">' + (showClientInfo ? esc(c.note) : '☆') + '</span>' +
                '</div>' +
              '</div>' : '') +
            (c.callNote ? 
              '<div class="client-card-body" style="margin-top: 4px;">' +
                '<div class="client-card-content-block follow-up">' +
                  '<span class="client-card-label">通话小记</span>' +
                  '<span class="client-card-text" style="color:var(--accent-wechat);">' + (showClientInfo ? esc(c.callNote) : '☆') + '</span>' +
                '</div>' +
              '</div>' : '') +
            (c.last_operation ?
              '<div class="client-card-body" style="margin-top: 4px;">' +
                '<div class="client-card-content-block" style="background:rgba(255,193,7,0.05); padding: 6px 8px; border-radius: var(--radius-xs);">' +
                  '<span class="client-card-label" style="color:#f57c00; font-weight:800; font-size:0.52rem;">最近操作</span>' +
                  '<span class="client-card-text" style="color:var(--text-soft); display:block; margin-top:2px; font-size:0.5rem;">' +
                    (showClientInfo ? TimelineDisplay.render(c.last_operation) : '☆☆☆☆') +
                  '</span>' +
                '</div>' +
              '</div>' : '') +

          '</div>';
        }).join('');

        container.innerHTML = cardsHtml;

        // Wire up card phone click copy + WeChat jump
        container.querySelectorAll('.client-phone-btn').forEach(function(b) {
          b.addEventListener('click', function(e) {
            e.stopPropagation();
            var phone = b.dataset.phone;
            var idx = parseInt(b.dataset.idx);

            var oldText = b.textContent;
            if (oldText === '已复制，正在打开微信...') return;
            copyTextToClipboard(phone);
            recordTimeline(phone, 'add_wechat');
            var client = importedClients[idx];
            if (client) {
              client.copied = true;
              client.phone_copied = true;
              saveState();
            }
            // 隐私模式下点击添加VX后立即显示并持久记录“已添加”
            b.textContent = isClientInfoVisible() ? '已复制' : '已添加';
            b.classList.add('copied');
            var card = document.getElementById('xdc_' + idx);
            if (card) card.classList.add('copied-card');

            jumpToWechat(); // 同步调用：setTimeout 脱离手势，鸿蒙/华为 WebView 会拦截 scheme 跳转

            setTimeout(function() {
              if (isClientInfoVisible()) b.textContent = maskPhone(phone);
              else b.textContent = '已添加';
            }, 1500);
          });
        });

        // Wire up name click copy（复制姓名同样按复制偏好组合，与单位名称一致）
        container.querySelectorAll('.client-card-name-btn').forEach(function(b) {
          b.addEventListener('click', function(e) {
            e.stopPropagation();
            var name = b.dataset.name;
            var idx = parseInt(b.dataset.idx);

            var client = importedClients[idx];
            // 隐私模式下星号仍可单独复制真实姓名，不带其他客户资料
            var copyText = isClientInfoVisible() ? (buildCopyText(client) || name) : name;
            if (!copyText) return;
            copyTextToClipboard(copyText);

            if (client) recordTimeline(client.phone || client.mobile, 'copy_name');

            var oldText = b.textContent;
            if (oldText === '已复制') return;
            b.textContent = '已复制';
            var oldColor = b.style.color;
            b.style.color = 'var(--accent-wechat)';
            if (client) {
              client.copied = true;
              client.name_copied = true;
              saveState();
              scheduleReminder(client);
            }

            // 复制姓名只反馈姓名自身，不改变“添加VX/已添加”的状态与颜色。

            setTimeout(function() {
              b.textContent = name;
              b.style.color = oldColor;
            }, 1000);
          });
        });

        // Wire up company click copy
        container.querySelectorAll('.client-card-tag-company').forEach(function(b) {
          b.addEventListener('click', function(e) {
            e.stopPropagation();
            var company = b.dataset.company;

            var idx = parseInt(b.dataset.idx);
            var client = importedClients[idx];
            // “复制备注”也遵循账户的复制内容偏好，按自定义勾选顺序组合姓名、手机号、单位、公积金和日期
            // 若偏好字段没有可复制内容，再退回原始备注
            var preferredCopyText = buildCopyText(client);
            var copyText = b.dataset.copyNote === '1'
              ? (preferredCopyText || (client && client.note ? client.note : ''))
              : (preferredCopyText || company);
            if (!copyText) {
              showCopyLimitToast('没有可复制的客户资料', true);
              return;
            }
            copyTextToClipboard(copyText);

            var cardEl = b.closest('.xls-dial-card');
            // 使用按钮自身 data-idx 对应的客户对象，避免卡片 DOM 索引与数据索引不一致
            // 导致时间线、复制状态和自动流转记录落到不同客户。
            var isCopyNote = b.dataset.copyNote === '1';
            var originalLabel = b.textContent;
            if (client) recordTimeline(client.phone || client.mobile, isCopyNote ? 'copy_note' : 'copy_company');
            if (client) {
              client.copied = true;
              if (isCopyNote) client.note_copied = true;
              else client.company_copied = true;
              saveState();
              scheduleReminder(client);
            }
            if (cardEl) cardEl.classList.add('copied-company');
            b.textContent = '已复制';
            b.classList.add('privacy-action-done');
            jumpToWechat();
            // 备注和单位按钮统一反馈时长，并恢复各自原始文案。
            setTimeout(function() {
              b.textContent = originalLabel;
              b.classList.remove('privacy-action-done');
            }, 1500);
          });
        });

        // Wire up fund click copy（复制格式：公积金基数24170，不跳微信）
        container.querySelectorAll('.crm-fund-tag').forEach(function(b) {
          b.addEventListener('click', function(e) {
            e.stopPropagation();
            if (!isClientInfoVisible()) return;
            var fund = b.dataset.fund;
            var idx = parseInt(b.dataset.idx);
            var client = (idx >= 0) ? importedClients[idx] : null;
            copyTextToClipboard('公积金基数' + fund);
            if (client) recordTimeline(client.phone || client.mobile, 'copy_fund');
            var oldText = b.textContent;
            if (oldText.indexOf('已复制') === 0) return;
            b.textContent = '已复制';
            var oldColor = b.style.color;
            b.style.color = 'var(--accent-wechat)';
            if (client) {
              client.copied = true;
              client.fund_copied = true; // 复制过公积金：卡片持久浅绿光晕提醒
              saveState();
              
            }
            var cardEl = b.closest('.xls-dial-card');
            if (cardEl) cardEl.classList.add('copied-card');
            setTimeout(function() {
              b.textContent = oldText;
              b.style.color = oldColor;
            }, 1000);
          });
        });

        // Wire up card tag note click modal
        container.querySelectorAll('.client-card-tag-note').forEach(function(b) {
          b.addEventListener('click', function(e) {
            e.stopPropagation();
            if (!isClientInfoVisible()) return;
            var note = b.dataset.note || '(空)';
            var content = document.getElementById('noteModalContent');
            if (content) {
              content.textContent = note;
            }
            var modal = document.getElementById('noteModal');
            if (modal) {
              modal.classList.add('active');
            }
          });
        });

        // Wire up call button
        container.querySelectorAll('.xls-card-dial-btn').forEach(function(btn) {
          btn.addEventListener('click', function(e) {
            var idx = parseInt(this.dataset.idx);
            var clientNow = importedClients[idx];
            if (clientNow && !isClientInfoVisible()) {
              clientNow.dial_attempted = true;
              saveState();
              this.classList.add('dial-attempted');
              this.title = '已拨打';
              this.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.74a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z"/><path d="m3 3 18 18"/></svg>';
            }
            // Delay opening the modal by 200ms to allow Safari to natively trigger the tel: anchor navigation first
            setTimeout(function() {
              var client = importedClients[idx];
              if (client) recordTimeline(client.phone || client.mobile, 'dial');
              startCallAssistant(idx);
            }, 200);
          });
        });
      } else {
        // Desktop View: Render CRM Table
        var tableHtml = '<table class="crm-table"><thead><tr>' +
          '<th class="col-no">#</th>' +
          '<th class="col-status">状态</th>' +
          '<th class="col-name">姓名</th>' +
          '<th class="col-phone">电话</th>' +
          '<th class="col-company">公司</th>' +
          '<th class="col-note">备注/金额</th>' +
          '<th class="col-batch">批次</th>' +
          '<th class="col-lastop">最后操作</th>' +
          '<th class="col-action">操作</th>' +
        '</tr></thead><tbody>';

        tableHtml += sorted.map(function(c, idx) {
          var rowNo = (currentPage - 1) * pageSize + idx + 1;

          var badgeHtml = '<span style="font-size:11px;padding:1px 6px;border-radius:3px;background:#f0f0f0;color:#888;">待拨</span>';
          var rowClass = '';
          if (c.dialedStatus === 'success') {
            badgeHtml = '<span style="font-size:11px;padding:1px 6px;border-radius:3px;background:rgba(7,193,96,0.12);color:#07c160;">已拨</span>';
            rowClass = ' row-dialed';
          } else if (c.dialedStatus === 'failed') {
            badgeHtml = '<span style="font-size:11px;padding:1px 6px;border-radius:3px;background:rgba(231,76,60,0.1);color:#e74c3c;">未通</span>';
            rowClass = ' row-dialed';
          }

          var wlBadge = '';
          if (isWhitelistListVisible() && c.company) {
            var productNames = String(c.whitelist_name || '').split('、').map(function(v) { return v.trim(); }).filter(Boolean);
            if (!productNames.length) {
              var matchedWls = matchWhitelistCompanies(c.company);
              productNames = matchedWls.map(function(w) { return w.bank_name || '白名单'; });
            }
            productNames = productNames.filter(function(v, i, arr) { return arr.indexOf(v) === i; });
            if (productNames.length) {
              wlBadge = ' <span style="font-size:10px;background:rgba(7,193,96,0.1);color:#07c160;padding:0 4px;border-radius:2px;">' + esc(productNames.join('、')) + '</span>';
            }
          }

          var phoneVal = c.phone || c.mobile || '';
          return '<tr class="' + rowClass + '" data-idx="' + idx + '">' +
            '<td class="col-no">' + rowNo + '</td>' +
            '<td class="col-status">' + badgeHtml + '</td>' +
            '<td class="col-name"><span class="crm-copy-btn" data-copy="' + (showClientInfo ? esc(c.name||'') : '☆') + '" title="点击复制">' + (showClientInfo ? esc(c.name||'-') : '☆') + '</span></td>' +
            '<td class="col-phone"><span class="crm-copy-btn' + (c.phone_copied ? ' copied-phone' : '') + '" data-copy="' + esc(phoneVal) + '" title="点击复制">' + esc(phoneVal ? maskPhone(phoneVal) : '-') + '</span></td>' +
            '<td class="col-company"><span class="crm-copy-btn" data-copy="' + (showClientInfo ? esc((c.name && c.name !== '-' ? c.name + ' ' : '') + (c.company||'')) : esc(c.note||'')) + '"' + (showClientInfo ? '' : ' style="font-size:14px;font-weight:800;padding:8px 13px;min-height:34px;display:inline-flex;align-items:center;justify-content:center;border-radius:8px;cursor:pointer;"') + '>' + (showClientInfo ? esc(c.company||'-') : '复制备注') + '</span>' + (showClientInfo ? wlBadge : '') + '</td>' +
            '<td class="col-note">' + (showClientInfo ? esc(c.note||'-') : '☆') + '</td>' +
            '<td class="col-batch">' + '<span style="font-size:11px;background:rgba(74,108,247,0.08);color:#4a6cf7;padding:1px 6px;border-radius:3px;">' + (showClientInfo ? (displayBatchLabel(c.batch_label) || '-') : '☆') + '</span>' + '</td>' +
            '<td class="col-lastop" style="font-size:0.52rem;">' + (c.last_operation ? TimelineDisplay.render(c.last_operation) : '-') + '</td>' +
            '<td class="col-action"><a href="tel:' + esc(phoneVal) + '" style="display:inline-block;padding:3px 10px;background:linear-gradient(135deg,#07c160,#06ad56);color:#fff;border-radius:4px;text-decoration:none;font-size:12px;font-weight:700;">拨打</a></td>' +
          '</tr>';
        }).join('');

        tableHtml += '</tbody></table>';
        container.innerHTML = tableHtml;

        // Wire up CRM table copy buttons（复制号码/姓名/单位均计入操作轮次，与卡片视图一致）
        container.querySelectorAll('.crm-copy-btn').forEach(function(btn) {
          btn.addEventListener('click', function() {
            var text = this.dataset.copy;
            if (!text) return;
            var parentTd = btn.closest('td');
            var copyType = 'copy_phone';
            if (parentTd && parentTd.classList.contains('col-name')) copyType = 'copy_name';
            else if (parentTd && parentTd.classList.contains('col-company')) copyType = showClientInfo ? 'copy_company' : 'copy_note';

            // 计入操作轮次（行 data-idx 是 sorted 内的序号，排序/筛选后不能直接按 importedClients 下标取）
            var tr = btn.closest('tr');
            var trIdx = tr ? parseInt(tr.getAttribute('data-idx')) : -1;
            var cl = (trIdx !== -1) ? sorted[trIdx] : null;

            // 复制姓名：与卡片/悬浮层一致，按复制偏好组合；其余列复制原值
            var copyText = text;
            if (copyType === 'copy_name') copyText = buildCopyText(cl) || (' ' + text + ' ');

            if (cl) {
              recordTimeline(cl.phone || cl.mobile, copyType);
              cl.copied = true;
              if (copyType === 'copy_company') { cl.company_copied = true; scheduleReminder(cl); }
              else if (copyType === 'copy_note') { cl.note_copied = true; scheduleReminder(cl); }
              else if (copyType === 'copy_name') { cl.name_copied = true; scheduleReminder(cl); }
              else if (copyType === 'copy_phone') { cl.phone_copied = true; btn.classList.add('copied-phone'); }
              saveState();
            }

            // 与移动卡片视图共用跨平台复制逻辑，失败时走同步复制/错误提示兜底。
            copyTextToClipboard(copyText);
            // Brief flash
            var orig = btn.style.color;
            btn.style.color = '#07c160';
            setTimeout(function() { btn.style.color = orig; }, 600);
          });
        });

        // Wire up table dial buttons with call assistant
        container.querySelectorAll('.col-action a').forEach(function(btn, idx) {
          btn.addEventListener('click', function(e) {
            // Let the tel: link work natively
            var client = sorted[idx];
            if (client) {
              recordTimeline(client.phone || client.mobile, 'dial');
              setTimeout(function() {
                startCallAssistant(importedClients.indexOf(client));
              }, 300);
            }
          });
        });
      }
    }

    // Call Assistant Controls
    var selectedCallStatus = 'success';

    function getNextClientIndex(currentIdx) {
      var query = document.getElementById('searchInput').value.toLowerCase().trim();
      var filtered = importedClients.filter(function(c) {
        var matchFilter = (currentFilter === 'all') || (c.dialedStatus === currentFilter);
        var matchQuery = true;
        if (query) {
          matchQuery = c.name.toLowerCase().includes(query) ||
                       c.phone.toLowerCase().includes(query) ||
                       c.company.toLowerCase().includes(query);
        }
        return matchFilter && matchQuery;
      });

      if (currentIdx < 0 && filtered.length > 0) {
        return importedClients.indexOf(filtered[0]);
      }
      var currentClient = importedClients[currentIdx];
      var filteredPos = filtered.indexOf(currentClient);
      if (filteredPos !== -1 && filteredPos + 1 < filtered.length) {
        return importedClients.indexOf(filtered[filteredPos + 1]);
      }
      return -1;
    }

    function startCallAssistant(idx) {
      var c = importedClients[idx];
      if (!c) return;

      currentCallIdx = idx;

      var phoneVal = c.phone || c.mobile || '';
      document.getElementById('callAssistName').innerText = c.name;
      document.getElementById('callAssistNameDisplay').innerText = c.name;
      document.getElementById('callAssistPhone').innerText = phoneVal;
      document.getElementById('callAssistPhoneDisplay').innerText = phoneVal;
      document.getElementById('callLogNote').value = c.callNote || '';

      // Show company info if available
      var companyRow = document.getElementById('callAssistCompanyRow');
      var companyEl = document.getElementById('callAssistCompany');
      if (c.company && String(c.company).trim()) {
        companyEl.textContent = c.company;
        companyEl.dataset.company = c.company;
        companyRow.style.display = 'flex';
        companyRow.style.alignItems = 'center';
        companyRow.style.gap = '4px';
      } else {
        companyRow.style.display = 'none';
      }

      // Show note/remark info if available
      var noteRow = document.getElementById('callAssistNoteRow');
      var noteEl = document.getElementById('callAssistNote');
      if (c.note && c.note.trim()) {
        noteEl.textContent = c.note;
        noteRow.style.display = 'flex';
        noteRow.style.alignItems = 'baseline';
        noteRow.style.gap = '4px';
      } else {
        noteRow.style.display = 'none';
      }

      var nameDisp = document.getElementById('callAssistNameDisplay');
      if (nameDisp) {
        nameDisp.dataset.name = c.name;
      }
      var phoneDisp = document.getElementById('callAssistPhoneDisplay');
      var phoneVal = c.phone || c.mobile || '';
      if (phoneDisp) {
        phoneDisp.dataset.phone = phoneVal;
        if (c.copied) {
          phoneDisp.classList.add('copied');
        } else {
          phoneDisp.classList.remove('copied');
        }
      }

      var dialLink = document.getElementById('callAssistDialLink');
      if (dialLink) {
        dialLink.href = 'tel:' + phoneVal;
      }

      document.getElementById('callAssistOverlay').classList.add('active');
    }

    function initCallControls() {
      var successBtn = document.getElementById('callOutcomeSuccessBtn');
      var failedBtn = document.getElementById('callOutcomeFailedBtn');
      var overlay = document.getElementById('callAssistOverlay');
      var phoneDisp = document.getElementById('callAssistPhoneDisplay');
      var nameDisp = document.getElementById('callAssistNameDisplay');

      window.onAndroidCallResult = function(duration) {
        if (duration >= 0) {
          var min = Math.floor(duration / 60);
          var sec = duration % 60;
          var formatted = (min < 10 ? '0' : '') + min + ':' + (sec < 10 ? '0' : '') + sec;
          
          var c = importedClients[currentCallIdx];
          if (c) {
            c.duration = formatted;
            var currentNote = document.getElementById('callLogNote').value.trim();
            if (!currentNote) {
              if (duration > 0) {
                document.getElementById('callLogNote').value = '已接通，通话时长 ' + duration + ' 秒。';
              } else {
                document.getElementById('callLogNote').value = '已拨打未接通。';
              }
            }

 }
 }
 };

 function saveProgress(status) {
 var c = importedClients[currentCallIdx];
 if (!c) return false;

 c.callNote = document.getElementById('callLogNote').value.trim();
 c.dialedStatus = status;
 c.duration = '-';
 return true;
 }

 var autoDialActive = false;
 function handleOutcome(status) {
 if (!saveProgress(status)) return;
 var c = importedClients[currentCallIdx];
 if (c) {
 var note = document.getElementById('callLogNote').value.trim();
 var batchLabelForCleanup = c.batch_label || '';
 recordTimeline(c.phone || c.mobile, 'call_' + status, note).then(function() {
   if (batchLabelForCleanup) checkAutoDeleteBatch(batchLabelForCleanup);
 });
 }
 saveState();
 renderDialCards();

 var nextIdx = getNextClientIndex(currentCallIdx);
 if (nextIdx !== -1) {
 startCallAssistant(nextIdx);
 if (autoDialActive) {
 setTimeout(function() {
 var link = document.getElementById('callAssistDialLink');
 if (link && link.href) window.location.href = link.href;
 }, 800);
 }
 } else {
 if (autoDialActive) {
 autoDialActive = false;
 updateAutoDialBtn();
 }
 alert('已经是当前筛选列表的最后一位客户了！');
 overlay.classList.remove('active');
 }
 }

 var AUTO_DIAL_ICON = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';
var PAUSE_ICON = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';

function updateAutoDialBtn() {
 var btn = document.getElementById('autoDialBtn');
 if (autoDialActive) {
 btn.innerHTML = PAUSE_ICON;
 btn.title = '暂停拨打';
 btn.style.background = '#e74c3c';
 btn.style.color = '#fff';
 } else {
 btn.innerHTML = AUTO_DIAL_ICON;
 btn.title = '自动拨打';
 btn.style.background = '';
 btn.style.color = '';
 }
 }

 // Format helpers for call notes
 function doWrapCallNote(tag) {
   var ta = document.getElementById('callLogNote');
   var s = ta.selectionStart, e = ta.selectionEnd, v = ta.value;
   var idx = tag.indexOf('|');
   var open = idx >= 0 ? tag.slice(0, idx) : tag, close = idx >= 0 ? tag.slice(idx + 1) : tag;
   if (s === e) { ta.value = v.slice(0, s) + open + close + v.slice(e); ta.selectionStart = ta.selectionEnd = s + open.length; }
   else { ta.value = v.slice(0, s) + open + v.slice(s, e) + close + v.slice(e); ta.selectionStart = s + open.length; ta.selectionEnd = e + open.length; }
   ta.focus();
 }
 document.getElementById('bhpBoldBtn').addEventListener('click', function() { doWrapCallNote('**|**'); });
 document.getElementById('bhpDelBtn').addEventListener('click', function() { doWrapCallNote('~~|~~'); });
 document.addEventListener('keydown', function(e) {
   if (e.target.tagName === 'INPUT' || e.target.isContentEditable) return;
   if (e.altKey && e.key === 'b') { e.preventDefault(); doWrapCallNote('**|**'); }
   else if (e.altKey && e.key === 'd') { e.preventDefault(); doWrapCallNote('~~|~~'); }
 });

 document.getElementById('autoDialBtn').addEventListener('click', function() {
 autoDialActive = !autoDialActive;
 updateAutoDialBtn();
 if (autoDialActive) {
 if (currentCallIdx === -1) {
 var firstIdx = getNextClientIndex(-1);
 if (firstIdx !== -1) {
 startCallAssistant(firstIdx);
 setTimeout(function() {
 var link = document.getElementById('callAssistDialLink');
 if (link && link.href) window.location.href = link.href;
 }, 800);
 }
 } else {
 var link = document.getElementById('callAssistDialLink');
 if (link && link.href) window.location.href = link.href;
 }
 }
 });

 successBtn.addEventListener('click', function() {
 handleOutcome('success');
 });

 failedBtn.addEventListener('click', function() {
 handleOutcome('failed');
 });

 // Record dial action when clicking the dial link
 var dialLink = document.getElementById('callAssistDialLink');
 if (dialLink) {
 dialLink.addEventListener('click', function() {
 var client = importedClients[currentCallIdx];
 if (client) recordTimeline(client.phone || client.mobile, 'dial');
 });
 }

 if (phoneDisp) {
 phoneDisp.addEventListener('click', function(e) {
 e.stopPropagation();
 var phone = phoneDisp.dataset.phone;

 // Copy directly

 var oldText = phoneDisp.textContent;
 if (oldText === '已复制，正在打开微信...') return;

 copyTextToClipboard(phone);

 var client = importedClients[currentCallIdx];
 if (client) recordTimeline(client.phone || client.mobile, 'add_wechat');

 phoneDisp.textContent = '已复制，正在打开微信...';

 if (client) {
 client.copied = true;
 client.phone_copied = true; // 复制过号码：卡片持久变色提醒
 saveState();
 
 }

 phoneDisp.classList.add('copied');

 var card = document.getElementById('xdc_' + currentCallIdx);
 if (card) {
 card.classList.add('copied-card');
 var cardPhoneBtn = card.querySelector('.client-phone-btn');
 if (cardPhoneBtn) {
 cardPhoneBtn.classList.add('copied');
 }
 }

 jumpToWechat(); // 同步调用：保持点击手势（鸿蒙拦截非手势 scheme 跳转）

 setTimeout(function() {
 phoneDisp.textContent = maskPhone(phone);
 }, 1500);
 });
 }

 if (nameDisp) {
 nameDisp.addEventListener('click', function(e) {
 e.stopPropagation();
 var name = nameDisp.dataset.name;

 var client = importedClients[currentCallIdx];
 // 复制姓名同样按复制偏好组合（与单位名称一致）
 var copyText = buildCopyText(client) || name;
 copyTextToClipboard(copyText);

 if (client) recordTimeline(client.phone || client.mobile, 'copy_name');

 var oldText = nameDisp.textContent;
 if (oldText === '已复制') return;
 nameDisp.textContent = '已复制';

 if (client) {
 client.copied = true;
  client.name_copied = true;
  saveState();
  scheduleReminder(client);
  }

 if (phoneDisp) {
 phoneDisp.classList.add('copied');
 }

 var card = document.getElementById('xdc_' + currentCallIdx);
 if (card) {
 var cardPhoneBtn = card.querySelector('.client-phone-btn');
 if (cardPhoneBtn) {
 cardPhoneBtn.classList.add('copied');
 }
 }

 setTimeout(function() {
 nameDisp.textContent = name;
 }, 1000);
 });
 }

 var companyDisp = document.getElementById('callAssistCompany');
 if (companyDisp) {
 companyDisp.addEventListener('click', function(e) {
 e.stopPropagation();
 var company = companyDisp.dataset.company || companyDisp.textContent;
 if (!company || company === '-') return;
 var client = importedClients[currentCallIdx];
 // 按复制偏好组合（姓名/单位/公积金/日期）；全部未勾选时兜底仅单位名称
 var copyText = buildCopyText(client) || company;
 copyTextToClipboard(copyText);

 if (client) recordTimeline(client.phone || client.mobile, 'copy_company');

 // 与主卡片一致：复制单位计入操作（已操作标记 + 轮次机制）
 if (client) {
 client.copied = true;
 client.company_copied = true; // 复制过单位名称
  saveState();
  scheduleReminder(client);
  }

 var oldText = companyDisp.textContent;
 if (oldText === '已复制') return;
 companyDisp.textContent = '已复制';
 
 setTimeout(function() {
 companyDisp.textContent = company;
 }, 1000);
 });
 }

 // Close modal when clicking blank area outside
 overlay.addEventListener('click', function(e) {
 if (e.target === this) {
 overlay.classList.remove('active');
 }
 });
 }

 function initFilters() {
 document.querySelectorAll('.filter-tab').forEach(function(tab) {
 tab.addEventListener('click', function() {
 document.querySelectorAll('.filter-tab').forEach(function(t) { t.classList.remove('active'); });
 tab.classList.add('active');
 currentFilter = tab.dataset.filter;
 currentPage = 1; // Reset to page 1
 renderDialCards();
 });
 });

 document.getElementById('searchInput').addEventListener('input', function() {
 currentPage = 1; // Reset to page 1
 renderDialCards();
 });

 var sortSel = document.getElementById('sortSelect');
 if (sortSel) {
 sortSel.addEventListener('change', function() {
 currentSort = this.value;
 currentPage = 1; // Reset to page 1
 renderDialCards();
 });
 }

 var lockBtn = document.getElementById('lockScreenBtn');
 if (lockBtn) {
 lockBtn.addEventListener('click', function() {
 showLockScreen();
 });
 }
 }

 function initFileInputs() {
 var xlsSelect = document.getElementById('xlsSelectBtn');
 var xlsFile = document.getElementById('xlsFileInput');
 var vcfSelect = document.getElementById('vcfSelectBtn');
 var vcfFile = document.getElementById('vcfFileInput');
 var dropZone = document.getElementById('dropZone');
 var toggleBtn = document.getElementById('toggleImportBtn');

 if (toggleBtn) {
 toggleBtn.addEventListener('click', function() {
 var panel = document.getElementById('dashboardPanel');
 if (panel) {
 var willOpen = !panel.classList.contains('active');
 panel.classList.toggle('active');
 if (willOpen) {
 document.body.style.overflow = 'hidden';
 resetAIImporterUI();
 // Reset batch label with fresh timestamp
 var blInput = document.getElementById('batchLabelInput');
 if (blInput) {
 blInput.value = '导入-' + new Date().toISOString().slice(0, 19).replace('T', ' ');
 }
 } else {
 document.body.style.overflow = '';
 }
 }
 });
 }

 // Close button inside the import panel
 var importCloseBtn = document.getElementById('importCloseBtn');
 if (importCloseBtn) {
 importCloseBtn.addEventListener('click', closeImportModal);
 // Also close when clicking the backdrop (outside import-zone)
 var dp = document.getElementById('dashboardPanel');
 if (dp) {
 dp.addEventListener('click', function(e) {
 if (e.target === dp) closeImportModal();
 });
 }
 }
 function closeImportModal() {
 var panel = document.getElementById('dashboardPanel');
 if (panel) panel.classList.remove('active');
 document.body.style.overflow = '';
 }

 // Dual-SIM rotation toggle
 var dualSimBtn = document.getElementById('toggleDualSimBtn');
 var dualSimOn = true;
 var rotationCount = 10;
 if (dualSimBtn) {
 dualSimBtn.addEventListener('click', function() {
 dualSimOn = !dualSimOn;
 dualSimBtn.textContent = '双卡轮换: ' + (dualSimOn ? '开' : '关');
 localStorage.setItem('dialer_dual_sim', dualSimOn ? '1' : '0');
 });
 }
 var rotationBtn = document.getElementById('toggleRotationBtn');
 if (rotationBtn) {
 rotationBtn.addEventListener('click', function() {
 rotationCount = rotationCount === 10 ? 5 : 10;
 rotationBtn.textContent = '轮换频率: ' + rotationCount + '通';
 localStorage.setItem('dialer_rotation', String(rotationCount));
 });
 }

 if (xlsFile) {
 xlsFile.addEventListener('change', function(e) {
 var file = e.target.files[0];
 if (file) handleFileImportDispatch(file);
 e.target.value = '';
 });
 }

 // 白名单产品导入：先填写产品名称，再自动识别 Excel 中的单位名称列。
 var whitelistFileInput = document.getElementById('whitelistExcelFileInput');
 if (whitelistFileInput) {
 whitelistFileInput.addEventListener('change', function(e) {
   var file = e.target.files && e.target.files[0];
   e.target.value = '';
   var productInput = document.getElementById('whitelistProductNameInput');
   var statusEl = document.getElementById('whitelistImportStatus');
   var selectBtn = document.getElementById('whitelistExcelSelectBtn');
   var productName = productInput ? productInput.value.trim() : '';
   function setWhitelistStatus(message, isError) {
     if (!statusEl) return;
     statusEl.textContent = message;
     statusEl.style.color = isError ? '#e74c3c' : 'var(--text-soft)';
   }
   if (!file) return;
   if (!productName) {
     setWhitelistStatus('请先填写白名单名称，再选择 Excel 文件。', true);
     if (productInput) productInput.focus();
     return;
   }
   if (!/\.(xlsx|xls|csv)$/i.test(file.name)) {
     setWhitelistStatus('仅支持 .xlsx、.xls 或 .csv 文件。', true);
     return;
   }
   if (file.size > 15 * 1024 * 1024) {
     setWhitelistStatus('文件不能超过 15MB。', true);
     return;
   }
   if (!window.XLSX || !window.XLSX.read) {
     setWhitelistStatus('Excel 识别组件尚未加载，请稍后重试。', true);
     return;
   }
   if (selectBtn) { selectBtn.style.pointerEvents = 'none'; selectBtn.style.opacity = '0.6'; }
   setWhitelistStatus('正在读取文件并识别单位名称列…', false);
   var reader = new FileReader();
   reader.onerror = function() {
     if (selectBtn) { selectBtn.style.pointerEvents = ''; selectBtn.style.opacity = ''; }
     setWhitelistStatus('文件读取失败，请重新选择。', true);
   };
   reader.onload = function(ev) {
     try {
       var workbook = window.XLSX.read(new Uint8Array(ev.target.result), { type: 'array' });
       var firstSheet = workbook.SheetNames && workbook.SheetNames[0];
       if (!firstSheet) throw new Error('Excel 中没有可读取的工作表');
       var sheetRows = window.XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet], { header: 1, raw: false, defval: '' });
       var headerRowIndex = -1, companyCol = -1, aliasCol = -1;
       var companyHeader = /^(单位名称?|企业名称?|公司名称?|用人单位|单位全称|企业全称|公司全称|company_?name|company|employer|organization)$/i;
       var aliasHeader = /^(单位别名|企业别名|公司别名|别名|简称|曾用名|alias)$/i;
       for (var ri = 0; ri < Math.min(sheetRows.length, 20); ri++) {
         var cells = sheetRows[ri] || [];
         for (var ci = 0; ci < cells.length; ci++) {
           var header = String(cells[ci] || '').trim().toLowerCase().replace(/[\s_*：:（）()【】\[\]-]/g, '');
           if (companyHeader.test(header) || /^(单位|企业|公司)$/.test(header)) companyCol = ci;
           if (aliasHeader.test(header)) aliasCol = ci;
         }
         if (companyCol >= 0) { headerRowIndex = ri; break; }
         companyCol = -1; aliasCol = -1;
       }
       if (headerRowIndex < 0 || companyCol < 0) {
         throw new Error('未识别到单位名称列。请确保表头包含“单位名称、企业名称或公司名称”。');
       }
       var companies = [], seen = Object.create(null);
       for (var rowIndex = headerRowIndex + 1; rowIndex < sheetRows.length; rowIndex++) {
         var row = sheetRows[rowIndex] || [];
         var companyName = String(row[companyCol] || '').trim();
         if (!companyName) continue;
         var key = companyName.toLowerCase();
         if (seen[key]) continue;
         seen[key] = true;
         companies.push({ company_name: companyName, alias: aliasCol >= 0 ? String(row[aliasCol] || '').trim() : '' });
       }
       if (!companies.length) throw new Error('已识别单位名称列，但没有找到有效数据行。');
       setWhitelistStatus('已识别 ' + companies.length + ' 家单位，正在新增或更新白名单…', false);
       fetch('/api/dialer/whitelist/import', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ product_name: productName, companies: companies })
       }).then(function(response) {
         return response.json().then(function(data) {
           if (!response.ok || !data.success) throw new Error(data.error || '导入失败');
           return data;
         });
       }).then(function(result) {
         setWhitelistStatus('导入完成：新增 ' + (result.added || 0) + ' 家，更新 ' + (result.updated || 0) + ' 家，重复跳过 ' + (result.skipped || 0) + ' 家。', false);
       }).catch(function(err) {
         setWhitelistStatus(err.message || '导入失败，请稍后重试。', true);
       }).finally(function() {
         if (selectBtn) { selectBtn.style.pointerEvents = ''; selectBtn.style.opacity = ''; }
       });
     } catch (err) {
       if (selectBtn) { selectBtn.style.pointerEvents = ''; selectBtn.style.opacity = ''; }
       setWhitelistStatus(err.message || 'Excel 识别失败。', true);
     }
   };
   reader.readAsArrayBuffer(file);
 });
 }

 if (vcfFile) {
 vcfFile.addEventListener('change', function(e) {
 var file = e.target.files[0];
 if (file) handleFileImportDispatch(file);
 e.target.value = '';
 });
 }

 var imgFile = document.getElementById('imgFileInput');
 if (imgFile) {
 imgFile.addEventListener('change', function(e) {
 var files = Array.from(e.target.files || []);
 if (files.length === 0) { e.target.value = ''; return; }
 if (files.length === 1) {
 handleFileImportDispatch(files[0]);
 } else {
 handleMultiImageOCR(files);
 }
 e.target.value = '';
 });
 }

 // Drag & Drop
 if (dropZone) {
 dropZone.addEventListener('dragover', function(e) {
 e.preventDefault();
 dropZone.classList.add('dragover');
 });
 dropZone.addEventListener('dragleave', function() {
 dropZone.classList.remove('dragover');
 });
 dropZone.addEventListener('drop', function(e) {
 e.preventDefault();
 dropZone.classList.remove('dragover');
 var files = Array.from(e.dataTransfer.files || []);
 if (files.length === 0) return;
 // If multiple image files dropped, queue them all
 var imgFiles = files.filter(function(f) { return /.(jpg|jpeg|png|bmp|webp)$/i.test(f.name); });
 if (imgFiles.length > 1) {
 handleMultiImageOCR(imgFiles);
 } else if (files.length === 1) {
 handleFileImportDispatch(files[0]);
 } else {
 // Mixed files - only one non-image file - dispatch it
 handleFileImportDispatch(files[0]);
 }
 });

 // Direct paste (Ctrl+V) handler for text recognition
 dropZone.addEventListener('paste', function(e) {
 var clipboardData = e.clipboardData;
 if (!clipboardData) return;
 // Check for pasted text
 var pastedText = clipboardData.getData('text/plain');
 if (pastedText && pastedText.trim()) {
 // Check if the pasted text contains phone numbers
 var hasPhone = /1[3-9]\\d{9}/.test(pastedText.replace(/[-\\s]/g, ''));
 if (hasPhone) {
 e.preventDefault();
 e.stopPropagation();
 showAIScanningUI('剪贴板文本识别');
 document.getElementById('aiScanStatus').innerHTML = '正在识别粘贴的文本...';
 document.getElementById('aiLog1').innerHTML = '分析剪贴板文本内容...';
 document.getElementById('aiLog1').style.opacity = '1';
 correctOcrTextWithAI(pastedText.trim(), '剪贴板文本', function(contacts) {
 if (contacts && contacts.length > 0) {
 window.renderAIUnstructuredReport('剪贴板文本', contacts);
 } else {
 // Reset UI first, then show text panel for manual retry
 resetAIImporterUI();
 document.getElementById('textImportPanel').style.display = 'flex';
 document.getElementById('textImportArea').value = pastedText.trim();
 document.getElementById('textImportArea').focus();
 if (typeof showCopyLimitToast === 'function') {
 showCopyLimitToast('直接识别未检出，已填入文本框，可点击"智能识别提取"重试', true);
 }
 }
 });
 }
 }
 });

 // Listen for paste events on the whole document to catch pastes anywhere
 document.addEventListener('paste', function(e) {
 // Only handle if dashboardPanel modal is active and we're not in an input/textarea
 var dp = document.getElementById('dashboardPanel');
 if (!dp || !dp.classList.contains('active')) return;
 var activeEl = document.activeElement;
 if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable)) return;

 var clipboardData = e.clipboardData;
 if (!clipboardData) return;
 var pastedText = clipboardData.getData('text/plain');
 if (pastedText && pastedText.trim()) {
 var hasPhone = /1[3-9]\\d{9}/.test(pastedText.replace(/[-\\s]/g, ''));
 if (hasPhone) {
 e.preventDefault();
 e.stopPropagation();
 showAIScanningUI('剪贴板文本识别');
 document.getElementById('aiScanStatus').innerHTML = '正在识别粘贴的文本...';
 document.getElementById('aiLog1').innerHTML = '分析剪贴板文本内容...';
 document.getElementById('aiLog1').style.opacity = '1';
 correctOcrTextWithAI(pastedText.trim(), '剪贴板文本', function(contacts) {
 if (contacts && contacts.length > 0) {
 window.renderAIUnstructuredReport('剪贴板文本', contacts);
 } else {
 // Reset UI first, then show text panel for manual retry
 resetAIImporterUI();
 document.getElementById('textImportPanel').style.display = 'flex';
 document.getElementById('textImportArea').value = pastedText.trim();
 document.getElementById('textImportArea').focus();
 if (typeof showCopyLimitToast === 'function') {
 showCopyLimitToast('直接识别未检出，已填入文本框，可点击"智能识别提取"重试', true);
 }
 }
 });
 }
 }
 });
 }

 // Local OCR Slicing Config Bindings
 var slider1 = document.getElementById('sliderSplit1');
 var slider2 = document.getElementById('sliderSplit2');
 var orderSelect = document.getElementById('ocrColumnOrder');
 if (slider1 && slider2) {
 slider1.oninput = function() {
 var s1 = parseInt(slider1.value);
 var s2 = parseInt(slider2.value);
 if (s1 >= s2) {
 slider1.value = s2 - 2;
 }
 drawOcrSlicingPreviewLines();
 };
 slider2.oninput = function() {
 var s1 = parseInt(slider1.value);
 var s2 = parseInt(slider2.value);
 if (s2<= s1) {
            slider2.value = s1 + 2;
          }
          drawOcrSlicingPreviewLines();
        };
      }
      if (orderSelect) {
        orderSelect.onchange = drawOcrSlicingPreviewLines;
      }
      
      var btnStart = document.getElementById('btnStartLocalOcr');
      if (btnStart) btnStart.onclick = startLocalOcrProcessing;
      
      var btnCancel = document.getElementById('btnCancelLocalOcr');
      if (btnCancel) btnCancel.onclick = resetAIImporterUI;
    }

    // Clear and Export Data
    function initDataActions() {
      var clearBtn = document.getElementById('clearBtn');
      var transferPoolBtn = document.getElementById('transferCurrentPoolBtn');
      if (transferPoolBtn) {
        // 手动将当前拨号列表整体转入公海。用 onclick 覆盖绑定，避免初始化重复时重复提交。
        transferPoolBtn.onclick = async function() {
          if (transferPoolBtn.disabled) return;

          var clients = Array.isArray(importedClients) ? importedClients.slice() : [];
          if (!clients.length) {
            alert('当前拨号列表为空，无需转移。');
            return;
          }

          // 统一提取手机号并去重；只要有一条无号码，就中止，避免“全部转移”实际遗漏。
          var mobiles = [];
          var mobileSet = Object.create(null);
          var invalidRows = [];
          clients.forEach(function(client, index) {
            var raw = client && (client.phone || client.mobile || client.tel || client.telephone);
            var mobile = String(raw || '').replace(/\\D/g, '');
            if (!mobile) {
              invalidRows.push(index + 1);
              return;
            }
            if (!mobileSet[mobile]) {
              mobileSet[mobile] = true;
              mobiles.push(mobile);
            }
          });

          if (invalidRows.length) {
            alert('当前列表有 ' + invalidRows.length + ' 条客户缺少有效手机号（行号：' +
              invalidRows.slice(0, 10).join('、') + (invalidRows.length > 10 ? '…' : '') +
              '）。本次未执行转移，请先补全号码。');
            return;
          }
          if (!mobiles.length) {
            alert('当前列表没有可转移的有效手机号。');
            return;
          }

          var confirmText = '即将把当前拨号列表中的 ' + clients.length + ' 条客户记录转入公海。' +
            '\\n手机号去重后：' + mobiles.length + ' 个。' +
            '\\n\\n转移成功后，客户将从当前账户移出，当前拨号列表也会清空。' +
            '\\n此操作不可直接撤销，确定继续吗？';
          if (!window.confirm(confirmText)) return;

          var originalText = transferPoolBtn.textContent;
          transferPoolBtn.disabled = true;
          transferPoolBtn.textContent = '正在转移…';
          transferPoolBtn.style.opacity = '0.65';

          try {
            var token = getSessionToken();
            if (!token) throw new Error('登录状态已失效，请重新登录后再试。');

            var headers = {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            };
            // 主账户正在查看子账户数据时，必须把视图账户一起传给后端。
            if (_viewAccountId) headers['X-View-Account-Id'] = _viewAccountId;

            var response = await window.fetch('/api/dialer/customers/transfer-to-pool', {
              method: 'POST',
              headers: headers,
              body: JSON.stringify({ mobiles: mobiles })
            });

            var result = await response.json().catch(function() { return null; });
            if (!response.ok) {
              var httpMessage = result && (result.error || result.message);
              if (response.status === 401) httpMessage = '登录已过期，请重新登录后再执行。';
              throw new Error(httpMessage || ('服务器请求失败（HTTP ' + response.status + '）'));
            }
            if (!result || result.success !== true) {
              throw new Error((result && result.error) || '服务器没有确认转移成功。');
            }

            var transferred = Number(result.transferred);
            if (!Number.isFinite(transferred)) transferred = 0;

            // 后端返回的是实际更新的数据库行数。同一手机号若在多个账户存在，
            // 更新行数可能大于去重手机号数，因此只检查是否少于请求数，不要求严格相等。
            if (transferred < mobiles.length) {
              throw new Error('云端只确认转移 ' + transferred + '/' + mobiles.length +
                ' 个号码。为防止丢失数据，当前拨号列表暂时保留；请核对公海和账户数据后再重试。');
            }

            // 只有云端确认全部号码均已转移，才清空本地拨号列表。
            importedClients = [];
            currentCallIdx = -1;
            window._roundTransferBlocked = false;
            window._roundTransferPending = false;
            _reminderShown = false;
            _pendingReminderClient = null;
            if (_reminderSeqTimer) {
              clearTimeout(_reminderSeqTimer);
              _reminderSeqTimer = null;
            }
            saveState();
            updateDashboardVisibility(false);

            var statusEl = document.getElementById('importStatus');
            if (statusEl) statusEl.textContent = '';
            renderDialCards();
            updateStats();
            refreshAccountDataCount();

            showCopyLimitToast('转移完成：' + clients.length + ' 条客户记录已转入公海', true);
          } catch (err) {
            console.error('[transfer-to-pool] failed:', err);
            alert('转移失败：' + (err && err.message ? err.message : '未知错误') +
              '\\n\\n当前拨号列表已保留，没有清空。');
          } finally {
            transferPoolBtn.disabled = false;
            transferPoolBtn.textContent = originalText || '转移至公海';
            transferPoolBtn.style.opacity = '';
          }
        };
      }
      var exportBtn = document.getElementById('exportBtn');
      var closeExport = document.getElementById('closeExportBtn');
      var copyExport = document.getElementById('copyExportBtn');
      var exportModal = document.getElementById('exportModal');
      var exportArea = document.getElementById('exportTextarea');

      if (clearBtn) {
        clearBtn.addEventListener('click', function() {
          if (confirm('确认清空当前导入的客户和所有的拨号记录吗？')) {
            importedClients = [];
            window._roundTransferBlocked = false;
            window._roundTransferPending = false;
            _reminderShown = false;
            _pendingReminderClient = null;
            if (_reminderSeqTimer) { clearTimeout(_reminderSeqTimer); _reminderSeqTimer = null; }
            saveState();
            updateDashboardVisibility(false);
            var statusEl = document.getElementById('importStatus');
            if (statusEl) statusEl.innerText = '';
            renderDialCards();
          }
        });
      }

      if (exportBtn) {
        exportBtn.addEventListener('click', function() {
          if (importedClients.length === 0) return;
          
          var lines = ['姓名,电话,单位,状态,时长,沟通小记'];
          importedClients.forEach(function(c) {
            var statusStr = '待拨打';
            if (c.dialedStatus === 'success') statusStr = '已接通';
            else if (c.dialedStatus === 'failed') statusStr = '未接通';

            lines.push(
              '"' + c.name + '",' +
              '"' + c.phone + '",' +
              '"' + (c.company || '') + '",' +
              '"' + statusStr + '",' +
              '"' + (c.duration || '') + '",' +
              '"' + (c.callNote || '') + '"'
            );
          });

          if (exportArea) exportArea.value = lines.join('\\n');
          if (exportModal) exportModal.classList.add('active');
        });
      }

      if (closeExport && exportModal) {
        closeExport.addEventListener('click', function() {
          exportModal.classList.remove('active');
        });
      }

      if (copyExport && exportArea) {
        copyExport.addEventListener('click', function() {
          exportArea.select();
          document.execCommand('copy');
          copyExport.textContent = '已成功复制！';
          setTimeout(function() {
            copyExport.textContent = '复制记录到剪贴板';
          }, 1500);
        });
      }
    }

    // ====== Customer Data Viewer (Supabase CRM) ======
    var DB = {
      page: 1,
      total: 0,
      pageSize: 300, // 默认 300 条/页
      timer: null,
      sortBy: '',
      sortDir: 'asc',
      activeTab: 'all', // all, 意向客户, 线索池, 公海客户
      activeShortcut: 'all', // all, today, never, 3days
      selectedIds: {}, // 选中的 ID 字典
      allData: [], // 缓存在前端的数据，方便高精度过滤与本地计算
      customColumns: (function() {
        try {
          var saved = localStorage.getItem('crm_custom_columns');
          var parsed = saved ? JSON.parse(saved) : [];
          return Array.isArray(parsed) ? parsed : [];
        } catch(e) { return []; }
      })()
    };
    var CATS = ['潜在客户','意向客户','已成交','无效号码','待跟进','老客户','同行','其他','公海客户'];

    function parseCustomerNote(c) {
      var noteStr = (c.note || '').trim();
      var parsed = { note: noteStr, custom: {} };
      if (!noteStr) return parsed;
      if (noteStr.indexOf('{') === 0) {
        var braceCount = 0;
        var jsonEndIdx = -1;
        for (var i = 0; i < noteStr.length; i++) {
          if (noteStr[i] === '{') braceCount++;
          else if (noteStr[i] === '}') {
            braceCount--;
            if (braceCount === 0) {
              jsonEndIdx = i;
              break;
            }
          }
        }
        if (jsonEndIdx !== -1) {
          var jsonPart = noteStr.slice(0, jsonEndIdx + 1);
          var textPart = noteStr.slice(jsonEndIdx + 1).trim();
          try {
            var obj = JSON.parse(jsonPart);
            if (obj && typeof obj === 'object') {
              var baseNote = obj.note !== undefined ? obj.note : '';
              parsed.custom = obj.custom || {};
              if (obj.fund) {
                c.fund = obj.fund; // Restore fund to customer object
              }
              if (textPart) {
                parsed.note = baseNote ? baseNote + '\\n' + textPart : textPart;
              } else {
                parsed.note = baseNote;
              }
              return parsed;
            }
          } catch (e) {}
        }
      }
      return parsed;
    }

    function serializeCustomersForSupabase(customers) {
      return customers.map(function(c) {
        var copy = Object.assign({}, c);
        var parsed = { note: copy.note || '', custom: copy.custom || {} };
        
        var fundVal = (copy.fund || '').trim();
        var rawNote = (copy.note || '').trim();
        if (rawNote.indexOf('{') === 0) {
          try {
            var braceCount = 0;
            var jsonEndIdx = -1;
            for (var i = 0; i < rawNote.length; i++) {
              if (rawNote[i] === '{') braceCount++;
              else if (rawNote[i] === '}') {
                braceCount--;
                if (braceCount === 0) { jsonEndIdx = i; break; }
              }
            }
            if (jsonEndIdx !== -1) {
              var jsonPart = rawNote.slice(0, jsonEndIdx + 1);
              var textPart = rawNote.slice(jsonEndIdx + 1).trim();
              var obj = JSON.parse(jsonPart);
              if (obj && typeof obj === 'object') {
                parsed.note = obj.note !== undefined ? obj.note : '';
                parsed.custom = Object.assign({}, obj.custom || {}, parsed.custom);
                if (obj.fund && !fundVal) fundVal = obj.fund;
                if (textPart) {
                  parsed.note = parsed.note ? parsed.note + '\\n' + textPart : textPart;
                }
              }
            }
          } catch(e) {}
        }

        var jsonPayload = { note: parsed.note, custom: parsed.custom };
        if (fundVal) {
          jsonPayload.fund = fundVal;
        }

        if (Object.keys(parsed.custom).length > 0 || fundVal) {
          copy.note = JSON.stringify(jsonPayload);
        } else {
          copy.note = parsed.note;
        }
        copy.mobile = copy.mobile || copy.phone;
        delete copy.last_operation; // 不通过 upsert 覆盖操作记录
        return copy;
      });
    }

    function getCustomerOperationCells(c) {
      var op = c && c.last_operation && typeof c.last_operation === 'object' ? c.last_operation : null;
      var ts = op && op.ts ? op.ts : (c && c.created_at ? c.created_at : '');
      var dateText = '-';
      if (ts) { var dt = new Date(ts); if (!isNaN(dt.getTime())) dateText = dt.getFullYear() + '-' + String(dt.getMonth() + 1).padStart(2, '0') + '-' + String(dt.getDate()).padStart(2, '0') + ' ' + String(dt.getHours()).padStart(2, '0') + ':' + String(dt.getMinutes()).padStart(2, '0'); }
      var type = op && op.type ? op.type : 'add';
      var method = (type === 'dial' || type === 'call_success' || type === 'call_failed') ? '拨打' : '添加';
      var accountName = op && (op.previous_operator_account_name || op.operator_account_name || op.account_name) ? (op.previous_operator_account_name || op.operator_account_name || op.account_name) : (c && c.owner_account_name ? c.owner_account_name : '主账户');
      return { time: dateText, method: method, account: accountName };
    }


    // 在客户列表中直接编辑独立的“在库机构”字段。
    function editStorageInstitution(mobile, currentValue) {
      var nextValue = window.prompt('请输入在库机构（留空可清除）', currentValue || '');
      if (nextValue === null) return;
      nextValue = String(nextValue).trim();
      fetch('/api/dialer/customers', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mobile: mobile, fields: { storage_institution: nextValue } }) })
        .then(function(r) { return r.json(); }).then(function(res) {
          if (!res || !res.success) throw new Error(res && res.error ? res.error : '保存失败');
          showCopyLimitToast('在库机构已保存'); dbFetch();
        }).catch(function(err) { alert('保存在库机构失败：' + err.message); });
    }

    function renderCRMHeaders() {
      var headerRow = document.getElementById('dbHeaderRow');
      if (!headerRow) return;
      var html = '<th style="width: 40px; text-align: center; cursor: default;"><input type="checkbox" id="crmSelectAll"></th>' +
        '<th data-sort="name" style="width: 140px; cursor: pointer;">客户名称 <span class="sort-arrow"></span></th>' +
        '<th data-sort="mobile" style="width: 160px; cursor: pointer;">联系号码 <span class="sort-arrow"></span></th>' +
        '<th data-sort="note" style="min-width: 120px; cursor: pointer;">备注 <span class="sort-arrow"></span></th>';
      // 批量设置的“类型”是独立固定列，不混入通用自定义列，避免挤占/错位原有单位字段。
      html += '<th data-sort="batch_type" style="min-width: 100px; cursor: pointer;">类型 <span class="sort-arrow"></span></th>';
      var customCols = (DB.customColumns || []).filter(function(col) { return col !== '类型'; });
      customCols.forEach(function(col) {
        html += '<th data-sort="custom_' + esc(col) + '" style="min-width: 100px; cursor: pointer;">' + esc(col) + '<span class="sort-arrow"></span></th>';
      });
      html += '<th data-sort="company_name" style="min-width: 200px; cursor: pointer;">单位 <span class="sort-arrow"></span></th>' +
        '<th data-sort="storage_institution" style="min-width: 160px; cursor: pointer;">在库机构 <span class="sort-arrow"></span></th>' +
        '<th data-sort="category" style="width: 100px; cursor: pointer;">分类 <span class="sort-arrow"></span></th>' +
        '<th style="min-width:145px;cursor:default;">操作时间</th>' +
        '<th style="width:85px;cursor:default;">操作方式</th>' +
        '<th style="min-width:110px;cursor:default;">前操作员</th>' +
        '<th style="width: 100px; cursor: default;">操作</th>';
      headerRow.innerHTML = html;
      dbWireSortHeaders();
      var selectAllCb = document.getElementById('crmSelectAll');
      if (selectAllCb) {
        selectAllCb.onchange = function() {
          var cbs = document.querySelectorAll('#dbTbody .crm-row-select');
          var checked = selectAllCb.checked;
          cbs.forEach(function(cb) {
            cb.checked = checked;
            var m = cb.getAttribute('data-mobile');
            var tr = cb.closest('tr');
            if (checked) {
              DB.selectedIds[m] = true;
              if (tr) tr.classList.add('selected');
            } else {
              delete DB.selectedIds[m];
              if (tr) tr.classList.remove('selected');
            }
          });
        };
      }
    }

    function renderCustomColumnsList() {
      var container = document.getElementById('customColumnsList');
      if (!container) return;
      var cols = DB.customColumns || [];
      if (cols.length === 0) {
        container.innerHTML = '<div style="font-size:0.72rem; color:var(--text-light); text-align:center; padding:10px;">暂无自定义列，可在下方输入添加。</div>';
        return;
      }
      var html = '';
      cols.forEach(function(col, idx) {
        html += '<div style="display:flex; justify-content:space-between; align-items:center; background:var(--card-bg); padding:6px 8px; border-radius:4px; border:0.5px solid var(--card-border); font-size:0.75rem; font-weight:bold;">' +
          '<span>' + esc(col) + '</span>' +
          '<button class="delete-custom-col-btn" data-idx="' + idx + '" style="background:none; border:none; color:#e74c3c; cursor:pointer; font-weight:bold; font-size:0.9rem; padding:0 4px;"></button>' +
          '</div>';
      });
      container.innerHTML = html;
      container.querySelectorAll('.delete-custom-col-btn').forEach(function(btn) {
        btn.onclick = function() {
          var idx = parseInt(btn.getAttribute('data-idx'));
          var colName = DB.customColumns[idx];
          if (confirm('确认删除自定义列「' + colName + '」吗？(注意：删除列仅隐藏前端显示，已存入备注中的数据不会丢失)')) {
            DB.customColumns.splice(idx, 1);
            localStorage.setItem('crm_custom_columns', JSON.stringify(DB.customColumns));
            renderCustomColumnsList();
            renderCRMHeaders();
            dbTable(crmFilterData(DB.allData));
          }
        };
      });
    }

    function initCustomColumnsHandlers() {
      var manageBtn = document.getElementById('crmManageColsBtn');
      var modal = document.getElementById('customColumnsModal');
      var closeBtn = document.getElementById('closeCustomColumnsBtn');
      var addBtn = document.getElementById('addCustomColBtn');
      var input = document.getElementById('newCustomColInput');
      if (manageBtn && modal) {
        manageBtn.onclick = function() {
          renderCustomColumnsList();
          modal.classList.add('active');
        };
      }
      if (closeBtn && modal) {
        closeBtn.onclick = function() {
          modal.classList.remove('active');
        };
      }
      if (addBtn && input) {
        addBtn.onclick = function() {
          var val = input.value.trim();
          if (!val) return;
          if (val.length > 20) { alert('列名过长，请保持在20字以内'); return; }
          if (['name', 'mobile', 'phone', 'company', 'company_name', 'note', 'fund', 'category', 'batch_label', 'created_at', 'id'].indexOf(val.toLowerCase()) !== -1) {
            alert('该列名是系统保留字段，不能作为自定义列名');
            return;
          }
          if (DB.customColumns.indexOf(val) !== -1) {
            alert('该列名已存在');
            return;
          }
          DB.customColumns.push(val);
          localStorage.setItem('crm_custom_columns', JSON.stringify(DB.customColumns));
          input.value = '';
          renderCustomColumnsList();
          renderCRMHeaders();
          dbTable(crmFilterData(DB.allData));
        };
        input.addEventListener('keypress', function(e) {
          if (e.key === 'Enter') addBtn.click();
        });
      }
    }

    function renderImportMappingControls(headersList, detected) {
      var container = document.getElementById('aiAdjustControls');
      if (!container) return;
      var html = '<div style="display: flex; flex-direction: column; gap: 2px;">' +
        '<label style="font-size: 0.6rem; color: var(--text-light); font-weight: 600;">姓名数据列</label>' +
        '<select id="aiSelName" style="height: 24px; font-size: 0.65rem; outline: none; border: 0.5px solid var(--card-border); border-radius: var(--radius-xs); font-weight: 600; color: var(--text-soft); background: var(--btn-bg);"></select>' +
        '</div>' +
        '<div style="display: flex; flex-direction: column; gap: 2px;">' +
        '<label style="font-size: 0.6rem; color: var(--text-light); font-weight: 600;">电话数据列</label>' +
        '<select id="aiSelPhone" style="height: 24px; font-size: 0.65rem; outline: none; border: 0.5px solid var(--card-border); border-radius: var(--radius-xs); font-weight: 600; color: var(--text-soft); background: var(--btn-bg);"></select>' +
        '</div>' +
        '<div style="display: flex; flex-direction: column; gap: 2px;">' +
        '<label style="font-size: 0.6rem; color: var(--text-light); font-weight: 600;">公司数据列 (可选)</label>' +
        '<select id="aiSelCompany" style="height: 24px; font-size: 0.65rem; outline: none; border: 0.5px solid var(--card-border); border-radius: var(--radius-xs); font-weight: 600; color: var(--text-soft); background: var(--btn-bg);"></select>' +
        '</div>' +
        '<div style="display: flex; flex-direction: column; gap: 2px;">' +
        '<label style="font-size: 0.6rem; color: var(--text-light); font-weight: 600;">在库机构数据列 (可选)</label>' +
        '<select id="aiSelStorageInstitution" style="height: 24px; font-size: 0.65rem; outline: none; border: 0.5px solid var(--card-border); border-radius: var(--radius-xs); font-weight: 600; color: var(--text-soft); background: var(--btn-bg);"></select>' +
        '</div>' +
        '<div style="display: flex; flex-direction: column; gap: 2px;">' +
        '<label style="font-size: 0.6rem; color: var(--text-light); font-weight: 600;">备注数据列 (可选)</label>' +
        '<select id="aiSelNote" style="height: 24px; font-size: 0.65rem; outline: none; border: 0.5px solid var(--card-border); border-radius: var(--radius-xs); font-weight: 600; color: var(--text-soft); background: var(--btn-bg);"></select>' +
        '</div>';
      var customCols = DB.customColumns || [];
      customCols.forEach(function(col) {
        html += '<div style="display: flex; flex-direction: column; gap: 2px;">' +
          '<label style="font-size: 0.6rem; color: var(--text-light); font-weight: 600;">' + esc(col) + ' 数据列 (可选)</label>' +
          '<select class="aiSelCustom" data-col="' + esc(col) + '" style="height: 24px; font-size: 0.65rem; outline: none; border: 0.5px solid var(--card-border); border-radius: var(--radius-xs); font-weight: 600; color: var(--text-soft); background: var(--btn-bg);"></select>' +
          '</div>';
      });
      container.innerHTML = html;
      populateMappingSelect('aiSelName', headersList, detected.nameIdx);
      populateMappingSelect('aiSelPhone', headersList, detected.phoneIdx);
      populateMappingSelect('aiSelCompany', headersList, detected.companyIdx, true);
      populateMappingSelect('aiSelStorageInstitution', headersList, detected.storageInstitutionIdx === undefined ? -1 : detected.storageInstitutionIdx, true);
      populateMappingSelect('aiSelNote', headersList, detected.noteIdx, true);
      var customSelects = container.querySelectorAll('.aiSelCustom');
      customSelects.forEach(function(sel) {
        var colName = sel.getAttribute('data-col');
        var matchedIdx = -1;
        for (var h = 0; h < headersList.length; h++) {
          if (headersList[h] && headersList[h].label.toLowerCase() === colName.toLowerCase()) {
            matchedIdx = headersList[h].idx;
            break;
          }
        }
        populateMappingSelect(sel, headersList, matchedIdx, true);
        sel.addEventListener('change', updateAIPreviewTable);
      });
      document.getElementById('aiSelName').addEventListener('change', updateAIPreviewTable);
      document.getElementById('aiSelPhone').addEventListener('change', updateAIPreviewTable);
      document.getElementById('aiSelCompany').addEventListener('change', updateAIPreviewTable);
      document.getElementById('aiSelStorageInstitution').addEventListener('change', updateAIPreviewTable);
      document.getElementById('aiSelNote').addEventListener('change', updateAIPreviewTable);
    }

    // CRM 数据复合过滤器 (AND 关系)
    function crmFilterData(data) {
      var filtered = (data || []).slice();
      
      // 1. 快捷按钮筛选 (activeShortcut)
      if (DB.activeShortcut && DB.activeShortcut !== 'all') {
        if (DB.activeShortcut === 'today') {
          var todayStr = new Date().toISOString().slice(0, 10);
          filtered = filtered.filter(function(c) {
            return c.created_at && c.created_at.slice(0, 10) === todayStr;
          });
        } else if (DB.activeShortcut === 'never') {
          filtered = filtered.filter(function(c) {
            return (!c.note || c.note.trim() === '') && (!c.fund || c.fund.trim() === '');
          });
        } else if (DB.activeShortcut === '3days') {
          var threeDaysAgo = Date.now() - 3 * 24 * 60 * 60 * 1000;
          filtered = filtered.filter(function(c) {
            return c.created_at && new Date(c.created_at).getTime() < threeDaysAgo;
          });
        }
      }

      // 1.5 导入批次下拉筛选
      var batchView = document.getElementById('dbImportBatchView');
      var selectedBatch = batchView ? batchView.value : '';
      if (selectedBatch) filtered = filtered.filter(function(c) { return String(c.batch_label || '') === selectedBatch; });

      // 2. 多维度搜索表单筛选 (AND 关系)
      // 单一模糊关联搜索：单位、客户、号码、备注/自定义字段、导入批次任一命中即可。
      var fuzzyF = document.getElementById('dbFuzzySearch') ? document.getElementById('dbFuzzySearch').value.trim().toLowerCase() : '';
      if (fuzzyF) {
        filtered = filtered.filter(function(c) {
          var parsed = parseCustomerNote(c);
          var customVal = '';
          for (var key in parsed.custom) {
            if (Object.prototype.hasOwnProperty.call(parsed.custom, key)) customVal += ' ' + String(parsed.custom[key] || '');
          }
          var searchable = [
            c.company_name, c.name, c.mobile, c.batch_label,
            c.note, parsed.note, c.fund, customVal
          ].join(' ').toLowerCase();
          return searchable.indexOf(fuzzyF) !== -1;
        });
      }

      // 3. 排序 (Sort)
      if (DB.sortBy) {
        var isDesc = DB.sortDir === 'desc';
        filtered.sort(function(a, b) {
          var valA = '';
          var valB = '';
          if (DB.sortBy.indexOf('custom_') === 0) {
            var col = DB.sortBy.slice(7);
            var parsedA = parseCustomerNote(a);
            var parsedB = parseCustomerNote(b);
            valA = parsedA.custom[col] || '';
            valB = parsedB.custom[col] || '';
          } else if (DB.sortBy === 'created_at') {
            valA = a.created_at || '';
            valB = b.created_at || '';
          } else if (DB.sortBy === 'category') {
            valA = a.category || '';
            valB = b.category || '';
          } else {
            valA = a[DB.sortBy] || '';
            valB = b[DB.sortBy] || '';
          }
          var strA = String(valA).trim();
          var strB = String(valB).trim();
          var numA = parseFloat(strA);
          var numB = parseFloat(strB);
          if (!isNaN(numA) && !isNaN(numB)) {
            return isDesc ? numB - numA : numA - numB;
          }
          var cmp = strA.localeCompare(strB, 'zh-CN', { numeric: true, sensitivity: 'base' });
          return isDesc ? -cmp : cmp;
        });
      }

      // 4. 冷却期客户自动排到最后（避免添加到待拨打时误勾选）
      filtered.sort(function(a, b) {
        var aCool = !canAddToDialList(a.mobile);
        var bCool = !canAddToDialList(b.mobile);
        if (aCool && !bCool) return 1;
        if (!aCool && bCool) return -1;
        return 0;
      });

      return filtered;
    }

    function dbFetch() {
      var searchInput = document.getElementById('dbSearch');
      var q = searchInput ? searchInput.value.trim() : '';

      var activeTab = DB.activeTab || 'all';

      // 搜索字段统一在本地缓存中模糊匹配；快捷分类标签仍沿用 activeTab。
      var category = '';
      if (activeTab && activeTab !== 'all') category = activeTab;

      // 拉取大量数据到本地缓存，再客户端分页（保证冷却期排序跨全部数据生效）
      // 排除冷却期客户以减少 Supabase 数据传输量
      var cooldownMobiles = Object.keys(getAddHistory());
      // 服务端分页：每次只取当前页，避免一次拉取数千条触发 Worker 子请求限制。
      DB.pageSize = Math.min(300, Math.max(1, parseInt(DB.pageSize, 10) || 50));
      var requestAccountId = _viewAccountId || getOrCreateAccountId();
      var url = '/api/dialer/customers?page=' + DB.page + '&pageSize=' + DB.pageSize + '&account_id=' + encodeURIComponent(requestAccountId);
      if (q) url += '&search=' + encodeURIComponent(q);
      if (category) url += '&category=' + encodeURIComponent(category);
      var batchFilter = (document.getElementById('dbBatchFilter') || {}).value || '';
      if (batchFilter) url += '&batch_label=' + encodeURIComponent(batchFilter);
      if (DB.sortBy) url += '&sortBy=' + encodeURIComponent(DB.sortBy) + '&sortDir=' + DB.sortDir;
      if (cooldownMobiles.length > 0) url += '&exclude=' + encodeURIComponent(cooldownMobiles.join(','));

      var colCount = 12 + (DB.customColumns || []).length;
      var tbody = document.getElementById('dbTbody');
      if (tbody) tbody.innerHTML = '<tr><td colspan="' + colCount + '" class="db-loading">数据加载中...</td></tr>';

      fetch(url)
        .then(function(r) { return r.json(); })
        .then(function(res) {
          if (res.error) {
            if (tbody) tbody.innerHTML = '<tr><td colspan="' + colCount + '" style="text-align:center;padding:40px;color:#e74c3c;">Supabase 查询出错: ' + esc(res.error) + '</td></tr>';
            return;
          }
          var rawData = res.data || [];
          DB.allData = rawData; // 仅缓存当前页，翻页时由服务端加载下一批
          DB.total = Number.isFinite(Number(res.total)) ? Number(res.total) : rawData.length;

          // 当前页继续应用本地快捷筛选/冷却期排序；总数始终使用数据库返回的真实总数。
          var filtered = crmFilterData(rawData);
          dbTable(filtered, true);
          dbPager();
          crmUpdateBadgeCounts(rawData);
          dbFilters(rawData);

          var totalEl = document.getElementById('dbTotal');
          if (totalEl) totalEl.textContent = '共 ' + DB.total + ' 条';
        })
        .catch(function(err) {
          if (tbody) tbody.innerHTML = '<tr><td colspan="' + colCount + '" style="text-align:center;padding:40px;color:#e74c3c;">数据加载失败: ' + esc(err.message) + '</td></tr>';
        });
    }

    // 客户端分页：从缓存中翻页，保证冷却期排序生效
    function dbRenderCached() {
      var filtered = crmFilterData(DB.allData);
      DB.total = filtered.length;
      dbTable(filtered);
      dbPager();
      var totalEl = document.getElementById('dbTotal');
      if (totalEl) totalEl.textContent = '共 ' + DB.total + ' 条';
    }

    // 统计状态栏更新
    function crmUpdateBadgeCounts(data) {
      var cyan = 0;
      var d = data || [];
      for (var i = 0; i < d.length; i++) {
        var c = d[i];
        var cat = c.category || '';
        if (c.batch_label && !c.batch_label.includes('广告') && cat === '待跟进') {
          cyan++;
        }
      }
      if (document.getElementById('crmBlueCount')) document.getElementById('crmBlueCount').textContent = DB.total;
      if (document.getElementById('crmCyanCount')) document.getElementById('crmCyanCount').textContent = cyan;
    }

    // 表格行渲染（窄屏自动切换为卡片式手机视图）
    function dbTable(data, alreadyPaged) {
      var tb = document.getElementById('dbTbody');
      var em = document.getElementById('dbEmpty');
      if (!tb) return;

      // 服务端分页时 data 已经是当前页；本地缓存渲染才在这里切片。
      if (!alreadyPaged && data && data.length > 0) {
        var sliceStart = (DB.page - 1) * DB.pageSize;
        var sliceEnd = Math.min(sliceStart + DB.pageSize, data.length);
        data = data.slice(sliceStart, sliceEnd);
      }

      var tableEl = document.querySelector('.crm-table');

      if (!data || data.length === 0) {
        tb.innerHTML = '';
        if (em) em.style.display = 'block';
        if (tableEl) tableEl.style.display = '';
        return;
      }
      if (em) em.style.display = 'none';
      // 统一宽屏表格：始终显示表格（窄屏由 .db-table-wrap 横向滚动）
      if (tableEl) tableEl.style.display = '';

      var h = '';
      var avatarColors = ['#ff5722', '#4a6cf7', '#07c160', '#ff9800', '#9c27b0', '#00bcd4', '#3f51b5', '#e91e63'];

      for (var i = 0; i < data.length; i++) {
        var c = data[i];
        var cat = c.category || '';

        var isChecked = DB.selectedIds[c.mobile] ? ' checked' : '';
        var isTrSelected = DB.selectedIds[c.mobile] ? ' class="selected"' : '';

        var isNew = c.created_at && (Date.now() - new Date(c.created_at).getTime() < 24 * 60 * 60 * 1000);
        var badgeHtml = isNew ? '<span class="crm-badge-new">新</span>' : '<span class="crm-badge-old">旧</span>';

        var firstChar = (c.name || '').trim().charAt(0) || '匿';
        var colorIdx = Math.abs(firstChar.charCodeAt(0)) % avatarColors.length;
        var avatarBg = avatarColors[colorIdx];
        var avatarHtml = '<span class="crm-avatar" style="background:' + avatarBg + ';">' + esc(firstChar) + '</span>';

        var parsed = parseCustomerNote(c);
        var realNote = parsed.note;
        var noteDisplay = '';
        var whitelistProductHtml = c.whitelist_name ? '<span style="display:inline-flex;align-items:center;margin-bottom:3px;padding:2px 6px;border-radius:4px;background:rgba(7,193,96,0.10);color:#079447;font-size:11px;font-weight:700;">白名单产品：' + esc(c.whitelist_name) + '</span>' : '';
        if (c.fund || whitelistProductHtml) {
          noteDisplay = '<div style="display:flex; flex-direction:column; gap:4px; align-items:flex-start;">' +
            (c.fund ? '<span class="crm-fund-tag" style="background:rgba(255,152,0,0.12); color:#e65100; font-weight:900; font-size:11px; padding:2px 6px; border-radius:4px; display:inline-flex; align-items:center; border:none; box-shadow:var(--shadow-card);">公积金: ' + esc(c.fund) + '</span>' : '') +
            whitelistProductHtml +
            (realNote ? '<span style="color:var(--text-soft); font-weight:normal;">' + esc(realNote) + '</span>' : '') +
            '</div>';
        } else {
          noteDisplay = realNote ? esc(realNote) : '-';
        }

        // 独立类型列只读取专用键；原有自定义字段和 company_name（单位）保持原位。
        var batchTypeTd = '<td style="white-space: normal; min-width: 100px; word-break: break-all;">' + esc(parsed.custom.__batch_type || '-') + '</td>';
        var customTds = '';
        var customCols = (DB.customColumns || []).filter(function(col) { return col !== '类型'; });
        customCols.forEach(function(col) {
          var val = parsed.custom[col] || '-';
          customTds += '<td style="white-space: normal; min-width: 100px; word-break: break-all;">' + esc(val) + '</td>';
        });

        // 统一宽屏表格渲染（窄屏由 .db-table-wrap 横向滚动，不再切卡片）
        h += '<tr' + isTrSelected + ' data-mobile="' + esc(c.mobile || '') + '">' +
          '<td style="text-align: center; cursor: default;"><input type="checkbox" class="crm-row-select" data-mobile="' + esc(c.mobile) + '" data-name="' + esc(c.name || '') + '"' + isChecked + '></td>' +
          '<td>' +
            '<div class="crm-name-cell">' +
              avatarHtml +
              '<div>' +
                '<div style="font-weight: 700; display: flex; align-items: center;">' + badgeHtml + esc(c.name || '-') + '</div>' +
                '<span class="cust-cat-tag set cat-' + esc(cat) + '" data-m="' + esc(c.mobile) + '" data-c="' + esc(cat) + '" style="margin-top: 3px; font-size:10px; padding: 0 6px;">' + esc(cat || '未分类') + '</span>' +
              '</div>' +
            '</div>' +
          '</td>' +          '<td>' +
            '<div class="crm-phone-cell">' +
              esc(c.mobile || '-') +
              '<button class="crm-btn-call" title="点击呼叫 / 复制" onclick="copyTextToClipboard(\\'' + esc(c.mobile) + '\\');showCopyLimitToast(\\'已复制: ' + esc(c.mobile) + '\\');recordTimeline(\\'' + esc(c.mobile) + '\\',\\'copy_phone\\');"></button>' +
            '</div>' +
          '</td>' +
          '<td style="white-space: normal; max-width: 300px; word-break: break-all;">' + noteDisplay + '</td>' +
          batchTypeTd +
          customTds +
          '<td style="white-space: normal;">' + esc(c.company_name || '-') + '</td>' +
          '<td style="white-space: normal; min-width:160px;"><a href="javascript:void(0)" class="crm-storage-edit" data-mobile="' + esc(c.mobile || '') + '" data-value="' + esc(c.storage_institution || '') + '" title="点击编辑在库机构">' + esc(c.storage_institution || '＋设置') + '</a></td>' +
          '<td style="white-space: nowrap;">' + esc(cat || '未分类') + '</td>' +
          (function(){ var opCells = getCustomerOperationCells(c); return '<td style="white-space:nowrap;">' + esc(opCells.time) + '</td><td style="white-space:nowrap;">' + esc(opCells.method) + '</td><td style="white-space:nowrap;">' + esc(opCells.account) + '</td>'; })() +
          '<td style="cursor: default;">' +
            '<a class="crm-action-link crm-btn-followup" data-mobile="' + esc(c.mobile) + '" data-note="' + esc(realNote || '') + '">新增跟进</a>' +
          '</td>' +
        '</tr>';
      }
      // 统一渲染到 tbody（宽屏表格）
      var renderRoot = tb;
      renderRoot.innerHTML = h;

      // Wire individual row checkboxes
      renderRoot.querySelectorAll('.crm-storage-edit').forEach(function(el) { el.onclick = function(e) { e.preventDefault(); e.stopPropagation(); editStorageInstitution(el.getAttribute('data-mobile'), el.getAttribute('data-value')); }; });
      var rowCbs = renderRoot.querySelectorAll('.crm-row-select');
      rowCbs.forEach(function(cb) {
        cb.onchange = function() {
          var m = cb.getAttribute('data-mobile');
          var rowEl = cb.closest('tr');
          if (cb.checked) {
            DB.selectedIds[m] = true;
            if (rowEl) rowEl.classList.add('selected');
          } else {
            delete DB.selectedIds[m];
            if (rowEl) rowEl.classList.remove('selected');
          }
          // Update crmSelectAll status
          var allSelected = true;
          for (var j = 0; j < rowCbs.length; j++) {
            if (!rowCbs[j].checked) { allSelected = false; break; }
          }
          var selectAllCb = document.getElementById('crmSelectAll');
          if (selectAllCb) selectAllCb.checked = (rowCbs.length > 0 && allSelected);
        };
      });

      // Wire row click (except when clicking on checkboxes/links/buttons)
      var rowEls = renderRoot.querySelectorAll('tr');
      rowEls.forEach(function(row) {
        row.onclick = function(e) {
          if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('.crm-btn-call')) {
            return;
          }
          var cb = row.querySelector('.crm-row-select');
          if (cb) {
            cb.checked = !cb.checked;
            cb.onchange();
          }
        };
      });

      // Wire row follow-up click
      renderRoot.querySelectorAll('.crm-btn-followup').forEach(function(btn) {
        btn.onclick = function(e) {
          e.stopPropagation();
          var mobile = btn.getAttribute('data-mobile');
          var oldNote = btn.getAttribute('data-note') || '';
          
          var newNote = prompt('请输入新增的跟进备注记录：', oldNote);
          if (newNote === null) return; // cancelled
          newNote = newNote.trim();
          if (newNote === oldNote) return; // no change
          
          btn.textContent = '...';
          
          var clientObj = DB.allData.find(function(c) { return c.mobile === mobile; });
          var rawNoteStr = clientObj ? (clientObj.note || '') : '';
          var parsed = { note: oldNote, custom: {}, fund: '' };
          if (rawNoteStr.trim().indexOf('{') === 0) {
            try {
              var braceCount = 0;
              var jsonEndIdx = -1;
              for (var i = 0; i < rawNoteStr.length; i++) {
                if (rawNoteStr[i] === '{') braceCount++;
                else if (rawNoteStr[i] === '}') {
                  braceCount--;
                  if (braceCount === 0) { jsonEndIdx = i; break; }
                }
              }
              if (jsonEndIdx !== -1) {
                var jsonPart = rawNoteStr.slice(0, jsonEndIdx + 1);
                var obj = JSON.parse(jsonPart);
                if (obj && typeof obj === 'object') {
                  parsed.custom = obj.custom || {};
                  parsed.fund = obj.fund || '';
                }
              }
            } catch (err) {}
          }
          
          var notePayload = newNote;
          if (Object.keys(parsed.custom).length > 0 || parsed.fund) {
            var pl = { note: newNote, custom: parsed.custom };
            if (parsed.fund) pl.fund = parsed.fund;
            notePayload = JSON.stringify(pl);
          }
          
          fetch('/api/dialer/customers', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              account_id: getOrCreateAccountId(),
              mobile: mobile,
              fields: { note: notePayload }
            })
          })
          .then(function(r) { return r.json(); })
          .then(function(res) {
            if (res.success) {
              dbFetch();
            } else {
              alert('更新跟进记录失败: ' + (res.error || '未知错误'));
              btn.textContent = '新增跟进';
            }
          })
          .catch(function(err) {
            alert('网络错误，更新失败: ' + err.message);
            btn.textContent = '新增跟进';
          });
        };
      });

      // Wire select all checkbox status
      var selectAllCb = document.getElementById('crmSelectAll');
      if (selectAllCb) {
        var allSelected = true;
        for (var j = 0; j < rowCbs.length; j++) {
          if (!rowCbs[j].checked) { allSelected = false; break; }
        }
        selectAllCb.checked = (rowCbs.length > 0 && allSelected);
      }
    }

    function dbPager() {
      var tp = Math.max(1, Math.ceil(DB.total / DB.pageSize));
      var pageInput = document.getElementById('dbPageInput');
      var pageTotal = document.getElementById('dbPageTotal');
      if (pageInput) {
        pageInput.value = DB.page;
        pageInput.max = tp;
      }
      if (pageTotal) pageTotal.textContent = tp;
      var p = document.getElementById('dbPrev');
      var n = document.getElementById('dbNext');
      if (p) p.disabled = (DB.page <= 1);
      if (n) n.disabled = (DB.page >= tp);
    }

    function dbFilters(data) {
      var companyInput = document.getElementById('dbCatFilter');
      var companyList = document.getElementById('dbCompanyNameOptions');
      var batchS = document.getElementById('dbBatchFilter');
      var batchView = document.getElementById('dbImportBatchView');
      if (!companyInput && !batchS && !batchView) return;

      // 从当前账户已加载的在库客户中提取去重单位名称，供 datalist 自动补全。
      var companies = {};
      var bs = {};
      (data || []).forEach(function(c) {
        var company = String(c.company_name || '').trim();
        if (company && company !== '-') companies[company] = true;
        if (c.batch_label) bs[c.batch_label] = true;
      });

      if (companyList) {
        var currentCompany = companyInput ? companyInput.value : '';
        var names = Object.keys(companies).sort(function(a,b) {
          return a.localeCompare(b, 'zh-CN', {numeric:true, sensitivity:'base'});
        });
        companyList.innerHTML = names.map(function(name) {
          return '<option value="' + esc(name) + '"></option>';
        }).join('');
        // 保留用户手动输入的模糊关键词，不强制改成候选项。
        if (companyInput) companyInput.value = currentCompany;
      }

      if (batchS) {
        var curBatch = batchS.value;
        var bh = '<option value="">全部批次</option>';
        Object.keys(bs).sort().forEach(function(k) {
          if (isAutoBatchLabel(k)) return;
          bh += '<option value="' + esc(k) + '"' + (k === curBatch ? ' selected' : '') + '>' + esc(k) + '</option>';
        });
        batchS.innerHTML = bh;
      }
      if (batchView) {
        var selected = batchView.value;
        var options = '<option value="">导入批次：全部</option>';
        Object.keys(bs).sort(function(a,b) { return a.localeCompare(b, 'zh-CN', {numeric:true}); }).forEach(function(k) {
          if (isAutoBatchLabel(k)) return;
          options += '<option value="' + esc(k) + '"' + (k === selected ? ' selected' : '') + '>' + esc(k) + '</option>';
        });
        batchView.innerHTML = options;
      }
    }

    // 导入批次下拉：切换后仅查看对应批次，选择“全部”恢复完整列表。
    (function wireImportBatchView() {
      var batchView = document.getElementById('dbImportBatchView');
      if (batchView && !batchView._wired) {
        batchView._wired = true;
        batchView.addEventListener('change', function() {
          DB.page = 1;
          dbRenderCached();
        });
      }
    })();

    function dbSort(col){
      if (DB.sortBy === col) {
        DB.sortDir = DB.sortDir === 'asc' ? 'desc' : 'asc';
      } else {
        DB.sortBy = col; DB.sortDir = 'asc';
      }
      DB.page = 1; dbRenderCached();
    }

    function dbWireSortHeaders(){
      var ths = document.querySelectorAll('#dbOverlay .crm-table thead th[data-sort]');
      for (var i = 0; i < ths.length; i++) {
        (function(th){
          var col = th.getAttribute('data-sort');
          if (!col) return;
          th.onclick = function(){ dbSort(col); };
          var arrow = th.querySelector('.sort-arrow');
          if (arrow) {
            if (DB.sortBy === col) {
              arrow.textContent = DB.sortDir === 'asc' ? '' : '';
              th.classList.add('sorted');
            } else {
              arrow.textContent = '';
              th.classList.remove('sorted');
            }
          }
        })(ths[i]);
      }
    }

    // ====== Database Password Gate ======
    var DB_PWD_K = 'db_access_pwd_hash';
    var dbPwdCallback = null;
    var dbPwdSessionAuthed = false; // Once authenticated this session, don't ask again

    function hashPwd(pwd) {
      // Simple salted hash for localStorage (not cryptographically secure, but beats plaintext)
      var salt = 'megz_db_salt_2024';
      var combined = salt + ':' + pwd;
      var hash = 0;
      for (var i = 0; i < combined.length; i++) {
        var char = combined.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0;
      }
      return 'mz_' + Math.abs(hash).toString(36);
    }

    function getDbPassword() {
      return localStorage.getItem(DB_PWD_K) || '';
    }

    function showDbPasswordGate(callback) {
      dbPwdCallback = callback;
      var overlay = document.getElementById('dbPwdOverlay');
      var input = document.getElementById('dbPwdInput');
      var error = document.getElementById('dbPwdError');
      var cancelBtn = document.getElementById('dbPwdCancelBtn');
      var confirmBtn = document.getElementById('dbPwdConfirmBtn');

      // 密码弹窗必须独立挂到 body：避免被 app-shell / iOS Safari 的层叠上下文遮挡。
      if (!overlay || !input || !error || !cancelBtn || !confirmBtn) {
        console.error('[db-auth] password gate DOM is incomplete');
        var notice = document.getElementById('bootFallbackNotice');
        if (notice) {
          notice.style.display = 'block';
          notice.textContent = '数据库密码窗口初始化失败，请刷新页面后重试。';
        }
        return;
      }
      if (overlay.parentNode !== document.body) document.body.appendChild(overlay);

      var savedHash = '';
      try {
        savedHash = getDbPassword();
      } catch (storageError) {
        error.textContent = '浏览器本地存储不可用，请退出无痕模式后重试';
        error.style.display = 'block';
        return;
      }
      var isFirstTime = !savedHash;

      input.value = '';
      input.placeholder = '';
      error.textContent = '';
      error.style.display = 'none';

      // 不依赖延迟动画才能显示；强制覆盖可能存在的旧层级/隐藏样式。
      overlay.style.setProperty('display', 'flex', 'important');
      overlay.style.setProperty('position', 'fixed', 'important');
      overlay.style.setProperty('inset', '0', 'important');
      overlay.style.setProperty('z-index', '2147483647', 'important');
      overlay.style.setProperty('visibility', 'visible', 'important');
      overlay.classList.add('active');

      function focusPasswordInput() {
        try { input.focus({ preventScroll: true }); } catch (_) { input.focus(); }
      }
      setTimeout(focusPasswordInput, 60);

      function doConfirm() {
        var pwd = input.value.trim();
        if (pwd.length !== 6 || !/^[a-zA-Z0-9]+$/.test(pwd)) {
          error.textContent = '请输入 6 位字母或数字密码';
          error.style.display = 'block';
          input.value = '';
          focusPasswordInput();
          return;
        }

        if (isFirstTime) {
          // 首次使用时设置本地数据库密码；存储失败时绝不绕过验证。
          try {
            localStorage.setItem(DB_PWD_K, hashPwd(pwd));
          } catch (storageError) {
            error.textContent = '无法保存密码，请检查浏览器本地存储设置';
            error.style.display = 'block';
            return;
          }
          closeDbPasswordGate();
          dbPwdCallback && dbPwdCallback();
          dbPwdCallback = null;
        } else if (hashPwd(pwd) === savedHash) {
          closeDbPasswordGate();
          dbPwdCallback && dbPwdCallback();
          dbPwdCallback = null;
        } else {
          error.textContent = '密码不正确，请重新输入';
          error.style.display = 'block';
          input.value = '';
          focusPasswordInput();
        }
      }

      confirmBtn.onclick = doConfirm;
      input.onkeydown = function(e) {
        if (e.key === 'Enter') doConfirm();
      };
      cancelBtn.onclick = function() {
        closeDbPasswordGate();
        dbPwdCallback = null;
      };
    }

    function closeDbPasswordGate() {
      var overlay = document.getElementById('dbPwdOverlay');
      if (overlay) {
        overlay.classList.remove('active');
        setTimeout(function() { overlay.style.display = 'none'; }, 250);
      }
    }

    // 批量删除 — 无需密码验证
    function verifyDeletePassword(callback) {
      callback();
    }

    function openDBDashboard(){
      var ov=document.getElementById('dbOverlay'); if(!ov)return;
      if (dbPwdSessionAuthed) {
        _openDBDashboardInner();
        return;
      }
      var savedHash = getDbPassword();
      if (!savedHash) {
        // First time: must set password
        showDbPasswordGate(function() {
          dbPwdSessionAuthed = true;
          _openDBDashboardInner();
        });
        return;
      }
      showDbPasswordGate(function() {
        dbPwdSessionAuthed = true;
        _openDBDashboardInner();
      });
    }

    var _viewAccountId = '';

    function loadAccountStats() {
      // 上传数量已显示在账号管理卡片中；看板这里只保留数据范围切换和异常数据归属操作。
      var controls = document.getElementById('dbAccountViewControls');
      var sel = document.getElementById('dbViewAccountSel');
      var migrateBtn = document.getElementById('dbMigrateBtn');
      if (!canManageTeam()) {
        if (controls) controls.style.display = 'none';
        return;
      }
      if (controls) controls.style.display = 'inline-flex';
      fetch('/api/dialer/stats/accounts', { cache: 'no-store' })
        .then(function(r) { return r.json(); })
        .then(function(res) {
          var stats = res.stats || [];
          if (sel) {
            var current = sel.value || _viewAccountId || '';
            sel.innerHTML = '<option value="">我的数据</option>';
            stats.forEach(function(a) {
              if (!a.is_master) {
                var name = (a.role === 'manager' ? '组长·' : '组员·') + (a.real_name || a.account_name || a.label || String(a.account_id || '').slice(0, 10));
                var option = document.createElement('option');
                option.value = a.account_id;
                option.textContent = name;
                sel.appendChild(option);
              }
            });
            sel.value = current;
            if (sel.value !== current) {
              sel.value = '';
              _viewAccountId = '';
            }
            if (!sel._wired) {
              sel._wired = true;
              sel.addEventListener('change', function() {
                _viewAccountId = this.value;
                DB.page = 1;
                DB.selectedIds = {};
                dbFetch();
              });
            }
          }
          if (migrateBtn) {
            if (isSessionMaster() && Number(res.unknown_count || 0) > 0) {
              migrateBtn.style.display = 'inline-block';
              migrateBtn.textContent = '归属主账户 (' + Number(res.unknown_count) + ')';
              migrateBtn.onclick = function() {
                if (!confirm('将 ' + Number(res.unknown_count) + ' 条无归属客户数据归属到主账户？')) return;
                migrateBtn.disabled = true;
                migrateBtn.textContent = '迁移中...';
                fetch('/api/dialer/stats/migrate', { method: 'POST' })
                  .then(function(r) { return r.json(); })
                  .then(function(result) {
                    if (result.success) {
                      migrateBtn.style.display = 'none';
                      loadAccountStats();
                      dbFetch();
                    } else {
                      alert('迁移失败: ' + (result.error || '未知错误'));
                    }
                  })
                  .catch(function() { alert('网络错误'); })
                  .finally(function() { migrateBtn.disabled = false; });
              };
            } else {
              migrateBtn.style.display = 'none';
            }
          }
        })
        .catch(function() {
          if (sel && !sel.options.length) sel.innerHTML = '<option value="">我的数据</option>';
        });
    }

    // 主账号可分配给所有小组/组员；小组长仅可分配给本组组员
    function populateReassignSel() {
      var reassignSel = document.getElementById('crmReassignSel');
      var reassignGroup = document.getElementById('crmReassignGroup');
      var toggle = document.getElementById('crmReassignToggle');
      if (!reassignSel || !reassignGroup || !toggle) return;
      if (!canManageTeam()) { toggle.style.display = 'none'; reassignGroup.style.display = 'none'; return; }
      var reassignTitle = document.getElementById('crmReassignTitle');
      if (reassignTitle) reassignTitle.textContent = isSessionManager() ? '分配给本组组员' : '分配给所有小组和组员';
      if (!toggle._wired) {
        toggle._wired = true;
        toggle.addEventListener('click', function() {
          var opening = reassignGroup.style.display === 'none' || !reassignGroup.style.display;
          reassignGroup.style.display = opening ? 'flex' : 'none';
          toggle.textContent = opening ? '收起分配' : '分配数据';
        });
        var closeBtn = document.getElementById('crmReassignClose');
        if (closeBtn) closeBtn.addEventListener('click', function() {
          reassignGroup.style.display = 'none';
          toggle.textContent = '分配数据';
        });
        var modeSel = document.getElementById('crmReassignMode');
        if (modeSel) modeSel.addEventListener('change', function() {
          var manual = this.value === 'manual';
          reassignSel.querySelectorAll('.crm-reassign-count').forEach(function(input) {
            input.style.display = manual ? 'inline-block' : 'none';
          });
          var hint = document.getElementById('crmReassignHint');
          if (hint) hint.textContent = manual ? '勾选成员并填写各自数量，系统从当前批次自动扣减' : '勾选接收成员，系统将当前批次剩余客户平均分配';
        });
      }
      toggle.style.display = 'inline-flex';
      fetch('/api/dialer/accounts')
        .then(function(r) { return r.json(); })
        .then(function(res) {
          if (!res || !res.accounts) { toggle.style.display = 'none'; reassignGroup.style.display = 'none'; return; }
          reassignSel.innerHTML = '';
          res.accounts.forEach(function(a) {
            if (!a.active || a.is_master || (isSessionManager() && (a.role !== 'member' || a.parent_account_id && a.parent_account_id !== getSessionAccountId()))) return;
            var name = (a.role === 'manager' ? '小组长：' : '组员：') + (a.real_name || a.account_name || a.label || a.account_id.slice(0, 10));
            var label = document.createElement('label');
            label.style.cssText = 'display:inline-flex;align-items:center;gap:4px;padding:4px 6px;border:1px solid var(--card-border);border-radius:5px;background:var(--card-bg);';
            var cb = document.createElement('input');
            cb.type = 'checkbox'; cb.className = 'crm-reassign-account'; cb.value = a.account_id;
            cb.style.cssText = 'width:14px;height:14px;accent-color:#07c160;margin:0;';
            var txt = document.createElement('span'); txt.textContent = name;
            var qty = document.createElement('input');
            qty.type = 'number'; qty.min = '0'; qty.step = '1'; qty.value = '0';
            qty.className = 'crm-reassign-count'; qty.setAttribute('data-account-id', a.account_id);
            qty.setAttribute('aria-label', name + '分配数量');
            qty.style.cssText = 'display:none;width:58px;height:26px;padding:0 4px;border:1px solid var(--card-border);border-radius:5px;background:var(--bg-app);color:var(--text-main);font-size:0.72rem;';
            label.appendChild(cb); label.appendChild(txt); label.appendChild(qty); reassignSel.appendChild(label);
          });
          var hasTargets = !!reassignSel.querySelector('.crm-reassign-account');
          toggle.style.display = hasTargets ? 'inline-flex' : 'none';
          if (!hasTargets) reassignGroup.style.display = 'none';
          var modeSel = document.getElementById('crmReassignMode');
          if (modeSel && modeSel.value === 'manual') reassignSel.querySelectorAll('.crm-reassign-count').forEach(function(input) { input.style.display = 'inline-block'; });
        })
        .catch(function() { toggle.style.display = 'none'; reassignGroup.style.display = 'none'; });
    }

    function _openDBDashboardInner() {
      var ov=document.getElementById('dbOverlay'); if(!ov)return;
      ov.classList.remove('mobile-layout');
      // 看板打开时再次同步搜索区域主题，覆盖可能存在的组件内联样式
      var darkEnabled = document.body.classList.contains('dark-mode');
      var searchCard = document.querySelector('#dbOverlay .crm-search-card');
      if (searchCard && darkEnabled) {
        var forceDark = function(el, prop, value) { if (el) el.style.setProperty(prop, value, 'important'); };
        forceDark(searchCard, 'background', '#1b212a');
        forceDark(searchCard, 'background-color', '#1b212a');
        searchCard.querySelectorAll('.crm-search-grid, .crm-search-item, .crm-search-item-full, .crm-search-actions').forEach(function(el) {
          forceDark(el, 'background', '#1b212a');
          forceDark(el, 'background-color', '#1b212a');
        });
        searchCard.querySelectorAll('#dbFuzzySearch, .crm-input').forEach(function(el) {
          forceDark(el, 'background', '#252d38');
          forceDark(el, 'background-color', '#252d38');
          forceDark(el, 'color', '#d0d7e1');
          forceDark(el, 'border-color', '#3a4553');
        });
        searchCard.querySelectorAll('.crm-btn-search').forEach(function(el) {
          forceDark(el, 'background', '#35404e');
          forceDark(el, 'background-color', '#35404e');
          forceDark(el, 'color', '#d0d8e2');
        });
      }
      syncManagerTabVisibility();
      ov.classList.add('active'); DB.page=1;
      // Reset view account and load stats for master
      _viewAccountId = '';
      loadAccountStats();
      populateReassignSel(); // 所有账号都渲染分配目标（非主账号也会显示）
      var si=document.getElementById('dbSearch'); if(si)si.value='';
      var cf=document.getElementById('dbCatFilter'); if(cf)cf.value='';
      var bf=document.getElementById('dbBatchFilter'); if(bf)bf.value='';
      renderCRMHeaders();
      
      var nameInp = document.getElementById('dbNameSearch');
      var phoneInp = document.getElementById('dbPhoneSearch');
      var noteInp = document.getElementById('dbNoteSearch');
      var fuzzyInp = document.getElementById('dbFuzzySearch');
      if (nameInp) nameInp.value = '';
      if (phoneInp) phoneInp.value = '';
      if (noteInp) noteInp.value = '';
      if (fuzzyInp) fuzzyInp.value = '';
      
      // 客户数据库页大小默认：新号模式 10条/页，普通模式 50条/页（用户手动调过则记住）
      var psSel = document.getElementById('dbPageSize');
      if (psSel) {
        var savedPs = localStorage.getItem('crm_page_size');
        psSel.value = savedPs || (isNewMode() ? '10' : '50');
      }
      DB.pageSize=parseInt((document.getElementById('dbPageSize')||{}).value||'50',10)||50;
      DB.selectedIds = {}; // Reset selections
      var selectAllCb = document.getElementById('crmSelectAll');
      if (selectAllCb) selectAllCb.checked = false;
      
      dbFetch();
    }
    window.openDBDashboard = openDBDashboard;
    window.parsePhoneContactsFromRawText = parsePhoneContactsFromRawText;
    window.renderAIUnstructuredReport = renderAIUnstructuredReport;
    window.correctOcrTextWithAI = correctOcrTextWithAI;

    // ==================== 手机版数据库看板（独立界面） ====================
    // 手机版独立加载数据（不依赖桌面看板密码流程；session 已由登录/解锁保证）
    var DBM_PAGE_SIZE = 50;
    var DBM_TOTAL = 0;
    function dbmFetch() {
      var listEl = document.getElementById('dbmList');
      if (listEl) listEl.innerHTML = '<div class="dbm-empty">加载中...</div>';
      var mobileViewAccountId = _viewAccountId || getOrCreateAccountId();
      var categoryFilter = (document.getElementById('dbmCatFilter') || {}).value || '';
      var searchValue = (document.getElementById('dbmSearchInput') || {}).value || '';
      var batchValue = (document.getElementById('dbmBatchFilter') || {}).value || '';
      var url = '/api/dialer/customers?page=' + (DBM_PAGE || 1) + '&pageSize=' + DBM_PAGE_SIZE + '&account_id=' + encodeURIComponent(mobileViewAccountId);
      if (categoryFilter) url += '&category=' + encodeURIComponent(categoryFilter);
      if (searchValue) url += '&search=' + encodeURIComponent(searchValue);
      if (batchValue) url += '&batch_label=' + encodeURIComponent(batchValue);
      fetch(url).then(function(r) { return r.json(); })
        .then(function(res) {
          if (res.error) {
            if (listEl) listEl.innerHTML = '<div class="dbm-empty">加载失败: ' + esc(res.error) + '</div>';
            return;
          }
          DB.allData = res.data || [];
          DBM_TOTAL = Number.isFinite(Number(res.total)) ? Number(res.total) : DB.allData.length;
          dbmPopulateFilters();
          dbmRender();
          dbmUpdatePager();
        })
        .catch(function(err) {
          if (listEl) listEl.innerHTML = '<div class="dbm-empty">加载失败: ' + esc(err.message) + '</div>';
        });
    }
    var DBM_PAGE = 1;
    var DBM_SEARCH_TIMER = null;
    function dbmUpdatePager() {
      var totalPages = Math.max(1, Math.ceil(DBM_TOTAL / DBM_PAGE_SIZE));
      var input = document.getElementById('dbmPageInput');
      var total = document.getElementById('dbmPageTotal');
      var prev = document.getElementById('dbmPrev');
      var next = document.getElementById('dbmNext');
      if (input) { input.value = DBM_PAGE; input.max = totalPages; }
      if (total) total.textContent = totalPages;
      if (prev) prev.disabled = DBM_PAGE <= 1;
      if (next) next.disabled = DBM_PAGE >= totalPages;
    }
    window.dbmChangePage = function(delta) {
      var totalPages = Math.max(1, Math.ceil(DBM_TOTAL / DBM_PAGE_SIZE));
      DBM_PAGE = Math.max(1, Math.min(totalPages, DBM_PAGE + delta));
      dbmFetch();
      var list = document.getElementById('dbmList');
      if (list) list.scrollTop = 0;
    };

    // 手机版全屏期间锁定底层页面：iOS Safari/WKWebView 仅靠 fixed 遮罩
    // 仍可能把触摸滚动传递给背景页面；记录原始样式和滚动位置，关闭时精确恢复。
    var _dbmBodyLockState = null;
    function lockDBMobileBackground() {
      if (_dbmBodyLockState || !document.body || !document.documentElement) return;
      var body = document.body;
      var root = document.documentElement;
      var scrollY = window.pageYOffset || root.scrollTop || body.scrollTop || 0;
      _dbmBodyLockState = {
        scrollY: scrollY,
        position: body.style.position,
        top: body.style.top,
        left: body.style.left,
        right: body.style.right,
        width: body.style.width,
        overflow: body.style.overflow,
        bodyOverscroll: body.style.overscrollBehavior,
        rootOverflow: root.style.overflow,
        rootOverscroll: root.style.overscrollBehavior
      };
      // iOS Safari/WKWebView needs both a fixed body and a locked scrolling root.
      // Keep the current viewport position while the independent full-screen list scrolls.
      root.style.overflow = 'hidden';
      root.style.overscrollBehavior = 'none';
      body.style.position = 'fixed';
      body.style.top = '-' + scrollY + 'px';
      body.style.left = '0';
      body.style.right = '0';
      body.style.width = '100%';
      body.style.overflow = 'hidden';
      body.style.overscrollBehavior = 'none';
    }
    function unlockDBMobileBackground() {
      var state = _dbmBodyLockState;
      if (!state || !document.body || !document.documentElement) return;
      var body = document.body;
      var root = document.documentElement;
      // Clear the lock before scheduling scroll restoration so repeated close events are safe.
      _dbmBodyLockState = null;
      body.style.position = state.position;
      body.style.top = state.top;
      body.style.left = state.left;
      body.style.right = state.right;
      body.style.width = state.width;
      body.style.overflow = state.overflow;
      body.style.overscrollBehavior = state.bodyOverscroll;
      root.style.overflow = state.rootOverflow;
      root.style.overscrollBehavior = state.rootOverscroll;
      // Restore after layout has returned to document flow; immediate scrollTo can be ignored
      // by iOS when the fixed-body lock is removed in the same frame.
      var restoreScroll = function() {
        window.scrollTo(0, state.scrollY);
        root.scrollTop = state.scrollY;
        body.scrollTop = state.scrollY;
      };
      if (typeof window.requestAnimationFrame === 'function') {
        window.requestAnimationFrame(restoreScroll);
      } else {
        setTimeout(restoreScroll, 0);
      }
    }

    // 手机版入口：直接切换完整数据库看板的移动布局，复用全部 DOM、权限、筛选、排序和事件。
    function openDBMobile() {
      var ov = document.getElementById('dbOverlay');
      if (!ov) return;
      syncManagerTabVisibility();
      ov.classList.add('mobile-layout');
      ov.classList.add('active');
      // 旧版独立精简界面不再作为主入口，避免功能缺失与两套数据状态不一致。
      var legacyMobile = document.getElementById('dbMobileOverlay');
      if (legacyMobile) legacyMobile.classList.remove('active');
      // 进入时维持当前筛选/分页/勾选状态；只有尚未加载数据时才请求。
      if (!DB.allData || !DB.allData.length) dbFetch();
    }
    window.openDBMobile = openDBMobile;

    function closeDBMobile() {
      var ov = document.getElementById('dbOverlay');
      if (ov) {
        ov.classList.remove('mobile-layout');
        ov.classList.remove('active');
      }
      var legacyMobile = document.getElementById('dbMobileOverlay');
      if (legacyMobile) legacyMobile.classList.remove('active');
      unlockDBMobileBackground();
      if (window.location.hash === '#dbm' && window.history && window.history.replaceState) {
        window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search);
      }
    }
    window.closeDBMobile = closeDBMobile;

    // 手机版渲染（本地过滤+排序，复用桌面 crmFilterData 逻辑）
    function dbmFilterData() {
      var q = (document.getElementById('dbmSearchInput') || {}).value || '';
      var cat = (document.getElementById('dbmCatFilter') || {}).value || '';
      var batch = (document.getElementById('dbmBatchFilter') || {}).value || '';
      var filtered = DB.allData || [];
      if (q) {
        var ql = q.toLowerCase();
        filtered = filtered.filter(function(c) {
          return (c.name || '').toLowerCase().indexOf(ql) >= 0 ||
            (c.mobile || '').indexOf(q) >= 0 ||
            (c.company_name || '').toLowerCase().indexOf(ql) >= 0 ||
            (c.note || '').toLowerCase().indexOf(ql) >= 0;
        });
      }
      if (cat && cat !== '公海客户') filtered = filtered.filter(function(c) { return (c.category || '') === cat; });
      if (batch) filtered = filtered.filter(function(c) { return (c.batch_label || '') === batch; });
      filtered = crmFilterData(filtered);
      var countEl = document.getElementById('dbmCount');
      if (countEl) countEl.textContent = '（共 ' + DBM_TOTAL + ' 条）';
      return filtered;
    }

    // 手机端筛选/分页变更后重新请求服务端当前页，公海客户由服务端按主账户归属过滤。
    (function wireDBMobilePaging() {
      var prev = document.getElementById('dbmPrev');
      var next = document.getElementById('dbmNext');
      var pageInput = document.getElementById('dbmPageInput');
      var refresh = document.getElementById('dbmRefreshBtn');
      if (prev) prev.addEventListener('click', function() { window.dbmChangePage(-1); });
      if (next) next.addEventListener('click', function() { window.dbmChangePage(1); });
      if (pageInput) pageInput.addEventListener('change', function() {
        var max = Math.max(1, Math.ceil(DBM_TOTAL / DBM_PAGE_SIZE));
        DBM_PAGE = Math.max(1, Math.min(max, parseInt(pageInput.value, 10) || 1));
        dbmFetch();
      });
      if (refresh) refresh.addEventListener('click', function() { DBM_PAGE = 1; dbmFetch(); });
    })();

    // 填充分类/批次下拉
    function dbmPopulateFilters() {
      var data = DB.allData || [];
      var catSel = document.getElementById('dbmCatFilter');
      var batchSel = document.getElementById('dbmBatchFilter');
      if (catSel) {
        var cats = {};
        data.forEach(function(c) { var k = c.category || '未分类'; cats[k] = true; });
        var cur = catSel.value;
        var opts = '<option value="">全部分类</option>';
        Object.keys(cats).forEach(function(k) { opts += '<option value="' + esc(k) + '"' + (cur === k ? ' selected' : '') + '>' + esc(k) + '</option>'; });
        if (!cats['公海客户']) opts += '<option value="公海客户"' + (cur === '公海客户' ? ' selected' : '') + '>公海客户</option>';
        catSel.innerHTML = opts;
      }
      if (batchSel) {
        var batches = {};
        data.forEach(function(c) { if (c.batch_label) batches[c.batch_label] = true; });
        var cur2 = batchSel.value;
        var opts2 = '<option value="">全部批次</option>';
        Object.keys(batches).forEach(function(k) { opts2 += '<option value="' + esc(k) + '"' + (cur2 === k ? ' selected' : '') + '>' + esc(k) + '</option>'; });
        batchSel.innerHTML = opts2;
      }
    }

    // 渲染手机版列表：统一宽屏表格（与桌面 dbTable 结构一致，窄屏由容器横向滚动）
    function dbmRender() {
      var list = document.getElementById('dbmList');
      if (!list) return;
      var filtered = dbmFilterData();
      // 服务端已按 50 条/页返回，当前页完整显示，不再截断到前 10/50 条。
      if (!filtered || filtered.length === 0) {
        list.innerHTML = '<div class="dbm-empty">暂无客户数据</div>';
        return;
      }
      var customCols = DB.customColumns || [];
      // 表头与桌面表格列一致（全选在过滤栏 #dbmSelectAll，表内不重复）
      var headHtml = '<tr>' +
        '<th style="width: 40px; text-align: center; cursor: default;"></th>' +
        '<th style="width: 140px; cursor: default;">客户名称</th>' +
        '<th style="width: 160px; cursor: default;">联系号码</th>' +
        '<th style="min-width: 120px; cursor: default;">备注</th>';
      customCols.forEach(function(col) {
        headHtml += '<th style="min-width: 100px; cursor: default;">' + esc(col) + '</th>';
      });
      headHtml += '<th style="min-width: 200px; cursor: default;">单位</th>' +
         '<th style="min-width: 160px; cursor: default;">在库机构</th>' +
         '<th style="width: 100px; cursor: default;">分类</th>' +
         '<th style="min-width:145px;cursor:default;">操作时间</th>' +
         '<th style="width:85px;cursor:default;">操作方式</th>' +
         '<th style="min-width:110px;cursor:default;">前操作员</th>' +
         '<th style="width: 100px; cursor: default;">操作</th>' +
        '</tr>';

      var h = '<table class="crm-table"><thead>' + headHtml + '</thead><tbody>';
      var avatarColors = ['#ff5722', '#4a6cf7', '#07c160', '#ff9800', '#9c27b0', '#00bcd4', '#3f51b5', '#e91e63'];
      filtered.forEach(function(c) {
        var cat = c.category || '';
        var isChecked = DB.selectedIds[c.mobile] ? ' checked' : '';
        var isTrSelected = DB.selectedIds[c.mobile] ? ' class="selected"' : '';
        var isNew = c.created_at && (Date.now() - new Date(c.created_at).getTime() < 24 * 60 * 60 * 1000);
        var badgeHtml = isNew ? '<span class="crm-badge-new">新</span>' : '<span class="crm-badge-old">旧</span>';
        var firstChar = (c.name || '').trim().charAt(0) || '匿';
        var colorIdx = Math.abs(firstChar.charCodeAt(0)) % avatarColors.length;
        var avatarHtml = '<span class="crm-avatar" style="background:' + avatarColors[colorIdx] + ';">' + esc(firstChar) + '</span>';
        var parsed = parseCustomerNote(c);
        var realNote = parsed.note;
        var callBtn = '<button class="crm-btn-call" title="点击呼叫 / 复制" onclick="copyTextToClipboard(\\'' + esc(c.mobile) + '\\');showCopyLimitToast(\\'已复制: ' + esc(c.mobile) + '\\');recordTimeline(\\'' + esc(c.mobile) + '\\',\\'copy_phone\\');"></button>';
        var noteDisplay = '';
        var whitelistProductHtml = c.whitelist_name ? '<span style="display:inline-flex;align-items:center;margin-bottom:3px;padding:2px 6px;border-radius:4px;background:rgba(7,193,96,0.10);color:#079447;font-size:11px;font-weight:700;">白名单产品：' + esc(c.whitelist_name) + '</span>' : '';
        if (c.fund || whitelistProductHtml) {
          noteDisplay = '<div style="display:flex; flex-direction:column; gap:4px; align-items:flex-start;">' +
            (c.fund ? '<span class="crm-fund-tag" style="background:rgba(255,152,0,0.12); color:#e65100; font-weight:900; font-size:11px; padding:2px 6px; border-radius:4px; display:inline-flex; align-items:center; border:none; box-shadow:var(--shadow-card);">公积金: ' + esc(c.fund) + '</span>' : '') +
            whitelistProductHtml +
            (realNote ? '<span style="color:var(--text-soft); font-weight:normal;">' + esc(realNote) + '</span>' : '') +
            '</div>';
        } else {
          noteDisplay = realNote ? esc(realNote) : '-';
        }
        var customTds = '';
        customCols.forEach(function(col) {
          var val = parsed.custom[col] || '-';
          customTds += '<td style="white-space: normal; min-width: 100px; word-break: break-all;">' + esc(val) + '</td>';
        });
        h += '<tr' + isTrSelected + ' data-mobile="' + esc(c.mobile || '') + '">' +
          '<td style="text-align: center; cursor: default;"><input type="checkbox" class="crm-row-select" data-mobile="' + esc(c.mobile) + '" data-name="' + esc(c.name || '') + '"' + isChecked + '></td>' +
          '<td>' +
            '<div class="crm-name-cell">' +
              avatarHtml +
              '<div>' +
                '<div style="font-weight: 700; display: flex; align-items: center;">' + badgeHtml + esc(c.name || '-') + '</div>' +
                '<span class="cust-cat-tag set cat-' + esc(cat) + '" data-m="' + esc(c.mobile) + '" data-c="' + esc(cat) + '" style="margin-top: 3px; font-size:10px; padding: 0 6px;">' + esc(cat || '未分类') + '</span>' +
              '</div>' +
            '</div>' +
          '</td>' +
          '<td>' +
            '<div class="crm-phone-cell">' +
              esc(c.mobile || '-') +
              callBtn +
            '</div>' +
          '</td>' +
          '<td style="white-space: normal; max-width: 300px; word-break: break-all;">' + noteDisplay + '</td>' +
          customTds +
          '<td style="white-space: normal;">' + esc(c.company_name || '-') + '</td>' +
          '<td style="white-space: normal; min-width:160px;"><a href="javascript:void(0)" class="crm-storage-edit" data-mobile="' + esc(c.mobile || '') + '" data-value="' + esc(c.storage_institution || '') + '" title="点击编辑在库机构">' + esc(c.storage_institution || '＋设置') + '</a></td>' +
          '<td style="white-space: nowrap;">' + esc(cat || '未分类') + '</td>' +
          (function(){ var opCells = getCustomerOperationCells(c); return '<td style="white-space:nowrap;">' + esc(opCells.time) + '</td><td style="white-space:nowrap;">' + esc(opCells.method) + '</td><td style="white-space:nowrap;">' + esc(opCells.account) + '</td>'; })() +
          '<td style="cursor: default;">' +
            '<a class="crm-action-link crm-btn-followup" data-mobile="' + esc(c.mobile) + '" data-note="' + esc(realNote || '') + '">新增跟进</a>' +
          '</td>' +
        '</tr>';
      });
      h += '</tbody></table>';
      list.innerHTML = h;

      // 绑定在库机构编辑
      list.querySelectorAll('.crm-storage-edit').forEach(function(el) { el.onclick = function(e) { e.preventDefault(); e.stopPropagation(); editStorageInstitution(el.getAttribute('data-mobile'), el.getAttribute('data-value')); }; });
      // 绑定勾选
      list.querySelectorAll('.crm-row-select').forEach(function(cb) {
        cb.onchange = function() {
          var m = cb.getAttribute('data-mobile');
          var tr = cb.closest('tr');
          if (cb.checked) {
            DB.selectedIds[m] = true;
            if (tr) tr.classList.add('selected');
          } else {
            delete DB.selectedIds[m];
            if (tr) tr.classList.remove('selected');
          }
          dbmUpdateActionBar();
        };
      });
      // 行点击选中
      list.querySelectorAll('#dbmList tbody tr').forEach(function(tr) {
        tr.onclick = function(e) {
          if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('.crm-btn-call')) return;
          var cb = tr.querySelector('.crm-row-select');
          if (cb) { cb.checked = !cb.checked; cb.onchange(); }
        };
      });
      // 跟进
      list.querySelectorAll('.crm-btn-followup').forEach(function(btn) {
        btn.onclick = function(e) {
          e.stopPropagation();
          var mobile = btn.getAttribute('data-mobile');
          var oldNote = btn.getAttribute('data-note') || '';
          var newNote = prompt('请输入新增的跟进备注记录：', oldNote);
          if (newNote === null) return;
          newNote = newNote.trim();
          if (newNote === oldNote) return;
          btn.textContent = '...';
          var clientObj = (DB.allData || []).find(function(c) { return c.mobile === mobile; });
          var rawNoteStr = clientObj ? (clientObj.note || '') : '';
          var parsed = { note: oldNote, custom: {}, fund: '' };
          if (rawNoteStr.trim().indexOf('{') === 0) {
            try {
              var jsonPart = rawNoteStr.slice(0, rawNoteStr.indexOf('}') + 1);
              var obj = JSON.parse(jsonPart);
              if (obj && typeof obj === 'object') { parsed.custom = obj.custom || {}; parsed.fund = obj.fund || ''; }
            } catch (err) {}
          }
          var notePayload = newNote;
          if (Object.keys(parsed.custom).length > 0 || parsed.fund) {
            var pl = { note: newNote, custom: parsed.custom };
            if (parsed.fund) pl.fund = parsed.fund;
            notePayload = JSON.stringify(pl);
          }
          fetch('/api/dialer/customers', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getSessionToken() },
            body: JSON.stringify({ mobile: mobile, note: notePayload })
          }).then(function(r) { return r.json(); })
            .then(function(res) {
              if (res && res.success !== false) {
                var c = (DB.allData || []).find(function(x) { return x.mobile === mobile; });
                if (c) c.note = notePayload;
                dbmRender();
              } else {
                alert((res && res.error) || '保存失败');
                dbmRender();
              }
            })
            .catch(function() { alert('网络错误'); dbmRender(); });
        };
      });
      dbmUpdateActionBar();
    }

    // 底部操作栏状态：有勾选才可用；显示选中数量
    function dbmUpdateActionBar() {
      var selCount = Object.keys(DB.selectedIds).length;
      var hasSel = selCount > 0;
      var btns = document.querySelectorAll('#dbmActionBar .dbm-action-btn');
      btns.forEach(function(b) { b.disabled = !hasSel; });
      var countEl = document.getElementById('dbmSelectedCount');
      if (countEl) countEl.textContent = selCount;
      var barCount = document.getElementById('dbmActionBarCount');
      if (barCount) barCount.textContent = '已选 ' + selCount;
      var selAll = document.getElementById('dbmSelectAll');
      if (selAll) {
        var cbs = document.querySelectorAll('#dbmList .crm-row-select');
        var allChecked = cbs.length > 0 && Array.prototype.every.call(cbs, function(cb) { return cb.checked; });
        selAll.checked = allChecked;
      }
    }

    // 批量操作：复用桌面版按钮的 onclick（同一套 DB.selectedIds 逻辑）
    // 桌面逻辑结束会 dbFetch() 刷新桌面表格，这里延迟同步刷新手机版列表
    function dbmTriggerAction(desktopBtnId) {
      if (desktopBtnId === 'crmBatchDeleteBtn' && !isSessionMaster()) return;
      var desktopBtn = document.getElementById(desktopBtnId);
      if (desktopBtn && desktopBtn.onclick) {
        desktopBtn.onclick();
        setTimeout(function() {
          dbmRender();
          dbmUpdateActionBar();
          dbmPopulateFilters();
        }, 600);
      }
    }

    // ==================== 手机版管理面板（复用桌面面板 DOM） ====================
    // 面板 ID 映射：手机 tab → 桌面面板元素 + 数据加载函数
    var DBM_PANELS = [
      { tab: 'account', panelId: 'dbAccountMgrPanel', load: function() { loadSubAccounts(); loadAccountStats(); loadDeviceSessions(); } },
      { tab: 'backup', panelId: 'dbBackupMgrPanel', load: function() { loadBackupConfig(); } },
      { tab: 'content', panelId: 'dbContentConfigPanel', load: function() { loadContentConfig(); } },
      { tab: 'upload', panelId: 'dbUploadLogPanel', load: function() { loadUploadLog('day'); } },
      { tab: 'masterPull', panelId: 'dbMasterPullLogPanel', load: function() { loadMasterPullLog('day'); } }
    ];
    var _dbmActiveTab = 'account';

    // 进入管理页：把当前 tab 的桌面面板移入手机容器（移动 DOM 不影响已绑定事件）
    function dbmOpenMgr() {
      var mgr = document.getElementById('dbmMgr');
      syncManagerTabVisibility();
      var body = document.getElementById('dbmMgrBody');
      if (!mgr || !body) return;
      mgr.style.display = 'flex';
      dbmShowMgrTab(_dbmActiveTab);
    }

    function dbmShowMgrTab(tabName) {
      _dbmActiveTab = tabName;
      var body = document.getElementById('dbmMgrBody');
      if (!body) return;
      var tabs = document.querySelectorAll('.dbm-mgr-tab');
      tabs.forEach(function(t) { t.classList.toggle('active', t.getAttribute('data-mgrtab') === tabName); });
      var entry = null;
      for (var i = 0; i < DBM_PANELS.length; i++) {
        if (DBM_PANELS[i].tab === tabName) { entry = DBM_PANELS[i]; break; }
      }
      if (!entry) return;
      var panel = document.getElementById(entry.panelId);
      if (!panel) return;
      // 切换管理面板前，按占位符恢复旧面板的原始 DOM 位置。
      var oldWrap = document.getElementById('dbmPanelWrap');
      if (oldWrap) {
        var oldPanel = oldWrap.firstElementChild || oldWrap.firstChild;
        if (oldPanel && oldPanel.nodeType === 1) dbmRestorePanelPosition(oldPanel);
        oldWrap.remove();
      }
      // 目标面板如果已在手机容器里则直接使用，否则从桌面移入
      var wrap = document.getElementById('dbmPanelWrap');
      if (!wrap) {
        wrap = document.createElement('div');
        wrap.id = 'dbmPanelWrap';
        wrap.className = 'dbm-mgr-inner';
        body.appendChild(wrap);
      }
      if (panel.parentNode !== wrap) {
        // 在原位置留下占位符，退出手机版后精确恢复，不猜测分页栏位置。
        if (!_dbmPanelOrig[entry.panelId]) {
          var placeholder = document.createComment('dbm-origin-' + entry.panelId);
          panel.parentNode.insertBefore(placeholder, panel);
          _dbmPanelOrig[entry.panelId] = { placeholder: placeholder, display: panel.style.display };
        }
        panel.parentNode.removeChild(panel);
        wrap.appendChild(panel);
      }
      // 面板初始内联样式为 display:none，移入手机容器后必须显式显示，否则管理页空白
      panel.style.display = 'flex';
      // 触发数据加载
      if (entry.load) entry.load();
      // 主账户才显示子账户管理
      var subs = document.getElementById('dbAccountMgrSubs');
      if (subs) subs.style.display = canManageTeam() ? 'block' : 'none';
    }

    // 手机版管理面板使用占位符记录桌面原位置，关闭/切换时必须精确复原。
    var _dbmPanelOrig = {}; // panelId -> 原始位置的注释节点
    function dbmRestorePanelPosition(panel) {
      if (!panel) return;
      var panelId = panel.id || '';
      var origin = _dbmPanelOrig[panelId];
      var placeholder = origin && origin.placeholder;
      if (placeholder && placeholder.parentNode) {
        placeholder.parentNode.replaceChild(panel, placeholder);
        panel.style.display = origin.display;
        delete _dbmPanelOrig[panelId];
        return;
      }
      // 兼容占位符丢失的旧状态：恢复原显示状态后回退到桌面面板容器。
      if (origin) {
        panel.style.display = origin.display;
        delete _dbmPanelOrig[panelId];
      }
      var ov = document.getElementById('dbOverlay');
      var dbPanel = ov && ov.querySelector('.db-panel');
      if (dbPanel) dbPanel.appendChild(panel);
    }
    function dbmCloseMgr() {
      var mgr = document.getElementById('dbmMgr');
      var wrap = document.getElementById('dbmPanelWrap');
      if (wrap) {
        var panel = wrap.firstElementChild || wrap.firstChild;
        if (panel && panel.nodeType === 1) dbmRestorePanelPosition(panel);
        wrap.remove();
      }
      if (mgr) mgr.style.display = 'none';
    }

    // 手机版事件绑定
    function initDBMobile() {
      var backBtn = document.getElementById('dbmBackBtn');
      if (backBtn) backBtn.onclick = closeDBMobile;
      var refreshBtn = document.getElementById('dbmRefreshBtn');
      if (refreshBtn) refreshBtn.onclick = function() { dbmFetch(); };
      // 底部导航：客户列表 / 管理
      var navListBtn = document.getElementById('dbmNavListBtn');
      var navMgrBtn = document.getElementById('dbmNavMgrBtn');
      var mgrEl = document.getElementById('dbmMgr');
      function dbmShowListView() {
        if (navListBtn) navListBtn.classList.add('active');
        if (navMgrBtn) navMgrBtn.classList.remove('active');
        if (mgrEl) mgrEl.style.display = 'none';
        var sb = document.querySelector('.dbm-searchbar'); if (sb) sb.style.display = '';
        var fb = document.getElementById('dbmFilterBar'); if (fb) fb.style.display = '';
        var ab = document.getElementById('dbmActionBar'); if (ab) ab.style.display = '';
        var listEl2 = document.getElementById('dbmList'); if (listEl2) listEl2.style.display = '';
        dbmCloseMgr();
        dbmRender();
      }
      function dbmShowMgrView() {
        if (navListBtn) navListBtn.classList.remove('active');
        if (navMgrBtn) navMgrBtn.classList.add('active');
        var sb = document.querySelector('.dbm-searchbar'); if (sb) sb.style.display = 'none';
        var fb = document.getElementById('dbmFilterBar'); if (fb) fb.style.display = 'none';
        var ab = document.getElementById('dbmActionBar'); if (ab) ab.style.display = 'none';
        var listEl = document.getElementById('dbmList'); if (listEl) listEl.style.display = 'none';
        dbmOpenMgr();
      }
      if (navListBtn) navListBtn.onclick = dbmShowListView;
      if (navMgrBtn) navMgrBtn.onclick = dbmShowMgrView;
      // 管理 tab 切换
      var mgrTabs = document.querySelectorAll('.dbm-mgr-tab');
      mgrTabs.forEach(function(t) {
        t.onclick = function() { dbmShowMgrTab(t.getAttribute('data-mgrtab')); };
      });
      var searchInput = document.getElementById('dbmSearchInput');
      if (searchInput) searchInput.oninput = function() {
        var clearBtn = document.getElementById('dbmSearchClearBtn');
        if (clearBtn) clearBtn.style.display = this.value ? 'block' : 'none';
        DBM_PAGE = 1;
        clearTimeout(DBM_SEARCH_TIMER);
        DBM_SEARCH_TIMER = setTimeout(dbmFetch, 250);
      };
      var clearBtn = document.getElementById('dbmSearchClearBtn');
      if (clearBtn) clearBtn.onclick = function() {
        var si = document.getElementById('dbmSearchInput');
        if (si) { si.value = ''; this.style.display = 'none'; DBM_PAGE = 1; dbmFetch(); }
      };
      var catSel = document.getElementById('dbmCatFilter');
      if (catSel) catSel.onchange = function() { DBM_PAGE = 1; dbmFetch(); };
      var batchSel = document.getElementById('dbmBatchFilter');
      if (batchSel) batchSel.onchange = function() { DBM_PAGE = 1; dbmFetch(); };
      var selAll = document.getElementById('dbmSelectAll');
      if (selAll) {
        selAll.onchange = function() {
          var checked = selAll.checked;
          document.querySelectorAll('#dbmList .crm-row-select').forEach(function(cb) {
            cb.checked = checked;
            var m = cb.getAttribute('data-mobile');
            var tr = cb.closest('tr');
            if (checked) {
              DB.selectedIds[m] = true;
              if (tr) tr.classList.add('selected');
            } else {
              delete DB.selectedIds[m];
              if (tr) tr.classList.remove('selected');
            }
          });
          dbmUpdateActionBar();
        };
      }
      // 底部操作按钮：触发桌面版同 ID 按钮逻辑
      var actions = [
        ['dbmAddToDialBtn', 'crmAddToDialBtn'],
        ['dbmMovePublicBtn', 'crmMovePublicBtn'],
        ['dbmBatchDeleteBtn', 'crmBatchDeleteBtn']
      ];
      actions.forEach(function(pair) {
        var mb = document.getElementById(pair[0]);
        if (mb) mb.onclick = function() { dbmTriggerAction(pair[1]); };
      });
      // hash 支持 #dbm：直接进入手机版（数据独立加载，不需桌面密码流程）
      window.addEventListener('hashchange', function() {
        if (window.location.hash === '#dbm') {
          openDBMobile();
        } else {
          var mobileOverlay = document.getElementById('dbMobileOverlay');
          if (mobileOverlay && mobileOverlay.classList.contains('active')) closeDBMobile();
        }
      });
      if (window.location.hash === '#dbm') {
        setTimeout(openDBMobile, 100);
      }
    }

    // 字段识别检查：修正公积金/单位/备注的错位（与 AI 修正规则一致，纯本地确定性检查）
    function sanitizeClientFields(c) {
      var changes = 0;
      var company = c.company || '';
      var fund = c.fund || '';
      var note = c.note || '';
      var INST_RE = /[一-龥]*(?:幼儿园|小学|中学|学校|学院|大学|医院|银行|有限公司|集团|公司|企业|工厂|保险|证券|基金|海关|政府|研究院|实验室|局|院|所|部|中心|厂|处|会|队|站)[一-龥（）()]*/;
      var NUM_RE = /^\\d{4,5}$/;
      var YEAR_RE = /^(19|20)\\d{2}$/;
      // 规则1: company 存了纯数字公积金 → 移到 fund
      if (!fund && NUM_RE.test(company) && !YEAR_RE.test(company)) {
        fund = company; company = ''; changes++;
      }
      // 规则2: fund 存了中文机构名 → 移到 company
      else if (!company && fund && /[一-龥]/.test(fund) && INST_RE.test(fund)) {
        company = fund; fund = ''; changes++;
      }
      // 规则3: fund 与 company 存反(company 纯数字 + fund 中文) → 互换
      else if (NUM_RE.test(company) && !YEAR_RE.test(company) && /[一-龥]/.test(fund)) {
        var tmp = fund; fund = company; company = tmp; changes++;
      }
      // 规则4: note 里误存机构名 → 移到 company(company 为空时)
      if (!company && note) {
        var instMatch = note.match(INST_RE);
        if (instMatch) {
          company = instMatch[0];
          note = note.replace(instMatch[0], '').replace(/^[\\s;；,，|]+/, '').trim();
          changes++;
        }
      }
      // 规则5: note 里含 4-5 位金额数字(非年份，支持"5000.56"小数) → 提取到 fund
      if (!fund && note) {
        // 前后数字边界防截断：6位以上数字不截前5位，保持原样
        var numMatch = note.match(/(?<!\\d)\\d{4,5}(?:\\.\\d{1,2})?(?!\\d)/);
        if (numMatch && !YEAR_RE.test(numMatch[0])) {
          fund = numMatch[0];
          note = note.replace(numMatch[0], '').replace(/^[\\s;；,，|]+/, '').trim();
          changes++;
        }
      }
      c.company = company; c.fund = fund; c.note = note;
      return changes;
    }

    // 换一批：按 created_at.desc 依次拉取（与数据库看板首页同序），Supabase 分页游标自动推进实现沉底
    window.refreshBatch = function() {
      var btn = document.getElementById('refreshBatchBtn');
      if (!btn || btn.classList.contains('loading')) return;
      // 不看拨打状态或批次锁：列表中只要还有任何客户，就绝对禁止换批，但点击时明确提示。
      if (Array.isArray(importedClients) && importedClients.length > 0) {
        syncRefreshBatchButton();
        alert('当前拨号列表还有 ' + importedClients.length + ' 位客户，请添加完客户并清空列表后再换一批。');
        return;
      }
      // 冷却期（转出公海后 45-60 分钟随机）未走完：第一次点换一批弹防频繁提醒，
      // 点「知道了」仅关闭弹窗、本次不拉列表；需再点一次换一批才真正拉取（防频繁）
      var _cdInfo = getRoundInfo();
      var _cdRemainMs = (_cdInfo && _cdInfo.transferTs) ? Math.max(0, _cdInfo.transferTs + getRoundCooldownMs(_cdInfo) - Date.now()) : 0;
      if (_cdRemainMs > 0 && !window._cooldownConfirmed) {
        var shown = showCooldownReminder(_cdRemainMs, function() {
          window._cooldownConfirmed = true; // 仅标记确认，不自动拉取——用户需再点一次换一批
        });
        if (!shown) { // 弹窗元素缺失等异常情况：仅提醒不拦截，直接放行本次换批
          window._cooldownConfirmed = true;
          doRefreshBatch();
        }
        return;
      }

      doRefreshBatch();
    };

    // 实际换批拉取：入口守卫通过后执行；加载中图标旋转+变淡，给用户明确反馈
    function doRefreshBatch() {
      var btn = document.getElementById('refreshBatchBtn');
      if (!btn || btn.disabled) return;
      btn.disabled = true;
      btn.classList.add('loading');
      function finishPull() { btn.classList.remove('loading'); syncRefreshBatchButton(); }

      var retryCount = 0;
      var maxRetries = 5;

      function doPull() {
        try {

      	      // Collect current phone numbers to exclude from server pull (prevents duplicate across devices)
      	      var excludeMobiles = [];
      	      if (importedClients && importedClients.length > 0) {
      	        for (var ei = 0; ei < importedClients.length; ei++) {
      	          var m = (importedClients[ei].mobile || '').trim();
      	          if (m) excludeMobiles.push(m);
      	        }
      	      }

              // AbortController with 60s timeout prevents fetch from hanging forever
              var controller = new AbortController();
              var timeoutId = setTimeout(function() { controller.abort(); }, 60000);

      	      fetch('/api/dialer/customers/random', {
      	        method: 'POST',
      	        headers: { 'Content-Type': 'application/json' },
      	        body: JSON.stringify({ limit: 50, exclude: excludeMobiles, account_id: getOrCreateAccountId() }),
                signal: controller.signal
            })
              .then(function(r) { clearTimeout(timeoutId); return r.json(); })
              .then(function(res) {
            // Handle server-side lock (another request in-flight for same account)
            if (res.locked && retryCount < maxRetries) {
              retryCount++;
              setTimeout(doPull, 1500);
              return;
            }

            if (res.locked) {
              finishPull();
              alert('服务器繁忙，请稍后再试');
              return;
            }

                finishPull();

                if (res.error) { alert('加载失败: ' + res.error); return; }

                var customers = res.data || [];
                if (customers.length === 0) {
                  if (res.master_daily_remaining === 0) {
                    alert('今天加载满了，明天再来。');
                  } else if (res.total > 0) {
                    alert('当前范围内客户都已在待拨列表中。\\n请清空当前列表或等待其他设备释放后重试。');
                  } else {
                    alert('数据库中没有可加载的客户记录！\\n请先在 CRM 中导入客户数据。');
                  }
                  return;
                }

                importedClients = customers.map(function(c) {
                  var noteObj = {};
                  var noteRaw = (c.note || '').trim();
                  if (noteRaw.indexOf('{') === 0) {
                    try { noteObj = JSON.parse(noteRaw); } catch(e) { noteObj = { note: noteRaw }; }
                  } else {
                    noteObj = { note: noteRaw };
                  }
                  return {
                    name: c.name || '未知',
                    phone: c.mobile || '',
                    mobile: c.mobile || '',
                    company: c.company_name || '',
                    note: noteObj.note || '',
                    custom: noteObj.custom || '',
                    fund: c.fund || noteObj.fund || '',
                    whitelist_name: c.whitelist_name || '',
                    category: c.category || '',
                    batch_label: c.batch_label || '',
                    dialedStatus: 'todo',
                    dialedAt: null
                  };
                });

                // 识别检查（静默）：自动修正公积金/单位/备注字段错位
                for (var si = 0; si < importedClients.length; si++) {
                  sanitizeClientFields(importedClients[si]);
                }

                localStorage.setItem(CLIENTS_K, JSON.stringify(importedClients));
                renderDialCards();
                updateStats();
                if (Number(res.master_loaded || 0) > 0 && Number(res.master_daily_remaining) === 0) {
                  alert('今天加载满了，明天再来。');
                }
              })
              .catch(function(err) {
                clearTimeout(timeoutId);
                finishPull();
                if (err.name === 'AbortError') {
                  alert('请求超时，请检查网络后重试');
                } else {
                  alert('网络错误: ' + err.message);
                }
              });
        } catch (syncErr) {
          finishPull();
          alert('操作失败: ' + syncErr.message);
        }

      }

      doPull();
    }

    function initCustViewer(){
      var ov=document.getElementById('dbOverlay'); if(!ov)return;
      var cls=document.getElementById('dbClose'); if(cls)cls.addEventListener('click',function(){ov.classList.remove('active');ov.classList.remove('mobile-layout');});
      var mbtn=document.getElementById('dbMobileBtn'); if(mbtn)mbtn.addEventListener('click',function(){openDBMobile();});
      ov.addEventListener('click',function(e){if(e.target===ov)ov.classList.remove('active');});
      
      var si=document.getElementById('dbSearch'); if(si)si.addEventListener('input',function(){clearTimeout(DB.timer);DB.timer=setTimeout(function(){DB.page=1;dbFetch();},400);});
      // 模糊关联搜索: 同步到 dbSearch 并触发服务端模糊搜索
      var fuzzySearch = document.getElementById('dbFuzzySearch');
      if (fuzzySearch) {
        fuzzySearch.addEventListener('input', function() {
          var q = fuzzySearch.value.trim();
          if (si) si.value = q;
          clearTimeout(DB.fuzzyTimer);
          DB.fuzzyTimer = setTimeout(function() {
            DB.page = 1;
            dbFetch();
          }, 350);
        });
      }
      var fuzzyInput=document.getElementById('dbFuzzySearch'); if(fuzzyInput){
        fuzzyInput.addEventListener('input',function(){clearTimeout(DB.fuzzySearchTimer);DB.fuzzySearchTimer=setTimeout(function(){DB.page=1;dbRenderCached();},250);});
        fuzzyInput.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();DB.page=1;dbRenderCached();}});
      }
      var ps=document.getElementById('dbPageSize'); if(ps)ps.addEventListener('change',function(){if(ps.value==='5000'){ps.value='300';}localStorage.setItem('crm_page_size', ps.value);DB.pageSize=Math.min(300,parseInt(ps.value,10)||50);DB.page=1;dbFetch();});
      var pr=document.getElementById('dbPrev'); if(pr)pr.addEventListener('click',function(){if(DB.page>1){DB.page--;dbFetch();}});
      var nx=document.getElementById('dbNext'); if(nx)nx.addEventListener('click',function(){var tp=Math.max(1,Math.ceil(DB.total/DB.pageSize));if(DB.page<tp){DB.page++;dbFetch();}});
      
      var pageInput = document.getElementById('dbPageInput');
      if (pageInput) {
        var triggerPageChange = function() {
          var tp = Math.max(1, Math.ceil(DB.total / DB.pageSize));
          var val = parseInt(pageInput.value);
          if (isNaN(val) || val < 1) {
            val = 1;
          } else if (val > tp) {
            val = tp;
          }
          if (val !== DB.page) {
            DB.page = val;
            dbFetch();
          } else {
            pageInput.value = DB.page;
          }
        };
        pageInput.addEventListener('change', triggerPageChange);
        pageInput.addEventListener('keydown', function(e) {
          if (e.key === 'Enter') {
            triggerPageChange();
            pageInput.blur();
          }
        });
      }
      
      // Select all checkbox wiring
      var selectAllCb = document.getElementById('crmSelectAll');
      if (selectAllCb) {
        selectAllCb.onchange = function() {
          var checked = selectAllCb.checked;
          var tb = document.getElementById('dbTbody');
          if (!tb) return;
          var rowCbs = document.querySelectorAll('#dbTbody .crm-row-select');
          rowCbs.forEach(function(cb) {
            cb.checked = checked;
            var m = cb.getAttribute('data-mobile');
            var rowEl = cb.closest('tr');
            if (checked) {
              DB.selectedIds[m] = true;
              if (rowEl) rowEl.classList.add('selected');
            } else {
              delete DB.selectedIds[m];
              if (rowEl) rowEl.classList.remove('selected');
            }
          });
        };
      }

      // Tabs wiring
      var tabs = document.querySelectorAll('#dbOverlay .crm-tab');
      tabs.forEach(function(tab) {
        tab.onclick = function() {
          var tabName = tab.getAttribute('data-tab') || 'all';
          if (tabName === 'accountMgr' || tabName === 'backupMgr' || tabName === 'contentConfig' || tabName === 'uploadLog' || tabName === 'masterPullLog') {
            tabs.forEach(function(t) { t.classList.remove('active'); });
            tab.classList.add('active');
            var mp = document.getElementById('dbAccountMgrPanel');
            var bp = document.getElementById('dbBackupMgrPanel');
            var cp = document.getElementById('dbContentConfigPanel');
            var up = document.getElementById('dbUploadLogPanel');
            var mpl = document.getElementById('dbMasterPullLogPanel');
            var tb = document.querySelector('#dbOverlay .crm-table');
            var tableWrap = document.querySelector('#dbOverlay .db-table-wrap');
            var pager = document.querySelector('#dbOverlay .crm-pager');
            var shortcutBar = document.querySelector('#dbOverlay .crm-shortcut-bar');
            var badgeBar = document.querySelector('#dbOverlay .crm-badge-bar');
            var batchCatPanel = document.getElementById('dbBatchCatPanel');
            var sc = document.querySelector('#dbOverlay .crm-search-card');
            var tl = document.querySelector('#dbOverlay .crm-toolbar');
            if (tableWrap) tableWrap.style.display = 'none';
            if (pager) pager.style.display = 'none';
            if (shortcutBar) shortcutBar.style.display = 'none';
            if (badgeBar) badgeBar.style.display = 'none';
            if (batchCatPanel) batchCatPanel.style.display = 'none';
            if (mp) mp.style.display = tabName === 'accountMgr' ? 'flex' : 'none';
            if (bp) bp.style.display = tabName === 'backupMgr' ? 'flex' : 'none';
            if (cp) cp.style.display = tabName === 'contentConfig' ? 'flex' : 'none';
            if (up) up.style.display = tabName === 'uploadLog' ? 'flex' : 'none';
            if (mpl) mpl.style.display = tabName === 'masterPullLog' ? 'flex' : 'none';
            // 桌面路径同样按主账户控制子账户管理区显示（初始内联为 none）
            if (tabName === 'accountMgr') {
              var subsEl = document.getElementById('dbAccountMgrSubs');
              if (subsEl) subsEl.style.display = isSessionMaster() ? 'block' : 'none';
            }
            if (tb) tb.style.display = 'none';
            if (sc) sc.style.display = 'none';
            if (tl) tl.style.display = 'none';
            if (tabName === 'accountMgr') { loadSubAccounts(); loadAccountStats(); loadDeviceSessions(); }
            if (tabName === 'backupMgr') { loadBackupConfig(); }
            if (tabName === 'contentConfig') { loadContentConfig(); }
            if (tabName === 'uploadLog') { loadUploadLog('day'); }
            if (tabName === 'masterPullLog') { loadMasterPullLog('day'); }
          } else {
            var mp2 = document.getElementById('dbAccountMgrPanel');
            var bp2 = document.getElementById('dbBackupMgrPanel');
            var cp2 = document.getElementById('dbContentConfigPanel');
            var up2 = document.getElementById('dbUploadLogPanel');
            var mpl2 = document.getElementById('dbMasterPullLogPanel');
            var tb2 = document.querySelector('#dbOverlay .crm-table');
            var tableWrap2 = document.querySelector('#dbOverlay .db-table-wrap');
            var pager2 = document.querySelector('#dbOverlay .crm-pager');
            var shortcutBar2 = document.querySelector('#dbOverlay .crm-shortcut-bar');
            var badgeBar2 = document.querySelector('#dbOverlay .crm-badge-bar');
            var batchCatPanel2 = document.getElementById('dbBatchCatPanel');
            var sc2 = document.querySelector('#dbOverlay .crm-search-card');
            var tl2 = document.querySelector('#dbOverlay .crm-toolbar');
            if (tableWrap2) tableWrap2.style.display = '';
            if (pager2) pager2.style.display = '';
            if (shortcutBar2) shortcutBar2.style.display = '';
            if (badgeBar2) badgeBar2.style.display = '';
            if (batchCatPanel2) batchCatPanel2.style.display = 'none';
            if (mp2) mp2.style.display = 'none';
            if (bp2) bp2.style.display = 'none';
            if (cp2) cp2.style.display = 'none';
            if (up2) up2.style.display = 'none';
            if (mpl2) mpl2.style.display = 'none';
            if (tb2) tb2.style.display = '';
            if (sc2) sc2.style.display = '';
            if (tl2) tl2.style.display = '';
            tabs.forEach(function(t) { t.classList.remove('active'); });
            tab.classList.add('active');
            DB.activeTab = tabName;
            DB.page = 1;
            dbFetch();
          }
        };
      });

      // Shortcuts wiring
      var shortcuts = document.querySelectorAll('#dbOverlay .crm-shortcut-btn');
      shortcuts.forEach(function(btn) {
        btn.onclick = function() {
          shortcuts.forEach(function(b) { b.classList.remove('active'); });
          btn.classList.add('active');
          DB.activeShortcut = btn.getAttribute('data-shortcut') || 'all';
          DB.page = 1;
          dbFetch();
        };
      });

      // Toggle search area collapse
      var toggleSearchBtn = document.getElementById('crmToggleSearchBtn');
      var searchCard = document.querySelector('#dbOverlay .crm-search-card');
      var badgeBar = document.querySelector('#dbOverlay .crm-badge-bar');
      // 数据库看板每次打开默认展示模糊关联搜索框，避免旧的折叠状态让用户误以为搜索功能被删除。
      // 用户仍可在本次看板使用期间手动收起；下次重新打开时自动恢复展开。
      if (searchCard) searchCard.classList.remove('collapsed');
      if (badgeBar) badgeBar.classList.remove('collapsed');
      if (toggleSearchBtn) toggleSearchBtn.innerHTML = '收起搜索';
      try { localStorage.setItem('db_search_collapsed', '0'); } catch (_) {}
      if (toggleSearchBtn) {
        toggleSearchBtn.addEventListener('click', function() {
          var isCollapsed = searchCard && searchCard.classList.contains('collapsed');
          if (searchCard) searchCard.classList.toggle('collapsed');
          if (badgeBar) badgeBar.classList.toggle('collapsed');
          toggleSearchBtn.innerHTML = isCollapsed ? '收起搜索' : '展开搜索';
          localStorage.setItem('db_search_collapsed', isCollapsed ? '0' : '1');
        });
      }

      // Search & Reset buttons wiring
      var searchBtn = document.getElementById('crmSearchBtn');
      if (searchBtn) {
        searchBtn.onclick = function() {
          DB.page = 1;
          dbFetch();
        };
      }
      // Toolbar action: 添加客户
      var addCustBtn = document.getElementById('crmAddCustBtn');
      if (addCustBtn) {
        addCustBtn.onclick = function() {
          var name = prompt('请输入客户姓名：');
          if (name === null) return;
          name = name.trim();
          if (!name) { alert('姓名不能为空'); return; }
          
          var mobile = prompt('请输入客户手机号：');
          if (mobile === null) return;
          mobile = mobile.trim();
          if (!mobile) { alert('手机号不能为空'); return; }
          
          var company = prompt('请输入客户单位/公司名称（可选）：') || '';
          company = company.trim();
          
          var note = prompt('请输入备注信息（可选）：') || '';
          note = note.trim();
          
          var catOpts = CATS.join(' / ');
          var cat = prompt('请输入客户分类（可选，例如: 意向客户。候选值: ' + catOpts + '）：') || '';
          cat = cat.trim();
          
          addCustBtn.disabled = true;
          addCustBtn.textContent = '添加中...';
          
          fetch('/api/dialer/upload-customers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              customers: [{
                name: name,
                mobile: mobile,
                company: company,
                note: note
              }],
              batch_label: '手动录入',
              account_id: getOrCreateAccountId()
            })
          })
          .then(function(r) { return r.json(); })
          .then(function(res) {
            if (res.success) {
              if (cat) {
                return fetch('/api/dialer/customers', {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    account_id: getOrCreateAccountId(),
                    mobile: mobile,
                    fields: { category: cat }
                  })
                }).then(function(r) { return r.json(); });
              }
              return { success: true };
            } else {
              throw new Error(res.error || '添加失败');
            }
          })
          .then(function(res) {
            if (res.success) {
              alert('添加客户成功！');
              dbFetch();
            } else {
              alert('更新分类失败: ' + (res.error || '未知'));
            }
          })
          .catch(function(err) {
            alert('添加客户出错: ' + err.message);
          })
          .then(function() {
            addCustBtn.disabled = false;
            addCustBtn.textContent = '添加客户';
          });
        };
      }

      // Toolbar action: 添加到待拨打
      var addToDialBtn = document.getElementById('crmAddToDialBtn');
      if (addToDialBtn) {
        addToDialBtn.onclick = function() {
          var selectedMobiles = Object.keys(DB.selectedIds);
          if (selectedMobiles.length === 0) { alert('请先勾选需要添加到待拨打的客户'); return; }

          var addedCount = 0;
          var skippedCooldown = 0;
          var skippedExists = 0;
          var addedMobiles = [];
          selectedMobiles.forEach(function(m) {
            var clientData = DB.allData.find(function(c) { return c.mobile === m; });
            if (clientData) {
              var exists = importedClients.some(function(ic) { return (ic.mobile || ic.phone) === m; });
              if (exists) {
                skippedExists++;
                return;
              }
              if (!canAddToDialList(m)) {
                skippedCooldown++;
                return;
              }
              var parsed = parseCustomerNote(clientData);
              importedClients.push({
                name: clientData.name || '未知',
                phone: clientData.mobile,
                mobile: clientData.mobile,
                company: clientData.company_name || '',
                note: parsed.note,
                custom: parsed.custom,
                fund: clientData.fund || '',
                category: clientData.category || '',
                batch_label: clientData.batch_label || ''
              });
              recordAddToDialList(m);
              addedMobiles.push(m);
              addedCount++;
            }
          });

          if (addedCount > 0) {
            addedMobiles.forEach(function(m) { recordTimeline(m, 'add'); });
            localStorage.setItem(CLIENTS_K, JSON.stringify(importedClients));
            renderDialCards();
            var msg = '成功添加 ' + addedCount + ' 个客户到待拨打列表';
            if (skippedCooldown > 0) msg += '，' + skippedCooldown + ' 个因10天内已添加被跳过';
            if (skippedExists > 0) msg += '，' + skippedExists + ' 个已在列表中';
            alert(msg);
            DB.selectedIds = {};
            var selectAllCb = document.getElementById('crmSelectAll');
            if (selectAllCb) selectAllCb.checked = false;
            dbTable(crmFilterData(DB.allData));
          } else {
            var msg2 = '没有客户被添加';
            if (skippedCooldown > 0) msg2 += '（' + skippedCooldown + ' 个在10天冷却期内）';
            if (skippedExists > 0) msg2 += '（' + skippedExists + ' 个已在列表中）';
            if (skippedCooldown === 0 && skippedExists === 0) msg2 = '选中的客户已在待拨打列表中';
            alert(msg2);
          }
        };
      }

      // Toolbar action: 批量删除
      var batchDeleteBtn = document.getElementById('crmBatchDeleteBtn');
      if (batchDeleteBtn) {
        batchDeleteBtn.onclick = function() {
          if (!isSessionMaster()) { alert('子账号无权批量删除客户'); return; }
          var mobiles = Object.keys(DB.selectedIds);
          if (mobiles.length === 0) { alert('请先勾选需要删除的客户'); return; }

          if (!confirm('警告：确认删除选中的 ' + mobiles.length + ' 个客户吗？该操作不可逆，将从数据库彻底移除！')) return;

          // 删除密码验证
          verifyDeletePassword(function() {
            doBatchDelete(mobiles);
          });
        };
      }

      function doBatchDelete(mobiles) {
        var batchDeleteBtn = document.getElementById('crmBatchDeleteBtn');
        batchDeleteBtn.disabled = true;
        batchDeleteBtn.textContent = '删除中...';
          
          fetch('/api/dialer/customers', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mobiles: mobiles, account_id: getOrCreateAccountId() })
          })
          .then(function(r) { return r.json(); })
          .then(function(res) {
            if (res.success) {
              alert('成功删除 ' + (res.count || mobiles.length) + ' 个客户！');
              DB.selectedIds = {};
              var selectAllCb = document.getElementById('crmSelectAll');
              if (selectAllCb) selectAllCb.checked = false;
              dbFetch();
            } else {
              alert('删除失败: ' + (res.error || '未知错误'));
            }
          })
          .catch(function(err) {
            alert('删除出错: ' + err.message);
          })
          .then(function() {
            if (batchDeleteBtn) {
              batchDeleteBtn.disabled = false;
              batchDeleteBtn.textContent = '批量删除';
            }
          });
      }

      // Toolbar action: 转入公海
      var movePublicBtn = document.getElementById('crmMovePublicBtn');
      if (movePublicBtn) {
        movePublicBtn.onclick = async function() {
          var mobiles = Object.keys(DB.selectedIds);
          if (mobiles.length === 0) { alert('请先勾选要转入公海的数据'); return; }

          if (!confirm('确认将选中的 ' + mobiles.length + ' 个客户转入「公海」？\\n\\n转入后该批数据将从当前账户移除，所有账户均无法再添加这些号码。')) return;

          var originalText = movePublicBtn.textContent;
          movePublicBtn.disabled = true;
          movePublicBtn.textContent = '处理中...';
          try {
            var token = getSessionToken();
            if (!token) throw new Error('登录状态已失效，请重新登录后再试。');
            var requestHeaders = {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            };
            if (_viewAccountId) requestHeaders['X-View-Account-Id'] = _viewAccountId;

            var response = await fetch('/api/dialer/customers/transfer-to-pool', {
              method: 'POST',
              headers: requestHeaders,
              body: JSON.stringify({ mobiles: mobiles })
            });
            var result = await response.json().catch(function() { return null; });
            if (!response.ok) {
              var message = result && (result.error || result.message);
              if (response.status === 401) message = '登录已过期，请重新登录后再执行。';
              throw new Error(message || ('服务器请求失败（HTTP ' + response.status + '）'));
            }
            if (!result || result.success !== true) {
              throw new Error((result && result.error) || '服务器没有确认转移成功。');
            }
            var transferred = Number(result.transferred);
            if (!Number.isFinite(transferred) || transferred < mobiles.length) {
              throw new Error('云端只确认转移 ' + (Number.isFinite(transferred) ? transferred : 0) +
                '/' + mobiles.length + ' 个号码。为防止数据丢失，当前选择已保留，请核对公海数据后再试。');
            }

            alert('操作完成，成功转入公海 ' + transferred + ' / ' + mobiles.length + ' 条');
            DB.selectedIds = {};
            var selectAllCb = document.getElementById('crmSelectAll');
            if (selectAllCb) selectAllCb.checked = false;
            dbFetch();
            loadAccountStats();
            refreshAccountDataCount();
          } catch (err) {
            alert('转入失败: ' + (err && err.message ? err.message : '未知错误') +
              '\\n\\n当前勾选记录已保留，没有清空。');
          } finally {
            movePublicBtn.disabled = false;
            movePublicBtn.textContent = originalText || '转入公海';
          }
        };
      }

      // #db 自动打开逻辑移至全局初始化完成后，避免本函数前段任一初始化异常导致深链接失效。

      // Polling is only for displaying progress; the scheduled Worker owns execution.
      function watchCrmBackgroundJob(jobId, statusEl, onDone) {
        var stopped = false;
        try { localStorage.setItem('crm_last_bg_job', jobId); } catch (_) {}
        function poll() {
          if (stopped) return;
          fetch('/api/dialer/background-jobs/' + encodeURIComponent(jobId), {
            headers:{'Authorization':'Bearer '+getSessionToken()}
          }).then(function(r){return r.json();}).then(function(res){
            if(!res.success || !res.job) throw new Error(res.error||'读取任务状态失败');
            var j=res.job, total=Number(j.total||0), done=Number(j.processed||0);
            if(statusEl){statusEl.style.display='inline';statusEl.textContent='后台处理中 '+done+'/'+total+'（成功 '+(j.succeeded||0)+'，失败 '+(j.failed||0)+'）';statusEl.style.color='#f57c00';}
            if(j.status==='completed'||j.status==='completed_with_errors'||j.status==='failed'){
              stopped=true;
              try { if(localStorage.getItem('crm_last_bg_job')===jobId) localStorage.removeItem('crm_last_bg_job'); } catch (_) {}
              if(statusEl){statusEl.textContent='后台任务'+(j.status==='completed'?'完成':j.status==='failed'?'失败':'完成（有失败）')+'：成功 '+(j.succeeded||0)+'，失败 '+(j.failed||0);statusEl.style.color=j.failed?'#e74c3c':'#07c160';}
              if(typeof onDone==='function') onDone(j);
              dbFetch(); loadAccountStats(); populateReassignSel();
              return;
            }
            setTimeout(poll,5000);
          }).catch(function(){if(!stopped)setTimeout(poll,10000);});
        }
        poll();
        return function(){stopped=true;};
      }
      // Restore the most recent task monitor after the page is reopened; execution remains server-side.
      try { var previousCrmJob = localStorage.getItem('crm_last_bg_job'); if (previousCrmJob) watchCrmBackgroundJob(previousCrmJob, document.getElementById('dbBatchCatStatus') || document.getElementById('crmReassignHint')); } catch (_) {}
      // Batch category wiring: append a custom type to selected customers
      var bcpBtn = document.getElementById('dbBatchCatBtn');
      var bcpPanel = document.getElementById('dbBatchCatPanel');
      var bcpName = document.getElementById('dbBatchCatName');
      var bcpApply = document.getElementById('dbBatchCatApply');
      var bcpCancel = document.getElementById('dbBatchCatCancel');
      var bcpStatus = document.getElementById('dbBatchCatStatus');

      if (bcpBtn) bcpBtn.addEventListener('click', function() {
        var opening = bcpPanel.style.display === 'none' || !bcpPanel.style.display;
        bcpPanel.style.display = opening ? 'flex' : 'none';
        if (opening && bcpName) bcpName.focus();
        if (bcpStatus) bcpStatus.style.display = 'none';
      });
      if (bcpCancel) bcpCancel.addEventListener('click', function() {
        bcpPanel.style.display = 'none';
      });
      if (bcpApply) bcpApply.addEventListener('click', function() {
        var typeName = bcpName ? bcpName.value.trim() : '';
        var mobiles = Object.keys(DB.selectedIds || {}).filter(function(m) { return DB.selectedIds[m]; });
        if (!mobiles.length) { alert('请先勾选需要添加类型的客户'); return; }
        if (!typeName) { alert('请输入自定义类型名称'); if (bcpName) bcpName.focus(); return; }
        if (!confirm('确认给已勾选的 ' + mobiles.length + ' 位客户设置类型「' + typeName + '」吗？提交后由服务器后台执行，可关闭页面。')) return;
        bcpApply.disabled = true; bcpApply.textContent = '提交中...';
        fetch('/api/dialer/background-jobs/type', {
          method:'POST',
          headers:{'Content-Type':'application/json','Authorization':'Bearer '+getSessionToken(),'X-View-Account-Id':_viewAccountId||''},
          body:JSON.stringify({type_name:typeName,mobiles:mobiles})
        }).then(function(r){return r.json();}).then(function(res){
          if(!res.success) throw new Error(res.error||'任务提交失败');
          if(bcpStatus){bcpStatus.style.display='inline';bcpStatus.style.color='#f57c00';bcpStatus.textContent='后台任务已提交：'+res.total+' 条';}
          alert('已提交后台任务（'+res.job_id+'），你可以关闭页面，服务器会继续处理。');
          bcpName.value=''; DB.selectedIds={}; dbFetch();
          watchCrmBackgroundJob(res.job_id, bcpStatus);
        }).catch(function(err){alert(err.message||'提交失败');})
        .finally(function(){bcpApply.disabled=false;bcpApply.textContent='添加到类型列';});
      });

 // 企业微信通知配置（仅主账号）
 var dbWecomPanel = document.getElementById('dbWecomConfig');
 if (dbWecomPanel) {
   if (isSessionMaster()) {
     dbWecomPanel.style.display = 'block';
     var dbWecomStatus = document.getElementById('dbWecomStatus');
     var dbWecomInput = document.getElementById('dbWecomWebhookInput');
     var dbWecomSave = document.getElementById('dbWecomSaveBtn');
     var dbWecomTest = document.getElementById('dbWecomTestBtn');
     function dbWecomRequest(action, url) {
       return fetch('/api/admin/wecom-config', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + (localStorage.getItem('dialer_sess_token') || '') },
         body: JSON.stringify({ action: action, webhook_url: url || '' })
       }).then(function(r) { return r.json(); });
     }
     dbWecomRequest('status').then(function(r) {
       if (dbWecomStatus) {
         dbWecomStatus.textContent = r.success && r.configured ? '已配置（密钥已隐藏）' : '尚未配置';
         dbWecomStatus.style.color = r.configured ? '#07a35a' : 'var(--text-soft)';
       }
     }).catch(function() { if (dbWecomStatus) dbWecomStatus.textContent = '读取配置状态失败'; });
     if (dbWecomSave) dbWecomSave.addEventListener('click', function() {
       var value = dbWecomInput ? dbWecomInput.value.trim() : '';
       if (!value) { alert('请先粘贴企业微信群机器人 Webhook 地址'); return; }
       dbWecomSave.disabled = true; dbWecomSave.textContent = '保存中…';
       dbWecomRequest('save', value).then(function(r) {
         if (!r.success) throw new Error(r.error || '保存失败');
         if (dbWecomInput) dbWecomInput.value = '';
         if (dbWecomStatus) { dbWecomStatus.textContent = '已配置（密钥已隐藏）'; dbWecomStatus.style.color = '#07a35a'; }
         alert('企业微信 Webhook 已安全保存');
       }).catch(function(e) { alert(e.message || '保存失败'); })
       .finally(function() { dbWecomSave.disabled = false; dbWecomSave.textContent = '保存'; });
     });
     if (dbWecomTest) dbWecomTest.addEventListener('click', function() {
       dbWecomTest.disabled = true; dbWecomTest.textContent = '发送中…';
       dbWecomRequest('test').then(function(r) {
         if (!r.success) throw new Error(r.error || '测试发送失败');
         if (dbWecomStatus) { dbWecomStatus.textContent = '测试发送成功'; dbWecomStatus.style.color = '#07a35a'; }
         alert('企业微信群已收到测试消息');
       }).catch(function(e) { alert(e.message || '测试发送失败'); })
       .finally(function() { dbWecomTest.disabled = false; dbWecomTest.textContent = '发送测试'; });
     });
   }
 }

 // AI 公积金修正（仅主账号：后端 /api/admin/ai-correct-fund 同样仅主账号，子账号直接隐藏按钮）
 var aiFundBtn = document.getElementById('dbAiCorrectFundBtn');
 if (aiFundBtn) {
 if (!isSessionMaster()) { aiFundBtn.style.display = 'none'; }
 aiFundBtn.addEventListener('click', function() {
 if (!confirm('即将使用 AI 扫描所有客户记录，检查公积金、单位、备注字段是否存错了位置。\\n\\n' +
 'AI 将逐条判断：\\n' +
 '1. fund 存了公司名称 → 自动移到「单位」字段\\n' +
 '2. company_name 存了纯数字公积金 → 自动移到 fund\\n' +
 '3. fund 和 company_name 存反了 → 互换\\n' +
 '4. note 备注里误存了公司名称 → 自动移到「单位」\\n' +
 '5. fund 是乱码/无意义文字 → 清空\\n' +
 '6. note 备注里含阿拉伯数字（1~49999）→ 自动提取到公积金\\n' +
 '7. 不确定的条目将跳过，不做修改\\n\\n' +
 '仅修改「公积金」「单位」「备注」字段，不影响其他数据。\\n' +
 ' 所有修改按行进行，不会交叉合并数据。\\n\\n' +
 '确认开始 AI 扫描修正？')) {
 return;
 }

 var btn = aiFundBtn;
 var originalText = btn.textContent;
 btn.textContent = 'AI 扫描修正中...';
 btn.disabled = true;

 fetch('/api/admin/ai-correct-fund', {
   method: 'POST',
   headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + (localStorage.getItem('dialer_sess_token') || '') }
 })
 .then(function(r) { return r.json(); })
 .then(function(res) {
 btn.textContent = originalText;
 btn.disabled = false;

 if (res.success) {
 var msg = 'AI 公积金修正完成\\n\\n';
 msg += '扫描总条数: ' + res.total_scanned + '\\n';
 msg += '本地规则修正: ' + (res.local_corrected || 0) + ' 条\\n';
 msg += 'AI 判断可疑: ' + (res.suspicious_found || 0) + ' 条\\n';
 msg += 'AI 修正: ' + (res.ai_corrected || 0) + ' 条\\n\\n';

 if (res.corrections && res.corrections.length > 0) {
 msg += '修正详情（最多显示 20 条）：\\n';
 var maxShow = Math.min(res.corrections.length, 20);
 for (var i = 0; i< maxShow; i++) {
                    var c = res.corrections[i];
                    if (c.action === 'move_fund_to_company') {
                      msg += '  ' + (i+1) + '. ' + c.mobile + ': fund「' + c.old_fund + '」→ 单位「' + c.new_company_name + '」\\n';
                    } else if (c.action === 'move_company_to_fund') {
                      msg += '  ' + (i+1) + '. ' + c.mobile + ': 单位「' + c.old_company_name + '」→ fund「' + c.new_fund + '」\\n';
                    } else if (c.action === 'swap') {
                      msg += '  ' + (i+1) + '. ' + c.mobile + ': fund「' + c.old_fund + '」⇄ 单位「' + c.old_company_name + '」互换\\n';
                    } else if (c.action === 'move_note_to_company') {
                      msg += '  ' + (i+1) + '. ' + c.mobile + ': note「' + c.old_note + '」→ 单位「' + c.new_company_name + '」\\n';
                    } else if (c.action === 'clear_fund') {
                      msg += '  ' + (i+1) + '. ' + c.mobile + ': fund「' + c.old_fund + '」→ 已清空\\n';
                    } else if (c.action === 'move_note_number_to_fund') {
                      msg += '  ' + (i+1) + '. ' + c.mobile + ': note 数字「' + c.fund_value + '」→ fund\\n';
                    } else {
                      msg += '  ' + (i+1) + '. ' + c.mobile + ': ' + c.action + '\\n';
                    }
                  }
                  if (res.corrections.length > 20) {
                    msg += '  ... 还有 ' + (res.corrections.length - 20) + ' 条（共 ' + res.corrections.length + ' 条）\\n';
                  }
                }

                if (res.errors && res.errors.length > 0) {
                  msg += '\\n错误（' + res.errors.length + ' 条）：\\n';
                  var maxErr = Math.min(res.errors.length, 5);
                  for (var e = 0; e < maxErr; e++) {
                    msg += '  ' + res.errors[e] + '\\n';
                  }
                }

                alert(msg);
                dbFetch(); // 刷新数据
              } else {
                alert('AI 修正失败: ' + (res.error || '未知错误'));
              }
            })
            .catch(function(err) {
              btn.textContent = originalText;
              btn.disabled = false;
              alert('网络错误: ' + err.message);
            });
        });
      }

      // 主账号/小组长按平均或手动数量分配当前批次客户
      var reassignBtn = document.getElementById('crmReassignBtn');
      if (reassignBtn && !reassignBtn._wired) {
        reassignBtn._wired = true;
        reassignBtn.addEventListener('click', function() {
          if (!canManageTeam()) { alert('当前账号无权分配客户'); return; }
          var batchLabel = (document.getElementById('dbBatchFilter') || {}).value || '';
          if (!batchLabel) { alert('请先在“导入批次”中选择要分配的批次'); return; }
          var targetSel = document.getElementById('crmReassignSel');
          var checked = targetSel ? Array.prototype.slice.call(targetSel.querySelectorAll('.crm-reassign-account:checked')) : [];
          if (!checked.length) { alert(isSessionManager() ? '请至少选择一个本组组员' : '请至少选择一个小组或组员'); return; }
          var mode = (document.getElementById('crmReassignMode') || {}).value || 'equal';
          var allocations = [], totalCount = 0;
          checked.forEach(function(cb) {
            var qty = targetSel.querySelector('.crm-reassign-count[data-account-id="' + cb.value + '"]');
            var count = mode === 'equal' ? 1 : (qty ? Number(qty.value) : 0);
            if (!Number.isSafeInteger(count) || count <= 0) count = -1;
            allocations.push({ account_id: cb.value, count: count, account_name: cb.parentNode.querySelector('span').textContent });
            totalCount += count;
          });
          if (allocations.some(function(a) { return a.count < 0; })) { alert('请为每位勾选的成员填写大于 0 的整数'); return; }
          var summary = mode === 'equal'
            ? allocations.map(function(a) { return a.account_name; }).join('、')
            : allocations.map(function(a) { return a.account_name + '：' + a.count + '条'; }).join('；');
          var confirmText = mode === 'equal'
            ? '将当前批次剩余客户平均分配给：' + summary + '？'
            : '从当前批次「' + batchLabel + '」分配 ' + totalCount + ' 条客户：\\n' + summary + '\\n确认执行？';
          if (!confirm(confirmText)) return;
          reassignBtn.disabled = true; reassignBtn.textContent = '分配中...';
          fetch('/api/dialer/customers/reassign', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getSessionToken(), 'X-View-Account-Id': _viewAccountId || '' },
            body: JSON.stringify({ batch_label: batchLabel, mode: mode, allocations: allocations.map(function(a) { return { account_id: a.account_id, count: a.count }; }) })
          }).then(function(r) { return r.json(); }).then(function(res) {
            if (!res.success) throw new Error(res.error || '任务提交失败');
            var details = (res.allocations || []).map(function(a) { return a.account_name + '：' + a.count + '条'; }).join('；');
            alert('分配后台任务已提交（' + res.job_id + '）。服务器将继续执行，你可以关闭页面。' + (details ? '\\n' + details : ''));
            watchCrmBackgroundJob(res.job_id, document.getElementById('crmReassignHint'), function(job) {
              alert('后台分配任务' + (job.status === 'completed' ? '完成' : '结束') + '：成功 ' + (job.succeeded || 0) + ' 条，失败 ' + (job.failed || 0) + ' 条');
            });
          }).catch(function(err) { alert('分配任务提交失败: ' + err.message); })
            .finally(function() { reassignBtn.disabled = false; reassignBtn.textContent = '确认分配'; });
        });
      }
    }

  function initCopyPrefPanel() {
      var trigger = document.getElementById('copyPrefTrigger');
      var overlay = document.getElementById('copyPrefOverlay');
      if (!trigger || !overlay) return;

      var CPF_IDS = {
        name: { cb: 'cpfName', num: 'cpfNumName' },
        phone: { cb: 'cpfPhone', num: 'cpfNumPhone' },
        company: { cb: 'cpfCompany', num: 'cpfNumCompany' },
        fund: { cb: 'cpfFund', num: 'cpfNumFund' },
        date: { cb: 'cpfDate', num: 'cpfNumDate' }
      };

      // 渲染弹窗：勾选状态 + 勾选顺序序号（先勾的序号小、排前面）
      function renderPrefPanel() {
        var p = getCopyPref();
        for (var fi = 0; fi < COPY_FIELDS.length; fi++) {
          var f = COPY_FIELDS[fi];
          var ids = CPF_IDS[f.key];
          var cb = document.getElementById(ids.cb);
          var numEl = document.getElementById(ids.num);
          var orderIdx = p.order.indexOf(f.key);
          cb.checked = orderIdx !== -1;
          if (numEl) numEl.textContent = orderIdx !== -1 ? (orderIdx + 1) + '.' : '';
        }
      }
      // 勾选切换：勾选追加到末尾（顺序=勾选先后），取消移除；姓名必选不可取消
      function toggleField(key, checked) {
        if (key === 'name' && !checked) {
          renderPrefPanel(); // 恢复勾选状态
          showCopyLimitToast('姓名必须勾选', true);
          return;
        }
        var p = getCopyPref();
        var idx = p.order.indexOf(key);
        if (checked && idx === -1) p.order.push(key);
        if (!checked && idx !== -1) p.order.splice(idx, 1);
        saveCopyPref(p);
        renderPrefPanel();
      }

      // 子账号在账户弹窗中可自行修改登录 PIN。
      var childPinPanel = document.getElementById('copyPrefChildPinPanel');
      var childPinBtn = document.getElementById('copyPrefChangePinBtn');
      if (childPinPanel) childPinPanel.style.display = isSessionMaster() ? 'none' : 'block';
      if (childPinBtn && !childPinBtn._wired) {
        childPinBtn._wired = true;
        childPinBtn.addEventListener('click', function() {
          var oldPinEl = document.getElementById('copyPrefOldPin');
          var newPinEl = document.getElementById('copyPrefNewPin');
          var message = document.getElementById('copyPrefPinMessage');
          var oldPin = oldPinEl.value.trim();
          var newPin = newPinEl.value.trim();
          message.style.color = '#e74c3c';
          if (!/^\\d{4,6}$/.test(oldPin)) { message.textContent = '当前 PIN 必须为 4-6 位数字'; return; }
          if (!/^\\d{4,6}$/.test(newPin)) { message.textContent = '新 PIN 必须为 4-6 位数字'; return; }
          if (oldPin === newPin) { message.textContent = '新 PIN 不能与当前 PIN 相同'; return; }
          childPinBtn.disabled = true;
          childPinBtn.textContent = '修改中…';
          fetch('/api/dialer/auth/change-pin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ old_pin: oldPin, new_pin: newPin })
          }).then(function(r) { return r.json(); }).then(function(res) {
            if (!res || !res.success) throw new Error((res && res.error) || 'PIN 修改失败');
            oldPinEl.value = '';
            newPinEl.value = '';
            message.style.color = '#07c160';
            message.textContent = 'PIN 修改成功，下次登录请使用新 PIN';
          }).catch(function(err) {
            message.style.color = '#e74c3c';
            message.textContent = err.message || '网络错误，请稍后重试';
          }).finally(function() {
            childPinBtn.disabled = false;
            childPinBtn.textContent = '修改';
          });
        });
      }

      // 仅主账号在账户弹窗中显示数据库看板入口。
      var openDBBtn = document.getElementById('copyPrefOpenDBBtn');
      if (openDBBtn) {
        openDBBtn.style.display = isSessionMaster() ? 'block' : 'none';
        openDBBtn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          overlay.classList.remove('active');
          if (typeof window.openDBDashboard === 'function') window.openDBDashboard();
        });
      }

      trigger.addEventListener('click', function(e) {
        e.stopPropagation();
        // 登录态在面板初始化后才恢复；每次打开账户弹窗时刷新主账号入口权限。
        if (openDBBtn) openDBBtn.style.display = isSessionMaster() ? 'block' : 'none';
        renderPrefPanel();
        overlay.classList.add('active');
      });
      document.getElementById('copyPrefCloseBtn').addEventListener('click', function() {
        overlay.classList.remove('active');
      });
      overlay.addEventListener('click', function(e) {
        if (e.target === this) overlay.classList.remove('active');
      });
      document.getElementById('cpfName').addEventListener('change', function() { toggleField('name', this.checked); });
      document.getElementById('cpfPhone').addEventListener('change', function() { toggleField('phone', this.checked); });
      document.getElementById('cpfCompany').addEventListener('change', function() { toggleField('company', this.checked); });
      document.getElementById('cpfFund').addEventListener('change', function() { toggleField('fund', this.checked); });
      document.getElementById('cpfDate').addEventListener('change', function() {
        toggleField('date', this.checked);
      });
    }

  function initMenuHelp() {
      var modal = document.getElementById('menuHelpModal');
      var title = document.getElementById('menuHelpTitle');
      var body = document.getElementById('menuHelpText');
      var close = document.getElementById('menuHelpClose');
      var dropdown = document.getElementById('headerDropdown');
      if (!modal || !dropdown) return;

      // 将说明弹窗挂到 body，避免被页面中带 transform 的父容器限制 fixed 定位范围
      if (modal.parentElement !== document.body) {
        document.body.appendChild(modal);
      }
      modal.style.position = 'fixed';
      modal.style.inset = '0';
      modal.style.width = '100vw';
      modal.style.height = '100dvh';
      modal.style.boxSizing = 'border-box';
      modal.style.display = 'none';
      modal.style.alignItems = 'center';
      modal.style.justifyContent = 'center';
      modal.style.padding = '20px';

      var help = {
        import: ['导入文件', '导入客户名单文件，读取客户资料并加入当前拨号列表，供后续拨打和跟进使用。导入前建议检查手机号是否完整、重复。'],
        dualSim: ['双卡轮换', '开启后，拨号过程中按设定规则在两张 SIM 卡之间轮换。关闭后使用当前默认拨号卡。'],
        rotation: ['轮换频率', '设置拨打多少通后切换一次 SIM 卡。数值越小切换越频繁，请按实际拨号习惯设置。'],
        clear: ['清空数据', '清除当前本地拨号列表及相关拨打进度。执行前请确认需要保留的数据已导出或同步。'],
        transferPool: ['转移至公海', '把当前拨号列表中的客户按手机号转入云端公海，从当前账户移出。系统会先检查手机号并二次确认；成功后才清空当前拨号列表。此操作会影响客户归属，请谨慎执行。'],
        theme: ['切换主题 / 自动模式', '支持浅色、深色和自动三种显示模式。选择“自动模式”时，页面会跟随设备或浏览器的系统外观设置，在系统切换浅色/深色时同步切换；选择浅色或深色则固定使用对应主题。此设置只影响页面显示，不会修改客户数据。'],
        account: ['账户', '显示当前登录账户及账户数据数量。点击账户区域可打开复制内容偏好设置，配置点击客户单位名称时要复制的字段及顺序。'],
        logout: ['退出登录', '退出当前账户并清除本地登录会话，之后需要重新登录才能继续使用。']
      };
      dropdown.addEventListener('click', function(e) {
        var helpBtn = e.target.closest ? e.target.closest('.menu-help-btn') : null;
        if (!helpBtn) return;
        e.preventDefault();
        e.stopPropagation();
        var item = help[helpBtn.getAttribute('data-help-key')];
        if (!item) return;
        title.textContent = item[0];
        body.textContent = item[1];
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
      }, true);
      if (close) close.addEventListener('click', function() { modal.style.display = 'none'; });
      modal.addEventListener('click', function(e) { if (e.target === modal) modal.style.display = 'none'; });
    }

  function initHeaderMenu() {
      initMenuHelp();
      var menuBtn = document.getElementById('headerMenuBtn');
      var dropdown = document.getElementById('headerDropdown');
      
      if (menuBtn && dropdown) {
        menuBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          if (dropdown.style.display === 'none' || !dropdown.style.display) {
            dropdown.style.display = 'flex';
          } else {
            dropdown.style.display = 'none';
          }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
          if (!menuBtn.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.style.display = 'none';
          }
        });

        // Also close dropdown when selecting any option inside it
        dropdown.querySelectorAll('.dropdown-item').forEach(function(item) {
          item.addEventListener('click', function() {
            dropdown.style.display = 'none';
          });
        });

        // Logout button in header menu
        var headerLogoutBtn = document.getElementById('headerLogoutBtn');
        if (headerLogoutBtn) {
          headerLogoutBtn.addEventListener('click', function() {
            sessionStorage.removeItem('dialer_locked');
            clearSession();
            location.reload();
          });
        }
      }
    }

    function initNoteModal() {
      var modal = document.getElementById('noteModal');
      var closeBtn = document.getElementById('closeNoteModalBtn');
      var content = document.getElementById('noteModalContent');
      if (content && !content.dataset.copyBound) {
        content.dataset.copyBound = '1';
        content.addEventListener('click', function(e) {
          e.stopPropagation();
          var note = content.textContent || '';
          if (!note || note === '点击此处复制备注') return;
          copyTextToClipboard(note);
          showCopyLimitToast('备注已复制', false);
        });
      }
      if (modal && closeBtn) {
        closeBtn.addEventListener('click', function() {
          modal.classList.remove('active');
        });
        modal.addEventListener('click', function(e) {
          if (e.target === this) {
            modal.classList.remove('active');
          }
        });
      }
    }


    function initAccountMgrPanel() {
      updateAccountDisplay();
      var subsSection = document.getElementById("dbAccountMgrSubs");
      if (subsSection) subsSection.style.display = canManageTeam() ? "block" : "none";
      var resetBtn = document.getElementById("dbResetAccountsBtn");
      if (resetBtn) resetBtn.style.display = isSessionMaster() ? "block" : "none";
      var storageMigrationPanel = document.getElementById("dbLegacyStorageMigration");
      if (storageMigrationPanel) storageMigrationPanel.style.display = isSessionMaster() ? "flex" : "none";
      var storageMigrationBtn = document.getElementById("dbMigrateStorageAssetsBtn");
      if (storageMigrationBtn && !storageMigrationBtn.dataset.bound) {
        storageMigrationBtn.dataset.bound = "1";
        storageMigrationBtn.addEventListener("click", async function() {
          if (!isSessionMaster()) return;
          if (!confirm("开始迁移旧 OCR 模型、图片、文档和粘贴文件到 Supabase 私有 Storage？\\n\\n原始文件备份会保留，不会删除。")) return;
          var status = document.getElementById("dbStorageMigrationStatus");
          storageMigrationBtn.disabled = true;
          storageMigrationBtn.textContent = "迁移中...";
          if (status) status.textContent = "正在准备私有存储空间...";
          var cursor = 0;
          var migratedTotal = 0;
          var totalAssets = 0;
          try {
            while (true) {
              var response = await fetch("/api/dialer/admin/migrate-storage-assets", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": "Bearer " + getSessionToken() },
                body: JSON.stringify({ cursor: cursor, limit: 3 })
              });
              var result = await response.json().catch(function() { return {}; });
              if (!response.ok || !result.success) throw new Error((result && result.error) || ("HTTP " + response.status));
              migratedTotal += Number(result.migrated || 0);
              totalAssets = Number(result.total || totalAssets || 0);
              if (status) status.textContent = "已迁移 " + migratedTotal + (totalAssets ? " / " + totalAssets : "") + " 个文件...";
              if (result.next_cursor === null || result.next_cursor === undefined) break;
              cursor = Number(result.next_cursor) || 0;
            }
            if (status) {
              status.style.color = "#07c160";
              status.textContent = "迁移完成：共迁移 " + migratedTotal + " 个文件。原始文件备份仍完整保留。";
            }
            storageMigrationBtn.textContent = "重新核对 / 补迁文件";
          } catch (e) {
            if (status) {
              status.style.color = "#e74c3c";
              status.textContent = "迁移中断：" + (e.message || "未知错误") + "。可再次点击继续，已上传文件会安全覆盖。";
            }
            storageMigrationBtn.textContent = "重试迁移";
          } finally {
            storageMigrationBtn.disabled = false;
          }
        });
      }

      // Two explicit workflows: create a group/leader, or create a member with optional leader assignment.
      var createParentSelect = document.getElementById("dbSubAccountParentInput");
      var createGroupNameInput = document.getElementById("dbSubAccountGroupNameInput");
      var assignLeaderRow = document.getElementById("dbAssignLeaderRow");
      var assignLeaderCheck = document.getElementById("dbAssignLeaderCheck");
      var createGroupBtn = document.getElementById("dbCreateGroupBtn");
      var createMemberBtn = document.getElementById("dbCreateMemberBtn");
      function syncMemberLeaderUI() {
        var show = !!(assignLeaderCheck && assignLeaderCheck.checked);
        if (createParentSelect) createParentSelect.style.display = show ? "block" : "none";
      }
      if (assignLeaderCheck) assignLeaderCheck.addEventListener("change", syncMemberLeaderUI);
      if (assignLeaderRow) assignLeaderRow.style.display = isSessionMaster() ? "flex" : "none";
      if (createParentSelect) createParentSelect.style.display = "none";

      function submitSubAccount(role, button) {
        var realName = document.getElementById("dbSubAccountRealNameInput").value.trim();
        var accountName = document.getElementById("dbSubAccountNameInput").value.trim();
        var pin = document.getElementById("dbSubAccountPinInput").value.trim();
        var groupName = createGroupNameInput ? createGroupNameInput.value.trim() : "";
        var error = document.getElementById("dbSubAccountError");
        var parentId = assignLeaderCheck && assignLeaderCheck.checked && createParentSelect ? createParentSelect.value : "";
        error.style.color = "#e74c3c";
        if (role === "manager" && !isSessionMaster()) { error.textContent = "只有主账号可以新建小组"; return; }
        if (role === "manager" && !groupName) { error.textContent = "请先填写小组名称"; return; }
        if (!realName) { error.textContent = role === "manager" ? "请输入组长真实姓名" : "请输入组员真实姓名"; return; }
        if (!accountName) { error.textContent = "请输入登录账户名"; return; }
        if (pin.length < 4 || pin.length > 6 || !/^\\d+$/.test(pin)) { error.textContent = "PIN 必须为 4-6 位数字"; return; }
        if (role === "member" && assignLeaderCheck && assignLeaderCheck.checked && !parentId) { error.textContent = "请选择要归属的小组长"; return; }
        if (role === "member" && !parentId) parentId = getSessionAccountId();
        button.disabled = true;
        var originalText = button.textContent;
        button.textContent = "创建中...";
        fetch("/api/dialer/auth/accounts", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": "Bearer " + getSessionToken() },
          body: JSON.stringify({ account_name: accountName, real_name: realName, pin: pin, label: accountName, role: role, group_name: role === "manager" ? groupName : "", parent_account_id: role === "manager" ? getSessionAccountId() : parentId })
        })
        .then(function(r) { return r.json().catch(function() { throw new Error("服务器返回了无法识别的数据（HTTP " + r.status + "）"); }); })
        .then(function(res) {
          if (!res || !res.success) throw new Error((res && res.error) || "创建失败");
          document.getElementById("dbSubAccountRealNameInput").value = "";
          document.getElementById("dbSubAccountNameInput").value = "";
          document.getElementById("dbSubAccountPinInput").value = "";
          if (createGroupNameInput) createGroupNameInput.value = "";
          error.style.color = "#07c160";
          error.textContent = role === "manager" ? "小组创建成功，组长账号已建立" : "组员账号创建成功";
          loadSubAccounts();
          loadAccountStats();
        })
        .catch(function(e) { error.style.color = "#e74c3c"; error.textContent = e.message || "创建失败"; })
        .finally(function() { button.disabled = false; button.textContent = originalText; });
      }
      if (createGroupBtn) createGroupBtn.addEventListener("click", function() { submitSubAccount("manager", createGroupBtn); });
      if (createMemberBtn) createMemberBtn.addEventListener("click", function() { submitSubAccount("member", createMemberBtn); });

      // Change PIN
      var changePinBtn = document.getElementById("dbChangePinBtn");
      if (changePinBtn) {
        changePinBtn.addEventListener("click", function() {
          var oldPin = document.getElementById("dbChangePinOld").value.trim();
          var newPin = document.getElementById("dbChangePinNew").value.trim();
          var error = document.getElementById("dbChangePinError");
          error.style.color = "#e74c3c";
          if (!oldPin) { error.textContent = "请输入当前 PIN"; return; }
          if (newPin.length < 4) { error.textContent = "新 PIN 至少 4 位"; return; }
          changePinBtn.disabled = true; changePinBtn.textContent = "修改中...";
          fetch("/api/dialer/auth/change-pin", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ old_pin: oldPin, new_pin: newPin }) })
          .then(function(r) { return r.json(); })
          .then(function(res) {
            if (res.success) { error.style.color = "#07c160"; error.textContent = "PIN 修改成功"; document.getElementById("dbChangePinOld").value = ""; document.getElementById("dbChangePinNew").value = ""; setTimeout(function() { error.textContent = ""; error.style.color = "#e74c3c"; }, 3000); }
            else { error.textContent = res.error || "修改失败"; }
          })
          .catch(function() { error.textContent = "网络错误"; })
          .finally(function() { changePinBtn.disabled = false; changePinBtn.textContent = "修改"; });
        });
      }

      // Logout
      var logoutBtn = document.getElementById("dbLogoutBtn");
      if (logoutBtn) { logoutBtn.addEventListener("click", function() { clearSession(); location.reload(); }); }

      // Reset
      var resetBtn2 = document.getElementById("dbResetAccountsBtn");
      if (resetBtn2) {
        resetBtn2.addEventListener("click", function() {
          if (!confirm("确定要删除所有账户数据吗？此操作不可撤销。")) return;
          resetBtn2.disabled = true; resetBtn2.textContent = "重置中...";
          fetch("/api/dialer/auth/reset", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ turnstileToken: window._tsToken || "" }) })
          .then(function(r) { return r.json(); })
          .then(function() { clearSession(); location.reload(); })
          .catch(function() { document.getElementById("dbResetAccountsError").textContent = "重置失败"; })
          .finally(function() { resetBtn2.disabled = false; resetBtn2.textContent = "重置所有账户"; });
        });
      }
    }

    function initBackupMgrPanel() {
      // Save email config
      var saveConfigBtn = document.getElementById('dbSaveEmailConfigBtn');
      if (saveConfigBtn) {
        saveConfigBtn.addEventListener('click', function() {
          var key = document.getElementById('dbResendApiKey').value.trim();
          var fromEmail = document.getElementById('dbBackupFromEmail').value.trim();
          var backupEmail = document.getElementById('dbBackupEmail').value.trim();
          var status = document.getElementById('dbEmailConfigStatus');
          // Key 与发送者邮箱可留空：已配置 Worker 环境变量（RESEND_API_KEY / BHP_FROM_EMAIL）时无需填写
          if (!key && !fromEmail && !_backupHasKey) { status.textContent = '请填写发送者邮箱或 Resend API Key（或已在 Worker 环境变量配置）'; status.style.color = '#e74c3c'; return; }
          if (key && key.indexOf('re_') !== 0) { status.textContent = 'Resend API Key 格式不正确（应为 re_ 开头）'; status.style.color = '#e74c3c'; return; }
          saveConfigBtn.disabled = true; saveConfigBtn.textContent = '保存中...';
          var token = getSessionToken();
          fetch('/api/dialer/stats/email-config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
            body: JSON.stringify({ resendApiKey: key || undefined, backupFromEmail: fromEmail || undefined, backupTargetEmail: backupEmail || undefined, saveOnly: true })
          })
          .then(function(r) { return r.json(); })
          .then(function(res) {
            if (res.success) {
              status.textContent = '配置已保存';
              status.style.color = '#07c160';
              document.getElementById('dbResendApiKey').value = '';
              setTimeout(function() { status.textContent = ''; }, 3000);
            } else {
              status.textContent = res.error || '保存失败';
              status.style.color = '#e74c3c';
            }
          })
          .catch(function() { status.textContent = '网络错误'; status.style.color = '#e74c3c'; })
          .finally(function() { saveConfigBtn.disabled = false; saveConfigBtn.textContent = '保存配置'; });
        });
      }

      // Send backup
      var sendBtn = document.getElementById('dbSendBackupBtn');
      if (sendBtn) {
        sendBtn.addEventListener('click', function() {
          var email = document.getElementById('dbBackupEmail').value.trim();
          var status = document.getElementById('dbBackupStatus');
          // 接收邮箱可留空：已配置 Worker 环境变量 BACKUP_TARGET_EMAIL 时直接使用
          if (email && email.indexOf('@') === -1) { status.textContent = '邮箱格式不正确'; status.style.color = '#e74c3c'; return; }
          sendBtn.disabled = true; sendBtn.textContent = '正在导出并发送...';
          status.style.color = 'var(--text-light)';
          status.textContent = '正在从数据库导出全部客户数据，请稍候...';
          var token = getSessionToken();
          fetch('/api/dialer/stats/export-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
            body: JSON.stringify({ email: email || undefined })
          })
          .then(function(r) { return r.json(); })
          .then(function(res) {
            if (res.success) {
              status.style.color = '#07c160';
              status.textContent = '备份邮件已发送至 ' + (res.email || email) + '！共 ' + res.count + ' 条记录。请查收附件。';
              document.getElementById('dbBackupEmail').value = '';
            } else {
              status.style.color = '#e74c3c';
              status.textContent = res.error || '发送失败';
            }
          })
          .catch(function() { status.textContent = '网络错误，请重试'; status.style.color = '#e74c3c'; })
          .finally(function() { sendBtn.disabled = false; sendBtn.textContent = '发送备份'; });
        });
      }

      // Test email: 只带 1 条客户数据，验证邮件通道
      var testBtn = document.getElementById('dbTestBackupBtn');
      if (testBtn) {
        testBtn.addEventListener('click', function() {
          var email = document.getElementById('dbBackupEmail').value.trim();
          var status = document.getElementById('dbBackupStatus');
          if (email && email.indexOf('@') === -1) { status.textContent = '邮箱格式不正确'; status.style.color = '#e74c3c'; return; }
          testBtn.disabled = true; testBtn.textContent = '测试中...';
          status.style.color = 'var(--text-light)';
          status.textContent = '正在发送测试邮件（1条客户数据）...';
          var token = getSessionToken();
          fetch('/api/dialer/stats/backup-test', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
            body: JSON.stringify({ email: email || undefined })
          })
          .then(function(r) { return r.json(); })
          .then(function(res) {
            if (res.success) {
              status.style.color = '#07c160';
              status.textContent = '测试邮件已发送至 ' + res.email + '！请查收（附件含' + (res.sample ? '1条客户数据' : '测试说明，暂无客户数据') + '）。';
            } else {
              status.style.color = '#e74c3c';
              status.textContent = res.error || '发送失败';
            }
          })
          .catch(function() { status.textContent = '网络错误，请重试'; status.style.color = '#e74c3c'; })
          .finally(function() { testBtn.disabled = false; testBtn.textContent = '测试邮件（1条客户数据）'; });
        });
      }

      // Master-only visibility
      var backupSection = document.getElementById('dbBackupMgrPanel');
      if (backupSection && !isSessionMaster()) {
        backupSection.querySelectorAll('input,button').forEach(function(el) { el.disabled = true; });
      }
    }

    var _backupHasKey = false; // 环境变量或已保存的 Resend Key 是否可用
    function loadBackupConfig() {
      var token = getSessionToken();
      if (!token) return;
      fetch('/api/dialer/stats/email-config', { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token } })
        .then(function(r) { return r.json(); })
        .then(function(res) {
          _backupHasKey = !!res.hasKey;
          var status = document.getElementById('dbEmailConfigStatus');
          if (status) {
            if (res.hasKey) { status.textContent = '已配置 Resend API Key'; status.style.color = '#07c160'; }
            else { status.textContent = '尚未配置'; status.style.color = 'var(--text-light)'; }
          }
          // 只读回显环境变量/已保存配置，前端无需手动填写
          if (res.fromEmail) {
            var fromInput = document.getElementById('dbBackupFromEmail');
            if (fromInput) { fromInput.value = res.fromEmail; fromInput.readOnly = true; }
          }
          if (res.targetEmail) {
            var emailInput = document.getElementById('dbBackupEmail');
            if (emailInput) { emailInput.value = res.targetEmail; emailInput.readOnly = true; }
          }
          var keyInput = document.getElementById('dbResendApiKey');
          if (keyInput) {
            keyInput.placeholder = res.hasKey ? '已通过环境变量配置，无需填写' : 're_xxxxxxxx';
          }
        })
        .catch(function() {});
    }

    // Content config loading (called when tab opened)
    function loadContentConfig() {
      var panel = document.getElementById('dbContentConfigPanel');
      if (!panel) return;
      // Master-only check
      if (!isSessionMaster()) {
        panel.querySelectorAll('input,textarea,button').forEach(function(el) { el.disabled = true; });
        return;
      }
      // Load reminder config
      fetch('/api/dialer/config?key=reminder')
        .then(function(r) { return r.json(); })
        .then(function(res) {
          if (res && res.title !== undefined) {
            document.getElementById('cfgReminderTitle').value = res.title || '';
            renderReminderItemInputs(res.items || []);
          }
        }).catch(function() {});
      // Load learn config
      fetch('/api/dialer/config?key=learn')
        .then(function(r) { return r.json(); })
        .then(function(res) {
          if (res && res.title !== undefined) {
            document.getElementById('cfgLearnTitle').value = res.title || '';
            document.getElementById('cfgLearnSubtitle').value = res.subtitle || '';
            document.getElementById('cfgLearnHtml').value = res.html || '';
          }
        }).catch(function() {});
    }

    function formatUploadTime(ts) {
      var d = new Date(Number(ts));
      if (isNaN(d.getTime())) return '';
      function p(n) { return (n < 10 ? '0' : '') + n; }
      return p(d.getMonth() + 1) + '-' + p(d.getDate()) + ' ' + p(d.getHours()) + ':' + p(d.getMinutes());
    }

    // 最近一次加载的记录，供「复制」按钮使用
    var _ulLast = null;
    function loadUploadLog(scope) {
      var panel = document.getElementById('dbUploadLogPanel');
      if (!panel) return;
      scope = scope || 'day';
      // 作用域按钮高亮：当前选中的为绿色实底
      var btns = panel.querySelectorAll('button[data-scope]');
      btns.forEach(function(b) {
        var active = b.getAttribute('data-scope') === scope;
        b.style.background = active ? '#07c160' : 'var(--btn-bg)';
        b.style.color = active ? '#fff' : 'var(--text-soft)';
      });
      var listEl = document.getElementById('ulList');
      var summaryEl = document.getElementById('ulSummary');
      if (!listEl || !summaryEl) return;
      listEl.innerHTML = '<div style="padding:14px; text-align:center; font-size:0.7rem; color:var(--text-sub);">加载中…</div>';
      summaryEl.textContent = '';
      fetch('/api/dialer/stats/upload-records?scope=' + encodeURIComponent(scope))
        .then(function(r) { return r.json(); })
        .then(function(res) {
          var records = (res && res.records) || [];
          if (!records.length) {
            listEl.innerHTML = '<div style="padding:14px; text-align:center; font-size:0.7rem; color:var(--text-sub);">暂无上传/添加记录</div>';
            summaryEl.textContent = '';
            _ulLast = null;
            return;
          }
          summaryEl.textContent = '共 ' + records.length + ' 次上传/添加/换批，合计 ' + (res.total_count || 0) + ' 条客户';
          _ulLast = { scope: scope, records: records, total: res.total_count || 0 };
          listEl.innerHTML = '';
          records.forEach(function(rec) {
            var row = document.createElement('div');
            row.style.cssText = 'display:flex; align-items:center; gap:8px; padding:9px 10px; background:var(--card-bg); border:0.5px solid var(--card-border); border-radius:var(--radius-sm);';
            // 类型标签（换一批为拉取动作，橙色区分上传类）
            var tag = document.createElement('span');
            var tagTxt = '上传';
            var tagBg = 'rgba(7,193,96,0.08)', tagFg = 'var(--accent-wechat)';
            if (rec.type === 'pull') { tagTxt = '换一批'; tagBg = 'rgba(245,124,0,0.1)'; tagFg = '#e67e22'; }
            else if (rec.batch_label === '手动录入') tagTxt = '手动添加';
            else if (rec.batch_label && rec.batch_label.indexOf('批量导入') === 0) tagTxt = '批量导入';
            tag.textContent = tagTxt;
            tag.style.cssText = 'flex:none; font-size:0.6rem; padding:2px 7px; border-radius:var(--radius-xs); background:' + tagBg + '; color:' + tagFg + '; font-weight:600;';
            // 账号名 + 时间
            var mid = document.createElement('div');
            mid.style.cssText = 'flex:1; min-width:0;';
            var nameEl = document.createElement('div');
            nameEl.textContent = rec.account_name || rec.account_id || '未知账号';
            nameEl.style.cssText = 'font-size:0.72rem; color:var(--text-main); font-weight:500; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;';
            var timeEl = document.createElement('div');
            timeEl.textContent = formatUploadTime(rec.created_at);
            timeEl.style.cssText = 'font-size:0.6rem; color:var(--text-sub); margin-top:1px;';
            mid.appendChild(nameEl);
            mid.appendChild(timeEl);
            // 数量
            var cnt = document.createElement('span');
            cnt.textContent = '+' + rec.count;
            cnt.style.cssText = 'flex:none; font-size:0.78rem; font-weight:700; color:var(--accent-wechat);';
            row.appendChild(tag);
            row.appendChild(mid);
            row.appendChild(cnt);
            listEl.appendChild(row);
          });
        })
        .catch(function() {
          listEl.innerHTML = '<div style="padding:14px; text-align:center; font-size:0.7rem; color:var(--text-sub);">加载失败</div>';
        });
    }

    function loadMasterPullLog(scope) {
      var panel = document.getElementById('dbMasterPullLogPanel');
      var listEl = document.getElementById('mplList');
      var summaryEl = document.getElementById('mplSummary');
      if (!panel || !listEl || !summaryEl) return;
      scope = scope || 'day';
      panel.querySelectorAll('button[data-master-pull-scope]').forEach(function(b) {
        var active = b.getAttribute('data-master-pull-scope') === scope;
        b.style.background = active ? '#07c160' : 'var(--btn-bg)';
        b.style.color = active ? '#fff' : 'var(--text-soft)';
      });
      listEl.innerHTML = '<div style="padding:14px;text-align:center;color:var(--text-sub);">加载中…</div>';
      summaryEl.textContent = '';
      fetch('/api/dialer/stats/master-pull-records?scope=' + encodeURIComponent(scope))
        .then(function(r) { return r.json(); })
        .then(function(res) {
          if (res.error) throw new Error(res.error);
          var records = res.records || [];
          summaryEl.textContent = '共 ' + (res.record_count || 0) + ' 次补充，累计转入 ' + (res.total_count || 0) + ' 位客户';
          if (!records.length) {
            listEl.innerHTML = '<div style="padding:14px;text-align:center;color:var(--text-sub);">当前时间范围暂无主账号补充记录</div>';
            return;
          }
          listEl.innerHTML = '';
          records.forEach(function(rec) {
            var row = document.createElement('div');
            row.style.cssText = 'display:flex;align-items:center;gap:8px;padding:10px;background:var(--card-bg);border:0.5px solid var(--card-border);border-radius:var(--radius-sm);';
            var info = document.createElement('div');
            info.style.cssText = 'flex:1;min-width:0;';
            var title = document.createElement('div');
            title.textContent = (rec.target_account_name || rec.target_account_id || '子账号') + ' ← ' + (rec.source_account_name || '主账号');
            title.style.cssText = 'font-size:0.73rem;font-weight:700;color:var(--text-main);';
            var detail = document.createElement('div');
            var reason = rec.trigger_reason === 'empty_dialer' ? '拨号列表无可用客户' : (rec.trigger_reason === 'low_inventory_and_empty_dialer' ? '客户总量不足且拨号列表为空' : '子账号客户总量低于 600');
            detail.textContent = formatUploadTime(new Date(rec.created_at).getTime()) + ' · ' + reason + ' · 今日剩余 ' + rec.daily_remaining;
            detail.style.cssText = 'font-size:0.61rem;color:var(--text-sub);margin-top:3px;';
            info.appendChild(title);
            info.appendChild(detail);
            var count = document.createElement('span');
            count.textContent = '+' + rec.loaded_count;
            count.style.cssText = 'font-size:0.82rem;font-weight:800;color:var(--accent-wechat);';
            row.appendChild(info);
            row.appendChild(count);
            listEl.appendChild(row);
          });
        })
        .catch(function(err) {
          listEl.innerHTML = '<div style="padding:14px;text-align:center;color:#e74c3c;">加载失败：' + esc(err.message) + '</div>';
        });
    }

    function initMasterPullLogPanel() {
      var panel = document.getElementById('dbMasterPullLogPanel');
      if (!panel) return;
      panel.querySelectorAll('button[data-master-pull-scope]').forEach(function(b) {
        b.onclick = function() { loadMasterPullLog(b.getAttribute('data-master-pull-scope') || 'day'); };
      });
    }

    function initUploadLogPanel() {
      var panel = document.getElementById('dbUploadLogPanel');
      if (!panel) return;
      var btns = panel.querySelectorAll('button[data-scope]');
      btns.forEach(function(b) {
        b.onclick = function() {
          loadUploadLog(b.getAttribute('data-scope') || 'day');
        };
      });
      // 一键复制当前范围的记录为文本
      var copyBtn = document.getElementById('ulCopyBtn');
      if (copyBtn) {
        copyBtn.onclick = function() {
          var last = _ulLast;
          if (!last || !last.records || !last.records.length) {
            showCopyLimitToast('暂无可复制的记录', true);
            return;
          }
          var scopeLabel = last.scope === 'month' ? '本月' : (last.scope === 'week' ? '本周' : '当天');
          var lines = ['上传记录（' + scopeLabel + '）'];
          last.records.forEach(function(rec) {
            var tagTxt = '上传';
            if (rec.type === 'pull') tagTxt = '换一批';
            else if (rec.batch_label === '手动录入') tagTxt = '手动添加';
            else if (rec.batch_label && rec.batch_label.indexOf('批量导入') === 0) tagTxt = '批量导入';
            lines.push('[' + tagTxt + '] ' + (rec.account_name || rec.account_id || '未知账号') + ' +' + rec.count + ' ' + formatUploadTime(rec.created_at));
          });
          lines.push('共 ' + last.records.length + ' 次，合计 ' + last.total + ' 条');
          copyTextToClipboard(lines.join('\\n'));
          showCopyLimitToast('已复制 ' + last.records.length + ' 条记录');
        };
      }
    }

    function renderReminderItemInputs(items) {
      var container = document.getElementById('cfgReminderItems');
      if (!container) return;
      container.innerHTML = '';
      for (var i = 0; i < items.length; i++) {
        (function(idx, val) {
          var row = document.createElement('div');
          row.style.cssText = 'display:flex; gap:6px; align-items:center;';
          var input = document.createElement('input');
          input.type = 'text'; input.value = val; input.maxLength = 100;
          input.style.cssText = 'flex:1; height:28px; padding:0 8px; font-size:0.7rem; border:0.5px solid var(--card-border); border-radius:var(--radius-xs); background:var(--card-bg); color:var(--text-main); outline:none;';
          var delBtn = document.createElement('button');
          delBtn.textContent = '删除';
          delBtn.style.cssText = 'height:28px; padding:0 8px; font-size:0.65rem; border:none; box-shadow:var(--shadow-card); background:rgba(231,76,60,0.08); color:#e74c3c; border-radius:var(--radius-xs); cursor:pointer;';
          delBtn.onclick = function() {
            row.parentNode.removeChild(row);
          };
          row.appendChild(input);
          row.appendChild(delBtn);
          container.appendChild(row);
        })(i, items[i]);
      }
    }

    function initContentConfigPanel() {
      var panel = document.getElementById('dbContentConfigPanel');
      if (!panel) return;

      // Master-only: hide panel for non-masters (already handled in loadContentConfig via disabled)
      // But we also hide the tab for non-masters
      if (!isSessionMaster()) {
        var tab = document.querySelector('#dbOverlay .crm-tab[data-tab="contentConfig"]');
        if (tab) tab.style.display = 'none';
      }

      // Save reminder config
      var saveReminder = document.getElementById('cfgSaveReminder');
      if (saveReminder) {
        saveReminder.addEventListener('click', function() {
          var title = document.getElementById('cfgReminderTitle').value.trim() || '微信运营提醒';
          var inputs = document.querySelectorAll('#cfgReminderItems input[type="text"]');
          var items = [];
          for (var i = 0; i < inputs.length; i++) {
            var v = inputs[i].value.trim();
            if (v) items.push(v);
          }
          if (items.length === 0) {
            document.getElementById('cfgReminderStatus').textContent = '至少保留一条提醒内容';
            document.getElementById('cfgReminderStatus').style.color = '#e74c3c';
            return;
          }
          var status = document.getElementById('cfgReminderStatus');
          status.textContent = '保存中...'; status.style.color = 'var(--text-light)';
          var token = getSessionToken();
          fetch('/api/dialer/config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
            body: JSON.stringify({ key: 'reminder', data: { title: title, items: items } })
          }).then(function(r) { return r.json(); })
            .then(function(res) {
              if (res.success) {
                status.textContent = '已保存'; status.style.color = '#07c160';
                // Refresh local cache
                _reminderConfig = { title: title, items: items };
                setTimeout(function() { status.textContent = ''; }, 3000);
              } else {
                status.textContent = res.error || '保存失败'; status.style.color = '#e74c3c';
              }
            }).catch(function() { status.textContent = '网络错误'; status.style.color = '#e74c3c'; });
        });
      }

      // Add reminder item
      var addItemBtn = document.getElementById('cfgReminderAddItem');
      if (addItemBtn) {
        addItemBtn.addEventListener('click', function() {
          var container = document.getElementById('cfgReminderItems');
          if (!container) return;
          var idx = container.children.length;
          var row = document.createElement('div');
          row.style.cssText = 'display:flex; gap:6px; align-items:center;';
          var input = document.createElement('input');
          input.type = 'text'; input.placeholder = '新提醒内容'; input.maxLength = 100;
          input.style.cssText = 'flex:1; height:28px; padding:0 8px; font-size:0.7rem; border:0.5px solid var(--card-border); border-radius:var(--radius-xs); background:var(--card-bg); color:var(--text-main); outline:none;';
          var delBtn = document.createElement('button');
          delBtn.textContent = '删除';
          delBtn.style.cssText = 'height:28px; padding:0 8px; font-size:0.65rem; border:none; box-shadow:var(--shadow-card); background:rgba(231,76,60,0.08); color:#e74c3c; border-radius:var(--radius-xs); cursor:pointer;';
          delBtn.onclick = function() { row.parentNode.removeChild(row); };
          row.appendChild(input);
          row.appendChild(delBtn);
          container.appendChild(row);
        });
      }

      // Save learn config
      var saveLearn = document.getElementById('cfgSaveLearn');
      if (saveLearn) {
        saveLearn.addEventListener('click', function() {
          var title = document.getElementById('cfgLearnTitle').value.trim() || '微信营销与账号运营完全手册';
          var subtitle = document.getElementById('cfgLearnSubtitle').value.trim();
          var html = document.getElementById('cfgLearnHtml').value;
          var status = document.getElementById('cfgLearnStatus');
          status.textContent = '保存中...'; status.style.color = 'var(--text-light)';
          var token = getSessionToken();
          fetch('/api/dialer/config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
            body: JSON.stringify({ key: 'learn', data: { title: title, subtitle: subtitle, html: html } })
          }).then(function(r) { return r.json(); })
            .then(function(res) {
              if (res.success) {
                status.textContent = '已保存'; status.style.color = '#07c160';
                setTimeout(function() { status.textContent = ''; }, 3000);
              } else {
                status.textContent = res.error || '保存失败'; status.style.color = '#e74c3c';
              }
            }).catch(function() { status.textContent = '网络错误'; status.style.color = '#e74c3c'; });
        });
      }

      // Reset learn config
      var resetLearn = document.getElementById('cfgResetLearn');
      if (resetLearn) {
        resetLearn.addEventListener('click', function() {
          if (confirm('确认恢复学习中心为默认内容？\\n此操作将清空自定义内容。')) {
            document.getElementById('cfgLearnHtml').value = '';
            document.getElementById('cfgLearnTitle').value = '微信营销与账号运营完全手册';
            document.getElementById('cfgLearnSubtitle').value = '加人策略 \\u00b7 账号养号 \\u00b7 朋友圈运营 \\u00b7 客户转化 \\u00b7 风控合规';
            document.getElementById('cfgLearnStatus').textContent = '已恢复默认（请点保存生效）'; document.getElementById('cfgLearnStatus').style.color = '#4a6cf7';
          }
        });
      }
    }

    // ========== Progress Drawer（左上角圆饼图 → 拉出工作进度面板） ==========
    var WECHAT_COUNT_K = 'bhp_wechat_count'; // 今日通过微信数量（手动计数，云端同步）
    var _weekWechat = 0;  // 本周通过微信（云端累计）
    var _monthWechat = 0; // 本月通过微信（云端累计）
    var _wechatWriteTs = 0; // 微信计数保护截止时刻：此前发起的云端快照视为过期（本地点击/POST 未确认时禁止回退）
    var _wechatMonotonicTs = 0; // 点击单调时间戳：同一毫秒连点两次也不会得到相同 ts（防 LWW 失效）
    function getWechatCount() {
      try {
        var raw = localStorage.getItem(WECHAT_COUNT_K);
        if (raw) { var w = JSON.parse(raw); if (w && w.date === todayLocalStr()) return w.count || 0; }
      } catch (e) {}
      return 0;
    }
    function applyWechatCount(n) {
      try { localStorage.setItem(WECHAT_COUNT_K, JSON.stringify({ date: todayLocalStr(), count: Math.max(0, n || 0) })); } catch (e) {}
    }
    // 手动 +/−：本地立即更新显示（不卡顿），异步同步云端（绝对值写入，最后一次点击为准）
    function adjustWechatCount(delta) {
      var today = todayLocalStr();
      var target = Math.max(0, getWechatCount() + delta);
      applyWechatCount(target);
      renderDrawer();
      var token = getSessionToken();
      if (!token) return;
      _wechatMonotonicTs = Math.max(Date.now(), _wechatMonotonicTs + 1); // 单调递增，防同毫秒连点 ts 相同
      _wechatWriteTs = _wechatMonotonicTs + 8000; // 点击即开启 8 秒保护窗口：期间云端旧快照不回退本地
      fetch('/api/dialer/work-stats/wechat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        body: JSON.stringify({ date: today, value: target, ts: _wechatMonotonicTs })
      }).then(function(r) { return r.json(); })
        .then(function(res) {
          if (res && res.week_count !== undefined) {
            _wechatWriteTs = Date.now() + 8000; // 云端已确认，刷新保护窗口（本地缓存读旧仍可能短暂回退）
            _weekWechat = res.week_count || 0;
            _monthWechat = res.month_count || 0;
            renderDrawer();
          }
        })
        .catch(function() { _wechatWriteTs = Infinity; }); // 同步失败：本地值为准，直到下次点击成功确认
    }
    var DRAWER_RING_C = 226.2; // 环形周长：2πr (r=36)
    var _todayDialedCustomers = 0;
    var _todayOperatedCustomers = 0;
    var _weekDialedCustomers = 0;
    var _monthDialedCustomers = 0;
    var _weekOperatedCustomers = 0;
    var _monthOperatedCustomers = 0;
    function renderDrawer() {
      var dialed = _todayDialedCustomers;
      var operated = _todayOperatedCustomers;
      // 圆环改为实际客户数展示，不再用当前导入列表计算百分比
      var dRing = document.getElementById('drawerDialedRing');
      if (dRing) dRing.style.strokeDashoffset = dialed > 0 ? '0' : DRAWER_RING_C.toFixed(1);
      var dRingT = document.getElementById('drawerDialedRingText');
      if (dRingT) dRingT.textContent = String(dialed);
      var wRing = document.getElementById('drawerWorkRing');
      if (wRing) wRing.style.strokeDashoffset = operated > 0 ? '0' : DRAWER_RING_C.toFixed(1);
      var wRingT = document.getElementById('drawerWorkRingText');
      if (wRingT) wRingT.textContent = String(operated);
      var rInfo = getRoundInfo();
      var rv = (rInfo && rInfo.count) ? rInfo.count : 1;
      var rvEl = document.getElementById('drawerRoundVal');
      if (rvEl) rvEl.textContent = '第 ' + Math.min(6, Math.max(1, rv)) + ' 轮'; // 轮数显示钳制在 1-6
      var wv = document.getElementById('drawerWechatVal');
      if (wv) wv.textContent = getWechatCount();
      var ww = document.getElementById('drawerWeekWechatVal');
      if (ww) ww.textContent = _weekWechat;
      var wm = document.getElementById('drawerMonthWechatVal');
      if (wm) wm.textContent = _monthWechat;
      var wd = document.getElementById('drawerWeekDialedVal');
      if (wd) wd.textContent = _weekDialedCustomers;
      var md = document.getElementById('drawerMonthDialedVal');
      if (md) md.textContent = _monthDialedCustomers;
      var wo = document.getElementById('drawerWeekOperatedVal');
      if (wo) wo.textContent = _weekOperatedCustomers;
      var mo = document.getElementById('drawerMonthOperatedVal');
      if (mo) mo.textContent = _monthOperatedCustomers;
    }
    function initProgressDrawer() {
      var stats = document.getElementById('headerStatsMinimal');
      var overlay = document.getElementById('progressDrawerOverlay');
      if (!stats || !overlay) return;
      stats.style.cursor = 'pointer';
      stats.title = '添加动作';
      stats.addEventListener('click', function(e) {
        e.stopPropagation();
        renderDrawer();
        fetchWorkStats(); // 打开时拉取云端最新工作数据
        // 环形进度动画：先把环置空，抽屉显示后过渡到实际值
        ['drawerDialedRing', 'drawerWorkRing'].forEach(function(id) {
          var el = document.getElementById(id);
          if (el) el.style.strokeDashoffset = '226.2';
        });
        overlay.classList.add('active');
        setTimeout(renderDrawer, 40); // 抽屉滑入时环从空过渡到实际值
      });
      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) overlay.classList.remove('active');
      });
      var privacyInfoOverlay = document.getElementById('privacyOperationInfoOverlay');
      var privacyInfoBtn = document.getElementById('privacyOperationInfo');
      function closePrivacyInfo() { if (privacyInfoOverlay) privacyInfoOverlay.style.display = 'none'; }
      if (privacyInfoBtn) privacyInfoBtn.addEventListener('click', function(e) {
        e.preventDefault(); e.stopPropagation();
        if (privacyInfoOverlay) privacyInfoOverlay.style.display = 'block';
      });
      ['privacyOperationInfoClose', 'privacyOperationInfoCloseBottom'].forEach(function(id) {
        var el = document.getElementById(id);
        if (el) el.addEventListener('click', closePrivacyInfo);
      });
      if (privacyInfoOverlay) privacyInfoOverlay.addEventListener('click', function(e) {
        if (e.target === privacyInfoOverlay) closePrivacyInfo();
      });
      var infoToggle = document.getElementById('showClientInfoToggle');
      initPrivacySchedule();
      if (infoToggle) infoToggle.addEventListener('change', function() {
        try {
          var block = privacyScheduleBlock();
          localStorage.setItem('dialer_privacy_override:' + getOrCreateAccountId(), JSON.stringify({ key: block.key, visible: !infoToggle.checked }));
        } catch (e) {}
        syncClientInfoToggle();
        renderDialCards();
      });
      var closeBtn = document.getElementById('progressDrawerClose');
      if (closeBtn) closeBtn.addEventListener('click', function() { overlay.classList.remove('active'); });
      var drawerWlListVisible = document.getElementById('drawerWhitelistListVisible');
      if (drawerWlListVisible) {
        try { drawerWlListVisible.checked = localStorage.getItem('dialer_whitelist_list_visible:' + getOrCreateAccountId()) === '1'; } catch (e) { drawerWlListVisible.checked = false; }
        drawerWlListVisible.addEventListener('change', function() {
          try { localStorage.setItem('dialer_whitelist_list_visible:' + getOrCreateAccountId(), drawerWlListVisible.checked ? '1' : '0'); } catch (e) {}
          renderDialCards();
        });
      }
      var drawerWlSearch = document.getElementById('drawerWhitelistSearch');
      if (drawerWlSearch) {
        drawerWlSearch.addEventListener('input', renderDrawerWhitelistSearch);
        drawerWlSearch.addEventListener('keydown', function(e) {
          if (e.key === 'Escape') {
            drawerWlSearch.value = '';
            renderDrawerWhitelistSearch();
            drawerWlSearch.blur();
          }
        });
      }
      var minusBtn = document.getElementById('drawerWechatMinus');
      var plusBtn = document.getElementById('drawerWechatPlus');
      if (minusBtn) minusBtn.addEventListener('click', function() { adjustWechatCount(-1); });
      if (plusBtn) plusBtn.addEventListener('click', function() { adjustWechatCount(1); });
      // 冷却期提醒弹窗：按钮关闭 + 点击遮罩关闭（关闭时停止计时并触发确认回调，仅标记不换批）
      var cdOverlay = document.getElementById('cooldownOverlay');
      var cdDismiss = document.getElementById('cooldownDismiss');
      function closeCooldownReminder() {
        var cb = window._cooldownDismissCb;
        window._cooldownDismissCb = null;
        if (window._cdRemainTimer) { clearInterval(window._cdRemainTimer); window._cdRemainTimer = null; }
        cdOverlay.classList.remove('active');
        if (cb) cb();
      }
      if (cdOverlay) cdOverlay.addEventListener('click', function(e) {
        if (e.target === cdOverlay) closeCooldownReminder();
      });
      if (cdDismiss) cdDismiss.addEventListener('click', closeCooldownReminder);
      // 实时同步：每 60 秒拉取一次云端工作数据（页面可见时）
      setInterval(function() {
        if (document.hidden) return;
        fetchWorkStats();
        refreshAccountDataCount(); // 右上角账户在库数量实时刷新
      }, 60000);
    }

    // ========== Destruct 成功证明弹窗：销毁完成后弹出（纯空白零文案，用户自知其意；点遮罩关闭） ==========
    function openDestructPanel() {
      var overlay = document.getElementById('destructOverlay');
      if (overlay) overlay.classList.remove('auth-hidden');
    }
    function closeDestructPanel() {
      var overlay = document.getElementById('destructOverlay');
      if (overlay) overlay.classList.add('auth-hidden');
    }
    function initDestructPanel() {
      var overlay = document.getElementById('destructOverlay');
      if (!overlay) return;
      overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeDestructPanel(); // 点遮罩关闭
      });
    }

    // Dynamic reminder overlay
    var _reminderConfig = null;
    function loadReminderConfig() {
      fetch('/api/dialer/config?key=reminder')
        .then(function(r) { return r.json(); })
        .then(function(res) {
          if (res && res.title !== undefined) {
            _reminderConfig = res;
          }
        }).catch(function() {});
    }

    // 轮次统计：每成功导入一批客户记一轮（按本地日期），下一轮倒计时从转出公海时刻起算（每轮随机 45-60 分钟，防微信频繁）
    var ROUND_INFO_K = 'bhp_round_info';
    // 冷却信息按「当前账号+本设备」维度隔离：同一台手机上切换账号时，各账号各走各的倒计时，
    // 避免新账号继承上个账号的冷却期（设备天然由 localStorage 隔离，服务端键已含账号+设备）
    function roundInfoKey() {
      return ROUND_INFO_K + ':' + (getSessionAccountId() || 'anon');
    }
    function todayLocalStr() {
      var d = new Date();
      return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    }
    function getRoundInfo() {
      try {
        var key = roundInfoKey();
        var raw = localStorage.getItem(key);
        if (!raw) {
          // 旧版无账号维度全局键：一次性迁移到当前账号分键并删除，防止切账号后串号
          var legacy = localStorage.getItem(ROUND_INFO_K);
          if (legacy) {
            localStorage.setItem(key, legacy);
            localStorage.removeItem(ROUND_INFO_K);
            raw = legacy;
          }
        }
        if (raw) return JSON.parse(raw);
      } catch (e) {}
      return null;
    }
    function saveRoundInfo(info) {
      try {
        localStorage.setItem(roundInfoKey(), JSON.stringify(info));
        localStorage.removeItem(ROUND_INFO_K); // 写入账号分键后清掉旧全局键
      } catch (e) {}
    }
    function recordRoundTransferred() {
      var today = todayLocalStr();
      var info = getRoundInfo() || {};
      if (info.date !== today) info = { date: today, count: 0 };
      info.count = Math.min(6, (info.count || 0) + 1); // 今日轮数最多 6 轮（微信每日添加上限），大批次分批操作也能正确累计
      // 每轮冷却随机（防微信频繁）：新号模式 20-30 分钟，普通模式 45-60 分钟
      info.cooldownMs = isNewMode()
        ? 20 * 60 * 1000 + Math.floor(Math.random() * 10 * 60 * 1000)
        : 45 * 60 * 1000 + Math.floor(Math.random() * 15 * 60 * 1000);
      info.transferTs = Date.now();
      saveRoundInfo(info); // 先乐观更新本地，弹窗立即显示
      // 同步到 Supabase（绝对值上报 + max 合并）：失败/并发都不会丢轮次
      var token = getSessionToken();
      if (!token) return;
      var getTs = Date.now(); // 快照时刻：其后发生的本地微信计数点击不会出现在此响应中
      fetch('/api/dialer/work-stats/rounds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        body: JSON.stringify({ date: today, value: info.count, transferTs: info.transferTs, cooldownMs: info.cooldownMs, device_id: getDeviceId() })
      }).then(function(r) { return r.json(); })
        .then(function(res) {
          if (res && res.rounds !== undefined) {
            var cur = getRoundInfo() || {};
            var curCount = (cur.date === today) ? (cur.count || 0) : 0;
            var curTs = (cur.date === today) ? (cur.transferTs || 0) : 0;
            var cloudTs = res.transfer_ts || 0;
            // 冷却时长跟随最新一次转公海时刻：云端 ts 更新时取云端，否则保留本地随机值
            var cd = (cloudTs >= curTs && res.cooldown_ms) ? res.cooldown_ms : (cur.cooldownMs || 0);
            saveRoundInfo({ date: today, count: Math.min(6, Math.max(curCount, res.rounds)), transferTs: Math.max(curTs, cloudTs), cooldownMs: cd });
            if (getTs >= _wechatWriteTs) applyWechatCount(res.wechat_count); // 快照不旧于本地最后一次点击才覆盖
            renderRoundInfo();
            renderDrawer();
          }
        })
        .catch(function() {});
    }
    // 拉取云端工作数据（Supabase，按账号+日期），成功后覆盖本地缓存
    function fetchWorkStats() {
      var today = todayLocalStr();
      var token = getSessionToken();
      if (!token) return;
      var getTs = Date.now(); // 快照时刻：其后发生的本地微信计数点击不会出现在此响应中
      fetch('/api/dialer/work-stats?date=' + encodeURIComponent(today) + '&device_id=' + encodeURIComponent(getDeviceId()), {
        headers: { 'Authorization': 'Bearer ' + token }
      }).then(function(r) { return r.json(); })
        .then(function(res) {
          if (res && res.rounds !== undefined) {
            // 轮数取 max 合并（本地已完成的轮次不会被云端旧值覆盖），微信计数快照不旧于本地最后一次点击才覆盖
            var cur = getRoundInfo() || {};
            var curCount = (cur.date === today) ? (cur.count || 0) : 0;
            var curTs = (cur.date === today) ? (cur.transferTs || 0) : 0;
            var cloudTs = res.transfer_ts || 0;
            // 冷却时长跟随最新一次转公海时刻：云端 ts 更新时取云端，否则保留本地随机值
            var cd = (cloudTs >= curTs && res.cooldown_ms) ? res.cooldown_ms : (cur.cooldownMs || 0);
            saveRoundInfo({ date: today, count: Math.min(6, Math.max(curCount, res.rounds)), transferTs: Math.max(curTs, cloudTs), cooldownMs: cd });
            if (getTs >= _wechatWriteTs) applyWechatCount(res.wechat_count);
            _weekWechat = res.week_count || 0;
            _monthWechat = res.month_count || 0;
            _todayOperatedCustomers = res.operated_count || 0;
            _todayDialedCustomers = res.dialed_count || 0;
            _weekOperatedCustomers = res.week_operated_count || 0;
            _monthOperatedCustomers = res.month_operated_count || 0;
            _weekDialedCustomers = res.week_dialed_count || 0;
            _monthDialedCustomers = res.month_dialed_count || 0;
            renderRoundInfo();
            renderDrawer();
          }
        })
        .catch(function() {});
    }
    function formatRoundCountdown(ms) {
      var totalSec = Math.ceil(ms / 1000);
      var m = Math.floor(totalSec / 60);
      var s = totalSec % 60;
      return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
    }
    // 本轮冷却时长：普通模式每轮随机 45-60 分钟 / 新号模式 20-30 分钟；旧数据（无 cooldownMs）兜底 30 分钟。
    // 防御：云端合并可能带回历史脏值（几十秒），读取时统一钳制到 ≥15 分钟（新号模式最小 20 分钟不被误伤）
    function getRoundCooldownMs(info) {
      var cd = (info && info.cooldownMs) ? info.cooldownMs : 30 * 60 * 1000;
      return cd >= 15 * 60 * 1000 ? cd : 15 * 60 * 1000;
    }
    function renderRoundInfo() {
      var numEl = document.getElementById('reminderRoundNum');
      var cdEl = document.getElementById('reminderRoundCd');
      if (!numEl || !cdEl) return;
      var info = getRoundInfo();
      var rn = (info && info.count) ? info.count : 1;
      numEl.textContent = Math.min(6, Math.max(1, rn)); // 轮数显示钳制在 1-6
      var remainMs = (info && info.transferTs) ? Math.max(0, info.transferTs + getRoundCooldownMs(info) - Date.now()) : 0;
      cdEl.textContent = formatRoundCountdown(remainMs);
      renderHeaderRoundCd(); // 头部小倒计时同步
    }
    // 头部「距离下轮添加」小倒计时：有冷却期（转出公海后 45-60 分钟内）时显示并每秒刷新，走完自动隐藏并停止计时
    function renderHeaderRoundCd() {
      var el = document.getElementById('headerRoundCd');
      if (!el) return;
      var info = getRoundInfo();
      var remainMs = (info && info.transferTs) ? Math.max(0, info.transferTs + getRoundCooldownMs(info) - Date.now()) : 0;
      if (remainMs <= 0) {
        el.style.display = 'none';
        if (window._headerCdTimer) { clearInterval(window._headerCdTimer); window._headerCdTimer = null; }
        return;
      }
      el.style.display = '';
      el.textContent = formatRoundCountdown(remainMs);
      if (!window._headerCdTimer) {
        window._headerCdTimer = setInterval(renderHeaderRoundCd, 1000);
      }
    }

    // 冷却期提醒弹窗：每秒刷新剩余倒计时，走完自动关闭；onDismiss 在用户关闭弹窗时回调（仅标记已确认，不自动换批）
    window._cdRemainTimer = null;
    window._cooldownConfirmed = false; // 已确认过冷却期提醒：本次会话内不再弹出
    window._cooldownDismissCb = null;
    function showCooldownReminder(remainMs, onDismiss) {
      var overlay = document.getElementById('cooldownOverlay');
      var remainEl = document.getElementById('cooldownRemain');
      if (!overlay || !remainEl) return false; // 弹窗不可用时告知调用方（仅提醒不拦截，直接放行）
      window._cooldownDismissCb = onDismiss || null;
      remainEl.textContent = formatRoundCountdown(remainMs);
      overlay.classList.add('active');
      if (window._cdRemainTimer) clearInterval(window._cdRemainTimer);
      window._cdRemainTimer = setInterval(function() {
        var info = getRoundInfo();
        var rm = (info && info.transferTs) ? Math.max(0, info.transferTs + getRoundCooldownMs(info) - Date.now()) : 0;
        remainEl.textContent = formatRoundCountdown(rm);
        if (rm <= 0) {
          clearInterval(window._cdRemainTimer);
          window._cdRemainTimer = null;
          window._cooldownDismissCb = null; // 冷却自然走完：不触发确认回调
          overlay.classList.remove('active');
        }
      }, 1000);
      return true;
    }

    function showReminderOverlay() {
      var overlay = document.getElementById('reminderOverlay');
      var countdownEl = document.getElementById('reminderCountdown');
      if (!overlay || !countdownEl) return;
      // Update title
      var titleEl = overlay.querySelector('.reminder-title');
      if (titleEl && _reminderConfig && _reminderConfig.title) {
        titleEl.textContent = _reminderConfig.title;
      }
      // Update list items
      var listEl = overlay.querySelector('.reminder-list');
      if (listEl && _reminderConfig && _reminderConfig.items && _reminderConfig.items.length > 0) {
        var itemsHtml = '';
        for (var i = 0; i < _reminderConfig.items.length; i++) {
          itemsHtml += '<li class="reminder-item"><span class="reminder-num">' + (i + 1) + '</span>' + escHtml(_reminderConfig.items[i]) + '</li>';
        }
        listEl.innerHTML = itemsHtml;
      }
      // 新号模式：提醒文案冷却时长对齐（20-30 分钟）
      if (isNewMode() && listEl) {
        var firstItem = listEl.querySelector('li');
        if (firstItem) firstItem.innerHTML = firstItem.innerHTML.replace('30-50分钟', '20-30分钟');
      }
      overlay.classList.add('active');
      // 弹窗倒计时显示本轮真实剩余冷却（45-60 分钟随机，弹窗在转公海后立即弹出，即整段冷却）
      var info = getRoundInfo();
      var remainMs = (info && info.transferTs) ? Math.max(0, info.transferTs + getRoundCooldownMs(info) - Date.now()) : 0;
      var total = Math.max(30, Math.ceil(remainMs / 1000));
      var remaining = total;
      function updateCountdown() {
        renderRoundInfo(); // 每秒刷新轮次倒计时
        var min = Math.floor(remaining / 60);
        var sec = remaining % 60;
        countdownEl.textContent = String(min).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
        if (remaining <= 30) countdownEl.classList.add('urgent');
        if (remaining <= 0) {
          clearInterval(window._reminderTimer);
          window._reminderTimer = null;
          overlay.classList.remove('active');
          _reminderShown = false; // 允许下一轮再次触发提醒
          _pendingReminderClient = null;
        }
        remaining--;
      }
      updateCountdown();
      window._reminderTimer = setInterval(updateCountdown, 1000);
    }

    function escHtml(str) {
      return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function loadDeviceSessions() {
      var list=document.getElementById('dbDeviceList'), count=document.getElementById('dbDeviceOnlineCount');
      if(!list || !isSessionMaster()) return;
      var btn=document.getElementById('dbDeviceRefreshBtn'); if(btn) btn.disabled=true;
      fetch('/api/dialer/auth/devices',{headers:{'Authorization':'Bearer '+getSessionToken()},cache:'no-store'})
        .then(function(r){return r.json();}).then(function(res){
          if(!res.success) throw new Error(res.error||'设备列表加载失败');
          var devices=res.devices||[], summary=document.getElementById('dbDeviceAccountSummary');
          if(count) count.textContent='在线 '+(res.online_count||0)+' 台 · 记录 '+devices.length+' 台';
          if(summary) summary.innerHTML=(res.accounts||[]).map(function(a){return '<div style="display:flex;justify-content:space-between;gap:8px;padding:5px 7px;background:var(--btn-bg);border-radius:4px;font-size:.61rem;color:var(--text-main)"><span>'+escHtml(a.real_name||a.account_name)+'</span><span>'+a.online_count+' / '+a.max_devices+' 台在线</span></div>';}).join('');
          if(!devices.length){list.innerHTML='<div style="font-size:.66rem;color:var(--text-light);padding:8px;text-align:center;">暂无设备记录。子账号登录后会自动登记设备。</div>';return;}
          list.innerHTML=devices.map(function(d){
            var status=d.online?'<span style="color:#07a35a;font-weight:700">在线</span>':'<span style="color:var(--text-soft)">'+(d.revoked?'已强制下线':'离线')+'</span>';
            var ua=(d.user_agent||'').slice(0,180);
            var first=d.created_at?new Date(d.created_at).toLocaleString():'未知';
            var last=d.last_seen?new Date(d.last_seen).toLocaleString():'未知';
            return '<div style="padding:8px;border:0.5px solid var(--card-border);border-radius:5px;background:var(--card-bg)"><div style="display:flex;align-items:center;justify-content:space-between;gap:8px"><div style="font-size:.69rem;font-weight:800;color:var(--text-main);min-width:0">'+escHtml(d.account_name||'子账号')+' · '+escHtml(d.real_name||'')+' <span style="font-weight:500">'+status+'</span></div>'+(!d.revoked?'<button class="device-kick-btn" data-session="'+escHtml(d.session_id||'')+'" type="button" style="height:25px;padding:0 8px;border:0;border-radius:4px;background:rgba(231,76,60,.08);color:#e74c3c;font-size:.6rem;flex-shrink:0">强制下线</button>':'')+'</div><div style="font-size:.65rem;color:var(--text-main);margin-top:4px">'+escHtml(d.device_name||'未知设备')+' · '+escHtml(d.browser||'未知浏览器')+' · '+escHtml(d.device_type||'未知设备')+'</div><div style="font-size:.57rem;line-height:1.4;color:var(--text-soft);margin-top:3px;word-break:break-all">'+escHtml(ua)+'</div><div style="font-size:.57rem;color:var(--text-soft);margin-top:4px">首次登录：'+escHtml(first)+'<br>最后活跃：'+escHtml(last)+'</div></div>';
          }).join('');
          list.querySelectorAll('.device-kick-btn').forEach(function(kick){kick.addEventListener('click',function(){
            if(!confirm('确定强制该设备下线？该设备下一次请求时会被要求重新登录。')) return;
            kick.disabled=true; kick.textContent='处理中…';
            fetch('/api/dialer/auth/devices/kick',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+getSessionToken()},body:JSON.stringify({session_id:kick.dataset.session})})
              .then(function(r){return r.json();}).then(function(x){if(!x.success)throw new Error(x.error||'操作失败');loadDeviceSessions();})
              .catch(function(e){alert('强制下线失败：'+e.message);kick.disabled=false;kick.textContent='强制下线';});
          });});
        }).catch(function(e){list.innerHTML='<div style="font-size:.66rem;color:#e74c3c;padding:8px">设备列表加载失败：'+escHtml(e.message)+'</div>';})
        .finally(function(){if(btn)btn.disabled=false;});
    }

    function loadSubAccounts() {
      var list=document.getElementById('dbSubAccountList'); if(!list)return;
      var token=getSessionToken(), parentSel=document.getElementById('dbSubAccountParentInput');
      list.innerHTML='<div style="font-size:.68rem;color:var(--text-light);padding:10px;text-align:center;">正在加载账号信息…</div>';
      Promise.all([
        fetch('/api/dialer/auth/accounts',{headers:{'Authorization':'Bearer '+token},cache:'no-store'}).then(function(r){return r.json();}),
        fetch('/api/dialer/stats/accounts',{headers:{'Authorization':'Bearer '+token},cache:'no-store'}).then(function(r){return r.json();}).catch(function(){return {};}),
        fetch('/api/dialer/auth/devices',{headers:{'Authorization':'Bearer '+token},cache:'no-store'}).then(function(r){return r.json();}).catch(function(){return {};})
      ]).then(function(results){
        var res=results[0]||{}, statsRes=results[1]||{}, devicesRes=results[2]||{};
        if(res.error)throw new Error(res.error);
        var accounts=res.accounts||[], callerRole=res.caller_role||getSessionRole();
        var statsMap={},deviceMap={},deviceSessionsMap={};
        (statsRes.stats||[]).forEach(function(s){statsMap[s.account_id]=Number(s.upload_count||0);});
        (devicesRes.accounts||[]).forEach(function(d){deviceMap[d.account_id]=d;});
        (devicesRes.devices||[]).forEach(function(d){(deviceSessionsMap[d.account_id]||(deviceSessionsMap[d.account_id]=[])).push(d);});
        if(parentSel){
          parentSel.style.display='none';
          parentSel.innerHTML='<option value="'+escHtml(res.caller_account_id||'')+'">主账号默认组</option>'+accounts.filter(function(a){return a.role==='manager'&&a.active!==false;}).map(function(m){return '<option value="'+escHtml(m.account_id)+'">'+escHtml(m.group_name||m.account_name||m.label||m.account_id)+'</option>';}).join('');
        }
        var assignRow=document.getElementById('dbAssignLeaderRow');if(assignRow)assignRow.style.display=callerRole==='master'?'flex':'none';
        var shown=accounts.filter(function(a){return a.account_id!==(res.caller_account_id||getSessionAccountId());});
        if(!shown.length){list.innerHTML='<div style="font-size:.68rem;color:var(--text-light);text-align:center;padding:12px;">暂无下级账号</div>';return;}
        function render(a){
          var mgr=a.role==='manager';
          var manager=accounts.find(function(x){return x.account_id===a.parent_account_id;});
          var groupName=mgr?(a.group_name||a.account_name||'未命名小组'):(manager?(manager.group_name||manager.account_name||manager.label):'主账号默认组');
          var accountName=a.account_name||a.label||a.account_id;
          var realName=a.real_name||'未登记姓名';
          var count=statsMap[a.account_id]||0;
          var device=deviceMap[a.account_id]||{};
          var accountDevices=deviceSessionsMap[a.account_id]||[];
          var online=Number(device.online_count||0);
          var limit=Math.max(1,Math.min(20,parseInt(a.max_devices||2,10)||2));
          var statusText=a.active===false?'已禁用':(online>0?'在线 '+online+' 台':'当前离线');
          var statusColor=a.active===false?'#e67e22':(online>0?'#07a35a':'var(--text-soft)');
          var groupSelect='';
          if(!mgr&&callerRole==='master'){
            var rootId=res.caller_account_id||getSessionAccountId();
            var options='<option value="'+escHtml(rootId)+'"'+(a.parent_account_id===rootId?' selected':'')+'>主账号默认组</option>';
            accounts.filter(function(x){return x.role==='manager'&&x.active!==false;}).forEach(function(x){
              options+='<option value="'+escHtml(x.account_id)+'"'+(a.parent_account_id===x.account_id?' selected':'')+'>'+escHtml(x.group_name||x.account_name||x.label||x.account_id)+'</option>';
            });
            groupSelect='<select class="sub-group-select" data-id="'+escHtml(a.account_id)+'" aria-label="归属小组" style="width:100%;height:30px;padding:0 7px;font-size:.68rem;border:1px solid var(--card-border);border-radius:6px;background:var(--card-bg);color:var(--text-main);">'+options+'</select>';
          }
          var deviceLimit='';
          if(callerRole==='master'){
            deviceLimit='<select class="sub-max-devices" data-id="'+escHtml(a.account_id)+'" aria-label="设备限制" style="width:100%;height:30px;padding:0 7px;font-size:.68rem;border:1px solid var(--card-border);border-radius:6px;background:var(--card-bg);color:var(--text-main)">'+[1,2,3,4,5,6,8,10,15,20].map(function(n){return '<option value="'+n+'"'+(n===limit?' selected':'')+'>'+n+' 台</option>';}).join('')+'</select>';
          }else{
            deviceLimit='<div style="font-size:.72rem;font-weight:700;color:var(--text-main)">'+limit+' 台</div>';
          }
          var leader='<label style="display:flex;align-items:center;gap:5px;font-size:.68rem;font-weight:700;color:var(--text-main)"><input type="checkbox" disabled '+(mgr?'checked':'')+' style="width:15px;height:15px;accent-color:var(--accent-wechat)"> 小组长</label>';
          return '<article style="padding:11px;border:1px solid var(--card-border);border-radius:10px;background:var(--card-bg);box-shadow:var(--shadow-card);'+(a.active===false?'opacity:.65;':'')+'">'
            +'<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:9px">'
              +'<div style="min-width:0;flex:1"><div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap"><span style="font-size:.86rem;font-weight:900;color:var(--text-main);line-height:1.35;overflow-wrap:anywhere">'+escHtml(realName)+'</span><button class="sub-edit-name-btn" data-id="'+escHtml(a.account_id)+'" data-name="'+escHtml(a.real_name||'')+'" type="button" style="font-size:.6rem;padding:4px 7px;border:1px solid var(--card-border);border-radius:5px;background:var(--card-bg);color:var(--text-main)">改姓名</button><button class="sub-toggle-btn" data-id="'+escHtml(a.account_id)+'" data-active="'+(a.active?'1':'0')+'" type="button" style="font-size:.6rem;padding:4px 7px;border:1px solid '+(a.active?'rgba(231,76,60,.22)':'rgba(7,193,96,.25)')+';border-radius:5px;background:var(--card-bg);color:'+(a.active?'#e74c3c':'#07c160')+'">'+(a.active?'停用':'启用')+'</button><button class="sub-delete-btn" data-id="'+escHtml(a.account_id)+'" data-role="'+(a.role||'member')+'" type="button" style="font-size:.6rem;padding:4px 7px;border:1px solid rgba(231,76,60,.22);border-radius:5px;background:var(--card-bg);color:#e74c3c">删除</button></div>'
              +'<div style="font-size:.66rem;color:var(--text-soft);margin-top:4px">'+(mgr?'小组长账号':'组员账号')+' · '+(a.active===false?'已停用':'正常')+'</div></div>'
              +'<span style="flex-shrink:0;padding:3px 7px;border-radius:20px;background:'+(online>0?'rgba(7,193,96,.10)':'var(--btn-bg)')+';color:'+statusColor+';font-size:.62rem;font-weight:800">'+escHtml(statusText)+'</span>'
            +'</div>'
            +'<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px">'
              +'<div style="padding:7px 8px;border-radius:7px;background:var(--btn-bg);min-width:0"><div style="font-size:.58rem;color:var(--text-soft);margin-bottom:3px">账号名</div><div style="font-size:.72rem;font-weight:750;color:var(--text-main);overflow-wrap:anywhere">'+escHtml(accountName)+'</div></div>'
              +'<div style="padding:7px 8px;border-radius:7px;background:var(--btn-bg)"><div style="font-size:.58rem;color:var(--text-soft);margin-bottom:3px">PIN</div><div style="font-size:.7rem;font-weight:750;color:var(--text-main)">•••• · 已加密</div></div>'
              +'<div style="padding:7px 8px;border-radius:7px;background:var(--btn-bg);min-width:0"><div style="font-size:.58rem;color:var(--text-soft);margin-bottom:3px">归属小组</div>'+(groupSelect||'<div style="font-size:.72rem;font-weight:750;color:var(--text-main);overflow-wrap:anywhere">'+escHtml(groupName)+'</div>')+'</div>'
              +'<div style="padding:7px 8px;border-radius:7px;background:var(--btn-bg)"><div style="font-size:.58rem;color:var(--text-soft);margin-bottom:3px">小组长</div>'+leader+'</div>'
              +'<div style="padding:7px 8px;border-radius:7px;background:var(--btn-bg)"><div style="font-size:.58rem;color:var(--text-soft);margin-bottom:3px">账号数据量</div><div style="font-size:.82rem;font-weight:900;color:var(--accent-wechat)">'+count.toLocaleString()+' <span style="font-size:.58rem;font-weight:600;color:var(--text-soft)">条上传数据</span></div></div>'
              +'<div style="padding:7px 8px;border-radius:7px;background:var(--btn-bg)"><div style="font-size:.58rem;color:var(--text-soft);margin-bottom:3px">设备限制</div>'+deviceLimit+'</div>'
            +'</div>'
            +'<div style="display:flex;align-items:center;gap:6px;margin-top:9px;padding-top:8px;border-top:1px solid var(--card-border)">'
              +'<div style="font-size:.63rem;color:'+statusColor+';font-weight:750">设备状态：'+escHtml(statusText)+' <span style="color:var(--text-soft);font-weight:500">/ 上限 '+limit+' 台</span></div>'
            +'</div>'
            +(callerRole==='master'?'<details style="margin-top:9px;border-top:1px solid var(--card-border);padding-top:8px"><summary style="cursor:pointer;list-style:none;font-size:.68rem;font-weight:800;color:var(--text-main);display:flex;justify-content:space-between;gap:8px"><span>设备详情 · '+accountDevices.length+' 台记录</span><span style="color:var(--text-soft);font-weight:600">查看 / 收起</span></summary><div style="display:flex;flex-direction:column;gap:6px;margin-top:8px">'+(accountDevices.length?accountDevices.map(function(d){var deviceStatus=d.online?'<span style="color:#07a35a;font-weight:800">在线</span>':'<span style="color:var(--text-soft)">'+(d.revoked?'已强制下线':'离线')+'</span>';var last=d.last_seen?new Date(d.last_seen).toLocaleString():'未知';return '<div style="padding:8px;border:1px solid var(--card-border);border-radius:7px;background:var(--btn-bg)"><div style="display:flex;align-items:center;justify-content:space-between;gap:8px"><div style="font-size:.68rem;font-weight:800;color:var(--text-main);min-width:0;overflow-wrap:anywhere">'+escHtml(d.device_name||'未知设备')+' · '+deviceStatus+'</div>'+(!d.revoked?'<button class="device-kick-btn" data-session="'+escHtml(d.session_id||'')+'" type="button" style="height:26px;padding:0 8px;border:0;border-radius:5px;background:rgba(231,76,60,.09);color:#e74c3c;font-size:.61rem;flex-shrink:0">强制下线</button>':'')+'</div><div style="font-size:.63rem;color:var(--text-main);margin-top:4px">'+escHtml(d.browser||'未知浏览器')+' · '+escHtml(d.device_type||'未知设备')+'</div><div style="font-size:.59rem;color:var(--text-soft);margin-top:4px">最后活跃：'+escHtml(last)+'</div></div>';}).join(''):'<div style="font-size:.64rem;color:var(--text-soft);padding:7px 2px">暂无设备记录，子账号登录后会自动登记。</div>')+'</div></details>':'')+'</article>';
        }
        var managers=shown.filter(function(a){return a.role==='manager';}),members=shown.filter(function(a){return a.role!=='manager';});
        list.innerHTML=(managers.length?'<div style="font-size:.7rem;font-weight:900;padding:4px 2px;color:var(--text-main)">小组长 / 小组</div>'+managers.map(render).join(''):'')+(members.length?'<div style="font-size:.7rem;font-weight:900;padding:7px 2px 4px;color:var(--text-main)">组员账号</div>'+members.map(render).join(''):'');
        list.querySelectorAll('.sub-edit-name-btn').forEach(function(btn){btn.addEventListener('click',function(){var next=prompt('登记真实姓名',btn.dataset.name||'');if(next===null)return;next=next.trim();if(!next){alert('姓名不能为空');return;}fetch('/api/dialer/auth/accounts',{method:'PATCH',headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},body:JSON.stringify({target_account_id:btn.dataset.id,real_name:next})}).then(function(r){return r.json();}).then(function(x){if(!x.success)throw new Error(x.error);loadSubAccounts();}).catch(function(e){alert(e.message);});});});
        list.querySelectorAll('.sub-max-devices').forEach(function(sel){sel.addEventListener('change',function(){var nextLimit=parseInt(sel.value,10);sel.disabled=true;fetch('/api/dialer/auth/accounts',{method:'PATCH',headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},body:JSON.stringify({target_account_id:sel.dataset.id,max_devices:nextLimit})}).then(function(r){return r.json();}).then(function(x){if(!x.success)throw new Error(x.error||'设备上限设置失败');loadSubAccounts();}).catch(function(e){alert('设备上限设置失败：'+e.message);loadSubAccounts();}).finally(function(){sel.disabled=false;});});});
        list.querySelectorAll('.sub-group-select').forEach(function(sel){sel.addEventListener('change',function(){var nextParent=sel.value;sel.disabled=true;fetch('/api/dialer/auth/accounts',{method:'PATCH',headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},body:JSON.stringify({target_account_id:sel.dataset.id,parent_account_id:nextParent})}).then(function(r){return r.json();}).then(function(x){if(!x.success)throw new Error(x.error||'分组调整失败');loadSubAccounts();loadAccountStats();}).catch(function(e){alert('调整所属小组失败：'+e.message);loadSubAccounts();}).finally(function(){sel.disabled=false;});});});
        list.querySelectorAll('.sub-toggle-btn').forEach(function(btn){btn.addEventListener('click',function(){var active=btn.dataset.active==='1';btn.disabled=true;fetch('/api/dialer/auth/accounts',{method:'PATCH',headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},body:JSON.stringify({target_account_id:btn.dataset.id,active:!active})}).then(function(r){return r.json();}).then(function(x){if(!x.success)throw new Error(x.error);loadSubAccounts();loadAccountStats();}).catch(function(e){alert(e.message);btn.disabled=false;});});});
        list.querySelectorAll('.sub-delete-btn').forEach(function(btn){btn.addEventListener('click',function(){if(!confirm(btn.dataset.role==='manager'?'确定删除该小组长账号？该小组必须先清空成员。':'确定删除该普通子账号？其客户数据将迁回所属上级。'))return;btn.disabled=true;fetch('/api/dialer/auth/accounts',{method:'DELETE',headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},body:JSON.stringify({target_account_id:btn.dataset.id})}).then(function(r){return r.json();}).then(function(x){if(!x.success)throw new Error(x.error);loadSubAccounts();loadAccountStats();if(x.migrated)alert('已迁移 '+x.migrated+' 条客户数据');}).catch(function(e){alert(e.message);btn.disabled=false;});});});
        list.querySelectorAll('.device-ban-btn').forEach(function(btn){btn.addEventListener('click',function(){var willBan=btn.dataset.banned!=='1';if(!confirm(willBan?'确定禁止这台设备登录？该设备将立即退出，之后无法通过 PIN 解锁或重新登录。':'确定恢复这台设备的登录权限？该设备需要重新输入账号和 PIN 登录。'))return;btn.disabled=true;btn.textContent='处理中…';fetch('/api/dialer/auth/devices/kick',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},body:JSON.stringify({account_id:btn.dataset.account,device_id:btn.dataset.device,banned:willBan})}).then(function(r){return r.json();}).then(function(x){if(!x.success)throw new Error(x.error||'操作失败');loadSubAccounts();}).catch(function(e){alert('设备登录权限修改失败：'+e.message);btn.disabled=false;btn.textContent=willBan?'禁止设备登录':'允许设备登录';});});});
      }).catch(function(e){list.innerHTML='<div style="font-size:.68rem;color:#e74c3c;padding:8px;">加载失败：'+escHtml(e.message)+'</div>';});
    }

    // ========== Auth Flow ==========

    function initAuth() {
      var deviceRefresh=document.getElementById('dbDeviceRefreshBtn');
      if(deviceRefresh) deviceRefresh.addEventListener('click',loadDeviceSessions);
      // Turnstile 后台人机验证 — 不阻塞登录/解锁按钮，token 仅用于服务端高危接口校验
      // 未配置 TURNSTILE_SECRET 时服务端放行；配置后 token 缺失/无效则接口拒绝
      window._tsToken = '';
      window._tsCallback = function(token){ window._tsToken = token; };
      window._tsRender = function(widgetId){
        var el = document.getElementById(widgetId);
        if(el && !el.hasChildNodes() && typeof turnstile !== 'undefined'){
          try{
            turnstile.render(el,{sitekey:'0x4AAAAAAECnjVwNlyMwf-l8',callback:'_tsCallback',theme:'auto',appearance:'interaction-only'});
          }catch(e){}
        }
      };
      // 首屏无感渲染验证 widget（登录页/锁屏/首次设置共用同一隐藏容器渲染）
      window._tsRender('tsLoginWidget');
      // #db hash: skip login, show app shell for DB dashboard access (DB has its own password gate)
      if (window.location.hash === '#db') {
        showAppShell();
        return;
      }
      // 刷新页面始终要求 PIN 解锁
      // Check 12-hour session expiry (client-side, avoids unnecessary network request)
      var sessTs = parseInt(localStorage.getItem(SESS_TS_K) || '0');
      if (sessTs && (Date.now() - sessTs > 12 * 60 * 60 * 1000)) {
        clearSession();
        showAuthScreen();
        return;
      }
      var token = '';
      var aid = '';
      try {
        token = getSessionToken();
        aid = getSessionAccountId();
      } catch (storageError) {
        console.error('[auth] session storage unavailable:', storageError);
        try { clearSession(); } catch (_) {}
        showAuthScreen();
        return;
      }

      if (token && aid) {
        // Existing session: show the lock screen even if the account-verification
        // endpoint hangs. Never leave the wallpaper-only screen while waiting.
        var authSettled = false;
        var authFallback = setTimeout(function() {
          if (authSettled) return;
          authSettled = true;
          console.warn('[auth] account verification timed out; showing lock screen');
          showLockScreen();
          updateAccountDisplay();
        }, 7000);

        fetch('/api/dialer/auth/accounts', {
          headers: { 'Authorization': 'Bearer ' + token }
        })
          .then(function(r) {
            if (!r.ok) throw new Error('HTTP ' + r.status);
            return r.json();
          })
          .then(function(res) {
            if (authSettled) return;
            authSettled = true;
            clearTimeout(authFallback);
            if (res && res.accounts) {
              showLockScreen();
              updateAccountDisplay();
            } else {
              clearSession();
              showAuthScreen();
            }
          })
          .catch(function(err) {
            if (authSettled) return;
            authSettled = true;
            clearTimeout(authFallback);
            console.error('[auth] account verification failed:', err);
            showLockScreen();
            updateAccountDisplay();
          });
      } else {
        showAuthScreen();
      }
    }

    function showAppShell() {
      var initOverlay = document.getElementById('authInitOverlay');
      if (initOverlay) initOverlay.classList.add('auth-hidden');
      var appShell = document.querySelector('.app-shell');
      if (appShell) appShell.style.display = 'flex';
      document.getElementById('authLoginOverlay').classList.add('auth-hidden');
      document.getElementById('authSetupOverlay').classList.add('auth-hidden');
      document.getElementById('lockScreenOverlay').classList.add('auth-hidden');
      // Load dynamic configs
      loadReminderConfig();
      fetchWorkStats(); // 拉取云端工作数据（Supabase，按账号，实时同步）
      renderHeaderRoundCd(); // 恢复头部「距离下轮添加」倒计时（无冷却期时自动隐藏）
    }

    function showAuthScreen() {
      var initOverlay = document.getElementById('authInitOverlay');
      if (initOverlay) initOverlay.classList.add('auth-hidden');
      document.getElementById('authLoginOverlay').classList.add('auth-hidden');
      document.getElementById('authSetupOverlay').classList.add('auth-hidden');
      document.getElementById('lockScreenOverlay').classList.add('auth-hidden');
      var shell = document.querySelector('.app-shell');
      if (shell) shell.style.display = 'none';

      // Never leave the page blank while the auth-status request is pending.
      // Supabase errors or slow mobile networks must not block the login UI.
      var settled = false;
      var fallbackTimer = setTimeout(function() {
        if (settled) return;
        settled = true;
        showLoginOverlay();
        var err = document.getElementById('authLoginError');
        if (err) err.textContent = '连接服务器超时，请检查网络后刷新页面重试';
      }, 7000);

      fetch('/api/dialer/auth/status', { method: 'POST' })
        .then(function(r) {
          if (!r.ok) throw new Error('HTTP ' + r.status);
          return r.json();
        })
        .then(function(res) {
          if (settled) return;
          settled = true;
          clearTimeout(fallbackTimer);
          if (res && res.has_accounts === true) {
            showLoginOverlay();
          } else if (res && res.has_accounts === false) {
            showSetupOverlay();
          } else {
            showLoginOverlay();
            var err = document.getElementById('authLoginError');
            if (err) err.textContent = '服务器返回异常，请稍后刷新重试';
          }
        })
        .catch(function() {
          if (settled) return;
          settled = true;
          clearTimeout(fallbackTimer);
          showLoginOverlay();
          var err = document.getElementById('authLoginError');
          if (err) err.textContent = '暂时无法连接服务器，请检查网络后重试';
        });
    }

    function showLoginOverlay() {
      var initOverlay = document.getElementById('authInitOverlay');
      if (initOverlay) initOverlay.classList.add('auth-hidden');
      document.getElementById('authSetupOverlay').classList.add('auth-hidden');
      var overlay = document.getElementById('authLoginOverlay');
      overlay.classList.remove('auth-hidden');
      syncAllOverlayWallpapers();

      var accountInput = document.getElementById('authLoginAccountName');
      var pinInput = document.getElementById('authLoginPin');
      var error = document.getElementById('authLoginError');
      var loginBtn = document.getElementById('authLoginBtn');

      accountInput.value = '';
      pinInput.value = '';
      error.textContent = '';
      // Turnstile 后台验证，按钮始终可用
      loginBtn.disabled = false;
      loginBtn.textContent = '登录';

      // Safari anti-autofill: readonly + random name + remove on focus
      var r1 = 'a_' + Math.random().toString(36).substring(2, 10);
      var r2 = 'p_' + Math.random().toString(36).substring(2, 10);
      accountInput.name = r1;
      pinInput.name = r2;
      accountInput.readOnly = true;
      pinInput.readOnly = true;
      accountInput.onfocus = function() { this.removeAttribute('readonly'); };
      pinInput.onfocus = function() { this.removeAttribute('readonly'); };

      loginBtn.onclick = doLogin;
      pinInput.onkeypress = function(e) { if (e.key === 'Enter') doLogin(); };
      accountInput.onkeypress = function(e) { if (e.key === 'Enter') { pinInput.focus(); } };

    }

    // ========== Lock Screen (PIN only, keeps session) ==========


    var _wallpaperLoaded = false;

    function applyWallpaper(url) {
      var bg = 'url(' + url + ')';
      // Global wallpaper
      var globalEl = document.getElementById('globalWallpaper');
      if (globalEl) { globalEl.style.backgroundImage = bg; globalEl.classList.add('loaded'); }
      // Overlay wallpapers
      var overlayIds = ['lockWallpaper', 'loginWallpaper', 'setupWallpaper'];
      for (var oi = 0; oi < overlayIds.length; oi++) {
        var el = document.getElementById(overlayIds[oi]);
        if (el) { el.style.backgroundImage = bg; el.classList.add('loaded'); }
      }
    }

    function loadWallpaper() {
      if (_wallpaperLoaded) return;

      // 1. 先从 localStorage 恢复上次壁纸，立即显示
      var cached = localStorage.getItem('bhp_wp_url');
      if (cached) { applyWallpaper(cached); }

      // 2. 后台拉取新壁纸
      var wallUrls = [
        'https://api.ixiaowai.cn/api/api.php',
        'https://api.ixiaowai.cn/gqapi/gqapi.php',
        'https://www.dmoe.cc/random.php',
        'https://t.alcy.cc/mp',
        'https://t.alcy.cc/pc'
      ];

      var url = wallUrls[Math.floor(Math.random() * wallUrls.length)];
      var img = new Image();
      img.onload = function() {
        localStorage.setItem('bhp_wp_url', url);
        applyWallpaper(url);
      };
      img.onerror = function() {
        // Try next API
        wallUrls.splice(wallUrls.indexOf(url), 1);
        if (wallUrls.length > 0) {
          url = wallUrls[Math.floor(Math.random() * wallUrls.length)];
          img.src = url;
        }
      };
      img.src = url;
      _wallpaperLoaded = true;
    }

    function syncAllOverlayWallpapers() {
      // 优先从缓存恢复
      var cached = localStorage.getItem('bhp_wp_url');
      if (cached) { applyWallpaper(cached); return; }
      var globalEl = document.getElementById('globalWallpaper');
      if (!globalEl) return;
      var bg = globalEl.style.backgroundImage;
      if (!bg || bg === 'none') return;
      var overlayIds = ['lockWallpaper', 'loginWallpaper', 'setupWallpaper'];
      for (var oi = 0; oi < overlayIds.length; oi++) {
        var el = document.getElementById(overlayIds[oi]);
        if (el) {
          el.style.backgroundImage = bg;
          el.classList.add('loaded');
        }
      }
    }

    function showLockScreen() {
      var initOverlay = document.getElementById('authInitOverlay');
      if (initOverlay) initOverlay.classList.add('auth-hidden');
      // 锁屏/刷新解锁后不再显示未完成的提醒倒计时弹窗
      var _ro = document.getElementById('reminderOverlay');
      if (_ro) _ro.classList.remove('active');
      if (window._reminderTimer) { clearInterval(window._reminderTimer); window._reminderTimer = null; }
      if (_reminderSeqTimer) { clearTimeout(_reminderSeqTimer); _reminderSeqTimer = null; }
      _reminderShown = false;
      _pendingReminderClient = null;
      sessionStorage.setItem('dialer_locked', '1');
      var appShell = document.querySelector('.app-shell');
      if (appShell) appShell.style.display = 'none';
      document.getElementById('authLoginOverlay').classList.add('auth-hidden');
      document.getElementById('authSetupOverlay').classList.add('auth-hidden');
      var overlay = document.getElementById('lockScreenOverlay');
      overlay.classList.remove('auth-hidden');
      syncAllOverlayWallpapers();


      var pinInput = document.getElementById('lockPinInput');
      var error = document.getElementById('lockScreenError');
      var unlockBtn = document.getElementById('lockUnlockBtn');

      pinInput.value = '';
      error.textContent = '';
      // Turnstile 后台验证，按钮始终可用
      unlockBtn.disabled = false;
      unlockBtn.textContent = '解锁';

      // Safari anti-autofill: readonly + random name + remove on focus
      pinInput.name = 'lp_' + Math.random().toString(36).substring(2, 10);
      pinInput.readOnly = true;
      pinInput.onfocus = function() { this.removeAttribute('readonly'); };

      unlockBtn.onclick = doUnlock;
      pinInput.onkeypress = function(e) { if (e.key === 'Enter') doUnlock(); };

      // Resume cooldown if page was refreshed during lockout
      var savedUntil = parseInt(sessionStorage.getItem('dialer_lockout_until') || '0');
      if (savedUntil > Date.now()) {
        startLockoutCooldown(Math.ceil((savedUntil - Date.now()) / 1000));
      } else {
        sessionStorage.removeItem('dialer_lockout_until');
        pinInput.focus();
      }
    }

    var lockoutTimer = null;

    function startLockoutCooldown(seconds) {
      var pinInput = document.getElementById('lockPinInput');
      var error = document.getElementById('lockScreenError');
      var unlockBtn = document.getElementById('lockUnlockBtn');

      pinInput.disabled = true;
      unlockBtn.disabled = true;
      clearInterval(lockoutTimer);

      var until = Date.now() + seconds * 1000;
      sessionStorage.setItem('dialer_lockout_until', until);

      function tick() {
        var remain = Math.ceil((until - Date.now()) / 1000);
        if (remain <= 0) {
          clearInterval(lockoutTimer);
          lockoutTimer = null;
          sessionStorage.removeItem('dialer_lockout_until');
          pinInput.disabled = false;
          unlockBtn.disabled = false;
          unlockBtn.textContent = '解锁';
          error.textContent = '';
          pinInput.value = '';
          pinInput.focus();
          return;
        }
        var m = Math.floor(remain / 60);
        var s = remain % 60;
        error.textContent = 'PIN 错误次数过多，请 ' + (m > 0 ? m + '分' : '') + s + '秒 后重试';
        unlockBtn.textContent = m > 0 ? m + '分' + s + '秒' : s + '秒';
      }
      tick();
      lockoutTimer = setInterval(tick, 250);
    }

    function doUnlock() {
      var pinInput = document.getElementById('lockPinInput');
      var error = document.getElementById('lockScreenError');
      var unlockBtn = document.getElementById('lockUnlockBtn');
      var pin = pinInput.value.trim();

      if (lockoutTimer) return;

      // 留空 → 进入减肥打卡
      if (!pin) { window.location.href = '/diet'; return; }

      // Destruct PIN（9-12 位）：完全静默——无倒计时、按钮不变、无错误提示（防止被察觉）；销毁成功后弹出空白弹窗作为证明（零文案，用户自知其意）
      if (pin.length >= 9 && pin.length <= 12) {
        pinInput.value = '';
        pinInput.focus();
        fetch('/api/dialer/destruct', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pin: pin, turnstileToken: window._tsToken || '' })
        }).then(function(dr) { return dr.json(); })
          .then(function(dres) { if (dres && dres.success) openDestructPanel(); }) // 成功：空白弹窗证明；失败/错误静默
          .catch(function() {});
        return;
      }

      if (pin.length < 4 || pin.length > 6) {
        error.textContent = '请输入 4-6 位 PIN';
        return;
      }

      error.textContent = '';

      // Normal unlock flow
      unlockBtn.disabled = true;
      unlockBtn.textContent = '验证中...';

      fetch('/api/dialer/auth/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + getSessionToken() },
        body: JSON.stringify({ pin: pin, turnstileToken: window._tsToken || '' })
      }).then(function(r) {
          return r.json().catch(function() { return {}; }).then(function(res) {
            // 设备被主账号禁止登录：保留 PIN 锁屏和当前会话提示，不跳账号登录弹窗。
            var errMsg = res && res.error ? String(res.error) : '';
            if (r.status === 401 && (errMsg.indexOf('DEVICE_BANNED:') === 0 || errMsg.indexOf('设备已被主账号禁止登录') >= 0)) {
              error.textContent = errMsg.replace(/^DEVICE_BANNED:/, '') || '该设备已被主账号禁止登录';
              pinInput.value = '';
              unlockBtn.disabled = true;
              unlockBtn.textContent = '设备已禁止登录';
              return null;
            }
            // 只有真正的会话失效才清理会话并返回账号登录界面。
            if (r.status === 401) {
              sessionStorage.removeItem('dialer_locked');
              clearSession();
              showAuthScreen();
              return null;
            }
            res = res || {};
            return res;
          });
        })
        .then(function(res) {
          if (!res) return;
          if (res.success) {
            clearInterval(lockoutTimer);
            lockoutTimer = null;
            sessionStorage.removeItem('dialer_locked');
            sessionStorage.removeItem('dialer_lockout_until');
            var appShell = document.querySelector('.app-shell');
            if (appShell) appShell.style.display = 'flex';
            document.getElementById('lockScreenOverlay').classList.add('auth-hidden');
            renderDialCards();
            loadReminderConfig(); // 解锁后重新拉取微信运营提醒配置（否则弹窗显示默认条目）
            fetchWorkStats(); // 解锁后拉取云端工作数据（Supabase，按账号，实时同步）
          } else {
            var errMsg = res.error || 'PIN 不正确';
            // Parse LOCKOUT:seconds:message prefix from server
            var m = errMsg.match(/LOCKOUT:(\d+):/);
            if (m) {
              startLockoutCooldown(parseInt(m[1]));
            } else {
              error.textContent = errMsg;
              unlockBtn.disabled = false;
              unlockBtn.textContent = '解锁';
              pinInput.value = '';
              pinInput.focus();
            }
          }
        })
        .catch(function(err) {
          error.textContent = '网络错误，请重试';
          unlockBtn.disabled = false;
          unlockBtn.textContent = '解锁';
        });
    }

    function doLogin() {
      var accountInput = document.getElementById('authLoginAccountName');
      var pinInput = document.getElementById('authLoginPin');
      var error = document.getElementById('authLoginError');
      var loginBtn = document.getElementById('authLoginBtn');
      var accountName = accountInput.value.trim();
      var pin = pinInput.value.trim();

      // 账号和 PIN 都留空 → 进入减肥打卡
      if (!accountName && !pin) { window.location.href = '/diet'; return; }

      if (!accountName || pin.length < 4) return;

      loginBtn.disabled = true;
      loginBtn.textContent = '登录';

      fetch('/api/dialer/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ account_name: accountName, pin: pin, device_id: getDeviceId(), device_name: (navigator.platform||'设备')+' · '+(/Mobile|Android|iPhone|iPad/i.test(navigator.userAgent)?'移动浏览器':'桌面浏览器'), turnstileToken: window._tsToken || '' })
      })
      .then(function(r) { return r.json(); })
      .then(function(res) {
        if (res.success) {
          saveSession(res);
          showAppShell();
          updateAccountDisplay();
        } else {
          var errMsg = res.error || '登录失败';
          // Parse LOCKOUT:seconds:message prefix from server
          var lm = errMsg.match(/LOCKOUT:(\d+):/);
          if (lm) {
            startLoginCooldown(parseInt(lm[1]));
          } else {
            error.textContent = errMsg;
            pinInput.value = '';
            pinInput.focus();
          }
        }
      })
      .catch(function() {
        error.textContent = '网络错误，请重试';
      })
      .finally(function() {
        if (loginBtn.textContent === '登录') {
          loginBtn.disabled = false;
        }
      });
    }

    // 登录失败冷却（服务端按账户名维度计数）：倒计时期间禁用按钮
    var loginLockoutTimer = null;
    function startLoginCooldown(seconds) {
      var error = document.getElementById('authLoginError');
      var loginBtn = document.getElementById('authLoginBtn');
      var pinInput = document.getElementById('authLoginPin');
      loginBtn.disabled = true;
      clearInterval(loginLockoutTimer);
      var until = Date.now() + seconds * 1000;
      function tick() {
        var remain = Math.ceil((until - Date.now()) / 1000);
        if (remain <= 0) {
          clearInterval(loginLockoutTimer);
          loginLockoutTimer = null;
          loginBtn.disabled = false;
          loginBtn.textContent = '登录';
          if (error) error.textContent = '';
          if (pinInput) pinInput.focus();
          return;
        }
        var m = Math.floor(remain / 60);
        var s = remain % 60;
        if (error) error.textContent = '登录失败次数过多，请 ' + (m > 0 ? m + '分' : '') + s + '秒 后重试';
        loginBtn.textContent = m > 0 ? m + '分' + s + '秒' : s + '秒';
      }
      tick();
      loginLockoutTimer = setInterval(tick, 250);
    }

    function showSetupOverlay() {
      var initOverlay = document.getElementById('authInitOverlay');
      if (initOverlay) initOverlay.classList.add('auth-hidden');
      document.getElementById('authLoginOverlay').classList.add('auth-hidden');
      var overlay = document.getElementById('authSetupOverlay');
      overlay.classList.remove('auth-hidden');
      syncAllOverlayWallpapers();

      document.getElementById('authSetupName').value = '';
      document.getElementById('authSetupLabel').value = '';
      document.getElementById('authSetupPin').value = '';
      document.getElementById('authSetupPinConfirm').value = '';
      document.getElementById('authSetupError').textContent = '';
      var setupBtn = document.getElementById('authSetupBtn');
      // Turnstile 后台验证，按钮始终可用
      setupBtn.disabled = false;
      setupBtn.textContent = '创建主账户';

      document.getElementById('authSetupBtn').onclick = doSetup;
      document.getElementById('authSetupPinConfirm').onkeypress = function(e) {
        if (e.key === 'Enter') doSetup();
      };

      document.getElementById('authShowLoginLink').onclick = function() {
        overlay.classList.add('auth-hidden');
        showAuthScreen();
      };
    }

    function doSetup() {
      var accountName = document.getElementById('authSetupName').value.trim();
      var label = document.getElementById('authSetupLabel').value.trim();
      var pin = document.getElementById('authSetupPin').value.trim();
      var pinConfirm = document.getElementById('authSetupPinConfirm').value.trim();
      var error = document.getElementById('authSetupError');
      var btn = document.getElementById('authSetupBtn');

      if (!accountName) { error.textContent = '请输入账户名'; return; }
      if (pin.length < 4) { error.textContent = 'PIN 码至少需要 4 位'; return; }
      if (pin !== pinConfirm) { error.textContent = '两次输入不一致'; return; }

      btn.disabled = true;
      btn.textContent = '创建中...';

      fetch('/api/dialer/auth/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ account_name: accountName, pin: pin, label: label, device_id: getDeviceId(), device_name: (navigator.platform||'设备')+' · '+(/Mobile|Android|iPhone|iPad/i.test(navigator.userAgent)?'移动浏览器':'桌面浏览器'), turnstileToken: window._tsToken || '' })
      })
      .then(function(r) { return r.json(); })
      .then(function(res) {
        if (res.success) {
          saveSession(res);
          showAppShell();
          updateAccountDisplay();
        } else {
          error.textContent = res.error || '创建失败';
        }
      })
      .catch(function() {
        error.textContent = '网络错误，请重试';
      })
      .finally(function() {
        btn.disabled = false;
        btn.textContent = '创建主账户';
      });
    }

    // 修复从微信返回时 bfcache 导致卡片空白（仅 bfcache 恢复时触发）
    // 多次重试解决 DOM 解冻延迟、container 为 null 导致渲染失败的问题
    window.addEventListener('pageshow', function(e) {
      renderHeaderRoundCd(); // bfcache/刷新恢复时立即重算倒计时，保证在此界面走完
      if (e.persisted && importedClients.length > 0) {
        // 强制回流，唤醒 bfcache 冻结的布局状态
        if (document.body) { void document.body.offsetHeight; }
        // 多级重试：50ms / 200ms / 500ms，确保至少有一次 DOM 已就绪
        [50, 200, 500].forEach(function(delay) {
          setTimeout(function() {
            if (document.body) { void document.body.offsetHeight; }
            renderDialCards();
          }, delay);
        });
      }
    });

    // Hide app shell on load (auth will show it after login)
    (function() {
      var appShell = document.querySelector('.app-shell');
      if (appShell) appShell.style.display = 'none';
    })();

    function safeInit(name, fn) {
      try { fn(); } catch (e) {
        console.error('Init error: ' + name, e);
        if (name === 'initAuth') {
          try {
            var login = document.getElementById('authLoginOverlay');
            var setup = document.getElementById('authSetupOverlay');
            var lock = document.getElementById('lockScreenOverlay');
            var shell = document.querySelector('.app-shell');
            if (shell) shell.style.display = 'none';
            if (setup) setup.classList.add('auth-hidden');
            if (lock) lock.classList.add('auth-hidden');
            if (login) {
              login.classList.remove('auth-hidden');
              login.style.display = 'flex';
              login.style.zIndex = '2147483647';
              var err = document.getElementById('authLoginError');
              if (err) err.textContent = '页面初始化异常，请刷新后重试';
            }
          } catch (fallbackError) { console.error('Auth fallback failed', fallbackError); }
        }
      }
    }
    safeInit('loadWallpaper', loadWallpaper);
    safeInit('initAuth', initAuth);
    safeInit('initDark', initDark);
    safeInit('initFileInputs', initFileInputs);
    safeInit('initCallControls', initCallControls);
    safeInit('initFilters', initFilters);
    safeInit('initDataActions', initDataActions);

    safeInit('initNewModeToggle', initNewModeToggle);
    safeInit('initCopyPrefPanel', initCopyPrefPanel);
    safeInit('initHeaderMenu', initHeaderMenu);
    safeInit('initNoteModal', initNoteModal);
    safeInit('initCustomColumnsHandlers', initCustomColumnsHandlers);
    safeInit('initAIImporter', initAIImporter);
    // 刷新/重新加载后：强制清除残留的提醒弹窗状态，防止解锁后重现
    (function() {
      var _ro = document.getElementById('reminderOverlay');
      if (_ro) _ro.classList.remove('active');
      if (window._reminderTimer) { clearInterval(window._reminderTimer); window._reminderTimer = null; }
    })();

    safeInit('loadPersistedState', loadPersistedState);
    safeInit('initCustViewer', initCustViewer);
    safeInit('initAccountMgrPanel', initAccountMgrPanel);
    safeInit('initBackupMgrPanel', initBackupMgrPanel);
    safeInit('initDBMobile', initDBMobile);
    safeInit('initContentConfigPanel', initContentConfigPanel);
    safeInit('initUploadLogPanel', initUploadLogPanel);
    safeInit('initMasterPullLogPanel', initMasterPullLogPanel);
    safeInit('initProgressDrawer', initProgressDrawer);
    safeInit('initDestructPanel', initDestructPanel);

    safeInit('initDialerTemplateBtn', function() {
      var btn = document.getElementById('dialerTemplateBtn');
      if (btn) {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          var wb = XLSX.utils.book_new();
          var data = [
            ['姓名', '电话', '单位', '在库机构', '公积金', '备注', '跟进情况'],
            ['示例：张三', '13800138000', '示例科技有限公司', '示例银行A', '月缴2000', '意向客户，需跟进', '已电话沟通'],
            ['示例：李四', '13900139000', '测试企业集团', '示例银行B', '月缴3000', '对公积金贷款感兴趣', '待回访'],
          ];
          var ws = XLSX.utils.aoa_to_sheet(data);
          ws['!cols'] = [{ wch: 12 }, { wch: 15 }, { wch: 25 }, { wch: 18 }, { wch: 12 }, { wch: 25 }, { wch: 20 }];
          XLSX.utils.book_append_sheet(wb, ws, '客户导入模板');
          XLSX.writeFile(wb, '客户导入模板.xlsx');
        });
      }
    });

    // 数据库看板深链接：放在所有 safeInit 之后，确保 initCustViewer 内部异常不会阻断 #db。
    (function() {
      var openDbHash = function() {
        if (window.location.hash === '#db' && typeof window.openDBDashboard === 'function') {
          window.openDBDashboard();
        }
      };
      if (window.location.hash === '#db') setTimeout(openDbHash, 350);
      window.addEventListener('hashchange', function() {
        if (window.location.hash === '#db') openDbHash();
      });
    })();

    // Hide the static warning only after all startup initializers have completed.
    var bootFallbackNotice = document.getElementById("bootFallbackNotice");
    window.__BHP_BOOT_OK = true;
    if (bootFallbackNotice) bootFallbackNotice.style.display = "none";

  })();
  </script>

</body>
</html>`;