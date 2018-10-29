import React from "react";
import Select from "react-select";

class BlockOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = { course: props.defaultValue ? props.defaultValue.value : undefined, selected: props.defaultValue, room: this.props.block ? this.props.block.room : 0, seats: this.props.block ? this.props.block.seats : 0 };

    this.onChange = this.onChange.bind(this);
    //console.log("Blockoptions "+ JSON.stringify(this.props.block))
    //console.log(this.state.course)
  }

  onChange(){
    //console.log("Onchange " +JSON.stringify( this.state.selected )+ this.state.course)
    this.props.onBlockChange(
      this.props.cellInfo,
      this.state.course,
      this.props.block ? this.props.block.id : undefined,
      this.state.room,
      this.state.seats);
  }
  // static getDerivedStateFromProps(props, current_state){
  //   if (props.defaultValue && current_state.course != props.defaultValue.value){
  //       console.log("Update state" , props)
  //       return {
  //         course: props.defaultValue.value,
  //         selected: props.defaultValue
  //       }

  //   }
  //   else 
  //     return null;
  // }
  render() {
    if (this.props.defaultValue){console.log("Render block" , this.props.defaultValue)} else console.log('no value')
    return (
      <div style={{backgroundColor: this.props.defaultValue ? "#" + this.props.courses.filter(o => {return o.id==this.props.defaultValue.value})[0].color : "", padding: '10px'}}>
        <Select
          isClearable={true}
          defaultValue={this.props.block ? this.props.defaultValue : null}
          value={this.props.block ? this.props.defaultValue : null}
          options={this.props.items}
          onChange={e => {
            //console.log(e.value);
            //console.log(this.props.courses.filter(o => {o.id==e.value}));
            this.setState({course: e ? e.value : null,
             selected: e,
              seats: e ? this.props.courses.filter(o => {return o.id==e.value})[0].seatsPerSection : 0},
               this.onChange)}}
           /* this.props.onBlockChange(
              this.props.cellInfo,
              e,
              this.props.block ? this.props.block.id : undefined
            );
          }}*/
        />
        {this.props.block ? (
          <div>
            <input
              size="5"
              placeholder="Room"
              value={this.state.room}
              onChange={e => this.setState({ room: e.target.value }, this.onChange)}
            />
            &nbsp;
            <input
              size="4"
              placeholder="Seats"
              value={this.state.seats}
              onChange={e =>
               { this.setState({
                  seats: e.target.value
                }, this.onChange)}
              }
            />
          </div>
        ) : null}
      </div>
    );
  }
}
export default BlockOptions;
