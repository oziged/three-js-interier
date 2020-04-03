<template>
  <div>
    <WebGLBackground :json_objects="json_objects" />
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
      json_objects: this.$store.state.json_objects
    }
  },


  computed: {
  },


  mounted() {
  },
}
</script>

<style>

</style>
