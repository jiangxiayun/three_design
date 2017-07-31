
import axios from "../Config/axios.config";

export const getBoards = () => Promise.resolve(axios.get('mock/boardList.json'));

export const getModels = () => Promise.resolve(axios.get('mock/modelList.json'));