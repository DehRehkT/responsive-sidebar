import Sidebar, { SidebarItem } from "./components/Sidebar";

import HeatStakingIcon from './assets/HeatStakingIcon';

export default function App() {
  return (
    <main className="App">
      <Sidebar>
        <SidebarItem icon={<HeatStakingIcon size={20}/>} text="LH Station P02-1"/>
        <SidebarItem icon={<HeatStakingIcon size={20}/>} text="LH Station P02-2"/>
      </Sidebar>
    </main>
  )
}