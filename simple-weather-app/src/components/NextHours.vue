<template>
    <div class="next-hours-container">
        <div class="title">
            Next hours
        </div>
        <div class="hours-data-container">
            <div v-for="(x, index) in data" :key="index" class="hours-data">
                <div class="temparature">
                    <span class="desktop-labels">Temparature:</span>{{ Math.round(x.temp) }}°
                </div>
                <div class="rain">
                    <span class="desktop-labels">Chance of Precipitation:</span>{{ Math.round(x.pop) }}%
                </div>
                <div class="icon">
                    <img :src="getIconUrl(x.icon)" alt="weather-icon">
                </div>
                <div class="time">
                    {{ x.time }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "NextHours",
    props: {
        data: Array,
    },
    methods: {
        getIconUrl(icon) {
            return `http://openweathermap.org/img/wn/${icon}@2x.png`;
        }
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

.desktop-labels {
    display: none;
}

.next-hours-container {
    border: 1px solid #ccc;
    margin-top: 2rem;
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

    .hours-data-container {
        display: flex;
        padding: 0.5rem;
        overflow-x: auto;
        font-size: 0.75rem;

        @include lg-viewport {
            flex-direction: column;
            font-size: 1.25rem;
        }

        &::-webkit-scrollbar {
            display: none;
        }

        .hours-data {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 0.5rem 1rem;
            gap: 0.5rem;
            white-space: nowrap;

            &:not(:last-child) {
                border-right: 1px solid #ccc;
                border-bottom: none;
            }

            @include lg-viewport {
                flex-direction: row;
                border-right: none;

                &:not(:last-child) {
                    border-bottom: 1px solid #ccc;
                    border-right: none;
                }

                .desktop-labels {
                    display: inline-block;
                    color: #ccc;
                    margin-right: 0.2rem;
                }
            }


            .temparature {
                font-weight: 700;
            }

            .rain {
                color: #03A9F4;
            }

            .icon {
                img {
                    width: 2.5rem;

                    @include lg-viewport {
                        width: 6rem;
                    }
                }
            }

            .time {
                color: #a9a9a9;
                font-weight: 600;
            }
        }
    }
}
</style>