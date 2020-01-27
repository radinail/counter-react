import Joi from "joi";

export function validate<T, E>(value: T, schema: Joi.SchemaLike): E {
  const validationError = {} as any;
  const { error } = Joi.validate(value, schema, {
    abortEarly: false
  });

  if (error) {
    error.details.map(d => (validationError[d.path[0]] = d.message));
  }
  return validationError;
}

export const validateProperty = (field: string, value: any, schema: any) => {
  const { error } = Joi.validate(
    { [field]: value[field] },
    { [field]: schema[field] }
  );

  /*if (error) setErrors({ ...errors, [field]: error.details[0].message });
  if (!error) {
    delete errors[field];
  }*/

  return error;
};
