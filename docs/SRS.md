# NITCONF - SE LAB MODULE 1 

# Software Requirements Specification

Table of Contents
=================
  * [Introduction](#1-introduction)
    * 1.1 [Purpose](#11-purpose)
    * 1.2 [Document Conventions](#12-document-conventions)
    * 1.3 [Intended Audience and Reading Suggestions](#13-intended-audience-and-reading-suggestions)
    * 1.4 [Product Scope](#14-product-scope)
    * 1.5 [References](#15-references)
  * [Overall Description](#overall-description)
    * 2.1 [Product Perspective](#21-product-perspective)
    * 2.2 [Product Functions](#22-product-functions)
    * 2.3 [User Classes and Characteristics](#23-user-classes-and-characteristics)
    * 2.4 [Operating Environment](#24-operating-environment)
    * 2.5 [Design and Implementation Constraints](#25-design-and-implementation-constraints)
    * 2.6 [User Documentation](#26-user-documentation)
    * 2.7 [Assumptions and Dependencies](#27-assumptions-and-dependencies)
  * [External Interface Requirements](#external-interface-requirements)
    * 3.1 [User Interfaces](#31-user-interfaces)
    * 3.2 [Hardware Interfaces](#32-hardware-interfaces)
    * 3.3 [Software Interfaces](#33-software-interfaces)
    * 3.4 [Communications Interfaces](#34-communications-interfaces)
  * [System Features](#system-features)
    * 4.1 [Authentication](#41-authentication)
        * 4.1.1 [Register](#421-register)
        * 4.1.2 [Login](#422-login)
    * 4.2 [Dashboard](#42-dashboard)
        * 4.2.1 [Get Profile](#421-get-profile)
        * 4.2.2 [Update Profile](#422-update-profile)
        * 4.2.3 [Get All sessions](#423-get-all-sessions)
        * 4.2.4 [Get Session by ID](#424-get-session-by-id)
        * 4.2.5 [Create new session](#425-create-new-session)
        * 4.2.6 [Update Session](#426-update-session)
        * 4.2.7 [Get latest Abstract](#427-get-latest-abstract)
        * 4.2.8 [Update Abstract](#428-update-abstract)
  * [Other Nonfunctional Requirements](#other-nonfunctional-requirements)
    * 5.1 [Performance Requirements](#51-performance-requirements)
    * 5.2 [Safety & Security Requirements](#52-safety-and-security-requirements)
    * 5.3 [Software Quality Attributes](#53-software-quality-attributes)
        * 5.3.1 [Reliability](#531-reliability)
        * 5.3.2 [Adaptability](#532-adaptability)
        * 5.3.3 [Maintainability](#533-maintainability)
        * 5.3.4 [Portability](#534-portability)
        * 5.3.5 [Cost Effectiveness](#535-cost-effectiveness)

## 1. Introduction
### 1.1 Purpose 
The purpose of this document is to specify the requirements for the NITCONF Conference Website, specifically focusing on the functionality related to speaker login and submit abstracts.

### 1.2 Intended Audience and Reading Suggestions
This document is intended for speakers and the administrators responsible for managing the CFP (Call for papers) process and also to provide the developers with clear guidelines for the application.

### 1.3 Product Scope
This section outlines the features related to the CFP (Call for papers) process, where users can login and submit abstracts for review.

### 1.4 References
* [Spring Boot Documentation](https://spring.io/)

## Overall Description
### 2.1 Product Perspective
The NITCONF website is an integral part of the NITCONF conference management system. It serves as a platform for authors to submit papers for evaluation. The product is a self-contained system designed specifically for handling the submission and review process of conference papers. It does not replace any existing systems but rather enhances the efficiency of the conference management process.

The major components of the overall system include the Author Module (Module 1), Reviewer Module (Module 2), Program Committee Module (Module 3), and the Notification System. The interaction between these modules will be facilitated through well-defined interfaces.

![](./flowchart.png)

### 2.2 Product Functions
* User registration and login functionality for authors.
* Submission of abstracts (papers in PDF format) by registered authors.
* Deadline enforcement to restrict abstract submission after the specified date.
### 2.3 User Classes and Characteristics
1. Authors: Users who submit papers for evaluation.
    * Characteristics:
    Authors may vary in technical expertise.
    All authors must register and log in to the system.
    The primary interaction for authors involves submitting abstracts.
### 2.4 Operating Environment
The software will operate in a web-based environment.

* Hardware Platform:
The system should be compatible with standard web browsers on various devices.
* Operating System:
Compatible with major operating systems like Windows, macOS, Android, iOS and Linux.
* Software Components:
The system should coexist peacefully with common web technologies (e.g., Apache Tomcat).
### 2.5 Design and Implementation Constraints
* Development must adhere to the Spring Boot framework using Java.
* The system must comply with corporate policies regarding data security and privacy.
* Utilization of specific technologies, such as Spring Security for authentication.
### 2.6 User Documentation
User documentation components will include:

* User manuals for authors.
* On-line help resources.
* Tutorials guiding authors through the submission process.
### 2.7 Assumptions and Dependencies
1. Assumptions:
    * Authors have access to a device with internet connectivity for submission.
    * Users will follow the registration and submission guidelines provided.
2. Dependencies:
    * Dependency on external libraries and frameworks compatible with Spring Boot.
    * Integration with a notification system for sending alerts to authors.
## External Interface Requirements
### 3.1 User Interfaces
1. Logical Characteristics:
The user interface for the NITCONF website's Author Module will be a web-based application accessible through standard web browsers. Key elements of the user interface include:
    * User Registration and Login Screens: Simple forms for user registration and login.
    * Dashboard: A personalized dashboard displaying submission status, deadlines, and other relevant information.
    * Abstract Submission Form: An intuitive form for authors to submit papers in PDF format.
    * Deadline Notification: Clear notification regarding the submission deadline.
2. GUI Standards and Constraints:
    * The user interface will follow standard web design principles.
    * GUI will be responsive, adapting to different screen sizes.
    * Submission forms will enforce PDF format for paper submissions.
### 3.2 Hardware Interfaces
The NITCONF website will interact with standard hardware components, ensuring compatibility with various devices. Key hardware interfaces include:
* Supported Devices: The system should be compatible with desktops, laptops, tablets, and smartphones.
* Internet Connectivity: Authors require internet access for registration and paper submission.

### 3.3 Software Interfaces
Connections with Other Software Components:
The NITCONF website will interface with specific software components, ensuring seamless integration and data exchange.
* Database: Interaction with a relational database system for storing user data and submitted papers.
* Spring Boot Framework: Utilization of the Spring Boot framework for Java-based application development.
* Spring Security: Integration for secure user authentication and authorization.
* User Registration Data: Transfer of user registration information to the database.
* Submitted Papers: Storage of papers in PDF format in the database.
Communication Nature:
* REST APIs: Communication between frontend and backend components through RESTful APIs.
* Data Encryption: Use of HTTPS for secure data transfer.
### 3.4 Communications Interfaces
#### Communication Functions:
The NITCONF website requires specific communication functions to facilitate its operation.

1. Email Notifications: Notifications are sent via email for the following:
  * Registration confirmation
  * Deadline Reminders
  * Notifying user when their session is reviewd by assigned reviewer
  * Notifying reviewer when assigner user submits a paper for review

2. Web Browser Communications: Interaction with web browsers for user access and data submission.
#### Communication Standards:
* SMTP Protocol: For sending email notifications.
* HTTP/HTTPS Protocols: For web browser communications.
* Data Transfer Rates: Standard internet data transfer rates.
#### Security and Encryption:
* HTTPS: Ensuring secure communication with encryption.
* Data Synchronization: Real-time synchronization for timely notifications.
## System Features
The following features are made available to the users (authors).

## Functional Requirements
### 4.1 Authentication

#### 4.1.1 Register
* Purpose: To create an account in NITCONF
* Input: First name, Last name, Email, Phone number, Password
* A new account is created for the user with the given email and password as login credentials if the email does not exist already in the database and valid inputs are given. Else appropriate error message is displayed.

#### 4.1.2 Login
* Purpose: To login in to the user account
* Input: Email, Password
* The user is logged into the account if the email and password entered are valid by providing a token.     Else appropriate error message is displayed.

### 4.2 Dashboard
The below functionalities require the user to be authenticated. Else an error message is displayed.

#### 4.2.1 Get Profile
* Purpose: To display the profile details to the user
* Input: Valid token
* The profile details of the user are displayed- First name, Last name, Email, Phone number

#### 4.2.2 Update Profile
* Purpose: To update the profile details of the user(First name, Last name, Phone number)
* Input: Valid token, updated user info
* The user profile details are updated in the database

#### 4.2.3 Get All sessions
* Purpose: To display all the sessions of the user
* Input: Valid token
* All sessions of the logged-in user are listed

#### 4.2.4 Get Session by ID
* Purpose: To display a specific session of the user
* Input: Valid token, session ID
* The details of the session with given ID

#### 4.2.5 Create new session
* Purpose: To create a new session for the user
* Input: Valid token, session title, session description, language, level, tags, abstract(PDF format)
* A new session is created for the logged-in user with the given session details, if valid. Else appropriate error message is displayed.


#### 4.2.6 Update session
* Purpose: To update the details of an existing session
* Input: Valid token, session ID, updated session details(session title, session description, language, level, tags)
* The session details are updated in the database for the session with inputted ID

#### 4.2.7 Get latest Abstract
* Purpose: To get the PDF of the latest submission of the user in the session
* Input: Valid token, session ID
* The latest submission made by logged-in user for the given session available in PDF format

#### 4.2.8 Update Abstract
* Purpose: To make a new submission in a particular session
* Input: Valid token, session ID, abstract PDF
* The PDF is added to the database and the version of latest submission updated


## Other Nonfunctional Requirements
### 5.1 Performance Requirements
To ensure optimal system performance, the NITCONF Conference Website must meet the following requirements:
* 1.Response time
* 2.Concurrent user handling
* 3.Scalability
* 4.Database performance
* 5.Network Latency
* 6.Reliability and uptime
* 7.Security of data

### 5.2 Safety and Security Requirements
The system ensures data security through a dedicated database. Regular users can view information but lack the authorization to make any changes. 

In terms of security, the system is meticulously designed to shield users from any potential harm. It employs strict access controls and user permissions, guaranteeing the safety and integrity of data. Users can interact with the system with confidence, as it effectively safeguards their information against any threats or unauthorized access.

### 5.3 Software Quality Attributes
#### 5.3.1 Reliability
* The system will not lag and will provide instant and accurate results to all the users.

#### 5.3.2 Adaptability
* The system is open source. The system can be extended to other organizations as well.

#### 5.3.3 Maintainability
* In case of errors, it can be rectified by any developer due to the ease of maintenance.

#### 5.3.4 Portability
* The system can be accessed on any smartphone or laptop.

#### 5.3.5 Cost-effectiveness
* This system is less in cost and bearable to any organization.








