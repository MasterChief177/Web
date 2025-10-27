# Solar System Explorer

This project renders an interactive Three.js visualization of the Sun, planets, and prominent moons using real orbital parameters.

## Running the simulation

No build step is required. Open `index.html` in any modern browser (Chrome, Firefox, Edge, or Safari) to launch the experience. A local HTTP server is recommended to avoid browser security restrictions on loading JSON assets:

```bash
python -m http.server 8000
```

Then visit <http://localhost:8000> and select `index.html`.

## Features

- Physically-inspired orbits driven by Keplerian motion for planets and moons
- Hover tooltips with curated metadata for each body
- Atmospheric starfield backdrop and responsive UI overlay
- Automatic fallback to a bundled dataset when network requests are unavailable
