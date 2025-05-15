import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const AdminMenuPage = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
  });
  const [editItem, setEditItem] = useState(null);

  const menuCollection = collection(db, "menuItems");

  // Fetch items from Firestore
  useEffect(() => {
    const fetchItems = async () => {
      const snapshot = await getDocs(menuCollection);
      const itemsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(itemsData);
    };
    fetchItems();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Add or update item
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.category) return;

    if (editItem) {
      const ref = doc(db, "menuItems", editItem.id);
      await updateDoc(ref, formData);
    } else {
      await addDoc(menuCollection, formData);
    }

    // Refresh
    const snapshot = await getDocs(menuCollection);
    const itemsData = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setItems(itemsData);

    setFormData({ name: "", price: "", category: "", image: "" });
    setEditItem(null);
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setFormData(item);
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this item?")) {
      await deleteDoc(doc(db, "menuItems", id));
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">
        {editItem ? "Edit Menu Item" : "Add Menu Item"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full"
        />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editItem ? "Update" : "Add"}
        </button>
      </form>

      <h2 className="text-lg font-semibold mt-8">Menu Items</h2>
      <ul className="divide-y mt-4">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between items-center py-2">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">
                ₹{item.price} • {item.category}
              </p>
            </div>
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded object-cover"
              />
            )}
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="text-blue-500 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminMenuPage;
