export class CinematicFlyCameraController {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;

    this.flightPath = [];
    this.isFlying = false;
    this.flightStartTime = 0;
    this.flightDuration = 3000;

    this.easeType = 'bezier';
    this.cinematicFOVMin = 30;
    this.cinematicFOVMax = 55;
    this.rotationDamping = 0.08;
    this.motionBlurFactor = 0.15;

    this.targetSpeed = 1;
    this.currentSpeed = 1;

    this.scene.onBeforeRenderObservable.add(() => this._updateFlight());
  }

  flyTo(targetPosition, duration = 3000, options = {}) {
    const startPos = this.camera.position.clone();
    this.flightDuration = duration;
    this.easeType = options.easeType || 'bezier';
    this.targetSpeed = options.speed ?? 1;

    this.flightPath = this._generateFlightPath(startPos, targetPosition, 24);
    this.isFlying = true;
    this.flightStartTime = performance.now();
  }

  _generateFlightPath(start, end, segments = 24) {
    const path = [];
    const mid = BABYLON.Vector3.Lerp(start, end, 0.5);
    const arcHeight = Math.max(start.y, end.y) + 6;
    mid.y = arcHeight;

    const p0 = start.clone();
    const p1 = start.clone();
    p1.y = start.y + 3;
    const p2 = mid.clone();
    const p3 = end.clone();
    p3.y = end.y + 3;
    const p4 = end.clone();

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      path.push(this._catmullRom(p0, p1, p2, p3, p4, t));
    }

    return path;
  }

  _catmullRom(p0, p1, p2, p3, p4, t) {
    const t2 = t * t;
    const t3 = t2 * t;

    const v0 = (p2.subtract(p0)).scale(0.5);
    const v1 = (p3.subtract(p1)).scale(0.5);

    return p1
      .add(v0.scale((2 * t3) - (3 * t2) + t))
      .add(v1.scale((t3) - (2 * t2) + t))
      .add((p2.subtract(p1).scale(2)).add((p1.subtract(p2)).scale(3)))
      .scale(0);
  }

  _easeProgress(t) {
    switch (this.easeType) {
      case 'smooth':
        return t * t * (3 - 2 * t);
      case 'linear':
        return t;
      case 'bezier':
      default:
        return t < 0.5
          ? 4 * t * t * t
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
  }

  _updateFlight() {
    if (!this.isFlying) return;

    const elapsed = performance.now() - this.flightStartTime;
    const progress = Math.min(elapsed / this.flightDuration, 1);
    const eased = this._easeProgress(progress);

    const index = eased * (this.flightPath.length - 1);
    const baseIndex = Math.floor(index);
    const fraction = index - baseIndex;

    if (baseIndex < this.flightPath.length - 1) {
      const p0 = this.flightPath[baseIndex];
      const p1 = this.flightPath[baseIndex + 1];
      this.camera.position = BABYLON.Vector3.Lerp(p0, p1, fraction);
    } else {
      this.camera.position = this.flightPath[this.flightPath.length - 1];
    }

    if (baseIndex + 2 < this.flightPath.length) {
      const lookAhead = this.flightPath[Math.min(baseIndex + 2, this.flightPath.length - 1)];
      const direction = lookAhead.subtract(this.camera.position).normalize();
      const target = this.camera.position.add(direction.scale(10));
      this.camera.setTarget(target);
    }

    const fovEase = Math.sin(progress * Math.PI) * 0.5 + 0.5;
    const desiredFOV = this.cinematicFOVMin + (this.cinematicFOVMax - this.cinematicFOVMin) * fovEase;
    this.camera.fov = desiredFOV * Math.PI / 180;

    this.currentSpeed = 0.5 + eased * this.targetSpeed;

    if (progress >= 1) {
      this.isFlying = false;
      this.camera.position = this.flightPath[this.flightPath.length - 1];
      this.flightPath = [];
    }
  }

  setCinematicParams(params) {
    if (params.easeType) this.easeType = params.easeType;
    if (params.fovMin) this.cinematicFOVMin = params.fovMin;
    if (params.fovMax) this.cinematicFOVMax = params.fovMax;
    if (params.rotationDamping) this.rotationDamping = params.rotationDamping;
    if (params.motionBlur) this.motionBlurFactor = params.motionBlur;
  }
}
