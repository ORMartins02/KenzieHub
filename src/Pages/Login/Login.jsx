import { formLoginSchema } from "../../schemas/formSchema";
import { AuthContext } from "../../context/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { Section } from "./style.login";
import { useForm } from "react-hook-form";
import { ButtonLogin, ButtonGoToRegister } from "../../components/Button";
import { InputEmail, InputPassword } from "../../components/Input";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formLoginSchema),
  });

  const { onSubmitLoginFunction } = useContext(AuthContext);

  return (
    <Section>
      <h1>Kenzie hub</h1>
      <div id="divLogin">
        <h3>Login</h3>
        <form onSubmit={handleSubmit(onSubmitLoginFunction)}>
          <InputEmail register={register} errors={errors} />
          <InputPassword register={register} errors={errors} />
          <ButtonLogin />
        </form>
        <div id="divRegister">
          <span>Ainda não é cadastrado?</span>
          <ButtonGoToRegister />
        </div>
      </div>
    </Section>
  );
};
