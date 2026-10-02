export class WorldManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.engine = new BABYLON.Engine(this.canvas, true);
    this.scene = new BABYLON.Scene(this.engine);
    this.camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 2, 10), this.scene);
    this.camera.setTarget(BABYLON.Vector3.Zero());
    this.camera.attachControl(this.canvas, true);
    this.camera.speed = 0.5;
    this.camera.minZ = 0.1;
    this.camera.maxZ = 200;
  }

  setupScene() {
    this.scene.clearColor = new BABYLON.Color4(0.08, 0.12, 0.2, 1);

    const hemi = new BABYLON.HemisphericLight('hemi', new BABYLON.Vector3(0, 1, 0), this.scene);
    hemi.intensity = 0.9;

    const sun = new BABYLON.DirectionalLight('sun', new BABYLON.Vector3(-1, -2, -1), this.scene);
    sun.intensity = 0.7;

    const ground = BABYLON.MeshBuilder.CreateGround('ground', { width: 40, height: 40 }, this.scene);
    ground.position.y = -0.5;

    const material = new BABYLON.StandardMaterial('groundMat', this.scene);
    material.diffuseColor = new BABYLON.Color3(0.18, 0.22, 0.3);
    ground.material = material;

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }
}
