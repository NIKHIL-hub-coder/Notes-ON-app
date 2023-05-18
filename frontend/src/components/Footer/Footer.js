import React from 'react'
import { Col, Row, Container } from 'react-bootstrap'

const footer = () => {
    return (
        <footer style={{
            width: "100%",
            position: "relative",
            bottom: 0,
            display: "flex",
            justifyContent: "center"
        }}>
            <Container>
                <Row>
                    <Col className='text-center py-3'>Copyright &copy; Note Zipper</Col>
                </Row>
            </Container>
        </footer>
    )
}

export default footer