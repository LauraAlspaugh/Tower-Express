<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
    <p>{{ account.bio }}</p>
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
<section class="row">
    <form @submit.prevent="editAccount()" class="p-5">
      <div class="mb-3">
        <label for="name">Name</label>
        <input v-model="editable.name" type="text" class="form-control" id="name" placeholder="Enter name...">
      </div>
      <div class="mb-3">
        <label for="picture">Picture</label>
        <input v-model="editable.picture" type="url" class="form-control" id="picture" placeholder="Picture...">
      </div> 

      <!-- <div class="mb-3">
        <label for="github">Github</label>
        <input v-model="editable.github" type="url" class="form-control" id="github" placeholder="Github...">
      </div>  -->
      <!-- <div class="mb-3">
        <label class="me-2" for="graduated">Graduate</label>
        <input v-model="editable.graduated" type="checkbox" class="form-check-input" id="graduated">
      </div> 

      <div class="mb-3">
        <label for="class">Class</label>
        <input v-model="editable.class" type="text" class="form-control" id="class" placeholder="Class of...">
      </div>
      <div class="mb-3">
        <label for="linkedin">Linkedin</label>
        <input v-model="editable.linkedin" type="url" class="form-control" id="linkedin" placeholder="Linkedin...">
      </div>
      <div class="mb-3">
        <label for="resume">Resume</label>
        <input v-model="editable.resume" type="url" class="form-control" id="resume" placeholder="Resume...">
      </div> 

      <div class="mb-3">
        <label for="coverImage">Cover Image</label>
        <input v-model="editable.coverImg" type="url" class="form-control" id="coverImage" placeholder="Cover Image...">
      </div>  -->
    <div class="mb-3">
        <label for="picture">Bio</label>
        <textarea v-model="editable.bio" type="text" class="form-control" id="bio" placeholder="Bio..."></textarea>
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </section> 
</template>

<script>
import { computed, onMounted, ref, watchEffect} from 'vue';
import { AppState } from '../AppState';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { accountService } from '../services/AccountService.js';
import {ticketsService} from '../services/TicketsService.js';
import { useRoute } from 'vue-router';
import TicketCard from '../components/TicketCard.vue';
export default {
    setup(props) {
      const editable = ref({})
      watchEffect(() => {
      editable.value = AppState.account;
      })
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
            
      editable,
      async editAccount() {
        try {
          const accountData = editable.value
          await accountService.editAccount(accountData)

        } catch (error) {
          logger.log(error)

        }
      }
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
