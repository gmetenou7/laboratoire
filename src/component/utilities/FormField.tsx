import React from "react";

const InputField = ({
  register,
  error,
  label,
  id,
  type,
  className,
  placeholder,
  onKeyDownHandler,
  onKeyUpHander,
  disabled,
  hidden,
  style,
  onClick
}) => {
  const maxData = new Date();
  return (
    <div className="input-group">
      <label className="label" htmlFor={id}>
        {label}{" "}
        {error?.for === id && (
          <span className="message text-danger">{error?.text}</span>
        )}
      </label>
      <input
        max={type === "date" ? maxData.toDateString() : null}
        disabled={disabled}
        hidden={hidden}
        className={className ? className : "input-field "}
        type={type}
        placeholder={placeholder}
        {...register}
        onKeyDown={onKeyDownHandler}
        onKeyUp={onKeyUpHander}
        style={style}
        onClick={onClick}
      />
    </div>
  )
};

export const SelectField = ({
  register,
  error,
  label,
  id,
  type,
  className,
  placeholder,
  onKeyDownHandler,
  onKeyUpHander,
  disabled,
  hidden,
  options,
  multiSelect,
}) => (
  <div className="input-group">
    <label className="label" htmlFor={id}>
      {label}{" "}
      {error?.for === id && (
        <span className="message text-danger">{error?.text}</span>
      )}
    </label>
    <select
      disabled={disabled}
      hidden={hidden}
      className={className ? className : "input-field "}
      type={type}
      placeholder={placeholder}
      {...register}
      onKeyDown={onKeyDownHandler}
      onKeyUp={onKeyUpHander}
    >
      {options?.map((option, index) => (
        <option value={option} key={index}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export const SelectUnityField = ({
  register,
  error,
  label,
  id,
  type,
  className,
  placeholder,
  onKeyDownHandler,
  onKeyUpHander,
  disabled,
  hidden,
  options,
  selected,
  multiSelect,
  style
}) => (
  <div
    style={{
      width: "45%"
    }}
    className="input-group">
    <label className="label" htmlFor={id}>
      {label}{" "}
      {error?.for === id && (
        <span className="message text-danger">{error?.text}</span>
      )}
    </label>
    <select
      disabled={disabled}
      hidden={hidden}
      className={className ? className : "input-field "}
      type={type}
      placeholder={placeholder}
      {...register}
      onKeyDown={onKeyDownHandler}
      onKeyUp={onKeyUpHander}
    >
      <option selected disabled value="">Choisir</option>
      {options?.map((option, index) => (
        <option selected={selected === option?.unite} value={option.unite} key={index}>
          {option.unite}
        </option>
      ))}
    </select>
  </div>
);

export const CountrySelectField = ({
  register,
  error,
  label,
  id,
  type,
  className,
  placeholder,
  onKeyDownHandler,
  onKeyUpHander,
  disabled,
  hidden,
  options,
  multiSelect,
}) => (
  <div className="input-group">
    <label className="label" htmlFor={id}>
      {label}{" "}
      {error?.for === id && (
        <span className="message text-danger">{error?.text}</span>
      )}
    </label>
    <select
      disabled={disabled}
      hidden={hidden}
      className={className ? className : "input-field "}
      type={type}
      placeholder={placeholder}
      {...register}
      onKeyDown={onKeyDownHandler}
      onKeyUp={onKeyUpHander}
    >
      <option disabled>Choisir le pays</option>
      {options?.map((option, index) => (
        <option value={option.nom_fr_fr} key={index} selected={option.code === "180"}>
          {option.nom_fr_fr}
        </option>
      ))}
    </select>
  </div>
);

export const GlassSelectField = ({
  register,
  error,
  label,
  id,
  type,
  className,
  placeholder,
  onKeyDownHandler,
  onKeyUpHander,
  disabled,
  hidden,
  options,
  multiSelect,
}) => (
  <div className="input-group">
    <label className="label" htmlFor={id}>
      {label}{" "}
      {error?.for === id && (
        <span className="message text-danger">{error?.text}</span>
      )}
    </label>
    <select
      disabled={disabled}
      hidden={hidden}
      className={className ? className : "input-field "}
      type={type}
      placeholder={placeholder}
      {...register}
      onKeyDown={onKeyDownHandler}
      onKeyUp={onKeyUpHander}
    >
      <option defaultValue={0}>Choisir le Tube</option>
      {options?.map((option, index) => (
        <option
          style={{
            backgroundColor: `#${option.couleur.split("_")[1]}`,
            color: `${option.couleur.includes("_") ? option.couleur.split("_")[0] !== "Blanche" && "#fff" : "#000"
              }`,
            padding: "10px 0"
          }}
          value={option?.id} key={index}>
          {option.nomverre}
        </option>
      ))}
    </select>
  </div>
);

export const SelectLaborantinField = ({
  register,
  error,
  label,
  id,
  type,
  className,
  placeholder,
  onKeyDownHandler,
  onKeyUpHander,
  disabled,
  hidden,
  options,
  selected,
  multiSelect,
}) => (
  <div className="input-group">
    <label className="label" htmlFor={id}>
      {label}{" "}
      {error?.for === id && (
        <span className="message text-danger">{error?.text}</span>
      )}
    </label>
    <select
      disabled={disabled}
      hidden={hidden}
      className={className ? className : "input-field "}
      type={type}
      placeholder={placeholder}
      {...register}
      onKeyDown={onKeyDownHandler}
      onKeyUp={onKeyUpHander}
    >
      <option selected disabled value="">Choisir le laborantin</option>
      {options?.map((option: any, index: number) => (
        <option value={option?.code} key={index}>
          {option.nom} ({option?.specialite})
        </option>
      ))}
    </select>
  </div>
);



export const StatusResultSelectField = ({
  register,
  error,
  label,
  id,
  type,
  className,
  placeholder,
  onKeyDownHandler,
  onKeyUpHander,
  disabled,
  hidden,
  options,
  selected,
  multiSelect,
}) => (
  <div className="input-group">
    <label className="label" htmlFor={id}>
      {label}{" "}
      {error?.for === id && (
        <span className="message text-danger">{error?.text}</span>
      )}
    </label>
    <select
      disabled={disabled}
      hidden={hidden}
      className={className ? className : "input-field "}
      type={type}
      placeholder={placeholder}
      {...register}
      onKeyDown={onKeyDownHandler}
      onKeyUp={onKeyUpHander}
    >
      <option selected disabled value="">Choisir</option>
      <option selected value="">Aucune</option>
      {options?.map((option: any, index: number) => (
        <option selected={selected === option?.libelle} value={option?.id} key={index}>
          {option.libelle}
        </option>
      ))}
    </select>
  </div>
);

export const ExamFamilySelectField = ({
  register,
  error,
  label,
  id,
  type,
  className,
  placeholder,
  onKeyDownHandler,
  onKeyUpHander,
  disabled,
  hidden,
  options,
  multiSelect,
}) => (
  <div className="input-group">
    <label className="label" htmlFor={id}>
      {label}{" "}
      {error?.for === id && (
        <span className="message text-danger">{error?.text}</span>
      )}
    </label>
    <select
      disabled={disabled}
      hidden={hidden}
      className={className ? className : "input-field "}
      type={type}
      placeholder={placeholder}
      {...register}
      onKeyDown={onKeyDownHandler}
      onKeyUp={onKeyUpHander}
    >
      {options?.map((option: any, index: number) => (
        <option
          value={option?.matricule} key={index}
        >
          {option.nom}
        </option>
      ))}
    </select>
  </div>
);

export const TextAreaField = ({
  register,
  error,
  label,
  id,
  className,
  placeholder,
  onKeyDownHandler,
  onKeyUpHander,
  disabled,
  hidden,
}) => (
  <div className="input-group">
    <label className="label" htmlFor={id}>
      {label}{" "}
      {error?.for === id && (
        <span className="message text-danger">{error?.text}</span>
      )}
    </label>
    <textarea
      cols="30"
      rows="10"
      disabled={disabled}
      hidden={hidden}
      className={className ? className : "textarea-field"}
      placeholder={placeholder}
      {...register}
      onKeyDown={onKeyDownHandler}
      onKeyUp={onKeyUpHander}
    ></textarea>
  </div>
);

export default InputField;
