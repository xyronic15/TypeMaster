import React, { useContext, useEffect, useState } from "react";
import { getQuote } from "../../utils";
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { Button } from '../../components'
import "./Home.css"
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion"

// Home page that acts as a landing page for the user
export default function Home(props) {

  // typewriter text
  const [text] = useTypewriter({
    words: ['Welcome to ', 'Click the button below to begin!'],
    loop: {},
    typeSpeed: 120,
    deleteSpeed: 80,
    delaySpeed: 2000,
  })

  // quote state val for retrieved quote from API URL
  let [quote, setQuote] = useState("")

  useEffect(() => {
    if (Object.keys(quote).length === 0) {
      getQuote().then(({ data, response }) => {
        if (response.status === 200) {
          setQuote(data);
          console.log(data, response);
        }
      })
      // console.log(quote);
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
    >
      <Container className="d-flex flex-column justify-content-center align-items-center"
        style={{
          height: "95vh",
        }}
      >
        <Row className="mb-4">
          <Col className='d-flex justify-content-center'>
            <h1>
              <span>
                {text}
              </span>
              <span>
                <Cursor />
              </span>
            </h1>
          </Col>
        </Row>
        <Row className="my-4">
          <Col className='d-flex justify-content-center'>
            <img
              src={process.env.PUBLIC_URL + "/logos/tm_logo_main_primary.png"}
              alt="TypeMaster"
              id="main-logo"
            />
          </Col>
        </Row>
        <Row lg={2} className="w-50 my-4">
          <Col className='d-grid justify-content-center'>
            <Button href="/test" className="my-1" style={{
              width: "200px"
            }}
            >Take a Test</Button>
          </Col>
          <Col className='d-grid justify-content-center'>
            <Button href="/leaderboard" className="my-1" style={{
              width: "200px"
            }}
            >Leaderboard</Button>
          </Col>
        </Row>
      </Container>

      <div className="py-5"
        style={{
          backgroundColor: "#62677B",
          boxShadow: "0px -4px 4px rgba(0, 0, 0, 0.25)"
        }}
        id="home-quote"
      >
        <Container className="text-center" id="home-quote">
          <Row className='d-flex justify-content-center'>
            <p style={{
              fontStyle: "italic"
            }}>"{quote.text}"</p>
          </Row>
          <Row className='d-flex justify-content-center'>
            <p>- {quote.quotee ? quote.quotee : 'Unknown'}</p>
          </Row>
          <Row className='d-flex justify-content-center text-capitalize'>
            <p className="m-0">Themes</p>
            <p>{quote.tags}</p>
          </Row>
        </Container>
      </div>
    </motion.div>
  )
}
