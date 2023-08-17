import Joi from "joi";

const rootSchema = {
    user: Joi.object({}),
    library: Joi.object({}),
    apis: Joi.object({}),
    tags: Joi.object({}),
    variables: Joi.object({}),
    issues: Joi.object({}),
};

const validateRootInput = (key: string, input:any) => {
    // if (!Object.keys(rootSchema).includes(key)) throw new Error(`Invalid root key: ${key}`);
    // const {error, value} = rootSchema[key].validate(input);
    // if (error) throw new Error(`Invalid root input: ${error}`);
    // No return, throw error only
};

export {validateRootInput};