# BlenderDesktop Platform

This repository has been re-oriented from an upstream Blender mirror into a custom open-world game platform inspired by the way Blender organizes complex systems: modular subsystems, scene graphs, tools, runtime services, and extensible architecture.

The goal is not to copy Blender code. Instead, this project uses Blender as a reference for how large systems can be structured cleanly and purposely.

## Vision

The product is a browser-first, open-world game platform where players move through a persistent 3D environment, travel naturally through space, and use portals to jump between:

- connected world regions
- static HTML pages and content hubs
- embedded mini-games
- other app surfaces and experiences

The primary navigation model is travel: you move through the world to reach destinations. Teleportation remains available as a quick and optional alternative.

## Core concept

- Open-world exploration
- Natural movement and travel
- Portal-based transitions
- HTML/browser interfaces mixed with 3D world navigation
- Game experiences embedded inside a larger platform
- C++ world server and Babylon.js client runtime

## Architecture inspiration

This project follows a Blender-like modular design, without copying Blender source:

- `core/` — shared data, engine primitives, runtime utilities
- `world/` — zones, scenes, entities, spatial state
- `portals/` — transitions, destinations, teleport logic
- `tools/` — editor and world-authoring utilities
- `ui/` — overlays, screens, HUD, browser surfaces
- `networking/` — session, player, and message routing
- `server/` — C++ runtime for authoritative state and server logic
- `client/` — Babylon.js frontend and browser composition layer

## Project layout

```text
src/
  client/
    index.html
    styles.css
    app.js
    babylon/
      world-manager.js
      portal-system.js
  server/
    CMakeLists.txt
    include/
      world.hpp
      portal.hpp
      player.hpp
    src/
      main.cpp
      world.cpp
      portal.cpp
      player.cpp
  shared/
    protocol/
      messages.hpp
```

## Runtime stack

- Babylon.js for the 3D browser experience
- HTML and browser pages for portal destinations and web-like content
- C++ server for world/session state and routing
- modular tool framework for world building, portals, and content authoring

## Build and run

### Browser client

```bash
cd src/client
python3 -m http.server 8080
```

Then open `http://localhost:8080` in a browser.

### C++ server

```bash
mkdir build
cd build
cmake ..
make -j$(nproc)
```

## Current starter state

This repository currently contains:

- a minimal C++ server skeleton
- a Babylon.js browser shell
- a portal concept for transitions between worlds, pages, and mini-games
- a modular project structure ready to expand

## Roadmap

- [ ] Babylon.js scene bootstrap
- [ ] world manager and chunked scene state
- [ ] portal logic and teleportation behavior
- [ ] browser page transitions
- [ ] C++ world service and portal registry
- [ ] player/session tracking
- [ ] creator tool layer
- [ ] embedded mini-game launcher integration
