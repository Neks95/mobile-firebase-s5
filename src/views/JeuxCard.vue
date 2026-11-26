<template>

  <ion-card class="game-card" button :router-link="`/jeux/${jeux.id}`">
    <div class="cover">
      <ion-img
        :src="jeux.photo_couverture"
        :alt="`Couverture de ${jeux.titre}`"
      />
      <span class="category-badge">{{ jeux.categorie }}</span>
    </div>

    <ion-card-header>
      <ion-card-title>{{ jeux.titre }}</ion-card-title>
      <p class="genre">{{ jeux.genre }}</p>
    </ion-card-header>

    <ion-card-content>
      <div class="details">
        <span><strong>{{ jeux.anneeSortie }}</strong></span>
        <span class="rating">
          <ion-icon :icon="star" />
          <strong>{{ jeux.avis }}</strong>
        </span>
      </div>

      <div class="card-footer">
        <span class="platforms">
          {{ jeux.plateforme.join(" · ") }}
        </span>
        <span class="price">{{ jeux.prix }} $</span>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
  IonIcon,
} from "@ionic/vue";

import { star } from "ionicons/icons";
import type { Jeu } from "@/jeux";

const props = defineProps<{
  jeux: Jeu;
}>();


</script>

<style scoped>
.game-card {
  margin: 0 0 16px;
  overflow: hidden;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 8px 24px rgb(25 35 55 / 10%);
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.game-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 30px rgb(25 35 55 / 16%);
}

.cover {
  position: relative;
  height: 190px;
  overflow: hidden;
  background: #eef1f6;
}

.cover ion-img {
  width: 100%;
  height: 100%;
}

.cover ion-img::part(image) {
  object-fit: cover;
}

.category-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgb(20 27 43 / 82%);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 600;
  backdrop-filter: blur(6px);
}

ion-card-header {
  padding: 16px 16px 8px;
}

ion-card-title {
  color: #1c2434;
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.35;
}

.genre {
  margin: 6px 0 0;
  color: #737d90;
  font-size: 0.88rem;
}

ion-card-content {
  padding: 8px 16px 16px;
}

.details,
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.details {
  color: #737d90;
  font-size: 0.85rem;
}

.details strong {
  margin-left: 4px;
  color: #30394b;
}

.rating {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.rating ion-icon {
  color: #f5a623;
}

.card-footer {
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #edf0f4;
}

.platforms {
  overflow: hidden;
  color: #737d90;
  font-size: 0.75rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.price {
  flex-shrink: 0;
  color: #3659d9;
  font-size: 1rem;
  font-weight: 700;
}
</style>
