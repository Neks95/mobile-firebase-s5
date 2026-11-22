import { readonly, ref } from "vue";
import {onAuthStateChanged, signOut, type User} from "firebase/auth";
import { auth } from "@/firebase";

const user = ref<User | null>(null);
const ready = ref(false);

let resolveAuthReady!: () => void;
export const authReady = new Promise<void>((resolve) => {
  resolveAuthReady = resolve;
});

onAuthStateChanged(auth, (currentUser) => {
  user.value = currentUser;

  if (!ready.value) {
    ready.value = true;
    resolveAuthReady();
  }
});

 async function logOut() {
  await signOut(auth);
}

export function useAuth() {
  return {
    user: readonly(user),
    ready: readonly(ready),
    logOut,
  };
}
