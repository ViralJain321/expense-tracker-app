import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore';
import { db } from './firebase';



export async function addExpense(email, expenseData) {
    try{
        await addDoc(collection(db, email), expenseData);
    }catch(error){
        console.error(error);
    }
    
}


export async function getExpenses(email) {
    const myCollectionRef = collection(db, email);

    try {
        const querySnapshot = await getDocs(query(myCollectionRef, orderBy('date', 'desc')));

        const documents = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return documents;
    } catch (error) {
        console.error(error);
    }
}





export async function updateExpense(collectionName, documentId, updatedData) {
    const documentRef = doc(db, collectionName, documentId);

    try {
        await updateDoc(documentRef, updatedData);
        console.log("Document updated successfully!");
    } catch (error) {
        console.error("Error updating document:", error);
    }
}

export async function fetchExpense(collectionName, documentId) {

    try {
        const docRef = doc(db, collectionName, documentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            return docSnap.data();
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error(error);
    }
}



export async function deleteExpense(collectionName, documentId){
  
    try{
        await deleteDoc(doc(db, collectionName, documentId));
    }catch(error){
        console.error(error);
    }

}