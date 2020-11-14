<template>
  <q-list bordered separator>
    <q-item
      v-for="(contact, key) in filteredContacts"
      :key="key"
      class="q-my-sm"
      clickable
      v-ripple
      :to="'/chat/' + key"
    >
      <q-item-section avatar>
        <q-avatar color="primary" text-color="white">
          {{ contact.name.charAt(0) }}
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ contact.name }}</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-icon name="chat_bubble" :color="contact.online ? 'green' : 'grey'" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "LobbyPage",
  computed: {
    ...mapGetters({
      user: "user/getUserDetails",
      contacts: "user/getUsers"
    }),
    filteredContacts() {
      let filtered = {};

      Object.keys(this.contacts).forEach(key => {
        if (key !== this.user.userId) {
          filtered[key] = this.contacts[key];
        }
      });

      return filtered;
    }
  }
};
</script>
