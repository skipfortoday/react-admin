import { Col, Row,
    Label,
    Input,
} from 'reactstrap'

export const InputRenderComponent = ({
    input,
    type,
    placeholder,
    label,
    disabled,
    readOnly,
    meta: { touched, error, warning },
}) => (
    <Row>
        <Col md="12">
            <Label htmlFor="{input}" className="col-form-label">
                {label}
            </Label>
        </Col>
        <Col md="12">
            <Input
                {...input}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
            ></Input>
            {touched &&
                ((error && <p style={{ color: "brown" }}>{error}</p>) ||
                    (warning && <p style={{ color: "brown" }}>{warning}</p>))}
        </Col>
    </Row>
);