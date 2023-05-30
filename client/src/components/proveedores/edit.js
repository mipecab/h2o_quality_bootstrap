import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Edit() {
 const [form, setForm] = useState({
   nombre: "",
   direccion: "",
   contacto: "",
   telefono: "",
   email: "",
   records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5050/proveedores/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(record);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedPerson = {
      nombre: form.nombre,
      direccion: form.direccion,
      contacto: form.contacto,
      telefono: form.telefono,
      email: form.email,
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:5050/proveedores/${params.id}`, {
     method: "PUT",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Actualizar Registro</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="nombre">Nombre</label>
         <input
           type="text"
           className="form-control"
           id="nombre"
           value={form.nombre}
           onChange={(e) => updateForm({ nombre: e.target.value })}
         />
       </div>

       <div className="form-group">
         <label htmlFor="direccion">Direccion</label>
         <input
           type="text"
           className="form-control"
           id="direccion"
           value={form.direccion}
           onChange={(e) => updateForm({ direccion: e.target.value })}
         />
       </div>

       <div className="form-group">
         <label htmlFor="direccion">Nombre Contacto</label>
         <input
           type="text"
           className="form-control"
           id="contacto"
           value={form.contacto}
           onChange={(e) => updateForm({ contacto: e.target.value })}
         />
        </div>

       <div className="form-group">
         <label htmlFor="telefono">Telefono</label>
         <input
           type="text"
           className="form-control"
           id="telefono"
           value={form.telefono}
           onChange={(e) => updateForm({ telefono: e.target.value })}
         />
       </div>

       <div className="form-group">
         <label htmlFor="email">email</label>
         <input
           type="email"
           className="form-control"
           id="email"
           value={form.email}
           onChange={(e) => updateForm({ email: e.target.value })}
         />
       </div>
 
       <br />
 
       <div className="form-group">
         <input
           type="submit"
           value="Actualizar Registro"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}