import moment from 'moment';

/**
 * Validations for promotions feature
 */

export const validateAdd = data => {
  const errors = {};
  let isValid = true;

  if (!data.code) {
    errors.code = true;
    isValid = false;
  }

  if (!data.discount || parseInt(data.discount, 10) === 0) {
    errors.discount = true;
    isValid = false;
  }

  if (!data.validFrom || !(data.validFrom instanceof moment)) {
    errors.validFrom = true;
    isValid = false;
  }

  if (!data.validTill || !(data.validTill instanceof moment)) {
    errors.validTill = true;
    isValid = false;
  }

  return { isValid, errors };
};

export const validateUpdate = data => {
  const errors = {};
  let isValid = true;

  if (!data.validTill || !(data.validTill instanceof moment)) {
    errors.validTill = true;
    isValid = false;
  }

  return { isValid, errors };
};
