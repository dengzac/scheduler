import React, {Component} from "react";
import {hot} from "react-hot-loader";
import axios from "axios";
import "./App.css";

import DepartmentList from "./components/DepartmentList";

const API_URL = window.location.href + "api/v1/";
class App extends Component {
	state = {
		departments: []
	}

	update = name => {
		console.log("Changed state");
	};

	componentDidMount(){
		this.getDepartmentList();
		this.timer = setInterval(()=> this.getDepartmentList(), 5000);
	}
	componentWillUnmount() {
		this.timer = null;
	}
	getDepartmentList(){
		axios.get(API_URL + "departments")
		.then(response => {
			const newDepartments = response.data.map (c => {
				return {id: c.id, name: c.name};
			});
			newDepartments.sort((a, b) => (parseInt(a.id) < parseInt(b.id)))
			const newState = Object.assign({}, this.state, {
				departments: newDepartments
			});
			this.setState(newState);
			console.log("Got response")
		}).catch(error => alert("Error loading departments"))
	}
	updateDepartment(original, colName, newVal){
		var newObj = Object.assign({}, original);
		newObj[colName] = newVal
		axios({url: API_URL + "departments/" + original.id, method: 'PUT', data: newObj}).then(res => {this.getDepartmentList();});
	}
	render(){
		return ( <div className="App">
			<header className="App-header">
			<h1 className="App-title">Schedule Planner</h1>
			</header>
			<DepartmentList departments={this.state.departments} onchange={this.updateDepartment.bind(this)}/>
			</div>
			);
	}
}

export default hot(module)(App);
