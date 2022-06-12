import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiClient from '../../api/ApiClient';

const CreateUser = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');

    function matchPassword() {
        if (verifyPassword !== password) {
            return (
                <div style={{ color: 'red' }}>"Zadané hesla se neshodují"</div>
            );
        }
    }
    const submit = (e) => {
        e.preventDefault();
        ApiClient.registerUser({ name, surname, email, password }).then(
            () => {}
        );
    };

    return (
        <div>
            <form className="ui form" style={{ marginTop: '10px' }}>
                <h4 className="ui dividing header">Přidat nového uživatele</h4>
                <div className="field">
                    <label>Jméno</label>
                    <div className="two fields">
                        <div className="field">
                            <input
                                type="text"
                                name="shipping[first-name]"
                                placeholder="Jméno"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="field">
                            <input
                                type="text"
                                name="shipping[last-name]"
                                placeholder="Příjmení"
                                onChange={(e) => setSurname(e.target.value)}
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
                                name="shipping[address]"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
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
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="field">
                            <input
                                type="password"
                                name="password2"
                                placeholder="Ověření hesla"
                                onChange={(e) =>
                                    setVerifyPassword(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    {matchPassword()}
                </div>

                <div className="ui button" onClick={submit}>
                    Vytvořit uživatele
                </div>
            </form>
        </div>
    );
};

export default CreateUser;
