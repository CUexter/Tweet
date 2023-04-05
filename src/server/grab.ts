import axios from "axios";

/* eslint-disable */
const grab = (url: string) => axios.get(url).then((res) => res.data);
/* eslint-enable */
export default grab;
