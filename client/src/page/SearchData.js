
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './search.css';

const SearchForm = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [user, setUser] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'idInput') {
      if (value === '' || (Number(value) >= 1 && Number(value) <= 10)) {
        setId(value);
      }
    } else if (name === 'nameInput') {
      setName(value);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/fetchSearchData', {
        idInput: id,
        nameInput: name,
      });
  
      console.log(response.data);
  
      setUser(Array.isArray(response.data) ? response.data[0] : response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setId('');
    setName('');
  };

  return (
    <div className="search-form-container">
      <Link to="/allData" className="link-to-all-data">
        Whole User
      </Link>

      <h2>You can search user by id or name </h2>
      <label htmlFor="idInput" className="search-label">
        Enter ID (1 to 10):
      </label>
      <input
        type="number"
        id="idInput"
        name="idInput"
        value={id}
        onChange={handleInputChange}
        className="search-input"
        min="1"
        max="10"
        required
      />
      <h2>OR</h2>
      <label htmlFor="nameInput" className="search-label">
        Enter Name:
      </label>
      <input
        type="text"
        id="nameInput"
        name="nameInput"
        value={name}
        onChange={handleInputChange}
        className="search-input"
      />

      <button type="button" onClick={handleSearch} className="search-button">
        Search
      </button>

      {user && (
        <>
          <hr />
          <table className="user-table">
            <tbody>
              
              <tr>
                <th>ID</th>
                <td>{user.id}</td>
              </tr>
              <tr>
                <th>UserName</th>
                <td>{user.username}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{user.email}</td>
              </tr>
              <tr>
                <th>Address</th>
                <td>{user.address && user.address.street}, {user.address && user.address.city}</td>

              </tr>
              <tr>
                <th>Company</th>
                <td>{user.company.name} </td>
              </tr>
              <tr>
                <th>Phone</th>
                <td>{user.phone}</td>
              </tr>
              <tr>
                <th>Website</th>
                <td>{user.website}</td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default SearchForm;
