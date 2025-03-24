import _ from "lodash";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export const Impersonation = ({ children, moduleId, isPage = false }) => {
  const { userRoles } = useSelector((state) => state.auth);
  const hasPermissions = useMemo(() => {
    if (moduleId === -1) return true;

    const found = _.find(userRoles, { roleId: moduleId });
    return !_.isEmpty(found);
  }, [userRoles, moduleId]);

  if (hasPermissions) {
    return <>{children}</>;
  } else {
    return isPage ? (
      <h1 className={styles.impersonationContent}>
        You don't have permission to access this page. Please contact Support
        Team.
      </h1>
    ) : null;
    // return <>{children}</>
  }
};

export default Impersonation;
