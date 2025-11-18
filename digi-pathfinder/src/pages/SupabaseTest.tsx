import React, { useEffect, useState } from 'react';
import { getEmails, addEmail } from '@/integrations/supabase/email';

export default function SupabaseTest() {
  const [emails, setEmails] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const rows = await getEmails();
      setEmails(rows.map(r => r.email));
    } catch (err: any) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd(e?: React.FormEvent) {
    e?.preventDefault();
    if (!newEmail) return;
    setLoading(true);
    setError(null);
    try {
      const saved = await addEmail(newEmail);
      console.log('addEmail response:', saved);
      setNewEmail('');
      setSuccess('Email berhasil ditambahkan');
      await load();
      // clear success after a short delay
      setTimeout(() => setSuccess(null), 4000);
    } catch (err: any) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Supabase Email Test</h2>
      <form onSubmit={handleAdd} style={{ marginBottom: 12 }}>
        <input
          type="email"
          placeholder="email@example.com"
          value={newEmail}
          onChange={e => setNewEmail(e.target.value)}
          style={{ padding: 8, marginRight: 8 }}
        />
        <button type="submit" disabled={loading}>Add</button>
        <button type="button" onClick={load} disabled={loading} style={{ marginLeft: 8 }}>Refresh</button>
      </form>

      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}

      {loading ? (
        <div>Loading…</div>
      ) : (
        <ul>
          {emails.length === 0 ? <li>No emails yet</li> : emails.map((e, i) => <li key={i}>{e}</li>)}
        </ul>
      )}
    </div>
  );
}
