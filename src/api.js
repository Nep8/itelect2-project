/* fetch sample users, use fetch id name email array if successful error []
sampleusers promise use then catch 
both return promise to id name email array */

export async function fetchSampleUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    return users.map(({ id, name, email }) => ({ id, name, email }));
  } catch (error) {
    console.error(error);
    return [];
  } finally {
    console.log("Fetched sample users");
  }
};

export async function fetchSampleUsersPromise() {
  return fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((users) => users.map(({ id, name, email }) => ({ id, name, email })))
    .catch((error) => { console.error(error); return []; });
};