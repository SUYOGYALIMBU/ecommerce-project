import React from "react";

function AddProduct() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input name="title" className="border" />
        <input name="description" className="border" />
        <input name="price" className="border" />
        <input name="stock" className="border" />
        <input name="categoryId" className="border" />
        <input name="images" multiple className="border" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddProduct;
