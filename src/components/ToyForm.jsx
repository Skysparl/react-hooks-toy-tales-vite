import React, { useState } from "react";

const h = React.createElement;

function ToyForm({ onAddToy }) {
  const [formData, setFormData] = useState({ name: "", image: "" });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, likes: 0 }),
    })
      .then((r) => r.json())
      .then((newToy) => {
        onAddToy(newToy);
        setFormData({ name: "", image: "" });
      });
  }

  return (
    <div className="container">
      {h("form", { className: "add-toy-form", onSubmit: handleSubmit },
        <h3>Create a toy!</h3>,
        h("input", { type: "text", name: "name", placeholder: "Enter a toy's name...",
          className: "input-text", value: formData.name, onChange: handleChange }),
        <br />,
        h("input", { type: "text", name: "image", placeholder: "Enter a toy's image URL...",
          className: "input-text", value: formData.image, onChange: handleChange }),
        <br />,
        h("input", { type: "submit", name: "submit", value: "Create New Toy", className: "submit" })
      )}
    </div>
  );
}

export default ToyForm;