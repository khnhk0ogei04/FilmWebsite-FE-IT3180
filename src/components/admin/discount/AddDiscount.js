import { Editor } from '@tinymce/tinymce-react';
import React, {useState, useEffect} from "react";
import {Button, Grid, TextField, MenuItem, Box, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export const AddDiscount = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [discountPercent, setDiscountPercent] = useState("");
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        axios.get("http://localhost:8080/api/movies/all", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setMovies(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        })
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newDiscount = {
            movieId: selectedMovie,
            notificationTitle: title,
            notificationContent: content,
            discountPercentage: discountPercent
        }

        axios.post("http://localhost:8080/api/discounts", newDiscount, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(() => {
                console.log("OKE");
            })
            .catch(error => {
                console.error("Error", error);
            })
    }
    return (
        <>
            <Box sx={{p: 4}}>
                <Typography variant="h2" gutterBottom>
                    Add New Discount
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                select
                                label="Select Movie"
                                value={selectedMovie}
                                onChange = {(event) => setSelectedMovie(event.target.value)}
                                fullWidth
                                required
                            >
                                {movies.map(movie => (
                                    <MenuItem key={movie.id} value={movie.id}>
                                        {movie.movieName}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                label="Title"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                                fullWidth
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Editor
                                apiKey='l8z8oxeyzmq0exphylqkg7cj3j2h6t1i1v5x13z34xos6eby'
                                value={content}
                                init={{
                                    height: 350,
                                    menubar: false,
                                    plugins: [
                                        'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'image', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                                        // Your account includes a free trial of TinyMCE premium features
                                        // Try the most popular premium features until Oct 28, 2024:
                                        'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'mentions', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown',
                                        'textcolor'
                                    ],
                                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                }}
                                onEditorChange={(newContent) => setContent(newContent)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Discount Percentage"
                                type="number"
                                value={discountPercent}
                                InputProps={{ inputProps: { min: 1, max: 100 } }}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value >= 1 && value <= 100) {
                                        setDiscountPercent(value); 
                                    }
                                }}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Add Discount
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </>
    )
}