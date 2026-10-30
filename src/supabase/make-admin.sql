-- Run AFTER you create your admin login in Supabase (Authentication > Users > Add user).
-- Replace the email below with the email you used, then Run.
insert into public.admin_users (user_id)
select id from auth.users where email = 'YOUR-EMAIL@example.com'
on conflict do nothing;
