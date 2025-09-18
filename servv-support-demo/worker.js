
// // worker.js
// addEventListener('fetch', event => {
//   event.respondWith(router(event.request));
// });

// async function router(request) {
//   const url = new URL(request.url);
//   if (request.method === 'GET' && (url.pathname === '/' || url.pathname === '/index.html')) {
//     return handleIndex();
//   }

//   // keep your existing POST path '/api/submit'
//   if (request.method === 'POST' && url.pathname === '/api/submit') {
//     return handleSubmit(request);
//   }

//   // <-- PASS request to handleAdminList to avoid Worker exception
//   if (request.method === 'GET' && url.pathname === '/admin/list') {
//     return handleAdminList(request);
//   }

//   // confirmation page
//   if (request.method === 'GET' && url.pathname === '/submitted.html') {
//     return handleSubmittedPage(url);
//   }

//   return new Response('Not Found', { status: 404 });
// }

// /* ----------index/form page (cleaned) ---------- */
// function handleIndex() {
//   const html = `<!doctype html>
// <html lang="en">
// <head>
// <meta charset="utf-8" />
// <meta name="viewport" content="width=device-width,initial-scale=1" />
// <title>Servv Support — Submit Site Info</title>
// <style>
//   :root{
//     --bg:#0f1724;
//     --card:#0b1220;
//     --muted:#98a0b3;
//     --accent:#6d28d9;
//     --accent-2:#7c3aed;
//     --surface:#0b1220;
//     --glass: rgba(255,255,255,0.03);
//     --success:#10b981;
//     --white: #f8fafc;
//   }
//   html,body{height:100%;margin:0;font-family: system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial; background: linear-gradient(180deg,#071122 0%, #071426 100%); color:var(--white);}
//   .wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:40px;}
//   .card{
//     width:100%;max-width:820px;background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
//     border-radius:12px;padding:28px;border:1px solid rgba(255,255,255,0.04);
//     box-shadow: 0 8px 30px rgba(2,6,23,0.7);
//     display:grid;grid-template-columns:1fr 380px;gap:28px;align-items:start;
//   }
//   @media (max-width:880px){ .card{grid-template-columns:1fr; padding:20px;} }
//   .left h1{margin:0 0 6px 0;font-size:20px;letter-spacing:-0.2px;}
//   .left p.lead{color:var(--muted);margin-top:0;margin-bottom:16px;font-size:14px;line-height:1.5;}
//   .note{background:var(--glass);border-radius:8px;padding:10px 12px;margin-bottom:16px;color:var(--muted);font-size:13px;border:1px solid rgba(255,255,255,0.02);}
//   form .field{margin-bottom:12px;}
//   label{display:block;color:var(--muted);font-size:13px;margin-bottom:6px;}
//   input[type=text], textarea{
//     width:100%;padding:11px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.04);
//     background:rgba(255,255,255,0.02);color:var(--white);font-size:14px;outline:none;
//     transition: box-shadow .12s, border-color .12s;
//   }
//   input[type=text]:focus, textarea:focus{
//     box-shadow: 0 4px 18px rgba(124,58,237,0.12);
//     border-color: rgba(124,58,237,0.9);
//   }
//   textarea{min-height:120px;resize:vertical;}
//   .actions{margin-top:10px;display:flex;gap:10px;align-items:center;}
//   .btn{
//     background: linear-gradient(90deg,var(--accent),var(--accent-2));
//     color:white;padding:10px 14px;border-radius:10px;border:0;font-weight:600;cursor:pointer;
//     box-shadow: 0 8px 20px rgba(124,58,237,0.18);
//   }
//   .btn.secondary{background:transparent;border:1px solid rgba(255,255,255,0.04); color:var(--white);box-shadow:none;}
//   .right{background:linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.00)); border-radius:10px;padding:16px;border:1px solid rgba(255,255,255,0.02); color:var(--muted);}
//   .right h3{color:var(--white);margin:0 0 8px 0;font-size:16px;}
//   .meta{font-size:13px;line-height:1.55;}
//   .tip{margin-top:12px;padding:10px;border-radius:8px;background:rgba(16,185,129,0.06);color:var(--success);border:1px solid rgba(16,185,129,0.08);font-size:13px;}
//   .small{font-size:12px;color:var(--muted);}
//   .logo{display:flex;align-items:center;gap:10px;margin-bottom:12px}
//   .logo .dot{width:36px;height:36px;border-radius:8px;background:linear-gradient(180deg,#8b5cf6,#7c3aed);display:inline-block;box-shadow:0 6px 16px rgba(124,58,237,0.2);color:white;display:flex;align-items:center;justify-content:center;font-weight:700}
//   a.link{color:var(--accent-2);text-decoration:none;}
//   footer{margin-top:16px;font-size:12px;color:var(--muted);}
// </style>
// </head>
// <body>
//   <div class="wrap">
//     <div class="card" role="main">
//       <div class="left">
//         <div class="logo"><span class="dot">S</span><div><strong>Servv Support</strong><div class="small">Secure Site Info (demo)</div></div></div>
//         <h1>Share your Site name & URL securely</h1>
//         <p class="lead">Use this short form to securely share your site name and URL so our team can investigate your report.</p>

