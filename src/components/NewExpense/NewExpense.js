import ExpenseForm from "./ExpenseForm";

import classes from "./NewExpense.module.css";

const NewExpense = (props) => {


    return <div className={classes["new-expense"]}>
        <ExpenseForm method={props.method} expense={props.expense}  /> 
    </div>

}

export default NewExpense;