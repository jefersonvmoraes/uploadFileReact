import axios from "axios";
const GetUrl = async (lambdaURL) => {
  const response = await axios.get(lambdaURL);
  try {
    const res = await axios.get(lambdaURL);
  } catch (error) {
    console.log(error);
  }
  return response;
};

export default GetUrl;