//         <div class="note"><strong>Privacy note:</strong> Do not include usernames or passwords. If we require temporary access, we will request it via a secure channel.</div>

//         <form id="support" method="post" action="/api/submit" novalidate>
//           <input type="hidden" name="issue" id="issue" />
//           <div class="field">
//             <label for="site">Site name & URL (required)</label>
//             <input id="site" name="site" type="text" placeholder="MySite — https://example.com" required />
//           </div>

//           <div class="field">
//             <label for="notes">Notes (optional)</label>
//             <textarea id="notes" name="notes" placeholder="Extra context (plugin version, steps you saw, etc.) — keep it brief"></textarea>
//           </div>

//           <div class="actions">
//             <button class="btn" type="submit">Submit securely</button>
//             <div style="flex:1"></div>
//           </div>

//           <footer class="small">By submitting, you agree we may use this site info to investigate and respond. For sensitive credentials, we will request them separately via a secure channel.</footer>
//         </form>
//       </div>

//       <aside class="right" aria-label="help">
//         <h3>Why this form?</h3>
//         <div class="meta">
//           • Central place for site info tied to a GitHub issue.<br/>
//           • Avoids posting credentials in public issues.<br/>
//           • Quick: one short field — saves time for both users & support.
//         </div>

//         <div class="tip">Tip: Click the support link from the GitHub issue — the issue number will auto-fill here and we’ll link the submission to that issue.</div>
//       </aside>
//     </div>
//   </div>

// <script>
//   // prefill issue param if present
//   const params = new URLSearchParams(location.search);
//   if (params.get('issue')) {
//     document.getElementById('issue').value = params.get('issue');
//   }

//   // optional: client validation - simple
//   document.getElementById('support').addEventListener('submit', function(e){
//     const site = document.getElementById('site').value.trim();
//     if(!site){
//       e.preventDefault();
//       alert('Please enter your Site name & URL (e.g. MySite — https://example.com)');
//       document.getElementById('site').focus();
//       return false;
//     }
//     // allow submit (server will validate)
//     return true;
//   });
// </script>
// </body>
// </html>`;
//   return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' }});
// }

// /* ---------- Submit handler (stores to KV) ----------
//    FIXED: use absolute redirect URL (origin + path) to avoid "Unable to parse URL" errors
// */
// async function handleSubmit(request) {
//   try {
//     const contentType = request.headers.get('content-type') || '';
//     let issue = null, site = null, notes = null;

//     if (contentType.includes('application/json')) {
//       const j = await request.json().catch(()=>({}));
//       issue = j.issue || null;
//       site = j.site || null;
//       notes = j.notes || null;
//     } else {
//       const form = await request.formData();
//       issue = form.get('issue') || null;
//       site = form.get('site') || null;
//       notes = form.get('notes') || null;
//     }

//     if (!site) {
//       return new Response(JSON.stringify({ ok:false, message: 'site is required' }), { status: 400, headers:{'Content-Type':'application/json'}});
//     }

//     const id = `sub_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
//     const entry = { id, issue, site, notes, createdAt: new Date().toISOString() };

//     // Store in KV: binding name SERVV_SUBMISSIONS (set in wrangler.toml)
//     await SERVV_SUBMISSIONS.put(id, JSON.stringify(entry));

//     // Build absolute redirect URL (important in Workers)
//     const reqUrl = new URL(request.url);
//     const origin = reqUrl.origin; // e.g. https://your-worker-subdomain.workers.dev
//     const redirectPath = `/submitted.html?id=${encodeURIComponent(id)}${issue ? '&issue=' + encodeURIComponent(issue) : ''}`;
//     const fullRedirect = origin + redirectPath;

//     // 303 redirect to friendly confirmation page
//     return Response.redirect(fullRedirect, 303);

//   } catch (err) {
//     return new Response(JSON.stringify({ ok:false, error: err.toString() }), { status: 500, headers:{'Content-Type':'application/json'}});
//   }
// }

// /* ---------- Admin page: styled HTML table + search + CSV export ---------- */
// async function handleAdminList(request) {
//   // optional: repo param to create issue links (owner/repo)
//   const reqUrl = new URL(request.url);
//   const repo = reqUrl.searchParams.get('repo') || '';

//   // read up to 1000 items for small demo (adjust if needed)
//   const list = await SERVV_SUBMISSIONS.list({ limit: 1000 });
//   const items = [];
//   for (const key of list.keys) {
//     const v = await SERVV_SUBMISSIONS.get(key.name);
//     if (v) {
//       try {
//         items.push(JSON.parse(v));
//       } catch (e) {
//         // ignore malformed entry
//       }
//     }
//   }

//   // sort newest first
//   items.sort((a,b) => (b.createdAt || '').localeCompare(a.createdAt || ''));

//   // escape & inject JSON for client-side functions (safe-ish for demo)
//   const itemsJson = JSON.stringify(items).replace(/</g, '\\u003c');

