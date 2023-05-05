import Header from "./Header";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from "../routes/index";
// import { Suspense, lazy } from "react";
import SuspenseContent from "./SuspenseContent";
import { Routes, Route } from "@solidjs/router";
// import { useSelector } from "react-redux";
// import { useEffect, useRef } from "react";

// const Page404 = lazy(() => import("../pages/protected/404"));

function PageContent() {
  let mainContentRef;
  // const { pageTitle } = useSelector((state) => state.header);

  // Scroll back to top on new page load
  // useEffect(() => {
  //   mainContentRef.current.scroll({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // }, [pageTitle]);

  return (
    <div class="drawer-content flex flex-col ">
      <Header />
      <main
        class="flex-1 overflow-y-auto pt-8 px-6  bg-base-200"
        ref={mainContentRef}
      >
        <Suspense fallback={<SuspenseContent />}>
          <Routes>
            {routes.map((route, key) => {
              return (
                <Route
                  exact={true}
                  path={`${route.path}`}
                  element={<route.component />}
                />
              );
            })}

            {/* Redirecting unknown url to 404 page */}
            <Route path="*" element={<p>error</p>} />
            {/* <Route path="*" element={<Page404 />} /> */}
          </Routes>
        </Suspense>
        <div class="h-16"></div>
      </main>
    </div>
  );
}

export default PageContent;
