import React, { Component } from "react";
import { Switch, Route, Link, } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";

import BoardModerator from "./components/board-moderator.component";


import { Nav, Navbar, NavDropdown } from "react-bootstrap";
/*
    ||-------------------------------------------------------------------------------------------------------------------||
    ||------------------------------------------ // H I V A T K O Z Á S O K \\ ------------------------------------------||
    ||-------------------------------------------------------------------------------------------------------------------||
*/


import Proba from './sajatosztalyok/Proba'

import Varoskeres from './sajatosztalyok/Varoskeres'
import Diagram_film from './sajatosztalyok/Diagram_film'
import Torles_erd from './sajatosztalyok/Torles_erd'
import Torles_orszag from './sajatosztalyok/Torles_orszag'
import Torles_nevezetessegek from './sajatosztalyok/Torles_nevezetessegek'
import KeresNevezetessegek from './sajatosztalyok/KeresNevezetessegek'
import KeresOrszag from "./sajatosztalyok/KeresOrszag";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      
      <div>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand as={Link} to="/">
    Záródoga
  </Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      
      
      <Nav.Link as={Link} to="/Proba">Próba</Nav.Link>

      {showAdminBoard && (
        <Nav.Link as={Link} to="/Diagram_film">Diagram film</Nav.Link>
      )}




{/* ||-----------------------------------------------------------------------------------------------------------||
    ||------------------------------------------ // T Ö R L É S E K \\ ------------------------------------------||
    ||-----------------------------------------------------------------------------------------------------------||


      {showAdminBoard && (
        <Nav.Link as={Link} to="/Torles_erd">Törlés erd</Nav.Link>
      )}

      {showAdminBoard && (
        <Nav.Link as={Link} to="/Torles_orszag">Törlés orszag</Nav.Link>
      )}

      {showAdminBoard && (
        <Nav.Link as={Link} to="/Torles_nevezetessegek">Törlés nev</Nav.Link>
      )}
*/}

{/*
    ||-------------------------------------------------------------------------------------------------------------||
    ||------------------------------------------ // K E R E S É S E K \\ ------------------------------------------||
    ||-------------------------------------------------------------------------------------------------------------||
*/} 
    {showAdminBoard && (
        <NavDropdown title="Keresések" id="collasible-nav-dropdown">

        <NavDropdown.Item href="/Varoskeres">
          Városok keresése
          </NavDropdown.Item>

        <NavDropdown.Item href="/KeresNevezetessegek">
          Nevezetességek keresése
        </NavDropdown.Item>
        
        <NavDropdown.Item href="/KeresOrszag">
          Országok keresése
        </NavDropdown.Item>
      </NavDropdown>
      )}
      


      



{/*
    ||---------------------------------------------------------------------------------------------------------||
    ||------------------------------------------ // A  D  M  I  N \\ ------------------------------------------||
    ||---------------------------------------------------------------------------------------------------------||
*/} 
      



{/*
    ||---------------------------------------------------------------------------------------------------------||
    ||------------------------------------------ // F  Ő  N  Ö  K \\ ------------------------------------------||
    ||---------------------------------------------------------------------------------------------------------||
*/}
      



{/*
    ||-------------------------------------------------------------------------------------------------------------------||
    ||------------------------------------------ // N A V   T Ö R L É S E K \\ ------------------------------------------||
    ||-------------------------------------------------------------------------------------------------------------------||
*/}
        {showAdminBoard && (
        <NavDropdown title="Törlések" id="collasible-nav-dropdown">

        <NavDropdown.Item href="/Torles_erd">
          Érdekességek törlése
          </NavDropdown.Item>

        <NavDropdown.Item href="/Torles_nevezetessegek">
          Nevezetességek törlése
        </NavDropdown.Item>
        
        <NavDropdown.Item href="/Torles_orszag">
          Országok törlés
        </NavDropdown.Item>
      </NavDropdown>
      )}
      




    </Nav>
    <Nav>
      {currentUser ? (
        <div className="navbar-nav ml-auto">
          <Nav.Link as={Link} to="/profile">
            {currentUser.username}
          </Nav.Link>
          <Nav.Link href="/login" onClick={this.logOut}>
            LogOut
          </Nav.Link>
        </div>
      ) : (
        <div className="navbar-nav ml-auto">
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
          <Nav.Link as={Link} to="/register">Sign Up</Nav.Link>
        </div>
      )}
      
    </Nav>
  </Navbar.Collapse>
</Navbar>

        
        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            
            <Route path="/mod" component={BoardModerator} />
           
            
            
            <Route path="/Proba" component={Proba} />
            
            <Route path="/Varoskeres" component={Varoskeres} />
            <Route path="/Diagram_film" component={Diagram_film} />
            <Route path="/Torles_erd" component={Torles_erd} />
            <Route path="/Torles_orszag" component={Torles_orszag} />
            <Route path="/Torles_nevezetessegek" component={Torles_nevezetessegek} />
            <Route path="/KeresNevezetessegek" component={KeresNevezetessegek} />
            <Route path="/KeresOrszag" component={KeresOrszag} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
