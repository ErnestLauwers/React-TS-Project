import React from 'react'
import { User } from '../../types'

type Props = {
    users: Array<User>
}

const UserOverviewTable: React.FC<Props> = ({ users = [] }: Props) =>{
    return (
        <>
            <div className='w-100 d-none d-md-block'/>
            <div className='col-6'>
                {users && (
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th scope='col'>Id</th>
                                <th scope='col'>First Name</th>
                                <th scope='col'>Last Name</th>
                                <th scope='col'>Username</th>
                                <th scope='col'>email</th>
                                <th scope='col'>Password</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && 
                            users.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.id}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.password}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    )
}

export default UserOverviewTable