//   const html = `<!doctype html>
// <html lang="en">
// <head>
// <meta charset="utf-8" />
// <meta name="viewport" content="width=device-width,initial-scale=1" />
// <title>Servv — Submissions (admin)</title>
// <style>
//   body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;background:#0b1220;color:#e6eef8;margin:0;padding:22px}
//   .wrap{max-width:1100px;margin:0 auto}
//   h1{margin:0 0 10px 0;font-size:20px}
//   .top{display:flex;gap:12px;align-items:center;margin-bottom:12px}
//   .search{flex:1}
//   input[type="search"]{width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.04);background:rgba(255,255,255,0.02);color:inherit}
//   .btn{background:linear-gradient(90deg,#6d28d9,#7c3aed);color:#fff;padding:9px 12px;border-radius:8px;border:0;cursor:pointer;font-weight:600}
//   table{width:100%;border-collapse:collapse;margin-top:12px}
//   th,td{padding:10px 12px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.03);vertical-align:top;font-size:13px}
//   th{color:#9fb1d3;font-size:12px;font-weight:600}
//   tr:nth-child(even) td{background:rgba(255,255,255,0.012)}
//   .mono{font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", monospace; font-size:13px; color:#cfe6ff}
//   .small{color:#9fb1d3;font-size:12px}
//   .pill{display:inline-block;padding:6px 10px;border-radius:999px;background:rgba(255,255,255,0.03);font-size:12px}
//   .meta{color:#98a0b3;font-size:13px;margin-bottom:8px}
//   .note{background:rgba(255,255,255,0.02);padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.02);color:#9fb1d3;margin-bottom:12px}
//   a.link{color:#8b5cf6;text-decoration:none}
//   @media (max-width:880px){ th,td{font-size:12px;padding:8px} }
// </style>
// </head>
// <body>
//   <div class="wrap">
//     <h1>Servv — Site submissions (admin)</h1>
//     <div class="meta">Showing up to 1000 recent submissions. Use search to filter by site, issue, or notes.</div>

//     <div class="note">This page is intended for internal use. Make sure Cloudflare Access protects this endpoint.</div>

//     <div class="top">
//       <div class="search"><input id="q" type="search" placeholder="Search by site, issue number, or notes..." /></div>
//       <button id="clearBtn" class="btn" style="background:transparent;border:1px solid rgba(255,255,255,0.04);color:inherit;margin-right:8px">Clear</button>
//       <button id="csvBtn" class="btn">Download CSV</button>
//     </div>

//     <table id="tbl">
//       <thead>
//         <tr>
//           <th style="width:12%">ID</th>
//           <th style="width:10%">Issue</th>
//           <th style="width:38%">Site</th>
//           <th style="width:30%">Notes</th>
//           <th style="width:10%">Created</th>
//         </tr>
//       </thead>
//       <tbody id="tbody">
//         <!-- rows injected by JS -->
//       </tbody>
//     </table>
//   </div>

// <script>
//   const ITEMS = ${itemsJson};
//   const repo = ${JSON.stringify(repo)};
//   const tbody = document.getElementById('tbody');
//   const qEl = document.getElementById('q');
//   const csvBtn = document.getElementById('csvBtn');
//   const clearBtn = document.getElementById('clearBtn');

//   function renderRows(list) {
//     tbody.innerHTML = '';
//     if (!list || list.length === 0) {
//       tbody.innerHTML = '<tr><td colspan="5" class="small">No submissions found.</td></tr>';
//       return;
//     }
//     for (const it of list) {
//       const id = escapeHtml(it.id || '');
//       const issue = escapeHtml(it.issue || '');
//       const site = escapeHtml(it.site || '');
//       const notes = escapeHtml(it.notes || '') || '<span class="small">—</span>';
//       const created = escapeHtml(it.createdAt ? new Date(it.createdAt).toLocaleString() : '');

//       // build issue link if repo provided
//       const issueCell = issue ? (repo ? '<a class="link" target="_blank" href="https://github.com/' + encodeURIComponent(repo) + '/issues/' + encodeURIComponent(issue) + '">#' + issue + '</a>' : '#' + issue) : '<span class="small">—</span>';

//       const row = '<tr>' +
//         '<td class="mono">' + id + '</td>' +
//         '<td>' + issueCell + '</td>' +
//         '<td>' + site + '</td>' +
//         '<td>' + notes + '</td>' +
//         '<td class="small">' + created + '</td>' +
//         '</tr>';
//       tbody.insertAdjacentHTML('beforeend', row);
//     }
//   }

//   function escapeHtml(s){ return String(s || '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])); }

//   function filterItems(q) {
//     if (!q) return ITEMS;
//     const text = q.trim().toLowerCase();
//     return ITEMS.filter(it => {
//       return (it.site || '').toLowerCase().includes(text) ||
//              (it.notes || '').toLowerCase().includes(text) ||
//              (it.issue || '').toString().toLowerCase().includes(text) ||
//              (it.id || '').toLowerCase().includes(text);
//     });
//   }

