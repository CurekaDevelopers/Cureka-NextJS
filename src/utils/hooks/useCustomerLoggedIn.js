import _ from "lodash";
import { useSelector } from "react-redux";

const useCustomerLoggedIn = () => {
  const { accessToken, userDetails } = useSelector((state) => state.auth);
  // const name = _.isEmpty(userDetails?.first_name) ? "" : `${userDetails?.first_name} ${userDetails?.last_name}`;
  const getNameOrDefault = (name) => (name == "null" || name == "undefined" ? "" : name);

  // Extract first and last names with conversion
  const firstName = getNameOrDefault(userDetails?.first_name);
  const lastName = getNameOrDefault(userDetails?.last_name);

  // Construct the name based on the presence of first and last names
  const name = firstName || lastName ? `${firstName} ${lastName}`.trim() : "Hello, there!"; // Both first name and last name are empty
  const obj = {
    ...userDetails,
    name: name,
    isLoggedIn: !!accessToken,
  };

  return obj;
};

export default useCustomerLoggedIn;
