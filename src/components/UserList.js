import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Select from 'react-select';
import UserAdd from './UserAdd';
import ReactTableResize from "./ReactTableResize"

class UserList extends React.Component {
	constructor(){
		super();
		this.renderDelete = this.renderDelete.bind(this);
		this.renderNonEditable = this.renderNonEditable.bind(this)
		this.renderEditable = this.renderEditable.bind(this)
		this.renderSelect = this.renderSelect.bind(this)
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
		__html: this.props.users[cellInfo.index][cellInfo.column.id]
	}} />

				)
		}
	renderNonEditable(cellInfo){
		return (<div style={{backgroundColor: "#fafafa"}}
		dangerouslySetInnerHTML={{
			__html: this.props.users[cellInfo.index][cellInfo.column.id]
		}} />)
	}
	onChange(event, type){
		console.log(event);
		console.log(type);
		console.log(this)
		this.props.onRoleChange({id: this.info.original.id, roles: event.map(o => o.value)});
		//this.props.onchange({id: 1})
	}
	renderSelect(cellInfo){
		var options = this.props.roles;
		options = options.map(o => ({value: o.id, label: (o.department ? this.props.departments.find(a => a.id==o.department).name+'_' : '')  + o.name}));
		console.log(options)
		var user = cellInfo.original.id;
		return (<Select onChange={this.onChange.bind({info: cellInfo, props: this.props})} classNamePrefix="select" name="roles" isMulti options={options} defaultValue={this.props.userRoles[user] ? options.filter(o => this.props.userRoles[user].find(a => a.role_id==o.value)) : []} className="basic-multi-select"/>)
	}
	render(){
		return (
			<div>

			<ReactTableResize
			saveName="UserList"
			style={{overflow: 'visible'}}
			data={this.props.users}
			columns={[
				{Header: "id", accessor: "id", Cell: this.renderNonEditable},
				{Header: "Email", accessor: "email", Cell: this.renderEditable},
				{Header: "Roles", accessor: "roles", Cell: this.renderSelect},
				{Header: "Delete", accessor: "delete", Cell: this.renderDelete}]
				}
			/>
			<UserAdd onsubmit={this.props.onsubmit} />
			</div>
			)
	}
}

export default UserList;