import dbConnect from "./db";

const withDbConnect = (handler) => async (req, res) => {
  await dbConnect();
  return handler(req, res);
};

export default withDbConnect;
