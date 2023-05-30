import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function CrearProveedor() {
 const [form, setForm] = useState({
   nombre: "",
   direccion: "",
   contacto: "",
   telefono: "",
   email: "",
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
 
   await fetch("http://localhost:5050/proveedores", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ nombre: "", direccion: "", contacto: "", telefono: "", email: "" });
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Crear nuevo proveedor</h3>
     <form onSubmit={onSubmit}>
       <div className="mb-1 d-flex justify-content-center">
         <input
           type="text"
           className="form-control"
           style={{ width: '33%' ,textAlign: 'center' }}
           placeholder="Nombre"
           id="nombre"
           value={form.nombre}
           onChange={(e) => updateForm({ nombre: e.target.value })}
         />
       </div>

       <div className="mb-1 d-flex justify-content-center">
         <input
           type="text"
           className="form-control"
           style={{ width: '33%' ,textAlign: 'center'}}
           placeholder="Dirección"
           id="direccion"
           value={form.position}
           onChange={(e) => updateForm({ direccion: e.target.value })}
         />
       </div>

       <div className="mb-1 d-flex justify-content-center">
         <input
           type="text"
           className="form-control"
           style={{ width: '33%' ,textAlign: 'center'}}
           placeholder="Nombre Contacto"
           id="contacto"
           value={form.contacto}
           onChange={(e) => updateForm({ contacto: e.target.value })}
         />
        </div>

       <div className="mb-1 d-flex justify-content-center">
         <input
           type="text"
           className="form-control"
           style={{ width: '33%' ,textAlign: 'center'}}
           placeholder="Teléfono"
           id="telefono"
           value={form.telefono}
           onChange={(e) => updateForm({ telefono: e.target.value })}
         />
       </div>

       <div className="mb-1 d-flex justify-content-center">
         <input
          type="email"
          className="form-control"
          style={{ width: '33%', textAlign: 'center' }}
          id="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => updateForm({ email: e.target.value })}
        />
      </div>

       <div className="mb-1 d-flex justify-content-center">
         <input
           type="submit"
           value="Crear Proveedor"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}