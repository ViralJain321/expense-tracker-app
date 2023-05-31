
import ExpenseDate from "./ExpenseDate";
import Card from '../UI/Card'
import "./ExpenseItem.css"



function ExpenseItem(props) {

    const expenseItem = props.expenseItem;

    return (<li>
        <Card className="expense-item">

            <ExpenseDate date={expenseItem.date} />

            <div className="expense-item__description">
                <h2>{expenseItem.title}</h2>
                <div className="expense-item__price">₹{(expenseItem.amount).toFixed(2)}</div>
            </div>

        </Card>
    </li>)

}

export default ExpenseItem;