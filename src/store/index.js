import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    current: {
      object: {},
      mesh: {},
      texture: {},
      color: {}
    },
    json_objects: [
      {
        name: 'sofa',
        file_url: 'sofa/scene.gltf',
        transforms: {
          position: [.3, 0, 0],
        },
        img: 'https://images.vexels.com/media/users/3/127699/isolated/preview/d02eb03d0fd65b4e9ccc90a0258ace2b-flat-sitting-sofa-by-vexels.png',
        meshes: [
          {
            name: 'Main color',
            img: '',
            gltf_name: 'Material-Tessuto_SF',
            camera: {
              position: {
                x: 2,
                y: 1.2,
                z: 1
              }
            },
            textures: [
              {
                name: 'green',
                url: 'sofa/textures/Tessuto_SF_baseColor.jpeg'
              },
              {
                name: 'blue',
                url: 'sofa/textures/Tessuto_SF_baseColor2.jpg'
              }
            ]
          },
          {
            name: 'Back color',
            img : '',
            gltf_name: 'Material-Cuoio',
            camera: {
              position: {
                x: 1.5,
                y: 1.3,
                z: -1
              }
            },
            textures: [
              {
                name: 'wood',
                url: 'sofa/textures/Cuoio_baseColor.jpeg'
              },
              {
                name: 'red',
                url: 'sofa/textures/Cuoio_baseColor2.jpg'
              }
            ]
          }
        ]
      },

      {
        name: 'shelf',
        file_url: 'shelf/scene.gltf',
        transforms: {
          scale: [.02, .02, .02],
          position: [-1.3, 0, 0],
          rotation: [-1.5707963267948963, 0, 1.5708]
        },
        meshes: [
          {
            name: 'Color',
            camera: {
              position: {
                x: -2.5,
                y: 1.3,
                z: 1
              },
            },
            textures: []
          }
        ]
      },
    ],

    loaded_objects: []
  },


  mutations: {
    SET_STATE_DATA(state, payload) {
      console.log(payload.type)
      Object.entries(payload).forEach(item => {
        state[item[0]] = item[1]
      })
    },

    SET_CURRENT(state, payload) {
      if (payload.type == 'object') {
        state.current.object = state.json_objects.find(obj => obj.name == payload.name)
      }

      if (payload.type == 'mesh') {
        state.current.mesh = state.current.object.meshes.find(mesh => mesh.name == payload.name)
      }

      if (payload.type == 'texture') {
        state.current.texture = state.current.mesh.textures.find(texture => texture.name == payload.name)
      }

      if (payload.type == 'color') {
        state.current.color = payload.name
      }
    }
  },


  actions: {
    async updateCurrent({ state, commit }, payload) {
      commit('SET_CURRENT', payload)
    }
  },


  getters: {
  },


  modules: {
  }
})
