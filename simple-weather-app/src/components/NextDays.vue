<template>
    <div class="next-days-container">
        <div class="title">
            Next 5 Days
        </div>
        <div class="days-data-container">
            <div v-for="(x, index) in data" :key="index" class="days-data">
                <div class="icon">
                    <img :src="getIconUrl(x.icon)" alt="weather-icon">
                </div>
                <div class="time">
                    <div class="day">
                        {{ formatDate(x.date) }}
                    </div>
                    <div class="desc">
                        {{ x.description }}
                    </div>
                </div>
                <div class="temparature">
                    {{ Math.round(x.maxTemp) }}°
                    {{ Math.round(x.minTemp) }}°
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { DateTime } from "luxon";
export default {
    name: "NextDays",
    props: {
        data: Object,
    },
    created() {
        console.log(this.data[0].date);
    },
    methods: {
        getIconUrl(icon) {
            return `http://openweathermap.org/img/wn/${icon}@2x.png`;
        },
        formatDate(dateString) {
            const options = { weekday: 'short', month: 'short', day: 'numeric' };
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', options);
        },
    },
    watch: {
        cityName(newValue, oldValue) {
            if (newValue !== oldValue) {
                this.handleChange(newValue);
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


.next-days-container {
    border: 1px solid #ccc;
    margin-top: 1rem;
    border-radius: 8px;
    background: #fff;

    @include lg-viewport {
        margin-top: 0;
    }

    .title {
        font-size: 1.5rem;
        border-bottom: 1px solid #ccc;
        padding: 0.8rem 0.5rem;

        @include lg-viewport {
            font-size: 2rem;
            padding: 2rem 1rem;
        }
    }

    .days-data-container {
        display: flex;
        flex-direction: column;
        padding: 0.5rem;

        @include lg-viewport {
            padding: 1.5rem;
        }

        .days-data {
            display: grid;
            grid-template-columns: 1fr 3fr 1fr;
            padding: 0.5rem;
            gap: 0.5rem;

            .icon {
                img {
                    width: 3.5rem;

                    @include lg-viewport {
                        width: 5rem;
                    }
                }
            }

            .time {
                align-content: center;
                text-align: center;

                .day {
                    font-size: 1rem;
                    font-weight: 600;
                }

                .desc {
                    color: #ccc;
                    font-weight: 600;
                }
            }

            .temparature {
                align-content: center;
                text-align: right;
            }
        }
    }
}
</style>