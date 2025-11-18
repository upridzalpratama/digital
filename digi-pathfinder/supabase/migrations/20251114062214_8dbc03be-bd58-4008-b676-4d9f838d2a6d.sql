-- Create table to store quiz participant emails
CREATE TABLE public.quiz_emails (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.quiz_emails ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert their email (public quiz)
CREATE POLICY "Anyone can insert their email"
ON public.quiz_emails
FOR INSERT
WITH CHECK (true);

-- Only allow users to view their own email
CREATE POLICY "Users can view their own email"
ON public.quiz_emails
FOR SELECT
USING (true);