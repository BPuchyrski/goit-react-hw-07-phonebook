import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, removeContact } from './operations';
// const localStorageContacts = localStorage.getItem('contacts');
// const parsedContacts = JSON.parse(localStorageContacts);

const initialState = {
  contacts: [],
  isLoading: false,
};

export const contactsListSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: {
    [fetchContacts.fulfilled]: (state, action) => {
      state.contacts = action.payload;
    },

    [addContact.fulfilled]: (state, action) => {
      state.contacts = [...state.contacts, action.payload];
    },

    [removeContact.fulfilled]: (state, action) => {
      state.contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
    },
  },
});

export default contactsListSlice.reducer;
