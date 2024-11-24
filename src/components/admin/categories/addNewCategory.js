import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import alertService from '../../../alert/alertService';
import { uploadImageToCloudinary } from '../uploadToCloudinary';

export const AddNewCategory = () => {
    const [category, setCategory] = useState({
        categoryName: '',
        image: ''
    });
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState('');


    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory({ ...category, [name]: value });
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (selectedImage) {
            try {
                const imageUrl = await uploadImageToCloudinary(selectedImage);
                setCategory({ ...category, image: imageUrl });
                const response = await axios.post('http://localhost:8080/api/categories', { 
                    ...category, 
                    image: imageUrl 
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log('Category added:', response.data);
                navigate('/admin/categories');
            } catch (error) {
                console.error('Error', error);
                alertService.alertErrorCreateCategory();
            }
        } else {
            alertService.alertErrorCreateCategory('');
        }
    };


    return (
        <Container>
            <h1>Add New Category</h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Category Name"
                    required
                    name="categoryName"
                    value={category.categoryName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Category Image"
                    type='file'
                    onChange={handleImageChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{shrink: true}}
                />

                {previewImage && (
                    <img 
                        src={previewImage}
                        alt='Selected Preview'
                        style={{width: '100%', height:'auto', marginBottom: '16px'}}
                    />
                )}
                <Button type="submit" variant="contained" color="primary">
                    Add Category
                </Button>
            </form>
        </Container>
    );
};
