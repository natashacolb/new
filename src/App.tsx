import { Suspense } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import CareHubHome from "./components/care-hub/home";
import { CareWorkerRegistration } from "./components/care-worker-registration";
import { NavigationPage } from "./components/navigation-page";
import { CareWorkerDashboard } from "./components/care-worker-dashboard";
import { CareWorkerPortal } from "./components/care-worker-portal";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        {/* Tempo routes need to be rendered before the application routes */}
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}

        <Routes>
          <Route path="/" element={<NavigationPage />} />
          <Route
            path="/care-worker-registration"
            element={<CareWorkerRegistration />}
          />
          <Route path="/care-hub" element={<CareHubHome />} />
          <Route
            path="/care-worker-dashboard"
            element={<CareWorkerDashboard />}
          />
          <Route path="/care-worker-portal" element={<CareWorkerPortal />} />
          {/* Add a catch-all route for Tempo */}
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" element={<></>} />
          )}
          {/* Add a catch-all route to redirect to home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </>
    </Suspense>
  );
}

export default App;
