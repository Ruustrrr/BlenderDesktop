#include "player.hpp"

namespace platform {

void PlayerManager::addPlayer(const PlayerState& player) {
  players_.push_back(player);
}

const std::vector<PlayerState>& PlayerManager::players() const {
  return players_;
}

const PlayerState* PlayerManager::findById(const std::string& id) const {
  for (const auto& player : players_) {
    if (player.id == id) {
      return &player;
    }
  }
  return nullptr;
}

}  // namespace platform
