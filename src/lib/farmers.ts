import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase";

export type FarmerSignupPayload = {
  fullName: string;
  phone: string;
  aadhaar: string;
  state: string;
  district: string;
  village: string;
  locale: string;
};

export async function saveFarmerSignup(payload: FarmerSignupPayload) {
  if (!isFirebaseConfigured() || !db) {
    throw new Error("FIREBASE_NOT_CONFIGURED");
  }

  const docRef = await addDoc(collection(db, "farmers"), {
    fullName: payload.fullName,
    phone: payload.phone,
    aadhaar: payload.aadhaar,
    state: payload.state,
    district: payload.district,
    village: payload.village,
    locale: payload.locale,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}
