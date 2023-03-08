import React, { useState, Fragment } from "react";
import { useForm, SubmitErrorHandler } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import callApi, {
  formatData,
  notification,
  callApiLogin,
} from "../../Utils/Utils.tsx";
import { getAppToken } from "../login/Utils.tsx";
import { emailRegex } from "../../Utils/regex";
import ReCAPTCHA from "react-google-recaptcha";
import InputField from "../utilities/FormField.tsx";
import { AuthLayout } from "./AuthLayout.tsx";
import { Puff } from "react-loader-spinner";

interface FormData {
  email: string;
  password: string;
}

export function Login() {
  const router = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [recaptchaIsValid, setRecaptchaIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleLogin = async (data: FormData) => {
    setLoading(true);
    let response = await callApi(true, "login", "post", null, data);
    setLoading(false);

    if (response.status === 200) {
      localStorage.setItem("user", JSON.stringify(response.data.data));
      // setLoading(false)
      router("/new-dashboard", { replace: true });
      notification("success", response.data.message);
    } else {
      // setLoading(false)
      notification(
        "error",
        formatData(response.response.data.data) === ""
          ? response.response.data.message
          : formatData(response.response.data.data)
      );
    }
  };

  const recaptchaOnChange = (value: any) => {
    console.log("Captcha value:", value);
    if (value) {
      setRecaptchaIsValid(true);
    } else {
      setRecaptchaIsValid(false);
    }
  };

  const form = (
    <Fragment>
      <form className="form px-60 py-60" onSubmit={handleSubmit(handleLogin)}>
        <InputField
          id="email"
          label="Email de connexion"
          type="email"
          placeholder="Adresse email"
          register={register("email", {
            required: "Ce champ est requis",
            pattern: {
              value: emailRegex,
              message: "Inserer une adresse email valide",
            },
          })}
          error={{ for: "email", text: errors?.email?.message }}
        />
        <InputField
          id="password"
          label="Votre mot de passe"
          type={showPassword ? "text" : "password"}
          placeholder="Mot de passe"
          register={{
            ...register("password", {
              required: "Ce champ est requis",
            }),
          }}
          error={{ for: "password", text: errors?.password?.message }}
        />
        {/*<ReCAPTCHA
          style={{ marginTop: 10, marginBottom: 15, with: "100%" }}
          sitekey="6LdDh80ZAAAAAJKGgWIKw_veDK0c5MOckGkP6fFe"
          onChange={recaptchaOnChange}
        />disabled={recaptchaIsValid === false || loading}*/}
        <label htmlFor="show-password" className="input-checkbox-group">
          <input
            className="checkbox-field"
            id="show-password"
            type="checkbox"
            onClick={() => setShowPassword(!showPassword)}
          />
          <div className="checkmark" />
          <span>Mot de passe visible</span>
        </label>
        <button
          className={
            recaptchaIsValid === false || loading
              ? "btn btn-main disabled"
              : "btn btn-main"
          }
          type="submit"
        >
          Connexion
          {loading && (
            <Puff
              height="20"
              width="20"
              radius={1}
              color="#fff"
              ariaLabel="puff-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          )}
        </button>

        <div className="form-footer">
          <Link className="first-child" to="/new-register">
            Creer mon organisation
          </Link>
          <Link className="second-child" to="/new-account-lookup">
            Mot passe oublié
          </Link>
        </div>
      </form>
    </Fragment>
  );

  return <AuthLayout form={form} header="Connexion" />;
}
