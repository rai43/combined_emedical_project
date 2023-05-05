import routes from "../routes/sidebar";
import { A, useLocation } from "@solidjs/router";
import SidebarSubmenu from "./SidebarSubmenu";
import logo from "../assets/logo192.png";
import { TbLayoutDashboard } from "solid-icons/tb";

const iconClasses = `h-6 w-6`;

function LeftSidebar() {
  const location = useLocation();

  return (
    <div class="drawer-side ">
      <label htmlFor="left-sidebar-drawer" class="drawer-overlay"></label>
      <ul class="menu pt-2 w-80 bg-base-100 text-base-content">
        <li class="mb-2 font-semibold text-xl">
          <span>
            <img
              class="mask mask-squircle w-10"
              src={logo}
              alt="DashWind Logo"
            />
            CNPS e-medical
          </span>{" "}
        </li>
        {routes.map((route, k) => {
          return (
            <li class="" key={k}>
              {route.submenu ? (
                <SidebarSubmenu {...route} />
              ) : (
                <A
                  end
                  href={route.path}
                  activeClass="font-semibold  bg-base-200"
                  class="font-normal"
                >
                  {route.icon || <TbLayoutDashboard class={iconClasses} />}{" "}
                  {route.name}
                  {location.pathname === route.path ? (
                    <span
                      class="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary "
                      aria-hidden="true"
                    ></span>
                  ) : null}
                </A>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default LeftSidebar;
