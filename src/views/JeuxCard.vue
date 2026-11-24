<template>

  <ion-card>
    <ion-card-header>
      <ion-title>{{jeux.titre}}</ion-title>
      <ion-img slot="img" :src="jeux.photo_couverture"></ion-img>
    </ion-card-header>
    <ion-card-content>
      <p>{{jeux.genre}}</p>
      <p>{{jeux.avis}}</p>
      <p>{{jeux.anneeSortie}}</p>
      <p>{{jeux.prix}}</p>
    </ion-card-content>
  </ion-card>


</template>



<script setup lang="ts">
import {IonCard,IonTitle,IonImg} from "@ionic/vue";
import type {Jeu} from "@/jeux";

defineProps<{
  jeux: Jeu;
}>();





</script>
