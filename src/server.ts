import express from 'express';

const app = express();

app.get('/', (requuest, response) => {
    return response.json({message: "Hello peoples"});
});

app.listen(3333, () =>{
    console.log('🚀 Server started on port 3333!');
});