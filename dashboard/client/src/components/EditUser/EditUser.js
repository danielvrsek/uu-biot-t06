import React, { useEffect, useContext, useState } from 'react';
import { UserTokenContext } from '../context/UserTokenContext';
import axios from 'axios';
import { getBasePath } from '../utils/pathHelper';
import { Navigate, useParams } from 'react-router-dom';

const EditUser = () => {
  const { userToken } = useContext(UserTokenContext);
  const { id } = useParams();
  const [userEdit, setUserEdit] = useState({
    name: '',
    surname: '',
    role: '',
    email: '',
  });

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (userToken === null) {
      console.log('Uživatel nemá token');
    } else {
      axios
        .get(`${getBasePath()}/users/user/${id}`, {
          headers: {
            Authorization: `Bearer ${userToken.access_token}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          setUserEdit(res.data);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value, email, surname, role } = e.target;
    setUserEdit((prevState) => ({
      ...prevState,
      [name]: value,
      [surname]: value,
      [email]: value,
      [role]: value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();

    axios.put(
      `${getBasePath()}/users/${id}`,
      {
        email: userEdit.email,
        name: userEdit.name,
        role: userEdit.role,
        surname: userEdit.surname,
      },
      {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userToken.access_token}`,
        },
      }
    );
    setRedirect(true);
  };
  if (redirect) {
    return <Navigate to={'/'} />;
  }
  return (
    <div className="ui middle aligned container" style={{ width: '600px' }}>
      {userEdit === undefined ? (
        <div> Nenašeli jsme uživatele, kterého hledáte.</div>
      ) : (
        <form className="ui form" style={{ marginTop: '50px' }}>
          <h4 className="ui dividing header">Editovat uživatele</h4>
          <div className="field">
            <label>Jméno</label>
            <div className="two fields">
              <div className="field">
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={userEdit.name}
                />
              </div>
              <div className="field">
                <input
                  type="text"
                  name="surname"
                  value={userEdit.surname}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="field">
            <label>Přihlašovací údaje</label>
            <div className="fields">
              <div className="twelve wide field">
                <input
                  type="text"
                  name="email"
                  value={userEdit.email}
                  onChange={handleChange}
                />
              </div>
              <div className="four wide field">
                <select onChange={handleChange}>
                  <option value="role">{userEdit.role}</option>
                  <option value="role">User</option>
                  <option value="role">Admin</option>
                </select>
              </div>
            </div>
          </div>
          {/*  <div className="field">
          <label>Heslo</label>
          <div className="fields">
            <div className="field">
              <input
                type="password"
                name="shipping[first-name]"
                placeholder="Heslo"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="field">
              <input
                type="password"
                name="password2"
                placeholder="Ověření hesla"
                onChange={(e) => setVerifyPassword(e.target.value)}
              />
            </div>
          </div>
          {matchPassword()}
        </div> */}

          <div className="ui button" onClick={submit}>
            Potvrdit
          </div>
        </form>
      )}
    </div>
  );
};

export default EditUser;
