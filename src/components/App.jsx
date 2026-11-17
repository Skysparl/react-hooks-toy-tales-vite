import React, { useState, useEffect } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

const API = "http://localhost:3001/toys";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch(API).then((r) => r.json()).then((data) => setToys(data));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }
  function handleAddToy(newToy) {
    setToys((toys) => [...toys, newToy]);
  }
  function handleUpdateToy(updatedToy) {
    setToys((toys) => toys.map((t) => (t.id === updatedToy.id ? updatedToy : t)));
  }
  function handleDeleteToy(id) {
    setToys((toys) => toys.filter((t) => t.id !== id));
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} onUpdateToy={handleUpdateToy} onDeleteToy={handleDeleteToy} />
    </>
  );
}

export default App;