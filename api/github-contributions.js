const CONTRIBUTIONS_REGEX =
  /<h2[^>]*id="js-contribution-activity-description"[^>]*>\s*([\d,]+)\s*contributions?\s*in\s*(\d{4})\s*<\/h2>/i;

const CALENDAR_REGEX =
  /<div style="max-width:\s*100%; overflow-y:\s*hidden; overflow-x:\s*auto">([\s\S]*?)<\/table>\s*<\/div>/i;

function cleanCalendarHtml(html) {
  return html
    .replace(/\s(data-hydro-click|data-hydro-click-hmac|data-view-component|class)="[^"]*"/gi, "")
    .replace(/\sstyle="[^"]*"/gi, "")
    .trim();
}

export default async function handler(request, response) {
  const yearParam = Array.isArray(request.query.year) ? request.query.year[0] : request.query.year;
  const year = /^\d{4}$/.test(yearParam || "") ? yearParam : "2026";

  const from = `${year}-01-01`;
  const to = `${year}-12-31`;
  const githubUrl = `https://github.com/users/Nupreeth/contributions?from=${from}&to=${to}`;

  try {
    const githubResponse = await fetch(githubUrl, {
      headers: {
        "User-Agent": "nupreeth-resume-vercel",
        Accept: "text/html",
      },
    });

    if (!githubResponse.ok) {
      response.status(githubResponse.status).json({ error: "Failed to fetch GitHub contributions." });
      return;
    }

    const html = await githubResponse.text();
    const countMatch = html.match(CONTRIBUTIONS_REGEX);
    const calendarMatch = html.match(CALENDAR_REGEX);

    if (!countMatch || !calendarMatch) {
      response.status(502).json({ error: "Could not parse GitHub contributions." });
      return;
    }

    response.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    response.status(200).json({
      year: countMatch[2],
      count: countMatch[1],
      calendarHtml: cleanCalendarHtml(calendarMatch[1]),
      source: githubUrl,
    });
  } catch (error) {
    response.status(500).json({ error: "Unexpected error while loading GitHub contributions." });
  }
}
