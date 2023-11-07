import { string, object } from 'yup';

const rootSchema = {
  user: object({
    name: string().required(),
  }),
  library: object({}),
  api: object({}),
  tag: object({ label: string().required() }).noUnknown(true),
  variable: object({}),
  issue: object({}),
};

const validateRootInput = async (key: string, input: any) => {
  if (!Object.keys(rootSchema).includes(key)) throw new Error(`Invalid root key: ${key}`);
  await rootSchema[key].validate(input, { strict: true }).catch((err) => {
    throw new Error(`Invalid root input: ${err}`);
  });
};

export { validateRootInput };
