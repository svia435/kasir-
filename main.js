import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDFYmmVvk-jLZIeAdYKiTwVw2jqd4VINFA",
  authDomain: "insan-cemerlang.firebaseapp.com",
  projectId: "insan-cemerlang",
  storageBucket: "insan-cemerlang.appspot.com",
  messagingSenderId: "579109661574",
  appId: "1:579109661574:web:4a7cd4060f70eded945a07"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//fungsi untuk menampilkan data dari data base
export async function ambilDaftarkasir() {
  const refDokumen = collection(db, "kasir");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      nama: dok.data().nama,
      harga: dok.data().harga,
    });
  });



  return hasil;
}
//################$#######

export function formatAngka(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
//fungsi untuk menambahkan data
export async function tambahkasir(nama, harga,) {
  try {
    const dokRef = await addDoc(collection(db, 'kasir'), {
      nama: nama,
      harga: harga,
    });
    console.log('berhasil menembah kasir ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah kasir ' + e);
  }
}
//#####################
//fungsi untuk hapus data
export async function hapuskasir(docId) {
  await deleteDoc(doc(db, "kasir", docId));
}
//fungsi untuk ubah data
export async function ubahkasir(docId, nama, harga,) {
  await updateDoc(doc(db, "kasir", docId), {
    nama: nama,
    harga: harga,
  });
}
//fungsi untuk ambil data dan untuk diubah
export async function ambilkasir(docId) {
  const docRef = await doc(db, "kasir", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}