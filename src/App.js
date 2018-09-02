import React, {Component} from "react";
import {hot} from "react-hot-loader";
import axios from "axios";
import "./App.css";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import DepartmentList from "./components/DepartmentList";
import CourseList from "./components/CourseList"
import TeacherList from "./components/TeacherList"
import CourseGrid from "./components/CourseGrid"
const API_URL = window.location.href + "api/v1/";
class App extends Component {
	state = {
		departments: [],
		courses: [],
		blocks:[]
	}

	update = name => {
		console.log("Changed state");
	};

	componentDidMount(){
		this.getDepartmentList();
		this.getCourseList();
		this.getTeacherList();
		this.getBlockList();
		//this.timer = setInterval(()=> this.getDepartmentList(), 5000);
	}
	componentWillUnmount() {
		this.timer = null;
	}
	getBlockList(){
		axios.get(API_URL + "blocks").then (res =>{
			const newBlock = res.data.map (c => {
				return {id: c.id, teacher: c.teacher_id, course: c.course_id, room: c.room, time: c.time}
			});
			this.setState({blocks: newBlock});
		});
	}
	getTeacherList(){
		axios.get(API_URL + "teachers")
		.then (res => {
			const newTeachers = res.data.map (c => {
				return {id: c.id, name: c.lastname, depId: c.department}
			});
			this.setState({teachers: newTeachers});
		})
	}
	updateTeacher(cellInfo, newVal){
		var newObj = Object.assign({}, cellInfo.original);
		newObj[cellInfo.column.id] = newVal;
		newObj = {id: newObj.id, name: newObj.name, department: newObj.depId}
		axios({url: API_URL + "teachers/" + cellInfo.original.id, method: "PUT", data: newObj}).then(res => this.getTeacherList());
	}
	deleteTeacher(id){
		axios.delete(API_URL + "teachers/" + id).then(res => this.getTeacherList());
	}
	addTeacher(obj){
		axios.post(API_URL + "teachers", obj).then(res => this.getTeacherList());
	}
	getDepartmentList(){
		axios.get(API_URL + "departments")
		.then(response => {
			const newDepartments = response.data.map (c => {
				return {id: c.id, name: c.name};
			});
			newDepartments.sort((a, b) => (parseInt(a.id) > parseInt(b.id)))
			for (var i = 0; i<Math.min(this.state.departments.length, newDepartments.length); i++){
				newDepartments[i].checked = this.state.departments[i].checked;
			}
			for (var i = this.state.departments.length; i<newDepartments.length; i++){
				newDepartments[i].checked = false;
			}
			const newState = Object.assign({}, this.state, {
				departments: newDepartments
			});
			this.setState(newState);
			// console.log("Got response")
		}).catch(error => console.log(error))
	}
	getCourseList(){
		axios.get(API_URL + "courses")
		.then(response => {
			const newCourses = response.data.map( c => {return {id: c.id, courseName: c.coursename, depId: c.department}});
			this.setState({courses: newCourses});
			// console.log(newCourses)
		});
	}
	updateCourse(cellInfo, newVal){
		var newObj = Object.assign({}, cellInfo.original);
		newObj[cellInfo.column.id] = newVal;
		delete newObj.depName;
		newObj.department = newObj.depId;
		delete newObj.depId;
		// console.log(newObj)
		axios({url: API_URL + "courses/" + cellInfo.original.id, method: 'PUT', data: newObj}).then(res => {this.getCourseList();});
	}
	deleteCourse(id){
		console.log("Delet " + id)
		axios.delete(API_URL + "courses/" + id).then(res => {this.getCourseList();});
	}
	addCourse(obj){
		console.log(obj)
		axios.post(API_URL + "courses", obj).then(res => {this.getCourseList();});
	}
	updateDepartment(original, colName, newVal){
		var newObj = Object.assign({}, original);
		newObj[colName] = newVal
		delete newObj.checked
		axios({url: API_URL + "departments/" + original.id, method: 'PUT', data: newObj}).then(res => {this.getDepartmentList();});
	}
	deleteDepartment(id){
		axios.delete(API_URL + "departments/" + id).then(res => {this.getDepartmentList();});
	}
	addDepartment(obj){
		axios.post(API_URL + "departments", obj).then(res => {this.getDepartmentList();});
	}
	changeDepartmentChecked(index, isChecked){
		console.log("Checkbox " + index + " " + isChecked);
		var newArr = this.state.departments.slice();
		// console.log(this.state)
		newArr[index].checked = isChecked;
		this.setState({departments: newArr});
	}
	render(){
		return ( <div className="App">
			<header className="App-header">
			<h1 className="App-title">Schedule Planner</h1>
			</header>
			<DepartmentList departments={this.state.departments} onchecked={this.changeDepartmentChecked.bind(this)} onadd={this.addDepartment.bind(this)} ondelete={this.deleteDepartment.bind(this)} onchange={this.updateDepartment.bind(this)}/>
			<CourseList url={API_URL + "upload/courses"} courses={this.state.courses} departments={this.state.departments} onchange={this.updateCourse.bind(this)} ondelete={this.deleteCourse.bind(this)} onadd={this.addCourse.bind(this)} ondone={this.getCourseList.bind(this)}/>
			<TeacherList url={API_URL + "upload/teachers"} teachers={this.state.teachers} departments={this.state.departments} onchange={this.updateTeacher.bind(this)} onadd={this.addTeacher.bind(this)} ondelete={this.deleteTeacher.bind(this)} ondone={this.getTeacherList.bind(this)}/>
			<CourseGrid  courses={this.state.courses} teachers={this.state.teachers} departments={this.state.departments} blocks={this.state.blocks}/>
			<NotificationContainer/>
			</div>
			);
	}
}

export default hot(module)(App);
