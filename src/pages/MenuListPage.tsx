import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const MenuListPage = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [category, setCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const menuCollection = collection(db, "menuItems");

  useEffect(() => {
    const fetchItems = async () => {
      const snapshot = await getDocs(menuCollection);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(data);
      setFilteredItems(data); // Initially show all
    };
    fetchItems();
  }, []);

  useEffect(() => {
    let updatedItems = [...items];

    // Filter by category
    if (category !== "All") {
      updatedItems = updatedItems.filter(item => item.category === category);
    }

    // Filter by search
    if (searchTerm) {
      updatedItems = updatedItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredItems(updatedItems);
  }, [category, searchTerm, items]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="w-full px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <select
            className="border p-2 rounded w-full sm:w-auto"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
            <option value="Starters">Starters</option>
            <option value="Main Course">Main Course</option>
            <option value="Desserts">Desserts</option>
            <option value="Drinks">Drinks</option>
          </select>

          <input
            type="text"
            placeholder="Search items..."
            className="border p-2 rounded w-full sm:w-1/2"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <ul className="divide-y divide-gray-300">
          {filteredItems.map(item => (
            <li key={item.id} className="py-4 flex items-center space-x-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-lg font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500 capitalize">{item.category}</p>
              </div>
              <div className="text-lg font-semibold text-gray-900">
                ₹{item.price}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MenuListPage;
