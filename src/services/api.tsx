import { message } from "antd";
import Axios from "axios";
import { getToken } from "next-auth/jwt";
import { getSession, signOut } from "next-auth/react";

export const BASE_URL = process.env.NEXT_PUBLIC_BACK_URL;

export const axiosInstance = Axios.create({
  baseURL: BASE_URL + "/customapi",
  headers: {
    Accept: "application/json,text/*;q=0.99",
    "Content-Type": "application/json",
  },
});

export const axiosHeadersSetToken = async (context: any) => {
  const user: any = await getToken({ req: context.req });
  if (user?.token) {
    axiosInstance.defaults.headers.common = {
      Authorization: `Bearer ${user.token}`,
    };
  }
};

axiosInstance.interceptors.request.use(
  async (config) => {
    if (!config.headers.Authorization) {
      let session: any = await getSession();
      const token = "Bearer " + session?.user?.token;

      if (session?.user?.token) {
        config.headers.Authorization = token;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    if (typeof window !== "undefined") {
      if (status === 401) {
        console.log("Run after api call", status);
        message.error(error?.message);
        setTimeout(() => {
          signOut({ redirect: true });
        }, 3000);
        return error;
      }
    }
    return Promise.reject(error);
  }
);

export const API = {
  //Home page
  postLogin: (data: any) =>
    axiosInstance
      .post("/Auth/login", data)
      .then((res: any) => res && console.log(data)),

  getHomePageNewProducts: () =>
    axiosInstance.get("/News?PageIndex=1&PageSize=10"),

  getHomePageBanner: () => axiosInstance.get("/HomeBanner"),

  getHomeCategory: () => axiosInstance.get("/Category"),

  getAboutUs: () => axiosInstance.get("/AboutUs"),

  //contact info
  getContact: () => axiosInstance.get("/Contact"),

  // About page

  getAboutPageSlider: () => axiosInstance.get("/AboutSlider"),

  getAboutPageOutTeam: () => axiosInstance.get("/OurTeam"),

  getAboutPageHeader: () => axiosInstance.get("/AboutPage"),

  //news
  getNewsList: () => axiosInstance.get("/News?PageIndex=1&PageSize=10"),

  getOneNewsDetail: (id: number) => axiosInstance.get(`/News/${id}`),

  //locations
  getLocationsItems: () => axiosInstance.get("/Location"),

  getBrands: () => axiosInstance.get("/Brands"),

  // projects

  getProjectsList: () => axiosInstance.get("/Project?PageIndex=1&PageSize=10"),
  getOneProjectsDetail: (id: number) => axiosInstance.get(`/Project/${id}`),

  // services

  getServicesList: () => axiosInstance.get("/Solution?PageIndex=1&PageSize=10"),
  getOneServicesDetail: (id: number) => axiosInstance.get(`/Solution/${id}`),
};
