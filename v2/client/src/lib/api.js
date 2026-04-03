// src/lib/api.js
export async function apiFetch(path, opts = {}) {
  const url = path.startsWith('/api') ? path : `/api${path}`;
  const { body, headers: hdrs, ...rest } = opts;

  const headers = new Headers(hdrs || {});
  let fetchBody = undefined;

  if (body instanceof FormData) {
    fetchBody = body; // let browser set multipart boundary
  } else if (body !== undefined) {
    headers.set('Content-Type', 'application/json');
    fetchBody = JSON.stringify(body);
  }

  const res = await fetch(url, {
    method: body ? 'POST' : 'GET',
    credentials: 'include',     
    cache: 'no-store',
    headers,
    body: fetchBody,
    ...rest,
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const msg = (data && (data.error || data.message)) || `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data;
}
