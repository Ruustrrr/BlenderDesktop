#include <iostream>
#include <string>

#include "portal.hpp"
#include "world.hpp"

int main() {
  platform::World world("Open World Hub");

  world.addPortal({
      "portal-hub-city",
      "City Hub",
      platform::PortalType::kWorld,
      "city-hub",
      0.0f,
      0.0f,
      0.0f,
  });

  world.addPortal({
      "portal-market-page",
      "Market Portal",
      platform::PortalType::kHtmlPage,
      "/pages/market.html",
      10.0f,
      0.0f,
      5.0f,
  });

  world.addPortal({
      "portal-arena-game",
      "Arena Game",
      platform::PortalType::kGame,
      "arena-demo",
      20.0f,
      0.0f,
      0.0f,
  });

  world.addPlayer({"player-1", "Traveler", 0.0f, 1.0f, 0.0f});

  std::cout << "World server started: " << world.name() << "\n";
  std::cout << "Portal count: " << world.portals().size() << "\n";
  std::cout << "Player count: " << world.players().size() << "\n";
  std::cout << "Available travel routes: " << world.portals().size() << "\n";

  return 0;
}
