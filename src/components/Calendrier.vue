<template>
  <div>
    <vue-cal class="vuecal--blue-theme" locale="fr" :time="false"
             active-view="month" hide-view-selector :disable-views="['years', 'year', 'week', 'day']"
             events-on-month-view="short"
             :events="articles" :on-event-click="onEventClick" today-button
    />
    <v-dialog v-model="showDialog">
      <v-card>
        <v-card-title>
          <span v-html="selectedEvent.title"></span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <p v-html="selectedEvent.content"></p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              text
              v-bind:href="selectedEvent.url"
              @click="dialog = false"
          >
            Voir l'article
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import VueCal from 'vue-cal'
import 'vue-cal/dist/i18n/fr.js'
import 'vue-cal/dist/vuecal.css'
import 'vuetify/dist/vuetify.min.css'

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
              content: article.description,
              url: article.url
            };
          });
        });
  }
}
</script>

<style lang="scss">
  .vuecal{
    width: calc(100vw - 0.5vmax);
    height: calc(100vh - 52px);
  }
  .vuecal__event{
    left: 1px;
    right: 1px;
    background-color: rgba(76, 172, 175, 0.35);
  }
  .vuecal--short-events .vuecal__event-title{
    white-space: normal;
  }
  .vuecal--month-view .vuecal__cell-content {
    justify-content: flex-start;
    height: 100%;
    align-items: flex-end;
  }
  hr{
    margin: 0 auto 1rem;
  }

  .vuecal--month-view .vuecal__cell-date {padding: 4px;}
  .vuecal--month-view .vuecal__no-event {display: none;}
  
  .vuecal__cell--today {background: rgba(0,0,0,0.1) !important;}
</style>
