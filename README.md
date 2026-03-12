# Nupreeth Resume Website

Personal resume and portfolio website for Nupreeth Mandappa K V.

Live site:
`https://nupreeth-resume.vercel.app`

Repository:
`https://github.com/Nupreeth/resume`

## What is included

- responsive one-page resume website
- direct PDF resume download
- GitHub and LinkedIn profile links
- profile photo
- selected projects, skills, experience, and highlights
- dynamic GitHub contributions section for 2026

## Tech

- static HTML, CSS, and JavaScript
- Vercel deployment
- Vercel serverless API route for public GitHub contributions

## Dynamic GitHub contributions

The GitHub contribution section is loaded through:

`api/github-contributions.js`

It fetches only public contribution data from GitHub and returns:

- contribution count
- year
- contribution calendar markup

No personal GitHub token is exposed in the browser.

## Local structure

- `index.html` : main site
- `Nupreeth_Resume.pdf` : downloadable resume
- `Nupreeth_Updated_PassportSize.jpg` : profile image
- `api/github-contributions.js` : serverless endpoint for GitHub activity

## Deploy

This project is set up to work well on Vercel.

To deploy manually:

```powershell
npx.cmd --yes vercel --prod --yes --scope nupreethm-4222s-projects
```

## Update content

Edit `index.html` to update:

- summary text
- skills
- projects
- experience
- links

Replace the PDF or image file if newer versions are available.
