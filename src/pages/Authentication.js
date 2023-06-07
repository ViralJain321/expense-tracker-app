import { json, redirect } from 'react-router-dom';
import AuthForm from '../components/UI/AuthForm';
import { browserSessionPersistence, createUserWithEmailAndPassword, getAuth, setPersistence, signInWithEmailAndPassword } from 'firebase/auth';
import { arePasswordsMatch, isValidEmail, isValidText } from '../util/validation';



function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  let errors = {};
  try {
    const auth = getAuth();
    const searchParams = new URL(request.url).searchParams;
    const mode = searchParams.get('mode') || 'login';

    if (mode !== 'login' && mode !== 'signup') {
      throw json({ message: 'Unsupported mode.' }, { status: 422 });
    }

    const data = await request.formData();



    if (!isValidEmail(data.get('email'))) {
      errors.email = 'Invalid email address.';
    }

    if (!isValidText(data.get('password'), 6)) {
      errors.password = 'Invalid password. Must be at least 6 characters long.';
    }



    let authData;

    if (mode === 'signup') {

      authData = {
        email: data.get('email'),
        password: data.get('password'),
        confirmPassword: data.get('confirm-password'),
      };

      if (!arePasswordsMatch(data.get('password'), data.get('confirm-password'))) {
        errors.password = 'Password and confirm password fields must match';
      }

      try {
        await setPersistence(auth, browserSessionPersistence)
        await createUserWithEmailAndPassword(auth, authData.email, authData.password)
      } catch (error) {
        console.error(error);
      }

    } else {

      authData = {
        email: data.get('email'),
        password: data.get('password'),
      };

      try {
        await setPersistence(auth, browserSessionPersistence)
        await signInWithEmailAndPassword(auth, authData.email, authData.password)
      }
      catch (error) {
        console.error(error)
        errors.password = 'User does not exists or incorrect password';

      }

    }

    if (Object.keys(errors).length > 0) {

      return json({
        message: 'Event failed due to validation errors.',
        errors,
      });
    }

    return auth.currentUser ? redirect('/') : new Error();

  } catch (err) {
    console.error(err)
    return;
  }

}