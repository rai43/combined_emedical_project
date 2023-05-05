import { FiChevronDown } from "solid-icons/fi";
import { A, useLocation } from "@solidjs/router";
import { createEffect, createSignal } from "solid-js";
import { TbLayoutDashboard } from "solid-icons/tb";

const submenuIconClasses = `h-5 w-5`;

function SidebarSubmenu({ submenu, name, icon }) {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = createSignal(false);

  /** Open Submenu list if path found in routes, this is for directly loading submenu routes  first time */
  createEffect(() => {
    if (
      submenu.filter((m) => {
        return m.path === location.pathname;
      })[0]
    )
      setIsExpanded(true);
  }, []);

  return (
    <div class="flex-col">
      {/** Route header */}
      <div class="w-full" onClick={() => setIsExpanded(!isExpanded())}>
        {icon} {name}
        <FiChevronDown
          class={
            "w-5 h-5 mt-1 float-right delay-400 duration-500 transition-all  " +
            (isExpanded() ? "rotate-180" : "")
          }
        />
      </div>

      {/** Submenu list */}
      <div class={` w-full ` + (isExpanded() ? "" : "hidden")}>
        <ul class={`menu menu-compact`}>
          {submenu.map((m, k) => {
            return (
              <li key={k}>
                <A href={m.path}>
                  {m.icon || <TbLayoutDashboard class={submenuIconClasses} />}{" "}
                  {m.name}
                  {location.pathname == m.path ? (
                    <span
                      class="absolute mt-1 mb-1 inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary "
                      aria-hidden="true"
                    ></span>
                  ) : null}
                </A>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default SidebarSubmenu;
