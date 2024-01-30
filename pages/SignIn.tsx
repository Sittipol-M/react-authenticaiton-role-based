import React from "react"

const SignIn = () => {
  return (
    <form>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h2>Sign In</h2>
        <label htmlFor="username">username</label>
        <input id="username" type="text" />
        <label htmlFor="password">password</label>
        <input type="password" id="password" />
        <div style={{ marginTop: "20px", gap: "20px", display: "flex" }}>
          <a href="/sign-up">Sign up</a>
          <button type="submit">Login</button>
        </div>
      </div>
    </form>
  )
}

export default SignIn
