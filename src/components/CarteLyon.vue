<template>
  <v-zoomer :min-scale="minScale" :max-scale="maxScale" :zooming-elastic="zoomingElastic" :limit-translation="limitTranslation"
            style="width: 100vw; height: calc(100vh - 52px);">
    <vue-load-image>
      <img slot="image"
          src="/assets/images/cartes/1880-Plan_Lyon_Tramways_8000_compress.webp"/>
      <img class="image-loader" slot="preloader" src="/assets/images/loader.gif"/>
      <div slot="error">Une erreur s'est produite</div>
    </vue-load-image>
  </v-zoomer>
</template>

<script>
import VueLoadImage from 'vue-load-image';

export default {
  components: {
    'vue-load-image': VueLoadImage
  },
  data() {
    return {
      minScale: 1.1,
      maxScale: 12,
      zoomingElastic: false,
      limitTranslation: false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
