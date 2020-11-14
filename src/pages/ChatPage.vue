<template>
  <q-page ref="pageChat" class="flex column bg-blue-grey-2">
    <q-banner
      v-if="!otherUserDetails.online"
      class="bg-blue-grey-4 text-center"
    >
      {{ otherUserDetails.name }} is offline
    </q-banner>
    <div v-if="showMessage" class="q-pa-md col column justify-end">
      <q-chat-message
        v-for="(message, key) in messages"
        :key="key"
        :name="message.from === 'me' ? userDetails.name : otherUserDetails.name"
        :text="[message.text]"
        :sent="message.from === 'me' ? true : false"
      />
    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-form class="full-width">
          <q-input v-model="newMessage" filled label="Aa" dense outlined>
            <template v-slot:after>
              <q-btn
                @click="sendMessage"
                round
                dense
                flat
                type="submit"
                icon="send"
              />
            </template>
          </q-input>
        </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ChatPage",
  data() {
    return {
      newMessage: "",
      showMessage: false
    };
  },
  computed: {
    ...mapGetters({
      messages: "user/getMessages",
      userDetails: "user/getUserDetails",
      usersDetails: "user/getUsers"
    }),
    otherUserDetails() {
      return this.usersDetails[this.$route.params.otherUserId];
    }
  },
  watch: {
    messages(val) {
      if (Object.keys(val).length) {
        this.scrollToBottom();
      }
    }
  },
  mounted() {
    this.$store.dispatch("user/getMessages", this.$route.params.otherUserId);
    this.scrollToBottom()
  },
  destroyed() {
    this.$store.dispatch("user/clearMessages");
  },
  methods: {
    sendMessage() {
      this.$store
        .dispatch("user/sendMessage", {
          message: {
            text: this.newMessage,
            from: "me"
          },
          otherUserId: this.$route.params.otherUserId
        })
        .then(() => {
          this.newMessage = "";
        });
    },
    scrollToBottom() {
      let pageChat = this.$refs.pageChat.$el;
      setTimeout(() => {
        window.scrollTo(0, pageChat.scrollHeight);
        this.showMessage = true;
      }, 20);
    }
  }
};
</script>
