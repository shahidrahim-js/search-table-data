import { ChangeEvent, useEffect, useState } from 'react';
import './App.css';

function App() {
  const [searchText, setSearchText] = useState('');
  const [users, setUsers] = useState([]);
  const apiUrl = 'https://dummyjson.com/users';

  const getUsers = () => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setUsers(data.users))
      .catch((err) => console.log('err:', err));
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const searchedUsers = users?.filter((user) => {
    return (user?.firstName?.toLowerCase()?.includes(searchText.toLowerCase())
    || user?.lastName?.toLowerCase()?.includes(searchText.toLowerCase()));
  }) || users;

  return (
    <>
      <div className="searchField">
        <input type="text" value={searchText} onChange={handleChange} />
      </div>
      {!users?.length ? (
        <div className="loading">Loading...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Email</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {searchedUsers?.map((user) => {
              return (
                <tr>
                  <td>{user.id}</td>
                  <td>{user.firstName + ' ' + user.lastName}</td>
                  <td>{user.gender}</td>
                  <td>{user.email}</td>
                  <td>{user.address.city}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}

export default App;
