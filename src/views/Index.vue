<template>
  <div>
    <transition name="fade">
      <div class="fullscreen-loader" v-if="isLoading">
        <vue-loaders-ball-grid-pulse />
      </div>
    </transition>
    <WebGLBackground :json_objects="json_objects" @objectsLoaded="isLoading=false"/>
    <CustomizersHandler />
  </div>
</template>

<script>
import WebGLBackground from '@/components/index/WebGLBackground'
import CustomizersHandler from '@/components/index/CustomizersHandler'

export default {
  components: {
    WebGLBackground,
    CustomizersHandler
  },


  data() {
    return {
      json_objects: this.$store.state.json_objects,
      isLoading: true
    }
  },


  computed: {
  },


  mounted() {
  },
}
</script>

<style lang="scss" scoped>
  .fullscreen-loader {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: black;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
