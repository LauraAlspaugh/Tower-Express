<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
<div>
  <p class=" text-center text-title">Upcoming Events. </p>
</div>
<div class="container-fluid">
  <section class="row">
    <div v-for="ticket in tickets" :key="ticket.id" class="col-12 col-md-3 p-3">
      <!-- <img class="ticket-card img-fluid justify-content-center" :src="ticket.event.coverImg" alt="event cover image">
      <p class="fs-2">{{ ticket.event.name }}</p>
      <p>{{ ticket.event.location }}</p>
      <p>Date: {{ ticket.event.startDate}}</p>
      <button @click="destroyTicket(ticketId)">Delete Ticket {{ ticket._id }}</button>
    -->
      <TicketCard :ticketProp="ticket"/>
    </div>
  </section>
</div>
</template>

<script>
import { computed, onMounted} from 'vue';
import { AppState } from '../AppState';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { accountService } from '../services/AccountService.js';
import {ticketsService} from '../services/TicketsService.js';
import { useRoute } from 'vue-router';
import TicketCard from '../components/TicketCard.vue';
export default {
    setup(props) {
        const route = useRoute();
        onMounted(() => {
            getMyTickets();
        });
        async function getMyTickets() {
            try {
                await accountService.getMyTickets();
            }
            catch (error) {
                logger.error(error);
                Pop.error(error);
            }
        }
        return {
            route,
            account: computed(() => AppState.account),
            tickets: computed(() => AppState.myTickets),
            events: computed(() => AppState.events),
            // async destroyTicket(ticketId) {
            //     try {
            //         const wantsToDelete = await Pop.confirm('Are you sure you want to delete this ticket? ');
            //         if (!wantsToDelete) {
            //             return;
            //         }
            //         const ticketId = props.ticketProp.id
            //         await ticketsService.destroyTicket(ticketId);
            //     }
            //     catch (error) {
            //         logger.error(error);
            //         Pop.error(error);
            //     }
            // }
        };
    },
    components: { TicketCard }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
.ticket-card{
max-width: 400px;
  height: 300px;
  object-fit: cover;
 
}
.text-title{
  font-family: 'Mrs Saint Delafield', cursive;
  font-size: 50px;
  text-shadow: 0px 0px 5px white;
}
</style>
