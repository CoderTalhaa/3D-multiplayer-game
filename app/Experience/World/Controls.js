import * as THREE from "three";
import Experience from "../Experience.js";


import { Capsule } from "three/examples/jsm/math/Capsule.js";

export default class Controls {
  constructor() {
    // this.zombie = new Zombie();
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;

    this.initPlayer();
    this.initControls();

    this.addEventListeners();
  }

  initPlayer() {
    this.player = {};
    this.player.body = this.camera.perspectiveCamera;

    this.player.onFloor = false;
    this.player.gravity = 60;

    this.player.spawn = {
      position: new THREE.Vector3(),
      rotation: new THREE.Euler(),
      velocity: new THREE.Vector3(),
    };

    this.player.raycaster = new THREE.Raycaster();

    this.player.height = 1.7;
    this.player.position = new THREE.Vector3();
    this.player.rotation = new THREE.Euler();
    this.player.rotation.order = "YXZ";

    this.player.velocity = new THREE.Vector3();
    this.player.direction = new THREE.Vector3();

    this.player.speedMultiplier = 0.8;

    this.player.collider = new Capsule(
      new THREE.Vector3(),
      new THREE.Vector3(),
      0.35
    );
  }
  initControls() {
    this.actions = {};
  }

  onDesktopPointerMover = (e) => {
    if (document.pointerLockElement !== document.body) return;
    this.player.body.rotation.order = this.player.rotation.order;

    this.player.body.rotation.x -= e.movementY / 500;
    this.player.body.rotation.y -= e.movementX / 500;

    this.player.body.rotation.x = THREE.MathUtils.clamp(
      this.player.body.rotation.x,
      -Math.PI / 2,
      Math.PI / 2
    );
  };

  onKeyDown = (e) => {
    if (document.pointerLockElement !== document.body) return;

    if (e.code === "KeyW") {
      this.actions.forward = true;
    }
    if (e.code === "KeyS") {
      this.actions.backward = true;
    }
    if (e.code === "KeyA") {
      this.actions.left = true;
    }
    if (e.code === "KeyD") {
      this.actions.right = true;
    }
    if (e.code === "ShiftLeft") {
      this.actions.run = true;
    }
    if (e.code === "Space") {
      this.actions.jump = true;
    }
  };
  onKeyUp = (e) => {
    if (document.pointerLockElement !== document.body) return;

    if (e.code === "KeyW") {
      this.actions.forward = false;
    }
    if (e.code === "KeyS") {
      this.actions.backward = false;
    }
    if (e.code === "KeyA") {
      this.actions.left = false;
    }
    if (e.code === "KeyD") {
      this.actions.right = false;
    }
    if (e.code === "ShiftLeft") {
      this.actions.run = false;
    }
    if (e.code === "Space") {
      this.actions.jump = false;
    }
  };

  onPointerDown = (e) => {
    if (e.pointerType === "mouse") {
      document.body.requestPointerLock();
      return;
    }
  };

  addEventListeners() {
    document.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("keyup", this.onKeyUp);

    document.addEventListener("pointermove", this.onDesktopPointerMover);
    document.addEventListener("pointerdown", this.onPointerDown);
  }

  onResize() {}

  update() {
    if (this.zombie) {
      this.zombie.update();
    }
    
    
  }
}
