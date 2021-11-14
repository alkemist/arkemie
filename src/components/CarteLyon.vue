<template>
  <v-zoomer :max-scale="maxScale" :zooming-elastic="zoomingElastic" :limit-translation="limitTranslation"
            style="width: 100vw; height: calc(100vh - 52px);">
    <img
        src="/assets/images/cartes/1880-Plan_Lyon_Tramways_8000.jpg"
        style="object-fit: contain; width: 100%; height: 100%;"
    >
  </v-zoomer>
</template>

<script>
export default {
  data() {
    return {
      maxScale: 12,
      zoomingElastic: false,
      limitTranslation: false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
