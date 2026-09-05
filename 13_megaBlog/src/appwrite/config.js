import { Client, TablesDB, Storage, ID, Query } from "appwrite";
import conf from "../conf/conf.js";  
const client = new Client()
  .setEndpoint(conf.appwriteUrl)//to be connection of a server url or server ka adddres hai ek 

  //ex ->https://cloud.appwrite.io/v1
  .setProject(conf.appwriteProjectId);

const tablesDB = new TablesDB(client);
const storage = new Storage(client);//means uploed or delete file 

// ---------- CREATE POST ----------
async function createPost({ title, content, featuredImage, status, userId }) {
  try {
    return await tablesDB.createRow(
      conf.appwriteDatabaseId,   // database ID
      conf.appwriteTableId,      // table ID
      ID.unique(),               // row ID (auto generate)
      { title, content, featuredImage, status, userId }
    );
  } catch (error) {
    console.log("Appwrite service :: createPost :: error", error);
  }
}

// ---------- UPDATE POST ----------
async function updatePost(rowId, { title, content, featuredImage, status }) {
  try {
    return await tablesDB.updateRow(
      conf.appwriteDatabaseId,
      conf.appwriteTableId,
      rowId,
      { title, content, featuredImage, status }
    );
  } catch (error) {
    console.log("Appwrite service :: updatePost :: error", error);
  }
}

// ---------- DELETE POST ----------
async function deletePost(rowId) {
  try {
    await tablesDB.deleteRow(
      conf.appwriteDatabaseId,
      conf.appwriteTableId,
      rowId
    );
    return true;
  } catch (error) {
    console.log("Appwrite service :: deletePost :: error", error);
    return false;
  }
}

// ---------- GET SINGLE POST ----------
async function getPost(rowId) {
  try {
    return await tablesDB.getRow(
      conf.appwriteDatabaseId,
      conf.appwriteTableId,
      rowId
    );
  } catch (error) {
    console.log("Appwrite service :: getPost :: error", error);
    return false;
  }
}

// ---------- GET ALL POSTS (published only) ----------
async function getPosts(queries = [Query.equal("status", "published")]) {
  try {
    return await tablesDB.listRows(
      conf.appwriteDatabaseId,
      conf.appwriteTableId,
      queries
    );
  } catch (error) {
    console.log("Appwrite service :: getPosts :: error", error);
    return false;
  }
}

// ---------- UPLOAD FILE ----------
async function uploadFile(file) {
  try {
    return await storage.createFile(
      conf.appwriteBucketId,   // bucket ID
      ID.unique(),             // auto-generated file ID
      file                     // actual file (input se aaya hua)
    );
  } catch (error) {
    console.log("Appwrite service :: uploadFile :: error", error);
    return false;
  }
}

// ---------- DELETE FILE ----------
async function deleteFile(fileId) {
  try {
    await storage.deleteFile(conf.appwriteBucketId, fileId);
    return true;
  } catch (error) {
    console.log("Appwrite service :: deleteFile :: error", error);
    return false;
  }
}

// ---------- GET FILE PREVIEW (image dikhane ke liye) ----------
function getFilePreview(fileId) {
  return storage.getFileView(conf.appwriteBucketId, fileId);
}




export { client, tablesDB, storage, createPost, updatePost, deletePost, getPost, getPosts,uploadFile, deleteFile, getFilePreview};