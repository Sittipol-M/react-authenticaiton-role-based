const SignUp = () => {
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
        <h2>Sign up</h2>
        <label htmlFor="username">username</label>
        <input id="username" type="text" />
        <label htmlFor="password">password</label>
        <input type="password" id="password" />
        <label htmlFor="confirmPass">confirm password</label>
        <input type="confirmPass" id="password" />
        <div style={{ marginTop: "20px", gap: "20px", display: "flex" }}>
          <button type="submit">Sign up</button>
        </div>
      </div>
    </form>
  )
}

export default SignUp
