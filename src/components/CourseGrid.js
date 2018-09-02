import React from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
class CourseGrid extends React.Component {
	constructor(props){
		super(props);
		this.renderNonEditable = this.renderNonEditable.bind(this)
		this.renderDept = this.renderDept.bind(this)
		this.renderBlock = this.renderBlock.bind(this)
	}
	renderNonEditable(cellInfo){
		return (<div style={{backgroundColor: "#fafafa"}}
		dangerouslySetInnerHTML={{
			__html: this.props.teachers[cellInfo.index][cellInfo.column.id]
		}} />)
	}
	renderDept(cellInfo){
		//console.log('teacher')
		//console.log(this.props.teachers[cellInfo.index])
		return (<div style={{backgroundColor: "#fafafa"}}
			dangerouslySetInnerHTML={{
				__html: this.props.departments.find(o => (o.id==this.props.teachers[cellInfo.index].depId)).name
			}}/>)
	}
	renderBlock(cellInfo){
		//console.log(this.props.blocks)
		//console.log(cellInfo)
		var options = this.props.courses.filter(o => o.depId == cellInfo.original.depId).map(o => ({value: o.id, label: o.courseName}));
		var items = [<option key={'-'} value={'-'}>-</option>];
		for (var i = 0; i<options.length; i++){
			items.push(<option key={options[i].value} value={options[i].value}>{options[i].label}</option>);
		}
		//console.log(options)
		var block =this.props.blocks.find(o => o.teacher == cellInfo.original.id && o.time == cellInfo.column.Header.slice(-1)); 
		
		if (block){
			console.log(block.course)
			return <select
			value={block.course}>{items}</select>
			// return <div style={{backgroundColor: "#fafafa"}}
			// dangerouslySetInnerHTML={{
			// 	__html: block.course
			// }}/>;
		}
		else {
			return <select>{items}</select>
		}
	}
	render(){
		var cols = [{Header:'Dept', accessor: 'depId', Cell: this.renderDept},
					{Header:'Teacher', accessor: 'name', Cell: this.renderNonEditable}]
		for (var i = 1; i<= 8; i++){
			cols.push({Header:"Block " + i, Cell: this.renderBlock});
		}
		return (
			<div><ReactTable
				data={this.props.teachers}
				columns={cols}
				className="-striped -highlight"
			/></div>);
	}
}

export default CourseGrid;