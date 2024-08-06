import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to database');

  // Open the database
  const db = await openDB('jate', 1);

  // Add the content to the database
  const tx = db.transaction('jate', 'readwrite');

  // Access the object store
  const store = tx.objectStore('jate');

  // Add the content to the object store
  const request = store.put({id: 1, content: content});

  // Wait for the transaction to complete
  const result = await tx.done;
  console.log('PUT complete');

};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from database');

  // Open the database
  const db = await openDB('jate', 1);

  // Get the content from the database
  const tx = db.transaction('jate', 'readonly');

  // Access the object store
  const store = tx.objectStore('jate');

  // Get the content from the object store
  const request = store.get(1);

  // Wait for the transaction to complete
  const result = await tx.done;
  console.log('GET complete');
  return result.content;
};

initdb();
