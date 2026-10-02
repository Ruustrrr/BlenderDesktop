#pragma once

#include <string>
#include <vector>

#include "portal.hpp"
#include "player.hpp"

namespace platform {

class World {
 public:
  explicit World(std::string name);

  void addPortal(const PortalDefinition& portal);
  void addPlayer(const PlayerState& player);

  const std::string& name() const;
  const std::vector<PortalDefinition>& portals() const;
  const std::vector<PlayerState>& players() const;

 private:
  std::string name_;
  std::vector<PortalDefinition> portals_;
  std::vector<PlayerState> players_;
};

}  // namespace platform
