import React,{useRef} from 'react';
import ContactCard from './ContactCard';
import {Link} from 'react-router-dom'
const ContactList = (props) =>{
    console.log(props)  
  const inputEl = useRef("");
    const deleteHnadler = (id)=>{
        props.getContactId(id)
    };
    
const renderContactList = props.contacts.map((contact)=>{
    return(
       
        <ContactCard contact={contact} clickHandler={deleteHnadler} key={contact.id}></ContactCard>
        
    )
})
     const getSearchTerm=()=>{
        props.searchKeyword(inputEl.current.value)
     }
    return(
            <div className='main'>
                <h2> ContactList
                    <Link to='/add'>
                         <button className='ui button blue right floated'>Add Contact</button>           
                    </Link>
                </h2>
            <div className='ui search'>
                <div className='ui icon input'>
                    <input ref={inputEl } type='text' placeholder='search' className='prompt' value={props.term} onChange={getSearchTerm}/>
                    <i className='users icon left' ></i>
                </div>
            </div>
            
            <div className='ui celled list'>
                {renderContactList.length > 0 
                ? renderContactList 
                : "No Contact List Available"}
            </div>
        </div>
    )
}

export default ContactList;