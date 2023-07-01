const express = require('express');
const multer = require('multer');
const {initializeApp} = require("firebase/app");
const {getStorage, getDownloadURL, ref, uploadBytesResumable} = require("firebase/storage");
const {json, urlencoded} = require("body-parser");
const {FirebaseConfig} = require("../config/firebase_config");


// Initialize Firebase
const app = initializeApp(FirebaseConfig);

// Create an Express app
const appExpress = express();

// Configure multer for handling file uploads
const storage = getStorage();
const upload = multer({storage: multer.memoryStorage()});


// Define the PDF upload middleware
const uploadPdf = async (req, res, next) => {
    upload.single('pdf')(req, res, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({error: err.message});
        }

        const file = req.file;
        if (!file) {
            return res.status(400).json({error: 'No PDF file provided'});
        }

        console.log(req.file)

        // Create a bucket reference
        const storageRef = ref(storage, `files/${req.file.originalname}`);

        // Create file metadata including the content type
        const metadata = {
            contentType: req.file.mimetype,
        };

        // Upload the file to the bucket storage
        const uploadTask = uploadBytesResumable(storageRef, req.file.buffer, metadata);

        uploadTask.on('state_changed',
            (snapshot) => {
                // Track upload progress if needed
                console.log(snapshot)
            },
            (error) => {
                console.error(error);
                res.status(500).json({error: 'Something went wrong'});
            },
            async () => {
                // File upload completed successfully
                const downloadURL = await getDownloadURL(storageRef);

                console.log('File successfully uploaded.');
                return res.status(200).json({downloadURL: downloadURL});
            }
        );
    });
};

// Define a POST route for PDF upload
appExpress.post('/upload', uploadPdf);

appExpress.set('view engine', 'ejs');

appExpress.use(json());
appExpress.use(urlencoded({
    extended: false
}));

// Start the server
const port = 3000;
appExpress.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
