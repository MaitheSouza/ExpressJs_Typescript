import * as dotenv from 'dotenv';

dotenv.config({
    path: `${__dirname.replace(`src\\config`, '')}.env`
})

export default {
    ENV: process.env.ENV || '',
    KEY_AUTH: process.env.KEY_AUTH || ''
}