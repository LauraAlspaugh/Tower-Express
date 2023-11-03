<template>
<div class="container-fluid">
    <section class="row">
        <div class="col-12 col-md-6">
            <img class="ticket-card img-fluid justify-content-center" :src="ticketProp.event.coverImg" alt="event cover image">
    <p class="fs-2">{{ ticketProp.event.name }}</p>
    <p>{{ ticketProp.event.location }}</p>
    <p>Date: {{ new Date(ticketProp.event.startDate).toLocaleDateString()}}</p>
    <button @click="destroyTicket()">Delete Ticket</button>
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

</style>