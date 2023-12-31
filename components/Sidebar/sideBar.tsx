import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import variables from "../../styles/login.module.scss";
import sidebarStyles from "../../styles/sidebar.module.scss";
import { useState } from "react";
import { changeSelectedSideBar } from "@/store/reducers/sideBarSlice";
import { logoutThunk } from "@/store/reducers/loginReducerRedux";
import store from "@/store/store";
import { logoutMethod } from "@/helpers/utils";
import { addStoryTrigger } from "@/store/reducers/addStorySlice";
import { toggleInnerStoryBtn } from "@/store/reducers/innerStorySlice";
interface SidebarProps {
  title: String,
  icon: any,
  selected: boolean
}

const propForSidebar = [
  {title: "All Feed",
  icon: <PresentationChartBarIcon className="h-5 w-5" />,
  selected: true},
  {title: "My Feed",
  icon: <ShoppingBagIcon className="h-5 w-5" />},
  {title: "Inbox",
  icon: <InboxIcon className="h-5 w-5" />},
  {title: "Profile",
  icon: <UserCircleIcon className="h-5 w-5" />},
  {title: "Settings",
  icon: <Cog6ToothIcon className="h-5 w-5" />},
  {title: "Sign out",
  icon: <PowerIcon className="h-5 w-5" />},
] as SidebarProps[]

export function DefaultSidebar({ children } : any) { 

const onSelectBar = (props: SidebarProps, index: number): void => {
  setSelected(index);
  store.dispatch(changeSelectedSideBar(props?.title))
  if(index === 5){
    store.dispatch(logoutThunk()).then(res => {
      logoutMethod();
    });
  }
  store.dispatch(addStoryTrigger(false))
  store.dispatch(toggleInnerStoryBtn(false))
}

const [selectedBar, setSelected] = useState<number>(0);
  return (
    <div className={`${variables.colCheck} ${sidebarStyles.sidebarContainer}`}>
      <div className={variables.colCheck2}>
        <Card className="h-[calc(100vh-2rem)] w-full max-w-xs p-4 shadow-xl shadow-blue-gray-900/5 list-component">
          <div className="mb-2 p-4">
            <Typography variant="h5" color="blue-gray">
              Material
            </Typography>
          </div>
          <List>
            {propForSidebar.map((sidebar, index) => {
              return (
                <ListItem selected={index === selectedBar? true: false} onClick = {() => onSelectBar(sidebar, index)}>
                  <ListItemPrefix>
                    {sidebar?.icon}
                  </ListItemPrefix>
                  {sidebar?.title}
                </ListItem>
              )
            })}
          </List>
        </Card>
      </div>
      <div className={`${variables.contentAlign} ${variables.colCheck10}`}>
        {children}
      </div>
    </div>
  );
}