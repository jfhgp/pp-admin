/**
 * Validation rules for orders
 */

export const validateAddItem = data => {
  const errors = {};
  let isValid = true;

  if (!data.nIName) {
    isValid = false;
    errors.nIName = true;
  }

  if (!data.nICategory) {
    isValid = false;
    errors.nICategory = true;
  }

  if (!data.nIQuantity) {
    isValid = false;
    errors.nIQuantity = true;
  }

  if (!data.nIWeight) {
    isValid = false;
    errors.nIWeight = true;
  }

  if (!data.nILength) {
    isValid = false;
    errors.nILength = true;
  }

  if (!data.nIWidth) {
    isValid = false;
    errors.nIWidth = true;
  }

  if (!data.nIHeight) {
    isValid = false;
    errors.nIHeight = true;
  }

  return { isValid, errors };
};

export const validateCommodity = data => {
  const errors = {};
  let isValid = true;

  if (!data.name) {
    isValid = false;
    errors.name = true;
  }

  if (!data.itemType) {
    isValid = false;
    errors.itemType = true;
  }

  if (!parseFloat(data.quantity)) {
    isValid = false;
    errors.quantity = true;
  }

  if (!parseFloat(data.weight)) {
    isValid = false;
    errors.weight = true;
  }

  if (!parseFloat(data.length)) {
    isValid = false;
    errors.length = true;
  }

  if (!parseFloat(data.width)) {
    isValid = false;
    errors.width = true;
  }

  if (!parseFloat(data.height)) {
    isValid = false;
    errors.height = true;
  }

  return { isValid, errors };
};
