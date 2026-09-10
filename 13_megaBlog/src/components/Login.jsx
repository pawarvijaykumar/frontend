import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { login } from "../appwrite/auth.js";
import Input from "./Input";
import Button from "./Button";

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginHandler = async (data) => {
    try {
      const session = await login(data.email, data.password);
      if (session) {
        dispatch(authLogin({ userData: session }));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(loginHandler)}>
      <Input
        label="Email"
        type="email"
        {...register("email", { required: true })}/*{...} spread operator
 Is input ko form ke saath connect kar do, sara zaroori kaam khud-ba-khud ho jayega."*/
      />
      <Input
        label="Password"
        type="password"
        {...register("password", { required: true })}
      />
      <Button type="submit">Login</Button>
    </form>
  );
}
export default Login;