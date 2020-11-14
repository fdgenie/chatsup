import Vue from "vue";

export function setUserDetails(state, userDetails) {
  state.userDetails = userDetails;
}

export function setUsers(state, users) {
  Vue.set(state.users, users.usersId, users.usersDetails);
}

export function updateUser(state, users) {
  Object.assign(state.users[users.usersId], users.usersDetails);
}

export function addMessage(state, message) {
  Vue.set(state.messages, message.messageId, message.messageDetails);
}

export function clearMessages(state) {
  state.messages = {};
}
