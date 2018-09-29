import React from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import ReactTableResize from "./ReactTableResize"
import Select from 'react-select';

class CourseGrid extends React.Component {
	constructor(props){
		super(props);
		this.renderNonEditable = this.renderNonEditable.bind(this)
		this.renderDept = this.renderDept.bind(this)
		this.renderBlock = this.renderBlock.bind(this)
		this.onBlockChange = this.onBlockChange.bind(this)
	}
	renderNonEditable(cellInfo){
		return (<div style={{backgroundColor: "#fafafa"}}
		dangerouslySetInnerHTML={{
			__html: this.props.teachers.filter(o => this.props.departments.find(a => a.id==o.depId).checked)[cellInfo.index][cellInfo.column.id]
		}} />)
	}
	renderDept(cellInfo){
		//console.log('teacher')
		//console.log(this.props.teachers[cellInfo.index])
		return (<div style={{backgroundColor: "#fafafa"}}
			dangerouslySetInnerHTML={{
				__html: this.props.departments.find(o => (o.id==this.props.teachers.filter(o => this.props.departments.find(a => a.id==o.depId).checked)[cellInfo.index].depId)).name
			}}/>)
	}
	onBlockChange(cellInfo, target, id){
		var teacherId = this.props.teachers.filter(o => this.props.departments.find(a => a.id==o.depId).checked)[cellInfo.index].id;
		var courseId = target.value;
		console.log("BlockChange " + courseId)
		var time = cellInfo.column.block;
		var room = 0;
		this.props.onchange(courseId, teacherId, time, room, id);

		//var courseId = 
	}
	renderBlock(cellInfo){
		//console.log(this.props.blocks)
		//console.log(cellInfo)
		var options = this.props.courses.filter(o => o.depId == cellInfo.original.depId).map(o => ({value: o.id, label: o.shortName}));
		var items = [];
		for (var i = 0; i<options.length; i++){
			items.push({value: options[i].value, label: options[i].label});
		}
		//console.log(options)
		var block =this.props.blocks.find(o => o.teacher == cellInfo.original.id && o.time == cellInfo.column.Header.slice(-1)); 
		
		if (false){
			console.log("Already selected" + block.course)
			return <div><Select
			value={items.find(o => o.value===block.course)}
			options={items}
			isClearable={true}
			onChange={e => {console.log(e);this.onBlockChange(cellInfo, e, block.id);}}></Select><input></input></div>
			// return <div style={{backgroundColor: "#fafafa"}}
			// dangerouslySetInnerHTML={{
			// 	__html: block.course
			// }}/>;
		}
		else {
			return <Select isClearable={true} defaultValue={block ? items.find(o => o.value===block.course) : undefined} options={items} onChange={e => {console.log(e);this.onBlockChange(cellInfo, e, block?block.id: undefined)}}></Select>
		}
	}
	render(){
		var cols = [{Header:'Dept', accessor: 'depId', Cell: this.renderDept},
					{Header:'Teacher', accessor: 'name', Cell: this.renderNonEditable}]
		for (var i = 1; i<= 8; i++){
			cols.push({Header:"Block " + i, Cell: this.renderBlock, block: i});
		}
		return (
			<div><ReactTableResize
				saveName="CourseGrid"
				pageSizeOptions={[5, 10, 20, 25, 50, 100, this.props.teachers.filter(o => this.props.departments.find(a => a.id==o.depId).checked).length]}
				data={this.props.teachers.filter(o => this.props.departments.find(a => a.id==o.depId).checked)}
				columns={cols}
				className="-striped -highlight"
			/></div>);
	}
}

export default CourseGrid;