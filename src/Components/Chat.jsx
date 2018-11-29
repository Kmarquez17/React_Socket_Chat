import React from "react";
import io from "socket.io-client";
import { Col, Row, Grid, FormControl, ControlLabel, Panel, Alert } from 'react-bootstrap'
import Messages from './Messages'
import Form from './Form'
class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            usuario: '',
            msj: '',
            mensajes: [],
            estado: false,
            show: false
        };
    }
    //Cada vez que hay un cambio en el comoponente
    componentDidMount = () => {
        //Conectamos con el puerto que estamos corriendo en el servidor
        this.socket = io('localhost:5000');
        //Recibimos el mesensaje
        this.socket.on('RECEIVE_MESSAGE', (data) => {
            this.setState({ mensajes: [...this.state.mensajes, data] });
        });
    }

    //Funcion enviar el mensaje por la tecla enter
    onEnviarMsjEnter = (ev) => {
        ev.preventDefault();
        //Enviamos el mensaje y se valida que tanto el campo de mensaje, usuario y la evento enter
        if (ev.keyCode === 13 && (this.state.msj !== '' && this.state.usuario !== '')) {
            //Enviamos el mensaje
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.usuario,
                message: this.state.msj
            })
            this.setState({ msj: '', estado: true });
        }
    }

    //Funcion enviar el mensaje por el boton
    onEnviarMsjBoton = (ev) => {
        ev.preventDefault();
        //Enviamos el mensaje y se valida que tanto el campo de mensaje y usuario en con datos
        if (this.state.msj !== '' && this.state.usuario !== '') {
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.usuario,
                message: this.state.msj
            })
            this.setState({ msj: '', estado: true });
        } else {
            if (this.state.usuario.length > 0) {
                this.setState({ show: false });
            } else {
                this.setState({ show: true });
            }

        }
    }

    onChangeValue = (ev) => {
        ev.preventDefault();
        this.setState({ msj: ev.target.value })
    }

    handleShow = () => {
        this.setState({ show: false });
    }

    render() {
        if (this.state.show && !this.state.estado) {
            return (
                <Grid>
                    <Col xs={12} md={6} xsOffset={3}>
                        <Alert bsStyle="warning" onDismiss={this.handleShow} >
                            <strong>Verificar si usted ingreso un Usuario</strong>
                        </Alert>
                    </Col>
                </Grid>
            )
        }
        return (

            <Grid>
                <ControlLabel>Usuario</ControlLabel>
                <Row>
                    <Col xs={12} md={3}>
                        <FormControl
                            type="text"
                            placeholder="Usuario"
                            value={this.state.usuario}
                            onChange={ev => this.setState({ usuario: ev.target.value })}
                            disabled={this.state.estado}
                            className="form-control"
                        />
                    </Col>
                </Row>
                <hr />

                <div>
                    <Panel bsStyle="primary">
                        <Panel.Heading>
                            <Panel.Title>
                                {/* <Button>
                                    <Glyphicon glyph="glyphicon glyphicon-comment" />
                                </Button> */}
                                Chat React y Socket
                            </Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
                            <Messages mensajes={this.state.mensajes} />
                            <hr />
                            <Form
                                msj={this.state.msj}
                                onEnviarMsjEnter={this.onEnviarMsjEnter}
                                onEnviarMsjBoton={this.onEnviarMsjBoton}
                                onChangeValue={this.onChangeValue}
                            />
                        </Panel.Body>
                    </Panel>
                </div>
            </Grid>
        );
    }
}

export default Chat;