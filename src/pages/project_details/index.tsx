import React, { Suspense } from "react";
const ProjectDetails = React.lazy(() => import("./ProjectDetails"));
import { Outlet } from "react-router-dom";
import ErrorBoundary from "../../components/ErrorBoundary";

const ProjectDetailsIndex: React.FC = () => {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <ProjectDetails />
        </Suspense>
      </ErrorBoundary>
      <Outlet />
    </>
  );
};

export default ProjectDetailsIndex;
