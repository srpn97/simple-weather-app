<template>
    <div class="tabs-container">
        <div class="section tabs">
            <span v-for="tab in tabs" :key="tab.name" class="tab" :class="{ active: tab.name === activeTab }"
                @click="activeTab = tab.name">
                {{ tab.name }}
            </span>
        </div>
    </div>
    <div class="tab-content">
        <TabsContent class="section" :cityName="activeTab"></TabsContent>
    </div>
</template>

<script>
import TabsContent from './TabsContent.vue';

export default {
    name: "TabsComponent",
    components: {
        TabsContent,
    },
    data() {
        return {
            activeTab: 'Los Angeles',
            tabs: [
                { name: 'Rio De Janeiro' },
                { name: 'Beijing' },
                { name: 'Los Angeles' },
            ],
        };
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


.tabs-container {
    background: #fff;
    overflow-x: auto;

    &::-webkit-scrollbar {
        display: none;
    }
}

.tabs {
    display: flex;
    white-space: nowrap;
    justify-content: space-between;
    gap: 1rem;
    padding-top: 0;
    padding-bottom: 0;

    @include lg-viewport {
        justify-content: center;
    }
}

.tab {
    padding: 1rem 0;
    cursor: pointer;
    user-select: none;
    text-align: left;
}

.tab.active {
    border-bottom: 2px solid #FF7043;
}
</style>