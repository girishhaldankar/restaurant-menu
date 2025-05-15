// pages/MenuListPage.jsx
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function MenuListPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const snapshot = await getDocs(collection(db, "menuItems"));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setItems(data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {items.length === 0 ? (
        <p>No menu items available.</p>
      ) : (
        items.map(item => (
          <div key={item.id} className="border rounded p-4 shadow bg-white space-y-2">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="text-xl font-bold">{item.name}</h3>
            <p className="text-gray-600">₹{item.price}</p>
            <p className="text-sm text-gray-500 capitalize">{item.category}</p>
          </div>
        ))
      )}
    </div>
  );
}
