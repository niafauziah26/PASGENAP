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
  apiKey: "AIzaSyD_N_5Tjv9zh_eJyfTXxUOICM2XX86--IM",
  authDomain: "datasiswa-aebb3.firebaseapp.com",
  projectId: "datasiswa-aebb3",
  storageBucket: "datasiswa-aebb3.appspot.com",
  messagingSenderId: "1049128187878",
  appId: "1:1049128187878:web:e1879710f4b5252a68c827",
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarAbsensi() {
  const refDokumen = collection(db, "absensi");
  const kuery = query(refDokumen, orderBy("nama"));
  const cuplikanKuery = await getDocs(kuery);
  
  let hasil = [];
  cuplikanKuery.forEach((dok) => {
    hasil.push({ 
      id: dok.id,
      tanggal: dok.data().tanggal,
      nis: dok.data().nis, 
      nama: dok.data().nama,
      alamat: dok.data().alamat,
      notlpn: dok.data().notlpn, 
      kelas: dok.data().kelas,
      keterangan: dok.data().keterangan,
    });
  });
  
  return hasil;
}

export function formatAngka(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function tambahabsensi(tanggal, nis, nama, alamat, notlpn, kelas, keterangan) {
      try {
        const dokRef = await addDoc(collection(db, 'absensi'), {
          tanggal: tanggal,
          nis: nis,
          nama: nama,
          alamat: alamat,
          notlpn: notlpn,
          kelas: kelas,
          keterangan: keterangan,

        });
        console.log('Berhasil menambah absensi ' + dokRef.id);
      } catch (e) {
        console.log('Gagal menambah absensi ' + e);
      }
    }

    export async function hapusabsensi(docid) {
      await deleteDoc(doc(db, "absensi", docid));
    }
    export async function ubahabsensi(docId, tanggal, nis, nama, alamat, notlpn, kelas, keterangan) {
      await updateDoc(doc(db, "absensi", docId), {
        tanggal: tanggal,
        nis: nis,
        nama: nama,
        alamat: alamat,
        notlpn: notlpn,
        kelas: kelas,
        keterangan: keterangan,

      });
    }

    export async function ambilabsensi(docId) {
      const docRef = await doc(db, "absensi", docId);
      const docSnap = await getDoc(docRef);

      return await docSnap.data();
    }