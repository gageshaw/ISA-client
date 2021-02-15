const rolesConfig = {
  //role name as a key.
  owner: {
    routes: [
      {
        component: "OwnerPage",
        url: "/owner",
      },
      {
        component: "ManagerPage",
        url: "/manager",
      },
    ],
  },
  manager: {
    routes: [
      {
        component: "ManagerPage",
        url: "/manager",
      },
    ],
  },

  common: {
    routes: [
      {
        component: "HomePage",
        url: "/home",
      },
      {
        component: "SchedulePage",
        url: "/schedule",
      },
      {
        component: "UpdateProfilePage",
        url: "/update-profile",
      },
      {
        component: "AnalysisPage",
        url: "/analysis",
      },
      {
        component: "ReportsPage",
        url: "/reports",
      },
    ],
  },
};

export default rolesConfig;
