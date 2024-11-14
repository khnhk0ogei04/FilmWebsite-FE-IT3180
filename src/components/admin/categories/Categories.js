import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export const CategoriesList = () => {
    const [categories, setCategories] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            const token = localStorage.getItem('token');  // Get the token from localStorage
            const role = localStorage.getItem('role');    // Get the role from localStorage

            if (!token) {
                setErrorMessage('Missing token. Please log in.');
                navigate('/login');  // Redirect to login if token is missing
                return;
            }

            try {
                const response = await axios.get('http://localhost:8080/api/categories', {
                    headers: {
                        'Authorization': `Bearer ${token}` // Add the token to the Authorization header
                    }
                });
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);

                // Handle different error cases
                if (error.response && error.response.status === 403) {
                    setErrorMessage('You are not authorized to view this resource.');
                } else {
                    setErrorMessage('Error fetching categories.');
                }
            }
        };

        fetchCategories();
    }, [navigate]);

    const handleAddNewCategory = () => {
        const role = localStorage.getItem('role');
        if (role && role.includes('ADMIN')) {
            navigate(`/admin/categories/add`);  // Allow only if the user is an admin
        } else {
            setErrorMessage('You do not have permission to add a category.');
        }
    }

    const handleCategoryClick = (categoryId) => {
        navigate(`/admin/categories/${categoryId}`); 
    };

    return (
        <div className="container my-3">
            <h1>Categories</h1>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <Button variant="contained" color="success" onClick={handleAddNewCategory}>
                Add new category
            </Button>
            <div className="row">
                {categories.map((category) => (
                    <div className="col-md-4 mb-3" key={category.id}>
                        <div className="card" onClick={() => handleCategoryClick(category.id)} style={{ cursor: 'pointer' }}>
                            <img src={category.image} alt={category.categoryName} className="card-img-top" style={{ height: '300px', objectFit: 'cover' }} />
                            <div className="card-body">
                                <h5 className="card-title">{category.categoryName}</h5>
                                <p className="card-text">Description...</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
