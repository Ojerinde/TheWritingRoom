export function ValidateEmail(mail) {
  const reg = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
  if (mail.match(reg)) {
    return true;
  }
  return false;
}

export function ValidatePassword(password) {
  const reg = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
  if (reg.test(password)) {
    return true;
  }
  return false;
}

export function SetItemToLocalStorage(key, payload) {
  localStorage.setItem(key, JSON.stringify(payload));
}

export function GetItemFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function RemoveItemFromLocalStorage(key) {
  localStorage.removeItem(key);
}

export function AddUserToLocalStorage(key, newUser) {
  const signedInUsers = GetItemFromLocalStorage(key);
  const allUsers = [...signedInUsers, newUser];
  SetItemToLocalStorage(key, allUsers);
}
export function AddItemToLocalStorage(key, newItem) {
  const fetchedItem = GetItemFromLocalStorage(key);
  const item = { ...newItem, id: fetchedItem.length };
  const allItems = [item, ...fetchedItem];
  SetItemToLocalStorage(key, allItems);
}

export function UpdateLocalStorageItem(key, newItem) {
  const fetchedItem = GetItemFromLocalStorage(key);
  const allItems = [...fetchedItem];
  const itemToBeUpdated = allItems.findIndex((item) => item.id === newItem.id);
  allItems[itemToBeUpdated].title = newItem.title;
  allItems[itemToBeUpdated].body = newItem.body;
  allItems[itemToBeUpdated].id = newItem.id;
  allItems[itemToBeUpdated].userId = newItem.userId;
  SetItemToLocalStorage(key, allItems);
}

export function DeleteLocalStorageItem(key, index) {
  const fetchedItem = GetItemFromLocalStorage(key);
  console.log(key, index);
  const allItems = [...fetchedItem];
  const updatedItems = allItems.filter((item) => item.id !== index);
  console.log(allItems, updatedItems);
  SetItemToLocalStorage(key, updatedItems);
}
