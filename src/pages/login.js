import React from "react"
import { Link, navigate } from "gatsby"
import { connect } from "react-redux"
import styled from "styled-components"

import CenteredMainLayout from '../components/layouts/centeredMainLayout'
import SEO from "../components/seo"

import { login } from "../state/actions"

// Styles

const StyledForm = styled.form`
  width: min-content;
  margin: 0 auto;
  border: 1px solid #bebebe;
  padding: 2rem;
  border-radius: 0.5rem;
  h2 {
    margin: 0 0 1rem 0;
  }
`

// Login Form (Displays if not logged in)

const loginFunction = loginDispatch => e => {
  e.preventDefault()
  const username = document.querySelector("#username").value
  if (!username) return
  loginDispatch(username)
  navigate("/")
}

const LoginForm = ({ loginDispatch }) => (
  <StyledForm onSubmit={loginFunction(loginDispatch)}>
    <h2>Log In</h2>
    <label htmlFor="username">Username</label>
    <input
      id="username"
      name="username"
      type="text"
      placeholder="User Name"
      required
    />
    <label htmlFor="password">Password</label>
    <input
      id="password"
      name="password"
      type="password"
      placeholder="Password"
      disabled
    />
    <input type="submit" value="Log In" />
  </StyledForm>
)

// Show one of two pages, depending on whether the user is logged in.

const LoggedInPage = ({ username }) => (
  <>
    <h2>You are logged in as {username}.</h2>
    <Link to="/">Return to main page.</Link>
  </>
)

const LoggedOutPage = ({ loginDispatch }) => (
  <LoginForm loginDispatch={loginDispatch} />
)

const LoginPage = ({ loggedIn, username, login }) => (
  <CenteredMainLayout>
    <SEO title="Login" />
      {loggedIn ? (
        <LoggedInPage username={username} />
      ) : (
        <LoggedOutPage loginDispatch={login} />
      )}
  </CenteredMainLayout>
)

const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
  username: state.username,
})

const mapDispatchToProps = dispatch => ({
  login: username => dispatch(login(username)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)
