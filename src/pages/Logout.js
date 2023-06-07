import { getAuth, signOut } from "firebase/auth";
import { redirect } from "react-router-dom";

export async function action() {
    const auth = getAuth();

    await signOut(auth)
        .then(() => {
            console.log("diidn")
        }
        )
        .catch((error) => {
            console.error(error)
        });

    return redirect('/');
}