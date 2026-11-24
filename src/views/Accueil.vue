<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Accueil</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <p v-if="user">Connecté en tant que {{ user.email }}</p>
      <ion-list>
        <JeuxCard
          v-for="jeu in jeux"
          :jeux="jeu"
        />
      </ion-list>
      <ion-button v-if="user" @click="logOut">
        Se déconnecter
      </ion-button>
      <p v-else>Chargement...</p>
    </ion-content>
  </ion-page>

</template>

<script setup lang="ts">
import {useAuth} from "@/composable/useAuth";
import {getJeux, insererTousLesJeux, Jeu} from "@/jeux";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { auth } from "@/firebase";
import {onMounted, ref} from "vue";
import JeuxCard from "@/views/JeuxCard.vue";

const jeux = ref<Jeu[] | null | undefined>(null);

async function charger(){
  try{
    jeux.value  = await getJeux();
  } catch (error) {
    console.log(error);
  }
}


const user = useAuth().user;
const logOut = useAuth();

onMounted(async () => {
  await charger();
})


</script>
