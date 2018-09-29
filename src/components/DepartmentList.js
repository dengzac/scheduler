import React from "react";
import PropTypes from "prop-types";

import ReactTable from "react-table";
import "react-table/react-table.css";

import DepartmentAdd from "./DepartmentAdd"
import ReactTableResize from "./ReactTableResize"
class DepartmentList extends React.Component {

	constructor(props){
		super(props);
		this.renderEditable = this.renderEditable.bind(this)
		this.renderDelete = this.renderDelete.bind(this)
		this.renderShow = this.renderShow.bind(this)
		this.handleInputChange = this.handleInputChange.bind(this)
	}
	// static getDerivedStateFromProps(props, current_state){
	// 	if (current_state.show.length !== props.departments.length){
	// 		console.log("Update props")
	// 		return {
	// 			show: current_state.show.slice().push(true)
	// 		}
	// 	}
	// 	return null;
	// }
	handleInputChange(event){
		this.props.onchecked(event.target.name, event.target.checked)
	}
	renderEditable(cellInfo){
		return (
<div
style={{backgroundColor: "#fafafa"}}
contentEditable
suppressContentEditableWarning

onBlur={e => {
	console.log(JSON.stringify(cellInfo))
          var newVal = e.target.innerHTML;
          var oldId = cellInfo.original.id;
          var colName = cellInfo.column.id;
          this.props.onchange(cellInfo.original, colName, newVal);
        }}

dangerouslySetInnerHTML={{
	__html: this.props.departments[cellInfo.index][cellInfo.column.id]
}} />

			)
	}
	renderDelete(cellInfo){
		return (
			<button
			style={{backgroundColor: "#fafafa"}}
			onClick={e =>{
				this.props.ondelete(cellInfo.original.id);
			}}
			dangerouslySetInnerHTML={{
				__html: 'X'
			}} />
		)
	}
	renderShow(cellInfo){
		return (
			<input type="checkbox" name={cellInfo.index} onChange={this.handleInputChange} checked={this.props.departments[cellInfo.index].checked}/>)
	}
	render(){
		console.log('render')
		return (
			<div>
			<h3>Departments</h3>
			<ReactTableResize
			data={this.props.departments}
			columns={[
				{Header: <input type="checkbox" onClick={e => {console.log(e.target.checked);if (true){var inputs = document.getElementsByTagName('input'); for (var i = 0; i<inputs.length; i++){
					if (inputs[i].type == "checkbox" && inputs[i].name){
						inputs[i].checked = e.target.checked;
						console.log(inputs[i].nam)
						this.handleInputChange({target: inputs[i], checked: inputs[i].checked});
						
					}
				}};e.stopPropagation();}} />, accessor:"show", Cell: this.renderShow},
				{Header: "ID", accessor: "id", Cell: this.renderEditable},
				{Header: "Name", accessor: "name", Cell: this.renderEditable},
				{Header: "Delete", accessor: "delete", Cell: this.renderDelete}]
				}
			className="-striped -highlight"
			showPagination={false}
			pageSize={this.props.departments.length}
			/>
			<br />
			<DepartmentAdd defaultId={this.props.departments.length <= 0 ? 1 :Math.max.apply(Math, this.props.departments.map((o) => (parseInt(o.id) +1)))+1} onsubmit={this.props.onadd}
			/>
			</div>
			)
	}
}





export default DepartmentList;