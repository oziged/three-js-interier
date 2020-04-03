<template>
  <div class="customizer">
    <ul v-if="type=='text'" class="items">
      <li class="item" @click="$emit('change', item.name)" v-for="(item, index) in items" :key="index">
        <span class="title">{{ item.name }}</span>
      </li>
    </ul>

    <ul v-if="type=='texture'" class="items">
      <li class="item item-texture" @click="$emit('change', item.name)" v-for="(item, index) in items" :key="index">
        <img :src="item.url">
      </li>
    </ul>

    <ul v-if="type=='color'" class="items">
      <li class="item item-color" :style="{backgroundColor: item.dom_color}" @click="$emit('change', item.three_color)" v-for="(item, index) in items" :key="index">
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
}
</script>

<style lang="scss" scoped>
  .items {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90%;
    width: 100%;
    .item {
      color: white;
      padding: 10px 20px;
      margin: 0 5px;
      height: 100%;
      min-width: 100px;
      border-radius: 5px;
      border: 2px solid rgba(255, 255, 255, 0.24);
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
    .item-texture {
      height: 40px;
      width: 100px;
      padding: 0;
      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
