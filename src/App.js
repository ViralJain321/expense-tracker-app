import { React , Suspense , lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomePage from './pages/Home';
import RootLayout from './pages/Root';
import ExpensesPage from "./pages/ExpensesPage";
import ErrorPage from "./pages/Error";

const ExpensesRootLayout = lazy(() => import('./pages/ExpensesRoot'));
const EditExpensePage = lazy(() => import('./pages/EditExpense'));
const NewExpensePage = lazy(() => import('./pages/NewExpensePage'));
const AuthenticationPage = lazy(() => import('./pages/Authentication'));

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      id: 'root',
      loader: () => import('./util/authCheck').then((module) => module.getCurrentUser()),
      children: [
        { index: true, element:  <HomePage /> },
        {
          path: 'expenses',
          element: <ExpensesRootLayout/>,
          children: [
            {
              index: true,
              id: 'all-expenses',
              element: <ExpensesPage />,
              loader: () => import('./pages/ExpensesPage').then((module) => module.loader()),
              action : (meta) => import('./pages/ExpensesPage').then((module) => module.action(meta)),
            },
            {
              path: ':expenseId',
              children: [
                {
                  path: 'edit',
                  id: 'expense-edit',
                  element: <EditExpensePage />,
                  loader : (meta) => import('./pages/EditExpense').then((module) => module.loader(meta)),
                  action: (meta) => import('./components/NewExpense/ExpenseForm').then((module) => module.action(meta))
                },
              ],
            }
          ]
        },
        {
          path: 'new',
          element: <NewExpensePage />,
          action: (meta) => import('./components/NewExpense/ExpenseForm').then((module) => module.action(meta)),
          loader: () => import('./util/authCheck').then((module) => module.authCheck()),
        },
        {
          path: 'auth',
          element: <AuthenticationPage />,
          action: (meta) => import('./pages/Authentication').then((module) => module.action(meta)),
        },
        {
          path: 'logout',
          action: () => import('./pages/Logout').then((module) => module.action()),
        }
      ],
    },

  ]);


  return (
    <Suspense fallback={<p>Loading...</p>}>
      <RouterProvider router={router} />
    </Suspense>
  );


}

export default App;
