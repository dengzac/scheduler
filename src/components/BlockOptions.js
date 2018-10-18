import React from "react";
import Select from "react-select";

class BlockOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = { course: props.defaultValue ? props.defaultValue.value : undefined, room: this.props.block ? this.props.block.room : 0, seats: this.props.block ? this.props.block.seats : 0 };
    this.onChange = this.onChange.bind(this);
    console.log("Blockoptions "+ JSON.stringify(this.props.block))
    console.log(this.state.course)
  }

  onChange(){
    this.props.onBlockChange(
      this.props.cellInfo,
      this.state.course,
      this.props.block ? this.props.block.id : undefined,
      this.state.room,
      this.state.seats);
  }
  render() {
    return (
      <div>
        <Select
          isClearable={true}
          defaultValue={this.props.defaultValue}
          options={this.props.items}
          onChange={e => {debugger;console.log(e.value);console.log(this.props.courses.filter(o => {o.id==e.value}));this.setState({course: e ? e.value : undefined, seats: e ? this.props.courses.filter(o => {return o.id==e.value})[0].seatsPerSection : 0}, this.onChange)}}
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
               {debugger; this.setState({
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
