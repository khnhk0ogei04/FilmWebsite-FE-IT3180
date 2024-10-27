import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Select, MenuItem, InputLabel, FormControl, Box } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import { uploadImageToCloudinary } from '../uploadToCloudinary';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const AddNewMovie = () => {

    const navigate = useNavigate();
    const [movie, setMovie] = useState({
        movieName: '',
        description: '',
        directors: '',
        cast: '',
        runningTime: '',
        image: '',
        status: 1, 
        categoryId: '', 
    });

    const [categories, setCategories] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null); 
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovie({ ...movie, [name]: value });
    };

    const handleEditorChange = (content) => {
        setMovie({
            ...movie,
            description: content
        })
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]; 
        setSelectedImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            let imageUrl = movie.image;
            if (selectedImage) {
                imageUrl = await uploadImageToCloudinary(selectedImage);
            }
            const newMovie = { ...movie, image: imageUrl };
            const response = await axios.post('http://localhost:8080/api/movies', newMovie, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Movie added:', response.data);
            Swal.fire({
                icon: 'success',
                title: 'Successfully',
                text: 'Add new film successfully',
                timer: 1500,
            });
            navigate('/admin/')
        } catch (error) {
            console.error('An error in adding the movie:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error in adding new film',
                timer: 1500,
            });
        }
    };

    return (
        <Container>
            <h1>Add New Movie</h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Movie Name"
                    name="movieName"
                    value={movie.movieName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Editor
                    apiKey='l8z8oxeyzmq0exphylqkg7cj3j2h6t1i1v5x13z34xos6eby'
                    value={movie.description}
                    init={{
                        height: 350,
                        menubar: false,
                        plugins: [
                            'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                            'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'mentions', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown',
                          ],
                          toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                    }}
                    onEditorChange={handleEditorChange}
                />
                <TextField
                    label="Directors"
                    name="directors"
                    value={movie.directors}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Cast"
                    name="cast"
                    value={movie.cast}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Running Time"
                    name="runningTime"
                    value={movie.runningTime}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

                <Button variant="contained" component="label">
                    Upload Image
                    <input type="file" hidden onChange={handleImageChange} />
                </Button>

                {imagePreview && (
                    <Box mt={2}>
                        <img src={imagePreview} alt="Preview" style={{ width: '200px', height: '200px', objectFit: 'cover', marginTop: '20px', marginBottom: '20px' }} />
                    </Box>
                )}

                <FormControl fullWidth margin="normal">
                    <InputLabel>Category</InputLabel>
                    <Select
                        name="categoryId"
                        value={movie.categoryId}
                        onChange={handleChange}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.categoryName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="Trailer URL"
                    name="trailerUrl"
                    value={movie.trailerUrl}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="VIP Price"
                    name="vipPrice"
                    type="number"
                    value={movie.vipPrice}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Regular Price"
                    name="regularPrice"
                    type="number"
                    value={movie.regularPrice}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Add Movie
                </Button>
            </form>
        </Container>
    );
};