//   qEl.addEventListener('input', () => {
//     const filtered = filterItems(qEl.value);
//     renderRows(filtered);
//   });

//   clearBtn.addEventListener('click', () => {
//     qEl.value = '';
//     renderRows(ITEMS);
//   });

//   csvBtn.addEventListener('click', () => {
//     const rows = filterItems(qEl.value);
//     const csv = toCSV(rows);
//     const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'servv-submissions.csv';
//     a.click();
//     URL.revokeObjectURL(url);
//   });

//   function toCSV(rows) {
//     const header = ['id','issue','site','notes','createdAt'];
//     const out = [header.join(',')];
//     for (const r of rows) {
//       const vals = [r.id || '', r.issue || '', r.site || '', (r.notes||'').replace(/\\n/g,' '), r.createdAt || ''];
//       out.push(vals.map(s => '"' + String(s).replace(/"/g,'""') + '"').join(','));
//     }
//     return out.join('\\n');
//   }

//   // initial render
//   renderRows(ITEMS);
// </script>
// </body>
// </html>`;

//   return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' }});
// }


// /* ---------- Submitted page  ---------- */
// function handleSubmittedPage(url) {
//   const id = url.searchParams.get('id') || '';
//   const issue = url.searchParams.get('issue') || '';
//   const repoParam = url.searchParams.get('repo') || '';

//   const issueLine = issue 
//     ? `<p style="margin:8px 0">Linked to GitHub issue: <a href="https://github.com/${escapeHtml(repoParam)}/issues/${escapeHtml(issue)}" target="_blank">#${escapeHtml(issue)}</a></p>` 
//     : '';

//   const html = `<!doctype html>
// <html lang="en">
// <head>
// <meta charset="utf-8" />
// <meta name="viewport" content="width=device-width,initial-scale=1" />
// <title>Submission received</title>
// <style>
//   body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;margin:0;background:#071022;color:#e6eef8;padding:30px;display:flex;align-items:center;justify-content:center;height:100vh}
//   .box{max-width:720px;background:linear-gradient(180deg,#071022,#081229);padding:28px;border-radius:12px;border:1px solid rgba(255,255,255,0.03);box-shadow:0 12px 40px rgba(2,6,23,0.6)}
//   h2{margin:0 0 6px 0}
//   p{color:#b7c6db}
//   .id{background:rgba(255,255,255,0.03);padding:8px;border-radius:8px;margin-top:8px;color:#e6eef8;font-weight:600}
//   a.link{color:#8b5cf6;text-decoration:none}
//   .small{font-size:13px;color:#9fb1d3;margin-top:12px}
// </style>
// </head>
// <body>
//   <div class="box">
//     <h2>Thanks — we received your site info</h2>
//     <p class="small">We’ve saved the submission and linked it to the related issue (if provided). Our team will review it and update the GitHub issue with progress.</p>
//     <div class="id">Submission id: <code style="color:#cfe6ff;background:transparent;border:0">${escapeHtml(id)}</code></div>
//     ${ issueLine }
//     <p style="margin-top:14px" class="small">✅ You're all set. It’s safe to close this window now.</p>
//   </div>
// </body>
// </html>`;
//   return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' }});
// }

// /* ---------- helper ---------- */
// function escapeHtml(str) {
//   if (!str) return '';
//   return String(str).replace(/[&<>"']/g, ch => {
//     return ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[ch];
//   });
// }


// worker.js
// Single-use token flow (create-token + 15-min TTL + delete-on-use)
// KV bindings required: SERVV_TOKENS, SERVV_SUBMISSIONS
// Secret required: ACTION_KEY (set via wrangler secret put ACTION_KEY)

addEventListener('fetch', event => {
  event.respondWith(router(event.request));
});

async function router(request) {
  const url = new URL(request.url);
  if (request.method === 'GET' && (url.pathname === '/' || url.pathname === '/index.html')) {
    return handleIndex();
  }

  // token creation endpoint (called by GitHub Action)
  if (request.method === 'POST' && url.pathname === '/api/create-token') {
    return handleCreateToken(request);
  }

  // submit handler
  if (request.method === 'POST' && url.pathname === '/api/submit') {
    return handleSubmit(request);
  }

  // admin list
  if (request.method === 'GET' && url.pathname === '/admin/list') {
    return handleAdminList(request);
  }

  // confirmation page
  if (request.method === 'GET' && url.pathname === '/submitted.html') {
    return handleSubmittedPage(url);
  }

  return new Response('Not Found', { status: 404 });
}

