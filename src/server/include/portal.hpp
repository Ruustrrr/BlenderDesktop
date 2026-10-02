#pragma once

#include <string>
#include <vector>

namespace platform {

enum class PortalType {
  kWorld,
  kHtmlPage,
  kGame
};

struct PortalDefinition {
  std::string id;
  std::string name;
  PortalType type;
  std::string destination;
  float x = 0.0f;
  float y = 0.0f;
  float z = 0.0f;
};

class PortalSystem {
 public:
  void addPortal(const PortalDefinition& portal);
  const std::vector<PortalDefinition>& portals() const;
  const PortalDefinition* findById(const std::string& id) const;

 private:
  std::vector<PortalDefinition> portals_;
};

}  // namespace platform
