<template>
  <div id="app">
    <!-- <div id="nav"> -->
      <!-- <router-link to="/">Home</router-link> | -->
      <!-- <router-link to="/about">About</router-link> -->
    <!-- </div> -->
    <router-view/>
  </div>
</template>

<script>

import gsap from 'gsap'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
var camera, scene, renderer;
var geometry, material, mesh, light, controls;

init();
animate();

function init() {

    // camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 1000 );
    // camera.position.set(0,3, 3)

    // scene = new THREE.Scene();

    // geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    // material = new THREE.MeshPhongMaterial({color: 0xFFFFFF});

    // mesh = new THREE.Mesh( geometry, material );
    // // scene.add( mesh );

    // renderer = new THREE.WebGLRenderer( { antialias: true, shadowEnabled: true } );
    // renderer.setClearColor( 0xCCCCCC)
    // controls = new OrbitControls(camera, renderer.domElement);
    // controls.update()
    // renderer.setSize( window.innerWidth, window.innerHeight );
    // document.body.appendChild( renderer.domElement );

    // light = new THREE.PointLight( 0xFFFFFF, 2);
    // light.position.set( 0, 10, 10 );

    // let light2 = new THREE.PointLight( 0xFFFFFF, 2);
    // light2.position.set( 0, 10, -10 );

    // scene.add( light );
    // scene.add( light2 );


    // var geometry2 = new THREE.PlaneGeometry( 500, 500, 1 );
    // var material2 = new THREE.MeshBasicMaterial( {color: 0xBCBCBC, side: THREE.DoubleSide} );
    // var plane = new THREE.Mesh( geometry2, material2 );
    // plane.rotation.x = 1.5708
    // scene.add( plane );
    // var sphereSize = 1;
    // var pointLightHelper = new THREE.PointLightHelper( light, sphereSize );
    // scene.add( pointLightHelper );







}

function animate() {

    requestAnimationFrame( animate );

    // mesh.rotation.x += 0.01;
    // mesh.rotation.y += 0.02;

    // renderer.render( scene, camera );

}

// const loader = new GLTFLoader();
// loader.load(
//     'scene.gltf',
//     ( gltf ) => {
//       let item = gltf.scene.children[0]
//       scene.add(item)
//       let boundingBox = new THREE.Box3().setFromObject(item)
//       let size = boundingBox.getSize()

//       console.log(size)
//     })

//     loader.load(
//     'shelf/scene.gltf',
//     ( gltf ) => {
//       let item = gltf.scene.children[0]
//       item.scale.set(.02,.02,.02)
//       item.position.x = -2
//       item.rotation.z = 0.8
//       scene.add(item)
//       let boundingBox = new THREE.Box3().setFromObject(item)
//       let size = boundingBox.getSize()

//       console.log(size)
//     })

// loader.load(
//     'chair/scene.gltf',
//     ( gltf ) => {
//       let item = gltf.scene.children[0]
//       item.scale.set(.01,.01,.01)
//       scene.add(item)
//       item.position.x = 1.5
//       let boundingBox = new THREE.Box3().setFromObject(item)
//       let size = boundingBox.getSize()

//       console.log(size)

//       // item.position = boundingBox
//       console.log(boundingBox)
//       console.log(size)
//       // console.log(-boundingBox.min.z/2 + size.z)
//       // let cameraLookAt = {x: 0, y: 0, z: -1}
//       // camera.lookAt(0,0,0)

//       // item.position.z = - boundingBox.min.z - size.z / 2
//       // item.position.y = - boundingBox.min.y - size.y / 2
//       // item.position.x = - boundingBox.min.x - size.x / 2


//       // item.updateWorldMatrix(true, true)
//       // item.updateMatrixWorld()
//       // let a = 0
//       // let material = new THREE.MeshPhongMaterial({color: 0xffffff})
//       // item.traverse(el => {
//       //   if (el.isMesh || el.isSkinnedMesh) {
//       //     if (el.name == 'Material-Tessuto_SF') {
//       //       let texture = new THREE.TextureLoader().load( 'textures/Tessuto_SF_baseColor2.jpg')
//       //       texture.wrapS = THREE.RepeatWrapping;
//       //       texture.wrapT = THREE.RepeatWrapping;
//       //       // texture.repeat.set( .5, .5 );
//       //       setTimeout(() => {
//       //         el.material.map = texture
//       //       }, 2000);
//       //     }
//           // if (el.name == 'Object044_Oven_black_glass_0') {
//           //   setTimeout(() => {
//           //     el.material = new THREE.MeshPhongMaterial({color: 0x05B88F})
//           //     let a = el.getWorldPosition()
//           //     gsap.to(cameraLookAt, {...a, onUpdate: () => {
//           //         camera.lookAt(cameraLookAt.x, cameraLookAt.y, cameraLookAt.z)
//           //       }, duration: 3, ease: 'expo.inOut'})
//           //     gsap.to(camera.position, {z: a.z+2, duration: 3, ease: 'expo.inOut'})
//           //     // gsap.to(camera.position, {x: el.parent.position.x, y: el.parent.position.y, duration: 2, ease: 'power3.out'})
//           //   }, 2000);
//           // }

//           // if (el.name == 'Mesh001_FARTUK_0') {
//           //   // console.log(el.geometry)
//           //   let texture = new THREE.TextureLoader().load( 'textures/wall.jpg')
//           //   // console.log(texture)
//           //   texture.wrapS = THREE.RepeatWrapping;
//           //   texture.wrapT = THREE.RepeatWrapping;
//           //   texture.repeat.set( .5, .5 );
//           //   el.material.map = texture
//           // }
//         // }
//       // })
//     },
// );
export default {

}
</script>

<style lang="scss">
@import './assets/scss/main.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
