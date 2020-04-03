<template>
  <div class="customizers-wrapper">
    <transition name="fade">
      <div
        v-if="deepLvl > 0"
        class="customizer-back"
        @click="handleBackClick"
      >
        <img src="@/assets/right-arrow.png" alt="">
      </div>
    </transition>

    <BaseCustomizer
      v-if="currentCustomizer == 'object'"
      :items="objects"
      type="text"
      @change="handleObjectChange"
    />

    <BaseCustomizer
      v-if="currentCustomizer == 'mesh'"
      :items="meshes"
      type="text"
      @change="handleMeshChange"
    />

    <BaseCustomizer
      v-if="currentCustomizer == 'texture'"
      :items="textures"
      type="text"
      @change="handleTextureChange"
    />

    <BaseCustomizer
      v-if="currentCustomizer == 'color'"
      :items="colors"
      type="color"
      @change="handleColorChange"
    />
  </div>
</template>

<script>
import BaseCustomizer from '@/components/BaseCustomizer'

export default {
  components: {
    BaseCustomizer
  },

  data() {
    return {
      currentCustomizer: 'object',
      colors: [{three_color: '0x222222', dom_color: '#C2C2C2'}, {three_color: '0x120C0C', dom_color: '#9B655F'}, {three_color: '0x0B1815', dom_color: '#67AD6F'}],
      deepLvl: 0
    }
  },

  computed: {
    objects() {
      return this.$store.state.json_objects
    },

    meshes() {
      return this.$store.state.current.object.meshes
    },

    textures() {
      return this.$store.state.current.mesh.textures
    }
  },


  methods: {
    handleObjectChange(name) {
      this.$store.dispatch('updateCurrent', {
        type: 'object',
        name
      })

      if (this.meshes.length) {
        this.currentCustomizer = 'mesh'
        this.deepLvl = 1
      }
    },

    handleMeshChange(name) {
      this.$store.dispatch('updateCurrent', {
        type: 'mesh',
        name
      })

      if (this.textures.length) this.currentCustomizer = 'texture'
      else this.currentCustomizer = 'color'

      this.deepLvl = 2
    },

    handleTextureChange(name) {
       this.$store.dispatch('updateCurrent', {
        type: 'texture',
        name
      })
    },

    handleColorChange(name) {
      this.$store.dispatch('updateCurrent', {
        type: 'color',
        name
      })
    },

    handleBackClick() {
      if (this.deepLvl == 0) return

      switch(this.deepLvl) {
        case 2:
          this.currentCustomizer = 'mesh'
        break

        case 1:
          this.currentCustomizer = 'object'
        break
      }

      this.deepLvl--
    }
  },
}
</script>

<style lang="scss" scoped>
  .customizers-wrapper {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 10vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;

    .customizer-back {
      position: absolute;
      left: 0;
      top: 0;
      width: 100px;
      height: 100%;
      max-width: 20vw;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
        color: white;
        object-fit: cover;
        transform: rotate(180deg) scale(.3);
      }
    }
  }
</style>