/* ---------- index/form page (cleaned) ----------
   Note: includes hidden token input id="token" so URL ?token=... auto-fills it
*/
function handleIndex() {
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Servv Support — Submit Site Info</title>
<style>
  :root{
    --bg:#0f1724;
    --card:#0b1220;
    --muted:#98a0b3;
    --accent:#6d28d9;
    --accent-2:#7c3aed;
    --surface:#0b1220;
    --glass: rgba(255,255,255,0.03);
    --success:#10b981;
    --white: #f8fafc;
  }
  html,body{height:100%;margin:0;font-family: system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial; background: linear-gradient(180deg,#071122 0%, #071426 100%); color:var(--white);}
  .wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:40px;}
  .card{
    width:100%;max-width:820px;background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
    border-radius:12px;padding:28px;border:1px solid rgba(255,255,255,0.04);
    box-shadow: 0 8px 30px rgba(2,6,23,0.7);
    display:grid;grid-template-columns:1fr 380px;gap:28px;align-items:start;
  }
  @media (max-width:880px){ .card{grid-template-columns:1fr; padding:20px;} }
  .left h1{margin:0 0 6px 0;font-size:20px;letter-spacing:-0.2px;}
  .left p.lead{color:var(--muted);margin-top:0;margin-bottom:16px;font-size:14px;line-height:1.5;}
  .note{background:var(--glass);border-radius:8px;padding:10px 12px;margin-bottom:16px;color:var(--muted);font-size:13px;border:1px solid rgba(255,255,255,0.02);}
  form .field{margin-bottom:12px;}
  label{display:block;color:var(--muted);font-size:13px;margin-bottom:6px;}
  input[type=text], textarea{
    width:100%;padding:11px 12px;border-radius:8px;border:1px solid rgba(255,255,255,0.04);
    background:rgba(255,255,255,0.02);color:var(--white);font-size:14px;outline:none;
    transition: box-shadow .12s, border-color .12s;
  }
  input[type=text]:focus, textarea:focus{
    box-shadow: 0 4px 18px rgba(124,58,237,0.12);
    border-color: rgba(124,58,237,0.9);
  }
  textarea{min-height:120px;resize:vertical;}
  .actions{margin-top:10px;display:flex;gap:10px;align-items:center;}
  .btn{
    background: linear-gradient(90deg,var(--accent),var(--accent-2));
    color:white;padding:10px 14px;border-radius:10px;border:0;font-weight:600;cursor:pointer;
    box-shadow: 0 8px 20px rgba(124,58,237,0.18);
  }
  .right{background:linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.00)); border-radius:10px;padding:16px;border:1px solid rgba(255,255,255,0.02); color:var(--muted);}
  .right h3{color:var(--white);margin:0 0 8px 0;font-size:16px;}
  .meta{font-size:13px;line-height:1.55;}
  .tip{margin-top:12px;padding:10px;border-radius:8px;background:rgba(16,185,129,0.06);color:var(--success);border:1px solid rgba(16,185,129,0.08);font-size:13px;}
  .small{font-size:12px;color:var(--muted);}
  .logo{display:flex;align-items:center;gap:10px;margin-bottom:12px}
  .logo .dot{width:36px;height:36px;border-radius:8px;background:linear-gradient(180deg,#8b5cf6,#7c3aed);display:inline-block;box-shadow:0 6px 16px rgba(124,58,237,0.2);color:white;display:flex;align-items:center;justify-content:center;font-weight:700}
  a.link{color:var(--accent-2);text-decoration:none;}
  footer{margin-top:16px;font-size:12px;color:var(--muted);}
</style>
</head>
<body>
  <div class="wrap">
    <div class="card" role="main">
      <div class="left">
        <div class="logo"><span class="dot">S</span><div><strong>Servv Support</strong><div class="small">Secure Site Info (demo)</div></div></div>
        <h1>Share your Site name & URL securely</h1>
        <p class="lead">Use this short form to securely share your site name and URL so our team can investigate your report.</p>

        <div class="note"><strong>Privacy note:</strong> Do not include usernames or passwords. If we require temporary access, we will request it via a secure channel.</div>

        <form id="support" method="post" action="/api/submit" novalidate>
          <input type="hidden" name="issue" id="issue" />
          <input type="hidden" name="token" id="token" />
          <div class="field">
            <label for="site">Site name & URL (required)</label>
            <input id="site" name="site" type="text" placeholder="MySite — https://example.com" required />
          </div>

          <div class="field">
            <label for="notes">Notes (optional)</label>
            <textarea id="notes" name="notes" placeholder="Extra context (plugin version, steps you saw, etc.) — keep it brief"></textarea>
          </div>

          <div class="actions">
            <button class="btn" type="submit">Submit securely</button>
            <div style="flex:1"></div>
          </div>

          <footer class="small">By submitting, you agree we may use this site info to investigate and respond. For sensitive credentials, we will request them separately via a secure channel.</footer>
        </form>
      </div>

      <aside class="right" aria-label="help">
        <h3>Why this form?</h3>
        <div class="meta">
          • Central place for site info tied to a GitHub issue.<br/>
          • Avoids posting credentials in public issues.<br/>
          • Quick: one short field — saves time for both users & support.
        </div>

        <div class="tip">Tip: Click the support link from the GitHub issue — the issue number and token will auto-fill here and we’ll link the submission to that issue.</div>
      </aside>
    </div>
  </div>

<script>
  // prefill issue and token params if present
  const params = new URLSearchParams(location.search);
  if (params.get('issue')) {
    document.getElementById('issue').value = params.get('issue');
  }
  if (params.get('token')) {
    document.getElementById('token').value = params.get('token');
  }

  // simple client validation
  document.getElementById('support').addEventListener('submit', function(e){
    const site = document.getElementById('site').value.trim();
    if(!site){
      e.preventDefault();
      alert('Please enter your Site name & URL (e.g. MySite — https://example.com)');
      document.getElementById('site').focus();
      return false;
    }
    return true;
  });
</script>
</body>
</html>`;
  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' }});
}

/* ---------- Create token endpoint (called by GitHub Action) ----------
   POST /api/create-token
   Headers: x-create-secret: ACTION_KEY
   Body: form-data or JSON { issue, repo }
   Response: JSON { ok:true, url, token }
   Token TTL: 15 minutes (expirationTtl)
*/
async function handleCreateToken(request) {
  try {
    const secret = request.headers.get('x-create-secret') || '';
    if (!secret || secret !== ACTION_KEY) return new Response('Forbidden', { status: 403 });

    const ct = request.headers.get('content-type') || '';
    let issue = null, repo = null;
    if (ct.includes('application/json')) {
      const j = await request.json().catch(()=>({}));
      issue = j.issue; repo = j.repo;
    } else {
      const fd = await request.formData();
      issue = fd.get('issue'); repo = fd.get('repo');
    }

    if (!issue || !repo) {
      return new Response(JSON.stringify({ ok:false, message: 'issue & repo required' }), { status: 400, headers: {'Content-Type':'application/json'}});
    }

    const token = makeToken(20);
    const now = new Date().toISOString();
    const expiresSeconds = 15 * 60; // 15 minutes

    const meta = { issue: String(issue), repo: String(repo), createdAt: now, expiresAt: new Date(Date.now() + expiresSeconds*1000).toISOString() };

    // store token with TTL so it auto-expires (15 minutes)
    await SERVV_TOKENS.put(`token:${token}`, JSON.stringify(meta), { expirationTtl: expiresSeconds });

    const origin = new URL(request.url).origin;
    const url = `${origin}/?issue=${encodeURIComponent(issue)}&repo=${encodeURIComponent(repo)}&token=${encodeURIComponent(token)}`;

    return new Response(JSON.stringify({ ok:true, url, token }), { status: 200, headers: {'Content-Type':'application/json'} });

  } catch (err) {
    return new Response(JSON.stringify({ ok:false, error: err.toString() }), { status: 500, headers: {'Content-Type':'application/json'} });
  }
}

/* ---------- Submit handler (stores to KV) ----------
   Validation: requires token (from form or query), checks SERVV_TOKENS, deletes token on success (single-use delete), TTL 15min
*/
async function handleSubmit(request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let issue = null, site = null, notes = null, token = null;
    if (contentType.includes('application/json')) {
      const j = await request.json().catch(()=>({}));
      issue = j.issue || null;
      site = j.site || null;
      notes = j.notes || null;
      token = j.token || null;
    } else {
      const form = await request.formData();
      issue = form.get('issue') || null;
      site = form.get('site') || null;
      notes = form.get('notes') || null;
      token = form.get('token') || null;
    }

    // token is required for protected flow
    if (!token) {
      // attempt to get repo from query string (for issue link) then respond friendly
      const reqUrl = new URL(request.url);
      const repoFromQuery = reqUrl.searchParams.get('repo') || '';
      return invalidTokenResponse(issue, repoFromQuery);
    }

    const tkey = `token:${token}`;
    const raw = await SERVV_TOKENS.get(tkey);
    if (!raw) {
      // token missing or expired
      // attempt to get repo from request body/form or URL
      const reqUrl = new URL(request.url);
      const repoFromQuery = reqUrl.searchParams.get('repo') || '';
      return invalidTokenResponse(issue, repoFromQuery);
    }

    // parse token meta (we stored issue/repo when created)
    let meta;
    try {
      meta = JSON.parse(raw);
    } catch (e) {
      const reqUrl = new URL(request.url);
      const repoFromQuery = reqUrl.searchParams.get('repo') || '';
      return invalidTokenResponse(issue, repoFromQuery);
    }

    // check expiry defensively (KV uses TTL but double-check)
    if (meta.expiresAt && new Date(meta.expiresAt) < new Date()) {
      await SERVV_TOKENS.delete(tkey).catch(()=>{});
      return invalidTokenResponse(issue, meta.repo || '');
    }

    // basic site check
    if (!site) {
      return new Response(JSON.stringify({ ok:false, message: 'site is required' }), { status: 400, headers:{'Content-Type':'application/json'}});
    }

    // store submission (we keep tokenUsed in entry for reference)
    const id = `sub_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
    const entry = { id, issue: meta.issue || issue, repo: meta.repo || '', site, notes, createdAt: new Date().toISOString(), tokenUsed: token };
    await SERVV_SUBMISSIONS.put(id, JSON.stringify(entry));

    // Delete token immediately (single-use + tidier KV)
    await SERVV_TOKENS.delete(tkey).catch(()=>{});

    // Build absolute redirect URL
    const reqUrl = new URL(request.url);
    const origin = reqUrl.origin;
    const redirectPath = `/submitted.html?id=${encodeURIComponent(id)}${issue ? '&issue=' + encodeURIComponent(issue) : ''}`;
    const fullRedirect = origin + redirectPath;

    // 303 redirect to friendly confirmation page
    return Response.redirect(fullRedirect, 303);

  } catch (err) {
    return new Response(JSON.stringify({ ok:false, error: err.toString() }), { status: 500, headers:{'Content-Type':'application/json'}});
  }
}

