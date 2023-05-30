import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Record = (props) => (
  <tr>
    <td>{props.record.nombre}</td>
    <td>{props.record.direccion}</td>
    <td>{props.record.contacto}</td>
    <td>{props.record.telefono}</td>
    <td>{props.record.email}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.record._id}`}>
        Edit
      </Link>{" "}
      |
      <button
        className="btn btn-link"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);
  const [searchText, setSearchText] = useState("");

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5050/proveedores/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();
  }, []);

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:5050/proveedores/${id}`, {
      method: "DELETE",
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will filter the records based on the search text
  const filteredRecords = records.filter((record) => {
    const searchTextLowerCase = searchText.toLowerCase();
    return (
      record.nombre.toLowerCase().includes(searchTextLowerCase) ||
      record.direccion.toLowerCase().includes(searchTextLowerCase) ||
      record.contacto.toLowerCase().includes(searchTextLowerCase) ||
      record.telefono.toLowerCase().includes(searchTextLowerCase) ||
      record.email.toLowerCase().includes(searchTextLowerCase)
    );
  });

  // This method will map out the filtered records on the table
  function recordList() {
    return filteredRecords.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  return (
  <div>
      <h3>Proveedores</h3>
      <div className="mb-1">
         <Link
           to={`/createpr`}
           className="nav-link text-primary px-3 align-middle w-50">
           Crear Proveedor
         </Link>
      </div>   

      <div className="mb-1">
        <input
          type="text"
          className="form-control"
          style={{ width: '33%' }}
          placeholder="Buscar"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Contacto</th>
            <th>Telefono</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
  </div>
  );
}
