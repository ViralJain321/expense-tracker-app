import { useState } from "react";
import classes from './ExpenseList.module.css'

import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesContent from "./ExpensesContent";
import ExpenseChart from "./ExpenseChart";

function ExpenseList(props) {

    const expense = props.expenses;

    const dateYearSet = new Set();
    for(let expenseItem of expense){
        const dateYear = new Date(expenseItem.date).getFullYear();
        dateYearSet.add(dateYear);
    }
    const expenseDateYear = Array.from(dateYearSet);

    expenseDateYear.sort((a,b) => b-a);
   
    const [filteredYear, setFilteredYear] = useState('All Expenses')
 
    const filterExpenseDataHandler = (selectedYear) => {
        setFilteredYear(selectedYear);   
    }

    const filterExp = expense.filter((expenseItem) => {
        expenseItem.date = new Date(expenseItem.date);
        expenseItem.amount = +expenseItem.amount;

        if(filteredYear === 'All Expenses'){
            return true;
        }

        return expenseItem.date.getFullYear().toString() === filteredYear;   
        
    })

    
  
    return (

        <Card className={classes.expenses}>
            <ExpensesFilter expenseDateYear={expenseDateYear} selectedYear={filteredYear} onFilterExpenseData={filterExpenseDataHandler} />
            <ExpenseChart filterExpense = {filterExp}/>
            <ExpensesContent items ={filterExp}/>
        </Card>

    )



}

export default ExpenseList;