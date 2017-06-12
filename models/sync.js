import db from '../models'

db.Masters
    .sync()
    .then(() => {
        console.log('Database are syncing with all models')
    })
    .catch(error => {
        console.log('Error during sync database')
        console.log(error)
    })