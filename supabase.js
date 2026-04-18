// ============================================================
// supabase.js — Supabase Client Configuration
// ============================================================
// SETUP: Replace the two placeholders below with your actual
// Supabase project URL and anon/public key.
// Find them at: https://app.supabase.com → Settings → API
// ============================================================

const SUPABASE_URL = "https://wekzhhfeegzrxhzstnmq.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indla3poaGZlZWd6cnhoenN0bm1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0OTQ5NDAsImV4cCI6MjA5MjA3MDk0MH0.OJWJZDkWcA-U4BTnOya_VHZiGlbAffUxQsxF85vstdY";

// Lightweight Supabase REST client (no npm needed)
const supabase = {
  url: SUPABASE_URL,
  key: SUPABASE_ANON_KEY,

  /**
   * Fetch all rows from a table, optionally filtered by a column value.
   * @param {string} table  - Table name (e.g. "gallery" or "menu")
   * @param {object} [filter] - { column, value } to apply a WHERE clause
   * @returns {Promise<Array>}
   */
  async from(table, filter = null) {
    let endpoint = `${this.url}/rest/v1/${table}?select=*`;
    if (filter) {
      endpoint += `&${filter.column}=eq.${encodeURIComponent(filter.value)}`;
    }
    // Add ordering: gallery by created_at, menu by category then name
    endpoint += `&order=created_at.asc`;

    try {
      const res = await fetch(endpoint, {
        headers: {
          apikey: this.key,
          Authorization: `Bearer ${this.key}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error(`Supabase error: ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error(`[Supabase] Failed to fetch "${table}":`, err);
      return [];
    }
  },
};

// ============================================================
// SUPABASE TABLE SETUP GUIDE
// ============================================================
// Run the following SQL in your Supabase SQL editor:
//
// -- Gallery table
// CREATE TABLE gallery (
//   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
//   image_url TEXT NOT NULL,
//   title TEXT NOT NULL,
//   caption TEXT,
//   category TEXT NOT NULL CHECK (category IN ('cake','brownie','cookie')),
//   created_at TIMESTAMPTZ DEFAULT NOW()
// );

// -- Menu table
// CREATE TABLE menu (
//   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
//   name TEXT NOT NULL,
//   price NUMERIC NOT NULL,
//   category TEXT NOT NULL CHECK (category IN ('cake','brownie','cookie')),
//   created_at TIMESTAMPTZ DEFAULT NOW()
// );

// -- Enable public read access (RLS)
// ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
// ALTER TABLE menu ENABLE ROW LEVEL SECURITY;
// CREATE POLICY "Public read gallery" ON gallery FOR SELECT USING (true);
// CREATE POLICY "Public read menu" ON menu FOR SELECT USING (true);
// ============================================================
