<template>
    <div class="container-fluid">
        <section class="row">
            
            <!-- <EventDetails :eventProp="event"/> -->
        </section>
    </div>

<p>Welcome to the Details Page</p>

</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import EventCard from '../components/EventCard.vue';
import { Event } from '../models/Event.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { eventsService } from '../services/EventsService.js';
import EventDetails from '../components/EventDetails.vue';

export default {
    setup() {
        onMounted(() => {
        });
        return {
            events: computed(() => AppState.events)
        };
    },
    components: { EventDetails }
};
</script>


<style lang="scss" scoped>

</style>