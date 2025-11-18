-- Drop the overly permissive SELECT policy
DROP POLICY IF EXISTS "Users can view their own email" ON public.quiz_emails;

-- Emails should only be insertable by users, not readable
-- Only admins with service role key can view collected emails through the backend