import * as THREE from "three";
import Experience from "../Experience.js";


export default class Zombie {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;
    this.player = this.resources.items.zombie;
    this.soldier = this.resources.items.soldier;
    this.dance = this.resources.items.dance;

    //! Debug
    if(this.debug.active)
    {
      this.debugFolder = this.debug.ui.addFolder('Zombie')
    }
  

    this.setModel();
    this.setAnimation();
  }

  setModel() {
    this.player.children.forEach((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child instanceof THREE.Group) {
        child.children.forEach((groupchild) => {
          groupchild.castShadow = true;
          groupchild.receiveShadow = true;
        });
      }
    });

    this.scene.add(this.player);
    this.player.scale.set(0.1, 0.1, 0.1);
    this.player.position.set(0, 1, 0);
  }

  setAnimation() {
    
      this.mixer = new THREE.AnimationMixer(this.player);
      const idle = this.mixer.clipAction(this.dance.animations[0]);
      idle.play();
      // console.log(anim)

    
  
  }

  onResize() {}

  update() {
    this.mixer.update(this.time.delta);
  }
}
