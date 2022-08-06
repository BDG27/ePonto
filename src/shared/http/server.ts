import { AppDataSource } from '../typeorm/data-source';
import { app } from './app';

AppDataSource.initialize().then(() => {

    console.log('Database has connected with successfully...');
    
    app.listen(process.env.HTTP_PORT || 80, () => {
        console.log('Http Server in port '+process.env.HTTP_PORT+' has initialize with successfully...');
    });
}).catch(error => {
    console.log(error);
});

