<template>
  <div class="container-fluid">
    <section class="row">
      <div v-for="event in events" :key="event.id" class="col-4 p-4">
        <EventCard :eventProp="event"/>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { eventsService } from '../services/EventsService.js';
import { AppState } from '../AppState.js';
import EventCard from '../components/EventCard.vue';

export default {
    setup() {
        onMounted(() => {
            getEvents();
        });
        async function getEvents() {
            try {
                await eventsService.getEvents();
            }
            catch (error) {
                logger.error(error);
                Pop.error(error);
            }
        }
        return {
            events: computed(() => AppState.events)
        };
    },
    components: { EventCard }
}
</script>

<style scoped lang="scss">

</style>
