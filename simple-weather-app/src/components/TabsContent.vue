<template>
  <div class="tabs-content">
    <div class="content" v-if="showData">
      <NextHours :data="weatherData.next5hours"></NextHours>
      <NextDays :data="weatherData.dailyTemps"></NextDays>
    </div>
  </div>
</template>

<script>
import api from '../services/api'
import NextHours from './NextHours';
import NextDays from './NextDays';
export default {
  name: "TabsContent",
  components: {
    NextHours,
    NextDays
  },
  props: {
    cityName: String,
    countryCode: String
  },
  data() {
    return {
      weatherData: [],
      showData: false
    }
  },
  created() {
    console.log(this.countryCode)
    this.getWeatherData(this.cityName);
  },
  methods: {
    getDateFromTimestamp(timestamp) {
      const date = new Date(timestamp * 1000);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },

    getWeatherData(city) {
      let data = {};
      if (this.countryCode !== '') {
        data = {
          city: city,
          country: this.countryCode
        }
      } else {
        data = {
          city: city
        }
      }

      api({
        url: `/weather`,
        method: "get",
        params: data
      })
        .then(response => {
          const responseData = response.data;
          this.weatherData = responseData;
          this.showData = true;

          console.log("Daily max and min temperatures:", this.weatherData);

        })
        .catch(e => console.log(e));
    }
  },
  watch: {
    cityName(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.getWeatherData(newValue);
      }
    }
  },
};
</script>
<style lang="scss">
@mixin sm-viewport {
  @media (min-width: 48em) {
    @content;
  }
}

@mixin md-viewport {
  @media (min-width: 62em) {
    @content;
  }
}

@mixin lg-viewport {
  @media (min-width: 75em) {
    @content;
  }
}

.tabs-content {
  color: black;

  .content {
    display: block;

    @include lg-viewport {
      display: flex;
      gap: 2rem;
      justify-content: center;
    }

  }
}
</style>