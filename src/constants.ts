const NAME_MAX_LENGTH = 100;
const ORGANIZATION_MAX_LENGTH = 100;
const EMAIL_MAX_LENGTH = 50;

const CODE_SIZE = 1;
const GROUPS = [CODE_SIZE, 3, 3, 2, 2] as const;
const MAX_DIGITS = GROUPS.reduce((sum, size) => sum + size, 0);
const PHONE_MAX_LENGTH = MAX_DIGITS + (GROUPS.length - 1) + 1;

const MAX_FILE_SIZE = 20 * 1024 * 1024;
const UNITS = ['B', 'KB', 'MB', 'GB'] as const;
const STUB_UPLOAD_TIME = 800;

const FORM_SUBMIT_URL = 'https://api.example.com/v1/applications';

export {
  NAME_MAX_LENGTH,
  ORGANIZATION_MAX_LENGTH,
  EMAIL_MAX_LENGTH,
  CODE_SIZE,
  GROUPS,
  MAX_DIGITS,
  PHONE_MAX_LENGTH,
  MAX_FILE_SIZE,
  UNITS,
  STUB_UPLOAD_TIME,
  FORM_SUBMIT_URL,
};
