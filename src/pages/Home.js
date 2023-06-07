import PageContent from "../components/UI/PageContent";
import { NavLink } from "react-router-dom";


function HomePage() {

  return (
    <PageContent title="Welcome!">   
      <p>To our Expense Tracker App. <NavLink to ='/auth?mode=login'> Login/Register</NavLink> to get started.</p>
    </PageContent>
  );
}

export default HomePage;
