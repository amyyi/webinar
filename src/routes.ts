import { FC } from "react"
import { PATHS } from "./constants/path"
import Webinar from "@/pages/Webinar/Webinar"
import { Login } from "@/pages/Login/Login"
import { MyWebinars } from "@/pages/MyWebinars/MyWebinars"

interface RouteConfig {
  needLogin: boolean
  path: PATHS
  component: FC
}
const routes: RouteConfig[] = [
  {
    needLogin: false,
    path: PATHS.WEBINAR,
    component: Webinar
  },
  {
    needLogin: false,
    path: PATHS.LOGIN,
    component: Login
  },
  {
    needLogin: false,
    path: PATHS.NOT_FOUND,
    component: Webinar,
  },
  {
    needLogin: true,
    path: PATHS.My_WEBINARS,
    component: MyWebinars
  }
]

export default routes