import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState,useEffect} from 'react';
import axios from 'axios';

export default function Index(){

    const [studetails,setStudetails] = useState([]);

    useEffect(()=>{

        fetch('http://localhost:3002/Studetails')
        .then(response=>response.json())
        .then(json=>setStudetails(json))

    },[])

    const data_del = (id) =>{
        var datastring = {id:id};
        var config = {headers:{"enctype":"multipart/form-data"}};
        axios.post('http://localhost:3002/Delete',datastring,config)
        .then(function(res){
            if(res.data.status === 'error'){
                alert('error');
                window.location.reload();
            }
            else if(res.data.status === 'Success'){
                alert('deleted')
                window.location.reload();
            }
        })
        .catch(function(error){
            alert(error);
            window.location.reload();
        })
    }

    return(
        <>
        <div className="container">
            <div className="row mt-2">
                <div className="col-lg-12">
                    <p className="text-center">Student Management System</p>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-lg-3">
                    <input type="search" id="search" name="search" className="form-control" placeholder='Search'/>
                </div>
                <div className="col-lg-8">&nbsp;</div>
                <div className="col-lg-1">
                    <Link to="/Add">
                    <button type="button" name="data_add" id="data_add" value="add" className="btn btn-danger">Add</button>
                    </Link>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-lg-12">
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>DOB</th>
                                    <th>Education</th>
                                    <th>Location</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    studetails.map((value,index)=>(
                                        <tr>
                                            <td>{value.id}</td>
                                            <td>{value.firstname}</td>
                                            <td>{value.lastname}</td>
                                            <td>{value.email}</td>
                                            <td>{value.dob}</td>
                                            <td>{value.education}</td>
                                            <td>{value.location}</td>
                                            <td>
                                                <button type="button" name="data_del" id="data_del" className="btn btn-danger"
                                                onClick={()=>{data_del(value.id)}}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}