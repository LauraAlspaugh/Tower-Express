<template>
    <div class="container-fluid">
        <section v-if="event" class="row">
            <div class=" col-12 col-md-4  m-0 m-md-3">
                <img class="image-card" :src="event.coverImg" :title="event.name" alt="event cover image">
            </div>
            <div class="col-12 col-md-6 m-0 m-md-3">
                <p class="fs-2 event-description">{{ event.name }} Type: {{ event.type }}</p>
                <p class="event-description">{{ event.description }}</p>
                <p>{{ event.location }}</p>
                <p>Date: {{ event.startDate }}</p>
                <p class="text-start">Tickets Left: <span>{{ event.capacity - event.ticketCount}}</span></p>
                <div>
                <button :disabled="event.ticketCount == event.capacity || event.isCanceled" v-if="event.isCanceled == false || event.ticketCount != event.capacity" @click="createTicket()" class="btn btn-primary text-end">Grab a Ticket</button>
                <p class="fs-3" v-if="isAttending && event.isCanceled == false">Attending this Event!</p>
                <button v-if="event.creatorId == account.id && event.isCanceled == false" @click="cancelEvent(event)" class="btn btn-danger text-end m-2">Cancel Event</button>
                <p class="fs-2" v-if="event.isCanceled">Event Canceled!</p>
            </div>
            </div>
        </section>
        <section class="row">
            <p class="fs-2">See who is Attending. </p>
            <div v-for="ticket in tickets" :key="ticket.id" class="col-2">
<img v-if="event.isCanceled == false" class="img-fluid rounded-circle my-1" :src="ticket.profile.picture" :title="ticket.profile.name" alt="creator picture"> 
            </div>
        </section>
        <section class="row justify-content-center">
            <div class="col-8 p-3">
                <form @submit.prevent="createComment()">
                    <p class="fs-3">Join the Convo.</p>
<div class="mb-3">
    <label for="description" class="form-label"></label>
    <textarea v-model="editable.body" type="text" required rows="3" class="form-control" id="description" placeholder="tell us..."></textarea>

</div>


<button type="submit" class="btn btn-primary">Post Comment</button>
</form>
            </div>
        </section>
        <section class="row">
            <div v-for="comment in comments" :key="comment.body" class="col-12 p-4">
            <CommentCard :commentProp="comment"/>
            </div>
        </section>
    </div>



</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref, popScopeId } from 'vue';
import EventCard from '../components/EventCard.vue';
import { Event } from '../models/Event.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { eventsService } from '../services/EventsService.js';
import EventDetails from '../components/EventDetails.vue';
import { useRoute } from 'vue-router';
import { commentsService } from '../services/CommentsService.js';
import CommentCard from '../components/CommentCard.vue';
import {ticketsService} from '../services/TicketsService.js';
import { ticketData } from '../models/Ticket.js';

export default {
    setup() {
        const editable = ref({});
        const route = useRoute();
        onMounted(() => {
            getEventById(),
                getCommentsByEventId();
                getAttendees();
                
        });
        async function getEventById() {
            try {
                const eventId = route.params.eventId;
                await eventsService.getEventById(eventId);
            }
            catch (error) {
                logger.error(error);
                Pop.error(error);
            }
        }
        async function getCommentsByEventId() {
            try {
                const eventId = route.params.eventId;
                await commentsService.getCommentsByEventId(eventId);
            }
            catch (error) {
                logger.error(error);
            }
        }
        async function getAttendees(){
try {
    const eventId = route.params.eventId
    await ticketsService.getAttendees(eventId)
} catch (error) {
    logger.error(error)
    Pop.error(error)
    
}
        }
        return {
            editable,
            route,
            ticketCount: computed(()=> AppState.ticketCount),
            event: computed(() => AppState.activeEvent),
            account: computed(() => AppState.account),
            comments: computed(() => AppState.comments),
            tickets: computed(()=> AppState.tickets),
            isAttending: computed(()=>  AppState.tickets.find((ticket) => ticket.profile.id == AppState.account.id)),
            async createComment(){
                try {
                const commentData = editable.value
                commentData.eventId = route.params.eventId
            await commentsService.createComment(commentData)
                } catch (error) {
                    logger.error(error)
                    Pop.error(error)
                }
            },
            async cancelEvent(event){
try {
    if(!event.isCanceled){
        const yes = await Pop.confirm('Are you sure you want to cancel this event?')
    if(!yes){
        return 
    }}const eventId = route.params.eventId
    await eventsService.cancelEvent(eventId)
} catch (error) {
    logger.error(error)
    Pop.error(error)
    
}
            },
            async createTicket(){
                try {
                    const eventId = route.params.eventId
                    await ticketsService.createTicket(eventId)
                    AppState.activeEvent.ticketCount++
                } catch (error) {
                    logger.error(error)
                    Pop.error(error)
                    
                }
            }
        };
    },
    components: { CommentCard }
};
</script>


<style lang="scss" scoped>
.image-card{
    width: 350px;
    height: 350px; 
    object-fit: cover;
position: center;
}
@media (max-width: 900px){
    .image-card{
        width: 200px;
        height: 200px;
        object-fit: cover;
        margin-top: 4px;
    }
    // .event-description{
    //     width: 150px;
    //     margin: 0px;
    
    // }
}
</style>