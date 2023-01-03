import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import banner1 from '../images/banner-1.jpg'
import banner2 from '../images/banner-2.jpg'
import banner3 from '../images/banner-3.jpg'
import * as styles from "../styles/index.module.css"

// encourage peer-to-peer recognition
//Share Your Appreciation 

function Banner() {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className={styles.banner}
                    src={banner1}
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>Encourage Peer-to-Peer Recognition</h3>
                    {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className={styles.banner}
                    src={banner2}
                    alt="Second slide"
                />

                <Carousel.Caption>
                    <h3>Share Your Appreciation</h3>
                    {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className={styles.banner}
                    src={banner3}
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3>Celebrate Your Team Achievement</h3>
                    {/* <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> */}
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default Banner;