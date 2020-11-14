import { firebaseAuth, firebaseDb } from "boot/firebase";

export function registerUser({}, { name, email, password }) {
  firebaseAuth
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      let userId = firebaseAuth.currentUser.uid;
      firebaseDb.ref("users/" + userId).set({
        name,
        email,
        online: true
      });
    })
    .catch(error => {
      console.log(error);
    });
}

export function loginUser({}, { email, password }) {
  firebaseAuth.signInWithEmailAndPassword(email, password).catch(error => {
    console.log(error);
  });
}

export function handleUserAuth({ dispatch, commit }) {
  firebaseAuth.onAuthStateChanged(user => {
    if (user) {
      let userId = firebaseAuth.currentUser.uid;
      firebaseDb.ref("users/" + userId).once("value", snapshot => {
        commit("setUserDetails", {
          name: snapshot.val().name,
          email: snapshot.val().email,
          userId
        });
      });

      dispatch("updateUser", {
        userId,
        updates: {
          online: true
        }
      });

      dispatch("getUsers");

      this.$router.push("/");
    } else {
      commit("setUserDetails", false);
      this.$router.push("/login").catch(err => {});
    }
  });
}

export function logoutUser({ dispatch, commit }, user) {
  firebaseAuth
    .signOut()
    .then(() => {
      dispatch("updateUser", {
        userId: user.userId,
        updates: {
          online: false
        }
      });

      commit("setUserDetails", false);
    })
    .catch(error => {
      console.log(error);
    });
}

export function updateUser({}, updates) {
  if (updates.userId) {
    firebaseDb.ref("users/" + updates.userId).update(updates.updates);
  }
}

export function getUsers({ commit }) {
  firebaseDb.ref("users").on("child_added", snapshot => {
    let usersDetails = snapshot.val();
    let usersId = snapshot.key;

    commit("setUsers", {
      usersId,
      usersDetails
    });
  });
  firebaseDb.ref("users").on("child_changed", snapshot => {
    let usersDetails = snapshot.val();
    let usersId = snapshot.key;

    commit("updateUser", {
      usersId,
      usersDetails
    });
  });
}

export function getMessages({ commit, getters }, otherUserId) {
  firebaseDb
    .ref("chats/" + getters.getUserDetails.userId + "/" + otherUserId)
    .on("child_added", snapshot => {
      let messageDetails = snapshot.val();
      let messageId = snapshot.key;
      commit("addMessage", {
        messageId,
        messageDetails
      });
    });
}

export function clearMessages({ commit }) {
  commit("clearMessages");
}

export function sendMessage({ commit, getters }, message) {
  firebaseDb
    .ref("chats/" + getters.getUserDetails.userId + "/" + message.otherUserId)
    .push(message.message);

  message.message.from = "them";
  firebaseDb
    .ref("chats/" + message.otherUserId + "/" + getters.getUserDetails.userId)
    .push(message.message);
}
