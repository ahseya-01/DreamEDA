# Testing status and checklist

## What was actually verified when this was written
- All TypeScript/TSX files were checked for **syntax** errors with the TypeScript compiler: **passed (no syntax errors)**.
- `package.json` and `tsconfig.json` parse as valid JSON: **passed**.

## What could NOT be run (no network in the build environment)
Everything else: installing packages, building, running the site, the database script, uploads, admin login, publishing, checkout refusal, secure downloads, mobile layouts, and every payment/webhook/email flow. **Treat all of it as untested.**

## Checklist for you (tick as you go; report failures so they can be fixed)
1. `npm install` and `npm run dev` start without errors. ☐
2. Homepage loads and shows a "Demo preview" notice with placeholder ebooks. ☐
3. `/admin` redirects to the login page when signed out. ☐
4. Admin login works; a signed-in non-admin is refused. ☐
5. Logo & Branding: upload a logo, see the preview, publish, see it in header; remove it and the text wordmark returns. ☐
6. Add an ebook: upload PDF, cover, 2–4 previews, optional signature; **Save draft**; confirm it is NOT on the public site. ☐
7. **Publish**; confirm the card appears on the homepage and catalog, and the product page opens. Demo ebooks disappear. ☐
8. Add a second ebook without touching code; both show. ☐
9. Edit a price and confirm it updates on the site and in the cart. ☐
10. Payments: with mode "Not Configured", checkout shows "Checkout is not available yet" and no order is created. ☐
11. Paid PDF privacy: the PDF's storage address (private bucket) does not open when pasted in a private browser window; `/api/download/anything` says the link is invalid. ☐
12. Signed out, `/admin/ebooks` and `/admin/orders` are not accessible. ☐
13. Mobile: open on a phone; menu, catalog, product page, cart are usable. ☐

## Only after payments are configured (Razorpay Test Mode)
14. Test purchase succeeds; Thank You page shows the order number and a download button. ☐
15. Download works, and the link stops working after it expires or hits its limit. ☐
16. Failed test payment: no download is granted. ☐
17. Webhook resent twice: order is not processed twice. ☐
18. Opening `/thank-you` with a wrong `key` shows "Order not found". ☐
