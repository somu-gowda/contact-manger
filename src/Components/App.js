import React,{useState,useEffect} from 'react';
import './App.css';
import Header from './Header';
import ContactList from './ContactList';
import AddContact from './AddContact';
import { uuid } from "uuidv4";
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import ContactDetail from './ContactDetails'
import api from '../api/contact';
import EditContact from './EditeContact'

function App() {
// const LOCAL_STORAGE_KEY ='contact';                 // setting key
const [contacts,setContacts]=useState([])
const [searchTerm,setSearchTerm]=useState();
const [searchResult,setSearchResult] =useState([])
// reetrive
const retrieveContacts = async ()=>{
  const response = await api.get('/contact');
  return response.data;
}

const addContactHandler = async (contact)=>{
  console.log(contact);
  const request = {
    id: uuid(),
    ...contact,
  };

  const response = await api.post("/contact", request)
  console.log(response)
  setContacts([...contacts, response.data])      // to pass data from children to parent ,create proprs function
};
const updateContactHandler= async(contact)=>{
 const response = await api.put(`/contact/${contact.id}`,contact)
 const {id}=response.data;
 setContacts(contacts.map(contact=>{
   return contact.id === id ? {...response.data}: contact;
 })
 );
};
const removeContactHandler = async(id) =>{
  await api.delete(`/contact/${id}`)
  const newContactList = contacts.filter((contact)=>{
    return contact.id !== id;
   
  } , alert('Can I Delete It?'))
  setContacts(newContactList)
}
useEffect(() =>{
  const getAllContact = async () =>{
    const allContacts = await retrieveContacts();
    if(allContacts) setContacts(allContacts)
  }
//  const retriveContacts =JSON.parse( localStorage.getItem(LOCAL_STORAGE_KEY))   //getting localstroge
//  if(retriveContacts)setContacts(retriveContacts)
getAllContact();
}, []);

const searchHandler=(searchTerm)=>{
  setSearchTerm(searchTerm)
  if(searchTerm !== ''){
    const newContactList = contacts.filter((contact)=>{
    return (Object.values(contact)
     .join(" ").toLowerCase()
     .includes(searchTerm
      .toLowerCase()))
    });
    setSearchResult(newContactList)
  }
  else{
    setSearchResult(contacts)
  }
}

useEffect(() =>{
  //  localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts))      //storing on localstorage
}, [contacts]);


return (
      <div className='ui container'>
        <Router>
        <Header/>
        <Switch>
          
        <Route path='/'
          exact 
          render ={(props)=>(<ContactList {...props}
          contacts={ searchResult.length < 1 ?  contacts : searchResult} 
          getContactId={removeContactHandler}
          term={searchTerm}
          searchKeyword={searchHandler}
          /> )}>
          </Route>

        <Route path='/add'render={(props)=>(<AddContact {...props}
         addContactHandler={addContactHandler}/>)}></Route>

         <Route path='/contact/:id' component={ContactDetail}/>

         <Route path='/edit'
         render={(props)=>(
         <EditContact {...props}
         updateContactHandler={updateContactHandler}/>)}></Route>
        </Switch>
        </Router>
      </div>
  );
}

export default App;
