import { getFirestore } from "firebase/firestore";
import {
  getDocs,
  query,
  collection,
  where,
  addDoc,
  orderBy,
} from "firebase/firestore";
import type { ITodo } from "../components/todo/todo";

async function fetchTodos(uid: string) {
  const db = getFirestore();
  const q = query(
    collection(db, "todos"),
    where("uid", "==", uid),
    orderBy("createdAt")
  );
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => doc.data() as ITodo);
  return data;
}

async function addTodo(uid: string, todoItem: ITodo) {
  const db = getFirestore();
  const createdAt = new Date().valueOf();
  await addDoc(collection(db, "todos"), {
    ...todoItem,
    uid,
    createdAt,
  });
}

export default { fetchTodos, addTodo };
