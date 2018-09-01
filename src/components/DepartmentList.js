import React from "react";
import PropTypes from "prop-types";

import ReactTable from "react-table";
import "react-table/react-table.css";

class DepartmentList extends React.Component {
	// render(){
	// 	return (<div>{JSON.stringify(this.props.departments)}</div>);
	// }
	constructor(props){
		super(props);
		this.renderEditable = this.renderEditable.bind(this)
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

	render(){
		console.log('render')
		return (
			<div>
			<h1>Departments</h1>
			<ReactTable
			data={this.props.departments}
			columns={[
				{Header: "ID", accessor: "id", Cell: this.renderEditable},
				{Header: "Name", accessor: "name", Cell: this.renderEditable}]
				}
			className="-striped -highlight"
			showPagination={false}
			pageSize={this.props.departments.length}
			/>
			<br />
			</div>
			)
	}
}





export default DepartmentList;