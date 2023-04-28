import axios from 'axios';
const { createAsyncThunk } = require('@reduxjs/toolkit');

axios.defaults.baseURL = 'https://644b711117e2663b9def66e4.mockapi.io';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const contacts = await axios.get('/contacts');
      return contacts.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/add',
  async (contact, thunkAPI) => {
    try {
      // cant add contact if already exist in db
      const contacts = await axios.get('/contacts');
      const isExist = contacts.data.find(item => item.phone === contact.phone);
      if (isExist) {
        alert('Contact already exist');
        return thunkAPI.rejectWithValue('Contact already exist');
      }
      const contactToAdd = await axios.post('/contacts', contact);
      return contactToAdd.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeContact = createAsyncThunk(
  'contacts/remove',
  async (phone, thunkAPI) => {
    try {
      await axios.delete(`/contacts/${phone}`);
      return phone;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
