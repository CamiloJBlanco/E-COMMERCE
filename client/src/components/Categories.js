import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import '../index.css';

function Categories() {

    const [infoCat, setInfoCat] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/category')
            .then(res => {
                setInfoCat(res.data)
            })
            .catch()
    }, [])



    return (
        
        <div>
            <ul className="categories">
                {
                    infoCat.map(cat => (
                        <li key={cat.id}>
                            <Link to={'/category/' + cat.name}>{cat.name}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
        
    )
}

export default Categories;
