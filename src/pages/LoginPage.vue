<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-tabs v-model="tab" class="text-teal">
        <q-tab name="login" label="Login" />
        <q-tab name="register" label="Register" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel :name="tab">
          <login-register :tab="tab" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
import { firebaseUi, firebase } from "boot/firebase.js";
import LoginRegister from "components/LoginRegister"

export default {
  name: "LoginPage",
  components: {
    LoginRegister
  },
  data() {
    return {
      tab: "login"
    };
  }
};
</script>
