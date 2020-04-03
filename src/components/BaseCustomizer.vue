<template>
  <div class="customizer">
    <ul v-if="type=='text'" class="items">
      <li class="item-text" @click="$emit('change', item.name)" v-for="(item, index) in items" :key="index">
        <span class="title">{{ item.name }}</span>
      </li>
    </ul>

    <ul v-if="type=='color'" class="items">
      <li class="item-color" :style="{backgroundColor: item.dom_color}" @click="$emit('change', item.three_color)" v-for="(item, index) in items" :key="index">
      </li>
    </ul>
  </div>

</template>

<script>
export default {
  props: {
    type: String,
    items: Array
  },

  data() {
    return {

    }
  },

  mounted() {
    console.log(1)
    console.log(this.items)
  }
}
</script>

<style lang="scss" scoped>
  .items {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90%;
    width: 100%;
    .item-text, .item-color {
      color: white;
      padding: 10px 20px;
      margin: 0 5px;
      height: 100%;
      min-width: 100px;
      border-radius: 5px;
      border: 2px solid rgba(255, 255, 255, 0.747);
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: .3s;
      &:hover {
        background: #feffff14;
      }
    }
    .item-color {
      height: 40px;
    }
  }
</style>
