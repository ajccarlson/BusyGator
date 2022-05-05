/*
 * FILE: MyPage.js
 *
 * AUTHOR(S): Siqi Guo, Vishal Ramanand Sharma, Abdullah Sharaf,
 * Samantha Saxton-Getty, Elyssa Mari Tapawan
 *
 * PURPOSE: This file contains future My Page implementation.
 */

import React from 'react';
import { Card, Tab, Row, Col, Nav } from 'react-bootstrap';

const MyPage = () => {
  return (
    <>
      <Card id="welcomeCard">
        <Card.Header>Welcome </Card.Header>
        <Tab.Container id="tabCont">
          <Row>
            <Col sm={4}>
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
            <Col sm={4}>
              <Tab.Content>
                <Tab.Pane eventKey="msgs">My messages will go here!</Tab.Pane>
                <Tab.Pane eventKey="posts">My posts will go here!</Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Card>
    </>
  );
};

export default MyPage;
