import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../image/user2.jpg'
// import {Link} from 'react-router-dom'
const ContactDetails = (props) =>{
  const {name ,email} = props.location.state.contact
    return(
        <div className='main'>
            <div className='ui card centered'>
                    <div className='image'>
                        <img src={Image} alt='user'/>
                    </div>
                    <div className='content'>
                        <div className='header'>{name}</div>
                        <div className='description'>{email}</div>
                    </div>
                    
            </div>
            <div className='center-div'>
                <Link to='/' >
                     <button className='ui button blue' style={{marginLeft:'380px'}} >Back to ContactList</button>
                </Link>
            </div>
        </div>
    ) 
}

export default ContactDetails;