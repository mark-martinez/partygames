import React, { Component } from 'react';

export default class RoomSelector extends Component {
    constructor() {
        super();
        this.state = {
            userName: "Username",
            roomInputVisible: false,
            roomCode: "000"
        }
        this.handleCreate = this.handleCreate.bind(this);
        this.handleJoin = this.handleJoin.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleCreate() {
        this.props.onCreate(this.state);
    }

    handleJoin(e) {
        if ((this.state.roomInputVisible === true) && (this.state.roomCode !== "000")) {
            e.preventDefault();
            //text validate
            this.props.onSubmit(this.state);
        } else {
            this.setState({ roomInputVisible: !this.state.roomInputVisible });
        }
    }

    handleChange(e) {
        if (e.target.type === "text") {
            this.setState({ userName: e.target.value })
        }
        if (e.target.type === "number") {
            if (e.target.value === "") {
                this.setState({
                    roomCode: "000"
                });
            } else {
                this.setState({
                    roomCode: e.target.value
                });
            }
        }
    }

    render() {
        return (
            <div className="component-roomselector">
                <form onSubmit={this.handleJoin}>
                    <input type="text" ref={(ref) => this.code = ref} maxLength="10" name="input-name" onChange={this.handleChange} placeholder={this.state.userName}/>
                </form>
                <button onClick={this.handleCreate}>Create</button><br/>
                <button onClick={this.handleJoin}>Join</button>
                {
                    this.state.roomInputVisible 
                    ?   <form onSubmit={this.handleJoin}>
                            <input type="number" ref={(ref) => this.code = ref} maxLength="3" name="input-room" onChange={this.handleChange} placeholder={this.state.roomCode}/>
                        </form>
                    : null
                }
            </div>
        );
    }
}