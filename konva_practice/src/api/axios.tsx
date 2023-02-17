import axios from "axios";

//이미지 배열이지만 하나만 입력 가능

const greeneye = async (url: string) => {
  const response = await axios.post(`${process.env.REACT_APP_GREENEYE_URL}`, {
    body: {
      version: "V1",
      requestId: "requestId",
      timestamp: 1666321382401,
      images: [
        {
          name: "demo",
          url: `${url}`,
        },
      ],
    },
    headers: {
      "Content-Type": "application/json",
      "X-GREEN-EYE-SECRET": `${process.env.REACT_APP_GREENEYE_KEY}`,
    },
  });
  console.log(response?.data);
};

export default greeneye;
