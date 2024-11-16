import { v2 as cloudinary } from 'cloudinary';

(async function() {
    cloudinary.config({ 
        cloud_name: 'dqi53fnvz', 
        api_key: '669625648372425', 
        api_secret: process.env.CLOUDINARY_API_SECRET
    }); 
})();