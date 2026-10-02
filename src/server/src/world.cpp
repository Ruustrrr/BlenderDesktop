#include "world.hpp"

#include <utility>

namespace platform {

World::World(std::string name) : name_(std::move(name)) {}

void World::addPortal(const PortalDefinition& portal) {
  portals_.push_back(portal);
}

void World::addPlayer(const PlayerState& player) {
  players_.push_back(player);
}

const std::string& World::name() const {
  return name_;
}

const std::vector<PortalDefinition>& World::portals() const {
  return portals_;
}

const std::vector<PlayerState>& World::players() const {
  return players_;
}

}  // namespace platform
