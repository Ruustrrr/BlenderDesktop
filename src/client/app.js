import { WorldManager } from './babylon/world-manager.js';
import { PortalSystem } from './babylon/portal-system.js';

const canvas = document.getElementById('renderCanvas');
const worldManager = new WorldManager(canvas);
const portalSystem = new PortalSystem(worldManager.scene, worldManager.camera);

worldManager.setupScene();
portalSystem.addPortal({
  id: 'portal-city',
  name: 'City Hub',
  position: { x: 0, y: 1, z: -6 },
  color: '#4ade80',
  destination: 'city-hub',
  type: 'world'
});
portalSystem.addPortal({
  id: 'portal-market',
  name: 'Market Page',
  position: { x: 8, y: 1, z: -2 },
  color: '#60a5fa',
  destination: '/pages/market.html',
  type: 'html'
});
portalSystem.addPortal({
  id: 'portal-arena',
  name: 'Arena Game',
  position: { x: -8, y: 1, z: -2 },
  color: '#f59e0b',
  destination: 'arena-demo',
  type: 'game'
});

portalSystem.bindMovement();
portalSystem.updateNearestPortalLabel();

window.addEventListener('resize', () => {
  worldManager.engine.resize();
});
