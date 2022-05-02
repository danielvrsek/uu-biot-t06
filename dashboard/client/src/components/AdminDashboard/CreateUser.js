import React from 'react';

const CreateUser = () => {
  return (
    <div>
      <form className="ui form" style={{ marginTop: '50px' }}>
        <h4 className="ui dividing header">Vytvořit nový profil</h4>
        <div className="field">
          <label>Jméno</label>
          <div className="two fields">
            <div className="field">
              <input
                type="text"
                name="shipping[first-name]"
                placeholder="Jméno"
              />
            </div>
            <div className="field">
              <input
                type="text"
                name="shipping[last-name]"
                placeholder="Příjmení"
              />
            </div>
          </div>
        </div>
        <div className="field">
          <label>Přihlašovací údaje</label>
          <div className="fields">
            <div className="twelve wide field">
              <input type="text" name="shipping[address]" placeholder="Email" />
            </div>
            <div className="four wide field">
              <select>
                <option value="">Role</option>
                <option value="1">User</option>
                <option value="0">Admin</option>
              </select>
            </div>
          </div>
        </div>
        <div className="field">
          <label>Heslo</label>
          <div className="fields">
            <div className="field">
              <input
                type="password"
                name="shipping[first-name]"
                placeholder="Heslo"
              />
            </div>
            <div className="field">
              <input
                type="password"
                name="password2"
                placeholder="Ověření hesla"
              />
            </div>
          </div>
        </div>

        <div className="ui button" tabindex="0">
          Vytvořit uživatele
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
