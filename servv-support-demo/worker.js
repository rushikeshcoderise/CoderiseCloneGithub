// worker.js
addEventListener('fetch', event => {
  event.respondWith(router(event.request));
});

async function router(request) {
  const url = new URL(request.url);
  if (request.method === 'GET' && (url.pathname === '/' || url.pathname === '/index.html')) {
    return handleIndex();
  }

  if (request.method === 'POST' && url.pathname === '/api/submit') {
    return handleSubmit(request);
  }

  if (request.method === 'GET' && url.pathname === '/admin/list') {
    return handleAdminList();
  }

  return new Response('Not Found', { status: 404 });
}

function handleIndex() {
  const html = `<!doctype html>
<html>
<head><meta charset="utf-8"/><title>Servv Support (Demo)</title></head>
<body>
  <h2>Servv — Secure Site Info Submission (Demo)</h2>
  <p><strong>Note:</strong> Do NOT post usernames or passwords in GitHub Issues. Use this form to submit Site Name & URL only.</p>

  <form id="support" method="post" action="/api/submit">
    <input type="hidden" name="issue" id="issue" />
    <div>
      <label>Site name & URL (required)</label><br/>
      <input name="site" placeholder="MySite — https://example.com" required style="width:400px"/>
    </div>
    <div>
      <label>Notes (optional)</label><br/>
      <textarea name="notes" rows="4" style="width:400px" placeholder="Any extra info (optional)"></textarea>
    </div>
    <div style="margin-top:8px"><button type="submit">Submit securely</button></div>
  </form>

  <script>
    // prefill issue param if present
    const params = new URLSearchParams(location.search);
    if (params.get('issue')) {
      document.getElementById('issue').value = params.get('issue');
    }
  </script>
</body>
</html>`;
  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' }});
}

async function handleSubmit(request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let issue=null, site=null, notes=null;
    if (contentType.includes('application/json')) {
      const j = await request.json();
      issue = j.issue;
      site = j.site;
      notes = j.notes;
    } else {
      const form = await request.formData();
      issue = form.get('issue') || null;
      site = form.get('site') || null;
      notes = form.get('notes') || null;
    }

    if (!site) {
      return new Response(JSON.stringify({ ok:false, message: 'site is required' }), { status: 400, headers:{'Content-Type':'application/json'}});
    }

    const id = `sub_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
    const entry = { id, issue, site, notes, createdAt: new Date().toISOString() };

    // Store in KV: binding name SERVV_SUBMISSIONS (set in wrangler.toml)
    await SERVV_SUBMISSIONS.put(id, JSON.stringify(entry));

    return new Response(JSON.stringify({ ok:true, id }), { status: 200, headers:{'Content-Type':'application/json'}});
  } catch (err) {
    return new Response(JSON.stringify({ ok:false, error: err.toString() }), { status: 500, headers:{'Content-Type':'application/json'}});
  }
}

async function handleAdminList() {
  // Read up to 100 items for demo
  const list = await SERVV_SUBMISSIONS.list({ limit: 100 });
  const items = [];
  for (const key of list.keys) {
    const v = await SERVV_SUBMISSIONS.get(key.name);
    if (v) items.push(JSON.parse(v));
  }
  return new Response(JSON.stringify({ ok:true, items }), { status: 200, headers:{'Content-Type':'application/json'}});
}
