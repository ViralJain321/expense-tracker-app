import { defer, json, redirect, useRouteLoaderData } from 'react-router-dom';
import { fetchExpense } from '../firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Suspense } from 'react';
import NewExpense from '../components/NewExpense/NewExpense';



function EditExpensePage() {
  const data = useRouteLoaderData('expense-edit');
  return <Suspense fallback={<p>Loading...</p>}>
    <NewExpense method='patch' expense={data} />
  </Suspense>
}




export default EditExpensePage;

async function loadExpense(id) {
  const auth = getAuth();

  try {
    const response = await fetchExpense(auth.currentUser.email, id);
    if (!response) {
      throw new json({ message: 'Could not fetch Expense.' },
        {
          status: 500,
        });

    }

    return response;
  } catch (error) {
    console.error(error);
  }

}



export async function loader({ request, params }) {
  const id = params.expenseId;
  const auth = getAuth();
  try {
    if (auth.currentUser) {
      return defer({
        expense: await loadExpense(id),
      });
    } else {
      return redirect('/auth?mode=login');
    }
  } catch (error) {
    console.error(error);
  }

}