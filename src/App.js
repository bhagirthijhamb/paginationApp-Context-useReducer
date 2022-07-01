import "./App.css";

import { AppContextProvider } from "./context/appContext";
import Layout from "./components/Layout/Layout";
import StudentList from "./components/Students/StudentList";
import Filters from "./components/Filters.js/Filters";

function App() {
  return (
    <AppContextProvider>
      <Layout>
        <Filters />
        <StudentList />
      </Layout>
    </AppContextProvider>
  );
}

export default App;
