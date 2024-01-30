import { LoginInformation } from "../types/pages/signIn"
import { Controller, useForm } from "react-hook-form"
import { joiResolver } from "@hookform/resolvers/joi"
import Joi from "joi"
import { useAuth } from "../hooks/useAuth"

const SignIn = () => {
  const { login } = useAuth()
  const validateLoginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  })

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginInformation>({
    resolver: joiResolver(validateLoginSchema),
    defaultValues: { username: "", password: "" },
  })

  const onSubmit = (formData: LoginInformation) => {
    if (login) login(formData)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              id="username"
              type="text"
              style={{ borderColor: errors.username ? "red" : "ActiveBorder" }}
            />
          )}
        />
        <label htmlFor="password">password</label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="password"
              id="password"
              style={{ borderColor: errors.password ? "red" : "ActiveBorder" }}
            />
          )}
        />
        <div style={{ marginTop: "20px", gap: "20px", display: "flex" }}>
          <a href="/sign-up">Sign up</a>
          <button type="submit">Login</button>
        </div>
      </div>
    </form>
  )
}

export default SignIn
