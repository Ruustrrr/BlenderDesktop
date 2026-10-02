#include "portal.hpp"

namespace platform {

void PortalSystem::addPortal(const PortalDefinition& portal) {
  portals_.push_back(portal);
}

const std::vector<PortalDefinition>& PortalSystem::portals() const {
  return portals_;
}

const PortalDefinition* PortalSystem::findById(const std::string& id) const {
  for (const auto& portal : portals_) {
    if (portal.id == id) {
      return &portal;
    }
  }
  return nullptr;
}

}  // namespace platform
