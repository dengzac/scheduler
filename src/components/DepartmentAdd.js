import React from "react";

class DepartmentAdd extends React.Component {
	constructor(props){
		super(props);
		this.state = {id: props.defaultId, name: ''};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(event){
		const target = event.target;
		console.log(target)
		this.setState({[target.name]: target.value});
		console.log(this.state)
	}
	handleSubmit(event){
		event.preventDefault();
		console.log('submit');
		this.props.onsubmit(this.state);
		this.setState({id: parseInt(this.state.id)+1, name: ''})
	}
	render(){
		return (
			<form onSubmit={this.handleSubmit}>
			<label>
				ID:
				<input type="number"
				name= "id"
				 onChange={this.handleChange} value={this.state.id} />
			</label>
			<br/>
			<label>
				Name:
				<input name='name'
				onChange={this.handleChange} value={this.state.name}/>
			</label>
			<input type="submit" value="Add"/>
			</form>);


				
	}
}

export default DepartmentAdd;