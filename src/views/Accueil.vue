<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Accueil</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <p v-if="user">Connecté en tant que {{ user.email }}</p>
      <ion-button v-if="user" @click="logOut">
        Se déconnecter
      </ion-button>
      <p v-else>Chargement...</p>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {useAuth} from "@/composable/useAuth";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { watch } from "vue";
import { useRouter } from "vue-router";
const user = useAuth().user;
const logOut = useAuth().logOut;
const ready = useAuth().ready;
const router = useRouter();

watch([user, ready],([currentUser,isReady]) => {
  if ((!currentUser) && (isReady)) {
    router.replace('/home');
  }
})
</script>
