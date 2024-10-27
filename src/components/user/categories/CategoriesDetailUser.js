import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Card, CardMedia, CardContent, Grid } from '@mui/material';
import axios from 'axios';

export const CategoriesDetailUser = () => {

    const {categoryId} = useParams();
    const [category, setCategory] = useState(null);

    useEffect(() => {
        const fetchCategoriesDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/categories/${categoryId}`);
                setCategory(response.data);
            } catch (error) {
                console.error('Error', error);
            }
        }
        fetchCategoriesDetail();
    }, [categoryId]);

    if (!category){
        return (
            <>
                <Typography>Loading...</Typography>
            </>
        )
    }

    return (
        <>
            <Box sx={{ p: 4 }}>
            <Typography variant="h3" align="center" fontWeight="bold" gutterBottom>
                {category.categoryName}
            </Typography>
            <Typography variant="h5" gutterBottom>
                Movies in this Category:
            </Typography>
            </Box>
        </>
    )
}