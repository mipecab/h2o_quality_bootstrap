import React, { useEffect } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5050/dashboard', {
          credentials: 'include'
        });
        const data = await response.json();

        if (data.Status === "Success") {
          if (data.role === "admin") {
            navigate('/');
          } else {
            const id = data.id;
            navigate('/employeedetail/' + id);
          }
        } else {
          navigate('/start');
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5050/logout', {
        credentials: 'include'
      });
      navigate('/start');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a href="/" className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
              <span className="fs-5 fw-bolder d-none d-sm-inline">H2O Colombia</span>
            </a>
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
              <li>
                <Link to="/" data-bs-toggle="collapse" className="nav-link text-white px-0 align-middle">
                  <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Lotes</span> </Link>
              </li>
              <li>
                <Link to="/recordList" className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Proveedores</span> </Link>
              </li>
              <li>
                <Link to="profile" className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-person"></i> <span className="ms-1 d-none d-sm-inline">Productos</span></Link>
              </li>
              <li>
                <Link to="profile" className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-person"></i> <span className="ms-1 d-none d-sm-inline">Tapados</span></Link>
              </li>
              <li onClick={handleLogout}>
                <a href="#" className="nav-link px-0 align-middle text-white">
                  <i className="fs-4 bi-power"></i> <span className="ms-1 d-none d-sm-inline">Logout</span></a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col p-0 m-0">
          <div className='p-2 d-flex justify-content-center shadow'>
            <h4>Trazabilidad Ruta de Calidad</h4>						
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
