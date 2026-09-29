# Werewolves
This is a utility tool to assign and manage roles for the group game "Werwölfe von Düsterwald".

It was built during the Covid-19 pandemic to play this game online (e.g. via Zoom). However, this site can also be used to play the game in real-life.

## Features

- Assign roles based on the number of players
  - Allows for group roles (more than 1 player per role)
- Add additional roles
- User sessions
  - Allow users with the same (or even different) roles in a single session
  - May be used to group players in the same Zoom breakout session
- Multiple result views
  - Group results by role, player or session

## Development

- `npm install` — install dependencies
- `npm run dev` — start the local development server
- `npm run build` — build the app for production
- `npm run lint` — run the linter

## Deployment

Pushes to `main` are automatically deployed to GitHub Pages via a GitHub Actions workflow. A custom domain can be configured via the repository settings.
