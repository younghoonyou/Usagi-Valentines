import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, updateDoc, doc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyA3L6BZJZnr7fpjNvAGH7tMnoxQDFXAJ6U",
    authDomain: "misabirthday-217b6.firebaseapp.com",
    projectId: "misabirthday-217b6",
    storageBucket: "misabirthday-217b6.appspot.com",
    messagingSenderId: "135217312875",
    appId: "1:135217312875:web:1168c4ba3b4d43be316d2e"
};
initializeApp(firebaseConfig);
const db = getFirestore();

window.getDocs = getDocs;
window.db = db;
window.collection = collection;
window.doc = doc;
window.updateDoc = updateDoc;

// const getKissValue = async() => {
//     try{
//         const querySnapshot = await getDocs(collection(db, "kiss"));
//         querySnapshot.forEach((doc) => {
//             const countValue = doc.data().count;
//             console.log(countValue);
//             return countValue;
//         });
//     }
//     catch(e){
//         console.error(e);
//     }
// };

//  window.getKissValue = await getKissValue();
//  window.updateKissValue = updateKissValue();

  
const updateKissValue = async() => {
    try {
        const docRef = doc(db, 'kiss', 'usagi');
        const value = parseInt(window.currentKiss) + 1;
        await updateDoc(docRef, { count: value });
    } catch (e) {
        console.error(e);
    }
}

window.updateKissValue = updateKissValue;
