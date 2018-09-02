import React from 'react';
import $ from 'jquery';
class TeacherAdd extends React.Component {
	constructor(props){
		super(props);
		this.state = {name: '', department: -1};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(event){
		const target = event.target;
		console.log(target.value)
		this.setState({[target.name]: target.value});
		console.log(this.state)
	}
	static getDerivedStateFromProps(props, current_state){
		if (current_state.department === -1 && props.departments.length > 0){
			return {
				department: props.departments[0].id
			}
		}
		return null;
	}
	handleSubmit(event){
		event.preventDefault();
		console.log('submit');

		this.props.onsubmit(this.state);
		this.setState({name: '', department: -1})
	}
	render(){
		var options = this.props.departments.map((obj) => {return {value: obj.id+'', label: obj.name}});
		console.log(options)
		var items = []
		for (var i = 0; i<options.length; i++){
			items.push(<option key={options[i].value} value={options[i].value}>{options[i].label}</option> )
		}

		return (
			<form onSubmit={this.handleSubmit}>
			<select name="department" value={this.state.department} onChange={this.handleChange}>{items}</select>

			<label>
				Teacher Name:
				<input name='name'
				onChange={this.handleChange} value={this.state.name}/>
			</label>
			<input type="submit" value="Add"/>
			</form>);


				
	}
}

export default TeacherAdd;
