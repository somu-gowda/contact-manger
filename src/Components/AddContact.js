import React from 'react';

class AddContact extends React.Component{
    state={
        name:'',
        email:'',
    }

    add= (e) =>{
  e.preventDefault();
  if(this.state.name==='' || this.state.email===''){
      alert('All the field madatary')
      return
  }
  this.props.addContactHandler(this.state);
  this.setState( {name:'',email:''})
this.props.history.push('/')
    }
    render(){
        return(
            <div className='ui main'>
                <h2>AddContact</h2>
                <form className='ui form' onSubmit={this.add}>
                <div className='ui field'>
                <label>Name</label>
                   <input type='text'
                    name='name'
                    placeholder='name'
                    value= {this.state.name}
                    onChange ={(e)=>this.setState({name:e.target.value})} />
                </div>
                <div className='ui field'>
                <label>Email</label>
                   <input type='text' 
                   name='email' 
                   placeholder='email'
                   value= {this.state.email}
                   onChange ={(e)=>this.setState({email:e.target.value})}></input>
                </div>
                     <button className='ui button blue'>Add</button>
                </form>

            </div>
        )
    }
}


export default AddContact;