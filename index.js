const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  } = require("./contacts");
  
  const argv = require("yargs").argv;

  async function invokeAction({ action, id, name, email, phone }) {
    try {
      switch (action) {
        case "list":
          return console.table(await listContacts());
  
        case "get":
          return console.log(await getContactById(id));
  
        case "add":
          return console.log(await addContact(name, email, phone));
  
        case "remove":
          return console.log(await removeContact(id));
  
        default:
          console.warn("\x1B[31m Unknown action type!");
      }
    } catch (error) {
      console.error(error.message);
    }
  }
  
  invokeAction(argv);