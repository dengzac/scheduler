import React from 'react';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';
class ColorPicker extends React.Component {
	static getDerivedStateFromProps(props, current_state){
		//debugger;
		var hexToRgb = (hex) => {
			var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec('#' + hex);
		    return result ? {
		        r: parseInt(result[1], 16),
		        g: parseInt(result[2], 16),
		        b: parseInt(result[3], 16)
		    } : null;
		}
		if (current_state.color !== props.color){
			return {
				color: {
					...hexToRgb(props.color),
					a: '255'
				}
			}
		}
		return null;
	}
	constructor(props){
		super(props)
		this.state = {
			display: false,
			color: {
				...this.hexToRgb(this.props.color),
				a: '255'
			}
		};
		this.toHex = this.toHex.bind(this);
		this.hexToRgb= this.hexToRgb.bind(this)
	}
	handleClick = () => {
		this.setState({display: !this.state.display});
	};
	handleClose = () => {
		this.setState({display: false});
	};
	handleChange = (color) => {
		this.setState({color: color.rgb}, () => this.props.onchange(this.toHex(color.rgb.r) + this.toHex(color.rgb.g) + this.toHex(color.rgb.b)));
	}
	toHex = (rgb) => {
		var hex = Number(rgb).toString(16);
		if (hex.length < 2){
			hex= "0" + hex;
		}
		return hex;
	}
	hexToRgb = (hex) => {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec('#' + hex);
	    return result ? {
	        r: parseInt(result[1], 16),
	        g: parseInt(result[2], 16),
	        b: parseInt(result[3], 16)
	    } : null;
	}
	render(){
		console.log("Render color")
		const styles = reactCSS({

				'default': {
				  color: {
				    width: '36px',
				    height: '14px',
				    borderRadius: '2px',
				    background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
				  },
				  swatch: {
				    padding: '5px',
				    background: '#fff',
				    borderRadius: '1px',
				    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
				    display: 'inline-block',
				    cursor: 'pointer',
				  },
				  popover: {
				    position: 'absolute',
				    zIndex: '2',
				  },
				  cover: {
				    position: 'fixed',
				    top: '0px',
				    right: '0px',
				    bottom: '0px',
				    left: '0px',
				  }
			}
		});
		return (
			<div>
			<div style={styles.swatch} onClick={this.handleClick}>
				<div style={styles.color} />
				</div>
				{ this.state.display ? <div style={styles.popover}>
				<div style={styles.cover} onClick={this.handleClose}/>
				<SketchPicker color={this.state.color} onChange = {this.handleChange} />
				</div>
				:null}
				</div>
			)
	}
}
export default ColorPicker;