/**
 * Validations for user-roles feature
 *
 */

export const validateCreateUser = data => {
  const errors = {};
  let isValid = true;

  if (!data.name) {
    errors.name = true;
    isValid = false;
  }

  if (!data.email) {
    errors.email = true;
    isValid = false;
  }

  if (!data.password) {
    errors.password = true;
    isValid = false;
  }

  if (!data.isSuperAdmin && !Object.keys(data.permissions).length) {
    errors.permissions = true;
    isValid = false;
  }

  return { isValid, errors };
};

export const validateUpdateUser = data => {
  const errors = {};
  let isValid = true;

  if (!data.name) {
    errors.name = true;
    isValid = false;
  }

  if (!data.email) {
    errors.email = true;
    isValid = false;
  }

  if (!data.isSuperAdmin && !Object.keys(data.permissions).length) {
    errors.permissions = true;
    isValid = false;
  }

  return { isValid, errors };
};
