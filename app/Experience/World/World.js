import * as THREE from "three";
import Experience from "../Experience.js";

import Player from "./Player.js";
import Environment from "./Environment.js";

import { EventEmitter } from "events";

export default class World extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;
    this.resources = this.experience.resources;

    this.resources.on("ready", () => {
      this.player = new Player();
      this.environment = new Environment();
    });
  }

  

  onResize() {}

  update() {
    if(this.player){
        this.player.update()
    }
    if(this.environment){
        this.environment.update()
    }
  }
}
