/**
 * Validations for rates feature
 */

export const validate = data => {
  const errors = {};
  let isValid = true;

  if (!data.mode && data.customer === 'transporter') {
    errors.mode = true;
    isValid = false;
  }

  if (!data.customer) {
    errors.customer = true;
    isValid = false;
  }

  if (!data.type) {
    errors.type = true;
    isValid = false;
  }

  if (!data.price || parseInt(data.price, 10) === 0) {
    errors.price = true;
    isValid = false;
  }

  return { isValid, errors };
};
