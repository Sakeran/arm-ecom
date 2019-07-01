import React from "react"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

const LoginPage = () => (
  <Layout>
    <SEO title="Login" />
    <h2>Login</h2>
    <form method="get" action="/login">
      <label for="username">Username</label>
      <input id="username" name="username" type="text" placeholder="User Name" required />
      <label for="password">Password</label>
      <input id="password" name="password" type="password" placeholder="Password" disabled />
      <input type="submit" value="Log In" />
    </form>
  </Layout>
)

export default LoginPage
