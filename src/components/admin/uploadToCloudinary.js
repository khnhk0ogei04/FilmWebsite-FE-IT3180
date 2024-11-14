import axios from 'axios';

export const uploadImageToCloudinary = async (selectedImage) => {
    const formData = new FormData();
    formData.append('file', selectedImage);
    formData.append('upload_preset', 'xje1v1g0'); 

    try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/davwqqao1/image/upload', formData);
        return response.data.url; 
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        throw error;
    }
};
