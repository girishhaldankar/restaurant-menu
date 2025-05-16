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
    if (!formData.name || !formData.price) return;

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
        <select
  name="category"
  value={formData.category}
  onChange={handleChange}
  className="w-full p-2 border rounded"
>
  <option value="">-- Select Category (optional) --</option>
  <option value="Veg">Veg</option>
  <option value="Non-Veg">Non-Veg</option>
  <option value="Starters">Starters</option>
  <option value="Main Course">Main Course</option>
  <option value="Desserts">Desserts</option>
  <option value="Drinks">Drinks</option>
</select>

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
      <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700 mt-4">
  {items.map((item) => (
    <li key={item.id} className="py-3 sm:py-4">
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <div className="shrink-0">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src={item.image}
            alt={item.name}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {item.name}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400 capitalize">
            {item.category}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          ₹{item.price}
        </div>
        <div className="flex flex-col gap-1">
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
      </div>
    </li>
  ))}
</ul>

    </div>
  );
};

export default AdminMenuPage;
