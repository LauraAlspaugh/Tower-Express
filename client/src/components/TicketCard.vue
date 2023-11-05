<template>
<div class="container-fluid">
    <section class="row">
        <div class="col-12 col-md-3 event-card text-center">
            <img class="ticket-card img-fluid justify-content-center" :src="ticketProp.event.coverImg" alt="event cover image">
    <p class="fs-4">{{ ticketProp.event.name }}</p>
    <p>{{ ticketProp.event.location }}</p>
    <p>Date: {{ new Date(ticketProp.event.startDate).toLocaleDateString()}}</p>
    <div>
    <button class="btn btn-light text-end" @click="destroyTicket()">Delete Ticket</button>
    </div>
        </div>
    </section>
</div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Ticket } from '../models/Ticket.js';
import { ticketsService } from '../services/TicketsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
export default {
    props: {ticketProp: {type: Ticket, required: true}},
    setup(props){
    return { 
        async destroyTicket() {
                try {
                    const wantsToDelete = await Pop.confirm('Are you sure you want to delete this ticket? ');
                    if (!wantsToDelete) {
                        return;
                    }
                    const ticketId = props.ticketProp.id
                    await ticketsService.destroyTicket(ticketId);
                }
                catch (error) {
                    logger.error(error);
                    Pop.error(error);
                }
            }
    }
    }
};
</script>


<style lang="scss" scoped>
.event-card{
    width: 21rem;
    border: 2px solid black;
    padding: 12px;
    border-radius: 7px;
  /* From https://css.glass */
background: rgba(187, 174, 174, 0.62);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(3.6px);
-webkit-backdrop-filter: blur(3.6px);
border: 1px solid rgba(30, 23, 23, 0.78);
}
img{
    border-radius: 7px;
    width: 20rem;
    height: 20rem;
    object-fit: cover;
}
</style>