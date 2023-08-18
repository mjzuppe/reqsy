import { object } from 'yup';

const rootSchema = {
    user: object({
        // name: string().required(),
      }),
    library: object({}),
    apis: object({}),
    tags: object({}),
    variables: object({}),
    issues: object({}),
};

const validateRootInput = async (key: string, input:any) => {
    if (!Object.keys(rootSchema).includes(key)) throw new Error(`Invalid root key: ${key}`);
    await rootSchema[key].validate(input).catch((err) => {throw new Error(`Invalid root input: ${err}`)});
};

export {validateRootInput};