import axios from "axios";

const TokenConfig = token => {
    token ? axios.defaults.headers.common["Authorization"] = token : delete axios.defaults.headers.common["Authorization"];
    console.log("token set");
};
export default TokenConfig;