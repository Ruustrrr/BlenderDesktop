export class PortalSystem {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this.portals = [];
    this.label = document.getElementById('portal-label');
  }

  addPortal(config) {
    const mesh = BABYLON.MeshBuilder.CreateBox(config.id, { size: 1 }, this.scene);
    mesh.position = new BABYLON.Vector3(config.position.x, config.position.y, config.position.z);
    mesh.material = new BABYLON.StandardMaterial(`${config.id}-mat`, this.scene);
    mesh.material.emissiveColor = new BABYLON.Color3.FromHexString(config.color);

    this.portals.push({ ...config, mesh });
  }

  bindMovement() {
    this.scene.onBeforeRenderObservable.add(() => {
      const cameraPos = this.camera.position;
      let nearest = null;
      let nearestDistance = Number.MAX_SAFE_INTEGER;

      for (const portal of this.portals) {
        const distance = cameraPos.subtract(portal.mesh.position).length();
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearest = portal;
        }
      }

      if (nearest) {
        this.label.textContent = `Nearest portal: ${nearest.name} (${nearest.type})`;
      } else {
        this.label.textContent = 'Nearest portal: none';
      }
    });
  }

  updateNearestPortalLabel() {
    this.label.textContent = 'Nearest portal: none';
  }
}
