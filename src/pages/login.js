import React from "react"
import { Link, navigate } from "gatsby"
import { connect } from "react-redux"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { login } from "../state/actions"

// Login Form (Displays if not logged in)

const loginFunction = loginDispatch => e => {
  e.preventDefault()
  const username = document.querySelector("#username").value
  if (!username) return
  loginDispatch(username)
  navigate("/")
}

const LoginForm = ({ loginDispatch }) => (
  <form onSubmit={loginFunction(loginDispatch)}>
    <label htmlFor="username">Username</label>
    <input
      id="username"
      name="username"
      type="text"
      placeholder="User Name"
      required
    />
    <label htmlFor="password">Password (disabled for demo)</label>
    <input
      id="password"
      name="password"
      type="password"
      placeholder="Password"
      disabled
    />
    <input type="submit" value="Log In" />
  </form>
)

// Show one of two pages, depending on whether the user is logged in.

const LoggedInPage = ({ username }) => (
  <>
    <h2>You are logged in as {username}.</h2>
    <Link to="/">Return to main page.</Link>
  </>
)
const LoggedOutPage = ({ loginDispatch }) => (
  <>
    <h2>Login</h2>
    <LoginForm loginDispatch={loginDispatch} />
  </>
)

const LoginPage = ({ loggedIn, username, login }) => (
  <Layout>
    <SEO title="Login" />
    {loggedIn ? (
      <LoggedInPage username={username} />
    ) : (
      <LoggedOutPage loginDispatch={login} />
    )}
  </Layout>
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
