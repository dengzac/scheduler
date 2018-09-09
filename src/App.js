import React, {Component} from "react";
import {hot} from "react-hot-loader";
import axios from "axios";
import "./App.css";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import DepartmentList from "./components/DepartmentList";
import CourseList from "./components/CourseList"
import TeacherList from "./components/TeacherList"
import CourseGrid from "./components/CourseGrid"
import UserList from "./components/UserList"
const API_URL = 'http://' + window.location.host + "/api/v1/"; 
class App extends Component {
	state = {
		departments: [],
		courses: [],
		blocks:[],
		users: [],
		user: null,
		roles: [],
		userRoles: []
	}

	update = name => {
		console.log("Changed state");
	};

	componentDidMount(){
		this.getUser();
		this.getDepartmentList();
		this.getCourseList();
		this.getTeacherList();
		this.getBlockList();
		this.getUsers();
		this.getRoles();
		//this.timer = setInterval(()=> this.getDepartmentList(), 5000);
	}
	getRoles(){
		axios.get(API_URL+"roles").then(res => {
			this.setState({roles: res.data});
			console.log(res.data)
		})
	}
	getUser(){
		axios.get(API_URL+"user").then(res => {
			this.setState({user: res.data});
		}).catch(err => window.location.replace("login.html"))
	}
	getUsers(){
		axios.get(API_URL + "users").then (res => {
			this.setState({users: res.data});

		})
		axios.get(API_URL + "user_role").then (res => this.setState({userRoles: res.data}));
	}
	updateUser(cellInfo, newVal){
		var newObj = Object.assign({}, cellInfo.original);
		newObj[cellInfo.column.id] = newVal;
		axios({url: API_URL + "users/" + cellInfo.original.id, method: "PUT", data: newObj}).then(res => this.getUsers());
	}
	updateRoles(obj){
		console.log(obj)
		console.log('updateroles')
		axios({url: API_URL + "user_role/" + obj.id, method: 'PUT', data: {changed: obj.roles}}).then(res => this.getRoles())
	}
	addUser(obj){
		axios.post(API_URL + "users", obj).then(res => this.getUsers());
	}
	deleteUser(id){
		axios.delete(API_URL + "users/" + id).then(res => this.getUsers());
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
		}).catch(error =>{ console.log("error");window.location.replace("login.html")})
	}
	getCourseList(){
		axios.get(API_URL + "courses")
		.then(response => {
			const newCourses = response.data.map( c => {return {id: c.id, courseName: c.coursename, depId: c.department, shortName: c.shortname, _9: c._9, _10: c._10, _11: c._11, _12: c._12}});
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
		if (!obj.shortname) obj.shortname = obj.coursename;
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
			Logged in as {this.state.user && <b>{this.state.user.profile.displayName}</b> }&nbsp;&nbsp;&nbsp;
			<a href="/logout">Log Out</a>
			<Tabs>
				<TabList>
					<Tab>Departments</Tab>
					<Tab>Courses</Tab>
					<Tab>Teachers</Tab>
					<Tab>Schedule</Tab>
					<Tab>Users</Tab>
				</TabList>
				<TabPanel>
				<DepartmentList departments={this.state.departments} onchecked={this.changeDepartmentChecked.bind(this)} onadd={this.addDepartment.bind(this)} ondelete={this.deleteDepartment.bind(this)} onchange={this.updateDepartment.bind(this)}/>
				</TabPanel>
				<TabPanel>
				<CourseList url={API_URL + "upload/courses"} courses={this.state.courses} departments={this.state.departments} onchange={this.updateCourse.bind(this)} ondelete={this.deleteCourse.bind(this)} onadd={this.addCourse.bind(this)} ondone={this.getCourseList.bind(this)}/>
				</TabPanel>
				<TabPanel>
				<TeacherList url={API_URL + "upload/teachers"} teachers={this.state.teachers} departments={this.state.departments} onchange={this.updateTeacher.bind(this)} onadd={this.addTeacher.bind(this)} ondelete={this.deleteTeacher.bind(this)} ondone={this.getTeacherList.bind(this)}/>
				</TabPanel>
				<TabPanel>
				<CourseGrid  courses={this.state.courses} teachers={this.state.teachers} departments={this.state.departments} blocks={this.state.blocks}/>
				</TabPanel>
				<TabPanel>
				<UserList onRoleChange={this.updateRoles.bind(this)} ondelete={this.deleteUser.bind(this)} userRoles={this.state.userRoles} users={this.state.users} departments={this.state.departments} roles={this.state.roles} onchange={this.updateUser.bind(this)} onsubmit={this.addUser.bind(this)}/>
				</TabPanel>
			</Tabs>
			<NotificationContainer/>
			</div>
			);
	}
}

export default hot(module)(App);
