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
   

    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item.id} className="flex items-center gap-4 border-b pb-2">
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 object-cover rounded"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{item.name}</h3>
          </div>
          <div className="text-green-700 font-bold">₹{item.price}</div>
        </li>
      ))}
    </ul>
  );
}