/* Helper: Friendly invalid token HTML response */
function invalidTokenResponse(issue, repo) {
  const issueLink = (issue && repo) ? `<p style="margin-top:8px">Link to issue: <a href="https://github.com/${escapeHtml(repo)}/issues/${escapeHtml(issue)}" target="_blank">#${escapeHtml(issue)}</a></p>` : '';
  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Link invalid or expired</title>
<style>body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial;background:#071022;color:#e6eef8;padding:30px;display:flex;align-items:center;justify-content:center;height:100vh} .box{max-width:720px;background:linear-gradient(180deg,#071022,#081229);padding:24px;border-radius:10px;border:1px solid rgba(255,255,255,0.03)} h2{margin:0 0 8px 0} p{color:#b7c6db}</style></head><body>
  <div class="box">
    <h2>This support link is already used or expired</h2>
    <p>If this is your issue and you still need help, please comment on the GitHub issue to request a new secure link. We will verify and provide a fresh secure link.</p>
    ${issueLink}
    <p style="margin-top:12px">Thanks — the team.</p>
  </div>
</body></html>`;
  return new Response(html, { status: 403, headers: { 'Content-Type': 'text/html; charset=utf-8' }});
}

/* ---------- Admin page: styled HTML table + search + CSV export ----------
   (unchanged, but submissions now include tokenUsed field)
*/
async function handleAdminList(request) {
  const reqUrl = new URL(request.url);
  const repo = reqUrl.searchParams.get('repo') || '';

  const list = await SERVV_SUBMISSIONS.list({ limit: 1000 });
  const items = [];
  for (const key of list.keys) {
    const v = await SERVV_SUBMISSIONS.get(key.name);
    if (v) {
      try {
        items.push(JSON.parse(v));
      } catch (e) {
        // ignore malformed
      }
    }
  }

  items.sort((a,b) => (b.createdAt || '').localeCompare(a.createdAt || ''));

  const itemsJson = JSON.stringify(items).replace(/</g, '\\u003c');

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Servv — Submissions (admin)</title>
<style>
  body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;background:#0b1220;color:#e6eef8;margin:0;padding:22px}
  .wrap{max-width:1100px;margin:0 auto}
  h1{margin:0 0 10px 0;font-size:20px}
  .top{display:flex;gap:12px;align-items:center;margin-bottom:12px}
  .search{flex:1}
  input[type="search"]{width:100%;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.04);background:rgba(255,255,255,0.02);color:inherit}
  .btn{background:linear-gradient(90deg,#6d28d9,#7c3aed);color:#fff;padding:9px 12px;border-radius:8px;border:0;cursor:pointer;font-weight:600}
  table{width:100%;border-collapse:collapse;margin-top:12px}
  th,td{padding:10px 12px;text-align:left;border-bottom:1px solid rgba(255,255,255,0.03);vertical-align:top;font-size:13px}
  th{color:#9fb1d3;font-size:12px;font-weight:600}
  tr:nth-child(even) td{background:rgba(255,255,255,0.012)}
  .mono{font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", monospace; font-size:13px; color:#cfe6ff}
  .small{color:#9fb1d3;font-size:12px}
  .pill{display:inline-block;padding:6px 10px;border-radius:999px;background:rgba(255,255,255,0.03);font-size:12px}
  .meta{color:#98a0b3;font-size:13px;margin-bottom:8px}
  .note{background:rgba(255,255,255,0.02);padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.02);color:#9fb1d3;margin-bottom:12px}
  a.link{color:#8b5cf6;text-decoration:none}
  @media (max-width:880px){ th,td{font-size:12px;padding:8px} }
</style>
</head>
<body>
  <div class="wrap">
    <h1>Servv — Site submissions (admin)</h1>
    <div class="meta">Showing up to 1000 recent submissions. Use search to filter by site, issue, or notes.</div>

    <div class="note">This page is intended for internal use. Make sure Cloudflare Access protects this endpoint.</div>

    <div class="top">
      <div class="search"><input id="q" type="search" placeholder="Search by site, issue number, or notes..." /></div>
      <button id="clearBtn" class="btn" style="background:transparent;border:1px solid rgba(255,255,255,0.04);color:inherit;margin-right:8px">Clear</button>
      <button id="csvBtn" class="btn">Download CSV</button>
    </div>

    <table id="tbl">
      <thead>
        <tr>
          <th style="width:12%">ID</th>
          <th style="width:10%">Issue</th>
          <th style="width:30%">Site</th>
          <th style="width:30%">Notes</th>
          <th style="width:10%">Created</th>
        </tr>
      </thead>
      <tbody id="tbody">
      </tbody>
    </table>
  </div>

<script>
  const ITEMS = ${itemsJson};
  const repo = ${JSON.stringify(repo)};
  const tbody = document.getElementById('tbody');
  const qEl = document.getElementById('q');
  const csvBtn = document.getElementById('csvBtn');
  const clearBtn = document.getElementById('clearBtn');

  function renderRows(list) {
    tbody.innerHTML = '';
    if (!list || list.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" class="small">No submissions found.</td></tr>';
      return;
    }
    for (const it of list) {
      const id = escapeHtml(it.id || '');
      const issue = escapeHtml(it.issue || '');
      const site = escapeHtml(it.site || '');
      const notes = escapeHtml(it.notes || '') || '<span class="small">—</span>';
      const created = escapeHtml(it.createdAt ? new Date(it.createdAt).toLocaleString() : '');
      const issueCell = issue ? (repo ? '<a class="link" target="_blank" href="https://github.com/' + encodeURIComponent(repo) + '/issues/' + encodeURIComponent(issue) + '">#' + issue + '</a>' : '#' + issue) : '<span class="small">—</span>';
      const row = '<tr>' +
        '<td class="mono">' + id + '</td>' +
        '<td>' + issueCell + '</td>' +
        '<td>' + site + '</td>' +
        '<td>' + notes + '</td>' +
        '<td class="small">' + created + '</td>' +
        '</tr>';
      tbody.insertAdjacentHTML('beforeend', row);
    }
  }

  function escapeHtml(s){ return String(s || '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])); }

  function filterItems(q) {
    if (!q) return ITEMS;
    const text = q.trim().toLowerCase();
    return ITEMS.filter(it => {
      return (it.site || '').toLowerCase().includes(text) ||
             (it.notes || '').toLowerCase().includes(text) ||
             (it.issue || '').toString().toLowerCase().includes(text) ||
             (it.id || '').toLowerCase().includes(text);
    });
  }

  qEl.addEventListener('input', () => {
    const filtered = filterItems(qEl.value);
    renderRows(filtered);
  });

  clearBtn.addEventListener('click', () => {
    qEl.value = '';
    renderRows(ITEMS);
  });

  csvBtn.addEventListener('click', () => {
    const rows = filterItems(qEl.value);
    const csv = toCSV(rows);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'servv-submissions.csv';
    a.click();
    URL.revokeObjectURL(url);
  });

  function toCSV(rows) {
    const header = ['id','issue','site','notes','createdAt'];
    const out = [header.join(',')];
    for (const r of rows) {
      const vals = [r.id || '', r.issue || '', r.site || '', (r.notes||'').replace(/\\n/g,' '), r.createdAt || ''];
      out.push(vals.map(s => '"' + String(s).replace(/"/g,'""') + '"').join(','));
    }
    return out.join('\\n');
  }

  // initial render
  renderRows(ITEMS);
</script>
</body>
</html>`;

  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' }});
}

