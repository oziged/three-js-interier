<template>
  <canvas ref="canvas" />
</template>

<script>
import gsap from 'gsap'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { loadObjects } from '@/services/threeJsService.js'

export default {
  props: {
    json_objects: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      cameraPos: {x: 0, y: 10, z: 0},
      cameraLookAt: {x: 0, y: 0, z: 0},
      renderer: null,
      camera: null,
      scene:  null,
      controls: null,
      loader: null,
      textureLoader: null,
      plane: null,
      objects: [] // {name: '123', model: <<gltf-model>>, meshes: [{name: 'red', model: <<texture-model>>}]}
    }
  },


  computed: {
    current() {
      return this.$store.state.current
    }
  },


  async mounted() {
    await this.init()
    this.animate()
  },

  methods: {
    async init() {
      this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: this.$refs.canvas }),
      this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 1000)
      this.camera.position.set(this.cameraPos.x, this.cameraPos.y, this.cameraPos.z)
      this.scene = new THREE.Scene()
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.maxPolarAngle = Math.PI/2.05
      this.controls.minDistance = 2;
	    this.controls.maxDistance = 5;
      this.loader = new GLTFLoader()
      this.textureLoader = new THREE.TextureLoader()
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.plane = new THREE.Mesh(
        new THREE.PlaneGeometry(17, 17, 1),
        new THREE.MeshPhongMaterial({color: 0x000000, shininess: 0, side: THREE.DoubleSide})
      );
      this.plane.rotation.x = 1.5708
      this.plane.receiveShadow = true;
      this.scene.add(this.plane);
      this.addLightsToScene()

      loadObjects(this.json_objects).then(objects => {
        this.addObjectsToScene(objects)
        this.$emit('objectsLoaded')
        this.cameraPos = {x: 0, y: 1, z: 4}
      })
    },

    animate() {
      this.handleResize()
      this.renderer.render( this.scene, this.camera );
      requestAnimationFrame( this.animate );
    },

    handleResize() {
      const canvas = this.renderer.domElement
      if (canvas.clientWidth != canvas.width || canvas.clientHeight != canvas.height) {
        this.renderer.setSize(canvas.clientWidth, canvas.clientHeight, false)
        this.camera.aspect = canvas.clientWidth / canvas.clientHeight
        this.camera.updateProjectionMatrix()
      }
    },

    addLightsToScene() {
      let light = new THREE.DirectionalLight( 0xFFFFFF, 2);
      light.position.set( 0, 10, 10 );

      let light2 = new THREE.DirectionalLight( 0xFFFFFF, 2);
      light2.position.set( 0, 10, -10 );

      light.castShadow = true;
      light2.castShadow = true;

      this.scene.add( light );
      this.scene.add( light2 );
    },

    addObjectsToScene(objects) {
      this.objects = objects

      objects.forEach(object => {
        if (object.transforms) {
          Object.entries(object.transforms).forEach(transform => {
            object.model[transform[0]].set(...transform[1])
          })
        }

        object.children = {}
        object.model.traverse(item => {
          if (item.isMesh) {
            if (object.name == 'shelf') {
              item.material.color.setHex('0x0B1815')
            }
            object.children[item.name] = item
            item.castShadow = true
          }
        })

        this.scene.add(object.model)
      })
    },
  },


  watch: {
    json_objects(next, prev) {
      this.objects.forEach(object => {
        this.scene.remove(object.model)
      })

      loadObjects(next).then(objects => {
        this.addObjectsToScene(objects)
        this.$emit('objectsLoaded')
      })
    },

    'current.object': function(next, prev) {
      let object = this.objects.find(obj => obj.name == this.current.object.name)
    },

    'current.mesh': function(next, prev) {
      this.cameraPos = this.current.mesh.camera.position
    },

    'current.texture': function(next, prev) {
      let object = this.objects.find(obj => obj.name == this.current.object.name)
      let meshFile = object.children[this.current.mesh.gltf_name]
      let textureFile = object.meshes.find(mesh => mesh.name == this.current.mesh.name).textures.find(texture => texture.name == this.current.texture.name).texture

      meshFile.material.map = textureFile
    },

    'current.color': function(next, prev) {
      let object = this.objects.find(obj => obj.name == this.current.object.name)
      Object.values(object.children).forEach(item => {
        item.material.color.setHex(next)
      })
    },

    cameraPos(next, prev) {
      let {x: px, y: py, z: pz} = this.cameraPos
      let {x: lx, y: ly, z: lz} = this.cameraLookAt
      gsap.to(this.camera.position, {x: px, y: py, z: pz, duration: 5, ease: 'power3.inOut', onUpdate: () => this.camera.lookAt(lx, ly, lz)})
    }
  }
}
</script>

<style lang="scss" scoped>
  canvas {
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    display: block;
    z-index: -1;
  }
</style>
