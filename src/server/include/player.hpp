#pragma once

#include <string>
#include <vector>

namespace platform {

struct PlayerState {
  std::string id;
  std::string name;
  float x = 0.0f;
  float y = 0.0f;
  float z = 0.0f;
};

class PlayerManager {
 public:
  void addPlayer(const PlayerState& player);
  const std::vector<PlayerState>& players() const;
  const PlayerState* findById(const std::string& id) const;

 private:
  std::vector<PlayerState> players_;
};

}  // namespace platform
