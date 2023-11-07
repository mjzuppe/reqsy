import { customAlphabet } from 'nanoid/non-secure';
const nanoid = customAlphabet('1234567890ABCDEF', 10);

const generateReqsyId = async () => await nanoid();

export default generateReqsyId;
