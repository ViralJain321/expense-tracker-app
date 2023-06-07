
import classes from './ExpenseDate.module.css'

function ExpenseDate(props) {
    const expDate = new Date(props.date);

    const day = expDate.toLocaleString("en-US", { day: '2-digit' });
    const month = expDate.toLocaleString('en-US', { month: 'long' });
    const year = expDate.getFullYear();

    return (
        <div className={classes["expense-date"]}>
            <div className={classes["expense-date__month"]}>{month}</div>
            <div className={classes["expense-date__year"]}>{year}</div>
            <div className={classes["expense-date__day"]}>{day}</div>
        </div>
    )



}

export default ExpenseDate;