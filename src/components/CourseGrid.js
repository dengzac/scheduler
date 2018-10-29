import React from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import ReactTableResize from "./ReactTableResize"
import Select from 'react-select';
import SemesterChoose from './SemesterChoose'
import BlockOptions from "./BlockOptions"
import "../App.css"
const stringSimilarity = require('string-similarity')
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
class CourseGrid extends React.Component {
	constructor(props){
		super(props);
		this.renderNonEditable = this.renderNonEditable.bind(this)
		this.renderDept = this.renderDept.bind(this)
		this.renderBlock = this.renderBlock.bind(this)
		this.onBlockChange = this.onBlockChange.bind(this)
		this.state = {semester: 3, properties: []}
		this.switchSemester = this.switchSemester.bind(this)
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
	onBlockChange(cellInfo, target, id, room, seats){
		var teacherId = this.props.teachers.filter(o => this.props.departments.find(a => a.id==o.depId).checked)[cellInfo.index].id;
		var courseId = target;// ? target.value : undefined;
		//console.log("BlockChange " + courseId)
		//debugger;
		var time = cellInfo.column.block;


		this.props.onchange(courseId, teacherId, time, room, id, seats);

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
		//if (block) console.log("Re-render")
		//console.log(block)
		// if (!this.state.properties[block]){
		// 	this.setState({properties: (() =>{var a = this.state.properties.splice();a[block] = {}; return a})()});
		// }
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
			return (<div><BlockOptions defaultValue={block ? items.find(o => o.value===block.course) : undefined} items={items} onBlockChange={this.onBlockChange} cellInfo={cellInfo} block={block} courses={this.props.courses}></BlockOptions>
				
			</div>)
		}
	}
	updateSemester(semester){
		this.setState({semester: semester});
		this.forceUpdate();
	}
	switchSemester(){

		var blocks = this.props.blocks;
		console.log(blocks)
		var confirmQueue = [];
		for (let i = 0; i<blocks.length; i++){
			var origName = blocks[i].course.slice(0, -1);
			var dept = this.props.teachers.find(a => a.id==blocks[i].teacher).depId;
			//debugger;
			var possibleCourses = this.props.courses.filter(o => (o.depId == dept && o.id != blocks[i].course));
			//console.log(possibleCourses);
			var res = stringSimilarity.findBestMatch(origName + (blocks[i].course.slice(-1)=="A" ? "B" : "A"), possibleCourses.map(o => o.id));
			console.log(blocks[i].course + " " + res.bestMatch.target + " " + res.bestMatch.rating);
			if (res.bestMatch.rating < 0.99){
				confirmQueue.push({block: blocks[i], match: res.bestMatch.target});

			} else {
				this.props.onchange(res.bestMatch.target, blocks[i].teacher, blocks[i].time, blocks[i].room, blocks[i].id, blocks[i].seats);
			}
		}
		var that = this;
		function showAlert(){
			if (confirmQueue.length <= 0) return;
			confirmAlert({
				title: 'Inexact Match Found', 
				message: "Should " + confirmQueue[0].block.course + " be replaced by " + confirmQueue[0].match + "?",
				buttons: [{label: 'Yes',
				 onClick: () =>
				   {debugger;console.log("Clicked yes", confirmQueue[0]);
				   that.props.onchange(res.bestMatch.target, confirmQueue[0].block.teacher, confirmQueue[0].block.time, confirmQueue[0].block.room, confirmQueue[0].block.id, confirmQueue[0].block.seats);
				   confirmQueue.shift();
				   showAlert();
				}},

				{label: 'No', onClick: () => {confirmQueue.shift();showAlert()}}]
			})
		}
		showAlert();
		this.forceUpdate();
	}
	render(){
		var cols = [{Header:'Dept', accessor: 'depId', Cell: this.renderDept},
					{Header:'Teacher', accessor: 'name', Cell: this.renderNonEditable}]
		for (var i = 1; i<= 8; i++){
			cols.push({Header:"Block " + i, Cell: this.renderBlock, block: i});
		}
		return (
			<div><SemesterChoose updateSemester={this.updateSemester.bind(this)}/>
			<button onClick={this.switchSemester.bind(this)}>
				Swap Course Semester
			</button><ReactTableResize
				saveName="CourseGrid"
				pageSizeOptions={[5, 10, 20, 25, 50, 100, this.props.teachers.filter(o => this.props.departments.find(a => a.id==o.depId).checked).length]}
				data={this.props.teachers.filter(o => this.props.departments.find(a => a.id==o.depId).checked)}
				columns={cols}
				className="-striped -highlight"
			/></div>);
	}
}

export default CourseGrid;