import React from "react";

class UserAdd extends React.Component {
	constructor(){
		super();
		this.state = {email: ''};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event){
		const target = event.target;
		console.log(target.value)
		console.log(target.name)
		this.setState({[target.name]: target.value});
		console.log(this.state)
	}
	handleSubmit(event){
		console.log('submit')
		event.preventDefault();
		this.props.onsubmit(this.state);
		this.setState({email: ''});
	}
	render(){
		return (
			<form onSubmit={this.handleSubmit}>
			<label>
				User Email:
				<input name='email'
				onChange={this.handleChange} value={this.state.email}/>
			</label>
			<input type="submit" value="Add"/>
			</form>
			)
	}
}

export default UserAdd;