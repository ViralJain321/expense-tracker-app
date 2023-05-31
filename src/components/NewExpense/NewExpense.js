import { useState } from "react";
import ExpenseForm from "./ExpenseForm";

import './NewExpense.css'

const NewExpense = (props) => {

    const [isEditable, setIsEditable] = useState(false)

    const saveExpenseDataHandler = (enteredExpenseData) => {

        const expenseData = {

            ...enteredExpenseData,
            id: new Date().getTime()
        }

        props.onAddExpense(expenseData);

        setIsEditable(false);
    }

    const showExpenseFormHandler = () => {
        setIsEditable(true);
    }
    const hideExpenseFormHandler = () => {
        setIsEditable(false);
    }

    return <div className="new-expense">
        {!isEditable && (<div>
            <button onClick={showExpenseFormHandler}>Add New Expense</button>
        </div>)}
        {isEditable && <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} onCancel={hideExpenseFormHandler} />}
    </div>

}

export default NewExpense;