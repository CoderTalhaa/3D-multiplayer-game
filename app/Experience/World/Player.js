import * as THREE from "three";
import Experience from "../Experience.js";

import Zombie from "./Zombie.js"


export default class Player {
  constructor() {
    this.experience = new Experience();
    this.zombie = new Zombie();
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;
    this.soldier = this.resources.items.soldier;
    // Containes the model
    this.model = this.soldier.scene;
    // Containes the animations of the model
    this.animations = this.soldier.animations;
    console.log(this.animations);

    this.speed = 0.3; // Adjust the speed as needed
    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;

    this.mixer = new THREE.AnimationMixer(this.model);

    this.idleAction = this.mixer.clipAction(this.animations[0]);
    this.walkAction = this.mixer.clipAction(this.animations[1]);
    this.runAction = this.mixer.clipAction(this.animations[2]);

    this.idleAction.play();

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    // Set up event listeners
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);

    this.init();
  }

  init() {
    this.scene.add(this.model);
    this.model.scale.set(8,8,8);
    this.model.position.set(0,0,10);
  }

  handleKeyDown(event) {
    switch (event.code) {
      case "ArrowUp":
      case "KeyW":
        this.moveForward = true;
        this.walkAction.play();
        break;
      case "ArrowDown":
      case "KeyS":
        this.moveBackward = true;
        this.walkAction.play();
        break;
      case "ArrowLeft":
      case "KeyA":
        this.moveLeft = true;
        this.walkAction.play();
        break;
      case "ArrowRight":
      case "KeyD":
        this.moveRight = true;
        this.walkAction.play();
        break;
    }
  }

  handleKeyUp(event) {
    switch (event.code) {
      case "ArrowUp":
      case "KeyW":
        this.moveForward = false;
        break;
      case "ArrowDown":
      case "KeyS":
        this.moveBackward = false;
        break;
      case "ArrowLeft":
      case "KeyA":
        this.moveLeft = false;
        break;
      case "ArrowRight":
      case "KeyD":
        this.moveRight = false;
        break;
    }

    // Pause the walking animation when no movement keys are pressed
    if (
      !this.moveForward &&
      !this.moveBackward &&
      !this.moveLeft &&
      !this.moveRight
    ) {
      this.idleAction.play();
      this.walkAction.stop();
      this.runAction.stop();
    }
  }

  handlePlayerMovement() {
    // Your movement logic here

    // For example, move the player forward based on the animation speed
    const speed = this.speed;
    if (this.moveForward) this.model.translateZ(-speed);
    if (this.moveBackward) this.model.translateZ(speed);
    if (this.moveLeft) this.model.translateX(-speed);
    if (this.moveRight) this.model.translateX(speed);
  }

  onResize() {}

  update() {
    // Update animations
    if (this.zombie) {
      this.zombie.update(this.time.delta);
    }
    if (this.mixer) {
      this.mixer.update(this.time.delta);
    }

    // Update player position based on movement flags
    if (
      this.moveForward ||
      this.moveBackward ||
      this.moveLeft ||
      this.moveRight
    ) {
      this.handlePlayerMovement();
    }
  }
}