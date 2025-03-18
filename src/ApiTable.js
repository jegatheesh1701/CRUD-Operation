import { MDBDataTable } from "mdbreact";
import React, { useEffect, useState} from "react";
import Axios from "axios";
import "./ApiTable.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ApiTable() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const Navigate=useNavigate();

    useEffect(() => {
        Axios.get("https://dummyjson.com/products")
            .then((response) => {
                console.log(response.data.products);
                setData(response.data.products);
                setLoading(false);
            });

    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }
    const Table = {
        columns: [
            { label: "ID", field: "id" },
            { label: "Title", field: "title" },
            { label: "Description", field: "description" },
             { label: "Category", field: "category" },
             {label:"Image", field:"images"},
             {label:"Action", field:"action"}
             ],
        rows: data.map((value) => ({
            id: value.id,
            title: value.title,
            description: value.description,
             category:value.category,
            images: <img src={value.images} alt={value.title} width="100"/>,
            action:(
                <div className="icons" style={{ display: 'flex', justifyContent:"space-around"}} >
              <FaEdit style={{color:'green'}}/>
              <FaTrash  style={{color:'red'}} />
                </div>
            )
        }
        ))
        
    }
    return (
        <div>
            <h1 className="text-purple-950"> Table </h1>
            <MDBDataTable bordered striped hover data={Table} className="BasicTable" />
            <button onClick={()=>Navigate('/next')}>Go Back</button>
        </div>
    )

}
export default ApiTable;