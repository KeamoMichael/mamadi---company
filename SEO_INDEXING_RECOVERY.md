# Mamadi International Google Indexing Recovery

## Production website

- Website: https://www.mamadiinternational.com/
- Sitemap: https://www.mamadiinternational.com/sitemap.xml
- Robots file: https://www.mamadiinternational.com/robots.txt

## Technical fixes completed

- Replaced canonical URLs that incorrectly pointed to the older `mamadi.co.za` WordPress website.
- Added a static self-referencing canonical URL to the production homepage.
- Updated page-level canonical and Open Graph URLs.
- Updated Organization and WebSite structured data for Mamadi International.
- Added Mamadi International social profiles to the Organization structured data.
- Updated every URL in `sitemap.xml` to the production domain.
- Updated the sitemap reference in `robots.txt`.
- Added Vercel SPA rewrites so direct routes such as `/about` and `/projects` return HTTP 200 instead of 404.
- Added a host-specific `X-Robots-Tag: noindex` response header to the Vercel hostname so only the branded domain is eligible for Google indexing.
- Verified the live homepage, About page, Projects page, robots file, and sitemap.

## Google Search Console setup

### Status on 11 August 2026

- Added and verified the initial Vercel URL-prefix property using an HTML meta tag; the branded `https://www.mamadiinternational.com/` property is the primary property going forward.
- Submitted `sitemap.xml`; Search Console accepted the submission.
- The initial sitemap table briefly reported `Couldn't fetch`, but Search Console has now processed it successfully and discovered all 7 submitted pages.
- The earlier Vercel-property homepage request returned `Quota exceeded`; the branded-domain request below was accepted successfully.
- Added and verified the primary URL-prefix property for `https://www.mamadiinternational.com/`.
- Submitted the branded-domain sitemap and confirmed that Google discovered the branded homepage from it.
- Requested indexing for `https://www.mamadiinternational.com/`; Google accepted it into the priority crawl queue.

1. Open https://search.google.com/search-console.
2. Add a **URL-prefix property** for:

   `https://www.mamadiinternational.com/`

3. Complete Google ownership verification.
4. If Google provides an HTML verification meta tag, add it to `index.html`, deploy it, and click **Verify** in Search Console.
5. Open **Sitemaps** in Search Console.
6. Submit:

   `sitemap.xml`

7. Confirm that Search Console reports the sitemap as successfully submitted.

## Request indexing

Use **URL Inspection** and request indexing for these URLs, beginning with the homepage:

1. https://www.mamadiinternational.com/
2. https://www.mamadiinternational.com/about
3. https://www.mamadiinternational.com/projects
4. https://www.mamadiinternational.com/sectors
5. https://www.mamadiinternational.com/contact
6. https://www.mamadiinternational.com/insights
7. https://www.mamadiinternational.com/careers

For each URL:

1. Paste the full URL into the URL Inspection field.
2. Wait for Google to inspect it.
3. Use **Test live URL** if the indexed result still shows an old error.
4. Click **Request indexing**.

## Monitoring

- Check the **Page indexing** report for crawl or canonical errors.
- Check the **Sitemaps** report for discovered URLs and processing errors.
- Search Google periodically for `site:www.mamadiinternational.com` and `"Mamadi International"`.
- Do not repeatedly request indexing for the same URL; it does not make crawling faster.
- Google discovery and ranking may take several days or weeks after a new launch.

## Recommended domain improvement

The branded domain is now connected. Keep the following configuration in place:

1. Keep all canonical and sitemap URLs on `https://www.mamadiinternational.com`.
2. Permanently redirect the Vercel hostname to the branded domain when possible.
3. Use the branded property as the primary Search Console property.
4. Submit the branded sitemap and request indexing on the branded URLs.
