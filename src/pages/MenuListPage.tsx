import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const menuCollection = collection(db, "menuItems");

useEffect(() => {
  const fetchItems = async () => {
    const snapshot = await getDocs(menuCollection);
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setItems(items);
  };
  fetchItems();
}, []);
