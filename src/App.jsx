import "./App.css";

import { Dashboard } from "./layout";

function App() {
  console.log(`${import.meta.env.VITE_URI_SERVER}`)
  return (
    <>
      <Dashboard />
    </>
  );
}

export default App;
