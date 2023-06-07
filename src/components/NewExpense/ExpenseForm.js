


import classes from './ExpenseForm.module.css'
import { Form, json, redirect, useActionData, useNavigate, useNavigation } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { addExpense, updateExpense } from '../../firebase/firestore';
import { isValidAmount, isValidDate, isValidText } from '../../util/validation';


const ExpenseForm = (props) => {

    let expense;
    if (props.expense) {
        expense = props.expense.expense;
    } else {
        expense = props.expense;
    }


    const data = useActionData();


    const navigate = useNavigate();
    const navigation = useNavigation();

    const isSubmitting = navigation.state === 'submitting';

    function cancelHandler() {
        navigate('/expenses');
    }



    return (
        <Form
            method={props.method}
            className={classes['new-expense']}
        >
            {data && data.errors && (
                <ul className={classes.error}>
                    {Object.values(data.errors).map((err) => (
                        <li key={err} >{err}</li>
                    ))}
                </ul>
            )}
            <p className={classes['new-expense__control']}>
                <label htmlFor="item">Item</label>
                <input
                    id="item"
                    type="text"
                    name="item"
                    required
                    defaultValue={expense ? expense.item : ''}
                />
            </p>
            <p className={classes['new-expense__control']}>
                <label htmlFor="amount">Amount</label>
                <input
                    id="amount"
                    type="number"
                    name="amount"
                    min='0.01'
                    step='0.01'
                    required
                    defaultValue={expense ? expense.amount : ''}
                />
            </p>
            <p className={classes['new-expense__control']}>
                <label htmlFor="date">Date</label>
                <input
                    id="date"
                    type="date"
                    name="date"
                    required
                    defaultValue={expense ? expense.date : ''}
                />
            </p>
            <p className={classes['new-expense__control']}>
                <label htmlFor="location">Location</label>
                <input
                    id="loaction"
                    type="text"
                    name="location"
                    required
                    defaultValue={expense ? expense.location : ''}
                />
            </p>
            <div className={classes['new-expense__actions']}>
                <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
                    Cancel
                </button>
                <button disabled={isSubmitting}

                >
                    {isSubmitting ? 'Submitting...' : 'Add Expense'}
                </button>
            </div>

        </Form>
    )
}


export async function action({ request, params }) {

    const auth = getAuth()
    const method = request.method;
    const data = await request.formData();



    const expenseData = {
        item: data.get('item'),
        amount: data.get('amount'),
        date: data.get('date'),
        location: data.get('location'),
        uid: auth.currentUser.uid
    }


    let errors = {};

    if (!isValidText(data.get('item'))) {
        errors.item = 'Invalid item name.';
    }

    if (!isValidAmount(data.get('amount'))) {
        errors.amount = 'Invalid amount.';
    }

    if (!isValidDate(data.get('date'))) {
        errors.date = 'Invalid date.';
    }

    if (!isValidText(data.get('location'))) {
        errors.location = 'Invalid location.';
    }


    if (Object.keys(errors).length > 0) {
        console.log(errors)
        return json({
            message: 'Updating the event failed due to validation errors.',
            errors,
        });
    }





    if (method === 'POST') {
        await addExpense(auth.currentUser.email, expenseData)
    }


    if (method === 'PATCH') {
        const expenseId = params.expenseId;
        await updateExpense(auth.currentUser.email, expenseId, expenseData)
    }

    return redirect('/expenses');
}

export default ExpenseForm; 