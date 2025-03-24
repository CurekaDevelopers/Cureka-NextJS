import { lazy, Suspense, memo } from "react";
import dynamic from "next/dynamic";
import Spinner from "react-bootstrap/Spinner";
import Impersonation from "../components/Impersonation";

const lazyLoadable = (importFn, moduleId = -1) => {
  const LazyComponent = memo(
    lazy(() =>
      importFn().then((module) => ({ default: module.default || module }))
    )
  );

  return memo((props) => (
    <Suspense
      fallback={
        <div
          style={{
            textAlign: "center",
            position: "absolute",
            left: "50%",
            transform: "translate(-50%, -50%)",
            top: "50%",
          }}
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      }
    >
      <Impersonation isPage moduleId={moduleId}>
        <LazyComponent {...props} />
      </Impersonation>
    </Suspense>
  ));
};

export default lazyLoadable;

// import { lazy, Suspense } from "react";
// import Spinner from "react-bootstrap/Spinner";
// import Impersonation from "../components/Impersonation";

// const lazyLoadable = (importFn, moduleId = -1) => {
//   const LazyComponent = lazy(importFn);
//   // eslint-disable-next-line react/display-name
//   return (props) => (
//     <Suspense
//       fallback={
//         <div
//           style={{
//             textAlign: "center",
//             position: "absolute",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             top: "50%",
//           }}
//         >
//           <Spinner animation="border" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </Spinner>
//         </div>
//       }
//     >
//       <Impersonation isPage moduleId={moduleId}>
//         <LazyComponent {...props} />
//       </Impersonation>
//     </Suspense>
//   );
// };

// export default lazyLoadable;
