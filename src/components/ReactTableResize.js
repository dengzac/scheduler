import React from "react";

import ReactTable from "react-table";

class ReactTableResize extends React.Component {
	constructor(props){
		console.log("Constructor")
		super(props)
		this.handleResize = this.handleResize.bind(this);
		this.getDefaultState = this.getDefaultState.bind(this);
		this.getResizeState = this.getResizeState.bind(this);
	}


	handleResize(resizedState){
		console.log("Resized " + JSON.stringify(resizedState));
		localStorage.setItem("resizeState" + this.props.saveName, JSON.stringify(resizedState));
		this.forceUpdate();
	}
	getDefaultState(){
		var state = [];
		this.props.columns.forEach(column => {
			if (column.width){
				state.push({id: column.accessor, value: column.width});
			}
		})
		return state;
	}
	getResizeState(){
		var state = localStorage.getItem("resizeState" + this.props.saveName);
		if (state){
			state = JSON.parse(state);
		}
		else {
			state = this.getDefaultState();
		}
		console.log("Loaded state " + JSON.stringify(state));
		return state;
	}
	render(){
		const {saveName, ...rest} = this.props;
		console.log(rest)
		return <ReactTable resized={this.getResizeState()} onResizedChange={this.handleResize} {...rest} />
	}
}

export default ReactTableResize;