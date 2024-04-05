<template>
    <div class="search-container section">
        <div class="title">
            {{ selectedCity }}, {{ selectedCountry }}
        </div>
    </div>
    <div class="search-bar section">
        <div class="search">
            <input type="text" name="search" v-model="searchQuery" placeholder="search" autocomplete="off">
            <div v-if="!showResults">
                Search by typing the name of a city
            </div>
            <div v-if="showResults" class="results">
                <div @click="getWeather(x.item.city_name, x.item.country_code)" v-for="(x, i) in queryResults" :key="i"
                    class="records">
                    {{ x.item.city_name }}, {{ x.item.country_full }}
                </div>
            </div>
        </div>
    </div>
    <div class="section">
        <div v-if="selectedCity !== ''">
            <TabsContent :cityName="selectedCity" :countryCode="selectedCountryCode"></TabsContent>
        </div>
    </div>
</template>

<script>
import api from '../services/api';
import _ from 'lodash';
import TabsContent from '@/components/TabsContent'
export default {
    name: "SearchView",
    components: {
        TabsContent,
    },
    data() {
        return {
            selectedCity: '',
            selectedCountry: '',
            selectedCountryCode: '',
            searchQuery: '',
            queryResults: [],
            showResults: false
        }
    },
    mounted() {
        this.selectedCity = this.$route.params.city;
        this.selectedCountry = this.$route.params.country;
        this.selectedCountryCode = this.$route.params.countryCode;
    },
    created() {
        this.debouncedSendQuery = _.debounce(this.sendQuery, 500);
    },
    methods: {
        sendQuery() {
            const query = this.searchQuery
            if (query !== '' && query.length > 3) {
                api({
                    url: `/search`,
                    method: "get",
                    params: {
                        q: query,
                    }
                })
                    .then(response => {
                        const responseData = response.data;
                        this.queryResults = responseData;
                        this.showResults = true;
                    })
                    .catch(e => console.log(e));
            }
        },
        getWeather(city, countryCode) {
            this.selectedCity = city;
            this.selectedCountryCode = countryCode;
            this.searchQuery = '';
            this.queryResults = []
            this.showResults = false;
        }
    },
    watch: {
        searchQuery(newValue) {
            if (newValue.length > 3) {
                this.debouncedSendQuery();
            } else if (newValue.length === 0) {
                this.showResults = false;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
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

.search-container {
    background: #fff;
}

.search-bar {
    display: flex;
    justify-content: center;
}

.search {
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 80%;
    position: relative;

    @include lg-viewport {
        width: 40%;
    }

    input[type="text"] {
        width: 90%;
        padding: 1rem;
        margin-bottom: 20px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .results {
        max-height: 20vh;
        overflow-y: auto;
        position: absolute;
        background: #fff;
        width: 90%;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;


        .records {
            cursor: pointer;
            padding: 1rem 0.5rem;
            border-bottom: 1px solid #ccc;

            &:hover {
                background: #ccc;
            }
        }
    }
}
</style>