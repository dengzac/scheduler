import React from 'react';
import axios from "axios";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
class FileUpload extends React.Component {
	constructor(){
		super();

		this.sendFile = this.sendFile.bind(this)
	}
	sendFile(event){
		event.preventDefault();
		const data = new FormData();
		data.append('file', this.uploadInput.files[0]);
		data.append('filename', "test");
		axios.post(this.props.url, data).then((res) => {
			console.log(res);
			if (res.data.length > 0){
				confirmAlert({
					title: "Duplicates found",
					message: "The following class codes already exist: " + JSON.stringify(res.data.map(o => o[0])) + "\nSkip or overwrite?",
					buttons: [{label: 'Overwrite',
							onClick: () => {console.log("Confirm");axios.post(this.props.url + "_overwrite", res.data).then((res) => {return new Promise(resolve => setTimeout(resolve, 500)).then(res => { this.props.ondone();NotificationManager.success("Imported successfully", "Success")})})}
						},
						{
						label: "Skip",
						onClick: () => {return new Promise(resolve => setTimeout(resolve, 500)).then(res => { this.props.ondone();NotificationManager.success("Imported successfully", "Success")});}
					}]
				});
			}
			else{
				return new Promise(resolve => setTimeout(resolve, 500)).then(res => { this.props.ondone();NotificationManager.success("Imported successfully", "Success")});
			}
	});}
	render(){
		return (
			<form onSubmit={this.sendFile}>
				<input ref={(ref) => {this.uploadInput = ref;}} type="file" id="filebox" />
				<input type="submit" value="Upload File" />
				</form>
			)
	}
}

export default FileUpload;