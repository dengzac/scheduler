import React from "react";
import Select from "react-select";

class BlockOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = { room: 0, seats: 0 };
    console.log("Blockoptions "+ JSON.stringify(this.props.block))
  }

  render() {
    return (
      <div>
        <Select
          isClearable={true}
          defaultValue={this.props.defaultValue}
          options={this.props.items}
          onChange={e => {
            this.props.onBlockChange(
              this.props.cellInfo,
              e,
              this.props.block ? this.props.block.id : undefined
            );
          }}
        />
        {this.props.block ? (
          <div>
            <input
              size="5"
              placeholder="Room"
              value={this.state.room}
              onChange={e => this.setState({ room: e.target.value })}
            />
            &nbsp;
            <input
              size="4"
              placeholder="Seats"
              value={this.state.seats}
              onChange={e =>
                this.setState({
                  seats: e.target.value
                })
              }
            />
          </div>
        ) : null}
      </div>
    );
  }
}
export default BlockOptions;
