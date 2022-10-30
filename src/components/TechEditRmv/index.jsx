import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { InputTitleTechEdit } from "../Input";
import { SelectStatusTech } from "../Select";
import { formTechSchema } from "../../schemas/formSchema";
import { AuthContext } from "../../context/AuthContext";
import { ButtonStyle } from "../Button/style";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { Section } from "./styles";
import { useForm } from "react-hook-form";

export const TechEditRmv = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formTechSchema) });

  const { setTechEditRmvModal, handleTechEdit, handleTechRmv } =
    useContext(AuthContext);

  return (
    <Section>
      <div id="divTechRegister">
        <button id="closeModal" onClick={() => setTechEditRmvModal(false)}>
          x
        </button>
        <h2>Editar Tecnologia</h2>
        <form onSubmit={handleSubmit(handleTechEdit)}>
          <InputTitleTechEdit register={register} errors={errors} />
          <SelectStatusTech register={register} />
          <div id="divButtons">
            <ButtonStyle
              onSubmit={handleSubmit(handleTechEdit)}
              id="edit"
              title="Editar Tecnologia"
            >
              <FaEdit />
            </ButtonStyle>
            <ButtonStyle
              onClick={handleSubmit(handleTechRmv)}
              id="trash"
              title="Remover Tecnologia"
            >
              <FaTrashAlt />
            </ButtonStyle>
          </div>
        </form>
      </div>
    </Section>
  );
};
