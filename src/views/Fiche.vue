<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/Accueil" />
        </ion-buttons>
        <ion-title>{{ jeu?.titre ?? "Fiche du jeu" }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="store-content">
      <div v-if="chargement" class="state-box">
        <ion-spinner name="crescent" />
      </div>

      <div v-else-if="erreur" class="state-box">
        <p class="error-text">{{ erreur }}</p>
      </div>

      <template v-else-if="jeu">
        <!-- 1. Photo de couverture en gros plan en haut -->
        <div class="hero-cover">
          <ion-img
            :src="photoPrincipale"
            :alt="`Couverture de ${jeu.titre}`"
          />
          <span class="pill-badge">{{ jeu.categorie }}</span>
        </div>

        <!-- 2. Détails du jeu (nom, prix, éditeur, infos techniques) -->
        <section class="game-details">
          <div class="title-row">
            <div>
              <h1 class="game-title">{{ jeu.titre }}</h1>
              <p class="game-subtitle">{{ jeu.genre }} · {{ jeu.editeur }}</p>
            </div>
            <div class="price-tag">
              {{ Number(jeu.prix) === 0 ? "Gratuit" : `${jeu.prix} $` }}
            </div>
          </div>

          <div class="meta-chips">
            <span class="meta-chip">
              <ion-icon :icon="star" />
              <strong>{{ jeu.avis }}</strong>
            </span>
            <span class="meta-chip">{{ jeu.anneeSortie }}</span>
            <span class="meta-chip">PEGI {{ jeu.pegi }}</span>
            <span class="meta-chip">{{ jeu.taille }} Go</span>
            <span class="meta-chip" v-if="jeu.enligne">En ligne</span>
            <span class="meta-chip" v-if="jeu.enLocal">Multijoueur local</span>
          </div>

          <p class="platforms-line" v-if="jeu.plateforme?.length">
            <strong>Plateformes :</strong> {{ jeu.plateforme.join(" · ") }}
          </p>
        </section>

        <!-- 3. Carrousel horizontal défilant des autres photos (photo_detail) -->
        <section class="gallery-section" v-if="jeu.photo_detail?.length">
          <h2 class="gallery-title">Aperçus et captures</h2>
          <div class="carousel-track">
            <button
              v-for="(photo, index) in jeu.photo_detail"
              :key="`${photo}-${index}`"
              type="button"
              class="carousel-slide"
              :class="{ active: photoPrincipale === photo }"
              @click="photoPrincipale = photo"
            >
              <ion-img
                :src="photo"
                :alt="`Capture ${index + 1} de ${jeu.titre}`"
              />
            </button>
          </div>
        </section>
      </template>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue"
import { useRoute } from "vue-router"
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonSpinner,
  IonImg,
  IonIcon,
} from "@ionic/vue"
import { star } from "ionicons/icons"
import { getJeuById, type Jeu } from "@/jeux"

const route = useRoute()

const jeu = ref<Jeu | undefined>(undefined)
const chargement = ref(true)
const erreur = ref("")
const photoPrincipale = ref("")

async function charger() {
  chargement.value = true
  erreur.value = ""

  const rawId = route.params.id
  const id = Array.isArray(rawId) ? rawId[0] : rawId

  try {
    if (!id) {
      throw new Error("Identifiant du jeu manquant dans l’URL.")
    }
    const data = await getJeuById(id)
    jeu.value = data
    photoPrincipale.value = data.photo_couverture
  } catch (error) {
    erreur.value =
      error instanceof Error ? error.message : "Erreur lors du chargement du jeu."
  } finally {
    chargement.value = false
  }
}

watch(() => route.params.id, charger)
onMounted(charger)
</script>

<style scoped>
.store-content {
  --background: #f4f6fa;
}

.state-box {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 240px;
  padding: 24px;
  text-align: center;
}

.error-text {
  color: #c62828;
  font-weight: 600;
}

.hero-cover {
  position: relative;
  width: 100%;
  height: 260px;
  background: #141b2b;
  overflow: hidden;
}

.hero-cover ion-img {
  width: 100%;
  height: 100%;
}

.hero-cover ion-img::part(image) {
  object-fit: cover;
}

.pill-badge {
  position: absolute;
  bottom: 14px;
  left: 16px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(20, 27, 43, 0.85);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  backdrop-filter: blur(6px);
}

.game-details {
  padding: 18px 16px 14px;
  background: #ffffff;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 0 6px 20px rgba(25, 35, 55, 0.06);
}

.title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.game-title {
  margin: 0;
  font-size: 1.45rem;
  font-weight: 800;
  color: #1c2434;
}

.game-subtitle {
  margin: 4px 0 0;
  font-size: 0.9rem;
  color: #737d90;
}

.price-tag {
  flex-shrink: 0;
  padding: 8px 14px;
  border-radius: 12px;
  background: #eef2ff;
  color: #3659d9;
  font-size: 1.1rem;
  font-weight: 800;
}

.meta-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 14px;
}

.meta-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 10px;
  border-radius: 10px;
  background: #f4f6fa;
  color: #30394b;
  font-size: 0.8rem;
  font-weight: 600;
}

.meta-chip ion-icon {
  color: #f5a623;
}

.platforms-line {
  margin: 14px 0 2px;
  color: #424d61;
  font-size: 0.9rem;
}

.gallery-section {
  padding: 18px 0 28px;
}

.gallery-title {
  margin: 0 16px 12px;
  font-size: 1rem;
  font-weight: 700;
  color: #1c2434;
}

.carousel-track {
  display: flex;
  gap: 12px;
  padding: 0 16px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

.carousel-slide {
  flex: 0 0 210px;
  height: 125px;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 14px;
  overflow: hidden;
  background: #e5e9f0;
  scroll-snap-align: start;
  cursor: pointer;
}

.carousel-slide.active {
  border-color: #3659d9;
}

.carousel-slide ion-img {
  width: 100%;
  height: 100%;
}

.carousel-slide ion-img::part(image) {
  object-fit: cover;
}
</style>