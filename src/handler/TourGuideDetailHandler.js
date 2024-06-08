import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const useTourGuideDetailHandler = () => {
  const {userId} = useParams();
  const [tourGuide, setTourGuide] = useState({
    id: 0,
    tourPrice : 0,
    tourLocation : '',
    tourDesc : '',
    tourLanguage : '',
    user : {
        id: 0,
        firstName : '',
        lastName : '',
        phoneNumber : '',
        location : '',
        email: '',
        image: ''
    }
  });
  useEffect(() => {
    console.log("Initial render or locationName changed:", userId);
    if (userId) {
      fetchData(userId);
    }
  }, [userId]);

  const fetchData = async (id) => {
    console.log(id);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/tour-guide/user/${id}`
      );
      console.log(response.data);
      setTourGuide(response.data);
    } catch (error) {
      console.error("Error fetching about me data:", error);
    }
  };

  return {
    tourGuide
  };
};

export default useTourGuideDetailHandler;
