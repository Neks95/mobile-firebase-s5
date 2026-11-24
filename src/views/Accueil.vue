<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="app-title">Jeux</ion-title>
        <ion-buttons slot="end">
          <div class="user-box">
            <div class="user-avatar">{{ init }}</div>
            <div class="user-info">
              <span class="email">{{ user?.email }}</span>
            </div>
            <ion-button
              fill="clear"
              color="danger"
              @click="logOut()"
            >
              <ion-icon slot="icon-only" :icon="logOutOutline" />
            </ion-button>
          </div>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <h2 class="section-title">Catalogue de jeux du moment</h2>
      <div v-if="chargement" class="spinner-container">
        <ion-spinner name="crescent"></ion-spinner>
      </div>
      <ion-grid v-else>
        <ion-row>
          <ion-col
            v-for="jeu in jeux"
            :key="jeu.titre"
            size="12"
            size-md="6"
            size-lg="4"
          >
            <JeuxCard :jeux="jeu" />
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  IonSpinner,
} from "@ionic/vue";
import { logOutOutline } from "ionicons/icons";
import { useAuth } from "@/composable/useAuth";
import { getJeux, type Jeu } from "@/jeux";
import JeuxCard from "@/views/JeuxCard.vue";

const { user, logOut } = useAuth();

const jeux = ref<Jeu[] | undefined | null>(null);
const chargement = ref(true);

const init = computed(
  () => user.value?.email?.charAt(0).toUpperCase() ?? "?"
);

async function charger() {
  try {
    jeux.value = await getJeux();
  } catch (error) {
    console.error(error);
  } finally {
    chargement.value = false;
  }
}

onMounted(charger);
</script>

<style scoped>
ion-toolbar {
  --background: #141b2b;
  --color: #ffffff;
}

.app-title {
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.4px;
}

.user-box {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-avatar {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--ion-color-primary);
  color: #ffffff;
  font-weight: 700;
  font-size: 1rem;
  flex-shrink: 0;
}

.user-info {
  display: flex;
  flex-direction: column;
  line-height: 1.25;
  text-align: right;
}

.salut {
  font-size: 0.7rem;
  opacity: 0.75;
}

.email {
  font-size: 0.78rem;
  font-weight: 600;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

ion-content {
  --background: #f4f6fa;
}

.section-title {
  margin: 18px 16px 6px;
  color: #1c2434;
  font-size: 1.15rem;
  font-weight: 700;
}

.spinner-container {
  display: flex;
  justify-content: center;
  padding: 48px 0;
}

.spinner-container ion-spinner {
  color: var(--ion-color-primary);
}

/* Sur petit écran, on cache le texte pour garder de la place */
@media (max-width: 480px) {
  .user-info {
    display: none;
  }
}
</style>
