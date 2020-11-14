<template>
  <q-layout view="hHh lpR fFf" class="bg-blue-grey-2">
    <q-header elevated class="bg-primary glossy   text-white">
      <q-toolbar>
        <q-btn
          v-if="this.$route.fullPath.includes('/chat')"
          to="/"
          flat
          dense
          icon="keyboard_backspace"
          class="absolute-left"
        >
          Back
        </q-btn>

        <q-toolbar-title class="absolute-center">{{ title }}</q-toolbar-title>

        <q-btn
          v-if="userDetails"
          @click="logout"
          flat
          dense
          no-caps
          icon="account_circle"
          class="absolute-right q-pr-sm"
        >
          Logout
          <br/>
          {{ userDetails.name }}
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import user from "src/store/user";
import { mapGetters } from "vuex";

export default {
  name: "MainLayout",
  computed: {
    ...mapGetters({
      userDetails: "user/getUserDetails"
    }),
    title() {
      let currentPath = this.$route.fullPath;
      if (currentPath === "/") return "Chatsup";
      else if (currentPath.includes("/chat")) return "Chat";
      else if (currentPath === "/login") return "Login";

      return "";
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("user/logoutUser", this.userDetails);
    }
  }
};
</script>
