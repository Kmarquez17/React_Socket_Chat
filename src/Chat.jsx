import React from "react";
import io from "socket.io-client";
import {Button} from 'react-bootstrap'

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nombre: '',
            msj: '',
            mensajes: []
        };
    }

    componentDidMount = () => {
        //Conectamos con el puerto que estamos corriendo en el servidor
        this.socket = io('localhost:5000');
        //Recibimos el mesensaje
        this.socket.on('RECEIVE_MESSAGE', (data) => {
            this.setState({ mensajes: [...this.state.mensajes, data] });
        });
    }
    
    onEnviarMsj = (ev) => {
        ev.preventDefault();
        if (ev.keyCode === 13 && (this.state.msj !== '' && this.state.nombre !== '')) {
            //Enviamos el mensaje
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.nombre,
                message: this.state.msj
            })
            this.setState({ msj: '' });
        }
    }

    onChangeValue = (ev) =>{
        ev.preventDefault();
        this.setState({ username: ev.target.value })
    }


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">Global Chat</div>
                                <hr />
                                <div className="messages">
                                    {this.state.mensajes.map((message,index) => {
                                        return (
                                            <div key={index}>{message.author}: {message.message}</div>
                                        )
                                    })}
                                </div>

                            </div>
                            <div className="card-footer">
                                <input type="text" placeholder="Nombre" value={this.state.nombre} onChange={ev => this.setState({ nombre: ev.target.value })} className="form-control" />
                                <br />
                                <input onKeyUp={this.onEnviarMsj} type="text" placeholder="Enviar Mensaje" className="form-control" value={this.state.msj} onChange={ev => this.setState({ msj: ev.target.value })} />
                                <br />
                                <Button onClick={this.onEnviarMsj} className="btn btn-primary form-control">Send</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;