import { getAuth } from "firebase/auth";


export async function getCurrentUser(){
  
    const auth = getAuth();
   
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(user => {
         unsubscribe();
         resolve(user);
      }, reject);
   });
 
}


export async function authCheck(){

  const auth = getAuth();
  
  if(auth.currentUser) {
    return auth.currentUser;
  }else{
    return null;
  
  }
}

