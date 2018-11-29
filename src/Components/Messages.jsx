import React from 'react'
import { Col, Row } from 'react-bootstrap'

function Messages(props) {
    return (
        <div id="messages">
            <Row>
                <Col xs={12} md={12} >
                    <div className="messages">
                        {props.mensajes.map((message, index) => {
                            return (
                                <div key={index}><strong>{message.author}:</strong>{message.message}</div>
                            )
                        })}
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default Messages