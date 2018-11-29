import React from 'react';
import { Button, Col, Row, Grid,FormControl} from 'react-bootstrap'

function Form(props) {
    return (
        <Grid>
            <Row>
                <Col xs={12} md={9}>
                    <FormControl
                        onKeyUp={props.onEnviarMsjEnter}
                        type="text"
                        placeholder="Enviar Mensaje"
                        className="form-control"
                        value={props.msj}
                        onChange={props.onChangeValue}
                        
                    />
                </Col>
                <Col xs={12} md={2}>
                    <Button onClick={props.onEnviarMsjBoton} className="btn btn-primary form-control">Enviar</Button>
                </Col>
            </Row>
        </Grid>
    )
}


export default Form