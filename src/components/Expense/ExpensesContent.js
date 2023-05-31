
import ExpenseItem from "./ExpenseItem";

import './ExpensesContent.css'

const ExpensesContent = props => {

    const filterExp = props.items;

    if (filterExp.length === 0) {
        return <h2 className="expenses-list__fallback ">
            No Expenses Found.
        </h2>
    }

    return (
        <ul className="expenses-list">
            {filterExp.map((expenseItem) => {
                return <ExpenseItem key={expenseItem.id} expenseItem={expenseItem}
                />
            })
            }
        </ul>
    )


}

export default ExpensesContent