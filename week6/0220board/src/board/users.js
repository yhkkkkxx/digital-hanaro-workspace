import { useEffect, useState } from "react";
import axios from "axios";

function Users() {
    const [userList, setUserList] = useState([]);

    let loadData = async () => {
        let result = await axios.get("https://jsonplaceholder.typicode.com/users");
        setUserList(result.data);
    }

    useEffect(() => {
        loadData();
    }, []);

    return ( 
        <div class="container mt-3">     
        <table class="table table-hover">
            <colgroup>
                <col width="8%"/>
                <col width="20%"/>
                <col width="15%"/>
                <col width="20%"/>
                <col width="*"/>
            </colgroup>
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>username</th>
                    <th>email</th>
                    <th>address</th>
                </tr>
            </thead>
            <tbody>
                {
                    userList.map((u, key) => {
                        return (
                            <tr key={key}>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.username}</td>
                                <td>{u.email}</td>
                                <td>{u.address.street} {u.address.suite} {u.address.city} {u.address.zipcode}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        </div>
     );
}

export default Users;