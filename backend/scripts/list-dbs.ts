import { Client, Databases } from 'node-appwrite';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1')
    .setProject(process.env.APPWRITE_PROJECT_ID || '')
    .setKey(process.env.APPWRITE_API_KEY || '');

const databases = new Databases(client);

databases.list().then(r => {
    console.log('Your Appwrite databases:');
    r.databases.forEach(d => console.log(`  id="${d.$id}"  name="${d.name}"`));
}).catch(e => console.error('Error:', e.message));
