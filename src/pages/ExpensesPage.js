import { Suspense } from 'react';
import {
  useRouteLoaderData,
  json,
  redirect,
  defer,
  Await,
} from 'react-router-dom';

import { deleteExpense, getExpenses } from '../firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getCurrentUser } from '../util/authCheck';
import ExpenseList from '../components/Expense/ExpenseList';


function ExpensesPage() {
  const { expenses } = useRouteLoaderData('all-expenses');

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={expenses}>
          {(loadedExpenses) => <ExpenseList expenses={loadedExpenses} />}
        </Await>
      </Suspense>
    </>
  );
}

export default ExpensesPage;


async function loadExpenses() {

  const auth = getAuth();

  const response = await getExpenses(auth.currentUser.email);

  if (!response) {

    throw new json(
      { message: 'Could not fetch Expenses.' },
      {
        status: 500,
      }
    );
  }

  return response;

}

export async function loader() {
  const currentUser = await getCurrentUser();
  if (currentUser) {
    try {
      return defer({
        expenses: await loadExpenses(),
      });
    } catch (e) {
      console.error(e);
    }
  }
   else {
    return redirect('/auth?mode=login');
  }

}


export async function action({ request }) {

  const data = await request.formData();
  const auth = getAuth();
  const expenseId = data.get('id')

  try {
    await deleteExpense(auth.currentUser.email, expenseId);
  } catch (error) {
    console.error(error);
    throw new json({ message: "Could not delete expense" }, 
    {
      status: 500,
    });
  }

  return redirect('/expenses');
}



