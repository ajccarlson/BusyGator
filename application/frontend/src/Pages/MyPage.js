/*
 * FILE: MyPage.js
 * 
 * AUTHOR(S): Aaron Carlson, Siqi Guo, Janvi Patel, Vishal Ramanand Sharma,
 * Abdullah Sharaf, Samantha Saxton-Getty, Elyssa Mari Tapawan
 *
 * PURPOSE: This file contains the page for housing user messages
 * and listings.
 */

import React, { useEffect, useContext, useState } from 'react';
import {
  Card,
  Tab,
  Row,
  Col,
  Nav,
  Table,
  Button,
  Container,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import DataContext from '../DataContext/DataContext';
import { getAllMessages, getMessagesById } from '../services/messageService';

const MyPage = () => {
  const userInfo = useContext(DataContext)?.userInfo;
  const users = useContext(DataContext)?.users;
  const listings = useContext(DataContext)?.listings;
  const [userListings, setUserListings] = useState([]);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo.userId) {
      navigate('/Login');
    } else {
      getMessagesById(userInfo.userId).then((data) => {
        setMessages(data.data);
      });

      setUserListings(
        listings.filter((listing) => listing.seller_id === userInfo.userId)
      );
    }
  }, []);

  function getDateString(date) {
    return new Date(date).toLocaleString();
  }

  function getListingName(listingNumber) {
    return (
      listings.find((data) => data.product_id === listingNumber)?.title || null
    );
  }

  function getUserName(userId) {
    let firstName =
      users.find((data) => data.user_id === userId)?.first_name || '';
    let lastName =
      users.find((data) => data.user_id === userId)?.last_name || '';
    return firstName + ' ' + lastName;
  }

  return (
    <>
      <div className="setHeight">
        <Card id="welcomeCard">
          <Card.Header id="cardHeader" className="text-center">
            <h1>Welcome</h1>
          </Card.Header>
          <Tab.Container id="tabCont">
            <Row id="rowId">
              <Col sm={1.5}>
                <Nav className="tabs">
                  <Nav.Item>
                    <Nav.Link eventKey="msgs" className="myPageLink">
                      My Messages
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="posts" className="myPageLink">
                      My Posts
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={1.5} id="tabContent">
                <Tab.Content>
                  <Tab.Pane eventKey="msgs">
                    {messages.length > 0 ? (
                      messages.map((data, index) => (
                        <Card id="messageCard" key={`div_${index}`}>
                          <Container>
                            <Row id="msgRow">
                              <Col className="msgCol text-center">
                                {getDateString(data.date_created)}
                              </Col>
                              <Col className="msgCol text-center">
                                {getUserName(data.creator_id)}
                              </Col>
                              <Col className="msgCol text-center">⇢</Col>
                              <Col className="msgCol">
                                {getUserName(data.receiver_id)}
                              </Col>
                              <Col className="msgCol text-center">
                                {(getListingName(data.product) && (
                                  <Link to={`/Product/${data.product}`}>
                                    {getListingName(data.product)}
                                  </Link>
                                )) ||
                                  'Post waiting for approval'}
                              </Col>
                            </Row>
                          </Container>
                          <Card.Text id="messageText">
                            {data.message_body}
                          </Card.Text>
                        </Card>
                      ))
                    ) : (
                      <h4 className="p-4">No Messages</h4>
                    )}
                    {}
                  </Tab.Pane>
                  <Tab.Pane eventKey="posts">
                    {userListings.length > 0 ? (
                      <Table bordered id="postContent">
                        <thead>
                          <tr>
                            <th width="80%">Post</th>
                            <th width="20%"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {userListings.map((data, index) => (
                            <tr key={`div_${index}`}>
                              <td>
                                {getListingName(data.product_id) && (
                                  <Link to={`/Product/${data.product_id}`}>
                                    {getListingName(data.product_id)}
                                  </Link>
                                )}
                              </td>
                              <td>
                                <Button>Delete Post</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    ) : (
                      <h4 className="p-4">No Listings</h4>
                    )}
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Card>
      </div>
    </>
  );
};

export default MyPage;
