import bcrypt from "bcrypt";

export const HashPassword = async (password) => {
  const saltRounds = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, saltRounds);
};

export const ComparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};