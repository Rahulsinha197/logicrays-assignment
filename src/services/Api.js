import { get } from "../services/MainService";

export const getLists = () => {
  try {
    return get({
      subUrl: `/?format=json`,
    });
  } catch (e) {
    console.log(e);
  }
};

export const filterList = (params) => {
  try {
    return get({
      subUrl: `/?language=${params.language}&subject=${params.subject}&grade=${params.class}&chapter_no=${params.topicNumber}&vi`,
    });
  } catch (e) {
    console.log(e);
  }
};
