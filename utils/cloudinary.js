const cloudinary = require("cloudinary").v2
cloudinary.config({ 
      cloud_name: 'dw59btoxh', 
      api_key: '857813376818675', 
      api_secret: 'kOUTyK1FLFg1KbzCkrduR7rKeho' 
    });
module.exports = cloudinary ;