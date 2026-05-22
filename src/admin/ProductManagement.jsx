import axios from "axios";
import React, { useEffect, useState } from "react";

const ProductManagement = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:3000/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, [products]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:3000/products", form);
    alert("Product Added successfully.!!");
    window.location.reload();
  };


  const handleDelete = async(id)=>{
    await axios.delete(`http://localhost:3000/products/${id}`)
    alert('Product deleted successfully.!!');
    window.location.reload();
  }

  return (
    <div>
      <table>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Category</th>
          <th>Action</th>
        </tr>

        {products.map((p) => (
          <tr>
            <td>
              <img src={p.image} alt="" />
            </td>
            <td>{p.name}</td>
            <td>{p.description}</td>
            <td>{p.price}</td>
            <td>{p.category}</td>
            <td>
              <button>Edit</button>
              <button onClick={()=>handleDelete(p.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </table>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter Product Name."
        />
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Enter Product Description."
        />

        <input
          type="text"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Enter Product price."
        />

        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Enter Product category."
        />

        <input
          type="text"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Enter Product image."
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default ProductManagement;
