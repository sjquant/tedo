import { deleteDoc, doc, getFirestore, updateDoc } from "firebase/firestore";
import {
  getDocs,
  query,
  collection,
  where,
  addDoc,
  orderBy,
} from "firebase/firestore";
import type { ITodo } from "../components/todo/todo";

async function fetchTodos(uid: string, todoDate: string): Promise<ITodo[]> {
  const db = getFirestore();

  const todoDateIns = todoDate ? ["", todoDate] : [""];
  const q = query(
    collection(db, "todos"),
    where("uid", "==", uid),
    where("todoDate", "in", todoDateIns),
    orderBy("createdAt")
  );

  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as ITodo)
  );
  return data;
}

async function addTodo(
  uid: string,
  content: string,
  todoDate: string | null
): Promise<string> {
  const db = getFirestore();
  const createdAt = Date.now();
  const docRef = await addDoc(collection(db, "todos"), {
    content,
    uid,
    createdAt,
    todoDate,
    done: false,
  });
  return docRef.id;
}

async function updateDone(id: string, done: boolean) {
  const db = getFirestore();
  const docRef = doc(db, "todos", id);
  await updateDoc(docRef, {
    done,
  });
}

async function removeTodo(id: string) {
  const db = getFirestore();
  const docRef = doc(db, "todos", id);
  await deleteDoc(docRef);
}

export default { fetchTodos, addTodo, updateDone, removeTodo };
