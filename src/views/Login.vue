<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Compte</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">


      <form  @submit.prevent="submit">
        <ion-input
          v-model="email"
          type="email"
          label="Email"
          label-placement="stacked"
          autocomplete="email"
          required
        />
        <ion-input
          v-model="password"
          type="password"
          label="Mot de passe"
          label-placement="stacked"
          autocomplete="current-password"
          required
        />

        <p v-if="error" role="alert">{{ error }}</p>

        <ion-button expand="block" type="submit">
          {{ isRegistering ? "Creer un compte" : "Se connecter" }}
        </ion-button>
        <ion-button expand="block" fill="clear" type="button" @click="isRegistering = !isRegistering">
          {{ isRegistering ? "Vous avez deja un compte ? , se connecter" : "Creer un compte" }}
        </ion-button>
      </form>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import type { User } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar, useIonRouter,
} from "@ionic/vue";
import { auth } from "@/firebase";
import router from "@/router";

const email = ref("");
const password = ref("");
const isRegistering = ref(false);
const user = ref<User | null>(null);
const error = ref("");
const ionRouter = useIonRouter();

let unsubscribe: (() => void) | undefined;

onMounted(() => {
  unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser;
  });
});

onUnmounted(() => unsubscribe?.());

async function submit() {
  error.value = "";

  try {
    if (isRegistering.value) {
      await createUserWithEmailAndPassword(auth, email.value, password.value);
    } else {
      await signInWithEmailAndPassword(auth, email.value, password.value);
    }
    ionRouter.navigate('/accueil','root','replace');
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Authentification echoue.";
  }
}

async function logOut() {
  await signOut(auth);
}
</script>
