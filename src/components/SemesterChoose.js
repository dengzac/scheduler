import React from 'react'

class SemesterChoose extends React.Component {
	constructor(props){
		super(props);
		this.state = {semester: 3};
	}

	render(){
		return (<div>
		Fall: <input type="checkbox" checked={Math.floor(this.state.semester % 2)==1} onChange={() => {console.log(this.state.semester);this.setState({semester: this.state.semester ^ 1}, () => this.props.updateSemester(this.state.semester))}} />
		&nbsp; Spring:<input type="checkbox" checked={Math.floor(this.state.semester /2)%2==1} onChange={() => {console.log(this.state.semester);this.setState({semester: this.state.semester ^ 2}, () => this.props.updateSemester(this.state.semester))}} />
		</div>
		);
	}
}

export default SemesterChoose;