/* ---------- Submitted page  ---------- */
function handleSubmittedPage(url) {
  const id = url.searchParams.get('id') || '';
  const issue = url.searchParams.get('issue') || '';
  const repoParam = url.searchParams.get('repo') || '';

  const issueLine = issue 
    ? `<p style="margin:8px 0">Linked to GitHub issue: <a href="https://github.com/${escapeHtml(repoParam)}/issues/${escapeHtml(issue)}" target="_blank">#${escapeHtml(issue)}</a></p>` 
    : '';

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Submission received</title>
<style>
  body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;margin:0;background:#071022;color:#e6eef8;padding:30px;display:flex;align-items:center;justify-content:center;height:100vh}
  .box{max-width:720px;background:linear-gradient(180deg,#071022,#081229);padding:28px;border-radius:12px;border:1px solid rgba(255,255,255,0.03);box-shadow:0 12px 40px rgba(2,6,23,0.6)}
  h2{margin:0 0 6px 0}
  p{color:#b7c6db}
  .id{background:rgba(255,255,255,0.03);padding:8px;border-radius:8px;margin-top:8px;color:#e6eef8;font-weight:600}
  a.link{color:#8b5cf6;text-decoration:none}
  .small{font-size:13px;color:#9fb1d3;margin-top:12px}
</style>
</head>
<body>
  <div class="box">
    <h2>Thanks — we received your site info</h2>
    <p class="small">We’ve saved the submission and linked it to the related issue (if provided). Our team will review it and update the GitHub issue with progress.</p>
    <div class="id">Submission id: <code style="color:#cfe6ff;background:transparent;border:0">${escapeHtml(id)}</code></div>
    ${ issueLine }
    <p style="margin-top:14px" class="small">✅ You're all set. It’s safe to close this window now.</p>
  </div>
</body>
</html>`;
  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' }});
}

/* ---------- helper ---------- */
function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/[&<>"']/g, ch => {
    return ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' })[ch];
  });
}

/* ---------- token helper ---------- */
function makeToken(len = 16) {
  const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const arr = crypto.getRandomValues(new Uint8Array(len));
  return Array.from(arr).map(n => alphabet[n % alphabet.length]).join('');
}
