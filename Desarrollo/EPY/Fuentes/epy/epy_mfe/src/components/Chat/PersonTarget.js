import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

var csrfCookie = Cookies.get('csrftoken');


export class PersonTarget extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    aceptarChat = (event) => {
        // console.log("Has aceptado el chat!");
        if(this.props.prueba){
            window.location.replace(`/epychat/${this.props.sessionKey}`)
        } else {
            window.location.replace('https://mpago.la/25hXPig');
        }
    }

    rechazarChat = (event) => {
        // console.log("Has rechazado el chat!");
        if(this.props.prueba){
            return
        } else {
            axios.delete(`api/crear-sesion/${this.props.id}`,{
                headers: {
                    'X-CSRFTOKEN': csrfCookie,
                }
            })
            .then(res => {
                window.location.reload();
            });
        }
    }

    render() {
        return (
            <li
                className="person"
                data-chat={this.props.dataperson}
            >
                <div className="user">
                    <img src={this.props.img} />
                    <span className={this.props.status} />
                </div>
                <p className="name-time">
                    <span className="name">{this.props.name}</span>
                    {" - "}
                    <span className="time">{this.props.time}</span>
                </p>
                <button
                    className="col btn btn-primary btn-sm"
                    onClick={this.aceptarChat}
                >Aceptar</button>
                <button
                    className="col btn btn-danger btn-sm"
                    onClick={this.rechazarChat}
                >Rechazar</button>
            </li>
        )
    }
}

export default PersonTarget
