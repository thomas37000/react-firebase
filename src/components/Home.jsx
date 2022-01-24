/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { query, orderBy} from "firebase/firestore";

import { db } from "../firebase/config";
import "../App.css";

const Home = () => {
  const [users, setUsers] = useState([]);
  console.log("data", users);

  const [form, setForm] = useState({
    age: null,
    city: "",
    country: "",
    description: "",
    email: "",
    image: "",
    username: "",
  });

  // "users" nom de la collection sur Firestore Database
  const usersCollectionRef = collection(db, "users");
  const userQuery = query(
    usersCollectionRef,
    // where("city", "==", "Nantes"),
    orderBy("username", "asc")
  );

  // récupérer les données du Firestore avec snapshot
  function getCards() {
    onSnapshot(userQuery,(snapshot) => {
      setUsers(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            viewing: false,
            ...doc.data(),
          };
        })
      );
    });
  }

  useEffect(() => {
    getCards();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.username) {
      alert(
        "remplichez les champs username et mail pour valider le formulaire"
      );
      return;
    }

    addDoc(usersCollectionRef, form);

    setForm({
      age: "",
      city: "",
      country: "",
      description: "",
      email: "",
      image: "",
      username: "",
    });
  };

  return (
    <div className="container p-5">
      <h1 className="display-3 text-light">React Firebase App</h1>

      {users.map((user, i) => (
        <div className="card-grid" key={user.id}>
          <div className="card" style={{ width: "25rem" }}>
            <div className="card-body">
              <h5 className="card-title"> {user.username} </h5>
              <div className="email">{user.email}</div>
              <p className="card-text">{user.description}</p>
            </div>
            <div className="card-footer">
              {user.city} - {user.country}
            </div>
          </div>
        </div>
      ))}

      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Créer un article</h5>
          </div>

          <div className="modal-body">
            <form className="sign-up-form" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">pseudo ou nom</label>
                <input
                  type="text"
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">ajoutez une description</label>
                <textarea
                  type="text"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Ville</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Pays</label>
                <input
                  type="text"
                  value={form.country}
                  onChange={(e) =>
                    setForm({ ...form, country: e.target.value })
                  }
                  className="form-control"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Validez
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
