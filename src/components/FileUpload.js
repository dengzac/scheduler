import React from 'react';
import axios from "axios";
import {NotificationContainer, NotificationManager} from 'react-notifications';

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
		axios.post(this.props.url, data).then(() => new Promise(resolve => setTimeout(resolve, 500))).then ((res) => {console.log("done"); this.props.ondone();NotificationManager.success("Imported successfully", "Success")})
	}
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