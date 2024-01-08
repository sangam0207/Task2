import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Data() {
  const [data, setData] = useState([]);
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/fetchData");
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleFilterByName = async (e) => {
    setFilterName(e.target.value);
    try {
     const timerId= setTimeout(async()=>{
        const response = await axios.get("http://localhost:3000/getDataByQuery", {
            params: {
              search: e.target.value,
            },
          });
          setData(response.data);
      },1000)
     return ()=>clearTimeout(timerId);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Link
        to="/"
        style={{
          width: '100px',
          backgroundColor: '#3498db',
          border: '1px solid black',
          margin: '40px',
          color: 'white',
          fontWeight: 500,
          textDecoration: 'none',
          padding: '15px',
        }}
      >
        Home page
      </Link>
      <Link
        to="/filter"
        style={{
          width: '100px',
          backgroundColor: '#3498db',
          border: '1px solid black',
          margin: '40px',
          color: 'white',
          fontWeight: 500,
          textDecoration: 'none',
          padding: '15px',
        }}
      >
        Filter
      </Link>

      <form style={{marginBlock:'30px'}}>
        <label>
          Filter by Name:
          <input
            type="text"
            value={filterName}
            name="search"
            onChange={handleFilterByName}
            style={{backgroundColor:'lightBlue',fontSize:'2rem',width:'200px',height:'40px'}}
          />
        </label>
      </form>

      {data.length === 0 ? (
        <p>No data found</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead style={{ backgroundColor: "#f2f2f2" }}>
            <tr>
              <th style={{ padding: "12px", textAlign: "center", border: "2px solid black" }}>id</th>
              <th style={{ padding: "12px", textAlign: "center", border: "2px solid black" }}>Name</th>
              <th style={{ padding: "12px", textAlign: "center", border: "2px solid black" }}>UserName</th>
              <th style={{ padding: "12px", textAlign: "center", border: "2px solid black" }}>Email</th>
              <th style={{ padding: "12px", textAlign: "center", border: "2px solid black" }}>address</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} >
                <td style={{ padding: "12px", textAlign: "center", border: "2px solid black" }}>{item.id}</td>
                <td style={{ padding: "12px", textAlign: "center", border: "2px solid black" }}>{item.name}</td>
                <td style={{ padding: "12px", textAlign: "center", border: "2px solid black" }}>{item.username}</td>
                <td style={{ padding: "12px", textAlign: "center", border: "2px solid black" }}>{item.email}</td>
                <td style={{ padding: "12px", textAlign: "center", border: "2px solid black" }}>{item.address.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default Data;

