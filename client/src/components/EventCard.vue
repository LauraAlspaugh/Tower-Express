<template>
    <div class="event-card">
        <router-link :to="{ name: 'Event', params: { eventId: eventProp.id } }">
            <img class="img-fluid" :src="eventProp.coverImg" alt="creator image">
        </router-link>
        <span v-if="isFavEvent" @click.stop="unfavoriteEvent()" role="button"><i class="fs-2 mdi mdi-heart text-center"
                title="unfavorite this event"></i></span>
        <span v-else @click.stop="favoriteEvent()" role="button"><i class="fs-2 mdi mdi-heart-outline text-center"
                title="favorite this recipe"></i></span>

        <div>
            <p class="fs-4 text-center event-name">{{ eventProp.name }}</p>
            <p class="text-center">{{ eventProp.location }}</p>
        </div>

    </div>
</template>


<script>

import { computed } from 'vue';
import { Event } from '../models/Event.js';
import { eventsService } from '../services/EventsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { AppState } from '../AppState.js';
export default {
    props: { eventProp: { type: Event, required: true } },
    setup(props) {
        return {
            myFavoriteEvents: computed(() => AppState.myFavoriteEvents),
            isFavEvent: computed(() => AppState.myFavoriteEvents.find((event) => event.id == props.eventProp.id || event.eventId == props.eventProp.id)),
            async favoriteEvent() {
                try {
                    const eventId = props.eventProp.id;
                    logger.log('favorite event with event id', eventId)
                    await eventsService.favoriteEvent(eventId);
                }
                catch (error) { Pop.error(error) }
            },
            async unfavoriteEvent() {
                try {

                    const eventId = props.eventProp.id;
                    logger.log('we are trying to unfavorite this event', eventId)
                    await eventsService.unfavoriteEvent();
                }
                catch (error) { Pop.error(error) }
            },
        }
    }
};
</script>


<style lang="scss" scoped>
img {
    border-radius: 7px;
    width: 20rem;
    height: 20rem;
    object-fit: cover;
    ;
}

.event-card {
    width: 21rem;
    border: 2px solid black;
    padding: 5px;
    border-radius: 7px;
    /* From https://css.glass */
    background: rgba(187, 174, 174, 0.62);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(3.6px);
    -webkit-backdrop-filter: blur(3.6px);
    border: 1px solid rgba(30, 23, 23, 0.78);
}

p {
    color: black;
}

.event-name {
    font-family: 'Pinyon Script', cursive;
}
</style>