const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

const jsonFile = (data) =>
  fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (error) {
    throw new Error("File reading error: " + error.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await listContacts();
    return data.find(({ id }) => id === contactId) || null;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function removeContact(contactId) {
  let data;

  try {
    data = await listContacts();
  } catch (error) {
    throw new Error(error.message);
  }

  try {
    const result = data.find(({ id }) => id === contactId) || null;
    if (result) jsonFile(data.filter(({ id }) => id !== result.id));
    return result;
  } catch (error) {
    throw new Error("File writing error " + error);
  }
}

async function addContact(name, email, phone) {
  let data;

  try {
    data = await listContacts();
  } catch (error) {
    throw new Error(error);
  }
  const newData = [...data, { name, email, phone, id: nanoid() }];

  try {
    jsonFile(newData);
    return newData;
  } catch (error) {
    throw new Error("File writing error " + error.mesage);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
