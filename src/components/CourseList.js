import React, {Component} from "react"

import Select from 'react-select';
import ReactTable from "react-table";
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
		__html: this.getDisplayedData(this.props.courses)[cellInfo.index][cellInfo.column.id]
	}} />

				)
		}
	renderNonEditable(cellInfo){
		return (<div style={{backgroundColor: "#fafafa"}}
		dangerouslySetInnerHTML={{
			__html: this.getDisplayedData(this.props.courses)[cellInfo.index][cellInfo.column.id]
		}} />)
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
			 value={this.props.courses[cellInfo.index].depId}>{items}</select> );
	}
	render(){
		return (

			<div>
			<h3>Course List</h3>
			<ReactTable
			data={this.getDisplayedData(this.props.courses)}
			columns={[
				{Header: "Department Name", accessor: "depName", Cell: this.renderSelect},
				{Header: "Department Number", accessor: "depId", Cell: this.renderNonEditable},
				{Header: "Course Code", accessor: "id", Cell: this.renderEditable},
				{Header: "Course Name", accessor: "courseName", Cell: this.renderEditable},
				{Header: "Delete", Cell: this.renderDelete}]
				}
			className="-striped -highlight"

			/>
			<br />
			<CourseAdd onsubmit={this.props.onadd} departments={this.props.departments}/>
			<FileUpload url={this.props.url} ondone={this.props.ondone}/>
			</div>
			)
	}
}

export default CourseList;