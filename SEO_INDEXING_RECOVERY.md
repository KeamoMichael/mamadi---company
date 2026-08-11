# Mamadi International Google Indexing Recovery

## Production website

- Website: https://mamadi-company.vercel.app/
- Sitemap: https://mamadi-company.vercel.app/sitemap.xml
- Robots file: https://mamadi-company.vercel.app/robots.txt

## Technical fixes completed

- Replaced canonical URLs that incorrectly pointed to the older `mamadi.co.za` WordPress website.
- Added a static self-referencing canonical URL to the production homepage.
- Updated page-level canonical and Open Graph URLs.
- Updated Organization and WebSite structured data for Mamadi International.
- Added Mamadi International social profiles to the Organization structured data.
- Updated every URL in `sitemap.xml` to the production domain.
- Updated the sitemap reference in `robots.txt`.
- Added Vercel SPA rewrites so direct routes such as `/about` and `/projects` return HTTP 200 instead of 404.
- Verified the live homepage, About page, Projects page, robots file, and sitemap.

## Google Search Console setup

### Status on 11 August 2026

- Added and verified the URL-prefix property for `https://mamadi-company.vercel.app/` using an HTML meta tag.
- Submitted `sitemap.xml`; Search Console accepted the submission.
- The initial sitemap table briefly reported `Couldn't fetch`, but Search Console has now processed it successfully and discovered all 7 submitted pages.
- The homepage indexing request reached Google's live-URL test, but Google returned `Quota exceeded`. Retry the homepage and remaining priority URLs after the daily quota resets.

1. Open https://search.google.com/search-console.
2. Add a **URL-prefix property** for:

   `https://mamadi-company.vercel.app/`

3. Complete Google ownership verification.
4. If Google provides an HTML verification meta tag, add it to `index.html`, deploy it, and click **Verify** in Search Console.
5. Open **Sitemaps** in Search Console.
6. Submit:

   `sitemap.xml`

7. Confirm that Search Console reports the sitemap as successfully submitted.

## Request indexing

Use **URL Inspection** and request indexing for these URLs, beginning with the homepage:

1. https://mamadi-company.vercel.app/
2. https://mamadi-company.vercel.app/about
3. https://mamadi-company.vercel.app/projects
4. https://mamadi-company.vercel.app/sectors
5. https://mamadi-company.vercel.app/contact
6. https://mamadi-company.vercel.app/insights
7. https://mamadi-company.vercel.app/careers

For each URL:

1. Paste the full URL into the URL Inspection field.
2. Wait for Google to inspect it.
3. Use **Test live URL** if the indexed result still shows an old error.
4. Click **Request indexing**.

## Monitoring

- Check the **Page indexing** report for crawl or canonical errors.
- Check the **Sitemaps** report for discovered URLs and processing errors.
- Search Google periodically for `site:mamadi-company.vercel.app` and `"Mamadi International"`.
- Do not repeatedly request indexing for the same URL; it does not make crawling faster.
- Google discovery and ranking may take several days or weeks after a new launch.

## Recommended domain improvement

Connect a branded domain or subdomain, such as `international.mamadi.co.za`, when available. After connecting it:

1. Replace all canonical and sitemap URLs with the branded domain.
2. Permanently redirect the Vercel hostname to the branded domain.
3. Add and verify the branded property in Search Console.
4. Submit the branded sitemap and request indexing again.
