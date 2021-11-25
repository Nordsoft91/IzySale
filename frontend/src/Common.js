
import { Button, Row, Col, Form, Alert } from 'react-bootstrap';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';

export function ErrorAlert({error}) {
    if (error !== '')
    {
        return  (
            <Alert variant="danger">
                {error}
            </Alert>
        );
    }
    return null;
}

export function BarcodeForm({ onSubmitBarcode }) {
    function handleSubmit(event) {
        event.preventDefault()
        onSubmitBarcode(event.currentTarget.elements.barcodeInput.value)
        event.currentTarget.elements.barcodeInput.value = ''
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col>
                    <Form.Control id="barcodeInput" placeholder="Barcode" />
                </Col>
                <Col>
                    <Button type="submit">Submit</Button>
                </Col>
            </Row>
        </Form>
    )
}