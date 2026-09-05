import { Account, ID } from "appwrite";
import { client } from "./config.js";

const account = new Account(client);

// Signup / Create Account
async function createAccount(email, password, name) {
  try {
    const response = await account.create(ID.unique(), email, password, name);
    return response;
  } catch (error) {
    console.log("Appwrite service :: createAccount :: error", error);
    throw error;
  }
}

// Login
async function login(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log("Appwrite service :: login :: error", error);
    throw error;
  }
}

// Current logged-in user check
async function getCurrentUser() {
  try {
    return await account.get();
  } catch (error) {
    console.log("Appwrite service :: getCurrentUser :: error", error);
  }
  return null;
}

// Logout
async function logout() {
  try {
    await account.deleteSession("current");
  } catch (error) {
    console.log("Appwrite service :: logout :: error", error);
  }
}


export { createAccount, login, getCurrentUser, logout };