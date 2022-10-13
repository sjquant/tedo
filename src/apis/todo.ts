import { getFirestore } from "firebase/firestore";
import { getDocs, query, collection, where } from "firebase/firestore";
import type { ITodo } from "../components/todo/todo";

async function fetchTodos(uid: string) {
  const db = getFirestore();
  const q = query(collection(db, "todos"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => doc.data() as ITodo);
  return data;
}

export default { fetchTodos };
