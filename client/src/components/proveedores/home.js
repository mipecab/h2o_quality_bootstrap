import React, { useEffect, useState } from 'react';

function Home() {
  const [adminCount, setAdminCount] = useState();
  const [employeeCount, setEmployeeCount] = useState();
  const [salary, setSalary] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminCountResponse = await fetch('http://localhost:5050/adminCount');
        const adminCountData = await adminCountResponse.json();
        setAdminCount(adminCountData[0].admin);

        const employeeCountResponse = await fetch('http://localhost:5050/employeeCount');
        const employeeCountData = await employeeCountResponse.json();
        setEmployeeCount(employeeCountData[0].employee);

        const salaryResponse = await fetch('http://localhost:5050/salary');
        const salaryData = await salaryResponse.json();
        setSalary(salaryData[0].sumOfSalary);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Lotes</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: 10</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Productos</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: 50</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Proveedores</h4>
          </div>
          <hr />
          <div className=''>
            <h5>Total: 20000</h5>
          </div>
        </div>
      </div>

      {/* List of admin  */}
   
    </div>
  );
}

export default Home;
