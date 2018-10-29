import React, {Component} from "react"
import ReactTableResize from "./ReactTableResize"
class Announcer extends React.Component {
    constructor(props){
        super(props);
        console.log(this.props)
        this.renderDept = this.renderDept.bind(this);
    }
    getFilteredCourses(){
		//console.log("Chosen filter: " + this.state.semester);
		//console.log(this.props.courses.filter(o =>  this.props.departments.find(a => a.id==o.depId).checked && ((o.semester & this.state.semester) > 0)).length)
		return this.props.blocks.filter(o =>  this.props.departments.find(a => a.id==this.teachers.find(b => b.id==o.teacher).depId).checked)
	}
    renderDept(cellInfo){
        //console.log(cellInfo)
        //debugger;
        return (<div style={{backgroundColor: "#fafafa"}}
			dangerouslySetInnerHTML={{
				__html: this.props.teachers.filter(o => o.id==cellInfo.original.teacher)[0].depId
			}}/>)
    }
    renderCourseCode(cellInfo){
        return <div>{cellInfo.original.course}</div>
    }
    renderCourseName(cellInfo){
        return <div>{this.props.courses.filter(o => o.id==cellInfo.original.course)[0].courseName}</div>
    }
    renderTeacher(cellInfo){
        return <div>{this.props.teachers.filter(o => o.id==cellInfo.original.teacher)[0].name}</div>
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
        //console.log(cellInfo.original)
        return <div 
        style={{backgroundColor: "#fafafa"}}
        dangerouslySetInnerHTML={{__html: cellInfo.original[cellInfo.column.id]}}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
            console.log(cellInfo)
            //console.log(e.target.innerHTML)
            var a = Object.assign({}, cellInfo.original);
            a[cellInfo.column.id] = e.target.innerHTML;
            console.log(a);
            this.props.onchange(a.course, a.teacher, a.time, a.room, a.id, a.seats)
                }}
        />
    }
    render(){
        return <div>
            <h3>Announcer</h3>
            <ReactTableResize 
            saveName="announcerTable"
            pageSizeOptions={[5, 10, 20, 25, 50, 100, this.props.blocks.length]}
            data={this.props.blocks}
            columns={[{Header: "Department", accessor: 'depId', Cell: this.renderDept},
                    {Header: "Course Code", Cell: this.renderCourseCode.bind(this)},
                    {Header: "Course Name", Cell: this.renderCourseName.bind(this)},
                    {Header: "Seats", accessor: 'seats', Cell: this.renderEditable.bind(this)},
                    {Header: "Block", accessor: 'time', Cell: this.renderEditable.bind(this)},
                    {Header: "Room", accessor: 'room', Cell: this.renderEditable.bind(this)},
                    {Header: "Teacher", Cell: this.renderTeacher.bind(this)}, 
                    {Header: "", Cell: this.renderDelete.bind(this)}]}></ReactTableResize></div>
    }
}

export default Announcer;