import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

import TeacherAdd from "./TeacherAdd"
import FileUpload from "./FileUpload"
class TeacherList extends React.Component {
	constructor(){
		super()
		this.renderEditable = this.renderEditable.bind(this)
		this.renderNonEditable = this.renderNonEditable.bind(this)
		//this.getDisplayedData = this.getDisplayedData.bind(this)
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
	          console.log(cellInfo);
	          this.props.onchange(cellInfo, newVal);
	        }}

	dangerouslySetInnerHTML={{
		__html: this.props.teachers.filter(o => this.props.departments.find(a => a.id==o.depId).checked)[cellInfo.index][cellInfo.column.id]
	}} />

				)
		}
		renderNonEditable(cellInfo){
			return (<div style={{backgroundColor: "#fafafa"}}
			dangerouslySetInnerHTML={{
				__html: this.props.teachers.filter(o => this.props.departments.find(a => a.id==o.depId).checked)[cellInfo.index][cellInfo.column.id]
			}} />)
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
			 value={this.props.teachers.filter(o => this.props.departments.find(a => a.id==o.depId).checked)[cellInfo.index].depId}>{items}</select> );
	}
	render(){
		console.log(this.props.departments)
		return (
		<div>
		<h3>Teacher List</h3>
		<ReactTable
		pageSizeOptions={[5, 10, 20, 25, 50, 100, this.props.teachers.filter(o => this.props.departments.find(a => a.id==o.depId).checked).length]}
		data={this.props.teachers.filter(o => this.props.departments.find(a => a.id==o.depId).checked)}
		columns={[
			{Header: "Department Name", accessor: "depName", Cell: this.renderSelect},
			{Header: "Department Number", accessor: "depId", Cell: this.renderNonEditable},
			{Header: "Teacher id", accessor: "id", Cell: this.renderNonEditable},
			{Header: "Name", accessor: "name", Cell: this.renderEditable},
			{Header: "Delete", Cell: this.renderDelete}]
			}
		className="-striped -highlight"

		/>
		<br />
		<TeacherAdd onsubmit={this.props.onadd} departments={this.props.departments} onsubmit={this.props.onadd}/>
		<FileUpload url={this.props.url} ondone={this.props.ondone}/>
		</div>);
	}
}
export default TeacherList;