import { collection, addDoc, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "./firebase"; // Votre instance Firestore
import { earOutline } from "ionicons/icons";
import firebase from "firebase/compat/app";
import CollectionReference = firebase.firestore.CollectionReference;

// 1. Définissez la structure de votre jeu
export interface Jeu {
  id?: string;
  titre: string;
  genre: string;
  anneeSortie: number;
  categorie: "Multiplayer" | "Solo";
  plateforme: string[];
  prix: string;
  editeur: string;
  avis: number;
  pegi: number;
  taille: number;
  photo_couverture: string;
  photo_detail: string[];
  enligne: boolean;
  enLocal: boolean;
}
const jeuxDeTest: Jeu[] = [
  {
    titre: "The Legend of Zelda: Breath of the Wild",
    genre: "Aventure",
    anneeSortie: 2017,
    categorie: "Solo",
    plateforme: ["Nintendo Switch", "Wii U"],
    prix: "59.99",
    editeur: "Nintendo",
    avis: 4.9,
    pegi: 12,
    taille: 14.4,
    photo_couverture: "https://exemple.com/img/zelda_cover.jpg",
    photo_detail: ["https://exemple.com/img/zelda_1.jpg", "https://exemple.com/img/zelda_2.jpg"],
    enligne: false,
    enLocal: false,
  },
  {
    titre: "The Witcher 3: Wild Hunt",
    genre: "RPG",
    anneeSortie: 2015,
    categorie: "Solo",
    plateforme: ["PC", "PS4", "Xbox One", "Nintendo Switch"],
    prix: "39.99",
    editeur: "CD Projekt",
    avis: 4.8,
    pegi: 18,
    taille: 50,
    photo_couverture: "https://exemple.com/img/witcher3_cover.jpg",
    photo_detail: ["https://exemple.com/img/witcher3_1.jpg", "https://exemple.com/img/witcher3_2.jpg"],
    enligne: false,
    enLocal: false,
  },
  {
    titre: "FIFA 24",
    genre: "Sport",
    anneeSortie: 2023,
    categorie: "Multiplayer",
    plateforme: ["PC", "PS5", "Xbox Series", "Nintendo Switch"],
    prix: "69.99",
    editeur: "Electronic Arts",
    avis: 3.9,
    pegi: 3,
    taille: 100,
    photo_couverture: "https://exemple.com/img/fifa24_cover.jpg",
    photo_detail: ["https://exemple.com/img/fifa24_1.jpg", "https://exemple.com/img/fifa24_2.jpg"],
    enligne: true,
    enLocal: true,
  },
  {
    titre: "Minecraft",
    genre: "Bac à sable",
    anneeSortie: 2011,
    categorie: "Multiplayer",
    plateforme: ["PC", "PS4", "Xbox One", "Nintendo Switch", "Mobile"],
    prix: "26.95",
    editeur: "Mojang Studios",
    avis: 4.7,
    pegi: 7,
    taille: 1,
    photo_couverture: "https://exemple.com/img/minecraft_cover.jpg",
    photo_detail: ["https://exemple.com/img/minecraft_1.jpg", "https://exemple.com/img/minecraft_2.jpg"],
    enligne: true,
    enLocal: true,
  },
  {
    titre: "Elden Ring",
    genre: "RPG",
    anneeSortie: 2022,
    categorie: "Solo",
    plateforme: ["PC", "PS5", "Xbox Series"],
    prix: "59.99",
    editeur: "Bandai Namco",
    avis: 4.8,
    pegi: 16,
    taille: 60,
    photo_couverture: "https://exemple.com/img/eldenring_cover.jpg",
    photo_detail: ["https://exemple.com/img/eldenring_1.jpg", "https://exemple.com/img/eldenring_2.jpg"],
    enligne: true,
    enLocal: false,
  },
  {
    titre: "Mario Kart 8 Deluxe",
    genre: "Course",
    anneeSortie: 2017,
    categorie: "Multiplayer",
    plateforme: ["Nintendo Switch"],
    prix: "49.99",
    editeur: "Nintendo",
    avis: 4.8,
    pegi: 3,
    taille: 7,
    photo_couverture: "https://exemple.com/img/mk8_cover.jpg",
    photo_detail: ["https://exemple.com/img/mk8_1.jpg", "https://exemple.com/img/mk8_2.jpg"],
    enligne: true,
    enLocal: true,
  },
  {
    titre: "Red Dead Redemption 2",
    genre: "Action-Aventure",
    anneeSortie: 2018,
    categorie: "Multiplayer",
    plateforme: ["PC", "PS4", "Xbox One"],
    prix: "49.99",
    editeur: "Rockstar Games",
    avis: 4.8,
    pegi: 18,
    taille: 120,
    photo_couverture: "https://exemple.com/img/rdr2_cover.jpg",
    photo_detail: ["https://exemple.com/img/rdr2_1.jpg", "https://exemple.com/img/rdr2_2.jpg"],
    enligne: true,
    enLocal: false,
  },
  {
    titre: "Hades",
    genre: "Roguelike",
    anneeSortie: 2020,
    categorie: "Solo",
    plateforme: ["PC", "PS5", "Xbox Series", "Nintendo Switch"],
    prix: "24.99",
    editeur: "Supergiant Games",
    avis: 4.8,
    pegi: 12,
    taille: 15,
    photo_couverture: "https://exemple.com/img/hades_cover.jpg",
    photo_detail: ["https://exemple.com/img/hades_1.jpg", "https://exemple.com/img/hades_2.jpg"],
    enligne: false,
    enLocal: false,
  },
  {
    titre: "Fortnite",
    genre: "Battle Royale",
    anneeSortie: 2017,
    categorie: "Multiplayer",
    plateforme: ["PC", "PS5", "Xbox Series", "Nintendo Switch", "Mobile"],
    prix: "0",
    editeur: "Epic Games",
    avis: 4.1,
    pegi: 12,
    taille: 30,
    photo_couverture: "https://exemple.com/img/fortnite_cover.jpg",
    photo_detail: ["https://exemple.com/img/fortnite_1.jpg", "https://exemple.com/img/fortnite_2.jpg"],
    enligne: true,
    enLocal: false,
  },
  {
    titre: "God of War Ragnarök",
    genre: "Action-Aventure",
    anneeSortie: 2022,
    categorie: "Solo",
    plateforme: ["PS4", "PS5"],
    prix: "69.99",
    editeur: "Sony Interactive Entertainment",
    avis: 4.8,
    pegi: 18,
    taille: 90,
    photo_couverture: "https://exemple.com/img/gow_cover.jpg",
    photo_detail: ["https://exemple.com/img/gow_1.jpg", "https://exemple.com/img/gow_2.jpg"],
    enligne: false,
    enLocal: false,
  },
  {
    titre: "Stardew Valley",
    genre: "Simulation",
    anneeSortie: 2016,
    categorie: "Multiplayer",
    plateforme: ["PC", "PS4", "Xbox One", "Nintendo Switch", "Mobile"],
    prix: "14.99",
    editeur: "ConcernedApe",
    avis: 4.9,
    pegi: 12,
    taille: 0.5,
    photo_couverture: "https://exemple.com/img/stardew_cover.jpg",
    photo_detail: ["https://exemple.com/img/stardew_1.jpg", "https://exemple.com/img/stardew_2.jpg"],
    enligne: true,
    enLocal: true,
  },
  {
    titre: "Counter-Strike 2",
    genre: "FPS",
    anneeSortie: 2023,
    categorie: "Multiplayer",
    plateforme: ["PC"],
    prix: "0",
    editeur: "Valve",
    avis: 4.3,
    pegi: 18,
    taille: 85,
    photo_couverture: "https://exemple.com/img/cs2_cover.jpg",
    photo_detail: ["https://exemple.com/img/cs2_1.jpg", "https://exemple.com/img/cs2_2.jpg"],
    enligne: true,
    enLocal: false,
  },
  {
    titre: "Super Mario Odyssey",
    genre: "Plateforme",
    anneeSortie: 2017,
    categorie: "Solo",
    plateforme: ["Nintendo Switch"],
    prix: "49.99",
    editeur: "Nintendo",
    avis: 4.9,
    pegi: 7,
    taille: 5.7,
    photo_couverture: "https://exemple.com/img/odyssey_cover.jpg",
    photo_detail: ["https://exemple.com/img/odyssey_1.jpg", "https://exemple.com/img/odyssey_2.jpg"],
    enligne: false,
    enLocal: true,
  },
  {
    titre: "Cyberpunk 2077",
    genre: "RPG",
    anneeSortie: 2020,
    categorie: "Solo",
    plateforme: ["PC", "PS5", "Xbox Series"],
    prix: "39.99",
    editeur: "CD Projekt",
    avis: 4.2,
    pegi: 18,
    taille: 70,
    photo_couverture: "https://exemple.com/img/cyberpunk_cover.jpg",
    photo_detail: ["https://exemple.com/img/cyberpunk_1.jpg", "https://exemple.com/img/cyberpunk_2.jpg"],
    enligne: false,
    enLocal: false,
  },
  {
    titre: "Rocket League",
    genre: "Sport",
    anneeSortie: 2015,
    categorie: "Multiplayer",
    plateforme: ["PC", "PS5", "Xbox Series", "Nintendo Switch"],
    prix: "0",
    editeur: "Psyonix",
    avis: 4.5,
    pegi: 3,
    taille: 20,
    photo_couverture: "https://exemple.com/img/rocketleague_cover.jpg",
    photo_detail: ["https://exemple.com/img/rocketleague_1.jpg", "https://exemple.com/img/rocketleague_2.jpg"],
    enligne: true,
    enLocal: true,
  },
  {
    titre: "Celeste",
    genre: "Plateforme",
    anneeSortie: 2018,
    categorie: "Solo",
    plateforme: ["PC", "PS4", "Xbox One", "Nintendo Switch"],
    prix: "19.99",
    editeur: "Maddy Makes Games",
    avis: 4.8,
    pegi: 7,
    taille: 1.2,
    photo_couverture: "https://exemple.com/img/celeste_cover.jpg",
    photo_detail: ["https://exemple.com/img/celeste_1.jpg", "https://exemple.com/img/celeste_2.jpg"],
    enligne: false,
    enLocal: false,
  },
  {
    titre: "Resident Evil 4 Remake",
    genre: "Horreur",
    anneeSortie: 2023,
    categorie: "Solo",
    plateforme: ["PC", "PS5", "Xbox Series"],
    prix: "59.99",
    editeur: "Capcom",
    avis: 4.7,
    pegi: 18,
    taille: 60,
    photo_couverture: "https://exemple.com/img/re4_cover.jpg",
    photo_detail: ["https://exemple.com/img/re4_1.jpg", "https://exemple.com/img/re4_2.jpg"],
    enligne: false,
    enLocal: false,
  },
  {
    titre: "Among Us",
    genre: "Social",
    anneeSortie: 2018,
    categorie: "Multiplayer",
    plateforme: ["PC", "Mobile", "Nintendo Switch", "PS5"],
    prix: "4.99",
    editeur: "Innersloth",
    avis: 4.0,
    pegi: 7,
    taille: 0.25,
    photo_couverture: "https://exemple.com/img/amongus_cover.jpg",
    photo_detail: ["https://exemple.com/img/amongus_1.jpg", "https://exemple.com/img/amongus_2.jpg"],
    enligne: true,
    enLocal: true,
  },
  {
    titre: "Street Fighter 6",
    genre: "Combat",
    anneeSortie: 2023,
    categorie: "Multiplayer",
    plateforme: ["PC", "PS5", "Xbox Series"],
    prix: "59.99",
    editeur: "Capcom",
    avis: 4.6,
    pegi: 12,
    taille: 60,
    photo_couverture: "https://exemple.com/img/sf6_cover.jpg",
    photo_detail: ["https://exemple.com/img/sf6_1.jpg", "https://exemple.com/img/sf6_2.jpg"],
    enligne: true,
    enLocal: true,
  },
];

// 2. Créez une fonction réutilisable pour ajouter un jeu
async function ajouterUnJeu(donneesJeu: Jeu) {
  try {
    // Firestore crée la collection "jeux" et le document automatiquement
    const docRef = await addDoc(collection(db, "jeux"), donneesJeu);
    console.log("Jeu ajouté avec succès ! ID :", docRef.id);
  } catch (error) {
    console.error("Erreur lors de l'ajout :", error);
  }
}

export async function getJeux(): Promise<Jeu[] | undefined> {
  try {
    const jeuxCollection = collection(db, "jeux");
    const querySnapshot = await getDocs(jeuxCollection);
    return querySnapshot.docs.map((document) => {
      const donnees = document.data() as Jeu;
      return {
        ...donnees,
        id: document.id,
      };
    });
  } catch (e) {

  }
}

export async function getJeuById(id: string): Promise<Jeu> {
  if (!id.trim()) {
    throw new Error("Identifiant du jeu manquant.")
  }

  const docRef = doc(db, "jeux", id)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) {
    throw new Error("Le jeu n'existe pas en base")
  }

  return {
    id: docSnap.id,
    ...(docSnap.data() as Omit<Jeu, "id">),
  }
}

export async function insererTousLesJeux() {
  for (const jeu of jeuxDeTest) {
    await ajouterUnJeu(jeu);
  }
}



