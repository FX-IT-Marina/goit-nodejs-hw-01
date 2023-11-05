const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (id) => {
  const contactId = String(id);
  try {
    const contacts = await listContacts();
    const contact = contacts.find(({ id }) => id === contactId);
    return contact || null;
  } catch (error) {
    console.error("Not find contact", error);
    return null;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const removedContact = contacts.filter((contact) => {
      if (contact.id === contactId) {
        return false;
      }
      return true;
    });

    if (removedContact.length === contacts.length) {
      return null;
    }

    await fs.writeFile(contactsPath, JSON.stringify(removedContact, null, 2));

    return removedContact[0];
  } catch (error) {
    console.error("Error while remove the contact", error);
    return null;
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();

    const newContact = {
      id: String(Date.now()),
      name,
      email,
      phone,
    };

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error("Error while adding a contact", error);
    return null;
  }
};

module.exports = { listContacts, getContactById, removeContact, addContact };
