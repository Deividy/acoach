import React, { useState, useContext } from 'react';
import ajaxAdapter from '../../ajaxAdapter';

import { UserContext } from '../../context';

async function submitClient(account, client) {
    if (!client.name) { return { error: 'Por favor, preencha o nome!' }; }
    if (!client.email) { return { error: 'Por favor, preencha o e-mail!' }; }

    try {
        const res = await ajaxAdapter
            .post(`/account/${account.id}/clients/upsert`, client);

        console.log(res);
    } catch(ex) {
        global.error(ex);
        return { error: ex.message };
    }

    return { success: true };
}

export default function CoachClientAdd() {
    const { user } = useContext(UserContext);

    const [ email, setEmail ] = useState('');
    const [ name, setName ] = useState('');

    return <main className='view'>
        <h2>Adicionar novo cliente</h2>
        <form style={ { maxWidth: 700 } } onSubmit={ async(ev) => {
            await submitClient(user.account, { name, email });
        } } >
            <input
                onChange={ ({ nativeEvent }) => {
                    setName(nativeEvent.target.value);
                } }
                autoFocus={ true }
                placeholder='o nome de seu cliente'
                value={ name } />

            <input
                onChange={ ({ nativeEvent }) => {
                    setEmail(nativeEvent.target.value
                        .trim()
                        .toLowerCase()
                        .replace(/[^\w\d_\-@.]/g,'')
                    );
                } }
                placeholder='o e-mail de seu cliente'
                value={ email } />

            <button type='submit'>Salvar cliente</button>
        </form>
    </main>;
}
