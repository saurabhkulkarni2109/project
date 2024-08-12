import { faClock, faCocktail, faParking, faSnowflake, faTshirt, faUtensils, faWifi } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { Container } from 'react-bootstrap'
import RoomCard from '../rooms/RoomCard'

const HotelService = () => {
  return (
    <>
    <Container className='mb-2'>
        <Header title={"Our Services"}/>
        <Row>
            <h4 className='text-center'>
                Services at <span className='hotel-color'>lakeside - </span> Hotel
                <span className='gap-2'>
                <FontAwesomeIcon icon={faClock} /> - 24-Hours Front Desk</span>
            </h4>
        </Row>
        <hr/>

        <Row xs={1} md={2} lg={3} className="g-4 mt-2">
            <Col>
            <Card>
                <Card.Body>
                    <Card.Title>
                    <FontAwesomeIcon icon={faWifi} /> WiFi
                    </Card.Title>
                    <Card.Text>Stay connected with high speed internet access.</Card.Text>
                </Card.Body>
            </Card>
            </Col>

            <Col>
            <Card>
                <Card.Body>
                    <Card.Title>
                    <FontAwesomeIcon icon={faUtensils} /> Breakfast
                    </Card.Title>
                    <Card.Text>Start your day with delicios breakfast buffet.</Card.Text>
                </Card.Body>
            </Card>
            </Col>

            <Col>
            <Card>
                <Card.Body>
                    <Card.Title>
                    <FontAwesomeIcon icon={faTshirt} /> Laundry
                    </Card.Title>
                    <Card.Text>Keep your clothes clean and fresh with our laundry service.</Card.Text>
                </Card.Body>
            </Card>
            </Col>

            <Col>
            <Card>
                <Card.Body>
                    <Card.Title>
                    <FontAwesomeIcon icon={faCocktail} /> Mini-bar
                    </Card.Title>
                    <Card.Text>Enjoy a refreshing drink or snack from our in-room mini-bar.</Card.Text>
                </Card.Body>
            </Card>
            </Col>

            <Col>
            <Card>
                <Card.Body>
                    <Card.Title>
                    <FontAwesomeIcon icon={faParking} /> Parking
                    </Card.Title>
                    <Card.Text>Park your car conveniently in our on-site parking lot.</Card.Text>
                </Card.Body>
            </Card>
            </Col>

            <Col>
            <Card>
                <Card.Body>
                    <Card.Title>
                    <FontAwesomeIcon icon={faSnowflake} /> Air conditioning
                    </Card.Title>
                    <Card.Text>Stay cool and comfortable with our air conditioning system.</Card.Text>
                </Card.Body>
            </Card>
            </Col>
        </Row>
    </Container>
    </>
  )
}

export default HotelService