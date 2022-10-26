import React, { useEffect, useState } from "react";
import "./Orders.css";
import {
  db,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  collection,
  getDocs,
} from "./firebase";
import { useStateValue } from "./StateProvider";
import Order from "./Order";

const Orders = () => {
  const [state, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getdd = async () => {
      // console.log(state);
      const coll = collection(db, "users", state.user?.uid, "orders"); // getting the whole orders collection of a particular user
      // console.log(coll);
      // running query on that collection to get the docs
      const q = query(coll, orderBy("created", "desc"));
      // const querySnapshot = await getDocs(q);
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        // const cities = [];
        setOrders(
          querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
        // querySnapshot.forEach((doc) => {
        //   cities.push(doc.data().name);
        // });
        // console.log("Current cities in CA: ", cities.join(", "));
      });
      // console.log("query>>", q);
      // const q = query(
      //   doc(db, "users", state.user?.uid, "orders"),
      //   orderBy("created", "desc")
      // );
      // const unsub = onSnapshot(
      //   doc(db, "users", state.user?.uid, "orders"),
      //   orderBy("created", "desc"),
      //   (doc) => {
      //     console.log("Current data: ", doc.data());
      //   }
      // );
      // console.log("query", querySnapshot);
    };
    if (state.user) {
      getdd();
    } else {
      setOrders([]);
    }
  }, [state.user]);
  console.log("state>>>>", orders);
  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders__order">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
