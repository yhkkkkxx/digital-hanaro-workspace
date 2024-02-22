import { useEffect, useState } from "react";
import axios from "axios";

function Posts() {
    const [postList, setPostList] = useState([]);
    const [loading, setLoading] = useState(false);
    

    let loadData = async () => {
        let result = await axios.get("https://jsonplaceholder.typicode.com/posts");
        setPostList(result.data);
    }
    useEffect(() => {
        loadData();
    }, [])

    return ( 
        <div class="container mt-3">     
        <table class="table table-hover">
            <colgroup>
                <col width="8%"/>
                <col width="8%"/>
                <col width="20%"/>
                <col width="*"/>
            </colgroup>
            <thead>
                <tr>
                    <th>id</th>
                    <th>user id</th>
                    <th>title</th>
                    <th>body</th>
                </tr>
            </thead>
            <tbody>
                {
                    postList.map((p, key) => {
                        return (
                            <tr key={key}>
                                <td>{p.id}</td>
                                <td>{p.userId}</td>
                                <td>{p.title}</td>
                                <td>{p.body}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        </div>
     );
}

export default Posts;