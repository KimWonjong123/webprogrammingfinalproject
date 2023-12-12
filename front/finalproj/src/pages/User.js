import React from 'react';

function User(props) {
    return (
        <tr className='User'>
            <td>Email: {props.email}</td>
            <td>NameL { props.name }</td>
        </tr>
    );
}

function UserList() {
    const users = [
        {
            email: 'asdf@asdf.com',
            name: 'asdf'
        },
        {
            email: 'qwer@qwer.com',
            name: 'qwer'
        },
        {
            email: 'zxcv@zxcv.com',
            name: 'zxcv'
        }
    ]

    return (
        <div className='UserList'>
            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => <User email={user.email} name={user.name} />) }
                </tbody>
            </table>
        </div>
    );
}

export default UserList;