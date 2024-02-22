import { useEffect, useState } from "react";
import axios from "axios";

function Todos() {
    const [todoList, setTodoList] = useState([]);

    let loadData = async () => {
        let result = await axios.get("https://jsonplaceholder.typicode.com/todos");
        setTodoList(result.data);
    }

    useEffect(() => {
        loadData();
    }, []);

    return ( 
        <div class="container mt-3">     
        <table class="table table-hover">
            <colgroup>
                <col width="8%"/>
                <col width="8%"/>
                <col width="*"/>
                <col width="15%"/>
            </colgroup>
            <thead>
                <tr>
                    <th>id</th>
                    <th>user id</th>
                    <th>title</th>
                    <th>completed</th>
                </tr>
            </thead>
            <tbody>
                {
                    todoList.map((t, key) => {
                        return (
                            <tr key={key}>
                                <td>{t.id}</td>
                                <td>{t.userId}</td>
                                <td>{t.title}</td>
                                <td>{t.completed?"true":"false"}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        </div>
     );
}

export default Todos;