<template>
  <h1>Jekyll-Vue Template : {{message}}</h1>
</template>

<script>
export default {
  data() {
    return {
      message: 'HelloWorld2'
    }
  }
}
</script>

<style lang="scss" scoped>
$gray: darkslategrey;
h1 {
  color: $gray;
  font-size: 2rem;
}
</style>