import Card from "../UI/Card";
import './ExpenseList.css'
import ExpensesFilter from "./ExpensesFilter";
import { useState } from "react";
import ExpensesContent from "./ExpensesContent";
import ExpenseChart from "./ExpenseChart";

function ExpenseList(props) {

    const expense = props.expItems;
   
    const [filteredYear, setFilteredYear] = useState('All Expenses')
 


    const filterExpenseDataHandler = (selectedYear) => {
        setFilteredYear(selectedYear);   
    }

    const filterExp = expense.filter((expenseItem) => {
        if(filteredYear === 'All Expenses'){
            return true;
        }
        return expenseItem.date.getFullYear().toString() === filteredYear;   
    })

    
  
    return (

        <Card className="expenses">

            <ExpensesFilter selectedYear={filteredYear} onFilterExpenseData={filterExpenseDataHandler} />

            <ExpenseChart filterExpense = {filterExp}/>
            
            <ExpensesContent items ={filterExp}/>
        </Card>

    )



}

export default ExpenseList;