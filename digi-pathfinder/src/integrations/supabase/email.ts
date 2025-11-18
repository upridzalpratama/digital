import { supabase } from './client';
import type { Database } from './types';

export type EmailRow = Database['public']['Tables']['quiz_emails']['Row'];

export async function getEmails(): Promise<EmailRow[]> {
  const { data, error } = await supabase
    .from('quiz_emails')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data ?? []) as EmailRow[];
}

export async function addEmail(email: string): Promise<EmailRow | null> {
  const { data, error } = await supabase
    .from('quiz_emails')
    .insert([{ email }])
    .select()
    .single();

  if (error) throw error;
  return data as EmailRow;
}
