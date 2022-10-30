import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { InputStyle } from "./style";

export const InputName = ({ register, errors }) => {
  return (
    <>
      <label htmlFor="name">Nome</label>
      <InputStyle placeholder="Nome" id="name" {...register("name")} />
      <span>{errors.name?.message}</span>
    </>
  );
};

export const InputEmail = ({ register, errors }) => {
  return (
    <>
      <label htmlFor="email">Email</label>
      <InputStyle placeholder="Email" id="email" {...register("email")} />
      <span>{errors.email?.message}</span>
    </>
  );
};

export const InputPassword = ({ register, errors }) => {
  return (
    <>
      <label htmlFor="password">Senha</label>
      <InputStyle
        type="password"
        placeholder="Senha"
        id="password"
        {...register("password")}
      />
      <span>{errors.password?.message}</span>
    </>
  );
};

export const InputConfirmPassword = ({ register, errors }) => {
  return (
    <>
      <label htmlFor="confirmPassword">Confirmar Senha</label>
      <InputStyle
        type="password"
        placeholder="Digite aqui sua senha"
        id="confirmPassword"
        {...register("confirmPassword")}
      />
      <span>{errors.confirmPassword?.message}</span>
    </>
  );
};

export const InputContact = ({ register, errors }) => {
  return (
    <>
      <label htmlFor="contact">Contato</label>
      <InputStyle
        placeholder="Opção de contato"
        id="contact"
        {...register("contact")}
      />
      <span>{errors.bio?.message}</span>
    </>
  );
};

export const InputBio = ({ register }) => {
  return (
    <>
      <label htmlFor="bio">Bio</label>
      <InputStyle placeholder="Fale sobre você" id="bio" {...register("bio")} />
    </>
  );
};

export const InputTitle = ({ register, errors }) => {
  return (
    <>
      <label htmlFor="title">Nome</label>
      <InputStyle placeholder="Nome" id="title" {...register("title")} />
      <span>{errors.status?.message}</span>
    </>
  );
};

export const InputTitleTechEdit = ({ register, errors }) => {
  const { actualTech } = useContext(AuthContext);
  const { id, title } = actualTech;
  return (
    <>
      <label htmlFor="title">Nome</label>
      <InputStyle
        placeholder="Nome"
        id={`${id}`}
        value={`${title}`}
        {...register("title")}
      />
      <span>{errors.status?.message}</span>
    </>
  );
};
