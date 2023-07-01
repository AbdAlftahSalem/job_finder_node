const express = require('express');
const multer = require('multer');
const {initializeApp} = require("firebase/app");
const {getStorage, getDownloadURL, ref, uploadBytesResumable} = require("firebase/storage");
const {json, urlencoded} = require("body-parser");

const firebaseConfig = {
    "type": "service_account",
    "project_id": "job-finder-9979c",
    "private_key_id": "a78036d51fa7b45b35d5447cf4e55e1a43732828",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCfw4rO7sGUEdwP\nayGaV6+X4NwSNqEv1NC/wZumNkpV/ZmBY+PqDaAoEWuSu7YM1KpQBo+Bn0G8WIcn\nFhOqies+KR5acEuVmJDnsNs+3r/7Oa7MuZzWoXS3TnMstoACv8cAzeLuZGmp0unp\nFU+VlTaywl+GADAULqJQXCBU8n4Beh6DjcHtWqfCPxY8NWN7/nUQQP1QgAJ6AcaM\nQTajzG3YKxw8TnCqwxfErmG0ybYn2f3/mYvPDSZRthvTbG4c0fTIpS+bROlT1mUQ\nFkoPOKM+HbqNfgrDnSedifzXwskUpR0D6cEEfQdMDChc9V9WujXIxXH5roJrL3jW\nAWPSBdU1AgMBAAECggEAHLrMBybZwkAM7+vevNPYZIo/4PmYdlLBoD4XeKYKK5kB\nZgp5xZDiNFpfmyEs3XVP1Di9zTw/lLhhw4Zdjn0jQ8geqHpJqVLoefWsk4t4gBux\nIqkdOl6J793Iaem+rt/gUDV2AdMmSi7+t9bIezh8P9yi02TMwJBbSXKrsMLzpF2S\nBGGkxnwOcIBjSO9fdSdnELP8ipRoaQYC4IYC91MbRAE/cN8ijMqUsvXusy7xHctg\nKuFdMx/w6gk+rbrerOU4AsxHhIWBs4g1yBMmVPZ+QsXYTBz0U9i1pWX5VI9Jlfov\nooVJlqdPMVheD+LQl2ZspfPqqwFcZz3Ge0a1c+/R6QKBgQDP1GrWrAbCraI9nEZj\n2H/LvVQEJF8LG5QLIQUAPr0bZ10Py+32Dw07z4Zkw74zjQyol/LiBVX3uQxA7FHc\n5DSBOsveMv98aLTyHMuIGI4xcCFvzbNrBXxfyH6Qk4I2HLBxvOx7LOFe93CWvv44\nXAjdOGnNV91uT7jaDeIvUG29+QKBgQDEyyH1tMX26b94aobF49Pk4Mv7qd45twjf\njue/FwFlbyX1f3StPnXLrRGUCEdwtiDtJ7YgquqBRsX1cpoSiwwSs1GPH8BlCbee\nI3Tu3xiBYmpgvmKMpz+cG9hYDE3zpG8U0gHAKRQw8rXgUks6X1YQNz3lxHUVBzsW\nCOX9WGXQHQKBgH+gnLOUFNq8smNPctKiA2jkrZGVnGA/4VwsPNv3qz4G7dljjJCM\nkb3nJUsAAe+6cMmf9mHikPZ9xw6fkW4rHis2Jjgf7VFDI8uC72J2YevuRjpYghP4\n3HYds8upKk98ssZGFJtX5lbhcVzBkXCe5DqmCCM4EB1MC+Ksn/gaVipRAoGAFM5p\nQ8IeIBHspX2VzDxfPdaqmmwGS9HXRVOlmuWCx0euGrukCWEOMT+WGTGa5AbNimVl\ncyS+8HYcHexE7+r1ltCQsfIodEZHvJeBGHRL8foGxz25y6cvKYEkKYL7huP+vpPJ\njZiKQvaWViY9P+mufr5oc++GdXezPowoTNXYxd0CgYBEsBDX8oLTsJ4vNZqOs9g8\nYmKQhTfhikIUFjOjR8eC6spYhIfTOv5cXgpbXCVJV6eBoqDOCTQUL2cdRke0UH3m\n3A4FJ49byUXFb5iKc9hES1rYfXlUzqYsYQyl7gAJJ+xNEz8Q+Ko1WC+wJZ+SdDsb\n4eqFpfzm23TKb5RYhMXWtQ==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-ar4bx@job-finder-9979c.iam.gserviceaccount.com",
    "client_id": "105993835284864220880",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ar4bx%40job-finder-9979c.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com",
    storageBucket: "gs://job-finder-9979c.appspot.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

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
