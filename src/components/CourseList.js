import React, {Component} from "react"
import ColorPicker from "./ColorPicker"
import Select from 'react-select';
import ReactTable from "react-table";
import ReactTableResize from "./ReactTableResize"
import SemesterChoose from "./SemesterChoose"
import "react-table/react-table.css";

import CourseAdd from './CourseAdd'
import FileUpload from "./FileUpload"
class CourseList extends React.Component {
	constructor(props){
		super(props);
		this.renderEditable = this.renderEditable.bind(this)
		this.renderNonEditable = this.renderNonEditable.bind(this)
		this.getDisplayedData = this.getDisplayedData.bind(this)
		this.renderSelect = this.renderSelect.bind(this)
		this.renderDelete = this.renderDelete.bind(this)
		this.renderColor = this.renderColor.bind(this)
		this.renderCheck = this.renderCheck.bind(this)
		this.getFilteredCourses = this.getFilteredCourses.bind(this)
		this.state = {semester: 3};
	}

		renderEditable(cellInfo){
			return (
	<div
	style={{backgroundColor: "#fafafa"}}
	contentEditable
	suppressContentEditableWarning

	onBlur={e => {
		//console.log(JSON.stringify(cellInfo))
	          var newVal = e.target.innerHTML;
	          var oldId = cellInfo.original.id;
	          var colName = cellInfo.column.id;
	          this.props.onchange(cellInfo, newVal);
	        }}

	dangerouslySetInnerHTML={{
		__html: this.getDisplayedData(this.getFilteredCourses())[cellInfo.index][cellInfo.column.id]
	}} />

				)
		}
	renderNonEditable(cellInfo){
		return (<div style={{backgroundColor: "#fafafa"}}
		dangerouslySetInnerHTML={{
			__html: this.getDisplayedData(this.getFilteredCourses())[cellInfo.index][cellInfo.column.id]
		}} />)
	}
	getFilteredCourses(){
		//console.log("Chosen filter: " + this.state.semester);
		//console.log(this.props.courses.filter(o =>  this.props.departments.find(a => a.id==o.depId).checked && ((o.semester & this.state.semester) > 0)).length)
		return this.props.courses.filter(o =>  this.props.departments.find(a => a.id==o.depId).checked && ((o.semester & this.state.semester) > 0))
	}
	getDisplayedData(courses){
		var arr = [];
		for (var i = 0; i<courses.length; i++){
			try{
			var name = this.props.departments.find (obj => {
				return obj.id === parseInt(courses[i].depId);
			}).name;

			var newRow = Object.assign({}, courses[i]);
			newRow.depName = name;
			//console.log(name);
			arr.push(newRow);
		} catch (ex){
			console.log("Erorr")
			console.log(ex)
			console.log(courses[i].depId)
		}
		}
		return arr;
	}
	renderDelete(cellInfo){
		return (
			<button
			style={{backgroundColor: "#fafafa"}}
			onClick={e =>{
				//console.log(cellInfo)
				this.props.ondelete(cellInfo.original.id);
			}}
			dangerouslySetInnerHTML={{
				__html: 'X'
			}} />
		)
	}
	renderSelect(cellInfo){
		var options = this.props.departments.map((obj) => {return {value: obj.id+'', label: obj.name}});
		//console.log(options)
		var items = []
		for (var i = 0; i<options.length; i++){
			items.push(<option key={options[i].value} value={options[i].value}>{options[i].label}</option> )
		}
		return (<select
			onChange={e => {
				cellInfo.column.id = 'depId'
				this.props.onchange(cellInfo,e.target.value)
			}}
			 value={this.getFilteredCourses()[cellInfo.index].depId}>{items}</select> );
	}
	renderCheck(cellInfo){
		var semester = this.getDisplayedData(this.getFilteredCourses())[cellInfo.index].semester;
		//console.log("Semester: " + semester);
		if (cellInfo.column.id == "fall"){
			return (<input type="checkbox" checked={Math.floor( semester % 2)==1} onChange={() => {var newVal = semester ^ 1;
	          var oldId = cellInfo.original.id;
	          var colName = cellInfo.column.id;
	          cellInfo.column.id = "semester";
	          this.props.onchange(cellInfo, newVal)
	          }} />)
		}else {
					return (<input type="checkbox" checked={Math.floor( semester/2) % 2==1} onChange={() => {var newVal = semester ^ 2;
			          var oldId = cellInfo.original.id;
			          var colName = cellInfo.column.id;
			          cellInfo.column.id = "semester";
			          this.props.onchange(cellInfo, newVal)
			          }} />)
		}
	}
	renderColor(cellInfo){
		return (<ColorPicker />)
	}
	updateSemester(semester){
		this.setState({semester: semester});
		this.forceUpdate();
	}
	render(){
		return (
			
			<div>
			<h3>Course List</h3>
			<SemesterChoose updateSemester={this.updateSemester.bind(this)}/>
			<ReactTableResize
			saveName="CourseList"
			pageSizeOptions={[5, 10, 20, 25, 50, 100, this.getFilteredCourses().length]}
			data={this.getDisplayedData(this.getFilteredCourses())}
			columns={[
				{Header: "Department Name", accessor: "depName", Cell: this.renderSelect},
				{Header: "Department Number", accessor: "depId", Cell: this.renderNonEditable},
				{Header: "Course Code", accessor: "id", Cell: this.renderEditable},
				{Header: "Course Name", accessor: "courseName", Cell: this.renderEditable},
				{Header: "Short Name", accessor: "shortName", Cell: this.renderEditable},
				{Header: "9th", accessor: "_9", Cell: this.renderEditable},
				{Header: "10th", accessor: "_10", Cell: this.renderEditable},
				{Header: "11th", accessor: "_11", Cell: this.renderEditable},
				{Header: "12th", accessor: "_12", Cell: this.renderEditable},
				{Header: "Fall", accessor: "fall", Cell: this.renderCheck},
				{Header: "Spring", accessor: "spring", Cell: this.renderCheck},
				{Header: "Color", accessor: "color", Cell: this.renderColor},
				{Header: "Delete", accessor: "delete", Cell: this.renderDelete}]
				}
			className="-striped -highlight"

			/>
			<br />
			<CourseAdd onsubmit={this.props.onadd} departments={this.props.departments}/>
			<h3> Import from Excel </h3>
			<img src="images/CourseList.png"></img>
			<p>The above columns, including headers, are required but may be in any order. Other columns will be ignored. For the semester value, 1=Fall only, 2=Spring only, 3=Fall and Spring</p>
			<FileUpload url={this.props.url} ondone={this.props.ondone}/>
			</div>
			)
	}
}

export default CourseList;