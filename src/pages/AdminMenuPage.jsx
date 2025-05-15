import { db } from "../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

const menuCollection = collection(db, "menuItems");

// Fetch from Firestore
useEffect(() => {
  const fetchItems = async () => {
    const snapshot = await getDocs(menuCollection);
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setItems(items);
  };
  fetchItems();
}, []);

// Add or Update Item
const addOrUpdateItem = async (newItem) => {
  if (editItem) {
    const ref = doc(db, "menuItems", editItem.id);
    await updateDoc(ref, newItem);
  } else {
    await addDoc(menuCollection, newItem);
  }
  // Refetch items
  const snapshot = await getDocs(menuCollection);
  const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  setItems(items);
  setEditItem(null);
};

// Delete Item
const handleDelete = async (id) => {
  if (confirm("Delete this item?")) {
    await deleteDoc(doc(db, "menuItems", id));
    setItems(prev => prev.filter(i => i.id !== id));
  }
};
