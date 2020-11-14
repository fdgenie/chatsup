<template>
  <q-form @submit="submitForm">
    <q-input
      ref="name"
      v-if="tab === 'register'"
      v-model="name"
      label="Name*"
      :rules="[val => !!val || 'Field is required']"
    />

    <q-input
      ref="email"
      v-model="email"
      label="E-Mail*"
      :rules="[val => !!val || 'Field is required']"
    />
    <q-input
      ref="password"
      v-model="password"
      type="password"
      label="Password*"
      :rules="[val => !!val || 'Field is required']"
    />
    <q-btn
      class="q-mt-md"
      color="primary"
      :label="tab === 'register' ? 'Register' : 'Submit'"
      type="submit"
    />
  </q-form>
</template>

<script>
export default {
  name: "LoginRegister",
  props: {
    tab: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      password: "",
      email: "",
      name: ""
    };
  },
  methods: {
    submitForm() {
      const isEmailValid = this.$refs.email.validate();
      const isPasswordValid = this.$refs.password.validate();

      if (this.tab === "login") {
        if (!isEmailValid || !isPasswordValid) {
          return;
        }

        this.$store.dispatch("user/loginUser", {
          email: this.email,
          password: this.password
        });
      } else if (this.tab === "register") {
        const isNameValid = this.$refs.name.validate();

        if (!isNameValid || !isPasswordValid || !isNameValid) {
          return;
        }

        this.$store.dispatch("user/registerUser", {
          name: this.name,
          email: this.email,
          password: this.password
        });
      }
    }
  }
};
</script>
