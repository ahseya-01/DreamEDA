# DreamEDA: ebook store

A website for selling ebooks, with an admin dashboard so you can manage everything without editing code.

**Honest status:** this project was written in an environment that could not install packages or run the site, so it has **never been run or tested yet**. Expect that you may hit a few small errors the first time. See `docs/TESTING.md` for exactly what is and is not verified. Payments are **disabled** until you configure them.

## What is included

- Public website: homepage (sections you can reorder), catalog with search/filters/sorting/pagination, product pages with preview gallery, cart, checkout (disabled), thank-you page, legal pages, sitemap, robots.txt.
- Admin dashboard at `/admin`: overview, add/edit/publish/archive/delete ebooks, upload PDF/cover/previews/sample/signature/ownership page, logo & favicon & banner & colours with live preview, homepage text, legal pages, categories, homepage sections, payment status, email status, orders.
- Database (`supabase/migrations/001_initial_schema.sql`) with row-level security, and private storage for paid PDFs.
- Payment and delivery code for Razorpay (server-side order creation, signature verification, signed webhooks, safe repeat handling), short-lived download links, optional Resend email. **All of it stays off until you configure it, and none of it has been tested with real or sandbox payments.**

## NOT included yet (be aware)

- Customer accounts, password reset and a "my library" page. Customers get their ebook from the Thank You page (and email, if set up) after paying.
- Order look-up for guests who lost their link (they would need to contact you).
- Automatic insertion of a signature/ownership page into your PDF. Your original PDF is never modified.
- Automated tests.

## Costs (check current pricing yourself; do not assume anything is free forever)

| Service | What for | Cost note |
|---|---|---|
| Supabase | database, login, file storage | has a free tier with limits; paid plans if you grow |
| Vercel | hosting the website | has a free "hobby" tier with limits (its terms restrict commercial use, so check whether a paid plan is needed for a store) |
| GitHub | holds your code for deployment | free for private projects |
| Razorpay | payments (later) | no setup cost that I can promise; they charge per transaction. Check their current terms and eligibility |
| Resend | emails (later) | free tier with limits; needs a domain you own for proper sending |
| Domain name | your own address, e.g. DreamEDA.com | paid yearly; you do not need one to start (you get a free `.vercel.app` address) |

---

# Step-by-step setup

## Part A. Run it on your computer

1. Install **Node.js** (the "LTS" version) from nodejs.org.
2. Create a free account at **supabase.com**, click *New project*, choose a name (DreamEDA), a strong database password (save it somewhere safe) and the region nearest you. Wait until it finishes.
3. In Supabase, open **SQL Editor > New query**, paste the whole contents of `supabase/migrations/001_initial_schema.sql`, click **Run**. It should say success.
4. In Supabase open **Authentication > Users > Add user > Create new user**. Enter your email and a strong password, tick "Auto Confirm User". This will be your admin login.
5. Back in **SQL Editor**, open `supabase/make-admin.sql`, replace `YOUR-EMAIL@example.com` with the email you just used, and **Run**. This makes that account an administrator.
6. In Supabase open **Project Settings > API**. You need three values: *Project URL*, *anon public key*, and *service_role key* (the service_role key is a secret; never share it).
7. In the project folder, copy `.env.example` to a new file named `.env.local` and fill in those three values (leave the payment and email lines empty).
8. Open a terminal in the project folder and run:
   ```
   npm install
   npm run dev
   ```
9. Open http://localhost:3000. You will see the site with clearly labelled **demo** ebooks. Open http://localhost:3000/admin and sign in.

## Part B. Add your logo and first ebook

- **Logo:** Admin > *Logo & Branding*. Upload your logo (and optionally a dark-background version, a favicon and a banner). The preview on the right shows how it will look. Click **Publish changes**. To replace or remove it later, use *Remove* or upload a new file, then publish again.
- **First ebook:** Admin > *Ebooks* > *Add new ebook*. Fill in title, description, price, upload the PDF, cover and preview images, add the table of contents, then click **Save draft** or **Publish**. A published ebook gets its card and its own page automatically.
- **More ebooks:** repeat the same steps. No code changes are ever needed.
- **Signature (optional):** upload it on the ebook form and tick the box to show it in the "From the author" section.
- Replace the draft legal pages in *Website Content* and add your real contact email in *Store Settings* before launching.

## Part C. Put it online

1. Create a free account at **github.com** and create a new **private** repository. Upload this project's files to it (do **not** upload `.env.local`; the `.gitignore` already excludes it).
2. Create an account at **vercel.com** (sign in with GitHub). *Add New > Project*, pick your repository, keep the default settings.
3. Before clicking Deploy, open **Environment Variables** and add the same values as in `.env.local`. Set `NEXT_PUBLIC_SITE_URL` to your final address (you can use the `.vercel.app` address Vercel shows you, then change it later).
4. Click **Deploy**. If the build fails, copy the error text and ask for help; this project could not be build-tested in advance.
5. In Supabase > **Authentication > URL Configuration**, set *Site URL* to your website address.
6. Visit your site, sign in at `/admin`, and run through `docs/TESTING.md`.

**Custom domain later:** buy a domain from any registrar, then in Vercel open your project > *Settings > Domains* > add it and follow the instructions Vercel shows. Update `NEXT_PUBLIC_SITE_URL` afterwards.

## Part D. Turn on payments later

Read the instructions inside Admin > *Payments & Payouts*. In short: create a Razorpay account and finish their KYC and bank linking on their site, add test keys + webhook secret to Vercel, redeploy, choose *Test Mode*, run a test purchase, then repeat with live keys. Until all of that is done the site refuses payments, whatever mode you pick.

## Part E. Turn on email later

See Admin > *Email* (uses Resend). Downloads work without email.

## Backups

- Database: Supabase dashboard > *Database > Backups* (availability depends on your plan). You can also export tables to CSV from the Table Editor now and then.
- Files: keep your original PDFs, covers and logo on your own computer too. Supabase Storage is not a backup of your only copy.
- Keep a private copy of your `.env.local` values in a password manager.

## Security notes

Admin access is enforced on the server and by database rules; paid PDFs are in a private bucket and only reachable through short-lived links created after a verified payment; prices are always read from the database; secrets stay in environment variables. This lowers risk but does not make any website "completely secure". The built-in rate limiter is basic. Keep your dependencies updated.
