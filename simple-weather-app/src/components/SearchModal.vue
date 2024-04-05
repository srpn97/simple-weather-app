<template>
    <div class="search-modal-container">
        <div class="search">
            <input type="text" name="search" v-model="searchQuery" placeholder="search" autocomplete="off">
            <div v-if="!showResults">
                Search by typing the name of a city
            </div>
            <div v-if="showResults" class="results">
                <div @click="getWeather(x.item.city_name, x.item.country_full, x.item.country_code)"
                    v-for="(x, i) in queryResults" :key="i" class="records">
                    {{ x.item.city_name }}, {{ x.item.country_full }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../services/api';
import _ from 'lodash';

export default {
    name: "SearchModal",
    components: {
        // HelloWorld,
    },
    data() {
        return {
            searchQuery: '',
            queryResults: [],
            showResults: false
        }
    },
    created() {
        this.debouncedSendQuery = _.debounce(this.sendQuery, 500);
    },
    mounted() {
        document.addEventListener('keydown', this.closeOnEscape);
    },
    beforeUnmount() {
        document.removeEventListener('keydown', this.closeOnEscape);
    },
    methods: {

        closeOnEscape(e) {
            if (e.key === 'Escape') {
                this.searchQuery = '';
                this.showResults = false;
                this.queryResults = [];
                this.$emit('close-modal'); // Emitting an event to the parent component
            }
        },
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
        getWeather(city, country, countryCode) {
            this.$router.push({ name: 'search', params: { city: city, country: country, countryCode: countryCode } });
            this.searchQuery = '';
            this.showResults = false;
            this.queryResults = [];
            this.$emit('close-modal');
        },
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

.search-modal-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
}

.search {
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 80%;

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

        .records {
            cursor: pointer;
            padding: 1rem 0.5rem;
            border-bottom: 1px solid #ccc;
            transition: 0.3s all ease-in;

            &:hover {
                background: #ccc;
            }
        }
    }
}
</style>
