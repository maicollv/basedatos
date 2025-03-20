// App.jsx
import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';  // Importamos la configuración de Firebase
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const App = () => {
  const [items, setItems] = useState([]);       // Para almacenar los items de Firestore
  const [newItem, setNewItem] = useState("");   // Para almacenar el nuevo item que se va a agregar
  const [editItemId, setEditItemId] = useState("");  // Para identificar qué item estamos editando
  const [editItemName, setEditItemName] = useState("");  // Para almacenar el nombre del item editado

  // Obtener datos de Firestore
  const getItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "items"));
      const itemsList = [];
      querySnapshot.forEach((doc) => {
        itemsList.push({ id: doc.id, ...doc.data() });
      });
      setItems(itemsList);  // Actualizamos el estado con los items obtenidos
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };

  // Agregar un nuevo item a Firestore
  const addItem = async () => {
    if (newItem) {
      try {
        await addDoc(collection(db, "items"), {
          name: newItem,
        });
        setNewItem("");  // Limpiar el campo de input
        getItems();      // Volver a cargar los items de Firestore
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  // Editar un item existente
  const updateItem = async () => {
    if (editItemName) {
      try {
        const itemRef = doc(db, "items", editItemId);
        await updateDoc(itemRef, {
          name: editItemName,
        });
        setEditItemId("");  // Limpiar el ID de edición
        setEditItemName("");  // Limpiar el nombre editado
        getItems();           // Volver a cargar los items de Firestore
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    }
  };

  // Eliminar un item
  const deleteItem = async (id) => {
    try {
      const itemRef = doc(db, "items", id);
      await deleteDoc(itemRef);
      getItems();  // Volver a cargar los items de Firestore
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  // Función para iniciar el modo de edición
  const startEditing = (id, name) => {
    setEditItemId(id);
    setEditItemName(name);
  };

  useEffect(() => {
    getItems();  // Cargar los items cuando el componente se monta
  }, []);

  return (
    <div>
      <h1>Lista de Items</h1>

      {/* Formulario para agregar un nuevo item */}
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Nuevo item"
      />
      <button onClick={addItem}>Agregar</button>

      <h2>Editar Item</h2>
      {/* Formulario para editar un item existente */}
      {editItemId && (
        <>
          <input
            type="text"
            value={editItemName}
            onChange={(e) => setEditItemName(e.target.value)}
            placeholder="Nuevo nombre"
          />
          <button onClick={updateItem}>Actualizar</button>
        </>
      )}

      <ul>
        {/* Mostrar la lista de items */}
        {items.map((item) => (
          <li key={item.id}>
            {item.name} 
            <button onClick={() => startEditing(item.id, item.name)}>Editar</button>
            <button onClick={() => deleteItem(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
