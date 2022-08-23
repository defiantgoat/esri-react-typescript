import IdentityManager from "@arcgis/core/identity/IdentityManager";

import { createContext } from "react";

const AuthContext = createContext(null as typeof IdentityManager | null);
AuthContext.displayName = "AuthContext";

export default AuthContext;
