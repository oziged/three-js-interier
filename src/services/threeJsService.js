import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const modelLoader = new GLTFLoader()
const textureLoader = new THREE.TextureLoader()

export function loadObjects(json_objects) {
  let objects = []

  for (let i = 0; i < json_objects.length; i++) {
    objects.push(loadObject(json_objects[i]))
  }

  return Promise.all(objects)
}

export function loadObject(object) {
  let model
  let meshes = []

  let modelPromise = new Promise((resolve, reject) => {
    modelLoader.load(object.file_url, resolve)
  }).then(gltf => model = gltf.scene.children[0])

  for (let i = 0; i < object.meshes.length; i++) {
    meshes.push(loadMesh(object.meshes[i]))
  }

    return Promise.all(meshes.concat([modelPromise])).then(res => {
    return {
      name: object.name,
      model,
      transforms: object.transforms,
      meshes: res.slice(0, res.length-1)
    }
  })
}

export async function loadMesh(mesh) {
  let textures = []
  let images = []

  for (let i = 0; i < mesh.textures.length; i++) {
    textures.push(loadTexture(mesh.textures[i]))
    images.push(loadImgPromise(mesh.textures[i].url))
  }

  await Promise.all(images)
  return Promise.all(textures).then(loaded_textures => {
    return {
      name: mesh.name,
      gltf_name: mesh.gltf_name,
      camera: mesh.camera,
      textures: loaded_textures.slice(0, loaded_textures.length)
    }
  })
}

export function loadTexture(texture) {
  return new Promise(resolve => {
    textureLoader.load(texture.url, resolve)
  }).then(loaded_texture => {
    return {
      name: texture.name,
      texture: loaded_texture
    }
  })
}

export function loadImgPromise(url) {
  return new Promise((resolve, reject) => {
    let img = new Image()
    img.src = url
    console.log(img)
    img.onload = resolve
  })
}
