<template>
  <vue-cal class="vuecal--blue-theme" locale="fr" :time="false"
      active-view="month" hide-view-selector :disable-views="['years', 'year', 'week', 'day']"
           events-on-month-view="short"
           :events="articles" :on-event-click="onEventClick" today-button
  />
</template>

<script>
import axios from 'axios';
import VueCal from 'vue-cal'
import 'vue-cal/dist/i18n/fr.js'
import 'vue-cal/dist/vuecal.css'

export default {
  components: { VueCal },
  data () {
    return {
      selectedEvent: {},
      showDialog: false,
      articles: []
    }
  },
  methods: {
    onEventClick (event, e) {
      this.selectedEvent = event;
      this.showDialog = true;
      e.stopPropagation()
    }
  },
  mounted () {
    axios
        .get('/search.json')
        .then(response => {
          this.articles = response.data.map(article => {
            return {
              start: article.date,
              end: article.date,
              title: article.title,
              content: '',
              class: ''
            };
          });
        });
  }
}
</script>

<style lang="scss" scoped>
  .vuecal{
    width: 100vw;
    height: calc(100vh - 52px);
  }
</style>
