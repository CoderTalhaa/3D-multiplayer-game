import * as THREE from "three";
import Experience from "../Experience.js";
import GUI from "lil-gui";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

     //! Debug
     if(this.debug.active)
     {
       this.debugFolder = this.debug.ui.addFolder('environment')
     }

    //^ Back Ground Sky Box
    this.bg = this.resources.items.skybox;
    this.backGround = this.bg.scene;
    this.setBackGround();

    //^ Lights
    this.setLights();
  }

  setBackGround() {
    //^ BACK Ground
    this.backGround.rotation.y = Math.PI;
    this.scene.add(this.backGround);
    //^ PLANE
    this.geometry = new THREE.PlaneGeometry(100, 100, 1, 1);
    this.material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    });
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.plane.rotation.x = -Math.PI / 2;
    this.plane.receiveShadow = true;
    this.scene.add(this.plane);
  }

  setLights() {
    this.sunlight = new THREE.DirectionalLight(0xffffff, 3);
    this.sunlight.position.set(0,200,100);
    this.sunlight.target.position.set(0, 0, 0);
    this.sunlight.castShadow = true;
    this.sunlight.shadow.bias = -0.01;
    this.sunlight.shadow.normalBias = 0.05;
    this.sunlight.shadow.mapSize.set(2048,2048)
    this.sunlight.shadow.camera.near = 1.0;
    this.sunlight.shadow.camera.far = 500;

    this.scene.add(this.sunlight);
    // this.helper = new THREE.CameraHelper(this.sunlight.shadow.camera);
    // this.scene.add(this.helper);

    this.ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(this.ambientLight);

  

  }

  onResize() {}

  update() {}
}
